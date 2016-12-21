var path = require("path");
var _ = require("underscore");
Board = require(path.dirname(__dirname) + "/routes/board_node");

module.exports = function(router) {
  router.route("/board/:listID/items/:cardID").get(function(req, res) {
    res.send("I am going to send you a card.");
  }).put(function(req, res) { // Update card
    // var boardLists = Board.getLists()
    // var list = _.where(boardLists, {id: req.params.listID });
    // list[0].cards = req.body
    // Board.updateLists(boardLists);
    // res.json(list);    
  }).delete(function(req, res) {
    res.send("I am going to delete a list item.")
  });

  router.route("/board/:listID/items").get(function(req, res) {
    res.send("I am going to send you a list's cards.");
  }).post(function(req, res) {
    var boardLists = Board.getLists()
    var list = _.where(boardLists, {id: req.params.listID });
    var newCard = req.body
    list[0].cards.push(newCard)
    Board.updateLists(boardLists);
    res.json(newCard);    
  }).delete(function(req, res) {
    res.send("I am going to delete a list item.")
  });  
};


