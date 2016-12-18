var CardView = Backbone.View.extend({
  // className: "",
  tagName: "li",
  events: {
    "click": "something"
  },
  template: App.templates.card,
  render: function() {
    // this.$el.html(this.template(this.model.toJSON()))
    // this.$el.appendTo($('#board_canvas'));
  },
  something: function() {
    console.log('i clicked a list item!');
  },
  cardHTML: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this.$el
  },
  initialize: function(card) {
    return this.cardHTML();
    // subscribe to notifications from selected board, list, and item changes.
    // this.model.collection._byId
  },
});