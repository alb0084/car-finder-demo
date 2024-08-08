const request = require('supertest');
const mockApp = require('../mockServer');

describe('POST /api/saved-searches', () => {
    it('should save a new search', async () => {
        const newSearch = {
            title: 'Search 3',
            makeFilter: 'Ford',
            bodyStyleFilter: 'SUV',
            minPrice: 20000,
            maxPrice: 40000,
            sortOption: 'price',
            fuelFilter: 'Electric'
        };

        const response = await request(mockApp)
            .post('/api/saved-searches')
            .send(newSearch)
            .expect(201);

        expect(response.body).toHaveProperty('search');
        expect(response.body.search.title).toBe('Search 3');
    });
});

describe('GET /api/saved-searches', () => {
    it('should retrieve all saved searches for the user', async () => {
        const response = await request(mockApp)
            .get('/api/saved-searches')
            .expect(200);

        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThanOrEqual(1);
    });
});

describe('DELETE /api/saved-searches/:searchId', () => {
    it('should delete a saved search', async () => {
        const response = await request(mockApp)
            .delete('/api/saved-searches/1')
            .expect(200);

        expect(response.body.message).toBe('Saved search successfully deleted');
    });

    it('should return 404 if the saved search does not exist', async () => {
        const response = await request(mockApp)
            .delete('/api/saved-searches/999')
            .expect(404);

        expect(response.body.message).toBe('Saved search not found or not authorized');
    });
});
