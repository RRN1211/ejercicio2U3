const router = require('express').Router();

module.exports = (wagner) => {
    
    const brandCtrl = wagner.invoke((Brand) => 
        require('../controllers/brand.controller')(Brand));

    router.post('/', (req, res)=>
        brandCtrl.createBrand(req, res));

    router.get('/',(req, res)=>
        brandCtrl.findAllB(req, res));

    router.get('/:id',(req, res)=>
        brandCtrl.findUneB(req, res));
    
    router.delete('/:id',(req, res)=>
        brandCtrl.deleteByIDB(req, res));

    router.put('/:id',(req, res)=>
        brandCtrl.updateByIdB(req, res));
    return router;
}