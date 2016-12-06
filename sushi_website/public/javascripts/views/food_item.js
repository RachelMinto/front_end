var FoodItemView = Backbone.View.extend({
  tagName: "li",
  template: App.templates.food_item,
  render: function() {
    var id = this.model.get("id");

    this.$el.attr("id", "item_" + id);
    this.$el.html(this.template(this.model.toJSON()));
    console.log('rendering view!');
    this.$el.appendTo(App.$el.find("ul"));
  },
  initialize: function() {
    this.render();
    this.model.view = this;
  }
});