const mongoose = require('mongoose')
const address = require('../models/address');

const orderSchema = mongoose.Schema({

    address:{
       type: mongoose.Schema.Types.ObjectId,
       ref:'address'
    },
    createdAt: {
      type: Date,
      default: Date.now()
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
    }]
  });
module.exports = mongoose.model('orders' , orderSchema)