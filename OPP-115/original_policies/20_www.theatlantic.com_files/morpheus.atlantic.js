/*! JSON v3.3.2 | http://bestiejs.github.io/json3 | Copyright 2012-2014, Kit Cambridge | http://kit.mit-license.org */
(function(){function e(t,r){function s(e){if(s[e]!==g)return s[e];var t;if("bug-string-char-index"==e)t="a"!="a"[0];else if("json"==e)t=s("json-stringify")&&s("json-parse");else{var n;if("json-stringify"==e){t=r.stringify;var i="function"==typeof t&&y;if(i){(n=function(){return 1}).toJSON=n;try{i="0"===t(0)&&"0"===t(new o)&&'""'==t(new u)&&t(d)===g&&t(g)===g&&t()===g&&"1"===t(n)&&"[1]"==t([n])&&"[null]"==t([g])&&"null"==t(null)&&"[null,null,null]"==t([g,d,null])&&'{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}'==t({a:[n,!0,!1,null,"\0\b\n\f\r    "]})&&"1"===t(null,n)&&"[\n 1,\n 2\n]"==t([1,2],null,1)&&'"-271821-04-20T00:00:00.000Z"'==t(new f(-864e13))&&'"+275760-09-13T00:00:00.000Z"'==t(new f(864e13))&&'"-000001-01-01T00:00:00.000Z"'==t(new f(-621987552e5))&&'"1969-12-31T23:59:59.999Z"'==t(new f(-1))}catch(a){i=!1}}t=i}if("json-parse"==e){t=r.parse;if("function"==typeof t)try{if(0===t("0")&&!t(!1)){n=t('{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}');var l=5==n.a.length&&1===n.a[0];if(l){try{l=!t('" "')}catch(c){}if(l)try{l=1!==t("01")}catch(h){}if(l)try{l=1!==t("1.")}catch(p){}}}}catch(v){l=!1}t=l}}return s[e]=!!t}t||(t=i.Object());r||(r=i.Object());var o=t.Number||i.Number,u=t.String||i.String,a=t.Object||i.Object,f=t.Date||i.Date,l=t.SyntaxError||i.SyntaxError,c=t.TypeError||i.TypeError,h=t.Math||i.Math,p=t.JSON||i.JSON;"object"==typeof p&&p&&(r.stringify=p.stringify,r.parse=p.parse);var a=a.prototype,d=a.toString,v,m,g,y=new f(-0xc782b5b800cec);try{y=-109252==y.getUTCFullYear()&&0===y.getUTCMonth()&&1===y.getUTCDate()&&10==y.getUTCHours()&&37==y.getUTCMinutes()&&6==y.getUTCSeconds()&&708==y.getUTCMilliseconds()}catch(b){}if(!s("json")){var w=s("bug-string-char-index");if(!y)var E=h.floor,S=[0,31,59,90,120,151,181,212,243,273,304,334],x=function(e,t){return S[t]+365*(e-1970)+E((e-1969+(t=+(1<t)))/4)-E((e-1901+t)/100)+E((e-1601+t)/400)};(v=a.hasOwnProperty)||(v=function(e){var t={},n;(t.__proto__=null,t.__proto__={toString:1},t).toString!=d?v=function(e){var t=this.__proto__;e=e in(this.__proto__=null,this);this.__proto__=t;return e}:(n=t.constructor,v=function(e){var t=(this.constructor||n).prototype;return e in this&&!(e in t&&this[e]===t[e])});t=null;return v.call(this,e)});m=function(e,t){var r=0,i,s,o;(i=function(){this.valueOf=0}).prototype.valueOf=0;s=new i;for(o in s)v.call(s,o)&&r++;i=s=null;r?m=2==r?function(e,t){var n={},r="[object Function]"==d.call(e),i;for(i in e)r&&"prototype"==i||v.call(n,i)||!(n[i]=1)||!v.call(e,i)||t(i)}:function(e,t){var n="[object Function]"==d.call(e),r,i;for(r in e)n&&"prototype"==r||!v.call(e,r)||(i="constructor"===r)||t(r);(i||v.call(e,r="constructor"))&&t(r)}:(s="valueOf toString toLocaleString propertyIsEnumerable isPrototypeOf hasOwnProperty constructor".split(" "),m=function(e,t){var r="[object Function]"==d.call(e),i,o=!r&&"function"!=typeof e.constructor&&n[typeof e.hasOwnProperty]&&e.hasOwnProperty||v;for(i in e)r&&"prototype"==i||!o.call(e,i)||t(i);for(r=s.length;i=s[--r];o.call(e,i)&&t(i));});return m(e,t)};if(!s("json-stringify")){var T={92:"\\\\",34:'\\"',8:"\\b",12:"\\f",10:"\\n",13:"\\r",9:"\\t"},C=function(e,t){return("000000"+(t||0)).slice(-e)},L=function(e){for(var t='"',n=0,r=e.length,i=!w||10<r,s=i&&(w?e.split(""):e);n<r;n++){var o=e.charCodeAt(n);switch(o){case 8:case 9:case 10:case 12:case 13:case 34:case 92:t+=T[o];break;default:if(32>o){t+="\\u00"+C(2,o.toString(16));break}t+=i?s[n]:e.charAt(n)}}return t+'"'},A=function(e,t,n,r,i,s,o){var u,a,f,l,h,p,y,b,w;try{u=t[e]}catch(S){}if("object"==typeof u&&u)if(a=d.call(u),"[object Date]"!=a||v.call(u,"toJSON"))"function"==typeof u.toJSON&&("[object Number]"!=a&&"[object String]"!=a&&"[object Array]"!=a||v.call(u,"toJSON"))&&(u=u.toJSON(e));else if(u>-1/0&&u<1/0){if(x){l=E(u/864e5);for(a=E(l/365.2425)+1970-1;x(a+1,0)<=l;a++);for(f=E((l-x(a,0))/30.42);x(a,f+1)<=l;f++);l=1+l-x(a,f);h=(u%864e5+864e5)%864e5;p=E(h/36e5)%24;y=E(h/6e4)%60;b=E(h/1e3)%60;h%=1e3}else a=u.getUTCFullYear(),f=u.getUTCMonth(),l=u.getUTCDate(),p=u.getUTCHours(),y=u.getUTCMinutes(),b=u.getUTCSeconds(),h=u.getUTCMilliseconds();u=(0>=a||1e4<=a?(0>a?"-":"+")+C(6,0>a?-a:a):C(4,a))+"-"+C(2,f+1)+"-"+C(2,l)+"T"+C(2,p)+":"+C(2,y)+":"+C(2,b)+"."+C(3,h)+"Z"}else u=null;n&&(u=n.call(t,e,u));if(null===u)return"null";a=d.call(u);if("[object Boolean]"==a)return""+u;if("[object Number]"==a)return u>-1/0&&u<1/0?""+u:"null";if("[object String]"==a)return L(""+u);if("object"==typeof u){for(e=o.length;e--;)if(o[e]===u)throw c();o.push(u);w=[];t=s;s+=i;if("[object Array]"==a){f=0;for(e=u.length;f<e;f++)a=A(f,u,n,r,i,s,o),w.push(a===g?"null":a);e=w.length?i?"[\n"+s+w.join(",\n"+s)+"\n"+t+"]":"["+w.join(",")+"]":"[]"}else m(r||u,function(e){var t=A(e,u,n,r,i,s,o);t!==g&&w.push(L(e)+":"+(i?" ":"")+t)}),e=w.length?i?"{\n"+s+w.join(",\n"+s)+"\n"+t+"}":"{"+w.join(",")+"}":"{}";o.pop();return e}};r.stringify=function(e,t,r){var i,s,o,u;if(n[typeof t]&&t)if("[object Function]"==(u=d.call(t)))s=t;else if("[object Array]"==u){o={};for(var a=0,f=t.length,l;a<f;l=t[a++],(u=d.call(l),"[object String]"==u||"[object Number]"==u)&&(o[l]=1));}if(r)if("[object Number]"==(u=d.call(r))){if(0<(r-=r%1))for(i="",10<r&&(r=10);i.length<r;i+=" ");}else"[object String]"==u&&(i=10>=r.length?r:r.slice(0,10));return A("",(l={},l[""]=e,l),s,o,i,"",[])}}if(!s("json-parse")){var O=u.fromCharCode,M={92:"\\",34:'"',47:"/",98:"\b",116:"   ",110:"\n",102:"\f",114:"\r"},_,D,P=function(){_=D=null;throw l()},H=function(){for(var e=D,t=e.length,n,r,i,s,o;_<t;)switch(o=e.charCodeAt(_),o){case 9:case 10:case 13:case 32:_++;break;case 123:case 125:case 91:case 93:case 58:case 44:return n=w?e.charAt(_):e[_],_++,n;case 34:n="@";for(_++;_<t;)if(o=e.charCodeAt(_),32>o)P();else if(92==o)switch(o=e.charCodeAt(++_),o){case 92:case 34:case 47:case 98:case 116:case 110:case 102:case 114:n+=M[o];_++;break;case 117:r=++_;for(i=_+4;_<i;_++)o=e.charCodeAt(_),48<=o&&57>=o||97<=o&&102>=o||65<=o&&70>=o||P();n+=O("0x"+e.slice(r,_));break;default:P()}else{if(34==o)break;o=e.charCodeAt(_);for(r=_;32<=o&&92!=o&&34!=o;)o=e.charCodeAt(++_);n+=e.slice(r,_)}if(34==e.charCodeAt(_))return _++,n;P();default:r=_;45==o&&(s=!0,o=e.charCodeAt(++_));if(48<=o&&57>=o){for(48==o&&(o=e.charCodeAt(_+1),48<=o&&57>=o)&&P();_<t&&(o=e.charCodeAt(_),48<=o&&57>=o);_++);if(46==e.charCodeAt(_)){for(i=++_;i<t&&(o=e.charCodeAt(i),48<=o&&57>=o);i++);i==_&&P();_=i}o=e.charCodeAt(_);if(101==o||69==o){o=e.charCodeAt(++_);43!=o&&45!=o||_++;for(i=_;i<t&&(o=e.charCodeAt(i),48<=o&&57>=o);i++);i==_&&P();_=i}return+e.slice(r,_)}s&&P();if("true"==e.slice(_,_+4))return _+=4,!0;if("false"==e.slice(_,_+5))return _+=5,!1;if("null"==e.slice(_,_+4))return _+=4,null;P()}return"$"},B=function(e){var t,n;"$"==e&&P();if("string"==typeof e){if("@"==(w?e.charAt(0):e[0]))return e.slice(1);if("["==e){for(t=[];;n||(n=!0)){e=H();if("]"==e)break;n&&(","==e?(e=H(),"]"==e&&P()):P());","==e&&P();t.push(B(e))}return t}if("{"==e){for(t={};;n||(n=!0)){e=H();if("}"==e)break;n&&(","==e?(e=H(),"}"==e&&P()):P());","!=e&&"string"==typeof e&&"@"==(w?e.charAt(0):e[0])&&":"==H()||P();t[e.slice(1)]=B(H())}return t}P()}return e},j=function(e,t,n){n=I(e,t,n);n===g?delete e[t]:e[t]=n},I=function(e,t,n){var r=e[t],i;if("object"==typeof r&&r)if("[object Array]"==d.call(r))for(i=r.length;i--;)j(r,i,n);else m(r,function(e){j(r,e,n)});return n.call(e,t,r)};r.parse=function(e,t){var n,r;_=0;D=""+e;n=B(H());"$"!=H()&&P();_=D=null;return t&&"[object Function]"==d.call(t)?I((r={},r[""]=n,r),"",t):n}}}r.runInContext=e;return r}var t=typeof define==="function"&&define.amd,n={"function":!0,object:!0},r=n[typeof exports]&&exports&&!exports.nodeType&&exports,i=n[typeof window]&&window||this,s=r&&n[typeof module]&&module&&!module.nodeType&&"object"==typeof global&&global;!s||s.global!==s&&s.window!==s&&s.self!==s||(i=s);if(r&&!t)e(i,r);else{var o=i.JSON,u=i.JSON3,a=!1,f=e(i,i.JSON3={noConflict:function(){a||(a=!0,i.JSON=o,i.JSON3=u,o=u=null);return f}});i.JSON={parse:f.parse,stringify:f.stringify}}t&&define(function(){return f})}).call(this)

