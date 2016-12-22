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
    // var board = Board.getBoardData();
    // var list = _.where(board.lists, {id: req.params.listID });
    // list = req.body
    // // var list = _.where(lists, {id: req.params.listID });
    // // _.extend(list, req.body);

    // Board.writeBoardUpdate(board);    
    // res.json(list);            
  }).delete(function(req, res) {
    res.send("I am going to delete a list.")       
  });
};
