var Board = Backbone.Model.extend({
  initialize: function(data) {
    this.lists = new ListCollection();
    // this.lists.url = "/board/lists"
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
    return this.lists.findWhere( {id : id});
    // this.url = "/board"
    // this.lists.url = "/board/lists"
  }
});



// _.findWhere(data.lists, {title: "List One"});