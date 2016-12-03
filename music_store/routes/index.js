var path = require("path");
var Albums = require(path.resolve(path.dirname(__dirname), "routes/album_node"));

module.exports = function(router) {
  router.get('/', function(req, res, next) {
    res.render('index', {
      albums: Albums.get()
    });
  });
};
