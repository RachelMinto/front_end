var Todo = {
  init: function(id) { 
    var todo = document.forms[0].elements;
    this.update();
    this.complete = false;
    this.id = id;
    return this;
  },
  findMonthNumber: function(month) {
    var months = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July',
                  'August', 'September', 'October', 'November', 'December'];
    var monthNumber = months.indexOf(month);

    if (monthNumber === -1) {
      month = '';
    } else {
      month = ('0' + String(monthNumber)).slice(-2);
    }                
    
    return month;               
  },
  getDueDate: function(month, year) {
    if (month === '' || year === '') {
      return "No Due Date";
    } else {
      return month + '/' + String(year).slice(-2);
    }
  },
  toggleComplete: function() {
    this.complete = !this.complete
  },
  setComplete: function() {
    this.complete = true;
  },
  update: function() {
    var todo = document.forms[0].elements;
    this.title = todo.title.value;
    this.description = todo.description.value;
    this.day = todo.day.value;
    this.month = todo.month.value;
    this.year = todo.year.value;
    this.dueDate = this.getDueDate(this.findMonthNumber(this.month), this.year);
  },
};

var TodoList = { 
  currentID: JSON.parse(localStorage.getItem('currentID')) || 0,
  todos: JSON.parse(localStorage.getItem('todos')) || [],
  filterList: function(todos, property, value) {
    if (!todos) { 
      return []
    };

    var filteredList = todos.filter(function(todo){
      return todo[property] === value;
    });
    return filteredList
  },
  attachTodoMethods: function() {
    this.todos.map(function(todo) {
      Object.setPrototypeOf(todo, Todo);
    });
  },
  completeTodos: function() {
    return this.filterList(this.todos, 'complete', true);
  },
  incompleteTodos: function() {
    return this.filterList(this.todos, 'complete', false);
  },
  createNewTodo: function() {
    var newTodo = Object.create(Todo);
    newTodo.init(this.currentID);
    document.getElementById("modal").remove();
    this.currentID++;
    this.todos.push(newTodo); 
  },
  deleteTodo: function(id) {
    this.todos = this.todos.filter(function(todo){
      return Number(todo.id) !== Number(id);
    });    
  },
  retrieveTodo: function(id) {
    var filteredTodo = this.todos.filter(function(todo){
      return Number(todo.id) === Number(id);
    });

    return filteredTodo[0];
  },
  summarizeByDate: function(todos) {
    var dateAndCount = {};
    var rows = [];

    todos.sort(function (a, b) {
      return a.year < b.year ? -1 : a.year > b.year ? 1 :
      a.month < b.month ? -1 : a.month > b.month ? 1 : 0;
    });

    todos.forEach(function(todo) {
      if (dateAndCount.hasOwnProperty(todo.dueDate)) {
        dateAndCount[todo.dueDate]++
      } else {
        dateAndCount[todo.dueDate] = 1;
      }
    });

    rows.push(dateAndCount);
    return rows;
  },
};

