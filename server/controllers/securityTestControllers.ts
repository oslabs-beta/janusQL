import { Request, Response } from "express";
import fetch from "node-fetch";

const securityTestController = {
  dos: ((req: Request, res: Response, next: any) => {
    
    //nested query which client should reject.
    const queryTester = `
    query {
      Country{
        borders{
          officialLanguages{
            countries{
              borders{
                name
              }
            }
          }
        }
      }
    }
    `;
    
    //fetch options
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: queryTester })
    }
    
    fetch('https://countries-274616.ew.r.appspot.com', options)
    .then(result => result.text())
    .then(result => {
      res.locals.dos = result
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

export default securityTestController;
