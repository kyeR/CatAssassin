

var playerAnimation = new Array();

// Game objects:
function Player(node){

	//this.node = node;

}



/*
************** Main ******************
*/
$(function(){
	
	playerAnimation["idle"] = new $.gQ.Animation({imageURL: "CatGunIdle.png", numberOfFrame:8, delta:64, rate:100, type:$.gQ.ANIMATION_HORIZONTAL});
	
	GameEnvironment.initializePlayground();
	
	GameEnvironment.initializeBackground();
	

			
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
				if(nextpos < GameEnvironment.getPlaygroundWidth() - 100){
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
				if(nextpos < GameEnvironment.getPlaygroundHeight() - 30){
					$("#player").y(nextpos);
				}
			}
	}, GameEnvironment.getRefreshRate());
	
	// This is for the background animation
	// $.playground().registerCallback(function(){
		// Offset all the pane:
		// var newPos = ($("#background1").x() - cloudSpeed - PLAYGROUND_WIDTH) % (-2 * PLAYGROUND_WIDTH) + PLAYGROUND_WIDTH;
		// $("#background1").x(newPos);
		
		// newPos = ($("#background2").x() - cloudSpeed - PLAYGROUND_WIDTH) % (-2 * PLAYGROUND_WIDTH) + PLAYGROUND_WIDTH;
		// $("#background2").x(newPos);
	
	// }, REFRESH_RATE);

});