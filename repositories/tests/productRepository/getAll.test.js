const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');
const db = require('../../db');
const { expect } = chai;
chai.use(chaiHttp);

describe('GET /api/products', () => {
    beforeAll(async () => {
        await db.connect();
    });

    afterAll(async () => {
        await db.disconnect();
    });

    it('should return an array', async () => {
        const response = await chai.request(server)
            .get('/api/products');
        expect(response.body.status).to.be.equal('ok');
    });
})