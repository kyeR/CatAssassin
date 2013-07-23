// *********************************************
// 			GameEnvironment
// *********************************************
// Contains settings and initialization methods
// for the general game environment.

var GameEnvironment = function() {

	// Game Settings
	var GAME_WIDTH	       = 700;
	var GAME_HEIGHT	       = 500;
	var REFRESH_RATE       = 30;
	var FOREGROUND_IMAGE   = "images/grass.png";
	var MIDDLEGROUND_IMAGE = "images/plants.png";
	var BACKGROUND_IMAGE   = "images/stars.png";

	// Player Settings
	var PLAYER_HEIGHT      = 48;
	var PLAYER_WIDTH       = 75;
	var playerAnimations = {
		idle: new $.gQ.Animation({
			imageURL: "images/CatGunIdle.png", 
			numberOfFrame:8, 
			delta:97, 
			rate:100, 
			type:$.gQ.ANIMATION_HORIZONTAL
		}),
		walkRight: new $.gQ.Animation({
			imageURL: "images/CatGunWalkRight.png", 
			numberOfFrame:8, 
			delta:96, 
			rate:100, 
			type:$.gQ.ANIMATION_HORIZONTAL
		}),
		walkLeft: new $.gQ.Animation({
			imageURL: "images/CatGunWalkLeft.png", 
			numberOfFrame:8, 
			delta:96, 
			rate:100, 
			type:$.gQ.ANIMATION_HORIZONTAL
		})
	};

	var weaponAnimations = {
		fireRight: new $.gQ.Animation({
			imageURL:"images/player_missile_right.png",
			numberOfFrame: 6,
			delta: 10,
			rate: 90,
			type: $.gQ.ANIMATION_VERTICAL
		}),
		fireLeft: new $.gQ.Animation({
			imageURL:"images/player_missile_left.png",
			numberOfFrame: 6,
			delta: 10,
			rate: 90,
			type: $.gQ.ANIMATION_VERTICAL
		})
	};


	// Methods
	var getHeight = function() {
		return GAME_HEIGHT;
	};
	
	var getWidth = function() {
		return GAME_WIDTH;
	}
	
	var getRefreshRate = function() {
		return REFRESH_RATE;
	}

	var initGame = function() {
		Playground.init(GAME_HEIGHT, GAME_WIDTH);
		Playground.setupScenery(FOREGROUND_IMAGE, MIDDLEGROUND_IMAGE, BACKGROUND_IMAGE);
		Player.init(PLAYER_HEIGHT, PLAYER_WIDTH, playerAnimations, weaponAnimations);
		Playground.setupPlayer();
		initializeStartButton();

	};
	
	var initializeStartButton = function() {
		$("#startbutton").click(function(){
		$.playground().startGame(function(){
			$("#welcomeScreen").fadeTo(1000,0,function(){$(this).remove();});
		});
	});
	};
	
	return {
		// Public methods
		initGame: initGame,
		getHeight: getHeight,
		getWidth: getWidth,
		getRefreshRate: getRefreshRate
	};

}();

