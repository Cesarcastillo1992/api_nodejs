const express = require('express');
const router = express.Router();
const houseSchema = require('../models/house');
const multer = require('multer');


router.post('/house', async (req, res) => {
    let house = houseSchema({
        state: req.body.state,
        city: req.body.city,
    })

    house.save().then((result) => {
        res.send(result)
    }).catch((err) => {        
            res.send({"status" : "error", "message" :err.message})
    })
})

module.exports = router