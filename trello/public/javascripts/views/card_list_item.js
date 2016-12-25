var CardView = Backbone.View.extend({
  // className: "",
  tagName: "li",
  events: {
    "click": "editMenuView",
    // "removeDraggedCard": "removeDraggedCard",
    // "addDroppedCard": "addDroppedCard"
  },
  template: App.templates.card,
  editMenuView: function(e) {
    App.trigger("openCardEditMenu", this.model);
    return false;
  },
  cardHTML: function() {
    this.$el.html(this.template(this.model.toJSON())); // want to call JSON in order to get attributes from model.
    this.$el.attr('data-id', this.model.id);
    this.$el.addClass("ui-sortable-handle");
    return this.$el
  },
  initialize: function() {
    return this.cardHTML();
    // this.listenTo(this.model, "update", this.rerender);
    // subscribe to notifications from selected board, list, and item changes.
    // this.model.collection._byId
  },
});
