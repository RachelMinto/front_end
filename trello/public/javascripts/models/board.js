var Board = Backbone.Model.extend({
  events: {

  },
  initialize: function(data) {
    this.lists = new ListCollection();
    this.lists.url = "/board/lists"
    this.parse(data);
  },
  parse: function(data) {
    if (data.lists) {
      this.lists.reset(data.lists);
    }

    this.lastCardID = data.lastCardID
    return _.omit(data, 'lists');
  },
  getListByID: function(id) {
    return this.lists.findWhere( {id : id.toString()});
  }
});



// _.findWhere(data.lists, {title: "List One"});