var Todo = {
  init: function(id) { //redundant code. update combined?
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
    // var todoObject = this.retrieveTodo(document.forms[0].target); nned to move out.
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
  filter: function(todos, property, value) {
    var filteredList = todos.filter(function(todo){
      return todo[property] === value;
    });

    return filteredList;
  },
  attachTodoMethods: function() {
    this.todos.map(function(todo) {
      Object.setPrototypeOf(todo, Todo);
    });
  },
  completeTodos: function() {
    return this.filter(this.todos, 'complete', true);
  },
  incompleteTodos: function() {
    return this.filter(this.todos, 'complete', false);
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

    console.log(dateAndCount);
    return dateAndCount;
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
  },
  instantiateViews: function(app) {
    var sideCompletedView = Object.create(CompletedTodosDateView);
    var sideAllView = Object.create(AllTodosDateView);    
    var mainView = Object.create(MainView)
    mainView.init(this);
    sideAllView.init(this);
    sideCompletedView.init(this);
    this.views = { main: mainView, complete: sideCompletedView, all: sideAllView };
  },
  renderContent: function() {
    this.updateMainView(this.todos, 'All todos');
    this.updateAllTodosView(this.todos);
    this.updateCompletedTodosView(this.filter(this.todos, 'complete', true)); 
  },
  bindAll: function() {
    document.getElementById("main").addEventListener("click", this.views['main'].eventDelegation.bind(this.views['main']));
    document.getElementById("completed").addEventListener("click", this.views['complete'].selectList.bind(this.views['complete']));
    document.getElementById("all_todos").addEventListener("click", this.views['all'].selectList.bind(this.views['all'])); 
  },
  updateMainView: function(todos, title) {
    complete = this.filter(todos, 'complete', true);
    incomplete = this.filter(todos, 'complete', false);
    this.views['main'].updateDisplayModel(title, complete, incomplete)
  },
  updateAllTodosView: function() {
    this.views['all'].updateDisplayModel(this.todos);
  },
  updateCompletedTodosView: function() {
    this.views['complete'].updateDisplayModel(this.filter(this.todos, 'complete', true));
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
      this.app.todoList.deleteTodo(target.closest('tr').dataset.id);
      this.updateDisplayModel( 'All Todos', this.app.todoList.completeTodos(), this.app.todoList.incompleteTodos());
    } else if (target.tagName === "TD") {
      this.app.todoList.toggleTodoComplete(target.closest('tr').dataset.id);
    } else if (target.id === "edit") {
      this.app.openEditContactForm(e);
    } else if (target.id === "save_edits") {
      this.app.todoList.retrieveTodo(document.forms[0].target).update();
      document.getElementById("open_modal_checkbox").checked = true;
      this.updateDisplayModel( 'All Todos', this.app.todoList.completeTodos(), this.app.todoList.incompleteTodos());
    } else if (target.id === "mark_complete") {
      this.app.todoList.completeTodo(target);      
    } else if (target.tagName === "SPAN") {
      document.getElementById("open_modal_checkbox").checked = false;
    } 
  },
  saveNew: function() {
    this.app.todoList.createNewTodo();
    var self = this;
    this.updateDisplayModel( 'All Todos', self.app.todoList.completeTodos(), self.app.todoList.incompleteTodos());
  },
  updateDisplayModel: function(title, completeTodos, incompleteTodos) {
    this.viewModel.listTitle = title;
    this.viewModel.total = (completeTodos.length + incompleteTodos.length);
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
  viewModel: { listTitle: 'All Todos', total: 0, rows: [{'02/18': 5}, {'03/18': 3}] },  // rows are an array of small objects, like [{“02/18”, 1}, {“03/18”, 3}… ];
  init: function(app) {
    this.app = app;
    this.bind();
    this.compile();
    this.render();    
  },
  bind: function() {
    document.getElementById("all_todos").addEventListener("click", this.selectList.bind(this)); 
  },   
  compile: function(list) {
    this.template = Handlebars.compile(document.getElementById('summary_by_date').innerHTML);
  },
  selectList: function(e) {
    var rowID = e.target(); // probably wrong code.   
    var newList;
    if (document.getElementById('selected')) {
      document.getElementById('selected').removeAttribute('id', 'selected');
    }

    rowID.setAttribute('id', 'selected');
    newList = this.app.todoList.filter(this.app.todoList.todos, 'dueDate', rowID);
    this.app.views['main'].updateDisplayModel(newList);
  },
  updateDisplayModel: function(todos) {
    this.viewModel.total = (todos.length);
    this.viewModel.todos = todos;
    this.render();
  },  
  render: function() {
    document.getElementById('all_todos').innerHTML = this.template(this.viewModel);
    document.querySelectorAll('[data-id="All"]')[0].setAttribute('id', 'selected');
  },
};

var CompletedTodosDateView = {
  viewModel: {listTitle: 'Completed', total: 0, rows: []},
  init: function(app) {
    this.app = app;
    // this.viewModel = {listTitle: 'Completed', total: this.app.todoList.todos.length, rows: []}
    this.compile();
    this.render();
  },
  selectList: function(e) {
    var rowID = e.target();
    var newList;
    if (document.getElementById('selected')) {
      document.getElementById('selected').removeAttribute('id', 'selected');
    }

    rowID.setAttribute('id', 'selected');
    newList = this.app.todoList.filter(this.app.todoList.todos, 'dueDate', rowID);
    newList = this.app.todoList.filter(newList, 'complete', true);
    this.app.views['main'].updateDisplayModel(newList);
  },
  compile: function(list) {
    this.template = Handlebars.compile(document.getElementById('summary_by_date').innerHTML);
  },
  updateDisplayModel: function(todos) {
    this.viewModel.total = (todos.length);
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

