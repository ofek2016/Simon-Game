const buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;


$(document).keypress((event) => {
    if ( !started && event.key.toUpperCase()==="A") {
        $("#level-title").html("Level " + level);
        nextSequence();
        started = true;
    }
});


$(".btn").click((event) => {
    // var userChosenColour = $(this).attr("id");
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});


function nextSequence() {
    userClickedPattern = [];
    level++;
    var randomNumber = Math.floor(Math.random() * 4)
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    $("#level-title").html("Level " + level);

}


function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("." + currentColour).addClass("pressed");
    setTimeout(() => {
        $("." + currentColour).removeClass("pressed");
    }, 100);
}


const checkAnswer = (currentLevel) => {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }

}

const startOver = () => {
    level = 0;
    gamePattern = [];
    started = false;
}

