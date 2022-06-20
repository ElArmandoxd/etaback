const mongoose = require('mongoose');

let modelSchema = mongoose.Schema({
    company_name: {
        type: String,
        required: [true, "El nombre de la empresa es obligatorio"]
    },
    category:{
        type: String,
        required: [true, "Categoria obligatoria"]
    },
    description: {
        type: String,
        required: [true, "Descripcion obligatoria"]
    },
    logo: {
        type: String,
        required: [true, "Logo obligatorio"]
    }
});

let companies = mongoose.model('Company', modelSchema);
module.exports = companies;