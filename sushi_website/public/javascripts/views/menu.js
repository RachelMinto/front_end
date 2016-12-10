var MenuView = Backbone.View.extend({
  tagName: "div",
  template: App.templates.menu,
  events: {
    "click .previous": "renderPreviousMenuView",
    "click .next": "renderNextMenuView"
  },
  renderPreviousMenuView: function() {
    App.trigger("previous_menu_item", this.model);
  },
  renderNextMenuView: function() {
    App.trigger("next_menu_item", this.model);
  },
  render: function() {
    var id = this.model.get("id");

    this.$el.attr("id", "item_" + id);
    this.$el.attr("class", "food_item");
    this.$el.html(this.template(this.model.toJSON()));
    App.$el.html(this.$el);
  },
  initialize: function() {
    this.render();
    this.model.view = this;
  }
});