var TodoApp = {
  views: [],
  instantiateTodoList: function() {
    this.todoList = Object.create(TodoList)
  },
  init: function() {
    this.instantiateTodoList();
    this.instantiateViews(this);
    this.bindAll();
    this.todoList.attachTodoMethods();
  },
  instantiateViews: function(app) {
    var sideCompletedView = Object.create(CompletedTodosDateView);
    var sideAllView = Object.create(AllTodosDateView);    
    var mainView = Object.create(MainView)
    var todos = this.todoList.todos;
    var complete = this.todoList.completeTodos();

    mainView.init(this);
    sideAllView.init(this, todos.length, this.todoList.summarizeByDate(todos));
    sideCompletedView.init(this, complete.length, this.todoList.summarizeByDate(complete));
    this.views = { main: mainView, complete: sideCompletedView, all: sideAllView };
  },
  renderContent: function() {
    this.updateMainView(this.todos, 'All todos');
    this.updateAllTodosView(this.todos);
    this.updateCompletedTodosView(this.todoList.completeTodos()); 
  },
  bindAll: function() {
    document.getElementById("main").addEventListener("click", this.views['main'].eventDelegation.bind(this.views['main']));
    document.getElementById("completed").addEventListener("click", this.views['complete'].selectList.bind(this.views['complete']));
    document.getElementById("all_todos").addEventListener("click", this.views['all'].selectList.bind(this.views['all'])); 
  },
  updateMainView: function(todos, title) {
    complete = this.todoList.completeTodos();
    incomplete = this.todoList.incompleteTodos();
    this.views['main'].updateDisplayModel(title, complete, incomplete)
  },
  updateAllTodosView: function() {
    var todos = this.todoList.todos;
    this.views['all'].updateDisplayModel(this.todoList.summarizeByDate(todos), todos.length);
  },
  updateCompletedTodosView: function() {
    var complete = this.todoList.completeTodos();
    this.views['complete'].updateDisplayModel(this.todoList.summarizeByDate(complete), complete.length);
  },
  openNewContactForm: function() {
    var context = {save: 'save_new', complete: 'cannot_mark_complete', target: 'new'};
    var template = Handlebars.compile(document.getElementById('modal').innerHTML);
    document.getElementById("main").innerHTML += template(context);
    document.getElementById("open_modal_checkbox").checked = true;
  },
  openEditContactForm: function(e) {
    var id = e.target.closest('tr').dataset.id;
    var todo = this.todoList.retrieveTodo(id);
    var template = Handlebars.compile(document.getElementById('modal').innerHTML);
    var context = {save: 'save_edits', complete: 'mark_complete', target: id};
    document.getElementById("main").innerHTML += template(context);
    document.getElementById("title").value = todo.title;
    document.getElementById("day").value = todo.day;
    document.getElementById("month").value = todo.month;
    document.getElementById("year").value = todo.year;
    document.getElementById("description").value = todo.description;    
    document.getElementById("open_modal_checkbox").checked = true;    
  },
};

var MainView = {
  viewModel: {listTitle: 'All Todos', total: 0, complete: [], incomplete: [] },
  init: function(app) {
    this.app = app;
    this.compile();
    this.render();
    this.updateDisplayModel('All Todos', this.app.todoList.completeTodos(), this.app.todoList.incompleteTodos())    
  },
  eventDelegation: function(e) {
    e.preventDefault();
    var target = e.target

    if (target.tagName === "H3") {
      this.app.openNewContactForm();
    } else if (target.id === "save_new") {
      this.saveNew();
    } else if (target.id === "cannot_mark_complete") {
      window.alert('Cannot mark an unsaved todo as complete.');
    } else if (target.id === "delete") {
      this.deleteFromList(target);
    } else if (target.tagName === "TD") {
      this.toggleTodoStatus(target);
    } else if (target.id === "edit") {
      this.app.openEditContactForm(e);
    } else if (target.id === "save_edits") {
      this.saveUpdated(target);
    } else if (target.id === "mark_complete") {
      this.markTodoComplete(target);
    } else if (target.tagName === "SPAN") {
      document.getElementById("open_modal_checkbox").checked = false;
    }
  },
  markTodoComplete: function(target) {
    this.app.todoList.retrieveTodo(document.forms[0].target).complete = true;
    this.renderAll();
    document.getElementById("open_modal_checkbox").checked = false; 
  },
  toggleTodoStatus: function(target) {
    var todo = this.app.todoList.retrieveTodo(target.closest('tr').dataset.id);
    todo.toggleComplete.call(todo);
    this.renderAll(); 
  },
  deleteFromList: function(target) {
    this.app.todoList.deleteTodo(target.closest('tr').dataset.id);
    this.renderAll();    
  },
  saveUpdated: function(target) {
    this.app.todoList.retrieveTodo(document.forms[0].target).update();
    document.getElementById("open_modal_checkbox").checked = true;
    this.renderAll();
  },
  saveNew: function() {
    this.app.todoList.createNewTodo();
    var list = this.app.todoList
    this.renderAll();   
  },
  renderAll: function() {
    var list = this.app.todoList
    var todos = list.todos;
    var complete = list.completeTodos();

    this.updateDisplayModel( 'All Todos', list.completeTodos(), list.incompleteTodos());
    this.app.views['all'].updateDisplayModel(list.summarizeByDate(todos), todos.length);
    this.app.views['complete'].updateDisplayModel(list.summarizeByDate(complete), complete.length);
  },
  updateDisplayModel: function(title, completeTodos, incompleteTodos) {
    this.viewModel.listTitle = title;
    this.viewModel.total = (this.app.todoList.todos.length);
    this.viewModel.complete = completeTodos;
    this.viewModel.incomplete = incompleteTodos;
    this.render();
  },  
  compile: function(list) {
    this.template = Handlebars.compile(document.getElementById('main_list').innerHTML);
  },
  render: function() {
    document.getElementById("main").innerHTML = this.template(this.viewModel);
  },
};

