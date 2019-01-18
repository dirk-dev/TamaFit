$(document).ready(function() {
  // Getting jQuery references to the log comment, title, form, and workout select
  var commentInput = $("#comment");
  // var titleInput = $("#title");
  var cmsForm = $("#cms");
  var workoutSelect = $("#workout");
  // Adding an event listener for when the form is submitted
  $(cmsForm).on("submit", handleFormSubmit);
  // Gets the part of the url that comes after the "?" (which we have if we're updating a log)
  var url = window.location.search;
  var logId;
  var workoutId;
  // Sets a flag for whether or not we're updating a log to be false initially
  var updating = false;

  // If we have this section in our url, we pull out the log id from the url
  // In '?log_id=1', logId is 1
  if (url.indexOf("?log_id=") !== -1) {
    logId = url.split("=")[1];
    getLogData(logId, "log");
  }
  // Otherwise if we have an workout_id in our url, preset the workout select box to be our Workout
  else if (url.indexOf("?workout_id=") !== -1) {
    workoutId = url.split("=")[1];
  }

  // Getting the workouts, and their logs
  getWorkouts();

  // A function for handling what happens when the form to create a new log is submitted
  function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the log if we are missing a comment, title, or workout
    // if (!titleInput.val().trim() || !commentInput.val().trim() || !workoutSelect.val()) {
    //   return;
    // }
    if (!commentInput.val().trim() || !workoutSelect.val()) {
      return;
    }
    // Constructing a newLog object to hand to the database
    var newLog = {
      // title: titleInput
      //   .val()
      //   .trim(),
      comment: commentInput
        .val()
        .trim(),
      WorkoutId: workoutSelect.val()
    };

    // If we're updating a log run updateLog to update a log
    // Otherwise run submitLog to create a whole new log
    if (updating) {
      newLog.id = logId;
      updateLog(newLog);
    }
    else {
      submitLog(newLog);
    }
  }

  // Submits a new log and brings user to logs page upon completion
  function submitLog(log) {
    $.post("/api/logs", log, function() {
      window.location.href = "/log";
    });
  }

  // Gets log data for the current log if we're editing, or if we're adding to an workout's existing logs
  function getLogData(id, type) {
    var queryUrl;
    switch (type) {
    case "log":
      queryUrl = "/api/logs/" + id;
      break;
    case "workout":
      queryUrl = "/api/workouts/" + id;
      break;
    default:
      return;
    }
    $.get(queryUrl, function(data) {
      if (data) {
        console.log(data.workoutId || data.id);
        // If this log exists, prefill our cms forms with its data
        // titleInput.val(data.title);
        commentInput.val(data.comment);
        workoutId = data.workoutId || data.id;
        // If we have a log with this id, set a flag for us to know to update the log
        // when we hit submit
        updating = true;
      }
    });
  }

  // A function to get workouts and then render our list of workouts
  function getWorkouts() {
    $.get("/api/workouts", renderWorkoutList);
  }
  // Function to either render a list of workouts, or if there are none, direct the user to the page
  // to create a workout first
  function renderWorkoutList(data) {
    if (!data.length) {
      window.location.href = "/workouts";
    }
    $(".hidden").removeClass("hidden");
    var rowsToAdd = [];
    for (var i = 0; i < data.length; i++) {
      rowsToAdd.push(createWorkoutRow(data[i]));
    }
    workoutSelect.empty();
    console.log(rowsToAdd);
    console.log(workoutSelect);
    workoutSelect.append(rowsToAdd);
    workoutSelect.val(workoutId);
  }

  // Creates the workout options in the dropdown
  function createWorkoutRow(workout) {
    var listOption = $("<option>");
    listOption.attr("value", workout.id);
    listOption.text(workout.name);
    return listOption;
  }

  // Update a given log, bring user to the blog page when done
  function updateLog(log) {
    $.ajax({
      method: "PUT",
      url: "/api/logs",
      data: log
    })
      .then(function() {
        window.location.href = "/blog";
      });
  }
});
