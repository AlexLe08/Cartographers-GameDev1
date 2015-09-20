var hud = function() {
	this.addHud = function() {
		var Layer = cc.Layer.extend({
		ctor: function(){
			this._super();
		},
		init: function() {
			
			this._super();
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
			this.addChild(layer);
	}
	

};