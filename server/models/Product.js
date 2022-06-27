const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    img: { type: String, required: true },
    categories: Array,
    specs: Object,
    price: { type: Number, required: true },
    prevPrice: Number,
    inStock: { type: Number, default: 1 },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
