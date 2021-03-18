import supertest from "supertest";

// import our server file
import app from "../server/server";

// instance of supertest, runs our server file
const req = supertest(app);

// dummy url and query string
const urlTester = 'http://countries.trevorblades.com/';
    
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

// testing response time
describe('response time test block', () => {
  // does response obj has a responseTime property?
  it('expect response obj to have a responseTime property', (done) => {
    return req
      .post('/input/responsetime')
      .send({ query: queryTester, url: urlTester })
      .expect(200)
      .then(response => {
        expect(response.body).toHaveProperty('responseTime');
        done();
      })
      .catch(err => done(err))
  });

  // does response obj has a responseTime property?
  it('expect response obj to have a responseTime property', (done) => {
    return req
      .post('/input/responsetime')
      .send({ query: queryTester, url: urlTester })
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body).toHaveProperty('responseTime');
        done();
      })
      .catch(err => done(err))
  });

  // is the response time a number?
  it('response time should be a number', (done) => {
    return req
      .post('/input/responsetime')
      .send({ query: queryTester, url: urlTester })
      .expect(200)
      .then(response => {
        expect(typeof response.body.responseTime).toBe('number');
        done();
      })
      .catch(err => done(err))
  })

  // is the response time a positive number?
  it('response time should be a positive number', (done) => {
    return req
      .post('/input/responsetime')
      .send({ query: queryTester, url: urlTester })
      .expect(200)
      .then(response => {
        expect(response.body.responseTime).toBeGreaterThan(0);
        done();
      })
      .catch(err => done(err))
  })

  // is the response time less than 500ms?
  it('response time should be a less than a second', (done) => {
    return req
      .post('/input/responsetime')
      .send({ query: queryTester, url: urlTester })
      .expect(200)
      .then(response => {
        expect(response.body.responseTime).toBeLessThan(500);
        done();
      })
      .catch(err => done(err))
  })

  // is responseTimeData an array? - idk how to test for this
  // it('responseTimeData should be an array', (done) => {
  //   return req
  //     .post('/input/responsetime')
  //     .send({ query: queryTester, url: urlTester })
  //     .expect(200)
  //     .then(response => {
  //       const arrOfResponseTimes = response.body.responseTimeData.json()
  //       expect(Array.isArray(arrOfResponseTimes)).toBe(true);
  //       done();
  //     })
  //     .catch(err => done(err))
  // })

})

// testing throughput time
// describe('throughput test block', () => {

// })

// testing loadtesting 
// .toHaveBeenCalledTimes(number)