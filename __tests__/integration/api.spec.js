const request = require('supertest');
const app = require('../../api');

describe('api server', () => {
  let api;

  beforeAll(() => {
    api = app.listen(4000, () => {
      console.log('API listening on port: 4000');
    });
  });

  afterAll((done) => {
    console.log('Stopping test server...');
    api.close(done);
  });

  test('responds to GET / with status 200', (done) => {
    request(api).get('/').expect(200, done);
  });

  test.skip('responds to GET /bins with a 200 status code', (done) => {
    request(api).get('/bins').expect(200, done);
  });

  test('responds to GET / with a message and a description', async () => {
    const response = await request(api).get('/');

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe('reddy_22 API');
    expect(response.body.description).toBe('TBC');
  });
});
