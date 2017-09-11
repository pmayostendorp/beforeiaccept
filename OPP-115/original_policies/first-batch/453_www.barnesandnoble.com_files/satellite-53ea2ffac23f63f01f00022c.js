// FILE: helper functions 140714h dtm.js
// AUTHOR: Copyright 1996-2014 Adobe, Inc. All Rights Reserved
// DESCRIPTION: Helper functions for data layer
// UPDATED: 14.08.26
// USAGE:
// 1. Create a DTM Page Load Rule called "Helper Functions"
// 2. Make sure "Trigger rule at" is set to "Top of Page" under "Conditions"
// 3. Make sure "Execuite Globally" is checked
// 4. Under "Javascript/Third Party Tags", add a new script under "Sequential Javascript" called "Helper Functions"
// 5. Upload this file into the code window and check "Execute Globally"

/************************** preSlib v1.50 - General Helper Functions *************************/

var W=eval('window');

// preSlib enabler functions
if(!W.s_is)W.s_is=function(x){var t=x===null?'null':typeof x;if(t=='object'&&typeof x.length=='number')t='array';return t}
if(!W.s_isN)W.s_isN=function(x){return s_is(x)=='number'}
if(!W.s_isS)W.s_isS=function(x){return s_is(x)=='string'}
if(!W.s_MC)W.s_MC=function(a,c){try{if(s_isS(c))c=c=='lc'?-1:c=='uc'?1:0;if(!s_isN(c))c=c?1:0;a+='';a=c<0?a.toLowerCase(a):c>0?a.toUpperCase(a):a}catch(e){}return a}
if(!W.s_LC)W.s_LC=function(a){return s_MC(a,'lc')}
if(!W.s_UC)W.s_UC=function(a){return s_MC(a,'uc')}
if(!W.s_scrubWS)W.s_scrubWS=function(t){try{if(t==null)t='';t=t.replace(/^\s+/g,'').replace(/\s+$/g,'').replace(/\s+/g,' ')}catch(e){}return t}
if(!W.s_split)W.s_split=function(l,d){var i,x=0,a=new Array;if(!d)d=',';while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x++]=l.substring(0,i);l=l.substring(i+d.length)}return a}
if(!W.s_getHTMLtag)W.s_getHTMLtag=function(y){var a='',v='',g='',t='',f='',c='mc',p=arguments,l=p.length,i;if(!y)return f;if(l>1){i=s_LC(p[l-1]);if(i=='uc'||i=='lc'||i=='mc'){c=i;l--}}y=s_LC(y);if(l==2)g=s_LC(p[1]);else if(l>=3){a=s_LC(p[1]);v=s_MC(p[2],c);if(l>=4)g=s_MC(p[3],c)}if(document.getElementsByTagName)t=document.getElementsByTagName(y);if(typeof t!='object')return f;for(i=0;!f&&i<t.length;i++){f=t[i];if(a&&v&&s_MC(f.getAttribute(a),c)!=v)f=''}if(!f||typeof f!='object'||!g)return f;if(g!='text')return f.getAttribute(g);f=f.innerText||f.textContent||'';f=f.replace(/\s*>\s*/g,'>').replace(/^>+/,'').replace(/>+$/,'');return f}
if(!W.s_parseUri)W.s_parseUri=function(u){if(u){u=u+'';u=u.indexOf(':')<0&&u.indexOf('//')!=0?(u.indexOf('/')==0?'/':'//')+u:u}var u=u?u+'':window.location.href,e,a=document.createElement('a'),p='',r={};a.setAttribute('href',u);for(e in a)if(typeof a[e]=='string')r[e]=a[e];delete a;p=r.pathname||'';if(p.indexOf('/')!=0)r.pathname='/'+p;return r}
if(!W.s_indexOf)W.s_indexOf=function(t,s){var r;try{r=(s?s+'':'').indexOf(t)}catch(e){r=-1}return r}

