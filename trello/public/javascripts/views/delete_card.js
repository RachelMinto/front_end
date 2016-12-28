var DeleteCardPopup = Backbone.View.extend({
  template: App.templates.delete,
  events: {
    "click i.icon-cancel": "closeModal",    
    "click .delete_confirmation": "deleteCard",
    "click .card_labels_popup": "preventClose"
  },
  el: "div",
  closeModal: function() {
    this.undelegateEvents();
    this.$el.removeData().unbind();
    $('.pop-over').attr('class', 'pop-over');
  },
  preventClose: function() {
    return false;
  },
  render: function() {
    $('.pop-over').attr('class', 'pop-over is-shown menu-popover delete-card-popover');
    $('.pop-over').html(this.template(this.model.toJSON()));
  },
  deleteCard: function() {
    this.model.destroy();
  },
  initialize: function(options) {
    this.render();
  },  
});