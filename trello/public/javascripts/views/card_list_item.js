var CardView = Backbone.View.extend({
  // className: "",
  tagName: "li",
  events: {
    "click": "editMenuView",
    // "removeDraggedCard": "removeDraggedCard",
    // "addDroppedCard": "addDroppedCard"
  },
  template: App.templates.card,
  move: function(e) {
    e.stopPropagation();
    // need to assign to another list. Do that here and make ajax.
    //Assign to another list:
    // Use .sync to update server. .remove and .add to change collections.
    var listID = "1"; // need to dynamically generate this ID.
    this.model.collection.remove(this.model); // Removing from CardCollection.
    App.addCardToList(listID, this.model);
  },
  editMenuView: function(e) {
    e.preventDefault();
    e.stopPropagation();
    App.trigger("openCardEditMenu", this.model)
  },
  cardHTML: function() {
    this.$el.html(this.template(this.model.toJSON()));
    this.$el.attr('data-id', this.model.get('id'));
    return this.$el
  },
  initialize: function(card) {
    return this.cardHTML();
    // subscribe to notifications from selected board, list, and item changes.
    // this.model.collection._byId
  },
});