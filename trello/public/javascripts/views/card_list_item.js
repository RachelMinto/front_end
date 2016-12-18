var CardView = Backbone.View.extend({
  // className: "",
  tagName: "li",
  events: {
    // "click": ""
  },
  template: App.templates.card,
  render: function() {
    this.$el.html(this.template(this.model.toJSON()))
    // this.$el.appendTo($('#board_canvas'));
  },
  initialize: function(card) {
    debugger;
    // subscribe to notifications from selected board, list, and item changes.
    // this.model.collection._byId
  },
});