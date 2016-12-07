var express = require('express');
var path = require("path");
var fs = require("fs");
var file_path = path.resolve(path.dirname(__dirname), "data/food_items.json");
var router = express.Router();

function getMenuItem(id) {
  data = JSON.parse(fs.readFileSync(file_path, "utf8"))
  return data;
}

/* GET home page. */
router.get('/:id', function(req, res, next) {
  res.send('menu id' + getMenuItem(req.params.id));
  });

module.exports = router;