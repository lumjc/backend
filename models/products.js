const mongoose = require('mongoose')

const productSchema = mongoose.Schema({

    name: {
      type: String,
      required: true
    },
    image:{
        data:Buffer,
        contentType:String
    },
    createdAt: {
      type: Date,
      default: Date.now()
    },
    userId: {
      type: String,
    },
    desc: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true,
        unique: true
    },
    cloudinary_id: {
      type:String,
    }

  });
module.exports = mongoose.model('products' , productSchema)