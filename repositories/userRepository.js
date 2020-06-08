const db = require('../db');

module.exports = {
    async addOne (item) {
        try {
            return await db.user.insertOne(item);
        } catch (err) {
            throw new Error(`Due to ${err.message}, you are not allowed to insert this item ${JSON.stringify(item)}`);
        }
    }
}