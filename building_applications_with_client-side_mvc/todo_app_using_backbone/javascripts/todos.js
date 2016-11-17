var App = {
  $el: $("main"),
  $todos: $("#todos"),
  newTodo: function(e) {
    e.preventDefault();
    var name = $(e.target).find("#todo_name").val();
    var model;
    var view;

    if (!name) { return; }

    model = this.Todos.add({
      name: name,
      complete: false
    });
    view = new TodoView( { model: model });
    view.$el.appendTo(this.$todos);

    e.target.reset();
  },
  clearCompleted: function(e) {
    e.preventDefault();

    var completed = App.Todos.models.filter(function(model) {
      return model.attributes.complete;
    });

    completed.forEach(function(model) {
      App.Todos.remove(model);
    });
  },
  bind: function() {
    this.$el.find("form").on("submit", this.newTodo.bind(this));
    this.$el.find("#clear").on("click", this.clearCompleted.bind(this));
  },
  init: function() {
    this.bind();
  }
};

var templates = {};

$('[type="text/x-handlebars"]').each(function() {
  var $t = $(this);

  templates[$t.attr("id")] = Handlebars.compile($t.html());
});

App.TodoConstructor = new Backbone.Model.extend({});
App.TodosConstructor = new Backbone.Collection.extend({});
App.Todos = new App.TodosConstructor(App.TodoConstructor);


TodoView = Backbone.View.extend({
  tagName: "li",
  attributes: {},
  events: {
    "click": "editTodo",    
    "click a": "toggleComplete",
  },
  template: Handlebars.compile($("#todo").html()),
  render: function() {
    this.$el.html(this.template({ name: this.model.attributes.name}));
    return this.$el;
  },
  remove: function() {
    this.$el.remove();
  },
  toggleComplete: function(e) {
    var $li = $(e.target).closest("li");
    this.model.set("complete", !this.model.get("complete"));
    $li.toggleClass("complete", this.model.get("complete"));

    return false;
  },
  editTodo: function(e) {
    var $editForm = $(templates.todo_edit(this.model.attributes))
    
    this.$el.after($editForm);
    this.$el.remove();

    $editForm.on("blur", "input", this.hideEdit.bind(this));
  },
  hideEdit: function(e) {
    var $input = $(e.currentTarget);
    var $li = $input.closest("li");
    var name = $input.val();
    var idx = +$li.attr('data-id');

    this.model.set("name", name);
    $li.after(this.$el.html(this.template({ name: this.model.attributes.name})));
    $li.remove();
    debugger;
    $input.off(e);
  },  
  initialize: function() {
    var $el = $("#todos");
    this.render();
  }
});



App.init();
