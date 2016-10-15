var $open = $("#open");
var $complete = $("#complete_todo");
var $add = $("#save_todo");
var $modal = $('#open_modal_checkbox');
var $form = $("form");
var current_id;
var $total = $('main div.circle');
var $table = $('table');

function toDoList() {
  this.init();
}

toDoList.prototype = {
  collection: [],
  init: function() {
    this.bind();
    this.cacheTemplate();
    this.loadTodos();
    current_id = localStorage.getItem('current_id') || 0;    /*need to fix this! */
    localStorage.removeItem('todos');
  },
  cacheTemplate: function() {
    $template = $('#main_todos').remove();
    this.mainListTemplate = Handlebars.compile($template.html());
  },
  loadTodos: function() {
    var previousToDos = JSON.parse(localStorage.getItem('todos'));
    var self = this;
    previousToDos.forEach(function(todo) {
      self.collection.push(todo);
      self.updateTodoList(todo);
    });
    $total.text(previousToDos.length);
  },
  add: function(e) {
    e.preventDefault();
    $modal.prop("checked", false);
    todo = this.createToDo();
    this.collection.push(todo);
    this.updateTodoList(todo);
    $total.text(this.collection.length);
    $form.trigger("reset");
  },
  delete: function(e) {
    e.stopPropagation();
    console.log('delete');    
    var $todo = $(e.target).closest('tr');
    console.log($todo);
    this.removeFromCollection($todo.attr('data-id'));
    $todo.remove();
    $total.text(this.collection.length);

  },
  edit: function(e) {
    console.log('edit');    
    e.stopPropagation();
  },
  toggleComplete: function(e) {
    console.log('toggle complete');
    e.stopPropagation();
  },
  removeFromCollection: function(id) {

    this.collection = this.collection.filter(function(item) {    
      return Number(item.id) !== Number(id);
    });
  },
  createToDo: function() {
    var month_year = $form.find("#month").val() + '/' + $form.find("#year").val();
    var mmYY = this.setMonthYear(month_year);
    var todo = {
      title: $form.find("#title").val() || "no title",
      mm_yy: mmYY,
      description: $form.find("#description").val() || "no description",
      id: current_id,
    }
    current_id++;
    return todo;
  },
  setMonthYear: function(month_year) {
    if (month_year !== "null/null") {
      var date = month_year;
      } else {
      var date = "No Due Date";
      };
    return date;
  },
  updateTodoList: function(todo) {
    var $item = $(this.mainListTemplate({ 
      id: todo.id,
      title: todo.title,
      due_date: todo.mm_yy,
    }));
    $('main table').append($item);
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
    $table.on('click', 'tr', this.toggleComplete.bind(this));    
    $table.on('click', '#edit', this.edit.bind(this));     
    $table.on('click', '#delete', this.delete.bind(this));    
  },
}

toDos = new toDoList();

$(window).on('unload', function() {
  localStorage.removeItem('todos');
  localStorage.setItem('todos', JSON.stringify(toDos.collection));
  localStorage.setItem('current_id', this.current_id.toString()); 
});
