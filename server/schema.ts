// import {
//   GraphQLSchema,
//   GraphQLObjectType,
//   GraphQLString,
//   GraphQLList
// } from 'graphQL';

// // dummy API schema (needs to match API labels)
// const countryType = new GraphQLObjectType({
//   name: 'Country',
//   fields: () => ({
//     name: { type: GraphQLString },
//     // continent: { type: GraphQLObjectType },
//     capital: { type: GraphQLString },
//     // languages: { type: GraphQLList }
//   })

// }); 

// // Root Query (let's say our user's API is just getting a list of countries?) endpoints with resolvers
// const rootQuery = new GraphQLObjectType( {
//   name: 'RootQueryType',
//   // fields is an obj of query objs
//   fields: {
//     // get a list of countries
//     countries: {
//       type: new GraphQLList(countryType),
//       resolve(parent: any, args: any) {
//         fetch('https://countries.trevorblades.com')
//           .then(res => res.json())
//           .then(data => console.log('data', data));
          
//       }
//     }
//   }
// });


// // use Morgan 
// // record time stamp of when reaches app.use(graphql)
// // time we receive request
// // end time when response comes back

// export default new GraphQLSchema({
//   query: rootQuery
// })