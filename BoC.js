window.onload = function () {
Crafty.init(800,520);
Crafty.canvas.init();

Crafty.sprite(80, "sheet.png", {
    astill: [4,0,1,2],
	dstill: [4,4,1,2],
    paddingX: 40});
Crafty.c("LeftControls", {
init: function() {
	this.requires('Twoway');
},
leftControls: function(speed) {
	this.twoway(speed, 20)
	return this;
}
});
	
Crafty.c('Running', {
Running: function(character) {
this.requires ("SpriteAnimation")
	.animate("awalk_right", 0,0,3)
	.animate("awalk_left", 0,2,3)
	.animate("astand_still", 4,0,4)
	.animate("dwalk_right",0,4,1)
	.animate("dwalk_left",0,6,1)
	.animate("dstand_still",4,4,4)
	.bind("NewDirection",
	function (direction) {
		if (character=='a'){
		if (direction.x<0){
			if (!this.isPlaying("awalk_left"))
				this.stop().animate("awalk_left", 20,-1);
		}
		if (direction.x>0){
			if (!this.isPlaying("awalk_right"))
				this.stop().animate("awalk_right", 20,-1);
		}
		if (!direction.x){
			this.stop().animate("astand_still", 1,-1)
		}
	}
		else if (character=='d'){
		if (direction.x<0){
			if (!this.isPlaying("dwalk_left"))
				this.stop().animate("dwalk_left", 20,-1);
		}
		if (direction.x>0){
			if (!this.isPlaying("dwalk_right"))
				this.stop().animate("dwalk_right", 20,-1);
		}
		if (!direction.x){
			this.stop().animate("dstand_still", 1,-1)
		}
	}
	})
		.bind("Moved", function(from) {
			if (this.hit('solid')){
				this.attr({x: from.x, y:from.y});
			}
		})

		return this;
	}
});
Crafty.scene("loading", function() {
	Crafty.load(["mainst3.png"],function() {
		Crafty.scene("menu");
	});

	Crafty.background("#000");
	Crafty.e("2D, DOM, Text")
		.attr({w: 100, h: 20, x:200, y: 100})
		.text("Loading")
		.textColor("white")
		.css({"text-align": "center"});
});
Crafty.scene("menu", function(){
	Crafty.background("#999999");
	//Crafty.e("2D, DOM, Image")
		//.attr({x:200, y:0, h: 100, z:1})
		//.image("menutext.png");
	Crafty.e("2D, DOM, astill, Mouse")
		.attr({x:100, y:200, z:2})
		.bind('Click', function() {
			character='a';
			Crafty.scene("mission1");
		})
	Crafty.e("2D, DOM, dstill, Mouse")
		.attr({x:620, y:200, z:2})
		.bind('Click', function() {
			character='d';
			Crafty.scene("mission1");
		})
});
Crafty.scene("mission1", function() {
	Crafty.e("2D, Canvas, Image, Mouse")
		.attr({x:0, y:0, z:1})
		.image("mission1.png")
		.bind('Click', function() {
			Crafty.scene("southmain");
		})
});

Crafty.scene("theend", function() {
	Crafty.viewport.x=0;
	Crafty.viewport.y=0;
	player.Health=0;
	Crafty.e("2D, Canvas, Color, Mouse")
		.attr({x:0, y:0, w:800, h:520, z:1})
		.color("white")
		.bind('Click', function() {
			Crafty.scene('loading');
		})
	Crafty.e("2D, Canvas, Text")
		.attr({x:200, y:200, z:2})
		.textColor("#666666")
		.text("Click anywhere to restart game");
});
Crafty.scene("loading");
};