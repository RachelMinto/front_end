var HeaderView = Backbone.View.extend({
  id: "header",
  el: "div",
  events: {
    "click": "closeSearch",
    "click #search_input": "preventClose",
    "focus #search_input": "openSearch",
    "keyup #search_input": "search",
  },
  template: App.templates.header,
  openSearch: function() {
    return false
  },
  preventClose: function() {
    return false
  },
  render: function() {
    $('#surface').append(this.template(this.model.toJSON()));
  },
  search: function(e) {
    var self = this;

    $('.pop-over').addClass("is-shown search");
    $('.pop-over').html("<h1>Search...</h1>");
    delay(function() {
      var keyword = self.$el.find("#search_input").val();
      var results = App.searchKeyword(keyword);
      self.renderCollection(results);
      return false;      
    }, 1000);
  },
  renderCollection: function(cards) {
    var self = this;
    if (cards) {
      $('.pop-over').html("<h1>Search Results:</h1><ul></ul>");

      cards.forEach(function(model) {
        var $card = self.renderItem(model);
        $card.$el.appendTo($('.pop-over').find('ul'));
      });
    } else {
      $(".pop-over").append("<h1>Sorry, no cards have that keyword!</h1>")
    };
  },
  renderItem: function(model) {
    var cardEl = new CardView({ model: model });
    return cardEl;
  },  
  closeSearch: function() {
    $('.pop-over').removeClass("is-shown search");
    $("#search_input").val('');
  },
  initialize: function() {
    this.render();
  },
});