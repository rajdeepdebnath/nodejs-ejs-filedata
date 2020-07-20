const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const productRouter = require('./routes/product');
const adminRouter = require('./routes/admin');
const cartRouter = require('./routes/cart');

var app = express();

app.use(bodyParser.urlencoded({ extended:false }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use('/product', productRouter);
app.use('/admin', adminRouter);
app.use('/cart', cartRouter);


app.use('/', (req, res, next) => {
    console.log(req.url);
    console.log(req.method);
    res.send('404 url not found');
});

app.listen(3000);