const express = require("express");
const webpack = require("webpack");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const bodyParser = require("body-parser");
const UPDATE_DATA = require("./messages.js").UPDATE_DATA;

const webpackMiddleware = require("webpack-dev-middleware")(
  webpack(require("./webpack.config.js"))
);

app
  .use(bodyParser.json())
  .use(webpackMiddleware)
  .use("/data", express.static("./data"));

io.on("connection", socket => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.post("/update", (req, res) => {
  io.emit(UPDATE_DATA, req.body);
  res.send("post message received");
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});
