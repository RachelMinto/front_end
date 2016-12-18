var BoardView = Backbone.View.extend({
  template: App.templates.board,
  events: {
  //   "click #new_list": "new_list"
  //   "submit": "add_list"
  //   "click": "show_menu",
  //   "click": "edit_name",
  //   "click": "toggle_star"
  //   "click": "change_privacy"
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
    $('main').html(this.template(this.model.toJSON()));
  },
  initialize: function() {
    this.render()
    // listen to activities add
    // listen to comments add
  }
});

// el?

