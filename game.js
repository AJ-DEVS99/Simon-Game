var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var gameStarted = false;
var level = 0;



function nextsequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    animatePress(randomChosenColor);
    playSound(randomChosenColor);
    level++;
    $("h1").html("level " + level);
};


$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswers(userClickedPattern.length-1);
});





function playSound(name) {
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
};



function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function () {
        $("#"+currentColor).removeClass("pressed");
    }, 100)
};



$(document).keypress(function(){
    if (!gameStarted){
        nextsequence();
        gameStarted = true;
        $("h1").html("level " + level);
    }
});


function checkAnswers(currentLevel) {
    
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        
        if (gamePattern.length === userClickedPattern.length){
            setTimeout(function () {
                nextsequence();
            }, 1000);
        }
    }else {
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();
        $('body').addClass('game-over');
        setTimeout(function () {
            $('body').removeClass('game-over');  
        }, 200);
        $('h1').text("Game Over, Press Any Key to Restart");
        startOver();
    };
    

};

function startOver() {
    level = 0;
    gamePattern = [];
    gameStarted = false;
    
  }
