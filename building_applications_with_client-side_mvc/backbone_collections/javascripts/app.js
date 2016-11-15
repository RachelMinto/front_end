var PostModel = Backbone.Model.extend({
  url: "http://jsonplaceholder.typicode.com/posts",
  initialize: function() {
    if (!this.get("id")) {
      debugger;
      this.set("id", this.collection.nextID());
    }
  }
});

var Posts = Backbone.Collection.extend({
  model: PostModel,
  url: "http://jsonplaceholder.typicode.com/posts",
  lastID: 0,
  setLastID: function() {
    if (this.isEmpty()) { return; }

    this.lastID = this.last().get("id");
  },
  nextID: function() {
    return ++this.lastID;
  },
  initialize: function() {
    this.on("sync", this.setLastID);
  }
});

var blogRoll = new Posts();

var usersData = [{
  id: 1,
  name: "Leanne Graham"
}, {
  id: 2,
  name: "Ervin Howell"
}, {
  id: 3,
  name: "Clementine Bauch"
}];

var User = Backbone.Model.extend({});
var Users = Backbone.Collection.extend({
  model: User
});
var blogAuthors = new Users();

blogAuthors.reset(usersData);

blogRoll.fetch({
  reset: true,
  success: function(collection) {
    console.log(collection.toJSON());
  }
});

blogRoll.add({
  id: 1,
  userId: 1,
  title: "My first post",
  body: "A whole bunch of nothing!"
});

var firstPost = blogRoll.get(1);





