
$(document).ready(function(){
	$(".box").on("click", function(){
		if(	$(".player_o").hasClass("current") || $(".player_x").hasClass("current")){
			id=$(this).attr("id");
			rowIndex=id.slice(0,1);
			mark(this);
			var winner = "";
			winner = check(3);
			console.log("winner:" + winner);
			if(winner != ""){
				end(winner);
			}
		};
	});
});

function reset(){
	console.log("reset()");
	$(".player_o").removeClass("winner");
	$(".player_x").removeClass("winner");
	$(".player_o").removeClass("loser");
	$(".player_x").removeClass("loser");
	$(".player_o").text("o");
	$(".player_x").text("x");
	$(".player_o").removeClass("current");
	$(".player_x").removeClass("current");
	$(".player_o").addClass("current");
	$(".box").removeClass("marked_o");
	$(".box").removeClass("marked_x");
	return;
}

function end(winner){
	console.log("end()");
	if(winner == "o"){
		$(".player_o").addClass("winner");
		$(".player_x").addClass("loser");
		$(".player_o").text("o win");
		$(".player_x").text("x lose");

	}else if(winner = "x"){
		$(".player_o").addClass("loser");
		$(".player_x").addClass("winner");
		$(".player_o").text("o lose");
		$(".player_x").text("x win");
	}
	$(".player_o").removeClass("current");
	$(".player_x").removeClass("current");

}

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

function player(){
	console.log($("player_o"));
	$(".player_o").toggleClass("current");
	$(".player_x").toggleClass("current");

	if($(".player_o").hasClass("current")){
		return 'x';
	}
	else {
		return 'o';
	}
}

function check(size){
	var object = {};
	$.each($(".box"),function(i,e){
		object[e.id] = ($(e).hasClass("marked_o")? "o" : $(e).hasClass("marked_x")? "x": "");
	});

	var winner = '';
	for(var i = 1 ; i <= parseInt(size); i++ ){
		winner = check_row(i,object);
		console.log("winner-r:"+ winner);
		if(winner != ''){
			break;
		}

		winner = check_col(i,object);
		console.log("winner-c:"+ winner);
		if(winner != ''){
			break;
		}
	}
	if(winner == ""){
		winner = check_cross(object);
		console.log("winner-cr:"+ winner);
	}
	return winner;
}

function check_row(r,obj){
	if(obj[r + "-1"] == 'o' && obj[r + "-2"] == 'o' && obj[r + "-3"] == 'o'){
		return 'o';
	}
	else if(obj[r + "-1"] == 'x' && obj[r + "-2"] == 'x' && obj[r + "-3"] == 'x'){
		return 'x';
	}
	return "";
}

function check_col(c,obj){
	if(obj["1-" + c] == 'o' && obj["2-" + c] == 'o' && obj["3-" + c] == 'o'){
		return 'o';
	}
	else 	if(obj["1-" + c] == 'x' && obj["2-" + c] == 'x' && obj["3-" + c] == 'x'){
		return 'x';
	}
	return "";
}

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
