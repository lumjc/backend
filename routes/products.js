const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.get('/api/v1/products',(req,res) => {
    res.status(200).json ({
        message:"handling get requests"
    })
})

router.post('/api/v1/products', (req, res) => {
    res.status(200).json ({
        message:'handling POST requests to /products'
    })
})

router.get('/api/v1/products/:productId', (req, res) => {
    const id = req.params.productId
    if (id === 'special') {
        res.status(200).json ({
            message: 'you discovered the special ID',
            id : id
        })
    } else {
        res.status(200).json ({
            message: 'you passed an ID'
        })
    }
})

router.patch('/api/v1/products/:productId', (req, res) => {
    res.status(200).json ({
        message: 'you discovered the special ID',
    })
})

router.delete('/api/v1/products/:productId', (req, res) => {
    res.status(200).json ({
        message: 'Deleted product',
    })
})

module.exports = router