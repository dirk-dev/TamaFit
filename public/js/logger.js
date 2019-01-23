$(document).ready(function () {
  // set default date choice to today
  var today = moment().format("YYYY-MM-DD");
  document.getElementById("datePicker").value = today;

  // Getting jQuery references to the log date, comment, form, and user select
  var loggerForm = $("#logger");
  var dateInput = $(".date");
  var commentInput = $("#comment");
  var loggedInId = $("#user");
  var memberId;

  
  $.get("/api/user_data").then(function (data) {
    // $(".member-id").text(data.id);
    memberId = data.id;
  });

  // Adding an event listener for when the form is submitted
  $(loggerForm).on("submit", handleFormSubmit);
  // Gets the part of the url that comes after the "?" (which we have if we're updating a log)
  var url = window.location.search;
  var logId;
  var userId;
  // Sets a flag for whether or not we're updating a log to be false initially
  var updating = false;

  // If we have this section in our url, we pull out the log id from the url
  // In '?log_id=1', logId is 1
  if (url.indexOf("?log_id=") !== -1) {
    logId = url.split("=")[1];
    getLogData(logId, "log");
  }
  // Otherwise if we have an user_id in our url, preset the user select box to be our User
  else if (url.indexOf("?user_id=") !== -1) {
    userId = url.split("=")[1];
  }

  // Getting the users, and their logs
  getUsers();

  // A function for handling what happens when the form to create a new log is submitted
  function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the log if we are missing a comment, date, or userId
    if (
      !dateInput.val().trim() ||
      !commentInput.val().trim() ||
      !loggedInId.val()
    ) {
      return;
    }
    // Constructing a newLog object to hand to the database
    var newLog = {
      date: dateInput.val().trim(),
      comment: commentInput.val().trim(),
      UserId: loggedInId.val()
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
    $.post("/api/logs", log, function () {
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
    $.get(queryUrl, function (data) {
      if (data) {
        console.log(data.userId || data.id);
        // If this log exists, prefill our logger forms with its data
        dateInput.val(data.date);
        commentInput.val(data.comment);
        userId = data.userId || data.id;
        // If we have a log with this id, set a flag for us to know to update the log
        // when we hit submit
        updating = true;
      }
    });
  }

  // A function to get users and then render our list of users
  function getUsers() {
    $.get("/api/users", renderUserList);
  }

  // Function to either render a list of users, or if there are none, direct the user to the page
  // to create a user first
  function renderUserList(data) {
    if (!data.length) {
      window.location.href = "/users";
    }
    $(".hidden").removeClass("hidden");
    var rowsToAdd = [];
    for (var i = 0; i < data.length; i++) {
      // update here to display only logged in user
      rowsToAdd.push(createUserRow(data[i]));
    }
    loggedInId.empty();
    loggedInId.append(rowsToAdd);
    loggedInId.val(userId);
  }

  // Creates the user options in the dropdown
  function createUserRow(user) {
    if (user.id === memberId) {
      console.log("memID:" + memberId);
      var listOption = $("<option>");
      listOption.attr("value", user.id);
      listOption.text(user.firstName);
      return listOption;
    } else {
      return;
    }
  }

  // Update a given log, bring user to the members page when done
  function updateLog(log) {
    $.ajax({
      method: "PUT",
      url: "/api/logs",
      data: log
    }).then(function () {
      window.location.href = "/members";
    });
  }
});