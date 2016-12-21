var AddListView = Backbone.View.extend({
  template: App.templates.add_list_placeholder,
  events: {
    "click .add_button": "addSaveButton",
    "click #add_new_list": "addNewList",
    "click #cancel_add_list": "cancelAddList"    
  },
  id: "add_list_input",
  drop: function(event, index) {
      App.trigger('updateCardPosition', [this.model, index]);
  },   
  render: function() {
    var content = this.$el.html(this.template());
    $('#board_canvas').append(content);
  },
  addSaveButton: function() {
    this.$el.html(App.templates.add_list());
    this.$("#new_list_name").focus();
  },
  addNewList: function(e) {
    e.preventDefault();
    var newName = $('#new_list_name').val();
    if (newName === "") { return; }

    var $f = this.$("form")
    this.trigger("add_list", $f);
    // unbind view? Recreate new after list is added?
  },
  cancelAddList: function(e) {
    e.preventDefault();
  },
  initialize: function() {
    this.render();
  }
});