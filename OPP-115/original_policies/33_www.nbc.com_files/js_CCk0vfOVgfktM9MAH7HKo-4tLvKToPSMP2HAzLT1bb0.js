/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/
jQuery.easing["jswing"]=jQuery.easing["swing"];jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(a,b,c,d,e){return jQuery.easing[jQuery.easing.def](a,b,c,d,e)},easeInQuad:function(a,b,c,d,e){return d*(b/=e)*b+c},easeOutQuad:function(a,b,c,d,e){return-d*(b/=e)*(b-2)+c},easeInOutQuad:function(a,b,c,d,e){if((b/=e/2)<1)return d/2*b*b+c;return-d/2*(--b*(b-2)-1)+c},easeInCubic:function(a,b,c,d,e){return d*(b/=e)*b*b+c},easeOutCubic:function(a,b,c,d,e){return d*((b=b/e-1)*b*b+1)+c},easeInOutCubic:function(a,b,c,d,e){if((b/=e/2)<1)return d/2*b*b*b+c;return d/2*((b-=2)*b*b+2)+c},easeInQuart:function(a,b,c,d,e){return d*(b/=e)*b*b*b+c},easeOutQuart:function(a,b,c,d,e){return-d*((b=b/e-1)*b*b*b-1)+c},easeInOutQuart:function(a,b,c,d,e){if((b/=e/2)<1)return d/2*b*b*b*b+c;return-d/2*((b-=2)*b*b*b-2)+c},easeInQuint:function(a,b,c,d,e){return d*(b/=e)*b*b*b*b+c},easeOutQuint:function(a,b,c,d,e){return d*((b=b/e-1)*b*b*b*b+1)+c},easeInOutQuint:function(a,b,c,d,e){if((b/=e/2)<1)return d/2*b*b*b*b*b+c;return d/2*((b-=2)*b*b*b*b+2)+c},easeInSine:function(a,b,c,d,e){return-d*Math.cos(b/e*(Math.PI/2))+d+c},easeOutSine:function(a,b,c,d,e){return d*Math.sin(b/e*(Math.PI/2))+c},easeInOutSine:function(a,b,c,d,e){return-d/2*(Math.cos(Math.PI*b/e)-1)+c},easeInExpo:function(a,b,c,d,e){return b==0?c:d*Math.pow(2,10*(b/e-1))+c},easeOutExpo:function(a,b,c,d,e){return b==e?c+d:d*(-Math.pow(2,-10*b/e)+1)+c},easeInOutExpo:function(a,b,c,d,e){if(b==0)return c;if(b==e)return c+d;if((b/=e/2)<1)return d/2*Math.pow(2,10*(b-1))+c;return d/2*(-Math.pow(2,-10*--b)+2)+c},easeInCirc:function(a,b,c,d,e){return-d*(Math.sqrt(1-(b/=e)*b)-1)+c},easeOutCirc:function(a,b,c,d,e){return d*Math.sqrt(1-(b=b/e-1)*b)+c},easeInOutCirc:function(a,b,c,d,e){if((b/=e/2)<1)return-d/2*(Math.sqrt(1-b*b)-1)+c;return d/2*(Math.sqrt(1-(b-=2)*b)+1)+c},easeInElastic:function(a,b,c,d,e){var f=1.70158;var g=0;var h=d;if(b==0)return c;if((b/=e)==1)return c+d;if(!g)g=e*.3;if(h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return-(h*Math.pow(2,10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g))+c},easeOutElastic:function(a,b,c,d,e){var f=1.70158;var g=0;var h=d;if(b==0)return c;if((b/=e)==1)return c+d;if(!g)g=e*.3;if(h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return h*Math.pow(2,-10*b)*Math.sin((b*e-f)*2*Math.PI/g)+d+c},easeInOutElastic:function(a,b,c,d,e){var f=1.70158;var g=0;var h=d;if(b==0)return c;if((b/=e/2)==2)return c+d;if(!g)g=e*.3*1.5;if(h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);if(b<1)return-.5*h*Math.pow(2,10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g)+c;return h*Math.pow(2,-10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g)*.5+d+c},easeInBack:function(a,b,c,d,e,f){if(f==undefined)f=1.70158;return d*(b/=e)*b*((f+1)*b-f)+c},easeOutBack:function(a,b,c,d,e,f){if(f==undefined)f=1.70158;return d*((b=b/e-1)*b*((f+1)*b+f)+1)+c},easeInOutBack:function(a,b,c,d,e,f){if(f==undefined)f=1.70158;if((b/=e/2)<1)return d/2*b*b*(((f*=1.525)+1)*b-f)+c;return d/2*((b-=2)*b*(((f*=1.525)+1)*b+f)+2)+c},easeInBounce:function(a,b,c,d,e){return d-jQuery.easing.easeOutBounce(a,e-b,0,d,e)+c},easeOutBounce:function(a,b,c,d,e){if((b/=e)<1/2.75){return d*7.5625*b*b+c}else if(b<2/2.75){return d*(7.5625*(b-=1.5/2.75)*b+.75)+c}else if(b<2.5/2.75){return d*(7.5625*(b-=2.25/2.75)*b+.9375)+c}else{return d*(7.5625*(b-=2.625/2.75)*b+.984375)+c}},easeInOutBounce:function(a,b,c,d,e){if(b<e/2)return jQuery.easing.easeInBounce(a,b*2,0,d,e)*.5+c;return jQuery.easing.easeOutBounce(a,b*2-e,0,d,e)*.5+d*.5+c}})
/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */;
typeof JSON!="object"&&(JSON={}),function(){"use strict";function f(e){return e<10?"0"+e:e}function quote(e){return escapable.lastIndex=0,escapable.test(e)?'"'+e.replace(escapable,function(e){var t=meta[e];return typeof t=="string"?t:"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+e+'"'}function str(e,t){var n,r,i,s,o=gap,u,a=t[e];a&&typeof a=="object"&&typeof a.toJSON=="function"&&(a=a.toJSON(e)),typeof rep=="function"&&(a=rep.call(t,e,a));switch(typeof a){case"string":return quote(a);case"number":return isFinite(a)?String(a):"null";case"boolean":case"null":return String(a);case"object":if(!a)return"null";gap+=indent,u=[];if(Object.prototype.toString.apply(a)==="[object Array]"){s=a.length;for(n=0;n<s;n+=1)u[n]=str(n,a)||"null";return i=u.length===0?"[]":gap?"[\n"+gap+u.join(",\n"+gap)+"\n"+o+"]":"["+u.join(",")+"]",gap=o,i}if(rep&&typeof rep=="object"){s=rep.length;for(n=0;n<s;n+=1)typeof rep[n]=="string"&&(r=rep[n],i=str(r,a),i&&u.push(quote(r)+(gap?": ":":")+i))}else for(r in a)Object.prototype.hasOwnProperty.call(a,r)&&(i=str(r,a),i&&u.push(quote(r)+(gap?": ":":")+i));return i=u.length===0?"{}":gap?"{\n"+gap+u.join(",\n"+gap)+"\n"+o+"}":"{"+u.join(",")+"}",gap=o,i}}typeof Date.prototype.toJSON!="function"&&(Date.prototype.toJSON=function(e){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(e){return this.valueOf()});var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;typeof JSON.stringify!="function"&&(JSON.stringify=function(e,t,n){var r;gap="",indent="";if(typeof n=="number")for(r=0;r<n;r+=1)indent+=" ";else typeof n=="string"&&(indent=n);rep=t;if(!t||typeof t=="function"||typeof t=="object"&&typeof t.length=="number")return str("",{"":e});throw new Error("JSON.stringify")}),typeof JSON.parse!="function"&&(JSON.parse=function(text,reviver){function walk(e,t){var n,r,i=e[t];if(i&&typeof i=="object")for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(r=walk(i,n),r!==undefined?i[n]=r:delete i[n]);return reviver.call(e,t,i)}var j;text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(e){return"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),typeof reviver=="function"?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}(),function(e,t){"use strict";var n=e.History=e.History||{},r=e.jQuery;if(typeof n.Adapter!="undefined")throw new Error("History.js Adapter has already been loaded...");n.Adapter={bind:function(e,t,n){r(e).bind(t,n)},trigger:function(e,t,n){r(e).trigger(t,n)},extractEventData:function(e,n,r){var i=n&&n.originalEvent&&n.originalEvent[e]||r&&r[e]||t;return i},onDomLoad:function(e){r(e)}},typeof n.init!="undefined"&&n.init()}(window),function(e,t){"use strict";var n=e.document,r=e.setTimeout||r,i=e.clearTimeout||i,s=e.setInterval||s,o=e.History=e.History||{};if(typeof o.initHtml4!="undefined")throw new Error("History.js HTML4 Support has already been loaded...");o.initHtml4=function(){if(typeof o.initHtml4.initialized!="undefined")return!1;o.initHtml4.initialized=!0,o.enabled=!0,o.savedHashes=[],o.isLastHash=function(e){var t=o.getHashByIndex(),n;return n=e===t,n},o.isHashEqual=function(e,t){return e=encodeURIComponent(e).replace(/%25/g,"%"),t=encodeURIComponent(t).replace(/%25/g,"%"),e===t},o.saveHash=function(e){return o.isLastHash(e)?!1:(o.savedHashes.push(e),!0)},o.getHashByIndex=function(e){var t=null;return typeof e=="undefined"?t=o.savedHashes[o.savedHashes.length-1]:e<0?t=o.savedHashes[o.savedHashes.length+e]:t=o.savedHashes[e],t},o.discardedHashes={},o.discardedStates={},o.discardState=function(e,t,n){var r=o.getHashByState(e),i;return i={discardedState:e,backState:n,forwardState:t},o.discardedStates[r]=i,!0},o.discardHash=function(e,t,n){var r={discardedHash:e,backState:n,forwardState:t};return o.discardedHashes[e]=r,!0},o.discardedState=function(e){var t=o.getHashByState(e),n;return n=o.discardedStates[t]||!1,n},o.discardedHash=function(e){var t=o.discardedHashes[e]||!1;return t},o.recycleState=function(e){var t=o.getHashByState(e);return o.discardedState(e)&&delete o.discardedStates[t],!0},o.emulated.hashChange&&(o.hashChangeInit=function(){o.checkerFunction=null;var t="",r,i,u,a,f=Boolean(o.getHash());return o.isInternetExplorer()?(r="historyjs-iframe",i=n.createElement("iframe"),i.setAttribute("id",r),i.setAttribute("src","#"),i.style.display="none",n.body.appendChild(i),i.contentWindow.document.open(),i.contentWindow.document.close(),u="",a=!1,o.checkerFunction=function(){if(a)return!1;a=!0;var n=o.getHash(),r=o.getHash(i.contentWindow.document);return n!==t?(t=n,r!==n&&(u=r=n,i.contentWindow.document.open(),i.contentWindow.document.close(),i.contentWindow.document.location.hash=o.escapeHash(n)),o.Adapter.trigger(e,"hashchange")):r!==u&&(u=r,f&&r===""?o.back():o.setHash(r,!1)),a=!1,!0}):o.checkerFunction=function(){var n=o.getHash()||"";return n!==t&&(t=n,o.Adapter.trigger(e,"hashchange")),!0},o.intervalList.push(s(o.checkerFunction,o.options.hashChangeInterval)),!0},o.Adapter.onDomLoad(o.hashChangeInit)),o.emulated.pushState&&(o.onHashChange=function(t){var n=t&&t.newURL||o.getLocationHref(),r=o.getHashByUrl(n),i=null,s=null,u=null,a;return o.isLastHash(r)?(o.busy(!1),!1):(o.doubleCheckComplete(),o.saveHash(r),r&&o.isTraditionalAnchor(r)?(o.Adapter.trigger(e,"anchorchange"),o.busy(!1),!1):(i=o.extractState(o.getFullUrl(r||o.getLocationHref()),!0),o.isLastSavedState(i)?(o.busy(!1),!1):(s=o.getHashByState(i),a=o.discardedState(i),a?(o.getHashByIndex(-2)===o.getHashByState(a.forwardState)?o.back(!1):o.forward(!1),!1):(o.pushState(i.data,i.title,encodeURI(i.url),!1),!0))))},o.Adapter.bind(e,"hashchange",o.onHashChange),o.pushState=function(t,n,r,i){r=encodeURI(r).replace(/%25/g,"%");if(o.getHashByUrl(r))throw new Error("History.js does not support states with fragment-identifiers (hashes/anchors).");if(i!==!1&&o.busy())return o.pushQueue({scope:o,callback:o.pushState,args:arguments,queue:i}),!1;o.busy(!0);var s=o.createStateObject(t,n,r),u=o.getHashByState(s),a=o.getState(!1),f=o.getHashByState(a),l=o.getHash(),c=o.expectedStateId==s.id;return o.storeState(s),o.expectedStateId=s.id,o.recycleState(s),o.setTitle(s),u===f?(o.busy(!1),!1):(o.saveState(s),c||o.Adapter.trigger(e,"statechange"),!o.isHashEqual(u,l)&&!o.isHashEqual(u,o.getShortUrl(o.getLocationHref()))&&o.setHash(u,!1),o.busy(!1),!0)},o.replaceState=function(t,n,r,i){r=encodeURI(r).replace(/%25/g,"%");if(o.getHashByUrl(r))throw new Error("History.js does not support states with fragment-identifiers (hashes/anchors).");if(i!==!1&&o.busy())return o.pushQueue({scope:o,callback:o.replaceState,args:arguments,queue:i}),!1;o.busy(!0);var s=o.createStateObject(t,n,r),u=o.getHashByState(s),a=o.getState(!1),f=o.getHashByState(a),l=o.getStateByIndex(-2);return o.discardState(a,s,l),u===f?(o.storeState(s),o.expectedStateId=s.id,o.recycleState(s),o.setTitle(s),o.saveState(s),o.Adapter.trigger(e,"statechange"),o.busy(!1)):o.pushState(s.data,s.title,s.url,!1),!0}),o.emulated.pushState&&o.getHash()&&!o.emulated.hashChange&&o.Adapter.onDomLoad(function(){o.Adapter.trigger(e,"hashchange")})},typeof o.init!="undefined"&&o.init()}(window),function(e,t){"use strict";var n=e.console||t,r=e.document,i=e.navigator,s=!1,o=e.setTimeout,u=e.clearTimeout,a=e.setInterval,f=e.clearInterval,l=e.JSON,c=e.alert,h=e.History=e.History||{},p=e.history;try{s=e.sessionStorage,s.setItem("TEST","1"),s.removeItem("TEST")}catch(d){s=!1}l.stringify=l.stringify||l.encode,l.parse=l.parse||l.decode;if(typeof h.init!="undefined")throw new Error("History.js Core has already been loaded...");h.init=function(e){return typeof h.Adapter=="undefined"?!1:(typeof h.initCore!="undefined"&&h.initCore(),typeof h.initHtml4!="undefined"&&h.initHtml4(),!0)},h.initCore=function(d){if(typeof h.initCore.initialized!="undefined")return!1;h.initCore.initialized=!0,h.options=h.options||{},h.options.hashChangeInterval=h.options.hashChangeInterval||100,h.options.safariPollInterval=h.options.safariPollInterval||500,h.options.doubleCheckInterval=h.options.doubleCheckInterval||500,h.options.disableSuid=h.options.disableSuid||!1,h.options.storeInterval=h.options.storeInterval||1e3,h.options.busyDelay=h.options.busyDelay||250,h.options.debug=h.options.debug||!1,h.options.initialTitle=h.options.initialTitle||r.title,h.options.html4Mode=h.options.html4Mode||!1,h.options.delayInit=h.options.delayInit||!1,h.intervalList=[],h.clearAllIntervals=function(){var e,t=h.intervalList;if(typeof t!="undefined"&&t!==null){for(e=0;e<t.length;e++)f(t[e]);h.intervalList=null}},h.debug=function(){(h.options.debug||!1)&&h.log.apply(h,arguments)},h.log=function(){var e=typeof n!="undefined"&&typeof n.log!="undefined"&&typeof n.log.apply!="undefined",t=r.getElementById("log"),i,s,o,u,a;e?(u=Array.prototype.slice.call(arguments),i=u.shift(),typeof n.debug!="undefined"?n.debug.apply(n,[i,u]):n.log.apply(n,[i,u])):i="\n"+arguments[0]+"\n";for(s=1,o=arguments.length;s<o;++s){a=arguments[s];if(typeof a=="object"&&typeof l!="undefined")try{a=l.stringify(a)}catch(f){}i+="\n"+a+"\n"}return t?(t.value+=i+"\n-----\n",t.scrollTop=t.scrollHeight-t.clientHeight):e||c(i),!0},h.getInternetExplorerMajorVersion=function(){var e=h.getInternetExplorerMajorVersion.cached=typeof h.getInternetExplorerMajorVersion.cached!="undefined"?h.getInternetExplorerMajorVersion.cached:function(){var e=3,t=r.createElement("div"),n=t.getElementsByTagName("i");while((t.innerHTML="<!--[if gt IE "+ ++e+"]><i></i><![endif]-->")&&n[0]);return e>4?e:!1}();return e},h.isInternetExplorer=function(){var e=h.isInternetExplorer.cached=typeof h.isInternetExplorer.cached!="undefined"?h.isInternetExplorer.cached:Boolean(h.getInternetExplorerMajorVersion());return e},h.options.html4Mode?h.emulated={pushState:!0,hashChange:!0}:h.emulated={pushState:!Boolean(e.history&&e.history.pushState&&e.history.replaceState&&!/ Mobile\/([1-7][a-z]|(8([abcde]|f(1[0-8]))))/i.test(i.userAgent)&&!/AppleWebKit\/5([0-2]|3[0-2])/i.test(i.userAgent)),hashChange:Boolean(!("onhashchange"in e||"onhashchange"in r)||h.isInternetExplorer()&&h.getInternetExplorerMajorVersion()<8)},h.enabled=!h.emulated.pushState,h.bugs={setHash:Boolean(!h.emulated.pushState&&i.vendor==="Apple Computer, Inc."&&/AppleWebKit\/5([0-2]|3[0-3])/.test(i.userAgent)),safariPoll:Boolean(!h.emulated.pushState&&i.vendor==="Apple Computer, Inc."&&/AppleWebKit\/5([0-2]|3[0-3])/.test(i.userAgent)),ieDoubleCheck:Boolean(h.isInternetExplorer()&&h.getInternetExplorerMajorVersion()<8),hashEscape:Boolean(h.isInternetExplorer()&&h.getInternetExplorerMajorVersion()<7)},h.isEmptyObject=function(e){for(var t in e)if(e.hasOwnProperty(t))return!1;return!0},h.cloneObject=function(e){var t,n;return e?(t=l.stringify(e),n=l.parse(t)):n={},n},h.getRootUrl=function(){var e=r.location.protocol+"//"+(r.location.hostname||r.location.host);if(r.location.port||!1)e+=":"+r.location.port;return e+="/",e},h.getBaseHref=function(){var e=r.getElementsByTagName("base"),t=null,n="";return e.length===1&&(t=e[0],n=t.href.replace(/[^\/]+$/,"")),n=n.replace(/\/+$/,""),n&&(n+="/"),n},h.getBaseUrl=function(){var e=h.getBaseHref()||h.getBasePageUrl()||h.getRootUrl();return e},h.getPageUrl=function(){var e=h.getState(!1,!1),t=(e||{}).url||h.getLocationHref(),n;return n=t.replace(/\/+$/,"").replace(/[^\/]+$/,function(e,t,n){return/\./.test(e)?e:e+"/"}),n},h.getBasePageUrl=function(){var e=h.getLocationHref().replace(/[#\?].*/,"").replace(/[^\/]+$/,function(e,t,n){return/[^\/]$/.test(e)?"":e}).replace(/\/+$/,"")+"/";return e},h.getFullUrl=function(e,t){var n=e,r=e.substring(0,1);return t=typeof t=="undefined"?!0:t,/[a-z]+\:\/\//.test(e)||(r==="/"?n=h.getRootUrl()+e.replace(/^\/+/,""):r==="#"?n=h.getPageUrl().replace(/#.*/,"")+e:r==="?"?n=h.getPageUrl().replace(/[\?#].*/,"")+e:t?n=h.getBaseUrl()+e.replace(/^(\.\/)+/,""):n=h.getBasePageUrl()+e.replace(/^(\.\/)+/,"")),n.replace(/\#$/,"")},h.getShortUrl=function(e){var t=e,n=h.getBaseUrl(),r=h.getRootUrl();return h.emulated.pushState&&(t=t.replace(n,"")),t=t.replace(r,"/"),h.isTraditionalAnchor(t)&&(t="./"+t),t=t.replace(/^(\.\/)+/g,"./").replace(/\#$/,""),t},h.getLocationHref=function(e){return e=e||r,e.URL===e.location.href?e.location.href:e.location.href===decodeURIComponent(e.URL)?e.URL:e.location.hash&&decodeURIComponent(e.location.href.replace(/^[^#]+/,""))===e.location.hash?e.location.href:e.URL.indexOf("#")==-1&&e.location.href.indexOf("#")!=-1?e.location.href:e.URL||e.location.href},h.store={},h.idToState=h.idToState||{},h.stateToId=h.stateToId||{},h.urlToId=h.urlToId||{},h.storedStates=h.storedStates||[],h.savedStates=h.savedStates||[],h.normalizeStore=function(){h.store.idToState=h.store.idToState||{},h.store.urlToId=h.store.urlToId||{},h.store.stateToId=h.store.stateToId||{}},h.getState=function(e,t){typeof e=="undefined"&&(e=!0),typeof t=="undefined"&&(t=!0);var n=h.getLastSavedState();return!n&&t&&(n=h.createStateObject()),e&&(n=h.cloneObject(n),n.url=n.cleanUrl||n.url),n},h.getIdByState=function(e){var t=h.extractId(e.url),n;if(!t){n=h.getStateString(e);if(typeof h.stateToId[n]!="undefined")t=h.stateToId[n];else if(typeof h.store.stateToId[n]!="undefined")t=h.store.stateToId[n];else{for(;;){t=(new Date).getTime()+String(Math.random()).replace(/\D/g,"");if(typeof h.idToState[t]=="undefined"&&typeof h.store.idToState[t]=="undefined")break}h.stateToId[n]=t,h.idToState[t]=e}}return t},h.normalizeState=function(e){var t,n;if(!e||typeof e!="object")e={};if(typeof e.normalized!="undefined")return e;if(!e.data||typeof e.data!="object")e.data={};return t={},t.normalized=!0,t.title=e.title||"",t.url=h.getFullUrl(e.url?e.url:h.getLocationHref()),t.hash=h.getShortUrl(t.url),t.data=h.cloneObject(e.data),t.id=h.getIdByState(t),t.cleanUrl=t.url.replace(/\??\&_suid.*/,""),t.url=t.cleanUrl,n=!h.isEmptyObject(t.data),(t.title||n)&&h.options.disableSuid!==!0&&(t.hash=h.getShortUrl(t.url).replace(/\??\&_suid.*/,""),/\?/.test(t.hash)||(t.hash+="?"),t.hash+="&_suid="+t.id),t.hashedUrl=h.getFullUrl(t.hash),(h.emulated.pushState||h.bugs.safariPoll)&&h.hasUrlDuplicate(t)&&(t.url=t.hashedUrl),t},h.createStateObject=function(e,t,n){var r={data:e,title:t,url:n};return r=h.normalizeState(r),r},h.getStateById=function(e){e=String(e);var n=h.idToState[e]||h.store.idToState[e]||t;return n},h.getStateString=function(e){var t,n,r;return t=h.normalizeState(e),n={data:t.data,title:e.title,url:e.url},r=l.stringify(n),r},h.getStateId=function(e){var t,n;return t=h.normalizeState(e),n=t.id,n},h.getHashByState=function(e){var t,n;return t=h.normalizeState(e),n=t.hash,n},h.extractId=function(e){var t,n,r,i;return e.indexOf("#")!=-1?i=e.split("#")[0]:i=e,n=/(.*)\&_suid=([0-9]+)$/.exec(i),r=n?n[1]||e:e,t=n?String(n[2]||""):"",t||!1},h.isTraditionalAnchor=function(e){var t=!/[\/\?\.]/.test(e);return t},h.extractState=function(e,t){var n=null,r,i;return t=t||!1,r=h.extractId(e),r&&(n=h.getStateById(r)),n||(i=h.getFullUrl(e),r=h.getIdByUrl(i)||!1,r&&(n=h.getStateById(r)),!n&&t&&!h.isTraditionalAnchor(e)&&(n=h.createStateObject(null,null,i))),n},h.getIdByUrl=function(e){var n=h.urlToId[e]||h.store.urlToId[e]||t;return n},h.getLastSavedState=function(){return h.savedStates[h.savedStates.length-1]||t},h.getLastStoredState=function(){return h.storedStates[h.storedStates.length-1]||t},h.hasUrlDuplicate=function(e){var t=!1,n;return n=h.extractState(e.url),t=n&&n.id!==e.id,t},h.storeState=function(e){return h.urlToId[e.url]=e.id,h.storedStates.push(h.cloneObject(e)),e},h.isLastSavedState=function(e){var t=!1,n,r,i;return h.savedStates.length&&(n=e.id,r=h.getLastSavedState(),i=r.id,t=n===i),t},h.saveState=function(e){return h.isLastSavedState(e)?!1:(h.savedStates.push(h.cloneObject(e)),!0)},h.getStateByIndex=function(e){var t=null;return typeof e=="undefined"?t=h.savedStates[h.savedStates.length-1]:e<0?t=h.savedStates[h.savedStates.length+e]:t=h.savedStates[e],t},h.getCurrentIndex=function(){var e=null;return h.savedStates.length<1?e=0:e=h.savedStates.length-1,e},h.getHash=function(e){var t=h.getLocationHref(e),n;return n=h.getHashByUrl(t),n},h.unescapeHash=function(e){var t=h.normalizeHash(e);return t=decodeURIComponent(t),t},h.normalizeHash=function(e){var t=e.replace(/[^#]*#/,"").replace(/#.*/,"");return t},h.setHash=function(e,t){var n,i;return t!==!1&&h.busy()?(h.pushQueue({scope:h,callback:h.setHash,args:arguments,queue:t}),!1):(h.busy(!0),n=h.extractState(e,!0),n&&!h.emulated.pushState?h.pushState(n.data,n.title,n.url,!1):h.getHash()!==e&&(h.bugs.setHash?(i=h.getPageUrl(),h.pushState(null,null,i+"#"+e,!1)):r.location.hash=e),h)},h.escapeHash=function(t){var n=h.normalizeHash(t);return n=e.encodeURIComponent(n),h.bugs.hashEscape||(n=n.replace(/\%21/g,"!").replace(/\%26/g,"&").replace(/\%3D/g,"=").replace(/\%3F/g,"?")),n},h.getHashByUrl=function(e){var t=String(e).replace(/([^#]*)#?([^#]*)#?(.*)/,"$2");return t=h.unescapeHash(t),t},h.setTitle=function(e){var t=e.title,n;t||(n=h.getStateByIndex(0),n&&n.url===e.url&&(t=n.title||h.options.initialTitle));try{r.getElementsByTagName("title")[0].innerHTML=t.replace("<","&lt;").replace(">","&gt;").replace(" & "," &amp; ")}catch(i){}return r.title=t,h},h.queues=[],h.busy=function(e){typeof e!="undefined"?h.busy.flag=e:typeof h.busy.flag=="undefined"&&(h.busy.flag=!1);if(!h.busy.flag){u(h.busy.timeout);var t=function(){var e,n,r;if(h.busy.flag)return;for(e=h.queues.length-1;e>=0;--e){n=h.queues[e];if(n.length===0)continue;r=n.shift(),h.fireQueueItem(r),h.busy.timeout=o(t,h.options.busyDelay)}};h.busy.timeout=o(t,h.options.busyDelay)}return h.busy.flag},h.busy.flag=!1,h.fireQueueItem=function(e){return e.callback.apply(e.scope||h,e.args||[])},h.pushQueue=function(e){return h.queues[e.queue||0]=h.queues[e.queue||0]||[],h.queues[e.queue||0].push(e),h},h.queue=function(e,t){return typeof e=="function"&&(e={callback:e}),typeof t!="undefined"&&(e.queue=t),h.busy()?h.pushQueue(e):h.fireQueueItem(e),h},h.clearQueue=function(){return h.busy.flag=!1,h.queues=[],h},h.stateChanged=!1,h.doubleChecker=!1,h.doubleCheckComplete=function(){return h.stateChanged=!0,h.doubleCheckClear(),h},h.doubleCheckClear=function(){return h.doubleChecker&&(u(h.doubleChecker),h.doubleChecker=!1),h},h.doubleCheck=function(e){return h.stateChanged=!1,h.doubleCheckClear(),h.bugs.ieDoubleCheck&&(h.doubleChecker=o(function(){return h.doubleCheckClear(),h.stateChanged||e(),!0},h.options.doubleCheckInterval)),h},h.safariStatePoll=function(){var t=h.extractState(h.getLocationHref()),n;if(!h.isLastSavedState(t))return n=t,n||(n=h.createStateObject()),h.Adapter.trigger(e,"popstate"),h;return},h.back=function(e){return e!==!1&&h.busy()?(h.pushQueue({scope:h,callback:h.back,args:arguments,queue:e}),!1):(h.busy(!0),h.doubleCheck(function(){h.back(!1)}),p.go(-1),!0)},h.forward=function(e){return e!==!1&&h.busy()?(h.pushQueue({scope:h,callback:h.forward,args:arguments,queue:e}),!1):(h.busy(!0),h.doubleCheck(function(){h.forward(!1)}),p.go(1),!0)},h.go=function(e,t){var n;if(e>0)for(n=1;n<=e;++n)h.forward(t);else{if(!(e<0))throw new Error("History.go: History.go requires a positive or negative integer passed.");for(n=-1;n>=e;--n)h.back(t)}return h};if(h.emulated.pushState){var v=function(){};h.pushState=h.pushState||v,h.replaceState=h.replaceState||v}else h.onPopState=function(t,n){var r=!1,i=!1,s,o;return h.doubleCheckComplete(),s=h.getHash(),s?(o=h.extractState(s||h.getLocationHref(),!0),o?h.replaceState(o.data,o.title,o.url,!1):(h.Adapter.trigger(e,"anchorchange"),h.busy(!1)),h.expectedStateId=!1,!1):(r=h.Adapter.extractEventData("state",t,n)||!1,r?i=h.getStateById(r):h.expectedStateId?i=h.getStateById(h.expectedStateId):i=h.extractState(h.getLocationHref()),i||(i=h.createStateObject(null,null,h.getLocationHref())),h.expectedStateId=!1,h.isLastSavedState(i)?(h.busy(!1),!1):(h.storeState(i),h.saveState(i),h.setTitle(i),h.Adapter.trigger(e,"statechange"),h.busy(!1),!0))},h.Adapter.bind(e,"popstate",h.onPopState),h.pushState=function(t,n,r,i){if(h.getHashByUrl(r)&&h.emulated.pushState)throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");if(i!==!1&&h.busy())return h.pushQueue({scope:h,callback:h.pushState,args:arguments,queue:i}),!1;h.busy(!0);var s=h.createStateObject(t,n,r);return h.isLastSavedState(s)?h.busy(!1):(h.storeState(s),h.expectedStateId=s.id,p.pushState(s.id,s.title,s.url),h.Adapter.trigger(e,"popstate")),!0},h.replaceState=function(t,n,r,i){if(h.getHashByUrl(r)&&h.emulated.pushState)throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");if(i!==!1&&h.busy())return h.pushQueue({scope:h,callback:h.replaceState,args:arguments,queue:i}),!1;h.busy(!0);var s=h.createStateObject(t,n,r);return h.isLastSavedState(s)?h.busy(!1):(h.storeState(s),h.expectedStateId=s.id,p.replaceState(s.id,s.title,s.url),h.Adapter.trigger(e,"popstate")),!0};if(s){try{h.store=l.parse(s.getItem("History.store"))||{}}catch(m){h.store={}}h.normalizeStore()}else h.store={},h.normalizeStore();h.Adapter.bind(e,"unload",h.clearAllIntervals),h.saveState(h.storeState(h.extractState(h.getLocationHref(),!0))),s&&(h.onUnload=function(){var e,t,n;try{e=l.parse(s.getItem("History.store"))||{}}catch(r){e={}}e.idToState=e.idToState||{},e.urlToId=e.urlToId||{},e.stateToId=e.stateToId||{};for(t in h.idToState){if(!h.idToState.hasOwnProperty(t))continue;e.idToState[t]=h.idToState[t]}for(t in h.urlToId){if(!h.urlToId.hasOwnProperty(t))continue;e.urlToId[t]=h.urlToId[t]}for(t in h.stateToId){if(!h.stateToId.hasOwnProperty(t))continue;e.stateToId[t]=h.stateToId[t]}h.store=e,h.normalizeStore(),n=l.stringify(e);try{s.setItem("History.store",n)}catch(i){if(i.code!==DOMException.QUOTA_EXCEEDED_ERR)throw i;s.length&&(s.removeItem("History.store"),s.setItem("History.store",n))}},h.intervalList.push(a(h.onUnload,h.options.storeInterval)),h.Adapter.bind(e,"beforeunload",h.onUnload),h.Adapter.bind(e,"unload",h.onUnload));if(!h.emulated.pushState){h.bugs.safariPoll&&h.intervalList.push(a(h.safariStatePoll,h.options.safariPollInterval));if(i.vendor==="Apple Computer, Inc."||(i.appCodeName||"")==="Mozilla")h.Adapter.bind(e,"hashchange",function(){h.Adapter.trigger(e,"popstate")}),h.getHash()&&h.Adapter.onDomLoad(function(){h.Adapter.trigger(e,"hashchange")})}},(!h.options||!h.options.delayInit)&&h.init()}(window);
// Generated by CoffeeScript 1.6.2
/*!
jQuery Waypoints - v2.0.5
Copyright (c) 2011-2014 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
*/
(function(){var t=[].indexOf||function(t){for(var e=0,n=this.length;e<n;e++){if(e in this&&this[e]===t)return e}return-1},e=[].slice;(function(t,e){if(typeof define==="function"&&define.amd){return define("waypoints",["jquery"],function(n){return e(n,t)})}else{return e(t.jQuery,t)}})(window,function(n,r){var i,o,l,s,f,u,c,a,h,d,p,y,v,w,g,m;i=n(r);a=t.call(r,"ontouchstart")>=0;s={horizontal:{},vertical:{}};f=1;c={};u="waypoints-context-id";p="resize.waypoints";y="scroll.waypoints";v=1;w="waypoints-waypoint-ids";g="waypoint";m="waypoints";o=function(){function t(t){var e=this;this.$element=t;this.element=t[0];this.didResize=false;this.didScroll=false;this.id="context"+f++;this.oldScroll={x:t.scrollLeft(),y:t.scrollTop()};this.waypoints={horizontal:{},vertical:{}};this.element[u]=this.id;c[this.id]=this;t.bind(y,function(){var t;if(!(e.didScroll||a)){e.didScroll=true;t=function(){e.doScroll();return e.didScroll=false};return r.setTimeout(t,n[m].settings.scrollThrottle)}});t.bind(p,function(){var t;if(!e.didResize){e.didResize=true;t=function(){n[m]("refresh");return e.didResize=false};return r.setTimeout(t,n[m].settings.resizeThrottle)}})}t.prototype.doScroll=function(){var t,e=this;t={horizontal:{newScroll:this.$element.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.$element.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};if(a&&(!t.vertical.oldScroll||!t.vertical.newScroll)){n[m]("refresh")}n.each(t,function(t,r){var i,o,l;l=[];o=r.newScroll>r.oldScroll;i=o?r.forward:r.backward;n.each(e.waypoints[t],function(t,e){var n,i;if(r.oldScroll<(n=e.offset)&&n<=r.newScroll){return l.push(e)}else if(r.newScroll<(i=e.offset)&&i<=r.oldScroll){return l.push(e)}});l.sort(function(t,e){return t.offset-e.offset});if(!o){l.reverse()}return n.each(l,function(t,e){if(e.options.continuous||t===l.length-1){return e.trigger([i])}})});return this.oldScroll={x:t.horizontal.newScroll,y:t.vertical.newScroll}};t.prototype.refresh=function(){var t,e,r,i=this;r=n.isWindow(this.element);e=this.$element.offset();this.doScroll();t={horizontal:{contextOffset:r?0:e.left,contextScroll:r?0:this.oldScroll.x,contextDimension:this.$element.width(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:r?0:e.top,contextScroll:r?0:this.oldScroll.y,contextDimension:r?n[m]("viewportHeight"):this.$element.height(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};return n.each(t,function(t,e){return n.each(i.waypoints[t],function(t,r){var i,o,l,s,f;i=r.options.offset;l=r.offset;o=n.isWindow(r.element)?0:r.$element.offset()[e.offsetProp];if(n.isFunction(i)){i=i.apply(r.element)}else if(typeof i==="string"){i=parseFloat(i);if(r.options.offset.indexOf("%")>-1){i=Math.ceil(e.contextDimension*i/100)}}r.offset=o-e.contextOffset+e.contextScroll-i;if(r.options.onlyOnScroll&&l!=null||!r.enabled){return}if(l!==null&&l<(s=e.oldScroll)&&s<=r.offset){return r.trigger([e.backward])}else if(l!==null&&l>(f=e.oldScroll)&&f>=r.offset){return r.trigger([e.forward])}else if(l===null&&e.oldScroll>=r.offset){return r.trigger([e.forward])}})})};t.prototype.checkEmpty=function(){if(n.isEmptyObject(this.waypoints.horizontal)&&n.isEmptyObject(this.waypoints.vertical)){this.$element.unbind([p,y].join(" "));return delete c[this.id]}};return t}();l=function(){function t(t,e,r){var i,o;if(r.offset==="bottom-in-view"){r.offset=function(){var t;t=n[m]("viewportHeight");if(!n.isWindow(e.element)){t=e.$element.height()}return t-n(this).outerHeight()}}this.$element=t;this.element=t[0];this.axis=r.horizontal?"horizontal":"vertical";this.callback=r.handler;this.context=e;this.enabled=r.enabled;this.id="waypoints"+v++;this.offset=null;this.options=r;e.waypoints[this.axis][this.id]=this;s[this.axis][this.id]=this;i=(o=this.element[w])!=null?o:[];i.push(this.id);this.element[w]=i}t.prototype.trigger=function(t){if(!this.enabled){return}if(this.callback!=null){this.callback.apply(this.element,t)}if(this.options.triggerOnce){return this.destroy()}};t.prototype.disable=function(){return this.enabled=false};t.prototype.enable=function(){this.context.refresh();return this.enabled=true};t.prototype.destroy=function(){delete s[this.axis][this.id];delete this.context.waypoints[this.axis][this.id];return this.context.checkEmpty()};t.getWaypointsByElement=function(t){var e,r;r=t[w];if(!r){return[]}e=n.extend({},s.horizontal,s.vertical);return n.map(r,function(t){return e[t]})};return t}();d={init:function(t,e){var r;e=n.extend({},n.fn[g].defaults,e);if((r=e.handler)==null){e.handler=t}this.each(function(){var t,r,i,s;t=n(this);i=(s=e.context)!=null?s:n.fn[g].defaults.context;if(!n.isWindow(i)){i=t.closest(i)}i=n(i);r=c[i[0][u]];if(!r){r=new o(i)}return new l(t,r,e)});n[m]("refresh");return this},disable:function(){return d._invoke.call(this,"disable")},enable:function(){return d._invoke.call(this,"enable")},destroy:function(){return d._invoke.call(this,"destroy")},prev:function(t,e){return d._traverse.call(this,t,e,function(t,e,n){if(e>0){return t.push(n[e-1])}})},next:function(t,e){return d._traverse.call(this,t,e,function(t,e,n){if(e<n.length-1){return t.push(n[e+1])}})},_traverse:function(t,e,i){var o,l;if(t==null){t="vertical"}if(e==null){e=r}l=h.aggregate(e);o=[];this.each(function(){var e;e=n.inArray(this,l[t]);return i(o,e,l[t])});return this.pushStack(o)},_invoke:function(t){this.each(function(){var e;e=l.getWaypointsByElement(this);return n.each(e,function(e,n){n[t]();return true})});return this}};n.fn[g]=function(){var t,r;r=arguments[0],t=2<=arguments.length?e.call(arguments,1):[];if(d[r]){return d[r].apply(this,t)}else if(n.isFunction(r)){return d.init.apply(this,arguments)}else if(n.isPlainObject(r)){return d.init.apply(this,[null,r])}else if(!r){return n.error("jQuery Waypoints needs a callback function or handler option.")}else{return n.error("The "+r+" method does not exist in jQuery Waypoints.")}};n.fn[g].defaults={context:r,continuous:true,enabled:true,horizontal:false,offset:0,triggerOnce:false};h={refresh:function(){return n.each(c,function(t,e){return e.refresh()})},viewportHeight:function(){var t;return(t=r.innerHeight)!=null?t:i.height()},aggregate:function(t){var e,r,i;e=s;if(t){e=(i=c[n(t)[0][u]])!=null?i.waypoints:void 0}if(!e){return[]}r={horizontal:[],vertical:[]};n.each(r,function(t,i){n.each(e[t],function(t,e){return i.push(e)});i.sort(function(t,e){return t.offset-e.offset});r[t]=n.map(i,function(t){return t.element});return r[t]=n.unique(r[t])});return r},above:function(t){if(t==null){t=r}return h._filter(t,"vertical",function(t,e){return e.offset<=t.oldScroll.y})},below:function(t){if(t==null){t=r}return h._filter(t,"vertical",function(t,e){return e.offset>t.oldScroll.y})},left:function(t){if(t==null){t=r}return h._filter(t,"horizontal",function(t,e){return e.offset<=t.oldScroll.x})},right:function(t){if(t==null){t=r}return h._filter(t,"horizontal",function(t,e){return e.offset>t.oldScroll.x})},enable:function(){return h._invoke("enable")},disable:function(){return h._invoke("disable")},destroy:function(){return h._invoke("destroy")},extendFn:function(t,e){return d[t]=e},_invoke:function(t){var e;e=n.extend({},s.vertical,s.horizontal);return n.each(e,function(e,n){n[t]();return true})},_filter:function(t,e,r){var i,o;i=c[n(t)[0][u]];if(!i){return[]}o=[];n.each(i.waypoints[e],function(t,e){if(r(i,e)){return o.push(e)}});o.sort(function(t,e){return t.offset-e.offset});return n.map(o,function(t){return t.element})}};n[m]=function(){var t,n;n=arguments[0],t=2<=arguments.length?e.call(arguments,1):[];if(h[n]){return h[n].apply(null,t)}else{return h.aggregate.call(null,n)}};n[m].settings={resizeThrottle:100,scrollThrottle:30};return i.on("load.waypoints",function(){return n[m]("refresh")})})}).call(this);;
/*
 * Purl (A JavaScript URL parser) v2.3.1
 * Developed and maintanined by Mark Perkins, mark@allmarkedup.com
 * Source repository: https://github.com/allmarkedup/jQuery-URL-Parser
 * Licensed under an MIT-style license. See https://github.com/allmarkedup/jQuery-URL-Parser/blob/master/LICENSE for details.
 */

;(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        window.purl = factory();
    }
})(function() {

    var tag2attr = {
            a       : 'href',
            img     : 'src',
            form    : 'action',
            base    : 'href',
            script  : 'src',
            iframe  : 'src',
            link    : 'href',
            embed   : 'src',
            object  : 'data'
        },

        key = ['source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'fragment'], // keys available to query

        aliases = { 'anchor' : 'fragment' }, // aliases for backwards compatability

        parser = {
            strict : /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,  //less intuitive, more accurate to the specs
            loose :  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/ // more intuitive, fails on relative paths and deviates from specs
        },

        isint = /^[0-9]+$/;

    function parseUri( url, strictMode ) {
        var str = decodeURI( url ),
        res   = parser[ strictMode || false ? 'strict' : 'loose' ].exec( str ),
        uri = { attr : {}, param : {}, seg : {} },
        i   = 14;

        while ( i-- ) {
            uri.attr[ key[i] ] = res[i] || '';
        }

        // build query and fragment parameters
        uri.param['query'] = parseString(uri.attr['query']);
        uri.param['fragment'] = parseString(uri.attr['fragment']);

        // split path and fragement into segments
        uri.seg['path'] = uri.attr.path.replace(/^\/+|\/+$/g,'').split('/');
        uri.seg['fragment'] = uri.attr.fragment.replace(/^\/+|\/+$/g,'').split('/');

        // compile a 'base' domain attribute
        uri.attr['base'] = uri.attr.host ? (uri.attr.protocol ?  uri.attr.protocol+'://'+uri.attr.host : uri.attr.host) + (uri.attr.port ? ':'+uri.attr.port : '') : '';

        return uri;
    }

    function getAttrName( elm ) {
        var tn = elm.tagName;
        if ( typeof tn !== 'undefined' ) return tag2attr[tn.toLowerCase()];
        return tn;
    }

    function promote(parent, key) {
        if (parent[key].length === 0) return parent[key] = {};
        var t = {};
        for (var i in parent[key]) t[i] = parent[key][i];
        parent[key] = t;
        return t;
    }

    function parse(parts, parent, key, val) {
        var part = parts.shift();
        if (!part) {
            if (isArray(parent[key])) {
                parent[key].push(val);
            } else if ('object' == typeof parent[key]) {
                parent[key] = val;
            } else if ('undefined' == typeof parent[key]) {
                parent[key] = val;
            } else {
                parent[key] = [parent[key], val];
            }
        } else {
            var obj = parent[key] = parent[key] || [];
            if (']' == part) {
                if (isArray(obj)) {
                    if ('' !== val) obj.push(val);
                } else if ('object' == typeof obj) {
                    obj[keys(obj).length] = val;
                } else {
                    obj = parent[key] = [parent[key], val];
                }
            } else if (~part.indexOf(']')) {
                part = part.substr(0, part.length - 1);
                if (!isint.test(part) && isArray(obj)) obj = promote(parent, key);
                parse(parts, obj, part, val);
                // key
            } else {
                if (!isint.test(part) && isArray(obj)) obj = promote(parent, key);
                parse(parts, obj, part, val);
            }
        }
    }

    function merge(parent, key, val) {
        if (~key.indexOf(']')) {
            var parts = key.split('[');
            parse(parts, parent, 'base', val);
        } else {
            if (!isint.test(key) && isArray(parent.base)) {
                var t = {};
                for (var k in parent.base) t[k] = parent.base[k];
                parent.base = t;
            }
            if (key !== '') {
                set(parent.base, key, val);
            }
        }
        return parent;
    }

    function parseString(str) {
        return reduce(String(str).split(/&|;/), function(ret, pair) {
            try {
                pair = decodeURIComponent(pair.replace(/\+/g, ' '));
            } catch(e) {
                // ignore
            }
            var eql = pair.indexOf('='),
                brace = lastBraceInKey(pair),
                key = pair.substr(0, brace || eql),
                val = pair.substr(brace || eql, pair.length);

            val = val.substr(val.indexOf('=') + 1, val.length);

            if (key === '') {
                key = pair;
                val = '';
            }

            return merge(ret, key, val);
        }, { base: {} }).base;
    }

    function set(obj, key, val) {
        var v = obj[key];
        if (typeof v === 'undefined') {
            obj[key] = val;
        } else if (isArray(v)) {
            v.push(val);
        } else {
            obj[key] = [v, val];
        }
    }

    function lastBraceInKey(str) {
        var len = str.length,
            brace,
            c;
        for (var i = 0; i < len; ++i) {
            c = str[i];
            if (']' == c) brace = false;
            if ('[' == c) brace = true;
            if ('=' == c && !brace) return i;
        }
    }

    function reduce(obj, accumulator){
        var i = 0,
            l = obj.length >> 0,
            curr = arguments[2];
        while (i < l) {
            if (i in obj) curr = accumulator.call(undefined, curr, obj[i], i, obj);
            ++i;
        }
        return curr;
    }

    function isArray(vArg) {
        return Object.prototype.toString.call(vArg) === "[object Array]";
    }

    function keys(obj) {
        var key_array = [];
        for ( var prop in obj ) {
            if ( obj.hasOwnProperty(prop) ) key_array.push(prop);
        }
        return key_array;
    }

    function purl( url, strictMode ) {
        if ( arguments.length === 1 && url === true ) {
            strictMode = true;
            url = undefined;
        }
        strictMode = strictMode || false;
        url = url || window.location.toString();

        return {

            data : parseUri(url, strictMode),

            // get various attributes from the URI
            attr : function( attr ) {
                attr = aliases[attr] || attr;
                return typeof attr !== 'undefined' ? this.data.attr[attr] : this.data.attr;
            },

            // return query string parameters
            param : function( param ) {
                return typeof param !== 'undefined' ? this.data.param.query[param] : this.data.param.query;
            },

            // return fragment parameters
            fparam : function( param ) {
                return typeof param !== 'undefined' ? this.data.param.fragment[param] : this.data.param.fragment;
            },

            // return path segments
            segment : function( seg ) {
                if ( typeof seg === 'undefined' ) {
                    return this.data.seg.path;
                } else {
                    seg = seg < 0 ? this.data.seg.path.length + seg : seg - 1; // negative segments count from the end
                    return this.data.seg.path[seg];
                }
            },

            // return fragment segments
            fsegment : function( seg ) {
                if ( typeof seg === 'undefined' ) {
                    return this.data.seg.fragment;
                } else {
                    seg = seg < 0 ? this.data.seg.fragment.length + seg : seg - 1; // negative segments count from the end
                    return this.data.seg.fragment[seg];
                }
            }

        };

    }
    
    purl.jQuery = function($){
        if ($ != null) {
            $.fn.url = function( strictMode ) {
                var url = '';
                if ( this.length ) {
                    url = $(this).attr( getAttrName(this[0]) ) || '';
                }
                return purl( url, strictMode );
            };

            $.url = purl;
        }
    };

    purl.jQuery(window.jQuery);

    return purl;

});;
jQuery(document).ready(function($) {
    NBC.Nav = {
        nav: null,
        level1: null,
        level2: null,
        brandMenu: null,
        menuParent: null,
        hamburger: null,

        init: function() {
            this.nav = $('.touch-nav');
            this.level1 = $('.touch-nav .level-1');
            this.level2 = $('.touch-nav .level-2');
            this.brandTitle = $('#superfish-1 > .sf-item-7 > .sf-depth-1');
            this.brandMenu = $('#superfish-1 > .sf-item-7 > .sf-megamenu');
            this.parksMenu = $("#menu-673-1");
            this.tvDistributionMenu = $("#menu-3765-1");
            this.localMediaMenu = $("#menu-640-1");
            this.brandMenuFirstItem = $('#superfish-1 > .sf-item-7 > .sf-megamenu .sf-megamenu-wrapper .sf-item-1.sf-megamenu-column');
            this.menuParent = $('#superfish-1 .menuparent');
            this.hamburger = $('.hamburger > a');


            // Add the close button to the Brand menu
            var $closeHTML = '<li class="close"><span>X</span></li>';
            $($closeHTML).insertBefore(this.brandMenu.children('.sf-megamenu-wrapper'));

            /*var $local_media = $( '#menu-640-1' ).html();
            $($local_media).appendTo(this.brandMenuFirstItem);
            $( '#menu-640-1' ).css('display','none');*/

            // on business drop-down, move Local Media to same column as Broadcast
            $("#menu-634-1 .sf-megamenu-column").after(this.localMediaMenu.html());
            this.localMediaMenu.remove();

            // on businesses drop-down, move parks into same column as film
            $("#menu-668-1 .sf-megamenu-column").after(this.parksMenu.html());
            this.parksMenu.remove();

            // on businesses drop-down, move Parks menu to same column as Film
            $("#menu-677-1 .sf-megamenu-column").after(this.tvDistributionMenu.html());
            this.tvDistributionMenu.remove();

            //Add a down arrow in the Brand menu
            var $arrowDownHTML = '<span class="arrow-down sf-hidden"></span>';
            $($arrowDownHTML).appendTo(this.brandTitle);

            // Set Desktop Brand Drop Down Menu Dimensions
            this.setDesktopNavDimensions();

            // Set Touch Nav Width
            this.setTouchNavWidth();

            // Setup Mobile/Tablet Nav positions
            this.setupMobileTabletPositions();

            // Enable the touch nav actions
            this.clickActions();

            //add IE8 placeholder support
            this.placeHolderFallback();

            $('.sf-megamenu').addClass('sf-hidden');

            //detects orientation changes in iPad
            if (navigator.platform === 'iPad') {
                window.onorientationchange = function() {

                    var orientation = window.orientation;
                    if ((orientation === 90) || (orientation === -90)) {
                        $('.hamburger ul li.social').css('position', 'relative');
                        $('.hamburger ul li.social').css('bottom', '0px');
                    } else {
                        $('.hamburger ul li.social').css('position', 'absolute');
                    }
                }
            }
        },

        centerMegaMenu: function() {
            var _left = ( ($('#page-wrapper').outerWidth() - $('ul.sf-menu > .sf-item-7 > .sf-megamenu').width()) / 2 );
            _left = _left +'px';
            //$('ul.sf-menu > .sf-item-7 > .sf-megamenu').css('left', _left);
            if ($(window).width() >= 1280) {
                $('ul.sf-menu > .sf-item-7 > .sf-megamenu').css('min-width', '1280px');
                $('ul.sf-menu > .sf-item-7 > .sf-megamenu').css('max-width', '100%');
                $('ul.sf-menu > .sf-item-7 > .sf-megamenu').css('left', '0');
            } else {
                $('ul.sf-menu > .sf-item-7 > .sf-megamenu').css('max-width', '1280px');
                $('ul.sf-menu > .sf-item-7 > .sf-megamenu').css('min-width', '0px');
                $('ul.sf-menu > .sf-item-7 > .sf-megamenu').css('left', _left);
            }

        },

        placeHolderFallback: function() {
            if ( !("placeholder" in document.createElement("input")) ) {
                $("input[placeholder], textarea[placeholder]").each(function() {
                    var val = $(this).attr("placeholder");
                    if ( this.value == "" ) {
                        this.value = val;
                    }
                    $(this).focus(function() {
                        if ( this.value == val ) {
                            this.value = "";
                        }
                    }).blur(function() {
                        if ( $.trim(this.value) == "" ) {
                            this.value = val;
                        }
                    })
                });

                // Clear default placeholder values on form submit
                $('form').submit(function() {
                    $(this).find("input[placeholder], textarea[placeholder]").each(function() {
                        if ( this.value == $(this).attr("placeholder") ) {
                            this.value = "";
                        }
                    });
                });
            }
        },

        fixShareIconsMobileMenu: function() {
            if(NBC.GLOBAL.isTablet || NBC.GLOBAL.isMobile) {
                //alert(parseInt($('.hamburger').find('ul').css('height')));

                if (parseInt($('.hamburger').find('ul').css('height')) > 700) {
                    $('.hamburger ul li.social').css('position', 'absolute');
                    $('.hamburger ul li.social').css('bottom', '0px');
                } else {
                    $('.hamburger ul li.social').css('position', 'relative');
                    $('.hamburger ul li.social').css('bottom', '0px');
                }
            }
        },

        clickActions: function() {
            // Disable the menuparent link from firing
            $('a.menuparent').on('click', function(e) { e.preventDefault(); });

            // Disable the hover for sub menus without hacking the library
            this.menuParent.on('hover', function() {
                return false;
            });

            $('#block-superfish-1 .sf-megamenu .sf-megamenu-column li.sf-depth-3').hover(
                function() {
                    $(this).addClass('hover');

                    var offSetLeft = ($(this).offset().left + $(this).width() + 265);
                    if(offSetLeft > $(window).width())
                        $(this).addClass('tool-tip-left');
                },
                function() {
                    $(this).removeClass('hover');
                    $(this).removeClass('tool-tip-left');
                }
            );

            $('#block-superfish-1 .sf-megamenu .sf-megamenu-column li.sf-depth-3 a').on('click', function() {
                window.location.href = $(this).attr('href');
            });

            // Replace the Superfish hover with a click action
            this.menuParent.on('click', function(e) {
                e.preventDefault();
                var $elem = $(this).parent('.menuparent');
                $elem.find('.sf-megamenu-wrapper').css("display","block");
				$( "li.sf-megamenu-wrapper ol li" ).first().removeClass('middle').addClass('first');

                var $topMarginAnimationElem = $elem.find('ul.sf-megamenu li.sf-megamenu-wrapper');

                // Targets the anchor and not the li, because both have the class menuparent
                if(this.tagName == 'A') {
                    if($elem.hasClass('menu-business-open')) {
                         $elem.children('.sf-megamenu').children('.close').hide();
                         $elem.children('.sf-megamenu').stop().slideUp('slow', function() {
                           $elem.children('.sf-megamenu').addClass('sf-hidden');
                            $elem.children('a').removeClass('active');
                            $elem.siblings('.active-trail').children('a').addClass('active');
                            $elem.find('.arrow-down').addClass('sf-hidden');
                            $elem.removeClass('menu-business-open');
                            $elem.removeClass('sfHover');
                            // Disable the page scroll
                            NBC.GLOBAL.enableScroll();
                        });

                        $topMarginAnimationElem.stop().animate({ marginTop: '-30px' }, 1000);
                    } else {
                        //hide search overlay if open
                        $('.search-overlay-close').trigger('click');
                        $elem.children('.sf-megamenu').removeClass('sf-hidden');
                        $elem.children('.sf-megamenu').css('filter','');
                        $elem.children('a').addClass('active');
                        $elem.siblings('.active-trail').children('.active').removeClass('active');
                        $elem.find('.arrow-down').removeClass('sf-hidden');
                        $elem.addClass('menu-business-open');
                        $elem.addClass('sfHover');
                        //NBC.Nav.centerMegaMenu();
                        NBC.Nav.setDesktopNavDimensions();
                        // Disable the page scroll
                        NBC.GLOBAL.disableScroll();
                        $elem.children('.sf-megamenu').stop().slideDown('fast', function() {
                            $elem.children('.sf-megamenu').children('.close').show();
                        });

                        $topMarginAnimationElem.stop().animate({ marginTop: '20px' }, 1000);
                    }
                }
            });

            // Close button for Brand Menu
            this.brandMenu.children('.close').on('click', function(e) {
                e.preventDefault();
                var $elem = $(this).parents('.sf-megamenu');
                $(this).hide();

                var $topMarginAnimationElem = $elem.find('li.sf-megamenu-wrapper');

                $elem.stop().slideUp('slow', function() {
                    $elem.parent('.menuparent').children('a').removeClass('active');
                    $elem.parent('.menuparent').siblings('.active-trail').children('a').addClass('active');
                    $elem.parent('.menuparent').find('.arrow-down').addClass('sf-hidden');
                    $elem.parent('.menuparent').removeClass('menu-business-open');
                    $elem.parent('.menuparent').removeClass('sfHover');
                    $elem.addClass('sf-hidden');
                    // Disable the page scroll
                    NBC.GLOBAL.enableScroll();
                });

                $topMarginAnimationElem.stop().animate({ marginTop: '-30px' }, 1000);
            });

            // Top Level Menu
            this.hamburger.on('click', function(e) {
                e.preventDefault();

                //hide search overlay if open
                if ($('#block-nbcuni-responsive-menus-tablet-main-menu ul#tablet-main-nav li.search a').hasClass('open')) {
                    $('.search-overlay-close').trigger('click');
                }

                var $elem = $(this);

                if(!$elem.hasClass('open')) {
                    $elem.next('.level-1').fadeIn();
                    NBC.Nav.fixShareIconsMobileMenu();
                    // Flip in the X
                    $elem.stop().animate({
                        'width': 0,
                        'padding': '17px 0px 17px 27.5px'
                    }, 250, function() {
                        $elem.addClass('open');
                        $elem.stop().animate({
                            'width': 35,
                            'padding': '17px 10px'
                        }, 250);
                    });

                    // Disable the page scroll
                    NBC.GLOBAL.disableScroll();
                } else {
                    $elem.next('.level-1').fadeOut();

                    // Flip in the Hamburger
                    $elem.stop().animate({
                        'width': 0,
                        'padding': '17px 0px 17px 27.5px'
                    }, 250, function() {
                        $elem.removeClass('open');
                        $elem.stop().animate({
                            'width': 35,
                            'padding': '17px 10px'
                        }, 250);
                    });

                    // Enable the page scroll
                    NBC.GLOBAL.enableScroll();
                }

            });

            // Open Sub Menu
            var $subnav = $('.has-subnav > a');
            $subnav.on('click tap', function(e) {
                e.preventDefault();

                $('.social').hide();

                // Only do this for mobile
                if($('.close').hasClass('menu-open') && NBC.GLOBAL.isMobile) {
                    $('.close').addClass('sub-menu-open');
                    $('.close > a#back-text span').text('Back To Businesses');
                }

                $('.close').addClass('menu-open');

                $('.level-2 .child').hide();

                var $menu = $(this).next('ul');
                var left = ($menu.hasClass('level-2')) ? 0 : 55;
                $menu.show().animate({
                    'left': left
                }, 250, 'easeOutQuad', function() {
                    $('.close').animate({
                        'left': 0
                    }, 250, 'easeOutQuad');
                });
            });

            $('.level-2 .close').on('click', function(e) {
                e.preventDefault();

                // Hide sub menu and stop
                if($(this).hasClass('sub-menu-open')) {
                    $('.close').removeClass('sub-menu-open');
                    $('.close > a#back-text span').text('Back To Menu');

                    $('.has-subnav .level-3').animate({
                        'left': NBC.GLOBAL.viewportWidth
                    }, 350, 'easeOutQuad', function() {
                        $('.level-2 .child').hide();
                    });

                    return false;
                }

                // Go back to main menu
                $(this).animate({
                    'left': -55
                }, 250, 'easeOutQuad', function() {
                    $(this).parent('.level-2').animate({
                        'left': NBC.GLOBAL.viewportWidth
                    }, 250, 'easeOutQuad', function() {
                        $('.close').removeClass('menu-open');
                        $('.level-2').hide();
                        $('.social').show();
                    });
                });

            });

            // Disable Category Headings
            this.nav.find('.category > a').on('click', function(e) {e.preventDefault(); });
        },

        setTouchNavWidth: function() {
            this.level1.css({
                'width': NBC.GLOBAL.viewportWidth+ 18,
                'height': NBC.GLOBAL.viewportHeight - 55
            });
        },

        setDesktopNavDimensions: function() {
            var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            this.brandMenu.css({
                'width': width + 18,
                'height': height - 55
            });
        },

        setupMobileTabletPositions: function() {
            // Move subnavs off screen
            var $subnav = $('.has-subnav > .child');
            if(!$subnav.children('.close').hasClass('menu-open')) {
                $subnav.css('left', NBC.GLOBAL.viewportWidth);
            }
        },

        // Global Extenders ( You can see the main functions in Main.js )
        onScroll: function() {

        },

        onResize: function() {
            // Update Desktop Brand Drop Down Menu Dimensions
            this.setDesktopNavDimensions();

            // Update Touch Nav Width
            this.setTouchNavWidth();

            // Update Mobile/Tablet Nav positions
            this.setupMobileTabletPositions();

            //this.centerMegaMenu();

            this.fixShareIconsMobileMenu();

            // Remove excess mobile classes for tablet
            if(NBC.GLOBAL.isTablet) {
                $('.close').removeClass('sub-menu-open');
                $('.close > a#back-text span').text('Back To Menu');
                $('.level-3.child').removeAttr('style');
            }
        },

        onLoad: function() {
            // Set Nav Height
            this.setDesktopNavDimensions();
        }
    };
});
;
jQuery(document).ready(function($) {
    NBC.Home = {
        // Symphony properties
        careers: null,
        theLatest: null,

        // Evergreen properties
        evergreenElem: null,
        evergreenStatic: null,
        evergreenFirst: null,
        evergreenCard: null,
        evergreenHeight: null,

        // Carousel properties
        carousel: null,
        carouselWrapper: null,
        carouselItem: null,
        carouselHeight: null,

        // Track Dom Restructuring
        restructureTablet: false,
        restructureMobile: false,

        init: function() {
            // Set Symphony Elements
            this.theLatest = $('.pane-home-page-hero.the-latest .view-home-page-hero');
            this.careers = $('.pane-home-page-hero.careers .view-home-page-hero');

            // Set Evergreen Elements
            this.evergreenThird = $('.pane-evergreen-3');
            this.evergreenCard = $('.bean-evergreen-static');
            this.evergreenFirst = $('.pane-evergreen-1');
            this.evergreenSecond = $('.pane-evergreen-2');

            // Set Carousel Element
            this.carousel = $('.owl-carousel');
            this.carouselWrapper = $('.owl-wrapper-outer');
            this.carouselItem = $('.owl-item');

            // Run Responsive Rules
            this.restructureMarkupForTablet();

            $('.evergreen > .inside > div:last-child').css('margin-right', 0); //force in IE8

            $('.block-inner').css('margin', 0); //force in IE9
			$(".pane-bean-home-page-evergreen-top").hover(function() {
			  $(this).css("cursor", "pointer");
			});
			$(".pane-bean-home-page-evergreen-top").click(function(e) {
				if($(e.target).is('ul li a')){
					window.location = $(this).attr("href");
					return;
				} else {
				  window.location = $("#history-home-block-url").val();
				  return false;
				}

			});
            this.fixPressTitleHeight();

            //Set opacity when rollover
            $( ".view-home-page-hero .views-row, .view-home-page-promo .views-row, .view-home-page-evergreen .views-row" ).each(function() {
                // $( this )
                // .mouseenter(function() {
                //     var featuredImage = $( this ).find( '.views-field-field-featured-image');
                //     featuredImage.fadeTo( 0.35 , 0.75);

                //     /*if ( $( this ).parent().parent().hasClass( 'careers') || $( this ).parent().parent().hasClass( 'view-home-page-evergreen')) {
                //         var fieldNothing = $( this ).find('.views-field-nothing');
                //         if (fieldNothing) {
                //             fieldNothing.fadeTo( 0.35 , 0.75);
                //         }
                //     }*/
                // })
                // .mouseleave(function() {
                //     var featuredImage = $( this ).find( '.views-field-field-featured-image');
                //     featuredImage.fadeTo( 0.35 , 1);

                //     /*if ( $( this ).parent().parent().hasClass( 'careers') || $( this ).parent().parent().hasClass( 'view-home-page-evergreen')) {
                //         var fieldNothing = $( this ).find('.views-field-nothing');
                //         if (fieldNothing) {
                //             fieldNothing.fadeTo( 0.35 , 1);
                //         }
                //     }*/
                // });
            });

            this.resizePressLogos();
        },


        fixPressTitleHeight: function() {
            /*$('.view-home-page-press-releases .card-copy .logo').css('text-align','center');*/
            //if(NBC.GLOBAL.isDesktop) {
                _biggest_height = 0
                $('.view-home-page-press-releases .card-copy .title').each( function( index, el ) {
                    if (parseInt($(el).css('height')) >= _biggest_height)
                    _biggest_height = parseInt($(el).css('height'));
                });

                if( parseInt($(window).width()) >= 973) {
                    _biggest_height = 96;
                } else {
                    _biggest_height = 72;
                }
                $('.view-home-page-press-releases .card-copy .title').css('height',_biggest_height+'px');
            //} else {
               // $('.view-home-page-press-releases .card-copy .title').css('height','auto');
            //}
        },

        resizePressLogos: function() {
            /*$('.view-home-page-press-releases .card-copy .logo').css('width','20%');*/
            $('.view-home-page-press-releases .card-copy .logo img').each( function( index, el ) {

                if ( parseInt($(el).height(), '10') > 54) {
                    $(el).css('width','auto');
                    $(el).css('height','54px');
                }
            });

           /* if (!jQuery.support.leadingWhitespace){
                $('.view-home-page-press-releases .card-copy .logo').css('top','35%');
            }*/
        },

        // Set Careers Height
        setCareersHeight: function() {
            if(!NBC.GLOBAL.isMobile) {
                this.careers.css('height', this.theLatest.height()+'px');
                //this.careers.find('.views-field-card-footer').css('position', 'absolute');
            } else {
                this.careers.css('height', 'auto');
                //this.careers.find('.views-field-card-footer').css('position', 'static');
            }
        },

        // Set evergreen content's height based on the second evergreen content's height
        setEvergreenHeight: function() {
            // Column Heights
            if(!NBC.GLOBAL.isMobile) {
                var h = this.evergreenFirst.find('.views-field-field-featured-image').height();
				if(h == null) {
				  var h = this.evergreenFirst.find('.views-field-field-promo-image').height();
				}
				if(h == null) {
				   var h = this.evergreenFirst.find('.views-field-field-featured-home-page-image').height();
				}
				
                this.evergreenHeight = this.evergreenSecond.height();
                this.evergreenFirst.css('height', this.evergreenHeight+'px');
                this.evergreenThird.css('height', this.evergreenHeight+'px');
                this.evergreenCard.css('height', this.evergreenHeight+'px');
                this.evergreenFirst.find('.views-field-nothing').css('height', h+'px');
                this.evergreenFirst.find('.card-footer').css('position', 'absolute');
            } else {
                this.evergreenFirst.find('.views-field-nothing').css('height', 'auto');
                this.evergreenFirst.find('.card-footer').css('position', 'static');
                this.evergreenCard.css('height', 'auto');
                this.evergreenThird.css('height', 'auto');
            }
        },

        // Set carousel item height
        setCarouselItemHeight: function() {
            this.carouselHeight = this.carouselWrapper.height();
            this.carouselItem.css('height', this.carouselHeight+'px');
        },

        // Move around the content that needs to get moved around
        restructureMarkupForTablet: function() {
            if(NBC.GLOBAL.isTablet && !this.restructureTablet) {
                // Modify Symphony Bottom
                $('.symphony .panel-pane.symphony-bottom').insertAfter('.pane-home-page-hero.careers');

                // Modify Press Release
                $('.view-home-page-press-releases .view-header').insertBefore('.view-home-page-press-releases .views-row-1');

                this.restructureTablet = true;
            }
        },

        // Reset Table Structure
        resetTabletMarkup: function() {
            if(!NBC.GLOBAL.isTablet && this.restructureTablet) {
                // Move Symphony Bottom Back to original position
                var $elem = $('.symphony .panel-pane.symphony-bottom');
                var $target = $elem.parents('.inside').children('.panel-separator')[0];
                $elem.insertAfter($target);

                // Reset Press Release Markup
                $('.view-home-page-press-releases .view-header').insertBefore('.view-home-page-press-releases .view-content');

                this.restructureTablet = false;
            }
        },

        setSymphonyCardClickableArea: function() {
            var $elem = $('.view-id-home_page_hero.view-display-id-panel_pane_1 .views-row, .view-id-home_page_hero.view-display-id-panel_pane_2 .views-row, .view-id-home_page_hero.view-display-id-block_1 .views-row, .view-id-home_page_hero.view-display-id-block_2 .views-row');
            $elem.each(function() {
                var $self = $(this);
                var $toSet = $self.find('.views-field-nothing');
                var $url = $toSet.find('.views-field-title a').attr('href');
				var $target = $toSet.find('.views-field-title a').attr('target');
                $toSet.css({ cursor: 'pointer' });
                $toSet.bind('click', function(){
				  if($target != undefined) {
				    window.open($url, $target);
					return false;
				  } else {
				    window.location.href = $url;
					return false;
				  }
				});
            });

            $elem = $('.view-id-home_page_evergreen.view-display-id-block_2 .views-row,  .view-id-home_page_promo.view-display-id-default .views-row, .view-id-home_page_evergreen.view-display-id-block_1 .views-row');
            $elem.each(function() {
                var $self = $(this);
                var $toSet = $self.find('.views-field-nothing');
                var $url = $toSet.find('.title a').attr('href');
                $toSet.css({ cursor: 'pointer' });
		//Commented by Pachai. Link will be set from views.
                //$toSet.bind('click', function(){ window.location.href = $url; });
            });

            $elem = $('.view-id-home_page_press_releases.view-display-id-default .views-row');
            $elem.each(function() {
                var $self = $(this);
                var $url = $self.find('.views-field-nothing .card-copy .title a').attr('href');
                $self.css({ cursor: 'pointer' });
                $self.bind('click', function(){ window.location.href = $url; });
            });
        },

        // Global Extenders ( You can see the main functions in Main.js )
        onScroll: function() {

        },

        onResize: function() {
            // Update Careers Height
            this.setCareersHeight();

            // Update Carousel Item Heights
            this.setCarouselItemHeight();

            // Update Evergreen Card Dimensions
            this.setEvergreenHeight();

            // Run Responsive Rules
            this.restructureMarkupForTablet();
            this.resetTabletMarkup();

            this.fixPressTitleHeight();
        },

        onLoad: function() {
            // Set Careers Height
            this.setCareersHeight();

            // Set Carousel Item Heights
            this.setCarouselItemHeight();

            // Set Evergreen Card Dimensions
            this.setEvergreenHeight();

            this.resizePressLogos();

            this.setSymphonyCardClickableArea();
        }
    };
});
;
jQuery(document).ready(function($) {
    NBC.Newsroom = {

        // Track Dom Restructuring
        restructureTablet: false,
        restructureMobile: false,
        pager: 1,

        init: function() {
            this.loadMoreStories();
            this.filterStories();
            this.adjustTopStoriesCards();
            this.stickyRightBar();
            this.mobileNewsroomMenu();

            this.restructureMarkupForMobile();
            this.updateSocialInstagramCard();
            if (NBC.GLOBAL.isMobile) this.setFilterText();
            this.centerSecondMenu();
            this.fixSocialCardsIE8();
            this.hideArticleLogos();
        },

        hideArticleLogos: function() {
            $('.view-latest-content .article .views-field-field-logo').each( function( index, el ) {
                $(this).css('display','none');
            });

            /*$('.view-latest-content .press-release').each( function( index, el ) {
                if ($(this).find('.views-field-field-featured-image').length) {
                    $(this).find('.views-field-field-logo').css('display','none');
                }
            });*/

            $('.view-latest-content .press-release .views-field-field-featured-image').each( function( index, el ) {
                $(this).css('display','none');
            });
        },

        fixSocialCardsIE8: function() {
            //execute only in IE8 and older
            if (!jQuery.support.leadingWhitespace){
                $('.pane-social-content .view-id-social_content.view-display-id-block_2 .views-row').css('width', '50%').css('width', '-=6px');
                $('body.newsroom .view-latest-content .views-row .content-wrapper .views-field-view-node').css('border-top','1px solid #6b7378');
                $('.pane-social-content .view-id-social_content.view-display-id-block_2 .views-row .node-social-card.node-promoted.article.view-mode-social_card_display .group-right .field-name-field-timestamp').css('border-top','1px solid #a7b6c0');
            }
        },

        centerSecondMenu: function() {
            if (!NBC.GLOBAL.isMobile && !NBC.GLOBAL.isTablet)  {
                var _window_width = $(window).width();
                var _left = (_window_width - 1280) / 2;
                $('.view-newsroom-menu').css('position', 'relative');
                if (_window_width>=1280) {
                    $('.view-newsroom-menu').css('width', _window_width + 'px');
                    $('.view-newsroom-menu').css('left','-' + _left + 'px');
                } else {
                    $('.view-newsroom-menu').css('left','0');
                    $('.view-newsroom-menu').css('width', $(window).width()+20);
                }
            } else {
                if (NBC.GLOBAL.isTablet) {
                    $('.view-newsroom-menu').css('width',$(window).width()+20);
                    $('.view-newsroom-menu').css('left','0');
                } else {
                    $('.view-newsroom-menu').css('width','auto');
                    $('.view-newsroom-menu').css('left','0');
                }
            }
        },

        setFilterText: function() {
            var selectedMenuHtml;
            if ($('.view-newsroom-menu.view-display-id-block').hasClass('all'))
            selectedMenuHtml = $('.view-newsroom-menu.view-display-id-block.all li.all a').html();
            if ($('.view-newsroom-menu.view-display-id-block').hasClass('press-releases'))
            selectedMenuHtml = $('.view-newsroom-menu.view-display-id-block.press-releases li.press-releases a').html();
            if ($('.view-newsroom-menu.view-display-id-block').hasClass('articles-blogs'))
            selectedMenuHtml = $('.view-newsroom-menu.view-display-id-block.articles-blogs li.pro-social-initiatives a').html();

            /*if ($('.view-newsroom-menu.view-display-id-block').hasClass('nbcu-all-access'))
            selectedMenuHtml = $('.view-newsroom-menu.view-display-id-block.nbcu-all-access li.nbcu-all-access a').html();*/

            $('.filter-by span.selected').html(selectedMenuHtml);
        },


        updateSocialInstagramCard: function() {

            $('.field-name-social-icon span').each( function( index, el ) {
                if ($(el).hasClass('icon-instagram')) {
                    target_el = $(el).parent().parent().parent().parent().parent().find('.field-name-field-timestamp');
                    target_el.css('color','#ccc');
                    target_el.css('background', 'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPgogICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzAwMDAwMCIgc3RvcC1vcGFjaXR5PSIwIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMwMDAwMDAiIHN0b3Atb3BhY2l0eT0iMC42Ii8+CiAgPC9saW5lYXJHcmFkaWVudD4KICA8cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJ1cmwoI2dyYWQtdWNnZy1nZW5lcmF0ZWQpIiAvPgo8L3N2Zz4=)');
                    target_el.css('background', '-moz-linear-gradient(top,  rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)');
                    target_el.css('background', '-ms-linear-gradient(top,  rgba(0,0,0,0) 0%,rgba(0,0,0,1) 100%)');
                    target_el.css('background', '-o-linear-gradient(top,  rgba(0,0,0,0) 0%,rgba(0,0,0,1) 100%)');
                    target_el.css('background', 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 1) 100%) repeat scroll 0% 0% transparent');
                    target_el.css('background', "progid:DXImageTransform.Microsoft.gradient( startColorstr='#00000000', endColorstr='#99000000',GradientType=0 )");
                    target_el.addClass('with-instagram');
                }
            });
        },

        centerSocialCardIconsVertically: function() {
            $('.field-name-social-icon span').each( function( index, el ) {
                target_el = $(el).parent().parent().parent().parent().parent().find('.field-name-field-timestamp');
                //console.log(target_el.find('.placeholder').text() + ' - ' + target_el.innerHeight());
                if (target_el.innerHeight() == 60) {
                    $(el).parent().parent().parent().parent().css('padding-bottom','20px');
                }
                if (target_el.innerHeight() == 45) {
                    $(el).parent().parent().parent().parent().css('padding-bottom','12px');
                }
                if (target_el.innerHeight() == 35) {
                    $(el).parent().parent().parent().parent().css('padding-bottom','7px');
                }
                if (target_el.innerHeight() == 50) {
                    $(el).parent().parent().parent().parent().css('padding-bottom','13px');
                }
            });
        },

        loadMoreStories: function() {
            var pagerItems = 5;

            $('.view-latest-content.view-display-id-block').find('ul.pager a').live('click', function(e){
                e.preventDefault();
                var view = $('.view-latest-content.view-display-id-block');
                var taxFilter1 = 'all';
                var taxFilter2 = 'all';
                var pressReleasesId = $('.view-newsroom-menu .view-content .views-row .views-field-php .field-content').text();

                // Get the parameters to pass for load more AJAX call
                if($.url().segment(3)) taxFilter2 = $.url().segment(3);
                  if($.url().segment(2) != 'articles-blogs'){
                    taxFilter1 = $.url().segment(2);
                  }else{
                    taxFilter2 = pressReleasesId;
                  }
                $('.view-newsroom-menu.view-display-id-block .view-footer .overlay').show();
                $.ajax({
                    url: '/ajax/load_more/latest_content/block/' + NBC.Newsroom.pager + '/' + taxFilter1 + '/' + taxFilter2,
                    type: 'GET',
                    success: function(data) {
                        view.find('.view-content').append(data);
                        if(view.find('.views-row').length % pagerItems == 0) NBC.Newsroom.pager++;
                        else view.find('ul.pager').hide();

                        if(!data) view.find('ul.pager').hide();
                        $('.view-newsroom-menu.view-display-id-block .view-footer .overlay').hide();
                    }
                });
            });
        },

        filterStories: function() {
            var view = $('.view-newsroom-menu.view-display-id-block');
            var subview = $('.view-taxonomy-description.view-display-id-block');
            var filter1, filter2, filter3, historyTitle, historyUrl, pager = 0;
            var pressReleasesId = $('.view-newsroom-menu .view-content .views-row .views-field-php .field-content').text();

            switch($.url().segment(2)) {
                case 'all'                      :
                    filter1 = 'all'; filter2 = 'all'; NBC.Newsroom.handleRightSidebar('all'); historyTitle = 'Newsroom | NBCUniversal'; historyUrl = '/newsroom'; break;
                case 'press-releases'           :
                    filter1 = 'press-releases'; filter2 = 'all'; NBC.Newsroom.handleRightSidebar('press-releases'); historyTitle = 'Press Releases'; historyUrl = '/newsroom/press-releases'; break;
                case 'articles-blogs'   :
                    filter1 = 'all'; filter2 = pressReleasesId; NBC.Newsroom.handleRightSidebar('pro-social-initiatives'); historyTitle = 'Articles / Blogs'; historyUrl = '/newsroom/articles-blogs'; break;
                /*case 'nbcu-all-access'          :
                    filter1 = 'nbcu-all-access'; filter2 = 'all'; NBC.Newsroom.handleRightSidebar('nbcu-all-access'); historyTitle = 'NBCU All Access'; historyUrl = '/newsroom/nbcu-all-access'; break;
                case 'top-stories'              :
                    filter1 = 'top-stories'; filter2 = 'all'; NBC.Newsroom.handleRightSidebar('top-stories'); historyTitle = 'Top Stories'; historyUrl = '/newsroom/top-stories'; break;*/
                default                         :
                    filter1 = 'all'; filter2 = 'all'; NBC.Newsroom.handleRightSidebar('all'); historyTitle = 'Newsroom | NBCUniversal'; historyUrl = '/newsroom';
            }

            if($.url().segment(3)) {
                filter2 = $.url().segment(3);
                var tempTitle = $.url().segment(3).replace('-', ' ');
                historyTitle = tempTitle.charAt(0).toUpperCase() + tempTitle.substring(1);
                historyUrl = '/newsroom/pro-social-initiatives/' + filter2;
            }

            NBC.GLOBAL.updateHistory = false;

            if (NBC.GLOBAL.isMobile) {
                NBC.Newsroom.newsroomMenuUpdate();
            }

            NBC.Newsroom.makeAjaxCall(pager, filter1, filter2);

            view.find('ul li a').on('click', function(e){
                e.preventDefault();
                view.find('ul li').removeClass('active');
                NBC.Newsroom.pager = 1;
                var pressReleasesId = $('.view-newsroom-menu .view-content .views-row .views-field-php .field-content').text();

                switch($(this).parent().attr('class')) {
                    case 'all'                      :
                        filter1 = 'all'; filter2 = 'all'; NBC.Newsroom.handleRightSidebar('all'); historyTitle = 'Newsroom'; historyUrl = '/newsroom'; break;
                    case 'press-releases'           :
                        filter1 = 'press-releases'; filter2 = 'all'; NBC.Newsroom.handleRightSidebar('press-releases'); historyTitle = 'Press Releases'; historyUrl = '/newsroom/press-releases'; break;
                    case 'pro-social-initiatives'   :
                        filter1 = 'all'; filter2 = pressReleasesId; NBC.Newsroom.handleRightSidebar('pro-social-initiatives'); historyTitle = 'Articles / Blogs'; historyUrl = '/newsroom/articles-blogs'; break;
                    /*case 'nbcu-all-access'          :
                        filter1 = 'nbcu-all-access'; filter2 = 'all'; NBC.Newsroom.handleRightSidebar('nbcu-all-access'); historyTitle = 'NBCU All Access'; historyUrl = '/newsroom/nbcu-all-access'; break;
                    case 'top-stories'              :
                        filter1 = 'top-stories'; filter2 = 'all'; NBC.Newsroom.handleRightSidebar('top-stories'); historyTitle = 'Top Stories'; historyUrl = '/newsroom/top-stories'; break;*/
                    default                         :
                        filter1 = 'all'; filter2 = 'all'; NBC.Newsroom.handleRightSidebar('all'); historyTitle = 'Newsroom'; historyUrl = '/newsroom';
                }

                view.find('ul li.all').removeClass('all');
                if($.url().segment(2)) view.removeClass($.url().segment(2));

                // Highlight the active filter
                $(this).parent().addClass('active');

                // Hide the social block when clicked on Social Initiatives
                if($(this).parent().hasClass('pro-social-initiatives')) {
				  //$('.ft_tabs').hide();
				  //$('.view-social-content.view-display-id-block').hide();
				}
                else {
				  $('.ft_tabs').show();
				  $('.view-social-content.view-display-id-block').show();
				}

                // Change URL using History.js
                NBC.GLOBAL.updateHistory = false;
                NBC.History.setState(historyTitle, historyUrl);

                if($('body').hasClass('is-mobile')) {
                    NBC.Newsroom.newsroomMenuUpdate();
                }

                // AJAX call to load views when clicked on the menu filters
                NBC.Newsroom.makeAjaxCall(pager, filter1, filter2);

            });

            subview.find('a').live('click',  function(e){
                e.preventDefault();

                subview.find('a').removeClass('active');
                $(this).addClass('active');
                NBC.Newsroom.pager = 1;

                var ucwords = function(str,force){
                    str=force ? str.toLowerCase() : str;
                    return str.replace(/(\b)([a-zA-Z])/g,
                    function(firstLetter){
                    return   firstLetter.toUpperCase();
                    });
                };

                var urlSegments = $(this).attr('href').split('/'),
                    filter1 = 'all',
                    filter2 = 'all',
                    historyTitle = 'Pro Social Initiatives',
                    historyUrl = '/newsroom/pro-social-initiatives'

                if(urlSegments[2]) {
                    filter1 = urlSegments[2];
                }
                if(urlSegments[3]) {
                    filter2 = urlSegments[3];
                    var tempTitle = urlSegments[3].replace('-', ' ');
                    historyTitle = tempTitle.charAt(0).toUpperCase() + tempTitle.substring(1);
                    historyTitle = decodeURIComponent(historyTitle).replace(/-/g," ");
                    historyTitle = ucwords(historyTitle, false);
                    historyUrl = '/newsroom/pro-social-initiatives/' + filter2;
                }

                // Change URL using History.js
                if(!$('body').hasClass('ie9') && !$('body').hasClass('ie8'))
                    NBC.History.setState(historyTitle, historyUrl);

                NBC.Newsroom.makeAjaxCall(pager, filter1, filter2);

            });
        },

        handleRightSidebar: function(url) {
            switch(url) {
                case 'all'                      :
                    NBC.Newsroom.showDescription(); NBC.Newsroom.showAdditionalFilters(false); NBC.Newsroom.moveMenu(false); NBC.Newsroom.showSocialContent(true); break;
                case 'press-releases'           :
                    NBC.Newsroom.showDescription('press-releases'); NBC.Newsroom.showAdditionalFilters(false); NBC.Newsroom.moveMenu(false); NBC.Newsroom.showSocialContent(true); break;
                case 'pro-social-initiatives'   :
                    NBC.Newsroom.showDescription('pro-social-initiatives'); NBC.Newsroom.showAdditionalFilters(true); NBC.Newsroom.moveMenu(false); NBC.Newsroom.showSocialContent(false); break;
                case 'nbcu-all-access'          :
                    NBC.Newsroom.showDescription('nbcu-all-access'); NBC.Newsroom.showAdditionalFilters(false); NBC.Newsroom.moveMenu(true); NBC.Newsroom.showSocialContent(true); break;
                default                         :
                    NBC.Newsroom.showDescription(); NBC.Newsroom.showAdditionalFilters(false); NBC.Newsroom.moveMenu(false); NBC.Newsroom.showSocialContent(true);
            }
        },

        handleTopMenu: function(url) {
            view = $('.view-newsroom-menu.view-display-id-block');
            view.find('ul li').removeClass('active');
            switch(url) {
                case 'all'                      :
                     view.find('ul li:first').addClass('active'); break;
                case 'press-releases'           :
                    view.find('ul li.press-releases').addClass('active'); break;
                case 'pro-social-initiatives'   :
                    view.find('ul li.pro-social-initiatives').addClass('active'); break;
                case 'nbcu-all-access'          :
                    view.find('ul li.nbcu-all-access').addClass('active'); break;
                default                         :
                    view.find('ul li:first').addClass('active');
            }
        },

        showSocialContent: function(flag) {
/*            var socialView = $('.view-social-content.view-id-social_content.view-display-id-block_2');
            if(flag) {
			  socialView.show();
			  $(".pane-social-content-tab").show();
			} else {
			  socialView.hide();
			  $(".pane-social-content-tab").hide();
			}*/
        },

        showDescription: function(descClass) {
            var descView = $('.view-taxonomy-description.view-display-id-block_1');
            if(!descClass) {
                descView.hide();
                descView.find('.views-row').hide();
            }
            else {
                descView.find('.views-row').hide();
                descView.show();
                descView.find('.views-row.' + descClass).show();
            }
        },

        showAdditionalFilters: function(flag) {
            var addView = $('.view-taxonomy-description.view-display-id-block');
            addView.find('.field-content a').removeClass('active');
            if(flag) addView.show();
            else addView.hide();

            if($.url().segment(3)) {
                addView.find('.views-row.' + $.url().segment(3).replace(/[^a-z-\s]/gi, '').replace(/[%\s]/g, '') + ' a').addClass('active');
            }
        },

        moveMenu: function(flag) {
            if( flag && (NBC.GLOBAL.viewportWidth <= 710) && NBC.GLOBAL.isTablet ) {
                $('.view-newsroom-menu.view-display-id-block ul').css('left', '-35px');
            }
            if(!flag) {
                $('.view-newsroom-menu.view-display-id-block ul').css('left', '0');
            }
        },

        makeAjaxCall: function(pager, filter1, filter2) {
            $('.view-newsroom-menu.view-display-id-block .view-footer .overlay').show();

            if(filter1 != 'top-stories') {
                // AJAX call to load views when clicked on the menu filters
                $.ajax({
                    url: '/ajax/load_view/latest_content/block/' + pager + '/' + filter1 + '/' + filter2,
                    type: 'GET',
                    success: function(data) {
                        $('.view-latest-content.view-display-id-block').replaceWith(data);
                        $('.view-newsroom-menu.view-display-id-block .view-footer .overlay').hide();

                        if($('body').hasClass('is-mobile')) {
                            $('.view-newsroom-menu.view-display-id-block .field-content').removeClass('open');
                            NBC.Newsroom.showTopStories(false);
                        }
                    }
                });
            }
            else {
                $('.view-newsroom-menu.view-display-id-block .view-footer .overlay').hide();
                $('.view-newsroom-menu.view-display-id-block .field-content').toggleClass('open');
                NBC.Newsroom.showTopStories(true);
            }

            $.waypoints('refresh');
        },

        adjustTopStoriesCards: function() {
            var _window_height = $(window).height();
            var _minimum_height = 620;
            var _cards_number = 3;

            if (_window_height >= _minimum_height){
                var _top_nav_bar_height = $('#menu-bar').height();
                var _footer_nav_height = $('#footer').height();
                var _top_stories_title_height = $('body.newsroom section.pane-latest-content h2').height();
                var _calculated_height = (_window_height - _top_nav_bar_height - _top_stories_title_height - _footer_nav_height + 10) / 3;
                var _new_height = _calculated_height.toString()+'px';
                $('body.newsroom .view-latest-content.view-display-id-block_1 .views-row').css("height", _new_height);
            }
        },

        stickyRightBar: function() {
            /*
            $('.region-two-66-33-second .panel-pane.pane-latest-content').waypoint(function(direction){
                if(NBC.GLOBAL.isDesktop) {
                    if(direction == 'down') {
                        $(this).addClass('static');
                    }
                    if(direction == 'up') {
                        $(this).removeClass('static');
                    }
                }
                else {
                    $(this).removeClass('static');
                }
            }, {offset: 50});
            */
            if (!NBC.GLOBAL.isMobile && !this.restructureMobile) {
                setTimeout(function(){
                  $('.region-two-66-33-second .panel-pane.pane-latest-content').scrollToFixed({
                    marginTop: 90,
                    zIndex: 99,
                    limit: function() {
                        var limit = $('#footer').offset().top  - $(this).outerHeight();
                        return limit;
                    },
                  }).fadeIn('fast');
                },725);
            }
        },

        mobileNewsroomMenu: function() {
            $('.view-newsroom-menu.view-display-id-block .filter-by').on('click', function(){
                $(this).parent().toggleClass('open');
            });
        },

        newsroomMenuUpdate: function() {
            var view = $('.view-newsroom-menu.view-display-id-block');
            var selectedMenuHtml = view.find('ul li.active a').html();
            var contentTop  = 'all';

            view.find('.filter-by span.selected').html(selectedMenuHtml);

            if($.url().segment(2)) contentTop = $.url().segment(2);
            $('.region-two-66-33-first .panel-pane.pane-latest-content .block-inner > div').attr('class', contentTop);
        },

        showTopStories: function(flag) {
            if(flag) {
                $('.view-latest-content.view-display-id-block').hide();
                $('.region-two-66-33-second .panel-pane.pane-latest-content').show();
                $('.view-id-latest_content.view-display-id-block_1').show();
                $('.view-id-social_content.view-display-id-block_1').hide();
            }
            else {
                $('.view-latest-content.view-display-id-block').show();
                $('.region-two-66-33-second .panel-pane.pane-latest-content').hide();
                $('.view-id-latest_content.view-display-id-block_1').hide();
                $('.view-id-social_content.view-display-id-block_1').show();
            }

            if($.url().segment(2) == 'pro-social-initiatives') $('.view-id-latest_content.view-display-id-block_1').hide();
            $('.view-social-content.view-display-id-block').hide();

        },

        // Move around the content that needs to get moved around
        restructureMarkupForMobile: function() {
            if( NBC.GLOBAL.isMobile && !this.restructureMobile) {
                // Modify Taxonomy Description
                $('.view-taxonomy-description.view-display-id-block_1').insertBefore($('.region-two-66-33-first .panel-pane.pane-latest-content'));

                // Modify Press Release
                $('.view-taxonomy-description.view-display-id-block').insertBefore($('.region-two-66-33-first .panel-pane.pane-latest-content'));

                // Hide the social content block
                $('.view-social-content.view-display-id-block').hide();
                $('.region-two-66-33-second .panel-pane.pane-latest-content').hide();
                $('.view-newsroom-menu.view-display-id-block .field-content').removeClass('open');

                this.restructureMobile = true;
            }
        },

        // Reset Table Structure
        resetMobileMarkup: function() {
            if(!NBC.GLOBAL.isMobile && this.restructureMobile) {
                // Reset Taxonomy Description
                $('.view-taxonomy-description.view-display-id-block_1').insertBefore($('.region-two-66-33-second .taxonomy-description-content .block-content'));

                // Reset Press Release
                $('.view-taxonomy-description.view-display-id-block').insertBefore($('.region-two-66-33-second .taxonomy-subterms-content .block-content'));

                // Show the social content block
                $('.view-social-content.view-display-id-block').show();
                $('.view-id-latest_content.view-display-id-block_1').show();

                // Show all content if transforming from top stories view
                $('.region-two-66-33-second .panel-pane.pane-latest-content').show();
                /*if($.url().segment(2) == 'top-stories') {
                    $('.view-newsroom-menu.view-display-id-block ul li:first-child a').trigger('click');
                }*/
                if($.url().segment(2) == 'pro-social-initiatives') $('.pane-social-content-tab').hide();

                this.restructureMobile = false;
            }
        },

        // Global Extenders ( You can see the main functions in Main.js )
        onScroll: function() {

        },

        onResize: function() {
            // Run Responsive Rules
            this.restructureMarkupForMobile();
            this.resetMobileMarkup();

            // Set menu position to right one
            if(NBC.GLOBAL.viewportWidth > 710) {
                $('.view-newsroom-menu.view-display-id-block ul').css('left', '0');
            }

            this.centerSocialCardIconsVertically();
            this.centerSecondMenu();
			this.setFilterText();
			if($('body').hasClass('is-mobile')) {
                NBC.Newsroom.newsroomMenuUpdate();
            }
            this.adjustTopStoriesCards();
        },

        onLoad: function() {
            this.centerSocialCardIconsVertically();
        }
    };

	// Social feed tab
	$(".ft_tabs .tab1").on('click', function(e){
		$(".ft_tabs .tab1").addClass("active").removeClass("inactive");
		$(".view-content-twitter").show();
		$(".ft_tabs .tab2").addClass("inactive").removeClass("active");
		$(".view-content-facebook").hide();
	});
	$(".ft_tabs .tab2").on('click', function(e){
		$(".ft_tabs .tab2").addClass("active").removeClass("inactive");
		$(".view-content-facebook").show();
		$(".ft_tabs .tab1").addClass("inactive").removeClass("active");
		$(".view-content-twitter").hide();
	});

});

jQuery( document ).ajaxComplete(function() {
    if (jQuery('body').hasClass('newsroom')) {
        NBC.Newsroom.hideArticleLogos();
        //This fixes the issue with the shareThis module and ajax calls
        //We force to reload sharethis widget
        if (typeof(stButtons) != "undefined") {
            stButtons.locateElements();
        }
    }
});
;
jQuery(window).load(function() {
	if (window.location.hash != '') {
	  window.location.hash = window.location.hash;
	  var has = decodeURI(window.location.hash);
	  if(has.substring(0, 1) === '#') {
		if(jQuery(has).length) {
		  var hash_val = decodeURI(window.location.hash.substr(1));
		  var offset = jQuery('#' + hash_val).offset();
		  if(offset !== null && typeof offset === 'object') {
		    var scrollto = offset.top - 80; // fixed_top_bar_height = 150px
		    jQuery('html, body').animate({scrollTop:scrollto}, 0);
		  } 
		}
	  }
	}
});
jQuery(document).ready(function($) {
	jQuery(".taxonomy-term-description p a").click(function() {
	  var tar = $(this).attr("href");
	  if(tar.substring(0, 1) === '#') {
		if(jQuery(tar).length) {
		  window.location.hash = tar;
		  var offset = jQuery(tar).offset();
		  var scrollto = offset.top - 80; // fixed_top_bar_height = 150px
		  jQuery('html, body').animate({scrollTop:scrollto}, 0);		 
		  return false; 
		}
	  }
	});


    NBC.Staticdynamicpage = NBC.Staticpage = {

        isCareers: false,
        isPrivacy: false,
		isDynamicPrivacy: false,
        activeIDPrivacy: null,

		init: function() {
            this.body = $('body');
            if(this.body.hasClass('careers')) this.isCareers = true;
            if(this.body.hasClass('privacy')) this.isPrivacy = true;
			if(this.body.hasClass('privacy-custom')) this.isDynamicPrivacy = true;

            if (this.isDynamicPrivacy) {
                $.getScript("/sites/all/themes/nbcuni/scripts/vendors/jquery.scrolltotop.js", function(){
                });
                this.centerSecondMenu();
            }
        },

        centerSecondMenu: function() {

            if (!NBC.GLOBAL.isMobile && !NBC.GLOBAL.isTablet)  {
                var _window_width = $(window).width();
                var _left = (_window_width - 1280) / 2;
                $('.pane-menu-menu-privacy-menu').css('position', 'relative');
                $('.pane-menu-menu-privacy-menu').css('width', _window_width + 'px');
                if (_window_width>=1280) {            
                    $('.pane-menu-menu-privacy-menu').css('left','-' + _left + 'px');    
                } else {
                    $('.pane-menu-menu-privacy-menu').css('left','0'); 
                }
            } else {
                $('.pane-menu-menu-privacy-menu').css('width','auto');
            }      
        },

        stretchHeaderImage: function() {
          var header = $('#main-content-header');
          var paneHeader = $('.field-name-field-hero-image');

          var headerImage = paneHeader.find('.field-items img');
          var imgRatio = headerImage.width() / headerImage.height();

          var windowWidth = $(window).width()
            , headerWidth = header.outerWidth()
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
            bgHeight = (rootHeight>=320) ? rootHeight : 320;
            bgWidth = bgHeight * imgRatio;
            bgOffset = (bgWidth - rootWidth) / 2;
            bgCSS.left = '-' + bgOffset + 'px';
          }

          headerImage.css({width: bgWidth, height: bgHeight}).css(bgCSS);
          headerImage.show();
        },

        resizeContainer: function() {
            if (this.isCareers) {
                this.stretchHeaderImage();

                $('.careers .field-name-field-url-text-field').click(function(){
                     window.location=$(this).find("a").attr("href"); 
                     return false;
                });                
            }

            if (this.isPrivacy) {


                if (NBC.GLOBAL.isMobile) {
                    if ( parseInt($('#page-title').css('height')) > 39 ) {
                        $('.pane-menu-menu-privacy-menu').css('top', '-182px');
                    } else {
                        $('.pane-menu-menu-privacy-menu').css('top', '');
                    }
                } else {
                    $('.pane-menu-menu-privacy-menu').css('top', '');
                }

                if (!(NBC.GLOBAL.isMobile || NBC.GLOBAL.isTablet)) {
                    
                    if ($(window).width() >= 1280) {
                        $('body.privacy .pane-menu-menu-privacy-menu .block-content ul li.leaf').css('width', '220px');                        
                        $('body.privacy .pane-menu-menu-privacy-menu .block-content ul li.leaf').css('margin-right', '20px');
                        //$('.pane-menu-menu-privacy-menu h2.block-title').css('font-size', '36px');
                        //$('body.privacy .pane-menu-menu-privacy-menu .block-content ul li.leaf a').css('font-size', '0.625em');
                    } else {
                        $('body.privacy .pane-menu-menu-privacy-menu .block-content ul li.leaf').css('width', '170px');                        
                        $('body.privacy .pane-menu-menu-privacy-menu .block-content ul li.leaf').css('margin-right', '5px');
                        //$('.pane-menu-menu-privacy-menu h2.block-title').css('font-size', '30px');
                        //$('body.privacy .pane-menu-menu-privacy-menu .block-content ul li.leaf a' ).css('font-size', '0.5em');
                    }
                    if ($('.pane-menu-menu-privacy-menu .block-content ul').css('display') !='block') $('.pane-menu-menu-privacy-menu .block-content ul').css('display','block');
                } else {
                        if ($('.pane-menu-menu-privacy-menu .block-content ul').css('display') !='none') $('.pane-menu-menu-privacy-menu .block-content ul').css('display','none');
                        $('body.privacy .pane-menu-menu-privacy-menu .block-content ul li.leaf').css('width', 'inherit');
                        $('body.privacy .pane-menu-menu-privacy-menu .block-content ul li.leaf').css('margin-right', '0');                    

                }   

                if (NBC.GLOBAL.isMobile || NBC.GLOBAL.isTablet) {

                    if ($('#mobile-privacy-menu').length == 0) {                                                                    
                        var _active = $('.pane-menu-menu-privacy-menu ul li a.active-trail').text();
                        $('.pane-menu-menu-privacy-menu .block-inner h2.pane-title').after('<div id="mobile-privacy-menu"><span id="filter-text">FILTERED BY&nbsp;</span><a href="#" id="active-filter-text">'+_active+'</a><div class="arrow-down filter-arrow"></div></div>');    

                        $('#active-filter-text').click(function(e){
                            e.preventDefault();
                            $('.pane-menu-menu-privacy-menu .block-content ul').fadeToggle('fast',function(){
                                if ($('.pane-menu-menu-privacy-menu .block-content ul').is(":visible")) {
                                    $('.filter-arrow').removeClass('arrow-down');
                                    $('.filter-arrow').addClass('arrow-up');
                                } else {
                                    $('.filter-arrow').removeClass('arrow-up');
                                    $('.filter-arrow').addClass('arrow-down');
                                }
                            });        
                        });

                    } else {
                      //  $('#mobile-privacy-menu').css('display','block');
                    }

                    if ($('.pane-menu-menu-privacy-menu ul li a.active').length && (this.activeIDPrivacy ==  null) ) {
                        this.activeIDPrivacy = $('.pane-menu-menu-privacy-menu ul li a.active').attr("id");                                                
                    }

                    $('.pane-menu-menu-privacy-menu ul li a').removeClass('active');
                    $('#last-updated').css('display','none');
                   // $('.pane-menu-menu-privacy-menu .block-content ul').css('display','none');

                } else {

                    if ($('#mobile-privacy-menu').length != 0) {
                       // $('#mobile-privacy-menu').css('display','none'); //hide mobile menu                    
                    }

                    $('#last-updated').css('display','block');
                  //  $('.pane-menu-menu-privacy-menu .block-content ul').css('display','block'); //show desktop menu

                    if (this.activeIDPrivacy!=null) {
                        $('#'+this.activeIDPrivacy).addClass('active');
                    }
                }   
            } 

            if (this.isDynamicPrivacy) {
			
				$('body.page-taxonomy-term-privacy-policy .pane-nbcuni-custom-privacy-policy-taxonomy-privacy-policy-language .block-content ').css('width', $('body.page-taxonomy-term-privacy-policy .taxonomy-term-description').css('width'));
				
				$('body.page-taxonomy-term-privacy-policy .pane-nbcuni-custom-privacy-policy-taxonomy-privacy-policy-language .block-content ').css('padding-left', $('body.page-taxonomy-term-privacy-policy .taxonomy-term-description').css('padding-left'));
				$('body.page-taxonomy-term-privacy-policy .pane-nbcuni-custom-privacy-policy-taxonomy-privacy-policy-language .block-content ').css('padding-right', $('body.page-taxonomy-term-privacy-policy .taxonomy-term-description').css('padding-right'));
													

                if (NBC.GLOBAL.isMobile) {
                    if ( parseInt($('#page-title').css('height')) > 39 ) {
                        $('.pane-nbcuni-custom-privacy-policy-taxonomy-submenu').css('top', '-182px');
                    } else {
                        $('.pane-nbcuni-custom-privacy-policy-taxonomy-submenu').css('top', '');
                    }
                } else {
                    $('.pane-nbcuni-custom-privacy-policy-taxonomy-submenu').css('top', '');
                }

                if (!(NBC.GLOBAL.isMobile || NBC.GLOBAL.isTablet)) {
                    
                    if ($(window).width() >= 1280) {
                        $('body.privacy-custom .pane-nbcuni-custom-privacy-policy-taxonomy-submenu .block-content ul li.leaf').css('width', '220px');                        
                        $('body.privacy-custom .pane-nbcuni-custom-privacy-policy-taxonomy-submenu .block-content ul li.leaf').css('margin-right', '20px');
                        //$('.pane-menu-menu-privacy-menu h2.block-title').css('font-size', '36px');
                        //$('body.privacy .pane-menu-menu-privacy-menu .block-content ul li.leaf a').css('font-size', '0.625em');
                    } else {
                        $('body.privacy-custom .pane-nbcuni-custom-privacy-policy-taxonomy-submenu .block-content ul li.leaf').css('width', '170px');                        
                        $('body.privacy-custom .pane-nbcuni-custom-privacy-policy-taxonomy-submenu .block-content ul li.leaf').css('margin-right', '5px');
                        //$('.pane-menu-menu-privacy-menu h2.block-title').css('font-size', '30px');
                        //$('body.privacy .pane-menu-menu-privacy-menu .block-content ul li.leaf a' ).css('font-size', '0.5em');
                    }
                    if ($('.pane-nbcuni-custom-privacy-policy-taxonomy-submenu .block-content ul').css('display') !='block') $('.pane-nbcuni-custom-privacy-policy-taxonomy-submenu .block-content ul').css('display','block');
                } else {
                        if ($('.pane-nbcuni-custom-privacy-policy-taxonomy-submenu .block-content ul').css('display') !='none') $('.pane-nbcuni-custom-privacy-policy-taxonomy-submenu .block-content ul').css('display','none');
                        $('body.privacy-custom .pane-nbcuni-custom-privacy-policy-taxonomy-submenu .block-content ul li.leaf').css('width', 'inherit');
                        $('body.privacy-custom .pane-nbcuni-custom-privacy-policy-taxonomy-submenu .block-content ul li.leaf').css('margin-right', '0');                    

                }   

                if (NBC.GLOBAL.isMobile || NBC.GLOBAL.isTablet) {

                    if ($('#mobile-privacy-menu').length == 0) {                                                                    
                        var _active = $('.pane-nbcuni-custom-privacy-policy-taxonomy-submenu ul li a.active-trail').text();
                        $('.pane-nbcuni-custom-privacy-policy-taxonomy-submenu .block-inner h2.pane-title').after('<div id="mobile-privacy-menu"><span id="filter-text">FILTERED BY&nbsp;&nbsp;&nbsp;</span><a href="#" id="active-filter-text">'+_active+'</a><div class="arrow-down filter-arrow"></div></div>');    

                        $('#active-filter-text').click(function(e){
                            e.preventDefault();
                            $('.pane-nbcuni-custom-privacy-policy-taxonomy-submenu .block-content ul').fadeToggle('fast',function(){
                                if ($('.pane-nbcuni-custom-privacy-policy-taxonomy-submenu .block-content ul').is(":visible")) {
                                    $('.filter-arrow').removeClass('arrow-down');
                                    $('.filter-arrow').addClass('arrow-up');
                                } else {
                                    $('.filter-arrow').removeClass('arrow-up');
                                    $('.filter-arrow').addClass('arrow-down');
                                }
                            });        
                        });

                    } else {
                      //  $('#mobile-privacy-menu').css('display','block');
                    }

                    if ($('.pane-nbcuni-custom-privacy-policy-taxonomy-submenu ul li a.active').length && (this.activeIDPrivacy ==  null) ) {
                        this.activeIDPrivacy = $('.pane-nbcuni-custom-privacy-policy-taxonomy-submenu ul li a.active').attr("id");                                                
                    }

                    $('.pane-nbcuni-custom-privacy-policy-taxonomy-submenu ul li a').removeClass('active');
                    //$('#last-updated').css('display','none');
                   // $('.pane-menu-menu-privacy-menu .block-content ul').css('display','none');

                } else {

                    if ($('#mobile-privacy-menu').length != 0) {
                       // $('#mobile-privacy-menu').css('display','none'); //hide mobile menu                    
                    }

                    //$('#last-updated').css('display','block');
                  //  $('.pane-menu-menu-privacy-menu .block-content ul').css('display','block'); //show desktop menu

                    if (this.activeIDPrivacy!=null) {
                        $('#'+this.activeIDPrivacy).addClass('active');
                    }
                }   
            }


            if (NBC.GLOBAL.isMobile || NBC.GLOBAL.isTablet) {
                $('body.node-type-footer-pages .jquery_colorpicker_color_display').css('width', $(window).width() +'px');

            } else {

                if ($(window).width() >= 1280) {
                    $('body.node-type-footer-pages .jquery_colorpicker_color_display').css('width', '1280px');
                    //$('.field-name-field-hero-image').css('width', '1280px');
                } else {
                    $('body.node-type-footer-pages .jquery_colorpicker_color_display').css('width', $(window).width() +'px');
                    $('.field-name-field-hero-image').css('width',  $(window).width() +'px');
                }

            }
        },

        onScroll: function() {
        },
        onResize: function() {
            this.resizeContainer();
            this.centerSecondMenu();
        },
        onLoad: function() {
            
            if (this.isPrivacy) {
                if ($('body').hasClass('privacy-spanish')) {
                    $('.privacy .pane-menu-menu-privacy-menu .block-content ul li a.privacy-english').parent().remove();
                } else {
                    $('.privacy .pane-menu-menu-privacy-menu .block-content ul li a.privacy-spanish').parent().remove();
                }
            }
            if (this.isDynamicPrivacy) {
                if ($('body').hasClass('privacy-custom')) {
                   $('.privacy-custom .pane-nbcuni-custom-privacy-policy-taxonomy-submenu .block-content ul li a.privacy-english').parent().remove();
                }
			}

            this.resizeContainer();

        }     	
    };
});;
jQuery(document).ready(function($) {
	NBC.History = {

		init: function() {
			// Initialize History.js
		    var
		        History = window.History,
		        State = History.getState(),
		        $log = $('#log');

		    // Bind to State Change
		    History.Adapter.bind(window,'statechange',function(e){ // Note: We are using statechange instead of popstate
		        /*// Log the State
		        var State = History.getState(); // Note: We are using History.getState() instead of event.state
		        History.log('statechange:', State.data, State.title, State.url);*/
		        
		        // Newsroom Page Implementations
		        if(NBC.GLOBAL.newsroomPage) {
		        	if(NBC.GLOBAL.updateHistory) {
		        		NBC.Newsroom.makeAjaxCall(0, $.url().segment(2), $.url().segment(3));
		        		NBC.Newsroom.handleRightSidebar($.url().segment(2));
		        		NBC.Newsroom.handleTopMenu($.url().segment(2));
		        		$('.view-newsroom-menu.view-display-id-block .field-content').toggleClass('open');
		        		NBC.Newsroom.newsroomMenuUpdate();
		        		$.waypoints('refresh');
		        	}
		        }
		    });
		},

		setState: function(title, url) {
			History.pushState({state: NBC.GLOBAL.historyCount,rand:Math.random()}, title, url);
			NBC.GLOBAL.updateHistory = true;

            NBC.GLOBAL.historyCount++;
		},
	};

});;
/**
 * Created by alvaromena on 6/18/14.
 */

jQuery(document).ready(function ($) {
  NBC.Searchoverlay = {
    searchButtonMobile: null,
    searchButton: null,
    closeButton: null,
    searchOverlay: null,
    overlayActive: null,

    init: function () {
      this.searchButtonMobile = $('#block-nbcuni-responsive-menus-tablet-main-menu ul#tablet-main-nav li.search a');
      this.searchButton = $('#menu-556-1 a');
      this.searchTextfield = $('#edit-search-block-form--2');
      this.closeButton = $('.search-overlay-close');
      this.searchOverlay = $('#block-panels-mini-search-overlay');
      this.overlayActive = false;

      // Add display show and hide triggers
      this.clickActions();
      this.centerSearchOverlay();
      this.centerSecondMenu();

      this.adjustPageHeight();
    },

    adjustPageHeight: function() {
      if ($(window).height() > 500)
        $('.page-search #page').css('min-height', ($(window).height() - $('#footer').outerHeight()) +'px' );
      else
        $('.page-search #page').css('min-height','500px');
    },

    centerSearchOverlay: function() {
        if (!NBC.GLOBAL.isMobile && !NBC.GLOBAL.isTablet)  {
          var _window_width = $(window).width() + 18;
          var _left = (_window_width - 1280) / 2;
          $('#block-panels-mini-search-overlay').css('width', _window_width + 'px');
          if (_window_width>=1280) {
            $('#block-panels-mini-search-overlay').css('left','-' + _left + 'px');
          } else {
            $('#block-panels-mini-search-overlay').css('left','0');
          }

        } else {
           $('#block-panels-mini-search-overlay').css('width', '100%');
           $('#block-panels-mini-search-overlay').css('left','0');
        }
    },

    centerSecondMenu: function() {
        if (!NBC.GLOBAL.isMobile && !NBC.GLOBAL.isTablet)  {
            var _window_width = $(window).width();
            var _left = (_window_width - 1280) / 2;
            $('.page-search-site #main-content-header').css('position', 'relative');
            if (_window_width>=1280) {
                $('.page-search-site #main-content-header').css('width', _window_width + 'px');
                $('.page-search-site #main-content-header').css('left','-' + _left + 'px');
            } else {
                $('.page-search-site #main-content-header').css('left','0');
                $('.page-search-site #main-content-header').css('width', '100%');
            }
        } else {
                $('.page-search-site #main-content-header').css('width','100%');
                $('.page-search-site #main-content-header').css('left','0');
        }
		if (!NBC.GLOBAL.isMobile && !NBC.GLOBAL.isTablet)  {
                var _window_width = $(window).width();
                var _left = (_window_width - 1280) / 2;
                $('.panels-flexible-region-new-privacy_sub_menus').css('position', 'relative');
                if (_window_width>=1280) {
                    $('.panels-flexible-region-new-privacy_sub_menus').css('width', _window_width + 'px');
                    $('.panels-flexible-region-new-privacy_sub_menus').css('left','-' + _left + 'px');
                } else {
                    $('.panels-flexible-region-new-privacy_sub_menus').css('left','0');
                    $('.panels-flexible-region-new-privacy_sub_menus').css('width', $(window).width()+20);
                }
            } else {
                if (NBC.GLOBAL.isTablet) {
                    $('.panels-flexible-region-new-privacy_sub_menus').css('width',$(window).width()+20);
                    $('.panels-flexible-region-new-privacy_sub_menus').css('left','0');
                } else {
                    $('.panels-flexible-region-new-privacy_sub_menus').css('width','auto');
                    $('.panels-flexible-region-new-privacy_sub_menus').css('left','0');
                }
            }
    },

    onResize: function() {
        this.centerSearchOverlay();
        this.centerSecondMenu();
        this.adjustPageHeight();
        this.clickActions();
    },

    clickActions: function () {
      // Create reference to parent object
      var that = this;

      // Show search overlay
      this.searchButton.unbind("click").on('click', function (e) {
	    var scroll_pos = $(document).scrollTop();
        // Disable search button default anchor trigger
        e.preventDefault();
        //$('body').animate({ scrollTop: 0 }, 1000);
        $('html').css('overflow','hidden');
        if (that.overlayActive == false) {
		//console.log("In if part");
          //hide business menu if open
          $('#superfish-1 > .sf-item-7 > .sf-megamenu').find('.close').trigger('click');
          that.searchOverlay.stop().slideDown('slow', function(){
            that.searchTextfield.focus();
          });
          that.overlayActive = true;
        } else {
          //console.log("In else part");
		  $('html').css('overflow','visible');
          that.searchOverlay.stop().slideUp('slow');
          that.overlayActive = false;
          that.searchButtonMobile.removeClass('open');
        }
		if (!NBC.GLOBAL.isMobile && !NBC.GLOBAL.isTablet)  {
		  $('#block-panels-mini-search-overlay').css('top', scroll_pos + 80);		  
		}
      });

      // Show search overlay
      this.closeButton.click(function () {
        $('html').css('overflow','visible');
        if (that.overlayActive == true) {
          that.searchOverlay.stop().slideUp('slow');
          that.overlayActive = false;
          that.searchButtonMobile.removeClass('open');
        }
      });

      // Disable search button default anchor trigger
      this.searchButtonMobile.on('click', function (e) {
        e.preventDefault();
      });

      // Show search overlay
      this.searchButtonMobile.click(function () {
	    var scroll_pos = $(document).scrollTop();
        $('body').animate({ scrollTop: 0 }, 1000);
        if (that.overlayActive == false) {
          //hide hamburger menu if active
          if ($('.hamburger > a').hasClass('open'))
          $('.hamburger > a').trigger('click');

          that.searchButtonMobile.addClass('open');
          that.searchOverlay.stop().slideDown('slow', function(){
            that.searchTextfield.focus();
          });
          that.overlayActive = true;
        }
		$('#block-panels-mini-search-overlay').css('top', scroll_pos);
      });
    }
  }
});
;
jQuery(document).ready(function($) {
    NBC.BrandsDetail = {


		init: function() {
           // console.log('brands');
           this.centerBrandHeader();

           $('.node-personal-bio').each(function() {
            $(this).find('.field-name-title, .field-name-field-role').wrapAll('<div class="field-details" />');
           });

           /*if($('.view--brand-bio-list.view-display-id-block').length > 0) {
                var nid_list = new Array();

                // Get the node id list
                $('.view--brand-bio-list.view-display-id-block .views-row > a > div').each(function(index, el){
                    // console.log($(this).data('nid'));
                    nid_list[index] = $(this).data('nid');
                });

                // Change the URL based on the node id list
                var nextnid = '-2';
                var prevnid = '-2';
                // console.log(nid_list)
                $('.view--brand-bio-list.view-display-id-block .views-row > a').each(function(index, el){
                    // console.log(nid_list[index-1]+' '+nid_list[index+1]);

                    prevnid = nid_list[index-1];
                    nextnid = nid_list[index+1];

                    // Append next and prev IDs to bios
                    $(this).attr('href', $(this).attr('href')+'/'+prevnid+'/'+nextnid);
                });
           }*/
           
           this.onResize();
        },

        centerBrandHeader: function() {
           if ($('.layout-nbcuni-brands .spacer').length) {
              if ($(window).width() > 640) {
			    $('.layout-nbcuni-brands .spacer').attr('style', 'height:'+($(".vocabulary-brands").height()+140)+'px !important');
				$('.nbcuni-brands-detail .layout-nbcuni-brands .column-2 .layout-inner').css('margin-top',-($(".vocabulary-brands").height()+11));
				$('.layout-nbcuni-brands .column-1').css('margin-top',-($(".vocabulary-brands").height()+21));		
			  }
			  else {
				$('.nbcuni-brands-detail .layout-nbcuni-brands .column-2 .layout-inner').css('margin-top','');
			  }
			  if ($(window).width() >= 1280) {
                _left = (($(window).width() - 1280) / 2);
                $('.layout-nbcuni-brands .spacer').css('z-index','-1').css('position','relative').css('left', '-'+_left+'px').css('width', $(window).width()+'px');				
              } else {
                $('.layout-nbcuni-brands .spacer').css('z-index','-1').css('position','relative').css('width','100%').css('left', '0');
              }            
           }
        },

        updateSocialInstagramCard: function() {

            $('.field-name-social-icon span').each( function( index, el ) {
                if ($(el).hasClass('icon-instagram')) {
                    target_el = $(el).parent().parent().parent().parent().parent().find('.field-name-field-timestamp');
                    target_el.css('color','#ccc');
                    target_el.css('background', 'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPgogICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzAwMDAwMCIgc3RvcC1vcGFjaXR5PSIwIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMwMDAwMDAiIHN0b3Atb3BhY2l0eT0iMC42Ii8+CiAgPC9saW5lYXJHcmFkaWVudD4KICA8cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJ1cmwoI2dyYWQtdWNnZy1nZW5lcmF0ZWQpIiAvPgo8L3N2Zz4=)');
                    target_el.css('background', '-moz-linear-gradient(top,  rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)');
                    target_el.css('background', '-ms-linear-gradient(top,  rgba(0,0,0,0) 0%,rgba(0,0,0,1) 100%)');
                    target_el.css('background', '-o-linear-gradient(top,  rgba(0,0,0,0) 0%,rgba(0,0,0,1) 100%)');
                    target_el.css('background','linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 1) 100%) repeat scroll 0% 0% transparent;');
                    target_el.css('background', "progid:DXImageTransform.Microsoft.gradient( startColorstr='#00000000', endColorstr='#99000000',GradientType=0 )");
                }                
            });            
        },

        centerSocialCardIconsVertically: function() {
            $('.field-name-social-icon span').each( function( index, el ) {               
                target_el = $(el).parent().parent().parent().parent().parent().find('.field-name-field-timestamp');
                //console.log(target_el.find('.placeholder').text() + ' - ' + target_el.innerHeight());
                if (target_el.innerHeight() == 60) {
                    $(el).parent().parent().parent().parent().css('padding-bottom','20px');
                }
                if (target_el.innerHeight() == 45) {
                    $(el).parent().parent().parent().parent().css('padding-bottom','12px');
                }
                if (target_el.innerHeight() == 35) {
                    $(el).parent().parent().parent().parent().css('padding-bottom','7px');
                } 
                if (target_el.innerHeight() == 50) {
                    $(el).parent().parent().parent().parent().css('padding-bottom','13px');
                }                              
            });
        },
		
		adjustTwitterHeight: function() {
			if ($(window).width() > 640 ) {
				
				left_height = $('.nbcuni-brands-detail .layout-content-column.column-1 .layout-inner').outerHeight();
				
				visit_height = $('.nbcuni-brands-detail .layout-content-column.column-2 .pane-entity-view').outerHeight() + 20;
				
				title_height = $('.nbcuni-brands-detail .layout-content-column.column-2 .pane-nbcuni-social-cards-nbcuni-social-cards-block .ft_tabs .active').outerHeight();

				iframe_height = (left_height-visit_height-title_height);
				
				$('.nbcuni-brands-detail .layout-content-column.column-2 .pane-nbcuni-social-cards-nbcuni-social-cards-block iframe').height(iframe_height);
			}
			else {
				$('.nbcuni-brands-detail .layout-content-column.column-2 .pane-nbcuni-social-cards-nbcuni-social-cards-block iframe').css('height', '');
			}
		},


        onScroll: function() {
        },
        onResize: function() {
            this.centerSocialCardIconsVertically();
            this.centerBrandHeader();
			this.adjustTwitterHeight();
            //$('.node-personal-bio .field-details').equalHeights();
        },
        onLoad: function() {
			this.centerBrandHeader();
            this.updateSocialInstagramCard();
            this.centerSocialCardIconsVertically();
			this.adjustTwitterHeight();
        }     	
    };
});;
jQuery(document).ready(function ($) {
  NBC.GLOBAL = {
    body: null,

    // Window Dimensions
    viewportHeight: 0,
    viewportWidth: 0,
    documentHeight: 0,
    documentWidth: 0,

    // Breakpoints
    mobileBp: 641,
    tabletBp: 990,

    // Device Settings
    isTablet: false,
    isMobile: false,
    isDesktop: false,

    // User State
    loggedIn: false,

    // Is Homepage
    homePage: false,

    // Is Newsroom Page
    newsroomPage: false,

    // is Static Detail Page
    staticPage: false,

    // is Article Detail Page
    articlePage: false,

    // is Press Release
    pressReleasePage: false,

    // is Article Detail Page
    whoWeArePage: false,

    // is Article Detail Page
    responsibilityPage: false,

    // is Brands Detail Page
    brandsDetailPage: false,

    // is Our history Page
    ourHistoryPage: false,

    // history count
    historyCount: 0,
    updateHistory: false,

    init: function () {
      this.body = $('body');
      if (this.body.hasClass('logged-in')) this.loggedIn = true;
      if (this.body.hasClass('front')) this.homePage = true;
      if (this.body.hasClass('newsroom')) this.newsroomPage = true;
      if (this.body.hasClass('node-type-footer-pages')) this.staticPage = true;
	  if (this.body.hasClass('privacy-custom')) this.staticDynamicPage = true;
      if (this.body.hasClass('node-type-article')) this.articlePage = true;
      if (this.body.hasClass('press-release')) this.pressReleasePage = true;
      if (this.body.hasClass('page-who-we-are') || this.body.hasClass('nbcuni-brands-detail')) this.whoWeArePage = true;
      if (this.body.hasClass('page-responsibility')) this.responsibilityPage = true;
      if (this.body.hasClass('nbcuni-brands-detail')) this.brandsDetailPage = true;
      if (this.body.hasClass('page-our-history')) this.ourHistoryPage = true;
	  if (this.body.hasClass('page-values')) this.responsibilityPage = true;

      // Setters
      this.setViewportHeight();
      this.setViewportWidth();
      this.setDeviceType();

      // Used to fix header on android tabs
      this.andtab();

      // Initialize History
      NBC.History.init();

      // Initialize our global event listeners
      this.onScroll();
      this.onResize();
      this.onLoad();

      // Initialize other page JS files
      NBC.Nav.init();
      NBC.Searchoverlay.init();
      if (this.homePage) NBC.Home.init();
      if (this.newsroomPage) NBC.Newsroom.init();
      if (this.staticPage) NBC.Staticpage.init();
	  if (this.staticDynamicPage) NBC.Staticdynamicpage.init();
      if (this.articlePage) NBC.Articlepage.init();
      if (this.pressReleasePage) NBC.Pressrelease.init();
      if (this.whoWeArePage) NBC.Whoweare.init();
      if (this.responsibilityPage) NBC.Responsibility.init();
      if (this.brandsDetailPage) NBC.BrandsDetail.init();
      if (this.ourHistoryPage) NBC.Ourhistory.init();

      this.shareThisPopups();
      this.closeDropDownNavigation();

    },

    closeDropDownNavigation: function(){
      if (window.history && window.history.pushState) {
        $(window).on('popstate', function() {
          if( $('#tablet-main-nav .open').length ) {
            $('#tablet-main-nav .open').click();
          }
        });
      }
    },

    // Used to fix top nav on android tabs
    andtab: function(){
      var userAgentStrings = ['Mozilla/5.0 (Linux; U; Android 4.0.4; en-us; GT-P7510 Build/IMM76D) AppleWebkit/534.30 (KHTML, like GEcko) Version/4.0 Safari/534.30', 'Mozilla/5.0 (Linux; U; Android 2.2; en-us; SCH-I800 Build/FROYO) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1'];
      // if(userAgentStrings.indexOf(navigator.userAgent) == -1) $('#menu-bar').addClass('andtab');
    },

    //Allow to open shareThis as pop up
    shareThisPopups : function(){
      jQuery(document).ready(function(){
        if ( (typeof stlib) === 'undefined') return;
        stlib.sharer.share = function(e, a){
          var d = stlib.sharer.constructParamString();
          _$d_();
          _$d1("Initiating a Share with the following url:");
          _$d2(stlib.sharer.sharerUrl + d);
          if ((stlib.data.get("destination", "shareInfo") == "email") || (stlib.data.get("destination", "shareInfo") == "pinterest" && stlib.data.get("source", "shareInfo").match(/share4xmobile/) == null && stlib.data.get("source", "shareInfo").match(/share4xpage/) == null && stlib.data.get("source", "shareInfo").match(/5xpage/) == null && (stlib.data.get("image", "shareInfo") == false || stlib.data.get("image", "shareInfo") == null)) || stlib.data.get("destination", "shareInfo") == "snapsets" || stlib.data.get("destination", "shareInfo") == "copy" || stlib.data.get("destination", "shareInfo") == "plusone" || stlib.data.get("destination", "shareInfo").match(stlib.sharer.regAuto) || (typeof(stlib.nativeButtons) != "undefined" && stlib.nativeButtons.checkNativeButtonSupport(stlib.data.get("destination", "shareInfo"))) || (stlib.data.get("pinterest_native", "shareInfo") != false && stlib.data.get("pinterest_native", "shareInfo") != null)) {
              var b = new Image(1, 1);
              b.src = stlib.sharer.sharerUrl + d;
              b.onload = function() {
                  return;
              }
          } else {
              if (typeof(a) != "undefined" && a == true) {
                  window.open(stlib.sharer.sharerUrl + d, (new Date()).valueOf(), "scrollbars=1, status=1, height=480, width=640, resizable=1")
              } else {
                  window.open(stlib.sharer.sharerUrl + d, '_blank','height=450, width=550, top='+(jQuery(window).height()/2 - 225) +', left='+jQuery(window).width()/2 +', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0' );
              }
          }
          e ? e() : null;
        };
      });
    },
    // Set the device type based on our breakpoint rules
    setDeviceType: function () {
      if (this.viewportWidth >= this.tabletBp) {
        this.body.removeClass('is-tablet');
        this.body.removeClass('is-mobile');
        this.body.removeClass('mobile');
        this.body.addClass('is-desktop');
        this.isDesktop = true;
        this.isTablet = false;
        this.isMobile = false;
      }

      if (this.viewportWidth < this.tabletBp && this.viewportWidth >= this.mobileBp) {
        this.body.addClass('is-tablet');
        this.body.removeClass('is-mobile');
        this.body.removeClass('is-desktop');
        this.isDesktop = false;
        this.isTablet = true;
        this.isMobile = false;
      }

      if (this.viewportWidth < this.mobileBp) {
        this.body.addClass('is-mobile');
        this.body.removeClass('is-tablet');
        this.body.removeClass('is-desktop');
        this.isDesktop = false;
        this.isTablet = false;
        this.isMobile = true;
      }
    },

    // Global Event Listeners
    onScroll: function () {

    },

    onResize: function () {
      // Create the listener function
      var updateLayout = _.debounce(function (e) {
        NBC.GLOBAL.setViewportHeight();
        NBC.GLOBAL.setViewportWidth();
        NBC.GLOBAL.setDocumentHeight();

        // Set Device Type
        NBC.GLOBAL.setDeviceType();

        // Enable resize listener for Responsive Desktop Nav
        NBC.Nav.onResize();

        // Enable resize listener for Responsive Home page elements
        if (NBC.GLOBAL.homePage) NBC.Home.onResize();

        // Enable resize listener for Responsive Newsroom elements
        if (NBC.GLOBAL.newsroomPage) NBC.Newsroom.onResize();

        // Enable resize listener for Responsive Static detail page elements
        if (NBC.GLOBAL.staticPage) NBC.Staticpage.onResize();

        // Enable resize listener for Responsive Static detail page elements
        if (NBC.GLOBAL.staticDynamicPage) NBC.Staticdynamicpage.onResize();

        // Enable resize listener for Responsive Press release page elements
        if (NBC.GLOBAL.pressReleasePage) NBC.Pressrelease.onResize();

        if (NBC.GLOBAL.brandsDetailPage) NBC.BrandsDetail.onResize();

        // Enable resize listener for Responsibility page
        if (NBC.GLOBAL.responsibilityPage) NBC.Responsibility.onResize();

        // Enable resize listener for Article detail page
        if (NBC.GLOBAL.articlePage) NBC.Articlepage.onResize();

        // Enable resize listener for Who we are page
        if (NBC.GLOBAL.whoWeArePage) NBC.Whoweare.onResize();

        // Enable resize listener for Our history page
        if (NBC.GLOBAL.ourHistoryPage) NBC.Ourhistory.onResize();


        // Enable resize listener for search overlay
        NBC.Searchoverlay.onResize();

        // Resize bio overlay
        if($('.bio-overlay-profile').css('display') == "block") {
          var parentWidth = $('.bio-overlay-profile').parents('.row-top').width()
            , windowWidth = $(window).width()
            , width = '100%'
            , left = 0;

          if(parentWidth < windowWidth) {
            width = windowWidth;
            left = - ((windowWidth - parentWidth) / 2);
          }

          if($('body').hasClass('nbcuni-brands-detail')) {
            left = 0;
            width = '100%';
            if ($(window).width() >= 1280) {
              left = -(($(window).width() - 1280) / 2);
              width = $(window).width()+'px';
            }
          }

          $('.bio-overlay-profile').css({
            'width': width,
            'min-height': $('.bio-overlay-current').outerHeight(),
            'top': '0px',
            'left': left
          });
        }        

      }, 100); // Maximum run of once per 100 milliseconds

      // Add the event listener
      if (window.addEventListener) {
        window.addEventListener("resize", updateLayout, false);
      } else {
        window.attachEvent("resize", updateLayout);
      }
    },

    onLoad: function () {
      // This is our global window on load handler
      $(window).load(function () {
        NBC.GLOBAL.setDocumentHeight();

        // On Load events for the Nav
        NBC.Nav.onLoad();

        // OnLoad events for the home page
        if (NBC.GLOBAL.homePage) NBC.Home.onLoad();

        // OnLoad events for Static detail page
        if (NBC.GLOBAL.staticPage) NBC.Staticpage.onLoad();

        // OnLoad events for Static detail page
        if (NBC.GLOBAL.staticDynamicPage) NBC.Staticdynamicpage.onLoad();

        // OnLoad events for Static detail page
        if (NBC.GLOBAL.pressReleasePage) NBC.Pressrelease.onLoad();

        // OnLoad events for Newsroom page
        if (NBC.GLOBAL.newsroomPage) NBC.Newsroom.onLoad();

        if (NBC.GLOBAL.brandsDetailPage) NBC.BrandsDetail.onLoad();

        // OnLoad events for Responsibility page
        if (NBC.GLOBAL.responsibilityPage) NBC.Responsibility.onLoad();

        // OnLoad events for Who we are page
        if (NBC.GLOBAL.whoWeArePage) NBC.Whoweare.onLoad();

        // Enable resize listener for Article detail page
        if (NBC.GLOBAL.articlePage) NBC.Articlepage.onLoad();



        $('.share-on-twitter').live('click', function () {
          if($(this).parent().parent().parent().parent().parent().parent().parent().parent().parent().hasClass('pane-bean-diversity-inclusion-block-text')) 
            window.open($(this).prev('a').attr('href'), '_blank');
          else window.open($(this).prev('a').attr('href'), 'mywindow', 'width=400,height=500');
          return false;
        });

        $('.share-on-facebook').live('click', function () {
          if($(this).parent().parent().parent().parent().parent().parent().parent().parent().parent().hasClass('pane-bean-diversity-inclusion-block-text')) 
            window.open($(this).attr('href'), '_blank');
          else window.open($(this).attr('href'), 'mywindow', 'width=400,height=500');
          return false;
        });

        $('.share-on-google').live('click', function () {
          window.open($(this).attr('href'), 'mywindow', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
          return false;
        });

        $(".bio-overlay-content .bio-overlay-next").live('click', function(){
          $('.button-next a').click();
        });

        $(".bio-overlay-content .bio-overlay-prev").live('click', function(){
          $('.button-prev a').click();
        });
        $("#privacy_lang").chosen({
            disable_search_threshold: 10,
            width: "165px"
        });

        $('p')
          .filter(function() {
              return $.trim($(this).text()) === '' && $(this).children().length == 0
          })
          .remove();

          // NBC.GLOBAL.disableLatestLink();
        NBC.GLOBAL.setFooterPosition();
      });
    },

    // Helper Functions
    disableScroll: function () {
      this.body.addClass('no-scroll');
    },

    enableScroll: function () {
      this.body.removeClass('no-scroll');
    },

    setViewportHeight: function () {
      var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      if (NBC.GLOBAL.loggedIn) height -= 29;
      NBC.GLOBAL.viewportHeight = height;
    },

    setViewportWidth: function () {
      var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      NBC.GLOBAL.viewportWidth = width;
    },

    setDocumentHeight: function () {
      var body = document.body,
        html = document.documentElement;

      var height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
      NBC.GLOBAL.documentHeight = height;
    },

    disableLatestLink : function(){
      $('.views-field-topic a').each(function(index, element){
        var e = $(element);
        if ( e.text() == 'The Latest' ){
          e.attr('href', '#');
          e.on('click', function(e){ e.preventDefault(); return; });
        }
      });
    },
    setFooterPosition : function(){
        var footerPosition =  $('#footer').position();
        if(footerPosition.top<$(window).height()){
            //$('#footer').css('position', 'absolute');
            //$('#footer').css('bottom', '0px');
        }
    }
  };

  NBC.GLOBAL.init();
});
;
