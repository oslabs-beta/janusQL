const fetch = require('node-fetch');
// const { performance, PerformanceObserver } = require("perf_hooks")
// import fetch from "node-fetch";

const performanceTestControllers = {};

performanceTestControllers.responseTime = ((req, res, next) => {
  // we are defining the query here for testing sake, user's will provide us the query in the electron
  const query = `query {
    launches {
      id
      launch_success
      launch_year
    }
  }`;
  // const query = req.body.query
  
  //start timer
  const start = Date.now();
  console.log('start: ', start);

  // fetch url = req.body.url
  fetch('https://api.spacex.land/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      query,
    })
  })
    .then(r => r.json())
    .then(data => console.log('data returned:', JSON.stringify(data)))
    .then(() => {
      const end = Date.now();
      console.log('end: ', end);
      const duration = end - start;
      res.locals.responseTime = duration;
      console.log('duration:', duration);
    })
    .catch()
}

// req();

// export middleware