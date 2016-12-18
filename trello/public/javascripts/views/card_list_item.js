var CardView = Backbone.View.extend({
  // className: "",
  tagName: "li",
  events: {
    "click": "move"
  },
  template: App.templates.card,
  render: function() {
    // this.$el.html(this.template(this.model.toJSON()))
    // this.$el.appendTo($('#board_canvas'));
  },
  move: function(e) {
    e.stopPropagation();
    // need to assign to another list. Do that here and make ajax.
    //Assign to another list:
    // Use .sync to update server. .remove and .add to change collections.
    var listID = "1";
    this.model.collection.remove(this.model); // Removing from CardCollection.
    App.addCardToList(listID, this.model);
  },
  cardHTML: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this.$el
  },
  initialize: function(card) {
    return this.cardHTML();
    // subscribe to notifications from selected board, list, and item changes.
    // this.model.collection._byId
  },
});