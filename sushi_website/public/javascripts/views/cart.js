var CartView = Backbone.View.extend({
  template: App.templates.cart,
  el: $(".cart_preview").get(0),
  events: {
    "click": "destroy"
  },
  destroy: function(e) {
    e.preventDefault();
    var $e = $(e.target);
    this.collection.trigger("destroy", +$e.attr("data-id"));
    this.render();
  },
  render: function() {
    $('.cart_preview').html(this.template({
      quantity: this.collection.getQuantity(),
      cart_items: this.collection.toJSON(),
      total: this.collection.getTotal()
    }));
    this.delegateEvents();
  },
  initialize: function() {
    this.listenTo(this.collection, "cart_updated", this.render);
  }
});