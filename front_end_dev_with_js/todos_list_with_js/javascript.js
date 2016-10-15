var $add = $("#add");

function toDoList() {
  this.init();
}

toDoList.prototype = {
  init: function() {
    console.log('working');
    this.bind();
  },
  addTodo: function(e) {
    console.log('link works!');
    e.preventDefault();
  },
  bind: function() {
    console.log('and this works');
    $add.on("click", this.addTodo.bind(this));
  },
}

toDos = new toDoList();

