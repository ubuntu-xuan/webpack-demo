require('./index.scss');

import Tab from './tab.js';

// import {name} from './tab.js';


$(function(){
  // var tab1 = new Tab($(".js-tab").eq(0));
  // var tab2 = new Tab($(".js-tab").eq(1));
  // var tab3 = new Tab($(".js-tab").eq(2));

  //用init为所有的js-tab new一对象
  //Tab.init($(".js-tab"));

  // 注册成JQuery方法后调用
  $(".js-tab").tab(); //可链式调用 .css("backgroundColor","red")

});
