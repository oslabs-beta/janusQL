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
  // test if response obj has a responseTime property
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

  // test if response obj has a responseTimeData property
  it('expect response obj to have a responseTimeData property', (done) => {
    return req
      .post('/input/responsetime')
      .send({ query: queryTester, url: urlTester })
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body).toHaveProperty('responseTimeData');
        done();
      })
      .catch(err => done(err))
  });

  // is the response time a positive number?
  // it('response time should be a positive number', (done) => {
  //   return req
  //     .post('/input/responsetime')
  //     .send({ query: queryTester, url: urlTester })
  //     .expect(200)
  //     .then(response => {
  //       expect(response.body).toHaveProperty('responseTimeData');
  //       done();
  //     })
  //     .catch(err => done(err))
  // })

  // is the response time less than 1 sec?
  // it('response time should be a ', (done) => {
  //   return req
  //     .post('/input/responsetime')
  //     .send({ query: queryTester, url: urlTester })
  //     .expect(200)
  //     .then(response => {
  //       expect(response.body).toHaveProperty('responseTimeData');
  //       done();
  //     })
  //     .catch(err => done(err))
  // })

})

// testing throughput time
// describe('throughput test block', () => {

// })