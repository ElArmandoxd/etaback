var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.status(200).json({'Message': "Development Api"});
});

module.exports = router;
