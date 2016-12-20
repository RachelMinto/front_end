var ListView = Backbone.View.extend({
  className: "wrapper list",
  events: {
    "click .list_header": "renameView",
    "click span": "EditMenuView",
    "blur input": "updateName",
    "drop": "drop",
  },
  template: App.templates.list,  
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
    console.log("edit menu for list");
  },
  updateName: function(e) {
    this.model.set('title', e.target.value);
    var newName = "<h3>" + e.target.value + "</h3>"
    this.$el.find("input").replaceWith(newName);

    $.ajax({
      url: "/board/1",
      type: "put",
      data: this.model.toJSON(),
      success: function(json) {
        console.log('i got some data!');
      }
    });    
  },
  renderCollection: function() {
    var self = this;
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
      remove: function(event, ui) {
        debugger;
        App.trigger('removeDraggedCard', ui);
      },
      receive: function(event, ui) {
        App.trigger('addDroppedCard', ui);
      },
    });
    this.listenTo(this.model.cards, 'card_collection_updated', this.render)    
    // subscribe to notifications from selected board, list, and item changes.
  },
});