function sameSign(a,b){
  return (a ^ b) >= 0   //按位异或，当a与b同为0或同为1时返回0,只有一个1时返回1
                        //两个数字进行最高位进行异或运算，0表示正数，1表示负数
}

function vector(a,b){
  return{
    x:b.x - a.x,
    y:b.y - a.y
  }
}

function vectorProduct(v1,v2){
  return v1.x * v2.y - v2.x * v1.y
}

// 同向法：判断一个点是否在三角形内部
// 见印象笔记相关介绍

function isPointInTrangle(p,a,b,c){
  var pa = vector(p,a);
  var pb = vector(p,b);
  var pc = vector(p,c);

  var t1 = vectorProduct(pa,pb);
  var t2 = vectorProduct(pb,pc);
  var t3 = vectorProduct(pc,pa);

  return sameSign(t1,t2) && sameSign(t2,t3)
}

function needDelay(elem,leftCorner,currMousePos){
  var offset = elem.offset();

  //二级菜单的左上角
  var topLeft = {
    x:offset.left,
    y:offset.top
  }
  //二级菜单的左下角
  var bottomLeft = {
    x:offset.left,
    y:offset.top + elem.height()
  }

  return isPointInTrangle(currMousePos,leftCorner,topLeft,bottomLeft);


}

export default needDelay;
