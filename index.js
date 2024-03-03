import mongoose from "mongoose"
import router from './router/index.js'
import bodyParser from 'body-parser';
import dotenv from "dotenv"
import express from "express";

dotenv.config()

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
