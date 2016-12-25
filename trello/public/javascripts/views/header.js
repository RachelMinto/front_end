var HeaderView = Backbone.View.extend({
  id: "header",
  events: {
    "click #search_input_placeholder": "openSearch",
    "submit": "search",
    "change #search_input": "search"
  },
  template: App.templates.header,
  openSearch: function() {
    debugger;
    this.$el.find('#search_input_wrapper').removeClass("invisible");
    return false
  },
  render: function() {
    $('#surface').append(this.template(this.model.toJSON()));
  },
  search: function(e) {
    var keyword = this.$el.find(".search_input").val();

    debugger;

  },
  initialize: function() {
    this.render();
    // subscribe to notifications from selected board, list, and item changes.
  },
});