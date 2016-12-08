var FoodItemView = Backbone.View.extend({
  tagName: "li",
  template: App.templates.food_item,
  events: {
    "click": "renderMenuView"
  },
  renderMenuView: function() {
    App.trigger("render_menu_item", this.model);
  },
  render: function() {
    var id = this.model.get("id");

    this.$el.attr("id", "food_item_" + id);
    this.$el.html(this.template(this.model.toJSON()));
    this.$el.appendTo(App.$el.find("ul"));
  },
  initialize: function() {
    this.render();
    this.model.view = this;
  }
});