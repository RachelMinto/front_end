var path = require("path"),
  fs = require("fs"),
  file_path = path.resolve(path.dirname(__dirname), "data/food_items.json")
var path = require("path");
var _ = require("underscore");

function getMenuItem(id) {
  data = JSON.parse(fs.readFileSync(file_path, "utf8"));
  return _(data).findWhere({ id: +id });
}

module.exports = function(router) {
  router.get('/menu/:id', function(req, res, next) {
    App.renderMenuItem
  });
};

