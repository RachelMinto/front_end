var ListCollection = Backbone.Collection.extend({
  model: List,
  url: "/board/lists",
  updateListPositions: function([model, position]) {
    this.remove(model);
    this.add(model, {at: position});
    this.sync("update", this);
  },
  initialize: function() {
    this.on("updateListPositions", this.updateListPositions);
  }   
});
