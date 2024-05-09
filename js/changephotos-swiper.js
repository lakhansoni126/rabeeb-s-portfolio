jQuery(function ($) {
  var swiper = new Swiper(".swiper-container", {
    //						pagination: '.swiper-pagination',
    //						paginationClickable: true,
    direction: "vertical",

    nextButton: "#pv-next",
    prevButton: "#pv-prev",

    keyboardControl: true,

    preloadImages: false,
    lazyLoading: true,

    lazyLoadingInPrevNext: true,
    lazyLoadingInPrevNextAmount: 5,

    slidesPerView: 3,
    //slidesPerView: "auto",
    slidesPerGroup: 3,

    spaceBetween: 10,

    mousewheelControl: true,

    //enable hash navigation
    //						hashnav: true,

    //slideToClickedSlide: true
  });

  var thumbs = $("#pv-photos li");
  var firstTime = true;

  $("#pv-photos a").on("click", function (e) {
    e.preventDefault();

    console.log("click");

    thumbs.removeClass("thumb-selected");
    $(this).closest("li").addClass("thumb-selected");

    swiper.slideTo($(this).closest("li").index());

    console.log("index: " + $(this).closest("li").index());
  });

  //bind thumb click listeners
  thumbs.each(function (i) {
    var no = i;
    $(this).on("click", function () {
      selectImage(no);
      return false;
    });
  });

  //bind arrow keys listener
  $(document).keyup(function (e) {
    //right
    if (e.keyCode == 39) {
      //console.log('right');
      //no = (current == (totalImages - 1)) ? 0 : ++current;
      //selectImage(no);

      $("#pv-photos .thumb-selected").next().find("a").trigger("click");

      return false;
    }
    //left
    if (e.keyCode == 37) {
      //console.log('left');
      //no = (current == 0) ? (totalImages - 1) : --current;
      //selectImage(no);

      $("#pv-photos .thumb-selected").prev().find("a").trigger("click");

      return false;
    }
  });

  //select image
  var selectImage = function (no) {
    thumbs.removeClass("thumb-selected");
    $(thumbs[no]).addClass("thumb-selected");
    current = no;

    // set image caption
    //if(album_imgs[no]['content'] != null) {
    //    $(".photoview-text p").html(album_imgs[no]['content']);
    //}
    if (album_imgs[no]["content"] != null) {
      $(".photoview-text").html(album_imgs[no]["content"]);
    }

    // set image/video src
    if (album_imgs[no]["img_src"] != null) {
      $(".photoview-main-photo img").attr("src", album_imgs[no]["img_src"]);
      //console.log('img_src set');
    } else if (album_imgs[no]["video_src"] != null) {
      flashMovie = $(".photoview-main-photo").html(
        '<iframe width="590" height="365" src="http://www.youtube.com/embed/' +
          youtube_parser(album_imgs[no]["video_src"]) +
          '" frameborder="0" allowfullscreen></iframe>'
      );
      //console.log('video_src set');
    }

    //set title
    if (album_imgs[no]["title"] != null) {
      $("h3.pv-title").html(album_imgs[no]["title"]);
    } else {
      console.log("title - missing");
      $("h3.pv-title").html("Title is missing, dude!");
    }

    //set tags
    if (album_imgs[no]["topic"] != null) {
      $(".pv-tag").html(album_imgs[no]["topic"]).show();
    } else {
      console.log("topic - missing");
      $(".pv-tag").hide();
    }

    //set date
    if (album_imgs[no]["date"] != null) {
      $(".pv-date").html(album_imgs[no]["date"]).show();
    } else {
      console.log("date - missing");
      $(".pv-date").hide();
    }

    //set location
    if (album_imgs[no]["location"] != null) {
      $(".pv-loc").html(album_imgs[no]["location"]).show();
    } else {
      console.log("location - missing");
      $(".pv-loc").hide();
    }

    //set author
    if (album_imgs[no]["author"] != null) {
      $(".pv-autor").html(album_imgs[no]["author"]).show();
    } else {
      console.log("author - missing");
      $(".pv-autor").hide();
    }

    //set hq_photo
    if (album_imgs[no]["hq_photo"] != null) {
      $(".pv-hq a").attr("href", album_imgs[no]["hq_photo"]);
      $(".pv-hq").show();
    } else {
      console.log("hq_photo - missing");
      $(".pv-hq").hide();
    }

    //set social buttons & comments
    var media_page_url = "";
    if (album_imgs[no]["img_page_url"] != null) {
      media_page_url = album_imgs[no]["img_page_url"];
    } else if (album_imgs[no]["video_page_url"] != null) {
      media_page_url = album_imgs[no]["video_page_url"];
    }

    /*

         //facebook like
         var buttons = '<div><div class="fb-like" data-href="'+ media_page_url +'" data-send="false" data-layout="box_count" data-width="50" data-show-faces="true"></div></div>';
         //twitter share
         buttons += '<div><a href="https://twitter.com/share" class="twitter-share-button" data-url="'+ media_page_url +'" data-count="vertical">Tweet</a></div>';
         //pinterest
         if(album_imgs[no]['img_src'] != null) {
         // buttons += '<div style="padding-top: 4px;"><a href="http://pinterest.com/pin/create/button/?url='+ encodeURIComponent(album_imgs[no]['img_page_url']) +'&media='+ encodeURIComponent(album_imgs[no]['img_src']) +'&description='+ encodeURIComponent(album_imgs[no]['title']) +'" class="pin-it-button" count-layout="vertical">Pin It</a></div>';
         buttons += '<div style="padding-top: 37px;"><a href="http://pinterest.com/pin/create/button/?url='+ encodeURIComponent(album_imgs[no]['img_page_url']) +'&media='+ encodeURIComponent(album_imgs[no]['img_src']) +'&description='+ encodeURIComponent(album_imgs[no]['title']) +'" data-pin-do="buttonPin" data-pin-config="above" data-pin-height="28"></a></div>';
         $.getScript('http://assets.pinterest.com/js/pinit.js');
         }
         */

    // Social buttons
    $(".social-buttons").data("url", media_page_url);

    //console.log( media_page_url );

    if (album_imgs[no]["title"] != null) {
      $(".social-buttons").data("title", album_imgs[no]["title"]);

      //console.log( album_imgs[no]['title'] );
    }

    if (album_imgs[no]["content"] != null) {
      $(".social-buttons").data("desc", album_imgs[no]["content"]);

      //console.log( album_imgs[no]['content'] );
    }

    if (album_imgs[no]["img_src"] != null) {
      $(".social-buttons").data("image", album_imgs[no]["img_src"]);

      //console.log( album_imgs[no]['img_src'] );
    }

    //facebook comments
    var comments =
      '<div class="fb-comments" data-href="' +
      media_page_url +
      '" data-num-posts="6" data-width="635" data-colorscheme="dark"></div>';

    //$('.photo-social').empty().append(buttons);
    $("#tab-fb").empty().append(comments);

    if (!firstTime) {
      FB.XFBML.parse();
      //twttr.widgets.load();
      //$.getScript('http://assets.pinterest.com/js/pinit.js');
    } else {
      firstTime = false;
      //							$(counter[1]).empty().append(totalImages);
    }

    cnt = current + 1;
    //						$(counter[0]).empty().append((cnt));
    positionToThumb(no);

    //set hash
    window.location.hash = encodeURIComponent(cnt);
    setFavicon();
    console.log("favicon set");

    //get thumbs
    //						if (totalImages > 20) {
    //							//current
    //							$('#pv-photos li:nth-child('+ (no+1) +') a').uncomment(false);
    //							//next X
    //							var indup = no+2;
    //							//console.log('NEXT');
    //							for (i=(indup); i<(indup+tinc); i++) {
    //								if(i>totalImages) {
    //									$('#pv-photos li:nth-child('+ (i-totalImages) +') a').uncomment(false);
    //									//console.log(i-totalImages);
    //								} else {
    //									$('#pv-photos li:nth-child('+ i +') a').uncomment(false);
    //									//console.log(i);
    //								}
    //							}
    //							//previous X
    //							//console.log('PREV');
    //							var inddown = no;
    //							for (i=(inddown); i>(inddown-tinc); i--) {
    //								if(i<=0) {
    //									$('#pv-photos li:nth-child('+ (totalImages+i) +') a').uncomment(false);
    //									//console.log(totalImages+i);
    //								} else {
    //									$('#pv-photos li:nth-child('+ i +') a').uncomment(false);
    //									//console.log(i);
    //								}
    //							}
    //						} else {
    //							$('#pv-photos li a').uncomment(false);
    //						}
  };

  //set thumb position
  var positionToThumb = function (no) {
    currentThumb = no;

    //e.preventDefault();
    //$(".menu .active").removeClass('active');
    //$(this).addClass('active');
    //swiper.slideTo( $('.pag2').index(),1000,false );

    //						$('#pv-photos').animate({
    //							//'left': -(oneThumbWidth * no) + 'px'
    //							'top': -(oneThumbHeight * no) + 'px'
    //
    //						});
  };

  //hash check
  if (window.location.hash) {
    var phash = parseInt(decodeURIComponent(window.location.hash.substr(1)));
    //selectImage(phash - 1);
    var reloc = "";
    if (album_imgs[phash - 1]["img_page_url"] != null) {
      reloc = album_imgs[phash - 1]["img_page_url"];
    } else if (album_imgs[phash - 1]["video_page_url"] != null) {
      reloc = album_imgs[phash - 1]["video_page_url"];
    }
    //console.log(reloc);
    window.location = reloc;
  } else {
    var listItem = $(".thumb-selected");
    // set focus on selected image on page load
    // $('#pv-photos').css('left', $('.thumb-selected').position().left*(-1));
    selectImage($("#pv-photos li").index(listItem));
    //console.log('photo selection done by JS on page load');

    //new
    swiper.slideTo($("#pv-photos li").index(listItem), 1000, false);
  }

  function setFavicon() {
    if ($.browser.msie != true) {
      var link = $('link[type="image/x-icon"]').remove().attr("href");
      $(
        '<link href="' + link + '" rel="shortcut icon" type="image/x-icon" />'
      ).appendTo("head");
    }
  }
});
