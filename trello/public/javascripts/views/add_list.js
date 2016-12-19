var AddListView = Backbone.View.extend({
  template: App.templates.add_list_placeholder,
  events: {
    "click .add_button": "addSaveButton",
    "click #add_new_list": "addNewList",
    "click #cancel_add_list": "cancelAddList"
  },
  id: "add_list_input",
  render: function() {
    var content = this.$el.html(this.template());
    $('#board_canvas').append(content);
  },
  addSaveButton: function() {
    this.$el.html(App.templates.add_list());
  },
  addNewList: function(e) {
    e.preventDefault();
    debugger;
  },
  cancelAddList: function(e) {
    e.preventDefault();
    debugger;
  },
  initialize: function() {
    this.render();
  }
});