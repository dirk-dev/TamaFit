$(document).ready(function() {
  var loginForm = $("form.login");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");

  // when login form is submitted
  loginForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }

    loginUser(userData.email, userData.password);

    emailInput.val("");
    passwordInput.val("");
  });

  // redirect to member page on login
  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    })
      .then(function(data) {
        document.getElementById("error").innerHTML = "";

        window.location.replace(data);
      })
      .catch(function(err) {
        console.log(err);

        document.getElementById("error").innerHTML =
          "<div class='alert alert-danger'role='alert'>Sorry. Please try again.</div>";
      });
  }
});
