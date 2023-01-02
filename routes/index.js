var express = require('express');
var router = express.Router();
const recordController = require('../controllers/recordControllers')

/* GET home page. */
router.get('/', recordController.all_records);

module.exports = router;
