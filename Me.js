function Me(){
	this.p = new Point2();
	this.v = new Point2();
	this.d = 40;
	this.a = 0;
}
Me.prototype.draw = function() {
	var d = MM.c.getContext("2d");
	d.translate(this.p.x,this.p.y);
	d.rotate(this.a);
	d.strokeStyle = this.c;
	d.rect(0,0,this.d,this.d);
	d.stroke();
};
Me.prototype.update = function() {
	this.p.add(this.v);
};