function c1D(m1,m2,v1,v2,c){
	var r = new Point2();
	var m = m1+m2;
	var v = m1*v1+m2*v2;
	r.x = (c*m2*(v2-v1)+v)/m;
	r.y = (c*m1*(v1-v2)+v)/m;
	return r;
}
function Ball(x,y,r,m){
	this.p = new Point2(x,y);
	this.v = new Point2();
	this.r = r;
	this.m = m || this.r*this.r;
	this.c = "#FF0000";
}
Ball.prototype.draw = function() {
	D.arc(this.p.x,this.p.y,this.r,0,2*Math.PI,this.c);
};
Ball.prototype.update = function() {
	this.p.add(this.v);
};
Ball.prototype.edge = function() {
	if(this.p.x<this.r && this.v.x<0){
		this.v.x*=-1;
	}
	if(this.p.x>MM.ww-this.r && this.v.x>0){
		this.v.x*=-1;
	}
	if(this.p.y<this.r && this.v.y<0){
		this.v.y*=-1;
	}
	if(this.p.x>MM.hh-this.r && this.v.x>0){
		this.v.y*=-1;
	}
};
Ball.prototype.each = function(other) {
	var d = Point2.sub(other.p,this.p);
	var n = Point2.normalize(d);
	var m = Point2.mag(d);
	var a = Point2.heading(d);
	var ptemp = [new Point2(),new Point2()];
	var vtemp = [new Point2(),new Point2()];
	var vfinal = [new Point2(),new Point2()];
	var pfinal = [new Point2(),new Point2()];
	ptemp[1] = Point2.rotateA(d,a,true);
	vtemp[0] = Point2.rotateA(this.v,a,true);
	vtemp[1] = Point2.rotateA(other.v,a,true);
	vfinal[0].x = c1D(this.m,other.m,vtemp[0].x,vtemp[1].x,1).x;
	vfinal[0].y = vtemp[0].y;
	vfinal[1].x = c1D(this.m,other.m,vtemp[0].x,vtemp[1].x,1).y;
	vfinal[1].y = vtemp[1].y;
	ptemp[0].x+=vfinal[0].x;
	ptemp[1].x+=vfinal[1].x;
	pfinal[0] = Point2.rotateA(ptemp[0],a,false);
	pfinal[1] = Point2.rotateA(ptemp[1],a,false);
	other.p.x = this.p.x+pfinal[1].x;
	other.p.y = this.p.y+pfinal[1].y;
	this.p.add(pfinal[0]);
	this.v = Point2.rotateA(vfinal[0],a,false);
	other.v = Point2.rotateA(vfinal[1],a,false);
};