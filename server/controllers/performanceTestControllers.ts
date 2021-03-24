import { Request, Response, NextFunction } from "express";
import fetch from "node-fetch";
import redis from 'redis';
import helpers from '../helper/helper'

const client  = redis.createClient(6379);

client.on('error', err => console.log('redis in perf controller', err));

const isTest = process.env.NODE_ENV === 'test';
let numOfRequests: number;

const performanceTestControllers = {

  // testing the response time of a query to an external API request
  responseTime: ((req: Request, res: Response, next: NextFunction): void => {
    const { query, url } = req.body;

    // key for cache
    const key = JSON.stringify({query, url});

    // store
    // arr of responseTimeData
    // bytes
    // actual responseTime

    // value { arr: responseTimeData }

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
      .then(res => {
        return res.json();
      })
      .then(data => {
        res.locals.responseTimeData = data;
        res.locals.bytes = helpers.bytes(data);
      })
      .then(() => {
        const end = Date.now();
        const duration = end - start;
        res.locals.responseTime = duration;
        return next();
      })
      .catch(err => {
        next({
          log: 'Express error handler caught responseTime middleware error',
          message: {err: 'Can\'t retrieve response time'}
        });
      });
  }),
  // testing number of completed requests in 1 sec
  throughput: (req: Request, res: Response, next: NextFunction) => {
    const { query, url } = req.body;

    // create a key by combining query and url into a stringified object
    const key = JSON.stringify({query, url});
    console.log('key', key);
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
          client.set(key, counter.toString(), redis.print);
          return next();
        }
        helper(req, res, next);
      }
    
    });
  },
  // computing avg response time of 50 requests
  loadTesting: (req: Request, res: Response, next: NextFunction) => {
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
          return next();
        }
        loadHelper(req, res, next);
      }
    })
  }
};

export default performanceTestControllers;