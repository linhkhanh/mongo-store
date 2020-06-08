
//////////// CONNECT TO MONGODB ////////
const MongoClient = require('mongodb').MongoClient;
// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'homework';
// Create a new MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true });

module.exports = {
    async connect () {
        await client.connect();
        console.log('Successfully connected to Mongo');
        this.products = client.db(dbName).collection('products');
        this.admin = client.db(dbName).collection('admin');
        this.user = client.db(dbName).collection('user')
    },
    disconnect () {
        return client.close();
    }
};

