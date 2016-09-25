$('document').ready(function() {
  $("form").submit(function(event) {
    event.preventDefault();
    var num1 = +$("#numerator").val();
    var num2 = +$("#denominator").val();
    var operator = $("#operator").val();
    var answer = findAnswer(num1, num2, operator);

    $('#answer p').text(answer);
  });

  function findAnswer(a, b, operator) {
    if (operator === '+') {
      return a + b;
    } else if (operator === '-') {
      return a - b;
    } else if (operator === 'x') {
      return a * b;
    } else if (operator === '/') {
      return a / b;
    } else {
      return "The program encountered an error."
    }
  };
});