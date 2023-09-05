const request = require('supertest');
const app = require('../app');

describe('POST /receipts/process', () => {
    const route = '/receipts/process';

    it('should return 200 success code', async () => {
        const body = {
            retailer: "Target",
            purchaseDate: "2022-01-01",
            purchaseTime: "13:01",
            items: [{
                shortDescription: "Mountain Dew 12PK",
                price: "6.49"
            }],
            total: "6.49"
        };
        const res = await request(app).post(route).send(body);
        
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('id');
    });

    it('should return 400 for invalid receipt', async () => {
        const body = {
            retailer: "Invalid Retailer",
            purchaseDate: "2022-01-01",
            purchaseTime: "13:01",
            items: [{
                shortDescription: "Mountain Dew 12PK",
                price: "6.49"
            }],
            total: "6.49"
        };
        const res = await request(app).post(route).send(body);

        expect(res.statusCode).toBe(400);
    });

    it('should return 400 for invalid purchase date', async () => {
        const body = {
            retailer: "Target",
            purchaseDate: "2022/01/01",
            purchaseTime: "13:01",
            items: [{
                shortDescription: "Mountain Dew 12PK",
                price: "6.49"
            }],
            total: "6.49"
        };
        const res = await request(app).post(route).send(body);

        expect(res.statusCode).toBe(400);
    });
});

describe('GET /receipts/:id/points', () => {
    const paths = {
        get: '/receipts/{}/points',
        post: '/receipts/process',
    };

    it('should return status code 404 for invalid id', async () => {
        const res = await request(app).get(paths.get.replace('{}', 'db4efb71-a639-425a-9fda-fe4fa7275a79'));

        expect(res.statusCode).toBe(404);
    });
    
    it('should return 200 success code and the points of the posted receipt', async () => {
        /**
         * 14 -> 1st rule
         * 50 -> 2nd rule
         * 25 -> 3rd rule
         * 10 -> 4th rule
         * 10 -> 7th rule
         * total: 109
         */
        const body = {
            retailer: "M&MCornerMarket",
            purchaseDate: "2022-03-20",
            purchaseTime: "14:33",
            items: [
              {
                shortDescription: "Gatorade",
                price: "2.25"
              },{
                shortDescription: "Gatorade",
                price: "2.25"
              },{
                shortDescription: "Gatorade",
                price: "2.25"
              },{
                shortDescription: "Gatorade",
                price: "2.25"
              }
            ],
            total: "9.00"
        };
        const postReceipt = await request(app).post(paths.post).send(body);
        const id = postReceipt.body.id;

        const getPoints = await request(app).get(paths.get.replace('{}', id));
        
        expect(postReceipt.statusCode).toBe(200);
        expect(getPoints.statusCode).toBe(200);
        expect(getPoints.body).toHaveProperty('points');
        expect(getPoints.body.points).toBe(109);
    });
});