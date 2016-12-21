var path = require("path");
var _ = require("underscore");
Board = require(path.dirname(__dirname) + "/routes/board_node");

module.exports = function(router) {
  router.route("/board/:listID/items/:cardID").get(function(req, res) {
    res.send("I am going to send you a card.")
  }).post(function(req, res) {
    // var list = req.body;
    // Board.setList(list)
    res.send("I am going to create a new card"); // response. Automatically sets content headers so content is JSON.
  }).put(function(req, res) { // Update card
    // var boardLists = Board.getLists()
    // var list = _.where(boardLists, {id: req.params.listID });
    // list[0].cards = req.body
    // Board.updateLists(boardLists);
    // res.json(list);    
  }).delete(function(req, res) {
    res.send("I am going to delete a list item.")
  });
};


