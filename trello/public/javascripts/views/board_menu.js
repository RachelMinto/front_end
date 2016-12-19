var BoardMenuView = Backbone.View.extend({
  className: "wrapper",
  id: "board_menu_wrapper",
  events: {
    "click #close_menu": "hide"
  },
  template: App.templates.board_menu,
  render: function() {
    $('#surface').append(this.$el.html(this.template(this.model.toJSON())))
    this.hide();
  },
  hide: function() {
    this.$el.animate({ "left": "+=340px" }, "slow");
  },
  show: function() {
    this.$el.animate({ "left": "-=340px" }, "slow"); // Need to slow this down.
  },
  initialize: function() {
    this.render();
    // subscribe to notifications from selected board, list, and item changes.
  },
});