var CardCollection = Backbone.Collection.extend({
  model: Card,
  comparator: 'position',
  // syncServer: function() {
  //   this.sync("update", this);
  //   debugger;
  //   this.trigger("card_collection_updated");
  // },
  changeHappened: function() {
    this.trigger("card_collection_updated")
  },
  initialize: function() {
    this.on("change", this.changeHappened); //  (model, collection, options) 
  }     
});
