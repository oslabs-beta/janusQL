const fetch = require('node-fetch');
const { performance, PerformanceObserver } = require("perf_hooks")
// import fetch from "node-fetch";

const req = () => {
  // we are defining the query here for testing sake, user's will provide us the query in the electron
  var query = `query {
    launches {
      id
    }
  }`;
  
  //start timer


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
    // .then(() => {/*endtime*/})
    .then(data => console.log('data returned:', JSON.stringify(data)));
}

req();