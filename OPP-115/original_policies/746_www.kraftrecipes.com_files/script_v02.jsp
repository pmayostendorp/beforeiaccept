
		try {
		var callURL = 'http://www.groceryserver.com/groceryserver' + "/api/session/serviceBinder.jsp" ;
		if (ENABLE_HTTPS != null && ENABLE_HTTPS == 'true') callURL = callURL.replace("http", "https");
		
			var cv = s3.cookie.getRaw('GS_IRIPANELIST');
			if ((!cv || cv.length <= 0) && (document.location+'').indexOf('groceryserver.com') < 0) s3.ajax.encOD(callURL, {callback:function(d){ var c; if (d && d.echo && d.echo.length > 0) for (var i = 0; i < d.echo.length; i++) if ((c = d.echo[i]).name == "GS_IRIPANELIST") s3.cookie.setRaw('GS_IRIPANELIST', c.value, new Date(2015, 1, 1, 1, 1, 1, 1)); }});
		} catch(e) {}

_globalResponseHandler = null;
var s3 = {
	elemCache: new Object(),
	$:function(id, reload) {if(!s3.elemCache[id]||reload){var e = document.getElementById(id);s3.elemCache[id] = e;return e;} else return s3.elemCache[id];},
	x$:function(id){s3.elemCache[id]=null;},
	$$:function(id){return s3.$(id,true)},
	pos:function(e,m){e=s3.c(e);if(!m)m={x:0,y:0};var x=0,y=0;while(e){x+=e.offsetLeft;y+=e.offsetTop;try{e=e.offsetParent;}catch(ex){e=null;}}return{x:x+m.x,y:y+m.y};},
	vp: function() { var w=window,d=document; var ox=0,oy=0; if(typeof(w.pageYOffset)=='number') { oy = w.pageYOffset; ox = w.pageXOffset; } else if( d.body && ( d.body.scrollLeft || d.body.scrollTop ) ) { oy = d.body.scrollTop; ox = d.body.scrollLeft; } else if( d.documentElement && ( d.documentElement.scrollLeft || d.documentElement.scrollTop ) ) { oy = d.documentElement.scrollTop; ox = d.documentElement.scrollLeft; } return {w:(w.innerWidth || (d.documentElement.clientWidth || d.body.clientWidth)), h:(w.innerHeight || (d.documentElement.clientHeight || d.body.clientHeight)), x:ox,y:oy}; },
	modpos:function(p,t) {return {x:p.x+t.x,y:p.y+t.y};},
	cpos:function(d) {var vp = s3.vp();return {x:((vp.w/2)-((d.w)/2)+vp.x), y:((vp.h/2)-((d.h)/2)+vp.y),w:d.w,h:d.h};},
	dim:function(e){e=s3.c(e);return (!e||!e.offsetWidth)?{w:0,h:0}:{w:e.offsetWidth,h:e.offsetHeight};},
	absolute:function(e){e=s3.c(e);if(e.style.position=='absolute')return;var p=s3.pos(e);var w=e.clientWidth;var h=e.clientHeight;e.style.position='absolute';e.style.left=(document.all?p.x+1:p.x)+'px';e.style.top=(document.all?p.y+1:p.y)+'px';},
	inject:function (d,s){for(var p in s)d[p]=s[p];return d;},
	extend:function (d,s){for(var p in s)if(!d[p])d[p]=s[p];return d;},

	create:function(id, cname) { var e = document.createElement('div'); s3.absolute(e); s3.hide(e); if (cname) {e.className = cname;} if (id) {e.id = id;} document.body.insertBefore(e,document.body.childNodes[0]); return e; },
	img:function(id, src, cname) { var e = document.createElement('img'); e.src = src;s3.absolute(e);s3.hide(e);if (cname) {e.className = cname;}if (id) {e.id = id;}document.body.insertBefore(e,document.body.childNodes[0]); return e; },
	trim: function (str){return (''+str).replace(/^(\s)*/,'').replace(/(\s)*$/,'');},
	empty:function(s) {return s==null||s3.trim(s)=="";},
	replaceAll:function(str,s1,s2) {return (''+str).split(s1).join(s2);},
	escapeURI:function(s) { var s2 = ''+s; try {s2 = encodeURIComponent(s2);} catch(ex) {s2 = escape(s2);}  return s2.replace(/%20/g,"+");},
	getElementsByClassName: function(className, tag, elm) {var tc = new RegExp("(^|\\s)" + className + "(\\s|$)");tag = tag || "*";elm = elm || document;var es = (tag == "*" && elm.all)? elm.all : elm.getElementsByTagName(tag);var re = [];var l = es.length;for(var i=0; i<l; i++)if(tc.test(es[i].className))re.push(es[i]); return re;}
}

s3.obj = s3.inject(new Object(),{
	count: 0,
	ects: new Object(),
	timeout: function(o,f,t){var id=s3.chr.fromNum(this.count++);this.ects[id]=o;setTimeout('s3.obj.cb("'+id+'","'+f+'")',t);},
	cb:  function(i,f){var o=s3.obj.ects[i];if(o!=null){o[f]();this.ects[i]=null;}}
});

s3._try = s3.inject(new Object(),{these: function(){for(var i=0,a=arguments;i<a.length;i++){try{return(a[i])();}catch(e){}}return null;}});

s3.chr = s3.inject(new Object(),{
	chrs:'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
	fromNum: function(n){return this.base(n,10)},
	toNum: function(s){return this.from(s,10)},
	base: function(n,b){var s='';while(n>=b){s=this.chrs.charAt(n%b)+s;n=Math.floor(n/b);}return this.chrs.charAt(n)+s;},
	from: function(s,b){if(!this.revc){this.revc=new Object();for(var i=0;i<this.chrs.length;i++)this.revc[this.chrs.charAt(i)]=i;}
		var r=0,i=0;for(var p=0;i=s.length-p-1,p<s.length;p++)r+=this.revc[s.charAt(p)]*(i>0?Math.pow(b,i):1);return r;
	},
	guid: function(){return this.base(new Date().getTime(),62)+s3.rnd.str(8);}
});

s3.rnd = s3.inject(new Object(),{
	num: function(x,y){return(Math.floor(Math.random()*(y-x)))+x;},
	str: function(len){var s='';while(s.length<len)s+=s3.chr.chrs.charAt(this.num(0,62));return s;}
});

/* misc? */
s3.time = function(){return(new Date()).getTime();}

/* Collections */
s3.a = {
	ary: function(o) {if(o==null)return [];return typeof(o)!='string'&&o.length!=null?o:[o]; },
	add: function(a,o){a[a.length]=o;},
	addAll: function(a,a2){if(a)for(var i=0;i<a2.length;i++)a[a.length]=a2[i];},
	insert: function(a,p,o) {if(p<0)p=0;if(p>a.length)p=a.length;for(var i=a.length;i>p;i--)a[i]=a[i-1];a[p]=o;},
	removeAt: function(a,p) {if(p==-1||!a||a.length<=0)return null;var tmp=a[p];for(var i=p+1;i<a.length;i++)a[i-1]=a[i];a.length=a.length-1;return tmp;},
	remove: function(a,o) {return s3.a.removeAt(a,s3.a.indexOf(a,o));},
	indexOf: function(a,tst) {for(var i=0;i<a.length;i++)if(a[i]==tst)return i;return -1;},
	call: function(a,f){if(a&&a.length>0)for(var i in a)f(a[i]);},
	runAll: function(a,f) {for(var i=0;i<a.length;i++)f(a[i])}
}

s3.ajax = s3.inject(new Object(),{
	odh:{},
	encOD: function(u,ha){
		var rid = s3.ajax.newId();
		var s = document.createElement('script');
		s.setAttribute('type', 'text/javascript');
		s.setAttribute('src', u + '?!' + rid + '!xx');
		this.odh[rid] = ha;
		document.getElementsByTagName('head')[0].appendChild(s);
	},
	count: 1,
	asy: new Object(),
	callbackOD: function(d){
		s3.debug("response:" + s3.json.toString(d ? d.dat : d));
//		s3._try.these(function() {
			if (s3.ajax.odh && s3.ajax.odh[d.rid]) {
				try {
					if (_globalResponseHandler)_globalResponseHandler(s3.json.toString(d.dat));
				} catch(e) {
				}
				;
				s3.ajax.odh[d.rid].callback(d.dat);
				s3.ajax.odh[d.rid] = null;
			}
//		});
	},
	newId: function(){return s3.chr.fromNum(this.count++);},
	handle: function(i,h,c){return s3._try.these(function(){if (this.handlers) h[this.handlers[i]](c);})}
});
// this hurts integrations with apps that use s3 already
//var $ajax = s3.ajax;


var _pop = function(s){alert(s3.json.toString(s));}
s3.json = {
	toString: function(o) {if (typeof(o) == 'array') return s3.json.array(o);else return s3.json.object(o); },
	m: {'\b': '\\b','\t': '\\t','\n': '\\n','\f': '\\f','\r': '\\r','"' : '\\"','\\': '\\\\'},
	array: function (x) { var a = ['['], b, f, i, l = x.length, v; for (i = 0; i < l; i += 1) { v = x[i]; f = s3.json[typeof v]; if (f) { v = f(v);if (typeof v == 'string') {if (b) a[a.length] = ',';a[a.length] = v;b = true;}}}a[a.length] = ']';return a.join('');},
	'boolean': function (x) {return String(x);},'null': function (x) {return "null";},
	number: function (x) {return isFinite(x) ? String(x) : 'null';},
	object: function (x) {if (!x) return 'null';if (x instanceof Array) return s3.json.array(x);var a = ['{'], b, f, i, v;for (i in x) {v = x[i];f = s3.json[typeof v];if (f) {v = f(v);if (typeof v == 'string') {if (b) a[a.length] = ',';a.push(s3.json.string(i,true), ':', v);b = true;}}}a[a.length] = '}';return a.join('');},
	string: function (x,n) {if (/["\\\x00-\x1f]/.test(x)) {x = x.replace(/([\x00-\x1f\\"])/g,function(a, b) {var c = s3.json.m[b];if (c) return c;c = b.charCodeAt();return '\\u00' + Math.floor(c / 16).toString(16) + (c % 16).toString(16);});}return (n&&x.match(/^([A-Za-z0-9_]+)$/)) ? x : '"' + x + '"';},
	parse: function (s) {try{if(s.charCodeAt(s.length-1)==0)s=s.substring(0,s.length-1);return eval('(' + s + ')');}catch(e){s=s.substring(0,s.length-1);try {return eval('(' + s + ')');}catch(ex){return '{}';}}}
}


s3.b64="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-~";
s3.cc = function(c) { return String.fromCharCode(c); }
s3.crypto = {
	encode:function(k,t){return s3.crypto.enc(s3.crypto.rc4(k,t))},
	decode:function(k,t){return s3.crypto.rc4(k,s3.crypto.dec(t))},
	enc:function(s){var o="";var c1,c2,c3,e1,e2,e3,e4;var i=0;s=s3.crypto.utf8enc(s);while(i<s.length){c1=s.charCodeAt(i++);c2=s.charCodeAt(i++);c3=s.charCodeAt(i++);e1=c1>>2;e2=((c1&3)<<4)|(c2>>4);e3=((c2&15)<<2)|(c3>>6);e4=c3&63;if(isNaN(c2))e3=e4=64;else if(isNaN(c3))e4=64;o+=s3.b64.charAt(e1)+s3.b64.charAt(e2)+s3.b64.charAt(e3)+s3.b64.charAt(e4);}return o;},
	dec:function(s){var o="";var c1,c2,c3;var e1,e2,e3,e4;var i=0;s=s.replace(/[^A-Za-z0-9\_\-\~]/g,"");while(i<s.length){e1= s3.b64.indexOf(s.charAt(i++));e2= s3.b64.indexOf(s.charAt(i++));e3= s3.b64.indexOf(s.charAt(i++));e4= s3.b64.indexOf(s.charAt(i++));c1=(e1<<2)|(e2>>4);c2=((e2&15)<<4)|(e3>>2);c3=((e3&3)<<6)|e4;o+=s3.cc(c1);if(e3!=64)o+=s3.cc(c2);if(e4!=64)o+=s3.cc(c3);}o=s3.crypto.utf8dnc(o);return o;},
	utf8enc:function(s){s=s.replace(/\r\n/g,"\n");var u="";for(var n=0;n<s.length;n++){var c=s.charCodeAt(n);if(c<128)u+=s3.cc(c);else if((c>127)&&(c<2048)){u+=s3.cc((c>>6)|192);u+=s3.cc((c&63)|128);}else{u+=s3.cc((c>>12)|224);u+=s3.cc(((c>>6)&63)|128);u+=s3.cc((c&63)|128);}}return u;},
	utf8dnc:function(u){var s="";var i=0;var c,c1,c2,c3;c=c1=c2=c3=0;while(i<u.length){c=u.charCodeAt(i);if(c<128){s+=s3.cc(c);i++;}else if((c>191)&&(c<224)){c2=u.charCodeAt(i+1);s+=s3.cc(((c & 31) << 6) | (c2 & 63));i+=2;}else{c2= u.charCodeAt(i+1);c3= u.charCodeAt(i+2);s+= s3.cc(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));i+=3;}}return s;},
	rc4:function(key,text){var i,x,y,t,x2;var s={};for(i=0;i<256;i++)s[i]=i;y=0;for(x=0;x<256;x++){y=(key.charCodeAt(x%key.length)+s[x]+y)%256;t=s[x];s[x]=s[y];s[y]=t;}x=0;y=0;var z="";for(x=0;x<text.length;x++){x2=x%256;y=(s[x2]+y)%256;t=s[x2];s[x2]=s[y];s[y]=t;z+=String.fromCharCode((text.charCodeAt(x)^s[(s[x2]+s[y])%256]));}return z;}
}

