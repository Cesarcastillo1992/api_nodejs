const express = require('express');
const router = express.Router();
const houseSchema = require('../models/house');
const multer = require('multer');

router.get("/house", async (req, res) => {
    try {
        let houses = await houseSchema.find();
        res.send(houses);
    } catch (error) {
        res.send({ status: "error", message: error.message });
    }
});

router.get("/house/:id", async (req, res) => {
    try {
        let house = await houseSchema.findById(req.params.id);
        res.send(house);
    } catch (error) {
        res.send({ status: "error", message: error.message });
    }
});

router.post("/house", (req, res) => {
    let addHouse = houseSchema({
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        size: req.body.size,
        type: req.body.type,
        zipCode: req.body.zipCode,
        rooms: req.body.rooms,
        bathrooms: req.body.bathrooms,
        parking: req.body.parking,
        price: req.body.price,
        code: req.body.code.toUpperCase(),
    });
    addHouse.save().then((result) => {
        res.send(result);
    }).catch((error) => {
        console.log(`Este es el valor de error ${error}`);
        res.send({ Status: "error", Message: error.errors.code.message });
    });
});

router.put("/house/:id", (req, res) => {
    let id = req.params.id;
    let updateHouse = {
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        size: req.body.size,
        type: req.body.type,
        zipCode: req.body.zipCode,
        rooms: req.body.rooms,
        bathrooms: req.body.bathrooms,
        parking: req.body.parking,
        price: req.body.price,
        code: req.body.code,
    };

    houseSchema.findByIdAndUpdate(id, updateHouse, {new : true}).then(result => {
        console.log(result);
        res.send(result);
    }).catch((error) =>{
        res.send(error);
    })
});

router.delete("/house/:id", (req, res) => {
    let id = req.params.id;
    houseSchema.deleteOne({id : _id}).then(() => {
        res.json({"status" : "success", "message" : "House deleted successfully"});                
    }).catch((error) => {
        console.log(error);
        res.json({"status" : "error", "message" : "Error deleting house"});
    })
});

const storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, "NodeJS/houseUploads/");
    },
    filename : function(req, file, cb){
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if( file.mimetype.startsWith('image/')){
        cb(null, true);
    }else{
        cb(null, false);
    }
};

const upload = multer({
    storage : storage,
    fileFilter : fileFilter
});

router.post('/upload/:id/house', upload.single('file'), (req, res) => {
    if(!req.file){
        return res.status(400).send({"Status" : "Error", "Message" : "No file provided"});
    }
    let _id = req.params.id;
    let updateHouse = {
        image : req.file.path
    }
    houseSchema.findByIdAndUpdate(_id, updateHouse, {new : true}).then(result => {
        res.send({"Status" : "Success", "Message" : "Image upload successfully" })
    }).catch((error) =>{
        res.send({"status" : "error", "message" : error.message});
    })

});

module.exports = router;