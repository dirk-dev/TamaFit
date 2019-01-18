var db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
  // cms route loads cms
  app.get("/cms", isAuthenticated, function(req, res) {
    res.render("cms");
  });

  // log route loads log
  app.get("/log", isAuthenticated, function(req, res) {
    res.render("log");
  });

  // workouts route loads workout-manager
  app.get("/workouts", isAuthenticated, function(req, res) {
    res.render("workout-manager");
  });
};