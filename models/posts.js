const mongoose = require('mongoose')

const postsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,

    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now()
    },
    description: {
        type: String,
        required: true
    }
  });
module.exports = mongoose.model('posts' , postsSchema)