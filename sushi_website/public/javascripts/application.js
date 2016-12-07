var App = {
  templates: JST,
  $el: $('main'),
  indexView: function() {
    this.index = new IndexView();
    this.renderFoodItems();
    this.createCart();
    this.bindEvents();
  },
  renderMenuItem: function(food_item) {
    this.renderFoodItemView(food_item);
  },
  createCart: function() {
    this.cart = new CartItems();
    this.cart.view = new CartView({
      collection: this.cart   //where does this.cart live?
    });
  },
  renderFoodItems: function() {
    this.food_items.each(this.renderFoodItemView); //this.food_items is set up in index.jade script. Reduces load time by reducing http requests.
  },
  renderFoodItemView: function(foodItem) {
    new FoodItemView({
      model: foodItem
    });
  },      
  bindEvents: function() {
    _.extend(this, Backbone.Events);
    this.listenTo(this.index, "add_album", this.newAlbum);
    // this.on("render_menu_item", console.log('triggered'));
  },
};