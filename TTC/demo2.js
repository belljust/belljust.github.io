var username = ""
var loc = null
var destin = null //Destination
var page = null  //Page in focus, corresponding to navigation bar
var newsTab = null  //news tab in focus, corresponding to tabs in news page
// The colors are   red,       grey,      blue,      green,     cyan,      orange,    purple
var newsTabColor = ["#cc0000", "#999966", "#6666ff", "#33cc33", "#33cccc", "#cccc00", "#666699"]
var expanded = null  // the expanded tile.
var wrapper = 0  //the page wrapper currently in focus. 
var last = 0 // the page last visited.
var timeleft = 0
var stops = [] // Store all the stop objs
var msgTab = null
var time = "19:42 Today"
var fourIcons = ["share.png","cross.png","instructions.png","leaderboard.png"]
var starImg = ["1star.png", "2star.png", "3star.png", "4star.png", "5star.png"]
var people=[]
var chats = []
var private = 1
var privatePage = null
var stopTime = []


/**
 * Run once at app launch, append necessary elements, set styles and attributes.
 */
function init(){
	// Function calls.
	initDestinBanner();
	initNavi();
	initNews();
	initGames();
	initMsg();

	// Other initializations
	expanded = document.getElementById("Trivia");
	toPage(0);
}

/**
 * Initialize the destination spinner at top of status page. 
 */
function initDestinBanner(){
	destBanner = document.getElementById("destBanner");
	destinations = destBanner.getElementsByTagName("li");
	stopNames = destBanner.getElementsByTagName("span");

	// Calculate total width and store the stopNames taken from html into a list.
	var sum = 0;
	for (i=0,len=destinations.length-1;i<len;i++){
		var dest = destinations[i];
		dest.id = stopNames[i].innerHTML;
		stops.push(dest.id);
		dest.onclick = function() {destination(this);};

		// Append the line and stop decorations.
		var line = document.createElement("DIV");
		line.className = "line";
		var stop = document.createElement("DIV");
		stop.className = "stop";
		dest.appendChild(line);
		dest.appendChild(stop);

		// Simulate the stop times
		stopTime.push(2+Math.floor(stopNames[i].innerHTML.length/4));

		sum = sum + dest.offsetWidth + 2;
	}
	// The clear selection button. 
	var clear = destinations[destinations.length-1];
	clear.onclick = function() {clearDestination();};
	sum = sum + clear.offsetWidth + 6;

	destBanner.style.width = sum.toString()+"px";
	loc = destinations[1];
	destin = destinations[0];
}

/**
 * Initialize the navigation bar at the bottom of screen (The four tabs).
 */
function initNavi(){
	navigations = document.getElementById("navigation").getElementsByTagName("div");
	for (i=1;i<5;i++) {
		var nav = navigations[i];
		nav.className = "nav";
		nav.id = "nav"+i.toString();
		nav.onclick = function() {navigate(this);};
	}
	page = navigations[1];
	navigate(page);
}

/**
 * Initialize the news page.
 */
function initNews(){
	// Style the tabs and give them function call.
	tabs = document.getElementById("tabs").getElementsByTagName("span");
	for (i=0;i<7;i++) {
		var tab=tabs[i];
		tab.id = "news"+i.toString();
		tab.onclick = function() {news(this);};
	}
	newsTab = tabs[0];
	news(newsTab)
}

/**
 * initialize the games page and all games on the page.
 */
