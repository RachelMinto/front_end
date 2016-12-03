var path = require("path"),
  fs = require("fs"),
  file_path = path.resolve(path.dirname(__dirname), "data/albums.json")

function nextID() {
  return JSON.parse(fs.readFileSync(file_path, "utf8")).last_id + 1;
}

function getAlbums() {
  return JSON.parse(fs.readFileSync(file_path, "utf8")).data;
}

function writeAlbums(data) {
  fs.writeFileSync(file_path, JSON.stringify(data), "utf8");
}

module.exports = {
  get: function() {
    return getAlbums();
  },
  set: function(album) {
    var albums = getAlbums();
    album.id = nextID();
    albums.push(album);
    writeAlbums({ last_id: album.id, data: albums });
  },
  getLastID() {
    return JSON.parse(fs.readFileSync(file_path, "utf8")).last_id;
  }
}

