$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
  });

  const data = {
    avatarArray: [
      "../public/images/anime_spacytchi.png",
      "../public/images/chamanetchi_anime.png",
      "../public/images/gozarutchi_anime.png",
      "../public/images/kikitchi_anime.png",
      "../public/images/mametchi_anime_large.png",
      "../public/images/th.png"
    ]
  };
});
