var buttonColours = ["red", "blue", "green", "yellow"];

// Initial empty array for game generated sequence
var gamePattern = [];

// Initial empty array for user generated sequence
var userClickedPattern = [];

// To provision level upgrades and restart
var started = false;
var level = 0;

// Detect keypress to begin game
$(document).keypress(function() {
  if (!started) {

    // Change title to display level
    $("#level-title").text("Level " + level);
    
    nextSequence();
    started = true;
  }
});

// Main button clicks to progress the game
$(".btn").click(function() {

  // Identifies which button was clicked
  var userChosenColour = $(this).attr("id");
  
  // Pushes the pressed button color to the array
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  // Check if the user clicked answer matches the Game Pattern
  checkAnswer(userClickedPattern.length-1);
});

// Function to verify the progress of the game
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      
      // If user's pattern is correct, the game moves on
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over")
      }, 200);
      playSound("wrong");
      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();
    }
}

// Function to generate the game sequence that the user must follow
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  // A random color is chosen to played and added to the game generated sequence
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // Animate the tile based on the color chosen
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

// Restart game after a wrong move
function startOver() {
  level = 0
  gamePattern = [];
  started = false;
}

// Play the respective sound of the tile
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Border animation for the tile clicked or generated
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}