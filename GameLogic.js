



//Game objects:
// function Player(node){

	//this.node = node;

// }



/*
************** Main ******************
*/
$(function(){

	GameEnvironment.initializePlayground();
	
	GameEnvironment.initializeGraphics();
	
	GameEnvironment.initializeStartButton();
	
	//$("#player")[0].player = new Player($("#player"));
	$("#player")[0].player = Player;

		// this is the function that control most of the game logic 
	$.playground().registerCallback(function(){
			//Update the movement of the player:
			//$("#player")[0].player.update();
			if(jQuery.gameQuery.keyTracker[65]){ //this is left! (a)
				var nextpos = $("#player").x()-5;
				if(nextpos > 0){
					$("#player").x(nextpos);
				}
			}
			if(jQuery.gameQuery.keyTracker[68]){ //this is right! (d)
				var nextpos = $("#player").x()+5;
				if(nextpos < GameEnvironment.getPlaygroundWidth() - 30){
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
	var keyPressed = false;
		//this is where the keybinding occurs
	$(document).keydown(function(e){
		
		switch(e.keyCode){
			// case 75: //this is shoot (k)
				//shoot missile here
				// var playerposx = $("#player").x();
				// var playerposy = $("#player").y();
				// var name = "playerMissle_"+Math.ceil(Math.random()*1000);
				// $("#playerMissileLayer").addSprite(name,{animation: missile["player"], posx: playerposx + 90, posy: playerposy + 14, width: 36,height: 10});
				// $("#"+name).addClass("playerMissiles")
				// break;
			case 65: //this is left! (a)
				break;
			case 87: //this is up! (w)
				break;
			case 68: //this is right (d)
				if (keyPressed)
					return;
				keyPressed = true;
				$("#playerIdle").setAnimation();
				$("#playerWalkRight").setAnimation(Player.getWalkingRightAnimation());
				break;
			case 83: //this is down! (s)
				break;
			}
	});
	//this is where the keybinding occurs
	$(document).keyup(function(e){
		switch(e.keyCode){
			case 65: //this is left! (a)
				break;
			case 87: //this is up! (w)
				break;
			case 68: //this is right (d)
				keyPressed = false;
				$("#playerWalkRight").setAnimation();
				$("#playerIdle").setAnimation(Player.getIdleAnimation());
				break;
			case 83: //this is down! (s)
				break;
		}
	});
});