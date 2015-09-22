// Main File
// create the game scene

var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var ui = new uiLayer();

		var centerPos = cc.p(cc.winSize.width / 2, cc.winSize.height /2);
		var background = cc.Sprite.create(res.map_png);
		background.setPosition(centerPos);

        var layer = new GameLayer();
	
		this.addChild(background, 4);
        this.addChild(layer, 5);
		this.addChild(ui, 6);

    }
}); 

