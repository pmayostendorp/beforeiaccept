if(typeof GraniteClientLibraryManager=="undefined"){GraniteClientLibraryManager={debug:false,scripts:{},initialInclude:true,windowLoaded:false,contextPath:null,hook:null,channelCB:function(){return""
},setChannelCB:function(a){this.channelCB=a
},isDebug:function(b){var a=document.location.href;
return(typeof console!="undefined")&&(b||this.debug)&&a.indexOf("debugConsole=true")!=-1
},write:function(a,c){c=this.isDebug(c);
var e=this.channelCB();
if(!e){e="default"
}if(c){console.log("LibraryManager: detected channel: "+e)
}for(var d=0;
d<a.length;
d++){var b=a[d];
if(!this.scripts[b.p]){this.scripts[b.p]=b;
if(c){console.log("LibraryManager: processing script",b.p,b)
}if(this.isIncluded(e,b.c,c)){this.includeScript(b.p,c)
}}}},isIncluded:function(h,a,b){if(a.length==0){if(b){console.log("LibraryManager: ...accepted. no channels defined")
}return true
}var g="!"+h;
var f=false;
var e=0;
for(var d=0;
d<a.length;
d++){var i=a[d];
if(i.charAt(0)=="!"){if(i==g){if(b){console.log("LibraryManager: ...rejected. channel excluded: ",i)
}return false
}}else{if(i==h){if(b){console.log("LibraryManager: ...accepted. channel included: ",i)
}f=true
}e++
}}if(e==0){if(b){console.log("LibraryManager: ...accepted. no more channels after exclusion ")
}f=true
}if(!f&&b){console.log("LibraryManager: ...rejected.")
}return f
},includeScript:function(path,debug){var ext=path;
var idx=ext.indexOf("?");
if(idx>0){ext=ext.substring(0,idx)
}ext=ext.substring(ext.lastIndexOf(".")+1);
if(this.initialInclude){this.initialInclude=false;
if(typeof G_XHR_HOOK!="undefined"&&Object.prototype.toString.call(G_XHR_HOOK)==="[object Function]"){this.hook=G_XHR_HOOK
}this.contextPath=this.detectContextPath();
var man=this;
if(window.addEventListener){window.addEventListener("load",function(){man.windowLoaded=true
},false)
}else{if(window.attachEvent){window.attachEvent("onload",function(){man.windowLoaded=true
})
}}}if(this.hook){var p={url:path,method:"GET"};
try{var out=this.hook(p);
if(out){path=out.url
}}catch(e){if(debug){console.log("LibraryManager: error during CQ_XHR_HOOK call: ",e.message)
}}}if(this.contextPath){if(path.indexOf("/")==0&&path.indexOf(this.contextPath+"/")!=0){path=this.contextPath+path
}}if(ext=="js"){if(debug){console.log("LibraryManager: --> writing js include: ",path)
}if(this.windowLoaded){try{var request=document.all?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest();
request.open("GET",path,false);
request.send(null);
if(window.execScript){window.execScript(request.responseText)
}else{eval.call(null,request.responseText)
}}catch(err){if(debug){console.log("LibraryManager: --> evaluating js include failed: ",path)
}}}else{document.writeln('<script src="'+path+'" type="text/javascript"><\/script>')
}}else{if(ext=="css"){var head=document.getElementsByTagName("head")||document.getElementsByTagName("*");
head=head[0];
var n=document.createElement("link");
n.type="text/css";
n.rel="stylesheet";
n.href=path;
head.appendChild(n);
if(debug){console.log("LibraryManager: --> writing css include: ",path)
}}else{if(debug){console.log("LibraryManager: --> unsupported extension: ",path)
}}}},detectContextPath:function(){var a=document.getElementsByTagName("script");
var c=/\/etc\/clientlibs\/foundation\/librarymanager\/*\.js$/;
for(var b=0;
b<a.length;
b++){var d=a[b].src;
if(d.indexOf("?")>=0){d=d.substring(0,d.indexOf("?"))
}if(d.match(c)){d=d.replace(/.*\:[\/][\/]/,"");
d=d.substring(d.indexOf("/"));
d=d.replace(c,"");
this.contextPath=d;
break
}}}};
CQClientLibraryManager=GraniteClientLibraryManager
}(function(a,c){function b(e){e=e.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");
var d="[\\?&]"+e+"=([^&#]*)";
var g=new RegExp(d);
var f=g.exec(a.location.search);
if(f==null){return""
}else{return decodeURIComponent(f[1].replace(/\+/g," "))
}}GraniteClientLibraryManager.setChannelCB(function(){var e=c;
var d=[{channel:"ie6",match:/MSIE ([0-6]\.[\.0-9]{0,})/i},{channel:"touch",match:/android.+mobile|android.+chrome|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|pad|pod|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i},{channel:"extjs",match:/(windows|linux|os\s+[x9]|solaris|bsd)/i}];
var h=b("forceChannel");
if(h){return h
}var g=navigator.userAgent;
for(var f=0;
f<d.length;
f++){var j=d[f];
if(j.match.test(g)){return j.channel
}}return""
})
}(window));
GraniteTiming=function(){return{stamps:null,pageRenderStart:null,lastTimes:{},init:function(){this.pageRenderStart=new Date();
this.lastTimes["default"]=new Date();
this.stamps="";
var b=window.onload;
if(typeof window.onload!="function"){window.onload=GraniteTiming.stampOnLoad
}else{window.onload=function(){if(b){b()
}GraniteTiming.stampOnLoad()
}
}var a=window.document.onkeydown;
if(typeof window.document.onkeydown!="function"){window.document.onkeydown=GraniteTiming.showDiv
}else{window.document.onkeydown=function(c){if(a){a(c)
}GraniteTiming.showDiv(c)
}
}},stamp:function(f,g,d){if(!g){g="default"
}var e=this.lastTimes[g];
var a=new Date();
var b;
if(d||e==undefined){b="&nbsp;---"
}else{b=a-e;
b=(b<1000?(b<100?(b<10?"&nbsp;&nbsp;&nbsp;":"&nbsp;&nbsp;"):"&nbsp;"):"")+b
}var c=b+" / "+(a-this.pageRenderStart)+" ms &ndash; "+f;
this.lastTimes[g]=a;
this.stamps+=(this.stamps)?","+c:c
},stampOnLoad:function(){GraniteTiming.stamp("Complete document loaded");
window.onload=null
},writeDiv:function(){var a=window.document.createElement("div");
var b=a.style;
a.id="cqTiming";
b.margin="0 auto 0 auto";
b.borderBottom="1px solid #000000";
b.marginBottom="5px";
b.fontSize="small";
b.fontFamily="monospace";
b.backgroundColor="#000000";
b.color="#ffffff";
b.position="absolute";
b.top="0px";
b.left="0px";
a.innerHTML='<p style="margin: 2px 0 1px 0"> Page load staticstics:<br>'+this.stamps.replace(/,/g,"<br>")+'</p><p style="margin: 2px 0 1px 0; text-align: right"><a href="javascript:{GraniteTiming.hideDiv();}">Close</a></p>';
window.document.body.appendChild(a)
},hideDiv:function(){window.document.getElementById("cqTiming").style.display="none"
},showDiv:function(c){var b;
var a;
if(document.all){b=window.event.keyCode;
a=window.event
}else{b=(typeof(c.which)!="undefined")?c.which:0;
a=c
}if(a&&a.ctrlKey&&a.shiftKey&&b==85){GraniteTiming.writeDiv()
}}}
}();
GraniteTiming.init();