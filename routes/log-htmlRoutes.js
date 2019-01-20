var db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  // cms route loads cms
  app.get("/cms", isAuthenticated, function(req, res) {
    res.render("cms");
  });

  // log route loads log
  app.get("/log", isAuthenticated, function(req, res) {
    console.log("this is working");
    if (req.user) {
      console.log(req.user.id);
      db.Workout.findAll({
        where: {
          UserId: req.user.id
        },
        include: [
          {
            model: db.Log,
            where: {
              WorkoutID: db.Log.WorkoutId
            }
          }
        ]
      }).then(function(workouts) {
        console.log(workouts, "boo");
        res.render("log", {
          email: req.user.email,
          id: req.user.id,
          createdAt: req.user.createdAt.substring(0, 10),
          workouts: workouts
        });
      });
    } else {
      res.render("index");
    }
    // res.render("log");
  });

  // workouts route loads workout-manager
  app.get("/workouts", isAuthenticated, function(req, res) {
    res.render("workout-manager");
  });
};
