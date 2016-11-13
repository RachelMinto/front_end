var todo = Handlebars.compile($("#todo").html());
var editTodo = Handlebars.compile($("#todo_edit").html());
var Todo = new ModelConstructor();
var Todos = new CollectionConstructor();

var TodoView = new ViewConstructor({      
      tag_name: "li",
      template: todo,
      events: {
        "click": function(e) {
          this.$el.replaceWith(editTodo(this.model.attributes));
          this.bindEvents();
        },
        "click a": function(e) {
          e.stopPropagation();
          if (this.$el.hasClass('complete')) {
            this.$el.removeClass('complete') 
          }
          else {
            this.$el.addClass('complete');
          }
        },
        "focusout": function(e) {
          e.preventDefault();
          debugger;
          console.log('blurring');
        },
      }
    });
var list = new Todos(Todo);
var $todos = $("#todos");


$("form").on("submit", function(e) {
  e.preventDefault();
  var $form = $(this);
  var properties = {
    name: $form.find("[name=todo_name]").val(),
    };
  var model;  

  model = list.add(properties);
  $todos.append((new TodoView(model)).$el);
  this.reset();
});

// clear complete. 