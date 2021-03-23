import { Request, Response, NextFunction } from "express";
import fetch from "node-fetch";
import { nextTick } from "node:process";
import helpers from '../helper/helper';

const securityTestController = {
  dos: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // https://api.everbase.co/graphql?apikey=your_key
    const { url } = req.body;
    
    // should we define these queries in another file and import?
    // it would allow us to re-use them elsewhere
    const rootLabelQuery = `
    {
      __schema{
        queryType{
          name
        }
      }
    }`;
    
    // can these be truncated with a fragment?
    const schemaQuery = `
    {
      __schema {
        types {
          name
          kind
        }
      }
    }`;

    const typeOfTypeQuery = `
    {
      __schema {
        types {
          name
          fields{
            name
            type {
              name
              kind
            }
          }
        }
      }
    }`;
    
    let fetchRequest = helpers.makeFetchJSONRequest(url, rootLabelQuery, 'POST');

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

    let i = 0;
    const cacheOfTypes: any = {};

    fetchRequest = helpers.makeFetchJSONRequest(url, schemaQuery, 'POST');
    await fetch(fetchRequest.url, fetchRequest)
    .then(response => response.json())
    .then((response) => {
      cacheOfTypes[i] = response.data.__schema.types.filter((currentValue:any) => {
        if(currentValue.kind === 'OBJECT' 
        && currentValue.name[0] !== '_'
        && currentValue.name[1] !== '_'
        && currentValue.name !== rootQuery) {
          return currentValue;
        }
      },[]);
      i += 1;
    })
    .catch(err => next(err))
   
    // fetchRequest = helpers.makeFetchJSONRequest(url, typeOfTypeQuery, 'POST');
    // await fetch(fetchRequest.url, fetchRequest)
    // .then(response => response.json())
    // .then((response) => {
    //   console.log(response.data.__schema.types[1]);
    //   // console.log(response.data.__schema.types.name)

    //   // console.log("FIELDS BELOW", response.data.__schema.types.fields);

    //   // console.log("TYPES OF FIELDS BELOW========", response.data.__schema.types.fields.type);
    // })


    //now fetch all types in cacheOfTypes




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