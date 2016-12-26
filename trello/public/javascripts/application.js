var App = {
  templates: JST,
  $el: $('main'),
  indexView: function() {
    this.user = new User();    
    new HeaderView({ model: App.user });
    new BoardView({ model: App.board});
    this.createBoardMenu();    
    this.renderLists();
    this.bindEvents();
  },
  getAllActivities: function() {
    var activities = []
    this.board.lists.each(function(list) {
      list.cards.each(function(card) {
        var current = card.get("activities")
        if (current) {
          current.forEach(function(activity) {
            activities.push(activity);
          });
        }
      });
    });
  
    return activities;
  },
  renderLists: function() {
    this.board.lists.each(this.renderListView);
    this.addList = new AddListView();
  },
  getNextCardID: function() {
    this.lastCardID++
    return this.lastCardID; 
  },
  getNextListID: function() {
    this.lastListID++
    return this.lastListID; 
  },
  copyList: function(title, model) {
    var oldID;
    newList = {
      "title": title,
    }

    $.ajax({
      url: "/board/lists",
      type: "POST",
      data: newList,
      success: function(json) {
        oldID = json.id
        App.board.lists.add(json);
        model.cards.each(function(card) {
          var nextTitle = card.get("title");
          App.addCardToList(oldID, { title: nextTitle });
        });
        App.renderLists();            
      },
    });
  },
  createBoardMenu: function() {
    var activities = this.getAllActivities();
    this.boardMenu = new BoardMenuView(activities);    
  },
  moveList: function(position, model) {
    var oldPosition = this.board.lists.indexOf(model);

    if (position === oldPosition) return this;

    var temp = model

    this.board.lists.remove(model);
    this.board.lists.add(temp, { at: position });
    this.renderLists();
  },
  movePopup: function(card, list) {
    $('.pop-over').addClass("is-shown search");
    new MoveCardView({ model: card, list: list });
  },
  renderLists: function() {
    $('#board_canvas').empty();
    this.board.lists.each(this.renderListView);
    this.addList = new AddListView();
  },
  renderListView: function(list) {
    new ListView({ model: list });

    _.each(list.cards.models, function(card) {
      new CardView({ model: card });
    }, this);
  },
  searchKeyword: function(keyword) {
    var results = []

    this.board.lists.forEach(function(list) {
      list.cards.forEach(function(card) {
        var title = card.get("title");

        if (title.search(keyword) !== -1) {
          results.push(card);
        }
      });
    });

    return results;
  },
  addCardToList: function(listID, model) {
    var list = this.board.getListByID(listID);
    list.cards.create(model);
  },
  updateCardPosition: function([oldListID, newListID, cardID, position]) {
    var oldList = this.board.getListByID(oldListID);
    var newList = this.board.getListByID(newListID);
    var model = oldList.getCardByID(cardID);

    oldList.cards.remove(model);
    if (position) {
      newList.cards.add(model, {at: position});
    } else {
      newList.cards.add(model);
    };

    var oldListTitle = oldList.get("title")
    var newListTitle = newList.get("title")

    model.movedCardActivty(oldListTitle, newListTitle);
    newList.cards.syncServer();
    oldList.cards.syncServer();
    this.renderLists();
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
    this.on("updateListPositions", this.board.lists.updateListPositions.bind(this.board.lists));
    this.on('updateCardPosition', this.updateCardPosition);
    this.listenTo(this.board.lists, "addedList", this.renderLists);
  },
};

Handlebars.registerHelper('ifAction', function(conditional, options) {
  if(options.hashvalue === conditional) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

var delay = (function(){
  var timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();

Handlebars.registerHelper("inc", function(value, options) { 
  return parseInt(value) + 1;
});
