const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Company = require('../models/company');

/* GET home page. */
router.get('/', (req, res) => {
  res.status(200).json({'Message': "Api"});
});

//GET all companies
router.get('/companies', (req, res) => {
    Company.find().exec((error, companies) => {
        if (error) res.status(500).json(error);
        res.status(200).json(companies);    
    })
});

//Register new Company
router.post('/companies/new', async (req,res)=>{
    let data = req.body;
    let response = [];
    let company = new Company({
        company_name: data.company_name,
        category: data.category,
        description: data.description,
        logo: data.logo
    });
    company.save((error) =>{
        if (error) {
            let keys = Object.keys(error.errors);
            for (let i = 0; i < keys.length; i++) {
              response.push({ "msg": error.errors[keys[i]].message });
            }
            res.status(500).json(response);
          }
          else {
            res.status(200).json(company);
          }
    })
});

//GET company by id
router.get('/companies/:id', (req, res) => {
    let data = req.params
    Company.findById(data.id).exec((error, companies) => {
        if (error) res.status(500).json(error);
        res.status(200).json(companies);    
    })
});

//GET all products FROM a company
router.get('/company/:id/products', (req, res) => {
    let data = req.params;
    Product.find({company_id : data.id}).exec((error, products) => {
        if (error) res.status(500).json(error);
        console.log(products)
        res.status(200).json(products);    
    })
});

//GET all products
router.get('/products', (req, res) => {
    Product.find().exec((error, products) => {
        if (error) res.status(500).json(error);
        res.status(200).json(products);    
    })
});

//GET product by id
router.get('/products/:id', (req, res) => {
    let data = req.params
    Product.findById(data.id).exec((error, products) => {
        if (error) res.status(500).json(error);
        res.status(200).json(products);    
    })
});


//Register new Product
router.post('/products/new', async (req,res)=>{
    let data = req.body;
    let _company;
    let response = [];
    await Company.findById(data.company_id).exec((error, company)=>{
        _company = company;
        let product = new Product({
            name : data.name,
            image: data.image,
            company_id : _company.id,
            description: data.description,
            company_name: _company.company_name,
            price: parseInt(data.price),
            stock: parseInt(data.stock)
        });
        product.save((error) =>{
            if (error) {
                let keys = Object.keys(error.errors);
                for (let i = 0; i < keys.length; i++) {
                  response.push({ "msg": error.errors[keys[i]].message });
                }
                res.status(500).json(response);
              }
              else {
                res.status(200).json(product);
              }
        })
    })
});

module.exports = router;
