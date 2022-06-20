const mongoose = require('mongoose');

let modelSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "El nombre del producto es obligatorio"]
    },
    company_id:{
        type: String,
        required: [true, "El id es obligatorio"]
    },
    description: {
        type: String,
        required: [true, "Descripcion obligatioria"]
    },
    image:{
        type: String,
        required: [true, "Imagen obligatoria"]
    },
    company_name: {
        type: String,
        required: [true, "Obligatorio"]
    },
    price: {
        type: Number,
        required: [true, "Obligatorio"]
    },
    stock: {
        type: Number,
        required: [true, "Obligatorio"]
    },
});

let products = mongoose.model('Product', modelSchema);
module.exports = products;