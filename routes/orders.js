const express = require("express");
const mongoose = require("mongoose");

const Address = require("../models/address");
const router = express.Router();
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

module.exports = router;
