const productRepository = require('../productRepository');
const db = require('../../db');
const { expect } = require('chai');

describe('productRepository.delete', () => {
    beforeAll(async () => {
        await db.connect();
    });

    afterAll(async () => {
        await db.disconnect();
    });

    it('should delete a product, name time machine', async () => {
        const result = await productRepository.delete({name: 'Time machine'});
        expect(result).to.equal(1);
    });
    // it('can not update product name chicken, qty 20', async () => {
    //     const result = await productRepository.update({
    //         name: 'chicken'
    //     }, {
    //         qty: 20
    //     });
    //     expect(result).to.equal(0);
    // })
});