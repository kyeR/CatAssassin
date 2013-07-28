//******************************************************
//                                                     *
//                     Main                            *
//                                                     *
//******************************************************
$(function(){

	initializeStartButton();

	initializeGame();
	startGameLoop();
	Enemy1Controller.startSpawningEnemies();

});

var startGameLoop = function(){
	var refreshRate = PlaygroundModel.refreshRate();

	$.playground().registerCallback(function(){
		KeyBindingsController.updatePlayerMovement();	
		Enemy1Controller.updateEnemies();
		PlayerWeaponController.updateBullets();
		SceneryController.updateScenery();
	}, refreshRate);
};

var initializeStartButton = function() {
	$("#startbutton").click(function(){
		$.playground().startGame(function(){
			$("#welcomeScreen").fadeTo(1000,0,function(){$(this).remove();});
		});
	});
};

var initializeGame = function(){
	initializeStartButton();
	PlaygroundController.setupGame();
	SceneryController.init();
	PlayerController.init();
	PlayerWeaponController.init();
	KeyBindingsController.init();
	Enemy1Controller.init();
};






