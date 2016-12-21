var ListCollection = Backbone.Collection.extend({
  model: List,
  updateListPositions: function([model, position]) {
    this.remove(model);
    this.add(model, {at: position});
    this.sync("update", this);
  },
  initialize: function() {
    this.on("updateListPositions", this.updateListPositions);
    // this.on("updatedList", this.sync("update", this))
    // this.listenTo(model, "removeDraggedCard", removeDraggedCard);
    // this.listenTo(model, "removeDraggedCard", removeDraggedCard);
  }   
});