//Keys
if(!Object.keys){Object.keys=function(){"use strict";var e=Object.prototype.hasOwnProperty,t=!{toString:null}.propertyIsEnumerable("toString"),n=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],r=n.length;return function(i){if(typeof i!=="object"&&(typeof i!=="function"||i===null)){throw new TypeError("Object.keys called on non-object")}var s=[],o,u;for(o in i){if(e.call(i,o)){s.push(o)}}if(t){for(u=0;u<r;u++){if(e.call(i,n[u])){s.push(n[u])}}}return s}}()}

//Map
if(!Array.prototype.map){Array.prototype.map=function(e,t){var n,r,i;if(this==null){throw new TypeError(" this is null or not defined")}var s=Object(this);var o=s.length>>>0;if(typeof e!=="function"){throw new TypeError(e+" is not a function")}if(arguments.length>1){n=t}r=new Array(o);i=0;while(i<o){var u,a;if(i in s){u=s[i];a=e.call(n,u,i,s);r[i]=a}i++}return r}}

//IndexOf
if(!Array.prototype.indexOf){Array.prototype.indexOf=function(e,t){var n;if(this==null){throw new TypeError('"this" is null or not defined')}var r=Object(this);var i=r.length>>>0;if(i===0){return-1}var s=+t||0;if(Math.abs(s)===Infinity){s=0}if(s>=i){return-1}n=Math.max(s>=0?s:i-Math.abs(s),0);while(n<i){if(n in r&&r[n]===e){return n}n++}return-1}}

