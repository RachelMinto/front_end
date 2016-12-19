var path = require("path");
var _ = require("underscore");
Board = require(path.dirname(__dirname) + "/routes/board_node");

module.exports = function(router) {
  router.route("/board/lists").get(function(req, res) {
    res.json(Board.getLists());
    // res.send("I am going to send you all lists");
  }).post(function(req, res) {
    res.send("I am going to create a list");
  }).put(function(req, res) {
    res.send("I am going to update a list");
  }).delete(function(req, res) {
    res.send("I am going to delete a list.")
  });
};
