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
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response: any) => {
        expect(response.body).toHaveProperty('responseTime');
        done();
      })
      .catch((err: any) => done(err))
  });

  // is the response time a number?
  it('response time should be a number', (done) => {
    return req
      .post('/input/responsetime')
      .send({ query: queryTester, url: urlTester })
      .expect(200)
      .then((response: any) => {
        expect(typeof response.body.responseTime).toBe('number');
        done();
      })
      .catch((err: any) => done(err))
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
  it('response time should be less than 500ms', (done) => {
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
})

// testing throughput time
describe('throughput test block', () => {

  // expect response body to have throughputCounter property
  it('response body should have a throughputCounter property', (done) => {
    return req
      .post('/input/throughput')
      .send({ query: queryTester, url: urlTester })
      .expect(200)
      .then(response => {
        expect(response.body).toHaveProperty('throughputCounter');
        done();
      })
      .catch(err => console.log(err));
  });

  // expect throughputCounter to be a number
  it('throughputCounter should be a number', (done) => {
    return req
      .post('/input/throughput')
      .send({ query: queryTester, url: urlTester })
      .expect(200)
      .then(response => {
          expect(typeof response.body.throughputCounter).toBe('number');
          done();
        })
      .catch(err => done(err));
  })
  // expect throughputCounter to be a positive number
  it('thoughputCounter should be a positive number', (done) => {
    return req
      .post('/input/throughput')
      .send({ query: queryTester, url: urlTester })
      .expect(200)
      .then(response => {
        expect(response.body.throughputCounter).toBeGreaterThan(0);
        done();
      })
      .catch(err => done(err));
  })
})

// testing loadtesting
describe('loadtesting test block', () => {
  // does response obj has a storage property?
  it('expect response obj to have a storage property', (done) => {
    return req
      .post('/input/load')
      .send({ query: queryTester, url: urlTester })
      .expect(200)
      .then(response => {
        expect(response.body).toHaveProperty('storage');
        done();
      })
      .catch(err => done(err))
  });

  // does response obj has an avg property?
  it('expect response obj to have an avg property', (done) => {
    return req
      .post('/input/load')
      .send({ query: queryTester, url: urlTester })
      .expect(200)
      .then(response => {
        expect(response.body).toHaveProperty('avg');
        done();
      })
      .catch(err => done(err))
  });

  // is avg a number?
  it('avg load time should be a number', (done) => {
    return req
      .post('/input/load')
      .send({ query: queryTester, url: urlTester })
      .expect(200)
      .then(response => {
        expect(typeof response.body.avg).toBe('number');
        done();
      })
      .catch(err => done(err))
  })

  // is avg a positive number?
  it('avg load time should be a positive number', (done) => {
    return req
      .post('/input/load')
      .send({ query: queryTester, url: urlTester })
      .expect(200)
      .then(response => {
        expect(response.body.avg).toBeGreaterThan(0);
        done();
      })
      .catch(err => done(err))
  })

  // is the avg less than 500ms?
  it('avg load time should be a less than a second', (done) => {
    return req
      .post('/input/load')
      .send({ query: queryTester, url: urlTester })
      .expect(200)
      .then(response => {
        expect(response.body.avg).toBeLessThan(500);
        done();
      })
      .catch(err => done(err))
  })
})