s3.debug = function(msg) {
	try {
		var s = "" + msg;

		var dbm = false;
		try { dbm = _debugMode; } catch(e) {}

		if(dbm) {
			if(typeof console !== 'undefined' && 'log' in console) {
				var p = s.indexOf('\n');
				if(console.groupCollapsed && (s.length>130 || p>0)) {
					var sml=(s.substr(0, p>0 && p<130? p:130) + (p>0? "":"..."));
					console.groupCollapsed(sml);
					s=s.replace("request: ","").replace("response:","");
					console.log(s);
					if(console.groupEnd) console.groupEnd();
				} else console.log("  " + s);
			} //else alert(s);
		}
	} catch(ex) {}
}


s3.cookie = {
	get: function(n){var a = document.cookie.split(';');for(var i=0;i<a.length;i++){var t=a[i].split('=');if(n==t[0].replace(/^\s+|\s+$/g,'')){if(t.length==1)return ""; return s3.json.parse(s3.crypto.dec(t[1])).b;}}return null;},
	set:function(n,v,exp,p,d) {document.cookie=n+"="+s3.crypto.enc(s3.json.toString({b:v}))+(exp?"; expires="+exp.toGMTString():"")+(p?"; path="+p:"; path=/")+(d?"; domain="+d:"");},
	getRaw: function(n){var a = document.cookie.split(';');for(var i=0;i<a.length;i++){var t=a[i].split('=');if(n==t[0].replace(/^\s+|\s+$/g,'')){if(t.length==1)return ""; return t[1];}}return null;},
	setRaw:function(n,v,exp,p,d) {document.cookie=n+"="+v+(exp?"; expires="+exp.toGMTString():"")+(p?"; path="+p:"; path=/")+(d?"; domain="+d:"");}
}



		try {
		var callURL = 'http://www.groceryserver.com/groceryserver' + "/api/session/serviceBinder.jsp" ;
		if (ENABLE_HTTPS != null && ENABLE_HTTPS == 'true') callURL = callURL.replace("http", "https");
		
			var cv = s3.cookie.getRaw('GS_IRIPANELIST');
			if ((!cv || cv.length <= 0) && (document.location+'').indexOf('groceryserver.com') < 0) s3.ajax.encOD(callURL, {callback:function(d){ var c; if (d && d.echo && d.echo.length > 0) for (var i = 0; i < d.echo.length; i++) if ((c = d.echo[i]).name == "GS_IRIPANELIST") s3.cookie.setRaw('GS_IRIPANELIST', c.value, new Date(2015, 1, 1, 1, 1, 1, 1)); }});
		} catch(e) {}


var gsapi = {
	cid: 'b522f25ab110f2aa0cb25cb489327484',
	ip: '173.75.26.199'
}

gsapi.call = function (req, handler) {
	var r = { path: req.path, post: req.post };
	s3.debug("request: " + req.path + (req.post? "\n" + s3.json.toString(req.post) : ""));
	s3.ajax.encOD('http://gs.kraftrecipes.com/groceryserver/service/' + s3.crypto.encode("obfuscate", s3.json.toString(r)), handler);
}

gsapi.ack = function (req, handler) {
	var r = { path: req.path, post: req.post };
	s3.debug("request: " + req.path + (req.post? "\n" + s3.json.toString(req.post) : ""));
	s3.ajax.encOD('http://gs.kraftrecipes.com/groceryserver/ack/' + s3.crypto.encode("obfuscate", s3.json.toString(r)), handler);
}

// params is optional
gsapi.logActivity = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = { path: '/ack/logActivity' };
	if (params) req.post = params;
	gsapi.ack(req, {
		callback:function(r){ this.cb.callback(r); },
		cb: handler
	});
}

function listResultInjector(shoppingListId, handler) {
	return {
		shoppingListId:shoppingListId,
		callback:function(r) {
			gsapi.shoppingList.getShoppingListById(this.shoppingListId, this.cb.cb);
		},
		cb: handler
	}
}

gsapi.escapeURI = function(s) {
	var s2 = ''+s;
	try {s2 = encodeURIComponent(s2);}
	catch(ex) {s2 = escape(s2);}

	return s2.replace(/%20/g,"+");
}

var GROCERY = {};
gsapi.grocery = GROCERY;

GROCERY.getZipCode = function(handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	gsapi.call({
		path: '/service/location/rest/v10/getClosestZipCode/clientId/' + gsapi.cid + '/ipAddress/' + gsapi.ip
	}, {
		callback:function(r){
			var t = '' + r;
			if(t == "-1"){
			  t='0';
			}else{
			 while(t.length < 5) t = '0' + t;
			}
			this.cb.callback(t);
		},
		cb: handler
	});
}

GROCERY.getStores = function(zip, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	gsapi.call({
		path: '/service/grocery/rest/v10/getStoresByZipCode/clientId/' + gsapi.cid + '/zipCode/' + zip
	}, {
		callback:function(r){ this.cb.callback((r && r.getStoresResponse) ? r.getStoresResponse : null); },
		cb: handler
	});
}

GROCERY.getAllChains = function(zip, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	gsapi.call({
		path: '/service/grocery/rest/v10/clientId/' + gsapi.cid + '/getAllChains/zipCode/' + zip
	}, {
		callback:function(r){ this.cb.callback((r && r.getStoresResponse) ? r.getStoresResponse : null); },
		cb: handler
	});
}

GROCERY.getChainsByZip = function(params, handler) {
	//{"ChainByZipRequest":{"zipCode":"55337","categoryIdList":["115","63"],type:["coupon","special"]}}

	if (typeof handler == 'function') handler = { callback: handler };
	var req = {ChainByZipRequest:params};
	gsapi.call({
		path: '/service/searchservice/rest/v10/clientId/' + gsapi.cid + '/getChainsByZip',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.GetChainsByZipResponse) ? r.GetChainsByZipResponse : null); },
		cb: handler
	});
}

GROCERY.getStoreCategories = function(zip, storeId, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	gsapi.call({
		path: '/service/grocery/rest/v10/getCategories/clientId/' + gsapi.cid + '/zipCode/' + zip + '/storeIds/' + storeId + '/rollupBy/description/offset/0/maxResults/100'
	}, {
		callback:function(r){ this.cb.callback((r && r.getCategoriesResponse) ? r.getCategoriesResponse : null); },
		cb: handler
	});
}

GROCERY.getStoreCategoriesRollup = function(zip, storeId, rollupBy, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var rb = rollupBy? rollupBy : "description";
	gsapi.call({
		path: '/service/grocery/rest/v10/getCategories/clientId/' + gsapi.cid + '/zipCode/' + zip + '/storeIds/' + storeId + '/rollupBy/' + rb + '/offset/0/maxResults/100'
	}, {
		callback:function(r){ this.cb.callback((r && r.getCategoriesResponse) ? r.getCategoriesResponse : null); },
		cb: handler
	});
}

GROCERY.getCategoriesByZip = function(params, handler) {
	// {"CategoriesByZipRequest":{"zipCode":"55337","chainIdList":["115","63"],type:["coupon","special"]}}

	if (typeof handler == 'function') handler = { callback: handler };
	var req = {CategoriesByZipRequest:params};
	gsapi.call({
		path: '/service/searchservice/rest/v10/clientId/' + gsapi.cid + '/getCategoriesByZip',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.GetCategoriesByZipResponse) ? r.GetCategoriesByZipResponse : null); },
		cb: handler
	});
}

GROCERY.getPromotions = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {PromotionRequest:params};
	gsapi.call({
		path: '/service/grocery/rest/v10/clientId/' + gsapi.cid + '/getPromotionsForSearchTerms',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.PromotionSearchResponse) ? r.PromotionSearchResponse : null); },
		cb: handler
	});
}

GROCERY.getPromotionCount = function(p, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = null;
	var svc = null;
	if (p.ingredientNames) {
		svc = '/service/grocery/rest/v10/clientId/' + gsapi.cid + '/getPromotionCountForIngredients';
		req = {IngredientNames:{
			ingredientNames:p.ingredientNames,
			zipCode: p.zipCode
		}};

		if (p.chainIds) req.IngredientNames.chainIds = p.chainIds;

	} else if (p.externalId) {
		svc = '/service/grocery/rest/v10/getPromotionCountForRecipe/clientId/' + gsapi.cid;
		req = {PromotionCountForRecipeRequest:{
			externalId: p.externalId,
			sourceId: p.sourceId,
			zipCode: p.zipCode
		}};

	} else {
		svc = '/service/grocery/rest/v10/clientId/' + gsapi.cid + '/getPromotionCountForZipsAndChains';
		req = {PromotionCountForZipsAndChainsRequest:{
			zipCodes: p.zipCode,
			chainIds: p.chainId
		}};
	}

	gsapi.call({
		path: svc,
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.PromotionCountResponse) ? r.PromotionCountResponse : null); },
		cb: handler
	});
}

GROCERY.getSpecialsByIds = function(idArray, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	gsapi.call({
		path: '/service/grocery/rest/v10/getSpecialsByIds/specialIds/' + idArray
	}, {
		callback:function(r){ this.cb.callback((r && r.getSpecialsResponse) ? r.getSpecialsResponse : null); },
		cb: handler
	});
}

GROCERY.getChainsByExternalId = function(extChainId, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	gsapi.call({
		path: '/service/searchservice/rest/v10/clientId/' + gsapi.cid + '/getChainsByExternalId/extChainId/' + extChainId
	}, {
		callback:function(r){ this.cb.callback((r && r.GetChainsByExternalIdResponse) ? r.GetChainsByExternalIdResponse : null); },
		cb: handler
	});
}


GROCERY.getBrands = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {};
	gsapi.call({
		path: '/service/grocery/rest/v10/getBrands/',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.PromotionSearchResponse) ? r.PromotionSearchResponse : null); },
		cb: handler
	});
}

GROCERY.getPopularIngredients = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {PopularIngredientsRequest:params};
	gsapi.call({
		path: '/service/grocery/rest/v10/clientId/' + gsapi.cid +'/getPopularIngredients',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.PopularIngredientsResponse) ? r.PopularIngredientsResponse : null); },
		cb: handler
	});
}


GROCERY.getPromotionFilters = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {"filterRequest":{}};
	if (params && params.showInactive != undefined) req.filterRequest.showInactive = params.showInactive ? true : false;
	if (params && params.promotionFilterIdList) req.filterRequest.promotionFilterIdList = param.promotionFilterIdList;
	if (params && params.chainIdList) req.filterRequest.chainIdList = params.chainIdList;
	if (params && params.includeServiceFilters != undefined) req.filterRequest.includeServiceFilters = params.includeServiceFilters ? true : false;

	gsapi.call({
		path: '/service/adminpromo/rest/v10/clientId/' + gsapi.cid +'/getPromotionFilters',
		post:req
	}, {
		callback:function(r){ this.cb.callback((r && r.PromotionFilterResponse) ? r.PromotionFilterResponse : null); },
		cb: handler
	});
}

GROCERY.getFilteredPromotions = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {filterRequest:params};
	gsapi.call({
		path: '/service/promotion/rest/v10/clientId/' + gsapi.cid +'/getFilteredPromotions',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.FilteredPromotionsResponse) ? r.FilteredPromotionsResponse : null); },
		cb: handler
	});
}

GROCERY.getPromotionCountForRecipe = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {PromotionCountForRecipeRequest:params};
	gsapi.call({
		path: '/service/grocery/rest/v10/getPromotionCountForRecipe/clientId/' + gsapi.cid,
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.PromotionCountResponse) ? r.PromotionCountResponse : null); },
		cb: handler
	});
}

GROCERY.getChainsByZipCode = function(zipCode, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	gsapi.call({
		path: '/service/grocery/rest/v10/clientId/' + gsapi.cid +'/getChainsByZipCode/zipCode/' + zipCode
	}, {
		callback:function(r){ this.cb.callback((r && r.getStoresResponse) ? r.getStoresResponse : null); },
		cb: handler
	});
}

GROCERY.getPrintLinks = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {GetPrintLinksRequest:params};
	gsapi.call({
		path: '/service/grocery/rest/v10/clientId/' + gsapi.cid + '/getPrintLinks',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.GetPrintLinksResponse) ? r.GetPrintLinksResponse : null); },
		cb: handler
	});
}

var SEARCH = {};
gsapi.search = SEARCH;

