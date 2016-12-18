var ListView = Backbone.View.extend({
  className: "wrapper list",  
  events: {
    // "click": ""
  },
  template: App.templates.list,
  render: function() {
    this.$el.html(this.template(this.model.toJSON()))
    this.$el.appendTo($('#board_canvas'));
  },
  initialize: function() {
    this.render();
    // subscribe to notifications from selected board, list, and item changes.
  },
});