var AddListView = Backbone.View.extend({
  template: App.templates.add_list_placeholder,
  events: {
    "click .add_button": "addSaveButton",
    "click #cancel_add_list": "cancelAddList",
    "submit form": "addNewList",
    "click #add_new_list": "addNewList"    
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
    this.$el.find(".add_list_input_field").removeClass("invisible");
    this.$el.find(".add_list_placeholder").addClass("invisible");
    this.$("#new_list_name").focus(); 
  },
  addNewList: function(e) {
    e.preventDefault();
    var newName = $('#new_list_name').val();
    if (newName === "") { return; }

    newList = {
      "title": newName,
      "subscribed":"false",
      "cards":"[]"
    }

    $.ajax({
      url: "/board/lists",
      type: "POST",
      data: newList,
      success: function(json) {
        debugger;
        App.board.lists.add(json);
        App.indexView();
      },
      error: function(json) {
        debugger;
      }
    });    
    // unbind view? Recreate new after list is added?
  },
  cancelAddList: function(e) {
    e.preventDefault();
  },
  initialize: function() {
    this.render();
  }
});