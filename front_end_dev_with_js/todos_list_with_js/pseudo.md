Milestone 1: a Todo list (focus on the right panel)

You can click on "+ Add new to do" to bring up the modal to create a new todo.
  - Make "Add new todo" a link. Fix formatting. CHECK
  - Add click event to link so that when it's clicked, the modal is toggled.
    -modal is toggled by: #open_modal_checkbox:checked  CHECK

Create a todo and Store the collection of todos in localStorage and retrieve when the page is reloaded.
  - Set default for date as 'No Due Date'  CHECK
  - Look into how to use local storage on the window object. Use setItem and getItem.
  - Will need to stringify each todos object.
  - Should be using AJAX requests to seemlessly add todo to main content and all todos.
  - Have handlebars template populate in main content box with title and due date. CHECK

You can delete a todo (we’ll do mark as complete later) using the trash can icon.
  -Will want to use event delegation for this on the parent container. 
  -Add click event so that when trash is slected, todo is deleted. 
    -to do is deleted by removing from local storage.

The number after on the top of the right panel should reflect the total number of todos.
  - Retrieve that number dynamically from local storage.

Milestone 2: a Todo list with due dates and the ability to mark todos as complete

after a todo is created, you can click on it which will bring up a modal that shows details of the todo. 
  - bring up modal with autopopulated fields.

Here you can add a due date for the todo, after you click on “save”, it should close the modal, save it to the todo and on the todo list, and add the due month and year to the todo. For example, if the todo's name is "buy some milk" and it's due on 08/20/2016, show it as "buy some milk - 08/16".

in the details modal of a todo, have a button to mark this todo as complete. once clicked, this should close the modal, and show the todo as completed with strike-through.
   - add class "completed" to that todo item's html.

all completed tasks should be on the bottom of the todo list.
  - This is done just on page refresh, not using AJAX.


Milestone 3: a Todo list by months

Now we’re going to have a list of months for due dates of todos on the left navigation, so it’ll look like:

All Todos (9)

No Due Date (4)
01/16 (2)
02/16 (1)
03/16 (2) ….
Completed (3)

01/16 (2)
02/16 (1)
the due months, in the format of (mm/yy), should be dynamic and based on the due dates of all the todos.
- On page reload, Sort results taken from localStorage. 
- Have a handlebars template for creating the toodos list.

the numbers after the "All Todos", "Completed" and the due months are dynamic and they should be the number of todos that due in that month.

by default, all todos are created in the “No Due Date” list, but when a Todo has due date, it should be put into the month that it’s due.

when a todo is completed, it should be put into the “Completed” lists.


If TIME:
-Alert when try to mark not created item as complete.