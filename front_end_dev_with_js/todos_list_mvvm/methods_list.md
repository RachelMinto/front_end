Todo

Variables
title, description, day, month, year, dueDate, id, complete

Methods
init
findMonthNumber
getDueDate
toggleComplete
setComplete
update

TodoList

Variables
currentID = number
todos = array of objects

Methods
filter(todos, property, value) and returns filtered list as an array of objects.
attachTodoMethods:
createNewTodo
deleteTodo
retrieveTodo // necessary?
summarizeByDate


TodoApp

Variables
views: array of view objects

Methods
init
instantiateTodoList: 
registerPartial
instantiateViews
renderContent
bindAll
updateMainView
updateAllTodosView
updateCompletedTodosView
openNewContactForm
openEditContactForm



Main View

Variables
view model
app

Methods
init
bind
eventHandler
compile
render
updateDisplayModel(todos)

to add:
-event handler for save new todo
  -tell the main list to add a new todo
  -re-render main content
  -re-render All summary list
-event handler for delete todo
  -tell the app.todoList to delete a todo (pass in id)
  -re-render All and compleed lists
-event handler for udpate todo
  -tell the app.todoList to delete a todo (pass in id)
  re-render main view
  -re-render All and compleed lists
event handler for toggle todo
  -tell the app.todoList to toggle a todo (pass in id)
  -re-render completed list
  -re-render mainview

All View

Variables
view model
app

Methods
init
bind
eventHandler
compile
render
selectList
updateDisplayModel(todos)

event handler for clicking on row
  -update model. Where?
  -re-render the main view with a new model (pass in todos);
  -update selected row on left side.


Complete View

Variables
view model
app

Methods
init
bind
eventHandler
compile
render
selectList
updateDisplayModel(todos)

event handler for clicking on row
  -update model. Where? Send filter params.
  -re-render hte main view with a new model
  -update selected row on left side.

