var ListCollection = Backbone.Collection.extend({
  model: List,
  url: "/board/lists",
  updateListPositions: function([model, position]) {
    this.remove(model);
    this.add(model, {at: position});
    this.sync("update", this);
  },
  // addedList: function() {
  //   this.sync("update", this) // Currently set to re-render full page. Would like to optimize. Trouble was id number vs. string from server.
  // },
  initialize: function() {
    this.on("updateListPositions", this.updateListPositions);
    // this.on("add", this.addedList)
  }   
});
