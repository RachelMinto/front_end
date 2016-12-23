var _ = require("underscore");
var path = require("path"),
  fs = require("fs"),
  file_path = path.resolve(path.dirname(__dirname), "data/default_board.json")

function getBoard() {
  return JSON.parse(fs.readFileSync(file_path, "utf8"));
}

function getLists() {
  return JSON.parse(fs.readFileSync(file_path, "utf8")).lists;
}

function getListByID(id) {
  var lists = getLists();
  var list = _.where(lists, {id: id });
  return list;
}

function writeBoard(data) {
  fs.writeFileSync(file_path, JSON.stringify(data), "utf8");
}


function getNextCardID() {
  return JSON.parse(fs.readFileSync(file_path, "utf8")).last_card_id + 1;
}

function getNextListID() {
  return JSON.parse(fs.readFileSync(file_path, "utf8")).last_list_id + 1;
}


module.exports = {
  get: function() {
    return getBoard();
  },
  getList: function(id) {
    return getListByID(id);
  },
  getBoardLists: function() {
    return getLists();
  },
  getBoardData: function() {
    return getBoard();
  },
  getLastCardID() {
    return JSON.parse(fs.readFileSync(file_path, "utf8")).last_card_id;
  },
  getLastListID() {
    return JSON.parse(fs.readFileSync(file_path, "utf8")).last_id;
  },
  writeBoardUpdate(board) {
    writeBoard(board);
  },
  nextCardID: function() {
    return getNextCardID();
  },
  nextListID: function() {
    return getNextListID();
  },
  set: function(list) {
    var lists = getLists();
    list.subscribed = false;
    list.id = getNextListID();
    lists.push(list);

    var board = getBoard();
    board.last_list_id = list.id
    board.lists = lists

    writeBoard(board);
  },
}