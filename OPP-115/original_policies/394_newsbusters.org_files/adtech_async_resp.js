/*
 * IMK Responsive code
 */
document.write("<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, maximum-scale=1\">");
function getViewPort()
{
    var screenWidth, screenHeight;
    if ( typeof window.innerWidth == 'number' )
    {
        screenWidth = window.innerWidth;
        screenHeight = window.innerHeight;
    } else if ( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) )
    {
        screenWidth = document.documentElement.clientWidth;
        screenHeight = document.documentElement.clientHeight;
    } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
        screenWidth = document.body.clientWidth;
        screenHeight = document.body.clientHeight;
    }
    return { width: screenWidth, height: screenHeight };
}

function getTagInfo()
{
    window.groupId = window.groupId == undefined ? Math.round( Math.random() * 1000 ) : window.groupId;
    var viewPort = getViewPort();
    var alias = viewPort.width < 728 ? 'mobile' : ( viewPort.width >= 728 && viewPort.width <= 1006 ? 'tablet' : 'display' );
    var domain = alias == 'mobile' ? 'a' : ( alias == 'tablet' ? 'a' : 'adserver' );
    return { domain: domain, alias: alias, groupId: groupId, viewPort: viewPort }
}

function getTagInfo2()
{
    window.groupId = window.groupId == undefined ? Math.round( Math.random() * 1000 ) : window.groupId;
    var viewPort = getViewPort();
    var alias = viewPort.width < 728 ? 'mobile' : ( viewPort.width >= 728 && viewPort.width <= 1006 ? 'display' : 'display' );
    var domain = alias == 'mobile' ? 'a' : ( alias == 'display' ? 'a' : 'adserver' );
    return { domain: domain, alias: alias, groupId: groupId, viewPort: viewPort }
}

/*
 * An html parser written in JavaScript
 * Based on http://ejohn.org/blog/pure-javascript-html-parser/
 */
