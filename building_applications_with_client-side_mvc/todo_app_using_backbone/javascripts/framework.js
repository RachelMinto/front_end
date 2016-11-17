function ModelConstructor(options) {
  var id_count = 0;  
  function Model(attrs) {
    id_count++;    

    var self = this;
    self.attributes = attrs || {};
    self.id = id_count;
    self.attributes.id = id_count;

    if (options && options.change && _.isFunction(options.change)) {
      this.__events.push(options.change);
    }
  }

  Model.prototype = {
    __events: [],
    set: function(key, val) {
      this.attributes[key] = val;
      this.triggerChange();
    },
    get: function(key) {
      return this.attributes[key];
    },
    remove: function() {
      delete this.attributes;
      this.triggerChange();
    },
    triggerChange: function() {
      this.__events.forEach(function(cb) {
        cb();
      })
    },
    addCallback: function(cb) {
      this.__events.push(cb);
    }
  };

  _.extend(Model.prototype, options);

  return Model;
};

function CollectionConstructor(options) {
  function Collection(ModelConstructor) {
    this.models = [];
    this.model = ModelConstructor;
  };

  Collection.prototype = {
    add: function(model) {
      var oldModel = _(this.models).findWhere({ id: model.id });
      var newModel;

      if (oldModel) {return oldModel; }

      newModel = new this.model(model);
      this.models.push(newModel);

      return newModel;
    },
    remove: function(model) {
      debugger;
      model = _.isNumber(model) ? { id: model } : model;

      var m = _(this.models).findWhere(model);

      if (!m) { return; }

      m.remove();
      this.models = this.models.filter(function(existingM) {
        return existingM.attributes.id !== m.id;
      });
    },
    set: function(models) {
      this.reset();
      models.forEach(this.add.bind(this));
    },
    get: function(idx) {
      return _(this.models).findWhere({ id: idx });
    },
    reset: function() {
      this.models = [];
    },
  };

  _.extend(Collection.prototype, options)
  return Collection;
}


// var EditView = Backbone.View.extend({

// });

// function ViewConstructor(options) {
//   function View(model) {
//     this.model = model;
//     this.model.addCallback(this.render.bind(this));
//     this.model.__remove = this.remove.bind(this);
//     this.attributes["data-id"] = this.model.id;    
//     this.model.view = this;
//     this.$el = $("<" + this.tag_name + " />", this.attributes);
//     this.render();
//   }

//   View.prototype = {
//     tag_name: "div",
//     attributes: {},
//     events: {},
//     template: function() {},
//     render: function() {
//       this.unbindEvents();      
//       this.$el.html(this.template(this.model.attributes));

//       this.bindEvents();
//       return this.$el;
//     },
//     remove: function() {
//       this.unbindEvents();
//       this.$el.remove();
//     },
//     bindEvents: function() {
//       var $el = this.$el;
//       var event;
//       var selector;
//       var parts;

//       for (var prop in this.events) {
//         parts = prop.split(" ");
//         selector = parts.length > 1 ? parts.slice(1).join(' ') : undefined;
//         event = parts[0];
//         if (selector) {
//           $el.on(event + ".view", selector, this.events[prop].bind(this));
//         }
//         else {
//           $el.on(event + ".view", this.events[prop].bind(this));
//         }
//       }
//     },
//     unbindEvents: function() {
//       this.$el.off(".view");
//     },
//   };

//   _.extend(View.prototype, options);
//   return View;  
// }
