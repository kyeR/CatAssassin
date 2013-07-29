var PlaygroundController = function(){

	var gameHeight;
	var gameWidth;
	var backgroundAnimation;
	var middlegroundAnimation;
	var foregroundAnimation;
	var backgroundSpeed;
	var middlegroundSpeed;
	var foregroundSpeed;
	var backgroundSprite1;
	var backgroundSprite2;
	var middlegroundSprite1;
	var middlegroundSprite2;
	var foregroundSprite1;
	var foregroundSprite2;
	var playerHeight;
	var playerWidth;
	var playgroundId;
	var weaponLayer;
	var playground;

	var setupGame = function() {
		getSettings();
		$(playgroundId).playground({height: gameHeight, width: gameWidth, keyTracker: true});
		setupGraphics();
	};

	var getSettings = function(){
		playgroundId = PlaygroundModel.playgroundId();
		gameHeight = PlaygroundModel.gameHeight();
		gameWidth = PlaygroundModel.gameWidth();
		foregroundAnimation = SceneryModel.foregroundAnimation();
		middlegroundAnimation = SceneryModel.middlegroundAnimation();
		backgroundAnimation = SceneryModel.backgroundAnimation();
		foregroundSprite1 = SceneryModel.foregroundSprite1();
		foregroundSprite2 = SceneryModel.foregroundSprite2();
		middlegroundSprite1 = SceneryModel.middlegroundSprite1();
		middlegroundSprite2 = SceneryModel.middlegroundSprite2();
		backgroundSprite1 = SceneryModel.backgroundSprite1();
		backgroundSprite2 = SceneryModel.backgroundSprite2();
		playerHeight = PlayerModel.playerHeight();
		playerWidth = PlayerModel.playerWidth();	
		weaponLayer = PlaygroundModel.weaponLayer();
	};

	var setupGraphics = function(){
		setupScenery();
		setupActors();
	};

	var setupScenery = function() {
		playground = $.playground().addGroup("scenery", {width: gameWidth, height: gameHeight})
			.addSprite(backgroundSprite1, {animation: backgroundAnimation, width: gameWidth, height: gameHeight})
			.addSprite(backgroundSprite2, {animation: backgroundAnimation, width: gameWidth, height: gameHeight, posx: gameWidth})
			.addSprite(middlegroundSprite1, {animation: middlegroundAnimation, width: gameWidth, height: gameHeight})
			.addSprite(middlegroundSprite2, {animation: middlegroundAnimation, width: gameWidth, height: gameHeight, posx: gameWidth})
			.addSprite(foregroundSprite1, {animation: foregroundAnimation, width: gameWidth, height: gameHeight})
			.addSprite(foregroundSprite2, {animation: foregroundAnimation, width: gameWidth, height: gameHeight, posx: gameWidth})
			.end();
	};

	var setupActors = function() {
		var layer = PlaygroundModel.actorsLayer();
		playground = playground.addGroup(layer, {width: gameWidth, height: gameHeight});
		setupPlayer();
	};

	var setupPlayer = function(){

		var groupSettings = {
			posx: gameWidth/2, 
			posy: gameHeight/2, 
			width: playerWidth, 
			height: playerHeight
		};

		var idleSettings = {
			animation: PlayerModel.idleAnimation(), 
			posx: 0, 
			posy: 0, 
			width: playerWidth, 
			height: playerHeight
		};

		var walkRightSettings = {
			posx: 0, 
			posy: 0, 
			width: playerWidth, 
			height: playerHeight
		};

		var walkLeftSettings = {
			posx: 0, 
			posy:0, 
			width: playerWidth, 
			height: playerHeight
		};

		var dieSettings = {
			posx:0,
			posy:0,
			width:75,
			height: playerHeight
		};

		playground = playground.addGroup("player", groupSettings)
			.addSprite(PlayerModel.idleSpriteName(), idleSettings)
			.addSprite(PlayerModel.walkRightSpriteName(), walkRightSettings)
			.addSprite(PlayerModel.walkLeftSpriteName(), walkLeftSettings)
			.addSprite(PlayerModel.dieSpriteName(), dieSettings).end().end();

		playground.addGroup(weaponLayer,
			{
				width: gameWidth,
				height: gameHeight
			}).end();
	};

	return {
		setupGame: setupGame
	};
}();