var Playground = function(){

	var actorGroupSetup = false;
	var playground;

	var PLAYGROUND_ID = "#playground";
	var WEAPON_LAYER = "playerWeaponLayer";

	// Sprite names
	var BACKGROUND_SPRITE_1   = "background1";
	var BACKGROUND_SPRITE_2   = "background2";
	var MIDDLEGROUND_SPRITE_1 = "middleground1";
	var MIDDLEGROUND_SPRITE_2 = "middleground2";
	var FOREGROUND_SPRITE_1   = "foreground1";
	var FOREGROUND_SPRITE_2   = "foreground2";
	var BACKGROUND_SPEED      = 1;
	var MIDDLEGROUND_SPEED	  = 3;
	var FOREGROUND_SPEED      = 4;

	// Size defaults
	var playgroundHeight = 500;
	var playgroundWidth  = 700;

	var init = function(gameHeight, gameWidth) {
		$(PLAYGROUND_ID).playground({height: gameHeight, width: gameWidth, keyTracker: true});
		playgroundHeight = gameHeight;
		playgroundWidth = gameWidth;
	};

	var setupScenery = function(foregroundImage, middlegroundImage, backgroundImage) {
		var background = new $.gQ.Animation({imageURL: backgroundImage});
		var middleground = new $.gQ.Animation({imageURL: middlegroundImage});
		var foreground = new $.gQ.Animation({imageURL: foregroundImage});

		playground = $.playground().addGroup("scenery", {width: playgroundWidth, height: playgroundHeight})
			.addSprite(BACKGROUND_SPRITE_1, {animation: background, width: playgroundWidth, height: playgroundHeight})
			.addSprite(BACKGROUND_SPRITE_2, {animation: background, width: playgroundWidth, height: playgroundHeight, posx: playgroundWidth})
			.addSprite(MIDDLEGROUND_SPRITE_1, {animation: middleground, width: playgroundWidth, height: playgroundHeight})
			.addSprite(MIDDLEGROUND_SPRITE_2, {animation: middleground, width: playgroundWidth, height: playgroundHeight, posx: playgroundWidth})
			.addSprite(FOREGROUND_SPRITE_1, {animation: foreground, width: playgroundWidth, height: playgroundHeight})
			.addSprite(FOREGROUND_SPRITE_2, {animation: foreground, width: playgroundWidth, height: playgroundHeight, posx: playgroundWidth})
			.end();
	};

	var setupPlayer = function() {
		if (!actorGroupSetup) {
			playground.addGroup("actors", {width: playgroundWidth, height: playgroundHeight});
		}

		var groupSettings = {
			posx: playgroundWidth/2, 
			posy: playgroundHeight/2, 
			width: Player.getWidth(), 
			height: Player.getHeight()
		};

		var idleSettings = {
			animation: Player.getIdleAnimation(), 
			posx: 0, 
			posy: 0, 
			width: Player.getWidth(), 
			height: Player.getHeight()
		};

		var walkRightSettings = {
			posx: 0, 
			posy: 0, 
			width: Player.getWidth(), 
			height: Player.getHeight()
		};

		var walkLeftSettings = {
			posx: 0, 
			posy:0, 
			width: Player.getWidth(), 
			height: Player.getHeight()
		};

		playground = playground.addGroup("player", groupSettings)
			.addSprite(Player.getIdleSprite(), idleSettings)
			.addSprite(Player.getWalkRightSprite, walkRightSettings)
			.addSprite(Player.getWalkLeftSprite, walkLeftSettings).end();

		if (actorGroupSetup) {
			playground = playground.end();
		}

		playground.addGroup(WEAPON_LAYER,
			{
				width: playgroundWidth,
				height: playgroundHeight
			}).end();
	};

	var getWeaponLayer = function(){
		return WEAPON_LAYER;
	};


	var scrollScenery = function() {
		var bg1 = "#" + BACKGROUND_SPRITE_1;
		var bg2 = "#" + BACKGROUND_SPRITE_2;
		var mg1 = "#" + MIDDLEGROUND_SPRITE_1;
		var mg2 = "#" + MIDDLEGROUND_SPRITE_2;
		var fg1 = "#" + FOREGROUND_SPRITE_1;
		var fg2 = "#" + FOREGROUND_SPRITE_2;

		var newPos = (parseInt($(bg1).x()) - BACKGROUND_SPEED - playgroundWidth)
                                  % (-2 * playgroundWidth) + playgroundWidth;

        $(bg1).x(newPos);

        newPos = (parseInt($(bg2).x()) - 1 - playgroundWidth)
                             % (-2 * playgroundWidth) + playgroundWidth;

        $(bg2).x(newPos);

        newPos = (parseInt($(mg1).x()) - 3 - playgroundWidth)
                             % (-2 * playgroundWidth) + playgroundWidth;

        $(mg1).x(newPos);

        newPos = (parseInt($(mg2).x()) - 3 - playgroundWidth)
                             % (-2 * playgroundWidth) + playgroundWidth;

        $(mg2).x(newPos);

        newPos = (parseInt($(fg1).x()) - 4 - playgroundWidth)
                             % (-2 * playgroundWidth) + playgroundWidth;

        $(fg1).x(newPos);

        newPos = (parseInt($(fg2).x()) - 4 - playgroundWidth)
                             % (-2 * playgroundWidth) + playgroundWidth;

        $(fg2).x(newPos);
	};

	var topOfMoveableArea = function() {
		return 270;
	};

	var scrollingPoint = function() {
		return 270;
	}

	return {
		init: init,
		setupScenery: setupScenery,
		setupPlayer: setupPlayer,
		scrollScenery: scrollScenery,
		topOfMoveableArea: topOfMoveableArea,
		scrollingPoint: scrollingPoint,
		getWeaponLayer: getWeaponLayer
	};
}();


