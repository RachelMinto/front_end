var ListView = Backbone.View.extend({
  className: "wrapper list",
  events: {
    "click .list_header": "renameView",
    "click span": "EditMenuView",
    "blur input#new_list_name": "updateName",
    "drop": "drop",
    "click .add_card": "add_card_popup"
  },
  template: App.templates.list,
  add_card_popup: function(e) {
    e.preventDefault();
    e.stopPropagation();
    self = this;

    this.$el.find(".add_card").addClass("invisible");
    var addCardView = new AddCardView({id: self.model.id});
    var addCardHTML = addCardView.getView();
    this.$el.append(addCardHTML);
    this.listenTo(addCardView, "add_card", this.addCard)
    // View should destroy on submit or click outside.
    // class should be removed from "add a card" on destruction of form view.
  },
  addCard: function($f) {
    var self = this;

    $.ajax({
      url: $f.attr("action"),
      type: $f.attr("method"),
      data: $f.serialize(),
      success: function(json) {
        self.model.cards.add(json);
        var $card = self.renderItem(json);
        $card.$el.appendTo(self.$el.find('ul'));
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
    var edit_content = App.templates.list_edit_name(this.model.toJSON());
    this.$el.find("h3").replaceWith(edit_content);
  },
  EditMenuView: function(e) {
    e.stopPropagation();
  },
  updateName: function(e) {
    this.model.set('title', e.target.value);
    var newName = "<h3>" + e.target.value + "</h3>"
    this.$el.find("input").replaceWith(newName);
    this.sync("update", this);
  },
  renderCollection: function() {
    var self = this;
    if (this.model.cards) {
      this.model.cards.each(function(model){
        var $card = self.renderItem(model.toJSON());
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
        var oldListID = ui.item.startListID
        var newListID = $(event.target).attr("data-id");
        var cardID = ui.item.data('id');
        var position = ui.item.index();
        App.trigger('updateCardPosition', [oldListID, newListID, cardID, position]);
      },
    });
    this.listenTo(this.model.cards, 'card_collection_updated', this.render)
    // subscribe to notifications from selected board, list, and item changes.
  },
});