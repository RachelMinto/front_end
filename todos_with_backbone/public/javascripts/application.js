var App = {
  // templates: JST,
  $el: $('main'),
  mainListView: function() {
    this.main = new mainListView();
    this.renderTodos();
    // this.bindEvents();
  },
  renderTodos: function() {
    this.todos.each(this.renderTodoView);
  },
  renderTodoView: function(todo) {
    new TodoView({
      model: todo
    });
  },
  // newTodo: function() {
  //   new NewTodoView(); // not yet created.
  // },
  // bindEvents: function() {
  //   _.extend(this, Backbone.Events);
  //   this.listenTo(this.index, "add_album", this.newAlbum);
  //   this.on("add_to_cart", this.cart.addItem.bind(this.cart));
  // },
};

// Handlebars.registerHelper("format_price", function(price) {
//   return (+price).toFixed(2);
// })