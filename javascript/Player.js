// *********************************************
//                  Player
// *********************************************

var Player = function () {

	var PLAYER_HEIGHT       = 48;
	var PLAYER_WIDTH        = 75;
	
	var isFacingRight = false;
	
	// Player animations
	var idleAnimation = new $.gQ.Animation({imageURL: "images/CatGunIdle.png", numberOfFrame:8, delta:97, rate:100, type:$.gQ.ANIMATION_HORIZONTAL});
	var walkRightAnimation = new $.gQ.Animation({imageURL: "images/CatGunWalkRight.png", numberOfFrame:8, delta:96, rate:100, type:$.gQ.ANIMATION_HORIZONTAL});
	
	var getPlayerHeight = function() {
		return PLAYER_HEIGHT;
	};
	
	var getPlayerWidth = function(){
		return PLAYER_WIDTH;
	};
	
	var getIdleAnimation = function(){
		return idleAnimation;
	};
	
	var animateIdle = function() {
		$("#" + SpriteNames.playerWalkRight).setAnimation();
		$("#" + SpriteNames.playerIdle).setAnimation(Player.getIdleAnimation());
	}
	
	var moveRight = function() {
		var nextpos = $("#player").x()+5;
		if(nextpos < GameEnvironment.getPlaygroundWidth() - 30){
			$("#player").x(nextpos);
		};
	};
	
	var animateWalkingRight = function() {
		$("#" + SpriteNames.playerIdle).setAnimation();
		$("#" + SpriteNames.playerWalkRight).setAnimation(walkRightAnimation);
	}
	
	var moveUp = function() {
		var nextpos = $("#player").y()-3;
		if(nextpos > 0){
			$("#player").y(nextpos);
		};
	};
	
	var moveLeft = function() {
		var nextpos = $("#player").x()-5;
		if(nextpos > 0){
			$("#player").x(nextpos);
		};
	};
	
	var moveDown = function() {
		var nextpos = $("#player").y()+3;
		if(nextpos < GameEnvironment.getPlaygroundHeight() - 30){
			$("#player").y(nextpos);
		};
	};
	
	
	return {
		// Public
		getPlayerHeight: getPlayerHeight,
		getPlayerWidth: getPlayerWidth,
		getIdleAnimation: getIdleAnimation,
		animateIdle: animateIdle,
		animateWalkingRight: animateWalkingRight,
		moveRight: moveRight,
		moveUp: moveUp,
		moveLeft: moveLeft,
		moveDown: moveDown
		};
}();