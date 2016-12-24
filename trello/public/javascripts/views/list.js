var ListView = Backbone.View.extend({
  className: "wrapper list",
  events: {
    "click .list_header": "renameView",
    "click li": "EditMenuView",
    "blur input#new_list_name": "updateName",
    "click input#new_card_name": "addingNewCard",
    "drop": "drop",
    "click .add_card": "showCardComposer",
    "submit form": "addCard",
    "click .submit_new_card": "addCard",
    "click .icon-ellipsis": "openEditListMenu",
    "click .list_options_add_card": "showCardComposer",
    "click .icon-cancel": "closeEditListMenu"
  },
  template: App.templates.list,
  addingNewCard: function(e) {
    return false;
  },
  openEditListMenu: function() {
    this.$el.find(".list_options_popup").removeClass("invisible");
    return false;
  },
  closeEditListMenu: function() {
    this.$el.find(".list_options_popup").addClass("invisible");
    return false;    
  },
  showCardComposer: function(e) {
    this.$el.find(".list_options_popup").addClass("invisible");
    this.$el.find(".add_card").addClass("invisible");
    this.$el.find(".add_card_composer").removeClass("invisible");
    return false;
  },
  addCard: function(e) {
    e.preventDefault();
    var self = this;
    var $f = this.$("form")

    $.ajax({
      url: $f.attr("action"),
      type: $f.attr("method"),
      data: $f.serialize(),
      success: function(json) {
        debugger;
        var newCard = self.model.cards.add(json);
        var $card = self.renderItem(newCard);
        $card.$el.addClass("ui-sortable-handle");
        $card.$el.appendTo(self.$el.find('ul'));
        self.$el.find(".add_card").removeClass("invisible");
        self.$el.find("#new_card_name").val("");
        self.$el.find(".add_card_composer").addClass("invisible");        
      },
      error: function(json) {
        debugger;
      }
    });

    this.$el.find(".add_card").removeClass("invisible");
  },
  drop: function(event, index) {
    App.trigger('updateListPositions', [this.model, index]);
  },   
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    this.renderCollection();
    this.$el.appendTo($('#board_canvas'));
  },
  renameView: function() {
    this.$el.find(".new_list_title_input").removeClass("invisible");
    this.$el.find(".list_title_header").addClass("invisible");
  },
  EditMenuView: function(e) { // Can I remove this?
    return false;
  },
  updateName: function(e) {
    this.model.set('title', e.target.value);
    this.$el.find(".list_title").html(e.target.value);

    this.$el.find(".new_list_title_input").addClass("invisible");
    this.$el.find(".list_title_header").removeClass("invisible");
    this.model.sync("update", this.model)
  },
  renderCollection: function() {
    var self = this;
    self.$el.find('ul').empty();

    if (this.model.cards) {
      this.model.cards.each(function(model){
        var $card = self.renderItem(model);
        $card.$el.appendTo(self.$el.find('ul'));
      });
    };
  },
  renderItem: function(model) {
    var cardEl = new CardView({ model: model });
    return cardEl;
  },
  initialize: function() {
    this.render();
    $('.list_container').sortable({ 
      connectWith: '.list_container',
      placeholder: "ui-sortable-placeholder",
      forcePlaceholderSize: true,
      start: function(event, ui) {
        ui.item.startListID = $(this.closest('ul')).data('id');
      },
      receive: function(event, ui) {
        var oldListID = +ui.item.startListID
        var newListID = +$(event.target).attr("data-id");
        var cardID = +ui.item.data('id');
        var position = ui.item.index();
        App.trigger('updateCardPosition', [oldListID, newListID, cardID, position]);
      },
    });
    this.listenTo(this.model.cards, 'card_collection_updated', this.renderCollection)
    // subscribe to notifications from selected board, list, and item changes.
  },
});