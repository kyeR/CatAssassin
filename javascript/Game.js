//******************************************************
//                                                     *
//                     Main                            *
//                                                     *
//******************************************************
$(function(){

	GameEnvironment.initGame();
	KeyBindings.registerPlayerMovementAnimations();
	Player.setStartingPosition();
	
	// Main game loop
	$.playground().registerCallback(function(){
		KeyBindings.handlePlayerMovement();
	}, GameEnvironment.getRefreshRate());
});

var KeyBindings = function(){
	//Control Settings
	var UP_KEY = 87;
	var DOWN_KEY = 83;
	var LEFT_KEY = 65;
	var RIGHT_KEY = 68;

	var downPressed = false;
	var upPressed = false;
	var leftPressed = false;
	var rightPressed = false;

	var keyPressed = function(){
		return downPressed || upPressed || leftPressed || rightPressed;
	};

	var handlePlayerMovement = function() {
		if (!keyPressed() && !Player.isIdle()){
			Player.animateIdle();
		}

		if (Player.isAdvancing()){
			Playground.scrollScenery();
		}
		
		// Update the movement of the player
		if(jQuery.gameQuery.keyTracker[LEFT_KEY]){ //this is left (a)
			Player.moveLeft();
		}
		if(jQuery.gameQuery.keyTracker[RIGHT_KEY]){ //this is right (d)
			Player.moveRight();
		}
		if(jQuery.gameQuery.keyTracker[UP_KEY]){ //this is up (w)
			Player.moveUp();
		}
		if(jQuery.gameQuery.keyTracker[DOWN_KEY]){ //this is down (s)
			Player.moveDown();
		}
	};

	var registerPlayerMovementAnimations = function() {
		// Player movement animations
		$(document).keydown(function(e){
			switch(e.keyCode){
				case LEFT_KEY: //this is left (a)
					if (leftPressed)
						return;
					leftPressed = true;
					Player.animateWalkingLeft();
					break;
				case UP_KEY: //this is up (w)
					if (upPressed)
						return;
					upPressed = true;
					Player.animateWalkingRight();
					break;
				case RIGHT_KEY: //this is right (d)
					if (rightPressed)
						return;
					rightPressed = true;
					Player.animateWalkingRight();
					break;
				case DOWN_KEY: //this is down (s)
					if (downPressed)
						return;
					downPressed = true;
					Player.animateWalkingRight();
					break;
				}
		});
		$(document).keyup(function(e){
			switch(e.keyCode){
				case LEFT_KEY: //this is left! (a)
					leftPressed = false;
					break;
				case UP_KEY: //this is up! (w)
					upPressed = false;
					break;
				case RIGHT_KEY: //this is right (d)
					rightPressed = false;
					break;
				case DOWN_KEY: //this is down! (s)
					downPressed = false;
					break;
			}
		});
	};

	return {
		handlePlayerMovement: handlePlayerMovement,
		registerPlayerMovementAnimations: registerPlayerMovementAnimations
	};
}();








