//     Underscore.js 1.6.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function(){var n=this,t=n._,r={},e=Array.prototype,u=Object.prototype,i=Function.prototype,a=e.push,o=e.slice,c=e.concat,l=u.toString,f=u.hasOwnProperty,s=e.forEach,p=e.map,h=e.reduce,v=e.reduceRight,g=e.filter,d=e.every,m=e.some,y=e.indexOf,b=e.lastIndexOf,x=Array.isArray,w=Object.keys,_=i.bind,j=function(n){return n instanceof j?n:this instanceof j?void(this._wrapped=n):new j(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=j),exports._=j):n._=j,j.VERSION="1.6.0";var A=j.each=j.forEach=function(n,t,e){if(null==n)return n;if(s&&n.forEach===s)n.forEach(t,e);else if(n.length===+n.length){for(var u=0,i=n.length;i>u;u++)if(t.call(e,n[u],u,n)===r)return}else for(var a=j.keys(n),u=0,i=a.length;i>u;u++)if(t.call(e,n[a[u]],a[u],n)===r)return;return n};j.map=j.collect=function(n,t,r){var e=[];return null==n?e:p&&n.map===p?n.map(t,r):(A(n,function(n,u,i){e.push(t.call(r,n,u,i))}),e)};var O="Reduce of empty array with no initial value";j.reduce=j.foldl=j.inject=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),h&&n.reduce===h)return e&&(t=j.bind(t,e)),u?n.reduce(t,r):n.reduce(t);if(A(n,function(n,i,a){u?r=t.call(e,r,n,i,a):(r=n,u=!0)}),!u)throw new TypeError(O);return r},j.reduceRight=j.foldr=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),v&&n.reduceRight===v)return e&&(t=j.bind(t,e)),u?n.reduceRight(t,r):n.reduceRight(t);var i=n.length;if(i!==+i){var a=j.keys(n);i=a.length}if(A(n,function(o,c,l){c=a?a[--i]:--i,u?r=t.call(e,r,n[c],c,l):(r=n[c],u=!0)}),!u)throw new TypeError(O);return r},j.find=j.detect=function(n,t,r){var e;return k(n,function(n,u,i){return t.call(r,n,u,i)?(e=n,!0):void 0}),e},j.filter=j.select=function(n,t,r){var e=[];return null==n?e:g&&n.filter===g?n.filter(t,r):(A(n,function(n,u,i){t.call(r,n,u,i)&&e.push(n)}),e)},j.reject=function(n,t,r){return j.filter(n,function(n,e,u){return!t.call(r,n,e,u)},r)},j.every=j.all=function(n,t,e){t||(t=j.identity);var u=!0;return null==n?u:d&&n.every===d?n.every(t,e):(A(n,function(n,i,a){return(u=u&&t.call(e,n,i,a))?void 0:r}),!!u)};var k=j.some=j.any=function(n,t,e){t||(t=j.identity);var u=!1;return null==n?u:m&&n.some===m?n.some(t,e):(A(n,function(n,i,a){return u||(u=t.call(e,n,i,a))?r:void 0}),!!u)};j.contains=j.include=function(n,t){return null==n?!1:y&&n.indexOf===y?n.indexOf(t)!=-1:k(n,function(n){return n===t})},j.invoke=function(n,t){var r=o.call(arguments,2),e=j.isFunction(t);return j.map(n,function(n){return(e?t:n[t]).apply(n,r)})},j.pluck=function(n,t){return j.map(n,j.property(t))},j.where=function(n,t){return j.filter(n,j.matches(t))},j.findWhere=function(n,t){return j.find(n,j.matches(t))},j.max=function(n,t,r){if(!t&&j.isArray(n)&&n[0]===+n[0]&&n.length<65535)return Math.max.apply(Math,n);var e=-1/0,u=-1/0;return A(n,function(n,i,a){var o=t?t.call(r,n,i,a):n;o>u&&(e=n,u=o)}),e},j.min=function(n,t,r){if(!t&&j.isArray(n)&&n[0]===+n[0]&&n.length<65535)return Math.min.apply(Math,n);var e=1/0,u=1/0;return A(n,function(n,i,a){var o=t?t.call(r,n,i,a):n;u>o&&(e=n,u=o)}),e},j.shuffle=function(n){var t,r=0,e=[];return A(n,function(n){t=j.random(r++),e[r-1]=e[t],e[t]=n}),e},j.sample=function(n,t,r){return null==t||r?(n.length!==+n.length&&(n=j.values(n)),n[j.random(n.length-1)]):j.shuffle(n).slice(0,Math.max(0,t))};var E=function(n){return null==n?j.identity:j.isFunction(n)?n:j.property(n)};j.sortBy=function(n,t,r){return t=E(t),j.pluck(j.map(n,function(n,e,u){return{value:n,index:e,criteria:t.call(r,n,e,u)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||r===void 0)return 1;if(e>r||e===void 0)return-1}return n.index-t.index}),"value")};var F=function(n){return function(t,r,e){var u={};return r=E(r),A(t,function(i,a){var o=r.call(e,i,a,t);n(u,o,i)}),u}};j.groupBy=F(function(n,t,r){j.has(n,t)?n[t].push(r):n[t]=[r]}),j.indexBy=F(function(n,t,r){n[t]=r}),j.countBy=F(function(n,t){j.has(n,t)?n[t]++:n[t]=1}),j.sortedIndex=function(n,t,r,e){r=E(r);for(var u=r.call(e,t),i=0,a=n.length;a>i;){var o=i+a>>>1;r.call(e,n[o])<u?i=o+1:a=o}return i},j.toArray=function(n){return n?j.isArray(n)?o.call(n):n.length===+n.length?j.map(n,j.identity):j.values(n):[]},j.size=function(n){return null==n?0:n.length===+n.length?n.length:j.keys(n).length},j.first=j.head=j.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:0>t?[]:o.call(n,0,t)},j.initial=function(n,t,r){return o.call(n,0,n.length-(null==t||r?1:t))},j.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:o.call(n,Math.max(n.length-t,0))},j.rest=j.tail=j.drop=function(n,t,r){return o.call(n,null==t||r?1:t)},j.compact=function(n){return j.filter(n,j.identity)};var M=function(n,t,r){return t&&j.every(n,j.isArray)?c.apply(r,n):(A(n,function(n){j.isArray(n)||j.isArguments(n)?t?a.apply(r,n):M(n,t,r):r.push(n)}),r)};j.flatten=function(n,t){return M(n,t,[])},j.without=function(n){return j.difference(n,o.call(arguments,1))},j.partition=function(n,t){var r=[],e=[];return A(n,function(n){(t(n)?r:e).push(n)}),[r,e]},j.uniq=j.unique=function(n,t,r,e){j.isFunction(t)&&(e=r,r=t,t=!1);var u=r?j.map(n,r,e):n,i=[],a=[];return A(u,function(r,e){(t?e&&a[a.length-1]===r:j.contains(a,r))||(a.push(r),i.push(n[e]))}),i},j.union=function(){return j.uniq(j.flatten(arguments,!0))},j.intersection=function(n){var t=o.call(arguments,1);return j.filter(j.uniq(n),function(n){return j.every(t,function(t){return j.contains(t,n)})})},j.difference=function(n){var t=c.apply(e,o.call(arguments,1));return j.filter(n,function(n){return!j.contains(t,n)})},j.zip=function(){for(var n=j.max(j.pluck(arguments,"length").concat(0)),t=new Array(n),r=0;n>r;r++)t[r]=j.pluck(arguments,""+r);return t},j.object=function(n,t){if(null==n)return{};for(var r={},e=0,u=n.length;u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},j.indexOf=function(n,t,r){if(null==n)return-1;var e=0,u=n.length;if(r){if("number"!=typeof r)return e=j.sortedIndex(n,t),n[e]===t?e:-1;e=0>r?Math.max(0,u+r):r}if(y&&n.indexOf===y)return n.indexOf(t,r);for(;u>e;e++)if(n[e]===t)return e;return-1},j.lastIndexOf=function(n,t,r){if(null==n)return-1;var e=null!=r;if(b&&n.lastIndexOf===b)return e?n.lastIndexOf(t,r):n.lastIndexOf(t);for(var u=e?r:n.length;u--;)if(n[u]===t)return u;return-1},j.range=function(n,t,r){arguments.length<=1&&(t=n||0,n=0),r=arguments[2]||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=0,i=new Array(e);e>u;)i[u++]=n,n+=r;return i};var R=function(){};j.bind=function(n,t){var r,e;if(_&&n.bind===_)return _.apply(n,o.call(arguments,1));if(!j.isFunction(n))throw new TypeError;return r=o.call(arguments,2),e=function(){if(!(this instanceof e))return n.apply(t,r.concat(o.call(arguments)));R.prototype=n.prototype;var u=new R;R.prototype=null;var i=n.apply(u,r.concat(o.call(arguments)));return Object(i)===i?i:u}},j.partial=function(n){var t=o.call(arguments,1);return function(){for(var r=0,e=t.slice(),u=0,i=e.length;i>u;u++)e[u]===j&&(e[u]=arguments[r++]);for(;r<arguments.length;)e.push(arguments[r++]);return n.apply(this,e)}},j.bindAll=function(n){var t=o.call(arguments,1);if(0===t.length)throw new Error("bindAll must be passed function names");return A(t,function(t){n[t]=j.bind(n[t],n)}),n},j.memoize=function(n,t){var r={};return t||(t=j.identity),function(){var e=t.apply(this,arguments);return j.has(r,e)?r[e]:r[e]=n.apply(this,arguments)}},j.delay=function(n,t){var r=o.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},j.defer=function(n){return j.delay.apply(j,[n,1].concat(o.call(arguments,1)))},j.throttle=function(n,t,r){var e,u,i,a=null,o=0;r||(r={});var c=function(){o=r.leading===!1?0:j.now(),a=null,i=n.apply(e,u),e=u=null};return function(){var l=j.now();o||r.leading!==!1||(o=l);var f=t-(l-o);return e=this,u=arguments,0>=f?(clearTimeout(a),a=null,o=l,i=n.apply(e,u),e=u=null):a||r.trailing===!1||(a=setTimeout(c,f)),i}},j.debounce=function(n,t,r){var e,u,i,a,o,c=function(){var l=j.now()-a;t>l?e=setTimeout(c,t-l):(e=null,r||(o=n.apply(i,u),i=u=null))};return function(){i=this,u=arguments,a=j.now();var l=r&&!e;return e||(e=setTimeout(c,t)),l&&(o=n.apply(i,u),i=u=null),o}},j.once=function(n){var t,r=!1;return function(){return r?t:(r=!0,t=n.apply(this,arguments),n=null,t)}},j.wrap=function(n,t){return j.partial(t,n)},j.compose=function(){var n=arguments;return function(){for(var t=arguments,r=n.length-1;r>=0;r--)t=[n[r].apply(this,t)];return t[0]}},j.after=function(n,t){return function(){return--n<1?t.apply(this,arguments):void 0}},j.keys=function(n){if(!j.isObject(n))return[];if(w)return w(n);var t=[];for(var r in n)j.has(n,r)&&t.push(r);return t},j.values=function(n){for(var t=j.keys(n),r=t.length,e=new Array(r),u=0;r>u;u++)e[u]=n[t[u]];return e},j.pairs=function(n){for(var t=j.keys(n),r=t.length,e=new Array(r),u=0;r>u;u++)e[u]=[t[u],n[t[u]]];return e},j.invert=function(n){for(var t={},r=j.keys(n),e=0,u=r.length;u>e;e++)t[n[r[e]]]=r[e];return t},j.functions=j.methods=function(n){var t=[];for(var r in n)j.isFunction(n[r])&&t.push(r);return t.sort()},j.extend=function(n){return A(o.call(arguments,1),function(t){if(t)for(var r in t)n[r]=t[r]}),n},j.pick=function(n){var t={},r=c.apply(e,o.call(arguments,1));return A(r,function(r){r in n&&(t[r]=n[r])}),t},j.omit=function(n){var t={},r=c.apply(e,o.call(arguments,1));for(var u in n)j.contains(r,u)||(t[u]=n[u]);return t},j.defaults=function(n){return A(o.call(arguments,1),function(t){if(t)for(var r in t)n[r]===void 0&&(n[r]=t[r])}),n},j.clone=function(n){return j.isObject(n)?j.isArray(n)?n.slice():j.extend({},n):n},j.tap=function(n,t){return t(n),n};var S=function(n,t,r,e){if(n===t)return 0!==n||1/n==1/t;if(null==n||null==t)return n===t;n instanceof j&&(n=n._wrapped),t instanceof j&&(t=t._wrapped);var u=l.call(n);if(u!=l.call(t))return!1;switch(u){case"[object String]":return n==String(t);case"[object Number]":return n!=+n?t!=+t:0==n?1/n==1/t:n==+t;case"[object Date]":case"[object Boolean]":return+n==+t;case"[object RegExp]":return n.source==t.source&&n.global==t.global&&n.multiline==t.multiline&&n.ignoreCase==t.ignoreCase}if("object"!=typeof n||"object"!=typeof t)return!1;for(var i=r.length;i--;)if(r[i]==n)return e[i]==t;var a=n.constructor,o=t.constructor;if(a!==o&&!(j.isFunction(a)&&a instanceof a&&j.isFunction(o)&&o instanceof o)&&"constructor"in n&&"constructor"in t)return!1;r.push(n),e.push(t);var c=0,f=!0;if("[object Array]"==u){if(c=n.length,f=c==t.length)for(;c--&&(f=S(n[c],t[c],r,e)););}else{for(var s in n)if(j.has(n,s)&&(c++,!(f=j.has(t,s)&&S(n[s],t[s],r,e))))break;if(f){for(s in t)if(j.has(t,s)&&!c--)break;f=!c}}return r.pop(),e.pop(),f};j.isEqual=function(n,t){return S(n,t,[],[])},j.isEmpty=function(n){if(null==n)return!0;if(j.isArray(n)||j.isString(n))return 0===n.length;for(var t in n)if(j.has(n,t))return!1;return!0},j.isElement=function(n){return!(!n||1!==n.nodeType)},j.isArray=x||function(n){return"[object Array]"==l.call(n)},j.isObject=function(n){return n===Object(n)},A(["Arguments","Function","String","Number","Date","RegExp"],function(n){j["is"+n]=function(t){return l.call(t)=="[object "+n+"]"}}),j.isArguments(arguments)||(j.isArguments=function(n){return!(!n||!j.has(n,"callee"))}),"function"!=typeof/./&&(j.isFunction=function(n){return"function"==typeof n}),j.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},j.isNaN=function(n){return j.isNumber(n)&&n!=+n},j.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"==l.call(n)},j.isNull=function(n){return null===n},j.isUndefined=function(n){return n===void 0},j.has=function(n,t){return f.call(n,t)},j.noConflict=function(){return n._=t,this},j.identity=function(n){return n},j.constant=function(n){return function(){return n}},j.property=function(n){return function(t){return t[n]}},j.matches=function(n){return function(t){if(t===n)return!0;for(var r in n)if(n[r]!==t[r])return!1;return!0}},j.times=function(n,t,r){for(var e=Array(Math.max(0,n)),u=0;n>u;u++)e[u]=t.call(r,u);return e},j.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))},j.now=Date.now||function(){return(new Date).getTime()};var T={escape:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;"}};T.unescape=j.invert(T.escape);var I={escape:new RegExp("["+j.keys(T.escape).join("")+"]","g"),unescape:new RegExp("("+j.keys(T.unescape).join("|")+")","g")};j.each(["escape","unescape"],function(n){j[n]=function(t){return null==t?"":(""+t).replace(I[n],function(t){return T[n][t]})}}),j.result=function(n,t){if(null==n)return void 0;var r=n[t];return j.isFunction(r)?r.call(n):r},j.mixin=function(n){A(j.functions(n),function(t){var r=j[t]=n[t];j.prototype[t]=function(){var n=[this._wrapped];return a.apply(n,arguments),z.call(this,r.apply(j,n))}})};var N=0;j.uniqueId=function(n){var t=++N+"";return n?n+t:t},j.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var q=/(.)^/,B={"'":"'","\\":"\\","\r":"r","\n":"n","	":"t","\u2028":"u2028","\u2029":"u2029"},D=/\\|'|\r|\n|\t|\u2028|\u2029/g;j.template=function(n,t,r){var e;r=j.defaults({},r,j.templateSettings);var u=new RegExp([(r.escape||q).source,(r.interpolate||q).source,(r.evaluate||q).source].join("|")+"|$","g"),i=0,a="__p+='";n.replace(u,function(t,r,e,u,o){return a+=n.slice(i,o).replace(D,function(n){return"\\"+B[n]}),r&&(a+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'"),e&&(a+="'+\n((__t=("+e+"))==null?'':__t)+\n'"),u&&(a+="';\n"+u+"\n__p+='"),i=o+t.length,t}),a+="';\n",r.variable||(a="with(obj||{}){\n"+a+"}\n"),a="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+a+"return __p;\n";try{e=new Function(r.variable||"obj","_",a)}catch(o){throw o.source=a,o}if(t)return e(t,j);var c=function(n){return e.call(this,n,j)};return c.source="function("+(r.variable||"obj")+"){\n"+a+"}",c},j.chain=function(n){return j(n).chain()};var z=function(n){return this._chain?j(n).chain():n};j.mixin(j),A(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=e[n];j.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!=n&&"splice"!=n||0!==r.length||delete r[0],z.call(this,r)}}),A(["concat","join","slice"],function(n){var t=e[n];j.prototype[n]=function(){return z.call(this,t.apply(this._wrapped,arguments))}}),j.extend(j.prototype,{chain:function(){return this._chain=!0,this},value:function(){return this._wrapped}}),"function"==typeof define&&define.amd&&define("underscore",[],function(){return j})}).call(this);
//# sourceMappingURL=underscore-min.map;
(function(a){a.isScrollToFixed=function(b){return !!a(b).data("ScrollToFixed")};a.ScrollToFixed=function(d,i){var l=this;l.$el=a(d);l.el=d;l.$el.data("ScrollToFixed",l);var c=false;var G=l.$el;var H;var E;var e;var y;var D=0;var q=0;var j=-1;var f=-1;var t=null;var z;var g;function u(){G.trigger("preUnfixed.ScrollToFixed");k();G.trigger("unfixed.ScrollToFixed");f=-1;D=G.offset().top;q=G.offset().left;if(l.options.offsets){q+=(G.offset().left-G.position().left)}if(j==-1){j=q}H=G.css("position");c=true;if(l.options.bottom!=-1){G.trigger("preFixed.ScrollToFixed");w();G.trigger("fixed.ScrollToFixed")}}function n(){var I=l.options.limit;if(!I){return 0}if(typeof(I)==="function"){return I.apply(G)}return I}function p(){return H==="fixed"}function x(){return H==="absolute"}function h(){return !(p()||x())}function w(){if(!p()){t.css({display:G.css("display"),width:G.outerWidth(true),height:G.outerHeight(true),"float":G.css("float")});cssOptions={"z-index":l.options.zIndex,position:"fixed",top:l.options.bottom==-1?s():"",bottom:l.options.bottom==-1?"":l.options.bottom,"margin-left":"0px"};if(!l.options.dontSetWidth){cssOptions.width=G.width()}G.css(cssOptions);G.addClass(l.options.baseClassName);if(l.options.className){G.addClass(l.options.className)}H="fixed"}}function b(){var J=n();var I=q;if(l.options.removeOffsets){I="";J=J-D}cssOptions={position:"absolute",top:J,left:I,"margin-left":"0px",bottom:""};if(!l.options.dontSetWidth){cssOptions.width=G.width()}G.css(cssOptions);H="absolute"}function k(){if(!h()){f=-1;t.css("display","none");G.css({"z-index":y,width:"",position:E,left:"",top:e,"margin-left":""});G.removeClass("scroll-to-fixed-fixed");if(l.options.className){G.removeClass(l.options.className)}H=null}}function v(I){if(I!=f){G.css("left",q-I);f=I}}function s(){var I=l.options.marginTop;if(!I){return 0}if(typeof(I)==="function"){return I.apply(G)}return I}function A(){if(!a.isScrollToFixed(G)){return}var K=c;if(!c){u()}else{if(h()){D=G.offset().top;q=G.offset().left}}var I=a(window).scrollLeft();var L=a(window).scrollTop();var J=n();if(l.options.minWidth&&a(window).width()<l.options.minWidth){if(!h()||!K){o();G.trigger("preUnfixed.ScrollToFixed");k();G.trigger("unfixed.ScrollToFixed")}}else{if(l.options.maxWidth&&a(window).width()>l.options.maxWidth){if(!h()||!K){o();G.trigger("preUnfixed.ScrollToFixed");k();G.trigger("unfixed.ScrollToFixed")}}else{if(l.options.bottom==-1){if(J>0&&L>=J-s()){if(!x()||!K){o();G.trigger("preAbsolute.ScrollToFixed");b();G.trigger("unfixed.ScrollToFixed")}}else{if(L>=D-s()){if(!p()||!K){o();G.trigger("preFixed.ScrollToFixed");w();f=-1;G.trigger("fixed.ScrollToFixed")}v(I)}else{if(!h()||!K){o();G.trigger("preUnfixed.ScrollToFixed");k();G.trigger("unfixed.ScrollToFixed")}}}}else{if(J>0){if(L+a(window).height()-G.outerHeight(true)>=J-(s()||-m())){if(p()){o();G.trigger("preUnfixed.ScrollToFixed");if(E==="absolute"){b()}else{k()}G.trigger("unfixed.ScrollToFixed")}}else{if(!p()){o();G.trigger("preFixed.ScrollToFixed");w()}v(I);G.trigger("fixed.ScrollToFixed")}}else{v(I)}}}}}function m(){if(!l.options.bottom){return 0}return l.options.bottom}function o(){var I=G.css("position");if(I=="absolute"){G.trigger("postAbsolute.ScrollToFixed")}else{if(I=="fixed"){G.trigger("postFixed.ScrollToFixed")}else{G.trigger("postUnfixed.ScrollToFixed")}}}var C=function(I){if(G.is(":visible")){c=false;A()}};var F=function(I){(!!window.requestAnimationFrame)?requestAnimationFrame(A):A()};var B=function(){var J=document.body;if(document.createElement&&J&&J.appendChild&&J.removeChild){var L=document.createElement("div");if(!L.getBoundingClientRect){return null}L.innerHTML="x";L.style.cssText="position:fixed;top:100px;";J.appendChild(L);var M=J.style.height,N=J.scrollTop;J.style.height="3000px";J.scrollTop=500;var I=L.getBoundingClientRect().top;J.style.height=M;var K=(I===100);J.removeChild(L);J.scrollTop=N;return K}return null};var r=function(I){I=I||window.event;if(I.preventDefault){I.preventDefault()}I.returnValue=false};l.init=function(){l.options=a.extend({},a.ScrollToFixed.defaultOptions,i);y=G.css("z-index");l.$el.css("z-index",l.options.zIndex);t=a("<div />");H=G.css("position");E=G.css("position");e=G.css("top");if(h()){l.$el.after(t)}a(window).bind("resize.ScrollToFixed",C);a(window).bind("scroll.ScrollToFixed",F);if("ontouchmove" in window){a(window).bind("touchmove.ScrollToFixed",A)}if(l.options.preFixed){G.bind("preFixed.ScrollToFixed",l.options.preFixed)}if(l.options.postFixed){G.bind("postFixed.ScrollToFixed",l.options.postFixed)}if(l.options.preUnfixed){G.bind("preUnfixed.ScrollToFixed",l.options.preUnfixed)}if(l.options.postUnfixed){G.bind("postUnfixed.ScrollToFixed",l.options.postUnfixed)}if(l.options.preAbsolute){G.bind("preAbsolute.ScrollToFixed",l.options.preAbsolute)}if(l.options.postAbsolute){G.bind("postAbsolute.ScrollToFixed",l.options.postAbsolute)}if(l.options.fixed){G.bind("fixed.ScrollToFixed",l.options.fixed)}if(l.options.unfixed){G.bind("unfixed.ScrollToFixed",l.options.unfixed)}if(l.options.spacerClass){t.addClass(l.options.spacerClass)}G.bind("resize.ScrollToFixed",function(){t.height(G.height())});G.bind("scroll.ScrollToFixed",function(){G.trigger("preUnfixed.ScrollToFixed");k();G.trigger("unfixed.ScrollToFixed");A()});G.bind("detach.ScrollToFixed",function(I){r(I);G.trigger("preUnfixed.ScrollToFixed");k();G.trigger("unfixed.ScrollToFixed");a(window).unbind("resize.ScrollToFixed",C);a(window).unbind("scroll.ScrollToFixed",F);G.unbind(".ScrollToFixed");t.remove();l.$el.removeData("ScrollToFixed")});C()};l.init()};a.ScrollToFixed.defaultOptions={marginTop:0,limit:0,bottom:-1,zIndex:1000,baseClassName:"scroll-to-fixed-fixed"};a.fn.scrollToFixed=function(b){return this.each(function(){(new a.ScrollToFixed(this,b))})}})(jQuery);;
/*!
	Colorbox v1.5.10 - 2014-06-26
	jQuery lightbox and modal window plugin
	(c) 2014 Jack Moore - http://www.jacklmoore.com/colorbox
	license: http://www.opensource.org/licenses/mit-license.php
*/
(function(t,e,i){function n(i,n,o){var r=e.createElement(i);return n&&(r.id=Z+n),o&&(r.style.cssText=o),t(r)}function o(){return i.innerHeight?i.innerHeight:t(i).height()}function r(e,i){i!==Object(i)&&(i={}),this.cache={},this.el=e,this.value=function(e){var n;return void 0===this.cache[e]&&(n=t(this.el).attr("data-cbox-"+e),void 0!==n?this.cache[e]=n:void 0!==i[e]?this.cache[e]=i[e]:void 0!==X[e]&&(this.cache[e]=X[e])),this.cache[e]},this.get=function(e){var i=this.value(e);return t.isFunction(i)?i.call(this.el,this):i}}function h(t){var e=W.length,i=(z+t)%e;return 0>i?e+i:i}function a(t,e){return Math.round((/%/.test(t)?("x"===e?E.width():o())/100:1)*parseInt(t,10))}function s(t,e){return t.get("photo")||t.get("photoRegex").test(e)}function l(t,e){return t.get("retinaUrl")&&i.devicePixelRatio>1?e.replace(t.get("photoRegex"),t.get("retinaSuffix")):e}function d(t){"contains"in y[0]&&!y[0].contains(t.target)&&t.target!==v[0]&&(t.stopPropagation(),y.focus())}function c(t){c.str!==t&&(y.add(v).removeClass(c.str).addClass(t),c.str=t)}function g(e){z=0,e&&e!==!1&&"nofollow"!==e?(W=t("."+te).filter(function(){var i=t.data(this,Y),n=new r(this,i);return n.get("rel")===e}),z=W.index(_.el),-1===z&&(W=W.add(_.el),z=W.length-1)):W=t(_.el)}function u(i){t(e).trigger(i),ae.triggerHandler(i)}function f(i){var o;if(!G){if(o=t(i).data(Y),_=new r(i,o),g(_.get("rel")),!$){$=q=!0,c(_.get("className")),y.css({visibility:"hidden",display:"block",opacity:""}),L=n(se,"LoadedContent","width:0; height:0; overflow:hidden; visibility:hidden"),b.css({width:"",height:""}).append(L),D=T.height()+k.height()+b.outerHeight(!0)-b.height(),j=C.width()+H.width()+b.outerWidth(!0)-b.width(),A=L.outerHeight(!0),N=L.outerWidth(!0);var h=a(_.get("initialWidth"),"x"),s=a(_.get("initialHeight"),"y"),l=_.get("maxWidth"),f=_.get("maxHeight");_.w=(l!==!1?Math.min(h,a(l,"x")):h)-N-j,_.h=(f!==!1?Math.min(s,a(f,"y")):s)-A-D,L.css({width:"",height:_.h}),J.position(),u(ee),_.get("onOpen"),O.add(I).hide(),y.focus(),_.get("trapFocus")&&e.addEventListener&&(e.addEventListener("focus",d,!0),ae.one(re,function(){e.removeEventListener("focus",d,!0)})),_.get("returnFocus")&&ae.one(re,function(){t(_.el).focus()})}v.css({opacity:parseFloat(_.get("opacity"))||"",cursor:_.get("overlayClose")?"pointer":"",visibility:"visible"}).show(),_.get("closeButton")?B.html(_.get("close")).appendTo(b):B.appendTo("<div/>"),w()}}function p(){!y&&e.body&&(V=!1,E=t(i),y=n(se).attr({id:Y,"class":t.support.opacity===!1?Z+"IE":"",role:"dialog",tabindex:"-1"}).hide(),v=n(se,"Overlay").hide(),S=t([n(se,"LoadingOverlay")[0],n(se,"LoadingGraphic")[0]]),x=n(se,"Wrapper"),b=n(se,"Content").append(I=n(se,"Title"),R=n(se,"Current"),P=t('<button type="button"/>').attr({id:Z+"Previous"}),K=t('<button type="button"/>').attr({id:Z+"Next"}),F=n("button","Slideshow"),S),B=t('<button type="button"/>').attr({id:Z+"Close"}),x.append(n(se).append(n(se,"TopLeft"),T=n(se,"TopCenter"),n(se,"TopRight")),n(se,!1,"clear:left").append(C=n(se,"MiddleLeft"),b,H=n(se,"MiddleRight")),n(se,!1,"clear:left").append(n(se,"BottomLeft"),k=n(se,"BottomCenter"),n(se,"BottomRight"))).find("div div").css({"float":"left"}),M=n(se,!1,"position:absolute; width:9999px; visibility:hidden; display:none; max-width:none;"),O=K.add(P).add(R).add(F),t(e.body).append(v,y.append(x,M)))}function m(){function i(t){t.which>1||t.shiftKey||t.altKey||t.metaKey||t.ctrlKey||(t.preventDefault(),f(this))}return y?(V||(V=!0,K.click(function(){J.next()}),P.click(function(){J.prev()}),B.click(function(){J.close()}),v.click(function(){_.get("overlayClose")&&J.close()}),t(e).bind("keydown."+Z,function(t){var e=t.keyCode;$&&_.get("escKey")&&27===e&&(t.preventDefault(),J.close()),$&&_.get("arrowKey")&&W[1]&&!t.altKey&&(37===e?(t.preventDefault(),P.click()):39===e&&(t.preventDefault(),K.click()))}),t.isFunction(t.fn.on)?t(e).on("click."+Z,"."+te,i):t("."+te).live("click."+Z,i)),!0):!1}function w(){var e,o,r,h=J.prep,d=++le;if(q=!0,U=!1,u(he),u(ie),_.get("onLoad"),_.h=_.get("height")?a(_.get("height"),"y")-A-D:_.get("innerHeight")&&a(_.get("innerHeight"),"y"),_.w=_.get("width")?a(_.get("width"),"x")-N-j:_.get("innerWidth")&&a(_.get("innerWidth"),"x"),_.mw=_.w,_.mh=_.h,_.get("maxWidth")&&(_.mw=a(_.get("maxWidth"),"x")-N-j,_.mw=_.w&&_.w<_.mw?_.w:_.mw),_.get("maxHeight")&&(_.mh=a(_.get("maxHeight"),"y")-A-D,_.mh=_.h&&_.h<_.mh?_.h:_.mh),e=_.get("href"),Q=setTimeout(function(){S.show()},100),_.get("inline")){var c=t(e);r=t("<div>").hide().insertBefore(c),ae.one(he,function(){r.replaceWith(c)}),h(c)}else _.get("iframe")?h(" "):_.get("html")?h(_.get("html")):s(_,e)?(e=l(_,e),U=new Image,t(U).addClass(Z+"Photo").bind("error",function(){h(n(se,"Error").html(_.get("imgError")))}).one("load",function(){d===le&&setTimeout(function(){var e;t.each(["alt","longdesc","aria-describedby"],function(e,i){var n=t(_.el).attr(i)||t(_.el).attr("data-"+i);n&&U.setAttribute(i,n)}),_.get("retinaImage")&&i.devicePixelRatio>1&&(U.height=U.height/i.devicePixelRatio,U.width=U.width/i.devicePixelRatio),_.get("scalePhotos")&&(o=function(){U.height-=U.height*e,U.width-=U.width*e},_.mw&&U.width>_.mw&&(e=(U.width-_.mw)/U.width,o()),_.mh&&U.height>_.mh&&(e=(U.height-_.mh)/U.height,o())),_.h&&(U.style.marginTop=Math.max(_.mh-U.height,0)/2+"px"),W[1]&&(_.get("loop")||W[z+1])&&(U.style.cursor="pointer",U.onclick=function(){J.next()}),U.style.width=U.width+"px",U.style.height=U.height+"px",h(U)},1)}),U.src=e):e&&M.load(e,_.get("data"),function(e,i){d===le&&h("error"===i?n(se,"Error").html(_.get("xhrError")):t(this).contents())})}var v,y,x,b,T,C,H,k,W,E,L,M,S,I,R,F,K,P,B,O,_,D,j,A,N,z,U,$,q,G,Q,J,V,X={html:!1,photo:!1,iframe:!1,inline:!1,transition:"elastic",speed:300,fadeOut:300,width:!1,initialWidth:"600",innerWidth:!1,maxWidth:!1,height:!1,initialHeight:"450",innerHeight:!1,maxHeight:!1,scalePhotos:!0,scrolling:!0,opacity:.9,preloading:!0,className:!1,overlayClose:!0,escKey:!0,arrowKey:!0,top:!1,bottom:!1,left:!1,right:!1,fixed:!1,data:void 0,closeButton:!0,fastIframe:!0,open:!1,reposition:!0,loop:!0,slideshow:!1,slideshowAuto:!0,slideshowSpeed:2500,slideshowStart:"start slideshow",slideshowStop:"stop slideshow",photoRegex:/\.(gif|png|jp(e|g|eg)|bmp|ico|webp|jxr|svg)((#|\?).*)?$/i,retinaImage:!1,retinaUrl:!1,retinaSuffix:"@2x.$1",current:"image {current} of {total}",previous:"previous",next:"next",close:"close",xhrError:"This content failed to load.",imgError:"This image failed to load.",returnFocus:!0,trapFocus:!0,onOpen:!1,onLoad:!1,onComplete:!1,onCleanup:!1,onClosed:!1,rel:function(){return this.rel},href:function(){return t(this).attr("href")},title:function(){return this.title}},Y="colorbox",Z="cbox",te=Z+"Element",ee=Z+"_open",ie=Z+"_load",ne=Z+"_complete",oe=Z+"_cleanup",re=Z+"_closed",he=Z+"_purge",ae=t("<a/>"),se="div",le=0,de={},ce=function(){function t(){clearTimeout(h)}function e(){(_.get("loop")||W[z+1])&&(t(),h=setTimeout(J.next,_.get("slideshowSpeed")))}function i(){F.html(_.get("slideshowStop")).unbind(s).one(s,n),ae.bind(ne,e).bind(ie,t),y.removeClass(a+"off").addClass(a+"on")}function n(){t(),ae.unbind(ne,e).unbind(ie,t),F.html(_.get("slideshowStart")).unbind(s).one(s,function(){J.next(),i()}),y.removeClass(a+"on").addClass(a+"off")}function o(){r=!1,F.hide(),t(),ae.unbind(ne,e).unbind(ie,t),y.removeClass(a+"off "+a+"on")}var r,h,a=Z+"Slideshow_",s="click."+Z;return function(){r?_.get("slideshow")||(ae.unbind(oe,o),o()):_.get("slideshow")&&W[1]&&(r=!0,ae.one(oe,o),_.get("slideshowAuto")?i():n(),F.show())}}();t[Y]||(t(p),J=t.fn[Y]=t[Y]=function(e,i){var n,o=this;if(e=e||{},t.isFunction(o))o=t("<a/>"),e.open=!0;else if(!o[0])return o;return o[0]?(p(),m()&&(i&&(e.onComplete=i),o.each(function(){var i=t.data(this,Y)||{};t.data(this,Y,t.extend(i,e))}).addClass(te),n=new r(o[0],e),n.get("open")&&f(o[0])),o):o},J.position=function(e,i){function n(){T[0].style.width=k[0].style.width=b[0].style.width=parseInt(y[0].style.width,10)-j+"px",b[0].style.height=C[0].style.height=H[0].style.height=parseInt(y[0].style.height,10)-D+"px"}var r,h,s,l=0,d=0,c=y.offset();if(E.unbind("resize."+Z),y.css({top:-9e4,left:-9e4}),h=E.scrollTop(),s=E.scrollLeft(),_.get("fixed")?(c.top-=h,c.left-=s,y.css({position:"fixed"})):(l=h,d=s,y.css({position:"absolute"})),d+=_.get("right")!==!1?Math.max(E.width()-_.w-N-j-a(_.get("right"),"x"),0):_.get("left")!==!1?a(_.get("left"),"x"):Math.round(Math.max(E.width()-_.w-N-j,0)/2),l+=_.get("bottom")!==!1?Math.max(o()-_.h-A-D-a(_.get("bottom"),"y"),0):_.get("top")!==!1?a(_.get("top"),"y"):Math.round(Math.max(o()-_.h-A-D,0)/2),y.css({top:c.top,left:c.left,visibility:"visible"}),x[0].style.width=x[0].style.height="9999px",r={width:_.w+N+j,height:_.h+A+D,top:l,left:d},e){var g=0;t.each(r,function(t){return r[t]!==de[t]?(g=e,void 0):void 0}),e=g}de=r,e||y.css(r),y.dequeue().animate(r,{duration:e||0,complete:function(){n(),q=!1,x[0].style.width=_.w+N+j+"px",x[0].style.height=_.h+A+D+"px",_.get("reposition")&&setTimeout(function(){E.bind("resize."+Z,J.position)},1),i&&i()},step:n})},J.resize=function(t){var e;$&&(t=t||{},t.width&&(_.w=a(t.width,"x")-N-j),t.innerWidth&&(_.w=a(t.innerWidth,"x")),L.css({width:_.w}),t.height&&(_.h=a(t.height,"y")-A-D),t.innerHeight&&(_.h=a(t.innerHeight,"y")),t.innerHeight||t.height||(e=L.scrollTop(),L.css({height:"auto"}),_.h=L.height()),L.css({height:_.h}),e&&L.scrollTop(e),J.position("none"===_.get("transition")?0:_.get("speed")))},J.prep=function(i){function o(){return _.w=_.w||L.width(),_.w=_.mw&&_.mw<_.w?_.mw:_.w,_.w}function a(){return _.h=_.h||L.height(),_.h=_.mh&&_.mh<_.h?_.mh:_.h,_.h}if($){var d,g="none"===_.get("transition")?0:_.get("speed");L.remove(),L=n(se,"LoadedContent").append(i),L.hide().appendTo(M.show()).css({width:o(),overflow:_.get("scrolling")?"auto":"hidden"}).css({height:a()}).prependTo(b),M.hide(),t(U).css({"float":"none"}),c(_.get("className")),d=function(){function i(){t.support.opacity===!1&&y[0].style.removeAttribute("filter")}var n,o,a=W.length;$&&(o=function(){clearTimeout(Q),S.hide(),u(ne),_.get("onComplete")},I.html(_.get("title")).show(),L.show(),a>1?("string"==typeof _.get("current")&&R.html(_.get("current").replace("{current}",z+1).replace("{total}",a)).show(),K[_.get("loop")||a-1>z?"show":"hide"]().html(_.get("next")),P[_.get("loop")||z?"show":"hide"]().html(_.get("previous")),ce(),_.get("preloading")&&t.each([h(-1),h(1)],function(){var i,n=W[this],o=new r(n,t.data(n,Y)),h=o.get("href");h&&s(o,h)&&(h=l(o,h),i=e.createElement("img"),i.src=h)})):O.hide(),_.get("iframe")?(n=e.createElement("iframe"),"frameBorder"in n&&(n.frameBorder=0),"allowTransparency"in n&&(n.allowTransparency="true"),_.get("scrolling")||(n.scrolling="no"),t(n).attr({src:_.get("href"),name:(new Date).getTime(),"class":Z+"Iframe",allowFullScreen:!0}).one("load",o).appendTo(L),ae.one(he,function(){n.src="//about:blank"}),_.get("fastIframe")&&t(n).trigger("load")):o(),"fade"===_.get("transition")?y.fadeTo(g,1,i):i())},"fade"===_.get("transition")?y.fadeTo(g,0,function(){J.position(0,d)}):J.position(g,d)}},J.next=function(){!q&&W[1]&&(_.get("loop")||W[z+1])&&(z=h(1),f(W[z]))},J.prev=function(){!q&&W[1]&&(_.get("loop")||z)&&(z=h(-1),f(W[z]))},J.close=function(){$&&!G&&(G=!0,$=!1,u(oe),_.get("onCleanup"),E.unbind("."+Z),v.fadeTo(_.get("fadeOut")||0,0),y.stop().fadeTo(_.get("fadeOut")||0,0,function(){y.hide(),v.hide(),u(he),L.remove(),setTimeout(function(){G=!1,u(re),_.get("onClosed")},1)}))},J.remove=function(){y&&(y.stop(),t[Y].close(),y.stop(!1,!0).remove(),v.remove(),G=!1,y=null,t("."+te).removeData(Y).removeClass(te),t(e).unbind("click."+Z).unbind("keydown."+Z))},J.element=function(){return t(_.el)},J.settings=X)})(jQuery,document,window);;
/*! Tablesaw - v0.1.4 - 2014-06-26
* https://github.com/filamentgroup/tablesaw
* Copyright (c) 2014 Filament Group; Licensed MIT */
;(function( $ ) {
	var div = document.createElement('div'),
		all = div.getElementsByTagName('i'),
		$doc = $( document.documentElement );

	div.innerHTML = '<!--[if lte IE 8]><i></i><![endif]-->';
	if( all[ 0 ] ) {
		$doc.addClass( 'ie-lte8' );
	}

	// Cut the mustard
	if( !( 'querySelector' in document ) || ( window.blackberry && !window.WebKitPoint ) || window.operamini ) {
		return;
	} else {
		$doc.addClass( 'tablesaw-enhanced' );

		// DOM-ready auto-init of plugins.
		// Many plugins bind to an "enhance" event to init themselves on dom ready, or when new markup is inserted into the DOM
		$( function(){
			$( document ).trigger( "enhance.tablesaw" );
		});
	}

})( jQuery );
;(function( $ ) {
	var pluginName = "table",
		classes = {
			toolbar: "tablesaw-bar"
		},
		events = {
			create: "tablesawcreate",
			destroy: "tablesawdestroy"
		},
		defaultMode = "stack",
		initSelector = "table[data-mode],table[data-sortable]";

	var Table = function( element ) {
		if( !element ) {
			throw new Error( "Tablesaw requires an element." );
		}

		this.table = element;
		this.$table = $( element );

		this.mode = this.$table.attr( "data-mode" ) || defaultMode;

		this.init();
	};

	Table.prototype.init = function() {
		// assign an id if there is none
		if ( !this.$table.attr( "id" ) ) {
			this.$table.attr( "id", pluginName + "-" + Math.round( Math.random() * 10000 ) );
		}

		this.createToolbar();

		// Add header cells
		var colstart,
			thrs = this.table.querySelectorAll( "thead tr" ),
			self = this;

		$( thrs ).each( function(){
			var coltally = 0;

			$( this ).children().each( function(){
				var span = parseInt( this.getAttribute( "colspan" ), 10 ),
					sel = ":nth-child(" + ( coltally + 1 ) + ")";

				colstart = coltally + 1;

				if( span ){
					for( var k = 0; k < span - 1; k++ ){
						coltally++;
						sel += ", :nth-child(" + ( coltally + 1 ) + ")";
					}
				}

				// Store "cells" data on header as a reference to all cells in the same column as this TH
				this.cells = self.$table.find("tr").not( $( thrs ).eq( 0 ) ).not( this ).children( sel );
				coltally++;

			});
		});

		this.$table.trigger( events.create, [ this.mode, colstart ] );
	};

	Table.prototype.createToolbar = function() {
		// Insert the toolbar
		// TODO move this into a separate component
		var $toolbar = this.$table.prev( '.' + classes.toolbar );
		if( !$toolbar.length ) {
			$toolbar = $( '<div>' )
				.addClass( classes.toolbar )
				.insertBefore( this.$table );
		}
		this.$toolbar = $toolbar;

		if( this.mode ) {
			this.$toolbar.addClass( 'mode-' + this.mode );
		}
	};

	Table.prototype.destroy = function() {
		// Don’t remove the toolbar. Some of the table features are not yet destroy-friendly.
		this.$table.prev( '.' + classes.toolbar ).each(function() {
			this.className = this.className.replace( /\bmode\-\w*\b/gi, '' );
		});

		$( window ).off( 'resize.' + this.$table.attr( 'id' ) );

		// other plugins
		this.$table.trigger( events.destroy, [ this.mode ] );

		this.$table.removeAttr( 'data-mode' );

		this.$table.removeData( pluginName );
	};

	// Collection method.
	$.fn[ pluginName ] = function() {
		return this.each( function() {
			var $t = $( this );

			if( $t.data( pluginName ) ){
				return;
			}

			var table = new Table( this );
			$t.data( pluginName, table );
		});
	};

	$( document ).on( "enhance.tablesaw", function( e ) {
		$( e.target ).find( initSelector )[ pluginName ]();
	});

}( jQuery ));

;(function( win, $, undefined ){

	var classes = {
		stackTable: 'tablesaw-stack',
		cellLabels: 'tablesaw-cell-label'
	};

	var data = {
		obj: 'tablesaw-stack'
	};

	var attrs = {
		labelless: 'data-no-labels'
	};

	var Stack = function( element ) {

		this.$table = $( element );

		this.labelless = this.$table.is( '[' + attrs.labelless + ']' );

		if( !this.labelless ) {
			// allHeaders references headers, plus all THs in the thead, which may include several rows, or not
			this.allHeaders = this.$table.find( "th" );
		}

		this.$table.data( data.obj, this );
	};

	Stack.prototype.init = function( colstart ) {
		this.$table.addClass( classes.stackTable );

		if( this.labelless ) {
			return;
		}

		// get headers in reverse order so that top-level headers are appended last
		var reverseHeaders = $( this.allHeaders );

		// create the hide/show toggles
		reverseHeaders.each(function(){
			var $cells = $( this.cells ),
				hierarchyClass = $cells.not( this ).filter( "thead th" ).length && " tablesaw-cell-label-top",
				text = $(this).text();

			if( text !== "" ){
				if( hierarchyClass ){
					var iteration = parseInt( $( this ).attr( "colspan" ), 10 ),
						filter = "";

					if( iteration ){
						filter = "td:nth-child("+ iteration +"n + " + ( colstart ) +")";
					}
					$cells.filter( filter ).prepend( "<b class='" + classes.cellLabels + hierarchyClass + "'>" + text + "</b>"  );
				} else {
					$cells.prepend( "<b class='" + classes.cellLabels + "'>" + text + "</b>"  );
				}
			}
		});
	};

	Stack.prototype.destroy = function() {
		this.$table.removeClass( classes.stackTable );
		this.$table.find( '.' + classes.cellLabels ).remove();
	};

	// on tablecreate, init
	$( document ).on( "tablesawcreate", "table", function( e, mode, colstart ){
		if( mode === 'stack' ){
			var table = new Stack( this );
			table.init( colstart );
		}

	} );

	$( document ).on( "tablesawdestroy", "table", function( e, mode ){

		if( mode === 'stack' ){
			$( this ).data( data.obj ).destroy();
		}

	} );

}( this, jQuery ));
;(function( $ ) {
	var pluginName = "tablesawbtn",
		initSelector = ".btn",
		activeClass = "btn-selected",
		methods = {
			_create: function(){
				return $( this ).each(function() {
					$( this )
						.trigger( "beforecreate." + pluginName )
						[ pluginName ]( "_init" )
						.trigger( "create." + pluginName );
				});
			},
			_init: function(){
				var oEl = $( this ),
					disabled = this.disabled !== undefined && this.disabled !== false,
					input = this.getElementsByTagName( "input" )[ 0 ],
					sel = this.getElementsByTagName( "select" )[ 0 ];

				if( input ) {
					$( this )
						.addClass( "btn-" + input.type )
						[ pluginName ]( "_formbtn", input );
				}
				if( sel ) {
					$( this )
						.addClass( "btn-select" )
						[ pluginName ]( "_select", sel );
				}
				if( disabled ) {
					oEl.addClass( "ui-disabled" );
				}
				return oEl;
			},
			_formbtn: function( input ) {
				var active = function( el, input ) {
					if( input.type === "radio" && input.checked ) {
						var group = input.getAttribute( "name" );

						$( "[name='" + group + "']" ).each(function() {
							$( this ).parent().removeClass( activeClass );
						});
						el[ input.checked ? "addClass" : "removeClass" ]( activeClass );
					} else if ( input.type === "checkbox" ) {
						el[ input.checked ? "addClass" : "removeClass" ]( activeClass );
					}
				};

				active( $( this ), input );
				$( this ).bind("click", function() {
					active( $( this ), input );
				});
			},
			_select: function( sel ) {
				var update = function( oEl, sel ) {
					var opts = $( sel ).find( "option" ),
						label, el, children;

					opts.each(function() {
						var opt = this;
						if( opt.selected ) {
							label = document.createTextNode( opt.text );
						}
					});

					children = oEl.childNodes;
					if( opts.length > 0 ){
						for( var i = 0, l = children.length; i < l; i++ ) {
							el = children[ i ];

							if( el && el.nodeType === 3 ) {
								oEl.replaceChild( label, el );
							}
						}
					}
				};

				update( this, sel );
				$( this ).bind( "change refresh", function() {
					update( this, sel );
				});
			}
		};

	// Collection method.
	$.fn[ pluginName ] = function( arrg, a, b, c ) {
		return this.each(function() {

		// if it's a method
		if( arrg && typeof( arrg ) === "string" ){
			return $.fn[ pluginName ].prototype[ arrg ].call( this, a, b, c );
		}

		// don't re-init
		if( $( this ).data( pluginName + "active" ) ){
			return $( this );
		}

		// otherwise, init

		$( this ).data( pluginName + "active", true );
			$.fn[ pluginName ].prototype._create.call( this );
		});
	};

	// add methods
	$.extend( $.fn[ pluginName ].prototype, methods );

	$( document ).on( "enhance", function( e ) {
		$( initSelector, e.target )[ pluginName ]();
	});

}( jQuery ));
;(function( win, $, undefined ){

	var ColumnToggle = function( element ) {

		this.$table = $( element );

		this.classes = {
			columnToggleTable: 'tablesaw-columntoggle',
			columnBtnContain: 'tablesaw-columntoggle-btnwrap tablesaw-advance',
			dialogClass: this.$table.attr( 'data-dialog-class' ) || '',
			columnBtn: 'tablesaw-columntoggle-btn tablesaw-nav-btn',
			columnBtnSide: this.$table.attr( 'data-column-btn-side' ) || 'right',
			popup: 'tablesaw-columntoggle-popup',
			priorityPrefix: 'tablesaw-priority-',
			// TODO duplicate class, also in tables.js
			toolbar: 'tablesaw-bar'
		};

		this.i18n = {
			columnBtnText: 'Columns',
			columnsDialogError: 'No eligible columns.'
		};

		// Expose headers and allHeaders properties on the widget
		// headers references the THs within the first TR in the table
		this.headers = this.$table.find( 'tr:first > th' );

		this.$table.data( 'tablesaw-coltoggle', this );
	};

	ColumnToggle.prototype.init = function() {

		var tableId,
			id,
			$menuButton,
			$popup,
			$menu,
			$btnContain,
			self = this;

		this.$table.addClass( this.classes.columnToggleTable );

		tableId = this.$table.attr( "id" );
		id = tableId + "-popup";
		$btnContain = $( "<div class='" + this.classes.columnBtnContain + " " + this.classes.columnBtnSide + " " + this.classes.dialogClass + "'></div>" );
		$menuButton = $( "<a href='#" + id + "' class='btn btn-micro " + this.classes.columnBtn +"' data-popup-link>" +
										"<span>" + this.i18n.columnBtnText + "</span></a>" );
		$popup = $( "<div class='dialog-table-coltoggle " + this.classes.popup + "' id='" + id + "'></div>" );
		$menu = $( "<div class='btn-group'></div>" );

		var hasNonPersistentHeaders = false;
		$( this.headers ).not( "td" ).each( function() {
			var $this = $( this ),
				priority = $this.attr("data-priority"),
				$cells = $this.add( this.cells );

			if( priority && priority !== "persist" ) {
				$cells.addClass( self.classes.priorityPrefix + priority );

				$("<label class='btn btn-check btn-checkbox btn-selected theme-simple'><input type='checkbox' checked>" + $this.text() + "</label>" )
					.appendTo( $menu )
					.trigger('enhance')
					.children( 0 )
					.data( "cells", $cells );

				hasNonPersistentHeaders = true;
			}
		});

		if( !hasNonPersistentHeaders ) {
			$menu.append( '<label class="btn theme-simple">' + this.i18n.columnsDialogError + '</label>' );
		}

		$menu.find( '.btn' ).tablesawbtn();
		$menu.appendTo( $popup );

		// bind change event listeners to inputs - TODO: move to a private method?
		$menu.on( "change", function(e) {
			var checked = e.target.checked;

			$( e.target ).data( "cells" )
				.toggleClass( "tablesaw-cell-hidden", !checked )
				.toggleClass( "tablesaw-cell-visible", checked );

			self.$table.trigger( 'tablesawcolumns' );
		});

		$menuButton.appendTo( $btnContain );
		$btnContain.appendTo( this.$table.prev( '.' + this.classes.toolbar ) );
		$popup
			.appendTo( $btnContain )
			.dialog( true );

		this.$menu = $menu;

		$(window).on( "resize." + tableId, function(){
			self.refreshToggle();
		} );

		this.refreshToggle();
	};

	ColumnToggle.prototype.refreshToggle = function() {
		this.$menu.find( "input" ).each( function() {
			var $this = $( this );

			this.checked = $this.data( "cells" ).eq( 0 ).css( "display" ) === "table-cell";

			$this.parent()[ this.checked ? "addClass" : "removeClass" ]( "btn-selected" );
		});
	};

	ColumnToggle.prototype.refreshPriority = function(){
		var self = this;
		$(this.headers).not( "td" ).each( function() {
			var $this = $( this ),
				priority = $this.attr("data-priority"),
				$cells = $this.add( this.cells );

			if( priority && priority !== "persist" ) {
				$cells.addClass( self.classes.priorityPrefix + priority );
			} else {
				$cells.each(function() {
					// remove all priority classes.
					this.className = this.className.replace( /\bui\-table\-priority\-\d\b/g, '' );
				});
			}
		});
	};

	ColumnToggle.prototype.destroy = function() {
		this.$table.removeClass( this.classes.columnToggleTable );
		this.$table.find( 'th, td' ).each(function() {
			var $cell = $( this );
			$cell.removeClass( 'tablesaw-cell-hidden' )
				.removeClass( 'tablesaw-cell-visible' );

			this.className = this.className.replace( /\bui\-table\-priority\-\d\b/g, '' );
		});
	};

	// on tablecreate, init
	$( document ).on( "tablesawcreate", "table", function( e, mode ){

		if( mode === 'columntoggle' ){
			var table = new ColumnToggle( this );
			table.init();
		}

	} );

	$( document ).on( "tablesawdestroy", "table", function( e, mode ){
		if( mode === 'columntoggle' ){
			$( this ).data( 'tablesaw-coltoggle' ).destroy();
		}
	} );

}( this, jQuery ));
;(function( win, $, undefined ){


	function createSwipeTable( $table ){

		var $btns = $( "<div class='tablesaw-advance'></div>" ),
			$prevBtn = $( "<a href='#' class='tablesaw-nav-btn btn btn-micro left' title='Previous Column'></a>" ).appendTo( $btns ),
			$nextBtn = $( "<a href='#' class='tablesaw-nav-btn btn btn-micro right' title='Next Column'></a>" ).appendTo( $btns ),
			hideBtn = 'disabled',
			persistWidths = 'tablesaw-fix-persist',
			$headerCells = $table.find( "thead th" ),
			$headerCellsNoPersist = $headerCells.not( '[data-priority="persist"]' ),
			headerWidths = [],
			$head = $( document.head || 'head' ),
			tableId = $table.attr( 'id' );

		// Calculate initial widths
		$table.css('width', 'auto');
		$headerCells.each(function() {
			headerWidths.push( $( this ).outerWidth() );
		});
		$table.css( 'width', '' );

		$btns.appendTo( $table.prev( '.tablesaw-bar' ) );

		$table.addClass( "tablesaw-swipe" );

		if( !tableId ) {
			tableId = 'tableswipe-' + Math.round( Math.random() * 10000 );
			$table.attr( 'id', tableId );
		}

		function $getCells( headerCell ) {
			return $( headerCell.cells ).add( headerCell );
		}

		function showColumn( headerCell ) {
			$getCells( headerCell ).removeClass( 'tablesaw-cell-hidden' );
		}

		function hideColumn( headerCell ) {
			$getCells( headerCell ).addClass( 'tablesaw-cell-hidden' );
		}

		function persistColumn( headerCell ) {
			$getCells( headerCell ).addClass( 'tablesaw-cell-persist' );
		}

		function isPersistent( headerCell ) {
			return $( headerCell ).is( '[data-priority="persist"]' );
		}

		function unmaintainWidths() {
			$table.removeClass( persistWidths );
			$( '#' + tableId + '-persist' ).remove();
		}

		function maintainWidths() {
			var prefix = '#' + tableId + ' ',
				styles = [],
				tableWidth = $table.width();

			$headerCells.each(function( index ) {
				var width;
				if( isPersistent( this ) ) {
					width = $( this ).outerWidth();

					// Only save width on non-greedy columns (take up less than 75% of table width)
					if( width < tableWidth * 0.75 ) {
						styles.push( prefix + ' .tablesaw-cell-persist:nth-child(' + ( index + 1 ) + ') { width: ' + width + 'px; }' );
					}
				}
			});

			unmaintainWidths();
			$table.addClass( persistWidths );
			$head.append( $( '<style>' ).attr( 'id', tableId + '-persist' ).html( styles.join( "\n" ) ) );
		}

		function getNext(){
			var next = [],
				checkFound;

			$headerCellsNoPersist.each(function( i ) {
				var $t = $( this ),
					isHidden = $t.css( "display" ) === "none";

				if( !isHidden && !checkFound ) {
					checkFound = true;
					next[ 0 ] = i;
				} else if( isHidden && checkFound && !next[ 1 ] ) {
					next[ 1 ] = i;
				}
			});

			return next;
		}

		function getPrev(){
			var next = getNext();
			return [ next[ 1 ] - 1 , next[ 0 ] - 1 ];
		}

		function nextpair( fwd ){
			return fwd ? getNext() : getPrev();
		}

		function canAdvance( pair ){
			return pair[ 1 ] > -1 && pair[ 1 ] < $headerCellsNoPersist.length;
		}

		function fakeBreakpoints() {
			var extraPaddingPixels = 20,
				containerWidth = $table.parent().width(),
				sum = 0;

			$headerCells.each(function( index ) {
				var $t = $( this ),
					isPersist = $t.is( '[data-priority="persist"]' );
				sum += headerWidths[ index ] + ( isPersist ? 0 : extraPaddingPixels );

				if( isPersist ) {
					// for visual box-shadow
					persistColumn( this );
					return;
				}

				if( sum > containerWidth ) {
					hideColumn( this );
				} else {
					showColumn( this );
				}

			});

			unmaintainWidths();
			$table.trigger( 'tablesawcolumns' );
		}

		function advance( fwd ){
			var pair = nextpair( fwd );
			if( canAdvance( pair ) ){
				if( isNaN( pair[ 0 ] ) ){
					if( fwd ){
						pair[0] = 0;
					}
					else {
						pair[0] = $headerCellsNoPersist.length - 1;
					}
				}

				maintainWidths();

				hideColumn( $headerCellsNoPersist.get( pair[ 0 ] ) );
				showColumn( $headerCellsNoPersist.get( pair[ 1 ] ) );

				$table.trigger( 'tablesawcolumns' );
			}
		}

		$prevBtn.add( $nextBtn ).click(function( e ){
			advance( !!$( e.target ).closest( $nextBtn ).length );
			e.preventDefault();
		});

		$table
			.bind( "touchstart.swipetoggle", function( e ){
				var origin = ( e.touches || e.originalEvent.touches )[ 0 ].pageX,
					x,
					drag;

				$table.addClass( "table-noanimate" );

				$( this )
					.bind( "touchmove", function( e ){
						x = ( e.touches || e.originalEvent.touches )[ 0 ].pageX;
						drag = x - origin;
						if( drag < -30 ){
							drag = -30;
						}
						if( drag > 30 ){
							drag = 30;
						}

						//$table.css( { "position": "relative", "left": drag + "px" } );
					})
					.bind( "touchend.swipetoggle", function(){
						if( x - origin < 15 ){
							advance( true );
						}
						if( x - origin > -15 ){
							advance( false );
						}

						$( this ).unbind( "touchmove touchend" );
						$table.removeClass( "table-noanimate" );
						//$table.css( "left", "0" );

					});

			})
			.bind( "tablesawcolumns.swipetoggle", function(){
				$prevBtn[ canAdvance( getPrev() ) ? "removeClass" : "addClass" ]( hideBtn );
				$nextBtn[ canAdvance( getNext() ) ? "removeClass" : "addClass" ]( hideBtn );
			})
			.bind( "tablesawnext.swipetoggle", function(){
				advance( true );
			} )
			.bind( "tablesawprev.swipetoggle", function(){
				advance( false );
			} )
			.bind( "tablesawdestroy.swipetoggle", function(){
				var $t = $( this );

				$t.removeClass( 'tablesaw-swipe' );
				$t.prev( '.tablesaw-bar' ).find( '.tablesaw-advance' ).remove();
				$( win ).off( "resize", fakeBreakpoints );

				$t.unbind( ".swipetoggle" );
			});

		fakeBreakpoints();
		$( win ).on( "resize", fakeBreakpoints );
	}



	// on tablecreate, init
	$( document ).on( "tablesawcreate", "table", function( e, mode ){

		var $table = $( this );
		if( mode === 'swipe' ){
			createSwipeTable( $table );
		}

	} );

}( this, jQuery ));

;(function( $ ) {
	function getSortValue( cell ) {
		return $.map( cell.childNodes, function( el ) {
				var $el = $( el );
				if( $el.is( 'input, select' ) ) {
					return $el.val();
				} else if( $el.hasClass( 'tablesaw-cell-label' ) ) {
					return;
				}
				return $.trim( $el.text() );
			}).join( '' );
	}

	var topLevelPluginName = "tablesaw-sortable",
		pluginName = "sortable",
		initSelector = "table[data-" + pluginName + "]",
		sortableSwitchSelector = "[data-" + pluginName + "-switch]",
		classes = {
			head: pluginName + "-head",
			ascend: pluginName + "-ascending",
			descend: pluginName + "-descending",
			switcher: topLevelPluginName + "-switch",
			tableToolbar: 'tablesaw-toolbar'
		},
		i18n = {
			sort: 'Sort'
		},
		methods = {
			_create: function( o ){
				return $( this ).each(function() {
					var init = $( this ).data( "init" + pluginName );
					if( init ) {
						return false;
					}
					$( this )
						.data( "init"+ pluginName, true )
						.trigger( "beforecreate." + pluginName )
						[ pluginName ]( "_init" , o )
						.trigger( "create." + pluginName );
				});
			},
			_init: function(){
				var el = $( this ),
					heads,
					$switcher;

				var addClassToTable = function(){
						el.addClass( topLevelPluginName );
					},
					addClassToHeads = function( h ){
						$.each( h , function( i , v ){
							$( v ).addClass( classes.head );
						});
					},
					makeHeadsActionable = function( h , fn ){
						$.each( h , function( i , v ){
							var b = $( "<button />" );
							b.bind( "click" , { col: v } , fn );
							$( v ).wrapInner( b );
						});
					},
					clearOthers = function( sibs ){
						$.each( sibs , function( i , v ){
							var col = $( v );
							col.removeAttr( "data-sortable-default-col" );
							col.removeClass( classes.ascend );
							col.removeClass( classes.descend );
						});
					},
					headsOnAction = function( e ){
						if( $( e.target ).is( 'a[href]' ) ) {
							return;
						}

						e.stopPropagation();
						var head = $( this ).parent(),
							v = e.data.col,
							newSortValue = heads.index( head );

						clearOthers( head.siblings() );
						if( head.hasClass( classes.descend ) ){
							el[ pluginName ]( "sortBy" , v , true);
							newSortValue += '_asc';
						} else {
							el[ pluginName ]( "sortBy" , v );
							newSortValue += '_desc';
						}
						if( $switcher ) {
							$switcher.find( 'select' ).val( newSortValue ).trigger( 'refresh' );
						}

						e.preventDefault();
					},
					handleDefault = function( heads ){
						$.each( heads , function( idx , el ){
							var $el = $( el );
							if( $el.is( "[data-sortable-default-col]" ) ){
								if( !$el.hasClass( classes.descend ) ) {
									$el.addClass( classes.ascend );
								}
							}
						});
					},
					addSwitcher = function( heads ){
						$switcher = $( '<div>' ).addClass( classes.switcher ).addClass( classes.tableToolbar ).html(function() {
							var html = [ '<label>' + i18n.sort + ':' ];

							html.push( '<span class="btn btn-small">&#160;<select>' );
							heads.each(function( j ) {
								var $t = $( this ),
									isDefaultCol = $t.is( '[data-sortable-default-col]' ),
									isDescending = $t.hasClass( classes.descend ),
									isNumeric = false;

								// Check only the first three rows to see if the column is numbers.
								$( this.cells ).slice( 0, 3 ).each(function() {
									if( !isNaN( parseInt( getSortValue( this ), 10 ) ) ) {
										isNumeric = true;
										return false;
									}
								});

								html.push( '<option' + ( isDefaultCol && !isDescending ? ' selected' : '' ) + ' value="' + j + '_asc">' + $t.text() + ' ' + ( isNumeric ? '↑' : '(A-Z)' ) + '</option>' );
								html.push( '<option' + ( isDefaultCol && isDescending ? ' selected' : '' ) + ' value="' + j + '_desc">' + $t.text() + ' ' + ( isNumeric ? '↓' : '(Z-A)' ) + '</option>' );
							});
							html.push( '</select></span></label>' );

							return html.join('');
						});

						var $toolbar = el.prev( '.tablesaw-bar' ),
							$firstChild = $toolbar.children().eq( 0 );

						if( $firstChild.length ) {
							$switcher.insertBefore( $firstChild );
						} else {
							$switcher.appendTo( $toolbar );
						}
						$switcher.find( '.btn' ).tablesawbtn();
						$switcher.find( 'select' ).on( 'change', function() {
							var val = $( this ).val().split( '_' ),
								head = heads.eq( val[ 0 ] );

							clearOthers( head.siblings() );
							el.sortable( 'sortBy', head.get( 0 ), val[ 1 ] === 'asc' );
						});
					};

					addClassToTable();
					heads = el.find( "thead th[data-" + pluginName + "-col]" );
					addClassToHeads( heads );
					makeHeadsActionable( heads , headsOnAction );
					handleDefault( heads );

					if( el.is( sortableSwitchSelector ) ) {
						addSwitcher( heads, el.find('tbody tr:nth-child(-n+3)') );
					}
			},
			getColumnNumber: function( col ){
				return $( col ).prevAll().length;
			},
			getTableRows: function(){
				return $( this ).find( "tbody tr" );
			},
			sortRows: function( rows , colNum , ascending ){
				var cells, fn, sorted;
				var getCells = function( rows ){
						var cells = [];
						$.each( rows , function( i , r ){
							cells.push({
								cell: getSortValue( $( r ).children().get( colNum ) ),
								rowNum: i
							});
						});
						return cells;
					},
					getSortFxn = function( ascending ){
						var fn;
						if( ascending ){
							fn = function( a , b ){
								if( parseInt( a.cell , 10 )){
									return parseInt( a.cell , 10 ) - parseInt( b.cell, 10 );
								} else {
									return a.cell.toLowerCase() > b.cell.toLowerCase() ? 1 : -1;
								}
							};
						} else {
							fn = function( a , b ){
								if( parseInt( a.cell , 10 )){
									return parseInt( b.cell , 10 ) - parseInt( a.cell, 10 );
								} else {
									return a.cell.toLowerCase() < b.cell.toLowerCase() ? 1 : -1;
								}
							};
						}
						return fn;
					},
					applyToRows = function( sorted , rows ){
						var newRows = [], i, l, cur;
						for( i = 0, l = sorted.length ; i < l ; i++ ){
							cur = sorted[ i ].rowNum;
							newRows.push( rows[cur] );
						}
						return newRows;
					};

				cells = getCells( rows );
				fn = getSortFxn( ascending );
				sorted = cells.sort( fn );
				rows = applyToRows( sorted , rows );
				return rows;
			},
			replaceTableRows: function( rows ){
				var el = $( this ),
					body = el.find( "tbody" );
				body.html( rows );
			},
			makeColDefault: function( col , a ){
				var c = $( col );
				c.attr( "data-sortable-default-col" , "true" );
				if( a ){
					c.removeClass( classes.descend );
					c.addClass( classes.ascend );
				} else {
					c.removeClass( classes.ascend );
					c.addClass( classes.descend );
				}
			},
			notify: function(){
				//TODO
			},
			sortBy: function( col , ascending ){
				var el = $( this ), colNum, rows;

				colNum = el[ pluginName ]( "getColumnNumber" , col );
				rows = el[ pluginName ]( "getTableRows" );
				rows = el[ pluginName ]( "sortRows" , rows , colNum , ascending );
				el[ pluginName ]( "replaceTableRows" , rows );
				el[ pluginName ]( "makeColDefault" , col , ascending );
				el[ pluginName ]( "notify" );
			}
		};

	// Collection method.
	$.fn[ pluginName ] = function( arrg ) {
		var args = Array.prototype.slice.call( arguments , 1),
			returnVal;

		// if it's a method
		if( arrg && typeof( arrg ) === "string" ){
			returnVal = $.fn[ pluginName ].prototype[ arrg ].apply( this[0], args );
			return (typeof returnVal !== "undefined")? returnVal:$(this);
		}
		// check init
		if( !$( this ).data( pluginName + "data" ) ){
			$( this ).data( pluginName + "active", true );
			$.fn[ pluginName ].prototype._create.call( this , arrg );
		}
		return $(this);
	};
	// add methods
	$.extend( $.fn[ pluginName ].prototype, methods );

	$( document ).on( "tablesawcreate", "table", function() {
		if( $( this ).is( initSelector ) ) {
			$( this )[ pluginName ]();
		}
	});

}( jQuery ));

;(function( win, $, undefined ){

	var MM = {
		attr: {
			init: 'data-minimap'
		}
	};

	function createMiniMap( $table ){

		var $btns = $( '<div class="tablesaw-advance minimap">' ),
			$dotNav = $( '<ul class="tablesaw-advance-dots">' ).appendTo( $btns ),
			hideDot = 'tablesaw-advance-dots-hide',
			$headerCells = $table.find( 'thead th' );

		// populate dots
		$headerCells.each(function(){
			$dotNav.append( '<li><i></i></li>' );
		});

		$btns.appendTo( $table.prev( '.tablesaw-bar' ) );

		function showMinimap( $table ) {
			var mq = $table.attr( MM.attr.init );
			return !mq || win.matchMedia && win.matchMedia( mq ).matches;
		}

		function showHideNav(){
			if( !showMinimap( $table ) ) {
				$btns.hide();
				return;
			}
			$btns.show();

			// show/hide dots
			var dots = $dotNav.find( "li" ).removeClass( hideDot );
			$table.find( "thead th" ).each(function(i){
				if( $( this ).css( "display" ) === "none" ){
					dots.eq( i ).addClass( hideDot );
				}
			});
		}

		// run on init and resize
		showHideNav();
		$( win ).on( "resize", showHideNav );


		$table
			.bind( "tablesawcolumns.minimap", function(){
				showHideNav();
			})
			.bind( "tablesawdestroy.minimap", function(){
				var $t = $( this );

				$t.prev( '.tablesaw-bar' ).find( '.tablesaw-advance' ).remove();
				$( win ).off( "resize", showHideNav );

				$t.unbind( ".minimap" );
			});
	}



	// on tablecreate, init
	$( document ).on( "tablesawcreate", "table", function( e, mode ){

		var $table = $( this );
		if( ( mode === 'swipe' || mode === 'columntoggle' ) && $table.is( '[ ' + MM.attr.init + ']' ) ){
			createMiniMap( $table );
		}

	} );

}( this, jQuery ));

;(function( win, $ ) {

	var S = {
		selectors: {
			init: 'table[data-mode-switch]'
		},
		attributes: {
			excludeMode: 'data-mode-exclude'
		},
		classes: {
			main: 'tablesaw-modeswitch',
			toolbar: 'tablesaw-toolbar'
		},
		modes: [ 'stack', 'swipe', 'columntoggle' ],
		i18n: {
			modes: [ 'Stack', 'Swipe', 'Toggle' ],
			columns: 'Col<span class="a11y-sm">umn</span>s'
		},
		init: function( table ) {
			var $table = $( table ),
				ignoreMode = $table.attr( S.attributes.excludeMode ),
				$toolbar = $table.prev( '.tablesaw-bar' ),
				modeVal = '',
				$switcher = $( '<div>' ).addClass( S.classes.main + ' ' + S.classes.toolbar ).html(function() {
					var html = [ '<label>' + S.i18n.columns + ':' ],
						dataMode = $table.attr( 'data-mode' ),
						isSelected;

					html.push( '<span class="btn btn-small">&#160;<select>' );
					for( var j=0, k = S.modes.length; j<k; j++ ) {
						if( ignoreMode && ignoreMode.toLowerCase() === S.modes[ j ] ) {
							continue;
						}

						isSelected = dataMode === S.modes[ j ];

						if( isSelected ) {
							modeVal = S.modes[ j ];
						}

						html.push( '<option' +
							( isSelected ? ' selected' : '' ) +
							' value="' + S.modes[ j ] + '">' + S.i18n.modes[ j ] + '</option>' );
					}
					html.push( '</select></span></label>' );

					return html.join('');
				});

			var $otherToolbarItems = $toolbar.find( '.tablesaw-advance' ).eq( 0 );
			if( $otherToolbarItems.length ) {
				$switcher.insertBefore( $otherToolbarItems );
			} else {
				$switcher.appendTo( $toolbar );
			}

			$switcher.find( '.btn' ).tablesawbtn();
			$switcher.find( 'select' ).bind( 'change', S.onModeChange );
		},
		onModeChange: function() {
			var $t = $( this ),
				$switcher = $t.closest( '.' + S.classes.main ),
				$table = $t.closest( '.tablesaw-bar' ).nextUntil( $table ).eq( 0 ),
				val = $t.val();

			$switcher.remove();
			$table.data( 'table' ).destroy();

			$table.attr( 'data-mode', val );
			$table.table();
		}
	};

	$( win.document ).on( "tablesawcreate", "table", function() {
		if( $( this ).is( S.selectors.init ) ) {
			S.init( this );
		}
	});

})( this, jQuery );;
/*! skrollr 0.6.26 (2014-06-08) | Alexander Prinzhorn - https://github.com/Prinzhorn/skrollr | Free to use under terms of MIT license */
(function(e,t,r){"use strict";function n(r){if(o=t.documentElement,a=t.body,K(),it=this,r=r||{},ut=r.constants||{},r.easing)for(var n in r.easing)U[n]=r.easing[n];yt=r.edgeStrategy||"set",ct={beforerender:r.beforerender,render:r.render,keyframe:r.keyframe},ft=r.forceHeight!==!1,ft&&(Vt=r.scale||1),mt=r.mobileDeceleration||x,dt=r.smoothScrolling!==!1,gt=r.smoothScrollingDuration||E,vt={targetTop:it.getScrollTop()},Gt=(r.mobileCheck||function(){return/Android|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent||navigator.vendor||e.opera)})(),Gt?(st=t.getElementById("skrollr-body"),st&&at(),X(),Dt(o,[y,S],[T])):Dt(o,[y,b],[T]),it.refresh(),St(e,"resize orientationchange",function(){var e=o.clientWidth,t=o.clientHeight;(t!==$t||e!==Mt)&&($t=t,Mt=e,_t=!0)});var i=Y();return function l(){Z(),bt=i(l)}(),it}var o,a,i={get:function(){return it},init:function(e){return it||new n(e)},VERSION:"0.6.26"},l=Object.prototype.hasOwnProperty,s=e.Math,c=e.getComputedStyle,f="touchstart",u="touchmove",m="touchcancel",p="touchend",d="skrollable",g=d+"-before",v=d+"-between",h=d+"-after",y="skrollr",T="no-"+y,b=y+"-desktop",S=y+"-mobile",k="linear",w=1e3,x=.004,E=200,A="start",F="end",C="center",D="bottom",H="___skrollable_id",I=/^(?:input|textarea|button|select)$/i,P=/^\s+|\s+$/g,N=/^data(?:-(_\w+))?(?:-?(-?\d*\.?\d+p?))?(?:-?(start|end|top|center|bottom))?(?:-?(top|center|bottom))?$/,O=/\s*(@?[\w\-\[\]]+)\s*:\s*(.+?)\s*(?:;|$)/gi,V=/^(@?[a-z\-]+)\[(\w+)\]$/,z=/-([a-z0-9_])/g,q=function(e,t){return t.toUpperCase()},L=/[\-+]?[\d]*\.?[\d]+/g,M=/\{\?\}/g,$=/rgba?\(\s*-?\d+\s*,\s*-?\d+\s*,\s*-?\d+/g,_=/[a-z\-]+-gradient/g,B="",G="",K=function(){var e=/^(?:O|Moz|webkit|ms)|(?:-(?:o|moz|webkit|ms)-)/;if(c){var t=c(a,null);for(var n in t)if(B=n.match(e)||+n==n&&t[n].match(e))break;if(!B)return B=G="",r;B=B[0],"-"===B.slice(0,1)?(G=B,B={"-webkit-":"webkit","-moz-":"Moz","-ms-":"ms","-o-":"O"}[B]):G="-"+B.toLowerCase()+"-"}},Y=function(){var t=e.requestAnimationFrame||e[B.toLowerCase()+"RequestAnimationFrame"],r=Pt();return(Gt||!t)&&(t=function(t){var n=Pt()-r,o=s.max(0,1e3/60-n);return e.setTimeout(function(){r=Pt(),t()},o)}),t},R=function(){var t=e.cancelAnimationFrame||e[B.toLowerCase()+"CancelAnimationFrame"];return(Gt||!t)&&(t=function(t){return e.clearTimeout(t)}),t},U={begin:function(){return 0},end:function(){return 1},linear:function(e){return e},quadratic:function(e){return e*e},cubic:function(e){return e*e*e},swing:function(e){return-s.cos(e*s.PI)/2+.5},sqrt:function(e){return s.sqrt(e)},outCubic:function(e){return s.pow(e-1,3)+1},bounce:function(e){var t;if(.5083>=e)t=3;else if(.8489>=e)t=9;else if(.96208>=e)t=27;else{if(!(.99981>=e))return 1;t=91}return 1-s.abs(3*s.cos(1.028*e*t)/t)}};n.prototype.refresh=function(e){var n,o,a=!1;for(e===r?(a=!0,lt=[],Bt=0,e=t.getElementsByTagName("*")):e.length===r&&(e=[e]),n=0,o=e.length;o>n;n++){var i=e[n],l=i,s=[],c=dt,f=yt,u=!1;if(a&&H in i&&delete i[H],i.attributes){for(var m=0,p=i.attributes.length;p>m;m++){var g=i.attributes[m];if("data-anchor-target"!==g.name)if("data-smooth-scrolling"!==g.name)if("data-edge-strategy"!==g.name)if("data-emit-events"!==g.name){var v=g.name.match(N);if(null!==v){var h={props:g.value,element:i,eventType:g.name.replace(z,q)};s.push(h);var y=v[1];y&&(h.constant=y.substr(1));var T=v[2];/p$/.test(T)?(h.isPercentage=!0,h.offset=(0|T.slice(0,-1))/100):h.offset=0|T;var b=v[3],S=v[4]||b;b&&b!==A&&b!==F?(h.mode="relative",h.anchors=[b,S]):(h.mode="absolute",b===F?h.isEnd=!0:h.isPercentage||(h.offset=h.offset*Vt))}}else u=!0;else f=g.value;else c="off"!==g.value;else if(l=t.querySelector(g.value),null===l)throw'Unable to find anchor target "'+g.value+'"'}if(s.length){var k,w,x;!a&&H in i?(x=i[H],k=lt[x].styleAttr,w=lt[x].classAttr):(x=i[H]=Bt++,k=i.style.cssText,w=Ct(i)),lt[x]={element:i,styleAttr:k,classAttr:w,anchorTarget:l,keyFrames:s,smoothScrolling:c,edgeStrategy:f,emitEvents:u,lastFrameIndex:-1},Dt(i,[d],[])}}}for(Et(),n=0,o=e.length;o>n;n++){var E=lt[e[n][H]];E!==r&&(J(E),et(E))}return it},n.prototype.relativeToAbsolute=function(e,t,r){var n=o.clientHeight,a=e.getBoundingClientRect(),i=a.top,l=a.bottom-a.top;return t===D?i-=n:t===C&&(i-=n/2),r===D?i+=l:r===C&&(i+=l/2),i+=it.getScrollTop(),0|i+.5},n.prototype.animateTo=function(e,t){t=t||{};var n=Pt(),o=it.getScrollTop();return pt={startTop:o,topDiff:e-o,targetTop:e,duration:t.duration||w,startTime:n,endTime:n+(t.duration||w),easing:U[t.easing||k],done:t.done},pt.topDiff||(pt.done&&pt.done.call(it,!1),pt=r),it},n.prototype.stopAnimateTo=function(){pt&&pt.done&&pt.done.call(it,!0),pt=r},n.prototype.isAnimatingTo=function(){return!!pt},n.prototype.isMobile=function(){return Gt},n.prototype.setScrollTop=function(t,r){return ht=r===!0,Gt?Kt=s.min(s.max(t,0),Ot):e.scrollTo(0,t),it},n.prototype.getScrollTop=function(){return Gt?Kt:e.pageYOffset||o.scrollTop||a.scrollTop||0},n.prototype.getMaxScrollTop=function(){return Ot},n.prototype.on=function(e,t){return ct[e]=t,it},n.prototype.off=function(e){return delete ct[e],it},n.prototype.destroy=function(){var e=R();e(bt),wt(),Dt(o,[T],[y,b,S]);for(var t=0,n=lt.length;n>t;t++)ot(lt[t].element);o.style.overflow=a.style.overflow="",o.style.height=a.style.height="",st&&i.setStyle(st,"transform","none"),it=r,st=r,ct=r,ft=r,Ot=0,Vt=1,ut=r,mt=r,zt="down",qt=-1,Mt=0,$t=0,_t=!1,pt=r,dt=r,gt=r,vt=r,ht=r,Bt=0,yt=r,Gt=!1,Kt=0,Tt=r};var X=function(){var n,i,l,c,d,g,v,h,y,T,b,S;St(o,[f,u,m,p].join(" "),function(e){var o=e.changedTouches[0];for(c=e.target;3===c.nodeType;)c=c.parentNode;switch(d=o.clientY,g=o.clientX,T=e.timeStamp,I.test(c.tagName)||e.preventDefault(),e.type){case f:n&&n.blur(),it.stopAnimateTo(),n=c,i=v=d,l=g,y=T;break;case u:I.test(c.tagName)&&t.activeElement!==c&&e.preventDefault(),h=d-v,S=T-b,it.setScrollTop(Kt-h,!0),v=d,b=T;break;default:case m:case p:var a=i-d,k=l-g,w=k*k+a*a;if(49>w){if(!I.test(n.tagName)){n.focus();var x=t.createEvent("MouseEvents");x.initMouseEvent("click",!0,!0,e.view,1,o.screenX,o.screenY,o.clientX,o.clientY,e.ctrlKey,e.altKey,e.shiftKey,e.metaKey,0,null),n.dispatchEvent(x)}return}n=r;var E=h/S;E=s.max(s.min(E,3),-3);var A=s.abs(E/mt),F=E*A+.5*mt*A*A,C=it.getScrollTop()-F,D=0;C>Ot?(D=(Ot-C)/F,C=Ot):0>C&&(D=-C/F,C=0),A*=1-D,it.animateTo(0|C+.5,{easing:"outCubic",duration:A})}}),e.scrollTo(0,0),o.style.overflow=a.style.overflow="hidden"},j=function(){var e,t,r,n,a,i,l,c,f,u,m,p=o.clientHeight,d=At();for(c=0,f=lt.length;f>c;c++)for(e=lt[c],t=e.element,r=e.anchorTarget,n=e.keyFrames,a=0,i=n.length;i>a;a++)l=n[a],u=l.offset,m=d[l.constant]||0,l.frame=u,l.isPercentage&&(u*=p,l.frame=u),"relative"===l.mode&&(ot(t),l.frame=it.relativeToAbsolute(r,l.anchors[0],l.anchors[1])-u,ot(t,!0)),l.frame+=m,ft&&!l.isEnd&&l.frame>Ot&&(Ot=l.frame);for(Ot=s.max(Ot,Ft()),c=0,f=lt.length;f>c;c++){for(e=lt[c],n=e.keyFrames,a=0,i=n.length;i>a;a++)l=n[a],m=d[l.constant]||0,l.isEnd&&(l.frame=Ot-l.offset+m);e.keyFrames.sort(Nt)}},W=function(e,t){for(var r=0,n=lt.length;n>r;r++){var o,a,s=lt[r],c=s.element,f=s.smoothScrolling?e:t,u=s.keyFrames,m=u.length,p=u[0],y=u[u.length-1],T=p.frame>f,b=f>y.frame,S=T?p:y,k=s.emitEvents,w=s.lastFrameIndex;if(T||b){if(T&&-1===s.edge||b&&1===s.edge)continue;switch(T?(Dt(c,[g],[h,v]),k&&w>-1&&(xt(c,p.eventType,zt),s.lastFrameIndex=-1)):(Dt(c,[h],[g,v]),k&&m>w&&(xt(c,y.eventType,zt),s.lastFrameIndex=m)),s.edge=T?-1:1,s.edgeStrategy){case"reset":ot(c);continue;case"ease":f=S.frame;break;default:case"set":var x=S.props;for(o in x)l.call(x,o)&&(a=nt(x[o].value),0===o.indexOf("@")?c.setAttribute(o.substr(1),a):i.setStyle(c,o,a));continue}}else 0!==s.edge&&(Dt(c,[d,v],[g,h]),s.edge=0);for(var E=0;m-1>E;E++)if(f>=u[E].frame&&u[E+1].frame>=f){var A=u[E],F=u[E+1];for(o in A.props)if(l.call(A.props,o)){var C=(f-A.frame)/(F.frame-A.frame);C=A.props[o].easing(C),a=rt(A.props[o].value,F.props[o].value,C),a=nt(a),0===o.indexOf("@")?c.setAttribute(o.substr(1),a):i.setStyle(c,o,a)}k&&w!==E&&("down"===zt?xt(c,A.eventType,zt):xt(c,F.eventType,zt),s.lastFrameIndex=E);break}}},Z=function(){_t&&(_t=!1,Et());var e,t,n=it.getScrollTop(),o=Pt();if(pt)o>=pt.endTime?(n=pt.targetTop,e=pt.done,pt=r):(t=pt.easing((o-pt.startTime)/pt.duration),n=0|pt.startTop+t*pt.topDiff),it.setScrollTop(n,!0);else if(!ht){var a=vt.targetTop-n;a&&(vt={startTop:qt,topDiff:n-qt,targetTop:n,startTime:Lt,endTime:Lt+gt}),vt.endTime>=o&&(t=U.sqrt((o-vt.startTime)/gt),n=0|vt.startTop+t*vt.topDiff)}if(Gt&&st&&i.setStyle(st,"transform","translate(0, "+-Kt+"px) "+Tt),ht||qt!==n){zt=n>qt?"down":qt>n?"up":zt,ht=!1;var l={curTop:n,lastTop:qt,maxTop:Ot,direction:zt},s=ct.beforerender&&ct.beforerender.call(it,l);s!==!1&&(W(n,it.getScrollTop()),qt=n,ct.render&&ct.render.call(it,l)),e&&e.call(it,!1)}Lt=o},J=function(e){for(var t=0,r=e.keyFrames.length;r>t;t++){for(var n,o,a,i,l=e.keyFrames[t],s={};null!==(i=O.exec(l.props));)a=i[1],o=i[2],n=a.match(V),null!==n?(a=n[1],n=n[2]):n=k,o=o.indexOf("!")?Q(o):[o.slice(1)],s[a]={value:o,easing:U[n]};l.props=s}},Q=function(e){var t=[];return $.lastIndex=0,e=e.replace($,function(e){return e.replace(L,function(e){return 100*(e/255)+"%"})}),G&&(_.lastIndex=0,e=e.replace(_,function(e){return G+e})),e=e.replace(L,function(e){return t.push(+e),"{?}"}),t.unshift(e),t},et=function(e){var t,r,n={};for(t=0,r=e.keyFrames.length;r>t;t++)tt(e.keyFrames[t],n);for(n={},t=e.keyFrames.length-1;t>=0;t--)tt(e.keyFrames[t],n)},tt=function(e,t){var r;for(r in t)l.call(e.props,r)||(e.props[r]=t[r]);for(r in e.props)t[r]=e.props[r]},rt=function(e,t,r){var n,o=e.length;if(o!==t.length)throw"Can't interpolate between \""+e[0]+'" and "'+t[0]+'"';var a=[e[0]];for(n=1;o>n;n++)a[n]=e[n]+(t[n]-e[n])*r;return a},nt=function(e){var t=1;return M.lastIndex=0,e[0].replace(M,function(){return e[t++]})},ot=function(e,t){e=[].concat(e);for(var r,n,o=0,a=e.length;a>o;o++)n=e[o],r=lt[n[H]],r&&(t?(n.style.cssText=r.dirtyStyleAttr,Dt(n,r.dirtyClassAttr)):(r.dirtyStyleAttr=n.style.cssText,r.dirtyClassAttr=Ct(n),n.style.cssText=r.styleAttr,Dt(n,r.classAttr)))},at=function(){Tt="translateZ(0)",i.setStyle(st,"transform",Tt);var e=c(st),t=e.getPropertyValue("transform"),r=e.getPropertyValue(G+"transform"),n=t&&"none"!==t||r&&"none"!==r;n||(Tt="")};i.setStyle=function(e,t,r){var n=e.style;if(t=t.replace(z,q).replace("-",""),"zIndex"===t)n[t]=isNaN(r)?r:""+(0|r);else if("float"===t)n.styleFloat=n.cssFloat=r;else try{B&&(n[B+t.slice(0,1).toUpperCase()+t.slice(1)]=r),n[t]=r}catch(o){}};var it,lt,st,ct,ft,ut,mt,pt,dt,gt,vt,ht,yt,Tt,bt,St=i.addEvent=function(t,r,n){var o=function(t){return t=t||e.event,t.target||(t.target=t.srcElement),t.preventDefault||(t.preventDefault=function(){t.returnValue=!1,t.defaultPrevented=!0}),n.call(this,t)};r=r.split(" ");for(var a,i=0,l=r.length;l>i;i++)a=r[i],t.addEventListener?t.addEventListener(a,n,!1):t.attachEvent("on"+a,o),Yt.push({element:t,name:a,listener:n})},kt=i.removeEvent=function(e,t,r){t=t.split(" ");for(var n=0,o=t.length;o>n;n++)e.removeEventListener?e.removeEventListener(t[n],r,!1):e.detachEvent("on"+t[n],r)},wt=function(){for(var e,t=0,r=Yt.length;r>t;t++)e=Yt[t],kt(e.element,e.name,e.listener);Yt=[]},xt=function(e,t,r){ct.keyframe&&ct.keyframe.call(it,e,t,r)},Et=function(){var e=it.getScrollTop();Ot=0,ft&&!Gt&&(a.style.height=""),j(),ft&&!Gt&&(a.style.height=Ot+o.clientHeight+"px"),Gt?it.setScrollTop(s.min(it.getScrollTop(),Ot)):it.setScrollTop(e,!0),ht=!0},At=function(){var e,t,r=o.clientHeight,n={};for(e in ut)t=ut[e],"function"==typeof t?t=t.call(it):/p$/.test(t)&&(t=t.slice(0,-1)/100*r),n[e]=t;return n},Ft=function(){var e=st&&st.offsetHeight||0,t=s.max(e,a.scrollHeight,a.offsetHeight,o.scrollHeight,o.offsetHeight,o.clientHeight);return t-o.clientHeight},Ct=function(t){var r="className";return e.SVGElement&&t instanceof e.SVGElement&&(t=t[r],r="baseVal"),t[r]},Dt=function(t,n,o){var a="className";if(e.SVGElement&&t instanceof e.SVGElement&&(t=t[a],a="baseVal"),o===r)return t[a]=n,r;for(var i=t[a],l=0,s=o.length;s>l;l++)i=It(i).replace(It(o[l])," ");i=Ht(i);for(var c=0,f=n.length;f>c;c++)-1===It(i).indexOf(It(n[c]))&&(i+=" "+n[c]);t[a]=Ht(i)},Ht=function(e){return e.replace(P,"")},It=function(e){return" "+e+" "},Pt=Date.now||function(){return+new Date},Nt=function(e,t){return e.frame-t.frame},Ot=0,Vt=1,zt="down",qt=-1,Lt=Pt(),Mt=0,$t=0,_t=!1,Bt=0,Gt=!1,Kt=0,Yt=[];"function"==typeof define&&define.amd?define("skrollr",function(){return i}):"undefined"!=typeof module&&module.exports?module.exports=i:e.skrollr=i})(window,document);;
/*! skrollr-menu 0.1.12 (2014-05-10) | Alexander Prinzhorn - https://github.com/Prinzhorn/skrollr-menu | Free to use under terms of MIT license */
(function(t,e){"use strict";var n=500,o="sqrt",r=1,i="data-menu-top",u="data-menu-offset",a=e.skrollr,c=e.history,l=!!c.pushState,s=function(e){return e===t?!1:"A"===e.tagName.toUpperCase()?e:s(e.parentNode)},f=function(t){if(1===t.which||0===t.button){var e=s(t.target);e&&p(e)&&t.preventDefault()}},p=function(e,n){var o=e.getAttribute("href");if(!/^#/.test(o))return!1;var r,a;if(a=S?S(e):e.getAttribute(i),null!==a)r=/p$/.test(a)?a.slice(0,-1)/100*t.documentElement.clientHeight:+a*T;else{var s=t.getElementById(o.substr(1));if(!s)return!1;r=m.relativeToAbsolute(s,"top","top");var f=s.getAttribute(u);null!==f&&(r+=+f)}return l&&!n&&c.pushState({top:r},"",o),b&&!n?m.animateTo(r,{duration:g(m.getScrollTop(),r),easing:v}):d(function(){m.setScrollTop(r)}),!0},h=function(){if(e.location.hash&&t.querySelector){var n=t.querySelector('a[href="'+e.location.hash+'"]');n&&p(n,!0)}},d=function(t){e.setTimeout(t,1)};a.menu={},a.menu.init=function(i,u){m=i,u=u||{},v=u.easing||o,b=u.animate!==!1,g=u.duration||n,S=u.handleLink,T=u.scale||r,"number"==typeof g&&(g=function(t){return function(){return t}}(g)),a.addEvent(t,"click",f),l&&a.addEvent(e,"popstate",function(t){var e=t.state||{},n=e.top||0;d(function(){m.setScrollTop(n)})},!1),h()},a.menu.click=function(t){p(t)};var m,v,g,b,S,T;d(function(){e.location.hash&&e.scrollTo(0,0)})})(document,window);;
/*!
Chosen, a Select Box Enhancer for jQuery and Prototype
by Patrick Filler for Harvest, http://getharvest.com

Version 1.1.0
Full source at https://github.com/harvesthq/chosen
Copyright (c) 2011 Harvest http://getharvest.com

MIT License, https://github.com/harvesthq/chosen/blob/master/LICENSE.md
This file is generated by `grunt build`, do not edit it by hand.
*/

(function() {
  var $, AbstractChosen, Chosen, SelectParser, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  SelectParser = (function() {
    function SelectParser() {
      this.options_index = 0;
      this.parsed = [];
    }

    SelectParser.prototype.add_node = function(child) {
      if (child.nodeName.toUpperCase() === "OPTGROUP") {
        return this.add_group(child);
      } else {
        return this.add_option(child);
      }
    };

    SelectParser.prototype.add_group = function(group) {
      var group_position, option, _i, _len, _ref, _results;
      group_position = this.parsed.length;
      this.parsed.push({
        array_index: group_position,
        group: true,
        label: this.escapeExpression(group.label),
        children: 0,
        disabled: group.disabled
      });
      _ref = group.childNodes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        option = _ref[_i];
        _results.push(this.add_option(option, group_position, group.disabled));
      }
      return _results;
    };

    SelectParser.prototype.add_option = function(option, group_position, group_disabled) {
      if (option.nodeName.toUpperCase() === "OPTION") {
        if (option.text !== "") {
          if (group_position != null) {
            this.parsed[group_position].children += 1;
          }
          this.parsed.push({
            array_index: this.parsed.length,
            options_index: this.options_index,
            value: option.value,
            text: option.text,
            html: option.innerHTML,
            selected: option.selected,
            disabled: group_disabled === true ? group_disabled : option.disabled,
            group_array_index: group_position,
            classes: option.className,
            style: option.style.cssText
          });
        } else {
          this.parsed.push({
            array_index: this.parsed.length,
            options_index: this.options_index,
            empty: true
          });
        }
        return this.options_index += 1;
      }
    };

    SelectParser.prototype.escapeExpression = function(text) {
      var map, unsafe_chars;
      if ((text == null) || text === false) {
        return "";
      }
      if (!/[\&\<\>\"\'\`]/.test(text)) {
        return text;
      }
      map = {
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "`": "&#x60;"
      };
      unsafe_chars = /&(?!\w+;)|[\<\>\"\'\`]/g;
      return text.replace(unsafe_chars, function(chr) {
        return map[chr] || "&amp;";
      });
    };

    return SelectParser;

  })();

  SelectParser.select_to_array = function(select) {
    var child, parser, _i, _len, _ref;
    parser = new SelectParser();
    _ref = select.childNodes;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      child = _ref[_i];
      parser.add_node(child);
    }
    return parser.parsed;
  };

  AbstractChosen = (function() {
    function AbstractChosen(form_field, options) {
      this.form_field = form_field;
      this.options = options != null ? options : {};
      if (!AbstractChosen.browser_is_supported()) {
        return;
      }
      this.is_multiple = this.form_field.multiple;
      this.set_default_text();
      this.set_default_values();
      this.setup();
      this.set_up_html();
      this.register_observers();
    }

    AbstractChosen.prototype.set_default_values = function() {
      var _this = this;
      this.click_test_action = function(evt) {
        return _this.test_active_click(evt);
      };
      this.activate_action = function(evt) {
        return _this.activate_field(evt);
      };
      this.active_field = false;
      this.mouse_on_container = false;
      this.results_showing = false;
      this.result_highlighted = null;
      this.allow_single_deselect = (this.options.allow_single_deselect != null) && (this.form_field.options[0] != null) && this.form_field.options[0].text === "" ? this.options.allow_single_deselect : false;
      this.disable_search_threshold = this.options.disable_search_threshold || 0;
      this.disable_search = this.options.disable_search || false;
      this.enable_split_word_search = this.options.enable_split_word_search != null ? this.options.enable_split_word_search : true;
      this.group_search = this.options.group_search != null ? this.options.group_search : true;
      this.search_contains = this.options.search_contains || false;
      this.single_backstroke_delete = this.options.single_backstroke_delete != null ? this.options.single_backstroke_delete : true;
      this.max_selected_options = this.options.max_selected_options || Infinity;
      this.inherit_select_classes = this.options.inherit_select_classes || false;
      this.display_selected_options = this.options.display_selected_options != null ? this.options.display_selected_options : true;
      return this.display_disabled_options = this.options.display_disabled_options != null ? this.options.display_disabled_options : true;
    };

    AbstractChosen.prototype.set_default_text = function() {
      if (this.form_field.getAttribute("data-placeholder")) {
        this.default_text = this.form_field.getAttribute("data-placeholder");
      } else if (this.is_multiple) {
        this.default_text = this.options.placeholder_text_multiple || this.options.placeholder_text || AbstractChosen.default_multiple_text;
      } else {
        this.default_text = this.options.placeholder_text_single || this.options.placeholder_text || AbstractChosen.default_single_text;
      }
      return this.results_none_found = this.form_field.getAttribute("data-no_results_text") || this.options.no_results_text || AbstractChosen.default_no_result_text;
    };

    AbstractChosen.prototype.mouse_enter = function() {
      return this.mouse_on_container = true;
    };

    AbstractChosen.prototype.mouse_leave = function() {
      return this.mouse_on_container = false;
    };

    AbstractChosen.prototype.input_focus = function(evt) {
      var _this = this;
      if (this.is_multiple) {
        if (!this.active_field) {
          return setTimeout((function() {
            return _this.container_mousedown();
          }), 50);
        }
      } else {
        if (!this.active_field) {
          return this.activate_field();
        }
      }
    };

    AbstractChosen.prototype.input_blur = function(evt) {
      var _this = this;
      if (!this.mouse_on_container) {
        this.active_field = false;
        return setTimeout((function() {
          return _this.blur_test();
        }), 100);
      }
    };

    AbstractChosen.prototype.results_option_build = function(options) {
      var content, data, _i, _len, _ref;
      content = '';
      _ref = this.results_data;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        data = _ref[_i];
        if (data.group) {
          content += this.result_add_group(data);
        } else {
          content += this.result_add_option(data);
        }
        if (options != null ? options.first : void 0) {
          if (data.selected && this.is_multiple) {
            this.choice_build(data);
          } else if (data.selected && !this.is_multiple) {
            this.single_set_selected_text(data.text);
          }
        }
      }
      return content;
    };

    AbstractChosen.prototype.result_add_option = function(option) {
      var classes, option_el;
      if (!option.search_match) {
        return '';
      }
      if (!this.include_option_in_results(option)) {
        return '';
      }
      classes = [];
      if (!option.disabled && !(option.selected && this.is_multiple)) {
        classes.push("active-result");
      }
      if (option.disabled && !(option.selected && this.is_multiple)) {
        classes.push("disabled-result");
      }
      if (option.selected) {
        classes.push("result-selected");
      }
      if (option.group_array_index != null) {
        classes.push("group-option");
      }
      if (option.classes !== "") {
        classes.push(option.classes);
      }
      option_el = document.createElement("li");
      option_el.className = classes.join(" ");
      option_el.style.cssText = option.style;
      option_el.setAttribute("data-option-array-index", option.array_index);
      option_el.innerHTML = option.search_text;
      return this.outerHTML(option_el);
    };

    AbstractChosen.prototype.result_add_group = function(group) {
      var group_el;
      if (!(group.search_match || group.group_match)) {
        return '';
      }
      if (!(group.active_options > 0)) {
        return '';
      }
      group_el = document.createElement("li");
      group_el.className = "group-result";
      group_el.innerHTML = group.search_text;
      return this.outerHTML(group_el);
    };

    AbstractChosen.prototype.results_update_field = function() {
      this.set_default_text();
      if (!this.is_multiple) {
        this.results_reset_cleanup();
      }
      this.result_clear_highlight();
      this.results_build();
      if (this.results_showing) {
        return this.winnow_results();
      }
    };

    AbstractChosen.prototype.reset_single_select_options = function() {
      var result, _i, _len, _ref, _results;
      _ref = this.results_data;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        result = _ref[_i];
        if (result.selected) {
          _results.push(result.selected = false);
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    AbstractChosen.prototype.results_toggle = function() {
      if (this.results_showing) {
        return this.results_hide();
      } else {
        return this.results_show();
      }
    };

    AbstractChosen.prototype.results_search = function(evt) {
      if (this.results_showing) {
        return this.winnow_results();
      } else {
        return this.results_show();
      }
    };

    AbstractChosen.prototype.winnow_results = function() {
      var escapedSearchText, option, regex, regexAnchor, results, results_group, searchText, startpos, text, zregex, _i, _len, _ref;
      this.no_results_clear();
      results = 0;
      searchText = this.get_search_text();
      escapedSearchText = searchText.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
      regexAnchor = this.search_contains ? "" : "^";
      regex = new RegExp(regexAnchor + escapedSearchText, 'i');
      zregex = new RegExp(escapedSearchText, 'i');
      _ref = this.results_data;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        option = _ref[_i];
        option.search_match = false;
        results_group = null;
        if (this.include_option_in_results(option)) {
          if (option.group) {
            option.group_match = false;
            option.active_options = 0;
          }
          if ((option.group_array_index != null) && this.results_data[option.group_array_index]) {
            results_group = this.results_data[option.group_array_index];
            if (results_group.active_options === 0 && results_group.search_match) {
              results += 1;
            }
            results_group.active_options += 1;
          }
          if (!(option.group && !this.group_search)) {
            option.search_text = option.group ? option.label : option.html;
            option.search_match = this.search_string_match(option.search_text, regex);
            if (option.search_match && !option.group) {
              results += 1;
            }
            if (option.search_match) {
              if (searchText.length) {
                startpos = option.search_text.search(zregex);
                text = option.search_text.substr(0, startpos + searchText.length) + '</em>' + option.search_text.substr(startpos + searchText.length);
                option.search_text = text.substr(0, startpos) + '<em>' + text.substr(startpos);
              }
              if (results_group != null) {
                results_group.group_match = true;
              }
            } else if ((option.group_array_index != null) && this.results_data[option.group_array_index].search_match) {
              option.search_match = true;
            }
          }
        }
      }
      this.result_clear_highlight();
      if (results < 1 && searchText.length) {
        this.update_results_content("");
        return this.no_results(searchText);
      } else {
        this.update_results_content(this.results_option_build());
        return this.winnow_results_set_highlight();
      }
    };

    AbstractChosen.prototype.search_string_match = function(search_string, regex) {
      var part, parts, _i, _len;
      if (regex.test(search_string)) {
        return true;
      } else if (this.enable_split_word_search && (search_string.indexOf(" ") >= 0 || search_string.indexOf("[") === 0)) {
        parts = search_string.replace(/\[|\]/g, "").split(" ");
        if (parts.length) {
          for (_i = 0, _len = parts.length; _i < _len; _i++) {
            part = parts[_i];
            if (regex.test(part)) {
              return true;
            }
          }
        }
      }
    };

    AbstractChosen.prototype.choices_count = function() {
      var option, _i, _len, _ref;
      if (this.selected_option_count != null) {
        return this.selected_option_count;
      }
      this.selected_option_count = 0;
      _ref = this.form_field.options;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        option = _ref[_i];
        if (option.selected) {
          this.selected_option_count += 1;
        }
      }
      return this.selected_option_count;
    };

    AbstractChosen.prototype.choices_click = function(evt) {
      evt.preventDefault();
      if (!(this.results_showing || this.is_disabled)) {
        return this.results_show();
      }
    };

    AbstractChosen.prototype.keyup_checker = function(evt) {
      var stroke, _ref;
      stroke = (_ref = evt.which) != null ? _ref : evt.keyCode;
      this.search_field_scale();
      switch (stroke) {
        case 8:
          if (this.is_multiple && this.backstroke_length < 1 && this.choices_count() > 0) {
            return this.keydown_backstroke();
          } else if (!this.pending_backstroke) {
            this.result_clear_highlight();
            return this.results_search();
          }
          break;
        case 13:
          evt.preventDefault();
          if (this.results_showing) {
            return this.result_select(evt);
          }
          break;
        case 27:
          if (this.results_showing) {
            this.results_hide();
          }
          return true;
        case 9:
        case 38:
        case 40:
        case 16:
        case 91:
        case 17:
          break;
        default:
          return this.results_search();
      }
    };

    AbstractChosen.prototype.clipboard_event_checker = function(evt) {
      var _this = this;
      return setTimeout((function() {
        return _this.results_search();
      }), 50);
    };

    AbstractChosen.prototype.container_width = function() {
      if (this.options.width != null) {
        return this.options.width;
      } else {
        return "" + this.form_field.offsetWidth + "px";
      }
    };

    AbstractChosen.prototype.include_option_in_results = function(option) {
      if (this.is_multiple && (!this.display_selected_options && option.selected)) {
        return false;
      }
      if (!this.display_disabled_options && option.disabled) {
        return false;
      }
      if (option.empty) {
        return false;
      }
      return true;
    };

    AbstractChosen.prototype.search_results_touchstart = function(evt) {
      this.touch_started = true;
      return this.search_results_mouseover(evt);
    };

    AbstractChosen.prototype.search_results_touchmove = function(evt) {
      this.touch_started = false;
      return this.search_results_mouseout(evt);
    };

    AbstractChosen.prototype.search_results_touchend = function(evt) {
      if (this.touch_started) {
        return this.search_results_mouseup(evt);
      }
    };

    AbstractChosen.prototype.outerHTML = function(element) {
      var tmp;
      if (element.outerHTML) {
        return element.outerHTML;
      }
      tmp = document.createElement("div");
      tmp.appendChild(element);
      return tmp.innerHTML;
    };

    AbstractChosen.browser_is_supported = function() {
      if (window.navigator.appName === "Microsoft Internet Explorer") {
        return document.documentMode >= 8;
      }
      if (/iP(od|hone)/i.test(window.navigator.userAgent)) {
        return false;
      }
      if (/Android/i.test(window.navigator.userAgent)) {
        if (/Mobile/i.test(window.navigator.userAgent)) {
          return false;
        }
      }
      return true;
    };

    AbstractChosen.default_multiple_text = "Select Some Options";

    AbstractChosen.default_single_text = "Select an Option";

    AbstractChosen.default_no_result_text = "No results match";

    return AbstractChosen;

  })();

  $ = jQuery;

  $.fn.extend({
    chosen: function(options) {
      if (!AbstractChosen.browser_is_supported()) {
        return this;
      }
      return this.each(function(input_field) {
        var $this, chosen;
        $this = $(this);
        chosen = $this.data('chosen');
        if (options === 'destroy' && chosen) {
          chosen.destroy();
        } else if (!chosen) {
          $this.data('chosen', new Chosen(this, options));
        }
      });
    }
  });

  Chosen = (function(_super) {
    __extends(Chosen, _super);

    function Chosen() {
      _ref = Chosen.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Chosen.prototype.setup = function() {
      this.form_field_jq = $(this.form_field);
      this.current_selectedIndex = this.form_field.selectedIndex;
      return this.is_rtl = this.form_field_jq.hasClass("chosen-rtl");
    };

    Chosen.prototype.set_up_html = function() {
      var container_classes, container_props;
      container_classes = ["chosen-container"];
      container_classes.push("chosen-container-" + (this.is_multiple ? "multi" : "single"));
      if (this.inherit_select_classes && this.form_field.className) {
        container_classes.push(this.form_field.className);
      }
      if (this.is_rtl) {
        container_classes.push("chosen-rtl");
      }
      container_props = {
        'class': container_classes.join(' '),
        'style': "width: " + (this.container_width()) + ";",
        'title': this.form_field.title
      };
      if (this.form_field.id.length) {
        container_props.id = this.form_field.id.replace(/[^\w]/g, '_') + "_chosen";
      }
      this.container = $("<div />", container_props);
      if (this.is_multiple) {
        this.container.html('<ul class="chosen-choices"><li class="search-field"><input type="text" value="' + this.default_text + '" class="default" autocomplete="off" style="width:25px;" /></li></ul><div class="chosen-drop"><ul class="chosen-results"></ul></div>');
      } else {
        this.container.html('<a class="chosen-single chosen-default" tabindex="-1"><span>' + this.default_text + '</span><div><b></b></div></a><div class="chosen-drop"><div class="chosen-search"><input type="text" autocomplete="off" /></div><ul class="chosen-results"></ul></div>');
      }
      this.form_field_jq.hide().after(this.container);
      this.dropdown = this.container.find('div.chosen-drop').first();
      this.search_field = this.container.find('input').first();
      this.search_results = this.container.find('ul.chosen-results').first();
      this.search_field_scale();
      this.search_no_results = this.container.find('li.no-results').first();
      if (this.is_multiple) {
        this.search_choices = this.container.find('ul.chosen-choices').first();
        this.search_container = this.container.find('li.search-field').first();
      } else {
        this.search_container = this.container.find('div.chosen-search').first();
        this.selected_item = this.container.find('.chosen-single').first();
      }
      this.results_build();
      this.set_tab_index();
      this.set_label_behavior();
      return this.form_field_jq.trigger("chosen:ready", {
        chosen: this
      });
    };

    Chosen.prototype.register_observers = function() {
      var _this = this;
      this.container.bind('mousedown.chosen', function(evt) {
        _this.container_mousedown(evt);
      });
      this.container.bind('mouseup.chosen', function(evt) {
        _this.container_mouseup(evt);
      });
      this.container.bind('mouseenter.chosen', function(evt) {
        _this.mouse_enter(evt);
      });
      this.container.bind('mouseleave.chosen', function(evt) {
        _this.mouse_leave(evt);
      });
      this.search_results.bind('mouseup.chosen', function(evt) {
        _this.search_results_mouseup(evt);
      });
      this.search_results.bind('mouseover.chosen', function(evt) {
        _this.search_results_mouseover(evt);
      });
      this.search_results.bind('mouseout.chosen', function(evt) {
        _this.search_results_mouseout(evt);
      });
      this.search_results.bind('mousewheel.chosen DOMMouseScroll.chosen', function(evt) {
        _this.search_results_mousewheel(evt);
      });
      this.search_results.bind('touchstart.chosen', function(evt) {
        _this.search_results_touchstart(evt);
      });
      this.search_results.bind('touchmove.chosen', function(evt) {
        _this.search_results_touchmove(evt);
      });
      this.search_results.bind('touchend.chosen', function(evt) {
        _this.search_results_touchend(evt);
      });
      this.form_field_jq.bind("chosen:updated.chosen", function(evt) {
        _this.results_update_field(evt);
      });
      this.form_field_jq.bind("chosen:activate.chosen", function(evt) {
        _this.activate_field(evt);
      });
      this.form_field_jq.bind("chosen:open.chosen", function(evt) {
        _this.container_mousedown(evt);
      });
      this.form_field_jq.bind("chosen:close.chosen", function(evt) {
        _this.input_blur(evt);
      });
      this.search_field.bind('blur.chosen', function(evt) {
        _this.input_blur(evt);
      });
      this.search_field.bind('keyup.chosen', function(evt) {
        _this.keyup_checker(evt);
      });
      this.search_field.bind('keydown.chosen', function(evt) {
        _this.keydown_checker(evt);
      });
      this.search_field.bind('focus.chosen', function(evt) {
        _this.input_focus(evt);
      });
      this.search_field.bind('cut.chosen', function(evt) {
        _this.clipboard_event_checker(evt);
      });
      this.search_field.bind('paste.chosen', function(evt) {
        _this.clipboard_event_checker(evt);
      });
      if (this.is_multiple) {
        return this.search_choices.bind('click.chosen', function(evt) {
          _this.choices_click(evt);
        });
      } else {
        return this.container.bind('click.chosen', function(evt) {
          evt.preventDefault();
        });
      }
    };

    Chosen.prototype.destroy = function() {
      $(this.container[0].ownerDocument).unbind("click.chosen", this.click_test_action);
      if (this.search_field[0].tabIndex) {
        this.form_field_jq[0].tabIndex = this.search_field[0].tabIndex;
      }
      this.container.remove();
      this.form_field_jq.removeData('chosen');
      return this.form_field_jq.show();
    };

    Chosen.prototype.search_field_disabled = function() {
      this.is_disabled = this.form_field_jq[0].disabled;
      if (this.is_disabled) {
        this.container.addClass('chosen-disabled');
        this.search_field[0].disabled = true;
        if (!this.is_multiple) {
          this.selected_item.unbind("focus.chosen", this.activate_action);
        }
        return this.close_field();
      } else {
        this.container.removeClass('chosen-disabled');
        this.search_field[0].disabled = false;
        if (!this.is_multiple) {
          return this.selected_item.bind("focus.chosen", this.activate_action);
        }
      }
    };

    Chosen.prototype.container_mousedown = function(evt) {
      if (!this.is_disabled) {
        if (evt && evt.type === "mousedown" && !this.results_showing) {
          evt.preventDefault();
        }
        if (!((evt != null) && ($(evt.target)).hasClass("search-choice-close"))) {
          if (!this.active_field) {
            if (this.is_multiple) {
              this.search_field.val("");
            }
            $(this.container[0].ownerDocument).bind('click.chosen', this.click_test_action);
            this.results_show();
          } else if (!this.is_multiple && evt && (($(evt.target)[0] === this.selected_item[0]) || $(evt.target).parents("a.chosen-single").length)) {
            evt.preventDefault();
            this.results_toggle();
          }
          return this.activate_field();
        }
      }
    };

    Chosen.prototype.container_mouseup = function(evt) {
      if (evt.target.nodeName === "ABBR" && !this.is_disabled) {
        return this.results_reset(evt);
      }
    };

    Chosen.prototype.search_results_mousewheel = function(evt) {
      var delta;
      if (evt.originalEvent) {
        delta = -evt.originalEvent.wheelDelta || evt.originalEvent.detail;
      }
      if (delta != null) {
        evt.preventDefault();
        if (evt.type === 'DOMMouseScroll') {
          delta = delta * 40;
        }
        return this.search_results.scrollTop(delta + this.search_results.scrollTop());
      }
    };

    Chosen.prototype.blur_test = function(evt) {
      if (!this.active_field && this.container.hasClass("chosen-container-active")) {
        return this.close_field();
      }
    };

    Chosen.prototype.close_field = function() {
      $(this.container[0].ownerDocument).unbind("click.chosen", this.click_test_action);
      this.active_field = false;
      this.results_hide();
      this.container.removeClass("chosen-container-active");
      this.clear_backstroke();
      this.show_search_field_default();
      return this.search_field_scale();
    };

    Chosen.prototype.activate_field = function() {
      this.container.addClass("chosen-container-active");
      this.active_field = true;
      this.search_field.val(this.search_field.val());
      return this.search_field.focus();
    };

    Chosen.prototype.test_active_click = function(evt) {
      var active_container;
      active_container = $(evt.target).closest('.chosen-container');
      if (active_container.length && this.container[0] === active_container[0]) {
        return this.active_field = true;
      } else {
        return this.close_field();
      }
    };

    Chosen.prototype.results_build = function() {
      this.parsing = true;
      this.selected_option_count = null;
      this.results_data = SelectParser.select_to_array(this.form_field);
      if (this.is_multiple) {
        this.search_choices.find("li.search-choice").remove();
      } else if (!this.is_multiple) {
        this.single_set_selected_text();
        if (this.disable_search || this.form_field.options.length <= this.disable_search_threshold) {
          this.search_field[0].readOnly = true;
          this.container.addClass("chosen-container-single-nosearch");
        } else {
          this.search_field[0].readOnly = false;
          this.container.removeClass("chosen-container-single-nosearch");
        }
      }
      this.update_results_content(this.results_option_build({
        first: true
      }));
      this.search_field_disabled();
      this.show_search_field_default();
      this.search_field_scale();
      return this.parsing = false;
    };

    Chosen.prototype.result_do_highlight = function(el) {
      var high_bottom, high_top, maxHeight, visible_bottom, visible_top;
      if (el.length) {
        this.result_clear_highlight();
        this.result_highlight = el;
        this.result_highlight.addClass("highlighted");
        maxHeight = parseInt(this.search_results.css("maxHeight"), 10);
        visible_top = this.search_results.scrollTop();
        visible_bottom = maxHeight + visible_top;
        high_top = this.result_highlight.position().top + this.search_results.scrollTop();
        high_bottom = high_top + this.result_highlight.outerHeight();
        if (high_bottom >= visible_bottom) {
          return this.search_results.scrollTop((high_bottom - maxHeight) > 0 ? high_bottom - maxHeight : 0);
        } else if (high_top < visible_top) {
          return this.search_results.scrollTop(high_top);
        }
      }
    };

    Chosen.prototype.result_clear_highlight = function() {
      if (this.result_highlight) {
        this.result_highlight.removeClass("highlighted");
      }
      return this.result_highlight = null;
    };

    Chosen.prototype.results_show = function() {
      if (this.is_multiple && this.max_selected_options <= this.choices_count()) {
        this.form_field_jq.trigger("chosen:maxselected", {
          chosen: this
        });
        return false;
      }
      this.container.addClass("chosen-with-drop");
      this.results_showing = true;
      this.search_field.focus();
      this.search_field.val(this.search_field.val());
      this.winnow_results();
      return this.form_field_jq.trigger("chosen:showing_dropdown", {
        chosen: this
      });
    };

    Chosen.prototype.update_results_content = function(content) {
      return this.search_results.html(content);
    };

    Chosen.prototype.results_hide = function() {
      if (this.results_showing) {
        this.result_clear_highlight();
        this.container.removeClass("chosen-with-drop");
        this.form_field_jq.trigger("chosen:hiding_dropdown", {
          chosen: this
        });
      }
      return this.results_showing = false;
    };

    Chosen.prototype.set_tab_index = function(el) {
      var ti;
      if (this.form_field.tabIndex) {
        ti = this.form_field.tabIndex;
        this.form_field.tabIndex = -1;
        return this.search_field[0].tabIndex = ti;
      }
    };

    Chosen.prototype.set_label_behavior = function() {
      var _this = this;
      this.form_field_label = this.form_field_jq.parents("label");
      if (!this.form_field_label.length && this.form_field.id.length) {
        this.form_field_label = $("label[for='" + this.form_field.id + "']");
      }
      if (this.form_field_label.length > 0) {
        return this.form_field_label.bind('click.chosen', function(evt) {
          if (_this.is_multiple) {
            return _this.container_mousedown(evt);
          } else {
            return _this.activate_field();
          }
        });
      }
    };

    Chosen.prototype.show_search_field_default = function() {
      if (this.is_multiple && this.choices_count() < 1 && !this.active_field) {
        this.search_field.val(this.default_text);
        return this.search_field.addClass("default");
      } else {
        this.search_field.val("");
        return this.search_field.removeClass("default");
      }
    };

    Chosen.prototype.search_results_mouseup = function(evt) {
      var target;
      target = $(evt.target).hasClass("active-result") ? $(evt.target) : $(evt.target).parents(".active-result").first();
      if (target.length) {
        this.result_highlight = target;
        this.result_select(evt);
        return this.search_field.focus();
      }
    };

    Chosen.prototype.search_results_mouseover = function(evt) {
      var target;
      target = $(evt.target).hasClass("active-result") ? $(evt.target) : $(evt.target).parents(".active-result").first();
      if (target) {
        return this.result_do_highlight(target);
      }
    };

    Chosen.prototype.search_results_mouseout = function(evt) {
      if ($(evt.target).hasClass("active-result" || $(evt.target).parents('.active-result').first())) {
        return this.result_clear_highlight();
      }
    };

    Chosen.prototype.choice_build = function(item) {
      var choice, close_link,
        _this = this;
      choice = $('<li />', {
        "class": "search-choice"
      }).html("<span>" + item.html + "</span>");
      if (item.disabled) {
        choice.addClass('search-choice-disabled');
      } else {
        close_link = $('<a />', {
          "class": 'search-choice-close',
          'data-option-array-index': item.array_index
        });
        close_link.bind('click.chosen', function(evt) {
          return _this.choice_destroy_link_click(evt);
        });
        choice.append(close_link);
      }
      return this.search_container.before(choice);
    };

    Chosen.prototype.choice_destroy_link_click = function(evt) {
      evt.preventDefault();
      evt.stopPropagation();
      if (!this.is_disabled) {
        return this.choice_destroy($(evt.target));
      }
    };

    Chosen.prototype.choice_destroy = function(link) {
      if (this.result_deselect(link[0].getAttribute("data-option-array-index"))) {
        this.show_search_field_default();
        if (this.is_multiple && this.choices_count() > 0 && this.search_field.val().length < 1) {
          this.results_hide();
        }
        link.parents('li').first().remove();
        return this.search_field_scale();
      }
    };

    Chosen.prototype.results_reset = function() {
      this.reset_single_select_options();
      this.form_field.options[0].selected = true;
      this.single_set_selected_text();
      this.show_search_field_default();
      this.results_reset_cleanup();
      this.form_field_jq.trigger("change");
      if (this.active_field) {
        return this.results_hide();
      }
    };

    Chosen.prototype.results_reset_cleanup = function() {
      this.current_selectedIndex = this.form_field.selectedIndex;
      return this.selected_item.find("abbr").remove();
    };

    Chosen.prototype.result_select = function(evt) {
      var high, item;
      if (this.result_highlight) {
        high = this.result_highlight;
        this.result_clear_highlight();
        if (this.is_multiple && this.max_selected_options <= this.choices_count()) {
          this.form_field_jq.trigger("chosen:maxselected", {
            chosen: this
          });
          return false;
        }
        if (this.is_multiple) {
          high.removeClass("active-result");
        } else {
          this.reset_single_select_options();
        }
        item = this.results_data[high[0].getAttribute("data-option-array-index")];
        item.selected = true;
        this.form_field.options[item.options_index].selected = true;
        this.selected_option_count = null;
        if (this.is_multiple) {
          this.choice_build(item);
        } else {
          this.single_set_selected_text(item.text);
        }
        if (!((evt.metaKey || evt.ctrlKey) && this.is_multiple)) {
          this.results_hide();
        }
        this.search_field.val("");
        if (this.is_multiple || this.form_field.selectedIndex !== this.current_selectedIndex) {
          this.form_field_jq.trigger("change", {
            'selected': this.form_field.options[item.options_index].value
          });
        }
        this.current_selectedIndex = this.form_field.selectedIndex;
        return this.search_field_scale();
      }
    };

    Chosen.prototype.single_set_selected_text = function(text) {
      if (text == null) {
        text = this.default_text;
      }
      if (text === this.default_text) {
        this.selected_item.addClass("chosen-default");
      } else {
        this.single_deselect_control_build();
        this.selected_item.removeClass("chosen-default");
      }
      return this.selected_item.find("span").text(text);
    };

    Chosen.prototype.result_deselect = function(pos) {
      var result_data;
      result_data = this.results_data[pos];
      if (!this.form_field.options[result_data.options_index].disabled) {
        result_data.selected = false;
        this.form_field.options[result_data.options_index].selected = false;
        this.selected_option_count = null;
        this.result_clear_highlight();
        if (this.results_showing) {
          this.winnow_results();
        }
        this.form_field_jq.trigger("change", {
          deselected: this.form_field.options[result_data.options_index].value
        });
        this.search_field_scale();
        return true;
      } else {
        return false;
      }
    };

    Chosen.prototype.single_deselect_control_build = function() {
      if (!this.allow_single_deselect) {
        return;
      }
      if (!this.selected_item.find("abbr").length) {
        this.selected_item.find("span").first().after("<abbr class=\"search-choice-close\"></abbr>");
      }
      return this.selected_item.addClass("chosen-single-with-deselect");
    };

    Chosen.prototype.get_search_text = function() {
      if (this.search_field.val() === this.default_text) {
        return "";
      } else {
        return $('<div/>').text($.trim(this.search_field.val())).html();
      }
    };

    Chosen.prototype.winnow_results_set_highlight = function() {
      var do_high, selected_results;
      selected_results = !this.is_multiple ? this.search_results.find(".result-selected.active-result") : [];
      do_high = selected_results.length ? selected_results.first() : this.search_results.find(".active-result").first();
      if (do_high != null) {
        return this.result_do_highlight(do_high);
      }
    };

    Chosen.prototype.no_results = function(terms) {
      var no_results_html;
      no_results_html = $('<li class="no-results">' + this.results_none_found + ' "<span></span>"</li>');
      no_results_html.find("span").first().html(terms);
      this.search_results.append(no_results_html);
      return this.form_field_jq.trigger("chosen:no_results", {
        chosen: this
      });
    };

    Chosen.prototype.no_results_clear = function() {
      return this.search_results.find(".no-results").remove();
    };

    Chosen.prototype.keydown_arrow = function() {
      var next_sib;
      if (this.results_showing && this.result_highlight) {
        next_sib = this.result_highlight.nextAll("li.active-result").first();
        if (next_sib) {
          return this.result_do_highlight(next_sib);
        }
      } else {
        return this.results_show();
      }
    };

    Chosen.prototype.keyup_arrow = function() {
      var prev_sibs;
      if (!this.results_showing && !this.is_multiple) {
        return this.results_show();
      } else if (this.result_highlight) {
        prev_sibs = this.result_highlight.prevAll("li.active-result");
        if (prev_sibs.length) {
          return this.result_do_highlight(prev_sibs.first());
        } else {
          if (this.choices_count() > 0) {
            this.results_hide();
          }
          return this.result_clear_highlight();
        }
      }
    };

    Chosen.prototype.keydown_backstroke = function() {
      var next_available_destroy;
      if (this.pending_backstroke) {
        this.choice_destroy(this.pending_backstroke.find("a").first());
        return this.clear_backstroke();
      } else {
        next_available_destroy = this.search_container.siblings("li.search-choice").last();
        if (next_available_destroy.length && !next_available_destroy.hasClass("search-choice-disabled")) {
          this.pending_backstroke = next_available_destroy;
          if (this.single_backstroke_delete) {
            return this.keydown_backstroke();
          } else {
            return this.pending_backstroke.addClass("search-choice-focus");
          }
        }
      }
    };

    Chosen.prototype.clear_backstroke = function() {
      if (this.pending_backstroke) {
        this.pending_backstroke.removeClass("search-choice-focus");
      }
      return this.pending_backstroke = null;
    };

    Chosen.prototype.keydown_checker = function(evt) {
      var stroke, _ref1;
      stroke = (_ref1 = evt.which) != null ? _ref1 : evt.keyCode;
      this.search_field_scale();
      if (stroke !== 8 && this.pending_backstroke) {
        this.clear_backstroke();
      }
      switch (stroke) {
        case 8:
          this.backstroke_length = this.search_field.val().length;
          break;
        case 9:
          if (this.results_showing && !this.is_multiple) {
            this.result_select(evt);
          }
          this.mouse_on_container = false;
          break;
        case 13:
          evt.preventDefault();
          break;
        case 38:
          evt.preventDefault();
          this.keyup_arrow();
          break;
        case 40:
          evt.preventDefault();
          this.keydown_arrow();
          break;
      }
    };

    Chosen.prototype.search_field_scale = function() {
      var div, f_width, h, style, style_block, styles, w, _i, _len;
      if (this.is_multiple) {
        h = 0;
        w = 0;
        style_block = "position:absolute; left: -1000px; top: -1000px; display:none;";
        styles = ['font-size', 'font-style', 'font-weight', 'font-family', 'line-height', 'text-transform', 'letter-spacing'];
        for (_i = 0, _len = styles.length; _i < _len; _i++) {
          style = styles[_i];
          style_block += style + ":" + this.search_field.css(style) + ";";
        }
        div = $('<div />', {
          'style': style_block
        });
        div.text(this.search_field.val());
        $('body').append(div);
        w = div.width() + 25;
        div.remove();
        f_width = this.container.outerWidth();
        if (w > f_width - 10) {
          w = f_width - 10;
        }
        return this.search_field.css({
          'width': w + 'px'
        });
      }
    };

    return Chosen;

  })(AbstractChosen);

}).call(this);
;
/**
 * Created by alvaromena on 6/26/14.
 */

jQuery(document).ready(function ($) {
  NBC.Whoweare = {
    bioItems: null,
    bioOverlay: null,

    init: function () {
      this.bioItems = $('.node-personal-bio.view-mode-bio_list .field-name-overlay-title-link a');
		var paneHeader_container = $('.pane-bean-who-we-are-header-background');
		var headerImage_file = paneHeader_container.find('.bean-page-header-background img');
		headerImage_file.attr('src', '');	
      //this.clickActions();
	  // Loading Header Image random
	    $.ajax({
			url: '/get_header_image_block', 
			type: 'GET',
			dataType: 'json',
			success: function(data) {
                var entry = data[Math.floor(Math.random()*data.length)];
				headerImage_file.attr('src', entry);
				headerImage_file.load(function() {
                  NBC.Whoweare.onResize();	
                  headerImage_file.show();
				});
			}
		});
				
      if (NBC.GLOBAL.loggedIn == false) {
        $('.view-who-we-are-executives .view-header').remove();
        $('.view-who-we-are-directors .view-header').remove();
        $('.view-who-we-are-offices .view-header').remove();
        $('.view-who-we-are-fact-cards .view-header').remove();
		// Added for refreshing header image for anonymous users
		//var paneHeader_container = $('.pane-bean-who-we-are-header-background');
		//var headerImage_file = paneHeader_container.find('.bean-page-header-background img');
		//headerImage_file.attr('src', headerImage_file.attr('src') + '?' + Math.random());		
		
      } else {
        $('.view-who-we-are-executives .view-header a').css('display','block');
        $('.view-who-we-are-directors .view-header a').css('display','block');
        $('.view-who-we-are-offices .view-header a').css('display','block');
        $('.view-who-we-are-fact-cards .view-header a').css('display','block');        
      }

      $('.node-personal-bio').each(function() {
        $(this).find('.field-name-title, .field-name-field-role').wrapAll('<div class="field-details" />');
      });

      $('.bio-overlay-profile .button-close').live('click', function (e) {
        $(this).nbcuniOverlay('destroy',$(this).data('nid'));
      });
    },

    onLoad: function () {
      var header_edit_wrapper = $('.pane-bean-who-we-are-header-background .contextual-links-wrapper');
      header_edit_wrapper.removeClass('contextual-links-wrapper');
      header_edit_wrapper.addClass('header-edit-wrapper');
      header_edit_wrapper.find('.contextual-links-trigger').remove();
      header_edit_wrapper.find('li.bean-edit a').text('Edit Header Image').attr('target', '_blank');
      //this.onResize();
	  $('.bio-overlay-profile .back-top a').live('click', function(e) {
		e.preventDefault();
		jQuery(this).css('color', '#a7b6c0');
		jQuery('html,body').scrollTop(0);
	  });
	  $('.bio-overlay-profile .back-top a').hover(function(e) {
		jQuery(this).css('color', '#400095');
	  }, function() {
		jQuery(this).css('color', '#a7b6c0');
	  });
    },

    onResize: function () {
//      if(!$('body').hasClass('is-mobile') || $('html').hasClass('lt-ie9')) {
//        $('.node-personal-bio .field-details').equalHeights();
//      } else {
//        $('.node-personal-bio .field-details').css('min-height', '0');
//      }

      this.stretchHeaderImage();
    },

    stretchHeaderImage: function() {
      var paneHeader = $('.pane-bean-who-we-are-header-background');
      paneHeader.css('width', 'auto');

      var headerImage = paneHeader.find('.bean-page-header-background img');
      var imgRatio = headerImage.width() / headerImage.height();

      var windowWidth = $(window).width()
        , headerWidth = paneHeader.width()
        , offsetLeft = ((windowWidth - headerWidth) / 2);

      paneHeader.css('left', '-'+offsetLeft+'px');
      paneHeader.css('width',windowWidth +'px');

      var bgCSS = {position: 'absolute', left: 0, top: 0}
        , rootWidth = paneHeader.width()
        , bgWidth = rootWidth
        , rootHeight = paneHeader.height()
        , bgHeight = bgWidth / imgRatio
        , bgOffset;

      if (bgHeight >= rootHeight) {
        if ( ! $.browser.msie ) {
          bgOffset = (bgHeight - rootHeight) / 2;
         // bgCSS.top = '-' + bgOffset + 'px';
        }
      } else {
        bgHeight = rootHeight;
        bgWidth = bgHeight * imgRatio;
        bgOffset = (bgWidth - rootWidth) / 2;
        bgCSS.left = '-' + bgOffset + 'px';
      }

      headerImage.css({width: bgWidth, height: bgHeight}).css(bgCSS);
      //headerImage.show();
    },

    centerHeroImage: function () {
      if ($(window).width() > 1280) {
        _left = (($(window).width() - 1280) / 2);
        $('.layout-nbcuni-detail .row-top').css('left', '-' + _left + 'px');
        $('.layout-nbcuni-detail .row-top').css('width', $(window).width() + 'px');
        $('.layout-nbcuni-detail .row-top').css('height', 'auto');
        $('.layout-nbcuni-detail .row-top').css('position', 'relative');
      } else {
        $('.layout-nbcuni-detail .row-top').css('width', '100%');
        $('.layout-nbcuni-detail .row-top').css('left', '0');
      }
    },

    clickActions: function () {
      // Create reference to parent object
      var that = this;

      // Show profile overlay and update history
      that.bioItems.on('click', function (e) {
        NBC.GLOBAL.updateHistory = false;
        NBC.History.setState('Profile Overlay', $(this).attr('href'));
        //$('#bio-overlay').dialog;
      });
    }
  }
});;
jQuery(document).ready(function ($) {
  $.fn.equalHeights = function() {
    var maxHeight = 0,
    $this = $(this);
    $this.css('min-height', '0');
    $this.each( function() {
      var height = $(this).innerHeight();

      if ( height > maxHeight ) { maxHeight = height; }
    });
    return $this.css('min-height', maxHeight);
  };

  NBC.Responsibility = {
    accordionHeads: null,
    isAnimating: false,
    offsetTopAdjusment: 0,
    lastScrollTop: 0,

    init: function () {
      var that = this;
      this.accordionHeads = $(".accordion-head");
      this.accordionActions();

      $(".jump-links ul li a").on('click', function(e) {
        e.preventDefault();
         var element = $($(this).attr('href'));
         if(element.length)
            $("html, body").animate({scrollTop: element.offset().top - that.offsetTopAdjusment }, 1000);
      });

      $(".pane-social-ventures .back-top").on('click', function(e) {
        e.preventDefault();
        var element = $($(this).attr('href'));
        if(element.length)
          $("html, body").animate({scrollTop: element.offset().top - that.offsetTopAdjusment }, 1000);
      });


      $('.node-personal-bio').each(function() {
        $(this).find('.field-name-title, .field-name-field-role').wrapAll('<div class="field-details" />');
      });

      $('.bio-overlay-profile .button-close').live('click', function (e) {
        $(this).nbcuniOverlay('destroy',$(this).data('nid'));
      });

      $('.entity-bean.bean-text-block').each(function() {
        //links
        var shareUrl = $(this).find('.field-name-field-url').text();
        var facebookUrl = $(this).find('.field-name-field-facebook').text();
        var twitterUrl = $(this).find('.field-name-field-twitter').text();
		var instagramUrl = $(this).find('.field-name-field-instagram').text();
        var content = $(this).find('.field-name-field-content').text();
		//buttons
        var twitter = $(this).find('.social-button.twitter > a');
        var facebook = $(this).find('.social-button.facebook > a');
		var instagram = $(this).find('.social-button.instagram > a');

        if ($(this).parent().parent().parent().hasClass('pane-bean-social-ventures-block-text')) {
          twitter.attr('href', twitterUrl+'?text='+content);
          facebook.attr('href', facebookUrl+'?u='+window.location.href);
		  $(this).find('.social-button.instagram').hide();
        } else {        
          twitter.attr('href', twitterUrl);   
          facebook.attr('href', facebookUrl); 
		  if(instagramUrl != '') {
		    instagram.attr('href', instagramUrl);
		  } else {
		    $(this).find('.social-button.instagram').hide();
		  }
        }        
      });
      
      
      //Set opacity when rollover
      $(".pane-panels-mini .article-block .views-row").each(function() {
        $( this )
        .mouseenter(function() {
            var featuredImage = $( this ).find( '.views-field-field-featured-image img');
            featuredImage.fadeTo( 0.35 , 0.75);

            /*if ( $( this ).parent().parent().hasClass( 'careers') || $( this ).parent().parent().hasClass( 'view-home-page-evergreen')) {
                var fieldNothing = $( this ).find('.views-field-nothing');
                if (fieldNothing) {
                    fieldNothing.fadeTo( 0.35 , 0.75);
                }
            }*/
        })
        .mouseleave(function() {
            var featuredImage = $( this ).find( '.views-field-field-featured-image img');
            featuredImage.fadeTo( 0.35 , 1);

            /*if ( $( this ).parent().parent().hasClass( 'careers') || $( this ).parent().parent().hasClass( 'view-home-page-evergreen')) {
                var fieldNothing = $( this ).find('.views-field-nothing');
                if (fieldNothing) {
                    fieldNothing.fadeTo( 0.35 , 1);                        
                }
            }*/
        });
      });

      //if($('body').hasClass('is-desktop')) this.onScroll();
    },

    stretchHeaderImage: function() {
      var paneHeader = $('.pane-bean-header-background');
      paneHeader.css('width', 'auto');

      var headerImage = paneHeader.find('.bean-page-header-background img');
      var imgRatio = headerImage.width() / headerImage.height();

      var windowWidth = $(window).width()
        , headerWidth = paneHeader.width()
        , offsetLeft = ((windowWidth - headerWidth) / 2);

      paneHeader.css('left', '-'+offsetLeft+'px');
      paneHeader.css('width',windowWidth +'px');

      var bgCSS = {position: 'absolute', left: 0, top: 0}
        , rootWidth = paneHeader.width()
        , bgWidth = rootWidth
        , rootHeight = paneHeader.height()
        , bgHeight = bgWidth / imgRatio
        , bgOffset;

      if (bgHeight >= rootHeight) {
        if ( ! $.browser.msie ) {
          bgOffset = (bgHeight - rootHeight) / 2;
          bgCSS.top = '-' + bgOffset + 'px';
        }
      } else {
        bgHeight = rootHeight;
        bgWidth = bgHeight * imgRatio;
        bgOffset = (bgWidth - rootWidth) / 2;
        bgCSS.left = '-' + bgOffset + 'px';
      }

      headerImage.css({width: bgWidth, height: bgHeight}).css(bgCSS);
      headerImage.show();
    },

    accordionClose: function(newActiveItem, parent, that){
      newActiveItem.removeClass('active');
      newActiveItem.next().next('.accordion-content').slideUp(0, function(){
	  $("html, body").scrollTop(newActiveItem.offset().top - that.offsetTopAdjusment);
      parent.children('.accordion-head').removeClass('inactive');
      that.enable_scroll();
      that.isAnimating = false;
      });
    },
    accordionOpen: function( newActiveItem, parent, that, collapse){ 
      newActiveItem.removeClass('inactive');
      newActiveItem.addClass('active');
      newActiveItem.next().next('.accordion-content').slideDown(1000);
      $("html, body").animate({scrollTop: newActiveItem.offset().top - that.offsetTopAdjusment }, 1000, function(){
        if (collapse && activeItem.length) {
          activeItem.removeClass('active');
          activeItem.next().next('.accordion-content').hide(); 
        }
 
        parent.children('.accordion-head').addClass('inactive');
        newActiveItem.removeClass('inactive');
 
        $("html, body").scrollTop(newActiveItem.offset().top - that.offsetTopAdjusment);

        that.enable_scroll();
        that.isAnimating = false;
      });
      that.onResize();
    },
    accordionActions: function () {
      // Create reference to parent object
      var that = this;
      that.accordionHeads.on('click', function(e, collapse) {
        if(that.isAnimating)
            return;

        that.disable_scroll();
        that.isAnimating = false;
        var parent = $(this).parent('div');
        var activeItem = parent.children('.accordion-head.active');
        var newActiveItem = $(this);

        if(newActiveItem.hasClass('active')) {
          that.accordionClose(newActiveItem, parent, that);
        } else {
          $('.accordion-head.active').each(function(index, element){
            that.accordionClose($(element), parent, that);
          });
          that.accordionOpen(newActiveItem, parent, that, collapse);
        }

      });
    },

    onLoad: function() {
      var accord_head = $('.pane-bean-diversity-inclusion-accord .field-name-field-display-title .field-item');
      var accord_txt = accord_head.text();
      var accord_txt_arr = accord_txt.split('&');
      accord_head.html(accord_txt_arr[0] + "<span class='break'></span>&amp;" + accord_txt_arr[1]);

      var header_edit_wrapper = $('.pane-bean-responsibility-header-background .contextual-links-wrapper');
      header_edit_wrapper.removeClass('contextual-links-wrapper');
      header_edit_wrapper.addClass('header-edit-wrapper');
      header_edit_wrapper.find('.contextual-links-trigger').remove();
      header_edit_wrapper.find('li.bean-edit a').text('Edit Header Image').attr('target', '_blank');

      this.onResize();
    },

    onResize: function() {
      this.offsetTopAdjusment = $('#menu-bar').height() + $('#admin-menu').height();

      if(!$('body').hasClass('is-mobile') || $('html').hasClass('lt-ie9')) {
        //$('.node-personal-bio .field-details').equalHeights();
        $('.pane-employee-resource-groups-panel-pane-1 .views-row .node-resource-group').equalHeights();
      } else {
        //$('.node-personal-bio .field-details').css('min-height', '0');
        $('.pane-employee-resource-groups-panel-pane-1 .views-row .node-resource-group').css('min-height', '0');
      }

      this.stretchHeaderImage();
	  var count = 1;
	  $(".page-responsibility .pane-employee-resource-groups-panel-pane-1 .view-employee-resource-groups").find('.views-row').each(function() {
		$(this).css('clear', '');
		if ($(window).width() <990 && $(window).width() > 640) {
			if ((count%4) == 0) $(this).css('clear', 'left');
		}
		if ($(window).width() >989) {
			if ((count%5) == 0) $(this).css('clear', 'left');
		}
		count++;
	  });
    },
/*
    onScroll: function() {
      var that = this;
      $(window).scroll(function () {
        var diversity_accord_head = $('.accordion-head.pane-bean-diversity-inclusion-accord');
        var ventures_accord_head = $('.accordion-head.pane-bean-social-ventures-accord');
        var scrollTop = $(this).scrollTop();
        if(scrollTop > that.lastScrollTop) {
          if(!that.isAnimating && !diversity_accord_head.hasClass('active') && !ventures_accord_head.hasClass('active')) {
            if(($(this).scrollTop() + that.offsetTopAdjusment + 125) >= diversity_accord_head.offset().top) {
              diversity_accord_head.trigger('click');
            }
          }

          if(!that.isAnimating && !ventures_accord_head.hasClass('active') && diversity_accord_head.hasClass('active')) {
            if(($(this).scrollTop() + $(this).height() - (ventures_accord_head.outerHeight() + 180)) >= ventures_accord_head.offset().top) {
              ventures_accord_head.trigger('click');
            }
          }
        }

        that.lastScrollTop = scrollTop;
      });
    },
*/
    prevent_default: function(e) {
      e = e || window.event;
      if (e.preventDefault)
        e.preventDefault();
      e.returnValue = false;  
    },

    keydown: function(e) {
      var keys = [37, 38, 39, 40];
      for (var i = keys.length; i--;) {
        if (e.keyCode === keys[i]) {
          NBC.Responsibility.prevent_default(e);
          return;
        }
      }
    },

    wheel: function(e) {
      NBC.Responsibility.prevent_default(e);
    },

    disable_scroll: function() {
      if (window.addEventListener) {
        window.addEventListener('DOMMouseScroll', this.wheel, false);
      }
      window.onmousewheel = document.onmousewheel = this.wheel;
      document.onkeydown = this.keydown;
    },

    enable_scroll: function() {
      if (window.removeEventListener) {
        window.removeEventListener('DOMMouseScroll', this.wheel, false);
      }
      window.onmousewheel = document.onmousewheel = document.onkeydown = null;
    }
  }
});
;
jQuery(document).ready(function ($) {
  NBC.Ourhistory = {
    debug: false,
    dbg_timers: {},
    dbg_startTimer: function(id) {
      if (!NBC.Ourhistory.debug) return;
      console.log('Starting  "' + id + '" operation...');
      NBC.Ourhistory.dbg_timers[id] = +new Date();
    },
	
    dbg_endTimer: function(id) {
      if (!NBC.Ourhistory.debug) return;
      var millis = +new Date() - NBC.Ourhistory.dbg_timers[id];
      console.log('Operation "' + id + '" took ' + millis + ' milliseconds.');
    },
	setHeightForBrightcove: function() {
		if($(window).width()>640) {
			$(".view-mode-normal_event.node-history-video .group-left").each(function() {
				//$(this).css('height', $(this).parent().find('.group-right img').height());
				right = $(this).parent().find('.group-right');
				right_img = $(this).parent().find('.group-right img');
				$(this).css('height', right_img.height());
				$(this).css('min-height', right_img.height());
				para_height = (right_img.height()-(+$(this).find('.field-name-title').height() + +100));
				para_height = (Math.ceil(para_height/21))*21;
				$(this).find('.field-name-body p').css({'height': para_height+'px', 'overflow': 'hidden'});
				/*if ((+$(this).find('.field-name-body').height() + +$(this).find('.field-name-title').height()) > 200) {
					$(this).css('height', 'auto');
					right.height(+$(this).height() + +parseInt($(this).css('padding-top')) + +parseInt($(this).css('padding-bottom')));
					padding = (right.height()-right_img.height())/2;
					right_img.css('padding-top', padding);
					right.css('background', 'black');
				}
				else {
					right.css('background', 'none');
				}*/
			});
		}
		else {
			$(".view-mode-normal_event.node-history-video .group-left").each(function() {
				right = $(this).parent().find('.group-right');
				right_img = $(this).parent().find('.group-right img');
				$(this).css('height', '');
				$(this).css('min-height', '');
				$(this).find('.field-name-body p').css({'height': '', 'overflow': ''});
			});
		}
	},
    resizePopup: function() { 
		/*var $visible = $(".ui-dialog.player-dialog:visible");
		// each open dialog
		$visible.each(function () {
			if($(this).width() > 774) {
				$(this).find("iframe").width(745);
				$(this).find("iframe").height(430);
				$('.ui-dialog.player-dialog .ui-dialog-content').width($(window).width());
				$('.ui-dialog.player-dialog .ui-dialog-content').height($(window).height());
			}
			else {
				var isPortrait = (window.innerHeight > window.innerWidth); 

				//$(this).find("iframe").width($(".ui-dialog.player-dialog .ui-dialog-content").width());
				var iframe_width = $(this).find("iframe").width();
				var content_height = Math.ceil(iframe_width*0.55);
				if (content_height > ($(window).height()-100)) {
					content_height = $(window).height()-100;
					$('.ui-dialog.player-dialog .ui-dialog-content').height($(window).height()-80);
				}
				else {
					$('.ui-dialog.player-dialog .ui-dialog-content').height($(window).height()-80);
				}

				//$(this).find("iframe").height(content_height);
			}
			iframe_width = $(this).find("iframe").width();
			iframe_height = $(this).find("iframe").height();
			//iframe_offset = $(this).find("iframe").position();
			iframe_left = ($(".ui-dialog.player-dialog .ui-dialog-content").width()-iframe_width)/2;
			but_pos = (+iframe_left + +iframe_width) - 10;
			iframe_top = ($(".ui-dialog.player-dialog .ui-dialog-content").height()-$(".ui-dialog.player-dialog:visible").find("iframe").height())/2;
			$(this).find("button.ui-dialog-titlebar-close").css('left', but_pos+'px').css('top',(iframe_top-20)+'px');
		});
		if($(window).width()>640) {
			$(".view-mode-normal_event.node-history-video .group-left").each(function() {
				$(this).css('height', $(this).parent().find('.group-right img').height());
				$(this).css('min-height', $(this).parent().find('.group-right img').height());
			}); 
		}*/
	},
    MSIEVersion: function() {
      var ua = window.navigator.userAgent;
      var msie = ua.indexOf("MSIE ");

      if (msie > 0)      // If Internet Explorer, return version number
        return (parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))));

      return false;
    },
    SafariVersion: function() {
      var matches = window.navigator.userAgent.match(/Version\/(\d+)[\.\d]* Safari/);
      if (matches && matches[1])
        return parseInt(matches[1]);

      return false;
    },

    disableMostAnimations: false, //for problematic browsers, such as Safari 7

    initialized: false,

    /*
     * Define variables required for parallax to work
     */

    // Skroller config
    skrollr_active: false,
    skrollr_config: false,
    scrollFixMenu: false,

    // Skrollr menu container
    menuContainer: false,

    // Parallax global array with items to be animated (decades and events)
    skrollableItems: [],
    skrollableItemsOffset: [],

    // Required counters for decades and events
    decadeCounter: 0,
    eventCounter: 0,

    // Required header elements containers for fixed animations
    headerContainer: false,
    headerImage: false,
    //headerTitle: false,
    headerSubtitle: false,

    init: function () {
      $(window).load(function() {
        NBC.Ourhistory.isLoaded = true;
		  this.body = $('body');
	      if(this.body.hasClass('page-our-history')) { 
	        $.getScript("/sites/all/themes/nbcuni/scripts/vendors/jquery.scrolltotop.js", function(){});
	      }
		NBC.Ourhistory.setHeightForBrightcove();
      });

      // Call to clickActions function
      this.clickActions();
  	  // Initialized in all the resolutions
	  this.initialized = true;

      if (NBC.GLOBAL.viewportWidth < 1025) {
        return; //don't do anything for tablet/mobile
      }

      var ie = this.MSIEVersion();
      if (ie && ie <= 9)
        return;
      if (this.SafariVersion() == 7)
        this.disableMostAnimations = true;

      if (NBC.Ourhistory.debug && window.location.href.match(/debug=2/))
        return;
//console.log('init');
//return;
      /*
       * Initialize Skrollr plugin functionalilty
       * - Initialize only for mobile devices
       * - Set image blur animation point after every element of the page is loaded
       */
      if (!$('body').hasClass('mobile')) {
        // Call to crawlDecades function
        NBC.Ourhistory.dbg_startTimer('crawlDecades');
        this.crawlDecades();
        NBC.Ourhistory.dbg_endTimer('crawlDecades');

        // Call to assignAnimation functions for content
        NBC.Ourhistory.dbg_startTimer('assignAnim all');
        this.decadeCounter = 0;
        $.each(this.skrollableItems, function (key, element) {
          NBC.Ourhistory.assignAnimationDecade(element);
          NBC.Ourhistory.assignAnimationEvents(element.decadeEvents);
        });
        NBC.Ourhistory.dbg_endTimer('assignAnim all');

        // Call to generate skrollr menu function
        NBC.Ourhistory.dbg_startTimer('generateSkrollrMenu');
        this.generateSkrollrMenu();
        NBC.Ourhistory.dbg_endTimer('generateSkrollrMenu');

        // Call to assignAnimation functions for menu
        NBC.Ourhistory.dbg_startTimer('assignAnimationMenu');
        this.assignAnimationMenu();
        NBC.Ourhistory.dbg_endTimer('assignAnimationMenu');

        // Populate header elements containers for fixed animations
        this.headerContainer = $('.pane-bean-our-history-header');
        this.headerImage = this.headerContainer.find('.field-name-field-background-image-normal .field-item');
        //this.headerTitle = this.headerContainer.find('.field-name-field-display-title');

        this.headerSubtitle = this.headerContainer.find('.field-name-field-subtitle');

        // Fixed animation for header elements containers
        if (!$('body').hasClass('ie8')) {
//          this.headerImage.attr('data-0-start', 'position: static;');
          this.headerImage.attr('data-0-start', 'position: fixed; opacity: 1;');
          this.headerImage.attr('data-80-start', 'opacity: 1;');
          this.headerImage.attr('data-770-start', 'opacity: 0;');
        }
        //this.headerTitle.attr('data-80-start', 'top: 380px');
        //this.headerTitle.attr('data-650-start', 'top: 100px');
        this.headerSubtitle.attr('data-300-start', 'bottom: 40px');
        this.headerSubtitle.attr('data-650-start', 'bottom: 400px');

        // Call to function scrollMenu
        this.scrollMenu();

        // Call to function skrollr init function
        NBC.Ourhistory.dbg_startTimer('skrollrInit');
        if (NBC.GLOBAL.viewportWidth > 1024) {
          NBC.Ourhistory.forceImageHeights();
          this.skrollrInit();
        }
        NBC.Ourhistory.dbg_endTimer('skrollrInit');

        $(window).load(function () {
          NBC.Ourhistory.onLoad();
        });
      }

    },
    onLoad: function() {
      if (this.isLoadedExecuted)
        return;
      this.dbg_startTimer('on load');
      this.getMenuOffset();
      this.assignAnimationSpritesMenu();
      this.dbg_endTimer('on load');
      this.dbg_startTimer('on load skrollrrefresh');
      this.clearImageHeights();
      this.skrollr_config.refresh();
      this.dbg_endTimer('on load skrollrrefresh');
      this.isLoaded = true;
      this.isLoadedExecuted = true;
	  //this.resizePopup();
    },
    isLoaded: false,
    isLoadedExecuted: false,
    imageHeightForced: false,
    forceImageHeights: function() {
      //manually set the height in CSS of every image that affects layout (skrollr gets confused when this happens)
      $.each(this.skrollableItems, function (key, element) {
        $.each(element.decadeEvents, function (key, event) {
          switch (event.eventType) {
            case 'normal-event':
              var img = event.eventImage.find('>img');
              img.height(img.attr('height') / img.attr('width') * img.width());
              break;
            case 'gallery-event':
              var img = event.mainContainer.find('.group-left > .field-name-field-featured-image img');
              img.height(img.attr('height') / img.attr('width') * img.width());
              var imgs = event.mainContainer.find('.group-right .field-name-field-gallery-items img');
              imgs.each(function() {
                var img = $(this);
                img.height(img.attr('height') / img.attr('width') * img.width());
              });
              break;
          }
        });
      });
      this.imageHeightForced = true;
    },
    clearImageHeights: function() {
      if (!this.imageHeightForced)
        return;
      $.each(this.skrollableItems, function (key, element) {
        $.each(element.decadeEvents, function (key, event) {
          switch (event.eventType) {
            case 'normal-event':
              var img = event.eventImage.find('>img');
              img.css('height', '');
              break;
            case 'gallery-event':
              var img = event.mainContainer.find('.group-left > .field-name-field-featured-image img');
              img.css('height', '');
              var imgs = event.mainContainer.find('.group-right .field-name-field-gallery-items img');
              imgs.css('height', '');
              break;
          }
        });
      });
      this.imageHeightForced = false;
    },
    /*
     * - Search DOM for decades to be animated
     * - Include decades in Parallax global array using the decadeElement definintion
     * - Call to crawlEvents function
     */
    crawlDecades: function () {
      var that = this;
      $('.pane-our-history-decades-panel-pane-1 .views-row').each(function () {
        var newDecade = that.decadeElement($(this));
        that.skrollableItems.push(newDecade);
        NBC.Ourhistory.crawlEvents(newDecade.decadeEvents, newDecade.rightContainer);
      });
    },
    /*
     * - Search DOM for events to be animated
     * - Include events in its corresponding Decade using an event definition depending of its type
     * - decadeEvents: Array for decade events objects
     * - eventsContainer: Right column decade DOM element
     */
    crawlEvents: function (decadeEvents, eventsContainer) {
      var events = eventsContainer.find('> .field-name-field-history-items > .field-items > .field-item');
      events.each(function () {
        var self = $(this);
        var node = self.find('> .node');
        if (node.length) {
          var event;
          if (node.hasClass('node-history-event'))
            event = NBC.Ourhistory.normalEventElement(self);
          else if (node.hasClass('node-history-video'))
            event = NBC.Ourhistory.videoEventElement(self);
          else if (node.hasClass('node-history-quote'))
            event = NBC.Ourhistory.quoteEventElement(self);
          else if (node.hasClass('node-history-gallery'))
            event = NBC.Ourhistory.galleryEventElement(self);
          else
            return;
          decadeEvents.push(event);
        }

      })
    },
    removeData: function(element) {
      var attrs = element.get(0).attributes;
      for (var i = attrs.length - 1; i >= 0; i--) {
        if (attrs[i] && attrs[i].specified && attrs[i].name.match(/^data/))
          element.removeAttr(attrs[i].name);
      }
    },
    /*
     * Assign attributes to decade, required elements to be animated with the skrollr plugin
     * - decade: Decade object
     */
    assignAnimationDecade: function (decade) {
      var windowWidth = $(window).width();
      var windowHeight = $(window).height();

      var leftId = 'decade_container_left_' + this.decadeCounter;
      var rightId = 'decade_container_right_' + this.decadeCounter;

      decade.mainContainer.attr('id', 'decade_' + this.decadeCounter);
      decade.leftContainer.attr('id', leftId);
      decade.rightContainer.attr('id', rightId);
      this.decadeCounter++;

      decade.decadeImage.attr({
        'data-anchor-target': '#' + leftId,
        'data-bottom-top': 'position: absolute; width: 1550px; left: ' + (Math.min(0, (windowWidth - 1280) / 2) - 150) + 'px;',
        'data-81-top': 'position: fixed; width: 1280px; top: 0px; left: ' + Math.min(0, (windowWidth - 1280) / 2) + 'px;',
        'data-80-top': 'top: 80px; left: ' + ((windowWidth - 1280) / 2) + 'px',
        'data--400-top': 'opacity: 1;',
        'data--450-top': 'opacity: 0;'
      });

      this.removeData(decade.decadeImageBlur);
      decade.decadeImageBlur.attr({
        'data-anchor-target': '#' + rightId,
        'data-708-top': 'display: block;',
        'data-709-top': 'display: none;',
        'data-710-top': 'opacity: 0; left: ' + ((windowWidth - 1280) / 2) + 'px;',
        'data-center-top': 'opacity: 1; left: ' + ((windowWidth - 1280) / 2) + 'px;'
      });
      if (windowHeight < (770 + 80)) {
        var n = 770 - windowHeight + 80;
        decade.decadeImageBlur.attr('data-' + (n+1) + '-bottom', 'position: fixed; top:80px');
        decade.decadeImageBlur.attr('data-' +  n    + '-bottom', 'position: relative; top:' + (decade.rightContainer.height() + 25) + 'px; left: ' + Math.min(0, (windowWidth - 1280) / 2) + 'px;');
      } else {
        decade.decadeImageBlur.attr('data--' + (windowHeight - 851) + '-bottom', 'position: fixed; top:80px');
        decade.decadeImageBlur.attr('data--' + (windowHeight - 850) + '-bottom', 'position: relative; top:' + (decade.rightContainer.height() + 25) + 'px; left: ' + Math.min(0, (windowWidth - 1280) / 2) + 'px;');
      }

      if (NBC.Ourhistory.disableMostAnimations)
        return;

      decade.decadeYear.attr({
        'data-anchor-target': '#' + leftId,
        'data-center-top': 'margin-top: 500px',
        'data-80-top': 'margin-top: 0px;',
        'data--200-top': 'opacity: 0.4;',
        'data--400-top': 'opacity: 0;'
      });

      decade.decadeTitle.attr({
        'data-anchor-target': '#' + leftId,
        'data-center-top': 'margin-top: 500px',
        'data-80-top': 'margin-top: 0px;',
        'data--200-top': 'opacity: 1;',
        'data--400-top': 'opacity: 0;'
      });

      decade.decadeLogo.attr({
        'data-anchor-target': '#' + leftId,
        'data-center-top': 'margin-top: 500px',
        'data-80-top': 'margin-top: 0px;',
        'data--200-top': 'opacity: 1;',
        'data--400-top': 'opacity: 0;'
      });

      decade.decadeBody.attr({
        'data-anchor-target': '#' + leftId,
        'data-center-top': 'margin-top: 500px',
        'data-80-top': 'margin-top: 0px;',
        'data--200-top': 'opacity: 1;',
        'data--400-top': 'opacity: 0;'
      });
    },
    /*
     * Assign attributes to event elements, required to be animated with the skrollr plugin
     * - events: Array containing decade events objects
     */
    assignAnimationEvents: function (events) {
      if (NBC.Ourhistory.disableMostAnimations)
        return;

      $.each(events, function (key, event) {
        switch (event.eventType) {
          // Attributes for normal event animation
          case 'normal-event':
            var eventHeight = Math.floor(event.eventImage.find('img').attr('height')) + 150;
            var eventFirstChild = event.mainContainer.is(':first-child');
            var eventLastChild = event.mainContainer.is(':last-child');
            var prevEventType = events[key - 1];
            var nextEventType = events[key + 1];
            var attr;

            event.eventLineBorder.attr('data-start', 'height: ' + eventHeight + 'px');

//            if (NBC.Ourhistory.debug && window.location.href.match(/debug=1/))
              break;

            attr = {};
            attr['data-start'] = 'height: ' + eventHeight + 'px';
            if (!eventFirstChild) {
              attr['data-bottom-top'] = 'opacity: 0';
              attr['data-center-top'] = 'opacity: 1';
            }
            if (!eventLastChild) {
              event.mainContainer.find('.group-left').attr({
                'data-80-top': 'opacity: 1',
                'data--300-top': 'opacity: 0.2'
              });
            }
            attr['id'] = 'event_' + NBC.Ourhistory.eventCounter;
            event.mainContainer.attr(attr);

            attr = {};
            var left_initial = event.eventImage.offset().left;
            var left_out = left_initial + 42;
            attr['data-anchor-target'] = '#' + event.mainContainer.attr('id');
            if (typeof prevEventType != 'undefined' && (prevEventType.eventType == 'normal-event')) {
              var endInAnimAt = 80 + 200;
              attr['data-' + (endInAnimAt + 180) + '-top'] = 'opacity: 0; left: ' + left_out + 'px; width: ' + event.eventImage.width() + 'px;';
              attr['data-' + endInAnimAt + '-top'] = 'opacity: 1; left: ' + left_initial + 'px;';
              attr['data-' + (endInAnimAt - 200) + '-top'] = 'opacity: 1; left: ' + left_initial + 'px;';
            } else {
              attr['data-top'] = 'opacity: 1; left: ' + left_initial + 'px; width: ' + event.eventImage.width() + 'px;';
            }
            if (typeof nextEventType != 'undefined' && (nextEventType.eventType == 'normal-event')) {
              attr['data-80-top'] = 'opacity: 1; left: ' + left_initial + 'px';
              var startOutAnimAt = Math.round(eventHeight - 280 - 200);
              attr['data--' + startOutAnimAt + '-top'] = 'opacity: 1; left: ' + left_initial + 'px';
              attr['data--' + (startOutAnimAt+180) + '-top'] = 'opacity: 0; left: ' + left_out + 'px';
            }
            event.eventImage.attr(attr);

            attr = {};
            attr['data-anchor-target'] = '#' + event.mainContainer.attr('id');
            attr['data-bottom'] = 'color: rgb(107, 115, 120)';
            attr['data-center-top'] = 'color: rgb(64, 0, 149)';
            attr['data-150-top'] = 'color: rgb(64, 0, 149)';
            attr['data-80-top'] = 'color: rgb(107, 115, 120)';
            event.eventYear.attr(attr);
            break;
          // Attributes for video event animation
          case 'video-event':
            var eventFirstChild = event.mainContainer.is(':first-child');
            var eventLastChild = event.mainContainer.is(':last-child');
            //if (!eventFirstChild) {
            //  event.mainContainer.attr('data-bottom-top', 'opacity: 0');
            //  event.mainContainer.attr('data-center-top', 'opacity: 1');
            //}
            //if (!eventLastChild) {
            //  event.mainContainer.attr('data-80-top', 'opacity: 1');
            //  event.mainContainer.attr('data--300-top', 'opacity: 0');
            //}
            event.mainContainer.attr('id', 'event_' + NBC.Ourhistory.eventCounter);
            break;
          // Attributes for quote event animation
          case 'quote-event':
            var eventFirstChild = event.mainContainer.is(':first-child');
            var eventLastChild = event.mainContainer.is(':last-child');
            //if (!eventFirstChild) {
            //  event.mainContainer.attr('data-bottom-top', 'opacity: 0');
            //  event.mainContainer.attr('data-center-top', 'opacity: 1');
            //}
            //if (!eventLastChild) {
            //  event.mainContainer.attr('data-80-top', 'opacity: 1');
            //  event.mainContainer.attr('data--300-top', 'opacity: 0');
            //}
            event.mainContainer.attr('id', 'event_' + NBC.Ourhistory.eventCounter);

            event.eventYear.attr('data-anchor-target', '#' + this.mainContainer.attr('id'));
            event.eventYear.attr('data-bottom', 'color: rgb(107, 115, 120)');
            event.eventYear.attr('data-center-top', 'color: rgb(64, 0, 149)');
            event.eventYear.attr('data-150-top', 'color: rgb(64, 0, 149)');
            event.eventYear.attr('data-80-top', 'color: rgb(107, 115, 120)');
            break;
          // Attributes for gallery event animation
          case 'gallery-event':
            var eventFirstChild = event.mainContainer.is(':first-child');
            var eventLastChild = event.mainContainer.is(':last-child');
            //if (!eventFirstChild) {
            //  event.mainContainer.attr('data-bottom-top', 'opacity: 0');
            //  event.mainContainer.attr('data-center-top', 'opacity: 1');
            //}
            //if (!eventLastChild) {
            //  event.mainContainer.attr('data-80-top', 'opacity: 1');
            //  event.mainContainer.attr('data--300-top', 'opacity: 0');
            //}
            event.mainContainer.attr('id', 'event_' + NBC.Ourhistory.eventCounter);
            break;
        }
        NBC.Ourhistory.eventCounter++;
      });
    },
    /*
     * Decade element definition
     * - element: Decade DOM element
     */
    decadeElement: function (element) {
      // Create decade element
      var decade = {
        mainContainer: element,
        leftContainer: element.find('> .ds-2col > .group-left'),
        rightContainer: element.find('> .ds-2col > .group-right'),
        decadeImage: element.find('> .ds-2col > .group-left > .field-name-field-background-image-normal'),
        decadeImageOffset: false,
        decadeImageBlur: element.find('.field-name-image-blur'),
        decadeTitle: element.find('.decade-title'),
        decadeYear: element.find('.decade-year'),
        decadeLogo: element.find('.decade-logo'),
        decadeBody: element.find('.decade-body'),
        decadeEvents: []
      };

      // Set especial parameters
      decade.decadeImageOffset = decade.decadeImage.offset();

      // Return formated data
      return decade;
    },
    /*
     * Normal event element definition
     * - element: Normal event DOM element
     */
    normalEventElement: function (element) {
      // Create event element
      var event = {
        eventType: 'normal-event',
        mainContainer: element,
        eventYear: element.find('.field-name-field-year'),
        eventImage: element.find('.field-name-field-featured-image'),
        eventLineBorder: element.find('.field-name-border-bg')
      }
      // Return formated data
      return event;
    },
    /*
     * Video event element definition
     * - element: Video event DOM element
     */
    videoEventElement: function (element) {
      // Create event element
      var event = {
        eventType: 'video-event',
        mainContainer: element,
        eventYear: element.find('.field-name-field-year')
      }
      // Return formated data
      return event;
    },
    /*
     * Quote event element definition
     * - element: Quote event DOM element
     */
    quoteEventElement: function (element) {
      // Create event element
      var event = {
        eventType: 'quote-event',
        mainContainer: element,
        eventYear: element.find('.field-name-field-year')
      }
      // Return formated data
      return event;
    },
    /*
     * Gallery event element definition
     * - element: Gallery event DOM element
     */
    galleryEventElement: function (element) {
      // Create event element
      var event = {
        eventType: 'gallery-event',
        mainContainer: element,
        eventYear: element.find('.field-name-field-year'),
        eventGallery: element.find('.field-name-gallery-items-slideshow')
      }
      // Return formated data
      return event;
    },
    /*
     * Generates all menu skrollr elements
     */
    generateSkrollrMenu: function () {
      var skrollrMenu = $('#sk-menu');
      $.each(NBC.Ourhistory.skrollableItems, function (key, element) {
        var decade = element.mainContainer.attr('id')
        var year = element.decadeYear.html()
        NBC.Ourhistory.skrollrMenuItem(skrollrMenu, decade, year);
      });
    },
    /*
     * Appends skrollr menu item HTML markup
     * - element: UL menu item
     * - year: decade year for menu
     */
    skrollrMenuItem: function (element, decade, year) {
      var lastMenuItem = $('#' + decade).is(':last-child');
      var menuItemLi = $('<li />', {'class': 'decade'});
      if (!lastMenuItem) {
        menuItemLi.append($('<div />').addClass('collapsed').append($('<a />', {'href': '#' + decade, 'class': 'collapsed'}).html(year)).append($('<span />', {'class': 'indicator'})));
      } else {
        menuItemLi.append($('<div />').addClass('collapsed last').append($('<a />', {'href': '#' + decade, 'class': 'collapsed'}).html(year)).append($('<span />', {'class': 'indicator'})));
      }
      menuItemLi.append($('<div />').addClass('expand').append($('<a />', {'href': '#' + decade}).html(year)).append($('<span />', {'class': 'indicator pager-0'})));
      for (pagerItem = 1; pagerItem <= 32; pagerItem++) {
        menuItemLi.children('div.expand').append($('<span />', {'class': 'pager-' + pagerItem, 'data-start': 'opacity:0;'}));
      }
      element.append(menuItemLi);
    },
    setInitialSKMenuAnimation: function() {
      $('#sk-menu').attr('data-0-start', 'top: -' + ($('#sk-menu').height() + 80) + 'px');
      $('#sk-menu').attr('data-770-start', 'top:  105px');
    },
    /*
     * Creates animations for skrollr menu elements
     */
    assignAnimationMenu: function () {
      this.setInitialSKMenuAnimation();

      $('#sk-menu li.decade').each(function (index, target) {
        var element = $(this);
        var collapsedContainer = element.children('div.collapsed');
        var collapsedAnchor = collapsedContainer.children('a');
        var collapsedIndicator = collapsedContainer.children('span');
        var expandContainer = element.children('div.expand');
        var expandAnchor = expandContainer.children('a');
        var expandIndicator = expandContainer.children('span.pager-0');

        collapsedContainer.attr('data-anchor-target', collapsedAnchor.attr('href'));
        collapsedContainer.attr('data-center-top', 'opacity:1');
        collapsedContainer.attr('data-80-top', 'opacity:0');
        collapsedContainer.attr('data-bottom', 'opacity:0');
        collapsedAnchor.attr('data-anchor-target', collapsedAnchor.attr('href'));
        collapsedAnchor.attr('data-center-top', 'opacity:1');
        collapsedAnchor.attr('data-80-top', 'opacity:0');
        collapsedAnchor.attr('data-bottom', 'opacity:0');
        collapsedIndicator.attr('data-anchor-target', collapsedAnchor.attr('href'));
        collapsedIndicator.attr('data-center-top', 'opacity:1');
        collapsedIndicator.attr('data-80-top', 'opacity:0');
        collapsedIndicator.attr('data-bottom', 'opacity:0');

        expandContainer.attr('data-anchor-target', expandAnchor.attr('href'));
        expandContainer.attr('data-center-top', 'opacity:0');
        expandContainer.attr('data-80-top', 'opacity:1');
        expandContainer.attr('data-bottom', 'opacity:1');
        expandAnchor.attr('data-anchor-target', expandAnchor.attr('href'));
        expandAnchor.attr('data-center-top', 'opacity:0');
        expandAnchor.attr('data-80-top', 'opacity:1');
        expandAnchor.attr('data-bottom', 'opacity:1');
        expandIndicator.attr('data-anchor-target', expandAnchor.attr('href'));
        expandIndicator.attr('data-center-top', 'opacity:0');
        expandIndicator.attr('data-80-top', 'opacity:1');
        expandIndicator.attr('data-bottom', 'opacity:1');

        if (!collapsedContainer.hasClass('last')) {
          collapsedContainer.attr('data-center-bottom', 'opacity:1');
          collapsedAnchor.attr('data-center-bottom', 'opacity:1');
          collapsedIndicator.attr('data-center-bottom', 'opacity:1');
          expandContainer.attr('data-center-bottom', 'opacity:0');
          expandAnchor.attr('data-center-bottom', 'opacity:0');
          expandIndicator.attr('data-center-bottom', 'opacity:0');
        }
      });
    },
    /*
     * Skrollr get menu offset
     */
    getMenuOffset: function () {
      this.skrollableItemsOffset = [];
      $.each(NBC.Ourhistory.skrollableItems, function (key, element) {
        var decadeData = [];
        var decadeOffset = element.mainContainer.offset();
        decadeData[0] = (Math.round(element.mainContainer.height() - 850) / 32);
        decadeData[1] = decadeOffset.top;
        NBC.Ourhistory.skrollableItemsOffset.push(decadeData);
      });
    },
    clearAnimationSpritesMenu: function() {
      var pager;
      var skrollrMenu = $('#sk-menu');
      this.removeData(skrollrMenu);
      var skrollrMenuItems = skrollrMenu.find('li.decade div.expand');
      $.each(NBC.Ourhistory.skrollableItemsOffset, function (key, element) {
        var spans = skrollrMenuItems.eq(key).children('span');
        for (pager = 1; pager <= 32; pager++) {
          NBC.Ourhistory.removeData(spans.eq(pager));
        }
      });
      this.setInitialSKMenuAnimation();
    },
    /*
     * Skrollr assign menu animations
     */
    assignAnimationSpritesMenu: function () {
      var pager;
      var skrollrMenu = $('#sk-menu');
      var skrollrMenuItems = skrollrMenu.find('li.decade div.expand');
      $.each(NBC.Ourhistory.skrollableItemsOffset, function (key, element) {
        skrollrMenu.attr('data-' + Math.round(element[1]) + '-start', 'top: '+(105 - key*37)+'px');
        var spans = skrollrMenuItems.eq(key).children('span');
        for (pager = 1; pager <= 32; pager++) {
          var attr = {};
          attr['data-' + Math.round(element[1] + (element[0] * pager) - 1) + '-start'] = 'opacity:0';
          attr['data-' + Math.round(element[1] + (element[0] * pager)) + '-start'] = 'opacity:1';
          if (pager < 32) {
            attr['data-' + Math.round(element[1] + (element[0] * (pager + 1)) - 1) + '-start'] = 'opacity:1';
            attr['data-' + Math.round(element[1] + (element[0] * (pager + 1))) + '-start'] = 'opacity:0';
          }
          spans.eq(pager).attr(attr);
        }
      });
    },
    clickActionsSetup: false,
    /*
     * Functions to be triggered by the click mouse event
     */
    clickActions: function () {
      if (this.clickActionsSetup)
        return;
      this.clickActionsSetup = true;

      var skrollrMenu = $('#sk-menu');

      // Animate page to skrollr start point
      $('.field-name-field-subtitle .skrollr-menu').click(function () {
        $('body').animate({ scrollTop: 745 }, 1000);
      });

      // Trigger gallery overlay using view gallery button
      $('.field-name-view-gallery a.view-gallery').each(function () {
        $(this).on('click', function () {
          var slideshow = $(this).closest('.field-name-view-gallery').siblings('.field-name-gallery-items-slideshow');
          var carrousel = slideshow.find('.owl-carousel');
          var slideshowContainer = slideshow.find('.view-our-history-gallery-overlay');
          var slideshowItems = slideshow.find('.views-field-nothing');

          slideshow.find('.views-field-counter .total').html(slideshowItems.size());
          carrousel.trigger('owl.jumpTo', 0);

          // Call to resizeGallery function
          NBC.Ourhistory.resizeGallery(slideshow, slideshowContainer, slideshowItems);

          slideshow.closest('.field-item').toggleClass('no-alpha');
          slideshow.fadeIn('easy');
          skrollrMenu.fadeOut('easy');
		  window_height = slideshow.outerHeight();
		  //Only for mobile
		  if ($(window).width() <385) {
		    carrousel.find('.owl-item').each(function() {
			  $(this).css('height', (window_height)+'px');
			  $(this).find('.col-left').css('height', (window_height)+'px').css('margin-top', '');
			  $(this).find('img').css({'max-height': (window_height-200)+'px', 'width':'auto', 'height': 'auto'});
			  op_top = 95;
			  $(this).find('.show-content').html('').css('top', (window_height-op_top)+'px');
			  $(this).find('.views-field-counter').css({'top': (window_height-75)+'px'});
			  $(this).parents('.owl-carousel').find('.owl-controls').width($(window).width()-60);
			  $(this).find('.col-right').css({'position':'fixed','top':'0px','height':window_height+'px'});
		    });
			carrousel.find('.owl-prev').html('');
			carrousel.find('.owl-next').html('');
		  }
		  else if ($(window).width() <641) {
			  carrousel.find('.owl-item').each(function() { 
			    $(this).css('height', (window_height)+'px');
			    $(this).find('.col-left').css('height', (window_height)+'px').css('margin-top', '-20px');
			    $(this).find('img').css({'height': 'auto', 'width':'auto', 'max-height':(window_height-20)+'px'});
			    $(this).parents('.owl-wrapper-outer').css('height', (window_height)+'px');
				$(this).parents('.owl-carousel').find('.owl-controls').css('bottom', (window_height/2)+'px');
				$(this).parents('.owl-carousel').find('.views-field-counter').css({'top': (window_height/2)+'px', 'position':'absolute', 'margin-top':'0px'});
				//$(this).find('.show-content').html('').css('top', (window_height-60)+'px').css('left', '75%');
				$(this).find('.show-content').html('').css('top', ((window_height/2) + 76)+'px');//.css('left', '75%');
				$(this).parents('.owl-carousel').find('.owl-controls').width($(window).width());
				$(this).find('.col-right').css({'position':'','top':'','height':window_height+'px'});
			  });
		  }
		  //slideshow.find('.view-content').css({'position': 'fixed', 'top':'50px'});
        })
      });

      // Trigger gallery overlay to proper slideshow using gallery thumbnails
      $('.field-name-field-gallery-items > .field-items > .field-item').on('click', function () {
        var slide = $(this).index();
        var slideshow = $(this).closest('.field-collection-container').siblings('.field-name-gallery-items-slideshow');
        var carrousel = slideshow.find('.owl-carousel');
        var slideshowContainer = slideshow.find('.view-our-history-gallery-overlay');
        var slideshowItems = slideshow.find('.views-field-nothing');

        slideshow.find('.views-field-counter .total').html(slideshowItems.size());

        // Call to resizeGallery function
        NBC.Ourhistory.resizeGallery(slideshow, slideshowContainer, slideshowItems);

        carrousel.trigger('owl.jumpTo', slide);
        slideshow.closest('.field-item').toggleClass('no-alpha');
        slideshow.fadeIn('easy');
        skrollrMenu.fadeOut('easy');
		window_height = slideshow.outerHeight();
		//Only for mobile
		if ($(window).width() <385) {
		    carrousel.find('.owl-item').each(function() {
			  $(this).css('height', (window_height)+'px');
			  $(this).find('.col-left').css('height', (window_height)+'px').css('margin-top', '');
			  $(this).find('img').css({'max-height': (window_height-200)+'px', 'width':'auto', 'height':'auto'});
			  op_top = 75;
			  if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
				op_top = 75;
			  }
			  $(this).find('.show-content').html('').css('top', (window_height-op_top)+'px');
			  $(this).find('.views-field-counter').css({'top': (window_height-75)+'px'});
			  $(this).parents('.owl-carousel').find('.owl-controls').width($(window).width()-60);
			  $(this).find('.col-right').css({'position':'fixed','top':'0px','height':window_height+'px'});
		    });
			carrousel.find('.owl-prev').html('');
			carrousel.find('.owl-next').html('');
		  }
		else if ($(window).width() <641) {
			  carrousel.find('.owl-item').each(function() {
			    $(this).css('height', (window_height)+'px');
			    $(this).find('.col-left').css('height', (window_height)+'px').css('margin-top', '-20px');
			    $(this).find('img').css({'height': 'auto', 'width':'auto', 'max-height':(window_height-20)+'px'});
			    $(this).parents('.owl-wrapper-outer').css('height', (window_height)+'px');
				$(this).parents('.owl-carousel').find('.owl-controls').css('bottom', (window_height/2)+'px');
				$(this).parents('.owl-carousel').find('.views-field-counter').css({'top': (window_height/2)+'px', 'position':'absolute', 'margin-top':'0px'});
				$(this).find('.show-content').html('').css('top', ((window_height/2) + 76)+'px');//.css('left', '75%'); 
				$(this).parents('.owl-carousel').find('.owl-controls').width($(window).width());
				$(this).find('.col-right').css({'position':'','top':'','height':window_height+'px'});
			  });
		  }
      });

      // Trigger gallery overlay close action
      $('.view-our-history-gallery-overlay .close-button').each(function () {
        $(this).on('click', function () {
          var slideshow = $(this).closest('.field-name-gallery-items-slideshow');
          slideshow.closest('.field-item').toggleClass('no-alpha');
          slideshow.fadeOut('easy');
          skrollrMenu.fadeIn('easy');
		  var carrousel = $('.owl-carousel:visible');
		  carrousel.find('.owl-item').each(function() {
			$(this).css('height', '');
			$(this).find('.col-left').removeAttr('style');
			$(this).find('img').removeAttr('style');
			$(this).parents('.owl-wrapper-outer').removeAttr('style');
			$(this).parents('.owl-carousel').find('.owl-controls').css('bottom', '');
			$(this).parents('.owl-carousel').find('.views-field-counter').removeAttr('style');
			$(this).find('.show-content').html('');
			$(this).parents('.owl-carousel').find('.owl-controls').css('z-index', 0);
			$(this).parents('.view-our-history-gallery-overlay').find('.close-button').css('z-index', 9999);
			$(this).find('.views-field-counter').css('opacity', '1');
		  });
        });
      });

      // Show/hide function for gallery overlay content
      $('div.show-content').live('click', function () {
        //var element = $(this).parent().children('.views-field-field-body');
		var element = $(this).parents('.field-content').children('.col-right');
        if (!element.hasClass('open')) {
          element.addClass('open');
		  element.find('div').show();
          $(this).addClass('cross');
		  //element.css('height', $(window).height()+'px');
		  element.parents('.owl-carousel').find('.owl-controls').css('z-index', -1);
		  element.parents('.view-our-history-gallery-overlay').find('.close-button').css('z-index', -1);
		  element.find('.views-field-counter').css('opacity', '0.1');
        } else {
          element.removeClass('open');
		  element.find('.views-field-field-year').hide();
		  element.find('.views-field-field-header').hide();
		  element.find('.views-field-field-body').hide();
          $(this).removeClass('cross');
		  element.parents('.owl-carousel').find('.owl-controls').css('z-index', 0);
		  element.parents('.view-our-history-gallery-overlay').find('.close-button').css('z-index', 9999);
		  element.find('.views-field-counter').css('opacity', '1');
        }
      });
    },

    /*
     * Functions to be triggered by the window resize event
     * - Init or destroy skrollr depending of window width (required for functionality to be disabled on tablet devices)
     * - Resize OWL carrousel gallery slideshow containers
     */
    onResize: function () {
      // Destroy skroller on tablet device
      if (NBC.GLOBAL.viewportWidth < 1025) {
        if (!this.initialized)
          return;

        this.dbg_startTimer('resize: less than 1025');
        this.clearImageHeights();

        if (this.skrollr_active)
          this.skrollrDestroy();
        this.dbg_endTimer('resize: less than 1025');
      }

      // Enable skroller on desktop device
      if (NBC.GLOBAL.viewportWidth > 1024) {
        this.dbg_startTimer('resize: more than 1024');
        if (!this.initialized) {
          this.init();
          if (this.isLoaded && !this.isLoadedExecuted)
            this.onLoad();
        }

        this.decadeCounter = 0;
        $.each(this.skrollableItems, function (key, element) {
          NBC.Ourhistory.assignAnimationDecade(element);
        });
        if (!this.isLoaded)
          this.forceImageHeights();
        else
          this.clearImageHeights();

        if (this.isLoaded && this.isLoadedExecuted) {
          this.getMenuOffset();
          this.clearAnimationSpritesMenu();
          this.assignAnimationSpritesMenu();
        }

        if (!this.skrollr_active)
          this.skrollrInit();
        else {
          NBC.Ourhistory.skrollr_config.refresh();
        }
        this.dbg_endTimer('resize: more than 1024');
      }

      this.dbg_startTimer('resizing galleries');
      // - Resize OWL carrousel gallery slideshow containers
      var slideshows = $('.field-name-gallery-items-slideshow');
      slideshows.each(function () {
        var slideshowContainer = $(this).find('.view-our-history-gallery-overlay');
        var slideshowItems = $(this).find('.views-field-nothing');
        if ($('body').width() < 1280) {
          $(this).width($(window).width());
          slideshowItems.width($(window).width());
          slideshowContainer.width($(window).width());
          $(this).find('.owl-controls').width($(window).width());
        } else {
		  $(this).width($(window).width());
          slideshowItems.width(1280);
          slideshowContainer.width(1280);
          $(this).find('.owl-controls').width(1280);
        }
      });
	  NBC.Ourhistory.setHeightForBrightcove();
      this.dbg_endTimer('resizing galleries');
	  //Only for mobile
	  var carrousel = $('.owl-carousel:visible');
	  var slideshow = $('.field-name-gallery-items-slideshow:visible');
	  window_height = slideshow.outerHeight();
		if ($(window).width() <385) {
			carrousel.find('.owl-item').each(function() {
			  $(this).css('height', (window_height)+'px');
			  $(this).find('.col-left').css('height', (window_height)+'px').css('margin-top', '');
			  $(this).find('.col-right').css('height', (window_height)+'px');
			  $(this).find('img').css({'max-height': (window_height-200)+'px', 'width':'auto', 'height':'auto'});
			  $(this).parents('.owl-carousel').find('.owl-controls').css('bottom', '-10px');
			  $(this).parents('.owl-carousel').find('.views-field-counter').css({'top': (window_height-75)+'px', 'position':'', 'margin-top':''});
			  //$(this).find('.show-content').html('').css('top', (window_height-50)+'px');
			  $(this).parents('.owl-wrapper-outer').css('height', (window_height)+'px');
			  $(this).parents('.owl-carousel').find('.owl-controls').width($(window).width()-60);
			  $(this).find('.col-right').css({'position':'fixed','top':'0px'});
			  op_top = 75;
			  if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
				op_top = 75;
			  }
			  $(this).find('.show-content').html('').css('top', (window_height-op_top)+'px');
		    });
			carrousel.find('.owl-prev').html('');
			carrousel.find('.owl-next').html('');
			$(this).find('.col-left').css('height', window_height+'px');
		  }
		  else if ($(window).width() <641) {
			  carrousel.find('.owl-item').each(function() {
			    $(this).css('height', (window_height)+'px');
			    $(this).find('.col-left').css('height', (window_height)+'px').css('margin-top', '-20px');
				$(this).find('.col-right').css('height', (window_height)+'px');
			    $(this).find('img').css({'height': 'auto', 'width':'auto', 'max-height':(window_height-20)+'px'});
			    $(this).parents('.owl-wrapper-outer').css('height', (window_height)+'px');
				$(this).parents('.owl-carousel').find('.owl-controls').css('bottom', (window_height/2)+'px');
				$(this).parents('.owl-carousel').find('.views-field-counter').css({'top': (window_height/2)+'px', 'position':'absolute', 'margin-top':'0px'});
				$(this).find('.show-content').html('').css('top', (window_height/2) + 76 +'px');
				if (!$(this).find('.views-field-field-year').is(':visible')) {
					$(this).find('.views-field-field-year').hide();
					$(this).find('.views-field-field-header').hide();
					$(this).find('.col-right .views-field-field-body').hide();
				}
				$(this).parents('.owl-carousel').find('.owl-controls').width($(window).width());
				$(this).find('.col-right').css({'position':'','top':''});
			  });
		  }
		  else {
			carrousel.find('.owl-item').each(function() {
			    $(this).css('height', '');
			    $(this).find('.col-left').removeAttr('style');
			    $(this).find('img').removeAttr('style');
			    $(this).parents('.owl-wrapper-outer').removeAttr('style');
				$(this).parents('.owl-carousel').find('.owl-controls').css('bottom', '');
				$(this).parents('.owl-carousel').find('.views-field-counter').removeAttr('style');
				$(this).find('.show-content').html('');
				$(this).find('.views-field-field-year').show();
				$(this).find('.views-field-field-header').show();
				$(this).find('.col-right .views-field-field-body').show();
				$(this).parents('.owl-carousel').find('.owl-controls').css('z-index', 0);
			    $(this).parents('.view-our-history-gallery-overlay').find('.close-button').css('z-index', 9999);
			    $(this).find('.views-field-counter').css('opacity', '1');
				$(this).find('.col-right').css({'position':'','top':''});
			  });
		  }
	  //this.resizePopup();
	  
    },
    /*
     * Skrollr jQuery plugin initialization
     * Skrollr Menu jQuery plugin initialization
     */
    skrollrInit: function () {
//console.log('initskr');
      // Init skrollr
      this.skrollr_config = skrollr.init({
        forceHeight: false,
        render: function (data) {
          //Log the current scroll position.
//          $('#info').text(data.curTop);
        }
      });

      // Init skrollr menu
      if (!NBC.Ourhistory.disableMostAnimations)
        skrollr.menu.init(this.skrollr_config, {
          animate: true,
          easing: 'swing',
          duration: 1000
        });

      // Skrollr desktop configurations
      $('body').addClass('is-desktop');
      $('body').removeClass('is-tablet');
      this.skrollr_active = true;
    },
    /*
     * Skrollr jQuery plugin destroy
     */
    skrollrDestroy: function () {
      $('body').addClass('is-tablet');
      $('body').removeClass('is-desktop');
      skrollr.init().destroy();
      this.skrollr_active = false;
      $('.skrollable').attr('style', '').removeClass('skrollable-after skrollable-before skrollable-between');
    },
    /*
     * Skrollr menu DOM element definition
     */
    scrollMenu: function () {
      this.scrollFixMenu = $('.skrollr-menu');
    },
    /*
     * Resize gallery function
     * - slideshow: Gallery main drupal container
     * - slideshowContainer: Gallery slideshow container
     * - slideshowItems: Gallery slideshow items
     */
    resizeGallery: function (slideshow, slideshowContainer, slideshowItems) {
      if ($('body').width() < 1025) {
        slideshowItems.width($(window).width());
        slideshowContainer.width($(window).width());
        slideshow.find('.owl-controls').width($(window).width());
      }

//      if ($('body').width() < 640) {
//        slideshowItems.each(function () {
//          if ($(this).find('.col-left').size() > 0) {
//            var slideImage = $(this).find('.col-left .views-field-field-image');
//            var showContent = $('<div/>',{'class':'show-content','html':'+'});
//            $(this).find('.col-left').remove();
//            $(this).find('.col-right .views-field-counter').after('<div class="views-field-image">' + slideImage.html() + '</div>');
//            $(this).find('.col-right').append(showContent);
//          }
//        });
//      }
    }
  }
});
;
