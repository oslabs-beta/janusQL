const fetch = require('node-fetch');
// const { performance, PerformanceObserver } = require("perf_hooks")
// import fetch from "node-fetch";

const performanceTestControllers = {};

performanceTestControllers.responseTime = ((req, res, next) => {
  console.log('im in RESPONSE TIME CONTROLLERRRRRRRR');
  // const { query, url } = res.body;
  // SCRUB INPUTS RES.BODY
  
  // we are defining the query here for testing sake, user's will provide us the query in the electron
  // const queryTester = `query {
  //   country(code: "BR") {
  //     name
  //     native
  //     capital
  //     emoji
  //     currency
  //     languages {
  //       code
  //       name
  //     }
  //   }
  // }`;
  // var myHeaders = {
  //   "Content-Type": "application/json"
  // }

  //start timer
  // const start = Date.now();
  // console.log('start: ', start);

  // var graphql = JSON.stringify({
  //   query: `query {
  //     country(code: "BR") {
  //       name
  //       native
  //       capital
  //       emoji
  //       currency
  //       languages {
  //         code
  //         name
  //       }
  //     }
  //   }`
  //   // variables: {}
  // })

//   var requestOptions = {
//     method: 'POST',
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: graphql,
//     // redirect: 'follow'
//   };

//   fetch("https://countries.trevorblades.com/", requestOptions)
//     .then(response => response.text())
//     .then(result => console.log(result))
//     .then(() => {
//       const end = Date.now();
//       console.log('end: ', end);
//       const duration = end - start;
//       console.log('duration:', duration);
//       res.locals.responseTime = duration;
//       return next();
//     })
//     .catch(error => console.log('error', error));
// });



  //start timer
  const start = Date.now();
  console.log('start: ', start);
  // replace spacex url with url;
  fetch('http://countries.trevorblades.com/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query {
          country(code: "BR") {
            name
            native
            capital
            emoji
            currency
            languages {
              code
              name
            }
          }
        }`
    })
  })
    .then(res => {
      res.text();
      // console.log('r.json', res);
      // return res;
    })
    .then(data => {
      console.log('data returned:', data)
    })
    .then(() => {
      const end = Date.now();
      console.log('end: ', end);
      const duration = end - start;
      console.log('duration:', duration);
      res.locals.responseTime = duration;
      return next();
    })
    .catch( err => console.log('error', err)); // insert global error handler
});

module.exports = performanceTestControllers;

// req();