const mongoose = require('mongoose');

const commentSchema = mongoose.Schema ({

  postId:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref:'posts'
    },
  context:{
      type:String,
      required: true
    },
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:'myuser'
    },
})

module.exports = mongoose.model('comment' , commentSchema)