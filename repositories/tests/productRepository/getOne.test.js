const productRepository = require('../../../repositories/productRepository');
const db = require('../../../db');
const { expect } = require('chai');

describe('productRepository.getOne', () => {
    beforeAll(async () => {
        await db.connect();
    });

    afterAll(async () => {
        await db.disconnect();
    });

    it('should return a product and name time machine', async () => {
        const product = await productRepository.getOne({
            name: 'Time machine',
        });
        expect(product.name).to.equal('Time machine');
    });
    it('can not find a product name box', async () => {
        try {
            const product = await productRepository.getOne({
                name: 'box',
            });
        } catch (err) {
            console.log(err);
        }
    })
});