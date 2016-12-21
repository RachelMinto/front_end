var path = require("path");
var _ = require("underscore");
Board = require(path.dirname(__dirname) + "/routes/board_node");

module.exports = function(router) {
  router.route("/board/lists").get(function(req, res) {
    res.json(Board.getLists());
    // res.send("I am going to send you all lists");
  }).post(function(req, res) {
    var list = req.body;
    Board.set(list)
    res.json(list)     
  }).put(function(req, res) {   
    var lists = req.body;
    Board.updateLists(lists);
    res.json(lists);
  }).delete(function(req, res) {
    res.send("I am going to delete a list.")
  });
};
