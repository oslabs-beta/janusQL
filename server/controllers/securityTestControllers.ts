import { Request, Response } from "express";
import fetch from "node-fetch";
import helpers from '../helper/helper';

const securityTestController = {
  dos: ((req: Request, res: Response, next: any) => {
    const { url } = req.body;
    
    const getRootQuery = `
    {
      __schema{
        queryType{
          name
        }
      }
    }`;
    
    const fetchRequest = helpers.makeFetchJSONRequest(url, getRootQuery, 'POST');
    // https://api.everbase.co/graphql?apikey=your_key
    fetch(fetchRequest)
    .then(result => result.text())
    .then(() => {
      res.locals.dos = getRootQuery;
      return next();
    })
    .catch(err => {
      next(err);
    });
  

    // const queryTester = `
    // query {
    //   Country{
    //     borders{
    //       officialLanguages{
    //         countries{
    //           borders{
    //             name
    //           }
    //         }
    //       }
    //     }
    //   }
    // }
    // `;
  
    //query all types

    //filter scalars / built-ins

    //cache result

    //query types of cache

    // check if type has been seen

    //filter

    //cache
  }),

};

export default securityTestController;

/*
// This Query will return all objects namn and kind. We can filter by kind, removing scalars

// {
//   __schema{
//     types{
//       name
//       kind
//     }
//   }
// }

//query Root Query label
const getRootQuery = `
{
  __schema{
    queryType{
      name
    }
  }
}`;

=======verbose fetch=======
//fetch options
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: queryTester })
    }
    // 'https://countries-274616.ew.r.appspot.com'
    fetch(`https://countries-274616.ew.r.appspot.com`, options)
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


*/