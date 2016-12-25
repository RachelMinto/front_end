var MoveCardView = Backbone.View.extend({
  template: App.templates.move,
  events: {
    // "click .all_lists_dropdown_placeholder": "showListOptions",
    // "click .move_card_position_placeholder": "showPositionOptions",
    // "click .move_card_list_names": "selectNewList",
    "click .move_submission": "move",
    "change select[name='list_select_options']": "updatePositionOptions",
    "click .move_card_popup": "preventClose"
  },
  el: "div",
  closeModal: function() {
    this.undelegateEvents();
    this.$el.removeData().unbind();
  },
  initialize: function(options) {
    this.lists = App.board.lists.invoke("pick", ["title", "id"]);
    this.originalPosition = options.position;
    this.originalList = options.list
    var cards = this.originalList.cards.invoke("pick", ["title", "id"]);

    this.data = {
      position: options.position,
      list: options.list.get("title"),
      lists: this.lists,
      cards: cards
    }
    // specify which list and position are selected!! 
    this.render(this.data);
  },
  move: function() {
    var newListID = $(".list_select_options").val();
    var position = $(".list_position_options").val();
    var oldListID = this.orignalList.get("id");
    var cardID = this.model.get("id");
    App.updateCardPosition([oldListID, newListID, cardID, position]);
    this.closeModal();
  },
  preventClose: function() {
    return false;
  },
  render: function(data) {
    $('.pop-over').attr('class', 'pop-over move_card"');
    $('.pop-over').html(this.template(data));
  },
  selectNewList: function(e) {
    
    this.data
  },
  updatePositionOptions: function(e) {
    var self = this;
    var listID = $(".list_select_options").val();
    var list = App.board.lists.findWhere({id: +listID});
    var position = 1

    if (list === this.originalList) {
      position = originalPosition;
    } else {
      position = list.cards.length;
    }

    this.data = {
      position: options.position,
      list: options.list,
      lists: lists,
      cards: list.cards
    }    

    this.render(data)
  },
  showPositionOptions: function() {
    debugger;
    var listID = $(".list_select_options").val();

    return false;
  },  
});