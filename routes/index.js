var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.write("Hello World!"); //write a response to the client
  res.end(); //end the response
});

module.exports = router;
