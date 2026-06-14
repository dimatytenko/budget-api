import {
  describe,
  it,
  expect,
  beforeAll,
  afterAll,
  afterEach,
} from 'vitest';
import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../../src/app.js';

let mongoServer;

const validUser = {
  email: 'user@example.com',
  password: 'password123',
  confirmPassword: 'password123',
};

const validPurchase = {
  name: 'Test Item',
  price: 100,
  quantity: 2,
  decisionTimer: '24h',
  salary: 5000,
  workHoursByWeek: 40,
  expectReturnPercentage: 10,
  investForYear: 5,
};

const registerUser = () =>
  request(app).post('/api/users/register').send(validUser);

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  for (const collection of Object.values(mongoose.connection.collections)) {
    await collection.deleteMany({});
  }
});

describe('POST /api/users/register', () => {
  it('registers a new user successfully', async () => {
    const res = await registerUser();

    expect(res.status).toBe(201);
    expect(res.body.status).toBe('success');
    expect(res.body.data.token).toEqual(expect.any(String));
    expect(res.body.data.user.email).toBe(validUser.email);
  });

  it('returns 409 when email is already registered', async () => {
    await registerUser();

    const res = await registerUser();

    expect(res.status).toBe(409);
    expect(res.body.message).toBe('This email address is already being used!');
  });
});

describe('POST /api/users/login', () => {
  it('logs in with valid credentials', async () => {
    await registerUser();

    const res = await request(app).post('/api/users/login').send({
      email: validUser.email,
      password: validUser.password,
    });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body.data.token).toEqual(expect.any(String));
    expect(res.body.data.user.email).toBe(validUser.email);
  });
});

describe('GET /api/users/me', () => {
  it('returns 401 without JWT', async () => {
    const res = await request(app).get('/api/users/me');

    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Not authorized');
  });
});

describe('POST /api/purchases', () => {
  it('creates a purchase for an authorized user', async () => {
    const { body: registerBody } = await registerUser();
    const token = registerBody.data.token;

    const res = await request(app)
      .post('/api/purchases')
      .set('Authorization', `Bearer ${token}`)
      .send(validPurchase);

    expect(res.status).toBe(201);
    expect(res.body.status).toBe('success');
    expect(res.body.data.purchase.name).toBe(validPurchase.name);
    expect(res.body.data.purchase.status).toBe('pending');
    expect(res.body.data.purchase.statistics).toEqual({
      workHoursToPay: 6.93,
      incomePercent: 4,
      investmentIncome: 122.1,
    });
  });
});

describe('PATCH /api/purchases/:id/status', () => {
  const createPendingPurchase = async () => {
    const { body: registerBody } = await registerUser();
    const token = registerBody.data.token;

    const { body: createBody } = await request(app)
      .post('/api/purchases')
      .set('Authorization', `Bearer ${token}`)
      .send(validPurchase);

    return {
      token,
      purchaseId: createBody.data.purchase.id,
    };
  };

  it('changes status from pending to bought', async () => {
    const { token, purchaseId } = await createPendingPurchase();

    const res = await request(app)
      .patch(`/api/purchases/${purchaseId}/status`)
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'bought' });

    expect(res.status).toBe(200);
    expect(res.body.data.purchase.status).toBe('bought');
  });

  it('changes status from pending to rejected', async () => {
    const { token, purchaseId } = await createPendingPurchase();

    const res = await request(app)
      .patch(`/api/purchases/${purchaseId}/status`)
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'rejected' });

    expect(res.status).toBe(200);
    expect(res.body.data.purchase.status).toBe('rejected');
  });
});
