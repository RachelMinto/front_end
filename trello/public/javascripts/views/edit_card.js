var EditCardView = Backbone.View.extend({
  className: "modal edit_card_menu",
  events: {
    "click": "closeModal",
    "click .icon-cancel.close_edit_card": "closeModal",
    "click .edit_card_menu_wrapper": "preventClose",
    "click .card_content": "edit",
    "click .labels": "openLabelPopup",
    "click .edit_card_description": "openEditDescription",
    "click .add_description": "updateDescription",
    "click .send_comment": "addComment",
    "click .card_title_placeholder": "editNameView",
    "blur input#new_card_name": "updateCardName",
    "click .move_title_link": "openMovePopup",
    "click .menu_button.move_card": "openMovePopup",
    "click .menu_button.archive_card": "archiveCard",
    "click .unarchive_card": "unarchiveCard",
    "click .delete_card_warning": "openDeleteWarning",
    "click .copy_card": "openCopyPopup",
    "click .close_card_edit_description": "cancelDescriptionUpdate",
  },
  template: App.templates.editCardMenu,
  addComment: function(e) {
    var commentTitle = this.$el.find('.comment_input').val();
    this.model.createComment(commentTitle);
    return false;
  },
  archiveCard: function() {
    this.model.archive();
  },
  cancelDescriptionUpdate: function() {
    this.$el.find(".edit_card_description_popover").addClass("invisible");
    this.$el.find(".card_description").removeClass("invisible");
    return false
  },
  editNameView: function() {
    this.$el.find(".new_card_title_input").removeClass("invisible");
    this.$el.find(".card_title_placeholder").addClass("invisible");
  },
  openEditDescription: function(e) {
    this.$el.find(".edit_card_description_popover").removeClass("invisible");
    this.$el.find(".card_description").addClass("invisible");
    this.$el.find(".card_description_input").focus().select();
    return false;
  },
  render: function() {
    var data = this.model.toJSON()
    data["listTitle"] = this.model.collection.parentList.get("title");
    $('.pop-over').attr('class', 'pop-over invisible"');
    $('.window').html(this.$el.html(this.template(data)));    
    $('.window-overlay').removeClass("invisible");
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
    $('.window-overlay').addClass("invisible");
  },
  openCopyPopup: function() {
    new CopyCard({ model: this.model });
  },  
  openDeleteWarning: function() {
    new DeleteCardPopup({ model: this.model });
    return false;
  },
  openLabelPopup: function() {
    new LabelPopup({ model: this.model });
    return false;
  },
  openMovePopup: function(e) {
    var card = this.model;
    var list = this.model.collection.parentList;
    App.movePopup(card, list);
    return false    
  },
  preventClose: function(e) {
    return false;
  },
  unarchiveCard: function() {
    this.model.unarchive();
    return false
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
    this.model.updateDescription(newDescription);
  },
  initialize: function() {
    this.render();
    this.listenTo(this.model, "rerenderEditCardView", this.rerender);
    this.listenTo(this.model, 'destroy', this.closeModal);
  },  
});