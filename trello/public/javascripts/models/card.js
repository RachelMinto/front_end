var Card = Backbone.Model.extend({
  archive: function() {
    this.set("archived", true);
    this.syncServer();
  },
  movedCardActivty: function(oldListTitle, newListTitle) {
    var self = this;
    var activities = _.clone(this.get("activities")) || [];
    var date = new Date();

    var activity = {
      action: "moved",
      user: App.user.get("username"),
      card: self.get("title"),
      oldList: oldListTitle,
      newList: newListTitle,
      timestamp: date.toLocaleDateString(),
    };

    activities.push(activity);
    this.set("activities", activities);
  },
  unarchive: function() {
    this.set("archived", false);
    this.syncServer();
  },
  syncServer: function() {
    var self = this;
    this.sync("update", this, {
      success: function(json) {
        self.trigger("rerenderEditCardView");
      },
    });      
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

    if (data.description) {
      this.set("description", data.description);
      omitKeys.push("description");
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
    this.set("cardComments", current);
  },
  createComment: function(comment) {
    var self = this;
    var date = new Date();

    var activities = _.clone(this.get("activities")) || [];
    var activity = {
      action: "comment",
      title: comment,
      user: App.user.get("username"),
      card: self.get("title"),
      list: self.collection.parentList.get("title"),
      timestamp: date.toLocaleDateString()
    };

    this.incrementCardCommentTotal();
    activities.push(activity);
    this.set("activities", activities);

    this.syncServer();
  },
  toggleLabel: function(color) {
    var labels = this.get('labels');

    if (_(labels).findWhere({ color: color })) {
      labels = _(labels).reject({ color: color });
    } else {
      labels.push({"color": color, "text": ""})
    };

    this.set("labels", labels); 
    this.syncServer();
    App.renderLists(); 
  },
  updateDescription: function(newDescription) {
    this.set("description", newDescription);
    this.syncServer();
  },
  initialize: function(data) {   
    this.set("labels", []),
    this.set("archived", false);
    this.parse(data);
  },  
});