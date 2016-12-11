var HeaderView = Backbone.View.extend({
  template: App.templates.header,  
  render: function() {
    // debugger;
    $("header").html(this.template({
      quantity: this.collection.getQuantity(),
    }));
  },
  initialize: function() {
    this.render();
    this.listenTo(this.collection, "cart_updated", this.render);
  }
});