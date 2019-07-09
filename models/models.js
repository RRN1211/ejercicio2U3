const mongoose = require('mongoose');
const _ = require('underscore');
const config = require('../_config');

module.exports = (wagner) => {
    mongoose.Promise = global.Promise;
    mongoose.connect(`mongodb://localhost:27017/${config.DB}`, 
    { useNewUrlParser: true });
    
    wagner.factory('db',()=>mongoose);
    const User = require('./user.model');
    const Brand = require('./brand.model');

    const models = {
        User,
        Brand
    };

    _.each(models,(v, k) => {
        wagner.factory(k, ()=>v);
    });

}