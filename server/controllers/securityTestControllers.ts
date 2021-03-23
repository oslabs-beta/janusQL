import { Request, Response, NextFunction } from "express";
import fetch from "node-fetch";
import helpers from '../helper/helper';

const securityTestController = {
  dos: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // https://api.everbase.co/graphql?apikey=your_key
    const { url } = req.body;
    
    // For Production level code, the whitespace can be truncated for all query strings.

    // should we define these queries in another file and import?
    // it would allow us to re-use them elsewhere
    const rootLabelQueryString = `
    {
      __schema{
        queryType{
          name
        }
      }
    }`;
    
    // can these be truncated with a fragment?
    const schemaQueryString = `
    {
      __schema {
        types {
          name
          kind
        }
      }
    }`;

    function SchemaDepthQueryGenerator (field:string) {
      const queryString = `{
        __schema {
          types {
            name
             ${field}
          }
        }
      }`;

      return queryString
    }

    function fieldDepthQueryGenerator (depth:number) {

      const initialQueryString = `
        fields{
          name
          type{
            name
            kind
          }
        }`;

        const depthHelper = (field?:string | null) => {

          if(field) {

            const addQueryDepth = `
              fields{
                name
                type{
                  name
                  kind
                  ${field}
                }
              }`;

            return addQueryDepth;
          } else {
            return initialQueryString;
          }
        }

        if(depth === 1) {
          return depthHelper();
        } else {
          let concatQueryString = ``;
          for(let i = 0; i < depth; i++) {
            concatQueryString = depthHelper(concatQueryString);
          }
          return concatQueryString;
        }
    }

    function filterAndCache (response:any, cache:any, key:number) {
      cache[key] = response.data.__schema.types.filter((currentValue:any) => {
        if(currentValue.kind === 'OBJECT' 
        && currentValue.name[0] !== '_'
        && currentValue.name[1] !== '_'
        && currentValue.name !== rootQuery) {
          return currentValue;
        }
      },[]);

      return cache;
    }
    
    // Fetch root query label 
    // label of root query is 'query' by convention only, 
    // querying it's label ensures this middleware will work on any schema.
    let fetchRequest = helpers.makeFetchJSONRequest(url, rootLabelQueryString, 'POST');
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

    const cacheOfTypes: any = {};
    let i = 0;

    // Initial query and filter of schema
    fetchRequest = helpers.makeFetchJSONRequest(url, schemaQueryString, 'POST');
    await fetch(fetchRequest.url, fetchRequest)
    .then(response => response.json())
    .then((response) => {
      filterAndCache(response, cacheOfTypes, i);
      
      // i += 1;
    })
    .catch(err => next(err))
   

    // //Query of schema type depth
    // let queryString = fieldDepthQueryGenerator(2);
    // queryString = SchemaDepthQueryGenerator(queryString);

    // fetchRequest = helpers.makeFetchJSONRequest(url, queryString, 'POST');
    // await fetch(fetchRequest.url, fetchRequest)
    // .then(response => response.json())
    // .then((response) => {
    //   console.log(response.data.__schema.types[1].fields);
    // })


  },

};

export default securityTestController;

/*

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
}


    //query all types

    //filter scalars / built-ins

    //cache result

    //query types of cache

    // check if type has been seen

    //filter

    //cache
*/