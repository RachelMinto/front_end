Views
  todo
    
  Todo sidebar
  Only complete todo sidebar
  edit existing todo
  main todo list
    -render


Collections
Todos
  model: todo
  listenTo: model.destroy
  functions
    filter by complete status
    organize and group by date

Models
Todo
  template
  attributes
    complete?
    id
    title
    description
    date
  events
    -click to delete
    -click to toggle complete - send notice to collection
  functions


Outstanding:
  form sumission of new todo
  edit an existing todo
