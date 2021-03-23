import { Request, Response, NextFunction } from "express";
import fetch from "node-fetch";
import helpers from '../helper/helper';

const securityTestController = {
  dos: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { url } = req.body;
    
    const getRootQueryLabel = `
    {
      __schema{
        queryType{
          name
        }
      }
    }`;
    
    // https://api.everbase.co/graphql?apikey=your_key
    
    let fetchRequest = helpers.makeFetchJSONRequest(url, getRootQueryLabel, 'POST');

    //label of root query is 'query' by convention only, 
    //querying it's label ensures this middleware will work on any schema.
    const rootQuery = await fetch(fetchRequest.url, fetchRequest)
    .then(response => response.json())
    .then((response) => {
      
      // response will always have the same properties, so we can destructure label of root query
      const { data: { __schema: { queryType: { name }}}} = response;
      return name;
    })
    .catch(err => {
      next(err);
    });
    
    //query all types

    //filter scalars / built-ins

    //cache result

    //query types of cache

    // check if type has been seen

    //filter

    //cache
  },

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