const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser')
const Products = require('../models/products');
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null,'./uploads/')
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString().split('T') + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === ' image/png') {
    cb(null, false)
} else {
    cb(null, true) 
    } 
}
const upload = multer ({storage : storage, limits: {
    fileSize: 1024 * 1024 * 5
},  
    fileFilter: fileFilter
})


// all products
router.get('/api/v1/products', async (req, res) => {
    
    try {
      const newProduct = await Product.find({
        name: req.body.name,
        desc: req.body.desc,
        weight: req.body.weight,
        productImage: req.file.path
      })
      console.log(newProduct)
      res.status(200).json(newProduct)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
});


// create a breakup product
router.post('/api/v1/products',upload.single('productImage'), async (req, res, next) => {
    try {
    const products = new Products ({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        desc: req.body.desc,
        weight: req.body.weight,
        productImage: req.file.path
    })
    const newProducts = await products.save()
    console.log(newProducts)
    res.status(201).json({
        message: "created product successfully"
    })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})
    
router.get('/api/v1/products/:productId', async (req, res,) => {
    try{
        const id = req.params.productId
      const newProducts = await Products.findById(id)
      res.json(newProducts)
        res.status(200).json()
    } catch (err) {
        console.log(err)
        res.status(500).json({error : err})
    }
   
})

// edit productID
router.patch('/api/v1/products/:productId', async (req, res) => {
    try {
        const id = req.params.productId
        const updateOps ={};
        for (const ops of req.body) {
            updateOps[ops.propName] = ops.value
        }
        const newProduct = await Product.update({_id: id}, {$set: updateOps})
        res.status(200).json(newProduct)

    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.delete('/api/v1/products/:productId', async (req, res) => {
    try{
        const id = req.params.productId
        const deleteProduct = await Product.Remove({_id: id})
        res.status(200).json(deleteProduct)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
   
})

module.exports = router