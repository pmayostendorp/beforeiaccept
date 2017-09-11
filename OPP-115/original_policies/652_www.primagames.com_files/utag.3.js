//tealium universal tag - utag.3 ut4.0.201503191949, Copyright 2015 Tealium.com Inc. All Rights Reserved.
var _qevents=_qevents||[];try{(function(id,loader,u){try{u=utag.o[loader].sender[id]={}}catch(e){u=utag.sender[id]};u.ev={'view':1};u.qacct="p-HqMxwjcwxcXJG";u.base_url=(document.location.protocol=="https:"?"https://secure":"http://edge")+".quantserve.com/quant.js";u.map={};u.extend=[];u.send=function(a,b,c,d,e,f,g){if(u.ev[a]||typeof u.ev.all!="undefined"){c=[];for(d in utag.loader.GV(u.map)){if(typeof b[d]!=="undefined"&&b[d]!==""){e=u.map[d].split(",");for(f=0;f<e.length;f++){if(typeof b[d]=="object"){for(g=0;g<b[d].length;g++){c.push(e[f]+"."+b[d][g]);}}else if(e[f]=="orderid"||e[f]=="revenue"){u[e[f]]=b[d];}else{c.push(e[f]+"."+b[d]);}}}}
if(typeof u.orderid!="undefined"||b._corder){u.orderid=(u.orderid?u.orderid:b._corder);}
if(typeof u.revenue!="undefined"||b._csubtotal){u.revenue=(u.revenue?u.revenue:b._csubtotal);}
g={qacct:u.qacct};if(c.length>0){g.labels=c.join(",");}
if(u.orderid){g.orderid=u.orderid;}
if(u.revenue){g.revenue=u.revenue;}
_qevents.push(g);u.s=document.getElementsByTagName("script")[0];u.scr=document.createElement("script");u.scr.type="text/javascript";u.scr.src=u.base_url;u.s.parentNode.insertBefore(u.scr,u.s);}}
try{utag.o[loader].loader.LOAD(id)}catch(e){utag.loader.LOAD(id)}})('3','random.rhcorp-prh');}catch(e){}
