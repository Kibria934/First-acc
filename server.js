const mongoose = require("mongoose");
require("dotenv").config();
const colors = require("colors");
const port = process.env.PORT || 8080;
const app = require("./app");
// const DBConnect = require("./utils/dbConnect");

app.get("/", (req, res) => {
  res.send(`Server is running in port ${port}`);
});
// server
app.listen(port, () => {
  console.log(`App is running on port ${port}`.yellow.bold);
});
