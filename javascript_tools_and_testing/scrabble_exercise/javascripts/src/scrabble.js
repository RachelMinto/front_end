var scores = {
  1: ["A", "E", "I", "O", "U", "L", "N", "R", "S", "T"],
  2: ["D", "G"],
  3: ["B", "C", "M", "P"],
  4: ["F", "H", "V", "W", "Y"],
  5: ["K"],
  8: ["J", "X"],
  10: ["Q", "Z"]
};

function Scrabble(word) {
  if (!word) { return 0; }
  var letters = word.toUpperCase().split("");
  var score = 0;

  letters.forEach(function(letter) {
    for (var point in scores) {
      if (scores[point].indexOf(letter) !== -1) {
        score += +point;
      }
    }
  });

  return score;
}