function initGames(){
	gamePairs = document.getElementById("games").getElementsByClassName("tileWrapper");

	// Process one tileWrapper (now includes 2 games) at a time
	for (i=0,len=gamePairs.length;i<len;i++){
		var pair = gamePairs[i];
		var names = pair.getElementsByTagName("span");  // Should contain 2 names
		var divs = pair.getElementsByTagName("div");  //10 in total. Passed by ref, adding divs will change this!
		var buttons = pair.getElementsByTagName("button");  // 10 in total. 5 for each game, passed by ref!
		var icons = pair.getElementsByTagName("img"); 
		var l = names.length;
		var contents = pair.getElementsByTagName("pre");

		// For the two games. Originally support up to 4 for large screens, but have insufficient time. Hence the loop.
		for (j=0;j<l;j++){

			// White game tile
			var nameStr = names[j].innerHTML;
			var game = divs[5*j];
			game.id = nameStr;
			game.className = "tile";
			game.onclick = function(){gameDetail(this);};

			// Black game details panel.
			var detail = divs[5*j+1];
			detail.id = nameStr+"Detail";
			detail.className = "tileDetail";

			// Style the four buttons in details and give them their functionalities.
			var buttonContainer = document.createElement("DIV");
			if (j%2 == 0){
				buttonContainer.className = "gameBtnContainerL";
			}else{
				buttonContainer.className = "gameBtnContainerR";
				game.style.marginLeft="50%";
			}
			for (a=0;a<4;a++) {
				var gbtn = document.createElement("BUTTON");
				gbtn.className = "button gBtn";
				gbtn.setAttribute("onclick", "gBtn("+a.toString()+",'"+detail.id+"')");
				gbtn.style.backgroundImage = "url(./src/icon/"+fourIcons[a]+")";
				buttonContainer.appendChild(gbtn);
			}
			detail.appendChild(buttonContainer);

			// Style the leaderboard.
			leaderboard = divs[5*j+3];
			leaderboard.className = "leaderboardContainer";
			leaderboard.style.display="none";

			// Turn the ratings to stars.
			var star = icons[2*j+1];
			var rating = parseInt(star.alt)
			star.src="./src/icon/"+starImg[rating-1];
			buttonContainer.appendChild(star);

			// The red play button and others.
			buttons[5*j].className = "redbutton tileIB";
			buttons[5*j+2].style.transition="none"
			icons[2*j].alt = nameStr;
			names[j].className = "title";
		}

		// Style the leaderboard columns.
		for (k=0;k<6;k++) {
			contents[k].className = "leaderboard"+(k%3).toString();
		}
	}
}

/**
 * Initialize the message page. 
 */
function initMsg(){
	// Style the tabs.
	msgTabs = document.getElementById("three_tabs").getElementsByTagName("span");
	for (i=0;i<3;i++) {
		var tab=msgTabs[i];
		tab.id = "msg"+i.toString();
		tab.onclick = function() {msgPage(this);};
	}
	msgTab = msgTabs[1];
	msgPage(msgTab);
	privatePage = msgTabs[2];

	var contacts = document.getElementsByClassName("msgPage")[1];
	chats = document.getElementsByClassName("msgContainer");
	var divs = contacts.getElementsByTagName("div");

	for (d=0, leng=divs.length;d<leng;d++) {
		if (divs[d].className =="people") {
			var which = people.length;
			divs[d].onclick=closureSolverMsgOnclick(which+1);
			people.push(divs[d])
		}
	}
	chats[0].style.display="block";
	chats[1].style.display="block";
}

function closureSolverMsgOnclick(which) {
	return function(){toPrivate(which);};
}

/**
 * log user in, update the username var.
 */
function signin(){
	username = document.getElementById("username").value;
	document.getElementById("topbar").style.display="block";
	document.getElementById("navigation").style.display="block";
	toPage(1);
}
function signout(){
	document.getElementById("topbar").style.display="none";
	document.getElementById("navigation").style.display="none";
	document.getElementById("topbar").style.removeProperty("transform");
	document.getElementById("baravatar").getElementsByTagName("div")[0].style.removeProperty("transform");
	toPage(0);
}

/**
 * Set the destination, update the texts, put a flag icon at destination, [start the timmer].
 */
function destination(which) {
	// Make sure current location is not chosen.
	if (which != loc){
		if (destin.getElementsByTagName("img").length>0){
				destin.removeChild(destin.getElementsByTagName("img")[0])
		}
		var img = document.createElement("IMG");
		img.id="i_des"
		img.src="./src/icon/destination_red.png";
		which.appendChild(img);

		document.getElementById("destin").innerHTML=which.id;
		destin = which;
		updateTimeLeft();
		// Start Timmer here.
	}
}

/**
 * Clear the destination selection, update the interfaces, [cancel the timmer].
 */
function clearDestination() {
	if (destin.getElementsByTagName("img").length>0){
			destin.removeChild(destin.getElementsByTagName("img")[0])
	}
	document.getElementById("destin").innerHTML="Destination Not Set";
		document.getElementById("timeleft").innerHTML= "--";
	// Remove Timmer here.
}