// preSlib utilities
if(!W.s_getCharSet)W.s_getCharSet=function(){var v=s_getHTMLtag('meta','http-equiv','content-type','content'),i;if(!v)return'';i=v.indexOf('charset=');if(i==-1)return'';return s_UC(v.substring(i+8,99).replace(/[\'\";, ].*/,''))}
if(!W.s_getQueryStr)W.s_getQueryStr=function(n,u){var g,h,i,a='&',q=u||window.location.search,p=q.toLowerCase().replace(/\?/g,a)+a;n=a+n.toLowerCase();g=n+'=';h=p.indexOf(g);if(h>-1){i=h+g.length;return decodeURIComponent(q.substring(i,p.indexOf(a,i)).replace(/\+/g,' '))}g=n+a;return p.indexOf(g)>-1?' ':''}
if(!W.s_apl)W.s_apl=function(l,v,d,u){var m=0;if(!l)l='';if(u){var i,n,a=s_split(l,d);for(i=0;i<a.length;i++){n=a[i];m=m||(u==1?(n==v):(s_LC(n)==s_LC(v)))}}if(!m)l=l?l+d+v:v;return l}
if(!W.s_getShortHn)W.s_getShortHn=function(u){return s_LC(s_parseUri(u||window.location.href).hostname.replace(/^www-?[0-9]*\./i,''))}
if(!W.s_getOwnerHn)W.s_getOwnerHn=function(u){return s_LC(s_parseUri(u||window.location.href).hostname.replace(/^www[0-9]*\./i,'').replace(/\.(gov|edu|com|mil|org|net|int).*/,'').replace(/\.[a-z][a-z]$/,'').replace(/.*\./,''))}
if(!W.s_getTLDlevels)W.s_getTLDlevels=function(u){var h=s_parseUri(u||window.location.href).hostname;return h.match(RegExp("\\.co\\..{2}$","i"))||h.match(RegExp("\\.(gov|edu|com|mil|org|net|int)\\..{2}$","i"))?3:2}
if(!W.s_getCookieDomain)W.s_getCookieDomain=function(u){var h=s_parseUri(u||window.location.href).hostname,n=s_getTLDlevels(),a=s_split(h,'.'),i=a.length-n;for(h='';i<a.length;i++)h+='.'+a[i];return h}
if(!W.s_c_w)W.s_c_w=function(n,v,e,d){if(W.s&&typeof W.s=='object'&&W.s.c_w&&!d)return W.s.c_w(n,v,e);v+='';var t=v?0:-60;if(t){e=new Date;e.setTime(e.getTime()+(t*1e3))}if(n)document.cookie=n+'='+escape(v||'[[B]]')+'; path=/'+(d?'; domain='+d:'')+(e?';  expires='+e.toGMTString():'');return n?s_c_r(n)==v:0}
if(!W.s_c_r)W.s_c_r=function(n){if(W.s&&typeof W.s=='object'&&W.s.c_r)return W.s.c_r(n);var c=' '+document.cookie,i=c.indexOf(' '+n+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':unescape(c.substring(i+2+n.length,e<0?c.length:e));return v=='[[B]]'?'':v}
if(!W.s_c_d)W.s_c_d=function(n,e,p,d,s){document.cookie=n+'='+escape('[[B]]')+(p?'; path='+p:'')+(d?'; domain='+d:'')+(e?'; expires=Thu, 01 Jan 1970 00:00:01 GMT':'; max-age=0')+(s?'; secure':'')}
if(!W.s_getLoadTime)W.s_getLoadTime=function(){if(!window.s_loadT){var o=window.performance?performance.timing:0,a=o?o.requestStart:window.inHeadTS||0;s_loadT=a?Math.round(((o.domInteractive||new Date().getTime())-a)/100):''}return s_loadT}
if(!W.s_clog)W.s_clog=function(){try{var A='array',O='object',X='undefined',F='function',U='null',a=arguments,al=a.length,i,j,k,v,l='',o=l,e=l,c=l,x=0,d=0,z=0,p,p1=[],q,f0=1,f1=1,f2=1,f3=1,m=1<<16,T=function(z){var t=z===null?U:typeof z;if(t==A)t=O;return t},W=function(o){try{c+=o+'\n';if(window.s_Debug){if(T(s_debugW)!=O)s_debugW=window.open('','_debugWin','height=600,width=900,toolbar=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes');if(T(s_debugW)==O){if(T(s_debugD)!=O)s_debugD=s_debugW.document;if(T(s_debugD)==O){if(T(s_debugD.write)==F)s_debugD.write('<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN"><html><head><title>debugWin</title><style>* {font-family:Andale Mono,OCR A Extended,Consolas,monospace,serif;font-size:9pt;word-wrap:break-word;padding:0px} p {display:block;clear:both;margin:1px;width:100%;border:none;border-bottom:1px solid #dddddd;}</style></head><body>');if(T(s_debugD.write)==F)s_debugD.write('<p>'+o.replace(/[ \t]/g,'&nbsp;').replace(/\</gi,'&lt;').replace(/\>/gi,'&gt;').replace(/\n$/,'').replace(/\n/gi,'<br/>')+'</p>');if(T(s_debugW.scrollBy)==F)s_debugW.scrollBy(0,100)}}}else if(T(console.log)==F||T(console.log)==O)console.log('%s',o)}catch(e){}},B=function(v){v=v+'';var j,b,r,w,c,f=1;for(j=0;j<v.length;j++){b=v.substr(j,1);r=b=='\n';w=b<=' ';c=b<'A';if(r||(f&&c&&l.length>140)||(f&&l.length+v.substring(j).replace(/\n.*/,'').length>140)){o+=l;z+=o.length;if(o.length>9999){W(o);o=''}else o+='\n';l=r?'':'  ';x=!r;f=0}if(!r&&(!x||!w)){l+=b;x=f=0}}},P=function(v){var d=0,i,err=0,u=function(x,v){if(!f3&&d>0){B('\n');for(k=0;k<=d;k++)B(p1.length>k&&p1[k]&&T(p1[k])=='string'?p1[k]:'');if(arguments.length==1)B(' = ')}if(arguments.length<2){var t=T(x);if(t=='string')B("'"+x+"'");else if(t=='boolean')B(x?'true':'false');else if(t==F)B(F+'(){...}');else if(t==U)B(U);else if(t==X)B(X);else B(x+'')}else if(!f3)B((T(v)!='object'?'':T(v.length)=='number'?'[]':'{}'))},b=function(v){if(++d>99){d--;B(' !!!TOO DEEP TO DISPLAY!!!');return}var o=T(v)==O&&T(v.length)!='number',p,x,f=1,j=0;if(f3)B(o?'{':'[');for(p in v){j++;if(!f3)p1[d]=o?'.'+p:'['+p+']';else{B(f?'':',');if(o){B('\n');for(i=0;i<d;i++)B(' ')}}if(j>1000){B('/* ERROR! TRUNCATED: TOO LARGE */');err=1}if(!err){if(o&&f3)B(p+': ');x=v[p];if(T(x)==O)b(x);else u(x)}f=0}d--;if(f3){if(o){B('\n');for(i=0;i<d;i++)B(' ');B('}')}else B(']')}else if(j==0)u(x,v)};if(T(v)!=O)u(v);else b(v)},FN=function(c){var n='',v,j;try{if(c){c=c+'';if(!c.indexOf(F+' '))c=c.substring(9);j=c.indexOf('(');if(j>-1)c=c.substring(0,j);if(!c)c='anonymous';n=c}}catch(e){}return n};var cn='s_debug',dp=s_getQueryStr(cn);if(dp>''){dp=dp==' '?1:parseInt(dp)||0;s_c_w(cn,String(dp))}dp=s_c_r(cn);s_Debug=dp>''?parseInt(dp):window.s_Debug||0;for(i=0;i<al;i++){v=a[i];switch(v){case'-f':f0=0;break;case'+f':f0=1;break;case'+u':f1=1;break;case'-u':f1=0;break;case'+n':f2=1;break;case'-n':f2=0;break;case'+o':f3=1;break;case'-o':f3=0;break;case'arguments':v=arguments.callee.caller;for(j=v;j;j=j.caller)q=FN(j)+(q?'>'+q:'');B(q);P(v.arguments);break;case F:B(FN(arguments.callee.caller));break;case'stack':B(st());break;default:if(T(v)==O){for(p in v)if(z<m&&z>=0)if(isNaN(p))if(f3)B(p+'=');else p1[0]=p;P(v[p])}else B(v);break}B(' ')}o+=l;o=o.replace(/^[ \t]*\n/,'').replace(/[ \t\n]*$/,'');if(o)W(o)}catch(e){}return c}


/************************** DATA LAYER AND DTM SUPPORT SECTION *************************/

if(!Object.create){Object.create=function(o){var F=function(){};F.prototype=o;return new F()}}
if(!W.s_logS)W.s_logS=function(S){var W=window,A=W.$AAD||{},f=A.$logLevel||0;if(f<2)return;var w='pageName,pageType,channel,hier1,hier2,hier3,hier4,hier5,server,pageURL,referrer,visitorID,purchaseID,transactionID,events,products,zip,state,linkTrackVars,linkTrackEvents,linkURL,linkName,campaign,list1,list2,list3',x=w.split(','),l=0,o={},A=function(n){if(typeof S[n]!='undefined'&&S[n]!==null&&S[n]+'')o[n]=S[n]};if(!S||typeof S!='object')s_log(2,'ERROR: Adobe Analytics s object undefined.');else{for(i=0;i<x.length;i++)A(x[i]);for(i=1;i<76;i++)A('eVar'+i);for(i=1;i<76;i++)A('prop'+i);s_log(2,'-o',{'s':o})}}
if(!W.s_logE)W.s_logE=function(e,T){var W=window,A=W.$AAD||{},f=A.$logLevel,t='ERROR'+(T&&typeof T=='string'&&T?' in '+T:''),n=typeof e=='object'?(e.number||0)&0xffff:'',l='',m=e.message||e.description||'',d='',s='';if(typeof n=='number'){if(n)d=n+': ';if(e.name&&(f<2||(e.stack||'').indexOf(e.name)<0))d+=e.name;if(m&&(f<2||(e.stack||'').indexOf(m)<0))d+=(d?': ':'')+m;if(e.lineNumber)l+='Line '+e.lineNumber;if(e.columnNumber)l+=', Column'+e.columnNumber;if(e.fileName)l+=(l?' ':'')+'in '+e.fileName;if(e.stack&&f>=2)s=e.stack;s_log(0,t);if(d)s_log(0,d);if(l)s_log(0,l);if(s)s_log(0,s)}}
if(!W.s_log)W.s_log=function(l){var W=window,A=W.$AAD||{},f=A.$logLevel,n=[],i,v,t;if(W.s_clog&&(typeof f=='number'?f:0)>=l){n.push('-o');for(i=1;i<arguments.length;i++){v=arguments[i];t=typeof v;switch(t){case'object':n.push([v]);break;case'function':break;default:n.push(v);break}}s_clog.apply(this,n)}return''}
if(!W.s_logSep)W.s_logSep=function(n,c){if(!c)c='=';var t=function(n){return n<10?'0'+n:''+n},p=function(n){while(n-->0)o+=c},d=new Date(),o='';p(30);o+=' '+d.getFullYear()+'.'+t(d.getMonth()+1)+'.'+t(d.getDate())+' '+t(d.getHours())+':'+t(d.getMinutes())+':'+t(d.getSeconds())+'.'+t(parseInt(''+(d%1000)/10))+' ';p(30);s_log(n,o)}
if(!W.s_startTimer)W.s_startTimer=function(){var n=new Date().getTime();W=window,O='object',A=W.$AAD&&typeof W.$AAD==O?W.$AAD:{};A.$msTimer=n}
if(!W.s_stopTimer)W.s_stopTimer=function(){var n=new Date().getTime(),W=window,O='object',A=W.$AAD&&typeof W.$AAD==O?W.$AAD:{};var o=$AAD.$msTimer;A.$msTimer='';return o&&typeof o=='number'?n-o:0}
if(!W.s_getP)W.s_getP=function(p,t){var v,u,S='string',N='number',B='boolean';if(arguments.length>0){try{v=eval('window.'+p);if(arguments.length>1&&typeof t==S){try{switch(t){case S:v=v.String();if(typeof v!=t)v='';break;case N:v=typeof v==S||typeof v==B||typeof v==N?v.Number():Number('');break;case B:v=v.Boolean();break;default:v=u;break}}catch(e){v=u}}}catch(e){v=u}}return v}
if(!W.s_setP)W.s_setP=function(p,v){try{var o=window,r=new RegExp("\\[[\'\"]?([^\\]\'\"]+)[\'\"]?\\]"),i,a=arguments,l,e={name:'UserException'},I=function(v){return/^[0-9]+$/.test(v)?Number(v):v};s_log(4,'s_setP( "'+p+'" ,',v,')');if(a.length==2&&p&&typeof p=='string'){p=p.replace(/\[\]/g,'[@]');for(i=0;i<99&&p.match(r);i++)p=p.replace(r,'.$1');p=p.split('.');for(i=0,c=o;i<p.length-1;i++){a=I(p[i]);if(a=='@')a=o.length||0;if(typeof o[a]!='object'){n=I(p[i+1]);o[a]=n=='@'||!isNaN(n)?[]:{}}o=o[a]}a=I(p[i]);if(a=='@')a=o.length;o[a]=v}}catch(e){s_logE(e,'function s_setP('+(typeof p=='string'?'"'+p+'",':'?,')+(typeof v!='object'&&typeof v!='function'?v:'[object]')+')')}return v};


/************************** RAWSOFT CUSTOM FUNCTIONS *************************/

if(!W.r_injectImage)W.r_injectImage = function(url) {
    $('<img>').attr('src', url).attr('height', 1).attr('width', 1).attr('style', 'visibility:hidden;position:absolute;');
};

if(!W.r_injectScript)W.r_injectScript = function(url) {
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = url;
    $(document).find('body').append(s);
};

