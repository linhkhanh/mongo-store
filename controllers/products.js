const productRepository = require('../repositories/productRepository');
const getId = (req) => {
    const name = req.params.id.replace("%20", " ");
    const option = { name };
    return option;
}
module.exports = {
    async getAll(req, res) {
        const products = await productRepository.getAll();
        return res.render('index.ejs', { data: products, admin: req.session.name, count: req.session.count });
    },
    create(req, res) {
        if (req.session.name) return res.render('new.ejs', { admin: req.session.name });
    },
    async getOne(req, res) {
        try {
            const option = getId(req);
            const product = await productRepository.getOne(option);
            return res.render('show.ejs', { product, admin: req.session.name, count: req.session.count });
        } catch (err) {
            return res.send('err happened: ', err.message);
        }
    },
    async addOne(req, res) {
        try {
            const data = {
                'name': req.body.name,
                'description': req.body.description,
                'img': req.body.img,
                'price': parseInt(req.body.price),
                'qty': parseInt(req.body.qty)
            }
            await productRepository.create(data);
            return res.redirect('/products');
        } catch {
            return res.send(err.message);
        }

    },
    async edit(req, res) {
        if (req.session.name) {
            try {
                const option = getId(req);
                const product = await productRepository.getOne(option);
                return res.render('edit.ejs', { product, admin: req.session.name });
            } catch (err) {
                return res.send('err happened: ', err.message);
            }
        }
    },
    async updateOne(req, res) {
        try {
            const id = getId(req);
            const data = {
                'name': req.body.name,
                'description': req.body.description,
                'img': req.body.img,
                'price': parseInt(req.body.price),
                'qty': parseInt(req.body.qty)
            }
            await productRepository.update(id, data);
            return res.redirect(`/products/${req.body.name}`);
        } catch {
            return res.send('err happened: ', err.message);
        }
        
    },
    async deleteOne(req, res) {
        try {
            const id = getId(req);
            await productRepository.delete(id);
            return res.redirect('/products');
        } catch {
            return res.send('err happened: ', err.message);
        }
    },
    async buyOne(req, res) {
        try {
            const id = getId(req);
            const product = await productRepository.getOne(id);
            const data = { qty: product.qty - 1 };
            await productRepository.update(id, data);
            res.redirect(`/products/${product.name}`);
        } catch (err) {
            res.send('err happened: ', err.message);
        }
    },
    login(req, res) {
        res.render('login.ejs', { admin: req.session.name })
    }

};


