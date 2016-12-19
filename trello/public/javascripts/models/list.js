var List = Backbone.Model.extend({ 
  initialize: function(data) {
    this.cards = new CardCollection();
    this.cards.url = "/board/" + this.id + "/items"
    this.parse(data); 
  },
  parse: function(data) {
    if (data.cards) {
        this.cards.reset(data.cards);
    }
    return _.omit(data, 'cards');
  },
});