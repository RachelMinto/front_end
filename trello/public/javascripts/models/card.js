var Card = Backbone.Model.extend({
  events: {
    // "change:comments": "updateActivityWithComment",
    "change:description": "syncServer"
  },
  initialize: function(data) {   
    this.set("labels", []),
    this.set("attachments", []);
    this.parse(data);
    this.on("change:description", this.syncServer);
    // this.on("change:comments", this.updateActivityWithComment);
  },
  syncServer: function() {
    this.sync("update", this);
  },
  parse: function(data) {
    var omitKeys = []
    if (data.activities) {
      this.set("activities", data.activities);
      omitKeys.push('activities');
    }

    if (data.labels) {
      this.set("labels", data.labels);
      omitKeys.push('labels');
    }    

    return _.omit(data, omitKeys);
  },
  incrementCardCommentTotal: function() {
    var current = this.get("cardComments") || 0;
    current++
    debugger;
    this.set("cardComments", current);
  },
  createComment: function(comment) {
    debugger;
    var self = this;

    var activities = _.clone(this.get("activities")) || [];
    var activity = {
      action: "comment",
      title: comment,
      user: App.user.get("username"),
      card: self.get("title"),
      list: "",
      timestamp: new Date()
    };

    this.incrementCardCommentTotal();
    activities.push(activity);
    this.set("activities", activities);

    this.sync("update", this, {
      success: function(json) {
        self.trigger("rerenderEditCardView"); 
      },
    });
  },
  toggleLabel: function(color) {
    debugger;
    var labels = this.get('labels');
    var hasLabel = false;

    if (_(labels).findWhere({ color: color })) {
      labels = _(labels).reject({ color: color });
    } else {
      labels.push({"color": color, "text": ""})
    };

    this.set("labels", labels);
    this.trigger("rerenderEditCardView");
    this.sync("update", this);
  },
});