var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new uiLayer();
        this.addChild(layer);

    }
});

