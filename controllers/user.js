const { userRepository, productRepository } = require('../repositories');
const getId = (req) => {
    const name = req.params.id.replace("%20", " ");
    const option = { name };
    return option;
}

module.exports = {
    cart(req, res) {
        if (!req.session.name) {
            const cart = req.session.cart;
            let sum = 0;
            for(let key in cart) {
                sum += cart[key].price * cart[key].qty
            }
            req.session.sum = sum;
            res.render('cart.ejs', { cart, sum, index: 1});
        } else {
            res.send('You have to log out to buy product!!');
        }
    },
    async addProduct(req, res) {
        const id = getId(req);
        const product = await productRepository.getOne(id);
        const name = product.name;
        const price = product.price;

        // add product to object req.session.cart
        if (req.session.cart) {
            if (req.session.cart[name]) {
                req.session.cart[name].qty++
            }
            else {
                req.session.cart[name] = {
                    qty: 1,
                    price: price
                };
            }
        } else {
            req.session.cart = {};
            req.session.cart[name] = {
                qty: 1,
                price: price
            }
        }

        // count products
        req.session.count = 0;
        for(key in req.session.cart) {
            req.session.count += req.session.cart[key].qty;     
        }
        res.redirect(`/products/${req.params.id}`);
    },
    confirmPage(req, res) {
        req.session.name ? res.send('You have to log out to buy product !') : res.render('confirm.ejs', { cart: req.session.cart, sum: req.session.sum, index: 1});
    },
    async buyProduct(req, res) {
        const cart = req.session.cart;

        // define order of user 
        const order = {
            'name': req.body.name,
            'address': req.body.address,
            'products': {},
            'total': req.session.sum
        };

        for (let key in cart) {
            const option = { name: key };

            // update quantity of each product
            const product = await productRepository.getOne(option);
            await productRepository.update(option, { qty: product.qty - cart[key].qty });

            // add product to user's order
            order.products[key] = cart[key].qty;
        }
        console.log(order);
        // add user's order to db.user
        await userRepository.addOne(order);

        req.session.destroy((err) => {
            if (err) {
                return console.log(err);
            }
            res.redirect('/user/buy');
        })
    }
}