SEARCH.getValueRecipes = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var hasOffset = false;
	var hasMax = false;
	for (i in params) {
		if (!hasOffset && i == 'offset') hasOffset = true;
		if (!hasMax && i == 'maxResult') hasMax = true;
	}
	if (!hasOffset) params.offset = '0';
	if (!hasMax) params.maxResult = '20';
	var req = {ValueRecipeRequest:params};
	gsapi.call({
		path: '/service/searchservice/rest/v10/clientId/' + gsapi.cid +'/findValueRecipe',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.ValueRecipeResponse) ? r.ValueRecipeResponse : null); },
		cb: handler
	});
}

SEARCH.findFilteredValueRecipe = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var hasOffset = false;
	var hasMax = false;
	for (i in params) {
		if (!hasOffset && i == 'offset') hasOffset = true;
		if (!hasMax && i == 'maxResult') hasMax = true;
	}
	if (!hasOffset) params.offset = '0';
	if (!hasMax) params.maxResult = '20';

	if (!params['favoriteFlag']) params['favoriteFlag'] = false;
	if (!params['sortedBy']) params['sortedBy'] = 'alpha';
	if (!params['ingredient']) params['ingredient'] = '';

	var req = {FilteredValueRecipeRequest:params};
	gsapi.call({
		path: '/service/searchservice/rest/v10/clientId/' + gsapi.cid + '/findFilteredValueRecipe',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.RecipeSummary) ? r.RecipeSummary : null); },
		cb: handler
	});
}

SEARCH.findFeaturedDeals = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var hasOffset = false;
	var hasMax = false;
	for (i in params) {
		if (!hasOffset && i == 'offset') hasOffset = true;
		if (!hasMax && i == 'maxResult') hasMax = true;
	}
	if (!hasOffset) params.offset = '0';
	if (!hasMax) params.maxResult = '20';
	var req = {FeaturedDealsRequest:params};
	gsapi.call({
		path: '/service/searchservice/rest/v10/clientId/' + gsapi.cid +'/findFeaturedDeals',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.PromotionSearchResponse) ? r.PromotionSearchResponse : null); },
		cb: handler
	});
}

SEARCH.findFeaturedCategories = function(zipCode, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	gsapi.call({
		path: '/service/searchservice/rest/v10/clientId/' + gsapi.cid +'/getFeaturedCategories/zipCode/' + zipCode
	}, {
		callback:function(r){ this.cb.callback((r && r.FeaturedCategoriesResponse) ? r.FeaturedCategoriesResponse : null); },
		cb: handler
	});
}

SEARCH.getPromotionsForSearchTerms = function(params, handler) {
	var hasBrand = false;
	for (i in params) if (i == 'brand') hasBrand = true;
	if (!hasBrand) params.brand = 'true';

	if (typeof handler == 'function') handler = { callback: handler };
	var req = {SearchRequest:params};
	gsapi.call({
		path: '/service/searchservice/rest/v10/clientId/'+ gsapi.cid+'/getPromotionsForSearchTerms',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.PromotionSearchResponse) ? r.PromotionSearchResponse : null); },
		cb: handler
	});
}

SEARCH.getDefaultSearchTerms = function(zipCode, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	gsapi.call({
		path: '/service/searchservice/rest/v10/clientId/'+ gsapi.cid+'/getDefaultSearchTerms/zipCode/'+zipCode
	}, {
		callback:function(r){ this.cb.callback((r && r.getDefaultSearchTermsResponse) ? r.getDefaultSearchTermsResponse : null); },
		cb: handler
	});
}

SEARCH.getUpcByFilter = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var hasOffset = false;
	var hasMax = false;
	for (i in params) {
		if (!hasOffset && i == 'offset') hasOffset = true;
		if (!hasMax && i == 'maxResult') hasMax = true;
	}
	if (!hasOffset) params.offset = '0';
	if (!hasMax) params.maxResult = '20';
	var req = {UpcFilterRequest:params};
	gsapi.call({
		path: '/service/searchservice/rest/v10/clientId/' + gsapi.cid +'/getUpcByFilter',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.UpcItemFilterResponse) ? r.UpcItemFilterResponse : null); },
		cb: handler
	});
}

SEARCH.getFeaturedPromotions = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {FeaturedPromotionsRequest:params};
	gsapi.call({
		path: '/service/searchservice/rest/v10/clientId/' + gsapi.cid +'/getFeaturedPromotions',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.FeaturedPromotionsResponse) ? r.FeaturedPromotionsResponse : null); },
		cb: handler
	});
}

SEARCH.getFeaturedPromotionsByCategory = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {FeaturedPromotionsByCategoryRequest:params};
	gsapi.call({
		path: '/service/searchservice/rest/v10/clientId/' + gsapi.cid +'/getFeaturedPromotionsByCategory',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.FeaturedPromotionsByCategoryResponse) ? r.FeaturedPromotionsByCategoryResponse : null); },
		cb: handler
	});
}

SEARCH.getFeaturedPromotionsByBrand = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };

	var hasOffset = false;
	var hasMax = false;
	for (i in params) {
		if (!hasOffset && i == 'offset') hasOffset = true;
		if (!hasMax && i == 'maxResult') hasMax = true;
	}
	if (!hasOffset) params.offset = '0';
	if (!hasMax) params.maxResult = '20';
	
	var req = {GetFeaturedPromotionsByBrandRequest:params};
	gsapi.call({
		path: '/service/searchservice/rest/v10/clientId/' + gsapi.cid +'/getFeaturedPromotionsByBrand',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.FeaturedPromotionsResponse) ? r.FeaturedPromotionsResponse : null); },
		cb: handler
	});
}

SEARCH.getFeaturedPromotionsByManufacturer = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };

	var hasOffset = false;
	var hasMax = false;
	for (i in params) {
		if (!hasOffset && i == 'offset') hasOffset = true;
		if (!hasMax && i == 'maxResult') hasMax = true;
	}
	if (!hasOffset) params.offset = '0';
	if (!hasMax) params.maxResult = '20';

	var req = {GetFeaturedPromotionsByManufacturerRequest:params};
	gsapi.call({
		path: '/service/searchservice/rest/v10/clientId/' + gsapi.cid +'/getFeaturedPromotionsByManufacturer',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.FeaturedPromotionsResponse) ? r.FeaturedPromotionsResponse : null); },
		cb: handler
	});
}

SEARCH.getFeaturedPromotionsByChain = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };

	var hasOffset = false;
	var hasMax = false;
	for (i in params) {
		if (!hasOffset && i == 'offset') hasOffset = true;
		if (!hasMax && i == 'maxResult') hasMax = true;
	}
	if (!hasOffset) params.offset = '0';
	if (!hasMax) params.maxResult = '20';

	var req = {GetFeaturedPromotionsByChainRequest:params};
	gsapi.call({
		path: '/service/searchservice/rest/v10/clientId/' + gsapi.cid +'/getFeaturedPromotionsByChain',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.FeaturedPromotionsResponse) ? r.FeaturedPromotionsResponse : null); },
		cb: handler
	});
}

SEARCH.getLatestPromotionsForShoppingList = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {GetLatestPromotionsForShoppingListRequest:params};
	gsapi.call({
		path: '/service/shoppinglist/rest/v10/clientId/' + gsapi.cid +'/getLatestPromotionsForShoppingList',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.shoppingListResponse) ? r.shoppingListResponse : null); },
		cb: handler
	});
}

SEARCH.getFavoriteRecipes = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {GetFavoriteRequest:params};
	gsapi.call({
		path: '/service/recipe/rest/v10/clientId/' + gsapi.cid +'/getFavoriteRecipes',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.GetRecipesResponse) ? r.GetRecipesResponse : null); },
		cb: handler
	});
}

SEARCH.getRecipeByFilter = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {RecipeByFilterRequest:params};
	gsapi.call({
		path: '/service/recipe/rest/v10/clientId/' + gsapi.cid + '/getRecipeByFilter',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.RecipeSummary) ? r.RecipeSummary : null); },
		cb: handler
	});
}

SEARCH.getPromotionsByChain = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var hasOffset = false;
	var hasMax = false;
	for (i in params) {
		if (!hasOffset && i == 'offset') hasOffset = true;
		if (!hasMax && i == 'maxResult') hasMax = true;
	}
	if (!hasOffset) params.offset = '0';
	if (!hasMax) params.maxResult = '20';

	if (typeof handler == 'function') handler = { callback: handler };
	var req = {GetPromotionsByChainRequest:params};
	gsapi.call({
		path: '/service/searchservice/rest/v10/clientId/' + gsapi.cid +'/getPromotionsByChain',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.PromotionResponse) ? r.PromotionResponse : null); },
		cb: handler
	});
}

SEARCH.getPromotionsByCategory = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {GetPromotionsByCategoryRequest:params};
	gsapi.call({
		path: '/service/searchservice/rest/v10/clientId/' + gsapi.cid +'/getPromotionsByCategory',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.PromotionResponse) ? r.PromotionResponse : null); },
		cb: handler
	});
}

SEARCH.getPromotionsByChainsAndCategory = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var hasOffset = false;
	var hasMax = false;
	for (i in params) {
		if (!hasOffset && i == 'offset') hasOffset = true;
		if (!hasMax && i == 'maxResult') hasMax = true;
	}
	if (!hasOffset) params.offset = '0';
	if (!hasMax) params.maxResult = '20';

	if (typeof handler == 'function') handler = { callback: handler };
	var req = {GetPromotionsByChainsAndCategoryRequest:params};
	gsapi.call({
		path: '/service/searchservice/rest/v10/clientId/' + gsapi.cid +'/getPromotionsByChainsAndCategory',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.PromotionResponse) ? r.PromotionResponse : null); },
		cb: handler
	});
}

SEARCH.getSpecials = function(zip, stores, categories, searchText, offset, maxResults, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	
	// lame fix: chop off the "/" and everything after it - jsapi can't seem to handle these forward slashes nomatter how they are encoded
	var st = gsapi.escapeURI("" + searchText);
	//var i = st.indexOf("/");
	//if(i > 0) st = st.substr(0,i);

	gsapi.call({
		path: '/service/grocery/rest/v10/getSpecials/clientId/' + gsapi.cid + '/zipCode/' + zip +
			"/storeIds/" + stores + "/categoryIds/" + categories +
			(searchText == null || searchText == ""? "" : "/description/" + st) +
			"/offset/" + (offset != null? offset:0) + "/maxResults/" + maxResults
	}, {
		callback:function(r){ this.cb.callback((r && r.getSpecialsResponse) ? r.getSpecialsResponse : null); },
		cb: handler
	});
}

SEARCH.getRollupSpecials = function(zip, stores, categories, searchText, offset, maxResults, handler) {
	if (typeof handler == 'function') handler = { callback: handler };

	// lame fix: chop off the "/" and everything after it - jsapi can't seem to handle these forward slashes nomatter how they are encoded
	var st = gsapi.escapeURI(searchText);
	//var i = st.indexOf("/");
	//if(i > 0) st = st.substr(0,i);

	gsapi.call({
		path: '/service/grocery/rest/v10/getRollUpSpecials/clientId/' + gsapi.cid + '/zipCode/' + zip +
			"/storeIds/" + stores + "/categoryIds/" + categories +
			(searchText == null || searchText == ""? "" : "/description/" + st) +
			"/offset/" + (offset != null? offset:0) + "/maxResults/" + maxResults
	}, {
		callback:function(r){ this.cb.callback((r && r.getRollUpSpecialsResponse) ? r.getRollUpSpecialsResponse : null); },
		cb: handler
	});
}

SEARCH.getCategories = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {GetCategoriesRequest:params};
	gsapi.call({
		path: '/service/searchservice/rest/v10/clientId/' + gsapi.cid +'/getCategories',
		post: req	
	}, {
		callback:function(r){ this.cb.callback((r && r.getCategoriesResponse) ? r.getCategoriesResponse : null); },
		cb: handler
	});
}

SEARCH.getChainsByExternalId = function(handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	gsapi.call({
		path: '/service/searchservice/rest/v10/clientId/' + '0f8077d031b9b62aeea41910b86be349' + '/getChainsByExternalId/extChainId/' + 92
	}, {
		callback:function(r){ this.cb.callback((r && r.GetChainsByExternalIdResponse) ? r.GetChainsByExternalIdResponse : null); },
		cb: handler
	});
}

SEARCH.getFeaturedCategoriesByChain = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {GetFeaturedCategoriesByChainRequest:params};
	gsapi.call({
		path: '/service/searchservice/rest/v10/clientId/' + gsapi.cid +'/getFeaturedCategoriesByChain',
		post: req	
	}, {
		callback:function(r){ this.cb.callback((r && r.FeaturedCategoriesResponse) ? r.FeaturedCategoriesResponse : null); },
		cb: handler
	});
}

SEARCH.findSponsoredItems = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {SponsoredItemsByCategoryRequest:params};
	gsapi.call({
		path: '/service/searchservice/rest/v10/clientId/' + gsapi.cid +'/getSponsoredItems',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.SponsoredItemsResponse) ? r.SponsoredItemsResponse : null); },
		cb: handler
	});
}

