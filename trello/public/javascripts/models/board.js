var Board = Backbone.Model.extend({
  initialize: function(data) {
    this.lists = new ListCollection();
    this.parse(data);
  },
  parse: function(data) {
    if (data.lists) {
      this.lists.reset(data.lists);
    }
    return _.omit(data, 'lists');
  }
});



// _.findWhere(data.lists, {title: "List One"});