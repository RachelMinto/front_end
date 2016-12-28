var CopyList = Backbone.View.extend({
  template: App.templates.copy_list,
  events: {
    "click .copy_submission": "copy",
    "click i.icon-cancel": "closeModal",
    "click .copy_list_popup": "preventClose"
  },
  el: "div",
  closeModal: function() {
    $('.pop-over').attr('class', 'pop-over');
  },
  initialize: function() {
    var title = this.model.get("title")
    this.render({"title":title});
  },
  copy: function() {
    var title = $(".copy_list_title_text").val();
    App.copyList(title, this.model);
    this.closeModal();
  },
  preventClose: function() {
    return false;
  },
  render: function(title) {
    $('.pop-over').attr('class', 'pop-over copy_list is-shown');
    $('.pop-over').html(this.template(title));
    $('.copy_list_title_text').focus().select();
  },
});