const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Company = require('../models/company');
const Cart = require('../models/cart');

/* GET home page. */
router.get('/:id', async (req, res) => {
    let data = req.params;
    Cart.find({user_id: data.id}).exec(async(error, cart)=>{
        if(error) res.status(500).json(error);
        else{
            res.status(200).json(cart);
        }
    })
});

//Register new Product
router.post('/addProduct/:id', async (req,res)=>{
    let data = req.body;
    let params = req.params;
    console.log(data)
    Cart.find({user_id: params.id, product_id: data._id}).exec((error, cart)=>{
        if(error) console.log(error)
        else if(cart.length > 0){
            let new_cart = {
                user_id: params.id,
                product: data,
                amount: cart[0].amount + 1
            }
            Cart.findByIdAndUpdate(cart[0]._id, new_cart).exec((error, response)=>{
                if(error) console.log(error);
                res.status(200).json(response);
            });
        }
        else{
            let new_cart = new Cart({
                user_id: params.id,
                product: data,
                amount: 1
            })
            new_cart.save((error)=>{
                if(error) console.log(error)
                res.status(200).json(cart);
            })
        }
    })
});

router.get('/empty/:id', (req,res) => {
    let params = req.params;
    Cart.deleteMany({user_id: params.id}).exec((error, result)=>{
        if(error) res.status(500).json(error)
        res.status(200).json(result)
    })
});

module.exports = router;