// *********************************************
// 			GameEnvironment
// *********************************************
// Contains settings and initialization methods
// for the general game environment including
// background, player, and character images and
// animations.
var GameEnvironment = function() {

	// Constants
	var PLAYGROUND_WIDTH	= 700;
	var PLAYGROUND_HEIGHT	= 500;
	var REFRESH_RATE        = 15;
	var PLAYER_HEIGHT       = 32;
	var PLAYER_WIDTH        = 60;

	// Background animations
	var background1 = new $.gQ.Animation({imageURL: "background1.png"});
	var background2 = new $.gQ.Animation({imageURL: "background1.png"});
	
	// Player animations
	var playerAnimation = new Array();
	playerAnimation["idle"] = new $.gQ.Animation({imageURL: "CatGunIdle.png", numberOfFrame:8, delta:64, rate:100, type:$.gQ.ANIMATION_HORIZONTAL});
	
	// Methods
	var getPlaygroundHeight = function() {
		return PLAYGROUND_HEIGHT;
	};
	
	var getPlaygroundWidth = function() {
		return PLAYGROUND_WIDTH;
	}
	
	var getRefreshRate = function() {
		return REFRESH_RATE;
	}
	
	var initializePlayground = function() {
		$("#playground").playground({height: PLAYGROUND_HEIGHT, width: PLAYGROUND_WIDTH, keyTracker: true});
	};
	
	var initializeGraphics = function() {
		$.playground().addGroup("background", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT})
				.addSprite("background1", {animation: background1, width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT})
				.addSprite("background2", {animation: background2, width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT, posx: PLAYGROUND_WIDTH})
				.end()
			.addGroup("actors", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT})
			.addGroup("player", {posx: PLAYGROUND_WIDTH/2, posy: PLAYGROUND_HEIGHT/2, width: PLAYER_WIDTH, height: PLAYER_HEIGHT})
				.addSprite("playerIdle",{animation: playerAnimation["idle"], posx: 0, posy: 0, width: PLAYER_WIDTH, height: PLAYER_HEIGHT});
	};
	
	var initializeStartButton = function() {
		$("#startbutton").click(function(){
		$.playground().startGame(function(){
			$("#welcomeScreen").fadeTo(1000,0,function(){$(this).remove();});
		});
	});
	};
	
	return {
		// Object literal containing publicly exposed methods
		initializePlayground: initializePlayground,
		initializeGraphics: initializeGraphics,
		initializeStartButton: initializeStartButton,
		getPlaygroundHeight: getPlaygroundHeight,
		getPlaygroundWidth: getPlaygroundWidth,
		getRefreshRate: getRefreshRate
	};

}();