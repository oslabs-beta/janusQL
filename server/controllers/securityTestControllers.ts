import { Request, Response, NextFunction, query } from "express";
import fetch from "node-fetch";
import helpers from '../helper/helper';

const securityTestController = {
  // https://api.everbase.co/graphql?apikey=your_key
  dos: (req: Request, res: Response, next: NextFunction): void =>  {
    return next();
  },
  
  brutedos: async (req: Request, res: Response, next: NextFunction): Promise<void> =>  {
    const { url } = req.body;
    const queryCache:any = {};     
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

    async function bruteQuery (fields:Array<any>, url:string, root:string) {

      function makeQuery (root:string, type:string, field:string) {

        // remove to lower case later
        const query = `
        ${root.toLowerCase()} {
          ${type} {
            ${field}{
              name
            }
          }
        }`;

        return query
      }

      let result;
      for(let i = 0; i < fields.length; i++) {
        const type:string = fields[i].name;
        for(let j = 0; j < fields.length; j++) {
          const field:string = fields[j].name;
          
          if (type === field) {
            continue;
          }

          const query = makeQuery(root, type, field);
          const fetchRequest = helpers.makeFetchJSONRequest(url, query, 'POST');
          result = await fetch(fetchRequest.url, fetchRequest)
          .then(response => response.json())
          .then((response) => {
            const { data } = response;
            console.log(response);
            console.log(query);
            // if(Object.prototype.hasOwnProperty.call(data, "error") || Object.prototype.hasOwnProperty.call(data, "errors")) {
            //   return 'invalid';
            // } else {
            //   return response;
            // }
          })
          .catch(err => console.log(err))
        }
      }
      console.log(result);
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

    console.log(queryCache);

    const testCache = [
      {name: 'cities'},
      {name: 'continents'},
      {name: 'countries'},
    ]
    bruteQuery(testCache, url, rootQuery);
    
  // EOL of method
  },
}
export default securityTestController;