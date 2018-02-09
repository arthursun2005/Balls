function cl1(x1,y1,x2,y2,x,y,r){
	var mp = new Point2(x1+x2,y1+y2);
	var p2 = Point2.sub(new Point2(x1,y1), new Point2(x2,y2));
	mp.div(2);
	var m1 = Point2.mag(Point2.sub(new Point2(x,y),mp));
	// 
	if(Math.pow(m1*m1-r*r,1/2)<Point2.mag(p2)*(r/Point2.mag(p2))*1/2){
		return true;
	}else{
		return false;
	}
}