$(document).ready(function() {
  var changeAvatarForm = $("form.changeAvatar");
  var selectAvatar = $("img.tamagotchi");
  var currentAvatar = $(".current-avatar");
  var imgUrl = "";
  var userId;

  // function to update avatar
  function updateAvatar(avatar) {
    $.ajax({
      method: "PUT",
      url: "/api/avatar",
      data: avatar
    }).then(function() {
      window.location.href = "/account";
    });
  }

  // on submit, send new imgUrl to update avatar
  changeAvatarForm.on("submit", function(event) {
    event.preventDefault();

    var imgQuerySelector = document.querySelector(".selected").src;
    currentAvatar = imgQuerySelector;

    var newAvatar = {
      imgUrl: imgQuerySelector
    };

    newAvatar.id = userId;
    updateAvatar(newAvatar);
  });

  // avatar selector
  selectAvatar.on("click", function(event) {
    event.preventDefault();
    var state = $(this).attr("data-clicked");
    // console.log("state: " + state);

    if (state === "false") {
      imgUrl = $(this).attr("src");
      console.log("image" + imgUrl);

      var allImgTagsFalse = $(this)
        .parent()
        .children()
        .attr("data-clicked", "false");

      allImgTagsFalse.removeClass("selected");

      $(this).attr("data-clicked", "true");
      $(this).addClass("selected");
    } else {
      $(this).attr("data-clicked", "false");
      $(this).removeClass("selected");
    }
  });

  // get current avatar
  $.get("/api/user_data").then(function(data) {
    userId = data.id;

    console.log("userid " + userId);
    var path = "/api/users/" + userId;
    console.log("path" + path);

    $.get(path, function(data2) {
      var img = $("<img id='avatar'>");
      img.attr("src", data2.imgUrl);
      img.attr("width", "50");
      img.appendTo(currentAvatar);
    });
  });
});
