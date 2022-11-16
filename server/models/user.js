const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const userSchema = new Schema({
  fName: String,
  lName: String,
  email: String,
  password: String,
});
module.exports = mongoose.model("user", userSchema, "user");
