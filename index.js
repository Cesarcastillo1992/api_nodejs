const express = require('express');
const app = express();
const router = express.Router();
const port = 3000;
require('dotenv').config()

const DB_URL = process.env.DB_URL || '';

const mongoose = require('mongoose');
mongoose.connect(DB_URL)

const userRoutes = require('./routes/userRoutes');

app.use(express.urlencoded({extended: true})); 
app.use(express.json());

app.use(router)
app.use('/', userRoutes)
app.listen(port, () => { 
    console.log('listen on ' + port) 
})  




