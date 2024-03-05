const express = require('express');
const router = express.Router();
const houseSchema = require('../models/house');
const multer = require('multer');


router.post('/house', async (req, res) => {
    let house = houseSchema({
        id: req.body.id,
        address: req.body.address,
        size: req.body.size,
        type: req.body.type,
        zip_code: req.body.zip_code,
        code: req.body.code,
        rooms: req.body.rooms,
        bathrooms: req.body.bathrooms,
        price: req.body.price,
        image: req.body.image,
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