SEARCH.getChainsByZip = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {ChainByZipRequest:params};
	gsapi.call({
		path: '/service/searchservice/rest/v10/clientId/' + gsapi.cid +'/getChainsByZip',
		post: req	
	}, {
		callback:function(r){ this.cb.callback((r && r.GetChainsByZipResponse) ? r.GetChainsByZipResponse : null); },
		cb: handler
	});
}

SEARCH.getCategoriesByZip = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {CategoriesByZipRequest:params};
	gsapi.call({
		path: '/service/searchservice/rest/v10/clientId/' + gsapi.cid +'/getCategoriesByZip',
		post: req	
	}, {
		callback:function(r){ this.cb.callback((r && r.GetCategoriesByZipResponse) ? r.GetCategoriesByZipResponse : null); },
		cb: handler
	});
}

SEARCH.getFilteredPromotions = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {filterRequest:params};
	gsapi.call({
		path: '/service/promotion/rest/v10/clientId/' + gsapi.cid +'/getFilteredPromotions',
		post: req	
	}, {
		callback:function(r){ this.cb.callback((r && r.FilteredPromotionsResponse) ? r.FilteredPromotionsResponse : null); },
		cb: handler
	});
}

SEARCH.getPromotionFilters = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {filterRequest:params};
	gsapi.call({
		path: '/service/adminpromo/rest/v10/clientId/' + gsapi.cid +'/getPromotionFilters',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.PromotionFilterResponse) ? r.PromotionFilterResponse : null); },
		cb: handler
	});
}


SEARCH.getPromotionsByIds = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {Request:params};
	gsapi.call({
		path: '/service/promotion/rest/v10/clientId/' + gsapi.cid +'/getPromotionsByIds',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.Response) ? r.Response : null); },
		cb: handler
	});
}

SEARCH.getStores = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {GetStoresRequest:params};
	gsapi.call({
		path: '/service/searchservice/rest/v10/clientId/' + gsapi.cid +'/getStores',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.GetStoreResponse) ? r.GetStoreResponse : null); },
		cb: handler
	});
}

SEARCH.getPromotionByChainsAndCategory = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {GetPromotionsByChainsAndCategoryRequest:params};
	gsapi.call({
		path: '/service/searchservice/rest/v10/clientId/' + gsapi.cid +'/getPromotionByChainsAndCategory',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.PromotionResponse) ? r.PromotionResponse : null); },
		cb: handler
	});
}

SEARCH.getPromotionOverview = function(zipCode, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	gsapi.call({
		path: '/service/searchservice/rest/v10/clientId/' + gsapi.cid +'/getPromotionOverview/zipCode/' + zipCode
	}, {
		callback:function(r){ this.cb.callback((r && r.GetPromotionOverviewResponse) ? r.GetPromotionOverviewResponse : null); },
		cb: handler
	});
}

SEARCH.getPromotionsByType = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {GetPromotionsByTypeRequest:params};
	gsapi.call({
		path: '/service/searchservice/rest/v10/clientId/' + gsapi.cid +'/getPromotionsByType',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.PromotionResponse) ? r.PromotionResponse : null); },
		cb: handler
	});
}

SEARCH.getPromotionCategoriesByRetailer = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {CategoriesByRetailerRequest:params};
	gsapi.call({
		path: '/service/searchservice/rest/v10/clientId/' + gsapi.cid + '/getPromotionCategoriesByRetailer',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.GetCategoriesByRetailerResponse) ? r.GetCategoriesByRetailerResponse : null); },
		cb: handler
	});
}

SEARCH.getPromotionsByRetailer = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {GetPromotionsByRetailerLocationRequest:params};
	gsapi.call({
		path: '/service/searchservice/rest/v10/clientId/' + gsapi.cid + '/getPromotionsByRetailer',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.PromotionResponse) ? r.PromotionResponse : null); },
		cb: handler
	});
}

SEARCH.getPromotionsByRetailerLocation = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {GetPromotionsByRetailerLocationRequest:params};
	gsapi.call({
		path: '/service/searchservice/rest/v10/clientId/' + gsapi.cid + '/getPromotionsByRetailerLocation',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.PromotionResponse) ? r.PromotionResponse : null); },
		cb: handler
	});
}

SEARCH.getContentPairings = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {GetContentPairingsRequest:params};
	gsapi.call({
		path: '/service/retailerservice/rest/v10/clientId/'+ gsapi.cid+'/getContentPairings',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.PromotionSearchResponse) ? r.PromotionSearchResponse : null); },
		cb: handler
	});
}
var SL = {};
gsapi.shoppingList = SL;

SL.buildShoppingList = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {BuildShoppingListRequest:params};
	gsapi.call({
		path: '/service/shoppinglist/rest/v10/clientId/'+ gsapi.cid+'/buildShoppingList',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.shoppingListResponse) ? r.shoppingListResponse : null); },
		cb: handler
	});
}

SL.getShoppingListById = function(shoppingListId, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	gsapi.call({
		path: '/service/shoppinglist/rest/v10/clientId/' + gsapi.cid + '/getShoppingListByIdV2/shoppingListId/' + shoppingListId
	}, {
		callback:function(r){ this.cb.callback((r && r.shoppingListResponse) ? r.shoppingListResponse : null); },
		cb: handler
	});
}

SL.getNamedShoppingLists = function(handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	gsapi.call({
		path: '/service/shoppinglist/rest/v10/clientId/' + gsapi.cid + '/getNamedShoppingLists'
	}, {
		callback:function(r){ this.cb.callback((r && r.GetNamedShoppingListsResponse) ? r.GetNamedShoppingListsResponse : null); },
		cb: handler
	});
}

SL.editShoppingList = function(shoppingListId, newListName, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	gsapi.call({
		path: '/service/shoppinglist/rest/v10/clientId/'+ gsapi.cid + '/editShoppingList',
		post: {"EditShoppingListRequest":{"shoppingListId":shoppingListId, "shoppingListName":newListName}}
	}, {
		callback:function(r){ this.cb.callback((r && r.shoppingListResponse) ? r.shoppingListResponse : null); },
		cb: handler
	});
}

SL.expireShoppingList = function(shoppingListId, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	gsapi.call({
		path: '/service/shoppinglist/rest/v10/clientId/' + gsapi.cid + '/expireShoppingList',
		post: {"ExpireShoppingListRequest":{"shoppingListId": shoppingListId, "shoppingListIds":[shoppingListId],"externalIds":[]}}
	}, {
		callback:function(r){ this.cb.callback((r && r.shoppingListResponse) ? r.shoppingListResponse : null); },
		cb: handler
	});
}

SL.addItem = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {AddItemRequest:params};
	gsapi.call({
		path: '/service/shoppinglist/rest/v10/clientId/'+ gsapi.cid+'/addItem',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.shoppingListResponse) ? r.shoppingListResponse : null); },
		cb: handler
	});
}

SL.addIngredient = function(params, handler) {
	var ings = params['idValue'] ? [{idValue: params.idValue, searchTerm: params.searchTerm}] : s3.a.ary(params.ingredients);
	var tmp = [];
	for (i in ings) tmp[tmp.length] = {idValue:ings[i].idValue, idType:"ingredient", searchTerm:ings[i].searchTerm, promotionIdList:[]};
	gsapi.shoppingList.addItem({"shoppingListId":params.shoppingListId, "shoppingListEntry":tmp}, handler);
}

SL.addUPC = function(params, handler) {
	var ings = params['idValue'] ? [{idValue: params.idValue, searchTerm: params.searchTerm}] : s3.a.ary(params.upcs);
	var tmp = [];
	for (i in ings) tmp[tmp.length] = {idValue:ings[i].idValue, idType:"upcItem", searchTerm:ings[i].searchTerm, promotionIdList:[]};
	gsapi.shoppingList.addItem({"shoppingListId":params.shoppingListId, "shoppingListEntry":tmp}, handler);
}

SL.addFreeformIngredient = function(params, handler) {
	var ings = params['idValue'] ? [{idValue: params.idValue, searchTerm: params.searchTerm}] : s3.a.ary(params.ingredients);
	var tmp = [];
	for (i in ings) tmp[tmp.length] = {idValue:ings[i].idValue, idType:"freeFormIngredient", searchTerm:ings[i].searchTerm, promotionIdList:[]};
	gsapi.shoppingList.addItem({"shoppingListId":params.shoppingListId, "shoppingListEntry":tmp}, handler);
}

SL.updateFreeformIngredientCounter = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {editIngredientItemRequest:params};
	gsapi.call({
		path: '/service/shoppinglist/rest/v10/clientId/'+ gsapi.cid+'/updateFreeFormIngredientCounter',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.shoppingListResponse) ? r.shoppingListResponse : null); },
		cb: handler
	});
}

SL.addRecipeIngredient = function(params, handler) {
	var ings = params['idValue'] ? [{idValue: params.idValue, idValue1: params.idValue1, searchTerm: params.searchTerm}] : s3.a.ary(params.ingredients);
	var tmp = [];
	for (i in ings) tmp[tmp.length] = {idValue:ings[i].idValue, idValue1:ings[i].idValue1, idType:"recipeIngredient", searchTerm:ings[i].searchTerm, promotionIdList:[]};
	gsapi.shoppingList.addItem({"shoppingListId":params.shoppingListId, "shoppingListEntry":tmp}, handler);
}

SL.removeItem = SL.removeUPC  = SL.removeFreeformIngredient = function(params, handler) {
	var req = {shoppingListId: params.shoppingListId,shoppingListItems:[{}]};
	req.tinyResponse = params.tinyResponse ? params.tinyResponse : false;
	
	var sli = req.shoppingListItems[0];
	sli.ingredientId = params.ingredientId ? params.ingredientId : '';
	sli.freeFormIngredientId = params.freeFormIngredientId ? params.freeFormIngredientId : '';
	sli.promotionId = params.promotionId ? params.promotionId : '';
	sli.upcItemId = params.upcItemId ? params.upcItemId : '';
	sli.searchTerm = params.searchTerm ? params.searchTerm : '';
	sli.shoppingListItemId = params.shoppingListItemId ? params.shoppingListItemId : '';
	sli.shoppingListUpcItemId = params.shoppingListUpcItemId ? params.shoppingListUpcItemId : '';

	if (typeof handler == 'function') handler = { callback: handler };
	req = {RemoveItemRequest:req};
	gsapi.call({
		path: '/service/shoppinglist/rest/v10/clientId/'+ gsapi.cid+'/removeItem',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.shoppingListResponse) ? r.shoppingListResponse : null); },
		cb: handler
	});
}

/*
 * {"RemoveItemRequest":{"shoppingListId":"2811","tinyResponse":"false",
 * "sourceSLIdList":[1,2],"recipeIdList":[1,2],"recipeExternalIdList":[1,2],"shoppingListItems":
 * [{shoppingListItemId:"783091",ingredientId:"",freeFormIngredientId:"",promotionId:"",upcItemId:"",searchTerm:"",shoppingListUpcItemId:""},{shoppingListItemId:"783092",ingredientId:"",freeFormIngredientId:"",promotionId:"",upcItemId:"",searchTerm:"",shoppingListUpcItemId:""},{shoppingListItemId:"783093",ingredientId:"",freeFormIngredientId:"",promotionId:"",upcItemId:"",searchTerm:"",shoppingListUpcItemId:""},{shoppingListItemId:"783094",ingredientId:"",freeFormIngredientId:"",promotionId:"",upcItemId:"",searchTerm:"",shoppingListUpcItemId:""},{shoppingListItemId:"783095",ingredientId:"",freeFormIngredientId:"",promotionId:"",upcItemId:"",searchTerm:"",shoppingListUpcItemId:""},{shoppingListItemId:"783096",ingredientId:"",freeFormIngredientId:"",promotionId:"",upcItemId:"",searchTerm:"",shoppingListUpcItemId:""},{shoppingListItemId:"783097",ingredientId:"",freeFormIngredientId:"",promotionId:"",upcItemId:"",searchTerm:"",shoppingListUpcItemId:""},{shoppingListItemId:"783098",ingredientId:"",freeFormIngredientId:"",promotionId:"",upcItemId:"",searchTerm:"",shoppingListUpcItemId:""},{shoppingListItemId:"783099",ingredientId:"",freeFormIngredientId:"",promotionId:"",upcItemId:"",searchTerm:"",shoppingListUpcItemId:""},{shoppingListItemId:"783100",ingredientId:"",freeFormIngredientId:"",promotionId:"",upcItemId:"",searchTerm:"",shoppingListUpcItemId:""}]}}
 */
SL.removeItems = function(params, handler) {
	params.tinyResponse = params.tinyResponse ? params.tinyResponse : false;
	var items = (params? params.items : []);
	if(items && items.length > 0) {
		for(var i=0; i<items.length; i++) {
			items[i].ingredientId = items[i].ingredientId ? items[i].ingredientId : '';
			items[i].freeFormIngredientId = items[i].freeFormIngredientId ? items[i].freeFormIngredientId : '';
			items[i].promotionId = items[i].promotionId ? items[i].promotionId : '';
			items[i].upcItemId = items[i].upcItemId ? items[i].upcItemId : '';
			items[i].searchTerm = items[i].searchTerm ? items[i].searchTerm : '';
			items[i].shoppingListItemId = items[i].shoppingListItemId ? items[i].shoppingListItemId : '';
			items[i].shoppingListUpcItemId = items[i].shoppingListUpcItemId ? items[i].shoppingListUpcItemId : '';
		}
	}

	if (typeof handler == 'function') handler = { callback: handler };
	req = {RemoveItemRequest:params};
	gsapi.call({
		path: '/service/shoppinglist/rest/v10/clientId/'+ gsapi.cid+'/removeItem',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.shoppingListResponse) ? r.shoppingListResponse : null); },
		cb: handler
	});
}

