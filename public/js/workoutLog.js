$(document).ready(function() {
  var logContainer = $(".log-container");
  var logCategorySelect = $("#category");

  $(document).on("click", "button.delete", handleLogDelete);
  $(document).on("click", "button.edit", handleLogEdit);

  var logs;

  // find logs for a specific user
  var url = window.location.search;
  var userId;
  if (url.indexOf("?user_id=") !== -1) {
    userId = url.split("=")[1];
    getLogs(userId);
  } else {
    getLogs();
  }

  // get logs from database
  function getLogs(user) {
    userId = user || "";
    if (userId) {
      userId = "/?user_id=" + userId;
    }
    $.get("/api/logs" + userId, function(data) {
      // console.log("logs", data);
      logs = data;
      if (!logs || !logs.length) {
        displayEmpty(user);
      } else {
        initializeRows();
      }
    });
  }

  // API call to delete logs
  function deleteLog(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/logs/" + id
    }).then(function() {
      getLogs(logCategorySelect.val());
    });
  }

  // add log to total log display
  function initializeRows() {
    logContainer.empty();
    var logsToAdd = [];
    for (var i = 0; i < logs.length; i++) {
      logsToAdd.push(createNewRow(logs[i]));
    }
    logContainer.append(logsToAdd);
  }

  // display a log
  function createNewRow(log) {
    var formattedDate = new Date(log.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY");
    var newLogCard = $("<div>");
    newLogCard.addClass("card");
    var LogCardHeader = $("<div>");
    LogCardHeader.addClass("card-header");
    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");
    var editBtn = $("<button>");
    editBtn.text("Edit");
    editBtn.addClass("edit btn btn-info");
    var creationDate = $("<small>");
    var workoutDate = $("<h2>");
    var userName = $("<h6>");
    creationDate.text("added on: " + formattedDate);
    creationDate.css({
      float: "right",
      "margin-top": "-10px"
    });
    var LogCardBody = $("<div>");
    LogCardBody.addClass("card-comment");
    var LogBody = $("<p>");
    userName.text(log.User.firstName + "'s workout on");
    workoutDate.text(log.date + " ");
    LogBody.text(log.comment);
    userName.append(workoutDate);
    LogCardHeader.append(deleteBtn);
    LogCardHeader.append(editBtn);
    LogCardHeader.append(creationDate);
    LogCardHeader.append(userName);
    LogCardBody.append(LogBody);
    newLogCard.append(LogCardHeader);
    newLogCard.append(LogCardBody);
    newLogCard.data("log", log);
    return newLogCard;
  }

  // delete a log
  function handleLogDelete() {
    var currentLog = $(this)
      .parent()
      .parent()
      .data("log");
    deleteLog(currentLog.id);
  }

  // update a log
  function handleLogEdit() {
    var currentLog = $(this)
      .parent()
      .parent()
      .data("log");
    window.location.href = "/logger?log_id=" + currentLog.id;
  }

  // no logs yet
  function displayEmpty(id) {
    var query = window.location.search;
    var partial = "";
    if (id) {
      partial = " for User:" + id;
    }
    logContainer.empty();
    var messageH2 = $("<h2>");
    messageH2.css({
      "text-align": "center",
      "margin-top": "50px"
    });
    messageH2.html(
      "No posts yet" +
        partial +
        ", click <a href='/logger" +
        query +
        "' class='text-link'>here</a> in order to get started."
    );
    logContainer.append(messageH2);
  }
});
