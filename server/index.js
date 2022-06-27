const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userRouter = require("./routes/users");
const productsRouter = require("./routes/products");
const stripeRouter = require("./routes/stripe");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/users", userRouter);
app.use("/products", productsRouter);
app.use("/stripe", stripeRouter);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB!");
    app.listen(process.env.PORT, () => {
      console.log(`app is running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => console.log("error connecting to MongoDB: ", err));
