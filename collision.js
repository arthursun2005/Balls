function closestpointonline(lx1, ly1, 
      lx2, ly2, x0, y0){ 
      var A1 = ly2 - ly1; 
      var B1 = lx1 - lx2; 
      var C1 = (ly2 - ly1)*lx1 + (lx1 - lx2)*ly1; 
      var C2 = -B1*x0 + A1*y0; 
      var det = A1*A1 - -B1*B1; 
      var cx = 0; 
      var cy = 0; 
      if(det != 0){
            cx = ((A1*C1 - B1*C2)/det); 
            cy = ((A1*C2 - -B1*C1)/det); 
      }else{ 
            cx = x0;
            cy = y0;
      } 
      return new Point2(cx, cy); 
}
function cl1(x1,y1,x2,y2,x,y,r){
	var mp = new Point2(x1+x2,y1+y2);
	var p2 = Point2.sub(new Point2(x1,y1), new Point2(x2,y2));
	mp.div(2);
	var m1 = Point2.mag(Point2.sub(new Point2(x,y),mp));
	if(Math.pow(m1*m1-r*r,1/2)<Point2.mag(p2)){
		return true;
	}else{
		return false;
	}
	/*var r = closestpointonline(x1,y1,x2,y2,x,y);
	if(Point2.mag(Point2.sub(r,new Point2(x,y)))<r){
		return 	true;
	}else{
		return false;
	}
	var p = new Point2(x,y);
	if(y2>y1){
		var p1 = new Point2(x2,y2);
		var p2 = new Point2(x1,y1);
	}else{
		var p1 = new Point2(x1,y1);
		var p2 = new Point2(x2,y2);
	}
	var pc = new Point2((p1.x+p2.x)/2,(p1.y+p2.y)/2);
	var d1 = Point2.sub(p,pc);
	var d2 = Point2.sub(p2,p1);
	var a1 = Point2.heading(d1);
	var a2 = Point2.heading(d2);
	var m1 = Point2.mag(d1);
	var m2 = Point2.mag(d2);
	var t = Math.abs(a1-a2);
	if(a1>a2+Math.PI) t-=Math.PI; 
	var e1 = Point2.sub(p,p2), e2 = Point2.sub(p,p1);
	var ends = Point2.mag(e1)<r || Point2.mag(e2)<r;
	if(Math.sin(t)*m1<r && Math.cos(t)*m1<m2/2 || ends) return true;
	else return false;
	*/
}
// https://stackoverflow.com/questions/2255842/detecting-coincident-subset-of-two-coincident-line-segments/2255848#2255848
function l1(a,b,c,d){
    var denominator = ((b.x - a.x) * (d.y - c.y)) - ((b.y - a.y) * (d.x - c.x));
    var numerator1 = ((a.y - c.y) * (d.x - c.x)) - ((a.x - c.x) * (d.y - c.y));
    var numerator2 = ((a.y - c.y) * (b.x - a.x)) - ((a.x - c.x) * (b.y - a.y));

    // Detect coincident lines (has a problem, read below)
    if (denominator == 0) return numerator1 == 0 && numerator2 == 0;

    var r = numerator1 / denominator;
    var s = numerator2 / denominator;

    return (r >= 0 && r <= 1) && (s >= 0 && s <= 1);
}