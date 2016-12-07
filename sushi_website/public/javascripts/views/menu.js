var MenuView = Backbone.View.extend({
  tagName: "li",
  template: App.templates.menu,
  render: function() {
    var id = this.model.get("id");
    console.log("rendering views/menu.js");

    this.$el.attr("id", "item_" + id);
    this.$el.html(this.template(this.model.toJSON()));
    this.$el.appendTo(App.$el.find("ul"));
  },
  initialize: function() {
    this.render();
    this.model.view = this;
  }
});