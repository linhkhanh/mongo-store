
const { productController, adminController, userController} = require('./controllers');
// const httpResponseFormatter = require('./formatters/httpResponseFormatter');

const productRepository = require('./repositories/productRepository');
module.exports = (app) => {
    app.get('/', (req, res) => res.redirect('/products')); 
    app.get('/login', productController.login ); //log in to be able to  edit/delte/create product
    app.get('/logout', adminController.logOut); //log out
    app.get('/products', productController.getAll); // show all products
    app.get('/cart', userController.cart); // see user's cart
    app.get('/orders', adminController.seeOrder); // see all orders (only admin can see)
    app.get('/user/buy', userController.confirmPage);
    app.get('/products/new', productController.create); // show form create new product page
    app.get('/api/products', async (req, res) => { 

        res.json({
            status: 'ok',
            data: await productController.getAll(),
        })
        // httpResponseFormatter.formatOkResponse(req, res);
    });
    app.get('/products/:id', productController.getOne); // show product page
    app.get('/products/:id/edit', productController.edit); // edit product page
    app.post('/login_submit', adminController.loginSubmit); // login 
    app.post('/products/new_submit', productController.addOne); // add new product to mongodb
    app.put('/user/buy', userController.buyProduct); // buy Product
    app.put('/products/:id', productController.updateOne); // update information of product
    app.put('/products/:id/buy', productController.buyOne); // buy function, update data in mongodb
    app.post('/products/:id/add', userController.addProduct ); // add product to your cart
    app.delete('/products/:id', productController.deleteOne); // delete 1 product in mongodb


};