/**
 * Change the color of the status bar at top. Used when new notification arrive and needs users attention.
 */
function blink(color) {
	var bar = document.getElementById("topbar");
	bar.style.backgroundColor=color;
	setTimeout(function(){bar.style.removeProperty("background-color");}, 500);
}

/**
 * Switch the homepage. Called when user pressed the navigation bar. Also change the color of the tabs.
 */
function navigate(which) {
	page.removeAttribute("style");
	page.getElementsByTagName("span")[0].removeAttribute("style");
	var page_icon = page.getElementsByTagName("img")[0];
	page_icon.src = page_icon.src.split("_")[0]+".png";

	which.style.backgroundColor="white";
	which.style.zIndex="1";
	which.getElementsByTagName("span")[0].style.color="#ff5050";
	var icon = which.getElementsByTagName("img")[0];
	icon.src = icon.src.split(".")[0]+"_red.png";
	page=which;
	toPage(parseInt(which.id[3]));
}

/**
 * Switch the news pages. Called when user pressed the news tabs.
 */
function news(which) {
	newsTab.removeAttribute("style");
	which.style.backgroundColor=newsTabColor[parseInt(which.id.substring(4,5))];
	newsTab=which;
	document.getElementById("pageFrame").style.transform="translate3d(-"+which.id.substring(4,5)*12.5+"%, 0, 0)";
}

/**
 * Expand details of a game. Expose the play button.
 */
function gameDetail(game){
	game.className=game.className.split(" ")[0]+" tileActive";
	game.getElementsByTagName("button")[0].className="redbutton tileIB tileAB";
	var detail = document.getElementById(game.id+"Detail");
	detail.style.visibility="visible";
	detail.style.opacity="1.0";
	document.getElementById("tileBlocker").style.zIndex="1";
	expanded = game;
}

/**
 * Collapse the game detail.
 */
function gameCollapse(){
	game=expanded;
	game.getElementsByTagName("button")[0].className="redbutton tileIB";
	document.getElementById(game.id+"Detail").removeAttribute("style");
	setTimeout(function(){game.className=game.className.split(" ")[0];
		document.getElementById("tileBlocker").removeAttribute("style");}, 300);
}

/**
 * Inner routine. move to a homepage. 
 */
function toPage(which){
	var frame = document.getElementById("root");
	frame.style.marginLeft=(-which*100).toString()+"%";
	last = wrapper;
	wrapper = which;
}

/**
 * Switch the message pages. Called when user pressed the tabs in the message homepage.
 */
function msgPage(which){
	msgTab.removeAttribute("style");
	which.style.backgroundColor="#ff5050";
	msgTab = which;
	document.getElementById("msgPageFrame").style.transform="translate3d(-"+which.id.substring(3,4)*25+"%, 0, 0)";
}

/**
 * Called when user press the send button in a chatting page (general or private). Grab the content and pass to post.
 */
function send(which){
	if (chats[which]){
		if (which == 0){
			var bar = 0;
		}else{
			var bar = 1
		}
		var content = document.getElementsByClassName("inputBar")[bar].getElementsByTagName("textarea")[0];
		if (content.value != ""){
			post (chats[which], content.value);
			content.value = "";
		}
	}
	
}

/**
 * Used for debugging and presentation. The message appear as if someone else posted it. If well used could simulate a conversation.
 */
function othersSend(which, what, who){
	if (chats[which]){
		if (what != ""){
			post (chats[which], what, who);
		}
	}
	if ((which != 0)&&(privatePage != msgTab || which != private)){
		people[which-1].style.backgroundColor="#ffffcc";
	}
}

/**
 * Inner routine. Does most of the work for putting a message on the chatting screen. Prints the current time. 
 */
