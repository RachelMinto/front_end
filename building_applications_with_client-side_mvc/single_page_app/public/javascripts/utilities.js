(function() {
  var findObjs = function(element, properties, multiple) {
    var match = multiple ? [] : undefined;

    element.some(function(obj) {
      var all_match = true;

      for (var prop in properties) {
        if (!(prop in obj) || obj[prop] !== properties[prop] ) {
          all_match = false;
        }
      }

      if (all_match) {
        if (multiple) {
          match.push(obj);
        } else {
          match = obj;
          return true;
        }
      }
    });

    return match;
  }

  var _ =  function(element) {
    u = {
      first: function() {
        return element[0];
      },
      last: function() {
        return element[element.length - 1];
      },
      without: function(value) {
        var newArray = [];
        var args = Array.prototype.slice.call(arguments);

        element.forEach(function(el) {
          if (args.indexOf(el) === -1) {
            newArray.push(el);
          }
        });

        return newArray;
      },
      lastIndexOf: function(search) {
        var idx = -1;
        
        for (var i = element.length - 1; i >= 0; i--) {
          if (element[i] === search) {
            idx = i;
            break;
          }
        }
        return idx;
      },
      sample: function(quantity) {
        var sampled = [];
        var copy = element.slice();
        var get = function() {
          var idx = Math.floor(Math.random() * copy.length);
          var el = copy[idx];
          copy.splice(idx, 1);
          return el;
        }

        if (!quantity) { return get(); }

        while(quantity) {
          sampled.push(get());
          quantity--;
        }

        return sampled;
      },
      findWhere: function(properties) {
        return findObjs(element, properties, false);
      },
      where: function(properties) {
        return findObjs(element, properties, true);
      },
      pluck: function(query) {
        var values = [];

        element.forEach(function(obj) {
          if (obj[query]) {
            values.push(obj[query]);
          }
        });

        return values;
      },
      keys: function() {
        var keyNames = [];

        for (var prop in element) {
          keyNames.push(prop);
        }

        return keyNames;
      },
      values: function() {
        var values = [];

        for (var prop in element) {
          values.push(element[prop]);
        }

        return values;
      },
      pick: function() {
        var args = [].slice.call(arguments);
        var newObject = {};

        args.forEach(function(prop) {
          if (prop in element) {
            newObject[prop] = element[prop];
          }
        });

        return newObject;
      },
      omit: function() {
        var args = [].slice.call(arguments);
        var newObject = {};

        args.forEach(function(prop) {
          if (!(prop in element)) {
            newObject[prop] = element[prop];
          }
        });

        return newObject;
      },
      has: function(prop) {
        return {}.hasOwnProperty.call(element, prop);
      },
    };

    (["isElement", "isArray", "isObject", "isFunction", "isBoolean", "isString", "isNumber"]).forEach(function(method) {
      u[method] = function() { _[method].call(u, element); };
    });

    return u;
  };

  _.range = function(start, stop) {
    var range = [];
    if (stop === undefined) {
      stop = start;
      start = 0;
    }

    for (var i = start; i < stop; i++) {
      range.push(i);
    }

    return range;
  };

  _.extend = function() {
    var args = [].slice.call(arguments);
    var oldObject = args.pop();
    var newObject = args[args.length - 1];

    for (var property in oldObject) {
      newObject[property] = oldObject[property];
    }

    return args.length === 1 ? newObject : _.extend.apply(_, args);
  };

  _.isElement = function(object) {
    return object && object.nodeType === 1;
  };

  _.isArray = Array.isArray || function(obj) {
    return toString.call(obj) === "[object Array]";
  };

  _.isObject = function(obj) {
    var type = typeof obj;

    return type === "function" || type === "object" && !!obj;
  };

  _.isFunction = function(obj) {
    var type = typeof obj;

    return type === "function";
  };

  (["Boolean", "String", "Number"]).forEach(function(method) {
    _["is" + method] = function(obj) {
      return toString.call(obj) === "[object " + method + "]";
    }
  });

  window._ = _;
})();