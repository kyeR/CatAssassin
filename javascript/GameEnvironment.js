// *********************************************
// 			GameEnvironment
// *********************************************
// Contains settings and initialization methods
// for the general game environment.

var GameEnvironment = function() {

	// Constants
	var PLAYGROUND_WIDTH	= 700;
	var PLAYGROUND_HEIGHT	= 500;
	var REFRESH_RATE        = 30;
	
	// Background animations
	var background1 = new $.gQ.Animation({imageURL: "images/background1.png"});
	var background2 = new $.gQ.Animation({imageURL: "images/background1.png"});
	
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
			.addGroup("player", {posx: PLAYGROUND_WIDTH/2, posy: PLAYGROUND_HEIGHT/2, width: Player.getPlayerWidth(), height: Player.getPlayerHeight()})
				.addSprite(SpriteNames.playerIdle,{animation: Player.getIdleAnimation(), posx: 0, posy: 0, width: Player.getPlayerWidth(), height: Player.getPlayerHeight()})
				.addSprite(SpriteNames.playerWalkRight, {posx: 0, posy: 0, width: Player.getPlayerWidth(), height: Player.getPlayerHeight()})
				.addSprite(SpriteNames.playerWalkLeft, {posx: 0, posy:0, width: Player.getPlayerWidth(), height: Player.getPlayerHeight()});
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
		initializePlayground: initializePlayground,
		initializeGraphics: initializeGraphics,
		initializeStartButton: initializeStartButton,
		getPlaygroundHeight: getPlaygroundHeight,
		getPlaygroundWidth: getPlaygroundWidth,
		getRefreshRate: getRefreshRate
	};

}();