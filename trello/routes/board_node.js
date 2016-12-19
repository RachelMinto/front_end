var _ = require("underscore");
var path = require("path"),
  fs = require("fs"),
  file_path = path.resolve(path.dirname(__dirname), "data/default_board.json")

function getBoard() {
  return JSON.parse(fs.readFileSync(file_path, "utf8"));
}

function nextID() {
  return JSON.parse(fs.readFileSync(file_path, "utf8")).last_list_id + 1;
}

function getLists() {
  return JSON.parse(fs.readFileSync(file_path, "utf8")).lists;
}

function getList(id) {
  var lists = getLists();
  var list = _.where(lists, {id: id });
  return list;
}

function setList(list) {
}

function writeBoard(data) {
  fs.writeFileSync(file_path, JSON.stringify(data), "utf8");
}

function updateList(id) {

}

module.exports = {
  get: function() {
    return getBoard();
  },
  getList: function(id) {
    return getList(id);
  },
  getLists: function() {
    return getLists();
  },
  updateLists: function(lists) {
    writeLists({lists: lists });
  },
  set: function(list) {
    var lists = getLists();
    list.subscribed = false;
    list.id = nextID();
    list.position = Object.keys(lists).length;   
    lists.push(list);

    var board = getBoard();
    board.lists = lists;
    board.last_list_id = list.id + 1

    writeBoard(board);
  },
}