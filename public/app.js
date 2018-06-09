$(document).ready(function () {

  const getArticles = function() {
    $("#articles").empty();

    // Grab the articles as a json
    $.get("/api/articles", function (data) {
      data.forEach(function(article) { 
        $("#articles").append("<p data-id='" + article._id + "'>" + article.title + "<br /> <a href='https://www.latimes.com'" + article.link + " target='_blank'>" + 'https://www.latimes.com' + article.link + "<br />" + article.summary + "</p>");
        if (article.note) {
          $("#articles").append("<p data-id='" + article.note._id + "'>" + article.note.body + "</p>");
        }
        $("#articles").append("<button data-id='" + article._id + "' id='savearticle'>Save Article</button>");
      });
    });
  };

  const getSavedArticles = function () {
    $("#saved-articles").empty();

    $.get("/api/articles/saved", function (data) {
      data.forEach(function(savedArticle) {
        $("#saved-articles").append("<p data-id='" + savedArticle._id + "'>" + savedArticle.title + "<br /> <a href='https://www.latimes.com'" + savedArticle.link + " target='_blank'>" + 'https://www.latimes.com' + savedArticle.link + "<br />" + savedArticle.summary + "</p>");
        if (savedArticle.note) {
          $("#articles").append("<p data-id='" + article.note._id + "'>" + article.note.body + "</p>");
        }
        $("#saved-articles").append("<button data-id='" + savedArticle._id + "' id='removearticle'>Remove Article</button>");
        $("#saved-articles").append("<button data-id='" + savedArticle._id + "' id='addnote' data-toggle='modal' data-target='#note-modal'>Add A Comment</button>");
      });
    });
  };

$("#note-modal").on("show.bs.modal", function(e) {
  // variable to hold article id, pulled from related notes button
  var artId = $(e.relatedTarget).attr("data-id");

  $("#save-note").attr("data-id", artId);

  var artTitle = $(e.relatedTarget);
  console.log(JSON.stringify(artTitle));


  $(this).find(".note-title").html("Note for: " + artTitle);
});

// When you click the save note button
$("#save-note").on("click", function () {

  // variable to hold user input for note
  var noteBody = $("#note-text").val();

  // check to make certain the user input isn't blank
  if (noteBody !== "") {

      // Run a POST request to add the note, using what's entered in the inputs
      $.ajax({
          method: "POST",
          url: "/api/articles/" + articleId,
          data: {
              // Value taken from note textarea
              body: noteBody
          }
      })
      .then(function getNote(articleId) {
        $.get("/api/articles/" + articleId, function (dbArticle) {
          var note = dbArticle.note;
          var p = $("<p>");
          p.text(note);
          $(".note-container").append(p);
        });
      });

      // remove the values entered in the textarea for note entry
      $("#note-text").val("");

      // clear out the blank input message if it's there
      $(".message").empty();
  } else {
      // prompt user to enter at least 1 character
      $(".message").text("Please enter a note or dismiss this window.");
  }
});


  $(document).on("click", "#savearticle", function() {
    var thisId = $(this).attr("data-id");
    $.ajax({
      method : "PUT",
      url : "/api/save/" + thisId
    })
    .then(function() {
      getArticles();
      getSavedArticles();
    });
  });

  $(document).on("click", "#removearticle", function() {
    var thisId = $(this).attr("data-id");
    $.ajax({
      method : "PUT",
      url : "/api/delete/" + thisId
    })
    .then(function() {
      getArticles();
      getSavedArticles();
    });
  });
  
  getArticles();
  getSavedArticles();
});