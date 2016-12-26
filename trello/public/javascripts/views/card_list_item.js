var CardView = Backbone.View.extend({
  tagName: "li",
  events: {
    "click": "editMenuView",
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
  },
});
