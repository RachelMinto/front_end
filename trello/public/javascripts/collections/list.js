var ListCollection = Backbone.Collection.extend({
  model: List,
  comparator: 'position',
  addedList: function() {
    console.log("I've added a list!");
    this.trigger("list_collection_updated");
  },
  removedList: function() {
    console.log("I've removed a list!");
    this.trigger("list_collection_updated");
  },  
  initialize: function() {
    this.on("add", this.addedList);
    this.on("remove", this.removedList);  //  (model, collection, options) 
  }   
});
