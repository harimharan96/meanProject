const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const productSchema = new Schema({
  prodImage: String,
  prodTitle: String,
  prodPrice: Number,
  prodQty: { type: Number, default: 1 },
});
module.exports = mongoose.model("product", productSchema, "products");
