const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Cart = require('../models/cart');
const saltRounds = 10;

router.get('/', (req, res) => {
  res.send('Users route!');
});

router.post('/login', (req, res) => {
  let data = req.body;
  console.log(data)
  User.find({ email: data.email }).exec((error, user)=>{
    if( error ) res.status(500).json(error);
    bcrypt.compare(data.password, user[0].password, function(err, result) {
        if(result) res.status(200).json(user[0])
        else {
          res.status(500).json(err)
        }
    });
  })
});


router.post('/register', async (req, res) => {
  let data = req.body;
  let response = [];
  bcrypt.hash(data.password, saltRounds, async (err, result) => {
    let user = new User({
      username: data.username,
      email: data.email,
      password: result,
      usertype: 'user'
    })
    user.save((error) => {
      if (error) {
        let keys = Object.keys(error.errors);
        for (let i = 0; i < keys.length; i++) {
          response.push({ "msg": error.errors[keys[i]].message });
        }
        res.status(500).json(response);
      }
      else {
        res.status(200).json(user);
      }
    })
  })
});

module.exports = router;
