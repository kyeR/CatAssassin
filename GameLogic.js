// Global constants:
var PLAYGROUND_WIDTH	= 700;
var PLAYGROUND_HEIGHT	= 500;
var REFRESH_RATE		= 15;

/*Constants for the gameplay*/
var cloudSpeed    	= 1 //pixels per frame

$(function(){

	// The background:
	var background1 = new $.gQ.Animation({imageURL: "background1.png"});
	var background2 = new $.gQ.Animation({imageURL: "background1.png"});
	
	// Initialize the game:
	$("#playground").playground({height: PLAYGROUND_HEIGHT, width: PLAYGROUND_WIDTH, keyTracker: true});
	
	// Initialize the background
	$.playground().addGroup("background", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT})
			.addSprite("background1", {animation: background1, width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT})
			.addSprite("background2", {animation: background2, width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT, posx: PLAYGROUND_WIDTH});
			
	//initialize the start button
	$("#startbutton").click(function(){
		$.playground().startGame(function(){
			$("#welcomeScreen").fadeTo(1000,0,function(){$(this).remove();});
		});
	})
	
	//This is for the background animation
	$.playground().registerCallback(function(){
		//Offset all the pane:
		var newPos = ($("#background1").x() - cloudSpeed - PLAYGROUND_WIDTH) % (-2 * PLAYGROUND_WIDTH) + PLAYGROUND_WIDTH;
		$("#background1").x(newPos);
		
		newPos = ($("#background2").x() - cloudSpeed - PLAYGROUND_WIDTH) % (-2 * PLAYGROUND_WIDTH) + PLAYGROUND_WIDTH;
		$("#background2").x(newPos);
	
	}, REFRESH_RATE);
});