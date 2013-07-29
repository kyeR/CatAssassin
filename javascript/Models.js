var PlaygroundModel = function(){

	var GAME_WIDTH	           = 700;
	var GAME_HEIGHT	           = 500;
	var REFRESH_RATE           = 30;
	var PLAYGROUND_ID	       = "#playground";
	var WEAPON_LAYER           = "playerWeaponLayer";
	var ACTORS_LAYER           = "actors";
	var SCROLLING_POINT        = 270;
	var HIGHEST_MOVEABLE_POINT = 270;
	var ENEMY_CLASS		       = "enemy";

	var gameHeight = function(){
		return GAME_HEIGHT;
	};

	var gameWidth = function(){
		return GAME_WIDTH;
	};

	var refreshRate = function(){
		return REFRESH_RATE;
	};

	var playgroundId = function(){
		return PLAYGROUND_ID;
	};

	var weaponLayer = function(){
		return WEAPON_LAYER;
	};

	var scrollingPoint = function(){
		return SCROLLING_POINT;
	};

	var highestMoveablePoint = function(){
		return HIGHEST_MOVEABLE_POINT;
	};

	var enemyClass = function(){
		return ENEMY_CLASS;
	};

	var actorsLayer = function(){
		return ACTORS_LAYER;
	};

	return {
		gameHeight: gameHeight,
		gameWidth: gameWidth,
		refreshRate: refreshRate,
		playgroundId: playgroundId,
		weaponLayer: weaponLayer,
		scrollingPoint: scrollingPoint,
		highestMoveablePoint: highestMoveablePoint,
		enemyClass: enemyClass,
		actorsLayer: actorsLayer
	};
}();

var SceneryModel = function(){

	var FOREGROUND_IMAGE       = spriteFolder + "/grass.png";
	var MIDDLEGROUND_IMAGE     = spriteFolder + "/plants.png";
	var BACKGROUND_IMAGE       = spriteFolder + "/stars.png";
	var BACKGROUND_SPEED       = 1;
	var MIDDLEGROUND_SPEED	   = 3;
	var FOREGROUND_SPEED       = 4;
	var FOREGROUND_ANIMATION   = new $.gQ.Animation({imageURL: FOREGROUND_IMAGE});
	var MIDDLEGROUND_ANIMATION = new $.gQ.Animation({imageURL: MIDDLEGROUND_IMAGE});
	var BACKGROUND_ANIMATION   = new $.gQ.Animation({imageURL: BACKGROUND_IMAGE});

	// Node names
	var BACKGROUND_SPRITE_1   = "background1";
	var BACKGROUND_SPRITE_2   = "background2";
	var MIDDLEGROUND_SPRITE_1 = "middleground1";
	var MIDDLEGROUND_SPRITE_2 = "middleground2";
	var FOREGROUND_SPRITE_1   = "foreground1";
	var FOREGROUND_SPRITE_2   = "foreground2";

	var foregroundAnimation = function(){
		return FOREGROUND_ANIMATION;
	};

	var middlegroundAnimation = function(){
		return MIDDLEGROUND_ANIMATION;	
	};

	var backgroundAnimation = function(){
		return BACKGROUND_ANIMATION;	
	};

	var foregroundSpeed = function(){
		return FOREGROUND_SPEED;
	};

	var middlegroundSpeed = function(){
		return MIDDLEGROUND_SPEED;
	};

	var backgroundSpeed = function(){
		return BACKGROUND_SPEED;
	};

	var backgroundSprite1 = function(){
		return BACKGROUND_SPRITE_1;
	};

	var backgroundSprite2 = function(){
		return BACKGROUND_SPRITE_2;
	};

	var middlegroundSprite1 = function(){
		return MIDDLEGROUND_SPRITE_1;
	};

	var middlegroundSprite2 = function(){
		return MIDDLEGROUND_SPRITE_2;
	};

	var foregroundSprite1 = function(){
		return FOREGROUND_SPRITE_1;
	};

	var foregroundSprite2 = function(){
		return FOREGROUND_SPRITE_2;
	};

	var backgroundSpriteIds = function(){
		return {
			bg1: "#" + BACKGROUND_SPRITE_1,
			bg2: "#" + BACKGROUND_SPRITE_2,
			mg1: "#" + MIDDLEGROUND_SPRITE_1,
			mg2: "#" + MIDDLEGROUND_SPRITE_2,
			fg1: "#" + FOREGROUND_SPRITE_1,
			fg2: "#" + FOREGROUND_SPRITE_2
		};
	};

	return {
		foregroundAnimation: foregroundAnimation,
		middlegroundAnimation: middlegroundAnimation,
		backgroundAnimation: backgroundAnimation,
		foregroundSpeed: foregroundSpeed,
		middlegroundSpeed: middlegroundSpeed,
		backgroundSpeed: backgroundSpeed,
		foregroundSprite1: foregroundSprite1,
		foregroundSprite2: foregroundSprite2,
		middlegroundSprite1: middlegroundSprite1,
		middlegroundSprite2: middlegroundSprite2,
		backgroundSprite1: backgroundSprite1,
		backgroundSprite2: backgroundSprite2,
		backgroundSpriteIds: backgroundSpriteIds
	};
}();

