const express = require('express');
require('dotenv').config();
const http = require('http');
const cors = require('cors');
const path = require("path");

const app = express();

const PORT = process.env.PORT;
const {getProducts} = require('./models/Product')
const userRoute = require('./routes/User');
const {cleanDb} = require('./lib/utils')
const productRoute = require('./routes/Product');
const saleRoute = require('./routes/Sale');
const db = require('./config/connection');
const cookieParser = require('cookie-parser');
// Define the interval (5 hours in milliseconds)
const interval = 5 * 60 * 1 * 1000;

// Set up the recurring task using setInterval
setInterval(() => {
    console.log('Running cleanDb...');
    // Call the cleanDb function with your getProducts implementation
    cleanDb(getProducts);
}, interval);
app.use(cors());
app.use(express.json());
app.use(cookieParser());
console.log(__dirname);
app.use('/db', express.static(path.join(__dirname, 'db')));

db.once('open', function () {

    console.log('Connected to MongoDB!');
    app.listen(PORT, () => {
        console.log('server running on port ', PORT);
    });
});


app.get('/', (req, res) => {
    res.redirect('/user');
});
app.use('/product', productRoute);
app.use('/sale', saleRoute);
app.use('/user', userRoute);


app.all('/*', (req, res) => {
    res.status(404).send('<h1> 404 Error page not found</h1>');
});
