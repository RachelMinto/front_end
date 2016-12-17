var App = {
  templates: JST,
  $el: $('main'),
  boardView: function() {
    this.board = new BoardView();
    this.renderListViews();
  },
  bindEvents: function() {
    _.extend(this, Backbone.Events);
    // this.on("add_to_cart", this.cart.addItem.bind(this.cart));
  },
};
