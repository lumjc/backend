const express = require("express");
const mongoose = require("mongoose");

const Address = require("../models/address");
const router = express.Router();
<<<<<<< HEAD
const Orders = require('../models/orders');
const checkAuth = require('../middleware/check-auth');

router.get('/api/v1/orders', checkAuth, async (req,res) =>{
    try {
        const newOrder = await Orders.find().populate('address').populate('products')
        res.status(200).json(newOrder)
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.post('/api/v1/orders',checkAuth,async (req,res) =>{
    try{
        const address = new Address ({
            addressType: req.body.addressType,
            postalCode: req.body.postalCode,
            city: req.body.city,
            country:req.body.country
        })
        const newAddress = await address.save()
=======
const Orders = require("../models/orders");
const checkAuth = require("../middleware/check-auth");

router.get("/api/v1/orders", async (req, res) => {
  try {
    const newOrder = await Orders.find()
      .populate("address")
      .populate("products");
    res.status(200).json(newOrder);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/api/v1/orders", async (req, res) => {
  try {
    const address = new Address({
      addressType: req.body.addressType,
      postalCode: req.body.postalCode,
      city: req.body.city,
      country: req.body.country,
    });
    const newAddress = await address.save();

    const orders = new Orders({
      address: newAddress,
      products: req.body.product_id,
    }).populate("user");
    console.log(orders);
    console.log(req.body.product_id);
    const newOrders = await orders.save();
    console.log(newOrders);
    res.status(201).json({
      message: "created order successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
>>>>>>> 3dd53ea281993858767b132191cb122d900efd08

// create new empty order
router.post("/api/v1/new-order", checkAuth, async (req, res) => {
  try {
    const order = new Orders({
      _id: new mongoose.Types.ObjectId(),
      userId: req.userData.userId,
    });
    const newEmptyOrder = await order.save();
    console.log(newEmptyOrder);
    res.status(201).json({
      message: "created empty order successfully",
      orderID: newEmptyOrder._id,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

<<<<<<< HEAD
// find orders
router.get('/api/v1/orders/:orderId', async (req, res,) => {
    try{
        const id = req.params.orderId
      const newOrders = await Orders.findById(id)
      res.json(newOrders)
        res.status(200).json()
    } catch (err) {
        console.log(err)
        res.status(500).json({error : err})
    }
   
})

router.delete('/api/v1/orders/:orderId', async (req, res) => {
    try{
        const id = req.params.orderId
        const deleteOrder = await Orders.remove({_id: id})
        res.status(200).json(deleteOrder)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
   
})
module.exports = router
=======
module.exports = router;
>>>>>>> 3dd53ea281993858767b132191cb122d900efd08
