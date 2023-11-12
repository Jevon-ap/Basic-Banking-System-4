const request = require('supertest');
const app = require('../server'); 
const { prisma } = require('./prismaClient'); 

describe('Account API', () => {
  let user;

  beforeEach(async () => {
    await prisma.transaction.deleteMany({});

    await prisma.bankAccount.deleteMany({});

    await prisma.profile.deleteMany({});
  
    await prisma.user.deleteMany({});
  
    user = await prisma.user.create({
      data: {
        name: 'Test User',
        email: `testuser${Date.now()}@example.com`,
        password: 'password',
      },
    });
  });

  it('should create a new bank account', async () => {
    const res = await request(app)
      .post('/api/v1/accounts')
      .send({
        userId: user.id,
        bank_name: 'Test Bank',
        bank_account_number: `ACC${Date.now()}`,
        balance: 1000,
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should get all bank accounts', async () => {
    const res = await request(app).get('/api/v1/accounts');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});