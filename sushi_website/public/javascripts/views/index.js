// var IndexView = Backbone.View.extend({
//   attributes: {
//     id: "index"
//   },
//   events: {
//   },
//   template: App.templates.index,
//   addFoodItem: function(e) {
//     e.preventDefault();
//     this.trigger("add_food_item");
//   },
//   render: function() {
//     console.log("index view is rendering");
//     this.$el.html(this.template());
//     App.$el.html(this.$el);
//   },
//   initialize: function() {
//     this.render();
//   }
// });