var CheckoutView = Backbone.View.extend({
  template: App.templates.checkout,
  el: App.$el,
  events: {
    "click .empty": "cancelOrder",
    "blur input#checkout_quantity": "updateQuantity"
  },
  completeCheckout: function(e) {
    e.preventDefault();
    this.collection.trigger("empty");
  },
  cancelOrder: function(e) {
    e.preventDefault();
    this.collection.trigger("empty");
    Backbone.history.navigate("/", { trigger: true });
  },  
  render: function() {
    App.hideCartPreview();  // Will I still need this?
    App.$el.html(this.template({
      cart_items: this.collection.toJSON(),
      total: this.collection.getTotal()
    }));
  },
  updateQuantity: function(e) {
    var newQuantity = +$(e.target).val();
    var id = $(e.target).closest('tr').attr("data-id");
    var toAdd = App.getMenuItem(id);
    this.collection.updateQuantity(toAdd, newQuantity);
    this.collection.setTotal();
    this.render();
  },
  hide: function() {
    this.remove();
  },
  initialize: function() {
    this.render();
  }
});