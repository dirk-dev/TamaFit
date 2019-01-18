$(document).ready(function() {
  // Getting references to the name input and workout container, as well as the table body
  var nameInput = $("#workout-name");
  var workoutList = $("tbody");
  var workoutContainer = $(".workout-container");
  // Adding event listeners to the form to create a new object, and the button to delete
  // a Workout
  $(document).on("submit", "#workout-form", handleWorkoutFormSubmit);
  $(document).on("click", ".delete-workout", handleDeleteButtonPress);

  // Getting the initial list of Workouts
  getWorkouts();

  // A function to handle what happens when the form is submitted to create a new Workout
  function handleWorkoutFormSubmit(event) {
    event.preventDefault();
    // Don't do anything if the name fields hasn't been filled out
    if (!nameInput.val().trim().trim()) {
      return;
    }
    // Calling the upsertWorkout function and passing in the value of the name input
    upsertWorkout({
      name: nameInput
        .val()
        .trim()
    });
  }

  // A function for creating a workout. Calls getWorkouts upon completion
  function upsertWorkout(workoutData) {
    $.post("/api/workouts", workoutData)
      .then(getWorkouts);
  }

  // Function for creating a new list row for workouts
  function createWorkoutRow(workoutData) {
    var newTr = $("<tr>");
    newTr.data("workout", workoutData);
    newTr.append("<td>" + workoutData.name + "</td>");
    if (workoutData.Logs) {
      newTr.append("<td> " + workoutData.Logs.length + "</td>");
    } else {
      newTr.append("<td>0</td>");
    }
    newTr.append("<td><a href='/log?workout_id=" + workoutData.id + "'>Go to Logs</a></td>");
    newTr.append("<td><a href='/cms?workout_id=" + workoutData.id + "'>Create a Log</a></td>");
    newTr.append("<td><a style='cursor:pointer;color:red' class='delete-workout'>Delete Workout</a></td>");
    return newTr;
  }

  // Function for retrieving workouts and getting them ready to be rendered to the page
  function getWorkouts() {
    $.get("/api/workouts", function(data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createWorkoutRow(data[i]));
      }
      renderWorkoutList(rowsToAdd);
      nameInput.val("");
    });
  }

  // A function for rendering the list of workouts to the page
  function renderWorkoutList(rows) {
    workoutList.children().not(":last").remove();
    workoutContainer.children(".alert").remove();
    if (rows.length) {
      console.log(rows);
      workoutList.prepend(rows);
    }
    else {
      renderEmpty();
    }
  }

  // Function for handling what to render when there are no workouts
  function renderEmpty() {
    var alertDiv = $("<div>");
    alertDiv.addClass("alert alert-danger");
    alertDiv.text("You must create a Workout before you can create a Log.");
    workoutContainer.append(alertDiv);
  }

  // Function for handling what happens when the delete button is pressed
  function handleDeleteButtonPress() {
    var listItemData = $(this).parent("td").parent("tr").data("workout");
    var id = listItemData.id;
    $.ajax({
      method: "DELETE",
      url: "/api/workouts/" + id
    })
      .then(getWorkouts);
  }
});
