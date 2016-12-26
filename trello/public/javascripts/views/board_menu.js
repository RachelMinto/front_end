var BoardMenuView = Backbone.View.extend({
  className: "wrapper",
  id: "board_menu_wrapper",
  events: {
    "click #close_menu": "hide"
  },
  template: App.templates.board_menu,
  render: function(data) {
    $('#content').append(this.$el.html(this.template(data)));
    $('#board_menu_wrapper').addClass("invisible"); 
  },
  hide: function() {
    $('.board-wrapper').removeClass("menu-shown");
    $('#open_board_menu').removeClass("invisible");   
    $('#board_menu_wrapper').addClass("invisible");      

  },
  show: function() {
    $('#board_menu_wrapper').removeClass("invisible");
    $('.board-wrapper').addClass("menu-shown");
    $('#open_board_menu').addClass("invisible");
  },
  initialize: function(data) {
    this.render(data);
    this.hide();
  },
});