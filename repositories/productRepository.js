const db = require('../db');

module.exports = {
    getAll() {
        return db.products.find().toArray();
    },
    insertMany(items) {
        return db.products.insertMany(items);
    },
    async create(data) {
        const { ops } = await db.products.insertOne(data);
        const [newProduct] = ops;
        console.log(ops);
        return newProduct;
    },
    async update(id, data) {
        const product = await db.products.updateOne(
            id,
            { $set: data }
        );
        const { result } = product;
        console.log(result);
        if (result.n === 0) throw new Error('This product is not exist');
        return result.n;
    },
    async getOne(options) {
        const product = await db.products.findOne(options);
        if (!product) throw new Error('That product does not exist!');
        return product;
    },
    async delete(id) {
        const { result } = await db.products.deleteOne(id);
        if (!result.n) throw new Error(`Product with id ${id.name} does not exist!`);
        return result.n;
    }
};