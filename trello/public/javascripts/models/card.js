var Card = Backbone.Model.extend({
  events: {
    "change:comments": "updateActivityWithComment",
    "change:description": "syncServer"
  },
  initialize: function(data) {   
    this.set("comments", [])
    this.activities = new ActivityCollection();
    // this.checklist = [],
    this.set("labels", []),
    this.set("attachments", []);
    this.parse(data);
    this.on("change:description", this.syncServer);
    this.on("change:comments", this.updateActivityWithComment);
  },
  syncServer: function() {
    this.sync("update", this);
  },
  parse: function(data) {
    var omitKeys = []
    if (data.comments) {
      this.set("comments", data.comments);
      omitKeys.push('comments')
    }

    if (data.activities) {
      this.activities.reset(data.activities);
      omitKeys.push('activities');
    }

    if (data.labels) {
      this.set("labels", data.labels);
      omitKeys.push('labels');
    }    

    return _.omit(data, omitKeys);
  },
  updateActivityWithComment: function(commentTitle) {
    debugger;
    // var comment = {
    //   user: App.user.username,
    //   type: "comment",
    //   title: commentTitle,
    //   timeStamp: Date.Now(),
    // }
    // var currentComments = this.get("comments")
    this.syncServer();
  }  
});