$(function() {
  var $slideshow = $("#slideshow");
  var $nav = $slideshow.find("ul");

  $nav.on("click", "a", function(e) {
    e.preventDefault();
    var $li = $(e.currentTarget).closest("li");
    var idx = $li.index();

    $slideshow.find("figure").stop().filter(":visible").fadeOut(300);
    $slideshow.find("figure").eq(idx).delay(300).fadeIn(300);
    $nav.find(".active").removeClass("active");
    $li.addClass("active");
  })
});


//Make click event for thumnnails so that when one is clicked:
// a) border changes on thumnnails to ___.
// a.5) remove acttve setting from other thumbnails.
// c) current img, if different than thumnail, gets made inactive and fadesOut.
// b) main assoc img takes get made to active and fadesIn.

// Add triangle buttons on both side of main image.
// When clicked, cycle through forward or backwards and do loop above.