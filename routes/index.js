var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  return res.send("Received a GET HTTP method");
});

module.exports = router;
