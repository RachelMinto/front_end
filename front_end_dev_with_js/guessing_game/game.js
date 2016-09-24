$(document).ready(function() {
  var answer = Math.floor(Math.random() * 100) + 1;
  var guesses = 0;

  $('form').submit(function(event) {
    event.preventDefault();

    var guess = +$('#guess').val();
    var message;

    guesses++;

    if (guess === answer) {
      message = "You guessed it! It took you " + guesses + " guesses.";
    } else if (guess > answer) {
      message = "My number is lower than " + guess;
    } else {
      message = "My number is higher than " + guess;
    }
    $("p").text(message);
  });

  $("a").click(function(e) {
    e.preventDefault();

    answer = Math.floor(Math.random() * 100) + 1;
  })
});  
