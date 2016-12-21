var ListCollection = Backbone.Collection.extend({
  model: List,
  updateListPositions: function([model, position]) {
    this.remove(model);
    this.add(model, {at: position});
    this.syncServer();
  },
  syncServer: function() {
    this.sync("update", this, {
      success: function(json) {
        debugger;
      },
      error: function(json) {
        debugger;
      }
    });
  },
  initialize: function() {
    this.on("updateListPositions", this.updateListPositions);
    this.on("syncServer", this.syncServer);
    // this.listenTo(model, "removeDraggedCard", removeDraggedCard);
    // this.listenTo(model, "removeDraggedCard", removeDraggedCard);
  }   
});
