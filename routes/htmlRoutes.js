var db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    if (req.user) {
      res.redirect("/members");
    } else {
      res.render("index");
    }
  });

  app.get("/account", function(req, res) {
    if (req.user) {
      res.render("account", {
        email: req.user.email,
        id: req.user.id,
        createdAt: req.user.createdAt.substring(0, 10)
      });
    } else (!req.user) {
      res.render("index");
    }
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    } else {
      res.render("login_page");
    }
  });

  app.get("/signup", function(req, res) {
    // If the user already has an account send them to the members page
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

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  // app.get("*", function (req, res) {
  //   res.render("404");
  // });
};
