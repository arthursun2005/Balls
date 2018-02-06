function Me(){
	this.p = new Point2();
	this.v = new Point2();
	this.d = 50;
	this.a = 0;
	this.c = "#888800";
}
Me.prototype.draw = function() {
	var d = MM.c.getContext("2d");
	d.beginPath();
	d.translate(this.p.x+MM.mx,this.p.y+MM.my);
	d.rotate(this.a);
	d.rect(-this.d/2,-this.d/2,this.d,this.d);
	d.rotate(-this.a);
	d.strokeStyle = this.c;
	d.lineWidth = 3;
	d.stroke();
	d.translate(-this.p.x-MM.mx,-this.p.y-MM.my);
};
Me.prototype.update = function() {
	this.p.add(this.v);
};