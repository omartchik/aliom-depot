const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const itemsRoute = require("./routes/items");
// --------------------------------------------------------------------------
mongoose.connect(
  process.env.DATABASE,
  {}
);
// --------------------------------------------------------------------------body parser
app.use(bodyParser.urlencoded({ extended: true }));
// -------------------------------------------------------------------------- views
app.set("view engine", "ejs");
// -------------------------------------------------------------------------- routes
app.use("/", itemsRoute);
// -------------------------------------------------------------------------- servir les fichier statics
app.use(express.static("public"));

// --------------------------------------------------------------------------
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "index.html"));
// });
// --------------------------------------------------------------------------

// --------------------------------------------------------------------------
app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});
// --------------------------------------------------------------------------