SL.getLatestPromotionsForShoppingList = function(params, handler) {
	if(!params.zipCode) params.zipCode = '';
	if(!params.chainIds) params.chainIds = '';
	params.includePromotions = params.includePromotions ? params.includePromotions : 2;
	
	if (typeof handler == 'function') handler = { callback: handler };
	req = {GetLatestPromotionsForShoppingListRequest:params};
	gsapi.call({
		path: '/service/shoppinglist/rest/v10/clientId/'+ gsapi.cid + '/getLatestPromotionsForShoppingList',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.shoppingListResponse) ? r.shoppingListResponse : null); },
		cb: handler
	});
}

SL.getLatestPromotionsForShoppingLists = function(params, handler) {
	if(!params.zipCode) params.zipCode = '';
	if(!params.chainIds) params.chainIds = '';
	params.includePromotions = params.includePromotions ? params.includePromotions : 2;
	
	if (typeof handler == 'function') handler = { callback: handler };
	req = {GetLatestPromotionsForShoppingListRequest:params};
	gsapi.call({
		path: '/service/shoppinglist/rest/v10/clientId/'+ gsapi.cid + '/getLatestPromotionsForShoppingLists',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.ShoppingListPromotionResponse) ? r.ShoppingListPromotionResponse : null); },
		cb: handler
	});
}

SL.addItemPromotion = function(params, handler) {
	var req = {shoppingListId: params.shoppingListId};
	req.promotionId = params.promotionId ? params.promotionId : '';
	req.externalId = params.externalId ? params.externalId : '';
	req.upcItemId = params.upcItemId ? params.upcItemId : '';
	req.ingredientId = params.ingredientId ? params.ingredientId : '';
	req.freeFormIngId = params.freeFormIngId ? params.freeFormIngId : '';
	req.searchTerm = params.searchTerm ? params.searchTerm : '';
	req.cardNumber = params.cardNumber ? params.cardNumber : '';
	req.promotionExternalId = params.promotionExternalId ? params.promotionExternalId : ''; 
	req.retailer = params.retailer ? params.retailer : ''; 

	if (typeof handler == 'function') handler = { callback: handler };
	req = {ItemPromotionRequest:req};
	gsapi.call({
		path: '/service/shoppinglist/rest/v10/clientId/'+ gsapi.cid+'/addItemPromotion',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.shoppingListResponse) ? r.shoppingListResponse : null); },
		cb: handler
	});
}

SL.removeItemPromotion = function(params, handler) {
	var req = {shoppingListId: params.shoppingListId};
	req.promotionId = params.promotionId ? params.promotionId : '';
	req.upcItemId = params.upcItemId ? params.upcItemId : '';
	req.ingredientId = params.ingredientId ? params.ingredientId : '';
	req.freeFormIngId = params.freeFormIngId ? params.freeFormIngId : '';
	req.searchTerm = params.searchTerm ? params.searchTerm : '';
	req.shoppingListPromotionMappingId = params.shoppingListPromotionMappingId ? params.shoppingListPromotionMappingId : '';
	req.tinyResponse = params.tinyResponse ? params.tinyResponse : false;
	
	if (typeof handler == 'function') handler = { callback: handler };
	req = {ItemPromotionRequest:req};
	gsapi.call({
		path: '/service/shoppinglist/rest/v10/clientId/'+ gsapi.cid+'/removeItemPromotion',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.shoppingListResponse) ? r.shoppingListResponse : null); },
		cb: handler
	});
}

SL.setCategorySequence = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {CategorySequence:params};
	gsapi.call({
		path: '/service/shoppinglist/rest/v10/clientId/'+ gsapi.cid+'/setCategorySequence',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.shoppingListResponse) ? r.shoppingListResponse : null); },
		cb: handler
	});
}

SL.editIngredientOnList = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {editIngredientItemRequest:params};
	gsapi.call({
		path: '/service/shoppinglist/rest/v10/clientId/'+ gsapi.cid+'/editIngredientOnList',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.shoppingListResponse) ? r.shoppingListResponse : null); },
		cb: handler
	});
}

SL.addRecipe = function(param, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	gsapi.call({
		path: '/service/shoppinglist/rest/v10/clientId/' + gsapi.cid + '/addRecipeToShoppingList/shoppingListId/' + param.shoppingListId + '/recipeId/' + param.recipeId + '/tinyResponse/' + false
	}, {
		callback:function(r){ this.cb.callback((r && r.shoppingListResponse) ? r.shoppingListResponse : null); },
		cb: handler
	});
}

SL.removeRecipe = function(param, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	gsapi.call({
		path: '/service/shoppinglist/rest/v10/clientId/' + gsapi.cid + '/deleteRecipeFromShoppingList/shoppingListId/' + param.shoppingListId + '/recipeId/' + param.recipeId + '/tinyResponse/' + false
	}, {
		callback:function(r){ this.cb.callback((r && r.shoppingListResponse) ? r.shoppingListResponse : null); },
		cb: handler
	});
}

SL.addRecipeByIdToShoppingList = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {AddRecipeByIdToShoppingListRequest:params};
	gsapi.call({
		path: '/service/shoppinglist/rest/v10/clientId/'+ gsapi.cid+'/addRecipeByIdToShoppingList',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.shoppingListResponse) ? r.shoppingListResponse : null); },
		cb: handler
	});
}

SL.removeShoppingListIngredient = function(shoppingListId, ingredientId, searchTerm, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	gsapi.call({
		path: '/service/shoppinglist/rest/v10/clientId/'+ gsapi.cid+'/removeShoppingListIngredient/shoppingListId/'+shoppingListId+
			'/ingredientId/'+ingredientId+(searchTerm? '/searchTerm/'+searchTerm : "")
	}, {
		callback:function(r){ this.cb.callback((r && r.shoppingListResponse) ? r.shoppingListResponse : null); },
		cb: handler
	});
}

SL.addUpcItem = function(shoppingListId, upcItemId, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	gsapi.call({
		path: '/service/shoppinglist/rest/v10/clientId/'+ gsapi.cid+'/addUpcItem/shoppingListId/'+shoppingListId+'/upcItemId/'+upcItemId
	}, {
		callback:function(r){ this.cb.callback((r && r.shoppingListResponse) ? r.shoppingListResponse : null); },
		cb: handler
	});
}

SL.updateUpcItemCounter = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {editUpcItemRequest:params};
	gsapi.call({
		path: '/service/shoppinglist/rest/v10/clientId/'+ gsapi.cid+'/updateUpcItemCounter',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.shoppingListResponse) ? r.shoppingListResponse : null); },
		cb: handler
	});
}

SL.removeUpcItem = function(shoppingListId, upcItemId, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	gsapi.call({
		path: '/service/shoppinglist/rest/v10/clientId/'+ gsapi.cid+'/removeUpcItem/shoppingListId/'+shoppingListId+'/upcItemId/'+upcItemId
	}, {
		callback:function(r){ this.cb.callback((r && r.shoppingListResponse) ? r.shoppingListResponse : null); },
		cb: handler
	});
}

SL.setItemCounter = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {ItemCounterRequest:params};
	gsapi.call({
		path: '/service/shoppinglist/rest/v10/clientId/'+ gsapi.cid+'/setShoppingListItemCounter',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.shoppingListResponse) ? r.shoppingListResponse : null); },
		cb: handler
	});
}

SL.addRecipeByExternalIdAndNameToShoppingList = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {addRecipeByExternalIdAndNameToShoppingListRequest:params};
	gsapi.call({
		path: '/service/shoppinglist/rest/v10/clientId/'+ gsapi.cid+'/addRecipeByExternalIdAndNameToShoppingList',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.shoppingListResponse) ? r.shoppingListResponse : null); },
		cb: handler
	});
}

SL.getPromotionsFromShoppingLists = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {GetPromotionsFromShoppingListRequest:params};
	gsapi.call({
		path: '/service/shoppinglist/rest/v10/clientId/'+ gsapi.cid+'/getPromotionsFromShoppingLists',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.ShoppingListPromotionResponse) ? r.ShoppingListPromotionResponse : null); },
		cb: handler
	});
}

SL.removePromotionsFromShoppingLists = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {RemovePromotionsFromShoppingListsRequest:params};
	gsapi.call({
		path: '/service/shoppinglist/rest/v10/clientId/'+ gsapi.cid+'/removePromotionsFromShoppingLists',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.ShoppingListPromotionResponse) ? r.ShoppingListPromotionResponse : null); },
		cb: handler
	});
}

SL.getShoppingListByExternalId = function(externalId, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	gsapi.call({
		path: '/service/shoppinglist/rest/v10/clientId/'+ gsapi.cid+'/getShoppingListByExternalId/externalId/'+externalId
	}, {
		callback:function(r){ this.cb.callback((r && r.shoppingListResponse) ? r.shoppingListResponse : null); },
		cb: handler
	});
}

SL.setResetCheckBox = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {setResetCheckBoxRequest:params};
	gsapi.call({
		path: '/service/shoppinglist/rest/v10/clientId/'+ gsapi.cid+'/setResetCheckBox',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.shoppingListResponse) ? r.shoppingListResponse : null); },
		cb: handler
	});
}

SL.deleteMealFromShoppingList = function(shoppingListId, mealIds, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	gsapi.call({
		path: '/service/shoppinglist/rest/v10/clientId/'+ gsapi.cid+'/deleteMealFromShoppingList/shoppingListId/'+shoppingListId + '/mealIds/' + mealIds
	}, {
		callback:function(r){ this.cb.callback((r && r.shoppingListResponse) ? r.shoppingListResponse : null); },
		cb: handler
	});
}

SL.getShoppingListSummary = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {GetShoppingListSummaryRequest:params};
	gsapi.call({
		path: '/service/shoppinglist/rest/v10/clientId/'+ gsapi.cid+'/getShoppingListSummary',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.ShoppingListPromotionResponse) ? r.ShoppingListPromotionResponse : null); },
		cb: handler
	});
}

SL.copyShoppingList = function(shoppingListId, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	gsapi.call({
		path: '/service/shoppinglist/rest/v10/clientId/'+ gsapi.cid+'/copyShoppingList/shoppingListId/' + shoppingListId
	}, {
		callback:function(r){ this.cb.callback((r && r.shoppingListResponse) ? r.shoppingListResponse : null); },
		cb: handler
	});
}

SL.addShoppingList = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {AddShoppingListRequest:params};
	gsapi.call({
		path: '/service/shoppinglist/rest/v10/clientId/'+ gsapi.cid+'/addShoppingList',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.shoppingListResponse) ? r.shoppingListResponse : null); },
		cb: handler
	});
}

//{"zipCode":"00501", "chainIdList":[92,95,43,281,253,278,280,281,279,157,55,237,169,172,133,115,130,176],"getLatestPromotions":"true"}
SL.getLatestShoppingList = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {shoppingListRequest:params};
	gsapi.call({
		path: '/service/shoppinglist/rest/v10/clientId/'+ gsapi.cid+'/getLatestShoppingList',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.shoppingListResponse) ? r.shoppingListResponse : null); },
		cb: handler
	});
}

SL.removeItem = function(params, handler) {
	 if (typeof handler == 'function') handler = { callback: handler };
	 var req = {RemoveItemRequest:params};
	 gsapi.call({
	  path: '/service/shoppinglist/rest/v10/clientId/'+ gsapi.cid+'/removeItem',
	  post: req
	 }, {
	  callback:function(r){ this.cb.callback((r && r.shoppingListResponse) ? r.shoppingListResponse : null); },
	  cb: handler
	 });
}

SL.editShoppingListItem = function(params, handler) {
	 if (typeof handler == 'function') handler = { callback: handler };
	 var req = {editIngredientItemRequest:params};
	 gsapi.call({
		  path: '/service/shoppinglist/rest/v10/clientId/'+ gsapi.cid+'/editShoppingListItem',
		  post: req
		 }, {
		  callback:function(r){ this.cb.callback((r && r.shoppingListResponse) ? r.shoppingListResponse : null); },
		  cb: handler
		 });
}

SL.emailUserShoppingList = function(params, handler) {
	 if (typeof handler == 'function') handler = { callback: handler };
	 var req = {EmailUserShoppingListRequest:params};
	 gsapi.call({
		  path: '/service/shoppinglist/rest/v10/clientId/'+ gsapi.cid+'/emailUserShoppingList',
		  post: req
		 }, {
		  callback:function(r){ this.cb.callback((r && r.EmailShoppingListResponse) ? r.EmailShoppingListResponse : null); },
		  cb: handler
		 });
}

