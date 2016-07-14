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

	var dazzleText = function () {
		this.startIndex = 0;
		this.isDestory = true;
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

		if(typeof(a) == 'string') {
			if(!this._initOptions(a, o)) return false;
		}

		if(typeof(a) == 'object') {
			if(!a.id) return false;
			if(!this._initOptions(a.id, o, a)) return false;
		}


		//↑上面的操作是用来在函数体内获取应用层定义的option   同时，找到对应的doms;

		this.options = o;

		return this;
	};

	dazzleText.prototype._initOptions = function (id, options, soption) {
		var d = {};//d 是目标容器

		if( d = document.getElementById(id) ){
			this.concat(options, soption || d.dataset);

			this.DOM = d;
			this.originText = d.innerHTML;
			this.text = this.trim(d.innerHTML);

			if(!options.id) options.id = id;

		} else{
			return false;
		}
		return true;
	};

	dazzleText.prototype.init = function () {
		var option = this.options;
		var DOM = this.DOM;
		this.isDestory = false;

		this.clear();//清空目标容器
		this.create();//创建循环所需要的dom
		this.play();//动画开始
	};

	dazzleText.prototype.clear = function () {
		this.DOM.innerHTML = '';
	};

	dazzleText.prototype.create = function () {
		for(var i = 0; i < this.options.size; i++) this.DOM.innerHTML += '<div style="display:none;" index="'+ i +'"></div>';
		for(var i in this.text) this.DOM.innerHTML += '<div class="dt-inline">'+ this.text[i] +'</div>';
	};

	dazzleText.prototype._createAnimation = function (){ 
		var that = this, option = this.options, DOM = this.DOM, children = DOM.childNodes, centerSign = children[this.startIndex];
		for(var i in children) {
			if(typeof(children[i]) != "object") continue;
			children[i].className = children[i].className.replace(" one", "");
		}

		if(this.startIndex == children.length){ // 如果是末尾
			this.stop(true);

			setTimeout(function(){
				that.play(true);
			}, option.delay);

			return ;
		}

		centerSign.className += " one";
		this.startIndex++;
	};

	dazzleText.prototype.play = function (f) {
		if(this.isDestory) return;
		if(f) this.startIndex = 0;
		if(this.stopFlag) return;
		this.stopFlag = true;

		var option = this.options;
		var that = this;

		this.intervalNum = setInterval(function(){
			that._createAnimation();
		}, option.time);
	};

	dazzleText.prototype.stop = function (f) {
		if(this.isDestory) return;
		if(f) this.startIndex = 0;
		this.stopFlag = false;
		
		clearInterval(this.intervalNum);
	};

	dazzleText.prototype.destory = function () {
		this.stop(true);
		this.isDestory = true;
		this.DOM.innerHTML = this.originText;
	};

	dazzleText.prototype.setOption = function (key, value) {
		this.options[key] = value;
	};
	
	var dt = new dazzleText();

	dt.load(a);
	dt.init(a);

	return 	dt;
};