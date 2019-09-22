
function sameSign(a,b){
	return (a ^ b) >= 0
}

function vector(a,b){ //定义向量，终点坐标-起点坐标
	return {
		x:b.x - a.x,
		y:b.y - a.y
	}
}
function vectorProduct(v1,v2){ //叉乘公式
	return (v1.x * v2.y) - (v2.x * v1.y)
}
function isPoinInTrangle(p,a,b,c){ //判断是否在三角形内部
	var pa = vector(p,a)
	var pb = vector(p,b)
	var pc = vector(p,c)

	var t1 = vectorProduct(pa,pb)
	var t2 = vectorProduct(pb,pc)
	var t3 = vectorProduct(pc,pa)

	return sameSign(t1,t2) && sameSign(t2,t3)
}

function needDelay(elem,leftCorner,currMousePos){//判断是否需要延迟
	var offset = elem.offset()

	var topLeft = {
		x:offset.left,
		y:offset.top
	}

	var bottomLeft = {
		x: offset.left,
		y: offset.top + elem.height()
	}
	return isPoinInTrangle(currMousePos,leftCorner,topLeft,bottomLeft)
}