SL.emailShoppingList = function(params, handler) {
	 if (typeof handler == 'function') handler = { callback: handler };
	 var req = {EmailShoppingListRequest:params};
	 gsapi.call({
		  path: '/service/shoppinglist/rest/v10/emailShoppingList/clientId/'+ gsapi.cid+'',
		  post: req
		 }, {
		  callback:function(r){ this.cb.callback((r && r.EmailShoppingListResponse) ? r.EmailShoppingListResponse : null); },
		  cb: handler
		 });
}

var RECIPE = {};
gsapi.recipe = RECIPE;

RECIPE.typeAhead = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {SearchTerm:params};
	gsapi.call({
		path: '/service/recipe/rest/v10/clientId/' + gsapi.cid +'/typeAhead',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.GetIngredientsInTypeAhead) ? r.GetIngredientsInTypeAhead : null); },
		cb: handler
	});
}

RECIPE.getRecipeById = function(recipeId, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	gsapi.call({
		path: '/service/recipe/rest/v10/clientId/' + gsapi.cid +'/getRecipeById/recipeId/' + recipeId
	}, {
		callback:function(r){ this.cb.callback((r && r.GetRecipesResponse) ? r.GetRecipesResponse : null); },
		cb: handler
	});
}

RECIPE.getRecipeByExternalId = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {getRecipeByExternalIdRequest:params};
	gsapi.call({
		path: '/service/recipe/rest/v10/clientId/' + gsapi.cid +'/getRecipeByExternalId',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.GetRecipesPromotionResponse) ? r.GetRecipesPromotionResponse : null); },
		cb: handler
	});
}

RECIPE.getFavoriteRecipes = function(params,handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {GetFavoriteRequest:params};
	gsapi.call({
		path: '/service/recipe/rest/v10/clientId/' + gsapi.cid +'/getFavoriteRecipes',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.GetRecipesResponse) ? r.GetRecipesResponse : null); },
		cb: handler
	});
}
	
RECIPE.addFavoriteRecipes = function(recipeIds, handler) {
	var tmp = s3.a.ary(recipeIds);
	var rs = '';
	for (i in tmp) {
		if (i > 0) rs = rs + '|';
		rs = rs + tmp[i];
	}
	rs = recipeIds;
	if (typeof handler == 'function') handler = { callback: handler };
	gsapi.call({
		path: '/service/recipe/rest/v10/clientId/' + gsapi.cid +'/addFavoriteRecipes/recipeId/' + rs
	}, {
		callback:function(r){ this.cb.callback((r && r.FavoriteRecipeResponse) ? r.FavoriteRecipeResponse : null); },
		cb: handler
	});
}

RECIPE.removeFavorite = function(recipeIds, handler) {
	var tmp = s3.a.ary(recipeIds);
	var rs = '';
	for (i in tmp) {
		if (i > 0) rs = rs + '|';
		rs = rs + tmp[i];
	}
	if (typeof handler == 'function') handler = { callback: handler };
	gsapi.call({
		path: '/service/recipe/rest/v10/clientId/' + gsapi.cid +'/removeFavorite/recipeId/' + rs
	}, {
		callback:function(r){ this.cb.callback((r && r.FavoriteRecipeResponse) ? r.FavoriteRecipeResponse : null); },
		cb: handler
	});
}

RECIPE.getRecipeSummaryByExternalId = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {getRecipeSummaryByExternalIdRequest:params};
	gsapi.call({
		path: '/service/recipe/rest/v10/clientId/' + gsapi.cid +'/getRecipeSummaryByExternalId',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.GetRecipesPromotionResponse) ? r.GetRecipesPromotionResponse : null); },
		cb: handler
	});
}

RECIPE.getRecipesSummaryByPromotionId = function(promoId, maxResults, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	gsapi.call({
		path: '/service/recipe/rest/v10/clientId/' + gsapi.cid +'/getRecipesSummaryByPromotionId/promotionId/' + promoId + '/offset/0/maxResults/' + maxResults
	}, {
		callback:function(r){ this.cb.callback((r && r.GetRecipesByPromotionIdResponse) ? r.GetRecipesByPromotionIdResponse : null); },
		cb: handler
	});
}

RECIPE.getRecipesSummary = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {getRecipeSummaryRequest:params};
	gsapi.call({
		path: '/service/recipe/rest/v10/clientId/' + gsapi.cid +'/getRecipeSummary',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.GetRecipesPromotionResponse) ? r.GetRecipesPromotionResponse : null); },
		cb: handler
	});
}

RECIPE.getRecipeDetailByExternalId = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {getRecipeDetailByExternalIdRequest:params};
	gsapi.call({
		path: '/service/recipe/rest/v10/clientId/' + gsapi.cid +'/getRecipeDetailByExternalId',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.GetRecipesPromotionResponse) ? r.GetRecipesPromotionResponse : null); },
		cb: handler
	});
}

RECIPE.getRecipesByIngredient = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {getRecipesByIngredientRequest:params};
	gsapi.call({
		path: '/service/recipe/rest/v10/clientId/' + gsapi.cid +'/getRecipesByIngredient',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.GetRecipesPromotionResponse) ? r.GetRecipesPromotionResponse : null); },
		cb: handler
	});
}

RECIPE.getRecipeCategories = function(offset, maxresult, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	gsapi.call({
		path: '/service/recipe/rest/v10/clientId/' + gsapi.cid +'/getRecipeCategories/offset/'+offset+'/maxResults/'+maxresult
	}, {
		callback:function(r){ this.cb.callback((r && r.GetRecipeCategoriesResponse) ? r.GetRecipeCategoriesResponse : null); },
		cb: handler
	});
}

RECIPE.getRecipeCategoryGroups = function(offset, maxresult, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	gsapi.call({
		path: '/service/recipe/rest/v10/clientId/' + gsapi.cid +'/getRecipeCategoryGroups/offset/'+offset+'/maxResults/'+maxresult
	}, {
		callback:function(r){ this.cb.callback((r && r.GetRecipeCategoryGroupsResponse) ? r.GetRecipeCategoryGroupsResponse : null); },
		cb: handler
	});
}

RECIPE.getRecipeBySource = function(sourceId, offset, maxresult, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	gsapi.call({
		path: '/service/recipe/rest/v10/clientId/' + gsapi.cid +'/getRecipeBySource/sourceId/' + sourceId + '/offset/'+offset+'/maxResults/'+maxresult
	}, {
		callback:function(r){ this.cb.callback((r && r.GetRecipesResponse) ? r.GetRecipesResponse : null); },
		cb: handler
	});
}

RECIPE.createRecipe = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {NewRecipe:params};
	gsapi.call({
		path: '/service/recipe/rest/v10/clientId/' + gsapi.cid +'/createRecipe',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.CreateRecipeResponse) ? r.CreateRecipeResponse : null); },
		cb: handler
	});
}

RECIPE.copyRecipe = function(recipeId, userId, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	gsapi.call({
		path: '/service/recipe/rest/v10/clientId/' + gsapi.cid +'/copyRecipe/recipeId/'+recipeId+'/userId/'+userId
	}, {
		callback:function(r){ this.cb.callback((r && r.GetRecipesResponse) ? r.GetRecipesResponse : null); },
		cb: handler
	});
}

RECIPE.submitRating = function(recipeId, rating, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	gsapi.call({
		path: '/service/recipe/rest/v10/clientId/' + gsapi.cid +'/submitRating/recipeId/'+recipeId+'/rating/'+rating
	}, {
		callback:function(r){ this.cb.callback((r && r.SubmitRecipeRatingResponse) ? r.SubmitRecipeRatingResponse : null); },
		cb: handler
	});
}

RECIPE.getUnitList = function(offset, maxresult, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	gsapi.call({
		path: '/service/recipe/rest/v10/clientId/' + gsapi.cid +'/getUnitList/offset/'+offset+'/maxResults/'+maxresult
	}, {
		callback:function(r){ this.cb.callback((r && r.GetUnitListResponse) ? r.GetUnitListResponse : null); },
		cb: handler
	});
}

RECIPE.getComments = function(recipeId, offset, maxresult, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	gsapi.call({
		path: '/service/recipe/rest/v10/clientId/' + gsapi.cid +'/getComments/recipeId/'+ recipeId +'/offset/'+offset+'/maxResults/'+maxresult
	}, {
		callback:function(r){ this.cb.callback((r && r.RecipeCommentResponse) ? r.RecipeCommentResponse : null); },
		cb: handler
	});
}

RECIPE.findFeaturedRecipes = function(handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	gsapi.call({
		path: '/service/recipe/rest/v10/clientId/' + gsapi.cid +'/findFeaturedRecipes'
	}, {
		callback:function(r){ this.cb.callback((r && r.RecipeSummaryForFeaturedRecipes) ? r.RecipeSummaryForFeaturedRecipes : null); },
		cb: handler
	});
}

RECIPE.getRecipeByExternalIdV2 = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {getRecipeByExternalIdRequest:params};
	gsapi.call({
		path: '/service/recipe/rest/v10/clientId/' + gsapi.cid +'/getRecipeByExternalIdV2',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.GetRecipesPromotionResponse) ? r.GetRecipesPromotionResponse : null); },
		cb: handler
	});
}

RECIPE.editRecipe = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {EditRecipeRequest:params};
	gsapi.call({
		path: '/service/recipe/rest/v10/clientId/' + gsapi.cid +'/editRecipe',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.EditRecipeResponse) ? r.EditRecipeResponse : null); },
		cb: handler
	});
}

RECIPE.getRecipesByPromotionId = function(specialIds, offset, maxResults, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	gsapi.call({
		path: '/service/recipe/rest/v10/clientId/' + gsapi.cid +'/getRecipesByPromotionId/specialIds/' + specialIds + '/offset/' + offset + '/maxResults/' + maxResults
	}, {
		callback:function(r){ this.cb.callback((r && r.GetRecipesResponse) ? r.GetRecipesResponse : null); },
		cb: handler
	});
}

RECIPE.getRecipesBySearchTerm = function(searchTerm, offset, maxResults, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	gsapi.call({
		path: '/service/recipe/rest/v10/clientId/' + gsapi.cid +'/getRecipesBySearchTerm/searchTerm/' + searchTerm + '/offset/' + offset + '/maxResults/' + maxResults
	}, {
		callback:function(r){ this.cb.callback((r && r.GetRecipesResponse) ? r.GetRecipesResponse : null); },
		cb: handler
	});
}

RECIPE.getRecipesBySearchTerms = function(recipeName, recipeIngredientDesc, recipeSourceId,
		externalId, ingredientDesc, offset, maxResults, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	gsapi.call({
		path: '/service/recipe/rest/v10/clientId/' + gsapi.cid + '/getRecipesBySearchTerms/recipeName/' 
		+ recipeName + '/recipeIngredientDesc/' + recipeIngredientDesc 
		+ '/recipeSourceId/' + recipeSourceId + '/externalId/' + externalId 
		+ '/ingredientDesc/' + ingredientDesc + '/offset/' + offset + '/maxResults/' + maxResults
	}, {
		callback:function(r){ this.cb.callback((r && r.GetRecipesResponse) ? r.GetRecipesResponse : null); },
		cb: handler
	});
}

RECIPE.getRecipeSources = function(offset, maxResults, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	gsapi.call({
		path: '/service/recipe/rest/v10/clientId/' + gsapi.cid + '/getRecipeSources/offset/' + offset + '/maxResults/' + maxResults
	}, {
		callback:function(r){ this.cb.callback((r && r.GetRecipeSourcesResponse) ? r.GetRecipeSourcesResponse : null); },
		cb: handler
	});
}


RECIPE.getRecipeDetails = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {GetRecipeDetailsRequest:params};
	gsapi.call({
		path: '/service/recipe/rest/v10/clientId/' + gsapi.cid +'/getRecipeDetails',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.GetRecipesPromotionResponse) ? r.GetRecipesPromotionResponse : null); },
		cb: handler
	});
}

RECIPE.setRecipeBoxNote = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {favoriteRecipeRequest:params};
	gsapi.call({
		path: '/service/recipe/rest/v10/clientId/' + gsapi.cid +'/setRecipeBoxNote',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.FavoriteRecipeResponse) ? r.FavoriteRecipeResponse : null); },
		cb: handler
	});
}
	
RECIPE.getRecipeBoxTags = function(handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	gsapi.call({
		path: '/service/recipe/rest/v10/clientId/' + gsapi.cid +'/getRecipeBoxTags'
	}, {
		callback:function(r){ this.cb.callback((r && r.TagRecipeResponse) ? r.TagRecipeResponse : null); },
		cb: handler
	});
}

RECIPE.getRecipesByTag = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {request:params};
	gsapi.call({
		path: '/service/recipe/rest/v10/clientId/' + gsapi.cid +'/getRecipesByTag',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.TagRecipeResponse) ? r.TagRecipeResponse : null); },
		cb: handler
	});
}

RECIPE.addRecipeBoxTag = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {request:params};
	gsapi.call({
		path: '/service/recipe/rest/v10/clientId/' + gsapi.cid +'/addRecipeBoxTag',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.TagRecipeResponse) ? r.TagRecipeResponse : null); },
		cb: handler
	});
}

