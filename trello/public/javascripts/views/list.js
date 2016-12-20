var ListView = Backbone.View.extend({
  className: "wrapper list",
  events: {
    "click .list_header": "renameView",
    "click span": "EditMenuView",
    "blur input": "updateName",
  },
  template: App.templates.list,
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
    this.$el.sortable();
    this.listenTo(this.model.cards, 'card_collection_updated', this.render)    
    // subscribe to notifications from selected board, list, and item changes.
  },
});