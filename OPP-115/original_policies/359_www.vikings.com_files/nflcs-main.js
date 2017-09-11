//initialize GPT
var googletag = googletag || {};
googletag.cmd = googletag.cmd || [];
(function () {
    var gads = document.createElement("script");
    gads.async = true;
    gads.type = "text/javascript";
    var useSSL = "https:" == document.location.protocol;
    gads.src = (useSSL ? "https:" : "http:") + "//www.googletagservices.com/tag/js/gpt.js";
    var node = document.getElementsByTagName("script")[0];
    node.parentNode.insertBefore(gads, node);
})();

/*! jQuery v1.8.2 jquery.com | jquery.org/license */
(function(a,b){function G(a){var b=F[a]={};return p.each(a.split(s),function(a,c){b[c]=!0}),b}function J(a,c,d){if(d===b&&a.nodeType===1){var e="data-"+c.replace(I,"-$1").toLowerCase();d=a.getAttribute(e);if(typeof d=="string"){try{d=d==="true"?!0:d==="false"?!1:d==="null"?null:+d+""===d?+d:H.test(d)?p.parseJSON(d):d}catch(f){}p.data(a,c,d)}else d=b}return d}function K(a){var b;for(b in a){if(b==="data"&&p.isEmptyObject(a[b]))continue;if(b!=="toJSON")return!1}return!0}function ba(){return!1}function bb(){return!0}function bh(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function bi(a,b){do a=a[b];while(a&&a.nodeType!==1);return a}function bj(a,b,c){b=b||0;if(p.isFunction(b))return p.grep(a,function(a,d){var e=!!b.call(a,d,a);return e===c});if(b.nodeType)return p.grep(a,function(a,d){return a===b===c});if(typeof b=="string"){var d=p.grep(a,function(a){return a.nodeType===1});if(be.test(b))return p.filter(b,d,!c);b=p.filter(b,d)}return p.grep(a,function(a,d){return p.inArray(a,b)>=0===c})}function bk(a){var b=bl.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}function bC(a,b){return a.getElementsByTagName(b)[0]||a.appendChild(a.ownerDocument.createElement(b))}function bD(a,b){if(b.nodeType!==1||!p.hasData(a))return;var c,d,e,f=p._data(a),g=p._data(b,f),h=f.events;if(h){delete g.handle,g.events={};for(c in h)for(d=0,e=h[c].length;d<e;d++)p.event.add(b,c,h[c][d])}g.data&&(g.data=p.extend({},g.data))}function bE(a,b){var c;if(b.nodeType!==1)return;b.clearAttributes&&b.clearAttributes(),b.mergeAttributes&&b.mergeAttributes(a),c=b.nodeName.toLowerCase(),c==="object"?(b.parentNode&&(b.outerHTML=a.outerHTML),p.support.html5Clone&&a.innerHTML&&!p.trim(b.innerHTML)&&(b.innerHTML=a.innerHTML)):c==="input"&&bv.test(a.type)?(b.defaultChecked=b.checked=a.checked,b.value!==a.value&&(b.value=a.value)):c==="option"?b.selected=a.defaultSelected:c==="input"||c==="textarea"?b.defaultValue=a.defaultValue:c==="script"&&b.text!==a.text&&(b.text=a.text),b.removeAttribute(p.expando)}function bF(a){return typeof a.getElementsByTagName!="undefined"?a.getElementsByTagName("*"):typeof a.querySelectorAll!="undefined"?a.querySelectorAll("*"):[]}function bG(a){bv.test(a.type)&&(a.defaultChecked=a.checked)}function bY(a,b){if(b in a)return b;var c=b.charAt(0).toUpperCase()+b.slice(1),d=b,e=bW.length;while(e--){b=bW[e]+c;if(b in a)return b}return d}function bZ(a,b){return a=b||a,p.css(a,"display")==="none"||!p.contains(a.ownerDocument,a)}function b$(a,b){var c,d,e=[],f=0,g=a.length;for(;f<g;f++){c=a[f];if(!c.style)continue;e[f]=p._data(c,"olddisplay"),b?(!e[f]&&c.style.display==="none"&&(c.style.display=""),c.style.display===""&&bZ(c)&&(e[f]=p._data(c,"olddisplay",cc(c.nodeName)))):(d=bH(c,"display"),!e[f]&&d!=="none"&&p._data(c,"olddisplay",d))}for(f=0;f<g;f++){c=a[f];if(!c.style)continue;if(!b||c.style.display==="none"||c.style.display==="")c.style.display=b?e[f]||"":"none"}return a}function b_(a,b,c){var d=bP.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function ca(a,b,c,d){var e=c===(d?"border":"content")?4:b==="width"?1:0,f=0;for(;e<4;e+=2)c==="margin"&&(f+=p.css(a,c+bV[e],!0)),d?(c==="content"&&(f-=parseFloat(bH(a,"padding"+bV[e]))||0),c!=="margin"&&(f-=parseFloat(bH(a,"border"+bV[e]+"Width"))||0)):(f+=parseFloat(bH(a,"padding"+bV[e]))||0,c!=="padding"&&(f+=parseFloat(bH(a,"border"+bV[e]+"Width"))||0));return f}function cb(a,b,c){var d=b==="width"?a.offsetWidth:a.offsetHeight,e=!0,f=p.support.boxSizing&&p.css(a,"boxSizing")==="border-box";if(d<=0||d==null){d=bH(a,b);if(d<0||d==null)d=a.style[b];if(bQ.test(d))return d;e=f&&(p.support.boxSizingReliable||d===a.style[b]),d=parseFloat(d)||0}return d+ca(a,b,c||(f?"border":"content"),e)+"px"}function cc(a){if(bS[a])return bS[a];var b=p("<"+a+">").appendTo(e.body),c=b.css("display");b.remove();if(c==="none"||c===""){bI=e.body.appendChild(bI||p.extend(e.createElement("iframe"),{frameBorder:0,width:0,height:0}));if(!bJ||!bI.createElement)bJ=(bI.contentWindow||bI.contentDocument).document,bJ.write("<!doctype html><html><body>"),bJ.close();b=bJ.body.appendChild(bJ.createElement(a)),c=bH(b,"display"),e.body.removeChild(bI)}return bS[a]=c,c}function ci(a,b,c,d){var e;if(p.isArray(b))p.each(b,function(b,e){c||ce.test(a)?d(a,e):ci(a+"["+(typeof e=="object"?b:"")+"]",e,c,d)});else if(!c&&p.type(b)==="object")for(e in b)ci(a+"["+e+"]",b[e],c,d);else d(a,b)}function cz(a){return function(b,c){typeof b!="string"&&(c=b,b="*");var d,e,f,g=b.toLowerCase().split(s),h=0,i=g.length;if(p.isFunction(c))for(;h<i;h++)d=g[h],f=/^\+/.test(d),f&&(d=d.substr(1)||"*"),e=a[d]=a[d]||[],e[f?"unshift":"push"](c)}}function cA(a,c,d,e,f,g){f=f||c.dataTypes[0],g=g||{},g[f]=!0;var h,i=a[f],j=0,k=i?i.length:0,l=a===cv;for(;j<k&&(l||!h);j++)h=i[j](c,d,e),typeof h=="string"&&(!l||g[h]?h=b:(c.dataTypes.unshift(h),h=cA(a,c,d,e,h,g)));return(l||!h)&&!g["*"]&&(h=cA(a,c,d,e,"*",g)),h}function cB(a,c){var d,e,f=p.ajaxSettings.flatOptions||{};for(d in c)c[d]!==b&&((f[d]?a:e||(e={}))[d]=c[d]);e&&p.extend(!0,a,e)}function cC(a,c,d){var e,f,g,h,i=a.contents,j=a.dataTypes,k=a.responseFields;for(f in k)f in d&&(c[k[f]]=d[f]);while(j[0]==="*")j.shift(),e===b&&(e=a.mimeType||c.getResponseHeader("content-type"));if(e)for(f in i)if(i[f]&&i[f].test(e)){j.unshift(f);break}if(j[0]in d)g=j[0];else{for(f in d){if(!j[0]||a.converters[f+" "+j[0]]){g=f;break}h||(h=f)}g=g||h}if(g)return g!==j[0]&&j.unshift(g),d[g]}function cD(a,b){var c,d,e,f,g=a.dataTypes.slice(),h=g[0],i={},j=0;a.dataFilter&&(b=a.dataFilter(b,a.dataType));if(g[1])for(c in a.converters)i[c.toLowerCase()]=a.converters[c];for(;e=g[++j];)if(e!=="*"){if(h!=="*"&&h!==e){c=i[h+" "+e]||i["* "+e];if(!c)for(d in i){f=d.split(" ");if(f[1]===e){c=i[h+" "+f[0]]||i["* "+f[0]];if(c){c===!0?c=i[d]:i[d]!==!0&&(e=f[0],g.splice(j--,0,e));break}}}if(c!==!0)if(c&&a["throws"])b=c(b);else try{b=c(b)}catch(k){return{state:"parsererror",error:c?k:"No conversion from "+h+" to "+e}}}h=e}return{state:"success",data:b}}function cL(){try{return new a.XMLHttpRequest}catch(b){}}function cM(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}function cU(){return setTimeout(function(){cN=b},0),cN=p.now()}function cV(a,b){p.each(b,function(b,c){var d=(cT[b]||[]).concat(cT["*"]),e=0,f=d.length;for(;e<f;e++)if(d[e].call(a,b,c))return})}function cW(a,b,c){var d,e=0,f=0,g=cS.length,h=p.Deferred().always(function(){delete i.elem}),i=function(){var b=cN||cU(),c=Math.max(0,j.startTime+j.duration-b),d=1-(c/j.duration||0),e=0,f=j.tweens.length;for(;e<f;e++)j.tweens[e].run(d);return h.notifyWith(a,[j,d,c]),d<1&&f?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:p.extend({},b),opts:p.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:cN||cU(),duration:c.duration,tweens:[],createTween:function(b,c,d){var e=p.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(e),e},stop:function(b){var c=0,d=b?j.tweens.length:0;for(;c<d;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;cX(k,j.opts.specialEasing);for(;e<g;e++){d=cS[e].call(j,a,k,j.opts);if(d)return d}return cV(j,k),p.isFunction(j.opts.start)&&j.opts.start.call(a,j),p.fx.timer(p.extend(i,{anim:j,queue:j.opts.queue,elem:a})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}function cX(a,b){var c,d,e,f,g;for(c in a){d=p.camelCase(c),e=b[d],f=a[c],p.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=p.cssHooks[d];if(g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}}function cY(a,b,c){var d,e,f,g,h,i,j,k,l=this,m=a.style,n={},o=[],q=a.nodeType&&bZ(a);c.queue||(j=p._queueHooks(a,"fx"),j.unqueued==null&&(j.unqueued=0,k=j.empty.fire,j.empty.fire=function(){j.unqueued||k()}),j.unqueued++,l.always(function(){l.always(function(){j.unqueued--,p.queue(a,"fx").length||j.empty.fire()})})),a.nodeType===1&&("height"in b||"width"in b)&&(c.overflow=[m.overflow,m.overflowX,m.overflowY],p.css(a,"display")==="inline"&&p.css(a,"float")==="none"&&(!p.support.inlineBlockNeedsLayout||cc(a.nodeName)==="inline"?m.display="inline-block":m.zoom=1)),c.overflow&&(m.overflow="hidden",p.support.shrinkWrapBlocks||l.done(function(){m.overflow=c.overflow[0],m.overflowX=c.overflow[1],m.overflowY=c.overflow[2]}));for(d in b){f=b[d];if(cP.exec(f)){delete b[d];if(f===(q?"hide":"show"))continue;o.push(d)}}g=o.length;if(g){h=p._data(a,"fxshow")||p._data(a,"fxshow",{}),q?p(a).show():l.done(function(){p(a).hide()}),l.done(function(){var b;p.removeData(a,"fxshow",!0);for(b in n)p.style(a,b,n[b])});for(d=0;d<g;d++)e=o[d],i=l.createTween(e,q?h[e]:0),n[e]=h[e]||p.style(a,e),e in h||(h[e]=i.start,q&&(i.end=i.start,i.start=e==="width"||e==="height"?1:0))}}function cZ(a,b,c,d,e){return new cZ.prototype.init(a,b,c,d,e)}function c$(a,b){var c,d={height:a},e=0;b=b?1:0;for(;e<4;e+=2-b)c=bV[e],d["margin"+c]=d["padding"+c]=a;return b&&(d.opacity=d.width=a),d}function da(a){return p.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:!1}var c,d,e=a.document,f=a.location,g=a.navigator,h=a.jQuery,i=a.$,j=Array.prototype.push,k=Array.prototype.slice,l=Array.prototype.indexOf,m=Object.prototype.toString,n=Object.prototype.hasOwnProperty,o=String.prototype.trim,p=function(a,b){return new p.fn.init(a,b,c)},q=/[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,r=/\S/,s=/\s+/,t=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,u=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,v=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,w=/^[\],:{}\s]*$/,x=/(?:^|:|,)(?:\s*\[)+/g,y=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,z=/"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,A=/^-ms-/,B=/-([\da-z])/gi,C=function(a,b){return(b+"").toUpperCase()},D=function(){e.addEventListener?(e.removeEventListener("DOMContentLoaded",D,!1),p.ready()):e.readyState==="complete"&&(e.detachEvent("onreadystatechange",D),p.ready())},E={};p.fn=p.prototype={constructor:p,init:function(a,c,d){var f,g,h,i;if(!a)return this;if(a.nodeType)return this.context=this[0]=a,this.length=1,this;if(typeof a=="string"){a.charAt(0)==="<"&&a.charAt(a.length-1)===">"&&a.length>=3?f=[null,a,null]:f=u.exec(a);if(f&&(f[1]||!c)){if(f[1])return c=c instanceof p?c[0]:c,i=c&&c.nodeType?c.ownerDocument||c:e,a=p.parseHTML(f[1],i,!0),v.test(f[1])&&p.isPlainObject(c)&&this.attr.call(a,c,!0),p.merge(this,a);g=e.getElementById(f[2]);if(g&&g.parentNode){if(g.id!==f[2])return d.find(a);this.length=1,this[0]=g}return this.context=e,this.selector=a,this}return!c||c.jquery?(c||d).find(a):this.constructor(c).find(a)}return p.isFunction(a)?d.ready(a):(a.selector!==b&&(this.selector=a.selector,this.context=a.context),p.makeArray(a,this))},selector:"",jquery:"1.8.2",length:0,size:function(){return this.length},toArray:function(){return k.call(this)},get:function(a){return a==null?this.toArray():a<0?this[this.length+a]:this[a]},pushStack:function(a,b,c){var d=p.merge(this.constructor(),a);return d.prevObject=this,d.context=this.context,b==="find"?d.selector=this.selector+(this.selector?" ":"")+c:b&&(d.selector=this.selector+"."+b+"("+c+")"),d},each:function(a,b){return p.each(this,a,b)},ready:function(a){return p.ready.promise().done(a),this},eq:function(a){return a=+a,a===-1?this.slice(a):this.slice(a,a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(k.apply(this,arguments),"slice",k.call(arguments).join(","))},map:function(a){return this.pushStack(p.map(this,function(b,c){return a.call(b,c,b)}))},end:function(){return this.prevObject||this.constructor(null)},push:j,sort:[].sort,splice:[].splice},p.fn.init.prototype=p.fn,p.extend=p.fn.extend=function(){var a,c,d,e,f,g,h=arguments[0]||{},i=1,j=arguments.length,k=!1;typeof h=="boolean"&&(k=h,h=arguments[1]||{},i=2),typeof h!="object"&&!p.isFunction(h)&&(h={}),j===i&&(h=this,--i);for(;i<j;i++)if((a=arguments[i])!=null)for(c in a){d=h[c],e=a[c];if(h===e)continue;k&&e&&(p.isPlainObject(e)||(f=p.isArray(e)))?(f?(f=!1,g=d&&p.isArray(d)?d:[]):g=d&&p.isPlainObject(d)?d:{},h[c]=p.extend(k,g,e)):e!==b&&(h[c]=e)}return h},p.extend({noConflict:function(b){return a.$===p&&(a.$=i),b&&a.jQuery===p&&(a.jQuery=h),p},isReady:!1,readyWait:1,holdReady:function(a){a?p.readyWait++:p.ready(!0)},ready:function(a){if(a===!0?--p.readyWait:p.isReady)return;if(!e.body)return setTimeout(p.ready,1);p.isReady=!0;if(a!==!0&&--p.readyWait>0)return;d.resolveWith(e,[p]),p.fn.trigger&&p(e).trigger("ready").off("ready")},isFunction:function(a){return p.type(a)==="function"},isArray:Array.isArray||function(a){return p.type(a)==="array"},isWindow:function(a){return a!=null&&a==a.window},isNumeric:function(a){return!isNaN(parseFloat(a))&&isFinite(a)},type:function(a){return a==null?String(a):E[m.call(a)]||"object"},isPlainObject:function(a){if(!a||p.type(a)!=="object"||a.nodeType||p.isWindow(a))return!1;try{if(a.constructor&&!n.call(a,"constructor")&&!n.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}var d;for(d in a);return d===b||n.call(a,d)},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},error:function(a){throw new Error(a)},parseHTML:function(a,b,c){var d;return!a||typeof a!="string"?null:(typeof b=="boolean"&&(c=b,b=0),b=b||e,(d=v.exec(a))?[b.createElement(d[1])]:(d=p.buildFragment([a],b,c?null:[]),p.merge([],(d.cacheable?p.clone(d.fragment):d.fragment).childNodes)))},parseJSON:function(b){if(!b||typeof b!="string")return null;b=p.trim(b);if(a.JSON&&a.JSON.parse)return a.JSON.parse(b);if(w.test(b.replace(y,"@").replace(z,"]").replace(x,"")))return(new Function("return "+b))();p.error("Invalid JSON: "+b)},parseXML:function(c){var d,e;if(!c||typeof c!="string")return null;try{a.DOMParser?(e=new DOMParser,d=e.parseFromString(c,"text/xml")):(d=new ActiveXObject("Microsoft.XMLDOM"),d.async="false",d.loadXML(c))}catch(f){d=b}return(!d||!d.documentElement||d.getElementsByTagName("parsererror").length)&&p.error("Invalid XML: "+c),d},noop:function(){},globalEval:function(b){b&&r.test(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(A,"ms-").replace(B,C)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,c,d){var e,f=0,g=a.length,h=g===b||p.isFunction(a);if(d){if(h){for(e in a)if(c.apply(a[e],d)===!1)break}else for(;f<g;)if(c.apply(a[f++],d)===!1)break}else if(h){for(e in a)if(c.call(a[e],e,a[e])===!1)break}else for(;f<g;)if(c.call(a[f],f,a[f++])===!1)break;return a},trim:o&&!o.call("? ")?function(a){return a==null?"":o.call(a)}:function(a){return a==null?"":(a+"").replace(t,"")},makeArray:function(a,b){var c,d=b||[];return a!=null&&(c=p.type(a),a.length==null||c==="string"||c==="function"||c==="regexp"||p.isWindow(a)?j.call(d,a):p.merge(d,a)),d},inArray:function(a,b,c){var d;if(b){if(l)return l.call(b,a,c);d=b.length,c=c?c<0?Math.max(0,d+c):c:0;for(;c<d;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,c){var d=c.length,e=a.length,f=0;if(typeof d=="number")for(;f<d;f++)a[e++]=c[f];else while(c[f]!==b)a[e++]=c[f++];return a.length=e,a},grep:function(a,b,c){var d,e=[],f=0,g=a.length;c=!!c;for(;f<g;f++)d=!!b(a[f],f),c!==d&&e.push(a[f]);return e},map:function(a,c,d){var e,f,g=[],h=0,i=a.length,j=a instanceof p||i!==b&&typeof i=="number"&&(i>0&&a[0]&&a[i-1]||i===0||p.isArray(a));if(j)for(;h<i;h++)e=c(a[h],h,d),e!=null&&(g[g.length]=e);else for(f in a)e=c(a[f],f,d),e!=null&&(g[g.length]=e);return g.concat.apply([],g)},guid:1,proxy:function(a,c){var d,e,f;return typeof c=="string"&&(d=a[c],c=a,a=d),p.isFunction(a)?(e=k.call(arguments,2),f=function(){return a.apply(c,e.concat(k.call(arguments)))},f.guid=a.guid=a.guid||p.guid++,f):b},access:function(a,c,d,e,f,g,h){var i,j=d==null,k=0,l=a.length;if(d&&typeof d=="object"){for(k in d)p.access(a,c,k,d[k],1,g,e);f=1}else if(e!==b){i=h===b&&p.isFunction(e),j&&(i?(i=c,c=function(a,b,c){return i.call(p(a),c)}):(c.call(a,e),c=null));if(c)for(;k<l;k++)c(a[k],d,i?e.call(a[k],k,c(a[k],d)):e,h);f=1}return f?a:j?c.call(a):l?c(a[0],d):g},now:function(){return(new Date).getTime()}}),p.ready.promise=function(b){if(!d){d=p.Deferred();if(e.readyState==="complete")setTimeout(p.ready,1);else if(e.addEventListener)e.addEventListener("DOMContentLoaded",D,!1),a.addEventListener("load",p.ready,!1);else{e.attachEvent("onreadystatechange",D),a.attachEvent("onload",p.ready);var c=!1;try{c=a.frameElement==null&&e.documentElement}catch(f){}c&&c.doScroll&&function g(){if(!p.isReady){try{c.doScroll("left")}catch(a){return setTimeout(g,50)}p.ready()}}()}}return d.promise(b)},p.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(a,b){E["[object "+b+"]"]=b.toLowerCase()}),c=p(e);var F={};p.Callbacks=function(a){a=typeof a=="string"?F[a]||G(a):p.extend({},a);var c,d,e,f,g,h,i=[],j=!a.once&&[],k=function(b){c=a.memory&&b,d=!0,h=f||0,f=0,g=i.length,e=!0;for(;i&&h<g;h++)if(i[h].apply(b[0],b[1])===!1&&a.stopOnFalse){c=!1;break}e=!1,i&&(j?j.length&&k(j.shift()):c?i=[]:l.disable())},l={add:function(){if(i){var b=i.length;(function d(b){p.each(b,function(b,c){var e=p.type(c);e==="function"&&(!a.unique||!l.has(c))?i.push(c):c&&c.length&&e!=="string"&&d(c)})})(arguments),e?g=i.length:c&&(f=b,k(c))}return this},remove:function(){return i&&p.each(arguments,function(a,b){var c;while((c=p.inArray(b,i,c))>-1)i.splice(c,1),e&&(c<=g&&g--,c<=h&&h--)}),this},has:function(a){return p.inArray(a,i)>-1},empty:function(){return i=[],this},disable:function(){return i=j=c=b,this},disabled:function(){return!i},lock:function(){return j=b,c||l.disable(),this},locked:function(){return!j},fireWith:function(a,b){return b=b||[],b=[a,b.slice?b.slice():b],i&&(!d||j)&&(e?j.push(b):k(b)),this},fire:function(){return l.fireWith(this,arguments),this},fired:function(){return!!d}};return l},p.extend({Deferred:function(a){var b=[["resolve","done",p.Callbacks("once memory"),"resolved"],["reject","fail",p.Callbacks("once memory"),"rejected"],["notify","progress",p.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return p.Deferred(function(c){p.each(b,function(b,d){var f=d[0],g=a[b];e[d[1]](p.isFunction(g)?function(){var a=g.apply(this,arguments);a&&p.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f+"With"](this===e?c:this,[a])}:c[f])}),a=null}).promise()},promise:function(a){return a!=null?p.extend(a,d):d}},e={};return d.pipe=d.then,p.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[a^1][2].disable,b[2][2].lock),e[f[0]]=g.fire,e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=k.call(arguments),d=c.length,e=d!==1||a&&p.isFunction(a.promise)?d:0,f=e===1?a:p.Deferred(),g=function(a,b,c){return function(d){b[a]=this,c[a]=arguments.length>1?k.call(arguments):d,c===h?f.notifyWith(b,c):--e||f.resolveWith(b,c)}},h,i,j;if(d>1){h=new Array(d),i=new Array(d),j=new Array(d);for(;b<d;b++)c[b]&&p.isFunction(c[b].promise)?c[b].promise().done(g(b,j,c)).fail(f.reject).progress(g(b,i,h)):--e}return e||f.resolveWith(j,c),f.promise()}}),p.support=function(){var b,c,d,f,g,h,i,j,k,l,m,n=e.createElement("div");n.setAttribute("className","t"),n.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",c=n.getElementsByTagName("*"),d=n.getElementsByTagName("a")[0],d.style.cssText="top:1px;float:left;opacity:.5";if(!c||!c.length)return{};f=e.createElement("select"),g=f.appendChild(e.createElement("option")),h=n.getElementsByTagName("input")[0],b={leadingWhitespace:n.firstChild.nodeType===3,tbody:!n.getElementsByTagName("tbody").length,htmlSerialize:!!n.getElementsByTagName("link").length,style:/top/.test(d.getAttribute("style")),hrefNormalized:d.getAttribute("href")==="/a",opacity:/^0.5/.test(d.style.opacity),cssFloat:!!d.style.cssFloat,checkOn:h.value==="on",optSelected:g.selected,getSetAttribute:n.className!=="t",enctype:!!e.createElement("form").enctype,html5Clone:e.createElement("nav").cloneNode(!0).outerHTML!=="<:nav></:nav>",boxModel:e.compatMode==="CSS1Compat",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,boxSizingReliable:!0,pixelPosition:!1},h.checked=!0,b.noCloneChecked=h.cloneNode(!0).checked,f.disabled=!0,b.optDisabled=!g.disabled;try{delete n.test}catch(o){b.deleteExpando=!1}!n.addEventListener&&n.attachEvent&&n.fireEvent&&(n.attachEvent("onclick",m=function(){b.noCloneEvent=!1}),n.cloneNode(!0).fireEvent("onclick"),n.detachEvent("onclick",m)),h=e.createElement("input"),h.value="t",h.setAttribute("type","radio"),b.radioValue=h.value==="t",h.setAttribute("checked","checked"),h.setAttribute("name","t"),n.appendChild(h),i=e.createDocumentFragment(),i.appendChild(n.lastChild),b.checkClone=i.cloneNode(!0).cloneNode(!0).lastChild.checked,b.appendChecked=h.checked,i.removeChild(h),i.appendChild(n);if(n.attachEvent)for(k in{submit:!0,change:!0,focusin:!0})j="on"+k,l=j in n,l||(n.setAttribute(j,"return;"),l=typeof n[j]=="function"),b[k+"Bubbles"]=l;return p(function(){var c,d,f,g,h="padding:0;margin:0;border:0;display:block;overflow:hidden;",i=e.getElementsByTagName("body")[0];if(!i)return;c=e.createElement("div"),c.style.cssText="visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px",i.insertBefore(c,i.firstChild),d=e.createElement("div"),c.appendChild(d),d.innerHTML="<table><tr><td></td><td>t</td></tr></table>",f=d.getElementsByTagName("td"),f[0].style.cssText="padding:0;margin:0;border:0;display:none",l=f[0].offsetHeight===0,f[0].style.display="",f[1].style.display="none",b.reliableHiddenOffsets=l&&f[0].offsetHeight===0,d.innerHTML="",d.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",b.boxSizing=d.offsetWidth===4,b.doesNotIncludeMarginInBodyOffset=i.offsetTop!==1,a.getComputedStyle&&(b.pixelPosition=(a.getComputedStyle(d,null)||{}).top!=="1%",b.boxSizingReliable=(a.getComputedStyle(d,null)||{width:"4px"}).width==="4px",g=e.createElement("div"),g.style.cssText=d.style.cssText=h,g.style.marginRight=g.style.width="0",d.style.width="1px",d.appendChild(g),b.reliableMarginRight=!parseFloat((a.getComputedStyle(g,null)||{}).marginRight)),typeof d.style.zoom!="undefined"&&(d.innerHTML="",d.style.cssText=h+"width:1px;padding:1px;display:inline;zoom:1",b.inlineBlockNeedsLayout=d.offsetWidth===3,d.style.display="block",d.style.overflow="visible",d.innerHTML="<div></div>",d.firstChild.style.width="5px",b.shrinkWrapBlocks=d.offsetWidth!==3,c.style.zoom=1),i.removeChild(c),c=d=f=g=null}),i.removeChild(n),c=d=f=g=h=i=n=null,b}();var H=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,I=/([A-Z])/g;p.extend({cache:{},deletedIds:[],uuid:0,expando:"jQuery"+(p.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(a){return a=a.nodeType?p.cache[a[p.expando]]:a[p.expando],!!a&&!K(a)},data:function(a,c,d,e){if(!p.acceptData(a))return;var f,g,h=p.expando,i=typeof c=="string",j=a.nodeType,k=j?p.cache:a,l=j?a[h]:a[h]&&h;if((!l||!k[l]||!e&&!k[l].data)&&i&&d===b)return;l||(j?a[h]=l=p.deletedIds.pop()||p.guid++:l=h),k[l]||(k[l]={},j||(k[l].toJSON=p.noop));if(typeof c=="object"||typeof c=="function")e?k[l]=p.extend(k[l],c):k[l].data=p.extend(k[l].data,c);return f=k[l],e||(f.data||(f.data={}),f=f.data),d!==b&&(f[p.camelCase(c)]=d),i?(g=f[c],g==null&&(g=f[p.camelCase(c)])):g=f,g},removeData:function(a,b,c){if(!p.acceptData(a))return;var d,e,f,g=a.nodeType,h=g?p.cache:a,i=g?a[p.expando]:p.expando;if(!h[i])return;if(b){d=c?h[i]:h[i].data;if(d){p.isArray(b)||(b in d?b=[b]:(b=p.camelCase(b),b in d?b=[b]:b=b.split(" ")));for(e=0,f=b.length;e<f;e++)delete d[b[e]];if(!(c?K:p.isEmptyObject)(d))return}}if(!c){delete h[i].data;if(!K(h[i]))return}g?p.cleanData([a],!0):p.support.deleteExpando||h!=h.window?delete h[i]:h[i]=null},_data:function(a,b,c){return p.data(a,b,c,!0)},acceptData:function(a){var b=a.nodeName&&p.noData[a.nodeName.toLowerCase()];return!b||b!==!0&&a.getAttribute("classid")===b}}),p.fn.extend({data:function(a,c){var d,e,f,g,h,i=this[0],j=0,k=null;if(a===b){if(this.length){k=p.data(i);if(i.nodeType===1&&!p._data(i,"parsedAttrs")){f=i.attributes;for(h=f.length;j<h;j++)g=f[j].name,g.indexOf("data-")||(g=p.camelCase(g.substring(5)),J(i,g,k[g]));p._data(i,"parsedAttrs",!0)}}return k}return typeof a=="object"?this.each(function(){p.data(this,a)}):(d=a.split(".",2),d[1]=d[1]?"."+d[1]:"",e=d[1]+"!",p.access(this,function(c){if(c===b)return k=this.triggerHandler("getData"+e,[d[0]]),k===b&&i&&(k=p.data(i,a),k=J(i,a,k)),k===b&&d[1]?this.data(d[0]):k;d[1]=c,this.each(function(){var b=p(this);b.triggerHandler("setData"+e,d),p.data(this,a,c),b.triggerHandler("changeData"+e,d)})},null,c,arguments.length>1,null,!1))},removeData:function(a){return this.each(function(){p.removeData(this,a)})}}),p.extend({queue:function(a,b,c){var d;if(a)return b=(b||"fx")+"queue",d=p._data(a,b),c&&(!d||p.isArray(c)?d=p._data(a,b,p.makeArray(c)):d.push(c)),d||[]},dequeue:function(a,b){b=b||"fx";var c=p.queue(a,b),d=c.length,e=c.shift(),f=p._queueHooks(a,b),g=function(){p.dequeue(a,b)};e==="inprogress"&&(e=c.shift(),d--),e&&(b==="fx"&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return p._data(a,c)||p._data(a,c,{empty:p.Callbacks("once memory").add(function(){p.removeData(a,b+"queue",!0),p.removeData(a,c,!0)})})}}),p.fn.extend({queue:function(a,c){var d=2;return typeof a!="string"&&(c=a,a="fx",d--),arguments.length<d?p.queue(this[0],a):c===b?this:this.each(function(){var b=p.queue(this,a,c);p._queueHooks(this,a),a==="fx"&&b[0]!=="inprogress"&&p.dequeue(this,a)})},dequeue:function(a){return this.each(function(){p.dequeue(this,a)})},delay:function(a,b){return a=p.fx?p.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,c){var d,e=1,f=p.Deferred(),g=this,h=this.length,i=function(){--e||f.resolveWith(g,[g])};typeof a!="string"&&(c=a,a=b),a=a||"fx";while(h--)d=p._data(g[h],a+"queueHooks"),d&&d.empty&&(e++,d.empty.add(i));return i(),f.promise(c)}});var L,M,N,O=/[\t\r\n]/g,P=/\r/g,Q=/^(?:button|input)$/i,R=/^(?:button|input|object|select|textarea)$/i,S=/^a(?:rea|)$/i,T=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,U=p.support.getSetAttribute;p.fn.extend({attr:function(a,b){return p.access(this,p.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){p.removeAttr(this,a)})},prop:function(a,b){return p.access(this,p.prop,a,b,arguments.length>1)},removeProp:function(a){return a=p.propFix[a]||a,this.each(function(){try{this[a]=b,delete this[a]}catch(c){}})},addClass:function(a){var b,c,d,e,f,g,h;if(p.isFunction(a))return this.each(function(b){p(this).addClass(a.call(this,b,this.className))});if(a&&typeof a=="string"){b=a.split(s);for(c=0,d=this.length;c<d;c++){e=this[c];if(e.nodeType===1)if(!e.className&&b.length===1)e.className=a;else{f=" "+e.className+" ";for(g=0,h=b.length;g<h;g++)f.indexOf(" "+b[g]+" ")<0&&(f+=b[g]+" ");e.className=p.trim(f)}}}return this},removeClass:function(a){var c,d,e,f,g,h,i;if(p.isFunction(a))return this.each(function(b){p(this).removeClass(a.call(this,b,this.className))});if(a&&typeof a=="string"||a===b){c=(a||"").split(s);for(h=0,i=this.length;h<i;h++){e=this[h];if(e.nodeType===1&&e.className){d=(" "+e.className+" ").replace(O," ");for(f=0,g=c.length;f<g;f++)while(d.indexOf(" "+c[f]+" ")>=0)d=d.replace(" "+c[f]+" "," ");e.className=a?p.trim(d):""}}}return this},toggleClass:function(a,b){var c=typeof a,d=typeof b=="boolean";return p.isFunction(a)?this.each(function(c){p(this).toggleClass(a.call(this,c,this.className,b),b)}):this.each(function(){if(c==="string"){var e,f=0,g=p(this),h=b,i=a.split(s);while(e=i[f++])h=d?h:!g.hasClass(e),g[h?"addClass":"removeClass"](e)}else if(c==="undefined"||c==="boolean")this.className&&p._data(this,"__className__",this.className),this.className=this.className||a===!1?"":p._data(this,"__className__")||""})},hasClass:function(a){var b=" "+a+" ",c=0,d=this.length;for(;c<d;c++)if(this[c].nodeType===1&&(" "+this[c].className+" ").replace(O," ").indexOf(b)>=0)return!0;return!1},val:function(a){var c,d,e,f=this[0];if(!arguments.length){if(f)return c=p.valHooks[f.type]||p.valHooks[f.nodeName.toLowerCase()],c&&"get"in c&&(d=c.get(f,"value"))!==b?d:(d=f.value,typeof d=="string"?d.replace(P,""):d==null?"":d);return}return e=p.isFunction(a),this.each(function(d){var f,g=p(this);if(this.nodeType!==1)return;e?f=a.call(this,d,g.val()):f=a,f==null?f="":typeof f=="number"?f+="":p.isArray(f)&&(f=p.map(f,function(a){return a==null?"":a+""})),c=p.valHooks[this.type]||p.valHooks[this.nodeName.toLowerCase()];if(!c||!("set"in c)||c.set(this,f,"value")===b)this.value=f})}}),p.extend({valHooks:{option:{get:function(a){var b=a.attributes.value;return!b||b.specified?a.value:a.text}},select:{get:function(a){var b,c,d,e,f=a.selectedIndex,g=[],h=a.options,i=a.type==="select-one";if(f<0)return null;c=i?f:0,d=i?f+1:h.length;for(;c<d;c++){e=h[c];if(e.selected&&(p.support.optDisabled?!e.disabled:e.getAttribute("disabled")===null)&&(!e.parentNode.disabled||!p.nodeName(e.parentNode,"optgroup"))){b=p(e).val();if(i)return b;g.push(b)}}return i&&!g.length&&h.length?p(h[f]).val():g},set:function(a,b){var c=p.makeArray(b);return p(a).find("option").each(function(){this.selected=p.inArray(p(this).val(),c)>=0}),c.length||(a.selectedIndex=-1),c}}},attrFn:{},attr:function(a,c,d,e){var f,g,h,i=a.nodeType;if(!a||i===3||i===8||i===2)return;if(e&&p.isFunction(p.fn[c]))return p(a)[c](d);if(typeof a.getAttribute=="undefined")return p.prop(a,c,d);h=i!==1||!p.isXMLDoc(a),h&&(c=c.toLowerCase(),g=p.attrHooks[c]||(T.test(c)?M:L));if(d!==b){if(d===null){p.removeAttr(a,c);return}return g&&"set"in g&&h&&(f=g.set(a,d,c))!==b?f:(a.setAttribute(c,d+""),d)}return g&&"get"in g&&h&&(f=g.get(a,c))!==null?f:(f=a.getAttribute(c),f===null?b:f)},removeAttr:function(a,b){var c,d,e,f,g=0;if(b&&a.nodeType===1){d=b.split(s);for(;g<d.length;g++)e=d[g],e&&(c=p.propFix[e]||e,f=T.test(e),f||p.attr(a,e,""),a.removeAttribute(U?e:c),f&&c in a&&(a[c]=!1))}},attrHooks:{type:{set:function(a,b){if(Q.test(a.nodeName)&&a.parentNode)p.error("type property can't be changed");else if(!p.support.radioValue&&b==="radio"&&p.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}},value:{get:function(a,b){return L&&p.nodeName(a,"button")?L.get(a,b):b in a?a.value:null},set:function(a,b,c){if(L&&p.nodeName(a,"button"))return L.set(a,b,c);a.value=b}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(a,c,d){var e,f,g,h=a.nodeType;if(!a||h===3||h===8||h===2)return;return g=h!==1||!p.isXMLDoc(a),g&&(c=p.propFix[c]||c,f=p.propHooks[c]),d!==b?f&&"set"in f&&(e=f.set(a,d,c))!==b?e:a[c]=d:f&&"get"in f&&(e=f.get(a,c))!==null?e:a[c]},propHooks:{tabIndex:{get:function(a){var c=a.getAttributeNode("tabindex");return c&&c.specified?parseInt(c.value,10):R.test(a.nodeName)||S.test(a.nodeName)&&a.href?0:b}}}}),M={get:function(a,c){var d,e=p.prop(a,c);return e===!0||typeof e!="boolean"&&(d=a.getAttributeNode(c))&&d.nodeValue!==!1?c.toLowerCase():b},set:function(a,b,c){var d;return b===!1?p.removeAttr(a,c):(d=p.propFix[c]||c,d in a&&(a[d]=!0),a.setAttribute(c,c.toLowerCase())),c}},U||(N={name:!0,id:!0,coords:!0},L=p.valHooks.button={get:function(a,c){var d;return d=a.getAttributeNode(c),d&&(N[c]?d.value!=="":d.specified)?d.value:b},set:function(a,b,c){var d=a.getAttributeNode(c);return d||(d=e.createAttribute(c),a.setAttributeNode(d)),d.value=b+""}},p.each(["width","height"],function(a,b){p.attrHooks[b]=p.extend(p.attrHooks[b],{set:function(a,c){if(c==="")return a.setAttribute(b,"auto"),c}})}),p.attrHooks.contenteditable={get:L.get,set:function(a,b,c){b===""&&(b="false"),L.set(a,b,c)}}),p.support.hrefNormalized||p.each(["href","src","width","height"],function(a,c){p.attrHooks[c]=p.extend(p.attrHooks[c],{get:function(a){var d=a.getAttribute(c,2);return d===null?b:d}})}),p.support.style||(p.attrHooks.style={get:function(a){return a.style.cssText.toLowerCase()||b},set:function(a,b){return a.style.cssText=b+""}}),p.support.optSelected||(p.propHooks.selected=p.extend(p.propHooks.selected,{get:function(a){var b=a.parentNode;return b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex),null}})),p.support.enctype||(p.propFix.enctype="encoding"),p.support.checkOn||p.each(["radio","checkbox"],function(){p.valHooks[this]={get:function(a){return a.getAttribute("value")===null?"on":a.value}}}),p.each(["radio","checkbox"],function(){p.valHooks[this]=p.extend(p.valHooks[this],{set:function(a,b){if(p.isArray(b))return a.checked=p.inArray(p(a).val(),b)>=0}})});var V=/^(?:textarea|input|select)$/i,W=/^([^\.]*|)(?:\.(.+)|)$/,X=/(?:^|\s)hover(\.\S+|)\b/,Y=/^key/,Z=/^(?:mouse|contextmenu)|click/,$=/^(?:focusinfocus|focusoutblur)$/,_=function(a){return p.event.special.hover?a:a.replace(X,"mouseenter$1 mouseleave$1")};p.event={add:function(a,c,d,e,f){var g,h,i,j,k,l,m,n,o,q,r;if(a.nodeType===3||a.nodeType===8||!c||!d||!(g=p._data(a)))return;d.handler&&(o=d,d=o.handler,f=o.selector),d.guid||(d.guid=p.guid++),i=g.events,i||(g.events=i={}),h=g.handle,h||(g.handle=h=function(a){return typeof p!="undefined"&&(!a||p.event.triggered!==a.type)?p.event.dispatch.apply(h.elem,arguments):b},h.elem=a),c=p.trim(_(c)).split(" ");for(j=0;j<c.length;j++){k=W.exec(c[j])||[],l=k[1],m=(k[2]||"").split(".").sort(),r=p.event.special[l]||{},l=(f?r.delegateType:r.bindType)||l,r=p.event.special[l]||{},n=p.extend({type:l,origType:k[1],data:e,handler:d,guid:d.guid,selector:f,needsContext:f&&p.expr.match.needsContext.test(f),namespace:m.join(".")},o),q=i[l];if(!q){q=i[l]=[],q.delegateCount=0;if(!r.setup||r.setup.call(a,e,m,h)===!1)a.addEventListener?a.addEventListener(l,h,!1):a.attachEvent&&a.attachEvent("on"+l,h)}r.add&&(r.add.call(a,n),n.handler.guid||(n.handler.guid=d.guid)),f?q.splice(q.delegateCount++,0,n):q.push(n),p.event.global[l]=!0}a=null},global:{},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,o,q,r=p.hasData(a)&&p._data(a);if(!r||!(m=r.events))return;b=p.trim(_(b||"")).split(" ");for(f=0;f<b.length;f++){g=W.exec(b[f])||[],h=i=g[1],j=g[2];if(!h){for(h in m)p.event.remove(a,h+b[f],c,d,!0);continue}n=p.event.special[h]||{},h=(d?n.delegateType:n.bindType)||h,o=m[h]||[],k=o.length,j=j?new RegExp("(^|\\.)"+j.split(".").sort().join("\\.(?:.*\\.|)")+"(\\.|$)"):null;for(l=0;l<o.length;l++)q=o[l],(e||i===q.origType)&&(!c||c.guid===q.guid)&&(!j||j.test(q.namespace))&&(!d||d===q.selector||d==="**"&&q.selector)&&(o.splice(l--,1),q.selector&&o.delegateCount--,n.remove&&n.remove.call(a,q));o.length===0&&k!==o.length&&((!n.teardown||n.teardown.call(a,j,r.handle)===!1)&&p.removeEvent(a,h,r.handle),delete m[h])}p.isEmptyObject(m)&&(delete r.handle,p.removeData(a,"events",!0))},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(c,d,f,g){if(!f||f.nodeType!==3&&f.nodeType!==8){var h,i,j,k,l,m,n,o,q,r,s=c.type||c,t=[];if($.test(s+p.event.triggered))return;s.indexOf("!")>=0&&(s=s.slice(0,-1),i=!0),s.indexOf(".")>=0&&(t=s.split("."),s=t.shift(),t.sort());if((!f||p.event.customEvent[s])&&!p.event.global[s])return;c=typeof c=="object"?c[p.expando]?c:new p.Event(s,c):new p.Event(s),c.type=s,c.isTrigger=!0,c.exclusive=i,c.namespace=t.join("."),c.namespace_re=c.namespace?new RegExp("(^|\\.)"+t.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,m=s.indexOf(":")<0?"on"+s:"";if(!f){h=p.cache;for(j in h)h[j].events&&h[j].events[s]&&p.event.trigger(c,d,h[j].handle.elem,!0);return}c.result=b,c.target||(c.target=f),d=d!=null?p.makeArray(d):[],d.unshift(c),n=p.event.special[s]||{};if(n.trigger&&n.trigger.apply(f,d)===!1)return;q=[[f,n.bindType||s]];if(!g&&!n.noBubble&&!p.isWindow(f)){r=n.delegateType||s,k=$.test(r+s)?f:f.parentNode;for(l=f;k;k=k.parentNode)q.push([k,r]),l=k;l===(f.ownerDocument||e)&&q.push([l.defaultView||l.parentWindow||a,r])}for(j=0;j<q.length&&!c.isPropagationStopped();j++)k=q[j][0],c.type=q[j][1],o=(p._data(k,"events")||{})[c.type]&&p._data(k,"handle"),o&&o.apply(k,d),o=m&&k[m],o&&p.acceptData(k)&&o.apply&&o.apply(k,d)===!1&&c.preventDefault();return c.type=s,!g&&!c.isDefaultPrevented()&&(!n._default||n._default.apply(f.ownerDocument,d)===!1)&&(s!=="click"||!p.nodeName(f,"a"))&&p.acceptData(f)&&m&&f[s]&&(s!=="focus"&&s!=="blur"||c.target.offsetWidth!==0)&&!p.isWindow(f)&&(l=f[m],l&&(f[m]=null),p.event.triggered=s,f[s](),p.event.triggered=b,l&&(f[m]=l)),c.result}return},dispatch:function(c){c=p.event.fix(c||a.event);var d,e,f,g,h,i,j,l,m,n,o=(p._data(this,"events")||{})[c.type]||[],q=o.delegateCount,r=k.call(arguments),s=!c.exclusive&&!c.namespace,t=p.event.special[c.type]||{},u=[];r[0]=c,c.delegateTarget=this;if(t.preDispatch&&t.preDispatch.call(this,c)===!1)return;if(q&&(!c.button||c.type!=="click"))for(f=c.target;f!=this;f=f.parentNode||this)if(f.disabled!==!0||c.type!=="click"){h={},j=[];for(d=0;d<q;d++)l=o[d],m=l.selector,h[m]===b&&(h[m]=l.needsContext?p(m,this).index(f)>=0:p.find(m,this,null,[f]).length),h[m]&&j.push(l);j.length&&u.push({elem:f,matches:j})}o.length>q&&u.push({elem:this,matches:o.slice(q)});for(d=0;d<u.length&&!c.isPropagationStopped();d++){i=u[d],c.currentTarget=i.elem;for(e=0;e<i.matches.length&&!c.isImmediatePropagationStopped();e++){l=i.matches[e];if(s||!c.namespace&&!l.namespace||c.namespace_re&&c.namespace_re.test(l.namespace))c.data=l.data,c.handleObj=l,g=((p.event.special[l.origType]||{}).handle||l.handler).apply(i.elem,r),g!==b&&(c.result=g,g===!1&&(c.preventDefault(),c.stopPropagation()))}}return t.postDispatch&&t.postDispatch.call(this,c),c.result},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return a.which==null&&(a.which=b.charCode!=null?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,c){var d,f,g,h=c.button,i=c.fromElement;return a.pageX==null&&c.clientX!=null&&(d=a.target.ownerDocument||e,f=d.documentElement,g=d.body,a.pageX=c.clientX+(f&&f.scrollLeft||g&&g.scrollLeft||0)-(f&&f.clientLeft||g&&g.clientLeft||0),a.pageY=c.clientY+(f&&f.scrollTop||g&&g.scrollTop||0)-(f&&f.clientTop||g&&g.clientTop||0)),!a.relatedTarget&&i&&(a.relatedTarget=i===a.target?c.toElement:i),!a.which&&h!==b&&(a.which=h&1?1:h&2?3:h&4?2:0),a}},fix:function(a){if(a[p.expando])return a;var b,c,d=a,f=p.event.fixHooks[a.type]||{},g=f.props?this.props.concat(f.props):this.props;a=p.Event(d);for(b=g.length;b;)c=g[--b],a[c]=d[c];return a.target||(a.target=d.srcElement||e),a.target.nodeType===3&&(a.target=a.target.parentNode),a.metaKey=!!a.metaKey,f.filter?f.filter(a,d):a},special:{load:{noBubble:!0},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(a,b,c){p.isWindow(this)&&(this.onbeforeunload=c)},teardown:function(a,b){this.onbeforeunload===b&&(this.onbeforeunload=null)}}},simulate:function(a,b,c,d){var e=p.extend(new p.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?p.event.trigger(e,null,b):p.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},p.event.handle=p.event.dispatch,p.removeEvent=e.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){var d="on"+b;a.detachEvent&&(typeof a[d]=="undefined"&&(a[d]=null),a.detachEvent(d,c))},p.Event=function(a,b){if(this instanceof p.Event)a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault()?bb:ba):this.type=a,b&&p.extend(this,b),this.timeStamp=a&&a.timeStamp||p.now(),this[p.expando]=!0;else return new p.Event(a,b)},p.Event.prototype={preventDefault:function(){this.isDefaultPrevented=bb;var a=this.originalEvent;if(!a)return;a.preventDefault?a.preventDefault():a.returnValue=!1},stopPropagation:function(){this.isPropagationStopped=bb;var a=this.originalEvent;if(!a)return;a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=bb,this.stopPropagation()},isDefaultPrevented:ba,isPropagationStopped:ba,isImmediatePropagationStopped:ba},p.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){p.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj,g=f.selector;if(!e||e!==d&&!p.contains(d,e))a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b;return c}}}),p.support.submitBubbles||(p.event.special.submit={setup:function(){if(p.nodeName(this,"form"))return!1;p.event.add(this,"click._submit keypress._submit",function(a){var c=a.target,d=p.nodeName(c,"input")||p.nodeName(c,"button")?c.form:b;d&&!p._data(d,"_submit_attached")&&(p.event.add(d,"submit._submit",function(a){a._submit_bubble=!0}),p._data(d,"_submit_attached",!0))})},postDispatch:function(a){a._submit_bubble&&(delete a._submit_bubble,this.parentNode&&!a.isTrigger&&p.event.simulate("submit",this.parentNode,a,!0))},teardown:function(){if(p.nodeName(this,"form"))return!1;p.event.remove(this,"._submit")}}),p.support.changeBubbles||(p.event.special.change={setup:function(){if(V.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio")p.event.add(this,"propertychange._change",function(a){a.originalEvent.propertyName==="checked"&&(this._just_changed=!0)}),p.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1),p.event.simulate("change",this,a,!0)});return!1}p.event.add(this,"beforeactivate._change",function(a){var b=a.target;V.test(b.nodeName)&&!p._data(b,"_change_attached")&&(p.event.add(b,"change._change",function(a){this.parentNode&&!a.isSimulated&&!a.isTrigger&&p.event.simulate("change",this.parentNode,a,!0)}),p._data(b,"_change_attached",!0))})},handle:function(a){var b=a.target;if(this!==b||a.isSimulated||a.isTrigger||b.type!=="radio"&&b.type!=="checkbox")return a.handleObj.handler.apply(this,arguments)},teardown:function(){return p.event.remove(this,"._change"),!V.test(this.nodeName)}}),p.support.focusinBubbles||p.each({focus:"focusin",blur:"focusout"},function(a,b){var c=0,d=function(a){p.event.simulate(b,a.target,p.event.fix(a),!0)};p.event.special[b]={setup:function(){c++===0&&e.addEventListener(a,d,!0)},teardown:function(){--c===0&&e.removeEventListener(a,d,!0)}}}),p.fn.extend({on:function(a,c,d,e,f){var g,h;if(typeof a=="object"){typeof c!="string"&&(d=d||c,c=b);for(h in a)this.on(h,c,d,a[h],f);return this}d==null&&e==null?(e=c,d=c=b):e==null&&(typeof c=="string"?(e=d,d=b):(e=d,d=c,c=b));if(e===!1)e=ba;else if(!e)return this;return f===1&&(g=e,e=function(a){return p().off(a),g.apply(this,arguments)},e.guid=g.guid||(g.guid=p.guid++)),this.each(function(){p.event.add(this,a,e,d,c)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,c,d){var e,f;if(a&&a.preventDefault&&a.handleObj)return e=a.handleObj,p(a.delegateTarget).off(e.namespace?e.origType+"."+e.namespace:e.origType,e.selector,e.handler),this;if(typeof a=="object"){for(f in a)this.off(f,c,a[f]);return this}if(c===!1||typeof c=="function")d=c,c=b;return d===!1&&(d=ba),this.each(function(){p.event.remove(this,a,d,c)})},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},live:function(a,b,c){return p(this.context).on(a,this.selector,b,c),this},die:function(a,b){return p(this.context).off(a,this.selector||"**",b),this},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return arguments.length===1?this.off(a,"**"):this.off(b,a||"**",c)},trigger:function(a,b){return this.each(function(){p.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0])return p.event.trigger(a,b,this[0],!0)},toggle:function(a){var b=arguments,c=a.guid||p.guid++,d=0,e=function(c){var e=(p._data(this,"lastToggle"+a.guid)||0)%d;return p._data(this,"lastToggle"+a.guid,e+1),c.preventDefault(),b[e].apply(this,arguments)||!1};e.guid=c;while(d<b.length)b[d++].guid=c;return this.click(e)},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),p.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){p.fn[b]=function(a,c){return c==null&&(c=a,a=null),arguments.length>0?this.on(b,null,a,c):this.trigger(b)},Y.test(b)&&(p.event.fixHooks[b]=p.event.keyHooks),Z.test(b)&&(p.event.fixHooks[b]=p.event.mouseHooks)}),function(a,b){function bc(a,b,c,d){c=c||[],b=b||r;var e,f,i,j,k=b.nodeType;if(!a||typeof a!="string")return c;if(k!==1&&k!==9)return[];i=g(b);if(!i&&!d)if(e=P.exec(a))if(j=e[1]){if(k===9){f=b.getElementById(j);if(!f||!f.parentNode)return c;if(f.id===j)return c.push(f),c}else if(b.ownerDocument&&(f=b.ownerDocument.getElementById(j))&&h(b,f)&&f.id===j)return c.push(f),c}else{if(e[2])return w.apply(c,x.call(b.getElementsByTagName(a),0)),c;if((j=e[3])&&_&&b.getElementsByClassName)return w.apply(c,x.call(b.getElementsByClassName(j),0)),c}return bp(a.replace(L,"$1"),b,c,d,i)}function bd(a){return function(b){var c=b.nodeName.toLowerCase();return c==="input"&&b.type===a}}function be(a){return function(b){var c=b.nodeName.toLowerCase();return(c==="input"||c==="button")&&b.type===a}}function bf(a){return z(function(b){return b=+b,z(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function bg(a,b,c){if(a===b)return c;var d=a.nextSibling;while(d){if(d===b)return-1;d=d.nextSibling}return 1}function bh(a,b){var c,d,f,g,h,i,j,k=C[o][a];if(k)return b?0:k.slice(0);h=a,i=[],j=e.preFilter;while(h){if(!c||(d=M.exec(h)))d&&(h=h.slice(d[0].length)),i.push(f=[]);c=!1;if(d=N.exec(h))f.push(c=new q(d.shift())),h=h.slice(c.length),c.type=d[0].replace(L," ");for(g in e.filter)(d=W[g].exec(h))&&(!j[g]||(d=j[g](d,r,!0)))&&(f.push(c=new q(d.shift())),h=h.slice(c.length),c.type=g,c.matches=d);if(!c)break}return b?h.length:h?bc.error(a):C(a,i).slice(0)}function bi(a,b,d){var e=b.dir,f=d&&b.dir==="parentNode",g=u++;return b.first?function(b,c,d){while(b=b[e])if(f||b.nodeType===1)return a(b,c,d)}:function(b,d,h){if(!h){var i,j=t+" "+g+" ",k=j+c;while(b=b[e])if(f||b.nodeType===1){if((i=b[o])===k)return b.sizset;if(typeof i=="string"&&i.indexOf(j)===0){if(b.sizset)return b}else{b[o]=k;if(a(b,d,h))return b.sizset=!0,b;b.sizset=!1}}}else while(b=b[e])if(f||b.nodeType===1)if(a(b,d,h))return b}}function bj(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function bk(a,b,c,d,e){var f,g=[],h=0,i=a.length,j=b!=null;for(;h<i;h++)if(f=a[h])if(!c||c(f,d,e))g.push(f),j&&b.push(h);return g}function bl(a,b,c,d,e,f){return d&&!d[o]&&(d=bl(d)),e&&!e[o]&&(e=bl(e,f)),z(function(f,g,h,i){if(f&&e)return;var j,k,l,m=[],n=[],o=g.length,p=f||bo(b||"*",h.nodeType?[h]:h,[],f),q=a&&(f||!b)?bk(p,m,a,h,i):p,r=c?e||(f?a:o||d)?[]:g:q;c&&c(q,r,h,i);if(d){l=bk(r,n),d(l,[],h,i),j=l.length;while(j--)if(k=l[j])r[n[j]]=!(q[n[j]]=k)}if(f){j=a&&r.length;while(j--)if(k=r[j])f[m[j]]=!(g[m[j]]=k)}else r=bk(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):w.apply(g,r)})}function bm(a){var b,c,d,f=a.length,g=e.relative[a[0].type],h=g||e.relative[" "],i=g?1:0,j=bi(function(a){return a===b},h,!0),k=bi(function(a){return y.call(b,a)>-1},h,!0),m=[function(a,c,d){return!g&&(d||c!==l)||((b=c).nodeType?j(a,c,d):k(a,c,d))}];for(;i<f;i++)if(c=e.relative[a[i].type])m=[bi(bj(m),c)];else{c=e.filter[a[i].type].apply(null,a[i].matches);if(c[o]){d=++i;for(;d<f;d++)if(e.relative[a[d].type])break;return bl(i>1&&bj(m),i>1&&a.slice(0,i-1).join("").replace(L,"$1"),c,i<d&&bm(a.slice(i,d)),d<f&&bm(a=a.slice(d)),d<f&&a.join(""))}m.push(c)}return bj(m)}function bn(a,b){var d=b.length>0,f=a.length>0,g=function(h,i,j,k,m){var n,o,p,q=[],s=0,u="0",x=h&&[],y=m!=null,z=l,A=h||f&&e.find.TAG("*",m&&i.parentNode||i),B=t+=z==null?1:Math.E;y&&(l=i!==r&&i,c=g.el);for(;(n=A[u])!=null;u++){if(f&&n){for(o=0;p=a[o];o++)if(p(n,i,j)){k.push(n);break}y&&(t=B,c=++g.el)}d&&((n=!p&&n)&&s--,h&&x.push(n))}s+=u;if(d&&u!==s){for(o=0;p=b[o];o++)p(x,q,i,j);if(h){if(s>0)while(u--)!x[u]&&!q[u]&&(q[u]=v.call(k));q=bk(q)}w.apply(k,q),y&&!h&&q.length>0&&s+b.length>1&&bc.uniqueSort(k)}return y&&(t=B,l=z),x};return g.el=0,d?z(g):g}function bo(a,b,c,d){var e=0,f=b.length;for(;e<f;e++)bc(a,b[e],c,d);return c}function bp(a,b,c,d,f){var g,h,j,k,l,m=bh(a),n=m.length;if(!d&&m.length===1){h=m[0]=m[0].slice(0);if(h.length>2&&(j=h[0]).type==="ID"&&b.nodeType===9&&!f&&e.relative[h[1].type]){b=e.find.ID(j.matches[0].replace(V,""),b,f)[0];if(!b)return c;a=a.slice(h.shift().length)}for(g=W.POS.test(a)?-1:h.length-1;g>=0;g--){j=h[g];if(e.relative[k=j.type])break;if(l=e.find[k])if(d=l(j.matches[0].replace(V,""),R.test(h[0].type)&&b.parentNode||b,f)){h.splice(g,1),a=d.length&&h.join("");if(!a)return w.apply(c,x.call(d,0)),c;break}}}return i(a,m)(d,b,f,c,R.test(a)),c}function bq(){}var c,d,e,f,g,h,i,j,k,l,m=!0,n="undefined",o=("sizcache"+Math.random()).replace(".",""),q=String,r=a.document,s=r.documentElement,t=0,u=0,v=[].pop,w=[].push,x=[].slice,y=[].indexOf||function(a){var b=0,c=this.length;for(;b<c;b++)if(this[b]===a)return b;return-1},z=function(a,b){return a[o]=b==null||b,a},A=function(){var a={},b=[];return z(function(c,d){return b.push(c)>e.cacheLength&&delete a[b.shift()],a[c]=d},a)},B=A(),C=A(),D=A(),E="[\\x20\\t\\r\\n\\f]",F="(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",G=F.replace("w","w#"),H="([*^$|!~]?=)",I="\\["+E+"*("+F+")"+E+"*(?:"+H+E+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+G+")|)|)"+E+"*\\]",J=":("+F+")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:"+I+")|[^:]|\\\\.)*|.*))\\)|)",K=":(even|odd|eq|gt|lt|nth|first|last)(?:\\("+E+"*((?:-\\d)?\\d*)"+E+"*\\)|)(?=[^-]|$)",L=new RegExp("^"+E+"+|((?:^|[^\\\\])(?:\\\\.)*)"+E+"+$","g"),M=new RegExp("^"+E+"*,"+E+"*"),N=new RegExp("^"+E+"*([\\x20\\t\\r\\n\\f>+~])"+E+"*"),O=new RegExp(J),P=/^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,Q=/^:not/,R=/[\x20\t\r\n\f]*[+~]/,S=/:not\($/,T=/h\d/i,U=/input|select|textarea|button/i,V=/\\(?!\\)/g,W={ID:new RegExp("^#("+F+")"),CLASS:new RegExp("^\\.("+F+")"),NAME:new RegExp("^\\[name=['\"]?("+F+")['\"]?\\]"),TAG:new RegExp("^("+F.replace("w","w*")+")"),ATTR:new RegExp("^"+I),PSEUDO:new RegExp("^"+J),POS:new RegExp(K,"i"),CHILD:new RegExp("^:(only|nth|first|last)-child(?:\\("+E+"*(even|odd|(([+-]|)(\\d*)n|)"+E+"*(?:([+-]|)"+E+"*(\\d+)|))"+E+"*\\)|)","i"),needsContext:new RegExp("^"+E+"*[>+~]|"+K,"i")},X=function(a){var b=r.createElement("div");try{return a(b)}catch(c){return!1}finally{b=null}},Y=X(function(a){return a.appendChild(r.createComment("")),!a.getElementsByTagName("*").length}),Z=X(function(a){return a.innerHTML="<a href='#'></a>",a.firstChild&&typeof a.firstChild.getAttribute!==n&&a.firstChild.getAttribute("href")==="#"}),$=X(function(a){a.innerHTML="<select></select>";var b=typeof a.lastChild.getAttribute("multiple");return b!=="boolean"&&b!=="string"}),_=X(function(a){return a.innerHTML="<div class='hidden e'></div><div class='hidden'></div>",!a.getElementsByClassName||!a.getElementsByClassName("e").length?!1:(a.lastChild.className="e",a.getElementsByClassName("e").length===2)}),ba=X(function(a){a.id=o+0,a.innerHTML="<a name='"+o+"'></a><div name='"+o+"'></div>",s.insertBefore(a,s.firstChild);var b=r.getElementsByName&&r.getElementsByName(o).length===2+r.getElementsByName(o+0).length;return d=!r.getElementById(o),s.removeChild(a),b});try{x.call(s.childNodes,0)[0].nodeType}catch(bb){x=function(a){var b,c=[];for(;b=this[a];a++)c.push(b);return c}}bc.matches=function(a,b){return bc(a,null,null,b)},bc.matchesSelector=function(a,b){return bc(b,null,null,[a]).length>0},f=bc.getText=function(a){var b,c="",d=0,e=a.nodeType;if(e){if(e===1||e===9||e===11){if(typeof a.textContent=="string")return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=f(a)}else if(e===3||e===4)return a.nodeValue}else for(;b=a[d];d++)c+=f(b);return c},g=bc.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?b.nodeName!=="HTML":!1},h=bc.contains=s.contains?function(a,b){var c=a.nodeType===9?a.documentElement:a,d=b&&b.parentNode;return a===d||!!(d&&d.nodeType===1&&c.contains&&c.contains(d))}:s.compareDocumentPosition?function(a,b){return b&&!!(a.compareDocumentPosition(b)&16)}:function(a,b){while(b=b.parentNode)if(b===a)return!0;return!1},bc.attr=function(a,b){var c,d=g(a);return d||(b=b.toLowerCase()),(c=e.attrHandle[b])?c(a):d||$?a.getAttribute(b):(c=a.getAttributeNode(b),c?typeof a[b]=="boolean"?a[b]?b:null:c.specified?c.value:null:null)},e=bc.selectors={cacheLength:50,createPseudo:z,match:W,attrHandle:Z?{}:{href:function(a){return a.getAttribute("href",2)},type:function(a){return a.getAttribute("type")}},find:{ID:d?function(a,b,c){if(typeof b.getElementById!==n&&!c){var d=b.getElementById(a);return d&&d.parentNode?[d]:[]}}:function(a,c,d){if(typeof c.getElementById!==n&&!d){var e=c.getElementById(a);return e?e.id===a||typeof e.getAttributeNode!==n&&e.getAttributeNode("id").value===a?[e]:b:[]}},TAG:Y?function(a,b){if(typeof b.getElementsByTagName!==n)return b.getElementsByTagName(a)}:function(a,b){var c=b.getElementsByTagName(a);if(a==="*"){var d,e=[],f=0;for(;d=c[f];f++)d.nodeType===1&&e.push(d);return e}return c},NAME:ba&&function(a,b){if(typeof b.getElementsByName!==n)return b.getElementsByName(name)},CLASS:_&&function(a,b,c){if(typeof b.getElementsByClassName!==n&&!c)return b.getElementsByClassName(a)}},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(V,""),a[3]=(a[4]||a[5]||"").replace(V,""),a[2]==="~="&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),a[1]==="nth"?(a[2]||bc.error(a[0]),a[3]=+(a[3]?a[4]+(a[5]||1):2*(a[2]==="even"||a[2]==="odd")),a[4]=+(a[6]+a[7]||a[2]==="odd")):a[2]&&bc.error(a[0]),a},PSEUDO:function(a){var b,c;if(W.CHILD.test(a[0]))return null;if(a[3])a[2]=a[3];else if(b=a[4])O.test(b)&&(c=bh(b,!0))&&(c=b.indexOf(")",b.length-c)-b.length)&&(b=b.slice(0,c),a[0]=a[0].slice(0,c)),a[2]=b;return a.slice(0,3)}},filter:{ID:d?function(a){return a=a.replace(V,""),function(b){return b.getAttribute("id")===a}}:function(a){return a=a.replace(V,""),function(b){var c=typeof b.getAttributeNode!==n&&b.getAttributeNode("id");return c&&c.value===a}},TAG:function(a){return a==="*"?function(){return!0}:(a=a.replace(V,"").toLowerCase(),function(b){return b.nodeName&&b.nodeName.toLowerCase()===a})},CLASS:function(a){var b=B[o][a];return b||(b=B(a,new RegExp("(^|"+E+")"+a+"("+E+"|$)"))),function(a){return b.test(a.className||typeof a.getAttribute!==n&&a.getAttribute("class")||"")}},ATTR:function(a,b,c){return function(d,e){var f=bc.attr(d,a);return f==null?b==="!=":b?(f+="",b==="="?f===c:b==="!="?f!==c:b==="^="?c&&f.indexOf(c)===0:b==="*="?c&&f.indexOf(c)>-1:b==="$="?c&&f.substr(f.length-c.length)===c:b==="~="?(" "+f+" ").indexOf(c)>-1:b==="|="?f===c||f.substr(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d){return a==="nth"?function(a){var b,e,f=a.parentNode;if(c===1&&d===0)return!0;if(f){e=0;for(b=f.firstChild;b;b=b.nextSibling)if(b.nodeType===1){e++;if(a===b)break}}return e-=d,e===c||e%c===0&&e/c>=0}:function(b){var c=b;switch(a){case"only":case"first":while(c=c.previousSibling)if(c.nodeType===1)return!1;if(a==="first")return!0;c=b;case"last":while(c=c.nextSibling)if(c.nodeType===1)return!1;return!0}}},PSEUDO:function(a,b){var c,d=e.pseudos[a]||e.setFilters[a.toLowerCase()]||bc.error("unsupported pseudo: "+a);return d[o]?d(b):d.length>1?(c=[a,a,"",b],e.setFilters.hasOwnProperty(a.toLowerCase())?z(function(a,c){var e,f=d(a,b),g=f.length;while(g--)e=y.call(a,f[g]),a[e]=!(c[e]=f[g])}):function(a){return d(a,0,c)}):d}},pseudos:{not:z(function(a){var b=[],c=[],d=i(a.replace(L,"$1"));return d[o]?z(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)if(f=g[h])a[h]=!(b[h]=f)}):function(a,e,f){return b[0]=a,d(b,null,f,c),!c.pop()}}),has:z(function(a){return function(b){return bc(a,b).length>0}}),contains:z(function(a){return function(b){return(b.textContent||b.innerText||f(b)).indexOf(a)>-1}}),enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&!!a.checked||b==="option"&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},parent:function(a){return!e.pseudos.empty(a)},empty:function(a){var b;a=a.firstChild;while(a){if(a.nodeName>"@"||(b=a.nodeType)===3||b===4)return!1;a=a.nextSibling}return!0},header:function(a){return T.test(a.nodeName)},text:function(a){var b,c;return a.nodeName.toLowerCase()==="input"&&(b=a.type)==="text"&&((c=a.getAttribute("type"))==null||c.toLowerCase()===b)},radio:bd("radio"),checkbox:bd("checkbox"),file:bd("file"),password:bd("password"),image:bd("image"),submit:be("submit"),reset:be("reset"),button:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&a.type==="button"||b==="button"},input:function(a){return U.test(a.nodeName)},focus:function(a){var b=a.ownerDocument;return a===b.activeElement&&(!b.hasFocus||b.hasFocus())&&(!!a.type||!!a.href)},active:function(a){return a===a.ownerDocument.activeElement},first:bf(function(a,b,c){return[0]}),last:bf(function(a,b,c){return[b-1]}),eq:bf(function(a,b,c){return[c<0?c+b:c]}),even:bf(function(a,b,c){for(var d=0;d<b;d+=2)a.push(d);return a}),odd:bf(function(a,b,c){for(var d=1;d<b;d+=2)a.push(d);return a}),lt:bf(function(a,b,c){for(var d=c<0?c+b:c;--d>=0;)a.push(d);return a}),gt:bf(function(a,b,c){for(var d=c<0?c+b:c;++d<b;)a.push(d);return a})}},j=s.compareDocumentPosition?function(a,b){return a===b?(k=!0,0):(!a.compareDocumentPosition||!b.compareDocumentPosition?a.compareDocumentPosition:a.compareDocumentPosition(b)&4)?-1:1}:function(a,b){if(a===b)return k=!0,0;if(a.sourceIndex&&b.sourceIndex)return a.sourceIndex-b.sourceIndex;var c,d,e=[],f=[],g=a.parentNode,h=b.parentNode,i=g;if(g===h)return bg(a,b);if(!g)return-1;if(!h)return 1;while(i)e.unshift(i),i=i.parentNode;i=h;while(i)f.unshift(i),i=i.parentNode;c=e.length,d=f.length;for(var j=0;j<c&&j<d;j++)if(e[j]!==f[j])return bg(e[j],f[j]);return j===c?bg(a,f[j],-1):bg(e[j],b,1)},[0,0].sort(j),m=!k,bc.uniqueSort=function(a){var b,c=1;k=m,a.sort(j);if(k)for(;b=a[c];c++)b===a[c-1]&&a.splice(c--,1);return a},bc.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},i=bc.compile=function(a,b){var c,d=[],e=[],f=D[o][a];if(!f){b||(b=bh(a)),c=b.length;while(c--)f=bm(b[c]),f[o]?d.push(f):e.push(f);f=D(a,bn(e,d))}return f},r.querySelectorAll&&function(){var a,b=bp,c=/'|\\/g,d=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,e=[":focus"],f=[":active",":focus"],h=s.matchesSelector||s.mozMatchesSelector||s.webkitMatchesSelector||s.oMatchesSelector||s.msMatchesSelector;X(function(a){a.innerHTML="<select><option selected=''></option></select>",a.querySelectorAll("[selected]").length||e.push("\\["+E+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)"),a.querySelectorAll(":checked").length||e.push(":checked")}),X(function(a){a.innerHTML="<p test=''></p>",a.querySelectorAll("[test^='']").length&&e.push("[*^$]="+E+"*(?:\"\"|'')"),a.innerHTML="<input type='hidden'/>",a.querySelectorAll(":enabled").length||e.push(":enabled",":disabled")}),e=new RegExp(e.join("|")),bp=function(a,d,f,g,h){if(!g&&!h&&(!e||!e.test(a))){var i,j,k=!0,l=o,m=d,n=d.nodeType===9&&a;if(d.nodeType===1&&d.nodeName.toLowerCase()!=="object"){i=bh(a),(k=d.getAttribute("id"))?l=k.replace(c,"\\$&"):d.setAttribute("id",l),l="[id='"+l+"'] ",j=i.length;while(j--)i[j]=l+i[j].join("");m=R.test(a)&&d.parentNode||d,n=i.join(",")}if(n)try{return w.apply(f,x.call(m.querySelectorAll(n),0)),f}catch(p){}finally{k||d.removeAttribute("id")}}return b(a,d,f,g,h)},h&&(X(function(b){a=h.call(b,"div");try{h.call(b,"[test!='']:sizzle"),f.push("!=",J)}catch(c){}}),f=new RegExp(f.join("|")),bc.matchesSelector=function(b,c){c=c.replace(d,"='$1']");if(!g(b)&&!f.test(c)&&(!e||!e.test(c)))try{var i=h.call(b,c);if(i||a||b.document&&b.document.nodeType!==11)return i}catch(j){}return bc(c,null,null,[b]).length>0})}(),e.pseudos.nth=e.pseudos.eq,e.filters=bq.prototype=e.pseudos,e.setFilters=new bq,bc.attr=p.attr,p.find=bc,p.expr=bc.selectors,p.expr[":"]=p.expr.pseudos,p.unique=bc.uniqueSort,p.text=bc.getText,p.isXMLDoc=bc.isXML,p.contains=bc.contains}(a);var bc=/Until$/,bd=/^(?:parents|prev(?:Until|All))/,be=/^.[^:#\[\.,]*$/,bf=p.expr.match.needsContext,bg={children:!0,contents:!0,next:!0,prev:!0};p.fn.extend({find:function(a){var b,c,d,e,f,g,h=this;if(typeof a!="string")return p(a).filter(function(){for(b=0,c=h.length;b<c;b++)if(p.contains(h[b],this))return!0});g=this.pushStack("","find",a);for(b=0,c=this.length;b<c;b++){d=g.length,p.find(a,this[b],g);if(b>0)for(e=d;e<g.length;e++)for(f=0;f<d;f++)if(g[f]===g[e]){g.splice(e--,1);break}}return g},has:function(a){var b,c=p(a,this),d=c.length;return this.filter(function(){for(b=0;b<d;b++)if(p.contains(this,c[b]))return!0})},not:function(a){return this.pushStack(bj(this,a,!1),"not",a)},filter:function(a){return this.pushStack(bj(this,a,!0),"filter",a)},is:function(a){return!!a&&(typeof a=="string"?bf.test(a)?p(a,this.context).index(this[0])>=0:p.filter(a,this).length>0:this.filter(a).length>0)},closest:function(a,b){var c,d=0,e=this.length,f=[],g=bf.test(a)||typeof a!="string"?p(a,b||this.context):0;for(;d<e;d++){c=this[d];while(c&&c.ownerDocument&&c!==b&&c.nodeType!==11){if(g?g.index(c)>-1:p.find.matchesSelector(c,a)){f.push(c);break}c=c.parentNode}}return f=f.length>1?p.unique(f):f,this.pushStack(f,"closest",a)},index:function(a){return a?typeof a=="string"?p.inArray(this[0],p(a)):p.inArray(a.jquery?a[0]:a,this):this[0]&&this[0].parentNode?this.prevAll().length:-1},add:function(a,b){var c=typeof a=="string"?p(a,b):p.makeArray(a&&a.nodeType?[a]:a),d=p.merge(this.get(),c);return this.pushStack(bh(c[0])||bh(d[0])?d:p.unique(d))},addBack:function(a){return this.add(a==null?this.prevObject:this.prevObject.filter(a))}}),p.fn.andSelf=p.fn.addBack,p.each({parent:function(a){var b=a.parentNode;return b&&b.nodeType!==11?b:null},parents:function(a){return p.dir(a,"parentNode")},parentsUntil:function(a,b,c){return p.dir(a,"parentNode",c)},next:function(a){return bi(a,"nextSibling")},prev:function(a){return bi(a,"previousSibling")},nextAll:function(a){return p.dir(a,"nextSibling")},prevAll:function(a){return p.dir(a,"previousSibling")},nextUntil:function(a,b,c){return p.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return p.dir(a,"previousSibling",c)},siblings:function(a){return p.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return p.sibling(a.firstChild)},contents:function(a){return p.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:p.merge([],a.childNodes)}},function(a,b){p.fn[a]=function(c,d){var e=p.map(this,b,c);return bc.test(a)||(d=c),d&&typeof d=="string"&&(e=p.filter(d,e)),e=this.length>1&&!bg[a]?p.unique(e):e,this.length>1&&bd.test(a)&&(e=e.reverse()),this.pushStack(e,a,k.call(arguments).join(","))}}),p.extend({filter:function(a,b,c){return c&&(a=":not("+a+")"),b.length===1?p.find.matchesSelector(b[0],a)?[b[0]]:[]:p.find.matches(a,b)},dir:function(a,c,d){var e=[],f=a[c];while(f&&f.nodeType!==9&&(d===b||f.nodeType!==1||!p(f).is(d)))f.nodeType===1&&e.push(f),f=f[c];return e},sibling:function(a,b){var c=[];for(;a;a=a.nextSibling)a.nodeType===1&&a!==b&&c.push(a);return c}});var bl="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",bm=/ jQuery\d+="(?:null|\d+)"/g,bn=/^\s+/,bo=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,bp=/<([\w:]+)/,bq=/<tbody/i,br=/<|&#?\w+;/,bs=/<(?:script|style|link)/i,bt=/<(?:script|object|embed|option|style)/i,bu=new RegExp("<(?:"+bl+")[\\s/>]","i"),bv=/^(?:checkbox|radio)$/,bw=/checked\s*(?:[^=]|=\s*.checked.)/i,bx=/\/(java|ecma)script/i,by=/^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,bz={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},bA=bk(e),bB=bA.appendChild(e.createElement("div"));bz.optgroup=bz.option,bz.tbody=bz.tfoot=bz.colgroup=bz.caption=bz.thead,bz.th=bz.td,p.support.htmlSerialize||(bz._default=[1,"X<div>","</div>"]),p.fn.extend({text:function(a){return p.access(this,function(a){return a===b?p.text(this):this.empty().append((this[0]&&this[0].ownerDocument||e).createTextNode(a))},null,a,arguments.length)},wrapAll:function(a){if(p.isFunction(a))return this.each(function(b){p(this).wrapAll(a.call(this,b))});if(this[0]){var b=p(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&a.firstChild.nodeType===1)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){return p.isFunction(a)?this.each(function(b){p(this).wrapInner(a.call(this,b))}):this.each(function(){var b=p(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=p.isFunction(a);return this.each(function(c){p(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){p.nodeName(this,"body")||p(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(a){(this.nodeType===1||this.nodeType===11)&&this.appendChild(a)})},prepend:function(){return this.domManip(arguments,!0,function(a){(this.nodeType===1||this.nodeType===11)&&this.insertBefore(a,this.firstChild)})},before:function(){if(!bh(this[0]))return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this)});if(arguments.length){var a=p.clean(arguments);return this.pushStack(p.merge(a,this),"before",this.selector)}},after:function(){if(!bh(this[0]))return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this.nextSibling)});if(arguments.length){var a=p.clean(arguments);return this.pushStack(p.merge(this,a),"after",this.selector)}},remove:function(a,b){var c,d=0;for(;(c=this[d])!=null;d++)if(!a||p.filter(a,[c]).length)!b&&c.nodeType===1&&(p.cleanData(c.getElementsByTagName("*")),p.cleanData([c])),c.parentNode&&c.parentNode.removeChild(c);return this},empty:function(){var a,b=0;for(;(a=this[b])!=null;b++){a.nodeType===1&&p.cleanData(a.getElementsByTagName("*"));while(a.firstChild)a.removeChild(a.firstChild)}return this},clone:function(a,b){return a=a==null?!1:a,b=b==null?a:b,this.map(function(){return p.clone(this,a,b)})},html:function(a){return p.access(this,function(a){var c=this[0]||{},d=0,e=this.length;if(a===b)return c.nodeType===1?c.innerHTML.replace(bm,""):b;if(typeof a=="string"&&!bs.test(a)&&(p.support.htmlSerialize||!bu.test(a))&&(p.support.leadingWhitespace||!bn.test(a))&&!bz[(bp.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(bo,"<$1></$2>");try{for(;d<e;d++)c=this[d]||{},c.nodeType===1&&(p.cleanData(c.getElementsByTagName("*")),c.innerHTML=a);c=0}catch(f){}}c&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(a){return bh(this[0])?this.length?this.pushStack(p(p.isFunction(a)?a():a),"replaceWith",a):this:p.isFunction(a)?this.each(function(b){var c=p(this),d=c.html();c.replaceWith(a.call(this,b,d))}):(typeof a!="string"&&(a=p(a).detach()),this.each(function(){var b=this.nextSibling,c=this.parentNode;p(this).remove(),b?p(b).before(a):p(c).append(a)}))},detach:function(a){return this.remove(a,!0)},domManip:function(a,c,d){a=[].concat.apply([],a);var e,f,g,h,i=0,j=a[0],k=[],l=this.length;if(!p.support.checkClone&&l>1&&typeof j=="string"&&bw.test(j))return this.each(function(){p(this).domManip(a,c,d)});if(p.isFunction(j))return this.each(function(e){var f=p(this);a[0]=j.call(this,e,c?f.html():b),f.domManip(a,c,d)});if(this[0]){e=p.buildFragment(a,this,k),g=e.fragment,f=g.firstChild,g.childNodes.length===1&&(g=f);if(f){c=c&&p.nodeName(f,"tr");for(h=e.cacheable||l-1;i<l;i++)d.call(c&&p.nodeName(this[i],"table")?bC(this[i],"tbody"):this[i],i===h?g:p.clone(g,!0,!0))}g=f=null,k.length&&p.each(k,function(a,b){b.src?p.ajax?p.ajax({url:b.src,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0}):p.error("no ajax"):p.globalEval((b.text||b.textContent||b.innerHTML||"").replace(by,"")),b.parentNode&&b.parentNode.removeChild(b)})}return this}}),p.buildFragment=function(a,c,d){var f,g,h,i=a[0];return c=c||e,c=!c.nodeType&&c[0]||c,c=c.ownerDocument||c,a.length===1&&typeof i=="string"&&i.length<512&&c===e&&i.charAt(0)==="<"&&!bt.test(i)&&(p.support.checkClone||!bw.test(i))&&(p.support.html5Clone||!bu.test(i))&&(g=!0,f=p.fragments[i],h=f!==b),f||(f=c.createDocumentFragment(),p.clean(a,c,f,d),g&&(p.fragments[i]=h&&f)),{fragment:f,cacheable:g}},p.fragments={},p.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){p.fn[a]=function(c){var d,e=0,f=[],g=p(c),h=g.length,i=this.length===1&&this[0].parentNode;if((i==null||i&&i.nodeType===11&&i.childNodes.length===1)&&h===1)return g[b](this[0]),this;for(;e<h;e++)d=(e>0?this.clone(!0):this).get(),p(g[e])[b](d),f=f.concat(d);return this.pushStack(f,a,g.selector)}}),p.extend({clone:function(a,b,c){var d,e,f,g;p.support.html5Clone||p.isXMLDoc(a)||!bu.test("<"+a.nodeName+">")?g=a.cloneNode(!0):(bB.innerHTML=a.outerHTML,bB.removeChild(g=bB.firstChild));if((!p.support.noCloneEvent||!p.support.noCloneChecked)&&(a.nodeType===1||a.nodeType===11)&&!p.isXMLDoc(a)){bE(a,g),d=bF(a),e=bF(g);for(f=0;d[f];++f)e[f]&&bE(d[f],e[f])}if(b){bD(a,g);if(c){d=bF(a),e=bF(g);for(f=0;d[f];++f)bD(d[f],e[f])}}return d=e=null,g},clean:function(a,b,c,d){var f,g,h,i,j,k,l,m,n,o,q,r,s=b===e&&bA,t=[];if(!b||typeof b.createDocumentFragment=="undefined")b=e;for(f=0;(h=a[f])!=null;f++){typeof h=="number"&&(h+="");if(!h)continue;if(typeof h=="string")if(!br.test(h))h=b.createTextNode(h);else{s=s||bk(b),l=b.createElement("div"),s.appendChild(l),h=h.replace(bo,"<$1></$2>"),i=(bp.exec(h)||["",""])[1].toLowerCase(),j=bz[i]||bz._default,k=j[0],l.innerHTML=j[1]+h+j[2];while(k--)l=l.lastChild;if(!p.support.tbody){m=bq.test(h),n=i==="table"&&!m?l.firstChild&&l.firstChild.childNodes:j[1]==="<table>"&&!m?l.childNodes:[];for(g=n.length-1;g>=0;--g)p.nodeName(n[g],"tbody")&&!n[g].childNodes.length&&n[g].parentNode.removeChild(n[g])}!p.support.leadingWhitespace&&bn.test(h)&&l.insertBefore(b.createTextNode(bn.exec(h)[0]),l.firstChild),h=l.childNodes,l.parentNode.removeChild(l)}h.nodeType?t.push(h):p.merge(t,h)}l&&(h=l=s=null);if(!p.support.appendChecked)for(f=0;(h=t[f])!=null;f++)p.nodeName(h,"input")?bG(h):typeof h.getElementsByTagName!="undefined"&&p.grep(h.getElementsByTagName("input"),bG);if(c){q=function(a){if(!a.type||bx.test(a.type))return d?d.push(a.parentNode?a.parentNode.removeChild(a):a):c.appendChild(a)};for(f=0;(h=t[f])!=null;f++)if(!p.nodeName(h,"script")||!q(h))c.appendChild(h),typeof h.getElementsByTagName!="undefined"&&(r=p.grep(p.merge([],h.getElementsByTagName("script")),q),t.splice.apply(t,[f+1,0].concat(r)),f+=r.length)}return t},cleanData:function(a,b){var c,d,e,f,g=0,h=p.expando,i=p.cache,j=p.support.deleteExpando,k=p.event.special;for(;(e=a[g])!=null;g++)if(b||p.acceptData(e)){d=e[h],c=d&&i[d];if(c){if(c.events)for(f in c.events)k[f]?p.event.remove(e,f):p.removeEvent(e,f,c.handle);i[d]&&(delete i[d],j?delete e[h]:e.removeAttribute?e.removeAttribute(h):e[h]=null,p.deletedIds.push(d))}}}}),function(){var a,b;p.uaMatch=function(a){a=a.toLowerCase();var b=/(chrome)[ \/]([\w.]+)/.exec(a)||/(webkit)[ \/]([\w.]+)/.exec(a)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a)||/(msie) ([\w.]+)/.exec(a)||a.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},a=p.uaMatch(g.userAgent),b={},a.browser&&(b[a.browser]=!0,b.version=a.version),b.chrome?b.webkit=!0:b.webkit&&(b.safari=!0),p.browser=b,p.sub=function(){function a(b,c){return new a.fn.init(b,c)}p.extend(!0,a,this),a.superclass=this,a.fn=a.prototype=this(),a.fn.constructor=a,a.sub=this.sub,a.fn.init=function c(c,d){return d&&d instanceof p&&!(d instanceof a)&&(d=a(d)),p.fn.init.call(this,c,d,b)},a.fn.init.prototype=a.fn;var b=a(e);return a}}();var bH,bI,bJ,bK=/alpha\([^)]*\)/i,bL=/opacity=([^)]*)/,bM=/^(top|right|bottom|left)$/,bN=/^(none|table(?!-c[ea]).+)/,bO=/^margin/,bP=new RegExp("^("+q+")(.*)$","i"),bQ=new RegExp("^("+q+")(?!px)[a-z%]+$","i"),bR=new RegExp("^([-+])=("+q+")","i"),bS={},bT={position:"absolute",visibility:"hidden",display:"block"},bU={letterSpacing:0,fontWeight:400},bV=["Top","Right","Bottom","Left"],bW=["Webkit","O","Moz","ms"],bX=p.fn.toggle;p.fn.extend({css:function(a,c){return p.access(this,function(a,c,d){return d!==b?p.style(a,c,d):p.css(a,c)},a,c,arguments.length>1)},show:function(){return b$(this,!0)},hide:function(){return b$(this)},toggle:function(a,b){var c=typeof a=="boolean";return p.isFunction(a)&&p.isFunction(b)?bX.apply(this,arguments):this.each(function(){(c?a:bZ(this))?p(this).show():p(this).hide()})}}),p.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=bH(a,"opacity");return c===""?"1":c}}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":p.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,c,d,e){if(!a||a.nodeType===3||a.nodeType===8||!a.style)return;var f,g,h,i=p.camelCase(c),j=a.style;c=p.cssProps[i]||(p.cssProps[i]=bY(j,i)),h=p.cssHooks[c]||p.cssHooks[i];if(d===b)return h&&"get"in h&&(f=h.get(a,!1,e))!==b?f:j[c];g=typeof d,g==="string"&&(f=bR.exec(d))&&(d=(f[1]+1)*f[2]+parseFloat(p.css(a,c)),g="number");if(d==null||g==="number"&&isNaN(d))return;g==="number"&&!p.cssNumber[i]&&(d+="px");if(!h||!("set"in h)||(d=h.set(a,d,e))!==b)try{j[c]=d}catch(k){}},css:function(a,c,d,e){var f,g,h,i=p.camelCase(c);return c=p.cssProps[i]||(p.cssProps[i]=bY(a.style,i)),h=p.cssHooks[c]||p.cssHooks[i],h&&"get"in h&&(f=h.get(a,!0,e)),f===b&&(f=bH(a,c)),f==="normal"&&c in bU&&(f=bU[c]),d||e!==b?(g=parseFloat(f),d||p.isNumeric(g)?g||0:f):f},swap:function(a,b,c){var d,e,f={};for(e in b)f[e]=a.style[e],a.style[e]=b[e];d=c.call(a);for(e in b)a.style[e]=f[e];return d}}),a.getComputedStyle?bH=function(b,c){var d,e,f,g,h=a.getComputedStyle(b,null),i=b.style;return h&&(d=h[c],d===""&&!p.contains(b.ownerDocument,b)&&(d=p.style(b,c)),bQ.test(d)&&bO.test(c)&&(e=i.width,f=i.minWidth,g=i.maxWidth,i.minWidth=i.maxWidth=i.width=d,d=h.width,i.width=e,i.minWidth=f,i.maxWidth=g)),d}:e.documentElement.currentStyle&&(bH=function(a,b){var c,d,e=a.currentStyle&&a.currentStyle[b],f=a.style;return e==null&&f&&f[b]&&(e=f[b]),bQ.test(e)&&!bM.test(b)&&(c=f.left,d=a.runtimeStyle&&a.runtimeStyle.left,d&&(a.runtimeStyle.left=a.currentStyle.left),f.left=b==="fontSize"?"1em":e,e=f.pixelLeft+"px",f.left=c,d&&(a.runtimeStyle.left=d)),e===""?"auto":e}),p.each(["height","width"],function(a,b){p.cssHooks[b]={get:function(a,c,d){if(c)return a.offsetWidth===0&&bN.test(bH(a,"display"))?p.swap(a,bT,function(){return cb(a,b,d)}):cb(a,b,d)},set:function(a,c,d){return b_(a,c,d?ca(a,b,d,p.support.boxSizing&&p.css(a,"boxSizing")==="border-box"):0)}}}),p.support.opacity||(p.cssHooks.opacity={get:function(a,b){return bL.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=p.isNumeric(b)?"alpha(opacity="+b*100+")":"",f=d&&d.filter||c.filter||"";c.zoom=1;if(b>=1&&p.trim(f.replace(bK,""))===""&&c.removeAttribute){c.removeAttribute("filter");if(d&&!d.filter)return}c.filter=bK.test(f)?f.replace(bK,e):f+" "+e}}),p(function(){p.support.reliableMarginRight||(p.cssHooks.marginRight={get:function(a,b){return p.swap(a,{display:"inline-block"},function(){if(b)return bH(a,"marginRight")})}}),!p.support.pixelPosition&&p.fn.position&&p.each(["top","left"],function(a,b){p.cssHooks[b]={get:function(a,c){if(c){var d=bH(a,b);return bQ.test(d)?p(a).position()[b]+"px":d}}}})}),p.expr&&p.expr.filters&&(p.expr.filters.hidden=function(a){return a.offsetWidth===0&&a.offsetHeight===0||!p.support.reliableHiddenOffsets&&(a.style&&a.style.display||bH(a,"display"))==="none"},p.expr.filters.visible=function(a){return!p.expr.filters.hidden(a)}),p.each({margin:"",padding:"",border:"Width"},function(a,b){p.cssHooks[a+b]={expand:function(c){var d,e=typeof c=="string"?c.split(" "):[c],f={};for(d=0;d<4;d++)f[a+bV[d]+b]=e[d]||e[d-2]||e[0];return f}},bO.test(a)||(p.cssHooks[a+b].set=b_)});var cd=/%20/g,ce=/\[\]$/,cf=/\r?\n/g,cg=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,ch=/^(?:select|textarea)/i;p.fn.extend({serialize:function(){return p.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?p.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||ch.test(this.nodeName)||cg.test(this.type))}).map(function(a,b){var c=p(this).val();return c==null?null:p.isArray(c)?p.map(c,function(a,c){return{name:b.name,value:a.replace(cf,"\r\n")}}):{name:b.name,value:c.replace(cf,"\r\n")}}).get()}}),p.param=function(a,c){var d,e=[],f=function(a,b){b=p.isFunction(b)?b():b==null?"":b,e[e.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};c===b&&(c=p.ajaxSettings&&p.ajaxSettings.traditional);if(p.isArray(a)||a.jquery&&!p.isPlainObject(a))p.each(a,function(){f(this.name,this.value)});else for(d in a)ci(d,a[d],c,f);return e.join("&").replace(cd,"+")};var cj,ck,cl=/#.*$/,cm=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,cn=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,co=/^(?:GET|HEAD)$/,cp=/^\/\//,cq=/\?/,cr=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,cs=/([?&])_=[^&]*/,ct=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,cu=p.fn.load,cv={},cw={},cx=["*/"]+["*"];try{ck=f.href}catch(cy){ck=e.createElement("a"),ck.href="",ck=ck.href}cj=ct.exec(ck.toLowerCase())||[],p.fn.load=function(a,c,d){if(typeof a!="string"&&cu)return cu.apply(this,arguments);if(!this.length)return this;var e,f,g,h=this,i=a.indexOf(" ");return i>=0&&(e=a.slice(i,a.length),a=a.slice(0,i)),p.isFunction(c)?(d=c,c=b):c&&typeof c=="object"&&(f="POST"),p.ajax({url:a,type:f,dataType:"html",data:c,complete:function(a,b){d&&h.each(d,g||[a.responseText,b,a])}}).done(function(a){g=arguments,h.html(e?p("<div>").append(a.replace(cr,"")).find(e):a)}),this},p.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){p.fn[b]=function(a){return this.on(b,a)}}),p.each(["get","post"],function(a,c){p[c]=function(a,d,e,f){return p.isFunction(d)&&(f=f||e,e=d,d=b),p.ajax({type:c,url:a,data:d,success:e,dataType:f})}}),p.extend({getScript:function(a,c){return p.get(a,b,c,"script")},getJSON:function(a,b,c){return p.get(a,b,c,"json")},ajaxSetup:function(a,b){return b?cB(a,p.ajaxSettings):(b=a,a=p.ajaxSettings),cB(a,b),a},ajaxSettings:{url:ck,isLocal:cn.test(cj[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded; charset=UTF-8",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":cx},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":a.String,"text html":!0,"text json":p.parseJSON,"text xml":p.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:cz(cv),ajaxTransport:cz(cw),ajax:function(a,c){function y(a,c,f,i){var k,s,t,u,w,y=c;if(v===2)return;v=2,h&&clearTimeout(h),g=b,e=i||"",x.readyState=a>0?4:0,f&&(u=cC(l,x,f));if(a>=200&&a<300||a===304)l.ifModified&&(w=x.getResponseHeader("Last-Modified"),w&&(p.lastModified[d]=w),w=x.getResponseHeader("Etag"),w&&(p.etag[d]=w)),a===304?(y="notmodified",k=!0):(k=cD(l,u),y=k.state,s=k.data,t=k.error,k=!t);else{t=y;if(!y||a)y="error",a<0&&(a=0)}x.status=a,x.statusText=(c||y)+"",k?o.resolveWith(m,[s,y,x]):o.rejectWith(m,[x,y,t]),x.statusCode(r),r=b,j&&n.trigger("ajax"+(k?"Success":"Error"),[x,l,k?s:t]),q.fireWith(m,[x,y]),j&&(n.trigger("ajaxComplete",[x,l]),--p.active||p.event.trigger("ajaxStop"))}typeof a=="object"&&(c=a,a=b),c=c||{};var d,e,f,g,h,i,j,k,l=p.ajaxSetup({},c),m=l.context||l,n=m!==l&&(m.nodeType||m instanceof p)?p(m):p.event,o=p.Deferred(),q=p.Callbacks("once memory"),r=l.statusCode||{},t={},u={},v=0,w="canceled",x={readyState:0,setRequestHeader:function(a,b){if(!v){var c=a.toLowerCase();a=u[c]=u[c]||a,t[a]=b}return this},getAllResponseHeaders:function(){return v===2?e:null},getResponseHeader:function(a){var c;if(v===2){if(!f){f={};while(c=cm.exec(e))f[c[1].toLowerCase()]=c[2]}c=f[a.toLowerCase()]}return c===b?null:c},overrideMimeType:function(a){return v||(l.mimeType=a),this},abort:function(a){return a=a||w,g&&g.abort(a),y(0,a),this}};o.promise(x),x.success=x.done,x.error=x.fail,x.complete=q.add,x.statusCode=function(a){if(a){var b;if(v<2)for(b in a)r[b]=[r[b],a[b]];else b=a[x.status],x.always(b)}return this},l.url=((a||l.url)+"").replace(cl,"").replace(cp,cj[1]+"//"),l.dataTypes=p.trim(l.dataType||"*").toLowerCase().split(s),l.crossDomain==null&&(i=ct.exec(l.url.toLowerCase())||!1,l.crossDomain=i&&i.join(":")+(i[3]?"":i[1]==="http:"?80:443)!==cj.join(":")+(cj[3]?"":cj[1]==="http:"?80:443)),l.data&&l.processData&&typeof l.data!="string"&&(l.data=p.param(l.data,l.traditional)),cA(cv,l,c,x);if(v===2)return x;j=l.global,l.type=l.type.toUpperCase(),l.hasContent=!co.test(l.type),j&&p.active++===0&&p.event.trigger("ajaxStart");if(!l.hasContent){l.data&&(l.url+=(cq.test(l.url)?"&":"?")+l.data,delete l.data),d=l.url;if(l.cache===!1){var z=p.now(),A=l.url.replace(cs,"$1_="+z);l.url=A+(A===l.url?(cq.test(l.url)?"&":"?")+"_="+z:"")}}(l.data&&l.hasContent&&l.contentType!==!1||c.contentType)&&x.setRequestHeader("Content-Type",l.contentType),l.ifModified&&(d=d||l.url,p.lastModified[d]&&x.setRequestHeader("If-Modified-Since",p.lastModified[d]),p.etag[d]&&x.setRequestHeader("If-None-Match",p.etag[d])),x.setRequestHeader("Accept",l.dataTypes[0]&&l.accepts[l.dataTypes[0]]?l.accepts[l.dataTypes[0]]+(l.dataTypes[0]!=="*"?", "+cx+"; q=0.01":""):l.accepts["*"]);for(k in l.headers)x.setRequestHeader(k,l.headers[k]);if(!l.beforeSend||l.beforeSend.call(m,x,l)!==!1&&v!==2){w="abort";for(k in{success:1,error:1,complete:1})x[k](l[k]);g=cA(cw,l,c,x);if(!g)y(-1,"No Transport");else{x.readyState=1,j&&n.trigger("ajaxSend",[x,l]),l.async&&l.timeout>0&&(h=setTimeout(function(){x.abort("timeout")},l.timeout));try{v=1,g.send(t,y)}catch(B){if(v<2)y(-1,B);else throw B}}return x}return x.abort()},active:0,lastModified:{},etag:{}});var cE=[],cF=/\?/,cG=/(=)\?(?=&|$)|\?\?/,cH=p.now();p.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=cE.pop()||p.expando+"_"+cH++;return this[a]=!0,a}}),p.ajaxPrefilter("json jsonp",function(c,d,e){var f,g,h,i=c.data,j=c.url,k=c.jsonp!==!1,l=k&&cG.test(j),m=k&&!l&&typeof i=="string"&&!(c.contentType||"").indexOf("application/x-www-form-urlencoded")&&cG.test(i);if(c.dataTypes[0]==="jsonp"||l||m)return f=c.jsonpCallback=p.isFunction(c.jsonpCallback)?c.jsonpCallback():c.jsonpCallback,g=a[f],l?c.url=j.replace(cG,"$1"+f):m?c.data=i.replace(cG,"$1"+f):k&&(c.url+=(cF.test(j)?"&":"?")+c.jsonp+"="+f),c.converters["script json"]=function(){return h||p.error(f+" was not called"),h[0]},c.dataTypes[0]="json",a[f]=function(){h=arguments},e.always(function(){a[f]=g,c[f]&&(c.jsonpCallback=d.jsonpCallback,cE.push(f)),h&&p.isFunction(g)&&g(h[0]),h=g=b}),"script"}),p.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(a){return p.globalEval(a),a}}}),p.ajaxPrefilter("script",function(a){a.cache===b&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),p.ajaxTransport("script",function(a){if(a.crossDomain){var c,d=e.head||e.getElementsByTagName("head")[0]||e.documentElement;return{send:function(f,g){c=e.createElement("script"),c.async="async",a.scriptCharset&&(c.charset=a.scriptCharset),c.src=a.url,c.onload=c.onreadystatechange=function(a,e){if(e||!c.readyState||/loaded|complete/.test(c.readyState))c.onload=c.onreadystatechange=null,d&&c.parentNode&&d.removeChild(c),c=b,e||g(200,"success")},d.insertBefore(c,d.firstChild)},abort:function(){c&&c.onload(0,1)}}}});var cI,cJ=a.ActiveXObject?function(){for(var a in cI)cI[a](0,1)}:!1,cK=0;p.ajaxSettings.xhr=a.ActiveXObject?function(){return!this.isLocal&&cL()||cM()}:cL,function(a){p.extend(p.support,{ajax:!!a,cors:!!a&&"withCredentials"in a})}(p.ajaxSettings.xhr()),p.support.ajax&&p.ajaxTransport(function(c){if(!c.crossDomain||p.support.cors){var d;return{send:function(e,f){var g,h,i=c.xhr();c.username?i.open(c.type,c.url,c.async,c.username,c.password):i.open(c.type,c.url,c.async);if(c.xhrFields)for(h in c.xhrFields)i[h]=c.xhrFields[h];c.mimeType&&i.overrideMimeType&&i.overrideMimeType(c.mimeType),!c.crossDomain&&!e["X-Requested-With"]&&(e["X-Requested-With"]="XMLHttpRequest");try{for(h in e)i.setRequestHeader(h,e[h])}catch(j){}i.send(c.hasContent&&c.data||null),d=function(a,e){var h,j,k,l,m;try{if(d&&(e||i.readyState===4)){d=b,g&&(i.onreadystatechange=p.noop,cJ&&delete cI[g]);if(e)i.readyState!==4&&i.abort();else{h=i.status,k=i.getAllResponseHeaders(),l={},m=i.responseXML,m&&m.documentElement&&(l.xml=m);try{l.text=i.responseText}catch(a){}try{j=i.statusText}catch(n){j=""}!h&&c.isLocal&&!c.crossDomain?h=l.text?200:404:h===1223&&(h=204)}}}catch(o){e||f(-1,o)}l&&f(h,j,l,k)},c.async?i.readyState===4?setTimeout(d,0):(g=++cK,cJ&&(cI||(cI={},p(a).unload(cJ)),cI[g]=d),i.onreadystatechange=d):d()},abort:function(){d&&d(0,1)}}}});var cN,cO,cP=/^(?:toggle|show|hide)$/,cQ=new RegExp("^(?:([-+])=|)("+q+")([a-z%]*)$","i"),cR=/queueHooks$/,cS=[cY],cT={"*":[function(a,b){var c,d,e=this.createTween(a,b),f=cQ.exec(b),g=e.cur(),h=+g||0,i=1,j=20;if(f){c=+f[2],d=f[3]||(p.cssNumber[a]?"":"px");if(d!=="px"&&h){h=p.css(e.elem,a,!0)||c||1;do i=i||".5",h=h/i,p.style(e.elem,a,h+d);while(i!==(i=e.cur()/g)&&i!==1&&--j)}e.unit=d,e.start=h,e.end=f[1]?h+(f[1]+1)*c:c}return e}]};p.Animation=p.extend(cW,{tweener:function(a,b){p.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");var c,d=0,e=a.length;for(;d<e;d++)c=a[d],cT[c]=cT[c]||[],cT[c].unshift(b)},prefilter:function(a,b){b?cS.unshift(a):cS.push(a)}}),p.Tween=cZ,cZ.prototype={constructor:cZ,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(p.cssNumber[c]?"":"px")},cur:function(){var a=cZ.propHooks[this.prop];return a&&a.get?a.get(this):cZ.propHooks._default.get(this)},run:function(a){var b,c=cZ.propHooks[this.prop];return this.options.duration?this.pos=b=p.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):cZ.propHooks._default.set(this),this}},cZ.prototype.init.prototype=cZ.prototype,cZ.propHooks={_default:{get:function(a){var b;return a.elem[a.prop]==null||!!a.elem.style&&a.elem.style[a.prop]!=null?(b=p.css(a.elem,a.prop,!1,""),!b||b==="auto"?0:b):a.elem[a.prop]},set:function(a){p.fx.step[a.prop]?p.fx.step[a.prop](a):a.elem.style&&(a.elem.style[p.cssProps[a.prop]]!=null||p.cssHooks[a.prop])?p.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},cZ.propHooks.scrollTop=cZ.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},p.each(["toggle","show","hide"],function(a,b){var c=p.fn[b];p.fn[b]=function(d,e,f){return d==null||typeof d=="boolean"||!a&&p.isFunction(d)&&p.isFunction(e)?c.apply(this,arguments):this.animate(c$(b,!0),d,e,f)}}),p.fn.extend({fadeTo:function(a,b,c,d){return this.filter(bZ).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=p.isEmptyObject(a),f=p.speed(b,c,d),g=function(){var b=cW(this,p.extend({},a),f);e&&b.stop(!0)};return e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,c,d){var e=function(a){var b=a.stop;delete a.stop,b(d)};return typeof a!="string"&&(d=c,c=a,a=b),c&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,c=a!=null&&a+"queueHooks",f=p.timers,g=p._data(this);if(c)g[c]&&g[c].stop&&e(g[c]);else for(c in g)g[c]&&g[c].stop&&cR.test(c)&&e(g[c]);for(c=f.length;c--;)f[c].elem===this&&(a==null||f[c].queue===a)&&(f[c].anim.stop(d),b=!1,f.splice(c,1));(b||!d)&&p.dequeue(this,a)})}}),p.each({slideDown:c$("show"),slideUp:c$("hide"),slideToggle:c$("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){p.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),p.speed=function(a,b,c){var d=a&&typeof a=="object"?p.extend({},a):{complete:c||!c&&b||p.isFunction(a)&&a,duration:a,easing:c&&b||b&&!p.isFunction(b)&&b};d.duration=p.fx.off?0:typeof d.duration=="number"?d.duration:d.duration in p.fx.speeds?p.fx.speeds[d.duration]:p.fx.speeds._default;if(d.queue==null||d.queue===!0)d.queue="fx";return d.old=d.complete,d.complete=function(){p.isFunction(d.old)&&d.old.call(this),d.queue&&p.dequeue(this,d.queue)},d},p.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},p.timers=[],p.fx=cZ.prototype.init,p.fx.tick=function(){var a,b=p.timers,c=0;for(;c<b.length;c++)a=b[c],!a()&&b[c]===a&&b.splice(c--,1);b.length||p.fx.stop()},p.fx.timer=function(a){a()&&p.timers.push(a)&&!cO&&(cO=setInterval(p.fx.tick,p.fx.interval))},p.fx.interval=13,p.fx.stop=function(){clearInterval(cO),cO=null},p.fx.speeds={slow:600,fast:200,_default:400},p.fx.step={},p.expr&&p.expr.filters&&(p.expr.filters.animated=function(a){return p.grep(p.timers,function(b){return a===b.elem}).length});var c_=/^(?:body|html)$/i;p.fn.offset=function(a){if(arguments.length)return a===b?this:this.each(function(b){p.offset.setOffset(this,a,b)});var c,d,e,f,g,h,i,j={top:0,left:0},k=this[0],l=k&&k.ownerDocument;if(!l)return;return(d=l.body)===k?p.offset.bodyOffset(k):(c=l.documentElement,p.contains(c,k)?(typeof k.getBoundingClientRect!="undefined"&&(j=k.getBoundingClientRect()),e=da(l),f=c.clientTop||d.clientTop||0,g=c.clientLeft||d.clientLeft||0,h=e.pageYOffset||c.scrollTop,i=e.pageXOffset||c.scrollLeft,{top:j.top+h-f,left:j.left+i-g}):j)},p.offset={bodyOffset:function(a){var b=a.offsetTop,c=a.offsetLeft;return p.support.doesNotIncludeMarginInBodyOffset&&(b+=parseFloat(p.css(a,"marginTop"))||0,c+=parseFloat(p.css(a,"marginLeft"))||0),{top:b,left:c}},setOffset:function(a,b,c){var d=p.css(a,"position");d==="static"&&(a.style.position="relative");var e=p(a),f=e.offset(),g=p.css(a,"top"),h=p.css(a,"left"),i=(d==="absolute"||d==="fixed")&&p.inArray("auto",[g,h])>-1,j={},k={},l,m;i?(k=e.position(),l=k.top,m=k.left):(l=parseFloat(g)||0,m=parseFloat(h)||0),p.isFunction(b)&&(b=b.call(a,c,f)),b.top!=null&&(j.top=b.top-f.top+l),b.left!=null&&(j.left=b.left-f.left+m),"using"in b?b.using.call(a,j):e.css(j)}},p.fn.extend({position:function(){if(!this[0])return;var a=this[0],b=this.offsetParent(),c=this.offset(),d=c_.test(b[0].nodeName)?{top:0,left:0}:b.offset();return c.top-=parseFloat(p.css(a,"marginTop"))||0,c.left-=parseFloat(p.css(a,"marginLeft"))||0,d.top+=parseFloat(p.css(b[0],"borderTopWidth"))||0,d.left+=parseFloat(p.css(b[0],"borderLeftWidth"))||0,{top:c.top-d.top,left:c.left-d.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||e.body;while(a&&!c_.test(a.nodeName)&&p.css(a,"position")==="static")a=a.offsetParent;return a||e.body})}}),p.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,c){var d=/Y/.test(c);p.fn[a]=function(e){return p.access(this,function(a,e,f){var g=da(a);if(f===b)return g?c in g?g[c]:g.document.documentElement[e]:a[e];g?g.scrollTo(d?p(g).scrollLeft():f,d?f:p(g).scrollTop()):a[e]=f},a,e,arguments.length,null)}}),p.each({Height:"height",Width:"width"},function(a,c){p.each({padding:"inner"+a,content:c,"":"outer"+a},function(d,e){p.fn[e]=function(e,f){var g=arguments.length&&(d||typeof e!="boolean"),h=d||(e===!0||f===!0?"margin":"border");return p.access(this,function(c,d,e){var f;return p.isWindow(c)?c.document.documentElement["client"+a]:c.nodeType===9?(f=c.documentElement,Math.max(c.body["scroll"+a],f["scroll"+a],c.body["offset"+a],f["offset"+a],f["client"+a])):e===b?p.css(c,d,e,h):p.style(c,d,e,h)},c,g?e:b,g,null)}})}),a.jQuery=a.$=p,typeof define=="function"&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return p})})(window);

/**
 * New Namespace for NFL Club Sites jQuery to avoid collision with other objects and
 * integration of components with jQuery built in.
 */
var $nflcs = jQuery.noConflict();
//make sure $ continues to exist but not mapped to NFL code.
$ = $ || jQuery.noConflict();

// FireBug Console IE Fix
if(!window.console) window.console = { log:function(){} };

/**
 * NFL Club Sites Log
 * Displays console.log(s) only if in lower environments or query string "debug" exists
 */
$nflcs.log = function() {
    // show log if lower environment or query string "debug" exists
    if ( (typeof(console.log.apply) == "function") && (((location.host).indexOf("clubs.nfl.com") != -1) || nflcs.gbl.returnUriVariable("debug"))) {
        console.log.apply(console,arguments);
    }
};

//make sure this value exists at all times.
var nflcomCombinatorAVP = nflcomCombinatorAVP || 'http://combine.nflcdn.com/yui/min2/index.php';
var nflcomYuiBase = nflcomYuiBase || 'http://combine.nflcdn.com/yui/';

/*!
 * jQuery clueTip plugin v1.1.3
 *
 * Date: Mon Apr 11 20:31:15 2011 EDT
 * Requires: jQuery v1.3+
 *
 * Copyright 2010, Karl Swedberg
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Full list of options/settings can be found at the bottom of this file and at http://plugins.learningjquery.com/cluetip/
 * Examples can be found at http://plugins.learningjquery.com/cluetip/demo/
 *
*/
(function(c){c.cluetip={version:"1.1.3",setup:{insertionType:"appendTo",insertionElement:"body"},defaults:{width:275,height:"auto",cluezIndex:97,positionBy:"auto",topOffset:15,leftOffset:15,local:false,localPrefix:null,localIdSuffix:null,hideLocal:true,attribute:"rel",titleAttribute:"title",splitTitle:"",escapeTitle:false,showTitle:true,cluetipClass:"default",hoverClass:"",waitImage:true,cursor:"help",arrows:false,dropShadow:true,dropShadowSteps:6,sticky:false,mouseOutClose:false,activation:"hover",
clickThrough:true,tracking:false,delayedClose:0,closePosition:"top",closeText:"Close",truncate:0,fx:{open:"show",openSpeed:""},hoverIntent:{sensitivity:3,interval:50,timeout:0},onActivate:function(){return true},onShow:function(){},onHide:function(){},ajaxCache:true,ajaxProcess:function(i){return i=i.replace(/<(script|style|title)[^<]+<\/(script|style|title)>/gm,"").replace(/<(link|meta)[^>]+>/g,"")},ajaxSettings:{dataType:"html"},debug:false}};var e,g,Q,C,D,E,Y,F;c.fn.cluetip=function(i,m){function G(q,
H){var h=q.dropShadow&&q.dropShadowSteps?+q.dropShadowSteps:0;if(c.support.boxShadow){var b=h===0?"0 0 ":"1px 1px ";c("#cluetip").css(c.support.boxShadow,b+h+"px rgba(0,0,0,0.5)");return false}b=c("#cluetip .cluetip-drop-shadow");if(h==b.length)return b;b.remove();b=[];for(var a=0;a<h;)b[a++]='<div style="top:'+a+"px;left:"+a+'px;"></div>';return H=c(b.join("")).css({position:"absolute",backgroundColor:"#000",zIndex:n-1,opacity:0.1}).addClass("cluetip-drop-shadow").prependTo("#cluetip")}if(typeof i==
"object"){m=i;i=null}if(i=="destroy"){c(document).unbind(".cluetip");c("#cluetip").remove();c.removeData(this,"title");c.removeData(this,"cluetip");return this.unbind(".cluetip")}m=c.extend(true,{},c.cluetip.defaults,m||{});var I=/appendTo|prependTo|insertBefore|insertAfter/.test(m.insertionType)?m.insertionType:"appendTo",Z=m.insertionElement||"body";if(!c("#cluetip").length){c('<div id="cluetip"><div id="cluetip-outer" class="ui-cluetip-outer"><h3 id="cluetip-title" class="ui-widget-header ui-cluetip-header"></h3><div id="cluetip-inner" class="ui-widget-content ui-cluetip-content"></div></div><div id="cluetip-extra"></div><div id="cluetip-arrows" class="cluetip-arrows"></div></div>')[I](Z).hide();
var n=+m.cluezIndex;e=c("#cluetip").css({position:"absolute"});Q=c("#cluetip-outer").css({position:"relative",zIndex:n});g=c("#cluetip-inner");C=c("#cluetip-title");D=c("#cluetip-arrows");E=c('<div id="cluetip-waitimage"></div>').css({position:"absolute"}).insertBefore(e).hide()}var R=(parseInt(e.css("paddingLeft"),10)||0)+(parseInt(e.css("paddingRight"),10)||0);this.each(function(q){function H(){return false}var h=this,b=c(this),a=c.extend(true,{},m,c.metadata?b.metadata():c.meta?b.data():{}),ca=
false,y=false,da=0,k=b.attr(a.attribute),J=a.cluetipClass;n=+a.cluezIndex;b.data("cluetip",{title:h.title,zIndex:n});if(!k&&!a.splitTitle&&!i)return true;if(a.local&&a.localPrefix)k=a.localPrefix+k;a.local&&a.hideLocal&&k&&c(k+":first").hide();var r=parseInt(a.topOffset,10),x=parseInt(a.leftOffset,10),t,$,S=isNaN(parseInt(a.height,10))?"auto":/\D/g.test(a.height)?a.height:a.height+"px",T,u,s,K,U,aa=parseInt(a.width,10)||275,l=aa+R+a.dropShadowSteps,L=this.offsetWidth,v,j,o,z,A,p=a.attribute!="title"?
b.attr(a.titleAttribute):"";if(a.splitTitle){if(p==undefined)p="";A=p.split(a.splitTitle);p=A.shift()}if(a.escapeTitle)p=p.replace(/&/g,"&amp;").replace(/>/g,"&gt;").replace(/</g,"&lt;");var W=function(d){if(a.onActivate(b)===false)return false;y=true;e.removeClass().css({width:aa});k==b.attr("href")&&b.css("cursor",a.cursor);a.hoverClass&&b.addClass(a.hoverClass);u=b.offset().top;v=b.offset().left;o=d.pageX;K=d.pageY;if(h.tagName.toLowerCase()!="area"){T=c(document).scrollTop();z=c(window).width()}if(a.positionBy==
"fixed"){j=L+v+x;e.css({left:j})}else{j=L>v&&v>l||v+L+l+x>z?v-l-x:L+v+x;if(h.tagName.toLowerCase()=="area"||a.positionBy=="mouse"||L+l>z)if(o+20+l>z){e.addClass(" cluetip-"+J);j=o-l-x>=0?o-l-x-parseInt(e.css("marginLeft"),10)+parseInt(g.css("marginRight"),10):o-l/2}else j=o+x;var f=j<0?d.pageY+r:d.pageY;e.css({left:j>0&&a.positionBy!="bottomTop"?j:o+l/2>z?z/2-l/2:Math.max(o-l/2,0),zIndex:b.data("cluetip").zIndex});D.css({zIndex:b.data("cluetip").zIndex+1})}$=c(window).height();if(i){if(typeof i==
"function")i=i.call(h);g.html(i);B(f)}else if(A){d=A.length;g.html(d?A[0]:"");if(d>1)for(var M=1;M<d;M++)g.append('<div class="split-body">'+A[M]+"</div>");B(f)}else if(!a.local&&k.indexOf("#")!==0)if(/\.(jpe?g|tiff?|gif|png)(?:\?.*)?$/i.test(k)){g.html('<img src="'+k+'" alt="'+p+'" />');B(f)}else{var N=a.ajaxSettings.beforeSend,ea=a.ajaxSettings.error,fa=a.ajaxSettings.success,ga=a.ajaxSettings.complete;d=c.extend(true,{},a.ajaxSettings,{cache:a.ajaxCache,url:k,beforeSend:function(w){N&&N.call(h,
w,e,g);Q.children().empty();a.waitImage&&E.css({top:K+20,left:o+20,zIndex:b.data("cluetip").zIndex-1}).show()},error:function(w,O){if(y)ea?ea.call(h,w,O,e,g):g.html("<i>sorry, the contents could not be loaded</i>")},success:function(w,O){ca=a.ajaxProcess.call(h,w);if(y){fa&&fa.call(h,w,O,e,g);g.html(ca)}},complete:function(w,O){ga&&ga.call(h,w,O,e,g);var V=g[0].getElementsByTagName("img");F=V.length;for(var ba=0,ia=V.length;ba<ia;ba++)V[ba].complete&&F--;if(F&&!c.browser.opera)c(V).bind("load error",
function(){F--;if(F<1){E.hide();y&&B(f)}});else{E.hide();y&&B(f)}}});c.ajax(d)}else if(a.local){d=c(k+(/#\S+$/.test(k)?"":":eq("+q+")")).clone(true).show();a.localIdSuffix&&d.attr("id",d[0].id+a.localIdSuffix);g.html(d);B(f)}},B=function(d){e.addClass("cluetip-"+J);if(a.truncate){var f=g.text().slice(0,a.truncate)+"...";g.html(f)}p?C.show().html(p):a.showTitle?C.show().html("&nbsp;"):C.hide();if(a.sticky){f=c('<div id="cluetip-close"><a href="#">'+a.closeText+"</a></div>");a.closePosition=="bottom"?
f.appendTo(g):a.closePosition=="title"?f.prependTo(C):f.prependTo(g);f.bind("click.cluetip",function(){P();return false});a.mouseOutClose?e.bind("mouseleave.cluetip",function(){P()}):e.unbind("mouseleave.cluetip")}f="";Q.css({zIndex:b.data("cluetip").zIndex,overflow:S=="auto"?"visible":"auto",height:S});t=S=="auto"?Math.max(e.outerHeight(),e.height()):parseInt(S,10);s=u;U=T+$;if(a.positionBy=="fixed")s=u-a.dropShadowSteps+r;else if(j<o&&Math.max(j,0)+l>o||a.positionBy=="bottomTop")if(u+t+r>U&&K-T>
t+r){s=K-t-r;f="top"}else{s=K+r;f="bottom"}else s=u+t+r>U?t>=$?T:U-t-r:b.css("display")=="block"||h.tagName.toLowerCase()=="area"||a.positionBy=="mouse"?d-r:u-a.dropShadowSteps;if(f=="")j<v?f="left":f="right";d=" clue-"+f+"-"+J+" cluetip-"+J;if(J=="rounded")d+=" ui-corner-all";e.css({top:s+"px"}).attr({className:"ui-widget ui-widget-content ui-cluetip"+d});if(a.arrows){d=u-s-a.dropShadowSteps;D.css({top:/(left|right)/.test(f)&&j>=0&&d>0?d+"px":/(left|right)/.test(f)?0:""}).show()}else D.hide();(Y=
G(a))&&Y.length&&Y.hide().css({height:t,width:aa,zIndex:b.data("cluetip").zIndex-1}).show();e.hide()[a.fx.open](a.fx.openSpeed||0);c.fn.bgiframe&&e.bgiframe();if(a.delayedClose>0)da=setTimeout(P,a.delayedClose);a.onShow.call(h,e,g)},X=function(){y=false;E.hide();if(!a.sticky||/click|toggle/.test(a.activation)){P();clearTimeout(da)}a.hoverClass&&b.removeClass(a.hoverClass)},P=function(){Q.parent().hide().removeClass();a.onHide.call(h,e,g);b.removeClass("cluetip-clicked");p&&b.attr(a.titleAttribute,
p);b.css("cursor","");a.arrows&&D.css({top:""})};c(document).bind("hideCluetip",function(){P()});if(/click|toggle/.test(a.activation))b.bind("click.cluetip",function(d){if(e.is(":hidden")||!b.is(".cluetip-clicked")){W(d);c(".cluetip-clicked").removeClass("cluetip-clicked");b.addClass("cluetip-clicked")}else X(d);return false});else if(a.activation=="focus"){b.bind("focus.cluetip",function(d){b.attr("title","");W(d)});b.bind("blur.cluetip",function(d){b.attr("title",b.data("thisInfo").title);X(d)})}else{b[a.clickThrough?
"unbind":"bind"]("click.cluetip",H);var ha=function(d){if(a.tracking==true){var f=j-d.pageX,M=s?s-d.pageY:u-d.pageY;b.bind("mousemove.cluetip",function(N){e.css({left:N.pageX+f,top:N.pageY+M})})}};c.fn.hoverIntent&&a.hoverIntent?b.hoverIntent({sensitivity:a.hoverIntent.sensitivity,interval:a.hoverIntent.interval,over:function(d){W(d);ha(d)},timeout:a.hoverIntent.timeout,out:function(d){X(d);b.unbind("mousemove.cluetip")}}):b.bind("mouseenter.cluetip",function(d){W(d);ha(d)}).bind("mouseleave.cluetip",
function(d){X(d);b.unbind("mousemove.cluetip")});b.bind("mouseover.cluetip",function(){b.attr("title","")}).bind("mouseleave.cluetip",function(){b.attr("title",b.data("cluetip").title)})}});return this};(function(){c.support=c.support||{};for(var i=document.createElement("div").style,m=["boxShadow"],G=["moz","Moz","webkit","o"],I=0,Z=m.length;I<Z;I++){var n=m[I],R=n.charAt(0).toUpperCase()+n.slice(1);if(typeof i[n]!=="undefined")c.support[n]=n;else for(var q=0,H=G.length;q<H;q++)if(typeof i[G[q]+
R]!=="undefined"){c.support[n]=G[q]+R;break}}})();c.fn.cluetip.defaults=c.cluetip.defaults})(jQuery);

/**
 * hoverIntent r6 // 2011.02.26 // jQuery 1.5.1+
 * <http://cherne.net/brian/resources/jquery.hoverIntent.html>
 *
 * @param  f  onMouseOver function || An object with configuration options
 * @param  g  onMouseOut function  || Nothing (use configuration options object)
 * @author    Brian Cherne brian(at)cherne(dot)net
 */
(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev])}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev])};var handleHover=function(e){var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t)}if(e.type=="mouseenter"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob)},cfg.timeout)}}};return this.bind('mouseenter',handleHover).bind('mouseleave',handleHover)}})(jQuery);

