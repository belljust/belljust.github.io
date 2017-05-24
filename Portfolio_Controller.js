
$(document).on("click", ".quadrant",function(){
	console.log("a link was pressed");
	$('.quadrant').not(this).removeClass('active');
	$(this).addClass('active');
});

$(document).on("click", ".flipper",function(){
	$('.flipper').not(this).removeClass('flipped');
	$(this).addClass('flipped');
});

$(document).ready(function(){
	console.log("DOM Loaded");
});

function About_Me(this_div){
	var content = '<h2>About Me Here</h2>';
	$(".content").html(content);
}

function Projects(){
	var content = '<h2>Projects Here</h2>';
	$(".content").html(content);
}

function Resume(){
	var content = '<h2>Resume Here</h2>';
	$(".content").html(content);
}

function Education(){
	var content = '<h2>Education Here</h2>';
	$(".content").html(content);
}

function flip_div(div){

}