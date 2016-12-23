var Card = Backbone.Model.extend({
  initialize: function(data) {   
    this.comments = new CommentCollection();
    this.activities = new ActivityCollection();
    this.checklist = [],
    this.attachments = [],
    this.id = App.getNextCardID();
    this.parse(data);
    this.on("change:description", this.syncServer);
  },
  syncServer: function() {
    debugger;
    this.sync("update", this, {
      success: function(json) {
        debugger;
      },
      error: function(json) {
        debugger;
      },      
    });
    // rerender card list item, and the edit menu either update or re-render.
  },
  parse: function(data) {
    var omitKeys = []
    if (data.comments) {
      this.comments.reset(data.comments);
      omitKeys.push('comments')
    }

    if (data.activities) {
      this.activities.reset(data.activities);
      omitKeys.push('activities');
    }

    return _.omit(data, omitKeys);
  },
});