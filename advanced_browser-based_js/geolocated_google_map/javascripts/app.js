var map = {
  width: 600,
  height: 420,
  buildURL: function() {
    var base = "http://maps.googleapis.com/maps/api/staticmap?zoom=13&size=";
    var coords = this.position.coords.latitude + "," + this.position.coords.longitude;
    base += this.width + "x" + this.height + "&center=" + coords;
    return base + "&markers=" + coords;
  },
  buildImage: function() {
    var $img = $("<img />", {
      width: this.wdith,
      height: this.height,
      src: this.buildURL(),
    });
    $("#map").html($img);
  },
  latlng: function() {
    return "lat=" + this.position.coords.latitude + "&lon=" + this.position.coords.longitude;
  },
  build: function(position) {
    this.position = position;
    this.buildImage();
    weather.get();
  }
};

var weather = {
  endpoint: "http://api.openweathermap.org/data/2.5/weather",
  template: Handlebars.compile($("#weather_card").html()),
  $el: $("#weather"),
  url: function() {
    return this.endpoint + "?" + map.latlng() + "&APPID=a330959b9f7f72a6fe33f4fd08999521";
  }, 
  get: function() {
    var dfd = $.ajax({
      url: this.url(),
      dataType: "json",
    });
    dfd.done(this.render.bind(this));
  },
  temp: function(kelvin) {
    return kelvinToF(kelvin).toFixed(1) + "&deg;F";
  },
  processData: function(json) {
    return {
      temp: this.temp(json.main.temp),
      description: json.weather[0].description,
      location: json.name
    };
  },
  render: function(json) {
    this.$el.html(this.template(this.processData(json))).addClass("slide");
  }
}

function kelvinToF(temp) {
  return 9 / 5 * (temp - 273.15) + 32;
}

navigator.geolocation.getCurrentPosition(map.build.bind(map));