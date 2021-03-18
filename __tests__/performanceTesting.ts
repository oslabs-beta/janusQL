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

describe('response time test block', () => {
  // testing response time
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
})

// describe('test block', () => {
//   it('test route', async (done) => {
//     const res = await supertest(app).get('/').expect(200);
//     done();
//   });
// });

// is the response time a positive number?
// test('expect response time to be a positive number', () => {
//     const responseObj = performanceTestControllers.responseTime(url, query);
//     expect(responseObj.lo).to.responseTimeBeGreaterThan(0);
// });

// is the response time less than 1 sec?
// test('expect respres.locals.onse time to be less than 1 sec', () => {
//   const responseObj = performanceTestControllers.responseTime(url, query);
//   expect()
// })

// describe('POST /input/responsetime', () => {
//   it ('responseTime and responseTimeData should exist in res.body', done => {
//     return supertest(server)
//       .post('/input/responsetime')
//       .send({url: urlTester, query: queryTester})
//       .expect('Content-Type', /json/)
//       .expect(200)
//       .then(res => {
//         res.body.should.have.property('responseTime', 'responseTimeData')
//         done();
//       })
//   })
// })