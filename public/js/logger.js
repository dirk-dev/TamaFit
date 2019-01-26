$(document).ready(function() {
  // set default date choice to today
  var today = moment().format("YYYY-MM-DD");
  document.getElementById("datePicker").value = today;

  // Getting jQuery references to the log date, comment, form, and user select
  var loggerForm = $("#logger");
  var dateInput = $(".date");
  var commentInput = $("#comment");
  var memberId;

  function getUserId() {
    $.get("/api/user_data").then(function(data) {
      memberId = data.id;
    });
  }
  getUserId();

  // Adding an event listener for when the form is submitted
  $(loggerForm).on("submit", handleFormSubmit);

  // Gets the part of the url that comes after the "?" (which we have if we're updating a log)
  var url = window.location.search;
  var logId;
  // var userId;
  var updating = false;

  // If we have this section in our url, we pull out the log id from the url
  // In '?log_id=1', logId is 1
  if (url.indexOf("?log_id=") !== -1) {
    logId = url.split("=")[1];
    getLogData(logId, "log");
  }
  // Otherwise if we have an user_id in our url, preset the user select box to be our User
  // else if (url.indexOf("?user_id=") !== -1) {
  //   userId = url.split("=")[1];
  // }

  // A function for handling what happens when the form to create a new log is submitted
  function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the log if we are missing a comment or date
    if (!dateInput.val().trim() || !commentInput.val().trim()) {
      return;
    }
    // Constructing a newLog object to hand to the database
    var newLog = {
      date: dateInput.val().trim(),
      comment: commentInput.val().trim(),
      UserId: memberId
    };

    // If we're updating a log run updateLog to update a log
    // Otherwise run submitLog to create a whole new log
    if (updating) {
      newLog.id = logId;
      updateLog(newLog);
    } else {
      submitLog(newLog);
    }
  }

  // Submits a new log and brings user to members page upon completion
  function submitLog(log) {
    $.post("/api/logs", log, function() {
      window.location.href = "/members";
    });
  }

  // Gets log data for the current log if we're editing, or if we're adding to a user's existing logs
  function getLogData(id, type) {
    var queryUrl;
    switch (type) {
    case "log":
      queryUrl = "/api/logs/" + id;
      break;
    case "user":
      queryUrl = "/api/users/" + id;
      break;
    default:
      return;
    }
    $.get(queryUrl, function(data) {
      if (data) {
        console.log(data.UserId || data.id);
        // If this log exists, prefill our logger forms with its data
        dateInput.val(data.date);
        commentInput.val(data.comment);
        // userId = data.UserId || data.id;
        // If we have a log with this id, set a flag for us to know to update the log
        // when we hit submit
        updating = true;
      }
    });
  }

  // Update a given log, bring user to the members page when done
  function updateLog(log) {
    $.ajax({
      method: "PUT",
      url: "/api/logs",
      data: log
    }).then(function() {
      window.location.href = "/members";
    });
  }
});
