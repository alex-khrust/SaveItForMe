document.addEventListener("DOMContentLoaded", function() {

	// Custom JS

	//------------ menu hamburger -----------
  var wsize = 768;
  var windowWidth = $(window).width();
  
  $("#navToggle").click(function () {
    $(".navBurger-line").toggleClass("active");
    $(".sidebar").toggleClass("open");
    $("main").toggleClass("blur").css({"transition":".3s"});
    if (windowWidth < wsize) $("body").toggleClass("locked");
    else $("body").removeClass("locked");
  });
  $("main , .sidebar a").click(function () {
    $(".navBurger-line").removeClass("active");
    $(".sidebar").removeClass("open");
    $("main").removeClass("blur").css({"transition":".3s"});
    $("body").removeClass("locked");
  });
  
  $(window).resize(function () {
    if (windowWidth < wsize) $("body.locked");
    else $("body").removeClass("locked");
  });
  
  //---------------------------------------------------------------------------
  //------------ Accordion submenu -----------
  $(function() {
    var link = $(".accordion > .link");
    var drop = $(".accordion > .dropdawn-submenu");
    var subLink = $(".accordion > .dropdawn-submenu > a");
    
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
      setButtonLabelAndStatus(currentSetting);
    }
    else {
      setButtonLabelAndStatus(getCSSCustomProp(COLOR_MODE_KEY));
    }
  }
  
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
  }
  
  /**
   * A shared method for setting the button text label and visually hidden status element
   */
  const setButtonLabelAndStatus = currentSetting => {
    modeToggleText.innerText = `Enable ${currentSetting === 'dark' ? 'light' : 'dark'} mode`;
    modeStatusElement.innerText = `Color mode is now "${currentSetting}"`;
  }
  
  /**
   * Clicking the button runs the apply setting method which grabs its parameter
   * from the toggle setting method.
   */
  modeToggleButton.addEventListener('click', evt => {
    evt.preventDefault();
    
    applySetting(toggleSetting());
  });
  
  applySetting();
  //---------------------------------------------------------------------------
  // Переключение между табами, добавление класса active и скрытие контента ----------
  // $(".tab_content").hide();
  // $(".tab_content:first").show();
  // /* в режиме вкладок */
  // $(".tabs__list a").click(function () {
  //   $(".tab_content").hide();
  //   var activeTab = $(this).attr("rel");
  //   $("#" + activeTab).fadeIn();
  //   $(".tabs__list a").removeClass("active");
  //   $(this).addClass("active");
  // });
  
  $(".tabs__list a").on("click", function(){
    //Tab styles
    $(".tabs__list a").removeClass("active");
    $(this).addClass("active");
    //Div show and hide
    var activeTab = $(this).find("a").attr("href");
    $(".tab-content").removeClass("active");
    $(activeTab).addClass("active");
  })
  //---------------------------------------------------------------------
});
