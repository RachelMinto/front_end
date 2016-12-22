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
  },  
  initialize: function() {
    // this.on("updatedCard", this.sync("update", this)); //  (model, collection, options) 
  }     
});
