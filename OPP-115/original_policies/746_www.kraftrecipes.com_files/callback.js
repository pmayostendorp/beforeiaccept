jsonp = {
	handlerKey : {},	
	count : 1,
	httpcall : function(url, handler){
	   	var id = jsonp.newId();
		this.handlerKey[id] = handler;
		if (url.indexOf("?") > 0) url = url + "&rid="+id;
		else url = url + "?rid="+id;
		
		var s = document.createElement("script");
		s.type = "text/javascript";
		s.src = url;
		document.getElementsByTagName("head")[0].appendChild(s);
	},
	
	callbackResponse : function(d) {
		jsonp.handlerKey[d.rid].callback(d);
		jsonp.handlerKey[d.rid] = null;
	},
	
	newId : function (){return this.count++;},
	
	call: function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	
	    jsonp.httpcall(params, {
		callback:function(r){ this.cb.callback(r); },
		cb: handler}
	    );
	
	}
};

