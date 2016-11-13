function ModelConstructor(options) {
  var idCount = 0;
  function Model(attrs) {
    idCount++;

    var self = this;
    self.attributes = attrs || {};
    self.id = idCount;
    self.attributes.id = idCount;
  };

  Model.prototype = {
    __events: [],
    addCallback: function(cb) {
      this.__events.push(cb);
    }    
  };

  _.extend(Model.prototype, options)

  return Model;
};


function CollectionConstructor(options) {
  function Collection(ModelConstructor) {
    this.models = [];
    this.model = ModelConstructor;
  }

  Collection.prototype = {
    add: function(model) {
      var oldModel = _(this.models).findWhere({ id: model.id });
      var newModel;

      if (oldModel) {return oldModel; }

      newModel = new this.model(model);
      this.models.push(newModel);

      return newModel;
    },
    set: function(model) {
      this.reset();
      this.add(model)     
      $('#todos').append("<li>" + todo(model) + "<li>");
    },
    reset: function() {
      this.models = [];
    },    
  }
  _.extend(Collection.prototype, options);
  return Collection;
};

function ViewConstructor(options) {
  function View(model) {
    this.model = model;
    this.model.addCallback(this.render.bind(this));
    this.$el = $("<" + this.tag_name + " />", this.attributes);
    this.render();
  }

  View.prototype = {
    tag_name: "li",
    attributes: {},
    template: todo,
    events: {},      
    render: function() {
      this.unbindEvents();
      this.$el.html(this.template(this.model.attributes));

      this.bindEvents();
      return this.$el;      
    },
    bindEvents: function() {
      var $el = this.$el;
      var event;
      var selector;
      var parts;

      for (var prop in this.events) {
        parts = prop.split(" ");
        selector = parts.length > 1 ? parts.slice(1).join(' ') : undefined;
        event = parts[0];
        if (selector) {
          $el.on(event + ".view", selector, this.events[prop].bind(this));
        }
        else {
          $el.on(event + ".view", this.events[prop].bind(this));
        }
      }
    },
    unbindEvents: function() {
      this.$el.off(".view");
    },
  };

  _.extend(View.prototype, options)
  return View;
};

