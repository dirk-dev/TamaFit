// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {
  // GET route for getting all of the logs
  // app.get("/api/logs", function(req, res) {
  //   var query = {};
  //   if (req.query.user_id) {
  //     query.UserId = req.query.user_id;
  //   }
  //   // Here we add an "include" property to our options in our findAll query
  //   // We set the value to an array of the models we want to include in a left outer join
  //   // In this case, just db.User
  //   db.Log.findAll({
  //     where: query,
  //     include: [db.User]
  //   }).then(function(dbLog) {
  //     res.json(dbLog);
  //   });
  // });

  // test to get all logs for specific user
  app.get("/api/logs", function (req, res) {
    db.Log.findAll({
      where: {
        UserId: req.user.id
      },
      include: [db.User],
      order: [
        // sort by most recent log on top
        ["date", "DESC"]
      ]
    }).then(function (dbLogs) {
      res.json(dbLogs);
    });
  });

  // Get route for retrieving a single log
  app.get("/api/logs/:id", function (req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.User
    db.Log.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User]
    }).then(function (dbLog) {
      res.json(dbLog);
    });
  });

  // POST route for saving a new log
  app.post("/api/logs", function (req, res) {
    db.Log.create(req.body).then(function (dbLog) {
      res.json(dbLog);
    });
  });

  // DELETE route for deleting logs
  app.delete("/api/logs/:id", function (req, res) {
    db.Log.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbLog) {
      res.json(dbLog);
    });
  });

  // PUT route for updating logs
  app.put("/api/logs", function (req, res) {
    db.Log.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function (dbLog) {
      res.json(dbLog);
    });
  });
};