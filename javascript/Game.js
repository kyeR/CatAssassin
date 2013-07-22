//******************************************************
//                                                     *
//                     Main                            *
//                                                     *
//******************************************************
$(function(){

	GameEnvironment.initGame();
	KeyBindings.registerPlayerActionAnimations();
	Player.setStartingPosition();

	var BULLET_SPEED = 10;
	
	// Main game loop
	$.playground().registerCallback(function(){
		KeyBindings.handlePlayerMovement();

		//Update the movement of the missiles
		$(".playerBullets").each(function(){
				var posx = $(this).x();
				if(posx > GameEnvironment.getWidth()){
					$(this).remove();
					return;
				}
				$(this).x(BULLET_SPEED, true);
				// //Test for collisions
				// var collided = $(this).collision(".enemy,."+$.gQ.groupCssClass);
				// if(collided.length > 0){
				// 	//An enemy has been hit!
				// 	collided.each(function(){
				// 			if($(this)[0].enemy.damage()){
				// 				if(this.enemy instanceof Bossy){
				// 						$(this).setAnimation(enemies[2]["explode"], function(node){$(node).remove();});
				// 						$(this).css("width", 150);
				// 				} else if(this.enemy instanceof Brainy) {
				// 					$(this).setAnimation(enemies[1]["explode"], function(node){$(node).remove();});
				// 					$(this).css("width", 150);
				// 				} else {
				// 					$(this).setAnimation(enemies[0]["explode"], function(node){$(node).remove();});
				// 					$(this).css("width", 200);
				// 				}
				// 				$(this).removeClass("enemy");
				// 			}
				// 		})
				// 	$(this).setAnimation(missile["playerexplode"], function(node){$(node).remove();});
				// 	$(this).css("width", 38);
				// 	$(this).css("height", 23);
				// 	$(this).y(-7, true);
				// 	$(this).removeClass("playerMissiles");
				// }
			});
	}, GameEnvironment.getRefreshRate());
});

var KeyBindings = function(){
	//Control Settings
	var UP_KEY = 87;
	var DOWN_KEY = 83;
	var LEFT_KEY = 65;
	var RIGHT_KEY = 68;
	var SHOOT_KEY = 75;

	var downPressed = false;
	var upPressed = false;
	var leftPressed = false;
	var rightPressed = false;
	var shootPressed = false;
	var rapidFire;

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

	var registerPlayerActionAnimations = function() {
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
				case SHOOT_KEY: //this is shoot (k)
					if (shootPressed) {
						rapidFire = setTimeout(Player.shootBullet(), 100);
					}
					else {
						Player.shootBullet();
						shootPressed = true;
					}
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
				case SHOOT_KEY:
					clearTimeout(rapidFire);
					shootPressed = false;
					break;
			}
		});
	};

	return {
		handlePlayerMovement: handlePlayerMovement,
		registerPlayerActionAnimations: registerPlayerActionAnimations
	};
}();








