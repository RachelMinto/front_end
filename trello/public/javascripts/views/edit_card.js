var EditCardView = Backbone.View.extend({
  className: "modal edit_card_menu",
  events: {
    "click": "closeModal",
    "click .card_content": "edit",
    "click .labels": "openLabelPopup",
    "click .edit_card_description": "openEditDescription",
    "click .add_description": "updateDescription",
  },
  template: App.templates.editCardMenu,
  openEditDescription: function(e) {

    this.$el.find(".edit_card_description_popover").removeClass("invisible");
    return false;
  },
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
    this.$el.find(".edit_card_popup.label_menu").removeClass("invisible");

    return false;
  },
  updateDescription: function(e) {
    e.preventDefault();
    debugger;
    var newDescription = $(this).find('.card_description').val();
    this.model.set({"description":newDescription});
  },
  initialize: function() {
    this.render();
    // subscribe to notifications from selected board, list, and item changes.
  },  
});