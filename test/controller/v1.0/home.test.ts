import * as request from 'supertest';
import app from '../../../src/app';

describe('Home Controller', () => {
  test('GET: / should return API message', async (done) => {
    const response = await app.then(async app => {
      return request(app)
        .get('/')
        .expect(200);
    })
    expect(response.body.data).toBe('Super Scores TS Application');
    done();
  });
});