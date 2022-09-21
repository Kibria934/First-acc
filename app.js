const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config();
const colors = require("colors");
const port = process.env.PORT || 8080;
const cors = require("cors");
const productRouter = require("./routes/v1/Productj.route");
const dbConnect = require("./utils/dbConnect");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// database connection
mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("database connected".red.bold);
  });

//Router
app.use("/api/v1/product", productRouter);

app.listen(port, () => {
  console.log(`App is running on port ${port}`.yellow.bold);
});
