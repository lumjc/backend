const mongoose = require('mongoose')

const postsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now()
    },
    content: {
        type: String,
        required: true
    }
  });
module.exports = mongoose.model('posts' , postsSchema)