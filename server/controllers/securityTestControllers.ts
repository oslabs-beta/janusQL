import { Request, Response, NextFunction, query } from "express";
import fetch from "node-fetch";
import helpers from '../helper/helper';

const securityTestController = {
  fastDos: (req: Request, res: Response, next: NextFunction): void =>  {
    return next();
  },
  
  // https://api.everbase.co/graphql?apikey=your_key 
  // Primary API used to test:
  
  brutedos: async (req: Request, res: Response, next: NextFunction): Promise<void> =>  {
    const { url } = req.body;
    const NEST_DEPTH = 6;
    const queryCache:any = {};     

    // queryType is 'Query' by convention only. We query it's label
    // to increase consistency
    const rootLabelQueryString = `
    {
      __schema {
        queryType {
          name
          fields{
            name
          }
        }
      }
    }`;

    async function bruteQuery (cache:any, url:string, root:string) {

      function makeQuery (root:string, type:string, field:string) {

        // most API's lowercase the label of root query, so we call toLowerCase on root
        const query = `
        ${root.toLowerCase()} {
          ${type} {
            ${field}{
              ${type}{
                name
              }
            }
          }
        }`;

        return query
      }

      const fields = cache.fields;
      let result: boolean | void = false;
      for(let i = 0; i < fields.length; i++) {
        if(result){
          break;
        }
        const type:string = fields[i].name;
        for(let j = 0; j < fields.length; j++) {
          if(result){
            break;
          }
          const field:string = fields[j].name;
          
          if (type === field) {
            continue;
          }

          const query = makeQuery(root, type, field);
          const fetchRequest = helpers.makeFetchJSONRequest(url, query, 'POST');

          // Client will include 'error' propery in response if query is invalid
          result = await fetch(fetchRequest.url, fetchRequest)
          .then(response => response.json())
          .then((response) => {
            if('error' in response || 'errors' in response) {
              return false;
            } else {
              console.log(response);
              return true;
            }
          })
          .catch(err => console.log(err))

          if (result) {
            cache.query = {type: type, field: field};
          }
        }
      }
    }

    function makeNestedQuery (cache:any, root:string):string {
      const { type, field } = cache.query;
      
      let nestedQuery = `${root.toLowerCase()} {`;

      for(let i = 0; i < NEST_DEPTH; i++) {
  
        if(i < NEST_DEPTH / 2) {
          nestedQuery += `${type} {`;
          nestedQuery += `${field} {`;
        }
      
      }

      nestedQuery += 'name';
      
      // we add one to NESTED_DEPTH to account for the '}' included
      // in the initial declaration of nestedQuery
      for (let i = 0; i < NEST_DEPTH + 1; i++) {
        nestedQuery += `}`;
      }

      return nestedQuery;

    }

    let fetchRequest = helpers.makeFetchJSONRequest(url, rootLabelQueryString, 'POST');
    const rootQuery = await fetch(fetchRequest.url, fetchRequest)
    .then(response => response.json())
    .then((response) => {
      
      // response will always have the same properties, so we can destructure label of root query
      const { data: { __schema: { queryType: { name }}}} = response;
      queryCache.fields = response.data.__schema.queryType.fields;
      return name;
    })
    .catch(err => {
      next(err);
    });

    await bruteQuery(queryCache, url, rootQuery);
    const dosQuery = makeNestedQuery(queryCache, rootQuery);
    
    fetchRequest = helpers.makeFetchJSONRequest(url, dosQuery, 'POST');
    
    const testResult:any = {};
    testResult.queryString = dosQuery;
    testResult.clientStatus = await fetch(fetchRequest.url, fetchRequest)
    .then(response => response.json())
    .then((response) => {
      if('error' in response || 'errors' in response) {
        return 'pass';
      } else {
        return 'fail';
      }
    })
    .catch(err => console.log(err));

    res.locals.testResult = testResult;
    
    return next();
    // EOL of method
  },
}
export default securityTestController;