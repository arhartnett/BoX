Crafty.scene("eastgrand", function() {
	Crafty.viewport.follow(player,0,100);
	var curScene="eastgrand";
	player.bind('KeyDown', action= function(e) {
			if (e.key== Crafty.keys['Z']) {
				this.alpha=0.5;
			}
			else if (e.key==Crafty.keys['S']) {
				RESPAWN=[this.x, curScene];
			}
			else if (e.key== Crafty.keys['SHIFT']) {
				speed+=8;
			}
			else if (e.key==Crafty.keys['X']) {
				if (this.x >3000 && this.x <3740) {
					this.unbind('KeyDown',action);
					Crafty.scene("theend");
				}
			}
		})
	Crafty.e("2D, Canvas, Image") //Street
		.attr({w:4176, h:446, x: 0, y:592, z:1})
		.image("street.png", "repeat-x");
	Crafty.e("2D, Canvas, Color")
		.color("#99D9EA")
		.attr({x:0, y:0, h:592, w:4176, z:1});
	Crafty.e("2D, Canvas, Image")
		.attr({x:3500, y:0, z:2})
		.image("southgrand1.png");
	Crafty.e("2D, DOM, Color, Collision, poison") //Kill blocks
		.attr({x:1115, y:650, w:50, h: 50, z:4})
		.collision()
		.color("red");
	Crafty.e("2D, DOM, Color, Collision, poison") //Kill blocks
		.attr({x:2000, y:600, w:50, h: 50, z:4})
		.collision()
		.color("red");
	Crafty.e("2D, DOM, Color, Collision, poison") //Kill blocks
		.attr({x:2300, y:600, w:50, h: 50, z:4, Direction: -1})
		.collision()
		.color("red")
		.bind('EnterFrame', function() {
			this.y+=this.Direction;
			if (this.y<=400 || this.y>=600) {
				this.Direction*=-1;
			}
		});
	Crafty.e("2D, DOM, Color, Collision, solid, floor") //elevator
		.attr({x:2650, y:550, w:100, h: 150, z:4, Direction: -1})
		.collision()
		.color("#663300")
		.onHit('player', function() {
			player.y=this.y+160;
		});
	Crafty.e("2D, DOM, Color, Collision, poison") //Kill blocks
		.attr({x:2800, y:450, w:50, h: 250, z:4})
		.collision()
		.color("red");
	Crafty.e("2D, DOM, Text") //messages
		.textColor("#3333FF")
		.textFont({size: '20px', type:'bold', family: 'Candara'})
		.attr({x: -Crafty.viewport.x +20, y: -Crafty.viewport.y+10, w:200, z:6})
		.text("")
		.bind("EnterFrame", function() {
			this.attr({x: -Crafty.viewport.x +20, y: -Crafty.viewport.y+10, w:200, z:6})
			this.text(function (){
				if (player.x>50 && player.x<150) {
					return "Not all buildings have been drawn yet"
				}
				else if (player.x>300 && player.x<450) {
					return "Press S at any time to set a new respawn point."
				else if (player.x >600 && player.x < 1100) {
					return "Avoid these red boxes"
				}
				else if (player.x>3550 && player.x < 3950) {
					return "Press X to enter building and complete mission"
				}
				else if (player.x <25 && player.x>-80 || player.x>4076 && player.x<4176){
					return "CAREFUL!"
				}
				else{
					return ""
				}
			});
		});
});