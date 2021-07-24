const express = require ('express');
const router = express.Router();
const mongoose  = require('mongoose');
const checkAuth = require('../middleware/check-auth');
const Comments = require('../models/comments');

router.post('/api/v1/posts/:postId/comments' , checkAuth, async (req, res) => {
    try {
        const comments = new Comments ({
           postId: req.params.postId,
           context: req.body.context,
           userId : req.userData.userId
        })
        const newComments = await comments.save()
        res.statusCode = 201;
        console.log(newComments)
        res.json(newComments)
    } catch(err) {
    console.log(err)
    res.status(500).json(err)
    }
})

router.get('/api/v1/posts/:postId/comments' , checkAuth, async (req,res) => {
    try {
        const returnComments = await Comments.find({
            postId : req.params.postId
        }).populate('userId').populate('postId')
        res.json(returnComments)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

module.exports = router;