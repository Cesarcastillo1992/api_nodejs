const bcrypt = require('bcrypt');
const userSchema = require('../models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()

class userControllers{
    constructor(){
        var JWT_SECRET = process.env.JWT_SECRET || '';
    }

    async login(email, password){
        try {
            const user = await userSchema.findOne({email});
            if(!user){
                return({"status" : "error", "message" : "El usuario no existe"})
            }
            const passwordMatch = await bcrypt.compare(password, user.password)
            if(!passwordMatch){
                return({"status" : "error", "message" : "la contraseña no coincide"})
            }
            const token = jwt.sign({userId: user._id, email: user.email}, JWT_SECRET, {expiresIn: '1h'})
            return {"status" : "success", "token": token}

        } catch (error) {
            console.log(error)
            return({"status" : "error", "message" : "Error al iniciar sesion"})
        }
    }

    validateToken(req, res, next) {
        const bearerToken = req.headers['authorization']
        if(!bearerToken){
            return res.status(401).json({ "message": "Token no existente"});
        }

        const token = bearerToken.startsWith("Bearer ") ? bearerToken.slice(7) : bearerToken;
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if(err){
                return res.status(401).json({ "message": "Token invalido"}); 
            }
            req.userId = decoded.userId;
            next();
        })   
    }
}

module.exports = userControllers 