var path = require("path");
var file_path = path.resolve(path.dirname(__dirname), "data/food_items.json");

module.exports = function(router) {
  router.get('/checkout', function(req, res, next) {
    res.send('checking out!')
  });
};