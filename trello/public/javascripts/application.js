var App = {
  templates: JST,
  $el: $('main'),
  indexView: function() {
    this.user = new User();    
    new HeaderView({
      model: App.user
    });
    new BoardView({ model: App.board});
    this.board.lists.each(this.renderListView);
  },
  renderListView: function(list) {
    new ListView({
      model: list
      // "url": function() {
      //   return "/lists/" + this.get("title");
      // }
    });

    if (list.cards) {
      _.each(list.cards.models, function(card) {
        new CardView({ model: card });
      }, this);
    }
    // list.cards.each(this.renderCardView);
  },
  addCardToList: function(listID, model) {
    var list = this.board.getListByID(listID);
    list.cards.add(model);
  },
  bindEvents: function() {
    _.extend(this, Backbone.Events);
    // this.on("add_to_cart", this.cart.addItem.bind(this.cart));
  },
};


// App.board.lists.models[0].cards.models[0].attributes.comments !! :)