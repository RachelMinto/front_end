

var $main = $('main');

function contactManager() {
  this.init();
}

contactManager.prototype = {
  collection: [],
  init: function() {
    this.bind();
  },
  cacheTemplates: function() {
    $("script[type='text/x-handlebars']").each(function() {
      var $tmpl = $(this).remove();
      templates[$tmpl.attr("id")] = Handlebars.compile($tmpl.html());
    });

    $('[data-type="partial"]').each(function() {
      var $partial = $(this).remove();
      Handlebars.registerPartial($partial.attr("id"), $partial.html());
    });
  },
  openModal: function() {
    console.log('evne better!');
  },

  bind: function() {
    $main.on("click", this.openModal.bind(this));
  },
}

contacts = new contactManager();


// $(window).on('unload', function() {
//   localStorage.removeItem('todos');
//   localStorage.setItem('todos', JSON.stringify(toDos.collection));
//   localStorage.setItem('current_id', this.current_id.toString());
// });
