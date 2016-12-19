var path = require("path");
var _ = require("underscore");
Board = require(path.dirname(__dirname) + "/routes/board_node");

module.exports = function(router) {
  router.route("/board").get(function(req, res) {
    res.json(Board.get());
  }).put(function(req, res) {
    res.send("I am going to update this board.")
  });
};
