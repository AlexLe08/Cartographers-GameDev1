// Main File
// create the game scene
var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        //var layer = new uiLayer();
        //this.addChild(layer, 100);

		var col = cc.LayerColor.create( new cc.Color( 90,100,255,255 )  );
        var layer = new GameLayer();
		this.addChild(col, 4);
        this.addChild(layer, 5);
    }
});

