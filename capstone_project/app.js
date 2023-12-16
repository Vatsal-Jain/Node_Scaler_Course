const express = require('express')
const app = express()
const categories = require('./Routes/categories')
const brands = require('./Routes/brands')

const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/categoriesDatabase")
  .then(() => {
    console.log("connection established successfully for mongoose");
  })
  .catch((error) => {
    console.log("coudnlt no connect ti mongodb", error);
  });

app.use(express.json())

app.use("/api/categories",categories)
app.use("/api/brands",brands)

app.listen(port, () => {
    console.log("server is running on", port);
  });
