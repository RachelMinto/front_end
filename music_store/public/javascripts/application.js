var App = {
  templates: JST,
  $el: $('main'),
  indexView: function() {
    this.indexView = new IndexView();
    this.renderAlbums();
  },
  renderAlbums: function() {
    this.albums.each(this.renderAlbumView);
  },
  renderAlbumView: function(album) {
    new AlbumView({
      model: album
    });
  },
  newAlbum: function() {
    new NewAlbumView();
  },
  bindEvents: function() {
    _.extend(this, Backbone.Events);
    this.listenTo(this.indexView, "add_album", this.newAlbum);
  },
  init: function() {
    this.indexView();
    this.bindEvents();
  }
};

Handlebars.registerHelper("format_price", function(price) {
  return (+price).toFixed(2);
})