const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');

const utils = require('../utils');

const router = express.Router();

router.get('/add-product', (req, res, next) => {
    res.render('add-product');
});

router.post('/add-product', (req, res, next) => {
    console.log(req.body.productname)
    var newProduct = {Id:uuid.v4(),ProductName:req.body.productname, Price:req.body.price,
    Description:req.body.description};
    let newProductList = [];
    fs.readFile(utils.productDataFile, (err, data) => {
        if(err){
            //console.log(err);
            res.send('Error in reading product.json file');
            return;
        }
        else if (data.length > 0){
            var existingProductList = JSON.parse(data);
            newProductList = [...existingProductList, newProduct];
        }
        else{
            newProductList = [newProduct];
        }

        fs.writeFile(utils.productDataFile
        , JSON.stringify(newProductList), () => {
            res.redirect('/product/list');
        });
    });

    
});

module.exports = router;