const request = require('supertest');
const app = require('../server'); 
const { prisma } = require('./prismaClient'); 

describe('Transaction API', () => {
    let user, sourceAccount, destinationAccount;

    beforeEach(async () => {
        await prisma.transaction.deleteMany({});
        await prisma.bankAccount.deleteMany({});
        await prisma.user.deleteMany({});

        user = await prisma.user.create({
            data: {
                name: 'Test User',
                email: `testuser${Date.now()}@example.com`,
                password: 'password',
            },
        });

        sourceAccount = await prisma.bankAccount.create({
            data: {
                userId: user.id,
                bank_name: 'Source Bank',
                bank_account_number: `SRC${Date.now()}`,
                balance: 1000,
            },
        });

        destinationAccount = await prisma.bankAccount.create({
            data: {
                userId: user.id,
                bank_name: 'Destination Bank',
                bank_account_number: `DST${Date.now()}`,
                balance: 500,
            },
        });
    });

    it('should create a new transaction', async () => {
        const res = await request(app)
            .post('/api/v1/transactions')
            .send({
                source_account_id: sourceAccount.id,
                destination_account_id: destinationAccount.id,
                amount: 100,
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
    });

    
    it('should get all transactions', async () => {
        const res = await request(app).get('/api/v1/transactions');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });

    
    it('should get a transaction by ID', async () => {
        const transaction = await prisma.transaction.create({
            data: {
                source_account_id: sourceAccount.id,
                destination_account_id: destinationAccount.id,
                amount: 50,
            },
        });

        const res = await request(app).get(`/api/v1/transactions/${transaction.id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.id).toEqual(transaction.id);
    });
});