/**
* ECMAScript 5 Object.Create function : http://ejohn.org/blog/ecmascript-5-objects-and-properties/
*
* @param o JS object || Object to create new prototypical instance of
* @author http://www.ecma-international.org/
*/
if (typeof Object.create !== 'function') {
    Object.create = function (o) {
        function F() {}
        F.prototype = o;
        return new F();
    };
}

/*
 RequireJS 2.0.1 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 Available via the MIT or new BSD license.
 see: http://github.com/jrburke/requirejs for details
 */
var requirejs,require,define;
(function(Z){function w(b){return I.call(b)==="[object Function]"}function E(b){return I.call(b)==="[object Array]"}function n(b,d){if(b){var f;for(f=0;f<b.length;f+=1)if(d(b[f],f,b))break}}function L(b,d){if(b){var f;for(f=b.length-1;f>-1;f-=1)if(d(b[f],f,b))break}}function A(b,d){for(var f in b)if(b.hasOwnProperty(f)&&d(b[f],f))break}function R(b,d,f){d&&A(d,function(d,e){if(f||!b.hasOwnProperty(e))b[e]=d})}function s(b,d){return function(){return d.apply(b,arguments)}}function $(b){if(!b)return b;
    var d=Z;n(b.split("."),function(b){d=d[b]});return d}function aa(b,d,f){return function(){var g=ga.call(arguments,0),e;if(f&&w(e=g[g.length-1]))e.__requireJsBuild=!0;g.push(d);return b.apply(null,g)}}function ba(b,d,f){n([["toUrl"],["undef"],["defined","requireDefined"],["specified","requireSpecified"]],function(g){b[g[0]]=aa(d[g[1]||g[0]],f)})}function F(b,d,f,g){d=Error(d+"\nhttp://requirejs.org/docs/errors.html#"+b);d.requireType=b;d.requireModules=g;if(f)d.originalError=f;return d}function ha(){if(G&&
    G.readyState==="interactive")return G;L(document.getElementsByTagName("script"),function(b){if(b.readyState==="interactive")return G=b});return G}var ia=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg,ja=/require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,ca=/\.js$/,ka=/^\.\//,I=Object.prototype.toString,x=Array.prototype,ga=x.slice,la=x.splice,u=!!(typeof window!=="undefined"&&navigator&&document),da=!u&&typeof importScripts!=="undefined",ma=u&&navigator.platform==="PLAYSTATION 3"?/^complete$/:/^(complete|loaded)$/,
    S=typeof opera!=="undefined"&&opera.toString()==="[object Opera]",v={},q={},M=[],J=!1,l,t,B,y,C,G,H,N,ea;if(typeof define==="undefined"){if(typeof requirejs!=="undefined"){if(w(requirejs))return;q=requirejs;requirejs=void 0}typeof require!=="undefined"&&!w(require)&&(q=require,require=void 0);l=requirejs=function(b,d,f,g){var e="_",n;!E(b)&&typeof b!=="string"&&(n=b,E(d)?(b=d,d=f,f=g):b=[]);if(n&&n.context)e=n.context;(g=v[e])||(g=v[e]=l.s.newContext(e));n&&g.configure(n);return g.require(b,d,f)};
    l.config=function(b){return l(b)};require||(require=l);l.version="2.0.1";l.jsExtRegExp=/^\/|:|\?|\.js$/;l.isBrowser=u;x=l.s={contexts:v,newContext:function(b){function d(a,c,j){var r=c&&c.split("/"),b=k.map,m=b&&b["*"],h,d,f,e;if(a&&a.charAt(0)===".")if(c){r=k.pkgs[c]?[c]:r.slice(0,r.length-1);c=a=r.concat(a.split("/"));for(h=0;c[h];h+=1)if(d=c[h],d===".")c.splice(h,1),h-=1;else if(d==="..")if(h===1&&(c[2]===".."||c[0]===".."))break;else h>0&&(c.splice(h-1,2),h-=2);h=k.pkgs[c=a[0]];a=a.join("/");
        h&&a===c+"/"+h.main&&(a=c)}else a.indexOf("./")===0&&(a=a.substring(2));if(j&&(r||m)&&b){c=a.split("/");for(h=c.length;h>0;h-=1){f=c.slice(0,h).join("/");if(r)for(d=r.length;d>0;d-=1)if(j=b[r.slice(0,d).join("/")])if(j=j[f]){e=j;break}!e&&m&&m[f]&&(e=m[f]);if(e){c.splice(0,h,e);a=c.join("/");break}}}return a}function f(a){u&&n(document.getElementsByTagName("script"),function(c){if(c.getAttribute("data-requiremodule")===a&&c.getAttribute("data-requirecontext")===i.contextName)return c.parentNode.removeChild(c),
        !0})}function g(a){var c=k.paths[a];if(c&&E(c)&&c.length>1)return f(a),c.shift(),i.undef(a),i.require([a]),!0}function e(a,c,j,r){var b=a?a.indexOf("!"):-1,m=null,h=c?c.name:null,e=a,f=!0,g="",k,l;a||(f=!1,a="_@r"+(L+=1));b!==-1&&(m=a.substring(0,b),a=a.substring(b+1,a.length));m&&(m=d(m,h,r),l=p[m]);a&&(m?g=l&&l.normalize?l.normalize(a,function(a){return d(a,h,r)}):d(a,h,r):(g=d(a,h,r),k=O[g],k||(k=i.nameToUrl(a,null,c),O[g]=k)));a=m&&!l&&!j?"_unnormalized"+(N+=1):"";return{prefix:m,name:g,parentMap:c,
        unnormalized:!!a,url:k,originalName:e,isDefine:f,id:(m?m+"!"+g:g)+a}}function q(a){var c=a.id,j=o[c];j||(j=o[c]=new i.Module(a));return j}function t(a,c,j){var b=a.id,fa=o[b];if(p.hasOwnProperty(b)&&(!fa||fa.defineEmitComplete))c==="defined"&&j(p[b]);else q(a).on(c,j)}function z(a,c){var j=a.requireModules,b=!1;if(c)c(a);else if(n(j,function(c){if(c=o[c])c.error=a,c.events.error&&(b=!0,c.emit("error",a))}),!b)l.onError(a)}function x(){M.length&&(la.apply(D,[D.length-1,0].concat(M)),M=[])}function v(a,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                c,j){a=a&&a.map;c=aa(j||i.require,a,c);ba(c,i,a);c.isBrowser=u;return c}function y(a){delete o[a];n(K,function(c,j){if(c.map.id===a)return K.splice(j,1),c.defined||(i.waitCount-=1),!0})}function B(a,c){var j=a.map.id,b=a.depMaps,d;if(a.inited){if(c[j])return a;c[j]=!0;n(b,function(a){if(a=o[a.id])return!a.inited||!a.enabled?(d=null,delete c[j],!0):d=B(a,c)});return d}}function C(a,c,j){var b=a.map.id,d=a.depMaps;if(a.inited&&a.map.isDefine){if(c[b])return p[b];c[b]=a;n(d,function(d){var d=d.id,h=
        o[d];!P[d]&&h&&(!h.inited||!h.enabled?j[b]=!0:(h=C(h,c,j),j[d]||a.defineDepById(d,h)))});a.check(!0);return p[b]}}function H(a){a.check()}function T(){var a=k.waitSeconds*1E3,c=a&&i.startTime+a<(new Date).getTime(),j=[],b=!1,d=!0,m,h,e;if(!U){U=!0;A(o,function(a){m=a.map;h=m.id;if(a.enabled&&!a.error)if(!a.inited&&c)g(h)?b=e=!0:(j.push(h),f(h));else if(!a.inited&&a.fetched&&m.isDefine&&(b=!0,!m.prefix))return d=!1});if(c&&j.length)return a=F("timeout","Load timeout for modules: "+j,null,j),a.contextName=
        i.contextName,z(a);d&&(n(K,function(a){if(!a.defined){var a=B(a,{}),c={};a&&(C(a,c,{}),A(c,H))}}),A(o,H));if((!c||e)&&b)if((u||da)&&!V)V=setTimeout(function(){V=0;T()},50);U=!1}}function W(a){q(e(a[0],null,!0)).init(a[1],a[2])}function I(a){var a=a.currentTarget||a.srcElement,c=i.onScriptLoad;a.detachEvent&&!S?a.detachEvent("onreadystatechange",c):a.removeEventListener("load",c,!1);c=i.onScriptError;a.detachEvent&&!S||a.removeEventListener("error",c,!1);return{node:a,id:a&&a.getAttribute("data-requiremodule")}}
        var k={waitSeconds:7,baseUrl:"./",paths:{},pkgs:{},shim:{}},o={},X={},D=[],p={},O={},Q={},L=1,N=1,K=[],U,Y,i,P,V;P={require:function(a){return v(a)},exports:function(a){a.usingExports=!0;if(a.map.isDefine)return a.exports=p[a.map.id]={}},module:function(a){return a.module={id:a.map.id,uri:a.map.url,config:function(){return k.config&&k.config[a.map.id]||{}},exports:p[a.map.id]}}};Y=function(a){this.events=X[a.id]||{};this.map=a;this.shim=k.shim[a.id];this.depExports=[];this.depMaps=[];this.depMatched=
            [];this.pluginMaps={};this.depCount=0};Y.prototype={init:function(a,c,b,d){d=d||{};if(!this.inited){this.factory=c;if(b)this.on("error",b);else this.events.error&&(b=s(this,function(a){this.emit("error",a)}));n(a,s(this,function(a,c){typeof a==="string"&&(a=e(a,this.map.isDefine?this.map:this.map.parentMap,!1,!0),this.depMaps.push(a));var d=P[a.id];d?this.depExports[c]=d(this):(this.depCount+=1,t(a,"defined",s(this,function(a){this.defineDep(c,a);this.check()})),b&&t(a,"error",b))}));this.inited=
            !0;this.ignore=d.ignore;d.enabled||this.enabled?this.enable():this.check()}},defineDepById:function(a,c){var b;n(this.depMaps,function(c,d){if(c.id===a)return b=d,!0});return this.defineDep(b,c)},defineDep:function(a,c){this.depMatched[a]||(this.depMatched[a]=!0,this.depCount-=1,this.depExports[a]=c)},fetch:function(){if(!this.fetched)this.fetched=!0,i.startTime=(new Date).getTime(),this.map.prefix?this.callPlugin():this.shim?v(this,!0)(this.shim.deps||[],s(this,function(){this.load()})):this.load()},
            load:function(){var a=this.map.url;Q[a]||(Q[a]=!0,i.load(this.map.id,a))},check:function(a){if(this.enabled){var c=this.map.id,b=this.depExports,d=this.exports,e=this.factory,m;if(this.inited)if(this.error)this.emit("error",this.error);else{if(!this.defining){this.defining=!0;if(this.depCount<1&&!this.defined){if(w(e)){if(this.events.error)try{d=i.execCb(c,e,b,d)}catch(h){m=h}else d=i.execCb(c,e,b,d);if(this.map.isDefine)if((b=this.module)&&b.exports!==void 0&&b.exports!==this.exports)d=b.exports;
            else if(d===void 0&&this.usingExports)d=this.exports;if(m)return m.requireMap=this.map,m.requireModules=[this.map.id],m.requireType="define",z(this.error=m)}else d=e;this.exports=d;if(this.map.isDefine&&!this.ignore&&(p[c]=d,l.onResourceLoad))l.onResourceLoad(i,this.map,this.depMaps);delete o[c];this.defined=!0;i.waitCount-=1;i.waitCount===0&&(K=[])}this.defining=!1;if(!a&&this.defined&&!this.defineEmitted)this.defineEmitted=!0,this.emit("defined",this.exports),this.defineEmitComplete=!0}}else this.fetch()}},
            callPlugin:function(){var a=this.map,c=a.id,b=e(a.prefix,null,!1,!0);t(b,"defined",s(this,function(b){var j=this.map.name,m=this.map.parentMap?this.map.parentMap.name:null;if(this.map.unnormalized){if(b.normalize&&(j=b.normalize(j,function(a){return d(a,m,!0)})||""),b=e(a.prefix+"!"+j),t(b,"defined",s(this,function(a){this.init([],function(){return a},null,{enabled:!0,ignore:!0})})),b=o[b.id]){if(this.events.error)b.on("error",s(this,function(a){this.emit("error",a)}));b.enable()}}else j=s(this,function(a){this.init([],
                function(){return a},null,{enabled:!0})}),j.error=s(this,function(a){this.inited=!0;this.error=a;a.requireModules=[c];A(o,function(a){a.map.id.indexOf(c+"_unnormalized")===0&&y(a.map.id)});z(a)}),j.fromText=function(a,c){var b=J;b&&(J=!1);l.exec(c);b&&(J=!0);i.completeLoad(a)},b.load(a.name,v(a.parentMap,!0,function(a,c){return i.require(a,c)}),j,k)}));i.enable(b,this);this.pluginMaps[b.id]=b},enable:function(){this.enabled=!0;if(!this.waitPushed)K.push(this),i.waitCount+=1,this.waitPushed=!0;n(this.depMaps,
                s(this,function(a){var c=a.id,b=o[c];!P[c]&&b&&!b.enabled&&i.enable(a,this)}));A(this.pluginMaps,s(this,function(a){var c=o[a.id];c&&!c.enabled&&i.enable(a,this)}));this.check()},on:function(a,c){var b=this.events[a];b||(b=this.events[a]=[]);b.push(c)},emit:function(a,c){n(this.events[a],function(a){a(c)});a==="error"&&delete this.events[a]}};return i={config:k,contextName:b,registry:o,defined:p,urlMap:O,urlFetched:Q,waitCount:0,defQueue:D,Module:Y,makeModuleMap:e,configure:function(a){a.baseUrl&&
            a.baseUrl.charAt(a.baseUrl.length-1)!=="/"&&(a.baseUrl+="/");var c=k.paths,b=k.pkgs,d=k.shim,e=k.map||{};R(k,a,!0);R(c,a.paths,!0);k.paths=c;if(a.map)R(e,a.map,!0),k.map=e;if(a.shim)A(a.shim,function(a,c){E(a)&&(a={deps:a});if(a.exports&&!a.exports.__buildReady)a.exports=i.makeShimExports(a.exports);d[c]=a}),k.shim=d;if(a.packages)n(a.packages,function(a){a=typeof a==="string"?{name:a}:a;b[a.name]={name:a.name,location:a.location||a.name,main:(a.main||"main").replace(ka,"").replace(ca,"")}}),k.pkgs=
            b;if(a.deps||a.callback)i.require(a.deps||[],a.callback)},makeShimExports:function(a){var c;return typeof a==="string"?(c=function(){return $(a)},c.exports=a,c):function(){return a.apply(Z,arguments)}},requireDefined:function(a,c){var b=e(a,c,!1,!0).id;return p.hasOwnProperty(b)},requireSpecified:function(a,c){a=e(a,c,!1,!0).id;return p.hasOwnProperty(a)||o.hasOwnProperty(a)},require:function(a,c,d,f){var g;if(typeof a==="string"){if(w(c))return z(F("requireargs","Invalid require call"),d);if(l.get)return l.get(i,
            a,c);a=e(a,c,!1,!0);a=a.id;return!p.hasOwnProperty(a)?z(F("notloaded",'Module name "'+a+'" has not been loaded yet for context: '+b)):p[a]}d&&!w(d)&&(f=d,d=void 0);c&&!w(c)&&(f=c,c=void 0);for(x();D.length;)if(g=D.shift(),g[0]===null)return z(F("mismatch","Mismatched anonymous define() module: "+g[g.length-1]));else W(g);q(e(null,f)).init(a,c,d,{enabled:!0});T();return i.require},undef:function(a){var c=e(a,null,!0),b=o[a];delete p[a];delete O[a];delete Q[c.url];delete X[a];if(b){if(b.events.defined)X[a]=
            b.events;y(a)}},enable:function(a){o[a.id]&&q(a).enable()},completeLoad:function(a){var c=k.shim[a]||{},b=c.exports&&c.exports.exports,d,e;for(x();D.length;){e=D.shift();if(e[0]===null){e[0]=a;if(d)break;d=!0}else e[0]===a&&(d=!0);W(e)}e=o[a];if(!d&&!p[a]&&e&&!e.inited)if(k.enforceDefine&&(!b||!$(b)))if(g(a))return;else return z(F("nodefine","No define call for "+a,null,[a]));else W([a,c.deps||[],c.exports]);T()},toUrl:function(a,c){var b=a.lastIndexOf("."),d=null;b!==-1&&(d=a.substring(b,a.length),
            a=a.substring(0,b));return i.nameToUrl(a,d,c)},nameToUrl:function(a,c,b){var e,f,g,h,i,a=d(a,b&&b.id,!0);if(l.jsExtRegExp.test(a))c=a+(c||"");else{e=k.paths;f=k.pkgs;b=a.split("/");for(h=b.length;h>0;h-=1)if(i=b.slice(0,h).join("/"),g=f[i],i=e[i]){E(i)&&(i=i[0]);b.splice(0,h,i);break}else if(g){a=a===g.name?g.location+"/"+g.main:g.location;b.splice(0,h,a);break}c=b.join("/")+(c||".js");c=(c.charAt(0)==="/"||c.match(/^[\w\+\.\-]+:/)?"":k.baseUrl)+c}return k.urlArgs?c+((c.indexOf("?")===-1?"?":"&")+
            k.urlArgs):c},load:function(a,b){l.load(i,a,b)},execCb:function(a,b,d,e){return b.apply(e,d)},onScriptLoad:function(a){if(a.type==="load"||ma.test((a.currentTarget||a.srcElement).readyState))G=null,a=I(a),i.completeLoad(a.id)},onScriptError:function(a){var b=I(a);if(!g(b.id))return z(F("scripterror","Script error",a,[b.id]))}}}};l({});ba(l,v._);if(u&&(t=x.head=document.getElementsByTagName("head")[0],B=document.getElementsByTagName("base")[0]))t=x.head=B.parentNode;l.onError=function(b){throw b;};
    l.load=function(b,d,f){var g=b&&b.config||{},e;if(u)return e=g.xhtml?document.createElementNS("http://www.w3.org/1999/xhtml","html:script"):document.createElement("script"),e.type=g.scriptType||"text/javascript",e.charset="utf-8",e.setAttribute("data-requirecontext",b.contextName),e.setAttribute("data-requiremodule",d),e.attachEvent&&!(e.attachEvent.toString&&e.attachEvent.toString().indexOf("[native code")<0)&&!S?(J=!0,e.attachEvent("onreadystatechange",b.onScriptLoad)):(e.addEventListener("load",
        b.onScriptLoad,!1),e.addEventListener("error",b.onScriptError,!1)),e.src=f,H=e,B?t.insertBefore(e,B):t.appendChild(e),H=null,e;else da&&(importScripts(f),b.completeLoad(d))};u&&L(document.getElementsByTagName("script"),function(b){if(!t)t=b.parentNode;if(y=b.getAttribute("data-main")){if(!q.baseUrl)C=y.split("/"),N=C.pop(),ea=C.length?C.join("/")+"/":"./",q.baseUrl=ea,y=N.replace(ca,"");q.deps=q.deps?q.deps.concat(y):[y];return!0}});define=function(b,d,f){var g,e;typeof b!=="string"&&(f=d,d=b,b=null);
        E(d)||(f=d,d=[]);!d.length&&w(f)&&f.length&&(f.toString().replace(ia,"").replace(ja,function(b,e){d.push(e)}),d=(f.length===1?["require"]:["require","exports","module"]).concat(d));if(J&&(g=H||ha()))b||(b=g.getAttribute("data-requiremodule")),e=v[g.getAttribute("data-requirecontext")];(e?e.defQueue:M).push([b,d,f])};define.amd={jQuery:!0};l.exec=function(b){return eval(b)};l(q)}})(this);

