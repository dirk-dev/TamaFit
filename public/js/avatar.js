$(document).ready(function () {
  // Getting references to our form and input
  var changeAvatarForm = $("form.changeAvatar");
  var selectAvatar = $("img.tamagotchi");
  var currentAvatar = $(".current-avatar");
  var imgUrl = "";
  var UserId;

  $.get("/api/user_data").then(function (data) {
    UserId = data.id;
    // currentAvatar.img(src, data.imgUrl);
    var img = $("<img id='avatar'>");
    img.attr("src", data.imgUrl);
    img.attr("width", "50");
    img.appendTo(currentAvatar);
  });

  // function to update avatar
  function updateAvatar(avatar) {
    $.ajax({
      method: "PUT",
      url: "/api/avatar",
      data: avatar
    }).then(function () {
      window.location.href = "/account";
    });
  }

  // on submit, send new imgUrl to update avatar
  changeAvatarForm.on("submit", function (event) {
    event.preventDefault();
    var imgQuerySelector = document.querySelector(".selected").src;
    console.log(imgQuerySelector);
    // currentAvatar = imgQuerySelector;

    var newAvatar = {
      imgUrl: imgQuerySelector
    };

    newAvatar.id = UserId;
    updateAvatar(newAvatar);
  });

  selectAvatar.on("click", function (event) {
    event.preventDefault();
    var state = $(this).attr("data-clicked");
    console.log("state: " + state);

    if (state === "false") {
      imgUrl = $(this).attr("src");
      console.log("image" + imgUrl);

      var allImgTagsFalse = $(this)
        .parent()
        .children()
        .attr("data-clicked", "false");

      allImgTagsFalse.removeClass("selected");
      console.log("this" + this);

      // grab all of the images in span and set data-clicked attr to false
      // then grab the one clicked and set to true
      $(this).attr("data-clicked", "true");
      $(this).addClass("selected");
    } else {
      $(this).attr("data-clicked", "false");
      $(this).removeClass("selected");
    }
  });
});
