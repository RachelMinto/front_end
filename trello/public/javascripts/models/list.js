var List = Backbone.Model.extend({
  getCardByID: function(id) {
    return this.cards.findWhere({id : id});
  },
  parse: function(data) {
    if (data.cards) {
        this.cards.reset(data.cards);
    }
    return _.omit(data, 'cards');
  },
  syncServer: function() {
    this.sync("update", this);
  },  
  initialize: function(data) {
    this.cards = new CardCollection();
    this.url = "/board/" + this.id;
    this.cards.url = "/board/" + this.id + "/items"
    this.parse(data);
  },  
});