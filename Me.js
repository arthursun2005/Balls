function Me(){
	this.p = new Point2();
	this.v = new Point2();
	this.d = 48;
	this.a = 0;
	this.c = "#888800";
	this.hit = false;
}
Me.prototype.draw = function() {
	var d = MM.c.getContext("2d");
	d.beginPath();
	d.translate(this.p.x+MM.mx,this.p.y+MM.my);
	d.rotate(this.a);
	d.rect(-this.d/2,-this.d/2,this.d,this.d);
	d.rotate(-this.a);
	d.translate(-this.p.x-MM.mx,-this.p.y-MM.my);
	d.strokeStyle = this.c;
	d.lineWidth = 2.5;
	if(this.hit){
		d.strokeStyle = "#FF0000";
		d.lineWidth = 6;
	}
	d.stroke();
};
Me.prototype.update = function() {
	this.p.add(this.v);
};
Me.prototype.cl1 = function(ball) {
	this.lines = [
		[new Point2(-this.d/2,-this.d/2),new Point2(this.d/2,-this.d/2)],
		[new Point2(-this.d/2,-this.d/2),new Point2(-this.d/2,this.d/2)],
		[new Point2(this.d/2,-this.d/2),new Point2(this.d/2,this.d/2)],
		[new Point2(-this.d/2,this.d/2),new Point2(this.d/2,this.d/2)]
	];
	for (var i = this.lines.length - 1; i >= 0; i--) {
		this.lines[i][0].rotateA(this.a,false);
		this.lines[i][1].rotateA(this.a,false);
	}
	for (var i = this.lines.length - 1; i >= 0; i--) {
		this.lines[i][0].add(this.p);
		this.lines[i][1].add(this.p);
	}
	var dx = 0, dy = 0;
	for (var i = this.lines.length - 1; i >= 0; i--) {
		if(cl1(
			this.lines[i][0].x+dx,
			this.lines[i][0].y+dy,
			this.lines[i][1].x+dx,
			this.lines[i][1].y+dy,
			ball.p.x+dx,
			ball.p.y+dy,
			ball.r
			)){
			var energy = Math.pow(Point2.mag(ball.v)+Point2.mag(this.v),2)*ball.m;
			return [true,energy];
		}
	}
	return [false,null];
};