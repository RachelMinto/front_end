$(function() {
  var templates = {};
  var photos;
  var speed = 500;

  $("script[type='text/x-handlebars']").each(function() {
    var $tmpl = $(this);
    templates[$tmpl.attr("id")] = Handlebars.compile($tmpl.html());
  });

  $("[data-type='partial']").each(function() {
    var $partial = $(this);
    Handlebars.registerPartial($partial.attr("id"), $partial.html());
  });

  $.ajax({
    url: "/photos",
    success: function(json) {
      photos = json;
      renderPhoto();
      renderPhotoInformation(0);
      getCommentsFor(photos[0].id);
    }
  });

  function renderPhoto() {
    $('#slides').html(templates.photos({ photos: photos }));
  };

  function renderPhotoInformation(idx) {
    $('section > header').html(templates.photo_information(photos[idx]));
  };

  function getCommentsFor(idx) {
    $.ajax({
      url: "/comments",
      data: "photo_id=" + idx,
      success: function(comment_json) {
        $("#comments ul").html(templates.comments({ comments: comment_json }));
      }
    });
  };

  $('.prev').off().on("click", function(e) {
    e.preventDefault();
    previousSlide();
  });

  $('.next').off().on("click", function(e) {
    e.preventDefault();
    nextSlide();
  }); 

  function nextSlide() {
    if ($('#slides figure:visible').is(":last-child")) {
      $('#slides figure:visible').fadeOut(speed).siblings(":first-child").fadeIn(speed);
    } else {
      $('#slides figure:visible').fadeOut(speed).next().fadeIn(speed);
    }
  };

  function previousSlide() {
    if ($('#slides figure:visible').is(":first-child")) {
      $('#slides figure:visible').fadeOut(speed).siblings(":last-child").fadeIn(speed);
    } else {
      $('#slides figure:visible').fadeOut(speed).prev().fadeIn(speed);
    }
  };

});


