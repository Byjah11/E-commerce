const Product = require("../models/Product.js");
require("dotenv").config();

const getAll = async (req, res) => {
  const qCategories = req.query.category;
  try {
    let products;

    if (qCategories) {
      products = await Product.find({
        categories: {
          $in: [...qCategories.split(" ")],
        },
      });
    } else {
      products = await Product.find({});
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};

const createProduct = async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ msg: `Product ${id} has been deleted` });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getAll,
  getProduct,
  createProduct,
  deleteProduct,
};
