var CopyCard = Backbone.View.extend({
  template: App.templates.copy_card,
  events: {
    "click .copy_card_submission": "copy",
    "click i.icon-cancel": "closeModal",
    "change select[name='list_select_options']": "updatePositionOptions",
    "change select[name='position_select_options']": "updatePositionSelection",
    "click .copy_card_popup": "preventClose"
  },
  el: "div",
  closeModal: function() {
    $('.pop-over').attr('class', 'pop-over');
  },
  initialize: function() {
    var unarchivedCards = this.model.collection.reject({archived: true});
    var unarchivedLists = App.board.lists.reject({archived: true});
    var lists = _.invoke(unarchivedLists, "pick", ["title", "id"]);
    var self = this;

    var cardIDs = _.map(unarchivedCards, function(card) {
      return self.model.collection.indexOf(card);
    });

    var position = unarchivedCards.indexOf(self.model) + 1;

    this.data = {
      position: position,
      card: self.model.get("title"),
      list: self.model.collection.parentList.get("title"),
      lists: lists,
      cards: cardIDs
    }

    this.render(this.data);
    $("div.all_lists_dropdown_placeholder select").val(self.model.collection.get("id"));
    $("div.all_positions_dropdown_placeholder select").val(+position - 1);
  },
  copy: function() {
    var newListID = $(".list_select_options").val();
    var position = $(".position_select_options").val();

    var newCardModel = this.model.clone();

    var title = $(".copy_card_title_text").val();
    newCardModel.unset("id");
    newCardModel.set("title", title);

    App.addCardToList(+newListID, newCardModel);
    this.closeModal();
  },
  preventClose: function() {
    return false;
  },
  render: function(data) {
    $('.pop-over').attr('class', 'pop-over copy_card is-shown');
    $('.pop-over').html(this.template(data));
    $('.copy_card_title_text').focus().select();
  },
  updatePositionOptions: function(e) {
    var unarchivedLists = App.board.lists.reject({archived: true});
    var lists = _.invoke(unarchivedLists, "pick", ["title", "id"]);

    var listID = $(".list_select_options").val();
    var list = App.board.lists.findWhere({id: +listID});
    var position = 1;
    var unarchivedCards = list.cards.reject({archived: true});
    var title = $(".copy_card_title_text").val();    

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
    $(".copy_card_title_text").val(title);    
  },
  updatePositionSelection: function() {
    var positionID = +$(".position_select_options").val() + 1;
    $(".position_value").html(positionID);
    return false;
  },
});