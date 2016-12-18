var CardCollection = Backbone.Collection.extend({
  model: Card,
  comparator: 'position',
  addedCard: function() {
    console.log("I've added a card!");
    this.trigger("card_collection_updated");
  },
  removedCard: function() {
    console.log("I've removed a card!");
    this.trigger("card_collection_updated");
  },  
  initialize: function() {
    this.on("add", this.addedCard);
    this.on("remove", this.removedCard);  //  (model, collection, options) 
  }     
});