RECIPE.removeRecipeBoxTag = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {request:params};
	gsapi.call({
		path: '/service/recipe/rest/v10/clientId/' + gsapi.cid +'/removeRecipeBoxTag',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.TagRecipeResponse) ? r.TagRecipeResponse : null); },
		cb: handler
	});
}

RECIPE.createTag = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {request:params};
	gsapi.call({
		path: '/service/recipe/rest/v10/clientId/' + gsapi.cid +'/createTag',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.TagRecipeResponse) ? r.TagRecipeResponse : null); },
		cb: handler
	});
}

RECIPE.renameTag = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {request:params};
	gsapi.call({
		path: '/service/recipe/rest/v10/clientId/' + gsapi.cid +'/renameTag',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.TagRecipeResponse) ? r.TagRecipeResponse : null); },
		cb: handler
	});
}

RECIPE.deleteTag = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {request:params};
	gsapi.call({
		path: '/service/recipe/rest/v10/clientId/' + gsapi.cid +'/deleteTag',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.TagRecipeResponse) ? r.TagRecipeResponse : null); },
		cb: handler
	});
}

RECIPE.loadUGRecipe = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {NewRecipe:params};
	gsapi.call({
		path: '/service/recipe/rest/v10/clientId/' + gsapi.cid +'/loadUGRecipe',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.CreateRecipeResponse) ? r.CreateRecipeResponse : null); },
		cb: handler
	});
}

RECIPE.getRecipesByPromotionId = function(promoId, maxResults, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	gsapi.call({
		path: '/service/recipe/rest/v10/clientId/' + gsapi.cid +'/getRecipesByPromotionId/promotionId/' + promoId + '/offset/0/maxResults/' + maxResults
	}, {
		callback:function(r){ this.cb.callback((r && r.GetRecipesByPromotionIdResponse) ? r.GetRecipesByPromotionIdResponse : null); },
		cb: handler
	});
}

RECIPE.getRecipeInformationByExternalId = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {request:params};
	gsapi.call({
		path: '/service/recipe/rest/v10/clientId/' + gsapi.cid +'/getRecipeInformationByExternalId',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.getRecipeDetailsResponse) ? r.getRecipeDetailsResponse : null); },
		cb: handler
	});
}

gsapi.session = {};

gsapi.session.logout = function(handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	gsapi.call({
		path: '/service/login/rest/v10/logout'
	}, handler);
}

gsapi.session.login = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {LoginRequest:params};
	gsapi.call({
		path: '/service/login/rest/v10/clientId/' + gsapi.cid + '/login',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.loginResponse) ? r.loginResponse : null); },
		cb: handler
	});
}

gsapi.session.registerNewUser = function(userName, password, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	gsapi.call({
		path: '/service/registration/rest/v10/clientId/' + gsapi.cid + '/registerNewUser/userName/'+userName+'/password/'+password
	}, {
		callback:function(r){ this.cb.callback((r && r.RegistrationResponse) ? r.RegistrationResponse : null); },
		cb: handler
	});
}

gsapi.session.allTypeLogin = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {AllTypeLoginRequest:params};
	gsapi.call({
		path: '/service/login/rest/v10/clientId/' + gsapi.cid + '/allTypeLogin',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.loginResponse) ? r.loginResponse : null); },
		cb: handler
	});
}

// e.g. params: {"partnerName":"parade-dash","userId":"1234","session":"xyz_12334"}
gsapi.session.partnerLogin = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {request:params};
	gsapi.call({
		path: '/service/login/rest/v10/clientId/' + gsapi.cid + '/partnerLogin',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.loginResponse) ? r.loginResponse : null); },
		cb: handler
	});
}

//{"request":{"userName":"test","email":"a@a.com","password":"test123","confirmPassword":"test123","zipCode":"98110", "dashOptin":"true", "primaryStore" : "278", "secondaryStore":"170", "domainName":"localhost", "clientKey":"44426825e26517f75d53c0b7607b1ed267b3058c"}}
gsapi.session.parnterRegistration = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {request:params};
	gsapi.call({
		path: '/service/login/rest/v10/clientId/' + gsapi.cid + '/partnerRegistration',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.partnerRegistrationResponse) ? r.partnerRegistrationResponse : null); },
		cb: handler
	});
}

gsapi.session.partnerAndGSRegistration = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {request:params};
	gsapi.call({
		path: '/service/login/rest/v10/clientId/' + gsapi.cid + '/partnerAndGSRegistration',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.loginResponse) ? r.loginResponse : null); },
		cb: handler
	});
}


var USER = {};
gsapi.user = USER;

USER.getUserProfile = function(handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	gsapi.call({
		path: '/service/userprofile/rest/v10/clientId/' + gsapi.cid + '/getUserProfile'
	}, {
		callback:function(r){ this.cb.callback((r && r.UserProfileResponse) ? r.UserProfileResponse : null); },
		cb: handler
	});
}

USER.setUserProfile = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {setUserProfileRequest:params};
	gsapi.call({
		path: '/service/userprofile/rest/v10/clientId/' + gsapi.cid + '/setUserProfile',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.UserProfileResponse) ? r.UserProfileResponse : null); },
		cb: handler
	});
}

var CATEGORY = {};
gsapi.category = CATEGORY;

CATEGORY.createCategory = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {CreateCategoryRequest:params};
	gsapi.call({
		path: '/service/categoryservice/rest/v10/clientId/' + gsapi.cid +'/createCategory',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.CreateCategoryResponse) ? r.CreateCategoryResponse : null); },
		cb: handler
	});
}

CATEGORY.getUserCategories = function(handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	gsapi.call({
		path: '/service/categoryservice/rest/v10/clientId/' + gsapi.cid + '/getUserCategories'
	}, {
		callback:function(r){ this.cb.callback((r && r.GetUserCategoryResponse) ? r.GetUserCategoryResponse : null); },
		cb: handler
	});
}

CATEGORY.editCategory = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {EditCategoryRequest:params};
	gsapi.call({
		path: '/service/categoryservice/rest/v10/clientId/' + gsapi.cid +'/editCategory',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.GetUserCategoryResponse) ? r.GetUserCategoryResponse : null); },
		cb: handler
	});
}

CATEGORY.removeCategory = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var recipeCategoryId = params.recipeCategoryId;
	gsapi.call({
		path: '/service/categoryservice/rest/v10/clientId/' + gsapi.cid +'/removeCategory' + '/recipeCategoryId/' + recipeCategoryId
	}, {
		callback:function(r){ this.cb.callback((r && r.RemoveCategoryResponse) ? r.RemoveCategoryResponse : null); },
		cb: handler
	});
}

CATEGORY.addRecipeToCategory = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var recipeCategoryId = params.recipeCategoryId;
	var recipeId = params.recipeId;
	gsapi.call({
		path: '/service/categoryservice/rest/v10/clientId/' + gsapi.cid +'/addRecipeToCategory' + '/recipeCategoryId/' + recipeCategoryId + '/recipeId/' + recipeId
	}, {
		callback:function(r){ this.cb.callback((r && r.AddRecipeToCategoryResponse) ? r.AddRecipeToCategoryResponse : null); },
		cb: handler
	});
}

CATEGORY.removeRecipeFromCategory = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var recipeCategoryId = params.recipeCategoryId;
	var recipeId = params.recipeId;
	gsapi.call({
		path: '/service/categoryservice/rest/v10/clientId/' + gsapi.cid +'/removeRecipeFromCategory' + '/recipeCategoryId/' + recipeCategoryId + '/recipeId/' + recipeId
	}, {
		callback:function(r){ this.cb.callback((r && r.RemoveRecipeCategoryResponse) ? r.RemoveRecipeCategoryResponse : null); },
		cb: handler
	});
}
var LOCATION = {};
gsapi.location = LOCATION;

LOCATION.getLocationByZip = function(zip, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	gsapi.call({
		path: '/service/location/rest/v10/getLocationByZip/clientId/' + gsapi.cid + '/zipCode/' + zip
	}, {
		callback:function(r){ this.cb.callback((r && r.GetLocationResponse) ? r.GetLocationResponse : null); },
		cb: handler
	});
}

LOCATION.getLocation = function(handler) {
	gsapi.grocery.getZipCode(function(z){
		gsapi.location.getLocationByZip(z, handler);
	});
}

LOCATION.getChainLocations = function(params, handler) {
//	{"ChainLocationsRequest":{"zipCode":"94704","chainName":"safeway"}}
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {ChainLocationsRequest:params};
	gsapi.call({
		path: '/service/grocery/rest/v10/clientId/' + gsapi.cid + '/getChainLocations',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.ChainLocationsResponse) ? r.ChainLocationsResponse : null); },
		cb: handler
	});
}

LOCATION.getZipAndLocation = function(handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	gsapi.call({
		path: '/service/location/rest/v10/getLocation/clientId/' + gsapi.cid + '/ipAddress/' + gsapi.ip
	}, {
		callback:function(r){ this.cb.callback((r && r.getLocationResponse) ? r.getLocationResponse : null); },
		cb: handler
	});
}

LOCATION.getRetailer = function(params, handler) {
//	{"GetRetailerRequest":{"radius":"1","latitude":"42.0884685236258","longitude":"-72.6390742574325","zipCode":""}}
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {GetRetailerRequest:params};
	gsapi.call({
		path: '/service/chainservice/rest/v10/clientId/' + gsapi.cid + '/getRetailer',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.getRetailersResponse) ? r.getRetailersResponse : null); },
		cb: handler
	});
}

LOCATION.getRetailerLocation = function(params, handler) {
//	{"GetRetailerRequest":{"radius":"2","latitude":"40.8154","longitude":"-73.0456","zipCode":"","retailerIdList":[]}}
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {GetRetailerRequest:params};
	gsapi.call({
		path: '/service/chainservice/rest/v10/clientId/' + gsapi.cid + '/getRetailerLocation',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.getRetailersResponse) ? r.getRetailersResponse : null); },
		cb: handler
	});
}
LOCATION.getRetailerInformation = function(externalId, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	gsapi.call({
		path: '/service/retailerservice/rest/v10/getRetailerInformation/clientId/' + gsapi.cid + '/externalId/' + externalId
	}, {
		callback:function(r){ this.cb.callback((r && r.GetRetailerInformationResponse) ? r.GetRetailerInformationResponse : null); },
		cb: handler
	});
}
LOCATION.searchUPC = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {UpcSearchRequest:params};
	gsapi.call({
		path: '/service/retailerservice/rest/v10/clientId/' + gsapi.cid + '/searchUPC',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.UpcSearchResponse) ? r.UpcSearchResponse : null); },
		cb: handler
	});
}
var INGREDIENT = {};
gsapi.ingredient = INGREDIENT;

INGREDIENT.getPopularIngredients = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {PopularIngredientsRequest:params};
	gsapi.call({
		path: '/service/grocery/rest/v10/clientId/' + gsapi.cid +'/getPopularIngredients',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.PopularIngredientsResponse) ? r.PopularIngredientsResponse : null); },
		cb: handler
	});
}
var PORTAL = {};
gsapi.portal = PORTAL;

PORTAL.login = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {portalUserRequest:params};
	gsapi.call({
		path: '/service/groceryserver/portal/rest/v10/login',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.SelfServiceResponse) ? r.SelfServiceResponse : null); },
		cb: handler
	});
}

PORTAL.getUserProfile = function(handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	gsapi.call({
		path: '/service/groceryserver/portal/rest/v10/getPortalUserProfile'
	}, {
		callback:function(r){ this.cb.callback((r && r.SelfServiceResponse) ? r.SelfServiceResponse : null); },
		cb: handler
	});
}

PORTAL.logout = function(handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	gsapi.call({
		path: '/service/groceryserver/portal/rest/v10/logout'
	}, {
		callback:function(r){ this.cb.callback((r && r.SelfServiceResponse) ? r.SelfServiceResponse : null); },
		cb: handler
	});
}

PORTAL.getOrganizations = function(portalUserId, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	gsapi.call({
		path: '/service/groceryserver/portal/rest/v10/getOrganizations/portalUserId/' + portalUserId
	}, {
		callback:function(r){ this.cb.callback((r && r.SelfServiceResponse) ? r.SelfServiceResponse : null); },
		cb: handler
	});
}

//{"Request":{"clientPortalId":"6c7877feaf023f93b09a19d07736a7ce","orgId":"1"}}
PORTAL.getClientPortals = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {Request:params};
	gsapi.call({
		path: '/service/groceryserver/portal/rest/v10/getClientPortals',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.SelfServiceResponse) ? r.SelfServiceResponse : null); },
		cb: handler
	});
}

PORTAL.getDataSources = function(clientPortalId, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {"Request":{"clientPortalId":clientPortalId}};
	gsapi.call({
		path: '/service/groceryserver/portal/rest/v10/getDataSources',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.SelfServiceResponse) ? r.SelfServiceResponse : null); },
		cb: handler
	});
}

