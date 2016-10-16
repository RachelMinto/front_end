var $open = $("#open");
var $complete = $("#complete_todo");
var $add = $("#save_todo");
var $modal = $('#open_modal_checkbox');
var $form = $("form");
var current_id;
var $total = $('main div.circle');
var $table = $('main table');
var templates = {};

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
    this.loadMenus();
  },
  cacheTemplate: function() {
    $("script[type='text/x-handlebars']").each(function() {
      var $tmpl = $(this).remove();
      templates[$tmpl.attr("id")] = Handlebars.compile($tmpl.html());
    });

    $('[data-type="partial"]').each(function() {
      var $partial = $(this);
      Handlebars.registerPartial($partial.attr("id"), $partial.html());
    });
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
  loadMenus: function() {
    self = this;
    var total = $(templates['todos_by_month']({total: self.collection.length}));
    $('#all-todos').append(total);

    var completeTodos = this.getCompleteTodos();
    var completeTotal = $(templates['total_complete']({total: completeTodos.length}));
    $('#completed').append(completeTotal);

    this.getTodosByDate(self.collection);
    completeByDate = this.getTodosByDate(completeTodos);
    $("#complete_summary").html(templates.complete_todos_summary({ complete_todo: completeByDate }));

  },
  getTodosByDate: function(todos) {
    var dateAndCount = {};
    var todosByDate = [];

    todos.forEach(function(todo) {
      if (dateAndCount.hasOwnProperty(todo.mm_yy)) {
        dateAndCount[todo.mm_yy]++
        } else {
        dateAndCount[todo.mm_yy] = 1;
      }
    });

    for (date in dateAndCount) {
      obj = {}
      obj['mm_yy'] = date;
      obj['total'] = dateAndCount[date];
      todosByDate.push(obj);
    }
    
    console.log(todosByDate);
    return todosByDate;
  },
  getCompleteTodos: function() {
    incomplete = this.collection.filter(function(item) {
      return item.complete === true;
    });

    return incomplete;
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
    var mmYY = this.setMonthYear($form.find("#month").val(), $form.find("#year").val());
    var todo = {
      title: $form.find("#title").val() || "",
      mm_yy: mmYY,
      day: $form.find("#day").val() || "",
      month: $form.find("#month").val() || "" ,
      year: $form.find("#year").val() || "",
      description: $form.find("#description").val() || "no description",
      id: current_id,
      complete: false,
    }
    current_id++;
    return todo;
  },
  setMonthYear: function(month, year) {
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var date;

    if (month === null || year === null) {
      date = "No Due Date";
    } else {
      var month = String(months.indexOf(month) + 1);
      month = month.length < 2 ? '0' + month : month;
      var year = year.slice(2);
      date = month + "/" + year;
    }

    return date;
  },
  updateTodoList: function(todo) {
    var $item = $(templates['main_todos']({
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
