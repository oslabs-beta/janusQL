import { Request, Response } from "express";
import fetch from "node-fetch";

const performanceTestControllers = {
  responseTime: ((req: Request, res: Response, next: any) => {
    // const { query, url } = res.body;
    // SCRUB INPUTS RES.BODY
  
    // we are defining the query here for testing sake, user's will provide us the query in the electron
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
    const start = Date.now();

    // replace countries url with users url;
    fetch('http://countries.trevorblades.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: queryTester
      })
    })
      .then(res => {
        return res.text();
      })
      .then(data => {
        console.log('data returned:', data)
        res.locals.responseTimeData = data;
      })
      .then(() => {
        const end = Date.now();
        const duration = end - start;
        // console.log('duration:', duration);
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
};

export default performanceTestControllers;