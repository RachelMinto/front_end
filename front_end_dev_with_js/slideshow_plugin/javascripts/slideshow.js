$(function() {
  DummyImage.generate();

  var $slides = $("#slides");

  $slides.slideshow({
    $nav: $slides.next('ul'),
  });
});
