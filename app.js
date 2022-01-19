var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var Services = require("./routes/Services");
var { createMiddleware } = require("@mswjs/http-middleware");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// app.use("/", async function (req, res, next) {
//   try {
//     await next();
//   } catch (error) {
//     res.send(error);
//   }
// });
app.use("/", createMiddleware(...Services));
app.use(function (err, req, res, next) {
  console.error(err.stack);
  if (err.name === "ReferenceError") res.status(400).send(err.message);
  else res.status(500).send(err.stack);
});

var listener = app.listen(8080, function () {
  console.log("Listening on port " + listener.address().port);
});