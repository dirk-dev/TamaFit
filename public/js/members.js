$(document).ready(function() {
  // figure out which user is logged in and display info
  var userId;

  function getUserData() {
    $.get("/api/user_data").then(function(data) {
      $(".member-name").text(data.firstName);
      $(".member-id").text(data.id);

      userId = data.id;

      console.log("userid " + userId);
      var path = "/api/users/" + userId;
      console.log("path" + path);

      $.get(path, function(data2) {
        $(".member-img").html("<img src= ' " + data2.imgUrl + "'>");
      });
    });
  }

  getUserData();
});
