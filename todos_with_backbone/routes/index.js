var express = require('express');
var path = require("path");
var fs = require("fs");
var file_path = path.resolve(path.dirname(__dirname), "data/todos.json");
var router = express.Router();

function getTodos() {
  return JSON.parse(fs.readFileSync(file_path, "utf8")).data;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    todos: getTodos() 
  });
});

module.exports = router;
