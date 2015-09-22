var StatusLayer = cc.Layer.extend({
	labelFood: null,
	labelGold: null,
	labelScore: null,

	ctor: function() {
		this._super();
		this.init();
	},
	init: function() {
		var winSize = cc.director.getWinSize();
		
		this.labelGold = new cc.LabelTTF( "Coins:0", "Helvetica",20);
		this.labelGold.setColor(cc.color(255,255,0));
		this.labelGold.setPosition(cc.p(winSize.width - 70, winSize.height - 40));
		
		this.labelFood = new cc.LabelTTF( "Food:0", "Helvetica",20);
		this.labelFood.setColor(cc.color(255,255,0));
		this.labelFood.setPosition(cc.p(winSize.width - 70, winSize.height - 20));
		
		this.labelScore = new cc.LabelTTF( "Score:0", "Helvetica",20);
		this.labelScore.setColor(cc.color(255,255,0));
		this.labelScore.setPosition(cc.p(winSize.width - 70, winSize.height - 60));
		
		this.addChild(this.labelGold);
		this.addChild (this.labelFood);
		this.addChild(this.labelScore);
		},
	updateGold: function(value) {
		_gold += value;
		var string = "Gold: " + _gold;
		this.labelGold.setString(string);
	},
	updateFood: function(value) {
		_food += value;
		var string = "Food: " + _food;
		this.labelGold.setString(string);
	},
	
	updateScore: function(value) {
		_score += value;
		var string = "Score: " + _score;
		this.labelScore.setString(string);
	}
})