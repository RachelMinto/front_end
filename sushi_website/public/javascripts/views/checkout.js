var CheckoutView = Backbone.View.extend({
  template: App.templates.checkout,
  events: {
    "click": "destroy",
    "click a": "empty"
  },
  destroy: function(e) {
    e.preventDefault();
    var $e = $(e.target);
    this.collection.trigger("destroy", +$e.attr("data-id"));
    this.render();
  },
  completeCheckout: function(e) {
    e.preventDefault();
    this.collection.trigger("empty");
    //return to home page.
  },
  render: function() {
    App.hideCartPreview();
    App.$el.html(this.template({
      cart_items: this.collection.toJSON(),
      total: this.collection.getTotal()
    }));
  },
  hide: function() {
    this.remove();
  },
  initialize: function() {
    // this.listenTo(this.collection, "cart_updated", this.render);
    this.render();
  }
});