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

var PopUp = cc.LayerColor.extend({
	ctor: function() {
		this._super(cc.color.GREEN);
		var size = cc.winSize/2;
		return true;
	},
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
		
        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        //var testLabel = new cc.LabelTTF("Test Button", "Arial", 38);
        // position the label on the center of the screen
        //testLabel.x = size.width / 2;
        //testLabel.y = size.height / 2 + 200;
		//this.addChild(testLabel, 5);

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
					case 80:
						pause = !pause;
						var p = new PopUp();
						scene.addChild(p,100)
						p.setPosition(0,cc.winSize.height*2);

						if (pause) {
							//tween to position above screen.
							var moveIn = new cc.EaseBounceIn(new cc.MoveTo(0,cc.winSize.height*2),3);
							p.runAction(moveIn);
							console.log(p.getPosition())
							cc.director.pause();
						}
						else {
							var moveOut = new cc.EaseBounceIn(new cc.MoveTo(cc.winSize.width/2,cc.winSize.height/2),3);
							p.runAction(moveOut);
							cc.director.resume();
						}
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
