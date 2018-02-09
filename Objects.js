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
function Line(x1,y1,x2,y2){
	this.p1 = new Point2(x1,y1);
	this.p2 = new Point2(x2,y2);
}