/*
 * Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 *
 * Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 *
 * Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to dateFormat.masks.default.
 */

var dateFormat=function(){var token=/d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,timezone=/\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,timezoneClip=/[^-+\dA-Z]/g,pad=function(val,len){val=String(val);len=len||2;while(val.length<len)val="0"+val;return val;};return function(date,mask,utc){var dF=dateFormat;if(arguments.length==1&&Object.prototype.toString.call(date)=="[object String]"&&!/\d/.test(date)){mask=date;date=undefined;}
date=date?new Date(date):new Date;if(isNaN(date))throw SyntaxError("invalid date");mask=String(dF.masks[mask]||mask||dF.masks["default"]);if(mask.slice(0,4)=="UTC:"){mask=mask.slice(4);utc=true;}
var _=utc?"getUTC":"get",d=date[_+"Date"](),D=date[_+"Day"](),m=date[_+"Month"](),y=date[_+"FullYear"](),H=date[_+"Hours"](),M=date[_+"Minutes"](),s=date[_+"Seconds"](),L=date[_+"Milliseconds"](),o=utc?0:date.getTimezoneOffset(),flags={d:d,dd:pad(d),ddd:dF.i18n.dayNames[D],dddd:dF.i18n.dayNames[D+7],m:m+1,mm:pad(m+1),mmm:dF.i18n.monthNames[m],mmmm:dF.i18n.monthNames[m+12],yy:String(y).slice(2),yyyy:y,h:H%12||12,hh:pad(H%12||12),H:H,HH:pad(H),M:M,MM:pad(M),s:s,ss:pad(s),l:pad(L,3),L:pad(L>99?Math.round(L/10):L),t:H<12?"a":"p",tt:H<12?"am":"pm",T:H<12?"A":"P",TT:H<12?"AM":"PM",Z:utc?"UTC":(String(date).match(timezone)||[""]).pop().replace(timezoneClip,""),o:(o>0?"-":"+")+pad(Math.floor(Math.abs(o)/60)*100+Math.abs(o)%60,4),S:["th","st","nd","rd"][d%10>3?0:(d%100-d%10!=10)*d%10]};return mask.replace(token,function($0){return $0 in flags?flags[$0]:$0.slice(1,$0.length-1);});};}();dateFormat.masks={"default":"ddd mmm dd yyyy HH:MM:ss",shortDate:"m/d/yy",mediumDate:"mmm d, yyyy",twitterDate:"d mmm",longDate:"mmmm d, yyyy",fullDate:"dddd, mmmm d, yyyy",shortTime:"h:MM TT",mediumTime:"h:MM:ss TT",longTime:"h:MM:ss TT Z",isoDate:"yyyy-mm-dd",isoTime:"HH:MM:ss",isoDateTime:"yyyy-mm-dd'T'HH:MM:ss",isoUtcDateTime:"UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"};dateFormat.i18n={dayNames:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],monthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","January","February","March","April","May","June","July","August","September","October","November","December"]};Date.prototype.format=function(mask,utc){return dateFormat(this,mask,utc);};

