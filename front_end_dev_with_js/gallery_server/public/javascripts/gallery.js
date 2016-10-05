$(function() {
  var slideshow = {
    speed: 500,
    photosData: [],
    currentID: 1,
    init: function() {
      this.photosData = getPhotoData;
      renderPhoto;
    },
  };
  var getPhotoData = $.ajax({
    url: '../photos',
    type: "GET",
    dataType: "json"
  })
  .done(function(photos) {
    return photos;
  })
  .fail(function(xhr, status, errorThrown) {
    console.log("sorry, there was a problem!");
  });
});