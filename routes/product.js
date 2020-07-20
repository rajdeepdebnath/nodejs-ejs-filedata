const express = require('express');
const path = require('path');
const fs = require('fs');
const utils = require('../utils');

const router = express.Router();

router.get('/list', (req, res, next) => {
    //get all products
    fs.readFile(utils.productDataFile, (err, data) => {
        console.log(data.length);
        if(err){
            res.send('Error reading file product.json');
            return;
        }
        else if(data.length == 0){
            res.render('product-list', {products:[]});
            return;
        }

        res.render('product-list', {products:JSON.parse(data)});
    });
    //res.send('product-list');
});

router.get('/details/:product_id', (req, res, next) => {
    //get one products detail
    fs.readFile(utils.productDataFile, (err, data) => {
        if(err){
            res.send('Error is reading product.json file');
            return;
        }

        var existingproductList = JSON.parse(data);
        var product = existingproductList.filter(p => p.Id == req.params.product_id);
        res.render('product-details', { product:product[0] });
        return;
    });
});

module.exports = router;