/*
 * JavaScript Pretty Date
 * Copyright (c) 2011 John Resig (ejohn.org)
 * Licensed under the MIT and GPL licenses.
 */

// Takes an ISO time and returns a string representing how
// long ago the date represents.
function prettyDate(time){
    var date = new Date((time || "").replace(/-/g,"/").replace(/[TZ]/g," ")),
        diff = (((new Date()).getTime() - date.getTime()) / 1000),
        day_diff = Math.floor(diff / 86400);

//    if ( isNaN(day_diff) || day_diff < 0 || day_diff >= 31 )
//        return;
    if ( isNaN(day_diff) || day_diff < 0 || day_diff >= 1 )
        return;

    return day_diff == 0 && (
        diff < 60 && "just now" ||
            diff < 120 && "1 minute ago" ||
            diff < 3600 && Math.floor( diff / 60 ) + " minutes ago" ||
            diff < 7200 && "1 hour ago" ||
            diff < 86400 && Math.floor( diff / 3600 ) + " hours ago")/* ||
        day_diff == 1 && "Yesterday" ||
        day_diff < 7 && day_diff + " days ago" ||
        day_diff < 31 && Math.ceil( day_diff / 7 ) + " weeks ago"*/;
}

// If jQuery is included in the page, adds a jQuery plugin to handle it as well
if ( typeof jQuery != "undefined" )
    jQuery.fn.prettyDate = function(){
        return this.each(function(){
            var date = prettyDate(this.title);
            if ( date )
                jQuery(this).text( date );
        });
    };

