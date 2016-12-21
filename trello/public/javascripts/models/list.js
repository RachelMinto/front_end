var List = Backbone.Model.extend({
  getCardByID: function(id) {
    return this.cards.findWhere({id : id.toString()});
  },
  // syncServer: function() {
  //   debugger;
  //   this.sync("update", this, {
  //     success: function(json) {
  //       debugger;
  //     },
  //     error: function(json) {
  //       debugger;
  //     }
  //   });
  // },  
  parse: function(data) {
    if (data.cards) {
        this.cards.reset(data.cards);
    }
    return _.omit(data, 'cards');
  },
  initialize: function(data) {
    this.cards = new CardCollection();
    this.cards.url = "/board/" + this.id + "/items";
    // this.on("syncServer", this.syncServer);
    this.parse(data); 
  },  
});