import request from 'supertest';
import app from '../server';

describe('POST /register data', () => {

  test('server should response with a status 201', async () => {

    const response = await request(app.app).post('/api/register').send({
      login: "Stanislaw",
      password: "qwerty"
    });

    expect(response.statusCode).toBe(201)

  });

});