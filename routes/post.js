
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Posts = require('../models/posts');
const checkAuth = require('../middleware/check-auth')

router.post('/api/v1/posts', checkAuth, async (req, res) => {
    try {
    const posts = new Posts({
        _id: new mongoose.Types.ObjectId(),
        userId: req.body.userId,
        content: req.body.content
        })
        const newPosts = await posts.save();
        res.statusCode = 201;
        console.log(newPosts)
        res.json(newPosts)
        
     }  catch(err) {
        console.log(err)
        res.status(500).json(err)
        }
    });


    router.get('/api/v1/posts', async (req, res) => {
           try {
            const returnPosts = await Posts.find({
                userId: req.userData.userId
            })
            res.json(returnPosts)
           } catch (err) {
               console.log(err)
               res.status(500).json(err)
           }
            });

            module.exports = router;
