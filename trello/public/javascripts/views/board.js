var BoardView = Backbone.View.extend({
  template: App.templates.board,
  id: "full_board",
  events: {
    "click #open_board_menu": "openMenu"
  },
  openMenu: function(e) {
    e.preventDefault();
    App.trigger("openBoardMenu");    
  },
  new_list: function() {
    // Make new view using list template. Should delete if not submitted.
  },
  add_list: function(e) {
    // get name from form submission
    // add list to collection
    // create list view
    // e.preventDefault();
    // var $f = this.$("form") // backbone jquery binding; within view uses current context to navigate dom within that view.
  
    // $.ajax({
    //   url: $f.attr("action"),
    //   type: $f.attr("method"),
    //   data: $f.serialize(),
    //   success: function(json) {
    //     App.albums.add(json);
    //     App.indexView();
    //   }
    // });    
  },
  show_menu: function() {

  },
  edit_name: function() {

  },
  toggle_star: function() {

  },
  change_privacy: function() {

  },
  render: function() {
    // if (board.color !== default) { change html background };
    var content = this.$el.html(this.template(this.model.toJSON()));
    $('main').html(content);
  },
  initialize: function() {
    this.render()
    $('#board_canvas').sortable({
      items: '> .list.wrapper',
      placeholder: "ui-sortable-placeholder",
      forcePlaceholderSize: true,
      update: function(event, ui) {
        ui.item.trigger('drop', ui.item.index())
      }
    });
  },
    // listen to activities add
    // listen to comments add
});

// el?

