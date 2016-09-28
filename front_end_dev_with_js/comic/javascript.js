$(function() {
  var $blinds = $('[id^=blind]');
  var speed = 250;
  var delay = 1500;

  $blinds.each(function(i) {
    var $blind = $blinds.eq(i);

    $blind.delay(delay * i + speed).animate({
      top: "+=" + $blind.height(),
      height: 0
    }, speed);
  });
});