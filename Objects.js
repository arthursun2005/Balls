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
function heart(x,y,s){
}
function Line(x1,y1,x2,y2){
	this.p1 = new Point2(x1,y1);
	this.p2 = new Point2(x2,y2);
}