const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Seller = require("../models/seller");
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

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send("Unauthorised request");
  }
  let token = req.headers.authorization.split(" ")[1];
  if (token === "null") {
    return res.status(401).send("Unauthorised request");
  }
  let payload = jwt.verify(token, "secretKey");
  if (!payload) {
    return res.status(401).send("Unauthorised request");
  }
  req.userId = payload.subject;
  next();
}

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
      let payload = { subject: registeredUser._id };
      let token = jwt.sign(payload, "secretKey");
      res.status(200).send({ token });
    }
  });
});

router.post("/seller/register", (req, res) => {
  let sellerData = req.body;
  let seller = new Seller(sellerData);
  seller.save((error, registeredSeller) => {
    if (error) {
      console.log(error);
    } else {
      let payload = { subject: registeredSeller._id };
      let token = jwt.sign(payload, "secretKey");
      res.status(200).send({ token });
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
        let payload = { subject: user._id };
        let token = jwt.sign(payload, "secretKey");
        res.status(200).send({ token });
      }
    }
  });
});

router.post("/seller/login", (req, res) => {
  let sellerData = req.body;

  // console.log(sellerData);

  Seller.findOne({ email: sellerData.email }, (error, seller) => {
    if (error) {
      console.log(error);
    } else {
      if (!seller) {
        res.status(401).send("Invalid email!");
      } else if (seller.password !== sellerData.password) {
        res.status(401).send("Invalid password!");
      } else {
        let payload = { subject: seller._id };
        let token = jwt.sign(payload, "secretKey");
        res.status(200).send({ token });
      }
    }
  });
});

router.post("/add-products", (req, res) => {
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
