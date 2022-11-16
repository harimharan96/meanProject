const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Product = require("../models/products");

const mongoose = require("mongoose");
const db = "mongodb://localhost:27017/myDB";

mongoose.connect(db, (err) => {
  if (err) {
    console.error("error!" + err);
  } else {
    console.log("Connected to mongoDB");
  }
});

router.get("/", (req, res) => {
  res.send("From api route");
});

router.post("/register", (req, res) => {
  let userData = req.body;
  let user = new User(userData);
  user.save((error, registeredUser) => {
    if (error) {
      console.log(error);
    } else {
      res.status(200).send(registeredUser);
    }
  });
});

router.post("/login", (req, res) => {
  let userData = req.body;

  User.findOne({ email: userData.email }, (error, user) => {
    if (error) {
      console.log(error);
    } else {
      if (!user) {
        res.status(401).send("Invalid email!");
      } else if (user.password !== userData.password) {
        res.status(401).send("Invalid password!");
      } else {
        res.status(200).send(user);
      }
    }
  });
});

router.post("/products", (req, res) => {
  let productData = req.body;
  let product = new Product(productData);
  product.save((error, registeredProduct) => {
    if (error) {
      console.log(error);
    } else {
      res.status(200).send(registeredProduct);
    }
  });
});

router.get("/products", (req, res) => {
  Product.find()
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
    });
});

module.exports = router;
