var express = require('express');
var path = require("path");
var fs = require("fs");
var file_path = path.resolve(path.dirname(__dirname), "data/food_items.json");
var router = express.Router();
var _ = require("underscore");

function getMenuItem(id) {
  data = JSON.parse(fs.readFileSync(file_path, "utf8"))
  return _(data).findWhere({ id: +id });
}

/* GET home page. */
router.get('/:id', function(req, res, next) {
  var menuItem = getMenuItem(req.params.id);
  res.render("menu", {
    foodItem: menuItem
  });
});

module.exports = router;