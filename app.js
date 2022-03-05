const express = require('express');
const mongoose = require('mongoose');
const router = require('./router/index')
const bodyParser = require('body-parser')
require('dotenv/config');

const app = express();
app.use(bodyParser.json());
app.use('/', router);
app.listen(3000, () => console.log('loginAuthentication is starting'));

mongoose.connect(process.env.DB_CONNECTION);
mongoose.connection.once('open', function() {
    console.log('Database connected')
}).on('error', function (error) {
    console.log('Failed to connect database', error)
})
