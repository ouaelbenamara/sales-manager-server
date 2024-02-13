const express = require('express');
require('dotenv').config();
const http = require('http');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT;

const userRoute = require('./routes/User');
const productRoute = require('./routes/Product');
const db = require('./config/connection');
const cookieParser = require('cookie-parser');


app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.listen(PORT, () => {
    console.log('server running on port ', PORT)
})
app.use('/home', (req, res) => {
    res.send('Home Page');
});
app.use('/product', productRoute);

app.use('/user', userRoute);

app.all('/*', (req, res) => {
    res.status(404).send('<h1> 404 Error page not found</h1>');
});


