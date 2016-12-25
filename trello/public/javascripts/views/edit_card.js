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
    "click .menu_button.archive_card": "archiveCard",
    "click .menu_button.checklist": "openChecklist",
    "click .add_checklist": "addChecklist",
    "click .add_checklist_todo_placeholder": "openTodoCreator",
    "click .submit_new_checklist_todo": "addChecklistTodo",
  },
  template: App.templates.editCardMenu,
  addChecklistTodo: function(e) {
    // send checklist title and new todo to list.
  },
  addComment: function(e) {
    var commentTitle = this.$el.find('.comment_input').val();
    this.model.createComment(commentTitle);
    return false;
  },
  addChecklist: function(e) {
    var checklistTitle = this.$el.find('#checklist_title_input').val();
    debugger;
    this.model.createChecklist(checklistTitle);
    return false;
  },
  archiveCard: function() {
    this.model.archive();
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
    $('.window-overlay').append(this.$el.html(this.template(this.model.toJSON())));
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
    // $('.pop-over').remove("is-shown edit_card");
    $('.window-overlay').addClass("invisible");
  },
  openChecklist: function() {
    this.$el.find(".add_checklist_popup.card_menu_popup").removeClass("invisible");
  },
  openLabelPopup: function() {
    this.$el.find(".add_label_popup.card_menu_popup").removeClass("invisible");
  },
  openMovePopup: function(e) {
    // get cardID, listID
    var card = this.model;
    var list = this.model.collection.parentList;
    App.movePopup(card, list);
    return false    
  },
  openTodoCreator: function(e) {
    $(e.target).closest(".add_checklist_todo_placeholder").addClass("invisible");
    $(e.target).next(".card_add_todo_form").removeClass("invisible");
    return false;
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