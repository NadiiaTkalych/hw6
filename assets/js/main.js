(function ($)
  { "use strict"
  
/* 1. Preloder (готовый код, можно использовать в любом проекте) */
    $(window).on('load', function () {
      $('#preloader-active').delay(450).fadeOut('slow');
      $('body').delay(450).css({
        'overflow': 'visible'
      });
    });

/* 2. Sticky And Scroll UP */
    $(window).on('scroll', function () {
      var scroll = $(window).scrollTop();
      if (scroll < 400) {
        $(".header-sticky").removeClass("sticky-bar");
        $('#back-top').fadeOut(500);
      } else {
        $(".header-sticky").addClass("sticky-bar");
        $('#back-top').fadeIn(500);
      }
    });

  // Scroll Up
    $('#back-top a').on("click", function () {
      $('body,html').animate({
        scrollTop: 0
      }, 800);
      return false;
    });
  

})(jQuery);

// MODAL
$('.header-btn').on('click',function () {
  $('.modal-wrapper').fadeIn();
})

$('.modal-close-btn').on('click',function () {
  $('.modal-wrapper').fadeOut();
});

$('.modal-overlay').on('click',function () {
  $('.modal-wrapper').fadeOut();
});


// MOBILE MENU
$('.mobile_menu').on('click', function () {
  $('.main-menu').toggle();
  // console.log(this);
})

$('.menu-close').on('click', function () {
  $('.main-menu').hide();
  console.log(this);
})


// $('.slicknav_btn').on('click',function () {
//   $('.modal-wrapper').fadeIn();
// })

// $('.menu-close').on('click',function () {
//   $('.modal-wrapper').fadeOut();
// });


// SLIDER
const swiper = new Swiper('.swiper-container', {
  spaceBetween : 50,
  // loop: true,
  autoplay : {
  delay: 4000
  }
});


// PARALLAX
const scene = $('#scene').get(0);
const parallaxInstance = new Parallax(scene);


// TABS


// VALIDATE
$.validator.addMethod('regex',function (value, element, regexp) {
  let regExp = new RegExp(regexp);
  return regExp.test(value);
}, 'Please check your information');

$(".form-book").validate({
  rules : {
    fullName : {
      required : true,
      regex : "[A-Za-z]{1,32}"
    },
    email : {
      required : true,
      regex: "[0-9A-Za-z]+"
    },
    phone : {
      required : true,
      digits : true,
      minlength: 10,
      maxlength: 13,
      regex: "[0-9]+"
    }
  },
  messages : {
    fullName : {
      required : 'Fild is required',
      regexp : 'Enter yor name correctly'
    },
    email : {
      required : 'Fild is required',
      regexp : 'Enter yor email correctly'
    },
    phone : {
      required : 'Fild is required',
      regexp : 'Enter yor phone number correctly'
    }
  }
 });
 
