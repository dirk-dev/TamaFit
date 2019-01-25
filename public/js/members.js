$(document).ready(function() {
  // figure out which user is logged in and display info

  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.firstName);
    $(".member-id").text(data.id);
    var UserId = data.id;
    $.get("/api/users", function(data2) {
      $(".member-img").html("<img src= ' " + data2[UserId - 1].imgUrl + "'>");
    });
  });
});
