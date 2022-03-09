var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 1;

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour)
  return randomChosenColour;
}

function startGame() {
  setTimeout(function() {
    $('h1').text("Level " + level);
  }, 500)
  setTimeout(function() {
    randomChosenColour = nextSequence()
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    var colorAudio = new Audio("sounds/" + randomChosenColour + ".mp3");
    colorAudio.play();
  }, 1500);
  $('body').off('keypress')
  $('h2').text("")
}

function gameOver() {
  $('h1').text("Game Over Press A Key to Continue")
  $("body").addClass('game-over');
  var gameOverAudio = new Audio("sounds/wrong.mp3");
  gameOverAudio.play()
  setTimeout(function() {
    $("body").removeClass('game-over')
  }, 100);
  userClickedPattern = [];
  gamePattern = [];
  level = 1;
  $('body').off('keypress');
}

$('body').on('keypress', function() {
  $('h1').text("Game Start")
  startGame();
  $('body').off('keypress')
});
$('.btn').click(function(event) {
  var userChosenColour = event.delegateTarget.classList[1];
  userClickedPattern.push(userChosenColour);
  $("." + userChosenColour).addClass('pressed');
  setTimeout(function() {
    $("." + userChosenColour).removeClass('pressed')
  }, 100);
  var colorAudio = new Audio("sounds/" + userChosenColour + ".mp3");
  colorAudio.play()


  if (userClickedPattern.length < gamePattern.length) {
    $('body').off('keypress');
    for (var i = 0; i < userClickedPattern.length; i++) {
      if (userClickedPattern[i] != gamePattern[i]) {
        gameOver();
        $('body').on('keypress', function() {
          $('h1').text("Game Start")
          startGame();
        });
      }
    }
  } else {
    if (JSON.stringify(userClickedPattern) == JSON.stringify(gamePattern)) {
      level = level + 1;
      userClickedPattern = [];
      $('body').off('keypress');
      $('h1').text("Success !")
      $('h2').text("press a key to continue")
      $('body').on('keypress', function() {
      startGame();
      });
    } else {

      gameOver();
      $('body').on('keypress', function() {
        $('h1').text("Game Start")
        startGame();
      });
    };
  }
});
