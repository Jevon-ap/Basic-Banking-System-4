const request = require('supertest');
const app = require('../server')

describe('User API', () => {
    let newUser;
  
    it('should create a new user', async () => {
      const res = await request(app)
        .post('/api/v1/users')
        .send({
          name: 'jevon11',
          email: 'jevon11@example.com',
          password: 'password1234',
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('id');
      newUser = res.body; 
    });
  
    it('should get all users', async () => {
      const res = await request(app).get('/api/v1/users');
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBeTruthy();
    });
  
    it('should get a user by id', async () => {
      const res = await request(app).get(`/api/v1/users/${newUser.id}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('id', newUser.id);
    }); 
  });