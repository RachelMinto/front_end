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
  addedList: function() {
    console.log("I've added a list!");
    this.trigger("list_collection_updated");
    // make sure you update position numbers to match new index.
  },
  removedList: function() {
    console.log("I've removed a list!");
    this.trigger("list_collection_updated");
    // make sure you update position numbers to match new index.
  },
  updateListPositions: function([model, position]) {
    this.remove(model);
    this.add(model, {at: position});
    debugger;
    this.sync("update", this, {
      success: function(json) {
      },
      error: function(json) {
      }
    });
    //update server.
  },
  initialize: function() {
    this.on("add", this.addedList);
    this.on("remove", this.removedList);  //  (model, collection, options) 
    this.on("updateListPositions", this.updateListPositions);
    // this.listenTo(model, "removeDraggedCard", removeDraggedCard);
    // this.listenTo(model, "removeDraggedCard", removeDraggedCard);
  }   
});
