const mongoose = require('mongoose');

const commentSchema = mongoose.Schema ({

  postId:{
      type:String,
      required: true,
      ref:'posts'
    },
  content:{
      type:String,
      required: true
    },
  userId:{
      type:String,
      required: true
    },
})

module.exports = mongoose.model('comment' , commentSchema)