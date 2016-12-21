var CardCollection = Backbone.Collection.extend({
  model: Card,
  comparator: 'position',
  initialize: function() {
    // this.on("updatedCard", this.sync("update", this)); //  (model, collection, options) 
  }     
});
