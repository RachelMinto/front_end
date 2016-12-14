var App = {
  templates: JST,
  $el: $('main'),
  indexView: function() {
    this.index = new IndexView();
    this.renderFoodItems();
    this.showCartPreview();
  },
  initializeData: function() {
    this.createCart();    
    this.index = new IndexView();
    this.renderFoodItems();
    this.renderHeader();
    this.bindEvents();
  },
  createCart: function() {
    this.cart = new CartItems();
    this.cart.view = new CartView({
      collection: this.cart
    });
  },
  submitOrder: function(e) {
    this.cart.view.empty(e);
    this.hideCartPreview();
    Backbone.history.navigate("/", { trigger: true });
  },
  renderHeader: function() {
    new HeaderView({
      collection: this.cart
    });
  },
  showCartPreview: function() {
    if (App.cart.length > 0) {
      $(App.cart.view.el).show();
    }
  },
  hideCartPreview: function() {
    $(App.cart.view.el).hide()
  },
  renderFoodItems: function() {
    this.food_items.each(this.renderFoodItemView);//this.food_items is set up in index.jade script. Reduces load time by reducing http requests.
    this.cart.view.render();
  },
  getMenuItem: function(id) {
    return this.food_items.findWhere({ "id": +id });
  },
  renderMenuItem: function(id) {
    var foodItem = this.getMenuItem(+id) || id;  // Need to rename or modify this - param could be id or model.
    new MenuView({
      model: foodItem
    });
    this.cart.view.render();
  },        
  renderPrevious: function(current) {
    var id = current.id === 1 ? this.food_items.length : current.id - 1
    Backbone.history.navigate("/menu/" + id, { trigger: true });
  },
  renderNext: function(current) {
    var id = current.id === this.food_items.length ? 1 : current.id + 1
    Backbone.history.navigate("/menu/" + id, { trigger: true });
  },  
  renderFoodItemView: function(foodItem) {
    new FoodItemView({
      model: foodItem
    });
  },
  renderCheckout: function() {
    this.hideCartPreview();
    new CheckoutView({
      collection: this.cart
    });
  },
  addToCart: function(model) {
    this.cart.addItem(model);
  },
  bindEvents: function() {
    _.extend(this, Backbone.Events);
    // this.on("add_to_cart", this.cart.addItem.bind(this.cart));
    this.on("add_to_cart", this.addToCart);
    this.on("render_menu_item", this.renderMenuItem);
    this.on("previous_menu_item", this.renderPrevious);
    this.on("next_menu_item", this.renderNext);
    this.on("cart_updated", this.showCartPreview)
  },
};

Handlebars.registerHelper("format_price", function(price) {
  return (+price).toFixed(2);
})