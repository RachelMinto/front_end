var MoveList = Backbone.View.extend({
  template: App.templates.move_list,
  events: {
    "click .move_submission": "move",
    "click i.icon-cancel": "closeModal",
    "change select[name='list_select_options']": "updatePositionOptions",
    "change select[name='position_select_options']": "updatePositionSelection",
    "click .move_list_popup": "preventClose"
  },
  el: "div",
  closeModal: function() {
    $('.pop-over').attr('class', 'pop-over');
  },
  initialize: function() {
    var unarchivedLists = App.board.lists.reject({archived: true});
    var lists = _.pluck(unarchivedLists, "id")
    var self = this;
    var position = unarchivedLists.indexOf(self.model) + 1;

    var data = {
      position: position,
      lists: lists, // array of ids
    }

    this.render(data);
    $("div.all_positions_dropdown_placeholder select").val(+position - 1);
  },
  move: function() {
    var newPosition = $(".position_select_options").val();
    App.moveList(newPosition, this.model);
    this.closeModal();
  },
  preventClose: function() {
    return false;
  },
  render: function(data) {
    $('.pop-over').attr('class', 'pop-over move_list is-shown');
    $('.pop-over').html(this.template(data));
  },
  updatePositionOptions: function(e) {
    return false
  },
  updatePositionSelection: function() {
    var positionID = +$(".position_select_options").val() + 1;
    $(".position_value").html(positionID);
    return false;
  },
});