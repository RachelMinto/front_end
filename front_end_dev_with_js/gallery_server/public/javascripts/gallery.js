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

  $('section > header').on("click", '.actions a', function(e) {
    e.preventDefault();
    var $e = $(e.target);

    $.ajax({
      url: $e.attr("href"),
      type: "post",
      data: "photo_id=" + $e.data('id'),
      success: function(json) {
        $e.text(function(i, txt) {
          return txt.replace(/\d+/, json.total);
        })
      }
    });
  });

  $('form').on("submit", function(e) {
    e.preventDefault();
    var $f = $(this);

    $.ajax({
      url: $f.attr("action"),
      type: $f.attr("method"),
      data: $f.serialize(),
      success: function(json) {
        $('#comments ul').append(templates.comment(json));
      }
    });
    $f.trigger('reset');
  });

  var slideshow = {
    $el: $("#slideshow"),
    duration: 500,
    prevSlide: function(e) {
      e.preventDefault();
      var $current = this.$el.find("figure:visible");
      var $prev = $current.prev("figure");

      if (!$prev.length) {
        $prev = this.$el.find("figure").last();
      }
      $current.fadeOut(this.duration);
      $prev.fadeIn(this.duration);
      this.renderPhotoContent(+$prev.data('id'));
    },
    nextSlide: function(e) {
      e.preventDefault();
      var $current = this.$el.find("figure:visible");
      var $next = $current.next("figure");

      if (!$next.length) {
        $next = this.$el.find("figure").first();
      }

      $current.fadeOut(this.duration);
      $next.fadeIn(this.duration);
      this.renderPhotoContent(+$next.data('id'));
    },
    incrementLikes: function(e) {
      e.preventDefault();
      console.log('i lurv it!');
    },
    renderPhotoContent: function(idx) {
      $("[name=photo_id]").val(idx);
      renderPhotoInformation(idx);
      getCommentsFor(idx);
    },
    bind: function() {
      this.$el.find("a.prev").on("click", this.prevSlide.bind(this));
      this.$el.find("a.next").on("click", this.nextSlide.bind(this));
    },

    init: function() {
      this.bind();
    }
  };

  $.ajax({
    url: "/photos",
    success: function(json) {
      photos = json;
      renderPhoto();
      renderPhotoInformation(photos[0].id);
      slideshow.init();
      getCommentsFor(photos[0].id);
    }
  });

  function renderPhoto() {
    $('#slides').html(templates.photos({ photos: photos }));
  };

  function renderPhotoInformation(idx) {
    var photo = photos.filter(function(item) {
      return item.id === idx;
    })[0];
    $('section > header').html(templates.photo_information(photo));
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
});