//{"GetChainsRequest":{"zipCode":"00544","typeList":["special","coupon"],"categoryIdList":[85,72,83,87,95]}}
PORTAL.getChains = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {"GetChainsRequest":params};
	gsapi.call({
		path: '/service/groceryserver/portal/admin/getChains',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.getStoresResponse) ? r.getStoresResponse : null); },
		cb: handler
	});
}

//{"CategoriesByZipRequest":{"zipCode":"55337","chainIdList":["115","63"],"type":["coupon","special"]}}
PORTAL.getCategories = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {"CategoriesByZipRequest":params};
	gsapi.call({
		path: '/service/groceryserver/portal/admin/getCategories',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.GetCategoriesByZipResponse) ? r.GetCategoriesByZipResponse : null); },
		cb: handler
	});
}

PORTAL.getBrands = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {"Request":params};
	gsapi.call({
		path: '/service/groceryserver/portal/admin/getBrands'
		//,
		//post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.GetBrandResponse) ? r.GetBrandResponse : null); },
		cb: handler
	});
}

PORTAL.getManufacturers = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {"Request":params};
	gsapi.call({
		path: '/service/groceryserver/portal/admin/getManufacturers'
		//,
		//post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.GetManufacturerResponse) ? r.GetManufacturerResponse : null); },
		cb: handler
	});
}

//{"filterRequest":{"zipCode":"00544", "typeList":["coupon","special","electronic"],"chainIdList":[92,102],"categoryIdList":[345,344],"orderBy":["chain", "total_savings", "expiration_date", "description", "brand", "manufacturer"],"offset":0,"maxResult":2}}
PORTAL.getPromotions = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	gsapi.call({
		path: '/service/groceryserver/portal/admin/getPromotions',
		post: params
	}, {
		callback:function(r){ this.cb.callback((r && r.PromotionResponse) ? r.PromotionResponse : null); },
		cb: handler
	});
}

//{"EditPromotionRequest":{"id":"972826","externalId":"2345","status":"ACTIVE","activationDate":"2011-10-08","expirationDate":"2011-10-10","name":"Frozen Spinach Potato Pancake","title":"5 for $5.00","description":"Baking Mix, Original All-Purpose","defaultDisplayDescription":"Baking Mix, Original All-Purpose","brand":"Kraft Singles","imageUrl":"http://www.mygrocerydeals.com/products/nw/200/1/5/7/37000238751.jpg","regularPrice":"3.24","salePrice":"3.20","totalSavings":"3.05","unit":"lb","categoryName":"Dairy","upcItem":"4470006424","chainName":"Meijer","type":"coupon","additional":"Pack of 6, Selected Varieties Only","ingredientItem":"1817","marketArea":"175","saleQuantity":"1","featuredRating":"0"}}
PORTAL.savePromotion = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {"EditPromotionRequest":params};
	gsapi.call({
		path: '/service/groceryserver/portal/admin/savePromotion',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.AddPromotionResponse) ? r.AddPromotionResponse : r.GetPromotionResponse? r.GetPromotionResponse : null); },
		cb: handler
	});
}

// {"filterRequest":{"filterTypes":["chain", "category", "brand", "promotionType", "manufacturer"],"selectedFilterValues":{"chainIdList":[386,385],"categoryIdList":[],"brandIdList":[],"manufacturerIdList":[6605,6604],"types":["coupon","special","electronic"]}}}
PORTAL.getFilterValues = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	gsapi.call({
		path: '/service/groceryserver/portal/admin/getFilterValues',
		post: params
	}, {
		callback:function(r){ this.cb.callback((r && r.FilterValuesResponse) ? r.FilterValuesResponse : null); },
		cb: handler
	});
}

PORTAL.createBrand = function(nam, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {"Request":{"brandName":nam}};
	gsapi.call({
		path: '/service/groceryserver/portal/rest/v10/createBrand',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.CreateBrandResponse) ? r.CreateBrandResponse : null); },
		cb: handler
	});
}

PORTAL.createManufacturer = function(nam, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {"Request":{"manufacturerName":nam}};
	gsapi.call({
		path: '/service/groceryserver/portal/rest/v10/createManufacturer',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.CreateManufacturerResponse) ? r.CreateManufacturerResponse : null); },
		cb: handler
	});
}

PORTAL.getPromotionAttributeValues = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {"attributeValuesRequest":params};
	gsapi.call({
		path: '/service/groceryserver/portal/rest/v10/getPromotionAttributeValues',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.AttributeValuesResponse) ? r.AttributeValuesResponse : null); },
		cb: handler
	});
}

PORTAL.getOrganization = function(orgId, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	gsapi.call({
		path: 'service/groceryserver/portal/rest/v10/getOrganizationById/Id/' + orgId
	}, {
		callback:function(r){ this.cb.callback((r && r.SelfServiceResponse) ? r.SelfServiceResponse : null); },
		cb: handler
	});
}

PORTAL.validateUpcCodes = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {"upcItemRequest":params};
	gsapi.call({
		path: '/service/groceryserver/portal/admin/validateUpcItemByCode',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.UpcItemsResponse) ? r.UpcItemsResponse : null); },
		cb: handler
	});
}

PORTAL.getAllMetroCodes = function(handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	gsapi.call({
		path: '/service/groceryserver/portal/admin/getAllMetroCodes'
	}, {
		callback:function(r){ this.cb.callback((r && r.GoogleMetroCodes) ? r.GoogleMetroCodes : null); },
		cb: handler
	});
}

PORTAL.getSelectedMetroCodes = function(marketAreaId,handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	gsapi.call({
		path: '/service/groceryserver/portal/admin/getSelectedMetroCodes/marketAreaId/' + marketAreaId
	}, {
		callback:function(r){ this.cb.callback((r && r.GoogleMetroCodes) ? r.GoogleMetroCodes : null); },
		cb: handler
	});
}
var MEAL = {};
gsapi.meal = MEAL;

MEAL.addMeal = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {MealPlanRequest:params};
	
	gsapi.call({
		path: '/service/mealplan/rest/v10/addMeal/clientId/' + gsapi.cid,
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.meal) ? r.meal : null); },
		cb: handler
	});
}


MEAL.deleteMeal = function(mealId, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	
	gsapi.call({
		path: '/service/mealplan/rest/v10/deleteMeal/clientId/' + gsapi.cid + '/mealId/'+ mealId
	}, {
		callback:function(r){ this.cb.callback((r && r.meal) ? r.meal : null); },
		cb: handler
	});
}

MEAL.updateMeal = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {MealPlanRequest:params};
	
	gsapi.call({
		path: '/service/mealplan/rest/v10/updateMeal/clientId/' + gsapi.cid,
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.meal) ? r.meal : null); },
		cb: handler
	});
}

MEAL.getMealPlan = function(startDate, endDate, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	
	gsapi.call({
		path: '/service/mealplan/rest/v10/getMealPlan/clientId/' + gsapi.cid + '/startDate/'+ startDate + '/endDate/' + endDate 
	}, {
		callback:function(r){ this.cb.callback((r && r.MealPlanResponse) ? r.MealPlanResponse : null); },
		cb: handler
	});
}

var CLIENT_APPLICATION = {};
gsapi.clientApplication = CLIENT_APPLICATION;

CLIENT_APPLICATION.populateFDCFrame = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {FDCFrameRequest:params};
	gsapi.call({
		path: '/service/clientapplication/rest/v10/clientId/' + gsapi.cid + '/populateFDCFrame',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.FDCFrameResponse) ? r.FDCFrameResponse : null); },
		cb: handler
	});
};

CLIENT_APPLICATION.logImpressions = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {LogImpressionRequest:params};
	gsapi.call({
		path: '/service/panelist/rest/v10/clientId/' + gsapi.cid + '/logImpressions',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.Response) ? r.Response : null); },
		cb: handler
	});
};
var IFOOD = {};
gsapi.ifoods = IFOOD;

IFOOD.deleteItemFromShoppingList = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {IFoodsRequest:params};
	
	gsapi.call({
		path: '/service/kraft/ifoods/deleteItemFromShoppingList',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.IFoodsResponse) ? r.IFoodsResponse : null); },
		cb: handler
	});
}


IFOOD.deleteItemsFromShoppingList = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {IFoodsRequest:params};
	
	gsapi.call({
		path: '/service/kraft/ifoods/deleteItemsFromShoppingList',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.IFoodsResponse) ? r.IFoodsResponse : null); },
		cb: handler
	});
}

IFOOD.getShoppingListSorted = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {IFoodsRequest:params};
	
	gsapi.call({
		path: '/service/kraft/ifoods/clientId/' + gsapi.cid + '/getShoppingListSorted',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r) ? r : null); },
		cb: handler
	});
}

IFOOD.addRecipeToRecipeBox = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {IFoodsRequest:params};
	
	gsapi.call({
		path: '/service/kraft/ifoods/addRecipeToRecipeBox',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.IFoodsResponse) ? r.IFoodsResponse : null); },
		cb: handler
	});
}

IFOOD.addRecipeToRecipeBoxShoppingList = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {IFoodsRequest:params};
	
	gsapi.call({
		path: '/service/kraft/ifoods/addRecipeToRecipeBoxShoppingList',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.IFoodsResponse) ? r.IFoodsResponse : null); },
		cb: handler
	});
}

IFOOD.getRecipesFromRecipeBox = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {IFoodsRequest:params};
	
	gsapi.call({
		path: '/service/kraft/ifoods/getRecipesFromRecipeBox',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.IFoodsResponse) ? r.IFoodsResponse : null); },
		cb: handler
	});
}

IFOOD.deleteRecipeFromRecipeBox = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {IFoodsRequest:params};
	
	gsapi.call({
		path: '/service/kraft/ifoods/deleteRecipeFromRecipeBox',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.IFoodsResponse) ? r.IFoodsResponse : null); },
		cb: handler
	});
}

IFOOD.addShoppingList = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {IFoodsRequest:params};
	
	gsapi.call({
		path: '/service/kraft/ifoods/addShoppingList',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.IFoodsResponse) ? r.IFoodsResponse : null); },
		cb: handler
	});
}

IFOOD.getShoppingLists = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {IFoodsRequest:params};
	
	gsapi.call({
		path: '/service/kraft/ifoods/clientId/' + gsapi.cid + '/getShoppingLists',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r) ? r : null); },
		cb: handler
	});
}
IFOOD.addItemToShoppingList = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {IFoodsRequest:params};
	
	gsapi.call({
		path: '/service/kraft/ifoods/clientId/' + gsapi.cid + '/addItemToShoppingList',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.IFoodsResponse) ? r.IFoodsResponse : null); },
		cb: handler
	});
}

IFOOD.addRecipesToShoppingList = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {IFoodsRequest:params};
	
	gsapi.call({
		path: '/service/kraft/ifoods/clientId/' + gsapi.cid + '/addRecipesToShoppingList',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.IFoodsResponse) ? r.IFoodsResponse : null); },
		cb: handler
	});
}

IFOOD.getDefaultShoppingList = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {IFoodsRequest:params};
	
	gsapi.call({
		path: '/service/kraft/ifoods/clientId/' + gsapi.cid + '/getDefaultShoppingList',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.IFoodsResponse) ? r.IFoodsResponse : null); },
		cb: handler
	});
}

IFOOD.deleteRecipesFromRecipeBox = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {IFoodsRequest:params};
	
	gsapi.call({
		path: '/service/kraft/ifoods/clientId/' + gsapi.cid + '/deleteRecipesFromRecipeBox',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.IFoodsResponse) ? r.IFoodsResponse : null); },
		cb: handler
	});
}

IFOOD.addItemToShoppingListReturnItemListId = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {IFoodsRequest:params};
	
	gsapi.call({
		path: '/service/kraft/ifoods/clientId/' + gsapi.cid + '/addItemToShoppingListReturnItemListId',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r) ? r : null); },
		cb: handler
	});
}

IFOOD.addItemsToShoppingListReturnItemListIds = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {IFoodsRequest:params};
	
	gsapi.call({
		path: '/service/kraft/ifoods/clientId/' + gsapi.cid + '/addItemsToShoppingListReturnItemListIds',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r) ? r : null); },
		cb: handler
	});
}

IFOOD.clearRecipeBox = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	//var req = {IFoodsRequest:params};
	
	gsapi.call({
		path: '/service/kraft/ifoods/clientId/' + gsapi.cid + '/clearRecipeBox'
		//post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.IFoodsResponse) ? r.IFoodsResponse : null); },
		cb: handler
	});
}
IFOOD.editShoppingListItem = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {IFoodsRequest:params};
	
	gsapi.call({
		path: '/service/kraft/ifoods/clientId/' + gsapi.cid + '/editShoppingListItem',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.IFoodsResponse) ? r.IFoodsResponse : null); },
		cb: handler
	});
}
IFOOD.addRecipesToRecipeBox = function(params, handler) {
	if (typeof handler == 'function') handler = { callback: handler };
	var req = {IFoodsRequest:params};
	
	gsapi.call({
		path: '/service/kraft/ifoods/clientId/' + gsapi.cid + '/addRecipesToRecipeBox',
		post: req
	}, {
		callback:function(r){ this.cb.callback((r && r.IFoodsResponse) ? r.IFoodsResponse : null); },
		cb: handler
	});
}