var SceneryController = function(){
	var nodes;
	var foregroundSpeed;
	var middlegroundSpeed;
	var backgroundSpeed;
	var playgroundWidth;
	var playgroundHeight;
	var stopScroll = false;

	var init = function(){
		nodes = SceneryModel.backgroundSpriteIds();
		foregroundSpeed = SceneryModel.foregroundSpeed();
		middlegroundSpeed = SceneryModel.middlegroundSpeed();
		backgroundSpeed = SceneryModel.backgroundSpeed();
		playgroundWidth = PlaygroundModel.gameWidth();
		playgroundHeight = PlaygroundModel.gameHeight();
	}

	var updateScenery = function(){
		if (PlayerController.isAdvancing() && !stopScroll){
			scrollScenery();
		}
	};

	var scrollScenery = function() {
		var newPos = (parseInt($(nodes.bg1).x()) - backgroundSpeed - playgroundWidth)
                                  % (-2 * playgroundWidth) + playgroundWidth;

        $(nodes.bg1).x(newPos);

        newPos = (parseInt($(nodes.bg2).x()) - backgroundSpeed - playgroundWidth)
                             % (-2 * playgroundWidth) + playgroundWidth;

        $(nodes.bg2).x(newPos);

        newPos = (parseInt($(nodes.mg1).x()) - middlegroundSpeed - playgroundWidth)
                             % (-2 * playgroundWidth) + playgroundWidth;

        $(nodes.mg1).x(newPos);

        newPos = (parseInt($(nodes.mg2).x()) - middlegroundSpeed - playgroundWidth)
                             % (-2 * playgroundWidth) + playgroundWidth;

        $(nodes.mg2).x(newPos);

        newPos = (parseInt($(nodes.fg1).x()) - foregroundSpeed - playgroundWidth)
                             % (-2 * playgroundWidth) + playgroundWidth;

        $(nodes.fg1).x(newPos);

        newPos = (parseInt($(nodes.fg2).x()) - foregroundSpeed - playgroundWidth)
                             % (-2 * playgroundWidth) + playgroundWidth;

        $(nodes.fg2).x(newPos);
	};

	var stopScrolling = function(){
		stopScroll = true;
	};

	return {
		updateScenery: updateScenery,
		init: init,
		stopScrolling: stopScrolling
	};

}();

