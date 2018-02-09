function Text(x,y,t){
	this.t = t;
	this.a = 0;
	this.c = '#000000';
	this.s = 40;
	this.p = new Point2(x,y);
}
Text.prototype.draw = function() {
	var d = this.space.getContext("2d");
	d.beginPath();
	d.fillStyle = this.c;
	d.textAlign = "center";
	d.font = this.s+"px monospace";

	d.translate(this.p.x+MM.mx,this.p.y+MM.my);
	d.rotate(this.a);
	d.fillText(this.t, 0, 0);
	d.rotate(-this.a);
	d.translate(-this.p.x-MM.mx,-this.p.y-MM.my);
};

function Line(){
}