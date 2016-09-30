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
      css: {
        left: +data.starting_x,
        top: +data.starting_y,
      }
    });
    
    return $d;
  }
  
  $('form').submit(function(e) {
    e.preventDefault();
    var $f = $(this)
    var data;
    
    data = getFormObject($f);
    console.log(data);
    $canvas.append(createElement(data));
  });
});