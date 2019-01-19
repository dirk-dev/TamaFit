/* this will change the exercise selection dropdown text 
to the selected exercise */
$(".dropdown-menu").on("click", "a", function() {
  var text = $(this).html();
  var htmlText = text + "<span class='exercise-dropdown'></span>";
  $(this)
    .closest(".dropdown")
    .find(".dropdown-toggle")
    .html(htmlText);
});
