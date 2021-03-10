import { Request, Response, NextFunction } from "express";
import fetch from "node-fetch";

// url: string
// query: string

const performanceTestControllers = {
  responseTime: ((req: Request, res: Response, next: NextFunction) => {
    const { url, query } = req.body;
    console.log('req.body: !!!!!!!', req.body)
    // SCRUB INPUTS RES.BODY
  
    // we are defining the query here for testing sake, user's will provide us the query in the electron
    const inputQuery = query;
    console.log('inputQuery', inputQuery);
    console.log('url', url);
    
    // dummy API URL
    const urlTester = 'http://countries.trevorblades.com/';
    
    // dummy query to test
    const queryTester = `query {
      country(code: 'BR') {
        name
        native
        capital
        emoji
        currency
        languages {
          code
          name
        }
      }
    }`;

    // start timer
    const start = Date.now();

    // replace countries url with users url;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: inputQuery
      })
    })
      .then(res => {
        return res.text();
      })
      .then(data => {
        console.log('data returned:', data)
        // store query results in locals
        res.locals.responseTimeData = data;
      })
      .then(() => {
        const end = Date.now();
        const duration = end - start;
        // console.log('duration:', duration);
        // store response time in locals
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

  loadTesting: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // const { query, url } = res.body;
    
    const queryTester = `query {
      country(code: "BR") {
        name
        native
        capital
        emoji
        currency
        languages {
          code
          name
        }
      }
    }`;

    let counter = 0;
    const start = Date.now();

    //need to fix the start time, cannot be the start time in line 76 cus start time changes
    while ((Date.now() - start) < 1000) {
      console.log('start time in loop', start);
      let result = await fetch('http://countries.trevorblades.com/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: queryTester
        })
      })
      console.log(`finished fetching, result is: ${result.text()}`)
      counter++;
    }
    console.log(counter);
    res.locals.loadTimeCounter = counter;
    console.log(res.locals.loadTimeCounter);
    return next();
  },

  avgThroughput: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // const { query, url } = res.body;
    const queryTester = `query {
      country(code: "BR") {
        name
        native
        capital
        emoji
        currency
        languages {
          code
          name
        }
      }
    }`;

    // start timer
    let counter = 0;
    let sum = 0;

    while (counter < 10) {
      const start = Date.now();
      let result = await fetch('http://countries.trevorblades.com/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: queryTester
        })
      })
      const duration = Date.now() - start;
      console.log(duration);
      sum += duration;
      counter++;
    }
    console.log('sum:', sum, 'counter:', counter);
    const avg = sum / counter;
    res.locals.avg = avg;
    console.log('avg:', avg, 'res.locals.avg: ', res.locals.avg);
    return next();
  }
};

export default performanceTestControllers;