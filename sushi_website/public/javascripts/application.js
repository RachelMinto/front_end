var App = {
  templates: JST,
  $el: $('main'),
  indexView: function() {
    this.index = new IndexView();
    this.renderFoodItems();
  },
  initializeData: function() {
    this.index = new IndexView();
    this.renderFoodItems();
    this.createCart();
    this.bindEvents();
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
  getMenuItem: function(id) {
    return this.food_items.findWhere({ "id": +id });
  },
  renderMenuItem: function(id) {
    var foodItem = this.getMenuItem(+id) || id;  // Need to rename or modify this - param could be id or model.
    new MenuView({
      model: foodItem
    });
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
  bindEvents: function() {
    _.extend(this, Backbone.Events);
    // this.listenTo(this.index, "add_album", this.newAlbum);
    this.on("render_menu_item", this.renderMenuItem);
    this.on("previous_menu_item", this.renderPrevious);
    this.on("next_menu_item", this.renderNext);
  },
};