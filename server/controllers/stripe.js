require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req, res) => {
  const items = req.body;
  const lineItems = items.map((item) => {
    return {
      price_data: {
        currency: "pln",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price,
      },
      quantity: item.amount,
    };
  });
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["p24", "card"],
      mode: "payment",
      line_items: lineItems,
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCheckoutSession,
};
