var pause = false;
var mainMenu = function() {


	this.Scene = cc.Scene.extend({
		onEnter:function () {
			this._super();
			var layer = new menuLayer();
			layer.init();
			this.addChild(layer);
			}
		});
	this.Layer = cc.LayerColor.extend({
		ctor: function(){
			this._super(cc.color.GREEN);
		},
		init: function() {
			
			this._super(cc.color.GREEN);
			var director = cc.Director.getInstance();
			var winsize = director.getWinSize();
			var centerpos = cc.p(winsize.width/2,winsize.height/2);
			//var spritebg == cc.Sprite.create(bg img)
			//bg.setPosition(centerpos)
			//this.addChild(spritebg);
			cc.MenuItemFont.setFontSize(60)
			var menuItemPlay= cc.MenuItemSprite.create(
			cc.Sprite.create(s_start_n), // normal state image
			cc.Sprite.create(s_start_s), //select state image
			this.onPlay, this);
			var menu = cc.Menu.create(menuItemPlay);  //7. create the menu
			menu.setPosition(centerpos);
			this.addChild(menu);
			},
			onPlay : function(){
			cc.log("== on play clicked");
			}
	});

};
var uiManager = function() {
	//0: menu
	//1: playing
	//2: paused
	this.screenStates = [ 0, 1, 2 ];
	this.currentState = 0;
	this.pauseState = false;
	
	var pauseMenu = new PopUp();
	var menu = new mainMenu();
	var menuScene = menu.Scene;
	var menuLayer = menu.Layer;
	menuScene.addChild(menuLayer);
	this.togglePause = function(){
		pauseState = !pauseState;
		if (pauseState) {
			//Draw pause menu
			director = cc.director.getInstance()
			director.replaceScene(menu)
			cc.director.pause();
		}
		else{
			//Delete pause menu
			scene = cc.director.getRunningScene()
			scene.removeChild(pauseMenu)
			cc.director.resume();
		}
		
	}
	this.decideState = function(key){
		switch(key) {
			case 0:
				//bring main menu up
				director = cc.director.getInstance()
				director.replaceScene(menu)
				cc.director.pause();
				break;
			case 1:
				//transition to main game.
				//replace with game scene here
				scene = cc.director.getRunningScene()
				//draw Game Layer
				scene.addChild(this.mainMenu)
				break;
		}
	}
}
var button = ccui.Button.extend({
	ctor: function(){
		this._super(res.Close_png);
		var size = cc.winSize;

		var testbutton = ccui.Button.create();
		testbutton.loadTextures(res.Close_png);
		//testbutton.setTouchEnabled(true);
		//testbutton.addTouchEventListener(this.touchEvent,this);

        //this.addChild(testbutton);
		//this.addChild(testbutton,6);
    
		/*cc.eventManager.addListener(
			cc.EventListener.create ({
				event: cc.EventListener.TOUCH_ONE_BY_ONE,
				swallowTouches: true,
				onTouchBegan:this.onTouchBegan,
				onTouchEnded: this.onTouchEnded}),this);*/
				
		return true;
	},
	/*touchEvent: function(sender, type)
		{
			switch(type)
			{
				case ccui.Widget.TOUCH_BEGAN:
					cc.log("touched");
					break;
			}
		}*/
});

var uiLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;
		
		_event = new EventWindow();
		//var eventWindow = new _event.Window();
		
		this.addChild(_event,100)
		this.addChild(new StatusLayer());

		
		cc.eventManager.addListener(
			cc.EventListener.create ({
				event: cc.EventListener.KEYBOARD,
				onKeyPressed: this.onKeyPressed}),this);

        return true;
    },
					
	onKeyPressed: function(keyCode, event)
		{
			var tar = event.getCurrentTarget();			
			var scene = cc.director.getRunningScene();
			
			//console.log(label);
				switch(keyCode) {
					case 80: // 'P' key
						//flag pause
						pause = !pause;
						
						if (pause) {
							//tween to position above screen.
							var moveTweenIn = cc.MoveTo.create(3,cc.p(cc.winSize.width/2,cc.winSize.height/2));
							var moveIn = cc.EaseBounceIn.create(moveTweenIn);
							_event.runAction(moveIn);
							//cc.director.pause();
						}
						else {
							var moveTweenOut = cc.MoveTo.create(3,cc.p(cc.winSize.width/3,cc.winSize.height*2));
							var moveOut = cc.EaseBounceIn.create(moveTweenOut);
							_event.runAction(moveOut);
							//cc.director.resume();
						}
						break;
					case 32:
						console.log("space hit");
						console.log("boat pos is: " + _eventBoat.x  + " , " + _eventBoat.y);
						break;
				}
			
			/*if (pause)
			{
				cc.director.pause();
			}
			else if (!pause) {
				cc.director.resume();
			}*/
			//cc.log(scene)
			//Add keycode table here
			//cc.log(keyCode);
		},

});
