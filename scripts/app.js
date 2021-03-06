
$(document).ready(function(){
	$(".box").on("click", function(){
		console.log(this);
		if(	$(".player_o").hasClass("current") || $(".player_x").hasClass("current")){
			id=$(this).attr("id");
			rowIndex=id.slice(0,1);

			// mark cliked box
			mark(this);
			var winner = "";

			// check winner
			winner = check(3);

			if(winner == ""){
				// check draw
				winner = isDraw(3);
				//console.log("drawcheck:" + winner);
			}
			//console.log("winner:" + winner);
			if(winner != ""){
				// if there is winner , terminate game
				end(winner);
			}

			// if x player is cpu, cpu put x at random
			if( $(".player_x").hasClass("current") && !$("span#mode").hasClass("cpuoff")){
				cpu_random(3);
			}
		};
	});
});


// put x at random box
function cpu_random(size){
	size = parseInt(size);
	boxes = $(".box");
	while(true){
		box = boxes[Math.floor(Math.random() * size * size)];
		box = $(box);
		console.log(box);
		if(!(box.hasClass("marked_o") || box.hasClass("marked_x")))
		{
				box.trigger("click");
				return;
		}
	}
}

// reset game
function reset(){
	console.log("reset()");
	$(".player_o").removeClass("winner");
	$(".player_x").removeClass("winner");
	$(".player_o").removeClass("loser");
	$(".player_x").removeClass("loser");
	$(".player_o").removeClass("draw");
	$(".player_x").removeClass("draw");
	$(".result_o").text("");
	$(".result_x").text("");
	$(".player_o").removeClass("current");
	$(".player_x").removeClass("current");
	$(".player_o").addClass("current");
	$(".box").removeClass("marked_o");
	$(".box").removeClass("marked_x");
	return;
}

// terminate game
function end(winner){
	console.log("end()");
	if(winner == "o"){
		$(".player_o").addClass("winner");
		$(".player_x").addClass("loser");
		$(".result_o").text("Win");
		$(".result_x").text("Lose");
		$(".player_o").css({"color": "blue"});
		$(".player_x").css({"color": "red"});

	}else if(winner == "x"){
		$(".player_o").addClass("loser");
		$(".player_x").addClass("winner");
		$(".result_o").text("Lose");
		$(".result_x").text("Win");
		$(".player_o").css({"color": "red"});
		$(".player_x").css({"color": "blue"});
	}else if(winner == "d"){
		$(".player_o").addClass("draw");
		$(".player_x").addClass("draw");
		$(".result_o").text("Draw");
		$(".result_x").text("Draw");
		$(".player_o").css({"color": "green"});
		$(".player_x").css({"color": "green"});
	}
	$(".player_o").removeClass("current");
	$(".player_x").removeClass("current");
}

// mark element
function mark(element){
	if(!($(element).hasClass("marked_o") || $(element).hasClass("marked_x")))
	{
		if(player() === 'o'){
			$(element).toggleClass("marked_o");
		}else{
			$(element).toggleClass("marked_x");
		}
	}
}

// change turn
function player(){
	//console.log($("player_o"));
	$(".player_o").toggleClass("current");
	$(".player_x").toggleClass("current");

	if($(".player_o").hasClass("current")){
		return 'x';
	}
	else {
		return 'o';
	}
}

// check winner
function check(size){
	var object = {};
	$.each($(".box"),function(i,e){
		object[e.id] = ($(e).hasClass("marked_o")? "o" : $(e).hasClass("marked_x")? "x": "");
	});

	var winner = '';
	for(var i = 1 ; i <= parseInt(size); i++ ){
		winner = check_row(i,object);
		//console.log("winner-r:"+ winner);
		if(winner != ''){
			break;
		}

		winner = check_col(i,object);
		//console.log("winner-c:"+ winner);
		if(winner != ''){
			break;
		}
	}
	if(winner == ""){
		winner = check_cross(object);
		//console.log("winner-cr:"+ winner);
	}
	return winner;
}

// check draw
function isDraw(size){
	size = parseInt(size);
	var count = "";
	$.each($(".box"),function(i,e){
		temp = ($(e).hasClass("marked_o")? "o" : $(e).hasClass("marked_x")? "x": "");
		console.log("isDraw:" + temp);
		if((temp == "o" || temp == "x")){
			count++;
		}
	});
	if(count == size * size){
		return "d";
	}else{
		return "";
	}
}

//check draw row
function check_row(r,obj){
	if(obj[r + "-1"] == 'o' && obj[r + "-2"] == 'o' && obj[r + "-3"] == 'o'){
		return 'o';
	}
	else if(obj[r + "-1"] == 'x' && obj[r + "-2"] == 'x' && obj[r + "-3"] == 'x'){
		return 'x';
	}
	return "";
}

// check draw col
function check_col(c,obj){
	if(obj["1-" + c] == 'o' && obj["2-" + c] == 'o' && obj["3-" + c] == 'o'){
		return 'o';
	}
	else 	if(obj["1-" + c] == 'x' && obj["2-" + c] == 'x' && obj["3-" + c] == 'x'){
		return 'x';
	}
	return "";
}

// check draw cross
function check_cross(obj){
	if(obj["1-1"] == 'o' && obj["2-2"] == 'o' && obj["3-3"] == 'o'){
		return 'o';
	}else if(obj["3-1"] == 'o' && obj["2-2"] == 'o' && obj["1-3"] == 'o'){
		return 'o';
	}else if(obj["1-1"] == 'x' && obj["2-2"] == 'x' && obj["3-3"] == 'x'){
		return 'x';
	}else if(obj["3-1"] == 'x' && obj["2-2"] == 'x' && obj["1-3"] == 'x'){
		return 'x';
	}
	return "";
}

// toggle cpu
function toggleCpu(){
	$("#mode").toggleClass("cpuoff");
}
