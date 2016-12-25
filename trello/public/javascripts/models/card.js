var Card = Backbone.Model.extend({
  events: {
    // "change:comments": "updateActivityWithComment",
    "change:description": "syncServer"
  },
  archive: function() {
    var self = this;
    this.set("archived", true);
    this.sync("update", this, {
      success: function(json) {
        self.trigger("rerenderEditCardView"); 
      },
    });
  },
  createChecklist: function(title) {
    var self = this;
    var current = _.clone(this.get("checklists")) || new ChecklistCollection();

    current.add({title: title, todos: []});

    this.set("checklists", current);

    this.sync("update", this, {
      success: function(json) {
        self.trigger("rerenderEditCardView");
      },
    });    
  },
  syncServer: function() {
    this.sync("update", this);
  },
  parse: function(data) {
    var omitKeys = [];

    if (data.checklists) {
      var existing = new ChecklistCollection();
      existing.reset(data.checklists);
      this.set("checklists", existing);
      omitKeys.push('checklists');      
    }

    if (data.activities) {
      this.set("activities", data.activities);
      omitKeys.push('activities');
    }

    if (data.archived) {
      this.set("archived", data.archived);
      omitKeys.push("archived");
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
  initialize: function(data) {   
    this.set("labels", []),
    this.set("attachments", []);
    this.set("archived", false);
    this.parse(data);
    this.on("change:description", this.syncServer);
    // this.on("change:comments", this.updateActivityWithComment);
  },  
});