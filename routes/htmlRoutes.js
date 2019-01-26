// var db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", function(req, res) {
    // If the user is already logged in, send them to the members page
    if (req.user) {
      res.redirect("/members");
    } else {
      res.render("index");
    }
  });

  app.get("/login", function(req, res) {
    if (req.user) {
      res.redirect("/members");
    } else {
      res.render("login_page");
    }
  });

  app.get("/signup", function(req, res) {
    if (req.user) {
      res.redirect("/members");
    } else {
      res.render("signup");
    }
  });

  // if user is logged in, allow access to members page
  app.get("/members", isAuthenticated, function(req, res) {
    res.render("members");
  });

  app.get("/account", isAuthenticated, function(req, res) {
    res.render("account", {
      id: req.user.id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      createdAt: req.user.createdAt.substring(0, 10),
      avatar: req.user.imgUrl
    });
  });

  // logger route loads logger
  app.get("/logger", isAuthenticated, function(req, res) {
    if (req.user) {
      res.render("logger", {
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  // community page
  app.get("/community", isAuthenticated, function(req, res) {
    res.render("community");
  });

  // loads user-manager for admin
  app.get("/users", isAuthenticated, function(req, res) {
    res.render("user-manager");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });

  // app.get("/404", function(req, res) {
  //   res.render("404");
  // });
};