function post(where, what, who){
	who = who || 'Me';
	var speech = document.createElement("DIV");
	var avatar = document.createElement("IMG");
	var name = document.createElement("SPAN");
	var timeStamp = document.createElement("SPAN");
	var content = document.createElement("DIV");
	var sentence = document.createElement("DIV");

	if (who == 'Me'){
		speech.className = "msgRight";
		avatar.src="./src/avatar.png";
	}else{
		speech.className = "msgLeft";
		avatar.src="./src/avatar.png";
	}
	name.innerHTML = who;
	timeStamp.innerHTML = time;
	sentence.innerHTML = what;

	speech.appendChild(avatar);
	speech.appendChild(name);
	content.appendChild(sentence);
	content.appendChild(timeStamp);
	speech.appendChild(content);
	where.appendChild(speech);

	where.scrollTop = where.scrollHeight;
	where.style.removeProperty("background-image");
}

/**
 * Used when user press the 4 buttons in a game detail. Detect which button is pressed and perform corresponding task.
 */
function gBtn(which, where){
	if (which==1){ // cancel
		gameCollapse();
	}else{
		var panel = document.getElementById(where).getElementsByTagName("div");

		if (which==2){ //how to play
			panel[0].removeAttribute("style");
			panel[1].style.display="none";

		}else if (which==3){  //leaderboard
			panel[1].removeAttribute("style");
			panel[0].style.display="none";
		}
	}
}


function toSettings(){
	toPage(7);
	document.getElementById("topbar").style.transform="translate3d(0, 0, 0)";
	document.getElementById("baravatar").getElementsByTagName("div")[0].style.transform="scale3d(0.6, 0.6, 1)";
	document.getElementById("navigation").style.display="none";
}
function leaveSettings(){
	toPage(last);
	document.getElementById("topbar").style.removeProperty("transform");
	setTimeout(function(){document.getElementById("baravatar").getElementsByTagName("div")[0].style.removeProperty("transform");},500);
	document.getElementById("navigation").style.display="block";
}

function toPrivate(who){
	chats[private].style.display="none";
	chats[who].style.display="block";
	private = who;
	msgPage(privatePage);
	document.getElementById("privateSend").onclick = function(){send(who)};
	people[who-1].style.removeProperty("background-color");
}

function updateTimeLeft(){
	var start = stops.indexOf(loc.id)
	var end = stops.indexOf(destin.id)
	if (start > end){
		end = [start, start = end][0]; // Swap value
	}
	timeleft = stopTime.slice(start, end).reduce(function(a,b){return a+b}, 0);
	document.getElementById("timeleft").innerHTML= (timeleft).toString();
}

function delay(where, length, why, whereStr, lengthStr){
	whereStr = whereStr || where+" Station";
	lengthStr = lengthStr || length.toString()+" min";
	var at = stops.indexOf(where);
	if (at<0){
		return;
	}
	stopTime[at] += length;

	var noti = document.createElement("DIV");
	noti.innerHTML = why+"<br/>";
	var i_place = document.createElement("IMG");
	i_place.src="./src/icon/location_h.png";
	var s_place = document.createElement("SPAN");
	s_place.innerHTML = whereStr;
	var i_time = document.createElement("IMG");
	i_time.src = "./src/icon/delay_red.png";
	var s_time = document.createElement("SPAN");
	s_time.innerHTML = lengthStr;

	noti.appendChild(i_place);
	noti.appendChild(s_place);
	noti.appendChild(i_time);
	noti.appendChild(s_time);
	var refNode = document.getElementById("recentHeader");
	refNode.parentNode.insertBefore(noti,refNode.nextSibling);

	var start = stops.indexOf(loc.id)
	var end = stops.indexOf(destin.id)
	if (document.getElementById("timeleft").innerHTML != "--"){
		if ((at>=start&&at<=end) || (at>=end&&at<=start)){
			updateTimeLeft();
			noti.style.backgroundColor="#ffffcc";
			notify("Delay: <b>"+whereStr+"<br/></b>Length: <b>"+lengthStr+"</b>", 2, 5500);
		}
	}
}
function removeDelay(){

}

function notify(what, blinkTimes, length){
	var notification = document.getElementById("notify");
	var original = document.getElementById("todest");
	notification.innerHTML = what;
	notification.style.opacity = 1;
	original.style.opacity = 0;

	blink("#ffcc00");
	for (j=1;j<blinkTimes;j++){
		setTimeout(function(){blink("#ffcc00");}, 1000*j);
	}
	setTimeout(function(){notification.style.opacity=0;original.style.opacity=1},length);
}