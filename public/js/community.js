$(document).ready(function() {
  // Getting references to the name input and user container, as well as the table body
  var userList = $("tbody");
  var userContainer = $(".user-container");

  // Getting the list of Users and their stats
  getUsers();

  // Function for creating a new list row for users
  function createUserRow(userData) {
    var newTr = $("<tr>");
    newTr.data("user", userData);
    if (userData.Logs) {
      newTr.append("<td> " + userData.Logs.length + "</td>");
    } else {
      newTr.append("<td>0</td>");
    }
    newTr.append("<td> <img src='" + userData.imgUrl + "' width='50'> </td>");
    newTr.append(
      "<td>" + userData.firstName + " " + userData.lastName + "</td>"
    );
    newTr.append("<td>" + userData.createdAt.substring(0, 10) + "</td>");
    return newTr;
  }

  // Function for retrieving users and getting them ready to be rendered to the page
  function getUsers() {
    $.get("/api/users", function(data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createUserRow(data[i]));
      }
      renderuserList(rowsToAdd);
    });
  }

  // A function for rendering the list of users to the page
  function renderuserList(rows) {
    userList
      .children()
      .not(":last")
      .remove();
    userContainer.children(".alert").remove();
    if (rows.length) {
      // console.log(rows);
      userList.prepend(rows);
    } else {
      renderEmpty();
    }
  }

  // Function for handling what to render when there are no users
  function renderEmpty() {
    var alertDiv = $("<div>");
    alertDiv.addClass("alert alert-danger");
    alertDiv.text("There are no users.");
    userContainer.append(alertDiv);
  }
});
