const request = require('supertest');
const mockApp = require('../mockServer');

jest.mock('../middleware/authMiddleware', () => ({
  passport: {
    authenticate: jest.fn((strategy, options) => (req, res, next) => {
      if (strategy === 'google') {
        req.user = { id: 1, displayName: 'Mock User', emails: [{ value: 'mockuser@example.com' }] };
        if (options && options.failureRedirect) {
          return res.redirect(options.failureRedirect);
        }
        return next();
      }
    }),
    initialize: jest.fn(),
    session: jest.fn(),
  },
  ensureAuthenticated: (req, res, next) => next(),
}));

describe('GET /api/automobiles', () => {
  it('should retrieve a list of automobiles with pagination', async () => {
    const response = await request(mockApp)
      .get('/api/automobiles')
      .query({ page: 1, limit: 10 })
      .expect(200);

    expect(response.body.automobiles).toBeInstanceOf(Array);
    expect(response.body.automobiles.length).toBeGreaterThanOrEqual(1);
  });

  it('should filter automobiles by make', async () => {
    const response = await request(mockApp)
      .get('/api/automobiles')
      .query({ make: 'Toyota' })
      .expect(200);

    expect(response.body.automobiles).toBeInstanceOf(Array);
    expect(response.body.automobiles.length).toBe(1);
    expect(response.body.automobiles[0].make).toBe('Toyota');
  });

  it('should return 400 if an invalid parameter is provided', async () => {
    const response = await request(mockApp)
      .get('/api/automobiles')
      .query({ page: 'invalid' })
      .expect(400);

    expect(response.body.message).toBe('Invalid query parameters');
  });
});

describe('POST /api/automobiles', () => {
  it('should create a new automobile', async () => {
    const newCar = {
      make: 'Honda',
      model: 'Civic',
      year: 2022,
      price: 22000,
      bodyStyle: 'Coupe',
    };

    const response = await request(mockApp)
      .post('/api/automobiles')
      .send(newCar)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.make).toBe('Honda');
    expect(response.body.model).toBe('Civic');
    expect(response.body.price).toBe(22000);
  });

  it('should return 400 if required fields are missing', async () => {
    const response = await request(mockApp)
      .post('/api/automobiles')
      .send({
        model: 'Civic',
        price: 22000,
      })
      .expect(400);

    expect(response.body.message).toBe('Error creating the automobile');
  });

  it('should return 400 for invalid data', async () => {
    const response = await request(mockApp)
      .post('/api/automobiles')
      .send({
        make: 'Honda',
        model: 'Civic',
        year: 'not-a-year', 
        price: 'not-a-price',
        bodyStyle: 'Coupe',
      })
      .expect(400);

    expect(response.body.message).toBe('Error creating the automobile');
  });
});
