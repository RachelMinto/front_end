var App = {
  templates: JST,
  $el: $('main'),
  indexView: function() {
    this.index = new IndexView();
    this.renderFoodItems();
    this.createCart();
    this.bindEvents();
  },
  renderFoodItems: function() {
    this.foodItems.each(this.renderFoodItemView); //Where does this.albums come from?
  },
  createCart: function() {
    this.cart = new CartItems();
    this.cart.view = new CartView({
      collection: this.cart   //where does this.cart live?
    });
  },
  renderFoodItemView: function(foodItem) {
    new FoodItemView({
      model: FoodItem
    });
  },
  newAlbum: function() {
    new NewAlbumView();
  },
  bindEvents: function() {
  },
};