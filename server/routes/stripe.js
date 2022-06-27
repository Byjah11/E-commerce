const router = require("express").Router();
const { createCheckoutSession } = require("../controllers/stripe");

router.post("/create-checkout-session", createCheckoutSession);

module.exports = router;
