const mongoose = require('mongoose');

let modelSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "El nombre del usuario es obligatorio"]
    },
    email:{
        type: String,
        required: [true, "El correo electronico es obligatorio"]
    },
    password:{
        type: String,
        required: [true, "Contraseña obligatioria"]
    },
    usertype: {
        type: String,
        required: [true, "Obligatorio"]
    },
});

let usuarios = mongoose.model('Users', modelSchema);
module.exports = usuarios;