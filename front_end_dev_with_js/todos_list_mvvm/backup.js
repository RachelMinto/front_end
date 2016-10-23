// var $open = $("#open");
var $complete = $("#complete_todo");
// var $add = $("#save_todo");
var $modal = $('#open_modal_checkbox');
var $form = $("form");
var $total = $('main div.circle');
var $main = $('main');
var templates = {};
var $openModal = $('#open_modal_checkbox');
var current_id;

function toDoList() {
  this.init();
}

toDoList.prototype = {
  collection: [],
  init: function() {
    this.bind();
    this.cacheTemplates();
    this.loadTodos();
    current_id = localStorage.getItem('current_id') || '0';
    localStorage.removeItem('todos');
    this.loadMenus();
  },
  cacheTemplates: function() {
    $("script[type='text/x-handlebars']").each(function() {
      var $tmpl = $(this).remove();
      templates[$tmpl.attr("id")] = Handlebars.compile($tmpl.html());
    });

    $('[data-type="partial"]').each(function() {
      var $partial = $(this).remove();
      Handlebars.registerPartial($partial.attr("id"), $partial.html());
    });
  },
  loadTodos: function() {
    var previousToDos = JSON.parse(localStorage.getItem('todos'));
    if (!previousToDos) {return};

    var self = this;
    previousToDos.forEach(function(todo) {
      self.collection.push(todo);
    });
    this.updateTodoList(previousToDos, "All Todos");
    $total.text(previousToDos.length);
  },
  loadMenus: function() {
    var self = this;
    var completeTodos = this.getCompleteTodos();
    var completeByDate = this.getTodosByDate(completeTodos);
    var allByDate = this.getTodosByDate(self.collection);

    var allTodosContext = { 
      total_all: self.collection.length, 
      all_todo: allByDate 
    }
    var completeTodosContext = { 
      total_complete: completeTodos.length, 
      complete_todo_h: completeByDate 
    };

    $("#all-todos").append(templates.all_todos_summary(allTodosContext));
    $("#completed").append(templates.complete_todos_summary(completeTodosContext));
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
      var obj = {}
      obj['mm_yy'] = date;
      obj['total'] = dateAndCount[date];
      todosByDate.push(obj);
    }

    if (todosByDate.length === 0) {return [{}]};
    return todosByDate;
  },
  getCompleteTodos: function() {
    complete = this.collection.filter(function(item) {
      return item.complete === true;
    });

    return complete;
  },
  insertTodo: function(todo) {
    var todoDescription = todo.title + '-' + String(todo.due_date);
    var testing = '<tr class="completed" data-id="11"> <td id="todo_description"><a href="#" id="edit">' + todoDescription + '</a></td> <td id="delete"><img alt="delete" src="images/garbage.png"></td> </tr>';
    $('main table').append(testing);

    this.loadMenus();
  },
  add: function(e) {
    e.preventDefault();
    $modal.prop("checked", true);


    if ($form.prop('target') === 'new') {
      todo = this.createToDo();
      this.collection.push(todo);
      this.insertTodo(todo);
      $total.text(this.collection.length);
    } else {
      this.updateTodo();
    }
    $modal.prop("checked", false);

    this.resetForm();
  },
  updateTodo: function() {
    var id = $form.prop('target');
    var todo = this.createToDo(this.getToDo(id));
    var newDescription = todo.title + ' - ' + todo.mm_yy

    for(item in this.collection) { 
      if (Number(this.collection[item].id) === Number(id)) {
        this.collection[item] = todo;
      }
    }

  $('main').find('[data-id="' + todo.id + '"] a')
      .replaceWith('<a href="#" id="edit">' + newDescription + '</a>');
  },
  delete: function(e) {
    e.stopPropagation();
    var $todo = $(e.target).closest('tr');

    this.collection = this.collection.filter(function(item) {
      return Number(item.id) !== Number($todo.attr('data-id'));
    });

    $todo.remove();
    $total.text(this.collection.length);
    this.loadMenus();
  },
  setFormValues: function(e) {
    e.stopPropagation();
    var todo = this.getToDo($(e.target).closest('tr').data('id'));

    $('#title').val(todo.title);
    $('#description').val(todo.description);
    $('#day').val(todo.day);
    $('#month').val(todo.month);
    $('#year').val(todo.year);
    $form.prop('target', todo.id);

    $modal.prop("checked", true);
    $('form').prop('target', String(todo.id));
  },
  getID: function(e) {
    return +$(e.target).closest('form').prop('target');
  },
  getToDo: function(id) {
    todo = this.collection.filter(function(item) {
      return (Number(item.id) === Number(id));
    });

    return todo[0];
  },
  toggleComplete: function(e) {
    e.stopPropagation();
    var id = $(e.target).closest('tr').data('id');
    var todo = this.getToDo(id);
    var $todo = $('main table').find('[data-id="' + String(id) +'"]');

    todo.complete = todo.complete === false ? true : false;

    for(var item in this.collection) {
      if (Number(item.id) === Number(id)) {
        item.complete = todo.complete;
      }
    }

    todo.complete === false ? $todo.removeClass('completed') : $todo.addClass('completed');
    debugger;
  },
  createToDo: function(todoToUpdate) {
    var mmYY = this.setMonthYear($form.find("#month").val(), $form.find("#year").val());
    var id = todoToUpdate ? todoToUpdate.id : current_id;

    var todo = {
      title: $form.find("#title").val() || "",
      mm_yy: mmYY,
      day: $form.find("#day").val() || "",
      month: $form.find("#month").val() || "" ,
      year: $form.find("#year").val() || "",
      description: $form.find("#description").val() || "",
      id: id,
      complete: false,
    }
    if (!todoToUpdate) { current_id++ };
    return todo;
  },
  setMonthYear: function(month, year) {
    var months = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July',
                  'August', 'September', 'October', 'November', 'December'];
    var date;

    if (month === null || year === null) {
      date = "No Due Date";
    } else {
      var month = ('0' + String(months.indexOf(month))).slice(-2);
      var year = year.slice(2);
      date = month + "/" + year;
    }

    return date;
  },
  updateTodoList: function(todos, listTitle) {
    var total = todos.length
    debugger;
    var $item = $(templates['main_todos']({list_title: listTitle, total: total, todo: todos}));
    $('main').append($item.addClass('completed'));
  },
  completeToDo: function(e) {
    e.preventDefault();
    var id = this.getID(e);
    var todo = this.getToDo(id);

    this.collection.forEach(function(item) {
      if(Number(item.id) === Number(todo.id)) {
        item.complete = true;
      }
    });

    $table.find('[data-id="' + todo.id + '"]').addClass('completed');
    $modal.prop("checked", false);
  },
  // openModal: function(e) {
  //   e.preventDefault();
  //   $modal.prop("checked", true);
  // },
  resetForm: function() {
    $form.prop('target', 'new');
    $form.trigger("reset");
  },
  bind: function() {
    $main.on("click", '#open', this.add.bind(this));
    $complete.on("click", this.completeToDo.bind(this));
    // $add.on("click", this.add.bind(this)); 
    $main.on('click', 'tr', this.toggleComplete.bind(this));
    $main.on('click', '#edit', this.setFormValues.bind(this));
    $main.on('click', '#delete', this.delete.bind(this));
    $openModal.on('click', this.resetForm.bind(this));
  },
}

toDos = new toDoList();

// $(window).on('unload', function() {
//   localStorage.removeItem('todos');
//   localStorage.setItem('todos', JSON.stringify(toDos.collection));
//   localStorage.setItem('current_id', this.current_id.toString());
// });
