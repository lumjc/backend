const mongoose = require('mongoose')

const productSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    name: {
      type: String,
      required: true
    },
    img:{
        data:Buffer,
        contentType:String
    },
    createdAt: {
      type: Date,
      default: Date.now()
    },
    desc: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true,
        unique: true
    }
  });
module.exports = mongoose.model('products' , productSchema)