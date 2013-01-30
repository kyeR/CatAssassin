var GameEnvironment = function() {

	var PLAYGROUND_WIDTH	= 700;
	var PLAYGROUND_HEIGHT	= 500;
	var REFRESH_RATE        = 15;

	// The background:
	var background1 = new $.gQ.Animation({imageURL: "background1.png"});
	var background2 = new $.gQ.Animation({imageURL: "background1.png"});
	
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
	
	var initializeBackground = function() {
		$.playground().addGroup("background", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT})
				.addSprite("background1", {animation: background1, width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT})
				.addSprite("background2", {animation: background2, width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT, posx: PLAYGROUND_WIDTH})
				.end()
			.addGroup("actors", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT})
			.addGroup("player", {posx: PLAYGROUND_WIDTH/2, posy: PLAYGROUND_HEIGHT/2, width: 60, height: 32})
				.addSprite("playerBody",{animation: playerAnimation["idle"], posx: 0, posy: 0, width: 60, height: 32});
	};
	
	return {
		//Public
		initializePlayground: initializePlayground,
		initializeBackground: initializeBackground,
		getPlaygroundHeight: getPlaygroundHeight,
		getPlaygroundWidth: getPlaygroundWidth,
		getRefreshRate: getRefreshRate
	};

}();