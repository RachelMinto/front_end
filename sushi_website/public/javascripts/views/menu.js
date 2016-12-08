var MenuView = Backbone.View.extend({
  tagName: "div",
  template: App.templates.menu,
  render: function() {
    var id = this.model.get("id");

    this.$el.attr("id", "item_" + id);
    this.$el.attr("class", "food_item");
    this.$el.html(this.template(this.model.toJSON()));
    App.$el.find('ul').html('');
    App.$el.find('.content').html(this.$el);
    // this.$el.appendTo(App.$el.find("ul"));
  },
  initialize: function() {
    this.render();
    this.model.view = this;
  }
});