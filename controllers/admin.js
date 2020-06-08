const { adminRepository } = require('../repositories');
const db = require('../db');
module.exports = {
    async loginSubmit(req, res) {
        const admin = await adminRepository.getAll();
        const isExistAdmin = (item) => {
            return item.email == req.body.email && item.password == req.body.password
        }
        let result = admin.some(isExistAdmin);
        if(result) {
            req.session.name = 'admin';
            res.redirect('/');
        } else {
            res.redirect('/login');
        } 
    },
    logOut (req, res) {
        req.session.destroy((err) => {
            if (err) {
                return console.log(err);
            }
            res.redirect('/');
        })
    },
    async seeOrder (req, res) {
        if(req.session.name)  {
            const orders = await db.user.find().toArray();
            res.render('orders.ejs', {orders});
        } else {
            res.send('You have to log in to see all orders.');
        } 
    }
}