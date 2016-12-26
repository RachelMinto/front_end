var BoardView = Backbone.View.extend({
  template: App.templates.board,
  id: "content",
  events: {
    "click #open_board_menu": "openMenu",
    "click #add_list_input": "addListInput",
    "click #add_new_list": "addNewList",
    "click #cancel_add_list": "cancelAddList"        
  },
  openMenu: function(e) {
    e.preventDefault();
    App.trigger("openBoardMenu");    
  },
  render: function() {
    var content = this.$el.html(this.template(this.model.toJSON()));
    $('#surface').append(content);
  },
  initialize: function() {
    this.render()
    $('#board_canvas').sortable({
      items: '.list-wrapper',
      placeholder: "ui-sortable-placeholder",
      forcePlaceholderSize: true,
      tolerance: 'pointer',
      axis: 'x',  
      start: function(event, ui) {
        ui.placeholder.height(ui.item.find('.list_content_wrapper').height());
      },              
      update: function(event, ui) {
        ui.item.trigger('drop', ui.item.index())
      }
    });
  },
});


