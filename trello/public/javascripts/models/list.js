var List = Backbone.Model.extend({
  getCardByID: function(id) {
    return this.cards.findWhere({id : id.toString()});
  },
  parse: function(data) {
    if (data.cards) {
        this.cards.reset(data.cards);
    }
    return _.omit(data, 'cards');
  },
  initialize: function(data) {
    this.cards = new CardCollection();
    this.url = "/board/" + this.id;
    this.cards.url = "/board/" + this.id + "/items"
    this.parse(data);
  },  
});