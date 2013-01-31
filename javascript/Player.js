// *********************************************
// 			        Player
// *********************************************
// Contains settings and animations for the player
// character.

var Player = function () {

	var PLAYER_HEIGHT       = 48;
	var PLAYER_WIDTH        = 75;
	
		// Player animations
	var idleAnimation = new $.gQ.Animation({imageURL: "CatGunIdle.png", numberOfFrame:8, delta:97, rate:100, type:$.gQ.ANIMATION_HORIZONTAL});
	var walkRightAnimation = new $.gQ.Animation({imageURL: "CatGunWalkRight.png", numberOfFrame:8, delta:96, rate:100, type:$.gQ.ANIMATION_HORIZONTAL});
	
	var getPlayerHeight = function() {
		return PLAYER_HEIGHT;
	};
	
	var getPlayerWidth = function(){
		return PLAYER_WIDTH;
	};
	
	var getIdleAnimation = function(){
		return idleAnimation;
	};
	
	var getWalkingRightAnimation = function(){
		return walkRightAnimation;
	}
	
	
	return {
		// Public
		getPlayerHeight: getPlayerHeight,
		getPlayerWidth: getPlayerWidth,
		getIdleAnimation: getIdleAnimation,
		getWalkingRightAnimation: getWalkingRightAnimation
		};
}();