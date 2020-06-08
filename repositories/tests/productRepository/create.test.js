const productRepository = require('../../../repositories/productRepository');
const db = require('../../../db');
const { expect } = require('chai');

describe('productRepository.create', () => {
    beforeAll(async () => {
        await db.connect();
    });

    afterAll(async () => {
        await db.disconnect();
    });

    it('should be able to create a product and return it', async () => {
        const newProduct = await productRepository.create({
            name: 'Time machine',
        });
        expect(newProduct.name).to.equal('Time machine');
    });
});