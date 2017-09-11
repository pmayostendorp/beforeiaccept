if(!Array.prototype.indexOf){Array.prototype.indexOf=function(c,d){for(var b=(d||0),a=this.length;
b<a;
b++){if(this[b]===c){return b
}}return -1
}
}function record(g,a,j,d,e){var b={};
b.event=g;
b.values=a;
b.collect=j;
b.options=d;
b.componentPath=e;
b.compatibility=true;
var h=function(f){return function(i){f.call(this,i.event,i.values);
return false
}
};
for(var c=record.callbacks.length-1;
c>=0;
c--){CQ_Analytics.registerAfterCallback(h(record.callbacks[c]),150-c);
record.callbacks.pop()
}return CQ_Analytics.record(b)
}record.callbacks=[];
CQ_Analytics.Sitecatalyst={events:[],trackVars:[],settings:[],stores:CQ_Analytics.StoreRegistry.getStores(),hasEvent:function(e){var c=CQ_Analytics.StoreRegistry.getStore("eventdata");
if(c){var b=c.getProperty("events").split("\u2026");
var d=b.length;
while(d--){if(b[d]===e){return true
}}}return false
},setEvar:function(mapping){var evar=mapping.scVar;
var value=mapping.cqVar;
var isEvent=evar.match(/^(event\d+|prodView|purchase|scView|scOpen|scAdd|scRemove|scCheckout)/);
var isProduct=evar.match(/^product\./)||value.match(/product\./);
for(var store in this.stores){try{eval("var "+store+"=this.stores[store].data")
}catch(e){}}if(isEvent){if(this.hasEvent(value.replace(/.+\./,""))){this.events.push(evar);
this.updateLinkTrackEvents()
}return
}else{if(value==""){return
}try{if(isProduct){if(!evar.match(/^eVar\d+/)){s.products=eval("eventdata.products");
if(this.trackVars.indexOf("products")<0){this.trackVars.push("products")
}}}else{s[evar]=CQ_Analytics.Variables.replaceVariables(eval(value));
if(this.trackVars.indexOf(evar)<0){this.trackVars.push(evar)
}}}catch(e){console.log("Could not set "+evar+": "+e)
}}},updateLinkTrackEvents:function(){s.events=this.events.join(",");
s.linkTrackEvents=s.events
},updateLinkTrackVars:function(){s.linkTrackVars=this.trackVars.join(",")
},eraseTrackVars:function(b){for(var a=0;
a<this.trackVars.length;
a++){var c=this.trackVars[a];
if(c!=="events"){if(b){b[c]=s[c]
}delete s[c]
}}this.trackVars=[]
},saveEvars:function(){var a={events:this.events,trackVars:this.trackVars,linkTrackVars:s.linkTrackVars,linkTrackEvents:s.linkTrackEvents};
this.events=[];
this.eraseTrackVars(a);
this.settings.push(a)
},restoreEvars:function(){var a=this.settings.pop();
this.events=a.events;
delete a.events;
this.trackVars=a.trackVars;
delete a.trackVars;
this.updateLinkTrackEvents();
this.eraseTrackVars();
for(var b in a){s[b]=a[b]
}},stopTrackingTemporarily:function(){var a={trackDownloadLinks:s.trackDownloadLinks,trackExternalLinks:s.trackExternalLinks};
s.trackDownloadLinks=false;
s.trackExternalLinks=false;
(function(){for(var b in a){s[b]=a[b]
}}).defer(200)
},trackLink:function(d){var e=d.options.obj||"",b;
var a=d.options.defaultLinkType||"o";
if(typeof e.href!=="undefined"){b=s.lt(e.href)
}b=b||a;
var c=s.tl(e,b,"");
if(c){document.write(c)
}this.stopTrackingTemporarily()
},customTrack:function(obj){var events=obj.getAttribute("adhocevents")||"";
var evars=obj.getAttribute("adhocevars")||"";
if(events||evars){for(var store in this.stores){try{eval("var "+store+"=this.stores[store].data")
}catch(e){}}try{eval("evars = {"+evars+"}")
}catch(e){}CQ_Analytics.Sitecatalyst.saveEvars();
try{var linkTrackVars=[];
if(events.length>0){s.linkTrackEvents=s.events=events;
linkTrackVars.push("events")
}for(var key in evars){linkTrackVars.push(key);
var value="'"+escape(evars[key])+"'";
this.setEvar(key,value)
}if(linkTrackVars.length>0){s.linkTrackVars=linkTrackVars.join(",")
}this.trackLink({options:{obj:obj}})
}finally{CQ_Analytics.Sitecatalyst.restoreEvars()
}}},collect:function(a){var c=document.getElementsByTagName("*");
for(var b=0;
b<c.length;
b++){if(c[b].getAttribute("data-tracking")){this.processDataAttribute(c[b].getAttribute("data-tracking"),a)
}else{if(c[b].getAttribute("record")){this.processRecordAttribute(c[b].getAttribute("record"),a)
}}}},processRecordAttribute:function(attribute,forceCollect){try{if(forceCollect===undefined){forceCollect=true
}var result=eval("record("+attribute+","+forceCollect+")");
if(result){this.storeTrackingData(result)
}}catch(err){if(window.console){window.console.error(err.message)
}}},processDataAttribute:function(attribute,forceCollect){try{var json=eval("("+attribute+")");
if(forceCollect){json.collect=true
}var result=CQ_Analytics.record(json);
if(result){this.storeTrackingData(result)
}}catch(err){if(window.console){window.console.error(err.message)
}}},storeTrackingData:function(b){var f=CQ_Analytics.StoreRegistry.getStore("eventdata");
if(f){var c=this.toObj(f.getProperty("events").split("\u2026"));
var d=b[0];
c[d]=d;
var e=b[1];
var a=f;
CQ_Analytics.storeData(a,e);
f.setProperty("events",this.toArr(c).join("\u2026"))
}else{if(window.console){window.console.warn("EventData Store is not defined")
}}},toArr:function(b){var a=[];
for(property in b){a.push(b[property])
}return a
},toObj:function(a){var d={};
for(var c=0;
c<a.length;
c++){var b=a[c];
d[b]=b
}return d
}};