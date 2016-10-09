var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');

var preloader = {
  path: "images/",
  srcs: ["lake.jpg", "bay.jpg", "pink_field.jpg", "wall.jpg"],
  createImage: function(i, src) {
    var $img = $('<img />', { src: this.path + src });
    $img.on('load', manipulator.process.bind(manipulator));
  },
  run: function() {
    $.each(this.srcs, this.createImage.bind(this));
  }
};

var manipulator = {
  drawImage: function(img) {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
  },
  getData: function() {
    return ctx.getImageData(0, 0, canvas.width, canvas.height);
  },
  renderOriginal() {
    var img = document.createElement('img');
    img.src = canvas.toDataURL();
    $('#original').append(img);
  },
  convertToGreyscale: function() {
    var imageData = this.getData();
    var greyData;

    for (var i = 0, len = imageData.data.length; i < len; i += 4) {
      greyData = imageData.data[i] * 0.3086 + imageData.data[i + 1] * 0.6094 + imageData.data[i + 2] * 0.0820;
      imageData.data[i] = greyData;
      imageData.data[i + 1] = greyData;
      imageData.data[i + 2] = greyData;
    }

    ctx.putImageData(imageData, 0, 0);
  },
  writeImage: function() {
    var img = document.createElement('img');
    img.src = canvas.toDataURL();
    $('#greyscale').append(img);
  },
  process: function(e) {
    var img = e.target;
    this.drawImage(img);
    this.renderOriginal();
    this.convertToGreyscale();
    this.writeImage();
  }
};


$(preloader.run.bind(preloader));


