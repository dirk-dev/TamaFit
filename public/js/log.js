$(document).ready(function() {
  /* global moment */

  // logContainer holds all of our logs
  var logContainer = $(".blog-container");
  var logCategorySelect = $("#category");
  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handleLogDelete);
  $(document).on("click", "button.edit", handleLogEdit);
  // Variable to hold our logs
  var logs;

  // The code below handles the case where we want to get blog logs for a specific workout
  // Looks for a query param in the url for workout_id
  var url = window.location.search;
  var workoutId;
  if (url.indexOf("?workout_id=") !== -1) {
    workoutId = url.split("=")[1];
    getlogs(workoutId);
  }
  // If there's no workoutId we just get all logs as usual
  else {
    getlogs();
  }


  // This function grabs logs from the database and updates the view
  function getlogs(workout) {
    workoutId = workout || "";
    if (workoutId) {
      workoutId = "/?workout_id=" + workoutId;
    }
    $.get("/api/logs" + workoutId, function(data) {
      console.log("logs", data);
      logs = data;
      if (!logs || !logs.length) {
        displayEmpty(workout);
      }
      else {
        initializeRows();
      }
    });
  }

  // This function does an API call to delete logs
  function deleteLog(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/logs/" + id
    })
      .then(function() {
        getlogs(logCategorySelect.val());
      });
  }

  // InitializeRows handles appending all of our constructed log HTML inside logContainer
  function initializeRows() {
    logContainer.empty();
    var logsToAdd = [];
    for (var i = 0; i < logs.length; i++) {
      logsToAdd.push(createNewRow(logs[i]));
    }
    logContainer.append(logsToAdd);
  }

  // This function constructs a log's HTML
  function createNewRow(log) {
    var formattedDate = new Date(log.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    var newLogCard = $("<div>");
    newLogCard.addClass("card");
    var newLogCardHeading = $("<div>");
    newLogCardHeading.addClass("card-header");
    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-info");
    // var newLogTitle = $("<h2>");
    var newLogDate = $("<small>");
    var newLogWorkout = $("<h5>");
    newLogWorkout.text("Written by: " + log.Workout.name);
    newLogWorkout.css({
      float: "right",
      color: "blue",
      "margin-top":
      "-10px"
    });
    var newLogCardComments = $("<div>");
    newLogCardComments.addClass("card-comments");
    var newLogComments = $("<p>");
    // newLogTitle.text(log.title + " ");
    newLogComments.text(log.comments);
    newLogDate.text(formattedDate);
    // newLogTitle.append(newLogDate);
    newLogCardHeading.append(deleteBtn);
    newLogCardHeading.append(editBtn);
    // newLogCardHeading.append(newLogTitle);
    newLogCardHeading.append(newLogWorkout);
    newLogCardComments.append(newLogComments);
    newLogCard.append(newLogCardHeading);
    newLogCard.append(newLogCardComments);
    newLogCard.data("log", log);
    return newLogCard;
  }

  // This function figures out which log we want to delete and then calls deleteLog
  function handleLogDelete() {
    var currentLog = $(this)
      .parent()
      .parent()
      .data("log");
    deleteLog(currentLog.id);
  }

  // This function figures out which log we want to edit and takes it to the appropriate url
  function handleLogEdit() {
    var currentLog = $(this)
      .parent()
      .parent()
      .data("log");
    window.location.href = "/cms?log_id=" + currentLog.id;
  }

  // This function displays a message when there are no logs
  function displayEmpty(id) {
    var query = window.location.search;
    var partial = "";
    if (id) {
      partial = " for Workout #" + id;
    }
    logContainer.empty();
    var messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "50px" });
    messageH2.html("No logs yet" + partial + ", navigate <a href='/cms" + query +
    "'>here</a> in order to get started.");
    logContainer.append(messageH2);
  }

});
