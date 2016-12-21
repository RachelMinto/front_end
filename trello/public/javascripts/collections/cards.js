var CardCollection = Backbone.Collection.extend({
  model: Card,
  comparator: 'position',
  syncServer: function() {
    this.sync("update", this);
  },  
  initialize: function() {
    this.on("update", this.syncServer);  //  (model, collection, options) 
  }     
});
