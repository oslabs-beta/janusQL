import { Request, Response, NextFunction } from "express";
import fetch from "node-fetch";

const performanceTestControllers = {
  responseTime: ((req: Request, res: Response, next: NextFunction) => {
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

    while ((Date.now() - start) < 1000) {
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

    // while ((Date.now() - start) < 1000){
    //   // console.log(Date.now() - start);
    //   fetch('http://countries.trevorblades.com/', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       query: queryTester
    //     })
    //   })
    //     .then(res => {
    //       counter++;
    //       return res.text();
    //     })
    //     .then(() => {
    //       // console.log('data returned:', data);
    //       counter++;
    //       // console.log('INSIDE .THEN STATEMENTTTTTT', counter);
    //       res.locals.loadTestCounter = counter;
    //       // console.log(res.locals.loadTestCounter);
    //     })
    //     .catch(err => {
    //       next({
    //         log: 'Express error handler caught loadTesting middleware error',
    //         message: {err: 'Can\'t retrieve load testing limit'}
    //       });
    //     });
    // }
  },
};

export default performanceTestControllers;