const letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
function flipString(t){
	return t.split("").reverse().join("");
}
function decimalTo(n,t){
	var bn = n, a = "";
	while(bn>1/t){
		var r = bn%16;
		if(r>9 && r<46){
			r = letters[r-10];
		}
		if(r>=46){
			return "";
		}
		a+=r;
		bn = Math.floor(bn/t);
	}
	a = flipString(a);
	return a;
}
/* 
	maths!
*/
function constrain(value, min, max){
	if(value<=min) return min;
	if(value>=max) return max;
	else return value;
}
function map(value, l1, h1, l2, h2) {
    return l2+(h2-l2)*(value-l1)/(h1-l1);
}
function dist2(x1,y1,x2,y2){
	return Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2));
}
function dist3(x1,y1,z1,x2,y2,z2){
	return Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2)+Math.pow(z2-z1,2));
}
function random(a, b){
	return a+Math.random()*(b-a);
}
function mag2(x, y){
	return Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
}
function mag3(x, y, z){
	return Math.sqrt(Math.pow(x,2)+Math.pow(y,2)+Math.pow(z,2));
}
// 3D point
function Point3(x,y,z){
	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;
}
// methods
Point3.prototype.add = function(p) {
	this.x+=p.x;
	this.y+=p.y;
	this.z+=p.z;
};
Point3.prototype.sub = function(p) {
	this.x-=p.x;
	this.y-=p.y;
	this.z-=p.z;
};
Point3.prototype.mult = function(p) {
	this.x*=p;
	this.y*=p;
	this.z*=p;
};
Point3.prototype.div = function(p) {
	this.x/=p;
	this.y/=p;
	this.z/=p;
};
Point3.prototype.floor = function() {
	this.x = Math.floor(this.x);
	this.y = Math.floor(this.y);
	this.z = Math.floor(this.z);
};
Point3.prototype.round = function() {
	this.x = Math.round(this.x);
	this.y = Math.round(this.y);
	this.z = Math.round(this.z);
};
Point3.prototype.ceil = function() {
	this.x = Math.ceil(this.x);
	this.y = Math.ceil(this.y);
	this.z = Math.ceil(this.z);
};
Point3.prototype.get = function(){
	return new Point(this.x,this.y,this.z);
};
Point3.prototype.normalize = function() {
	var n = Point3.mag(this);
	this.x/=n;
	this.y/=n;
	this.z/=n;
};
// other
Point3.mag = function(p){
	return mag3(p.x,p.y,p.z);
};
Point3.copy = function(a,b){
	b.x = a.x;
	b.y = a.y;
	b.z = a.z;
};
Point3.normalize = function(p){
	var n = Point3.mag(p);
	return new Point(p.x/n,p.y/n,p.z/n);
};
// 2D
function Point2(x,y){
	this.x = x || 0;
	this.y = y || 0;
}
// methods
Point2.prototype.add = function(p) {
	this.x+=p.x;
	this.y+=p.y;
};
Point2.prototype.sub = function(p) {
	this.x-=p.x;
	this.y-=p.y;
};
Point2.prototype.mult = function(p) {
	this.x*=p;
	this.y*=p;
};
Point2.prototype.div = function(p) {
	this.x/=p;
	this.y/=p;
};
Point2.prototype.floor = function() {
	this.x = Math.floor(this.x);
	this.y = Math.floor(this.y);
};
Point2.prototype.round = function() {
	this.x = Math.round(this.x);
	this.y = Math.round(this.y);
};
Point2.prototype.ceil = function() {
	this.x = Math.ceil(this.x);
	this.y = Math.ceil(this.y);
};
Point2.prototype.get = function(){
	return new Point(this.x,this.y);
};
Point2.prototype.normalize = function() {
	var n = Point2.mag(this);
	this.x/=n;
	this.y/=n;
};
Point2.prototype.rotateA = function(a,d) {
	var s = Math.sin(a), c = Math.cos(a);
	if(d){
		this.x = this.x*c+this.y*s;
		this.y = this.y*c-this.x*s;
	}else{
		this.x = this.x*c-this.y*s;
		this.y = this.y*c+this.x*s;
	}
};
// other
Point2.sub = function(a,b){
	return new Point2(a.x-b.x,a.y-b.y);
};
Point2.add = function(a,b){
	return new Point2(a.x+b.x,a.y+b.y);
};
Point2.mult = function(a,b){
	return new Point2(a.x*b,a.y*b);
};
Point2.div = function(a,b){
	return new Point2(a.x/b,a.y/b);
};
Point2.mag = function(p){
	return mag2(p.x,p.y);
};
Point2.normalize = function(p){
	var n = Point2.mag(p);
	return new Point2(p.x/n,p.y/n);
};
Point2.copy = function(a,b){
	b.x = a.x;
	b.y = a.y;
};
Point2.heading = function(p){
	return Math.atan2(p.y,p.x);
};
Point2.rotateA = function(p,a,d) {
	var r = new Point2();
	var s = Math.sin(a), c = Math.cos(a);
	if(d){
		r.x = p.x*c+p.y*s;
		r.y = p.y*c-p.x*s;
	}else{
		r.x = p.x*c-p.y*s;
		r.y = p.y*c+p.x*s;
	}
	return r;
};