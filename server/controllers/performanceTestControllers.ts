import { Request, Response, NextFunction } from "express";
import fetch from "node-fetch";
import redis from 'redis';
import helpers from '../helper/helper'

const client  = redis.createClient(6379);

// cache info will persist until server is killed
client.set('key', '0');
client.get('key', (err, data) => {
  console.log('helllllo', data);
});

// client.incr('key', (err, data) => {
//   console.log('current key value', data);
//   client.set(data.toString(), '{testName: responsetime, result: 7, queryString: query, urlString: url}', redis.print)
// });

client.on('error', err => console.log('redis in perf controller', err));

const isTest = process.env.NODE_ENV === 'test';
let numOfRequests: number;

let key: number;

client.keys('key', redis.print);

const performanceTestControllers = {
  cacheResponseMetrics: ((req: Request, res: Response, next: NextFunction): void => {
    // get responsetime, btyes, throughput from res.locals
    // store it in cache

    client.get('key', (err, data) => {
      console.log('key that is inside cacheResponseMetrics woooo', data);
    });

    client.incr('key', (err, data) => {
      client.set(data.toString(), JSON.stringify(res.locals));
    })

  }),


  // testing the response time of a query to an external API request
  responseTime: ((req: Request, res: Response, next: NextFunction): void => {
    const { query, url } = req.body;

    // start timer
    const start = Date.now();

    fetch(`${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: query
      })
    })
      .then(() => {
        const end = Date.now();
        const duration = end - start;
        res.locals.responseTime = duration;
        // const value = {

        // };
        
        // to get newly incremented key
        client.incr('key', (err, data) => {
          key = data;
          console.log('response tiem key', data);
          // use key to set new key-value pair in cache
          client.set(data.toString(), res.locals.responseTime);
          client.get(data.toString(), (err, data) => {
            console.log('should give us response time data', data);
          })
        });
        return next();
      })
      .catch(err => {
        next({
          log: 'Express error handler caught responseTime middleware error',
          message: {err: 'Can\'t retrieve response time'}
        });
      });
  }),

  bytes: (req: Request, res: Response, next: NextFunction): void => {
    const { query, url } = req.body;
    
    const key = 'byte' + JSON.stringify({query, url});

    fetch(`${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: query
      })
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        res.locals.responseTimeData = data;
        res.locals.bytes = helpers.bytes(data);
        client.set(key.toString(), res.locals.bytes);
        return next();
      })
      .catch(err => {
        next({
          log: 'Express error handler caught responseTime middleware error',
          message: {err: 'Can\'t retrieve response time'}
        });
      });
  },

  // testing number of completed requests in 1 sec
  throughput: (req: Request, res: Response, next: NextFunction): void => {
    const { query, url } = req.body;

    // create a key by combining query and url into a stringified object
    const key = 'throughput' + JSON.stringify({query, url});
    // console.log('key', key);
    // check if url and query are in cache
    client.get(key, (err, data) => {
      console.log('check cache');
      // if data exists in cache, return data
      if (data !== null) {
        // parse the data
        // data.throughput
        const num = parseInt(data);
        res.locals.throughputCounter = num;
        return next();
      } 
      else {
        const helper = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
          console.log('start timer');
          let counter = 0;
          const start = Date.now();

          while ((Date.now() - start) < 1000) {
            const result = await fetch(url, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                query: query
              })
            })
            counter++;
          }
          res.locals.throughputCounter = counter;
          console.log('store in cache:', res.locals.throughputCounter);
          // client.set(key, counter.toString(), redis.print);
          return next();
        }
        helper(req, res, next);
      }
    
    });
  },
  // computing avg response time of 50 requests
  loadTesting: (req: Request, res: Response, next: NextFunction): void => {
    const { query, url } = req.body;

    // create a key by combining query and url into a stringified object
    const key = JSON.stringify({query, url});
    console.log('key', key);

    // check if url and query are in cache
    client.get(key, (err, data) => {
      console.log('check cache');
      // if data exists in cache, return data
      if (data !== null) {
        console.log(data);
        const num = parseInt(data);
        res.locals.avg = num;
        return next();
      }
      else {
        const loadHelper = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
          let counter = 0;
          let sum = 0;
          const storage = [];
          
          // for testing purposes
          if (isTest) {
            numOfRequests = 2;
          } else {
            numOfRequests = 50;
          }

          while (counter < numOfRequests) {
            const start = Date.now();
            const result = await fetch(url, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                query: query
              })
            })
            const duration = Date.now() - start;
            storage.push(duration);
            sum += duration;
            counter++;
          }
          res.locals.storage = storage;
          const avg = sum / counter;
          res.locals.avg = avg;
          client.incr('key', (err, data) => {
            console.log('load test key', data);
            client.set(data.toString(), res.locals.avg);
            client.get(data.toString(), (err, data) => {
              console.log('should give us the load test avg', data);
            })
          });
          return next();
        }
        loadHelper(req, res, next);
      }
    })
  }
};

export default performanceTestControllers;