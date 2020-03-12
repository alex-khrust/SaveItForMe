document.addEventListener("DOMContentLoaded", function() {

	// Custom JS

	//------------ menu hamburger -----------
  $("#navToggle").click(function () {
    $(".navBurger-line").toggleClass("active");
    // $(".top-nav").toggleClass("open");
    $("body").toggleClass("locked");
    // $("main").css("filter","blur(5px)")
  });
  $(".top-nav").click(function () {
    $(this).removeClass("active");
    $(".navBurger-line").removeClass("active");
    $(".top-nav").removeClass("open");
    $("body").removeClass("locked");
    // $("main").css("filter","unset")
  });
//---------------------------------------------------------------------------

});
