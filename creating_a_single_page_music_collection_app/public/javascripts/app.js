var App = {
  albumsLoaded: function() {},
  fetchAlbums: function() {
    this.albums = new Albums();
    this.albums.fetch({
      success: this.albumsLoaded.bind(this)
    });
  },
  init: function() {
    this.fetchAlbums();
  }
};