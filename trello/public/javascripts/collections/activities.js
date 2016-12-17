var Activities = Backbone.Collection.extend({
  model: Activity,
  events: {
    "": ""
  },
  template: App.templates.albums,
  render: function() {
  },
  initialize: function() {
    // publish on add. (?)
  },
});