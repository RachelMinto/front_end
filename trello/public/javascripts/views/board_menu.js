var BoardMenuView = Backbone.View.extend({
  className: "wrapper",
  id: "board_menu_wrapper",
  events: {
    "click #close_menu": "hide"
  },
  template: App.templates.board_menu,
  render: function() {
    $('#content').append(this.$el.html(this.template(this.model.toJSON())));
    $('#board_menu_wrapper').addClass("invisible"); 
  },
  hide: function() {
    this.$el.animate({ "left": "+=340px" }, "slow");
    $('.board-wrapper').removeClass("menu-shown");
    
    $('#open_board_menu').removeClass("invisible");   
    delay(function() { 
    $('#board_menu_wrapper').addClass("invisible");      
    }, 1000);

  },
  show: function() {
    $('#board_menu_wrapper').removeClass("invisible");
    this.$el.animate({ "left": "-=340px" }, "slow");
    delay(function() {
      $('.board-wrapper').addClass("menu-shown");
      $('#open_board_menu').addClass("invisible");
      }, 1000);
  },
  initialize: function() {
    this.render();
    this.hide();
    // subscribe to notifications from selected board, list, and item changes.
  },
});