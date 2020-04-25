var sequence = [];
var color = ["green", "red", "yellow", "blue"];
var done = false;
var userSequence = [];
var len;

$(document).on("keypress", function (event) {
	if(!done){
		done = true;
		startGame();
	}
});

function startGame(){
	nextTile();
}

function nextTile(){
	var ran = Math.floor(Math.random()*4);
	var tile = color[ran];
	sequence.push(tile);
	len = sequence.length;
	press(tile);
	$("#level-title").html("Level " + sequence.length);
}

$(".btn").on("click", function (){
	var id = $(this).attr('id');
	press(id);
	userSequence.push(id);
	if(id != sequence[userSequence.length-1]){
		sequence = [];
		userSequence = [];
		gameOver();
	}

	if(userSequence.length == len){
		userSequence = [];
		setTimeout(nextTile, 1000);
	}
});


function gameOver(){
	done = false;
	$("#level-title").html("Game Over, Press Any Key to Restart");
	$("body").toggleClass("game-over");
	sound("wrong");
	setTimeout(function (){
		$("body").toggleClass("game-over");
	}, 200);
}

function press(tile){
	$("#" + tile).toggleClass("pressed");
	sound(tile);
	setTimeout(function (){
		$("#" + tile).toggleClass("pressed");
	}, 100);
}

function sound(key){
	var audio = new Audio('./sounds/' + key + '.mp3');
	audio.play();
}
