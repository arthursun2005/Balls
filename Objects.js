function Text(x,y,t){
	this.t = t;
	this.a = 0;
	this.ac = 0;
	this.c = '#000000';
	this.s = 40;
	this.p = new Point2(x,y);
	this.v = new Point2();
}
Text.prototype.draw = function() {
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
};
Text.prototype.float = function() {
	this.ac+=random(-0.005,0.005);
	this.v.x+=random(-0.05,0.05);
	this.v.y+=random(-0.05,0.05);
};
function heart(x,y,s){
}
function Line(){
}