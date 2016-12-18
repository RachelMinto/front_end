var ListView = Backbone.View.extend({
  className: "wrapper list",
  events: {
    // "click": ""
  },
  template: App.templates.list,
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    this.renderCollection();
    this.$el.appendTo($('#board_canvas'));
  },  
  renderCollection: function() {
    var self = this;
    this.model.cards.each(function(model){
      var $card = self.renderItem(model);
      debugger;
      $card.$el.appendTo(self.$el.find('ul'));
    });
  },
  renderItem: function(model) {
    var cardEl = new CardView({ model: model });
    return cardEl;
  },
  initialize: function() {
    this.render();
    // subscribe to notifications from selected board, list, and item changes.
  },
});