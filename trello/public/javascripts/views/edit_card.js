var EditCardView = Backbone.View.extend({
  className: "modal edit_card_menu",
  events: {
    "click": "closeModal",
    "click i.icon-cancel": "closeModal",
    "click .edit_card_menu_wrapper": "preventClose",
    "click .card_content": "edit",
    "click .labels": "openLabelPopup",
    "click .edit_card_description": "openEditDescription",
    "click .add_description": "updateDescription",
    "click .send_comment": "addComment",
    "click span.card_label": "toggleLabel",
    "click .card_title_placeholder": "editNameView",
    "blur input#new_card_name": "updateCardName",
    "click .menu_button.move_card": "openMovePopup",
  },
  template: App.templates.editCardMenu,
  addComment: function(e) {
    var commentTitle = this.$el.find('.comment_input').val();
    this.model.createComment(commentTitle);
    return false;
  },
  editNameView: function() {
    this.$el.find(".new_card_title_input").removeClass("invisible");
    this.$el.find(".card_title_placeholder").addClass("invisible");
  },
  openEditDescription: function(e) {
    this.$el.find(".edit_card_description_popover").removeClass("invisible");
    return false;
  },
  render: function() {
    $('#surface').after(this.$el.html(this.template(this.model.toJSON())));
  },
  rerender: function() {
    this.$el.empty();
    this.$el.html(this.template(this.model.toJSON()));
  },
  edit: function(e) {
    return false;
  },
  closeModal: function() {
    this.undelegateEvents();
    this.$el.removeData().unbind();
    this.remove();
  },
  openLabelPopup: function() {
    this.$el.find(".edit_card_popup.card_menu_popup").removeClass("invisible");
  },
  openMovePopup: function() {
    this.$el.find(".move_card_popup.card_menu_popup").removeClass("invisible");
  },
  preventClose: function(e) {
    return false;
  },
  toggleLabel: function(e) {
    var labelColor = $(e.target).data("color");
    this.model.toggleLabel(labelColor);
    debugger;
  },
  updateCardName: function(e) {
    this.model.set('title', e.target.value);
    this.$el.find(".card_title_placeholder h3").html(e.target.value);

    this.$el.find(".new_card_title_input").addClass("invisible");
    this.$el.find(".card_title_placeholder").removeClass("invisible");
    this.model.sync("update", this.model);
  },
  updateDescription: function(e) {
    e.preventDefault();
    var newDescription = this.$el.find('.card_description_input').val();
    this.model.set({"description":newDescription});
    this.$el.find(".card_description_text").text(newDescription);
    this.$el.find(".edit_card_description_popover").addClass("invisible");
  },
  initialize: function() {
    this.render();
    this.listenTo(this.model, "rerenderEditCardView", this.rerender);
  },  
});