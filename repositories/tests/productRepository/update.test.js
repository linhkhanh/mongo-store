const productRepository = require('../../../repositories/productRepository');
const db = require('../../../db');
const { expect } = require('chai');

describe('productRepository.update', () => {
    beforeAll(async () => {
        await db.connect();
    });

    afterAll(async () => {
        await db.disconnect();
    });

    it('should update information of existing-product ', async () => {
        const result = await productRepository.update({name: 'Time machine'}, {price: 3000});
        expect(result).to.equal(1);
    });
    it('can not update non-existing-product ', async () => {
        try {
            const result = await productRepository.update({
                name: 'chicken'
            }, {
                qty: 20
            });
        } catch (err ) {
           expect(err.message).to.be.an('string');
        }
    })
});