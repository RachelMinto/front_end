var path = require("path");
var fs = require("fs");
var express = require("express");
var router = express.Router();
var file_path = path.resolve(path.dirname(__dirname), "data/todos.json");

function getAlbums() {
  return JSON.parse(fs.readFileSync(file_path, "utf8"));
}

router.get("/todos/new", function(req, res) {
  res.render("new");
});

module.exports = router;