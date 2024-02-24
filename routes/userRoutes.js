const express = require('express');
const router = express.Router();
const userSchema = require('../models/user');
const bcrypt = require('bcrypt');
const userControllers = require('../controllers/userControllers');
const userController = new userControllers(); 

router.get('/user', userController.validateToken, async (req, res) => {
    let users = await userSchema.find();
    res.json(users)
});

router.get('/user/:id', async (req, res) => {
    var id = req.params.id
    let user = await userSchema.findById(id);
    res.json(user)
});

router.post('/user', async (req, res) => {
    try {
        const existeCorreo = await userSchema.findOne({email: req.body.email});
        if (existeCorreo) {
            return res.status(400).json({ 
                status: "error", 
                message: "El correo ya fue registrado" 
            });
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new userSchema({
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            id: req.body.id,
            password: hashedPassword
        });
        const savedUser = await user.save();
        res.status(200).json(savedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: error.message});
    }
});
  
router.patch('/user/:id', (req, res) => {
    var id = req.params.id
    var updateUsers = {
        name : req.body.name,
        lastname : req.body.lastname,
        email : req.body.email,
        id : req.body.id
    }

    userSchema.findByIdAndUpdate(id, updateUsers, {new: true}).then((result) =>{
        res.send(result)
    }).catch((error) => {
        console,log(error)
        res.send("Error, Actualizando el registro") 
    })
})
 
router.delete('/user/:id', (req, res) => {
    var id = req.params.id;
    userSchema.deleteOne({_id: id}).then(() => {
        res.json({"status": "success", "message": "User delete successfully"})
    }).catch((error) =>{
        console.log(error);
        res.json({"status": "failed", "message": "error deleting User"})
    })
});

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    userController.login(email, password).then((result) => {
        res.send(result);
    })
});

module.exports = router;