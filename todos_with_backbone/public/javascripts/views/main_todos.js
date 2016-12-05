var MainListView = Backbone.View.extend({
  attributes: {
    id: "index"
  },
  events: {
    "click": "addTodo"
  },
  // template: App.templates.index,
  addTodo: function(e) {
    e.preventDefault();
    this.trigger("add_todo");
  },
  render: function() {
    this.$el.html(this.template());
    App.$el.html(this.$el);
  },
  initialize: function() {
    this.render();
  }
});