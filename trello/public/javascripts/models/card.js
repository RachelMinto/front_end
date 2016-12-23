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
    this.sync("update", this);
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