var Player = function () {
	var PLAYER_ID         = "#player";
	var IDLE_SPRITE 	  = "playerIdle";
	var WALK_RIGHT_SPRITE = "playerWalkRight";
	var WALK_LEFT_SPRITE  = "playerWalkLeft";

	var playerHeight;
	var playerWidth;
	var idleAnimation;
	var walkRightAnimation;
	var walkLeftAnimation;
	var weapon;
	var idle = false;
	var facingLeft = false;

	var init = function(height, width, playerAnimations, weaponAnimations) {
		playerHeight = height;
		playerWidth = width;	
		idleAnimation = playerAnimations.idle;
		walkRightAnimation = playerAnimations.walkRight;
		walkLeftAnimation = playerAnimations.walkLeft;
		PlayerWeapon.init(weaponAnimations);
		weapon = PlayerWeapon;
	};
	
	var getHeight = function() {
		return playerHeight;
	};
	
	var getWidth = function(){
		return playerWidth;
	};

	var getWeapon = function(){
		return weapon;
	};
	
	var getIdleAnimation = function(){
		return idleAnimation;
	};

	var getIdleSprite = function() {
		return IDLE_SPRITE;
	};

	var getWalkRightSprite = function() {
		return WALK_RIGHT_SPRITE;
	};
	
	var getWalkLeftSprite = function() {
		return WALK_LEFT_SPRITE;
	};

	var animateIdle = function() {
		$("#" + WALK_RIGHT_SPRITE).setAnimation();
		$("#" + WALK_LEFT_SPRITE).setAnimation();
		$("#" + IDLE_SPRITE).setAnimation(idleAnimation);
		idle = true;
		facingLeft = false;
	}
	
	var animateWalkingRight = function() {
		$("#" + IDLE_SPRITE).setAnimation();
		$("#" + WALK_LEFT_SPRITE).setAnimation();
		$("#" + WALK_RIGHT_SPRITE).setAnimation(walkRightAnimation);
		idle = false;
		facingLeft = false;
	}
	
	var animateWalkingLeft = function() {
		$("#" + IDLE_SPRITE).setAnimation();
		$("#" + WALK_RIGHT_SPRITE).setAnimation();
		$("#" + WALK_LEFT_SPRITE).setAnimation(walkLeftAnimation);
		idle = false;
		facingLeft = true;
	}
	
	var moveUp = function() {
		var nextpos = $(PLAYER_ID).y()-2;
		if(nextpos > 0 && nextpos >= Playground.topOfMoveableArea()){
			$(PLAYER_ID).y(nextpos);
		};
	};
	
	var moveLeft = function() {
		var nextpos = $(PLAYER_ID).x()-4;
		if(nextpos > 0){
			$(PLAYER_ID).x(nextpos);
		};
	};
	
	var moveDown = function() {
		var nextpos = $(PLAYER_ID).y()+2;
		if(nextpos < GameEnvironment.getHeight() - 30){
			$(PLAYER_ID).y(nextpos);
		};
	};

	var moveRight = function() {
		var nextpos = $(PLAYER_ID).x() + getForwardSpeed();
		if(nextpos < GameEnvironment.getWidth() - 30){
			$(PLAYER_ID).x(nextpos);
		};
	};

	var isIdle = function() {
		return idle;
	};

	var isAdvancing = function() {
		return ($(PLAYER_ID).x() > Playground.scrollingPoint())
			&& !isIdle();
	};

	var getForwardSpeed = function() {
		return isAdvancing() ? 1 : 4;
	};

	var setStartingPosition = function() {
		$(PLAYER_ID).x(90);
		$(PLAYER_ID).y(343);	
	};

	var xPosition = function(){
		return $("#player").x();
	};

	var yPosition = function(){
		return $("#player").y();
	};

	var isFacingLeft = function(){
		return facingLeft;
	};

	var fireWeapon = function(){
		weapon.fire();
	};
	
	return {
		// Public
		init: init,
		getHeight: getHeight,
		getWidth: getWidth,
		getWeapon: getWeapon,
		getIdleAnimation: getIdleAnimation,
		getIdleSprite: getIdleSprite,
		getWalkRightSprite: getWalkRightSprite,
		getWalkLeftSprite: getWalkLeftSprite,
		animateIdle: animateIdle,
		animateWalkingRight: animateWalkingRight,
		animateWalkingLeft: animateWalkingLeft,
		moveRight: moveRight,
		moveUp: moveUp,
		moveLeft: moveLeft,
		moveDown: moveDown,
		isIdle: isIdle,
		isAdvancing: isAdvancing,
		xPosition: xPosition,
		yPosition: yPosition,
		setStartingPosition: setStartingPosition,
		fireWeapon: fireWeapon,
		isFacingLeft: isFacingLeft
	};
}();

var PlayerWeapon = function(){
	var fireLeftAnimation;
	var fireRightAnimation;
	var attackRightName = "attackRight";
	var attackLeftName = "attackLeft";
	var weaponLayer;

	var init = function(animations){
		fireLeftAnimation = animations.fireLeft;
		fireRightAnimation = animations.fireRight;
		weaponLayer = "#" + Playground.getWeaponLayer();
	};

	var fire = function(){
		var name = "playerAttack_"+Math.ceil(Math.random()*1000);
		if (Player.isFacingLeft()){
			fireLeft(name);
		}
		else {
			fireRight(name);
		}
	};

	var fireRight = function(attackName) {
		$(weaponLayer).addSprite(attackName,
			{
				animation: fireRightAnimation,
				posx: Player.xPosition() + 70,
				posy: Player.yPosition() + 22,
				width: 36,
				height: 10
			});

		$("#" + attackName).addClass(attackRightName);
	};

	var fireLeft = function(attackName){
		$(weaponLayer).addSprite(attackName,
			{
				animation: fireLeftAnimation,
				posx: Player.xPosition() - 20,
				posy: Player.yPosition() + 22,
				width: 36,
				height: 10
			});
		$("#" + attackName).addClass(attackLeftName);
	};

	var getAttackRightName = function(){
		return attackRightName;
	};

	var getAttackLeftName = function(){
		return attackLeftName;
	};

	return {
		init: init,
		fire: fire,
		getAttackLeftName: getAttackLeftName,
		getAttackRightName: getAttackRightName
	};
}();











