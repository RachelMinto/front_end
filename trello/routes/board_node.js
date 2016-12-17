var path = require("path"),
  fs = require("fs"),
  file_path = path.resolve(path.dirname(__dirname), "data/default_board.json")

function getBoard() {
  return JSON.parse(fs.readFileSync(file_path, "utf8"));
}

module.exports = {
  get: function() {
    return getBoard();
  }
}