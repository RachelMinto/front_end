var NewAlbumView = Backbone.View.extend({
  template: App.templates.new_album,
  attributes: {
    id: "album_new"
  },
  render: function() {
    this.$el.html(this.template());
    App.$el.html(this.$el);
  },
  initialize: function() {
    this.render();
  }
});