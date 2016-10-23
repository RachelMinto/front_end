var TodoList = {
  collection: JSON.parse(localStorage.getItem('todos')) || [],
  currentID: JSON.parse(localStorage.getItem('currentID')) || 0,
  templates: {},
  init: function() {
    this.attachTodoMethods();
    this.cacheTemplates();
    this.renderContent();
    this.bind();
  },
  attachTodoMethods: function() {
    this.collection.map(function(todo) {
      debugger;
      Object.setPrototypeOf(todo, Todo);
    });
  },
  cacheTemplates: function() {
    self = this;

    document.querySelectorAll('script[type="text/x-handlebars"').forEach(function(template) {
      var element = document.getElementById(template.id);
      element.parentNode.removeChild(element);
      self.templates[element.id] = Handlebars.compile(element.innerHTML);
    }); 

    document.querySelectorAll('[data-type="partial"]').forEach(function(partial) {
      var element = document.getElementById(partial.id);
      element.parentNode.removeChild(element);
      Handlebars.registerPartial(element.id, element.innerHTML);
    }); 
  },
  renderContent: function() {
    this.loadMainContent(this.collection, 'All Todos');
    this.loadSideContent(this.collection);
  },
  modifyMainList: function(e) {
    e.preventDefault();
    var target = e.target
    // if (target.tagName === "MAIN") {
    //   console.log('main click');
    // } else 
    if (target.tagName === "H3") {
      this.openNewContactForm();
    } else if (target.id === "save_new") {
      this.createNewTodo();
    } else if (target.id === "cannot_mark_complete") {
      console.log('need a prompt box here.');
    } else if (target.id === "delete") {
      this.deleteTodo(target.closest('tr').dataset.id);
    } else if (target.tagName === "TD") {
      this.toggleTodoComplete(target.closest('tr').dataset.id);
    } else if (target.id === "edit") {
      this.openEditContactForm(e);
    } else if (target.id === "save_edits") {
      this.updateTodo();
    } else if (target.id === "mark_complete") {
      this.completeTodo(target);      
    } else if (target.tagName === "SPAN") {
      document.getElementById("open_modal_checkbox").checked = false;
    } 
  },
  bind: function() {
    document.getElementById("main").addEventListener("click", this.modifyMainList.bind(this));
    document.getElementById("nav").addEventListener("click", this.selectFilteredList.bind(this)); 
  },
  loadMainContent: function(todos, title) {
    var complete = this.filterList(todos, 'complete', true);
    var incomplete = this.filterList(todos, 'complete', false);
    var context = {listTitle: title, total: todos.length, complete: complete, incomplete: incomplete};
    document.getElementById("main").innerHTML = this.templates['main_list'](context);
  },
  toggleTodoComplete: function(id) {
    this.retrieveTodo(id).toggleComplete();
    this.renderContent();
  },
  loadSideContent: function(todos) {
    var complete = this.filterList(todos, 'complete', true);
    var completeByDate = this.summarizeByDate(complete); 
    var allByDate = this.summarizeByDate(todos); 

    document.getElementById("nav").innerHTML = this.templates['summary_by_date']({listTitle: 'All Todos', total: todos.length, todos: allByDate});
    document.getElementById("nav").innerHTML += this.templates['summary_by_date']({listTitle: 'Completed', total: complete.length, todos: completeByDate});
  },
  summarizeByDate: function(todos) {
    var dateAndCount = {};
    var todosByDate = [];

    todos.sort(function (a, b) {
      return a.year - b.year || b.month - a.month;
    });

    todos.forEach(function(todo) {
      if (dateAndCount.hasOwnProperty(todo.dueDate)) {
        dateAndCount[todo.dueDate]++
        } else {
        dateAndCount[todo.dueDate] = 1;
      }
    });

    for (date in dateAndCount) {
      var obj = {}
      obj['dueDate'] = date
      obj['total'] = dateAndCount[date];
      todosByDate.push(obj);
    }

    if (todosByDate.length === 0) {return [{}]};
    return todosByDate;
  },
  selectFilteredList: function(dueDate, complete) {
    // remove selected class
    // add selected class
    var filteredList = this.filterList(this.collection, 'dueDate', dueDate);

    if (complete) {
      filteredList = this.filterList(this.collection, 'complete', true);
    }  

    this.loadMainContent(filteredList, dueDate);
  },
  filterList: function(todos, property, value) {
    var filteredList = todos.filter(function(todo){
      return todo[property] === value;
    });

    return filteredList;
  },
  createNewTodo: function() {
    var newTodo = Object.create(Todo);
    newTodo.init(this.currentID);
    document.getElementById("modal").remove();
    this.currentID++;
    this.collection.push(newTodo);
    this.renderContent();     
  },
  updateTodo: function() {
    var todo = document.forms[0].elements;
    var newProperties = {title: todo.title.value, day: todo.day.value, month: todo.month.value, year: todo.year.value, description: todo.description.value};
    var todoObject = this.retrieveTodo(document.forms[0].target);
    todoObject.updateProperties(newProperties);
    this.renderContent();
  },
  deleteTodo: function(id) {
    this.collection = this.collection.filter(function(todo){
      return Number(todo.id) !== Number(id);
    });
    
    this.renderContent();     
  },
  retrieveTodo: function(id) {
    var filteredTodo = this.collection.filter(function(todo){
      return Number(todo.id) === Number(id);
    });

    return filteredTodo[0];
  },
  completeTodo: function(e){
    todo = this.retrieveTodo(e.closest('form').target);
    todo.setComplete();
    this.renderContent();
  },
  openNewContactForm: function() {
    document.getElementById("main").innerHTML += this.templates['modal']({save: 'save_new', complete: 'cannot_mark_complete', target: 'new'});
    document.getElementById("open_modal_checkbox").checked = true;
  },
  openEditContactForm: function(e) {
    var id = e.target.closest('tr').dataset.id;
    var todo = this.retrieveTodo(id);
    var context = {save: 'save_edits', complete: 'mark_complete', target: id};
    document.getElementById("main").innerHTML += this.templates['modal'](context);
    document.getElementById("title").value = todo.title;
    document.getElementById("day").value = todo.day;
    document.getElementById("month").value = todo.month;
    document.getElementById("year").value = todo.year;
    document.getElementById("description").value = todo.description;    
    document.getElementById("open_modal_checkbox").checked = true;    
  },
};

var Todo = {
  init: function(id) {
    var todo = document.forms[0];
    this.title = todo.elements['title'].value;
    this.description = todo.elements['description'].value;
    this.day = todo.elements['day'].value;
    this.month = todo.elements['month'].value
    this.year = todo.elements['year'].value
    this.dueDate = this.getDueDate(this.findMonthNumber(this.month), this.year);
    this.id = id;
    this.complete = false;
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
    this.complete = this.complete === true ? false : true;
  },
  setComplete: function() {
    this.complete = true;
  },
  updateProperties: function(newProperties) {
    this.title = newProperties.title;
    this.description = newProperties.description;
    this.day = newProperties.day;
    this.month = newProperties.month;
    this.year = newProperties.year;
    this.dueDate = this.getDueDate(this.findMonthNumber(this.month), this.year);
  },
}

mainTodoList = Object.create(TodoList);
mainTodoList.init();

window.onunload = function() {
  localStorage.setItem('todos', JSON.stringify(mainTodoList.collection));
  localStorage.setItem('currentID', mainTodoList.currentID.toString());
};
