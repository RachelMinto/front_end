var path = require("path"),
  fs = require("fs"),
  file_path = path.resolve(path.dirname(__dirname), "data/default_board.json")
  Board = JSON.parse(fs.readFileSync(file_path, "utf8"));

/* GET home page. */
module.exports = function(router) {
  router.get('', function(req, res, next) {
    res.render('index', {     //res.render(view [, locals] [, callback])  view is .jade
      default_board: Board
    });
  });
};

