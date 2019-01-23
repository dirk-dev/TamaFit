var db = require("../models");

module.exports = function(app) {
  // app.get("/api/workouts", function(req, res) {
  //   // Here we add an "include" property to our options in our findAll query
  //   // We set the value to an array of the models we want to include in a left outer join
  //   // In this case, just db.Log
  //   db.Workout.findAll({
  //     include: [db.Log]
  //   }).then(function(dbWorkout) {
  //     res.json(dbWorkout);
  //   });
  // });

  // app.get("/api/workouts/:id", function(req, res) {
  //   // Here we add an "include" property to our options in our findOne query
  //   // We set the value to an array of the models we want to include in a left outer join
  //   // In this case, just db.Log
  //   db.Workout.findOne({
  //     where: {
  //       id: req.params.id
  //     },
  //     include: [db.Log]
  //   }).then(function(dbWorkout) {
  //     res.json(dbWorkout);
  //   });
  // });

  // app.post("/api/workouts", function(req, res) {
  //   db.Workout.create(req.body).then(function(dbWorkout) {
  //     res.json(dbWorkout);
  //   });
  // });

  // app.delete("/api/workouts/:id", function(req, res) {
  //   db.Workout.destroy({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(function(dbWorkout) {
  //     res.json(dbWorkout);
  //   });
  // });

};