/* Modernizr 2.8.1 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-rgba-cssgradients-csstransitions-touch-printshiv-cssclasses-teststyles-testprop-testallprops-prefixes-domprefixes-load
 */
;window.Modernizr=function(a,b,c){function z(a){j.cssText=a}function A(a,b){return z(m.join(a+";")+(b||""))}function B(a,b){return typeof a===b}function C(a,b){return!!~(""+a).indexOf(b)}function D(a,b){for(var d in a){var e=a[d];if(!C(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function E(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:B(f,"function")?f.bind(d||b):f}return!1}function F(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+o.join(d+" ")+d).split(" ");return B(b,"string")||B(b,"undefined")?D(e,b):(e=(a+" "+p.join(d+" ")+d).split(" "),E(e,b,c))}var d="2.8.0",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l={}.toString,m=" -webkit- -moz- -o- -ms- ".split(" "),n="Webkit Moz O ms",o=n.split(" "),p=n.toLowerCase().split(" "),q={},r={},s={},t=[],u=t.slice,v,w=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},x={}.hasOwnProperty,y;!B(x,"undefined")&&!B(x.call,"undefined")?y=function(a,b){return x.call(a,b)}:y=function(a,b){return b in a&&B(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=u.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(u.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(u.call(arguments)))};return e}),q.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:w(["@media (",m.join("touch-enabled),("),h,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c},q.rgba=function(){return z("background-color:rgba(150,255,150,.5)"),C(j.backgroundColor,"rgba")},q.cssgradients=function(){var a="background-image:",b="gradient(linear,left top,right bottom,from(#9f9),to(white));",c="linear-gradient(left top,#9f9, white);";return z((a+"-webkit- ".split(" ").join(b+a)+m.join(c+a)).slice(0,-a.length)),C(j.backgroundImage,"gradient")},q.csstransitions=function(){return F("transition")};for(var G in q)y(q,G)&&(v=G.toLowerCase(),e[v]=q[G](),t.push((e[v]?"":"no-")+v));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)y(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},z(""),i=k=null,e._version=d,e._prefixes=m,e._domPrefixes=p,e._cssomPrefixes=o,e.testProp=function(a){return D([a])},e.testAllProps=F,e.testStyles=w,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+t.join(" "):""),e}(this,this.document),function(a,b){function l(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function m(){var a=s.elements;return typeof a=="string"?a.split(" "):a}function n(a){var b=j[a[h]];return b||(b={},i++,a[h]=i,j[i]=b),b}function o(a,c,d){c||(c=b);if(k)return c.createElement(a);d||(d=n(c));var g;return d.cache[a]?g=d.cache[a].cloneNode():f.test(a)?g=(d.cache[a]=d.createElem(a)).cloneNode():g=d.createElem(a),g.canHaveChildren&&!e.test(a)&&!g.tagUrn?d.frag.appendChild(g):g}function p(a,c){a||(a=b);if(k)return a.createDocumentFragment();c=c||n(a);var d=c.frag.cloneNode(),e=0,f=m(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function q(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return s.shivMethods?o(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+m().join().replace(/\w+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(s,b.frag)}function r(a){a||(a=b);var c=n(a);return s.shivCSS&&!g&&!c.hasCSS&&(c.hasCSS=!!l(a,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),k||q(a,c),a}function w(a){var b,c=a.getElementsByTagName("*"),d=c.length,e=RegExp("^(?:"+m().join("|")+")$","i"),f=[];while(d--)b=c[d],e.test(b.nodeName)&&f.push(b.applyElement(x(b)));return f}function x(a){var b,c=a.attributes,d=c.length,e=a.ownerDocument.createElement(u+":"+a.nodeName);while(d--)b=c[d],b.specified&&e.setAttribute(b.nodeName,b.nodeValue);return e.style.cssText=a.style.cssText,e}function y(a){var b,c=a.split("{"),d=c.length,e=RegExp("(^|[\\s,>+~])("+m().join("|")+")(?=[[\\s,>+~#.:]|$)","gi"),f="$1"+u+"\\:$2";while(d--)b=c[d]=c[d].split("}"),b[b.length-1]=b[b.length-1].replace(e,f),c[d]=b.join("}");return c.join("{")}function z(a){var b=a.length;while(b--)a[b].removeNode()}function A(a){function g(){clearTimeout(d._removeSheetTimer),b&&b.removeNode(!0),b=null}var b,c,d=n(a),e=a.namespaces,f=a.parentWindow;return!v||a.printShived?a:(typeof e[u]=="undefined"&&e.add(u),f.attachEvent("onbeforeprint",function(){g();var d,e,f,h=a.styleSheets,i=[],j=h.length,k=Array(j);while(j--)k[j]=h[j];while(f=k.pop())if(!f.disabled&&t.test(f.media)){try{d=f.imports,e=d.length}catch(m){e=0}for(j=0;j<e;j++)k.push(d[j]);try{i.push(f.cssText)}catch(m){}}i=y(i.reverse().join("")),c=w(a),b=l(a,i)}),f.attachEvent("onafterprint",function(){z(c),clearTimeout(d._removeSheetTimer),d._removeSheetTimer=setTimeout(g,500)}),a.printShived=!0,a)}var c="3.7.0",d=a.html5||{},e=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,f=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,g,h="_html5shiv",i=0,j={},k;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",g="hidden"in a,k=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){g=!0,k=!0}})();var s={elements:d.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:c,shivCSS:d.shivCSS!==!1,supportsUnknownElements:k,shivMethods:d.shivMethods!==!1,type:"default",shivDocument:r,createElement:o,createDocumentFragment:p};a.html5=s,r(b);var t=/^$|\b(?:all|print)\b/,u="html5shiv",v=!k&&function(){var c=b.documentElement;return typeof b.namespaces!="undefined"&&typeof b.parentWindow!="undefined"&&typeof c.applyElement!="undefined"&&typeof c.removeNode!="undefined"&&typeof a.attachEvent!="undefined"}();s.type+=" print",s.shivPrint=A,A(b)}(this,document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};

/**
* cleanPath String Prototype // 2010.10.21
*
* A method to return only the path portion of a url string.  Needed since .pathname is handled differently in different browsers.
* Required by $.xBrowserAjax()
*
* @param prepend Prepend the path returned with value(s) given.
* @param append Append the path returned with value(s) given.
* @author Matthew.Marcus
*/
String.prototype.cleanPath = function(prepend, append) {

    var url = String(this);
	var urlcomponents;

	urlcomponents = url.split('/');

    if (url.indexOf('http://') !== -1)
		urlcomponents = urlcomponents.slice(3, urlcomponents.length + 1);
	else
		urlcomponents = urlcomponents.slice(1, urlcomponents.length + 1);

    url = urlcomponents.join('/');

	if(prepend)
		url = prepend + url;
	if(append)
		url = url + append;

	return url;
};

/* global vars */
$nflcs.scriptIncludes = [];
if(!nflcsAssetPath) {
    var nflcsAssetPath = '';
}

/* ==================================================================
jQuery Extensions
================================================================== */

$nflcs.extend({
	xDomainAjaxSettings: {
		baseUrl: false,
		proxyPath: false
	},
    /**
     * $nflcs.xDomainAjax() || Ajax Wrapper for X-domain data transfers. Requires jquery.md5.js & jquery.ba-urlinternal.min.js
     *
     * @param options || Same options object that would normally be passed to $nflcs.ajax()
     * @author Matthew.Marcus
     */
	xDomainAjax: function(options){
		var logMsg = 'Using vanilla $nflcs.ajax() transfer request';
		if($nflcs.xDomainAjaxSettings.baseUrl !== false){
			var proxyUrl = $nflcs.xDomainAjaxSettings.baseUrl + $nflcs.xDomainAjaxSettings.proxyPath,
				modContainer = $nflcs('<div class="modify-container" style="display:none;">');
			//Create a DOM element container so we can modify the html returned from the proxy within the context of the DOM.
			$nflcs('body').append(modContainer);

			logMsg = 'Using X-domain transfer request.';
			options.dataType = 'jsonp';

			//Build new url for jsonp proxy
			if(options.url[0] !== '/')
				proxyUrl += '?dataUrl=' + $nflcs.xDomainAjaxSettings.baseUrl  + options.url.cleanPath('/');
			else
				proxyUrl += '?dataUrl=' + $nflcs.xDomainAjaxSettings.baseUrl  + options.url;

			options.url = proxyUrl;

			options.jsonpCallback = 'jsonp' + $nflcs.md5(options.url);

			//Store the original $nflcs.ajax() success callback so we can replace it with a call back that will return HTML instead of the jsonp that we're fetching.
			var origSuccess = options.success;

			options.success = function(data){
				var htmlBlock = data.result,
					anchors,
					$myhtml = $nflcs("<div>");

				$myhtml.append(htmlBlock);
				anchors = $nflcs('a:urlInternal', $myhtml); //Get only relative paths from the response

				//Modify all relative paths to prepend them with the baseUrl
				anchors.each(function(){
          if($nflcs(this).attr('href').indexOf('http://') == -1){
            var path = this.pathname;
            if(path !== null && path !== undefined)
              $nflcs(this).attr('href', $nflcs.xDomainAjaxSettings.baseUrl + path.cleanPath('/'));
          }
				});

				//Pass the html in the modify-container div back to the module making the x-domain request.
				origSuccess($myhtml.html());
			};
		}
		//console.log(logMsg);
		$nflcs.ajax(options);
	},

    /**
     * $nflcs.xDomainRequest() || Ajax Wrapper for X-domain json data transfers (non jsonp), which checks for xDomainRequest for IE
     *
     * @param options || Same options object that would normally be passed to $nflcs.ajax()
     * @author Chris Welch
     */
    xDomainRequest: function(options)
    {
        if( options.url )
        {
            if (window.XDomainRequest)
            {
                var xdr = new XDomainRequest();
                xdr.open("get", options.url);
                xdr.onload = function(){
                    var data = xdr.responseText;
                    if( options.dataType.toLowerCase() == "json")
                        data = $nflcs.parseJSON(data);

                    if( options.complete )
                        options.complete();
                    else if( options.success )
                        options.success(data);
                };
                xdr.onprogress = function(){ };
                xdr.ontimeout = function(){ };
                xdr.onerror = options.error || function(){ };
                xdr.send();
            }
            else
            {
                $nflcs.ajax(options);
            }
        }
    },

    /**
     * Extends the getScript function of jQuery to support caching of javascript files. By default it implements a cache buster.
     *
     * @param url
     * @param callback
     * @param usecache
     * @author Dmitry.Erman
     */
    getScript: function(url, callback, usecache)
    {
        // Don't reload existing scripts
        if($nflcs.scriptIncludes.toString().indexOf(url) >= 0) {
            //we still need to trigger the callback
            if (callback) callback.apply(document);
        } else {
            var cb = callback;
            return $nflcs.ajax({
                type: "GET",
                url: url,
                data: null,
                success: function() {
                    $nflcs.scriptIncludes.push(url);
                    if (callback) {
                        cb.apply(document);
                    }
                },
                dataType: "script",
                cache : (usecache) ? usecache : true
            });
        }
    },

    chainLoad: function(arscripts, callback, usecache)
    {
        var el = arscripts.shift();
        var cb = (arscripts.length == 0)? true : false;
        if (el && cb) {
            $nflcs.getScript(el, callback, usecache);
        }
        else
        {
            if (el) {
                $nflcs.getScript(el, function(){
                    $nflcs.chainLoad(arscripts, callback, usecache);
                }, usecache);
            }
        }
    },

    ns: function(ns, data)
    {
        var root = window;

        if ((typeof(ns)) == "string")
        {
            var nsParts = ns.split(".");
            for (var i = 0; i < nsParts.length; i++)
            {
                if (typeof root[nsParts[i]] == "undefined")
                    root[nsParts[i]] = new Object();

                root = root[nsParts[i]];
            }
            root.__init = false;
        }else
        {
            if(typeof(ns) == "object")  root = ns;
        }
        if (data)
        {
            $nflcs.extend(root, data);
            root.__init = true;
        }
    },

    nsInit : function(ns, toggle)
    {
        if(toggle != null) ns.__init = toggle;
    },

    /*
     * ns: namespace
     * url: load from file in alternate location(if not specified use current folder and ns as the name of the file)
     * qkey: alias or shortcut name for the names space
     * cb: callback function
     */
    getScriptNS: function(ns, url, qkey, cb)
    {
        //check to see if the script has already been loaded
        if(typeof(window["ns"]) != "undefined" && window["ns"].__init == true) return false;


    },

    __queue: [],

    Queue: function(url, callback, usecache)
    {
        var _request = {
            u : url,
            c : callback,
            o : usecache
        };

        this.__queue.push(_request);

        //attach the execution event to the document ready state
        if(this.__queue.length == 1) $nflcs(document).ready(function(){
            $nflcs._runQueue();
        });
    },

    _runQueue: function()
    {
        var q = this.__queue, r = q.pop();

        while(r)
        {
            this.getScript(r.u, r.c, r.o);
            r = q.pop();
        }
    }
});

/* ==================================================================
Global Inits
================================================================== */
$nflcs(document).ready(function() {
	//Get X-domain jQuery plugin dependancies if needed
	if($nflcs.xDomainAjaxSettings.baseUrl !== false){
		$nflcs.getScript(nflcsAssetPath+'nfl-assets/js/jquery.ba-urlinternal.min.js'); //urlInternal tells us if paths are internal or external x-browser (including IE7)
		$nflcs.getScript(nflcsAssetPath+'nfl-assets/js/jquery.md5.js'); //Needed to allow for caching of x-domain data calls
	}

    if($nflcs("a.gbl-nfl-network-btn").length > 0) nflcs.gbl.mod.LeagueHeader.init($nflcs(".netfooter-content"),$nflcs(".gbl-nfl-network-btn"));    //if there is a show network button load the header code

    // Print
    var printables = [
        '.module .game-roster',
        '.module .depth-chart',
        '.module .events-calendar .events-list-view',
        '.module .event-detail',
        '.module .injuries-large .injuries-large',
        '.module .team-stats',
        '.module .transactions .transactions-large',
        '.module .standings .standings-large',
        '.module .schedule .schedule-large'
    ];
    if( $nflcs( printables.join(',') ).size() > 0 ) {
        $nflcs('.iw_component').each(function() {
            if( $nflcs(this).find( printables.join(',') ).size() > 0 )
                $nflcs(this).addClass('printme');
            else
                $nflcs(this).addClass('dontprintme');
        });
    }

    nflcs.gbl.mod.pluck.init();

});

/* =====================
IWOV Component Resize
====================== */
$nflcs.ns('nflcs.gbl.iwov', {
    htAdjust : function(context) {
        var iw_par = context.closest("div.iw_component");
        $nflcs(iw_par).css("height","auto").css("min-height", "0");
    },
    resize: function() {
        var divs = document.getElementsByTagName('div');

        for (var i=0; i < divs.length; i++) {
          if ('iw_component' == divs[i].className) {

            var hasPercentHeight = false;
            var elts = divs[i].childNodes;

            for (var j=0; !hasPercentHeight && (j<elts.length); j++) {
              if (1 == elts[j].nodeType) {
                var h = elts[j].getAttribute('height') || elts[j].style.height;
                if (-1 != h.indexOf('%')) hasPercentHeight = true;
              }
            }

            if (!hasPercentHeight) {
              var oldStyleHeight = divs[i].style.height;
              var expl = divs[i].offsetHeight;
              //divs[i].style.height = 'auto';
              $nflcs(divs[i]).css("height", "auto").css("min-height", "0");
              var auto = divs[i].offsetHeight;
              if (expl > auto) divs[i].style.height = oldStyleHeight;
            }
          }
        }
    }
});

/* ===================================
Game Day Manager
==================================== */

// Get latest LSD feed and expose it to subscribed Game Day Modules
$nflcs.ns('nflcs.gbl.GameDay.Manager', {
    initialCall : 2000,
    updateFrequency : 10000,
    feedData : null,
    intervalId : null,
    intervalCount : 0,
    callbacks : [],
    gameUrl: null,

    init: function(gameUrl) {

        //console.log('Processing Game:' + gameUrl);
        this.gameUrl = gameUrl;
        setTimeout(this.getFeed, this.initialCall);
        this.intervalId = setInterval(this.getFeed, this.updateFrequency);
    },

    // Register a function to be part of the callbacks
    register: function(f) {
        if($nflcs.inArray(f, this.callbacks) == -1) {
            this.callbacks.push(f);
            //console.log('registered: ' + f.toString().substring(0,25));
        }
    },

    // Deregister function
    unregister: function(f) {
		this.callbacks = $nflcs.grep(this.callbacks, function(item) {
				return f != item;
		});
        //console.log('unregistered: ' + f.toString().substring(0,25));
    },

	// Check for final update
	isFinal: function(phase,fn) {
		if(phase == 'final' || phase == 'final overtime') {
			nflcs.gbl.GameDay.Manager.unregister(fn);
		}
    },

    // Execute all registered callbacks passing it the current updated data
    executeCallbacks: function(data) {
        if(nflcs.gbl.GameDay.Manager.feedData == data) {
            //console.log('Interval [' + nflcs.gbl.GameDay.Manager.intervalCount + ']: No Change');
        } else {
            //console.log('Interval [' + nflcs.gbl.GameDay.Manager.intervalCount + ']: Calling Callbacks');
            nflcs.gbl.GameDay.Manager.feedData = data;
			$nflcs(nflcs.gbl.GameDay.Manager.callbacks).each(function(index, item){
				item(nflcs.gbl.GameDay.Manager.feedData.GameStatus);
			});
            //process unregister requests
			if(nflcs.gbl.GameDay.Manager.callbacks.length == 0) {
				clearInterval(nflcs.gbl.GameDay.Manager.intervalId);
			}
        }
    },

    // Get the feed
    getFeed: function() {
        nflcs.gbl.GameDay.Manager.intervalCount++;

        $nflcs.ajax({
            cache   :   false,
            dataType:   'json',
            url     :   nflcs.gbl.GameDay.Manager.gameUrl,
            success :   nflcs.gbl.GameDay.Manager.executeCallbacks,
            error   :   function(){
                            //console.log('Interval [' + nflcs.gbl.GameDay.Manager.intervalCount + ']: Fail');
                        }
        });
    }
});



/* ===================================
Module includes
==================================== */
// 101 Secondary Nav
$nflcs.ns('nflcs.gbl.mod.SecondNav', {
    init: function(options) {
		if(options){
			if(options.navType == "fly-out"){
				$nflcs.chainLoad([nflcsAssetPath+'nfl-assets/js/jquery.easing.1.3.js', nflcsAssetPath+'nfl-assets/js/101-secondary-nav-flyout.js'], function(options){
					nflcs.gbl.mod.SecondNav.flyoutSectionNav.load(options);
				});
			}
		}
		else{
			$nflcs.chainLoad(
				[
					nflcsAssetPath+'nfl-assets/js/jquery.easing.1.3.js',
					nflcsAssetPath+'nfl-assets/js/101-secondary-nav.js'
				],
				function(){
					nflcs.gbl.mod.SecondNav.load();
				}
			);
		}
	}
});

// 009 Events Calendar
$nflcs.ns('nflcs.gbl.mod.EventsCalendar', {
    init: function() { $nflcs.getScript(nflcsAssetPath+'nfl-assets/js/009-events-calendar.js'); }
});

// 012 Contact Us
$nflcs.ns('nflcs.gbl.mod.ContactUs', {
    init: function() {
        $nflcs.getScript(nflcsAssetPath+'nfl-assets/js/jquery.form.min.js', function() {
            $nflcs.getScript(nflcsAssetPath+'nfl-assets/js/012-contact-us.js');
        });
    }
});

//Is this being used anymore?????
// Request Form
$nflcs.ns('nflcs.gbl.mod.RequestForm', {
    init: function() {
        $nflcs.getScript(nflcsAssetPath+'nfl-assets/js/jquery.form.min.js', function() {
            $nflcs.getScript(nflcsAssetPath+'nfl-assets/js/request-form.js');
        });
    }
});

// TODO: Deprecate after updating polls-ajax
// 013 Polls
$nflcs.ns('nflcs.gbl.mod.Polls', {
    init: function() {
        $nflcs.getScript(nflcsAssetPath+'nfl-assets/js/jquery.form.min.js', function() {
            $nflcs.getScript(nflcsAssetPath+'nfl-assets/js/jquery.cookie.min.js', function () {
                $nflcs.getScript(nflcsAssetPath+'nfl-assets/js/013-polls.js');
                });
        });
    }
});

// 015 Player Stats
$nflcs.ns('nflcs.gbl.mod.PlayerStats', {
    init: function() {
        $nflcs.chainLoad([nflcsAssetPath+'nfl-assets/js/jquery.form.min.js',
            nflcsAssetPath+'nfl-assets/js/jquery.ui.core.min.js',
            nflcsAssetPath+'nfl-assets/js/jquery.ui.widget.min.js',
            nflcsAssetPath+'nfl-assets/js/jquery.ui.tabs.min.js',
            nflcsAssetPath+'nfl-assets/js/jquery.tablesorter.min.js',
            nflcsAssetPath+'nfl-assets/js/015-player-stats.js'], '', true);
    }
});

// 018 Content List
$nflcs.ns('nflcs.gbl.mod.ContentListDynamic', {
    init: function() { $nflcs.getScript(nflcsAssetPath+'nfl-assets/js/jquery.form.min.js', function() {
        $nflcs.getScript(nflcsAssetPath+'nfl-assets/js/018-content-list-dynamic.js');
    });
    }
});

//018 Pagination
$nflcs.ns('nflcs.gbl.mod.Pagination', {
    init: function(pid, resultContainer, serviceUrl, options) {
        $nflcs.getScript(nflcsAssetPath+'nfl-assets/js/jquery.pagination.js', function() {
            $nflcs.getScript(nflcsAssetPath+'nfl-assets/js/018-pagination.js', function(){nflcs.mod.Pager.load(pid, resultContainer, serviceUrl, options);});
        });
    }
});

// 022 Photo Gallery
$nflcs.ns('nflcs.gbl.mod.PhotoGallery', {
    init: function() {
        $nflcs.getScript(nflcsAssetPath+'nfl-assets/js/jquery.jcarousel.min.js', function() {
            $nflcs.getScript(nflcsAssetPath+'nfl-assets/js/022-photo-gallery.js');
        });
    }
});

// 023 More Photos
$nflcs.ns('nflcs.gbl.mod.MorePhotos', {
    init: function() {
        $nflcs.getScript(nflcsAssetPath+'nfl-assets/js/jquery.jcarousel.min.js', function() {
            $nflcs.getScript(nflcsAssetPath+'nfl-assets/js/023-more-photos.js');
        });
    }
});

$nflcs.ns('nflcs.gbl.mod.MorePhotosCarousel', {
    init: function(count) {
        nflcs.gbl.mod.MorePhotosCarousel.iNumItemsPerPane = count;
        $nflcs.getScript(nflcsAssetPath+'nfl-assets/js/jquery.jcarousel.min.js', function() {
            $nflcs.getScript(nflcsAssetPath+'nfl-assets/js/023-more-photos-carousel.js');
        });
    }
});

// 025 AV Gallery
//$nflcs.ns('nflcs.gbl.mod.AVGallery', {
//    init: function() {
//        $nflcs.getScript(nflcsAssetPath+'nfl-assets/js/jquery.jcarousel.min.js', function() {
//            $nflcs.getScript(nflcsAssetPath+'nfl-assets/js/025-av-gallery.js');
//        });
//    }
//});

// 02x Media Player
//$nflcs.ns('nflcs.gbl.MediaPlayer', {
//    init: function(options) { $nflcs.getScript(nflcsAssetPath+'nfl-assets/js/02x-media-player.js', function(){nflcs.gbl.MediaPlayer.load(options)}); }
//});
/*$nflcs.ns('nflcs.gbl.MediaPlayer', {
    init: function(options) {
        $nflcs.chainLoad([
            'http://yui.yahooapis.com/3.4.1/build/yui/yui-min.js',
            nflcsAssetPath+'nfl-assets/js/nfl-video/nfl-video.js',
            nflcsAssetPath+'nfl-assets/js/nfl-video-swf/nfl-video-swf.js',
            nflcsAssetPath+'nfl-assets/js/swf-expressinstall/swf-expressinstall.js',
            nflcsAssetPath+'nfl-assets/js/02x-media-player.js'
        ], function() {
            nflcs.gbl.MediaPlayer.load(options);
        }, true);
    }
});*/

// 026 AV More
$nflcs.ns('nflcs.gbl.mod.MoreAV', {
    init: function() {
        $nflcs.getScript(nflcsAssetPath+'nfl-assets/js/jquery.jcarousel.min.js', function() {
            $nflcs.getScript(nflcsAssetPath+'nfl-assets/js/026-more-av.js');
        });
    }
});

// 029 Game Roster
$nflcs.ns('nflcs.gbl.mod.GameRoster', {
    init: function() {
        $nflcs.getScript(nflcsAssetPath+'nfl-assets/js/jquery.form.min.js', function() {
            $nflcs.getScript(nflcsAssetPath+'nfl-assets/js/jquery.tablesorter.min.js', function() {
                $nflcs.getScript(nflcsAssetPath+'nfl-assets/js/029-game-roster.js');
            });
        });
    }
});

// 030 Injuries Report
$nflcs.ns('nflcs.gbl.mod.Injury.Small', {
    init: function() {
        $nflcs.getScript(nflcsAssetPath+'nfl-assets/js/jquery.form.min.js', function() {
            $nflcs.getScript(nflcsAssetPath+'nfl-assets/js/jquery.tablesorter.min.js', function() {
                $nflcs.getScript(nflcsAssetPath+'nfl-assets/js/030-injury-report-small.js');
            });
        });
    }
});
$nflcs.ns('nflcs.gbl.mod.Injury.Large', {
    init: function() {
        $nflcs.getScript(nflcsAssetPath+'nfl-assets/js/jquery.form.min.js', function() {
            $nflcs.getScript(nflcsAssetPath+'nfl-assets/js/jquery.tablesorter.min.js', function() {
                $nflcs.getScript(nflcsAssetPath+'nfl-assets/js/030-injury-report-large.js');
            });
        });
    }
});

// 031 Game Status - PreGame
$nflcs.ns('nflcs.gbl.GameDay.GameStatus.PreGame', {
    init: function(options) {
        if (!nflcs.gbl.GameDay.Manager.intervalId)
            nflcs.gbl.GameDay.Manager.init(options.gameUrl);
        nflcs.gbl.GameDay.GameStatus.PreGame.options = options;
        $nflcs.getScript(nflcsAssetPath+'nfl-assets/js/031-game-status-pregame.js');
    }
});

// 031 Game Status - InGame
$nflcs.ns('nflcs.gbl.GameDay.GameStatus.InGame', {
    init: function(options) {
        if (!nflcs.gbl.GameDay.Manager.intervalId)
            nflcs.gbl.GameDay.Manager.init(options.gameUrl);
        nflcs.gbl.GameDay.GameStatus.InGame.options = options;
        $nflcs.getScript(nflcsAssetPath+'nfl-assets/js/031-game-status-ingame.js');
    }
});

// 031 Game Status - PostGame
$nflcs.ns('nflcs.gbl.GameDay.GameStatus.PostGame', {
    init: function(options) {
        if (!nflcs.gbl.GameDay.Manager.intervalId)
            nflcs.gbl.GameDay.Manager.init(options.gameUrl);
        nflcs.gbl.GameDay.GameStatus.PostGame.options = options;
        $nflcs.getScript(nflcsAssetPath+'nfl-assets/js/031-game-status-postgame.js');
    }
});

$nflcs.ns('nflcs.gbl.GameDay.GameStatus.flashGameDay', {
    init: function(options) {
        //console.log(options.gameUrl);
        if (!nflcs.gbl.GameDay.Manager.intervalId)
            nflcs.gbl.GameDay.Manager.init(options.gameUrl);
            nflcs.gbl.GameDay.GameStatus.flashGameDay.options = options;
            $nflcs.getScript(nflcsAssetPath+'nfl-assets/js/031-game-status-flash.js');

        }
});

function flashGameDayRegister(jsonGameUrl) {
    nflcs.gbl.GameDay.GameStatus.flashGameDay.init({
            gameUrl : jsonGameUrl,
            initialRefresh	:   1000,	// when module first fires, inital wait time
            refreshFrequence    :   15000,	// number of seconds to refresh JSON
            numUpdates          :   0		// zero based
    });

}

// 032 Box Score
$nflcs.ns('nflcs.gbl.GameDay.InGameBoxScore', {
    init: function(options) {
        if (!nflcs.gbl.GameDay.Manager.intervalId)
            nflcs.gbl.GameDay.Manager.init(options.gameUrl);
        nflcs.gbl.GameDay.InGameBoxScore.options = options;
        $nflcs.getScript(nflcsAssetPath+'nfl-assets/js/jquery.tablesorter.min.js', function() {
            $nflcs.getScript(nflcsAssetPath+'nfl-assets/js/032-box-score.js');
        });
    }
});

// 033 Current Drive
$nflcs.ns('nflcs.gbl.GameDay.CurrentDrive', {
    init: function(options) {
        if (!nflcs.gbl.GameDay.Manager.intervalId)
            nflcs.gbl.GameDay.Manager.init(options.gameUrl);
        nflcs.gbl.GameDay.CurrentDrive.options = options;
        $nflcs.getScript(nflcsAssetPath+'nfl-assets/js/033-current-drive.js');
    }
});

// 034 Depth Chart
$nflcs.ns('nflcs.gbl.mod.DepthChart', {
    init: function(options) {
        $nflcs.chainLoad([nflcsAssetPath+'nfl-assets/js/034-depth-chart.js',
            nflcsAssetPath+'nfl-assets/js/jquery.ui.core.min.js',
            nflcsAssetPath+'nfl-assets/js/jquery.ui.widget.min.js',
            nflcsAssetPath+'nfl-assets/js/jquery.ui.tabs.min.js'],
                function() {nflcs.gbl.mod.DepthChart.load(options)}, true);
    }
});

// 040 User Registration Modal Module
$nflcs.ns('nflcs.gbl.mod.Registration', {
    init: function() {
        $nflcs.getScript(nflcsAssetPath+'nfl-assets/js/040-registration.js', function() {
          $nflcs.getScript(nflcsAssetPath+'nfl-assets/js/jquery.form.min.js', function() {
            $nflcs.getScript(nflcsAssetPath+'nfl-assets/js/jquery.cookie.min.js', function(){
                $nflcs.getScript(nflcsAssetPath + 'nfl-assets/js/jquery.meio.mask.js', function() {
                nflcs.mod.Registration.load();});
            });
        });
      });
    }
});

// Update Profile Module
$nflcs.ns('nflcs.gbl.mod.UpdateProfile', {
    init: function(params) {
        $nflcs.getScript(nflcsAssetPath+'nfl-assets/js/update-profile.js', function() {
            nflcs.mod.UpdateProfile.SetFormButtons(params)
        });
    }
});
//041 Centerpiece module
$nflcs.ns('nflcs.gbl.mod.CenterpieceVideo', {
    init: function(params) {
        nflcs.mod.CenterpieceVideo.load(params);
    }
});

$nflcs.ns("nflcs.mod.CenterpieceVideo", {

    /**
     * Executes load of modal audio/video player for Flash and HTML centerpieces
     *
     * @param _params jqModal and CenterpieceVideo settings
     * @author Alvaro.Valdivieso
     */
    load : function(_params) {

        require([nflcsAssetPath + "nfl-assets/js/jqModal.js",
                    nflcomCombinatorAVP,
                     nflcsAssetPath + 'nfl-assets/js/av-player.js'],
            function() {


                $nflcs(_params.container).jqm({
                    ajax: _params.content,
                    toTop:true,
                    trigger: _params.trigger,
                    closeClass: _params.closeClass,
                    onHide: function (h) {
                        /* send call to swf file to continue playing CP */
                        if (_params.playerid) {
                            cpplayer = swfobject.getObjectById(_params.playerid);
                            cpplayer.playChapter();
                        }
                        /* else {
                            $nflcs(_params.context).trigger('animateNext');
                        } */
                        /* Close modal*/
                        //remove the video player to prevent it from playing after the modal is closed
                        if($nflcs(h.vid) && $nflcs(h.vid).data("vp")) $nflcs(h.vid).data("vp").destroy();
                        h.o.remove();
                        h.w.fadeOut(0);
                    },
                    onShow: function () {
                        nflModalPosition(_params);
                    },
                    onLoad: function (h) {

                        //enable the new common video player logic
                        h.vid = $nflcs($nflcs.cleanSelector($nflcs.FeaturesList["avPlayer"].selector), _params.container).get(0);
                        $nflcs.avPlayer.init(h.vid, _params.playerName);

                    }
                });
                $nflcs(_params.container).jqmShow();
            }, true);
    }
});

/**
 * Function for centerpiece modal popup. This is called by the
 * flash player hence no namespacing as flash does not support namespaced url's
 *
 * @param param - the url used to display the content
 * @return void
 */
function createPopup(param) {

      var clipID = param.split("?")[1].split("&")[0].split("=")[1];
      //get the mode eg: video or audio
      var mode = param.split("&")[2];
      var path = "/cda-web/audio-video-modal-module.htm?id=" + clipID + "&" + mode;

      //Call centerpiece video init to load modal and media player
      nflcs.gbl.mod.CenterpieceVideo.init({
          container: "#video-window",
          content: path,
          trigger: "a.cvt",
          closeClass: "jqmClose",
          playerid: "cp-player"
      });

}

// Global close of modal windows
$nflcs.ns('nflcs.gbl.mod.ModalClose', {
    init: function() {$nflcs("a.jqmClose").click(function () { $nflcs(".jqmWindow").jqm().jqmHide();});}
});

// 043 NFL Network
$nflcs.ns('nflcs.gbl.mod.NFLNetwork', {
    init: function() { $nflcs.getScript(nflcsAssetPath+'nfl-assets/js/043-nfl-network.js'); }
});

// 044 Login module
$nflcs.ns('nflcs.gbl.mod.Login', {
    init: function(params) { $nflcs.getScript(nflcsAssetPath+'nfl-assets/js/044-login.js', function(){nflcs.mod.Login.load(params)}); },
    init_buttons: function(params) { $nflcs.getScript(nflcsAssetPath+'nfl-assets/js/044-login.js', function(){nflcs.mod.Login.SetFormButtons(params)}); }
});

// 045 Password module
$nflcs.ns('nflcs.gbl.mod.Password', {
    init: function(params) {
        $nflcs.getScript(nflcsAssetPath+'nfl-assets/js/jquery.form.min.js', function() {
            $nflcs.getScript(nflcsAssetPath+'nfl-assets/js/045-password.js', function(){ nflcs.mod.Password.load(params) });
        } );
    //init: function(params) { $nflcs.getScript(nflcsAssetPath+'nfl-assets/js/045-password.js', function(){ nflcs.mod.Password.load(params) }); },
    //init_buttons: function(params) { $nflcs.getScript(nflcsAssetPath+'nfl-assets/js/044-login.js', function(){nflcs.mod.Password.SetFormButtons(params)});   }
    }
});


// 047 Scoring Summary
$nflcs.ns('nflcs.gbl.GameDay.ScoringSummary', {
    init: function(options) {
        if (!nflcs.gbl.GameDay.Manager.intervalId)
            nflcs.gbl.GameDay.Manager.init(options.gameUrl);
        nflcs.gbl.GameDay.ScoringSummary.options = options;
        $nflcs.getScript(nflcsAssetPath+'nfl-assets/js/047-scoring-summary.js');
    }
});

//048 Cheerleader Roster
$nflcs.ns('nflcs.gbl.mod.CheerleaderRoster', {
    init: function() {
        $nflcs.getScript(nflcsAssetPath+'nfl-assets/js/jquery.form.min.js', function() {
            $nflcs.getScript(nflcsAssetPath+'nfl-assets/js/jquery.tablesorter.min.js', function() {
                $nflcs.getScript(nflcsAssetPath+'nfl-assets/js/048-cheerleader-roster.js');
            });
        });
    }
});

//048 Cheerleader List
$nflcs.ns('nflcs.gbl.mod.CheerleaderList', {
    init: function() { $nflcs.getScript(nflcsAssetPath+'nfl-assets/js/048-cheerleader-cardlist.js'); }
});

//048 Cheerleader Carousel
$nflcs.ns('nflcs.gbl.mod.Cheerleader', {
    init: function() {
        $nflcs.getScript(nflcsAssetPath+'nfl-assets/js/jquery.jcarousel.min.js', function() {
            $nflcs.getScript(nflcsAssetPath+'nfl-assets/js/048-cheerleader-carousel.js');
        });
    }
});

// 050 Video Gallery Browser
$nflcs.ns('nflcs.gbl.AVGalleryBrowser', {
    init: function(options) {
        nflcs.gbl.AVGalleryBrowser.options = options;
        $nflcs.getScript(nflcsAssetPath+'nfl-assets/js/050-av-gallery-browser.js'); }
});

// 051 Audio Gallery Browser
// see AV Gallery Browser

//052 Draft Tracker
$nflcs.ns('nflcs.gbl.mod.DraftTracker', {
    init: function(options) {
        $nflcs.getScript(nflcsAssetPath+'nfl-assets/js/052-draft-tracker.js', function() {
            $nflcs.getScript(nflcsAssetPath+'nfl-assets/js/jquery.timers-1.1.2.js', function(){nflcs.mod.DraftTracker.load(options);});
        });
    }
});

// 054 Change Password module
$nflcs.ns('nflcs.gbl.mod.ChangePassword', {
    init: function(params) {
        $nflcs.getScript(nflcsAssetPath+'nfl-assets/js/jquery.form.min.js', function() {
            $nflcs.getScript(nflcsAssetPath+'nfl-assets/js/054-change-password.js', function(){ nflcs.mod.ChangePassword.load(params) });
        } );
    }
});
// 057 Registration
$nflcs.ns('nflcs.gbl.mod.RegDidYouKnow', {
    init: function() {  $nflcs.getScript(nflcsAssetPath+'nfl-assets/js/057-registration-did-you-know.js');  }
});

// 106 Tabbed
$nflcs.ns('nflcs.gbl.mod.Tabbed', {
    init: function() { $nflcs.getScript(nflcsAssetPath+'nfl-assets/js/106-tabbed.js'); }
});

//NFL Clubs 123 Jump Menu
$nflcs.ns('nflcs.gbl.mod.jumpMenu', {
    init: function() {
            $nflcs.getScript(nflcsAssetPath+'nfl-assets/js/123-jump-menu.js');
        }
    }
);

$nflcs.ns('nflcs.gbl.mod.pluck', {
    init: function() {
        //Remove persona links
        var link = $nflcs(".ForumList_GroupTableLatestContent div a");
        link.click( function () {
            return false;
        });

        var link2 = $nflcs(".DiscussionList_ListTableStarted a");
        link2.click( function () {
            return false;
        });


        var link3 = $nflcs(".DiscussionList_ListTableLatest a");
        link3.click( function () {
            return false;
        });

        var link4 = $nflcs(".Discussion_UserName a");
        link4.click( function () {
            return false;
        });

        var link5 = $nflcs(".ForumMain_SearchTablePosted a");
        link5.click( function () {
            return false;
        });
    }
});


/* ==================================================================
Shared Methods
================================================================== */
// 008 League Header
// @param: options { leagueHeaderId:leagueHeaderId, leagueNavClass:leagueNavClass }
nflcs.gbl.mod.LeagueHeader = new function(){

    function init($source,$trigger) {
        var $container,containerID,footerContents,dataToStore;

        containerID     = 'gbl-hdrnet-mdl';
        $nflcs('body').append('<div style="display:none;" id="' + containerID +'"></div>');         //create a hidden container to fill with footer contents
        $container      = $nflcs('#'+containerID);
        footerContents  = $nflcs('.netfooter-content').html();                                       //get contents of league footer
        $container.html(footerContents);                                                            //fill container with contents

        dataToStore = {
            source      : $source,
            trigger     : $trigger,
            container   : $container
        };
        $trigger.data(dataToStore);
        $container.data(dataToStore);

        //position the box in the middle of the screen
        $trigger.click(function(e) {//bind fadein
            var data, footerHeight, windowHeight, windowWidth, buttonPosition;
            var data = $nflcs(this).data();

            footerWidth         = 980;
            windowWidth         = $nflcs(window).width();                                               //get dimensions of window
            bodyWidth           = $nflcs('.gbl-wrp-1').outerWidth();
            buttonPosition      = $nflcs(this).offset();                                                //get position of the button that was clicked
            data.container.css({
                position        : 'absolute',
                backgroundColor : '#c9c9c9',
                zIndex          : 10000,
                width           : '980px',
                left            : Math.ceil(((windowWidth - footerWidth) / 2))+ 'px',                                    //center the container horizontally
                top             : Math.ceil((buttonPosition.top + (data.trigger.height() / 2)) -(data.source.height() / 2 ) )+ 'px'});
            data.container.fadeIn('fast');
        }); //fade the container in                     //center the container vertically over the button that was clicked
        $container.mouseleave(function() {//bind fadeout
            $(this).data('container').fadeOut('fast');});
    }


    function leagueHeaderLoad(options)
    {
        //options.container.jqmAddClose(options.container);
    }

    function leagueHeaderOpen(options)
    {
        options.container.css("display","none");
        if(options.container.html().length == 0)
            options.source.clone(true).appendTo(options.container);
        var dwidth = document.body.clientWidth;
        var pos = options.trigger.offset();
        var w = options.container.width();
        options.container.css("display", "block");
        options.container.css("position", "absolute");
        options.container.css("z-index", "9990");
        options.container.css("top", ((pos.top) + "px"));
        options.container.css("left", ((dwidth-w)/2) + "px");

    }

    function leagueHeaderClose(hash, options)
    {
        hash.o.remove();
        $nflcs(options.container).css("display", "none");
    }

    // make init public
    return { init:init }
};

$nflcs.ns("nflcs.gbl.mod.TeamHeader.Links", {
    init :function(){
       //console.log("in teamlinks");
       $nflcs.getScript(nflcsAssetPath+'nfl-assets/js/jquery.cookie.min.js', function (){
       if($nflcs.cookie)
       {
           var fanName = $nflcs.cookie("fanName");
           var j_spring = $nflcs.cookie("SPRING_SECURITY_REMEMBER_ME_COOKIE");
           if ((j_spring != null && j_spring != "")) {
               if (fanName != null) {
                   var fanNameCookie = fanName.split("|");
                   //console.log("Fan Name Cookie "+fanNameCookie[1]);

                   $nflcs("#gbl-login-link-div").removeClass("logged-out-link");
                   $nflcs("#gbl-login-link-div").addClass("logged-in-link");
                   $nflcs("#gbl-login-btn").replaceWith("<a title=\"Sign Out\" href=\"javascript:nflcs.gbl.mod.TeamHeader.Links.logout();\"><span>Sign Out</span></a>");

                   $nflcs("#gbl-reg-link-div").removeClass("logged-out-link");
                   $nflcs("#gbl-reg-link-div").addClass("logged-in-link");
                   $nflcs("#gbl-reg-btn").replaceWith("<a title=\"Update Profile\" href=\"/profile.html\"><span>My Profile</span></a>");

                   if(fanNameCookie[1] == "notcomplete") {
                        $nflcs("#gbl-reg-link-div").removeClass("logged-in-link");
                        $nflcs("#gbl-reg-link-div").addClass("profile-nc");
                   }


               }
           }
           else {

               nflcs.gbl.mod.TeamHeader.Links.runLoggedOutInits();
           }
       }
      }, true);

    },
    runLoggedOutInits: function() {
       nflcs.gbl.mod.Login.init({
            container : "#login-window",
            content : "/cda-web/signin.htm",
            form_name : "#form-login",
            btnSubmit : "#btn-login-submit" ,
            btnCancel : "#btn-login-cancel",
            trigger : "a.gbl-login-btn",
            closeClass : "jqmClose",
            modal : true,
            submitAction : "/cda-web/j_spring_security_check"
        });

    },

    logout :function(){
        window.status="Logging " + $nflcs.cookie("fanName") + " out";

        if ($nflcs.cookie){
            $nflcs.cookie("fanName", null, { path: '/' });
            $nflcs.cookie("SPRING_SECURITY_REMEMBER_ME_COOKIE", null, { path: '/' });
            $nflcs.cookie("at", null, { path: '/', domain: document.domain });  //pluck cookie
            this.init();
        }
        var strUrl = document.location.href;
        if (strUrl.indexOf("/profile.htm") > -1) {
            window.location.href="/index.html";
        } else {
            window.location.href=strUrl;
        }

    }
});
//SET POSITION OF ALL MODAL WINDOWS
function nflModalPosition(options)
{
    var dwidth = $nflcs(document).width();
    var w = $nflcs(options.container).width();
    $nflcs(options.container).css("display", "block");
    $nflcs(options.container).css("position", "fixed");
    $nflcs(options.container).css("z-index", "9900");
    $nflcs(options.container).css("top", "22%");
    $nflcs(options.container).css("left", ((dwidth-w)/2) + "px");
}

// Tooltips
$nflcs.ns("nflcs.gbl.ToolTips", {
    init: function(){
        /* General tooltips */
        //console.log("ToolTips::init");

        var gtt = $nflcs('.tooltip');

        //if(gtt.index(this) > -1) {
            gtt.cluetip({
                'cluetipClass'  : 'tooltip',
                'splitTitle'    : '|',
                // 'sticky'        : false,
                'mouseOutClose' : true,
                'dropShadow'    : true,
                'arrows'        : true,
                'waitImage'     : true,
                'closePosition' : 'title',
                'closeText'     : '&nbsp;',
                clickThrough  : true,
                'hoverIntent'   : {
                    'sensitivity'   : 2,
                    'interval'      : 200,
                    'timeout'       : 500
                }
            });
        //}

        /* Player Tooltips */
        var ptt = $nflcs('.player-card-tooltip');

        ptt.cluetip({
            cluetipClass  : 'player-card-tooltip',
            // sticky        : true,
            mouseOutClose : true,
            dropShadow    : true,
            arrows        : true,
            waitImage     : true,
            closePosition : 'title',
            closeText     : '&nbsp;',
            //onActivate    : function(e) { return true; },
            clickThrough  : true,
            hoverIntent   : {
                sensitivity   : 2,
                interval      : 200,
                timeout       : 500
            },

            ajaxProcess   : nflcs.gbl.ToolTips.displayPlayer,
            ajaxSettings    :  {
                dataType : 'json'
            }


        });
       //console.log("ToolTips::init-end");
    },
    displayPlayer: function(data) {
        var $html = $nflcs('<div><h4><span class="position"></span>&nbsp;-&nbsp;#<span class="jersey-number"></span>&nbsp;<span class="last-name"></span>,&nbsp;<span class="first-name"></span></h4><img class="photo" src="' + nflcsAssetPath + 'nfl-assets/img/player-silhouette.png" alt="no player image available" /><dl class="player-card-tooltip-js"></dl></div>');
        $html.children('img').attr('src', data.photo);

        for(var i in data.stats) {
            $html.children('dl').append('<dt>' + i + ':</dt>');
            $html.children('dl').append('<dd>' + data.stats[i] + '</dd>');
        }
        for(var j in data.details)
            $html.children('h4').find('.' + j).html( data.details[i] );

        return $html.html();
    }
});

// Field Validation
// @param: $fields - jQ object of form fields
// @return: {valid:{}, error:[]} - valid field values, error fields
nflcs.gbl.fieldValidate = function ( $fields ) {
    var valid = {}, error = [];

    $fields.each(function() {

        var name, val = "",cbs = [];

        // if element is select...
        if ($nflcs(this).is('select')) {

            // if element is multi-select, get multiple values
            if ($nflcs(this).attr('multiple')) {
                name = $nflcs(this).attr('name');
                val = $nflcs(this).fieldValue();
            }

            // else its a dropdown, get val from option 'selected' element
            else {
                name = $nflcs(this).attr('name');
                val = $nflcs(this).find('option').filter(':selected').val();
            }
        }

        // else get val from this
        else {
            name = $nflcs(this).attr('name');
            val = $nflcs.trim($nflcs(this).val());
        }

        // if element is checkbox
        if( $nflcs(this).is(':checkbox') ) {

            var attrName = $nflcs(this).attr('name'); // get this name attribute
            var $getAllWithAttrName = $nflcs('input[name='+attrName+']:checkbox:checked');
			
            //D-16871 - fix to make sure value for checkbox is a string
            //and not an array.
			if($getAllWithAttrName.length > 0) {
                if($getAllWithAttrName.length > 1)
                {
                    for(i=0;i<$getAllWithAttrName.length;i++) {
                        cbs[cbs.length] = $($getAllWithAttrName[i]).val();
                    }
                    val = cbs.join(',');

                }
				else val = $getAllWithAttrName.val();
			} else { 
				if($nflcs(this).hasClass('isRequired')) {
					error.push(this);
					return;
				} else {
					//checkbox is not required and not checked					
					val = false;
				}
				
			}
            // //val = $getAllWithAttrName.fieldValue();
                    // 
                    // // validate if is required
                    // if ($nflcs(this).hasClass('isRequired')) {
                    //     for (var i=0; i < $getAllWithAttrName.length; i++) if ($getAllWithAttrName[i].checked) counter++;
                    //     if (counter==0) {
                    //         error.push(this);
                    //         return;
                    //     }
                    // }
        }

        // if element is radio
        if( $nflcs(this).is(':radio') && !$nflcs(this).is(':checked') )
            return;

        // if is regular text field
        if( $nflcs(this).hasClass('isRequired') && val == '' ) {
            error.push(this);
            return;
        }

        if( $nflcs(this).hasClass('isEmail') && $nflcs(this).val()!='' && !nflcs.gbl.isValidEmail(val) ) {
            error.push(this);
            return;
        }

        if( $nflcs(this).attr('minlength') && $nflcs(this).attr('minlength') > val.length) {
            error.push(this);
            return;
        }

        if( $nflcs(this).hasClass('isLetters') && $nflcs(this).val()!='' && !nflcs.gbl.isLetters(val) ) {
            error.push(this);
            return;
        }

        if( $nflcs(this).hasClass('isDate') && $nflcs(this).val()!='' && !nflcs.gbl.isDate(val) ) {
            error.push(this);
            return;
        }

        if( $nflcs(this).hasClass('isTelephone') && $nflcs(this).val()!='' && !nflcs.gbl.isTelephone(val) ) {
            error.push(this);
            return;
        }

        if( $nflcs(this).hasClass('isNumeric') && !nflcs.gbl.isNumeric(val) ) {
            error.push(this);
            return;
        }

        valid[name] = val;
    });

    return { 'valid': valid, 'error': error };
};

// Valid Telephone Format
// // matches number of the form (XXX) XXX-XXXX or (XXX)XXX-XXXX
// @return: boolean
nflcs.gbl.isTelephone = function(str) {
    var objRegExp = /^\([1-9]\d{2}\)\s?\d{3}\-\d{4}$/;
    return objRegExp.test(str);
};

// Valid Date Format
// matches 2 digit month, 2 digit day, 4 digit year. Date separator can be ., -, or / like: mm/dd/yyyy or mm-dd-yyyy or mm.dd.yyyy
// @return: boolean
nflcs.gbl.isDate = function(str) {
    var objRegExp = /^\d{1,2}(\-|\/|\.)\d{1,2}\1\d{4}$/;

    if (!objRegExp.test(str)) return false;
    else {
        var strSeparator = str.substring(2,3);
        var arrayDate = str.split(strSeparator);
        //create a lookup for months not equal to Feb.
        var arrayLookup = { '01' : 31,'03' : 31,
                            '04' : 30,'05' : 31,
                            '06' : 30,'07' : 31,
                            '08' : 31,'09' : 30,
                            '10' : 31,'11' : 30,'12' : 31};

        var intDay = parseInt(arrayDate[1],10);

        //check if month value and day value agree
        if(arrayLookup[arrayDate[0]] != null) {
            if(intDay <= arrayLookup[arrayDate[0]] && intDay != 0)
            return true; //found in lookup table, good date
        }

        //check for February
        var intMonth = parseInt(arrayDate[0],10);
        if (intMonth == 2) {
            var intYear = parseInt(arrayDate[2]);
            if (intDay > 0 && intDay < 29) {return true}
            else if (intDay == 29) {
                if ((intYear % 4 == 0) && (intYear % 100 != 0) || (intYear % 400 == 0)) {
                // year div by 4 and ((not div by 100) or div by 400) ->ok
                return true;
                }
            }
        }
    }
    return false;
};



// Valid Letters
// @param: letters - string
// @return: boolean
nflcs.gbl.isLetters = function(str) {
    var objRegExp = /^[a-zA-Z\s]+$/;
    return objRegExp.test(str);
};

// Valid Email
// @param: email - string
// @return: boolean
nflcs.gbl.isValidEmail = function(email) {
    var emails = email.split(','),
        validEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;
    for(var i=0; i<emails.length; i++)
        if(!validEmail.test($nflcs.trim(emails[i])))
            return false;
    return true;
};

// Valid Number
// @param: number
// @return: boolean
nflcs.gbl.isNumeric = function(str) {
    return /^[-+]?[0-9\s]+$/.test(str);
};

// 038  Suggest
nflcs.gbl.mod.searchSuggest=new function(){
    var $autoComplete,searchText,searchFieldId,searchInitLabel,elementPath = '';
    var selectedItem,wordList,listTimeOut,dataSource = null;
    var getNewWordList = true;
    var minNumChar = 0;

    function init(options) {

        if(!options) options = {};

        // Create search config element
        elementPath     = (options.elementPath) ? options.elementPath : '#search form label';
        minNumChar      = (options.minNumChar) ? options.minNumChar : 3;
        searchFieldId   = (options.searchFieldId) ? options.searchFieldId : '#search-text';
        dataSource      = options.dataSource;
        searchInitLabel = (options.searchInitLabel) ? options.searchInitLabel : 'Search Players, Articles, Photos...';

        $autoComplete = $nflcs('<ul class="auto-complete"></ul>').insertAfter(searchFieldId);

        // block empty search string submits
        $nflcs(searchFieldId).bind('submit',function(){
            if ($nflcs(searchFieldId).val() == searchInitLabel) {
                $nflcs(searchFieldId).val('');
                return false;
            }
        });

        // on focus, empty out search input
        $nflcs(searchFieldId).val(searchInitLabel).focus(function(){
            if(this.value == searchInitLabel) { $nflcs(this).val(''); }
        }).blur(function(){
            if(this.value == '') { $nflcs(this).val(searchInitLabel); }
        });

        $nflcs(searchFieldId).attr('autocomplete','off');

        // attach event handlers
        attachEvents(options);
    }

    function attachEvents(options) {

        $nflcs(searchFieldId).bind('keyup',function(e){

            if ($nflcs(searchFieldId).val().length >= minNumChar) {
                if (e.keyCode > 40 || e.keycode == 8) {
                    // keyCode > 40 are special keys
                    // keyCode 8 == backspace

                    // request data and assign mouseover/click events to li elements
                    if (getNewWordList) {
                        makeRequest(options);
                    }else{
                        processWordList();
                    }

                } else if (e.keyCode == 38 && selectedItem !== null ) {
                    // keyCode 38 == up arrow
                    if ($nflcs(selectedItem).prev().length != 0) {
                        setSelectedItem($nflcs(selectedItem).prev());
                    }
                    e.preventDefault();
                    return false;

                } else if (e.keyCode == 40 && selectedItem !== null) {
                    // keyCode 40 == down arrow
                    if ($nflcs(selectedItem).next().length != 0) {
                        setSelectedItem($nflcs(selectedItem).next());
                    }
                    e.preventDefault();
                    return false;

                } else if (e.keyCode == 27 && selectedItem !== null) {
                    // keyCode 27 == escape key
                    setSelectedItem(null);
                }
            } else {
                getNewWordList = true;
                setSelectedItem(null);
            }
        }).bind('keypress',function(e) {
            if (e.keyCode == 13 && selectedItem !== null) {
                // keyCode 13 == enter

                populateSearchField(e,$autoComplete.find('li.selected').text());
                //e.preventDefault();
            }
        });

        $nflcs($autoComplete).bind('mouseleave',function() {
            listTimeOut = setTimeout(function() {
                setSelectedItem(null);
                }, 500);
        }/* ).bind('mouseenter',function(e) {
            if (listTimeOut !== null && (undefined != listTimeOut)) {
                //attachEvents(options);
                clearTimeout(listTimeOut);
            }
        } */);
    }

    function setSelectedItem(item) {
        selectedItem = item;

        $autoComplete.find('li').removeClass('selected');

        if (selectedItem === null) {
            //$autoComplete.hide();
            var suggestions = $nflcs($autoComplete).children();
            $nflcs(suggestions).remove();
            return;
        }else if (selectedItem == 0){
            selectedItem = $autoComplete.find('li').eq(selectedItem);
        }

        $nflcs(selectedItem).addClass('selected');

        if ($nflcs(selectedItem)) { $autoComplete.show(); }
    }

    function makeRequest(options) {
        if(!options) {
            options = {};
        }
        // Create request config element
        dataSource  = options.dataSource;

        $nflcs.ajax({
            'url'       : dataSource,
            'dataType'  : 'json',
            'data'      : {'search-text' : $nflcs(searchFieldId).val()},
            'success'   : function(data) {
                            wordList = data;
                            data = null;
                            processWordList();
                            getNewWordList = false;
            },
            error       : function(){
                            //makeRequest(options);
                        }
        });

    }

    function processWordList(){
        if (wordList && wordList.length > 0) {
            var searchTextPattern = new RegExp('^'+$nflcs(searchFieldId).val(),'i');

            $autoComplete.empty();
            $nflcs.each(wordList,function(index,term) {

                if (searchTextPattern.test(term)) {
                    $nflcs('<li></li>').text(term).appendTo($autoComplete).bind('mouseover',function() {
                        setSelectedItem(this);
                    }).bind('click',populateSearchField);
                }

                if ($autoComplete.find('li') == 0) { setSelectedItem(null); }
            });

            setSelectedItem(0);
        } else {
            setSelectedItem(null);
        }
    }

    function populateSearchField(e,searchText) {
        if (searchText){
        } else if (e) {
            searchText = $nflcs(e.target).text();
        } else {
            return false;
        }

        setSelectedItem(null);
        $nflcs(searchFieldId).val(searchText);
    }

    // make init public
    return { init:init }

};

nflcs.gbl.mod.searchText=new function(){
    var $autoComplete,searchText,searchFieldId,searchInitLabel,elementPath = '';

function init(options) {

        if(!options) options = {};

        // Create search config element
        elementPath     = (options.elementPath) ? options.elementPath : '#search form label';
        searchFieldId   = (options.searchFieldId) ? options.searchFieldId : '#search-text';
        searchInitLabel = (options.searchInitLabel) ? options.searchInitLabel : 'Search Players, Articles, Photos...';

//        $autoComplete = $nflcs('<ul class="auto-complete"></ul>').insertAfter(searchFieldId);

        // block empty search string submits
        $nflcs(searchFieldId).bind('submit',function(){
            if ($nflcs(searchFieldId).val() == searchInitLabel) {
                $nflcs(searchFieldId).val('');
                return false;
            }
        });

        // on focus, empty out search input
        $nflcs(searchFieldId).val(searchInitLabel).focus(function(){
            if(this.value == searchInitLabel) { $nflcs(this).val(''); }
        }).blur(function(){
            if(this.value == '') { $nflcs(this).val(searchInitLabel); }
        });

        $nflcs(searchFieldId).attr('autocomplete','off');

    }

    // make init public
    return { init:init }

};

// Ajax Module Update
//  Updated - 2008-08-06 [Francis]
nflcs.gbl.moduleUpdate = function() {
    var module = $nflcs(this).parents('.module');
    var updateCallback = $nflcs(this).data('updateCallback');


    // Turn the values unique
    var postVals = {};

    var formVals = $nflcs(this).formToArray();
    for(var i in formVals) {
        postVals[formVals[i].name] = formVals[i].value;
    }
    postVals["previewMode"] = "false"; // this ajax request should return a html fragment, not a <html> doc.

    $nflcs.ajax({
        data      : postVals,
        dataType  : 'html',
        url       : $nflcs(this).attr('action'),
        type      : $nflcs(this).attr('method'),
        success   : function(data) {
            module.parent().html(data);
            if(updateCallback) {
                updateCallback();
            }
        },
        error: function(d){
            //console.log("nflcs.gbl.moduleUpdate: " + status + d);
        },
        complete: function(d, status){

            //console.log(d);
            //console.log("nflcs.gbl.moduleUpdate: " + status);
        }
    });

    return(false);
};

nflcs.gbl.returnUriVariable = function(v) {
    var url = document.URL,
        uri_value = "",
        j = url.lastIndexOf('/') + 1,
        k = url.indexOf('?', j) + 1;
    if (0 != k) {
        url = url.substring(k);
        var vars = url.split("&");
        for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            if (pair[0] == v) {
               uri_value = pair[1];
            }
        }
    }
    return uri_value;
};

// Ajax Module Update
//  Added unique polls module update to not update parent module div but div within module (polls-data)
//  Fixes removal of sponsorship upon submit.
nflcs.gbl.pollsModuleUpdate = function() {

    var updateCallback = $nflcs(this).data('updateCallback');


    // Turn the values unique
    var postVals = {};
    var formVals = $nflcs(this).formToArray();
    // Twitter overwrites i in for loop below
    //    for(var i in formVals) {
    for (var i = 0; i < formVals.length; i++) {
        postVals[formVals[i].name] = formVals[i].value;
    }
    postVals["previewMode"] = "false"; // this ajax request should return a html fragment, not a <html> doc.

    $nflcs.ajax({
        data      : postVals,
        dataType  : 'html',
        url       : $nflcs(this).attr('action'),
        type      : $nflcs(this).attr('method'),
        success   : function(data) {
            $nflcs('.polls-data').html(data);
            if(updateCallback) {
                updateCallback();
            }
        },
        complete: function(status){
            //console.log("nflcs.gbl.pollsModuleUpdate: " + status);
        }
    });

    return(false);
};

nflcs.gbl.month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
nflcs.gbl.monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// String method to read parameters from the query string
String.prototype.getParam = function(paramName) {
    var start=this.indexOf("?"+paramName+"=");
    if(start<0) start=this.indexOf("&"+paramName+"=");
    if (start<0) return '';
    start += paramName.length+2;
    var end=this.indexOf("&",start)-1;
    if (end<0) end=this.length;
    var result='';
    for(var i=start;i<=end;i++) {
        var c=this.charAt(i);
        result=result+(c=='+'?' ':c);
    }
    return unescape(result);
};
// String method to truncate strings and add an ellipse
String.prototype.ellipsize = function (maxLength, breakAtWord) {
	if (typeof maxLength == "number" && this.length > maxLength) {
		if (!breakAtWord) {
			return this.substr(0, maxLength - 3) + "...";
		} else {
			return this.substring(0, maxLength).replace(/\w+$/, '') + "...";
		}
	} else {
		return this.toString();
	}
};
//Array filter method for browsers that don't have it (IE:()
if (!Array.prototype.filter)
{
  Array.prototype.filter = function(fun /*, thisp */)
  {
    "use strict";

    if (this == null)
      throw new TypeError();

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun != "function")
      throw new TypeError();

    var res = [];
    var thisp = arguments[1];
    for (var i = 0; i < len; i++)
    {
      if (i in t)
      {
        var val = t[i]; // in case fun mutates this
        if (fun.call(thisp, val, i, t))
          res.push(val);
      }
    }

    return res;
  };
}
//Array indexOf method for browsers that don't have it (IE:()
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
        "use strict";
        if (this == null) {
            throw new TypeError();
        }
        var t = Object(this);
        var len = t.length >>> 0;
        if (len === 0) {
            return -1;
        }
        var n = 0;
        if (arguments.length > 0) {
            n = Number(arguments[1]);
            if (n != n) { // shortcut for verifying if it's NaN
                n = 0;
            } else if (n != 0 && n != Infinity && n != -Infinity) {
                n = (n > 0 || -1) * Math.floor(Math.abs(n));
            }
        }
        if (n >= len) {
            return -1;
        }
        var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
        for (; k < len; k++) {
            if (k in t && t[k] === searchElement) {
                return k;
            }
        }
        return -1;
    }
}

/* SWFObject v2.1 <http://code.google.com/p/swfobject/>
    Copyright (c) 2007-2008 Geoff Stearns, Michael Williams, and Bobby van der Sluis
    This software is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
*/
var swfobject=function(){var b="undefined",Q="object",n="Shockwave Flash",p="ShockwaveFlash.ShockwaveFlash",P="application/x-shockwave-flash",m="SWFObjectExprInst",j=window,K=document,T=navigator,o=[],N=[],i=[],d=[],J,Z=null,M=null,l=null,e=false,A=false;var h=function(){var v=typeof K.getElementById!=b&&typeof K.getElementsByTagName!=b&&typeof K.createElement!=b,AC=[0,0,0],x=null;if(typeof T.plugins!=b&&typeof T.plugins[n]==Q){x=T.plugins[n].description;if(x&&!(typeof T.mimeTypes!=b&&T.mimeTypes[P]&&!T.mimeTypes[P].enabledPlugin)){x=x.replace(/^.*\s+(\S+\s+\S+$)/,"$1");AC[0]=parseInt(x.replace(/^(.*)\..*$/,"$1"),10);AC[1]=parseInt(x.replace(/^.*\.(.*)\s.*$/,"$1"),10);AC[2]=/r/.test(x)?parseInt(x.replace(/^.*r(.*)$/,"$1"),10):0}}else{if(typeof j.ActiveXObject!=b){var y=null,AB=false;try{y=new ActiveXObject(p+".7")}catch(t){try{y=new ActiveXObject(p+".6");AC=[6,0,21];y.AllowScriptAccess="always"}catch(t){if(AC[0]==6){AB=true}}if(!AB){try{y=new ActiveXObject(p)}catch(t){}}}if(!AB&&y){try{x=y.GetVariable("$version");if(x){x=x.split(" ")[1].split(",");AC=[parseInt(x[0],10),parseInt(x[1],10),parseInt(x[2],10)]}}catch(t){}}}}var AD=T.userAgent.toLowerCase(),r=T.platform.toLowerCase(),AA=/webkit/.test(AD)?parseFloat(AD.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,q=false,z=r?/win/.test(r):/win/.test(AD),w=r?/mac/.test(r):/mac/.test(AD);/*@cc_on q=true;@if(@_win32)z=true;@elif(@_mac)w=true;@end@*/return{w3cdom:v,pv:AC,webkit:AA,ie:q,win:z,mac:w}}();var L=function(){if(!h.w3cdom){return }f(H);if(h.ie&&h.win){try{K.write("<script id=__ie_ondomload defer=true src=//:><\/script>");J=C("__ie_ondomload");if(J){I(J,"onreadystatechange",S)}}catch(q){}}if(h.webkit&&typeof K.readyState!=b){Z=setInterval(function(){if(/loaded|complete/.test(K.readyState)){E()}},10)}if(typeof K.addEventListener!=b){K.addEventListener("DOMContentLoaded",E,null)}R(E)}();function S(){if(J.readyState=="complete"){J.parentNode.removeChild(J);E()}}function E(){if(e){return }if(h.ie&&h.win){var v=a("span");try{var u=K.getElementsByTagName("body")[0].appendChild(v);u.parentNode.removeChild(u)}catch(w){return }}e=true;if(Z){clearInterval(Z);Z=null}var q=o.length;for(var r=0;r<q;r++){o[r]()}}function f(q){if(e){q()}else{o[o.length]=q}}function R(r){if(typeof j.addEventListener!=b){j.addEventListener("load",r,false)}else{if(typeof K.addEventListener!=b){K.addEventListener("load",r,false)}else{if(typeof j.attachEvent!=b){I(j,"onload",r)}else{if(typeof j.onload=="function"){var q=j.onload;j.onload=function(){q();r()}}else{j.onload=r}}}}}function H(){var t=N.length;for(var q=0;q<t;q++){var u=N[q].id;if(h.pv[0]>0){var r=C(u);if(r){N[q].width=r.getAttribute("width")?r.getAttribute("width"):"0";N[q].height=r.getAttribute("height")?r.getAttribute("height"):"0";if(c(N[q].swfVersion)){if(h.webkit&&h.webkit<312){Y(r)}W(u,true)}else{if(N[q].expressInstall&&!A&&c("6.0.65")&&(h.win||h.mac)){k(N[q])}else{O(r)}}}}else{W(u,true)}}}function Y(t){var q=t.getElementsByTagName(Q)[0];if(q){var w=a("embed"),y=q.attributes;if(y){var v=y.length;for(var u=0;u<v;u++){if(y[u].nodeName=="DATA"){w.setAttribute("src",y[u].nodeValue)}else{w.setAttribute(y[u].nodeName,y[u].nodeValue)}}}var x=q.childNodes;if(x){var z=x.length;for(var r=0;r<z;r++){if(x[r].nodeType==1&&x[r].nodeName=="PARAM"){w.setAttribute(x[r].getAttribute("name"),x[r].getAttribute("value"))}}}t.parentNode.replaceChild(w,t)}}function k(w){A=true;var u=C(w.id);if(u){if(w.altContentId){var y=C(w.altContentId);if(y){M=y;l=w.altContentId}}else{M=G(u)}if(!(/%$/.test(w.width))&&parseInt(w.width,10)<310){w.width="310"}if(!(/%$/.test(w.height))&&parseInt(w.height,10)<137){w.height="137"}K.title=K.title.slice(0,47)+" - Flash Player Installation";var z=h.ie&&h.win?"ActiveX":"PlugIn",q=K.title,r="MMredirectURL="+j.location+"&MMplayerType="+z+"&MMdoctitle="+q,x=w.id;if(h.ie&&h.win&&u.readyState!=4){var t=a("div");x+="SWFObjectNew";t.setAttribute("id",x);u.parentNode.insertBefore(t,u);u.style.display="none";var v=function(){u.parentNode.removeChild(u)};I(j,"onload",v)}U({data:w.expressInstall,id:m,width:w.width,height:w.height},{flashvars:r},x)}}function O(t){if(h.ie&&h.win&&t.readyState!=4){var r=a("div");t.parentNode.insertBefore(r,t);r.parentNode.replaceChild(G(t),r);t.style.display="none";var q=function(){t.parentNode.removeChild(t)};I(j,"onload",q)}else{t.parentNode.replaceChild(G(t),t)}}function G(v){var u=a("div");if(h.win&&h.ie){u.innerHTML=v.innerHTML}else{var r=v.getElementsByTagName(Q)[0];if(r){var w=r.childNodes;if(w){var q=w.length;for(var t=0;t<q;t++){if(!(w[t].nodeType==1&&w[t].nodeName=="PARAM")&&!(w[t].nodeType==8)){u.appendChild(w[t].cloneNode(true))}}}}}return u}function U(AG,AE,t){var q,v=C(t);if(v){if(typeof AG.id==b){AG.id=t}if(h.ie&&h.win){var AF="";for(var AB in AG){if(AG[AB]!=Object.prototype[AB]){if(AB.toLowerCase()=="data"){AE.movie=AG[AB]}else{if(AB.toLowerCase()=="styleclass"){AF+=' class="'+AG[AB]+'"'}else{if(AB.toLowerCase()!="classid"){AF+=" "+AB+'="'+AG[AB]+'"'}}}}}var AD="";for(var AA in AE){if(AE[AA]!=Object.prototype[AA]){AD+='<param name="'+AA+'" value="'+AE[AA]+'" />'}}v.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+AF+">"+AD+"</object>";i[i.length]=AG.id;q=C(AG.id)}else{if(h.webkit&&h.webkit<312){var AC=a("embed");AC.setAttribute("type",P);for(var z in AG){if(AG[z]!=Object.prototype[z]){if(z.toLowerCase()=="data"){AC.setAttribute("src",AG[z])}else{if(z.toLowerCase()=="styleclass"){AC.setAttribute("class",AG[z])}else{if(z.toLowerCase()!="classid"){AC.setAttribute(z,AG[z])}}}}}for(var y in AE){if(AE[y]!=Object.prototype[y]){if(y.toLowerCase()!="movie"){AC.setAttribute(y,AE[y])}}}v.parentNode.replaceChild(AC,v);q=AC}else{var u=a(Q);u.setAttribute("type",P);for(var x in AG){if(AG[x]!=Object.prototype[x]){if(x.toLowerCase()=="styleclass"){u.setAttribute("class",AG[x])}else{if(x.toLowerCase()!="classid"){u.setAttribute(x,AG[x])}}}}for(var w in AE){if(AE[w]!=Object.prototype[w]&&w.toLowerCase()!="movie"){F(u,w,AE[w])}}v.parentNode.replaceChild(u,v);q=u}}}return q}function F(t,q,r){var u=a("param");u.setAttribute("name",q);u.setAttribute("value",r);t.appendChild(u)}function X(r){var q=C(r);if(q&&(q.nodeName=="OBJECT"||q.nodeName=="EMBED")){if(h.ie&&h.win){if(q.readyState==4){B(r)}else{j.attachEvent("onload",function(){B(r)})}}else{q.parentNode.removeChild(q)}}}function B(t){var r=C(t);if(r){for(var q in r){if(typeof r[q]=="function"){r[q]=null}}r.parentNode.removeChild(r)}}function C(t){var q=null;try{q=K.getElementById(t)}catch(r){}return q}function a(q){return K.createElement(q)}function I(t,q,r){t.attachEvent(q,r);d[d.length]=[t,q,r]}function c(t){var r=h.pv,q=t.split(".");q[0]=parseInt(q[0],10);q[1]=parseInt(q[1],10)||0;q[2]=parseInt(q[2],10)||0;return(r[0]>q[0]||(r[0]==q[0]&&r[1]>q[1])||(r[0]==q[0]&&r[1]==q[1]&&r[2]>=q[2]))?true:false}function V(v,r){if(h.ie&&h.mac){return }var u=K.getElementsByTagName("head")[0],t=a("style");t.setAttribute("type","text/css");t.setAttribute("media","screen");if(!(h.ie&&h.win)&&typeof K.createTextNode!=b){t.appendChild(K.createTextNode(v+" {"+r+"}"))}u.appendChild(t);if(h.ie&&h.win&&typeof K.styleSheets!=b&&K.styleSheets.length>0){var q=K.styleSheets[K.styleSheets.length-1];if(typeof q.addRule==Q){q.addRule(v,r)}}}function W(t,q){var r=q?"visible":"hidden";if(e&&C(t)){C(t).style.visibility=r}else{V("#"+t,"visibility:"+r)}}function g(s){var r=/[\\\"<>\.;]/;var q=r.exec(s)!=null;return q?encodeURIComponent(s):s}var D=function(){if(h.ie&&h.win){window.attachEvent("onunload",function(){var w=d.length;for(var v=0;v<w;v++){d[v][0].detachEvent(d[v][1],d[v][2])}var t=i.length;for(var u=0;u<t;u++){X(i[u])}for(var r in h){h[r]=null}h=null;for(var q in swfobject){swfobject[q]=null}swfobject=null})}}();return{registerObject:function(u,q,t){if(!h.w3cdom||!u||!q){return }var r={};r.id=u;r.swfVersion=q;r.expressInstall=t?t:false;N[N.length]=r;W(u,false)},getObjectById:function(v){var q=null;if(h.w3cdom){var t=C(v);if(t){var u=t.getElementsByTagName(Q)[0];if(!u||(u&&typeof t.SetVariable!=b)){q=t}else{if(typeof u.SetVariable!=b){q=u}}}}return q},embedSWF:function(x,AE,AB,AD,q,w,r,z,AC){if(!h.w3cdom||!x||!AE||!AB||!AD||!q){return }AB+="";AD+="";if(c(q)){W(AE,false);var AA={};if(AC&&typeof AC===Q){for(var v in AC){if(AC[v]!=Object.prototype[v]){AA[v]=AC[v]}}}AA.data=x;AA.width=AB;AA.height=AD;var y={};if(z&&typeof z===Q){for(var u in z){if(z[u]!=Object.prototype[u]){y[u]=z[u]}}}if(r&&typeof r===Q){for(var t in r){if(r[t]!=Object.prototype[t]){if(typeof y.flashvars!=b){y.flashvars+="&"+t+"="+r[t]}else{y.flashvars=t+"="+r[t]}}}}f(function(){U(AA,y,AE);if(AA.id==AE){W(AE,true)}})}else{if(w&&!A&&c("6.0.65")&&(h.win||h.mac)){A=true;W(AE,false);f(function(){var AF={};AF.id=AF.altContentId=AE;AF.width=AB;AF.height=AD;AF.expressInstall=w;k(AF)})}}},getFlashPlayerVersion:function(){return{major:h.pv[0],minor:h.pv[1],release:h.pv[2]}},hasFlashPlayerVersion:c,createSWF:function(t,r,q){if(h.w3cdom){return U(t,r,q)}else{return undefined}},removeSWF:function(q){if(h.w3cdom){X(q)}},createCSS:function(r,q){if(h.w3cdom){V(r,q)}},addDomLoadEvent:f,addLoadEvent:R,getQueryParamValue:function(v){var u=K.location.search||K.location.hash;if(v==null){return g(u)}if(u){var t=u.substring(1).split("&");for(var r=0;r<t.length;r++){if(t[r].substring(0,t[r].indexOf("="))==v){return g(t[r].substring((t[r].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(A&&M){var q=C(m);if(q){q.parentNode.replaceChild(M,q);if(l){W(l,true);if(h.ie&&h.win){M.style.display="block"}}M=null;l=null;A=false}}}}}();
