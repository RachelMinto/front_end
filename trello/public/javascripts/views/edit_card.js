var EditCardView = Backbone.View.extend({
  className: "modal edit_card_menu",
  events: {
    "click": "closeModal",
    "click .card_content": "edit",
    "click .labels": "openLabelPopup",
    "click .edit_card_description": "openEditDescription",
    "click .add_description": "updateDescription",
    "click .send_comment": "addComment",
    "click span.card_label": "toggleLabel"
  },
  template: App.templates.editCardMenu,
  addComment: function() {
    debugger;
    var commentTitle = this.$el.find('.comment_input').val();
    var comment = {
      "user": App.user.get("username"),
      "title": commentTitle
    }
    var comments = _.clone(this.model.get("comments")) || []

    comments.push(comment);
    this.model.set("comments", comments);
    this.$el.html(this.template(this.model.toJSON()))
    return false;
  },
  addLabel: function(e) {
    // board should have object of labels.
    // Label text lookup.
    // Add label object to card's labels attr. or remove if allready present!
    // Sync updated card with server. 
    // update server with new object when label text gets edited.

    return false;
  },
  openEditDescription: function(e) {
    this.$el.find(".edit_card_description_popover").removeClass("invisible");
    return false;
  },
  render: function() {
    $('#surface').after(this.$el.html(this.template(this.model.toJSON())));
  },
  edit: function(e) {
    return false;
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
    var newDescription = this.$el.find('.card_description_input').val();
    this.model.set({"description":newDescription});
    this.$el.find(".card_description_text").text(newDescription);
    this.$el.find(".edit_card_description_popover").addClass("invisible");
  },
  initialize: function() {
    this.render();
    // subscribe to notifications from selected board, list, and item changes.
  },  
});