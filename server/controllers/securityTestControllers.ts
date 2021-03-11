import { Request, Response } from "express";
import fetch from "node-fetch";

const securityTestController = {
  dos: ((req: Request, res: Response, next: any) => {
    const { url } = req.body;
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
    // 'https://countries-274616.ew.r.appspot.com'
    fetch(`${url}`, options)
    .then(result => result.text())
    .then(() => {
      res.locals.dos = queryTester;
      return next();
    })
    .catch(err => {
      next({
        log: 'Express error handler caught dos middleware error',
        message: {err: 'error in dos fetch request'}
      });
    });
  }),
};

export default securityTestController;
