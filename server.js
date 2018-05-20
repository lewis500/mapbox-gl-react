const express = require("express");
const webpack = require("webpack");
const bodyParser = require("body-parser");
const path = require("path");

const config = require("./webpack.config.js");
const middleware = require("webpack-dev-middleware")(webpack(config));

const app = express();

app.use(middleware);

app.use("/data", express.static("./data"));

app.listen(3000, () => {
  console.log("listening on *:3000");
});
