var EditCardView = Backbone.View.extend({
  className: "modal edit_card_menu",
  events: {
    "click": "closeModal",
    "click .card_content": "edit",
    "click .labels": "openLabelPopup",
  },
  template: App.templates.editCardMenu,
  render: function() {
    $('#surface').after(this.$el.html(this.template(this.model)));
  },
  edit: function(e) {
    e.stopPropagation();
  },
  closeModal: function() {
    this.undelegateEvents();
    this.$el.removeData().unbind();
    this.remove();
  },
  openLabelPopup: function(e) {
    e.preventDefault();
    e.stopPropagation();
    this.$el.find(".edit_card_popup.label_menu").removeClass("invisible");
  },
  initialize: function() {
    this.render();
    // subscribe to notifications from selected board, list, and item changes.
  },  
});