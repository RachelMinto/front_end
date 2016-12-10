var path = require("path");
var FoodItems = require(path.resolve(path.dirname(__dirname), "routes/sushi_node"));

function getMenuItem(id) {
  data = JSON.parse(fs.readFileSync(file_path, "utf8"));
  return _(data).findWhere({ id: +id });
}

module.exports = function(router) {
  router.get('/menu/:id', function(req, res, next) {
    res.render('index', {     //res.render(view [, locals] [, callback])  view is .jade
      food_items: FoodItems.get()
    });
    App.renderMenuItem(req.params.id)
  });
};

