var $open = $("#open");
var $complete = $("#complete_todo");
var $add = $("#save_todo");
var $modal = $('#open_modal_checkbox');
var $form = $("form");
var current_id = 0;

function toDoList() {
  this.init();
}

toDoList.prototype = {
  collection: [],
  init: function() {
    this.bind();
    this.cacheTemplate();
  },
  cacheTemplate: function() {
    $template = $('#main_todos').remove();
    this.mainListTemplate = Handlebars.compile($template.html());
  },
  add: function(e) {
    e.preventDefault();
    $modal.prop("checked", false);
    todo = this.createToDo();
    this.collection.push(todo);
    localStorage.setItem('todo', JSON.stringify(todo));
    this.updateTodoList(todo);
    $form.trigger("reset");
  },
  delete: function() {

  },
  createToDo: function() {
    var todo = {
      title: $form.find("#title").val() || "no title",
      mm_yy: $form.find("#month").val() + '/' + $form.find("#year").val() || "No Due Date",
      description: $form.find("#description").val() || "no description",
      id: current_id,
    }

    current_id++;
    return todo;
  },
  updateTodoList: function(todo) {
    var $item = $(this.mainListTemplate({ 
      title: todo.title,
      due_date: todo.mm_yy,
    }));
    $('ul').append($item);
  },
  completeToDo: function(e) {
    e.preventDefault();
    $modal.prop("checked", false);
  },
  openModal: function(e) {
    e.preventDefault();
    $modal.prop("checked", true);
  },
  bind: function() {
    $open.on("click", this.openModal.bind(this));
    $complete.on("click", this.completeToDo.bind(this));
    $add.on("click", this.add.bind(this));
  },
}

toDos = new toDoList();

