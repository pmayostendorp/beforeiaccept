(function(){var a=function(){var n=this;var w="tracker.marinsm.com";var G="787kig22579";
var H=365;var y=[];var o=false;var d="";var F=5;var m=function(){var J=["mkwid","pcrid"];
return J};this.setClientId=function(J){G=J};this.activateAnonymizeIp=function(){o=true
};var D=function(){return G};this.setHost=function(J){w=J};var g=function(){return w
};this.setExpires=function(J){H=J};this.setDefaultSubDomain=function(J){d=J};var j=function(){var J=new Date();
J.setTime(J.getTime()+(H*24*60*60*1000));return"; expires="+J.toUTCString()};var C=function(){var J=new Date();
return J.getTimezoneOffset()/60};var c=function(J){return(typeof J==="function")||(!!J&&typeof J!="string"&&!J.nodeName&&J.constructor!=Array&&/^[\s[]?function/.test(J+""))
};var e=function(K,J){if(!K){return""}var L=encodeURIComponent;if(c(L)){return J?encodeURI(K):L(K)
}return escape(K)};this.trackPage=function(){if(t()){var J=window.location.protocol+"//"+g()+"/tp?act=1&cid="+e(D())+"&tz="+e(C())+"&ref="+e(document.referrer)+"&page="+e(window.location);
if(u()){J+="&uuid="+e(x())}else{J+="&uuid="+e(I())}if(o){J+="&anonymizeIp=set"}h(J)
}};var t=function(){var J=q(window.location.toString())||q(document.referrer)||!s(document.referrer,window.location.toString());
if(!u()){v("_msuuid",I())}return J};var s=function(K,J){var M=/^([^:]*:\/\/)?([^:]*:[^@]*@)?([^\/:\?]*\.[^\/:\?]*)?(:[^\/]*)?(\/[^?#]*)?(\?[^#]*)?(#.*)?$/i;
try{return K.match(M)[3]==J.match(M)[3]}catch(L){}return false};var k=function(J){var K=J.indexOf("/","https://".length);
var L=J.indexOf("?","https://".length);if(K>=0){return J.substring(K+1)}else{if(L>=0){return J.substring(L+1)
}}return""};var f=function(J,K){var L=k(K);if(L.length>0){var M=new RegExp("\\W"+J+"\\W");
return M.test(L)}return false};var q=function(M){if(M==null||M==""){return false}var K=m();
for(var L=0,J=K.length;L<J;L++){if(f(K[L],M)){return true}}return false};this.addTrans=function(J){if(J!=null){y.push(J)
}};this.processOrders=function(){for(var K=0;K<y.length;++K){var J=l(y[K]);h(J)}};
var l=function(M){var L=r(M);var K=window.location.protocol+"//"+g()+"/tp?act=2&cid="+e(D())+"&tz="+e(C())+"&trans="+e(L)+"&ref="+e(document.referrer)+"&page="+e(window.location);
var J=i(M);if(J!=null){K=K+"&currency="+e(J)}if(u()){K+="&uuid="+e(x())}else{K+="&uuid="+e(I())
}if(o){K+="&anonymizeIp=set"}return K};var r=function(Q){var O="";var L=Q.orderId;
if(typeof Q.items!="undefined"){var M=Q.items;try{for(var N=0,K=M.length;N<K;++N){O+=E(M[N],L)
}}catch(P){}}var J=(O==="");O=B(Q,J)+O;return O};var B=function(O,K){var J=["orderId","affiliation","total","tax","shipping","city","state","country"];
var L=["UTM:T"];var N=false;for(var M=0;M<J.length;++M){if(typeof O[J[M]]!="undefined"){L.push(O[J[M]]);
N=true}else{L.push("")}}return(N||K)?L.join("|")+"\n":""};var E=function(N,J){var P=["convType","product","category","price","quantity"];
var K=["UTM:I"];var M=N.orderId||J||"";K.push(M);var O=false;for(var L=0;L<P.length;
++L){if(typeof N[P[L]]!="undefined"){K.push(N[P[L]]);O=true}else{K.push("")}}return O?K.join("|")+"\n":""
};var i=function(J){if(typeof J.currency=="undefined"){return null}return J.currency
};var A=function(J){var O=null;if(document.cookie&&document.cookie!=""){var M=document.cookie.split(";");
for(var L=0;L<M.length;L++){var K=M[L];K=K.replace(/^\s+/,"");var N=J+"_"+D();if((K.substring(0,N.length+1))==(N+"=")){O=decodeURIComponent(K.substring(N.length+1));
break}}}return O};this.getHostName=function(){return window.location.hostname};this.writeCookie=function(J,K,M){var L=J+"_"+D();
if(M){document.cookie=L+"="+e(K)+";domain="+M+";path=/"+j()}else{document.cookie=L+"="+e(K)+";path=/"+j()
}};this.writeAndTestCookie=function(J,K,L){this.writeCookie(J,K,L);if(!A(J)){return false
}return true};var v=function(K,N){var M=false;if(!d){var O=b.getHostName().split(".");
for(var L=2;L<=F;L++){var J=O.slice(-L,O.length);var P="."+J.join(".");if(b.writeAndTestCookie(K,N,P)){M=true;
break}}}else{M=b.writeAndTestCookie(K,N,d)}if(!M){b.writeCookie(K,N)}};this.setCookie=v;
var p=function(){};this.registerCallback=function(J){if(typeof J==="function"){p=J
}};var h=function(J){var L=J+"&rnd="+Math.round(Math.random()*2147483647);var K=new Image(1,1);
K.src=L;K.onload=function(){K.onload=null;p(this)}};var x=function(){return A("_msuuid")
};var u=function(){var J=x();return(J!=null&&J.length>0)};var I=function(){var P="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
var O=P,M=[],K=Math.random;var L=O.length;var N;M[8]=M[13]=M[18]=M[23]="-";M[14]="4";
for(var J=0;J<36;J++){if(!M[J]){N=0|K()*16;M[J]=O[(J==19)?(N&3)|8:N&15]}}return M.join("")
};var z=function(J){try{return n[J[0]].apply(n,J.slice(1))}catch(K){}};this.execQueue=function(){var J=window._mTrack||[];
while(J.length>0){var K=J.shift();z(K)}};return this};var b=new a();if(typeof window._mTrack=="undefined"){window._mTrack=[]
}window._mTrack.push=function(c){Array.prototype.push.apply(window._mTrack,arguments);
b.execQueue()};b.execQueue();return b})();