var AllTodosDateView = {
  viewModel: { listTitle: 'All Todos', total: 0, rows: [] },
  init: function(app, total, rows) {
    this.app = app;
    this.bind();
    this.viewModel.total = total;
    this.viewModel.rows = rows;    
    this.compile();
    this.render();
    document.querySelectorAll('[data-id="All"]')[0].setAttribute('id', 'selected');
  },
  bind: function() {
    document.getElementById("all_todos").addEventListener("click", this.selectList.bind(this)); 
  },   
  compile: function(list) {
    this.template = Handlebars.compile(document.getElementById('summary_by_date').innerHTML);
  },
  selectList: function(e) {
    var rowID = e.target.closest('tr').dataset.id;
    var newList;
    var complete; 

    if (document.getElementById('selected')) {
      document.getElementById('selected').removeAttribute('id', 'selected');
    }

    rowID = rowID === 'No' ? 'No Due Date' : rowID;
    rowID = rowID === 'All' ? 'All Todos' : rowID;

    document.querySelectorAll('[data-id="All"]')[0].setAttribute('id', 'selected');
    newList = this.app.todoList.filterList(this.app.todoList.todos, 'dueDate', rowID);
    complete = this.app.todoList.filterList(newList, 'complete', true);
    incomplete = this.app.todoList.filterList(newList, 'complete', false);   
    this.app.views['main'].updateDisplayModel(rowID, complete, incomplete);
  },
  updateDisplayModel: function(rows, total) {
    this.viewModel.total = (total);
    this.viewModel.rows = rows;
    this.render();
  },  
  render: function() {
    document.getElementById('all_todos').innerHTML = this.template(this.viewModel);
    document.querySelectorAll('[data-id="All"]')[0].setAttribute('id', 'selected');
  },
};

var CompletedTodosDateView = {
  viewModel: {listTitle: 'Completed', total: 0, rows: []},
  init: function(app, total, rows) {
    this.app = app;
    this.viewModel.total = total;
    this.viewModel.rows = rows;
    this.compile();
    this.render();
  },
  selectList: function(e) {
    var rowID = e.target.closest('tr').dataset.id;
    var newList;
    var complete; 

    if (document.getElementById('selected')) {
      document.getElementById('selected').removeAttribute('id', 'selected');
    }

    rowID = rowID === 'No' ? 'No Due Date' : rowID;

    document.querySelectorAll('[data-id="All"]')[0].setAttribute('id', 'selected');
    newList = this.app.todoList.completeTodos();
    newList = this.app.todoList.filterList(newList, 'dueDate', rowID);
    complete = this.app.todoList.filterList(newList, 'complete', true);
    this.app.views['main'].updateDisplayModel(rowID, complete, []);
  },
  compile: function(list) {
    this.template = Handlebars.compile(document.getElementById('summary_by_date').innerHTML);
  },
  updateDisplayModel: function(todos, total) {
    this.viewModel.total = (total);
    this.viewModel.rows = todos;
    this.render();
  },  
  render: function() {
    document.getElementById('completed').innerHTML = this.template(this.viewModel);
  },
};

todoApp = Object.create(TodoApp);
todoApp.init();

window.onunload = function() {
  localStorage.setItem('todos', JSON.stringify(todoApp.todoList.todos));
  localStorage.setItem('currentID', todoApp.todoList.currentID.toString());
};

