var path = require("path");
var _ = require("underscore");
Board = require(path.dirname(__dirname) + "/routes/default_board");

module.exports = function(router) {
  router.route("/albums").get(function(req, res) {
    res.json(Albums.get());
  }).post(function(req, res) {
    var album = req.body;
    Albums.set(album)
    res.json(album) // response. Automatically sets content headers so content is JSON.
  }).put(function(req, res) {
    var albums = Albums.get();
    var current_album = _(albums).findWhere({ id: +req.body.id });

    _.extend(current_album, req.body);
    Albums.set(albums);
    res.json(current_album);
  }).delete(function(req, res) {
    var albums = _(Albums.get()).reject(function(a) {
      return a.id === +req.body.id;
    });

    Albums.set(albums);
    res.status(200).end();
  });

  router.get("/albums/new", function(req, res) {
    res.render("new", {
      albums: Albums.get()
    });
  });
};