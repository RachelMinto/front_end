var express = require('express');
var path = require("path");
var fs = require("fs");
var file_path = path.resolve(path.dirname(__dirname), "data/default_board.json");
var router = express.Router();

function getBoard() {
  return JSON.parse(fs.readFileSync(file_path, "utf8"));
}

router.get('/', function(req, res, next) {
  res.render('index', { 
    board: getBoard()
  });
});

module.exports = router;