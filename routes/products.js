const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const cloudinary = require("../utility/cloudinary")
const upload = require("../utility/multer")
const Products = require('../models/products');



// all products
router.get('/api/v1/products', async (req, res) => {
    try {
      const newProduct = await Product.find({
          userId: req.userData.userId
      })
      console.log(newProduct)
      res.status(200).json(newProduct)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
});


// create a breakup product
router.post('/api/v1/products', upload.single('image'), async (req, res,) => {
    try {
        // upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path)
    const products = new Products ({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        desc: req.body.desc,
        weight: req.body.weight,
        image: result.secure_url,
        cloudinary_id: result.public_id
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

// find product 
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
        const updateOps = {};
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
        const deleteProduct = await Products.remove({_id: id})
        res.status(200).json(deleteProduct)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
   
})

module.exports = router