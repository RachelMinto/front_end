var largestProduct = new Worker("/javascripts/task.js");

$(function() {
  var $answer = $("strong");
  var $form = $("form");

  $form.on("submit", function(e) {
    e.preventDefault();
    var numeric_string = $form.find("#numeric_string").val().replace(/\s/gm, "");
    largestProduct.postMessage([numeric_string, +$form.find("#adjacent_count").val()]);
  });

  largestProduct.addEventListener("message", function(message) {
   $answer.text(message.data);
  });
});