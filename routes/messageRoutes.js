const express = require('express');
const router = express.Router();
const messageSchema = require('../models/message');

router.get('/message', async (req, res) => {
    let messages = await messageSchema.find()
        .populate({
            path: 'from',
            select: '-password'})
        .populate({
            path: 'to',
            select: '-password'})
    res.json(messages)
})

router.post('/message', async (req, res) => {
    let user = messageSchema({
        body: req.body.body,
        from: req.body.from,
        to: req.body.to,
        readed: req.body.readed
    })

    user.save().then((result) =>{
        res.send(result)
    }).catch((err) => {
        if (err.code == 11000){
            res.send({"status": "error", "message": "EL correo ya fue registrado"})
        } else {
            res.send({"status": "error", "message": err.message})
        }
    })
    
})

module.exports = router
   