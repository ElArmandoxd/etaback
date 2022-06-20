const mongoose = require('mongoose');

let modelSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: [true, "id obligatorio"]
    },
    product: {},
    amount: {
        type : Number,
        required: [true, "cantidad de productos"]
    }
});

let carts = mongoose.model('Cart', modelSchema);
module.exports = carts;