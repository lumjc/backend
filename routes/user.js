const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const moment = require("moment");
const {
  registerValidator,
  loginValidator,
  resultsValidator,
} = require("../middleware/express-validator");

router.post("/api/v1/user/signup", registerValidator(), async (req, res) => {
  console.log(req.body);
  const errors = resultsValidator(req);
  if (errors.length > 0) {
    return res.status(400).json({
      method: req.method,
      status: res.statusCode,
      error: errors,
    });
  }
  const { username, email, password, firstName, lastName } = req.body;
  try {
    let user = await User.findOne({
      email,
    });
    if (user) {
      console.log(user);
      return res.status(400).json({
        errorMessage: "User Already Exists",
      });
    } else {
      const newUser = new User({
        _id: new mongoose.Types.ObjectId(),
        firstName,
        lastName,
        username,
        email,
        password,
      });
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(password, salt);
      await newUser.save();
      return res.status(201).json({
        message: "User Successfully Created",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/api/v1/user/login", loginValidator(), async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });
    console.log(req.body.username);

    if (user) {
      let match = await bcrypt.compare(req.body.password, user.password);
      console.log(match);
      if (match) {
        let expiresAt = moment().add(2, "hour").toString();
        // generate the JWT and return as response - (payload, key, optional: expirydate)
        const token = jwt.sign(
          {
            email: req.body.email,
            username: req.body.username,
            userId: user._id,
          },
          process.env.JWT_KEY,
          {
            expiresIn: "2h",
          }
        );

        return res.status(200).json({
          message: "Auth successful",
          token: token,
          expiresAt: expiresAt,
        });
      } else {
        res.status(401).json({
          message: "Auth failed",
        });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:userId", async (req, res, next) => {
  try {
    const newUser = await User.remove({
      _id: req.params.userId,
    });
    res.status(200).json({
      message: "user deleted",
    });
    console.log(newUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;

// router.post('/api/v1/user/signup', (req, res) => {

//     User.find({ email: req.body.email})
//         .exec()
//         .then(user => {
//             if (user.length >= 1) {
//                 return res.status(409).json({
//                     message: 'Email exists'
//                 })
//             } else {
//                 bcrypt.hash(req.body.password, 10, (err,hash) => {
//                     if (err) {
//                         return res.status(500).json ({
//                             error: err
//                         })
//                     } else {
//                         const user = new User ({
//                             _id: new mongoose.Types.ObjectId(),
//                             username: req.body.username,
//                             email: req.body.email,
//                             password: hash
//                         })
//                         user
//                         .save()
//                         .then(result => {
//                             console.log(result)
//                             res.status(201).json({
//                                 message: "user created"
//                             })
//                         })
//                         .catch(err => {
//                             console.log(err)
//                             res.status(500).json ({
//                                 error:err
//                             })
//                         })
//                     }
//                 })

//             }
//         })
// })
<<<<<<< HEAD

router.post('/api/v1/user/login',loginValidator(), async (req, res) => {
    try {
        const user = await User.findOne({
            username: req.body.username
        })
        console.log(req.body.username)
        if (user) {
            let match = await bcrypt.compare(req.body.password, user.password)
            console.log(match);
            if (match) {
           const token = jwt.sign({
                    email: req.body.email,
                    username: req.body.username,
                    userId: user._id
                }, process.env.JWT_KEY,
                {
                    expiresIn: "10h"
                }
            )
                return res.status(200).json ({
                    message: "Auth successful",
                    token: token
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

=======
>>>>>>> 3dd53ea281993858767b132191cb122d900efd08
