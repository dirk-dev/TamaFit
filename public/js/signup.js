$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");
  var selectAvatar = $("img.tamagatchi");
  var imgUrlInput = ""

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password, imgUrl) {
    console.log("signUpUser-imgUrl: " + imgUrl)
    $.post("/api/signup", {
      email: email,
      password: password,
      imgUrl: imgUrl
    })
      .then(function(data) {
        window.location.replace(data);
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      imgUrl: imgUrlInput.val().trim()
    };

    if (!userData.email || !userData.password || !userData.imgUrl) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password, userData.imgUrl);
    emailInput.val("");
    passwordInput.val("");

  });

  selectAvatar.on("click", function(event) {
    var state = $(this).attr("data-clicked");
    console.log("state: " + state);
    if (state === "false") {
      imgUrl = $(this).attr("src")
      console.log("image" + imgUrl)
      var allImgTagsFalse = $(this).parent().children().attr("data-clicked", "false")
      allImgTagsFalse.removeClass("selected")
      console.log("this" + this)
      // grab all of the images in span and set data-clicked attr to false
      // then grab the one clicked and set to true
      $(this).attr("data-clicked", "true");
      $(this).addClass("selected")
    } else {
      $(this).attr("data-clicked", "false");
      $(this).removeClass("selected")
    }
  });
});
//  use imgurl in post route to assign to user profile