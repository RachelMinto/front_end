var MoveCardView = Backbone.View.extend({
  template: App.templates.move,
  events: {
    "click .move_submission": "move",
    "click i.icon-cancel": "closeModal",
    "change select[name='list_select_options']": "updatePositionOptions",
    "change select[name='position_select_options']": "updatePositionSelection",
    "click .move_card_popup": "preventClose"
  },
  el: "div",
  closeModal: function() {
    $('.pop-over').attr('class', 'pop-over');
  },
  initialize: function(options) {
    var unarchivedLists = App.board.lists.reject({archived: true});
    var lists = _.invoke(unarchivedLists, "pick", ["title", "id"]);
    this.originalList = options.list
    var self = this;
    var unarchivedCards = this.originalList.cards.reject({archived: true});

    var cardIDs = _.map(unarchivedCards, function(card) {
      return self.originalList.cards.indexOf(card);
    });

    var position = unarchivedCards.indexOf(self.model) + 1;

    this.data = {
      position: position,
      list: self.originalList.get("title"),
      lists: lists, // array of objects, with title and id
      cards: cardIDs // array of card ids
    }

    this.render(this.data);
    $("div.all_lists_dropdown_placeholder select").val(self.originalList.get("id"));
    $("div.all_positions_dropdown_placeholder select").val(+position - 1);
  },
  move: function() {
    var newListID = $(".list_select_options").val();
    var position = $(".position_select_options").val();

    var oldListID = this.originalList.get("id");
    var cardID = this.model.get("id");
    App.updateCardPosition([+oldListID, +newListID, +cardID, +position]);
    this.closeModal();
  },
  preventClose: function() {
    return false;
  },
  render: function(data) {
    $('.pop-over').attr('class', 'pop-over move_card is-shown');
    $('.pop-over').html(this.template(data));
  },
  selectNewList: function(e) {
    
    this.data
  },
  updatePositionOptions: function(e) {
    var unarchivedLists = App.board.lists.reject({archived: true});
    var lists = _.invoke(unarchivedLists, "pick", ["title", "id"]);

    var listID = $(".list_select_options").val();
    var list = App.board.lists.findWhere({id: +listID});
    var position = 1;
    var unarchivedCards = list.cards.reject({archived: true});

    var cardIDs = _.map(unarchivedCards, function(card) {
      return list.cards.indexOf(card);
    });

    if (list === this.originalList) {
      position = unarchivedCards.length
    } else {
      position = unarchivedCards.length + 1
      cardIDs.push('add_at_end');
    }

    newData = {
      position: position,
      list: list.get("title"),
      lists: lists, // array of objects, with title and id
      cards: cardIDs // array of card ids
    }

    this.render(newData);
    $("div.all_lists_dropdown_placeholder select").val(list.get("id"));
    $("div.all_positions_dropdown_placeholder select").val(position - 1);   
  },
  updatePositionSelection: function() {
    var positionID = +$(".position_select_options").val() + 1;
    $(".position_value").html(positionID);
    return false;
  },
});
