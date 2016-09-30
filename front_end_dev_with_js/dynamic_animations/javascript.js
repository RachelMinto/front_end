$(function() {
  $('form').submit(function(e) {
    e.preventDefault();
    var animation_details = $(this).serializeArray();
    var shape = animation_details[0].value;
    console.log(shape);

    $('#canvas').append('<div class="' + shape + '", style="top: 100px;">' + '</div>')

  });
});