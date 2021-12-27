var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var level = 0;
var start = false;



$(".btn").on("click", function() {

  var userChoosenColour = $(this).attr("id");

  animatePress(userChoosenColour);
  playSound(userChoosenColour);

  userClickedPattern.push(userChoosenColour);

  checkAnswer(userClickedPattern.length - 1);

});


function checkAnswer(currentIndex) {
  var wrong = "wrong";

  if (gamePattern[currentIndex] === userClickedPattern[currentIndex]) {

    if (gamePattern.length === userClickedPattern.length) {

      setTimeout(function() {
        nextSequence();
      }, 1000);
      userClickedPattern = [];

    }

  } else {

    playSound(wrong);
    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
      startOver();
    }, 200);

      $("#level-title").text("Game Over, Press Any Key to Restart");

  }

}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  start = false;
}



$(document).on("keypress", function() {

  if (!start) {
    start = true;
    nextSequence();
  }

});

function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChoosenColour = buttonColours[randomNumber];

  $("#" + randomChoosenColour).fadeOut(100).fadeIn(100);

  playSound(randomChoosenColour);
  gamePattern.push(randomChoosenColour);

}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");

  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
