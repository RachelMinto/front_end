var ListCollection = Backbone.Collection.extend({
  model: List,
  // comparator: 'position',
  // removeDraggedCard: function(e, ui) {
  //   debugger;
  //   var removeFromListID = ui.item.startListID
  //   console.log("I dragged a card!");
  // },
  // addDroppedCard: function(e, ui) {
  //   console.log("I dropped a card!");
  //   debugger;
  // },   
  // addedList: function() {
  //   console.log("I've added a list!");
  //   this.trigger("list_collection_updated");
  //   // make sure you update position numbers to match new index.
  // },
  // removedList: function() {
  //   console.log("I've removed a list!");
  //   this.trigger("list_collection_updated");
  //   // make sure you update position numbers to match new index.
  // },
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
    // this.on("add", this.addedList);
    // this.on("remove", this.removedList);  //  (model, collection, options) 
    this.on("updateListPositions", this.updateListPositions);
    this.on("syncServer", this.syncServer);
    // this.listenTo(model, "removeDraggedCard", removeDraggedCard);
    // this.listenTo(model, "removeDraggedCard", removeDraggedCard);
  }   
});
