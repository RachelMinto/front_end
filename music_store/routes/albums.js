var path = require("path");
Albums = require(path.dirname(__dirname) + "/routes/album_node");

module.exports = function(router) {
  router.post("/albums", function(req, res) {
    var album = req.body;
    Albums.set(album)
    res.json(album) // response. Automatically sets content headers so content is JSON.
  });

  router.get("/albums/new", function(req, res) {
    res.render("new");
  });
};