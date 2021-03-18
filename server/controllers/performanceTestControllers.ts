import { Request, Response, NextFunction } from "express";
import fetch from "node-fetch";

const isTest = process.env.NODE_ENV === 'test';
let numOfRequests: number;

const performanceTestControllers = {

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
      .then(res => {
        return res.text();
      })
      .then(data => {
        res.locals.responseTimeData = data;
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
  throughput: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { query, url } = req.body;

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
    return next();
  },
  // computing avg response time of 50 requests
  loadTesting: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { query, url } = req.body;

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
};

export default performanceTestControllers;