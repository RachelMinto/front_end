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
  init: function() {
    this.bind();
    this.cacheTemplate();
  },
  cacheTemplate: function() {
    $template = $('#main_todos').remove();
    this.mainListTemplate = Handlebars.compile($template.html());
    console.log(this.mainListTemplate());
  },
  add: function(e) {
    e.preventDefault();
    $modal.prop("checked", false);
    todo = this.createToDo();
    localStorage.setItem('todo', JSON.stringify(todo));
    this.updateTodoList();
  },
  delete: function() {

  },
  createToDo: function() {
    var todo = {
      title: $form.find("#title").val() || "no title",
      due_date: $form.find("#due_date").val() || "No Due Date",
      description: $form.find("#description").val() || "no description",
      id: current_id,
    }

    current_id++;
    return todo;
  },
  updateTodoList: function() {
    console.log(localStorage.getItem('todo'));
  },
  completeToDo: function(e) {
    e.preventDefault();
    console.log('completed');
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