// Sonobi Morpheus
var sbi_shell = {
    loc: '//apex.go.sonobi.com',
    timeout: navigator.userAgent.match(/webOS|Android|iPhone|iPad|iPod|BlackBerry|Windows Phone|IEMobile/i) ? 2000 : 1500,
    registration: {},
    dfpVariables: {},
    cmd: [],
    reactive: false,
    pings: {
        timeout: '',
        user_sync: '//sync.go.sonobi.com/uc.js',
        stats: ''
    },
    abortTests: {
        callOperator: function() {
            try {
                return !!Atlantic.Ad.manager.deferredIds;
            } catch(e) {
                return false;
            }
        }
    },
    initialize: function() {
        window.googletag = window.googletag || {};
        googletag.cmd = googletag.cmd || [];
        googletag.cmd.push(function() {
            googletag.pubads().disableInitialLoad();
            sbi_morpheus.dfpVariables.pubads = googletag.pubads();
            sbi_morpheus.stop = googletag.debug_log.getAllEvents().map(function(obj) {
                return obj.getMessage().getMessageId();
            }).indexOf(50) != -1;
            googletag.pubads().addEventListener('slotRenderEnded', function(event) {
                window.sbi_morpheus.stop = true;
            });
            if (sbi_morpheus.stop) return;
            sbi_morpheus.dfpVariables.pubads.old_refresh = sbi_morpheus.dfpVariables.pubads.refresh;
            sbi_morpheus.overrideRefresh();
            if (sbi_morpheus.cmd.length > 0) {
                for(var i = 0; i < sbi_morpheus.cmd.length; i++) {
                    if(typeof sbi_morpheus.cmd[i] == 'function') sbi_morpheus.cmd[i]();
                }
            }
            sbi_morpheus.cmd = {push: function(cmd) { if(typeof cmd == 'function') cmd();}};
        });
    },
    setKeys: function() {
        try {
            if (typeof(window.sbi_trinity) != 'undefined') {
                var slots = arguments.length > 0 ? arguments[0] : sbi_morpheus.dfpVariables.pubads.getSlots();

                for (var i = 0; i < slots.length; i++) {
                    var slotId = slots[i].getSlotId().getDomId();
                    var new_targeting = slots[i].getTargetingMap();
                    slots[i].clearTargeting();

                    for (var key in new_targeting)
                        if (key.substr(0, 3) == 'sbi') delete new_targeting[key];

                    if (slotId in window.sbi_trinity) {
                        for (var key in window.sbi_trinity[slotId]) {
                            new_targeting[key] = ['' + window.sbi_trinity[slotId][key]];
                        }
                    }
                    for (var key in new_targeting) slots[i].setTargeting(key, new_targeting[key]);
                }
                var dc = window.sbi_dc;
                sbi_morpheus.dfpVariables.pubads.setTargeting('sbi_dc', dc);
            }
        } catch (e) {}
    },
    launch: function(src, callback) {
        if (src == null) return;
        if (callback == null) callback = function() {};
        try {
            var sbi_script = document.createElement('script');
            sbi_script.type = 'text/javascript';
            sbi_script.async = true;
            sbi_script.src = src;

            if (callback != function() {}) {
                var launch_timeout = setTimeout(function() {
                    if (sbi_morpheus.pings.timeout != '') sbi_morpheus.launch(sbi_morpheus.pings.timeout);

                    try {
                        callback();
                    } catch (e) {}
                    callback = function() {};
                }, window.sbi_morpheus.timeout);

                if (sbi_script.readyState) {
                    sbi_script.onreadystatechange = function() {
                        clearTimeout(launch_timeout);

                        if (sbi_script.readyState == "loaded" || sbi_script.readyState == "complete") {
                            sbi_script.onreadystatechange = null;
                            try {
                                callback();
                            } catch (e) {}
                            callback = function() {};
                        }
                    };
                } else {
                    sbi_script.onload = function() {
                        clearTimeout(launch_timeout);

                        try {
                            callback();
                        } catch (e) {}
                        callback = function() {};
                    };
                }
            }

            var sc = document.getElementsByTagName('script')[0];
            sc.parentNode.insertBefore(sbi_script, sc);
        } catch (e) {}
    },
    abortTest: function(section) {
        if(!(section in sbi_morpheus.abortTests)) return false;
        return sbi_morpheus.abortTests[section]();
    },
    register: function(dfpid, sid) {
        sbi_morpheus.registration[dfpid] = sid;
    },
    enableReactiveSizes: function(){
        sbi_morpheus.reactive = true;
    },
    callOperator: function(force) {
        var co_count = 0;
        var f = (function() {
            co_count += 1;
            var googletag_test = typeof sbi_morpheus.dfpVariables.pubads != 'undefined';
            if(!googletag_test) {
                setTimeout(f, 2);
                return;
            }
            var pubads_test = googletag.debug_log.getAllEvents().map(function(obj) {
                return obj.getMessage().getMessageId();
            }).indexOf(48) != -1;
            if(sbi_morpheus.abortTest('callOperator')) return;
            var register_test = Object.keys(sbi_morpheus.registration).length > 0;
            var slot_test = sbi_morpheus.dfpVariables.pubads.getSlots().length > 0;
            var match_test = force || Object.keys(sbi_morpheus.registration).length <= sbi_morpheus.dfpVariables.pubads.getSlots().length;
            if (googletag_test && pubads_test && register_test && slot_test && (match_test || co_count > 200)) {
                var slots = sbi_morpheus.dfpVariables.pubads.getSlots();
                var slotIds = {};
                var eligible = {};
                var stats = {};
                for (var i = 0; i < slots.length; i++) {
                    slotIds[slots[i].getSlotId().getDomId()] = slots[i];
                }
                for (var key in sbi_morpheus.registration) {
                    if (!(key in slotIds)) {stats[key] = false; continue;}
                    stats[key] = true;
                    eligible[key] = '' + sbi_morpheus.registration[key];
                    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                    var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
                    var size_list = [];
                    var sizes = slotIds[key].getSizes(width, height);
                    for(var i = 0; i < sizes.length; i++) {
                        size_list.push(sizes[i].getWidth() + 'x' + sizes[i].getHeight());
                    }
                    size_list = size_list.join(',');
                    if(sbi_morpheus.reactive && sizes != '') eligible[key] += ('|' + size_list);
                }
                if (sbi_morpheus.pings.stats != '') sbi_morpheus.launch(sbi_morpheus.pings.stats + JSON.stringify(stats));                
                var callback = function() {
                    sbi_morpheus.setKeys();
                    if (window.sbi_morpheus.stop) return;
                    googletag.pubads().old_refresh();
                };
                if (Object.keys(eligible).length == 0) {
                    if (window.sbi_morpheus.stop) return;
                    googletag.pubads().old_refresh();
                    return;
                } else {
                    sbi_morpheus.launch(sbi_morpheus.loc + '/trinity.js?key_maker=' + JSON.stringify(eligible) + '&s=' + Math.floor(Math.random() * 1000), callback);
                    return;
                }
            } else if (co_count > 500 || (co_count > 200 && !register_test)) {
                try {
                    if (window.sbi_morpheus.stop) return;
                    googletag.pubads().old_refresh();
                } catch (e) {
                    if (window.sbi_morpheus.stop) return;
                    googletag.pubads().refresh();
                }
                return;
            }
            setTimeout(f, 2);
        });
        f();
    },
    overrideRefresh: function() {
        sbi_morpheus.dfpVariables.pubads.refresh = function() {
            var global_arguments = arguments;
            var slots = global_arguments[0] || sbi_morpheus.dfpVariables.pubads.getSlots();
            var slotIds = {};
            var eligible = {};
            var stats = {};
            for (var i = 0; i < slots.length; i++) {
                slotIds[slots[i].getSlotId().getDomId()] = slots[i];
            }
            for (var key in sbi_morpheus.registration) {
                if (!(key in slotIds)) {stats[key] = false; continue;}
                stats[key] = true;
                eligible[key] = '' + sbi_morpheus.registration[key];
                var sizes = slotIds[key].getSizes(window.innerWidth, window.innerHeight).map(function(size){
                    return size.getWidth() + 'x' + size.getHeight();
                }).join(',');                                                       
                if(sbi_morpheus.reactive && sizes != '') eligible[key] += ('|' + sizes);
            }
            if (sbi_morpheus.pings.stats != '') sbi_morpheus.launch(sbi_morpheus.pings.stats + JSON.stringify(stats));
            var callback = function() {
                sbi_morpheus.setKeys.apply(sbi_morpheus, global_arguments);
                sbi_morpheus.dfpVariables.pubads.old_refresh.apply(sbi_morpheus.dfpVariables.pubads, global_arguments);
            };
            if (Object.keys(sbi_morpheus.registration).length == 0 || Object.keys(eligible).length == 0) {
                sbi_morpheus.dfpVariables.pubads.old_refresh.apply(sbi_morpheus.dfpVariables.pubads, global_arguments);
                return;
            }
            sbi_morpheus.launch(sbi_morpheus.loc + '/trinity.js?key_maker=' + JSON.stringify(eligible) + '&s=' + Math.floor(Math.random() * 1000), callback);
        };
    }
};
if ('sbi_morpheus' in window)
    for (var key in sbi_morpheus) {
        sbi_shell[key] = sbi_morpheus[key];
    }
window.sbi_morpheus = sbi_shell;
sbi_morpheus.initialize();