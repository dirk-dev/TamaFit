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

  // The code below handles the case where we want to get blog logs for a specific user
  // Looks for a query param in the url for user_id
  var url = window.location.search;
  var userId;
  if (url.indexOf("?user_id=") !== -1) {
    userId = url.split("=")[1];
    getLogs(userId);
  }
  // If there's no userId we just get all logs as usual
  else {
    getLogs();
  }

  // This function grabs logs from the database and updates the view
  function getLogs(user) {
    userId = user || "";
    if (userId) {
      userId = "/?user_id=" + userId;
    }
    $.get("/api/logs" + userId, function(data) {
      console.log("logs", data);
      logs = data;
      if (!logs || !logs.length) {
        displayEmpty(user);
      } else {
        initializeRows();
      }
    });
  }

  // This function does an API call to delete logs
  function deleteLog(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/logs/" + id
    }).then(function() {
      getLogs(logCategorySelect.val());
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
    var LogCardHeader = $("<div>");
    LogCardHeader.addClass("card-header");
    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-info");
    var workoutDate = $("<h2>");
    var createdDate = $("<small>");
    var userName = $("<h5>");
    userName.text("User: " + log.User.firstName);
    userName.css({
      float: "right",
      color: "blue",
      "margin-top": "-10px"
    });
    var LogCardBody = $("<div>");
    LogCardBody.addClass("card-comment");
    var LogBody = $("<p>");
    workoutDate.text(log.date + " ");
    LogBody.text(log.comment);
    createdDate.text(formattedDate);
    workoutDate.append(createdDate);
    LogCardHeader.append(deleteBtn);
    LogCardHeader.append(editBtn);
    LogCardHeader.append(workoutDate);
    LogCardHeader.append(userName);
    LogCardBody.append(LogBody);
    newLogCard.append(LogCardHeader);
    newLogCard.append(LogCardBody);
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
    window.location.href = "/logger?log_id=" + currentLog.id;
  }

  // This function displays a message when there are no logs
  function displayEmpty(firstName) {
    var query = window.location.search;
    var partial = "";
    if (firstName) {
      partial = " for User:" + firstName;
    }
    logContainer.empty();
    var messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "50px" });
    messageH2.html("No logs yet" + partial + ", navigate <a href='/logger" + query +
    "'>here</a> in order to get started.");
    logContainer.append(messageH2);
  }

});