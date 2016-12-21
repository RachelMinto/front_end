var Card = Backbone.Model.extend({

  initialize: function(data) {
    this.comments = new CommentCollection();
    this.activities = new ActivityCollection();
    this.id = App.getNextCardID();
    this.parse(data);
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
  // setID: function() {

  //   this.set("id", nextID);
  // }
});