const mongoose = require('mongoose')

const postsSchema = mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref:'myuser'
    },
    createdAt: {
      type: Date,
      default: Date.now()
    },
    context: {
        type: String,
        required: true
    }
  });
module.exports = mongoose.model('posts' , postsSchema)