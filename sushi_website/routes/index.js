var path = require("path");
var FoodItems = require(path.resolve(path.dirname(__dirname), "routes/sushi_node"));

/* GET home page. */
module.exports = function(router) {
  router.get('', function(req, res, next) {
    res.render('index', {     //res.render(view [, locals] [, callback])  view is .jade
      food_items: FoodItems.get()
    });
  });
};

