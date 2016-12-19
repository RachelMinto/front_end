var App = {
  templates: JST,
  $el: $('main'),
  indexView: function() {
    this.user = new User();    
    new HeaderView({ model: App.user });
    this.createBoardMenu();
    new BoardView({ model: App.board});
    this.board.lists.each(this.renderListView);
    this.bindEvents();
  },
  createBoardMenu: function() {
    var model = new Backbone.Model();
    model.set({user: App.user.attributes, board: App.board.attributes});
    this.boardMenu = new BoardMenuView({ model: model });    
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
    list.cards.create(model);
  },
  openCardEditMenu: function(model) {
    new EditCardView({ model: model });
  },
  openBoardMenu: function(model) {
    this.boardMenu.show();
  },  
  bindEvents: function() {
    _.extend(this, Backbone.Events);
    this.on("openCardEditMenu", this.openCardEditMenu);
    this.on("openBoardMenu", this.openBoardMenu);
  },
};


// App.board.lists.models[0].cards.models[0].attributes.comments !! :)