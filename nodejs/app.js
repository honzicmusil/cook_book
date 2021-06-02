"use strict";
const recipeController = require("./src/controller/recipe-controller");
const materialController = require("./src/controller/material-controller");
const express = require("express");
const path = require("path");
var cors = require('cors')

const app = express();
app.use(cors())

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/recipe/", recipeController);
app.use("/material/", materialController);

app.use("/library-spa.js", function (req, res) {
  res.sendFile(path.join(__dirname + "/hi/library-spa.js"));
});
// app.use("/book.js", function(req,res) {
//     res.sendFile(path.join(__dirname+'/hi/book.js'))recipe
// })

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.listen(3000, () => {
  console.log("Express server listening on port 3000.");
});
