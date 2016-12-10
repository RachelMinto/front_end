var FoodItem = Backbone.Model.extend({
  parse: function(attrs) {
    attrs.tracks_url = "/menu/" + attrs.id;
    return attrs;
  }  
});