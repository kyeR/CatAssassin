// Global constants:
var PLAYGROUND_WIDTH	= 700;
var PLAYGROUND_HEIGHT	= 500;
var REFRESH_RATE		= 15;

/*Constants for the gameplay*/
var cloudSpeed    	= 1 //pixels per frame

var playerAnimation = new Array();

// Game objects:
function Player(node){

	//this.node = node;

}

/*
************** Main ******************
*/
$(function(){

	// The background:
	var background1 = new $.gQ.Animation({imageURL: "background1.png"});
	var background2 = new $.gQ.Animation({imageURL: "background1.png"});
	
	playerAnimation["idle"] = new $.gQ.Animation({imageURL: "TestCat.png"});
	
	// Initialize the game:
	$("#playground").playground({height: PLAYGROUND_HEIGHT, width: PLAYGROUND_WIDTH, keyTracker: true});
	
	// Initialize the background
	$.playground().addGroup("background", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT})
			.addSprite("background1", {animation: background1, width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT})
			.addSprite("background2", {animation: background2, width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT, posx: PLAYGROUND_WIDTH})
			.end()
		.addGroup("actors", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT})
		.addGroup("player", {posx: PLAYGROUND_WIDTH/2, posy: PLAYGROUND_HEIGHT/2, width: 100, height: 100})
			.addSprite("playerBody",{animation: playerAnimation["idle"], posx: 0, posy: 0, width: 100, height: 100});
			
	$("#player")[0].player = new Player($("#player"));
			
	//initialize the start button
	$("#startbutton").click(function(){
		$.playground().startGame(function(){
			$("#welcomeScreen").fadeTo(1000,0,function(){$(this).remove();});
		});
	})
	
		// this is the function that control most of the game logic 
	$.playground().registerCallback(function(){
			//Update the movement of the ship:
			//$("#player")[0].player.update();
			if(jQuery.gameQuery.keyTracker[65]){ //this is left! (a)
				var nextpos = $("#player").x()-5;
				if(nextpos > 0){
					$("#player").x(nextpos);
				}
			}
			if(jQuery.gameQuery.keyTracker[68]){ //this is right! (d)
				var nextpos = $("#player").x()+5;
				if(nextpos < PLAYGROUND_WIDTH - 100){
					$("#player").x(nextpos);
				}
			}
			if(jQuery.gameQuery.keyTracker[87]){ //this is up! (w)
				var nextpos = $("#player").y()-3;
				if(nextpos > 0){
					$("#player").y(nextpos);
				}
			}
			if(jQuery.gameQuery.keyTracker[83]){ //this is down! (s)
				var nextpos = $("#player").y()+3;
				if(nextpos < PLAYGROUND_HEIGHT - 30){
					$("#player").y(nextpos);
				}
			}
	}, REFRESH_RATE);
	
	// This is for the background animation
	// $.playground().registerCallback(function(){
		// Offset all the pane:
		// var newPos = ($("#background1").x() - cloudSpeed - PLAYGROUND_WIDTH) % (-2 * PLAYGROUND_WIDTH) + PLAYGROUND_WIDTH;
		// $("#background1").x(newPos);
		
		// newPos = ($("#background2").x() - cloudSpeed - PLAYGROUND_WIDTH) % (-2 * PLAYGROUND_WIDTH) + PLAYGROUND_WIDTH;
		// $("#background2").x(newPos);
	
	// }, REFRESH_RATE);

});