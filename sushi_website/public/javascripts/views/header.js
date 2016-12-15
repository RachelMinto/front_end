var HeaderView = Backbone.View.extend({
  template: App.templates.header,  
  render: function() {
    $("header").html(this.template({
      quantity: this.collection.getQuantity(),
    }));
  },
  initialize: function() {
    this.render();
    this.listenTo(this.collection, "cart_updated", this.render);
  }
});