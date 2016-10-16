var $open = $("#open");
var $complete = $("#complete_todo");
var $add = $("#save_todo");
var $modal = $('#open_modal_checkbox');
var $form = $("form");
var current_id;
var $total = $('main div.circle');
var $table = $('main table');

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
    if (!previousToDos) { return };

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
    var $todo = $(e.target).closest('tr');
    this.removeFromCollection($todo.attr('data-id'));
    $todo.remove();
    $total.text(this.collection.length);
  },
  edit: function(e) { 
    debugger;
    e.stopPropagation();
    var $todo = $(e.target).closest('tr');
    this.setFormValues($todo.data('id'));
    $modal.prop("checked", true);

  },
  getID: function(e) {
    return +$(e.target).closest('form').prop('target');
  },
  getToDo: function(id) {
    todo = this.collection.filter(function(item) {
      return Number(item.id) === Number(id)
    });
    return todo[0];
  },
  setFormValues: function(id) {
    todo = this.getToDo(id);
    $('#title').val(todo.title);
    $('#description').val(todo.description);
    $form.prop('target', id)
  },
  updateTodo: function(id) {
    var todo = getToDo(id);
    debugger;

    this.updateTodoList(todo);

    $form.trigger("reset");
  },
  toggleComplete: function(e) {
    e.stopPropagation();    
    var id = this.getID(e);
    var todo = this.getToDo(id);
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
      title: $form.find("#title").val() || "",
      mm_yy: mmYY,
      day: day,
      month: month,
      year: year,
      description: $form.find("#description").val() || "no description",
      id: current_id,
      complete: false,
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
      incomplete: !(todo.complete),
      id: todo.id,
      title: todo.title,
      due_date: todo.mm_yy,
    }));

    if (todo.complete) {
      $item.addClass('completed');
      $('main table#complete_todos').append($item);
    } else {
      $('main table#incomplete_todos').append($item);
    }
  },
  completeToDo: function(e) {
    e.preventDefault();
    var id = this.getID(e);
    todo = this.getToDo(id);

    this.collection.forEach(function(item) { 
      if(Number(item.id) === Number(todo.id)) {
        item.complete = true;
      }
    });


    $table.find('[data-id="' + todo.id + '"]').addClass('completed');


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
