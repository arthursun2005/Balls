function Text(x,y,t){
	this.t = t;
	this.a = 0;
	this.ac = 0;
	this.c = '#000000';
	this.s = 40;
	this.p = new Point2(x,y);
	this.v = new Point2();
	this.floating = false;
}
Text.prototype.edge = function() {
	if(this.p.x<this.s-size && this.v.x<0){
		this.v.x*=-1;
	}
	if(this.p.x>size-this.s && this.v.x>0){
		this.v.x*=-1;
	}
	if(this.p.y<this.s-size && this.v.y<0){
		this.v.y*=-1;
	}
	if(this.p.y>size-this.s && this.v.y>0){
		this.v.y*=-1;
	}
};
Text.prototype.draw = function() {
	this.edge();

	var d = MM.c.getContext("2d");
	d.beginPath();
	d.fillStyle = this.c;
	d.textAlign = "center";
	d.font = this.s+"px monospace";

	d.translate(this.p.x+MM.mx,this.p.y+MM.my);
	d.rotate(this.a);
	d.fillText(this.t, 0, 0);
	d.rotate(-this.a);
	d.translate(-this.p.x-MM.mx,-this.p.y-MM.my);

	this.p.add(this.v);
	this.a+=this.ac;

	if(this.floating){
		this.float();
	}
};
Text.prototype.float = function() {
	this.ac+=random(-0.001,0.001);
	this.v.x+=random(-0.1,0.1);
	this.v.y+=random(-0.1,0.1);
};
function heart(x,y,s) {
	// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes
	var d = MM.c.getContext("2d");
	d.beginPath();
	d.translate(x-75,y-75);
	d.scale(s,s);
	d.moveTo(75, 40);
	d.bezierCurveTo(75, 37, 70, 25, 50, 25);
	d.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
	d.bezierCurveTo(20, 80, 40, 102, 75, 120);
	d.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
	d.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
	d.bezierCurveTo(85, 25, 75, 37, 75, 40);
	d.scale(1/s,1/s);
	d.translate(-x+75,-y+75);
	d.fillStyle = "#FF5060";
	d.fill();
}
function BlackHole(x,y,r){
	this.p = new Point2(x,y);
	this.v = new Point2();
	this.r = r;
	this.k = 6e8;
	this.m = this.r*this.r*this.r*this.k;
}
BlackHole.prototype.draw = function() {
	var d = MM.c.getContext("2d");
	d.beginPath();
	d.translate(this.p.x+MM.mx,this.p.y+MM.my);
	d.strokeStyle = "#FFFF00";
	d.fillStyle = "#000000";
	d.lineWidth = 4;
	d.arc(0,0,this.r,0,2*Math.PI);
	d.translate(-this.p.x-MM.mx,-this.p.y-MM.my);
	d.stroke();
	d.fill();
};
BlackHole.prototype.solveMe = function() {
	var d = Point2.sub(me.p,this.p);
	var m = Point2.mag(d);
	var n = Point2.normalize(d);
	if(m>10 && !(contT && Date.now()-contT<3000)){
		this.v.add(Point2.mult(n,me.m/m/m*G*8));
		me.v.sub(Point2.mult(n,this.m/m/m*G*8));
	}
	if(m<this.r/2 && !(contT && Date.now()-contT<3000)){
		tDead = true;
		re1 = Date.now();
	}
};
BlackHole.prototype.solveBalls = function(balls) {
	for (var i = balls.length - 1; i >= 0; i--) {
		var d = Point2.sub(balls[i].p,this.p);
		var m = Point2.mag(d);
		var n = Point2.normalize(d);
		this.v.add(Point2.mult(n,balls[i].m/m/m*G));
		balls[i].v.sub(Point2.mult(n,this.m/m/m*G));

		if(m<this.r+balls[i].r){
			if(balls[i].r<this.r || balls[i].r<30){
				this.m+=balls[i].m/10;
				this.r = Math.pow(this.m/this.k,1/3);
				balls[i].gone = true;
			}else{
				var b = balls[i];
				var nr = Math.pow(b.m/4,1/3);
				var x,y;
				var a = random(0,2*Math.PI);
				x = Math.cos(a)*nr+b.p.x, y = Math.sin(a)*nr+b.p.y;
				var b2 = new Ball(x,y,nr);
				b.r = nr;
				Point2.copy(b.v,b2.v);

				b.v.add(Point2.mult(n,this.r/8));
				b2.v.add(Point2.mult(n,this.r/8));

				mainBalls.push(b2);
			}
		}
	}
}
BlackHole.prototype.run = function() {
	this.p.add(this.v);
	this.draw();
};
function Line(x1,y1,x2,y2){
	this.p1 = new Point2(x1,y1);
	this.p2 = new Point2(x2,y2);
}
Line.prototype.draw = function() {
};