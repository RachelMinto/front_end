var Map = {
  drawMap: function() {
    navigator.geolocation.getCurrentPosition(function(position) {
      var url = "https://maps.googleapis.com/maps/api/staticmap?center=" + position.coords.latitude + "," + position.coords.longitude + "&zoom=12&size=400x400";
      console.log(url);
      $("body").append('<img src="' + url + '"/>');
    });
  },
  init: function() {
    this.drawMap();
  },
}




Map.init();