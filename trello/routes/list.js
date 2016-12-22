var path = require("path");
var _ = require("underscore");
Board = require(path.dirname(__dirname) + "/routes/board_node");

module.exports = function(router) {
  router.route("/board/lists").get(function(req, res) { // NEED TO CHANGE /board/:listID
    res.json(Board.getLists()); // all lists.
  }).post(function(req, res) { // Creates new list.
    var list = req.body;
    list.id = Board.nextListID();
    board = Board.getBoardData();
    board.lists.push(list);
    board.last_list_id = list.id;
    Board.writeBoardUpdate(board);
    res.json(list)   
  }).put(function(req, res) {   
    var lists = req.body;
    var board = Board.getBoardData();
    board.lists = lists

    Board.writeBoardUpdate(board);
    res.json(lists);
  });
  // }).delete(function(req, res) {
  //   res.send("I am going to delete all lists.")
  // });
  router.route("/board/:listID").get(function(req, res) {
    res.json(Board.getList(req.params.listID));
  }).put(function(req, res) { // update list
    var board = Board.getBoardData();
    var list = ''

    for (var i = 0; i < board.lists.length; i++) {
      if (board.lists[i].id === req.params.listID) {
        board.lists[i] = req.body
        list = req.body
        break
      }
    }

    Board.writeBoardUpdate(board);    
    res.json(list);            
  }).delete(function(req, res) {
    res.send("I am going to delete a list.")       
  });
};
