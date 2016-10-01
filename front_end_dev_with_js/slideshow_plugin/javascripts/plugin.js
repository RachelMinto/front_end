(function($) {
  var slideshow = {
    slide: "figure",
    speed: 500,
    namespace: ".slideshow",
    activeClass: "active",
    switchSlides: function(e) {
      e.preventDefault();
      var $li = $(e.currentTarget).closest("li"),
          idx = $li.index();

      this.$el.find(this.slide).stop().filter(":visible").fadeOut(this.speed);
      this.$el.find(this.slide).eq(idx).fadeIn(this.speed);
      this.$nav.find("." + this.activeClass).removeClass(this.activeClass);
      $li.addClass("." + this.activeClass);
    },
    destroy: function() {
      this.$nav.off(this.namespace);
    },
    bind: function() {
      this.$nav.on("click" + this.namespace, "a", $.proxy(this.switchSlides, this));
      },
    init: function() {
      this.bind();
    }
  };

    $.fn.slideshow = function(options) {
      var instance = this.data("plugin" + slideshow.namespace);

      if ($.isPlainObject(options)) {
        instance && instance.destroy();

        instance = $.extend({
          $el: this
        }, slideshow, options);

        instance.init();
        this.data("plugin" + slideshow.namespace, instance);
      } else if (typeof options === "string") {
        instance[options] && instance[options]();
      }

    }
}(jQuery));







