var EditCardView = Backbone.View.extend({
  className: "modal edit_card_menu",
  events: {
    "click": "closeModal",
    "click .card_content": "edit"
  },
  template: App.templates.editCardMenu,
  render: function() {
    $('#surface').after(this.$el.html(this.template(this.model.toJSON())));
  },
  edit: function(e) {
    e.stopPropagation();
  },
  closeModal: function() {
    this.undelegateEvents();
    this.$el.removeData().unbind();
    this.remove();
  },
  initialize: function() {
    this.render();
    // subscribe to notifications from selected board, list, and item changes.
  },  
});