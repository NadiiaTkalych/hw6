(function ($) { 
  "use strict"
  
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
});

$('.modal-overlay').on('click',function () {
  $('.modal-wrapper').fadeOut();
});


// MOBILE MENU
$('.mobile_menu').on('click', function () {
  $('.mobile__nav').toggle();
});

$('.menu-close').on('click', function () {
  $('.mobile__nav').hide();
});


// SLIDER
const swiper = new Swiper('.swiper-container', {
  spaceBetween : 50,
  loop: true,
  slidesPerView: 1,
  autoplay : {
  delay: 4000
  }
});


// PARALLAX
var scene = document.getElementById('scene');
var parallaxInstance = new Parallax(scene);


// TABS
$('.nav-link').on('click', function () {
  console.log(this);
  let currTab = $(this).index();

  $('.nav-link').removeClass('active');
  $(this).addClass('active')

  $('.tab-pane').removeClass('show active');
  $('.tab-pane').eq(currTab).addClass('show active');
});

$("#nav-tab").click(function() {
  $('html, body').animate({
      scrollTop: $("#nav-tabContent").offset().top
  }, 1000);
});

// VALIDATE
$(".book-btn").on('click', function(event) {
  event.preventDefault(); // prevents data send to server by browser (we use jQuery instead)

  $(this).parent('form').submit(); // send data: jquery -> check data -> send data if it's ok
});

$.validator.addMethod(
  'regex', 
  function (value, element, regexp) {
    const regExp = new RegExp(regexp);
    return regExp.test(value);
  }, 
  'Please check your information'
);

function validateForm(el) {
  const sendDataToServer = function (formArg, event) {
    $('#preloader-active').fadeIn();

    const form = $(formArg);
    const formId = $(formArg).attr('id');
    const formData = form.serialize();

    console.log('==> data for sending', formData);

    switch(formId) {
      case "form-modal" :
        // send data
        $.ajax({
          type : 'POST',
          url : form.attr('action'),
          data : form.serialize()
        })
        // wait for result of sending
        .done(function() {
          console.log('Success');
        })
        // result is negative
        .fail(function() {
          console.log('Fail');
        })
        // result is positive
        .always(function() {
          setTimeout(function() {
            form.trigger('reset'); // clear form
            $('wrapper-modal').fadeOut(); // hide form
          }, 1000);
          setTimeout(function() {
            $('#preloader-active').fadeOut(); // hide preloader
          }, 1400)
        });
        break;

      case 'form-page':
        $.ajax({
          type : 'POST',
          url : form.attr('action'),
          data : form.serialize()
        })
        .done(function() {
          console.log('sending success');
        })
        .fail(function() {
          console.log('sending fail');
        })
        .always(function() {
          setTimeout(function() {
            form.trigger('reset');
          }, 1000);
          setTimeout(function() {
            $('#preloader-active').fadeOut();
          }, 1400)
        });
        break;
    }

    return false;
  }
  
  const validateSettings = {
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
    },
    submitHandler : sendDataToServer,
  };

  el.validate(validateSettings);
};

$('.form-with-validation') // find all froms with this class
  .each(function() {
    validateForm($(this));
  });
