var CardCollection = Backbone.Collection.extend({
  model: Card,
  comparator: 'position',
  syncServer: function() {
    this.sync("update", this);
  },
  changeHappened: function() {
    this.trigger("card_collection_updated")
  },
  initialize: function() {
    this.on("change", this.changeHappened); //  (model, collection, options) 
  }     
});
