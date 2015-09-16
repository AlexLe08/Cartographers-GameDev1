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
        // add the label as a child to this layer
	
        // add "HelloWorld" splash screen"
     /*   this.sprite = new cc.Sprite(res.HelloWorld_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(this.sprite, 0);
	*/
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

var uiLayer = cc.LayerColor.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super(cc.color.WHITE);

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;
		
        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        var testLabel = new cc.LabelTTF("Test Button", "Arial", 38);
        // position the label on the center of the screen
        testLabel.x = size.width / 2;
        testLabel.y = size.height / 2 + 200;
		this.addChild(testLabel, 5);

		cc.eventManager.addListener(
			cc.EventListener.create ({
				event: cc.EventListener.KEYBOARD,
				onKeyPressed: this.onKeyPressed}),this);

        return true;
    },
					
	onKeyPressed: function(keyCode, event)
		{
			var label = event.getCurrentTarget();
			var popup = new PopUp();
			
			var scene = cc.director.getRunningScene();
			var p = new PopUp();
			scene.addChild(p);
			cc.log(scene)
			//Add keycode table here
			cc.log(keyCode);
		},

});
var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new uiLayer();
        this.addChild(layer);
		var size = cc.winSize;
		var but = new button();
		but.x = size.width / 2;
        but.y = size.height / 2;
		but.scale = 0.2;
		layer.addChild(but);


    }
});

