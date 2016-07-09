//id：目标容器的id
//text：目标容器里的文字
//style：你要应用的样子
//
//
//css
//

var dt = function (a) {

	var o = {//default option

			type:"roll",//特效该使用什么种类
			direction:"right",//朝什么方向运动   [向右边运动]
			startColor:"#000",//特效的头是黑色   [默认头是黑色]
			endColor:"#fff",//特效的尾巴是白色   [默认尾巴是白色]
			color:"#000",//基础颜色是黑色         [默认字体颜色是黑色]
			size:5,
			time:100,  //ms
			delay:500   //ms

		};//options list
	var init = false;
	var dazzleText = function () {
		this.startIndex = 0;
	};

	dazzleText.prototype = {
		//tools class [list]
		trim : function (str){
		    return str.replace(/^(\s|\u00A0)+/,'').replace(/(\s|\u00A0)+$/,'');
		},
		concat : function (active, passive){//active typeof = list;passive typeof = list; 非深度合并(如果子属性是object，将会同时拷贝指针)
			for(var i in passive){
				active[i] = passive[i];
			}
		}
	};

	dazzleText.prototype.load = function (a) {
		if(init) return;
		if(typeof(a) == 'string') {
			if(!this.init(a, o)) return false;
		}

		if(typeof(a) == 'object') {
			if(!a.id) return false;
			if(!this.init(a.id, o, a)) return false;
		}


		//↑上面的操作是用来在函数体内获取应用层定义的option   同时，找到对应的doms;

		this.options = o;

		this.main();

		init = true;
		return this;
	};

	dazzleText.prototype.init = function (id, options, soption) {
		if(init) return;
		var d = {};//d 是目标容器

		if( d = document.getElementById(id) ){
			this.concat(options, soption || d.dataset);

			this.DOM = d;
			this.originText = this.trim(d.innerHTML);
			if(!options.id) options.id = id;

		} else{
			return false;
		}
		return true;
	};

	dazzleText.prototype.main = function () {
		if(init) return;
		var option = this.options;
		var DOM = this.DOM;

		this.clear();//清空目标容器
		this.create();//创建循环所需要的dom
		this.start();//动画开始
	};

	dazzleText.prototype.clear = function () {
		this.DOM.innerHTML = '';
	};

	dazzleText.prototype.create = function () {
		for(var i = 0; i < this.options.size; i++) this.DOM.innerHTML += '<div style="display:none;" index="'+ i +'"></div>'
		for(var i in this.originText) this.DOM.innerHTML += '<div class="dt-inline">'+ this.originText[i] +'</div>';
	};

	dazzleText.prototype.createAnimation = function (){ 
		var that = this;
		var option = this.options;
		var DOM = this.DOM;
		var children = DOM.childNodes;
		var centerSign = children[this.startIndex];

		for(var i in children) {
			if(typeof(children[i]) != "object") continue;
			children[i].className = children[i].className.replace(" one", "");
		}

		if(this.startIndex == children.length){ // 如果是末尾
			this.stop(true);

			setTimeout(function(){
				that.start(true);
			}, option.delay);

			return ;
		}

		centerSign.className += " one";
		this.startIndex++;
	};

	dazzleText.prototype.start = function (f) {
		if(f) this.startIndex = 0;

		var option = this.options;
		var that = this;
		this.intervalNum = setInterval(function(){
			that.createAnimation();
		}, option.time);
	};

	dazzleText.prototype.stop = function (f) {
		if(f) this.startIndex = 0;

		clearInterval(this.intervalNum);
	};

	dazzleText.prototype.destory = function () {

	};

	dazzleText.prototype.setOption = function (key, value) {
		this.options[key] = value;
	};

	return new dazzleText().load(a);
};