var ControlsModel = function(){
	var UP_KEY = 87;
	var DOWN_KEY = 83;
	var LEFT_KEY = 65;
	var RIGHT_KEY = 68;
	var SHOOT_KEY = 75;

	var upKey = function(){
		return UP_KEY;
	};

	var downKey = function(){
		return DOWN_KEY;
	};

	var leftKey = function(){
		return LEFT_KEY;
	};

	var rightKey = function(){
		return RIGHT_KEY;
	};

	var shootKey = function(){
		return SHOOT_KEY;
	};

	return {
		upKey: upKey,
		downKey: downKey,
		rightKey: rightKey,
		leftKey: leftKey,
		shootKey: shootKey
	};
}();

var PlayerModel = function () {

	var PLAYER_HEIGHT      = 48;
	var PLAYER_WIDTH       = 70;
	var PLAYER_ID         = "#player";
	var IDLE_SPRITE 	  = "playerIdle";
	var WALK_RIGHT_SPRITE = "playerWalkRight";
	var WALK_LEFT_SPRITE  = "playerWalkLeft";
	var DIE_SPRITE        = "playerDie";

	var PLAYER_ANIMATIONS = {
		IDLE: new $.gQ.Animation({
			imageURL: spriteFolder + "/CatGunIdle.png", 
			numberOfFrame:8, 
			delta:97, 
			rate:100, 
			type:$.gQ.ANIMATION_HORIZONTAL
		}),
		WALK_RIGHT: new $.gQ.Animation({
			imageURL: spriteFolder + "/CatGunWalkRight.png", 
			numberOfFrame:8, 
			delta:96, 
			rate:100, 
			type:$.gQ.ANIMATION_HORIZONTAL
		}),
		WALK_LEFT: new $.gQ.Animation({
			imageURL: spriteFolder + "/CatGunWalkLeft.png", 
			numberOfFrame:8, 
			delta:96, 
			rate:100, 
			type:$.gQ.ANIMATION_HORIZONTAL
		}),
		DIE: new $.gQ.Animation({
			imageURL: spriteFolder + "/CatDie.png", 
			numberOfFrame:7, 
			delta:100, 
			rate:100, 
			type:$.gQ.ANIMATION_HORIZONTAL | $.gQ.ANIMATION_ONCE
		})
	};

	var facingLeft = false;
	var idle = true;

	var playerHeight = function(){
		return PLAYER_HEIGHT;
	};

	var playerWidth = function(){
		return PLAYER_WIDTH;
	};

	var playerId = function(){
		return PLAYER_ID;
	};

	var idleAnimation = function(){
		return PLAYER_ANIMATIONS.IDLE;
	};

	var walkRightAnimation = function(){
		return PLAYER_ANIMATIONS.WALK_RIGHT;
	};

	var walkLeftAnimation = function(){
		return PLAYER_ANIMATIONS.WALK_LEFT;
	};

	var dieAnimation = function(){
		return PLAYER_ANIMATIONS.DIE;
	};

	var idleSpriteName = function() {
		return IDLE_SPRITE;
	};

	var walkRightSpriteName = function() {
		return WALK_RIGHT_SPRITE;
	};
	
	var walkLeftSpriteName = function() {
		return WALK_LEFT_SPRITE;
	};

	var dieSpriteName = function(){
		return DIE_SPRITE;
	};

	var isFacingLeft = function(){
		return facingLeft;
	};

	var setFacingLeft = function(value){
		facingLeft = value;
	};

	var isIdle = function(){
		return idle;
	};

	var setIdle = function(value){
		idle = value;
	};

	return {
		playerHeight: playerHeight,
		playerWidth: playerWidth,
		idleAnimation: idleAnimation,
		walkRightAnimation: walkRightAnimation,
		walkLeftAnimation: walkLeftAnimation,
		dieAnimation: dieAnimation,
		idleSpriteName: idleSpriteName,
		walkRightSpriteName: walkRightSpriteName,
		walkLeftSpriteName: walkLeftSpriteName,
		dieSpriteName: dieSpriteName,
		playerId: playerId,
		isFacingLeft: isFacingLeft,
		setFacingLeft: setFacingLeft,
		isIdle: isIdle,
		setIdle: setIdle
	};
}();

