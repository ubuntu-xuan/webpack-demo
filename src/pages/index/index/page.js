require('./index.scss');

import needDelay from './function.js';

$(document).ready(function(){

  var sub = $('#sub');
  var activeRow;
  var activeMenu;

  var timer;

  var mouseInSub = false;

  sub.on('mouseenter',function(e){
    mouseInSub = true;
  }).on('mouseleave',function(e){
    mouseInSub = false;
  })

/**
mouseenter和mouseover的区别：
（1）使用mouseenter，只有鼠标指针穿过被选元素时，才会触发mouseenter事件;
    使用mouseover，不论鼠标指针穿过被选元素或其子元素，都会触发 mouseover 事件。

mouseleave和mouseout的区别：
（1）使用mouseleave，只有在鼠标指针离开被选元素(包括子元素)时，才会触发 mouseleave 事件;
    使用mouseout，如果鼠标指针离开被选元素到子元素，即便没有离开被选元素，都会触发 mouseout 事件。
**/

  var mouseTrack = []

  var moveHandler = function(e){   //e是event，其中包含鼠标事件的各种信息
    mouseTrack.push({
      x:e.pageX,
      y:e.pageY
    })
    //只保存鼠标上一次位置和当前位置，所以只保存两个数组
    if (mouseTrack.length > 3 ){
      mouseTrack.shift()
    }
  }

  $('#test') //这里用#test ul li而不用#test
  .on('mouseenter',function(e){
    sub.removeClass('none');  //当鼠标移动到li上，显示二级菜单
    $(document).bind('mousemove',moveHandler);


  })
  .on('mouseleave',function(e){
    sub.addClass('none');  //当鼠标离开li时，隐藏二级菜单
    if(activeRow){
      activeRow.removeClass('active'); //当activeRow不为空时，移除active标签
      activeRow = null;                //设其为null
    }
    if(activeMenu){
      activeMenu.addClass('none');
      activeMenu = null;
    }
    //解绑
    $(document).unbind('mousemove',moveHandler);

  })
  // 当鼠标在不同的li中切换时触发
  .on('mouseenter','li',function(e){
    if(!activeRow){ //当激活项不存在，即是第一次进入列表

      activeRow = $(e.target).addClass('active');  //当鼠标移动到li时，给该li赋上active标签
      console.log('第一次进入列表项，显示子菜单' + activeRow.data('id'));
      activeMenu = $('#' + activeRow.data('id'));
      activeMenu.removeClass('none'); //显示与该li相对应的二级菜单
      return;
    }

    //激活项存在
    console.log('进入另一列表项，显示另一子菜单');
    console.log('此时timer为：' + timer);
    if(timer){
      console.log('timer为：',timer);
      clearTimeout(timer);
    }

    var currMousePos = mouseTrack[mouseTrack.length - 1]; //鼠标当前位置
    var leftCorner = mouseTrack[mouseTrack.length - 2]; //鼠标前一次位置
    console.log(currMousePos);
    console.log(leftCorner);

    var delay = needDelay(sub,leftCorner,currMousePos);
    console.log('delay为：' + delay);

    // 若当前鼠标在上一次鼠标所在的点与二级菜单左上角、左下角所组成的三角形中时，需要延迟
    if(delay){
      timer = setTimeout(function(){
        console.log('延迟显示');
        console.log(mouseInSub);
        if(mouseInSub){
          console.log('mouseInSub为true');
          console.log('鼠标在二级菜单中');
          return
        }

        activeRow.removeClass('active'); //取消的是上一次鼠标指向的列表项
        activeMenu.addClass('none');

        activeRow = $(e.target); //获取当前指向的列表项
        activeRow.addClass('active');
        activeMenu = $('#' + activeRow.data('id'));
        activeMenu.removeClass('none');
        timer = null;
        console.log('显示新的二级菜单');
        console.log('当前指向的列表：' + activeRow.data('id'));
        console.log('这时timer为：' +  timer);

      },300)
    }else {
      console.log('不需要延迟：');
      console.log('上一次指向的列表项为：'+ activeRow.data('id'));
      var prevActiveRow = activeRow; //将上一次指向的列表项赋值给prevActiveRow
      var prevActiveMenu = activeMenu;

      activeRow = $(e.target); //获取当前指向的列表项
      activeMenu = $('#' + activeRow.data('id'));

      //
      prevActiveRow.removeClass('active'); //上一次指向的列表项
      prevActiveMenu.addClass('none'); //隐藏上一次指向的列表项所对应的二级菜单

      activeRow.addClass('active');
      activeMenu.removeClass('none');
    }
  })

})
