var App = {
  templates: JST,
  $el: $('main'),
  init: function() {
    this.renderFoodItems();
  },
  indexView: function() {
    this.index = new IndexView();
    this.renderFoodItems();
    this.createCart();
    this.bindEvents();
  },
  renderFoodItems: function() {
    this.food_items.each(this.renderFoodItemView); //this.food_items is set up in index.jade script. Reduces load time by reducing http requests.
  },
  createCart: function() {
    this.cart = new CartItems();
    this.cart.view = new CartView({
      collection: this.cart   //where does this.cart live?
    });
  },
  renderFoodItemView: function(foodItem) {
    new FoodItemView({
      model: foodItem
    });
  },
  bindEvents: function() {
  },
};