var PlayerController = function(){
	var walkRightSprite;
	var walkLeftSprite;
	var idleSprite;
	var dieSprite;
	var idleAnimation;
	var walkRightAnimation;
	var walkLeftAnimation;
	var dieAnimation;
	var playerId;

	var init = function(){
		walkRightSprite = PlayerModel.walkRightSpriteName();
		walkLeftSprite = PlayerModel.walkLeftSpriteName();
		idleSprite = PlayerModel.idleSpriteName();
		dieSprite = PlayerModel.dieSpriteName();
		walkRightAnimation = PlayerModel.walkRightAnimation();
		walkLeftAnimation = PlayerModel.walkLeftAnimation();
		idleAnimation = PlayerModel.idleAnimation();
		dieAnimation = PlayerModel.dieAnimation();
		playerId = PlayerModel.playerId();
		setStartingPosition();
	};

	var animateIdle = function() {
		$("#" + walkRightSprite).setAnimation();
		$("#" + walkLeftSprite).setAnimation();
		$("#" + idleSprite).setAnimation(idleAnimation);
		PlayerModel.setIdle(true);	
		PlayerModel.setFacingLeft(false);
	};

	var animateWalkingRight = function() {
		$("#" + idleSprite).setAnimation();
		$("#" + walkLeftSprite).setAnimation();
		$("#" + walkRightSprite).setAnimation(walkRightAnimation);
		PlayerModel.setIdle(false);
		PlayerModel.setFacingLeft(false);
	};
	
	var animateWalkingLeft = function() {
		$("#" + idleSprite).setAnimation();
		$("#" + walkRightSprite).setAnimation();
		$("#" + walkLeftSprite).setAnimation(walkLeftAnimation);
		PlayerModel.setIdle(false);
		PlayerModel.setFacingLeft(true);
	};

	var killPlayer = function(){
		KeyBindingsController.stopInput();
		Enemy1Controller.stopMovement();
		SceneryController.stopScrolling();
		$("#" + idleSprite).setAnimation();
		$("#" + walkRightSprite).setAnimation();
		$("#" + walkLeftSprite).setAnimation();
		$("#" + dieSprite).setAnimation(dieAnimation);
	};

	var moveUp = function() {
		var nextpos = $(playerId).y()-2;
		if(nextpos > 0 && nextpos >= PlaygroundModel.highestMoveablePoint()){
			$(playerId).y(nextpos);
		};
	};
	
	var moveLeft = function() {
		var nextpos = $(playerId).x()-4;
		if(nextpos > 0){
			$(playerId).x(nextpos);
		};
	};
	
	var moveDown = function() {
		var nextpos = $(playerId).y()+2;
		if(nextpos < PlaygroundModel.gameHeight() - 30){
			$(playerId).y(nextpos);
		};
	};

	var moveRight = function() {
		var nextpos = $(playerId).x() + getForwardSpeed();
		if(nextpos < PlaygroundModel.gameWidth() - 30){
			$(playerId).x(nextpos);
		};
	};

	var isAdvancing = function() {
		return ($(playerId).x() > PlaygroundModel.scrollingPoint())
			&& !PlayerModel.isIdle();
	};

	var getForwardSpeed = function() {
		return isAdvancing() ? 1 : 4;
	};

	var setStartingPosition = function() {
		$(playerId).x(90);
		$(playerId).y(343);	
	};

	var xPosition = function(){
		return $("#player").x();
	};

	var yPosition = function(){
		return $("#player").y();
	};

	var fireWeapon = function(){
		weapon.fire();
	};

	return {
		init: init,
		animateIdle: animateIdle,
		animateWalkingRight: animateWalkingRight,
		animateWalkingLeft: animateWalkingLeft,
		killPlayer: killPlayer,
		isAdvancing: isAdvancing,
		moveUp: moveUp,
		moveLeft: moveLeft,
		moveRight: moveRight,
		moveDown: moveDown,
		xPosition: xPosition,
		yPosition: yPosition
	};
}();

var PlayerWeaponController = function(){

	var weaponLayerId;
	var fireRightAnimation;
	var fireLeftAnimation;
	var attackRightClass;
	var attackLeftClass;
	var bulletHeight;
	var bulletWidth;
	var bulletSpeed;
	var enemyClass;
	var enemy1Type;

	var init = function(){
		weaponLayerId = "#" + PlaygroundModel.weaponLayer();
		fireRightAnimation = PlayerWeaponModel.fireRightAnimation();
		fireLeftAnimation = PlayerWeaponModel.fireLeftAnimation();
		attackRightClass = PlayerWeaponModel.attackRightClass();
		attackLeftClass = PlayerWeaponModel.attackLeftClass();
		bulletHeight = PlayerWeaponModel.bulletHeight();
		bulletWidth = PlayerWeaponModel.bulletWidth();
		bulletSpeed = PlayerWeaponModel.bulletSpeed();
		enemyClass = PlaygroundModel.enemyClass();
		enemy1Type = Enemy1Model.getType();
	};

	var fire = function(){
		var name = "playerAttack_"+Math.ceil(Math.random()*10000);
		if (PlayerModel.isFacingLeft()){
			fireLeft(name);
		}
		else {
			fireRight(name);
		}
	};

	var fireRight = function(attackName) {
		$(weaponLayerId).addSprite(attackName,
			{
				animation: fireRightAnimation,
				posx: PlayerController.xPosition() + 70,
				posy: PlayerController.yPosition() + 22,
				width: bulletWidth,
				height: bulletHeight
			});

		$("#" + attackName).addClass(attackRightClass);
	};

	var fireLeft = function(attackName){
		$(weaponLayerId).addSprite(attackName,
			{
				animation: fireLeftAnimation,
				posx: PlayerController.xPosition() - 20,
				posy: PlayerController.yPosition() + 22,
				width: bulletWidth,
				height: bulletHeight
			});
		$("#" + attackName).addClass(attackLeftClass);
	};

	var updateBullets = function(){
		var leftAttacks = "." + attackLeftClass;
		var rightAttacks = "." + attackRightClass; 

		//Update the movement of the bullets
		$(rightAttacks).each(function(){
				var posx = $(this).x();
				if(posx > PlaygroundModel.gameWidth()){
					$(this).remove();
					return;
				}

				$(this).x(bulletSpeed, true);
				checkForCollisions(this);
			});
		$(leftAttacks).each(function(){
			var posx = $(this).x();
			if(posx < 0){
				$(this).remove();
				return;
			}
			var speed = bulletSpeed * -1;
			$(this).x(speed, true);
			checkForCollisions(this);
		})
	}

	var checkForCollisions = function(bullet){
		var collided = $(bullet).collision("."+enemyClass+",."+$.gQ.groupCssClass);
		if(collided.length > 0){
			//An enemy has been hit!
			collided.each(function(){
					if(this.enemyType == enemy1Type){
						Enemy1Controller.destroy(this);
					}
				})
			$(bullet).remove();
			//$(this).removeClass("playerMissiles");
		}
	};

	return {
		init: init,
		fire: fire,
		updateBullets: updateBullets
	};
}();

