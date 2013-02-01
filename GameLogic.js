//******************************************************
//                                                     *
//                     Main                            *
//                                                     *
//******************************************************
$(function(){

	GameEnvironment.initializePlayground();
	
	GameEnvironment.initializeGraphics();
	
	GameEnvironment.initializeStartButton();

	// this is the function that controls most of the game logic 
	$.playground().registerCallback(function(){
			//Update the movement of the player:
			if(jQuery.gameQuery.keyTracker[65]){ //this is left (a)
				Player.moveLeft();
			}
			if(jQuery.gameQuery.keyTracker[68]){ //this is right (d)
				Player.moveRight();
			}
			if(jQuery.gameQuery.keyTracker[87]){ //this is up (w)
				Player.moveUp();
			}
			if(jQuery.gameQuery.keyTracker[83]){ //this is down (s)
				Player.moveDown();
			}
	}, GameEnvironment.getRefreshRate());
	
	
	var keyHeldDown = false;
	
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
				if (keyHeldDown)
					return;
				keyHeldDown = true;
				Player.animateWalkingRight();
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
				keyHeldDown = false;
				Player.animateIdle();
				break;
			case 83: //this is down! (s)
				break;
		}
	});
});