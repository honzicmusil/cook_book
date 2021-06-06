"use strict";
const recipeController = require("./src/controller/recipe-controller");
const materialController = require("./src/controller/material-controller");
const express = require("express");
const path = require("path");
let cors = require('cors');

const app = express();

// cross-origin resource sharing enabled
app.use(cors())

// adding some extra headers to response
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// enables to parse JSON format
app.use(express.json());

// enables to parse objects even with nested objects
app.use(express.urlencoded({ extended: true }));

// setting material and controller to our server
app.use("/recipe/", recipeController);
app.use("/material/", materialController);

// setting testing index page
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

// once started the backend listens to 3000 port
app.listen(3000, () => {
  console.log("Express server listening on port 3000.");
});
