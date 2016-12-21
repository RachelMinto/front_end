var path = require("path");
var _ = require("underscore");
Board = require(path.dirname(__dirname) + "/routes/board_node");

module.exports = function(router) {
  router.route("/board/lists").get(function(req, res) { // NEED TO CHANGE /board/:listID
    res.json(Board.getLists()); // all lists.
  }).post(function(req, res) {
    var list = req.body;
    Board.set(list)
    res.json(list)
  });    
  // }).put(function(req, res) {   
  //   var lists = req.body;
  //   Board.updateLists(lists);
  //   res.json(lists);
  // }).delete(function(req, res) {
  //   res.send("I am going to delete all lists.")
  // });
  router.route("/board/:listID").get(function(req, res) {
    res.json(Board.getList(req.params.listID));
  }).post(function(req, res) {
    var boardLists = Board.getLists();
    var list = req.body
    boardLists.push(list);
    Board.updateLists(boardLists);
    res.json(list);     
  }).put(function(req, res) {
    var boardLists = Board.getLists()
    var list = _.where(boardLists, {id: req.params.listID });
    list = req.body
    Board.updateLists(boardLists);
    res.json(list);            
  }).delete(function(req, res) {
    res.send("I am going to delete a list.")       
  });
};
