const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const sellerSchema = new Schema({
  fName: String,
  lName: String,
  email: String,
  password: String,
});
module.exports = mongoose.model("seller", sellerSchema, "seller");
