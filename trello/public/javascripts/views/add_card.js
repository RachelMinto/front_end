// var AddCardView = Backbone.View.extend({
//   events: {
//     "submit": "submitForm",
//     "click": "destroyView"
//   },
//   template: App.templates.add_card_composer,
//   submitForm: function(e) {
//     e.preventDefault();
//     e.stopPropagation();
//     var $f = this.$("form")

//     var newName = $('#new_card_name').val();
//     if (newName === "") { return; }

//     this.trigger("add_card", $f);
//     this.destroyView();
//   },
//   destroyView: function() {
//     this.undelegateEvents();
//     $(this.el).removeData().unbind(); 
//     this.remove();  
//   },
//   getView: function() {
//     return this.$el.html(this.template({id: this.id}));
//   },
//   initialize: function(options) {
//     this.options = options;
//   }
// });