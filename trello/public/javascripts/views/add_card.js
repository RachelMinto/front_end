var AddCardView = Backbone.View.extend({
  events: {
    "click .submit_new_card": "submitForm"
  },
  template: App.templates.add_card_composer,
  submitForm: function(e) {
    e.preventDefault();
    var newName = $('#new_card_name').val();

    if (newName === "") { return; }

    var $f = this.$("form")
    debugger;
    this.trigger("add_card", $f);
  },
  getView: function() {
    return this.$el.html(this.template());
  },
});