var List = Backbone.Model.extend({
  getCardByID: function(id) {
    return this.cards.findWhere({id : id});
  },
  getUnarchived: function() {
    return this.cards.reject({archived: true});
  },
  parse: function(data) {
    var omitKeys = []

    if (data.cards) {
        this.cards.reset(data.cards);
        omitKeys.push('cards');
    }

    if (data.subscribed) {
      this.set("subscribed", data.subscribed);
      omitKeys.push('subscribed');
    }

    return _.omit(data, omitKeys);    
  },
  syncServer: function() {
    this.sync("update", this);
  },
  toggleSubscribeStatus: function() {
    var self = this;
    var current = this.get("subscribed");
    this.set("subscribed", !current);

    this.sync("update", this, {
      success: function(json) {
        self.trigger("rerenderListView"); 
      },
    })
  },
  initialize: function(data) {
    this.cards = new CardCollection();
    this.url = "/board/" + this.id;
    this.cards.url = "/board/" + this.id + "/items";
    this.cards.parentList = this;
    this.parse(data);
    this.on("subscribeToggle", this.toggleSubscribeStatus);    
  },  
});