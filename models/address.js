const mongoose = require('mongoose');

const addressSchema = mongoose.Schema ({

  addressType:{
      type:String
    },
  city:{
      type:String
    },
  country:{
      type:String
    },
  postalCode:{
      type:Number
    }
})

module.exports = mongoose.model('address' , addressSchema)

