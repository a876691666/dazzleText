var dt = function (a) {

	var o = {};//options list
	var d = {};//DOM

	var dazzleText = function () {

	};

	dazzleText.prototype = {
		trim : function (str){
		    return str.replace(/^(\s|\u00A0)+/,'').replace(/(\s|\u00A0)+$/,'');
		}
	};

	dazzleText.prototype.init = function (a) {

		if(typeof(a) == 'string') {
			if( d = document.getElementById(a) ){
				o.DOM = d;
				o.text = this.trim(d.innerHTML);
				o.id = a;

				for(var i in d.dataset){
					o[i] = d.dataset[i];
				}
			}else{
				return false;
			}
		}
		if(typeof(a) == 'object') {
			if(!a.id) return false;
			if( d = document.getElementById(a.id) ){
				o.DOM = d;
				o.text = this.trim(d.innerHTML);

				for(var i in a){
					o[i] = a[i];
				}
			} else{
				return false
			}
		}

		this.options = o;

		return this;
	};
	return new dazzleText().init(a);
};