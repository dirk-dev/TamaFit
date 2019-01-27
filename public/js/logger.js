$(document).ready(function() {
  var loggerForm = $("#logger");
  var dateInput = $(".date");
  var commentInput = $("#comment");
  var memberId;

  // set default date choice to today
  var today = moment().format("YYYY-MM-DD");
  document.getElementById("datePicker").value = today;

  function getUserId() {
    $.get("/api/user_data").then(function(data) {
      memberId = data.id;
    });
  }
  getUserId();

  $(loggerForm).on("submit", handleFormSubmit);

  // Gets the part of the url that comes after the "?" for updating logs
  var url = window.location.search;
  var logId;
  var updating = false;

  // If there's this section in the url, pull out the log id from url
  // In '?log_id=1', logId is 1
  if (url.indexOf("?log_id=") !== -1) {
    logId = url.split("=")[1];
    getLogData(logId, "log");
  }

  // when form to create a new log is submitted
  function handleFormSubmit(event) {
    event.preventDefault();

    if (!dateInput.val().trim() || !commentInput.val().trim()) {
      return;
    }

    // new log object to add
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

  // Submit new log and bring user to members page
  function submitLog(log) {
    $.post("/api/logs", log, function() {
      window.location.href = "/members";
    });
  }

  // Gets log data for the current log if editing, or if adding to a user's existing logs
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
        // If log id already exists, pre-fill logger forms with its data and trigger an update
        dateInput.val(data.date);
        commentInput.val(data.comment);
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
