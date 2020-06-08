const db = require('../db');

module.exports = {
    async getAll (options) {
        const admin = await db.admin.find().toArray();
        return admin;
    },
    async addAdmin (admin) {
        const { ops } = await db.admin.insertOne(admin);
        const [newAmin] = ops;
        return newAmin;
    }
}