var KeyBindingsController = function(){
	var upKey;
	var downKey;
	var leftKey;
	var rightKey;
	var shootKey;
	var noInput = false;

	var getControlSettings = function(){
		upKey = ControlsModel.upKey();
		downKey = ControlsModel.downKey();
		leftKey = ControlsModel.leftKey();
		rightKey = ControlsModel.rightKey();
		shootKey = ControlsModel.shootKey();
	}

	var init = function(){
		getControlSettings();
		setAnimations();
	}

	var stopInput = function(){
		noInput = true;
	}

	var downPressed = false;
	var upPressed = false;
	var leftPressed = false;
	var rightPressed = false;
	var shootPressed = false;
	var rapidFireDelay = 0;

	var keyPressed = function(){
		return downPressed || upPressed || leftPressed || rightPressed;
	};

	var updatePlayerMovement = function() {
		if (noInput){
			return;
		}

		if (!keyPressed() && !PlayerModel.isIdle()){
			PlayerController.animateIdle();
		}

		// Update the movement of the player
		if(jQuery.gameQuery.keyTracker[leftKey]){ 
			PlayerController.moveLeft();
		}
		if(jQuery.gameQuery.keyTracker[rightKey]){
			PlayerController.moveRight();
		}
		if(jQuery.gameQuery.keyTracker[upKey]){ 
			PlayerController.moveUp();
		}
		if(jQuery.gameQuery.keyTracker[downKey]){ 
			PlayerController.moveDown();
		}
	};

	var setAnimations = function() {
		// Player movement animations
		$(document).keydown(function(e){
			if (noInput){
				return;
			}

			switch(e.keyCode){
				case leftKey: 
					if (leftPressed)
						return;
					leftPressed = true;
					PlayerController.animateWalkingLeft();
					break;
				case upKey:
					if (upPressed)
						return;
					upPressed = true;
					PlayerController.animateWalkingRight();
					break;
				case rightKey:
					if (rightPressed)
						return;
					rightPressed = true;
					PlayerController.animateWalkingRight();
					break;
				case downKey:
					if (downPressed)
						return;
					downPressed = true;
					PlayerController.animateWalkingRight();
					break;
				case shootKey:
					if (shootPressed) {
						rapidFireDelay++;
						if (rapidFireDelay % 5 == 0) {
							PlayerWeaponController.fire();
						}
					}
					else {
						PlayerWeaponController.fire();
						shootPressed = true;
					}
					break;
				}
		});
		$(document).keyup(function(e){
			switch(e.keyCode){
				case leftKey:
					leftPressed = false;
					break;
				case upKey:
					upPressed = false;
					break;
				case rightKey:
					rightPressed = false;
					break;
				case downKey:
					downPressed = false;
					break;
				case shootKey:
					rapidFireDelay = 0;
					shootPressed = false;
					break;
			}
		});
	};

	return {
		init: init,
		updatePlayerMovement: updatePlayerMovement,
		stopInput: stopInput
	};
}();

