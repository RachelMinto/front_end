var path = require("path");
var _ = require("underscore");
Board = require(path.dirname(__dirname) + "/routes/board_node");

module.exports = function(router) {
  router.route("/board/:listID").get(function(req, res) {
    res.json(Board.getList(req.params.listID));
  });
};