$(function() {
  var canvas = document.querySelector('canvas');
  var ctx = canvas.getContext('2d');
  var method;
  var $color = $("input");

  var drawingMethods = {
    square: function(e) {
      var side = 30;
      var x = e.offsetX - side / 2;
      var y = e.offsetY - side / 2;
      ctx.fillRect(x, y, side, side);
    },
    circle: function(e) {
      var radius = 15;
      var x = e.offsetX;
      var y = e.offsetY;

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.fill();
      ctx.closePath();
    },
    triangle: function(e) {
      var side = 30;
      var x = e.offsetX
      var y = e.offsetY - side / 2;

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + side / 2, y + side);
      ctx.lineTo(x - side / 2, y + side);
      ctx.fill();
      ctx.closePath();
    },
    bowl: function(e) {
      var radius = 15;
      var x = e.offsetX;
      var y = e.offsetY;

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 1 * Math.PI);
      ctx.fill();
      ctx.closePath();

    },
    clear: function() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  $('.drawing_method').on('click', function(e) {
    e.preventDefault();
    var $e = $(this);
    var className = "active";

    $e.closest("ul").find("." + className).removeClass(className);
    $e.addClass(className);
    method = $e.attr("data-method");
  }).eq(0).click();

  $('canvas').on('click', function(e) {
    var color = $color.val();

    ctx.fillStyle = color;
    drawingMethods[method](e);
  });

  $('#clear').on('click', function(e) {
    e.preventDefault();
    drawingMethods.clear();
  });
});