var Enemy1Controller = function(){
	var infoSet = false;
	var enemyHeight;
	var enemyWidth;
	var walkingAnimation;
	var explodeAnimation;
	var actorsLayer;
	var enemyClass;
	var enemy1Type;
	var explosionHeight;
	var explosionWidth;
	var highestMoveablePoint;
	var gameHeight;
	var stop = false;

	var init = function(){
		enemyHeight = Enemy1Model.getHeight();
		enemyWidth = Enemy1Model.getWidth();
		walkingAnimation = Enemy1Model.walkingAnimation();
		explodeAnimation = Enemy1Model.explodeAnimation();
		enemyClass = PlaygroundModel.enemyClass();
		actorsLayer = "#" + PlaygroundModel.actorsLayer();
		enemy1Type = Enemy1Model.getType();
		explosionHeight = Enemy1Model.getExplosionHeight();
		explosionWidth = Enemy1Model.getExplosionWidth(); 
		highestMoveablePoint = PlaygroundModel.highestMoveablePoint();
		gameHeight = PlaygroundModel.gameHeight();

	};

	var getName = function(){
		return "enemy1_"+Math.ceil(Math.random()*1000);
	};

	var updateEnemies = function(){
		if (stop){
			return;
		}

		$("."+enemyClass).each(function(){
			move($(this));
		});
	};

	var spawnEnemy1 = function(){
		var name = getName();
		var startPoint = getStartingPoint();

		$(actorsLayer).addSprite(name, {animation: walkingAnimation, posx: 700, posy: startPoint,width: enemyWidth, height: enemyHeight});
		$("#"+name).addClass(enemyClass);
		$("#"+name)[0].enemyType = enemy1Type;
	};

	var startSpawningEnemies = function(){
		$.playground().registerCallback(function(){
			spawnEnemy1();
		}, 1000);
	}

	var getStartingPoint = function(){
		if (coinFlip()){
			if (coinFlip()){
				return 310;
			}
			return 343;
		}
		return 420;
	};

	var stopMovement = function(){
		stop = true;
	}

	var move = function(node){
		var coinFlip = Math.random();

		if (coinFlip < 0.5){
			moveLeft(node);
		}
		else{
			moveUpOrDown(node);
		}

		checkForCollisions(node);
	};

	var moveLeft = function(node){
		var speed = PlayerController.isAdvancing() ? 10 : 6;
		var newXPos = node.x() - Math.ceil(Math.random()*speed);
		node.x(newXPos);
	};

	var moveUpOrDown = function(node){
		if (coinFlip()){
			moveDown(node);
		}
		else{
			moveUp(node);
		}
	};

	var moveUp = function(node){
		if (node.y() <= highestMoveablePoint + 20){
			return;
		}
		var newPos = node.y() - Math.ceil(Math.random()*2);
		node.y(newPos);
	};

	var moveDown = function(node){
		if (node.y() >= gameHeight){
			return;
		}
		var newPos = node.y() + Math.ceil(Math.random()*2);
		node.y(newPos);

	};

	var destroy = function(enemyNode){
		$(enemyNode).setAnimation(explodeAnimation, function(node){$(node).remove();});
		$(enemyNode).css("width", explosionWidth);
		$(enemyNode).css("height", explosionHeight);
		$(enemyNode).removeClass(enemyClass);
	};

	var checkForCollisions = function(enemy){
		var collided = collisionWithPlayer(enemy);
		if(collided.length > 0){
			PlayerController.killPlayer();
			//The player has been hit!
			collided.each(function(){
				})
		}
	};

	var collisionWithPlayer = function(enemy){
		var collided = $(enemy).collision("#playerIdle,."+$.gQ.groupCssClass);
		if (collided.length > 0){
			return collided;
		}

		collided = $(enemy).collision("#playerWalkRight,."+$.gQ.groupCssClass);
		if (collided.length > 0){
			return collided;
		}

		return $(enemy).collision("#playerWalkLeft,."+$.gQ.groupCssClass);
	};

	var coinFlip = function(){
		var x = Math.random();
		return x < 0.5;
	};

	return {
		init: init,
		updateEnemies: updateEnemies,
		startSpawningEnemies: startSpawningEnemies,
		destroy: destroy,
		stopMovement: stopMovement
	};
}();