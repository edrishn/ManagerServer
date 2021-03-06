var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var Services = require("./routes/Services");
var { createMiddleware } = require("@mswjs/http-middleware");

var app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", createMiddleware(...Services));
app.use(function (err, req, res, next) {
  console.error(err.stack);
  if (err.name === "ReferenceError") res.status(400).send(err.message);
  else res.status(500).send(err.stack);
});

var listener = app.listen(8080, function () {
  console.log("Listening on port " + listener.address().port);
});
