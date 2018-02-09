function Button(x,y,dx,dy,t,f){
	this.v = new Point2();
	this.p = new Point2(x,y);
	this.d = new Point2(dx,dy);
	this.t = t;
	this.df = null;
	this.f = f;
	this.c = "#66DD00";
	this.tc = "#000000";
	this.s = Math.min(this.d.x,this.d.y)/2;
	bw.push(this);
}
Button.prototype.draw = function() {
	var px = this.p.x, py = this.p.y;
	var x = px-this.d.x/2, y = py-this.d.y/2;
	D.roundRect(x,y,this.d.x,this.d.y,10,this.c);
	D.fillText(this.t,px,py+this.s/4,this.s+"px monospace",this.tc);
};
Button.prototype.in = function(x,y) {
	return x>this.p.x-this.d.x/2 && x<this.p.x+this.d.x/2 && y>this.p.y-this.d.y/2 && y<this.p.y+this.d.y/2;
};
Button.prototype.run = function() {
	if(this.df) this.df();
	this.p.add(this.v);
	this.draw();
};