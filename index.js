const express = require('express');
const app = express();
const router = express.Router();
const port = 3000;
require('dotenv').config()
const socket = require('socket.io')
const http = require('http').Server(app)
const io = socket(http)
const DB_URL = process.env.DB_URL || '';
const mongoose = require('mongoose');
mongoose.connect(DB_URL)
const userRoutes = require('./routes/userRoutes');
const houseRoutes = require('./routes/houseRoutes');
const chatRoutes = require('./routes/messageRoutes');
const messageSchema = require('./models/message');
router.get('/', (req, res) => {
    res.send("Hello world") 
})

io.on('connect', (socket) => {
    console.log("connected")
    socket.on('message', (data) => {
        var payload = JSON.parse(data)
        console.log(payload)
        messageSchema(payload).save().then((result) => {
            socket.broadcast.emit('message_receipt', payload)
        }).catch((err) => {
            console.log({"status" : "error", "message" :err.message})
        })        
    })

    socket.on('disconnect', (socket) => {
        console.log("disconnect")    
    })
})


app.use(express.urlencoded({extended: true})); 
app.use(express.json());
app.use((req, res, next) => {
    res.io = io
    next()
})
app.use(router)
app.use('/uploads', express.static('uploads'));
app.use('/', userRoutes)
app.use('/', houseRoutes)
app.use('/', chatRoutes)
http.listen(port, () => { 
    console.log('listen on ' + port) 
})  




