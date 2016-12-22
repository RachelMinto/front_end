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
  }).post(function(req, res) { // Post a list item
    var boardLists = Board.getBoardLists()
    var list = _.where(boardLists, {id: req.params.listID });    
    var newCard = req.body;
    
    newCard.id = Board.nextCardID();
    list[0].cards.push(newCard)
    Board.writeBoardForCardAdded(newCard.id, boardLists);
    res.json(newCard);    
  }).put(function(req, res) {
    var board = Board.getBoardData();
    var cards = ''

    for (var i = 0; i < board.lists.length; i++) {
      if (board.lists[i].id === req.params.listID) {
        board.lists[i].cards = req.body
        cards = req.body
        break
      }
    }

    Board.writeBoardUpdate(board);    
    res.json(cards);                
  }).delete(function(req, res) {
    res.send("I am going to delete a list item.")
  });  
};