(function(){function e(a,c){a=a||"";c=c||{};for(var j in g)g.hasOwnProperty(j)&&(c.autoFix&&(c["fix_"+j]=!0),c.fix=c.fix||c["fix_"+j]);var n={comment:/^\x3c!--/,endTag:/^<\//,atomicTag:/^<\s*(script|style|noscript|iframe|textarea)[\s>]/i,startTag:/^</,chars:/^[^<]/},e={comment:function(){var b=a.indexOf("--\x3e");if(0<=b)return{content:a.substr(4,b),length:b+3}},endTag:function(){var b=a.match(t);if(b)return{tagName:b[1],length:b[0].length}},atomicTag:function(){var b=e.startTag();if(b){var d=a.slice(b.length); if(d.match(RegExp("</\\s*"+b.tagName+"\\s*>","i"))&&(d=d.match(RegExp("([\\s\\S]*?)</\\s*"+b.tagName+"\\s*>","i"))))return{tagName:b.tagName,attrs:b.attrs,content:d[1],length:d[0].length+b.length}}},startTag:function(){var b=a.match(u);if(b){var d={};b[2].replace(v,function(b,a,c,j,f){b=c||j||f||w.test(a)&&a||null;d[a]=b});return{tagName:b[1],attrs:d,unary:!!b[3],length:b[0].length}}},chars:function(){var b=a.indexOf("<");return{length:0<=b?b:a.length}}},h=function(){for(var b in n)if(n[b].test(a)){p&& console.log("suspected "+b);var d=e[b]();return d?(p&&console.log("parsed "+b,d),d.type=d.type||b,d.text=a.substr(0,d.length),a=a.slice(d.length),d):null}};if(c.fix){var l=/^(AREA|BASE|BASEFONT|BR|COL|FRAME|HR|IMG|INPUT|ISINDEX|LINK|META|PARAM|EMBED)$/i,x=/^(COLGROUP|DD|DT|LI|OPTIONS|P|TD|TFOOT|TH|THEAD|TR)$/i,f=[];f.last=function(){return this[this.length-1]};f.lastTagNameEq=function(b){var a=this.last();return a&&a.tagName&&a.tagName.toUpperCase()===b.toUpperCase()};f.containsTagName=function(b){for(var a= 0,c;c=this[a];a++)if(c.tagName===b)return!0;return!1};var q=function(b){b&&"startTag"===b.type&&(b.unary=l.test(b.tagName)||b.unary);return b},m=h,r=function(){a="</"+f.pop().tagName+">"+a},s={startTag:function(b){var d=b.tagName;"TR"===d.toUpperCase()&&f.lastTagNameEq("TABLE")?(a="<TBODY>"+a,k()):c.fix_selfClose&&x.test(d)&&f.containsTagName(d)?f.lastTagNameEq(d)?r():(a="</"+b.tagName+">"+a,k()):b.unary||f.push(b)},endTag:function(b){f.last()?c.fix_tagSoup&&!f.lastTagNameEq(b.tagName)?r():f.pop(): c.fix_tagSoup&&(m(),k())}},k=function(){var b=a,d=q(m());a=b;if(d&&s[d.type])s[d.type](d)},h=function(){k();return q(m())}}return{append:function(b){a+=b},readToken:h,readTokens:function(b){for(var a;(a=h())&&!(b[a.type]&&!1===b[a.type](a)););},clear:function(){var b=a;a="";return b},rest:function(){return a},stack:[]}}var g=function(){var a={},c=this.document.createElement("div");c.innerHTML="<P><I></P></I>";a.tagSoup="<P><I></P></I>"!==c.innerHTML;c.innerHTML="<P><i><P></P></i></P>";a.selfClose= 2===c.childNodes.length;return a}(),u=/^<([\-A-Za-z0-9_]+)((?:\s+[\w\-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,t=/^<\/([\-A-Za-z0-9_]+)[^>]*>/,v=/([\-A-Za-z0-9_]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g,w=/^(checked|compact|declare|defer|disabled|ismap|multiple|nohref|noresize|noshade|nowrap|readonly|selected)$/i,p=!1;e.supports=g;e.tokenToString=function(a){var c={comment:function(a){return"<--"+a.content+"--\x3e"},endTag:function(a){return"</"+ a.tagName+">"},atomicTag:function(a){console.log(a);return c.startTag(a)+a.content+c.endTag(a)},startTag:function(a){var c="<"+a.tagName,e;for(e in a.attrs)var h=a.attrs[e],c=c+(" "+e+'="'+(h?h.replace(/(^|[^\\])"/g,'$1\\"'):"")+'"');return c+(a.unary?"/>":">")},chars:function(a){return a.text}};return c[a.type](a)};e.escapeAttributes=function(a){var c={},e;for(e in a){var g=a[e];c[e]=g&&g.replace(/(^|[^\\])"/g,'$1\\"')}return c};for(var l in g)e.browserHasFlaw=e.browserHasFlaw||!g[l]&&l;this.htmlParser= e})();
/* 
 * postscribe.js 1.1.2
 * (c) 2012 Krux
 * postscribe is freely distributable under the MIT license.
 * For all details and documentation:
 * http://krux.github.com/postscribe
 */
(function(){function j(){}function q(a,c,b){var d,e=a&&a.length||0;for(d=0;d<e;d++)c.call(b,a[d],d)}function m(a,c,b){for(var d in a)a.hasOwnProperty(d)&&c.call(b,d,a[d])}function h(a,c){m(c,function(b,c){a[b]=c});return a}function u(a){try{return v.call(a)}catch(c){var b=[];q(a,function(a){b.push(a)});return b}}var l=this;if(!l.postscribe){var v=Array.prototype.slice,g=function(a,c,b){var d=n+c;if(2===arguments.length)return d=a.getAttribute(d),null==d?d:String(d);null!=b&&""!==b?a.setAttribute(d, b):a.removeAttribute(d)},e=function(a,c){var b=a.ownerDocument;h(this,{root:a,options:c,win:b.defaultView||b.parentWindow,doc:b,parser:l.htmlParser("",{autoFix:!0}),actuals:[a],proxyHistory:"",proxyRoot:b.createElement(a.nodeName),scriptStack:[],writeQueue:[]});g(this.proxyRoot,"proxyof",0)},n="data-ps-";e.prototype.write=function(){[].push.apply(this.writeQueue,arguments);for(var a;!this.deferredRemote&&this.writeQueue.length;)a=this.writeQueue.shift(),"function"===typeof a?this.callFunction(a): this.writeImpl(a)};e.prototype.callFunction=function(a){var c={type:"function",value:a.name||a.toString()};this.onScriptStart(c);a.call(this.win,this.doc);this.onScriptDone(c)};e.prototype.writeImpl=function(a){this.parser.append(a);var c;for(a=[];(c=this.parser.readToken())&&!/^script$/i.test(c.tagName);)a.push(c);this.writeStaticTokens(a);c&&this.handleScriptToken(c)};e.prototype.writeStaticTokens=function(a){a=this.buildChunk(a);if(a.actual)return a.html=this.proxyHistory+a.actual,this.proxyHistory+= a.proxy,this.proxyRoot.innerHTML=a.html,this.walkChunk(),a};e.prototype.buildChunk=function(a){var c=this.actuals.length,b=[],d=[],e=[];q(a,function(a){b.push(a.text);if(a.attrs){if(!/^noscript$/i.test(a.tagName)){var f=c++;d.push(a.text.replace(/(\/?>)/," "+n+"id="+f+" $1"));"ps-script"!==a.attrs.id&&e.push("atomicTag"===a.type?"":"<"+a.tagName+" "+n+"proxyof="+f+(a.unary?"/>":">"))}}else d.push(a.text),e.push("endTag"===a.type?a.text:"")});return{tokens:a,raw:b.join(""),actual:d.join(""),proxy:e.join("")}}; e.prototype.walkChunk=function(){for(var a,c=[this.proxyRoot];null!=(a=c.shift());){var b=1===a.nodeType;if(!b||!g(a,"proxyof"))b&&(this.actuals[g(a,"id")]=a,g(a,"id",null)),(b=a.parentNode&&g(a.parentNode,"proxyof"))&&this.actuals[b].appendChild(a);c.unshift.apply(c,u(a.childNodes))}};e.prototype.handleScriptToken=function(a){var c=this.parser.clear();c&&this.writeQueue.unshift(c);a.src=a.attrs.src||a.attrs.SRC;if(a.src&&this.scriptStack.length)this.deferredRemote=a;else this.onScriptStart(a);var b= this;this.writeScriptToken(a,function(){b.onScriptDone(a)})};e.prototype.onScriptStart=function(a){a.outerWrites=this.writeQueue;this.writeQueue=[];this.scriptStack.unshift(a)};e.prototype.onScriptDone=function(a){a!==this.scriptStack[0]?this.options.error({message:"Bad script nesting or script finished twice"}):(this.scriptStack.shift(),this.write.apply(this,a.outerWrites),!this.scriptStack.length&&this.deferredRemote&&(this.onScriptStart(this.deferredRemote),this.deferredRemote=null))};e.prototype.writeScriptToken= function(a,c){var b=this.buildScript(a);a.src&&(b.src=a.src,this.scriptLoadHandler(b,c));try{this.insertScript(b),a.src||c()}catch(d){this.options.error(d),c()}};e.prototype.buildScript=function(a){var c=this.doc.createElement(a.tagName);m(a.attrs,function(a,d){c.setAttribute(a,d)});a.content&&(c.text=a.content);return c};e.prototype.insertScript=function(a){this.writeImpl('<span id="ps-script"/>');var c=this.doc.getElementById("ps-script");c.parentNode.replaceChild(a,c)};e.prototype.scriptLoadHandler= function(a,c){function b(){a=a.onload=a.onreadystatechange=a.onerror=null;c()}var d=this.options.error;h(a,{onload:function(){b()},onreadystatechange:function(){/^(loaded|complete)$/.test(a.readyState)&&b()},onerror:function(){d({message:"remote script failed "+a.src});b()}})};var r,s=function(){var a=p.shift();a&&(a.stream=x.apply(null,a))},x=function(a,c,b){function d(a){a=b.beforeWrite(a);f.write(a);b.afterWrite(a)}f=new e(a,b);f.id=y++;f.name=b.name||f.id;t.streams[f.name]=f;var k=a.ownerDocument, w={write:k.write,writeln:k.writeln};h(k,{write:d,writeln:function(a){d(a+"\n")}});var g=f.win.onerror||j;f.win.onerror=function(a,c,d){b.error({msg:a+" - "+c+":"+d});g.apply(f.win,arguments)};f.write(c,function(){h(k,w);f.win.onerror=g;b.done();f=null;s()});return f},t=function(a,c,b){"function"===typeof b&&(b={done:b});var d=b;b={done:j,error:function(a){throw a;},beforeWrite:function(a){return a},afterWrite:j};d=d||{};m(b,function(a,b){null==d[a]&&(d[a]=b)});b=d;a=/^#/.test(a)?l.document.getElementById(a.substr(1)): a.jquery?a[0]:a;var e=[a,c,b];a.postscribe={cancel:function(){e.stream?e.stream.abort():e[1]=j}};p.push(e);f||s();return a.postscribe},y=0,p=[],f=null;r=h(t,{streams:{},queue:p,WriteStream:e});l.postscribe=r}})();
/*
 * ADTECH.loadAd - Asynchronously loads an ad into a specified html target.
 * (c) 2014 AOL Advertising. 
 * @param id ID value of the container where ad will be displayed.
 * @param url ADTECH addyn tag URL.
 * @param config {}
 *     complete:  A function that is called when loading is complete.
 *     fif: Boolean  Forces ad to be served in a dynamically generated fif.
 */
if (window.adgroupid == undefined ) { window.adgroupid = Math.round(Math.random()*1000); } 
var ADTECH = ADTECH || {};
ADTECH.loadAd=function(c,b,d){
	var a=document.getElementById(c);
	a.innerHTML="";d&&!0===d.fif?ADTECH.setupFif(c,b,d):postscribe(a,'<script type="text/javascript" src="'+b+'">\x3c/script>',{done:d&&d.complete?d.complete:null})}; ADTECH.setupFif=function(c,b,d){var a=document.createElement("iframe");a.seamless="seamless";a.id=c+"_frame";a.name=c+"_frame";a.style.border="0px";a.scrolling="no";a.frameborder=0;a.width=1;a.height=1;a.allowtransparency=!0;a.setAttribute("allowFullScreen","true");a.setAttribute("mozallowFullScreen","true");a.setAttribute("webkitAllowFullScreen","true");document.getElementById(c).appendChild(a);c='<body><style>body,html,td#ath{margin:0;padding:0;}</style><table border="0"><tr><td id="ath"><script>var inFiF=inDapIF=true;\x3c/script><script src="'+ b+"?rand="+(new Date).getTime()+'">\x3c/script></td></tr></table></body>';a.contentWindow.document.open();a.contentWindow.document.write(c);a.contentWindow.document.close();ADTECH.renderFif(a,d)};ADTECH.renderFif=function(c,b){function d(a,d){c.width=a;c.height=d;b&&b.complete&&b.complete()}var a=b&&b.width?b.width:1,e=b&&b.height?b.height:1;1>=a||1>=e?c.contentWindow.document.body.onload=function(){var a=c.contentWindow.document.getElementById("ath");d(a.offsetWidth,a.offsetHeight)}:d(a,e)
	};
		
	ADTECH.loadAdFeedback=function(c,b,d,title,width){
	var a=document.getElementById(c);
	a.innerHTML="";d&&!0===d.fif?ADTECH.setupFif(c,b,d):postscribe(a,'<script type="text/javascript" src="'+b+'">\x3c/script><script type="text/javascript" src="http://cdn.intermarkets.net/u/Intermarkets/AdFeedback/processAdFeedback.js"></script><table width="'+width+'"border="0"><td align="center"><b><center><font face="Arial, Helvetica, sans-serif" style="font-size:10px"><script type="text/javascript">loadAdVals("'+title+'",'+c+');</script></font></center></b></td></table>',{done:d&&d.complete?d.complete:null})}; ADTECH.setupFif=function(c,b,d){var a=document.createElement("iframe");a.seamless="seamless";a.id=c+"_frame";a.name=c+"_frame";a.style.border="0px";a.scrolling="no";a.frameborder=0;a.width=1;a.height=1;a.allowtransparency=!0;a.setAttribute("allowFullScreen","true");a.setAttribute("mozallowFullScreen","true");a.setAttribute("webkitAllowFullScreen","true");document.getElementById(c).appendChild(a);c='<body><style>body,html,td#ath{margin:0;padding:0;}</style><table border="0"><tr><td id="ath"><script>var inFiF=inDapIF=true;\x3c/script><script src="'+ b+"?rand="+(new Date).getTime()+'">\x3c/script></td></tr></table></body>';a.contentWindow.document.open();a.contentWindow.document.write(c);a.contentWindow.document.close();ADTECH.renderFif(a,d)};ADTECH.renderFif=function(c,b){function d(a,d){c.width=a;c.height=d;b&&b.complete&&b.complete()}var a=b&&b.width?b.width:1,e=b&&b.height?b.height:1;1>=a||1>=e?c.contentWindow.document.body.onload=function(){var a=c.contentWindow.document.getElementById("ath");d(a.offsetWidth,a.offsetHeight)}:d(a,e)
	//document.write("<script type=\"text\/javascript\" src=\"processAdFeedback.js\"><\/script>");

	};