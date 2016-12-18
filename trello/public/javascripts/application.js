var App = {
  templates: JST,
  $el: $('main'),
  boardView: function() {
    debugger;
    // new HeaderView({
    //   model: User
    // });
    // this.board = new BoardView();
  },
  bindEvents: function() {
    _.extend(this, Backbone.Events);
    // this.on("add_to_cart", this.cart.addItem.bind(this.cart));
  },
};


// App.board.lists.models[0].cards.models[0].attributes.comments !! :)