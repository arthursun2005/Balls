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
	this.c = "#DD660010";
}
Ball.prototype.solveLineSegment = function(p1,p2){
};
Ball.prototype.draw = function() {
	var d = MM.c.getContext("2d");
	d.beginPath();
	d.translate(this.p.x+MM.mx,this.p.y+MM.my);
	d.strokeStyle = "#FF000077";
	d.fillStyle = this.c;
	d.lineWidth = 2;
	d.arc(0,0,this.r,0,2*Math.PI);
	d.translate(-this.p.x-MM.mx,-this.p.y-MM.my);
	d.stroke();
	d.fill();
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
	if(this.p.y>MM.hh-this.r && this.v.y>0){
		this.v.y*=-1;
	}
};
Ball.prototype.edge2 = function() {
	if(this.p.x<this.r-size && this.v.x<0){
		this.v.x*=-1;
	}
	if(this.p.x>size-this.r && this.v.x>0){
		this.v.x*=-1;
	}
	if(this.p.y<this.r-size && this.v.y<0){
		this.v.y*=-1;
	}
	if(this.p.y>size-this.r && this.v.y>0){
		this.v.y*=-1;
	}
};
Ball.prototype.each = function(other) {
	var d = Point2.sub(other.p,this.p);
	var n = Point2.normalize(d);
	var m = Point2.mag(d);
	var a = Point2.heading(d);
	if(m<this.r+other.r){
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

		var l = this.r+other.r-m;
		other.p.add(Point2.mult(n,l/2));
		this.p.sub(Point2.mult(n,l/2));
	}
};
var Balls = {
	getMaxRadius: function(bs){
		if(bs.length<1){
			return null;
		}else{
			var R = bs[0].r;
			for (var i = bs.length - 1; i >= 1; i--) {
				if(bs[i].r>R) R = bs[i].r;
			}
			return R;
		}
	},
	solve: function(bs){
		var all = [], maxRadius = this.getMaxRadius(bs);
		var maxD = maxRadius*2;
		if(bs.length<1) return;
		var s = new Point2();
		Point2.copy(bs[0].p,s);
		for (var i = bs.length - 1; i >= 1; i--) {
			if(bs[i].p.x<s.x) s.x = bs[i].p.x;
			if(bs[i].p.y<s.y) s.y = bs[i].p.y;
		}
		s.div(maxD);
		s.floor();
		for (var i = bs.length - 1; i >= 0; i--) {
			var b = bs[i];
			var x = Math.floor(b.p.x/maxD)-s.x,
				y = Math.floor(b.p.y/maxD)-s.y;
			if(!all[y]) all[y] = [];
			if(!all[y][x]) all[y][x] = [];
			all[y][x].push({obj:b,id:i});
		}
		for (var i = bs.length - 1; i >= 0; i--) {
			var b = bs[i];
			var x = Math.floor(b.p.x/maxD)-s.x,
				y = Math.floor(b.p.y/maxD)-s.y;
			for(var py=y-1;py<=y+1;py++){
				if(!all[py]) continue;
				for(var px=x-1;px<=x+1;px++){
					if(!all[py][px]) continue;
					for (var j = all[py][px].length - 1; j >= 0; j--) {
						var k = all[py][px][j];
						var b2 = k.obj;
						var d = Point2.sub(b2.p,b.p);
						var m = Point2.mag(d);
						b.each(b2);
					}
				}
			}
		}
		this.all = all;
	},
	f1: function(bs,f){
		var s = new Point2();
		Point2.copy(bs[0].p,s);
		for (var i = bs.length - 1; i >= 1; i--) {
			if(bs[i].p.x<s.x) s.x = bs[i].p.x;
			if(bs[i].p.y<s.y) s.y = bs[i].p.y;
		}
		s.div(maxD);
		s.floor();
		var maxRadius = this.getMaxRadius(bs);
		var maxD = maxRadius*2;
		var all = this.all;
		for (var i = bs.length - 1; i >= 0; i--) {
			var b = bs[i];
			var x = Math.floor(b.p.x/maxD)-s.x,
				y = Math.floor(b.p.y/maxD)-s.y;
			for(var py=y-1;py<=y+1;py++){
				if(!all[py]) continue;
				for(var px=x-1;px<=x+1;px++){
					if(!all[py][px]) continue;
					for (var j = all[py][px].length - 1; j >= 0; j--) {
						var k = all[py][px][j];
						var b2 = k.obj;
						if(f) f(b,b2);
					}
				}
			}
		}
	},
	f1: function(bs,f,w,h){
		var s = new Point2();
		Point2.copy(bs[0].p,s);
		for (var i = bs.length - 1; i >= 1; i--) {
			if(bs[i].p.x<s.x) s.x = bs[i].p.x;
			if(bs[i].p.y<s.y) s.y = bs[i].p.y;
		}
		s.div(maxD);
		s.floor();
		var maxRadius = this.getMaxRadius(bs);
		var maxD = maxRadius*2;
		var all = this.all;
		for (var i = bs.length - 1; i >= 0; i--) {
			var b = bs[i];
			var x = Math.floor(b.p.x/maxD)-s.x,
				y = Math.floor(b.p.y/maxD)-s.y;
			for(var py=y-1;py<=y+1;py++){
				if(!all[py]) continue;
				for(var px=x-1;px<=x+1;px++){
					if(!all[py][px]) continue;
					for (var j = all[py][px].length - 1; j >= 0; j--) {
						var k = all[py][px][j];
						var b2 = k.obj;
						if(f) f(b,b2);
					}
				}
			}
		}
	}
};