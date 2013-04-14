Crafty.scene("southmain", function() {
	var speed=8;
	var curScene="southmain";
	player = Crafty.e("Persist, 2D, Canvas, Running, LeftControls, Collision, Gravity")
		.addComponent(character+"still")
		.attr({x: 100, y: 610, z:3, Health:0})
		.Running(character)
		.gravity("floor")
		.gravityConst(1)
		.collision()
		.onHit ('poison', function() {
			this.Health+=1;
			this.x-=50;
		})
		.bind('EnterFrame', function() {
			if (this.Health>=5 && this.Health!=10) {
				this.Health=10;
				//Crafty.e("2D, DOM, Image") //Dead message
					//.attr({x:-Crafty.viewport.x +100, y: -Crafty.viewport.y +100, z:6})
					//.image("dead.png", "no-repeat");
				
			}
		})
		.bind('KeyDown', action= function(e) {
			if (e.key== Crafty.keys['Z']) {
				this.alpha=0.5;
			}
			else if (e.key== Crafty.keys['SHIFT']) {
				speed+=8;
			}
			else if (e.key==Crafty.keys['X']) {
				if (this.x >3000 && this.x <3740) {
					this.unbind('KeyDown', action);
					Crafty.scene("eastgrand")
					this.x=100;
				}
			}
			else if (e.key==Crafty.keys['S']) {
				RESPAWN=[this.x, curScene];
			}
		})
		.bind('KeyUp', function(e) {
			if (e.key==Crafty.keys['Z']) {
				this.alpha=1.0;
			}
		})
		.leftControls(speed);
	RESPAWN=[player.x, curScene];
	Crafty.viewport.follow(player,0,100);
	Crafty.background("#000");
	
	Crafty.e("2D, DOM, Text, Persist") //FOR POSITIONS
		.textColor("#333333")
		.attr({x:player.x, y:player.y})
		.bind("EnterFrame", function() {
			this.attr({x: player.x, y: player.y})
			this.text(player.x)
		});
	Crafty.e("2D, DOM, Text, Persist") //FOR RESPAWN
		.textColor("#333333")
		.attr({x:(player.x+200), y:player.y})
		.bind("EnterFrame", function() {
			this.attr({x: (player.x+50), y: player.y})
			this.text(RESPAWN)
		});
	Crafty.e("2D, Canvas, Image") //Street
		.attr({w:4176, h:356, x: 0, y:592, z:1})
		.image("street3.png", "repeat");
	Crafty.e("2D, Canvas, Color")
		.attr({w:300, h: 100, x: 1600, y:700, z:2})
		.color("white");
	Crafty.e("2D, Canvas, Image") //buildings
		.attr({ w: 1540, h: 592, x: 0, y:0, z:1})
		.image("mainst1.png", "repeat");
	Crafty.e("2D, Canvas, Image") //buildings
		.attr({ w: 2636, h: 592, x: 1540, y:0, z:1})
		.image("mainst2.png", "repeat");
	Crafty.e("2D, Canvas, floor, Color, Persist") //floor
		.attr({x:0, y:650, w:4176, h: 120, z:0})
		.color("black")
		.visible=false;
	Crafty.e("2D, DOM, Color, Persist, Mouse")//Health meter
		.attr({x:-Crafty.viewport.x, y:0, w:800, h:1038, z:5})
		.color("#990000")
		.bind ("EnterFrame", function() {
			this.attr({x:-Crafty.viewport.x})
			this.alpha=(player.Health+.1)/10;
			})
		.bind('Click', function() {
			if (player.Health==10) {
				player.Health=0;
				player.x=RESPAWN[0];
				Crafty.scene(RESPAWN[1]);
			}
		});
	//Crafty.e("2D, DOM, Color, solid, floor")
		//.attr({x: 1300, y: 640, w: 50, h: 50, z:4})
		//.color("#663300");
	//Crafty.e("2D, DOM, Color, solid, floor")
		//.attr({x: 1500, y: 590, w: 100, h: 100, z:4})
		//.color("#663300");
	//Crafty.e("2D, DOM, Color, solid, floor")
		//.attr({x: 1800, y: 490, w: 50, h: 200, z:4})
		//.color("#663300");
		
	Crafty.e("2D, DOM, Text") //messages
		.textColor("#3333FF")
		.textFont({size: '20px', type:'bold', family: 'Candara'})
		.attr({x: -Crafty.viewport.x +20, y: -Crafty.viewport.y+10, w:200, z:6})
		.text("")
		.bind("EnterFrame", function() {
			this.attr({x: -Crafty.viewport.x +20, y: -Crafty.viewport.y+10, w:200, z:6})
			this.text(function (){
				if (player.y<100 || player.y>1000||player.Health>5) {
					return "Reload the page (F5) to restart"
				}
				else if (player.x>50 && player.x < 150) {
					return "Use LEFT and RIGHT Arrows to walk"
				}
				else if (player.x>450 && player.x <650) {
					return "Press UP to jump"
				}
				else if (player.x>1000&&player.x<1350) {
					return "Use jump to get over obstacles"
				}
				else if (player.x>2100 && player.x <2400){
					return "Press Z to go invisible"
				}
				else if (player.x>2950 && player.x<3750) {
					return "Press X to turn onto another street"
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