const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        validate: {
            validator: function(name) {
              return /^[a-zA-Z\s]*$/.test(name);
            },
            message: props => `${props.value} no es un nombre válido!`
        }
    },
    lastname: {
        type: String,
        required: true,
        validate: {
            validator: function(lastname) {
              return /^[a-zA-Z\s]*$/.test(lastname);
            },
            message: props => `${props.value} no es un nombre válido!`
        }
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String
    }
}); 

module.exports = mongoose.model('user', userSchema);