var AddListView = Backbone.View.extend({
  template: App.templates.add_list_placeholder,
  events: {
    "click .add_button": "addSaveButton",
    "click .icon-cancel": "cancelAddList",
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
    this.$("#add_list_name_input").focus(); 
  },
  addNewList: function(e) {
    e.preventDefault();
    var newName = $('#add_list_name_input').val();
    if (newName === "") { return; }

    newList = {
      "title": newName,
    }

    $.ajax({
      url: "/board/lists",
      type: "POST",
      data: newList,
      success: function(json) {
        App.board.lists.add(json);
        App.renderLists();
      },
    });    
  },
  cancelAddList: function(e) {
    App.renderLists();
    e.preventDefault();
  },
  initialize: function() {
    this.render();
  }
});