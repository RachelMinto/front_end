var CardCollection = Backbone.Collection.extend({
  model: Card,
  comparator: 'position',
  syncServer: function() {
    this.sync("update", this, {
      success: function(json) {
      },
      error: function(json) {
      }
    });
  },  
  initialize: function() {
    this.on("update", this.syncServer);  //  (model, collection, options) 
  }     
});
