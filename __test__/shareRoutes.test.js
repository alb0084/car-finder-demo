const request = require('supertest');
const mockApp = require('../mockServer');
const nodemailer = require('nodemailer');

jest.mock('nodemailer', () => ({
    createTransport: jest.fn().mockReturnValue({
        sendMail: jest.fn(),
    }),
}));

describe('POST /api/share-search', () => {
    beforeEach(() => {
        jest.resetModules();
        jest.clearAllMocks();
    });

    it('should share a saved search via email', async () => {
        nodemailer.createTransport().sendMail.mockImplementation((mailOptions, callback) => {
            callback(null, { response: '250 Message accepted' });
        });

        const emailData = {
            searchId: 1,
            email: 'test@example.com',
            details: {
                fuelFilter: 'Petrol',
                bodyStyleFilter: 'Sedan',
                minPrice: 10000,
                maxPrice: 30000,
                sortOption: 'priceLowToHigh'
            }
        };

        const response = await request(mockApp)
            .post('/api/share-search')
            .send(emailData)
            .expect(200);

        expect(response.body.message).toBe('Sending Email successful.');
    });

    it('should return 404 if the search does not exist', async () => {
        const emailData = {
            searchId: 999,
            email: 'test@example.com',
            details: {
                fuelFilter: 'Petrol',
                bodyStyleFilter: 'Sedan',
                minPrice: 10000,
                maxPrice: 30000,
                sortOption: 'priceLowToHigh'
            }
        };

        const response = await request(mockApp)
            .post('/api/share-search')
            .send(emailData)
            .expect(404);

        expect(response.body.message).toBe('Search did not find');
    });

    it('should return 500 if there is an error sending the email', async () => {
        nodemailer.createTransport().sendMail.mockImplementation((mailOptions, callback) => {
            callback(new Error('Mocked error sending email'), null);
        });

        const emailData = {
            searchId: 1,
            email: 'invalidemail',
            details: {
                fuelFilter: 'Petrol',
                bodyStyleFilter: 'Sedan',
                minPrice: 10000,
                maxPrice: 30000,
                sortOption: 'priceLowToHigh'
            }
        };

        const response = await request(mockApp)
            .post('/api/share-search')
            .send(emailData)
            .expect(500);

        expect(response.body.message).toBe('Error During sending an email.');
    });
});
