// SIMON SAYS GAME
// |0|1| |green |red |
// |2|3| |yellow|blue|

Swal.fire({
	title: "Simon Says!", 
	text: "Simon will keep choosing a new color so remember the pattern as you progress as far as you can. Have fun and do what Simon says!", 
	icon: "info",
	position: "center"
	});
// Initialize arrays to keep track of user button choices and random colors from game
var userSequence = [];
var simonSequence = [];
var colors = ["green", "red", "yellow", "blue"];
var level = 0;
var gameContinue = true;
var gameStarted = false;

$(document).keydown(function(event) {
	if (!gameStarted && (event.keyCode != 17 && event.key != "r")) {
		$("#level-title").text("Level " + level);
    	nextSequence();
    	gameStarted = true;
	}
});


$(".btn").click(function() {
	var userChosenColor = $(this).attr("id");
	userSequence.push(userChosenColor);
	playButtonSound(userChosenColor);
	checkAnswer(userSequence.length - 1);
});

// Create the next sequence
function nextSequence() {
	level++;
	$("h1").text("Level " + level);
	var simonChoice = Math.floor(Math.random()*4);
	simonSequence.push(colors[simonChoice]);
	playButtonSound(colors[simonChoice]);
}

//
function checkAnswer(currentLevel) {
	if (userSequence[currentLevel] === simonSequence[currentLevel]) {
		if (userSequence.length	=== simonSequence.length) {
			setTimeout(nextSequence, 1000);
			userSequence = [];
		}
	} else {
		gameOver();
	}
}
	// for (var i = 0; i < currentLevel; i++) {
	// 	if (userSequence[i] === simonSequence[i]) {
	// 		continue;
	// 	} else {
	// 		gameContinue = false;
	// 		break;
	// 	}
	// }
	// if (gameContinue) {
	// 	setTimeout(nextSequence, 1000);
	// 	userSequence = [];
	// } else {
	// 	gameOver();
	// }


// function to play sound when button is clicked
function playButtonSound(colorId) {
	$("#" + colorId).addClass("pressed");
	var buttonSound = new Audio("sounds/" + colorId + ".mp3");
	buttonSound.play();
	setTimeout(function() {$("#" + colorId).removeClass("pressed")}, 100);
}

// Game over function to change background color and play loser sound as well as resetting
// the initialized arrays for choices
function gameOver() {
	$("body").addClass("game-over")
	var gameOverSound = new Audio("sounds/wrong.mp3");
	gameOverSound.play();
	setTimeout(function() {$("body").removeClass("game-over")}, 300);
	$("h1").text("Game Over, Press Any Key to Restart...")
	simonSequence = [];
	userSequence = [];
	level = 0;
	gameStarted = false;
	gameContinue = true;
}






// EXTRA || SAVED CODE

		// switch (buttonId) {
		// 	case "green":
		// 		userChoices.append(1);
		// 		break;
		// 	case "red":
		// 		userChoices.append(2);
		// 		break;
		// 	case "yellow":
		// 		userChoices.append(3);
		// 		break;
		// 	case "blue":
		// 		userChoices.append(4);
		// 		break;
		// 	default: alert("Error occurred in button event listener...");						
		// }	

		// function generateRandomNumber() {
		// 	var randomSquareSelector = Math.floor(Math.random()*4);
		// 	return randomSquareSelector;
		// }


		// // check to see if click() can take no arguments to be using within if conditional statement
		// $(".btn").click(function() {
		// 	var userChoice = $(this).attr("id");
		// 	userSequence.push(userChoice);
		// 	playButtonSound(userChoice);
		// });
		// $(document).keydown(function(event) {
		// 	if (event.keyCode === 17 || event.keyCode === 91) {
		// 		console.log("Any key BUT ctrl || cmd;)");
		// 	} else {
		// 		simonSequence = startGame();
		// 	}
		// });
		// if (simonSequence.length === 0 && userSequence.length > 0) {
		// 	gameOver();
		// } else {
		// 	while (equalSequence) {
		// 		level += 1;
		// 		$(".btn").click(function() {
		// 			var userChoice = $(this).attr("id");
		// 			userSequence.push(userChoice);
		// 			playButtonSound(userChoice);
		// 		});
		// 		for (var i = 0; i < simonSequence.length; i++) {
		// 			if (simonSequence[i] !== userSequence[i]) {
		// 				equalSequence = false;
		// 			} else {
		// 				$("h1").text("Level " + level);
		// 				continue;
		// 			}
		// 		}
		// 		var nextColor = nextSequence();
		// 		playButtonSound(nextColor);
		// 		simonSequence.push(nextColor);
		// 	}
		// 	gameOver();
		// }
