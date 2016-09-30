$(function() {
  var $canvas = $('#canvas');
  
  function getFormObject($f) {
    var o = {}
    
    $f.serializeArray().forEach(function(input) {
      o[input.name] = input.value;
    });
    
    return o;
  } 
  
  function createElement(data) {
    var $d = $("<div />", {
      "class": data.shape,
      data: data,
    });

    resetElement($d);
    return $d;
  }

  function animateElement() {
    var $e = $(this);
    var data = $e.data();

    resetElement($e);

    $e.animate({
      left: data.ending_x, 
      top: data.ending_y
    }, +data.duration);
  }

  function stopAnimation() {
    $canvas.find("div").stop();
  }

  function resetElement($e) {
    var data = $e.data();

    $e.css({
      left: +data.starting_x,
      top: +data.starting_y
    });
  }
  
  $('form').submit(function(e) {
    e.preventDefault();
    var $f = $(this)
    var data;
    
    data = getFormObject($f);
    $canvas.append(createElement(data));
  });

  $('#animate').click(function(e) {
    e.preventDefault();

    $canvas.find('div').each(animateElement);
  });

  $('#end_animation').click(function(e) {
    e.preventDefault();

    stopAnimation();
  });
});