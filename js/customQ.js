$(".owl-carousel-B").owlCarousel({
  loop: true,
  margin: 10,
  autoplay: true,
  nav: false,
  dots: true,
  responsiveClass: true,
  responsive: {
    0: {
      items: 2,
      dots: false,
    },
    575: {
      items: 4,
      dots: false,
    },
    767: {
      items: 4,
    },
    1000: {
      items: 5,
    },
  },
});
$(".owl-carousel-C").owlCarousel({
  loop: true,
  margin: 10,
  autoplay: true,
  nav: false,
  dots: true,
  responsiveClass: true,
  responsive: {
    0: {
      items: 1,
      dots: false,
    },
    575: {
      items: 2,
    },
    767: {
      items: 2,
    },
    1000: {
      items: 4,
    },
  },
});
$(".owl-carousel-C").owlCarousel({
  loop: true,
  margin: 10,
  autoplay: true,
  nav: false,
  dots: false,
  responsiveClass: true,
  responsive: {
    0: {
      items: 1,
    },
    300: {
      items: 2,
    },
    500: {
      items: 3,
    },
    767: {
      items: 4,
    },
    1000: {
      items: 5,
    },
    1200: {
      items: 6,
    },
  },
});
$(".owl-carousel-D").owlCarousel({
  loop: true,
  margin: 10,
  autoplay: false,
  nav: true,
  dots: true,
  responsiveClass: true,
  responsive: {
    0: {
      items: 1,
    },
  },
});
$(".owl-carousel-E").owlCarousel({
  loop: true,
  margin: 10,
  autoplay: true,
  nav: true,
  dots: false,
  responsiveClass: true,
  responsive: {
    0: {
      items: 1,
    },
  },
});

$.fn.jQuerySimpleCounter = function (options) {
  var settings = $.extend(
    {
      start: 0,
      end: 10,
      easing: "swing",
      duration: 600,
      complete: "",
    },
    options
  );

  var thisElement = $(this);

  $({ count: settings.start }).animate(
    { count: settings.end },
    {
      duration: settings.duration,
      easing: settings.easing,
      step: function () {
        var mathCount = Math.ceil(this.count);
        if (mathCount >= 889900) {
          mathCount = 890000;
        }
        thisElement.text(mathCount);
      },
      complete: settings.complete,
    }
  );
};

$("#number1").jQuerySimpleCounter({ end: 18, duration: 3000 });
$("#number2").jQuerySimpleCounter({ end: 200, duration: 4000 });
$("#number3").jQuerySimpleCounter({ end: 100, duration: 2500 });
$("#number4").jQuerySimpleCounter({ end: 890000, duration: 4000 });

/* AUTHOR LINK */
$(".about-me-img").hover(
  function () {
    $(".authorWindowWrapper").stop().fadeIn("fast").find("p").addClass("trans");
  },
  function () {
    $(".authorWindowWrapper")
      .stop()
      .fadeOut("fast")
      .find("p")
      .removeClass("trans");
  }
);

var sections = $("section"),
  nav = $("nav"),
  nav_height = nav.outerHeight();

$(window).on("scroll", function () {
  var cur_pos = $(this).scrollTop();

  sections.each(function () {
    var top = $(this).offset().top - nav_height,
      bottom = top + $(this).outerHeight();

    if (cur_pos >= top && cur_pos <= bottom) {
      nav.find("a").removeClass("active");
      sections.removeClass("active");

      $(this).addClass("active");
      nav.find('a[href="#' + $(this).attr("id") + '"]').addClass("active");
    }
  });
});

nav.find("a").on("click", function () {
  var $el = $(this),
    id = $el.attr("href");

  $("html, body").animate(
    {
      scrollTop: $(id).offset().top - nav_height,
    },
    500
  );

  return false;
});
