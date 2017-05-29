
$(document).on("click", ".quadrant",function(){
	console.log("a link was pressed");
	$('.quadrant').not(this).removeClass('active');
	$(this).addClass('active');
});

$(document).on("click", ".flipper",function(){
	$('.flipper').not(this).removeClass('flipped');
	$(this).addClass('flipped');
});

$(document).on("click", ".ZoomIn",function(){
	if($(this).hasClass('ZoomedIn')){
		ZoomOut();
	}
	else{
		ZoomIn();
	}
	
});



$(document).ready(function(){
	console.log("DOM Loaded");
	PhotoNum = 1;
	MaxPhotos = 0;
	CurrentFolder = "";
});

function DisplayPhotos(folder,num){
	var photo = '<img class="ZoomIn" src="Misc_Pics/zoom.png">' +
		'<img class="CurrentPhoto" src="' + folder + '/Pic' + PhotoNum + '.png">';
	$(".Photo").html(photo);
	console.log(photo);
}

function ZoomIn(){
	$(".CurrentPhoto").toggleClass('zoom');
	$(".ZoomIn").attr('src','Misc_Pics/unzoom.png');
	$(".ZoomIn").toggleClass('ZoomedIn');
}

function ZoomOut(){
	$(".CurrentPhoto").toggleClass('zoom');
	$(".ZoomIn").attr('src','Misc_Pics/zoom.png');
	$(".ZoomIn").toggleClass('ZoomedIn');

}


function Projects(){
	var content = '<h2>Projects Here</h2>';
	$(".Controls").html("<h2>My Projects </h2>");
	var ProjectList = '<img src="Misc_Pics/projects_tree.png" class="projects_tree">' +
					  '<table class="ProjectTable" >' +
						'<tr><td><h3 class="TAProject" onclick="Run_TA_Software()">UofT TA Software</h3></td>' +
							'<td><h3 class="Yak-Yik" onclick="Run_YakYik()">Yik-Yak Clone</h3></td></tr>' +
						'<tr><td><h3 class="WarehouseWars" onclick="Run_WW()">Warehouse Wars</h3></td></tr>'
					  '</table>';

	$(".Photo").html(ProjectList);

}

function Run_TA_Software(){
	var heading = '<table class="heading"><tr>' +
				  '<td><img src="Misc_Pics/left.png" height="40" width="70" onclick="PrevPhoto()"></td>' +
				  '<td><h2>Viewing: Uoft TA Software </h2></td>' +
				  '<td class="counter">(1/11)<td>' +
				  '<td><img src="Misc_Pics/right.png" height="40" width="70" onclick="NextPhoto()"></td>' +
				  '</tr></table>';
	$(".Controls").html(heading);
	CurrentFolder = 'TA_Software';
	MaxPhotos = 11;
	PhotoNum = 1;
	DisplayPhotos(CurrentFolder,PhotoNum);
}

function Run_YakYik(){
	var heading = '<table class="heading"><tr>' +
				  '<td><img src="Misc_Pics/left.png" height="40" width="70" onclick="PrevPhoto()"></td>' +
				  '<td><h2>Viewing: Yak-Yik Clone </h2></td>' +
				  '<td class="counter">(1/8)<td>' +
				  '<td><img src="Misc_Pics/right.png" height="40" width="70" onclick="NextPhoto()"></td>' +
				  '</tr></table>';
	$(".Controls").html(heading);
	CurrentFolder = 'Yak-Yik';
	MaxPhotos = 8;
	PhotoNum = 1;
	DisplayPhotos(CurrentFolder,PhotoNum);
}

function Run_WW(){
	var heading = '<table class="heading"><tr>' +
				  '<td><img src="Misc_Pics/left.png" height="40" width="70" onclick="PrevPhoto()"></td>' +
				  '<td><h2>Viewing: Warehouse Wars </h2></td>' +
				  '<td class="counter">(1/7)<td>' +
				  '<td><img src="Misc_Pics/right.png" height="40" width="70" onclick="NextPhoto()"></td>' +
				  '</tr></table>';
	$(".Controls").html(heading);
	CurrentFolder = 'WW';
	MaxPhotos = 7;
	PhotoNum = 1;
	DisplayPhotos(CurrentFolder,PhotoNum);
}

function NextPhoto(){
	if(PhotoNum < MaxPhotos){
		PhotoNum ++;
		DisplayPhotos(CurrentFolder,PhotoNum);
	}
	else{
		PhotoNum = 1;
		DisplayPhotos(CurrentFolder,PhotoNum);
	}
	var counter = "(" + PhotoNum + "/" + MaxPhotos + ")";
	$(".counter").html(counter);
}

function PrevPhoto(){
	if(PhotoNum > 1){
		PhotoNum --;
		DisplayPhotos(CurrentFolder,PhotoNum);
	}
	else{
		PhotoNum = MaxPhotos;
		DisplayPhotos(CurrentFolder,PhotoNum);
	}
	var counter = "(" + PhotoNum + "/" + MaxPhotos + ")";
	$(".counter").html(counter);
}

function Resume(){
	$(".Controls").html('<h2>My Resume</h2>');
	$(".Photo").html('<h2>Some Stuff Here</h2>');
}

function Education(){
	$(".Controls").html('<h2>My Education</h2>');
	$(".Photo").html('<h2>Some Stuff Here</h2>');
}

function About_Me(this_div){
	$(".Controls").html('<h2>About Me</h2>');
	$(".Photo").html('<h2>Some Stuff Here</h2>');
}


