var CartView = Backbone.View.extend({
  template: App.templates.cart,
  el: $(".cart_preview").get(0),
  events: {
    "click": "destroy",
    "click .empty": "empty"
  },
  destroy: function(e) {
    e.preventDefault();
    var $e = $(e.target);
    this.collection.trigger("destroy", +$e.attr("data-id"));
    this.render();
  },
  empty: function(e) {
    if (e) { e.preventDefault(); }
    this.collection.trigger("empty");
  },
  render: function() {
    if (this.collection.toJSON().length === 0) { 
      $(this.el).hide();
      return; 
    }

    $('.cart_preview').html(this.template({
      quantity: this.collection.getQuantity(),
      cart_items: this.collection.toJSON().splice(0, 8),
      total: this.collection.getTotal()
    })).slideDown();

    this.delegateEvents();
  },
  initialize: function() {
    this.listenTo(this.collection, "cart_updated", this.render);
  }
});