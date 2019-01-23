$(document).ready(function () {
  // Getting references to our form and input
  var changeAvatarForm = $("form.changeAvatar");
  var selectAvatar = $("img.tamagotchi");
  var imgUrl = "";
  var UserId;

  $.get("/api/user_data").then(function (data) {
    UserId = data.id;
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

    var newAvatar = {
      imgUrl: imgQuerySelector
    };

    newAvatar.id = UserId;
    updateAvatar(newAvatar);
  });

  // changeAvatarForm.on("submit", function (event) {
  //   event.preventDefault();
  //   var imgQuerySelector = document.querySelector(".selected").src;

  //   User.find({
  //     where: {
  //       UserId: UserId
  //     }
  //   }).on("success", function (user) {
  //     // Check if record exists in db
  //     if (user) {
  //       user
  //         .update({
  //           imgUrl: imgQuerySelector
  //         })
  //         .success(function () {});
  //     }
  //   });
  // });

  // User.update({
  //   title: 'foooo',
  //   description: 'baaaaaar'
  // }, {
  //   fields: ['title']
  // }).then(() => {
  //   // title will now be 'foooo' but description is the very same as before
  // })

  // router.put(‘/book/: bookId’, function (req, res, next) {
  //   Book.update({
  //       title: req.body.title
  //     }, {
  //       returning: true,
  //       where: {
  //         id: req.params.bookId
  //       }
  //     })
  //     .then(function ([rowsUpdate, [updatedBook]]) {
  //       res.json(updatedBook)
  //     })
  //     .catch(next)
  // })

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
//  use imgurl in post route to assign to user profile