document.addEventListener("DOMContentLoaded", function() {

	// Custom JS

	//------------ menu hamburger -----------
  var wsize = 768;
  var windowWidth = $(window).width();
  
  $("#navToggle").click(function () {
    $(".navBurger-line").toggleClass("active");
    $(".sidebar , .menu").toggleClass("open");
    $("main").toggleClass("blur").css({"transition":".3s"});
    if (windowWidth < wsize) $("body").toggleClass("locked");
    else $("body").removeClass("locked");
  });
  $("main , .sidebar a").click(function () {
    $(".navBurger-line").removeClass("active");
    $(".sidebar , .menu").removeClass("open");
    $("main").removeClass("blur");
    $("body").removeClass("locked");
  });
  
  function close (){
    $(".navBurger-line").removeClass("active");
    $(".sidebar , .menu").removeClass("open");
    $("main").removeClass("blur");
    $("body").removeClass("locked");
  }
  close();
  
  // $(window).resize(function () {
  //   var windowWidth = $(window).width();
  //   if (windowWidth > wsize) close();
  // });
  
  //---------------------------------------------------------------
  var popup = $(".form-enter");
  $(".log-in").click (function () {
    $('.tab-content > div').siblings().hide();
    $(".login-modal, #login").fadeIn(150).show();
    $('.tab:nth-child(2)').addClass('active').siblings().removeClass('active');
    $('body').css('overflow', 'hidden');
    $('header, section, aside, footer').css({
      "filter": "blur(3px)"
    });
  });

  $(".register").click (function () {
    $('.tab-content > div').siblings().hide();
    $(".login-modal, #signup").fadeIn(150).show();
    $('.tab:nth-child(1)').addClass('active').siblings().removeClass('active');
    $('body').css('overflow', 'hidden');
    $('header, section, aside, footer').css({
      "filter": "blur(3px)"
    });
  });

  $(".login-modal").mouseup(function (e){
    if (!popup.is(e.target)
      && popup.has(e.target).length === 0) {
      $(".login-modal").hide().fadeOut(300);
      $('header, section, aside, footer').css({
        "filter": "blur(0)"
      });
    }
  });
  //---------------------------------------------------------------------------
  //------------ Accordion submenu -----------
  $(function() {
    var link = $(".accordion > .link");
    var drop = $(".dropdawn-submenu");
    var subLink = $(".submenu li");
    
    link.on("click",function(){
      $(link).removeClass("active");
      $(drop).removeClass("open");
      $(this).toggleClass("active");
    });
    
    drop.on("click",function(){
      $(link).removeClass("active");
      $(drop).removeClass("open");
      $(this).toggleClass("open");
    });
    
    subLink.on("click",function(){
      $(subLink).removeClass("active");
      $(this).addClass("active");
    });
  });
  //---------------------------------------------------------------------------
  //initialize swiper when document ready
  var mySwiper = new Swiper ('.demo-slider', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    spaceBetween: 30,
    // autoHeight: true, //enable auto height
    centeredSlides: true,
    speed: 1000,
    autoplay: {
      delay: 3000,
      // disableOnInteraction: true,
    },
  });
  
  // jQuery Sliding Line -----------------------------------------
  //var
  function f() {
    if ( $('section').hasClass('tabs-notes') ) {
      var $nav = $('.tabs__list'),
        $line = $('<li class="active-underline">').appendTo($nav),
        $activeLi,
        lineWidth,
        liPos;
    
      function refresh() {
        $activeLi = $nav.find('li.active');
        lineWidth = $activeLi.outerWidth();
        liPos = $activeLi.position().left;
      }
      refresh();
    
      $nav.css('position','relative');
    
      //line setup
      function lineSet() {
        $line.css({
          'position':'absolute',
          'bottom':'-3px',
          'height':'4px',
          'background-color':'#0ec92d',
          'border-radius': '4px',
        }).animate({
          'left':liPos,
          'width':lineWidth
        }, 300);
      }
      lineSet();
    
      //on click
      $nav.find('li').on('click', function() {
        $activeLi.removeClass('active');
        $(this).addClass('active');
        refresh();
        lineSet();
      });
    }
  }
  f();
  
  //---------------------------------------------------------------------
  // Fancybox ---------------------------------
  // $('.notes-list__item').on('click', function() {
  //   $.fancybox.open( $(this), {
  //     // infobar: false,
  //     zoom: false,
  //     closeExisting: false,
  //     type : 'inline',
  //     smallBtn: "false",
  //     toolbar: "auto",
  //     buttons : [
  //       'close'
  //     ],
  //   });
  // });
  //---------------------------------------------------------------------
  
  $('.form-enter').find('input, textarea').on('keyup blur focus', function (e) {
    
    var $this = $(this),
      label = $this.prev('label');
    
    if (e.type === 'keyup') {
      if ($this.val() === '') {
        label.removeClass('active highlight');
      } else {
        label.addClass('active highlight');
      }
    } else if (e.type === 'blur') {
      if( $this.val() === '' ) {
        label.removeClass('active highlight');
      } else {
        label.removeClass('highlight');
      }
    } else if (e.type === 'focus') {
      
      if( $this.val() === '' ) {
        label.removeClass('highlight');
      }
      else if( $this.val() !== '' ) {
        label.addClass('highlight');
      }
    }
    
  });
  
  $('.tab a').on('click', function (e) {
    
    e.preventDefault();
    
    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');
    
    target = $(this).attr('href');
    
    $('.tab-content > div').not(target).hide();
    
    $(target).fadeIn(600);
    
  });
  
  
  
  //--------------------------------------------------------------
});

