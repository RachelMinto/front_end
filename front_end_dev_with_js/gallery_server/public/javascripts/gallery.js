$(document).ready(function() {
  var currentID = 1;
  var photoData = []
  $.ajax({
    url: '../photos',
    type: "GET",
    dataType: "json"
  })
  .done(function(photos) {
    photoData = photos
    renderPhotoAndData();
  })
  .fail(function(xhr, status, errorThrown) {
    console.log("sorry, there was a problem!");
  })
  renderPhotoAndData = function(){
    renderPhoto();
    renderPhotoInfo();
    renderComments();
  }
  renderPhoto = function() {
    tmpl = $('#photos').html();
    photo_template = Handlebars.compile(tmpl);
    $('#slides').empty().append(photo_template({ photos: photoData }));
  };
  renderPhotoInfo = function() {
    photo_template = Handlebars.compile($('#photo_information').html());
    imagePosition = currentID - 1
    $('section > header').empty().append(photo_template(photoData[imagePosition]));    
  };
  renderComments = function() {
    $.ajax({
      url: 'comments?photo_id=' + currentID,
      type: "GET",
      dataType: "json"
    }).done(function(photoComments) {
      tmpl = $('#commentsFormat').html();
      comment_template = Handlebars.compile(tmpl);
      Handlebars.registerPartial('comment', $('#comment').html());
      $('#comments ul').empty().append(comment_template({ comments: photoComments }));      
    });
    $('.prev').off().on("click", function(e) {
      e.preventDefault();
      if (+currentID > 1) {
        currentID -= 1;
      } else {
        currentID = 3;
      };
      renderPhotoAndData();
      console.log(currentID);
    });
    $('.next').off().on("click", function(e) {
      e.preventDefault();

      if (+currentID < 3) {
        currentID += 1;
      } else {
        currentID = 1;
      };
      renderPhotoAndData();
      console.log(currentID);
    });
  };
});