var PlayerWeaponModel = function(){

	var BULLET_SPEED       = 10;
	var BULLET_HEIGHT      = 10;
	var BULLET_WIDTH       = 36;
	var ATTACK_RIGHT_CLASS = "attackRight";
	var ATTACK_LEFT_CLASS  = "attackLeft";
	var ANIMATIONS         = {
		FIRE_RIGHT: new $.gQ.Animation({
			imageURL: spriteFolder + "/player_missile_right.png",
			numberOfFrame: 6,
			delta: 10,
			rate: 90,
			type: $.gQ.ANIMATION_VERTICAL
		}),
		FIRE_LEFT: new $.gQ.Animation({
			imageURL: spriteFolder + "/player_missile_left.png",
			numberOfFrame: 6,
			delta: 10,
			rate: 90,
			type: $.gQ.ANIMATION_VERTICAL
		})
	};

	var fireLeftAnimation = function(){
		return ANIMATIONS.FIRE_LEFT;
	};

	var fireRightAnimation = function(){
		return ANIMATIONS.FIRE_RIGHT;
	};

	var bulletSpeed = function(){
		return BULLET_SPEED;
	};

	var attackRightClass = function(){
		return ATTACK_RIGHT_CLASS;
	};

	var attackLeftClass = function(){
		return ATTACK_LEFT_CLASS;
	};

	var bulletHeight = function(){
		return BULLET_HEIGHT;
	};

	var bulletWidth = function(){
		return BULLET_WIDTH;
	};

	return {
		fireRightAnimation: fireRightAnimation,
		fireLeftAnimation: fireLeftAnimation,
		bulletSpeed: bulletSpeed,
		attackLeftClass: attackLeftClass,
		attackRightClass: attackRightClass,
		bulletHeight: bulletHeight,
		bulletWidth: bulletWidth
	};
}();

var Enemy1Model = function(){
	var HEIGHT           = 34;
	var WIDTH            = 44;
	var EXPLOSION_WIDTH  = 39;
	var EXPLOSION_HEIGHT = 40;
	var ENEMY_TYPE       = "enemy1";

	var ANIMATIONS = {
		WALKING: new $.gQ.Animation({
			imageURL: spriteFolder + "/enemy.png", 
			numberOfFrame:2, 
			delta:44, 
			rate:150, 
			type:$.gQ.ANIMATION_HORIZONTAL
		}),
		EXPLODE: new $.gQ.Animation({
			imageURL: spriteFolder + "/explosion.png", 
			numberOfFrame: 7, 
			delta: 39, 
			rate: 10, 
			type: $.gQ.ANIMATION_HORIZONTAL | $.gQ.ANIMATION_CALLBACK
		})
	};

	var getHeight = function(){
		return HEIGHT;
	};

	var getWidth = function(){
		return WIDTH;
	};

	var getExplosionHeight = function(){
		return EXPLOSION_HEIGHT;
	};

	var getExplosionWidth = function(){
		return EXPLOSION_WIDTH;
	};

	var walkingAnimation = function(){
		return ANIMATIONS.WALKING;
	};

	var explodeAnimation = function(){
		return ANIMATIONS.EXPLODE;
	};

	var getType = function(){
		return ENEMY_TYPE;
	};

	return {
		getHeight: getHeight,
		getWidth: getWidth,
		walkingAnimation: walkingAnimation,
		explodeAnimation: explodeAnimation,
		getExplosionWidth: getExplosionWidth,
		getExplosionHeight: getExplosionHeight,
		getType: getType
	};

}();