//----------------------------------------------------------------------------
// ------- Тёмня и светлые темы -------------------------------------
document.addEventListener("DOMContentLoaded", function() {
  // Remove the no JS class so that the button will show
  document.documentElement.classList.remove('no-js');
  
  const STORAGE_KEY = 'user-color-scheme';
  const COLOR_MODE_KEY = '--color-mode';
  
  const modeToggleButton = document.querySelector('.js-mode-toggle');
  const modeToggleText = document.querySelector('.js-mode-toggle-text');
  const modeStatusElement = document.querySelector('.js-mode-status');
  
  /**
   * Pass in a custom prop key and this function will return its
   * computed value.
   * A reduced version of this: https://andy-bell.design/wrote/get-css-custom-property-value-with-javascript/
   */
  const getCSSCustomProp = (propKey) => {
    let response = getComputedStyle(document.documentElement).getPropertyValue(propKey);
    
    // Tidy up the string if there’s something to work with
    if (response.length) {
      response = response.replace(/\'|"/g, '').trim();
    }
    
    // Return the string response by default
    return response;
  };
  
  /**
   * Takes either a passed settings ('light'|'dark') or grabs that from localStorage.
   * If it can’t find the setting in either, it tries to load the CSS color mode,
   * controlled by the media query
   */
  const applySetting = passedSetting => {
    let currentSetting = passedSetting || localStorage.getItem(STORAGE_KEY);
    
    if(currentSetting) {
      document.documentElement.setAttribute('data-user-color-scheme', currentSetting);
      // setButtonLabelAndStatus(currentSetting);
    }
    else {
      // setButtonLabelAndStatus(getCSSCustomProp(COLOR_MODE_KEY));
    }
  };
  
  /**
   * Get’s the current setting > reverses it > stores it
   */
  const toggleSetting = () => {
    let currentSetting = localStorage.getItem(STORAGE_KEY);
    
    switch(currentSetting) {
      case null:
        currentSetting = getCSSCustomProp(COLOR_MODE_KEY) === 'dark' ? 'light' : 'dark';
        break;
      case 'light':
        currentSetting = 'dark';
        break;
      case 'dark':
        currentSetting = 'light';
        break;
    }
    
    
    localStorage.setItem(STORAGE_KEY, currentSetting);
    
    return currentSetting;
  };
  
  /**
   * A shared method for setting the button text label and visually hidden status element
   */
  // const setButtonLabelAndStatus = currentSetting => {
  //   modeToggleText.innerText = `Enable ${currentSetting === 'dark' ? 'light' : 'dark'} mode`;
  //   modeStatusElement.innerText = `Color mode is now "${currentSetting}"`;
  // };
  
  /**
   * Clicking the button runs the apply setting method which grabs its parameter
   * from the toggle setting method.
   */
  modeToggleButton.addEventListener('click', evt => {
    evt.preventDefault();
    
    applySetting(toggleSetting());
  });
  
  applySetting();
});




