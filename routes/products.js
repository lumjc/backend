const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("../utility/cloudinary");
const upload = require("../utility/multer");
const checkAuth = require("../middleware/check-auth");
const Products = require("../models/products");

// get all products
router.get("/api/v1/products", checkAuth, async (req, res) => {
  try {
    const newProduct = await Products.find({
      userId: req.userData.userId, //given by JWT decoded token, it means user need to login first, decode their token and pass the userId
    });
    console.log(newProduct);
    res.status(200).json(newProduct);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// create a breakup product
router.post(
  "/api/v1/products",
  checkAuth,
  upload.single("file"),
  async (req, res) => {
    try {
      // upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      const products = new Products({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        desc: req.body.desc,
        weight: req.body.weight,
        image: result.secure_url,
        cloudinary_id: result.public_id,
        userId: req.userData.userId,
      });
      const newProducts = await products.save();
      console.log(newProducts);
      res.status(201).json({
        message: "created product successfully",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
);

// find product
router.get("/api/v1/products/:productId", async (req, res) => {
  try {
    const id = req.params.productId;
    const newProducts = await Products.findById(id);
    res.json(newProducts);
    res.status(200).json();
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

// edit productID
router.patch("/api/v1/products/:productId", async (req, res) => {
  try {
    const id = req.params.productId;
    console.log(req.body);
    const updateOps = {};
    // edited an a loop for object, instead of array
    for (const ops in req.body) {
      updateOps[ops] = req.body[ops];
    }
    console.log(updateOps);
    const newProduct = await Products.updateOne(
      { _id: id },
      { $set: updateOps }
    );
    res.status(200).json(newProduct);
    res.redirect("/api/v1/products/");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/api/v1/products/:productId", async (req, res) => {
  try {
    const id = req.params.productId;
    const deleteProduct = await Products.remove({ _id: id });
    res.status(200).json(deleteProduct);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
