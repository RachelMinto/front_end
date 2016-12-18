var HeaderView = Backbone.View.extend({
  events: {
    // "click": ""
  },
  template: App.templates.header,
  render: function() {
    $('header').html(this.template(this.model.toJSON()));
  },
  initialize: function() {
    this.render();
    // subscribe to notifications from selected board, list, and item changes.
  },
});