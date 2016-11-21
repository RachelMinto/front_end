function largestProduct(digitString, subLength) {
  var largest_product = 0;
  var substr;
  var current_product;
  var last_index = digitString.length - subLength;
  
  if (last_index <= 0) { return 0; }

  for (var i = 0; i <= last_index; i++) {
    var substr = digitString.substr(i, subLength);

    if (/0/.test(substr)) { continue; }

    current_product = product(substr);
    if (current_product > largest_product) { largest_product = current_product; }
  };

  return largest_product;
}

function product(digits) {
  return digits.split('').reduce(function(total, b) { return +total * +b });
}

onmessage = function(message) {
  var digitString = message.data[0];
  var subLength = message.data[1];

  postMessage(largestProduct(digitString, subLength));
}