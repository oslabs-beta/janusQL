const fetch = require('node-fetch');
// const { performance, PerformanceObserver } = require("perf_hooks")
// import fetch from "node-fetch";

const performanceTestControllers = {};

performanceTestControllers.responseTime = ((req, res, next) => {
  console.log('im in RESPONSE TIME CONTROLLERRRRRRRR');
  // const { query, url } = res.body;
  // SCRUB INPUTS RES.BODY
  
  // we are defining the query here for testing sake, user's will provide us the query in the electron
  const queryTester = `query {
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
  }`;

  //start timer
  const start = Date.now();
  console.log('start: ', start);

  // replace countries url with users url;
  fetch('http://countries.trevorblades.com/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: queryTester
    })
  })
    .then(res => {
      return res.text();
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
    .catch(err => console.log('error', err)); // insert global error handler
});

module.exports = performanceTestControllers;