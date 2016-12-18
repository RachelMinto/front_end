var path = require("path");
var Board = require(path.resolve(path.dirname(__dirname), "routes/board_node"));

module.exports = function(router) {
  router.get('/', function(req, res, next) {
    res.render('index', {
      default_board: Board.get() 
    });
  });
};
