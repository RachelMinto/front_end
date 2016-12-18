var path = require("path");
var _ = require("underscore");
Board = require(path.dirname(__dirname) + "/routes/board_node");

module.exports = function(router) {
  router.route("/board/:listID").get(function(req, res) {
    res.json(Board.getList(req.params.listID));
  }).post(function(req, res) {
    var list = req.body;
    Board.setList(list)
    res.json(list) // response. Automatically sets content headers so content is JSON.
  }).put(function(req, res) {
    var lists = Board.getLists();
    var currentList = _.findWhere(lists, { id: req.body.id });

    _.extend(currentList, req.body);
    Board.updateLists(lists);    
    res.send(currentList);
    // res.json(currentList);    
  });
};