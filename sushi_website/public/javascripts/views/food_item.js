var FoodItemView = Backbone.View.extend({
  tagName: "li",
  template: App.templates.food_item,
  events: {
    "click a": "addToCart",
    "click": "renderMenuView"
  },
  renderMenuView: function() {
    Backbone.history.navigate("/menu/" + this.model.id, { trigger: true });
  },
  addToCart: function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    App.trigger("add_to_cart", this.model);
  },  
  render: function() {
    var id = this.model.get("id");

    this.$el.attr("id", "food_item_" + id);
    this.$el.html(this.template(this.model.toJSON()));
    this.$el.appendTo(App.$el.find("ul"));
    this.delegateEvents();
  },
  initialize: function() {
    this.render();
    this.model.view = this;
  }
});