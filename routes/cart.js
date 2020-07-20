const express = require('express');
const fs = require('fs');
const utils = require('../utils');

const router = express.Router();

router.get('/add-to-cart/:product_id', (req, res, next) => {
    fs.readFile(utils.productDataFile, (err, data) => {
        if(err){
            res.send('Error in reading product.json file');
            return;
        }
        else if(data.length == 0){
            res.send('Empty product.json file');
            return;
        }

        var existingProductList = JSON.parse(data);
        var product = existingProductList.filter(p => p.Id == req.params.product_id);
        console.log(product);
        fs.readFile(utils.cartDataFile, (err, data) => {
            if(err || data.length==0){
                let cartItem = {Product_Id:product[0].Id, Quantity:1};
                let cart = {CartItems:[cartItem], TotalPrice:product[0].Price};
                fs.writeFile(utils.cartDataFile, JSON.stringify(cart), () => {
                    res.redirect('/product/list');
                });
            }
            else{
                let existingCart = JSON.parse(data);
                let existingCartItem = existingCart.CartItems.filter(ci => ci.Product_Id==product[0].Id);
                if (existingCartItem){
                    existingCartItem[0].Quantity += 1;
                }
                else{
                    let cartItem = {Product_Id:product[0].Id, Quantity:1};
                    existingCart.CartItems.push(cartItem);
                }
                fs.writeFile(utils.cartDataFile, JSON.stringify(existingCart), () => {
                    res.redirect('/product/list');
                });
            }
        });

    });
});

router.get('/manage', (req,res,next) => {
    fs.readFile(utils.cartDataFile, (err, data) => {
        if(err){
            res.send('Error in reading cart file');
            return;
        }
        let cartData = JSON.parse(data);
        fs.readFile(utils.productDataFile, (err, productData) => {
            if(err){
                res.send('Error in reading product data file');
                return;
            }
            if(data.length == 0){
                res.send('Empty product.json file');
                return;
            }

            cartData.CartItems.forEach(cartItem => {
                let product = JSON.parse(productData).filter(p => p.Id == cartItem.Product_Id)[0];
                cartItem.Product = product;
            });
            
            res.render('cart', {cart:cartData});
        });
    });
});

router.get('/delete-item/:product_id', (req, res, next) => {
    console.log(req.params.product_id);
});

module.exports = router;