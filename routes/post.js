
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Posts = require('../models/posts');
const checkAuth = require('../middleware/check-auth')
const User = require('../models/user')

router.post('/api/v1/posts', checkAuth, async (req, res) => {
    try {
        const posts = new Posts({
        user: req.userData.userId,
        context: req.body.context
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


    router.get('/api/v1/posts', checkAuth, async (req, res) => {
           try {
            const returnUser = await User.findOne({
                username: req.userData.username
            })
            const returnPosts = await Posts.find({
                user: returnUser._id
            }).populate('user')
            res.json(returnPosts)
           } catch (err) {
               console.log(err)
               res.status(500).json(err)
           }
            });

            module.exports = router;
