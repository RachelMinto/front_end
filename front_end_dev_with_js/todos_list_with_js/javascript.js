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
      self.updateTodoList(todo);
    });
    $total.text(previousToDos.length);
  },
  loadMenus: function() {
    var self = this;
    var completeTodos = this.getCompleteTodos();
    var completeByDate = this.getTodosByDate(completeTodos);
    var allByDate = this.getTodosByDate(self.collection);

    var allTodosContext = { total_all: self.collection.length, all_todo: allByDate }
    var completeTodosContext = { total_complete: completeTodos.length, complete_todo_h: completeByDate };

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
      obj = {}
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
  add: function(e) {
    e.preventDefault();
    $modal.prop("checked", false);

    if ($form.prop('target') === 'new') {
      todo = this.createToDo();
      this.collection.push(todo);
      this.updateTodoList(todo);
      $total.text(this.collection.length);
    } else {
      id = $form.prop('target');
      todo = this.createToDo(this.getToDo(id));

      for(item in this.collection) { 
        if (Number(this.collection[item].id) === Number(id)) {
          this.collection[item] = todo;
        }
      }

      $('main').find('[data-id="' + todo.id + '"]')
      .find('a').replaceWith('<a href="#" id="edit">' + todo.title + ' - ' + todo.mm_yy + '</a>');
    }

    $form.trigger("reset");
    $form.prop('target', 'new');
  },
  delete: function(e) {
    e.stopPropagation();   
    var $todo = $(e.target).closest('tr');

    this.collection = this.collection.filter(function(item) {    
      return Number(item.id) !== Number($todo.attr('data-id'));
    });

    $todo.remove();
    $total.text(this.collection.length);
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
      description: $form.find("#description").val() || "no description",
      id: id,
      complete: false,
    }
    if (!todoToUpdate) { current_id++ };
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
    var todo = this.getToDo(id);

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
  resetFormTarget: function() {
    $form.prop('target', 'new');
  },
  bind: function() {
    $open.on("click", this.openModal.bind(this));
    $complete.on("click", this.completeToDo.bind(this));
    $add.on("click", this.add.bind(this)); 
    $table.on('click', 'tr', this.toggleComplete.bind(this));    
    $table.on('click', '#edit', this.setFormValues.bind(this));     
    $table.on('click', '#delete', this.delete.bind(this));
    $('#open_modal_checkbox').on('click', this.resetFormTarget.bind(this));
  },
}

toDos = new toDoList();

$(window).on('unload', function() {
  localStorage.removeItem('todos');
  localStorage.setItem('todos', JSON.stringify(toDos.collection));
  localStorage.setItem('current_id', this.current_id.toString()); 
});
