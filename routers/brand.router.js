const router = require('express').Router();

module.exports = (wagner) => {

    const brandCtrl = wagner.invoke((Brand) =>
        require('../controllers/brand.controller')(Brand));

    return router;
}