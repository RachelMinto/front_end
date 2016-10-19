var $main = $('main');
var templates = {};

function contactManager() {
  this.init();
}

contactManager.prototype = {
  currentContacts: [],
  currentID: '',

  init: function() {
    this.bind();
    this.cacheTemplates();
    debugger;
    this.loadLocalStorage();
    this.loadMainContent();
  },
  cacheTemplates: function() {
    debugger;
    $("script[type='text/x-handlebars']").each(function() {
      var $tmpl = $(this).remove();
      templates[$tmpl.attr("id")] = Handlebars.compile($tmpl.html());
    });

    $('[data-type="partial"]').each(function() {
      var $partial = $(this).remove();
      Handlebars.registerPartial($partial.attr("id"), $partial.html());
    });
  },
  loadLocalStorage: function() {
    current_id = localStorage.getItem('current_id') || '0';
    currentContacts = JSON.parse(localStorage.getItem('contacts'));
  },
  loadMainContent: function() {
    $('main').prepend($(templates['main_content']({})));
  },
  openModal: function() {
    console.log('evne better!');
  },
  bind: function() {
    $main.on("click", this.openModal.bind(this));
  },
}

contacts = new contactManager();

$(window).on('unload', function() {
  localStorage.removeItem('contacts');
  localStorage.setItem('contacts', JSON.stringify(contacts.currentContacts));
  localStorage.setItem('currentID', contacts.currentID.toString());
});
