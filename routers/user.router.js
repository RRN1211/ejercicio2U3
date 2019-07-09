const router = require('express').Router();

module.exports = (wagner) => {

    const userCtrl = wagner.invoke((User) =>
        require('../controllers/user.controller')(User));

    router.post('/', (req, res) =>
        userCtrl.createUser(req, res));

    router.get('/', (req, res) =>
        userCtrl.findAll(req, res));

    router.get('/login/:email/:password', (req, res) =>
        userCtrl.login(req, res));
    
    router.delete('/:id', (req, res) =>
        userCtrl.deleteByID(req, res));

    return router;
}