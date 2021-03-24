import { Request, Response, NextFunction } from "express";
import fetch from "node-fetch";
import helpers from '../helper/helper';

const securityTestController = {
  /*
  
  API used to test:
  https://api.everbase.co/graphql?apikey=your_key
  
  Notes on dos:
  Current structure will identify single-depth, or, one-to-one nestable relationships.
  It is possible to identify a nestable relationship between three types,
  where
  {
    countries{
      borders{
        neighboringCapitals{
          countries{
            ...
          }
        }
      }
    }        
  }

  Current query algorithm is wildly inefficient. It violates the Graphql feature of never over-fetching,
  as algo re-fetch's entire schema when probing an additional nested depth


  - For Production level code, the whitespace can be truncated for all query strings.
  - Query strings and helper functions can be modularize in another file and imported

  */
  dos: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { url } = req.body;
    

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
    
    // function findNestableTypes (cache:any) {
    //   //iterate through keys of cache
    //   //key 0 is my dictionary
    //   //any subsequent key is nestable if value is present in dictionary
    //   //return array of arrays of nestable pairs 
    // }
    // const test = {
    //   0: [
    //     { name: 'City', kind: {name: 'Country', kind: 'OBJECT'} },
    //     { name: 'Continent', kind: 'NON_NULL' },
    //     { name: 'Country', kind: {name: 'City', kind: 'OBJECT'} },
    //   ],
    // }
      

    // console.log(findNestableTypes(test));








    const cacheOfTypes: any = {};
    let depth = 0;

    // Fetch root query label 
    // label of root query is 'query' by convention only, 
    // querying it's label ensures this middleware will work on any schema.
    let fetchRequest = helpers.makeFetchJSONRequest(url, rootLabelQueryString, 'POST');
    const rootQuery = await fetch(fetchRequest.url, fetchRequest)
    .then(response => response.json())
    .then((response) => {
      
      // response will always have the same properties, so we can destructure label of root query
      const { data: { __schema: { queryType: { name }}}} = response;
      cacheOfTypes.fields = response.data.__schema.queryType.fields;
      return name;
    })
    .catch(err => {
      next(err);
    });
    console.log(cacheOfTypes);

    // Initial query and filter of schema
    fetchRequest = helpers.makeFetchJSONRequest(url, schemaQueryString, 'POST');
    await fetch(fetchRequest.url, fetchRequest)
    .then(response => response.json())
    .then((response) => {
      filterAndCache(response, cacheOfTypes, depth);
      depth += 1;
    })
    .catch(err => next(err))
   

    //Query of schema type depth
    let queryString = fieldDepthQueryGenerator(2);
    queryString = SchemaDepthQueryGenerator(queryString);

    fetchRequest = helpers.makeFetchJSONRequest(url, queryString, 'POST');
    await fetch(fetchRequest.url, fetchRequest)
    .then(response => response.json())
    .then((response) => {
      console.log(response.data.__schema.types[1].fields);
    })


  },

};

export default securityTestController;

/*
1: I need to make sure that this current system can possibly nest.
   currently, i'm finding TYPE names, and will need to generate a query
   based on these TYPE names. BUT, these type names aren't the same as the 
   field used to query

  okay, once i've found nestable kind's, I can probe the root query's fields for their __typename. with a field label and __typename, I can nest queries.

2: Simpler problem: find loopable in singly nested object

  iterate over fields of types

  if any field matches a type, it's loopable

3: Complex problem: Filter deeply nested object, find loopable
  I must fitler a deeply nested object
  declare a pointer to traverse the nested objects

  stop when type.name === null || type.kind is !== "OBJECT"

  if type.kind === object, go deeper

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