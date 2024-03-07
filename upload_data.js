const xlsx = require('xlsx'); 
require('dotenv').config() 
const bcrypt = require('bcrypt'); 

const DB_URL = process.env.DB_URL || ''; 
const mongoose = require('mongoose'); 
mongoose.connect(DB_URL) 
const userSchema = require('./models/user'); 

const workbook = xlsx.readFile('datos.xlsx') 
const sheet_list = workbook.SheetNames 
const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_list[0]]) 

for(const user of data){
    user.email = user.email.trim().toLowerCase()
    const hashedPassword = bcrypt.hashSync(user.password, 10)
    user.password = hashedPassword

    userSchema({
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        id: user.id,
        password: hashedPassword
    }).save().then((result) => {
        console.log("Usuario subido:", user.name)
    }).catch((err) => {
        console.log("Error subiendo el usuario", user.name)
    })
} 