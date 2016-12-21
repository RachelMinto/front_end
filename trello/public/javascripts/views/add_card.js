var AddCardView = Backbone.View.extend({
  events: {
    "click .submit_new_card": "submitForm"
  },
  template: App.templates.add_card_composer,
  submitForm: function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    var newName = $('#new_card_name').val();
    if (newName === "") { return; }
    debugger;
    this.trigger("add_card", newName);
    this.destroyView();
  },
  destroyView: function() {
    this.undelegateEvents();
    $(this.el).removeData().unbind(); 
    this.remove();  
  },
  getView: function() {
    return this.$el.html(this.template());
  },
});