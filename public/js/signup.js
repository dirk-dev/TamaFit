$(document).ready(function() {
  var signUpForm = $("form.signup");
  var selectAvatar = $("img.tamagotchi");
  var firstNameInput = $("input#first-name-input");
  var lastNameInput = $("input#last-name-input");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");
  var imgUrl = "";

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
    // document.getElementById("error").innerHTML =
    //   "<div class='alert alert-danger'role='alert'>Sorry. Please try again.</div>";
  }

  // function isIdUnique() {
  //   const isIdUnique = id =>
  // db.User.findOne({ where: { id} })
  //   .then(token => token !== null)
  //   .then(isUnique => isUnique);
  // }

  // redirect to member page on successful sign up
  function signUpUser(firstName, lastName, email, password, imgUrl) {
    $.post("/api/signup", {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      imgUrl: imgUrl
    })
      .then(function(data) {
        document.getElementById("error").innerHTML = "";
        window.location.replace(data);
      })
      .catch(handleLoginErr);
  }

  // when signup form is submitted
  signUpForm.on("submit", function(event) {
    event.preventDefault();

    var imgQuerySelector = document.querySelector(".selected").src;
    var userData = {
      firstName: firstNameInput.val().trim(),
      lastName: lastNameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      imgUrl: imgQuerySelector
    };

    if (
      !userData.firstName ||
      !userData.lastName ||
      !userData.email ||
      !userData.password ||
      !userData.imgUrl
    ) {
      return;
    }

    signUpUser(
      userData.firstName,
      userData.lastName,
      userData.email,
      userData.password,
      userData.imgUrl
    );

    firstNameInput.val("");
    lastNameInput.val("");
    emailInput.val("");
    passwordInput.val("");
  });

  // avatar selector
  selectAvatar.on("click", function(event) {
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
