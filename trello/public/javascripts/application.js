var App = {
  templates: JST,
  $el: $('main'),
  indexView: function() {
    this.user = new User();    
    new HeaderView({ model: App.user });
    this.createBoardMenu();
    new BoardView({ model: App.board});
    this.board.lists.each(this.renderListView);
    this.addList = new AddListView();
    this.bindEvents();
  },
  createBoardMenu: function() {
    var model = new Backbone.Model();
    model.set({user: App.user.attributes, board: App.board.attributes});
    this.boardMenu = new BoardMenuView({ model: model });    
  },
  renderListView: function(list) {
    new ListView({ model: list });

    _.each(list.cards.models, function(card) {
      new CardView({ model: card });
    }, this);
  },
  addCardToList: function(listID, model) {
    var list = this.board.getListByID(listID);
    list.cards.create(model);
  },
  // removeDraggedCard: function(ui) {
  //   var list = this.board.getListByID(ui.item.startListID);
  //   var id = ui.item.data('id');
  //   var model = list.getCardByID(id);
  //   list.cards.remove(model);
  //   // list.cards.trigger("update");
  //   // sync w server
  // },
  // addCard: function([listID, cardID, position]) {
  //   var list = this.board.getListByID(listID);
  //   var model = list.getCardByID(cardID);
  //   list.cards.add(model, {at: +position});
  //   list.cards.trigger("update");    
  //   // sync w server    
  // },
  updateCardPosition: function([oldListID, newListID, cardID, position]) {
    var oldList = this.board.getListByID(oldListID);
    var newList = this.board.getListByID(newListID);
    var model = oldList.getCardByID(cardID);

    oldList.cards.remove(model);    
    newList.cards.add(model, {at: position});
    // oldList.cards.trigger("updateServer"); // remove and use update auto from previous two.
    // this.board.lists.trigger("syncServer");
    // oldList.trigger("syncServer");
    // newList.trigger("syncServer");  // check if these are updating and removing. then troubleshoot api.
  },
  openCardEditMenu: function(model) {
    new EditCardView({ model: model });
  },
  openBoardMenu: function(model) {
    this.boardMenu.show();
  },
  newList: function($f) {
    $.ajax({
      url: $f.attr("action"),
      type: $f.attr("method"),
      data: $f.serialize(),
      success: function(json) {
        App.board.lists.add(json);
        App.indexView();
      }
    });
  },
  bindEvents: function() {
    _.extend(this, Backbone.Events);
    this.on("openCardEditMenu", this.openCardEditMenu);
    this.on("openBoardMenu", this.openBoardMenu);
    this.on("updateListPositions", this.board.lists.updateListPositions.bind(this.board.lists));
    this.on("removeDraggedCard", this.removeCardFromList);
    this.on("addDroppedCard", this.addCard);
    this.on('updateCardPosition', this.updateCardPosition);
    this.listenTo(this.addList, "add_list", this.newList);
  },
};


// App.board.lists.models[0].cards.models[0].attributes.comments !! :)