;(function($){ //分号是为了防止这段代码的前一段javascript代码结尾没有分号，避免运行时发生错误

  var Tab = function(tab){ //tab为传入的节点

    var _this_ = this; //this指向Tab这个对象

    //保存单个tab组件 这里指每一个li
    this.tab = tab;

    //默认配置参数
    this.config = {
        "triggerType":"mouseover",//用来定义鼠标的触发类型
        "effect":"default",//定义内容切换效果
        "invoke":1,//默认显示第几个tab
        "auto":false //定义tab是否自动切换
    };

    if(this.getConfig()){
      console.log(this.config);
      $.extend(this.config,this.getConfig()); //通过$.extend()来扩展jQuery
    };

    //保存tab标签列表，对应的内容列表
    this.tabItems = this.tab.find("ul.tab-nav li");
    console.log(this.tabItems[0].outerHTML);
    this.contentItems = this.tab.find("div.content-wrap div.content-item");

    //保存配置参数
    var config = this.config;

    if(config.triggerType === "click"){
      this.tabItems.bind(config.triggerType,function(){
            console.log(this.outerHTML);
            console.log(this);

            _this_.invoke($(this)); //进行切换效果
      });
    }else if (config.triggerType === "mouseover" || config.triggerType != "click" ) { //当输入的事件出错，同样执行mouseover
      // console.log('此时的this:' + this);
      // console.log(this); //这里的this指向的是Tab对象

      //bind 规定事件发生时运行的函数
      this.tabItems.bind("mouseover",function(e){
          var self = $(this); //这里的this指向的是li(tabItems)
          this.timer = window.setTimeout(function(){
            _this_.invoke(self); //进行切换效果  _this_指向Tab对象
          },300);

      });

      // }).mouseout(function(){
      //     window.clearTimeout(this.timer);
      // });
    };

    //自动切换，当配置了时间，根据时间间隔进行自动切换
    if(config.auto){
      //定义全局定时器
      this.timer = null;
      console.log(this.timer);
      //计数器
      this.loop = 0;

      this.autoPlay();


      /**hover() 方法规定当鼠标指针悬停在被选元素上时要运行的两个函数。
        hover第一个function会执行鼠标指针悬停在被选元素上时要运行的函数
        hover第一个function会执行鼠标指针离开在被选元素上时要运行的函数

        （jQuery 1.7 版本前该方法触发 mouseenter 和 mouseleave 事件。
        jQuery 1.8 版本后该方法触发 mouseover 和 mouseout 事件。）

        因为这里触发 mouseover，所以自动切换了一次定时器就被清除，所以只能切换一次

      **/

      this.tab.hover(function(){
          window.clearInterval(_this_.timer);
      },function(){
        _this_.autoPlay();
      });
    };

    //设置默认显示第几个tab
    if(config.invoke > 1){
      console.log('tab::::' + config.invoke );
      this.invoke(this.tabItems.eq(config.invoke - 1));
    };


  };

  Tab.prototype = {
    //自动间隔时间切换
    autoPlay:function(){
      // console.log("autoPlay");
      // console.log(this);
      var _this_    = this,
          tabItems  = this.tabItems, //临时保存tab列表
          tabLength = tabItems.size(),//tab的个数
          config    = this.config;

      this.timer = window.setInterval(function(){
        console.log(_this_.loop);
        _this_.loop ++;

        if(_this_.loop >= tabLength){
          _this_.loop = 0;
        };

        //当开启自动切换时，按指定的方式进行切换

        /**
        自动播放若用trigger方法实现的：类似_this_.list.eq(_this_.iNum).trigger(_this_.customConfig.triggerType);
        这时候如果把triggerType改为mouseover会有个bug，因为trigger("mouseover")时也会触发父元素的hover事件，
        即会清除定时器，所以这种情况自动播放就失效了，解决：在事件绑定时阻止冒泡，参考：
        **/

        //tabItems.eq(_this_.loop).trigger(config.triggerType);

        //不加这里会导致不能自动播放
        //tabItems.eq(_this_.loop).trigger("mouseout");

        //所以要这样用
        _this_.invoke(tabItems.eq(_this_.loop));

      },config.auto);

    },

    //获取配置参数
    getConfig:function(){
      //获取tabelem节点上的data-config
      var config = this.tab.attr("data-config");

      if(config&&config!=""){
        return $.parseJSON(config);
      }else{
        return null;
      };
    },

    invoke:function(currentTab){
      var _this_ = this;

      var index = currentTab.index();
      currentTab.addClass("actived").siblings().removeClass("actived"); //siblings()兄弟结点

      var effect = this.config.effect;
      var conItems = this.contentItems;

      if(effect === "default" || effect != "fade"){
        conItems.eq(index).addClass("current").siblings().removeClass("current");
      }else if (effect === "fade") {
        conItems.eq(index).fadeIn().siblings().fadeOut();
      };

      //若配置了自动切换，把计数器与tab的index同步
      if(this.config.auto){
        this.loop = index;
      };

    }

  };

  // Tab.init = function(tabs){
  //   var _this_ = this;
  //   tabs.each(function(){
  //     new _this_($(this)); //这里的this指的是each里的每一个tab
  //   });
  //
  // };

  //注册成JQuery方法
  $.fn.extend({
    tab:function(){
      this.each(function(){ //this指的是调用这个方法的对象，即是
        new Tab($(this)); //传入的$(".js-tab")中的每一个
      });
      return this; //执行完之后return实现链式调用
    }
  });


  window.Tab = Tab; //注册到window上

})(jQuery);

export  { Tab as default};
