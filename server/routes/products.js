const router = require("express").Router();
const {
  getAll,
  getProduct,
  createProduct,
  deleteProduct,
} = require("../controllers/product.js");

router.get("/", getAll);
router.get("/:id", getProduct);
router.post("/", createProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
