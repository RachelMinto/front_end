var CardCollection = Backbone.Collection.extend({
  model: Card,
  comparator: 'position',
  syncServer: function() {
    this.sync("update", this, {
      success: function(json) {
        debugger;
      },
      error: function(json) {
        debugger;
      }
    });
    // debugger;
    // this.trigger("card_collection_updated");
  },
  changeHappened: function() {
    this.trigger("card_collection_updated")
  },
  initialize: function() {
    this.on("change", this.changeHappened); //  (model, collection, options) 
  }     
});
