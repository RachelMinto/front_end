var path = require("path");
var _ = require("underscore");
Board = require(path.dirname(__dirname) + "/routes/board_node");

module.exports = function(router) {
  router.route("/board/:listID/items/:cardID").get(function(req, res) {
    res.send("I am going to send you a card.");
  }).put(function(req, res) { // Update card
    var board = Board.getBoardData();
    var card = ''

    for (var i = 0; i < board.lists.length; i++) {
      if (board.lists[i].id === +req.params.listID) {
        for (var j = 0; j < board.lists[i].cards.length; j++) {
          if (board.lists[i].cards[j].id === +req.params.cardID) {
            board.lists[i].cards[j] = req.body;
            card = req.body
            break;
          }
        }
      }
    }

    Board.writeBoardUpdate(board); 
    res.json(card);    
  }).delete(function(req, res) {
    var board = Board.getBoardData();
    var card = ''

    for (var i = 0; i < board.lists.length; i++) {
      if (board.lists[i].id === +req.params.listID) {
        for (var j = 0; j < board.lists[i].cards.length; j++) {
          if (board.lists[i].cards[j].id === +req.params.cardID) {
            board.lists[i].cards.splice(j, 1);
            card = req.body
            break;
          }
        }
      }
    }

    Board.writeBoardUpdate(board); 
    res.json(card);        
  });

  router.route("/board/:listID/items").get(function(req, res) {
    res.send("I am going to send you a list's cards.");
  }).post(function(req, res) { // Post a list item
    var board = Board.getBoardData();
    var list = _.where(board.lists, {id: +req.params.listID });    
    var newCard = req.body;
    var id = board.last_card_id + 1;
    newCard.id = id;
    var match = false

    for (var i = 0; i < board.lists.length; i++) {
      if (board.lists[i].id === +req.params.listID) {
        board.lists[i].cards.push(newCard);
        break
      }
    }

    board.last_card_id = newCard.id;
    Board.writeBoardUpdate(board);    
    res.json(newCard);    
  }).put(function(req, res) { // Update a list's cards.
    var board = Board.getBoardData();
    var cards = ''

    for (var i = 0; i < board.lists.length; i++) {
      if (+board.lists[i].id === +req.params.listID) {
        board.lists[i].cards = req.body;
        cards = req.body;
        break
      }
    }

    Board.writeBoardUpdate(board);    
    res.json(cards);                
  }).delete(function(req, res) {
    res.send("I am going to delete a list item.")
  });  
};


