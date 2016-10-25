
$(document).ready(function(){
	$(".box").on("click", function(){
		id=$(this).attr("id");
		rowIndex=id.slice(0,1);
		mark(this);

	});
});

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

function check(){

}
