const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcrypt')

const User = require ('../models/user');
const user = require('../models/user');
router.post('/api/v1/user/signup', (req, res,next) => { 

    User.find({ email: req.body.email})
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: 'Email exists'
                })
            } else {
                bcrypt.hash(req.body.password, 10, (err,hash) => {
                    if (err) {
                        return res.status(500).json ({
                            error: err
                        })
                    } else {
                        const user = new User ({
                            _id: new mongoose.Types.ObjectId(),
                            username: req.body.username,
                            email: req.body.email,
                            password: hash
                        })
                        user
                        .save()
                        .then(result => {
                            console.log(result)
                            res.status(201).json({
                                message: "user created"
                            })
                        })
                        .catch(err => {
                            console.log(err)
                            res.status(500).json ({
                                error:err
                            })
                        })
                    }
                })

            }
        })
})

router.post('/api/v1/user/login' , async (req, res, next) => {
    try {
        const user = await User.findOne({
            email: req.body.email
        })

        console.log(req.body.password);
        console.log(user.password);

        if (user) {
            let match = await bcrypt.compare(req.body.password, user.password)
            console.log(match);
            if (match) {
                return res.status(200).json ({
                    message: "Auth successful"
                })
            } else {
                res.status(401).json ({
                    message:'Auth failed'
                })
            }
        }
        
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
    
})

router.delete('/:userId' , async (req, res, next) => {
    try {
        const newUser = await User.remove({
            _id: req.params.userId
        })
        res.status(200).json({
            message: "user deleted"
        })
        console.log(newUser)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

module.exports = router;

