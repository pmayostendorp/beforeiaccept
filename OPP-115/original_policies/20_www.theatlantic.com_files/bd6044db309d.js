/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 * http://ejohn.org/blog/simple-javascript-inheritance/
 */
// Inspired by base2 and Prototype
(function(){
  var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
 
  // The base Class implementation (does nothing)
  this.Class = function(){};
 
  // Create a new Class that inherits from this class
  Class.extend = function(prop) {
    var _super = this.prototype;
   
    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;
   
    // Copy the properties over onto the new prototype
    for (var name in prop) {
      // Check if we're overwriting an existing function
      prototype[name] = typeof prop[name] == "function" &&
        typeof _super[name] == "function" && fnTest.test(prop[name]) ?
        (function(name, fn){
          return function() {
            var tmp = this._super;
           
            // Add a new ._super() method that is the same method
            // but on the super-class
            this._super = _super[name];
           
            // The method only need to be bound temporarily, so we
            // remove it when we're done executing
            var ret = fn.apply(this, arguments);        
            this._super = tmp;
           
            return ret;
          };
        })(name, prop[name]) :
        prop[name];
    }
   
    // The dummy class constructor
    function Class() {
      // All construction is actually done in the init method
      if ( !initializing && this.init )
        this.init.apply(this, arguments);
    }
   
    // Populate our constructed prototype object
    Class.prototype = prototype;
   
    // Enforce the constructor to be what we expect
    Class.prototype.constructor = Class;
 
    // And make this class extendable
    Class.extend = arguments.callee;
   
    return Class;
  };
})();
(function(){var t=this;var e=t.Backbone;var i=[];var r=i.push;var s=i.slice;var n=i.splice;var a;if(typeof exports!=="undefined"){a=exports}else{a=t.Backbone={}}a.VERSION="1.0.0";var h=t._;if(!h&&typeof require!=="undefined")h=require("underscore");a.$=t.jQuery||t.Zepto||t.ender||t.$;a.noConflict=function(){t.Backbone=e;return this};a.emulateHTTP=false;a.emulateJSON=false;var o=a.Events={on:function(t,e,i){if(!l(this,"on",t,[e,i])||!e)return this;this._events||(this._events={});var r=this._events[t]||(this._events[t]=[]);r.push({callback:e,context:i,ctx:i||this});return this},once:function(t,e,i){if(!l(this,"once",t,[e,i])||!e)return this;var r=this;var s=h.once(function(){r.off(t,s);e.apply(this,arguments)});s._callback=e;return this.on(t,s,i)},off:function(t,e,i){var r,s,n,a,o,u,c,f;if(!this._events||!l(this,"off",t,[e,i]))return this;if(!t&&!e&&!i){this._events={};return this}a=t?[t]:h.keys(this._events);for(o=0,u=a.length;o<u;o++){t=a[o];if(n=this._events[t]){this._events[t]=r=[];if(e||i){for(c=0,f=n.length;c<f;c++){s=n[c];if(e&&e!==s.callback&&e!==s.callback._callback||i&&i!==s.context){r.push(s)}}}if(!r.length)delete this._events[t]}}return this},trigger:function(t){if(!this._events)return this;var e=s.call(arguments,1);if(!l(this,"trigger",t,e))return this;var i=this._events[t];var r=this._events.all;if(i)c(i,e);if(r)c(r,arguments);return this},stopListening:function(t,e,i){var r=this._listeners;if(!r)return this;var s=!e&&!i;if(typeof e==="object")i=this;if(t)(r={})[t._listenerId]=t;for(var n in r){r[n].off(e,i,this);if(s)delete this._listeners[n]}return this}};var u=/\s+/;var l=function(t,e,i,r){if(!i)return true;if(typeof i==="object"){for(var s in i){t[e].apply(t,[s,i[s]].concat(r))}return false}if(u.test(i)){var n=i.split(u);for(var a=0,h=n.length;a<h;a++){t[e].apply(t,[n[a]].concat(r))}return false}return true};var c=function(t,e){var i,r=-1,s=t.length,n=e[0],a=e[1],h=e[2];switch(e.length){case 0:while(++r<s)(i=t[r]).callback.call(i.ctx);return;case 1:while(++r<s)(i=t[r]).callback.call(i.ctx,n);return;case 2:while(++r<s)(i=t[r]).callback.call(i.ctx,n,a);return;case 3:while(++r<s)(i=t[r]).callback.call(i.ctx,n,a,h);return;default:while(++r<s)(i=t[r]).callback.apply(i.ctx,e)}};var f={listenTo:"on",listenToOnce:"once"};h.each(f,function(t,e){o[e]=function(e,i,r){var s=this._listeners||(this._listeners={});var n=e._listenerId||(e._listenerId=h.uniqueId("l"));s[n]=e;if(typeof i==="object")r=this;e[t](i,r,this);return this}});o.bind=o.on;o.unbind=o.off;h.extend(a,o);var d=a.Model=function(t,e){var i;var r=t||{};e||(e={});this.cid=h.uniqueId("c");this.attributes={};h.extend(this,h.pick(e,p));if(e.parse)r=this.parse(r,e)||{};if(i=h.result(this,"defaults")){r=h.defaults({},r,i)}this.set(r,e);this.changed={};this.initialize.apply(this,arguments)};var p=["url","urlRoot","collection"];h.extend(d.prototype,o,{changed:null,validationError:null,idAttribute:"id",initialize:function(){},toJSON:function(t){return h.clone(this.attributes)},sync:function(){return a.sync.apply(this,arguments)},get:function(t){return this.attributes[t]},escape:function(t){return h.escape(this.get(t))},has:function(t){return this.get(t)!=null},set:function(t,e,i){var r,s,n,a,o,u,l,c;if(t==null)return this;if(typeof t==="object"){s=t;i=e}else{(s={})[t]=e}i||(i={});if(!this._validate(s,i))return false;n=i.unset;o=i.silent;a=[];u=this._changing;this._changing=true;if(!u){this._previousAttributes=h.clone(this.attributes);this.changed={}}c=this.attributes,l=this._previousAttributes;if(this.idAttribute in s)this.id=s[this.idAttribute];for(r in s){e=s[r];if(!h.isEqual(c[r],e))a.push(r);if(!h.isEqual(l[r],e)){this.changed[r]=e}else{delete this.changed[r]}n?delete c[r]:c[r]=e}if(!o){if(a.length)this._pending=true;for(var f=0,d=a.length;f<d;f++){this.trigger("change:"+a[f],this,c[a[f]],i)}}if(u)return this;if(!o){while(this._pending){this._pending=false;this.trigger("change",this,i)}}this._pending=false;this._changing=false;return this},unset:function(t,e){return this.set(t,void 0,h.extend({},e,{unset:true}))},clear:function(t){var e={};for(var i in this.attributes)e[i]=void 0;return this.set(e,h.extend({},t,{unset:true}))},hasChanged:function(t){if(t==null)return!h.isEmpty(this.changed);return h.has(this.changed,t)},changedAttributes:function(t){if(!t)return this.hasChanged()?h.clone(this.changed):false;var e,i=false;var r=this._changing?this._previousAttributes:this.attributes;for(var s in t){if(h.isEqual(r[s],e=t[s]))continue;(i||(i={}))[s]=e}return i},previous:function(t){if(t==null||!this._previousAttributes)return null;return this._previousAttributes[t]},previousAttributes:function(){return h.clone(this._previousAttributes)},fetch:function(t){t=t?h.clone(t):{};if(t.parse===void 0)t.parse=true;var e=this;var i=t.success;t.success=function(r){if(!e.set(e.parse(r,t),t))return false;if(i)i(e,r,t);e.trigger("sync",e,r,t)};R(this,t);return this.sync("read",this,t)},save:function(t,e,i){var r,s,n,a=this.attributes;if(t==null||typeof t==="object"){r=t;i=e}else{(r={})[t]=e}if(r&&(!i||!i.wait)&&!this.set(r,i))return false;i=h.extend({validate:true},i);if(!this._validate(r,i))return false;if(r&&i.wait){this.attributes=h.extend({},a,r)}if(i.parse===void 0)i.parse=true;var o=this;var u=i.success;i.success=function(t){o.attributes=a;var e=o.parse(t,i);if(i.wait)e=h.extend(r||{},e);if(h.isObject(e)&&!o.set(e,i)){return false}if(u)u(o,t,i);o.trigger("sync",o,t,i)};R(this,i);s=this.isNew()?"create":i.patch?"patch":"update";if(s==="patch")i.attrs=r;n=this.sync(s,this,i);if(r&&i.wait)this.attributes=a;return n},destroy:function(t){t=t?h.clone(t):{};var e=this;var i=t.success;var r=function(){e.trigger("destroy",e,e.collection,t)};t.success=function(s){if(t.wait||e.isNew())r();if(i)i(e,s,t);if(!e.isNew())e.trigger("sync",e,s,t)};if(this.isNew()){t.success();return false}R(this,t);var s=this.sync("delete",this,t);if(!t.wait)r();return s},url:function(){var t=h.result(this,"urlRoot")||h.result(this.collection,"url")||U();if(this.isNew())return t;return t+(t.charAt(t.length-1)==="/"?"":"/")+encodeURIComponent(this.id)},parse:function(t,e){return t},clone:function(){return new this.constructor(this.attributes)},isNew:function(){return this.id==null},isValid:function(t){return this._validate({},h.extend(t||{},{validate:true}))},_validate:function(t,e){if(!e.validate||!this.validate)return true;t=h.extend({},this.attributes,t);var i=this.validationError=this.validate(t,e)||null;if(!i)return true;this.trigger("invalid",this,i,h.extend(e||{},{validationError:i}));return false}});var v=["keys","values","pairs","invert","pick","omit"];h.each(v,function(t){d.prototype[t]=function(){var e=s.call(arguments);e.unshift(this.attributes);return h[t].apply(h,e)}});var g=a.Collection=function(t,e){e||(e={});if(e.url)this.url=e.url;if(e.model)this.model=e.model;if(e.comparator!==void 0)this.comparator=e.comparator;this._reset();this.initialize.apply(this,arguments);if(t)this.reset(t,h.extend({silent:true},e))};var m={add:true,remove:true,merge:true};var y={add:true,merge:false,remove:false};h.extend(g.prototype,o,{model:d,initialize:function(){},toJSON:function(t){return this.map(function(e){return e.toJSON(t)})},sync:function(){return a.sync.apply(this,arguments)},add:function(t,e){return this.set(t,h.defaults(e||{},y))},remove:function(t,e){t=h.isArray(t)?t.slice():[t];e||(e={});var i,r,s,n;for(i=0,r=t.length;i<r;i++){n=this.get(t[i]);if(!n)continue;delete this._byId[n.id];delete this._byId[n.cid];s=this.indexOf(n);this.models.splice(s,1);this.length--;if(!e.silent){e.index=s;n.trigger("remove",n,this,e)}this._removeReference(n)}return this},set:function(t,e){e=h.defaults(e||{},m);if(e.parse)t=this.parse(t,e);if(!h.isArray(t))t=t?[t]:[];var i,s,a,o,u,l;var c=e.at;var f=this.comparator&&c==null&&e.sort!==false;var d=h.isString(this.comparator)?this.comparator:null;var p=[],v=[],g={};for(i=0,s=t.length;i<s;i++){if(!(a=this._prepareModel(t[i],e)))continue;if(u=this.get(a)){if(e.remove)g[u.cid]=true;if(e.merge){u.set(a.attributes,e);if(f&&!l&&u.hasChanged(d))l=true}}else if(e.add){p.push(a);a.on("all",this._onModelEvent,this);this._byId[a.cid]=a;if(a.id!=null)this._byId[a.id]=a}}if(e.remove){for(i=0,s=this.length;i<s;++i){if(!g[(a=this.models[i]).cid])v.push(a)}if(v.length)this.remove(v,e)}if(p.length){if(f)l=true;this.length+=p.length;if(c!=null){n.apply(this.models,[c,0].concat(p))}else{r.apply(this.models,p)}}if(l)this.sort({silent:true});if(e.silent)return this;for(i=0,s=p.length;i<s;i++){(a=p[i]).trigger("add",a,this,e)}if(l)this.trigger("sort",this,e);return this},reset:function(t,e){e||(e={});for(var i=0,r=this.models.length;i<r;i++){this._removeReference(this.models[i])}e.previousModels=this.models;this._reset();this.add(t,h.extend({silent:true},e));if(!e.silent)this.trigger("reset",this,e);return this},push:function(t,e){t=this._prepareModel(t,e);this.add(t,h.extend({at:this.length},e));return t},pop:function(t){var e=this.at(this.length-1);this.remove(e,t);return e},unshift:function(t,e){t=this._prepareModel(t,e);this.add(t,h.extend({at:0},e));return t},shift:function(t){var e=this.at(0);this.remove(e,t);return e},slice:function(t,e){return this.models.slice(t,e)},get:function(t){if(t==null)return void 0;return this._byId[t.id!=null?t.id:t.cid||t]},at:function(t){return this.models[t]},where:function(t,e){if(h.isEmpty(t))return e?void 0:[];return this[e?"find":"filter"](function(e){for(var i in t){if(t[i]!==e.get(i))return false}return true})},findWhere:function(t){return this.where(t,true)},sort:function(t){if(!this.comparator)throw new Error("Cannot sort a set without a comparator");t||(t={});if(h.isString(this.comparator)||this.comparator.length===1){this.models=this.sortBy(this.comparator,this)}else{this.models.sort(h.bind(this.comparator,this))}if(!t.silent)this.trigger("sort",this,t);return this},sortedIndex:function(t,e,i){e||(e=this.comparator);var r=h.isFunction(e)?e:function(t){return t.get(e)};return h.sortedIndex(this.models,t,r,i)},pluck:function(t){return h.invoke(this.models,"get",t)},fetch:function(t){t=t?h.clone(t):{};if(t.parse===void 0)t.parse=true;var e=t.success;var i=this;t.success=function(r){var s=t.reset?"reset":"set";i[s](r,t);if(e)e(i,r,t);i.trigger("sync",i,r,t)};R(this,t);return this.sync("read",this,t)},create:function(t,e){e=e?h.clone(e):{};if(!(t=this._prepareModel(t,e)))return false;if(!e.wait)this.add(t,e);var i=this;var r=e.success;e.success=function(s){if(e.wait)i.add(t,e);if(r)r(t,s,e)};t.save(null,e);return t},parse:function(t,e){return t},clone:function(){return new this.constructor(this.models)},_reset:function(){this.length=0;this.models=[];this._byId={}},_prepareModel:function(t,e){if(t instanceof d){if(!t.collection)t.collection=this;return t}e||(e={});e.collection=this;var i=new this.model(t,e);if(!i._validate(t,e)){this.trigger("invalid",this,t,e);return false}return i},_removeReference:function(t){if(this===t.collection)delete t.collection;t.off("all",this._onModelEvent,this)},_onModelEvent:function(t,e,i,r){if((t==="add"||t==="remove")&&i!==this)return;if(t==="destroy")this.remove(e,r);if(e&&t==="change:"+e.idAttribute){delete this._byId[e.previous(e.idAttribute)];if(e.id!=null)this._byId[e.id]=e}this.trigger.apply(this,arguments)}});var _=["forEach","each","map","collect","reduce","foldl","inject","reduceRight","foldr","find","detect","filter","select","reject","every","all","some","any","include","contains","invoke","max","min","toArray","size","first","head","take","initial","rest","tail","drop","last","without","indexOf","shuffle","lastIndexOf","isEmpty","chain"];h.each(_,function(t){g.prototype[t]=function(){var e=s.call(arguments);e.unshift(this.models);return h[t].apply(h,e)}});var w=["groupBy","countBy","sortBy"];h.each(w,function(t){g.prototype[t]=function(e,i){var r=h.isFunction(e)?e:function(t){return t.get(e)};return h[t](this.models,r,i)}});var b=a.View=function(t){this.cid=h.uniqueId("view");this._configure(t||{});this._ensureElement();this.initialize.apply(this,arguments);this.delegateEvents()};var x=/^(\S+)\s*(.*)$/;var E=["model","collection","el","id","attributes","className","tagName","events"];h.extend(b.prototype,o,{tagName:"div",$:function(t){return this.$el.find(t)},initialize:function(){},render:function(){return this},remove:function(){this.$el.remove();this.stopListening();return this},setElement:function(t,e){if(this.$el)this.undelegateEvents();this.$el=t instanceof a.$?t:a.$(t);this.el=this.$el[0];if(e!==false)this.delegateEvents();return this},delegateEvents:function(t){if(!(t||(t=h.result(this,"events"))))return this;this.undelegateEvents();for(var e in t){var i=t[e];if(!h.isFunction(i))i=this[t[e]];if(!i)continue;var r=e.match(x);var s=r[1],n=r[2];i=h.bind(i,this);s+=".delegateEvents"+this.cid;if(n===""){this.$el.on(s,i)}else{this.$el.on(s,n,i)}}return this},undelegateEvents:function(){this.$el.off(".delegateEvents"+this.cid);return this},_configure:function(t){if(this.options)t=h.extend({},h.result(this,"options"),t);h.extend(this,h.pick(t,E));this.options=t},_ensureElement:function(){if(!this.el){var t=h.extend({},h.result(this,"attributes"));if(this.id)t.id=h.result(this,"id");if(this.className)t["class"]=h.result(this,"className");var e=a.$("<"+h.result(this,"tagName")+">").attr(t);this.setElement(e,false)}else{this.setElement(h.result(this,"el"),false)}}});a.sync=function(t,e,i){var r=k[t];h.defaults(i||(i={}),{emulateHTTP:a.emulateHTTP,emulateJSON:a.emulateJSON});var s={type:r,dataType:"json"};if(!i.url){s.url=h.result(e,"url")||U()}if(i.data==null&&e&&(t==="create"||t==="update"||t==="patch")){s.contentType="application/json";s.data=JSON.stringify(i.attrs||e.toJSON(i))}if(i.emulateJSON){s.contentType="application/x-www-form-urlencoded";s.data=s.data?{model:s.data}:{}}if(i.emulateHTTP&&(r==="PUT"||r==="DELETE"||r==="PATCH")){s.type="POST";if(i.emulateJSON)s.data._method=r;var n=i.beforeSend;i.beforeSend=function(t){t.setRequestHeader("X-HTTP-Method-Override",r);if(n)return n.apply(this,arguments)}}if(s.type!=="GET"&&!i.emulateJSON){s.processData=false}if(s.type==="PATCH"&&window.ActiveXObject&&!(window.external&&window.external.msActiveXFilteringEnabled)){s.xhr=function(){return new ActiveXObject("Microsoft.XMLHTTP")}}var o=i.xhr=a.ajax(h.extend(s,i));e.trigger("request",e,o,i);return o};var k={create:"POST",update:"PUT",patch:"PATCH","delete":"DELETE",read:"GET"};a.ajax=function(){return a.$.ajax.apply(a.$,arguments)};var S=a.Router=function(t){t||(t={});if(t.routes)this.routes=t.routes;this._bindRoutes();this.initialize.apply(this,arguments)};var $=/\((.*?)\)/g;var T=/(\(\?)?:\w+/g;var H=/\*\w+/g;var A=/[\-{}\[\]+?.,\\\^$|#\s]/g;h.extend(S.prototype,o,{initialize:function(){},route:function(t,e,i){if(!h.isRegExp(t))t=this._routeToRegExp(t);if(h.isFunction(e)){i=e;e=""}if(!i)i=this[e];var r=this;a.history.route(t,function(s){var n=r._extractParameters(t,s);i&&i.apply(r,n);r.trigger.apply(r,["route:"+e].concat(n));r.trigger("route",e,n);a.history.trigger("route",r,e,n)});return this},navigate:function(t,e){a.history.navigate(t,e);return this},_bindRoutes:function(){if(!this.routes)return;this.routes=h.result(this,"routes");var t,e=h.keys(this.routes);while((t=e.pop())!=null){this.route(t,this.routes[t])}},_routeToRegExp:function(t){t=t.replace(A,"\\$&").replace($,"(?:$1)?").replace(T,function(t,e){return e?t:"([^/]+)"}).replace(H,"(.*?)");return new RegExp("^"+t+"$")},_extractParameters:function(t,e){var i=t.exec(e).slice(1);return h.map(i,function(t){return t?decodeURIComponent(t):null})}});var I=a.History=function(){this.handlers=[];h.bindAll(this,"checkUrl");if(typeof window!=="undefined"){this.location=window.location;this.history=window.history}};var N=/^[#\/]|\s+$/g;var P=/^\/+|\/+$/g;var O=/msie [\w.]+/;var C=/\/$/;I.started=false;h.extend(I.prototype,o,{interval:50,getHash:function(t){var e=(t||this).location.href.match(/#(.*)$/);return e?e[1]:""},getFragment:function(t,e){if(t==null){if(this._hasPushState||!this._wantsHashChange||e){t=this.location.pathname;var i=this.root.replace(C,"");if(!t.indexOf(i))t=t.substr(i.length)}else{t=this.getHash()}}return t.replace(N,"")},start:function(t){if(I.started)throw new Error("Backbone.history has already been started");I.started=true;this.options=h.extend({},{root:"/"},this.options,t);this.root=this.options.root;this._wantsHashChange=this.options.hashChange!==false;this._wantsPushState=!!this.options.pushState;this._hasPushState=!!(this.options.pushState&&this.history&&this.history.pushState);var e=this.getFragment();var i=document.documentMode;var r=O.exec(navigator.userAgent.toLowerCase())&&(!i||i<=7);this.root=("/"+this.root+"/").replace(P,"/");if(r&&this._wantsHashChange){this.iframe=a.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow;this.navigate(e)}if(this._hasPushState){a.$(window).on("popstate",this.checkUrl)}else if(this._wantsHashChange&&"onhashchange"in window&&!r){a.$(window).on("hashchange",this.checkUrl)}else if(this._wantsHashChange){this._checkUrlInterval=setInterval(this.checkUrl,this.interval)}this.fragment=e;var s=this.location;var n=s.pathname.replace(/[^\/]$/,"$&/")===this.root;if(this._wantsHashChange&&this._wantsPushState&&!this._hasPushState&&!n){this.fragment=this.getFragment(null,true);this.location.replace(this.root+this.location.search+"#"+this.fragment);return true}else if(this._wantsPushState&&this._hasPushState&&n&&s.hash){this.fragment=this.getHash().replace(N,"");this.history.replaceState({},document.title,this.root+this.fragment+s.search)}if(!this.options.silent)return this.loadUrl()},stop:function(){a.$(window).off("popstate",this.checkUrl).off("hashchange",this.checkUrl);clearInterval(this._checkUrlInterval);I.started=false},route:function(t,e){this.handlers.unshift({route:t,callback:e})},checkUrl:function(t){var e=this.getFragment();if(e===this.fragment&&this.iframe){e=this.getFragment(this.getHash(this.iframe))}if(e===this.fragment)return false;if(this.iframe)this.navigate(e);this.loadUrl()||this.loadUrl(this.getHash())},loadUrl:function(t){var e=this.fragment=this.getFragment(t);var i=h.any(this.handlers,function(t){if(t.route.test(e)){t.callback(e);return true}});return i},navigate:function(t,e){if(!I.started)return false;if(!e||e===true)e={trigger:e};t=this.getFragment(t||"");if(this.fragment===t)return;this.fragment=t;var i=this.root+t;if(this._hasPushState){this.history[e.replace?"replaceState":"pushState"]({},document.title,i)}else if(this._wantsHashChange){this._updateHash(this.location,t,e.replace);if(this.iframe&&t!==this.getFragment(this.getHash(this.iframe))){if(!e.replace)this.iframe.document.open().close();this._updateHash(this.iframe.location,t,e.replace)}}else{return this.location.assign(i)}if(e.trigger)this.loadUrl(t)},_updateHash:function(t,e,i){if(i){var r=t.href.replace(/(javascript:|#).*$/,"");t.replace(r+"#"+e)}else{t.hash="#"+e}}});a.history=new I;var j=function(t,e){var i=this;var r;if(t&&h.has(t,"constructor")){r=t.constructor}else{r=function(){return i.apply(this,arguments)}}h.extend(r,i,e);var s=function(){this.constructor=r};s.prototype=i.prototype;r.prototype=new s;if(t)h.extend(r.prototype,t);r.__super__=i.prototype;return r};d.extend=g.extend=S.extend=b.extend=I.extend=j;var U=function(){throw new Error('A "url" property or function must be specified')};var R=function(t,e){var i=e.error;e.error=function(r){if(i)i(t,r,e);t.trigger("error",t,r,e)}}}).call(this);

(function() {
    /**
     * Responsive sites rely heavily on resize events.
     * Hover, if a browser is resized while the user is in a different tab, there's no event.
     * Capture and retrigger these events as needed.
     */

    function getSize() {
        var $win = $(window);
        return [$win.width(), $win.height()];
    }

    function handleExit() {
        window._bg_resize_params = getSize();
    }

    function handleReentry() {
        if (window._bg_resize_params.join(":") !== getSize().join(":")) {
            $(window).trigger('resize');
        }
    }

    window._bg_resize_params = getSize();

    $(window).on("blur", handleExit);
    $(window).on("focus", handleReentry);

})();

/*
 * Swipe 2.0
 *
 * Brad Birdsall
 * Copyright 2013, MIT License
 *
*/

function Swipe(container, options) {

  "use strict";

  // utilities
  var noop = function() {}; // simple no operation function
  var offloadFn = function(fn) { setTimeout(fn || noop, 0) }; // offload a functions execution

  // check browser capabilities
  var browser = {
    addEventListener: !!window.addEventListener,
    touch: ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch,
    transitions: (function(temp) {
      var props = ['transitionProperty', 'WebkitTransition', 'MozTransition', 'OTransition', 'msTransition'];
      for ( var i in props ) if (temp.style[ props[i] ] !== undefined) return true;
      return false;
    })(document.createElement('swipe'))
  };

  // quit if no root element
  if (!container) return;
  var element = container.children[0];
  var slides, slidePos, width, length;
  options = options || {};
  var index = parseInt(options.startSlide, 10) || 0;
  var speed = options.speed || 300;
  options.continuous = options.continuous !== undefined ? options.continuous : true;

  function setup() {

    // cache slides
    slides = element.children;
    length = slides.length;

    // set continuous to false if only one slide
    if (slides.length < 2) options.continuous = false;

    //special case if two slides
    if (browser.transitions && options.continuous && slides.length < 3) {
      element.appendChild(slides[0].cloneNode(true));
      element.appendChild(element.children[1].cloneNode(true));
      slides = element.children;
    }

    // create an array to store current positions of each slide
    slidePos = new Array(slides.length);

    // determine width of each slide
    width = container.getBoundingClientRect().width || container.offsetWidth;

    element.style.width = (slides.length * width) + 'px';

    // stack elements
    var pos = slides.length;
    while(pos--) {

      var slide = slides[pos];

      slide.style.width = width + 'px';
      slide.setAttribute('data-index', pos);

      if (browser.transitions) {
        slide.style.left = (pos * -width) + 'px';
        move(pos, index > pos ? -width : (index < pos ? width : 0), 0);
      }

    }

    // reposition elements before and after index
    if (options.continuous && browser.transitions) {
      move(circle(index-1), -width, 0);
      move(circle(index+1), width, 0);
    }

    if (!browser.transitions) element.style.left = (index * -width) + 'px';

    container.style.visibility = 'visible';

  }

  function prev() {

    if (options.continuous) slide(index-1);
    else if (index) slide(index-1);

  }

  function next() {

    if (options.continuous) slide(index+1);
    else if (index < slides.length - 1) slide(index+1);

  }

  function circle(index) {

    // a simple positive modulo using slides.length
    return (slides.length + (index % slides.length)) % slides.length;

  }

  function slide(to, slideSpeed) {

    // do nothing if already on requested slide
    if (index == to) return;

    if (browser.transitions) {

      var direction = Math.abs(index-to) / (index-to); // 1: backward, -1: forward

      // get the actual position of the slide
      if (options.continuous) {
        var natural_direction = direction;
        direction = -slidePos[circle(to)] / width;

        // if going forward but to < index, use to = slides.length + to
        // if going backward but to > index, use to = -slides.length + to
        if (direction !== natural_direction) to =  -direction * slides.length + to;

      }

      var diff = Math.abs(index-to) - 1;

      // move all the slides between index and to in the right direction
      while (diff--) move( circle((to > index ? to : index) - diff - 1), width * direction, 0);

      to = circle(to);

      move(index, width * direction, slideSpeed || speed);
      move(to, 0, slideSpeed || speed);

      if (options.continuous) move(circle(to - direction), -(width * direction), 0); // we need to get the next in place

    } else {

      to = circle(to);
      animate(index * -width, to * -width, slideSpeed || speed);
      //no fallback for a circular continuous if the browser does not accept transitions
    }

    index = to;
    offloadFn(options.callback && options.callback(index, slides[index]));
  }

  function move(index, dist, speed) {

    translate(index, dist, speed);
    slidePos[index] = dist;

  }

  function translate(index, dist, speed) {

    var slide = slides[index];
    var style = slide && slide.style;

    if (!style) return;

    style.webkitTransitionDuration =
    style.MozTransitionDuration =
    style.msTransitionDuration =
    style.OTransitionDuration =
    style.transitionDuration = speed + 'ms';

    style.webkitTransform = 'translate(' + dist + 'px,0)' + 'translateZ(0)';
    style.msTransform =
    style.MozTransform =
    style.OTransform = 'translateX(' + dist + 'px)';

  }

  function animate(from, to, speed) {

    // if not an animation, just reposition
    if (!speed) {

      element.style.left = to + 'px';
      return;

    }

    var start = +new Date;

    var timer = setInterval(function() {

      var timeElap = +new Date - start;

      if (timeElap > speed) {

        element.style.left = to + 'px';

        if (delay) begin();

        options.transitionEnd && options.transitionEnd.call(event, index, slides[index]);

        clearInterval(timer);
        return;

      }

      element.style.left = (( (to - from) * (Math.floor((timeElap / speed) * 100) / 100) ) + from) + 'px';

    }, 4);

  }

  // setup auto slideshow
  var delay = options.auto || 0;
  var interval;

  function begin() {

    interval = setTimeout(next, delay);

  }

  function stop() {

    delay = 0;
    clearTimeout(interval);

  }


  // setup initial vars
  var start = {};
  var delta = {};
  var isScrolling;

  // setup event capturing
  var events = {

    handleEvent: function(event) {

      switch (event.type) {
        case 'touchstart': this.start(event); break;
        case 'touchmove': this.move(event); break;
        case 'touchend': offloadFn(this.end(event)); break;
        case 'webkitTransitionEnd':
        case 'msTransitionEnd':
        case 'oTransitionEnd':
        case 'otransitionend':
        case 'transitionend': offloadFn(this.transitionEnd(event)); break;
        case 'resize': offloadFn(setup); break;
      }

      if (options.stopPropagation) event.stopPropagation();

    },
    start: function(event) {

      var touches = event.touches[0];

      // measure start values
      start = {

        // get initial touch coords
        x: touches.pageX,
        y: touches.pageY,

        // store time to determine touch duration
        time: +new Date

      };

      // used for testing first move event
      isScrolling = undefined;

      // reset delta and end measurements
      delta = {};

      // attach touchmove and touchend listeners
      element.addEventListener('touchmove', this, false);
      element.addEventListener('touchend', this, false);

    },
    move: function(event) {

      // ensure swiping with one touch and not pinching
      if ( event.touches.length > 1 || event.scale && event.scale !== 1) return

      if (options.disableScroll) event.preventDefault();

      var touches = event.touches[0];

      // measure change in x and y
      delta = {
        x: touches.pageX - start.x,
        y: touches.pageY - start.y
      }

      // determine if scrolling test has run - one time test
      if ( typeof isScrolling == 'undefined') {
        isScrolling = !!( isScrolling || Math.abs(delta.x) < Math.abs(delta.y) );
      }

      // if user is not trying to scroll vertically
      if (!isScrolling) {

        // prevent native scrolling
        event.preventDefault();

        // stop slideshow
        stop();

        // increase resistance if first or last slide
        if (options.continuous) { // we don't add resistance at the end

          translate(circle(index-1), delta.x + slidePos[circle(index-1)], 0);
          translate(index, delta.x + slidePos[index], 0);
          translate(circle(index+1), delta.x + slidePos[circle(index+1)], 0);

        } else {

          delta.x =
            delta.x /
              ( (!index && delta.x > 0               // if first slide and sliding left
                || index == slides.length - 1        // or if last slide and sliding right
                && delta.x < 0                       // and if sliding at all
              ) ?
              ( Math.abs(delta.x) / width + 1 )      // determine resistance level
              : 1 );                                 // no resistance if false

          // translate 1:1
          translate(index-1, delta.x + slidePos[index-1], 0);
          translate(index, delta.x + slidePos[index], 0);
          translate(index+1, delta.x + slidePos[index+1], 0);
        }

      }

    },
    end: function(event) {

      // measure duration
      var duration = +new Date - start.time;

      // determine if slide attempt triggers next/prev slide
      var isValidSlide =
            Number(duration) < 250               // if slide duration is less than 250ms
            && Math.abs(delta.x) > 20            // and if slide amt is greater than 20px
            || Math.abs(delta.x) > width/2;      // or if slide amt is greater than half the width

      // determine if slide attempt is past start and end
      var isPastBounds =
            !index && delta.x > 0                            // if first slide and slide amt is greater than 0
            || index == slides.length - 1 && delta.x < 0;    // or if last slide and slide amt is less than 0

      if (options.continuous) isPastBounds = false;

      // determine direction of swipe (true:right, false:left)
      var direction = delta.x < 0;

      // if not scrolling vertically
      if (!isScrolling) {

        if (isValidSlide && !isPastBounds) {

          if (direction) {

            if (options.continuous) { // we need to get the next in this direction in place

              move(circle(index-1), -width, 0);
              move(circle(index+2), width, 0);

            } else {
              move(index-1, -width, 0);
            }

            move(index, slidePos[index]-width, speed);
            move(circle(index+1), slidePos[circle(index+1)]-width, speed);
            index = circle(index+1);

          } else {
            if (options.continuous) { // we need to get the next in this direction in place

              move(circle(index+1), width, 0);
              move(circle(index-2), -width, 0);

            } else {
              move(index+1, width, 0);
            }

            move(index, slidePos[index]+width, speed);
            move(circle(index-1), slidePos[circle(index-1)]+width, speed);
            index = circle(index-1);

          }

          options.callback && options.callback(index, slides[index]);

        } else {

          if (options.continuous) {

            move(circle(index-1), -width, speed);
            move(index, 0, speed);
            move(circle(index+1), width, speed);

          } else {

            move(index-1, -width, speed);
            move(index, 0, speed);
            move(index+1, width, speed);
          }

        }

      }

      // kill touchmove and touchend event listeners until touchstart called again
      element.removeEventListener('touchmove', events, false)
      element.removeEventListener('touchend', events, false)

    },
    transitionEnd: function(event) {

      if (parseInt(event.target.getAttribute('data-index'), 10) == index) {

        if (delay) begin();

        options.transitionEnd && options.transitionEnd.call(event, index, slides[index]);

      }

    }

  }

  // trigger setup
  setup();

  // start auto slideshow if applicable
  if (delay) begin();


  // add event listeners
  if (browser.addEventListener) {

    // set touchstart event on element
    if (browser.touch) element.addEventListener('touchstart', events, false);

    if (browser.transitions) {
      element.addEventListener('webkitTransitionEnd', events, false);
      element.addEventListener('msTransitionEnd', events, false);
      element.addEventListener('oTransitionEnd', events, false);
      element.addEventListener('otransitionend', events, false);
      element.addEventListener('transitionend', events, false);
    }

    // set resize event on window
    window.addEventListener('resize', events, false);

  } else {

    window.onresize = function () { setup() }; // to play nice with old IE

  }

  // expose the Swipe API
  return {
    setup: function() {

      setup();

    },
    slide: function(to, speed) {

      // cancel slideshow
      stop();

      slide(to, speed);

    },
    prev: function() {

      // cancel slideshow
      stop();

      prev();

    },
    next: function() {

      // cancel slideshow
      stop();

      next();

    },
    stop: function() {

      // cancel slideshow
      stop();

    },
    getPos: function() {

      // return current index position
      return index;

    },
    getNumSlides: function() {

      // return total number of slides
      return length;
    },
    kill: function() {

      // cancel slideshow
      stop();

      // reset element
      element.style.width = '';
      element.style.left = '';

      // reset slides
      var pos = slides.length;
      while(pos--) {

        var slide = slides[pos];
        slide.style.width = '';
        slide.style.left = '';

        if (browser.transitions) translate(pos, 0, 0);

      }

      // removed event listeners
      if (browser.addEventListener) {

        // remove current event listeners
        element.removeEventListener('touchstart', events, false);
        element.removeEventListener('webkitTransitionEnd', events, false);
        element.removeEventListener('msTransitionEnd', events, false);
        element.removeEventListener('oTransitionEnd', events, false);
        element.removeEventListener('otransitionend', events, false);
        element.removeEventListener('transitionend', events, false);
        window.removeEventListener('resize', events, false);

      }
      else {

        window.onresize = null;

      }

    }
  }

}


if ( window.jQuery || window.Zepto ) {
  (function($) {
    $.fn.Swipe = function(params) {
      return this.each(function() {
        $(this).data('Swipe', new Swipe($(this)[0], params));
      });
    }
  })( window.jQuery || window.Zepto )
}

/**
 * Looks for objects with a `data-defer-bg-image` set on them.
 * Assigns them to the background image when the object is both
 * visible and within 1.5x of the viewport.
 *
 *   <figure data-defer-bg-image="coffee.jpg"></figure>
 *
 * If you need a style block (i.e., to us -ms-filters to get background-sizing
 * in IE8), you can still use this script, like this:
 *
 *   <figure id="image-1" data-defer-bg-image></figure> // No image set, but still get a class
 *   <style>
 *       #image-1.loaded {...}
 *   </style>
 */
(function() {
    function load_images() {

        function _get_Y_offset() {
            // Shim for IE8
            return window.pageYOffset || window.document.documentElement.scrollTop;
        }
        var limit = _get_Y_offset() + (window.screen.height * 1.5);
        var $figures = $('[data-defer-bg-image]:visible').not('.loaded'); // Only visible figures
        for (var i = 0; i < $figures.length; i++) { // Start from the top
            var $figure = $($figures[i]);
            var img;
            if ($figure.offset().top < limit) {
                img = $figure.attr('data-defer-bg-image');
                $figure.css({
                    "background-image": "url(" + img + ")"
                });
                $figure.addClass('loaded');
            }
        }
    }

    var debounced_load_images = _.debounce(function(e) {
        load_images();
    }, 100);

    load_images(); // Initial
    $(window).on("scroll", debounced_load_images);
}());

/**
 * Loads Disqus when you reach deep enough into of the page.
 */
(function($) {

    if (window.disqus_shortname === undefined) {
        if (window.console) {
            console.error("disqus_shortname must be defined.");
        }
        return false;
    }

    var $disqusThread = $('#disqus_thread');
    if (!$disqusThread.length) {
        return false;
    }

    var loadComments = function() {
        if (!window.DISQUS) {
            var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
            dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);    
        }
    };


    var hasButton = $("#disqus_thread a[href='#disqus_thread']").css("display") === "block";

    if (window.location.hash === "#disqus_thread" || window.location.hash.indexOf("#comment-") === 0) {
        // Check the hash, and possibly load comments immediately
        loadComments();
    } else if ($(window).width() > 640 || !hasButton) {
        // Lazy load on non-mobile devices, or pages that
        // don't have a load button on the container
        $(window).on("scroll.lazy_comments", _.debounce(function() {
            var yOffset = window.pageYOffset || document.documentElement.scrollTop;
            var limit = window.screen.height + yOffset;
            if ($disqusThread.offset().top < limit) {
                $(window).off(".lazy_comments");
                loadComments();
            }
        }, 100));   
    }

    // Comments activate on click
    $("body").on("click tap", "a[href='#disqus_thread']", function(e){
        loadComments();

        // Don't jump if the button is where the thread loads
        if ($(this).closest("#disqus_thread").length) {
            e.preventDefault();
            e.stopPropagation();
        }
    });

})(jQuery);


/**
 * Open share popups on links with data-share attribute.
 */

window.Atlantic = window.Atlantic || {};
window.Atlantic.page_info = window.Atlantic.page_info || {};
Atlantic.SimpleShare = Atlantic.SimpleShare || {};

/**
 * There are two ways that networks can be referenced.
 *
 *  - As an object. This will create a popup window based on an underscore
 *    template. This object should contain the following keys:
 *      * `url` -- an underscore template of the share network
 *      * `width`/`height` -- each corresponding the size of the popup window
 *
 *  - As a function. This is a callback that receives a data object.
 */
Atlantic.SimpleShare.networks = {
    "facebook": function (data) {
        // Fallback to sharer.php if FB isn't available.
        if (typeof FB === "undefined") {
            Atlantic.SimpleShare.openWindow({
                "url": _.template("https://www.facebook.com/sharer/sharer.php?u=<%= url %>"),
                "width": 626,
                "height": 436
            }, data);
            return;
        }

        var params = {
            method: "feed",
            display: "popup",
            link: decodeURIComponent(data.url)
        };

        var fbMappings = {title: "name", dek: "description", image: "picture"};
        for (var key in fbMappings) {
            if (data[key]) {
                params[fbMappings[key]] = data[key];
            }
        }

        FB.ui(params);
    },
    "twitter": {
        "url": _.template("https://twitter.com/share?text=<%= text %>&url=<%= url %><% if (via) { %>&via=<%= via %><% } %><% if (hashtag) { %>&hashtags=<%= hashtag %><% } %>"),
        "width": 600,
        "height": 250
    },
    "googleplus": {
        "url": _.template("https://plus.google.com/share?url=<%= url %>"),
        "width": 500,
        "height": 600
    },
    "linkedin": {
        "url": _.template("http://www.linkedin.com/shareArticle?mini=true&url=<%= url %>"),
        "width": 520,
        "height": 570
    },
    "reddit": {
        "url": _.template("https://www.reddit.com/submit?url=<%= url %>"),
        "width": 900,
        "height": 600
    },
    "pinterest": {
        "url": _.template("https://www.pinterest.com/pin/create/button/?url=<%= url %>&description=<%= dek %><% if (image) { %>&media=<%= image %><% } %>"),
        "width": 700,
        "height": 300
    },
    "instapaper": {
        "sameWindow": true,
        "url": _.template("http://www.instapaper.com/hello2?url=<%= url %>"),
        "width": 900,
        "height": 600
    },
    "pocket": {
        "url": _.template("https://getpocket.com/edit.php?url=<%= url %>"),
        "width": 900,
        "height": 600
    },
    "tumblr": {
        "url": _.template("https://www.tumblr.com/share/link?url=<%= url %><% if (text) { %>&name=<%= text %><% } %>"),
        "width": 900,
        "height": 600
    },
    "whatsapp": {
        "sameWindow": true,
        "url": _.template("whatsapp://send?text=<%= url %>"),
    },
    "print": function(data) { window.print(); }
};

Atlantic.SimpleShare.openWindow = function (network, data) {
    var url = network.url(data);
    if (network.sameWindow){
        window.location.href = url;
    }else{
        window.open(url, "share", "width=" + network.width + ",height=" + network.height + ",top=100,left=100");
    }
};

(function($) {
    $(document).on('click tap', '[data-share]', function(e) {
        e.preventDefault();
        var $this = $(this);
        var network_name = $this.data("share");
        var network = Atlantic.SimpleShare.networks[network_name];

        function forceAbsoluteUrl(url) {
            if (url.slice(0,2) === "//") {
                // Protocol relative url
                url = "http:" + url
            } else if (/^https?:\/\//.test(url) === false) {
                // Relative url
                url = window.location.protocol + "//" + window.location.host + url;
            }
            return url;
        }

        function decodeSpecialChars(text) {
            return $("<div />").html(text).text();
        }

        var data = {
            'url': encodeURIComponent(forceAbsoluteUrl($this.data('shareUrl') || window.location.href)),
            'text': decodeSpecialChars($this.data('shareText') || Atlantic.page_info.share_text || $("meta[property='og:title']").attr("content") || document.title),
            'title': $this.data('shareTitle'),
            'via': $this.data('shareVia'),
            'hashtag': $this.data('shareHashtag'),
            'dek': $this.data('shareDescription') || $("meta[property='og:description']").attr("content"),
            'image': forceAbsoluteUrl($this.data('shareImage') || $("meta[property='og:image']").attr("content")),
        };

        if (typeof network === "function") {
            network(data);
        } else if (typeof network === "object") {
            Atlantic.SimpleShare.openWindow(network, data);
        }
    });
})(jQuery);

(function ($) {
    var humanize = function(n) {
        if (n >= 10000000) {
            return (n / 1000000).toFixed() + "m";
        } else if (n >= 1000000) {
            return (n / 1000000).toFixed(1) + "m";
        } else if (n >= 10000) {
            return (n / 1000).toFixed() + "k";
        } else if (n >= 1000) {
            return (n / 1000).toFixed(1) + "k";
        }
        return n.toFixed();
    };

    var displayShareCount = function(fb_json, twitter_json) {
        var fb_count = +fb_json[0].shares || 0;
        var twitter_count = +twitter_json[0].count || 0;
        var total_count = fb_count + twitter_count;
        if (total_count > 0) {
            $button = $('.article-social-icons .share-count');
            var share_text = (total_count == 1)? "Share": "Shares";
            $button.html("<big>" + humanize(total_count) + "</big> " + share_text);
            $button.css('display', 'block');
        }
    };

    var displayIndividualCounts = function(fb_json, twitter_json) {
        var fb_count = +fb_json[0].shares || 0;
        if (fb_count > 600) {
            $button = $(".show-share .share-count.facebook");
            $button.html(humanize(fb_count));
            $button.css('display', 'block');
        }
        var twitter_count = +twitter_json[0].count || 0;
        if (twitter_count > 70) {
            $button = $(".show-share .share-count.twitter");
            $button.html(humanize(twitter_count));
            $button.css('display', 'block');
        }
    };

    // If the full size version of the FB icon is visible, go ahead and look up our share count
    if ($('.article-social-icons .facebook span').is(':visible')) {
        var canonical_url = $("link[rel='canonical']").attr("href");
        var fb_api_url = 'http://graph.facebook.com/?id=' + encodeURIComponent(canonical_url);

        var og_url = $("meta[property='og:url']").attr("content");
        var twitter_api_url = 'http://cdn.api.twitter.com/1/urls/count.json?callback=?&url=' +
            encodeURIComponent(og_url);

        $.when($.getJSON(fb_api_url), $.getJSON(twitter_api_url)).done(displayShareCount);
    }

    // If on a show-share page
    if ($('.show-share').is(':visible')) {
        var canonical_url = $("link[rel='canonical']").attr("href");
        var fb_api_url = 'http://graph.facebook.com/?id=' + encodeURIComponent(canonical_url);

        var og_url = $("meta[property='og:url']").attr("content");
        var twitter_api_url = 'http://cdn.api.twitter.com/1/urls/count.json?callback=?&url=' +
            encodeURIComponent(og_url);

        $.when($.getJSON(fb_api_url), $.getJSON(twitter_api_url)).done(displayIndividualCounts);
    }
})($);


/*! iFrame Resizer (iframeSizer.min.js ) - v2.5.2 - 2014-07-17
 *  Desc: Force cross domain iframes to size to content.
 *  Requires: iframeResizer.contentWindow.min.js to be loaded into the target frame.
 *  Copyright: (c) 2014 David J. Bradshaw - dave@bradshaw.net
 *  License: MIT
 */

!function(){"use strict";function a(a,b,c){"addEventListener"in window?a.addEventListener(b,c,!1):"attachEvent"in window&&a.attachEvent("on"+b,c)}function b(){var a,b=["moz","webkit","o","ms"];for(a=0;a<b.length&&!w;a+=1)w=window[b[a]+"RequestAnimationFrame"];w||c(" RequestAnimationFrame not supported")}function c(a){y.log&&"object"==typeof console&&console.log(s+"[Host page"+u+"]"+a)}function d(a){function b(){function a(){h(w),f(),y.resizedCallback(w)}i(a,w,"resetPage")}function d(a){var b=a.id;c(" Removing iFrame: "+b),a.parentNode.removeChild(a),y.closedCallback(b),c(" --")}function e(){var a=v.substr(t).split(":");return{iframe:document.getElementById(a[0]),id:a[0],height:a[1],width:a[2],type:a[3]}}function j(a){var b=Number(y["max"+a]),d=Number(y["min"+a]),e=a.toLowerCase(),f=Number(w[e]);if(d>b)throw new Error("Value for min"+a+" can not be greater than max"+a);c(" Checking "+e+" is in range "+d+"-"+b),d>f&&(f=d,c(" Set "+e+" to min value")),f>b&&(f=b,c(" Set "+e+" to max value")),w[e]=""+f}function k(){var b=a.origin,d=w.iframe.src.split("/").slice(0,3).join("/");if(y.checkOrigin&&(c(" Checking connection is from: "+d),""+b!="null"&&b!==d))throw new Error("Unexpected message received from: "+b+" for "+w.iframe.id+". Message was: "+a.data+". This error can be disabled by adding the checkOrigin: false option.");return!0}function l(){return s===(""+v).substr(0,t)}function m(){var a=w.type in{"true":1,"false":1};return a&&c(" Ignoring init message from meta parent page"),a}function n(){var a=v.substr(v.indexOf(":")+r+6);c(" MessageCallback passed: {iframe: "+w.iframe.id+", message: "+a+"}"),y.messageCallback({iframe:w.iframe,message:a}),c(" --")}function o(){if(null===w.iframe)throw new Error("iFrame ("+w.id+") does not exist on "+u);return!0}function q(){switch(w.type){case"close":d(w.iframe),y.resizedCallback(w);break;case"message":n();break;case"scrollTo":crollRequestFromChild();break;case"reset":g(w);break;case"init":b(),y.initCallback(w.iframe);break;default:b()}}var v=a.data,w={};l()&&(c(" Received: "+v),w=e(),j("Height"),j("Width"),!m()&&o()&&k()&&(q(),p=!1))}function e(){null===v&&(v={x:void 0!==window.pageXOffset?window.pageXOffset:document.documentElement.scrollLeft,y:void 0!==window.pageYOffset?window.pageYOffset:document.documentElement.scrollTop},c(" Get position: "+v.x+","+v.y))}function f(){null!==v&&(window.scrollTo(v.x,v.y),c(" Set position: "+v.x+","+v.y),v=null)}function g(a){function b(){h(a),j("reset","reset",a.iframe)}c(" Size reset requested by "+("init"===a.type?"host page":"iFrame")),e(),i(b,a,"init")}function h(a){function b(b){a.iframe.style[b]=a[b]+"px",c(" IFrame ("+a.iframe.id+") "+b+" set to "+a[b]+"px")}y.sizeHeight&&b("height"),y.sizeWidth&&b("width")}function i(a,b,d){d!==b.type&&w?(c(" Requesting animation frame"),w(a)):a()}function j(a,b,d){c("["+a+"] Sending msg to iframe ("+b+")"),d.contentWindow.postMessage(s+b,"*")}function k(){function b(){function a(a){1/0!==y[a]&&0!==y[a]&&(k.style[a]=y[a]+"px",c(" Set "+a+" = "+y[a]+"px"))}a("maxHeight"),a("minHeight"),a("maxWidth"),a("minWidth")}function d(a){return""===a&&(k.id=a="iFrameResizer"+o++,c(" Added missing iframe ID: "+a+" ("+k.src+")")),a}function e(){c(" IFrame scrolling "+(y.scrolling?"enabled":"disabled")+" for "+l),k.style.overflow=!1===y.scrolling?"hidden":"auto",k.scrolling=!1===y.scrolling?"no":"yes"}function f(){("number"==typeof y.bodyMargin||"0"===y.bodyMargin)&&(y.bodyMarginV1=y.bodyMargin,y.bodyMargin=""+y.bodyMargin+"px")}function h(){return l+":"+y.bodyMarginV1+":"+y.sizeWidth+":"+y.log+":"+y.interval+":"+y.enablePublicMethods+":"+y.autoResize+":"+y.bodyMargin+":"+y.heightCalculationMethod+":"+y.bodyBackground+":"+y.bodyPadding+":"+y.tolerance}function i(b){a(k,"load",function(){var a=p;j("iFrame.onload",b,k),!a&&y.heightCalculationMethod in x&&g({iframe:k,height:0,width:0,type:"init"})}),j("init",b,k)}var k=this,l=d(k.id);e(),b(),f(),i(h())}function l(a){if("object"!=typeof a)throw new TypeError("Options is not an object.")}function m(){function a(a){if("IFRAME"!==a.tagName.toUpperCase())throw new TypeError("Expected <IFRAME> tag, found <"+a.tagName+">.");k.call(a)}function b(a){a=a||{},l(a);for(var b in z)z.hasOwnProperty(b)&&(y[b]=a.hasOwnProperty(b)?a[b]:z[b])}return function(c,d){b(c),Array.prototype.forEach.call(document.querySelectorAll(d||"iframe"),a)}}function n(a){a.fn.iFrameResize=function(b){return l(b),y=a.extend({},z,b),this.filter("iframe").each(k).end()}}var o=0,p=!0,q="message",r=q.length,s="[iFrameSizer]",t=s.length,u="",v=null,w=window.requestAnimationFrame,x={max:1,scroll:1,bodyScroll:1,documentElementScroll:1},y={},z={autoResize:!0,bodyBackground:null,bodyMargin:null,bodyMarginV1:8,bodyPadding:null,checkOrigin:!0,enablePublicMethods:!1,heightCalculationMethod:"offset",interval:32,log:!1,maxHeight:1/0,maxWidth:1/0,minHeight:0,minWidth:0,scrolling:!1,sizeHeight:!0,sizeWidth:!1,tolerance:0,closedCallback:function(){},initCallback:function(){},messageCallback:function(){},resizedCallback:function(){}};b(),a(window,"message",d),"jQuery"in window&&n(jQuery),"function"==typeof define&&define.amd?define(function(){return m()}):window.iFrameResize=m()}();

/**
 * Changes the height of iframes that have the auto-relow class so 
 * their full contents are shown. This is useful on responsive
 * embeds that don't retain their proportions when they're shrunk.
 *
 * This is intended for embeds. Videos, and other things that have
 * a locked proportion should keep using the regular padding method.
 */
(function($) {

    function getHeight($iframe) {
        try {
            return $iframe[0].contentWindow.document.body.scrollHeight;
        } catch (e) {
            return null;
        }
    }

    // For iframes that are not in wrapping divs.
    // This is used in the admin.
    function adjustIframe($iframe){
        $iframe.css({"height": null});
        var height = getHeight($iframe);
        if (height && height > $iframe.attr("height")) {
            $iframe.height(height);
        } else {
            // For cross origin errors, there's a library that
            // uses window postMessage to communicate. It has to be 
            // implemented on both ends to work.
            if (window.iFrameResize) {
                $("iframe.auto-relow").iFrameResize({
                    minHeight: $iframe.attr('height') || 0
                });
            }
        }
    }

    // For responsified iframes that are 100%
    // of the parent width.
    function adjustParentElement($iframe) {
        var $el = $iframe.parent();
        $el.css({"height": 0, "padding-bottom": 0});

        var height = getHeight($iframe);

        // If we don't know the height, reset the iframe and get it.
        if (!height && window.iFrameResize) {
            $iframe.iFrameResize({
                minHeight: $iframe.attr('height') || 0
            });
            height = $iframe.height();
        }

        // In theory there might still be no height.
        if (height) {
            // var proportion = 100 * (height / $el.outerWidth());
            // proportion = proportion.toString() + "%";
            $el.css({
                "paddingBottom": 0,
                "height": height,
                "max-height": height
            });
        }

    }

    function reflowIframes() {
        var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        for (var i = 0; i < $iframes.length; i++) {
            if ($iframes.eq(i).css("position") === "absolute") {
                adjustParentElement($iframes.eq(i));
            } else {
                adjustIframe($iframes.eq(i));
            }
        }
        window.scrollTo(0, scrollPosition);  // This shouldn't move the user's place on the page.
    }

    var $iframes = $('iframe.auto-reflow');
    if (!$iframes.length){
        return;  // Nothing to do.
    }

    // Some iframes won't be done loading by this point.
    // Just in case, listen for onload events to retrigger.
    $iframes.on("load", _.debounce(reflowIframes, 500));

    // If there are iframes on the page, check the
    // sizes again if the browser resizes.
    $(window).on("resize", _.debounce(reflowIframes, 500));
    $(document).on("ready", reflowIframes);

}(window.jQuery));

(function ($) {
    $(".toggleable .toggleable-button").on("click", function (e) {
        $toggleable = $(this).closest(".toggleable");

        $(".toggleable-content", $toggleable).slideToggle("fast", function () {
            var visible = $(this).is(":visible");
            if (visible) {
                $toggleable.addClass("open").removeClass("closed");
            } else {
                $toggleable.addClass("closed").removeClass("open");
            }
        });
    });
})(jQuery);

// Generated by CoffeeScript 1.6.2
/*!
jQuery Waypoints - v2.0.5
Copyright (c) 2011-2014 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
*/
(function(){var t=[].indexOf||function(t){for(var e=0,n=this.length;e<n;e++){if(e in this&&this[e]===t)return e}return-1},e=[].slice;(function(t,e){if(typeof define==="function"&&define.amd){return define("waypoints",["jquery"],function(n){return e(n,t)})}else{return e(t.jQuery,t)}})(window,function(n,r){var i,o,l,s,f,u,c,a,h,d,p,y,v,w,g,m;i=n(r);a=t.call(r,"ontouchstart")>=0;s={horizontal:{},vertical:{}};f=1;c={};u="waypoints-context-id";p="resize.waypoints";y="scroll.waypoints";v=1;w="waypoints-waypoint-ids";g="waypoint";m="waypoints";o=function(){function t(t){var e=this;this.$element=t;this.element=t[0];this.didResize=false;this.didScroll=false;this.id="context"+f++;this.oldScroll={x:t.scrollLeft(),y:t.scrollTop()};this.waypoints={horizontal:{},vertical:{}};this.element[u]=this.id;c[this.id]=this;t.bind(y,function(){var t;if(!(e.didScroll||a)){e.didScroll=true;t=function(){e.doScroll();return e.didScroll=false};return r.setTimeout(t,n[m].settings.scrollThrottle)}});t.bind(p,function(){var t;if(!e.didResize){e.didResize=true;t=function(){n[m]("refresh");return e.didResize=false};return r.setTimeout(t,n[m].settings.resizeThrottle)}})}t.prototype.doScroll=function(){var t,e=this;t={horizontal:{newScroll:this.$element.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.$element.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};if(a&&(!t.vertical.oldScroll||!t.vertical.newScroll)){n[m]("refresh")}n.each(t,function(t,r){var i,o,l;l=[];o=r.newScroll>r.oldScroll;i=o?r.forward:r.backward;n.each(e.waypoints[t],function(t,e){var n,i;if(r.oldScroll<(n=e.offset)&&n<=r.newScroll){return l.push(e)}else if(r.newScroll<(i=e.offset)&&i<=r.oldScroll){return l.push(e)}});l.sort(function(t,e){return t.offset-e.offset});if(!o){l.reverse()}return n.each(l,function(t,e){if(e.options.continuous||t===l.length-1){return e.trigger([i])}})});return this.oldScroll={x:t.horizontal.newScroll,y:t.vertical.newScroll}};t.prototype.refresh=function(){var t,e,r,i=this;r=n.isWindow(this.element);e=this.$element.offset();this.doScroll();t={horizontal:{contextOffset:r?0:e.left,contextScroll:r?0:this.oldScroll.x,contextDimension:this.$element.width(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:r?0:e.top,contextScroll:r?0:this.oldScroll.y,contextDimension:r?n[m]("viewportHeight"):this.$element.height(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};return n.each(t,function(t,e){return n.each(i.waypoints[t],function(t,r){var i,o,l,s,f;i=r.options.offset;l=r.offset;o=n.isWindow(r.element)?0:r.$element.offset()[e.offsetProp];if(n.isFunction(i)){i=i.apply(r.element)}else if(typeof i==="string"){i=parseFloat(i);if(r.options.offset.indexOf("%")>-1){i=Math.ceil(e.contextDimension*i/100)}}r.offset=o-e.contextOffset+e.contextScroll-i;if(r.options.onlyOnScroll&&l!=null||!r.enabled){return}if(l!==null&&l<(s=e.oldScroll)&&s<=r.offset){return r.trigger([e.backward])}else if(l!==null&&l>(f=e.oldScroll)&&f>=r.offset){return r.trigger([e.forward])}else if(l===null&&e.oldScroll>=r.offset){return r.trigger([e.forward])}})})};t.prototype.checkEmpty=function(){if(n.isEmptyObject(this.waypoints.horizontal)&&n.isEmptyObject(this.waypoints.vertical)){this.$element.unbind([p,y].join(" "));return delete c[this.id]}};return t}();l=function(){function t(t,e,r){var i,o;if(r.offset==="bottom-in-view"){r.offset=function(){var t;t=n[m]("viewportHeight");if(!n.isWindow(e.element)){t=e.$element.height()}return t-n(this).outerHeight()}}this.$element=t;this.element=t[0];this.axis=r.horizontal?"horizontal":"vertical";this.callback=r.handler;this.context=e;this.enabled=r.enabled;this.id="waypoints"+v++;this.offset=null;this.options=r;e.waypoints[this.axis][this.id]=this;s[this.axis][this.id]=this;i=(o=this.element[w])!=null?o:[];i.push(this.id);this.element[w]=i}t.prototype.trigger=function(t){if(!this.enabled){return}if(this.callback!=null){this.callback.apply(this.element,t)}if(this.options.triggerOnce){return this.destroy()}};t.prototype.disable=function(){return this.enabled=false};t.prototype.enable=function(){this.context.refresh();return this.enabled=true};t.prototype.destroy=function(){delete s[this.axis][this.id];delete this.context.waypoints[this.axis][this.id];return this.context.checkEmpty()};t.getWaypointsByElement=function(t){var e,r;r=t[w];if(!r){return[]}e=n.extend({},s.horizontal,s.vertical);return n.map(r,function(t){return e[t]})};return t}();d={init:function(t,e){var r;e=n.extend({},n.fn[g].defaults,e);if((r=e.handler)==null){e.handler=t}this.each(function(){var t,r,i,s;t=n(this);i=(s=e.context)!=null?s:n.fn[g].defaults.context;if(!n.isWindow(i)){i=t.closest(i)}i=n(i);r=c[i[0][u]];if(!r){r=new o(i)}return new l(t,r,e)});n[m]("refresh");return this},disable:function(){return d._invoke.call(this,"disable")},enable:function(){return d._invoke.call(this,"enable")},destroy:function(){return d._invoke.call(this,"destroy")},prev:function(t,e){return d._traverse.call(this,t,e,function(t,e,n){if(e>0){return t.push(n[e-1])}})},next:function(t,e){return d._traverse.call(this,t,e,function(t,e,n){if(e<n.length-1){return t.push(n[e+1])}})},_traverse:function(t,e,i){var o,l;if(t==null){t="vertical"}if(e==null){e=r}l=h.aggregate(e);o=[];this.each(function(){var e;e=n.inArray(this,l[t]);return i(o,e,l[t])});return this.pushStack(o)},_invoke:function(t){this.each(function(){var e;e=l.getWaypointsByElement(this);return n.each(e,function(e,n){n[t]();return true})});return this}};n.fn[g]=function(){var t,r;r=arguments[0],t=2<=arguments.length?e.call(arguments,1):[];if(d[r]){return d[r].apply(this,t)}else if(n.isFunction(r)){return d.init.apply(this,arguments)}else if(n.isPlainObject(r)){return d.init.apply(this,[null,r])}else if(!r){return n.error("jQuery Waypoints needs a callback function or handler option.")}else{return n.error("The "+r+" method does not exist in jQuery Waypoints.")}};n.fn[g].defaults={context:r,continuous:true,enabled:true,horizontal:false,offset:0,triggerOnce:false};h={refresh:function(){return n.each(c,function(t,e){return e.refresh()})},viewportHeight:function(){var t;return(t=r.innerHeight)!=null?t:i.height()},aggregate:function(t){var e,r,i;e=s;if(t){e=(i=c[n(t)[0][u]])!=null?i.waypoints:void 0}if(!e){return[]}r={horizontal:[],vertical:[]};n.each(r,function(t,i){n.each(e[t],function(t,e){return i.push(e)});i.sort(function(t,e){return t.offset-e.offset});r[t]=n.map(i,function(t){return t.element});return r[t]=n.unique(r[t])});return r},above:function(t){if(t==null){t=r}return h._filter(t,"vertical",function(t,e){return e.offset<=t.oldScroll.y})},below:function(t){if(t==null){t=r}return h._filter(t,"vertical",function(t,e){return e.offset>t.oldScroll.y})},left:function(t){if(t==null){t=r}return h._filter(t,"horizontal",function(t,e){return e.offset<=t.oldScroll.x})},right:function(t){if(t==null){t=r}return h._filter(t,"horizontal",function(t,e){return e.offset>t.oldScroll.x})},enable:function(){return h._invoke("enable")},disable:function(){return h._invoke("disable")},destroy:function(){return h._invoke("destroy")},extendFn:function(t,e){return d[t]=e},_invoke:function(t){var e;e=n.extend({},s.vertical,s.horizontal);return n.each(e,function(e,n){n[t]();return true})},_filter:function(t,e,r){var i,o;i=c[n(t)[0][u]];if(!i){return[]}o=[];n.each(i.waypoints[e],function(t,e){if(r(i,e)){return o.push(e)}});o.sort(function(t,e){return t.offset-e.offset});return n.map(o,function(t){return t.element})}};n[m]=function(){var t,n;n=arguments[0],t=2<=arguments.length?e.call(arguments,1):[];if(h[n]){return h[n].apply(null,t)}else{return h.aggregate.call(null,n)}};n[m].settings={resizeThrottle:100,scrollThrottle:30};return i.on("load.waypoints",function(){return n[m]("refresh")})})}).call(this);
(function() {
    // Toggle the .active class on elements inside of #site-header-container.
    // The value of data-toggles="..." should be a jQuery selector.
    $("#site-nav a[data-toggles]").on("click", function(e) {
        e.preventDefault();

        var toggleSelector = $(this).data("toggles");
        var $parentListElement = $(this).parent("li");

        // Find all menu links and dropdown menus that aren't the one that was
        // just clicked and remove .active from them.
        $(this).parents("#site-nav").find("li").not($parentListElement).removeClass("active");
        $(this).parents("#site-header-container").children().not(toggleSelector).removeClass("active");

        // Set the menu link as active, set the data-toggles selected element
        // as active.
        $(this).parent("li").toggleClass("active");
        $(toggleSelector).toggleClass("active");
    });

    $("#site-nav .menu a").on("click", function(e) {
        $("body").toggleClass("header-menu-open");
    });

    $("#site-nav .search a").on("click", function(e) {
        e.preventDefault();
        $("header .site-search input[type=text]").focus();
    });

    $("#site-menu .close-link").on("click", function(e) {
        e.preventDefault();
        $("#site-nav .menu a").trigger("click");
    });

    $("header .site-search input[type=text]").on("blur", function(e) {
        $("#site-nav .search a").trigger("click");
    });

    $("body").on("click", function(e) {
        if ($("body").hasClass("header-menu-open") && !$.contains($("#site-header-container").get(0), e.target)) {
            $("#site-nav .menu a").trigger("click");
        }
    });

    $("body").waypoint({
        offset: -1 * ($("#site-header").outerHeight() + $("#site-header").offset().top),
        handler: function(direction) {
            if (direction === "down") {
                $("body").addClass("header-fixed");
            } else {
                $("body").removeClass("header-fixed");
            }
        }
    });
})();

(function() {
    $(".toggle").on("click", function(e) {
        e.preventDefault();
        if ($(this).width() < 350){ //only works on mobile
            $sign = $(this).find("span");
            content = $sign.text();
            if (content==="+"){
                $sign.text("-");
                $(this).parent().next().removeClass("toggleable-content");
            } else {
                $sign.text("+");
                $(this).parent().next().addClass("toggleable-content");
            }
        }
    });
})();

//reveals all author categories
(function () {
    $(".show_all").on("click", function(e) {
        e.preventDefault();
        $(".categorylist").removeClass("fade");
        $(this).remove();

    });
})();

//reveals full author bio
(function () {
    $(".bio .more").on("click", function(e) {
        e.preventDefault();
        $(this).next(".hidden").removeClass("hidden");
        $(this).remove();
    });
})();

//hides "connect" if author has no contact methods or social media presence

(function() {
    links = $(".social-links");
    if (links.children().length < 2) {
        links.hide();
    }
})();

(function() {
    window.Atlantic = window.Atlantic || {};
    Atlantic.Janrain = Atlantic.Janrain || {};

    var loadJanrain = function() {
        $.getScript(Atlantic.PROFILES_URL + "janrain/profiles.js?v=" + Atlantic.PROFILES_SERVER_VERSION);
        loadCSS(Atlantic.STATIC_URL + "theatlantic/common/css/registration/profiles.css");
        loadCSS(Atlantic.STATIC_URL + "theatlantic/common/css/registration/widgets.css");
    };
    if (window.location.search.match(/(screenToRender|src|CDS)/) || Atlantic.Janrain.screen || Atlantic.Janrain.load) {
        loadJanrain();
    }
    $("#site-nav .menu a").one("click", loadJanrain);
})();

if (window.console === undefined) {
    window.console = {};
    console.log = function() {};
}

/***************
 * Atlantic Ad *
 ***************/

// Namespace everything.
Atlantic = window.Atlantic || {};
Atlantic.Ad = Atlantic.Ad || {};
Atlantic.Ad.adSlots = Atlantic.Ad.adSlots || {};

// Google doesn't give us these until loadGoogle
// is called. Set them up now so we can safely
// queue up sizeListeners and other commands.
googletag = window.googletag || {};
googletag.cmd = googletag.cmd || [];


/**
 * Check if googletag is defined.
 */
Atlantic.Ad.checkGPT = function() {
    if (typeof googletag === "undefined") {
        throw new Error("googletag is not defined.");
    }
};

/**
 * Listen to the googletag rendering event and pass the size of the loaded unit
 * to a callback.
 *
 * Normally this works smoothly because the ads are loaded asynchronously so
 * the "render" event isn't executed immediately. For later units on longer
 * pages, this assumption is incorrect. Typically by the time the DOM gets to
 * the bottomboxright unit, the render events are immediate. This means we
 * have to attach the event before the googletag.cmd.push function that queues
 * up the display method.
 *
 * @param {String} id The ID of the ad unit, or a regex that matches the id.
 * @param {Function} callback This will be passed the ad elemnt or an array with
 *      the size of the loaded ad unit (false if the unit is hidden).
 */
Atlantic.Ad.sizeListener = function (pos, callback) {
    Atlantic.Ad.checkGPT();
    googletag.cmd.push(function () {
        googletag.pubads().addEventListener('slotRenderEnded', function (event) {
            var slot = event.slot;
            var targetingMap = slot.getTargetingMap();
            if (typeof targetingMap !== "object") {
                return;
            }

            var matches = (pos instanceof RegExp) ? targetingMap.pos[0].match(pos) : targetingMap.pos[0] === pos;
            if (matches) {
                var id = slot.getSlotId().getDomId();
                var $unit = $("#" + id);
                callback($unit, event.size);
            }

        });
    });
};

// Get average ad load time when ?test_ad_speed is enabled.
Atlantic.Ad.loadTimes = [];
Atlantic.Ad.loadTimes.average = function(){
    var sum = 0;
    for (var i = 0; i < Atlantic.Ad.loadTimes.length; i++) {
        sum += Atlantic.Ad.loadTimes[i];
    }
    return (sum / Atlantic.Ad.loadTimes.length);
};

Atlantic.Ad.Manager = function(options) {
    var self = this;

    this.possibleDefs = $.extend(true, {}, options.defs);
    this.defs = $.extend(true, {}, this.possibleDefs);
    this.globalDefs = $.extend(true, {}, options.globals);
    this.isResponsive = options.isResponsive || true;
    this.deferredIds = [];
    this.adSlots = {};

    this.testZone = options.testZone || "dctestsite";
    this._iOS = !!window.navigator.userAgent.match("(iPhone|iPad)");
    this._isAndroid = !!window.navigator.userAgent.match("Android");

    // Track the actual dimensions so we can filter out bogus
    // resize events. (Safari likes to throw these.)
    this.screenSize = [window.innerWidth, window.innerHeight];


    var forceLazyLoad = window.location.search.match(/test_lazy=[\d\.]+/);
    if (forceLazyLoad) {
        this.lazyLoad = function(match){
            var value = parseFloat(match[0].split("=")[1]);
            return {active: (value > 0), distanceMultiplier: value};
        }(forceLazyLoad);
    } else {
        this.lazyLoad = $.extend(true, {active: false, distanceMultiplier: 1.5, touchDistanceMultiplier: null}, options.lazyLoad);
    }

    /**
     * The `filter` option is a function to filter out adSlots. It's a little
     * bit unconventional because, the context of the function that is passed
     * is explicitly bound to the context of the instance, *not* of the object
     * that is passed as an argument.
     */
    if (jQuery.isFunction(options.filter)) {
        this.filter = function() {
            options.filter.call(self);
        };
        googletag.cmd.push(this.filter);
    }

    /**
     * The `listeners` option is an object with the pos as the key and either a
     * function or an array of functions that are registered.
     */
    for (var adSlot in options.listeners) {
        var listeners = options.listeners[adSlot];
        if (jQuery.isFunction(listeners)) {
            Atlantic.Ad.sizeListener(adSlot, listeners);
        } else if (jQuery.isArray(listeners)) {
            for(var i = 0; i < listeners.length; i += 1) {
                Atlantic.Ad.sizeListener(adSlot, listeners[i]);
            }
        }
    }

    // Log time for ads loading when ?test_ad_speed is in the url
    if (/test_ad_speed/.test(window.location.search)) {
        var startTime = Date.now();
        Atlantic.Ad.sizeListener(/.+/, function($ad){
            var now = Date.now();
            var elapsed = now - startTime;
            Atlantic.Ad.loadTimes.push(elapsed);
            console.log(elapsed + "ms: " + $ad.attr("id") + " has loaded.");
        });
    }

    this.mixins = $.extend({}, this.defaultMixins, options.mixins);

    // Responsive ads sometimes load a different set
    // of ads when the screen resizes.
    if (this.isResponsive) {
        $(window).on("resize", function() {
            if (self.checkResized()) {
                self.handleResizeInvalidation.call(self);
            }
        });
    }
};

$.extend(Atlantic.Ad.Manager.prototype, {

    defaultMixins: {
        enablePeer39: true,
        lazyLoad: true,
        device: true
    },

    loadGoogle: function() {
        var googletag = googletag || {};
        googletag.cmd = googletag.cmd || [];
        (function() {
            var gads = document.createElement("script");
            gads.async = true;
            gads.type = "text/javascript";
            var useSSL = "https:" == document.location.protocol;
            gads.src = (useSSL ? "https:" : "http:") + "//www.googletagservices.com/tag/js/gpt.js";
            var node = document.getElementsByTagName("script")[0];
            node.parentNode.insertBefore(gads, node);
        })();
    },

    /**
     * Determines if the window width is different
     * than its last recorded value.
     */
    checkResized: function() {
        // iOS and Android like to change the window height while scrolling
        // triggering bogus resize events. Firefox and Safari sometimes 
        // have notification bars change the window height. Since the layout
        // is based on width anyway, we'll just ignore height changes to
        // prevent the ads from refreshing when the user isn't resizing
        // the browser.
        if (this.screenSize[0] !== window.innerWidth) {
            this.screenSize = [window.innerWidth, window.innerHeight];
            return true;
        } else {
            return false;
        }
    },

    handleResizeInvalidation: _.debounce(function() {
        var self = this;
        var widths = {};

        var excludedAds = [];
        for (var adSlot in this.possibleDefs) {
            if (!this.defs.hasOwnProperty(adSlot)) {
                excludedAds.push(adSlot);
            }
        }

        try {

            /* Ensure no existing ad is too wide */
            $.each(this.defs, function(key, value) {
                var $ad = $("#" + key);
                var exceedsParent = $ad.parent().width() < $ad.width() && $ad.html() !== "";
                var exceedsScreen = $ad.find("iframe").width() > $(window).width() && $ad.html() !== "";

                if (exceedsParent || exceedsScreen) {
                    throw "InvalidateAds";
                }
            });

            /* Ensure no excluded ads can now fit */
            $.each(excludedAds, function(index, key) {
                var value = self.possibleDefs[key];

                var $ad = $("#" + key);

                var widths = [];
                for (var i = 0; i < value.sizes.length; i += 1) {
                    widths.push(value.sizes[i][0]);
                }

                var minSize = Math.min.apply(Math, widths);
                var parentWidth = $ad.parent().width();

                if (minSize < parentWidth && $ad.is(":visible")) {
                    throw "InvalidateAds";
                }
            });
        } catch(e) {
            if (e === "InvalidateAds") {
                this.reset();
            } else {
                throw e;
            }
        }
    }, 1000),

    reset: function() {
        googletag.pubads().clear();
        $(".ad-loaded").removeClass("ad-loaded");
        this.defs = $.extend(true, {}, this.possibleDefs);
        this.filter();

        googletag = {};
        googletag.cmd = [];

        this.loadGoogle();
        this.display();
    },

    display: function() {
        var self = this;
        googletag.cmd.push(function() {
            self.getAdSlots();

            googletag.pubads().enableSingleRequest();
            googletag.pubads().disableInitialLoad();
            googletag.pubads().enableAsyncRendering();
            googletag.pubads().collapseEmptyDivs();
            googletag.pubads().setCentering(true);

            // Collapse ads the render empty
            googletag.pubads().addEventListener('slotRenderEnded', function(event) {
                if (event.isEmpty) {
                    var $ad = $('#' + event.slot.getSlotId().getDomId());
                    $ad.parent('.ad').hide();
                }
            });

            googletag.enableServices();

            // Declare the ad slots as ready. If lazy loading is active
            // each slot needs to be refreshed to show creatives.
            // Otherwise this will show the ads.
            for (var key in self.defs) {
                googletag.display(key);
            }

            // If lazyLoading is on, creating the initial ads is the responsibility
            // of lazyRender. If if not, render all the non-deferred ads right away.
            if (self.lazyLoad.active) {
                self.lazyRender(_.keys(self.defs), false);
                self.setupLazyRender();
            } else {
                var initalAds = _.omit(self.adSlots, self.deferredIds);
                var initialAdSlots = [];
                for(var key in initalAds) {
                    $('#' + key).addClass("ad-loaded");
                    initialAdSlots.push(initalAds[key]);
                }
                googletag.pubads().refresh(initialAdSlots);
            }
        });

    },


    setupLazyRender: _.once(function(){
        var self = this;
        $(window).on("scroll", _.throttle(function(){
            self.lazyRender(_.keys(self.defs));
        }, 250));
    }),

    /**
     * Downloads all the ads that are close to being viewable.
     */
    lazyRender: function(keys, changeCorrelator){

        // The correlator tells the ad call to use the same
        // separation/exclusive rules from a previous call.
        // It should only change on itial call and ajax events,
        // where all the ads are refreshed.
        changeCorrelator = changeCorrelator || false;

        function _nearlyVisible($element, offsetMultiplier) {
            var pageYoffset = (window.pageYOffset || window.document.documentElement.scrollTop); // For IE
            var top_limit = pageYoffset - window.screen.height * offsetMultiplier;
            var bottom_limit = pageYoffset + window.screen.height * offsetMultiplier;
            return $element.offset().top < bottom_limit && $element.offset().top > top_limit;
        }

        var slots = [];
        var $ad, key, slot;

        // Mobile devices load ads slower, so we want to start loading them earlier.
        // If an explicit touchDistanceMultiplier isn't set, fallback to the regular
        // multiplier +1.
        var offsetMultiplier = (function(){
            var isTouch = (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
            if (isTouch) {
                return this.lazyLoad.mobileDistanceMultiplier || this.lazyLoad.distanceMultiplier;
            } else {
                return this.lazyLoad.distanceMultiplier;
            }
        }.call(this));

        for (var i = 0; i < keys.length; i++) {
            key = keys[i];

            // Don't render ads that are deliberately deferred.
            // These should be refreshed manually.
            if (this.deferredIds.indexOf(key) > -1) {
                continue;
            }

            // Only fetch ads that aren't already loaded.
            $ad = $('#' + key).not(".ad-loaded");
            if ($ad.length === 0) {
                continue;
            }

            if (_nearlyVisible($ad, offsetMultiplier) || $ad.data("adNeverDefer")) {
                slot = this.adSlots[key];
                $ad.addClass("ad-loaded"); // Allows us to determine which adslots are empty
                slots.push(slot);
            }
        }

        // Out of page ads should always be activated immediately.
        if (this._outOfPageAds) {
            for (i = 0; i < this._outOfPageAds.length; i++) {
                slots.push(this._outOfPageAds.pop(i));
            }
        }

        // Refresh all the slots at once. This is more effecient,
        // but there's also a race condition where refreshing them
        // individually can cause the creatives to appear in the wrong places.
        if (slots.length && googletag.pubads) {
            googletag.pubads().refresh(slots, {"changeCorrelator": changeCorrelator});
        }

    },

    getAdSlots: function() {
        var self = this;

        Atlantic.Ad.checkGPT();
        if (this.mixins.enablePeer39) {
            this.peer39Mixin();
        }
        if (this.mixins.device) {
            this.deviceMixin();
        }

        this.referrerMixin();

        $.each(this.globalDefs, function(key, value) {
            // setTargeting only accepts strings and Arrays of strings.
            if ($.isArray(value)) {
                value = $.map(value, function(a) { return a.toString(); });
            } else {
                value = value.toString();
            }

            googletag.pubads().setTargeting(key, value);
        });

        $.each(this.defs, function(slotKey, slotDef) {
            var targetingValue;
            // Validate the slot. This will only affect this one definition.
            if (!self.validateSlot(slotKey)) {
                return;
            }

            // If the cookie key exists and the cookie exists, move on.
            if (typeof slotDef.cookie !== "undefined" && Atlantic.Utils.readCookie(slotDef.cookie)) {
                return;
            }

            var adSlot = googletag.defineSlot(slotDef.zone, slotDef.sizes, slotKey)
                                  .addService(googletag.pubads());

            for (var property in slotDef.properties) {
                targetingValue = slotDef.properties[property];

                if ($.isArray(targetingValue)) {
                    targetingValue = $.map(targetingValue, function(a) { return a.toString(); })
                } else {
                    targetingValue = targetingValue.toString();
                }

                adSlot.setTargeting(property, targetingValue);
            }

            // Parts of the googletag api (e.g., refresh) have to be called with
            // the slot objects. Assign this to the manager so we can retreive them
            // by key again.
            self.adSlots[slotKey] = adSlot;
        });
    },

    peer39Mixin: function() {
        // Check what this is set to using
        //    googletag.pubads().getSlots()[0].getTargetingMap().interests
        if (Atlantic.Ad.p39_categories !== undefined) {
            this.globalDefs.interests = Atlantic.Ad.p39_categories;
        }
        return this;
    },

    /**
     Put's a 'device' property into the page properties.
     The sizes are intended to to be steps just above normal ad definitions.
    */
    deviceMixin: function() {
        var w = $(document).width();
        if (w >= 1040) {
            this.globalDefs.device = "desktop-big";
        } else if (w >= 980) {
            this.globalDefs.device = "desktop-small";
        } else if (w >= 768) {
            this.globalDefs.device = "tablet";
        } else if (w >= 728) {
            this.globalDefs.device = "tablet-small";
        } else if (w >= 300) {
            this.globalDefs.device = "mobile";
        } else {
            this.globalDefs.device = "too-small";
        }
        return this;
    },

    referrerMixin: function() {
        var mappings = {
            "www.facebook.com": "facebook",
            "www.linkedin.com": "linkedin",
            "t.co": "twitter",
            "www.reddit.com": "reddit",
            "trc.taboola.com": "taboola",
            "duckduckgo.com": "search",
            "www.bing.com": "search",
            "r.search.yahoo.com": "search"
        };

        if (document.referrer) {
            var domain = document.referrer.split("/")[2];
            var value = mappings[domain];

            // Match Google for all domains
            if (domain.match(/^www\.google\./)) {
                value = "search";
            }
            if (value) {
                this.globalDefs.ref = value;
            }
        }
    },

    /**
     * Validate ad slot definitions.
     *
     * This is not very rigorous, just trying to keep the single request from
     * failing if one of the ad slot definitions is missing a required component.
     *
     * @param {String} id The id of the slot. Used for reporting which ad
     *     definition is broken.
     */
    validateSlot: function(slotKey) {
        var definition = this.defs[slotKey];

        if (!($.isArray(definition.sizes))) {
            console.log(slotKey + ".sizes is not set correctly.");
            return false;
        }
        if (!('zone' in definition)) {
            console.log(slotKey + ".zone is not set.");
            return false;
        }
        return true;
    },

    /**
     * Throw out slots that aren't visible.
     * @param  {bool} defer   Make ads deferred rather than dropping them outright.
     */
    filterByVisibility: function(defer) {
        var $ad;
        for (var key in this.defs) {
            $ad = $("#" + key);
            if (!$ad.is(':visible') && !$ad.data('adStartsHidden') && !$ad.data("adNeverDefer")) {
                if (defer === true) {
                    this.deferredIds.push(key);
                } else {
                    delete this.defs[key];
                }
            }
        }
        return this;
    },

    /**
     * Deferred ads must be refreshed
     * manually. Set `data-defer-ad`.
     */
    filterDeferredAds: function() {
        var $el;
        for (var key in this.defs) {
            $el = $("#"+key);
            if ($el.length && $el.data().deferAd) {
                this.deferredIds.push(key);
            }
        }
    },

    filterSizesByFit: function() {
        var $ad, maxWidth;
        for (var key in this.defs) {
            var def = this.defs[key];
            $ad = $("#" + key);
            // Filter out any sizes that won't fit in the containing element. If an
            // ad is hidden at the start, make sure it will fit in the window.
            maxWidth = ((!$ad.data("adStartsHidden")) ? $ad.parent().width() : window.innerWidth || document.documentElement.clientWidth);
            def.sizes = _.filter(def.sizes, function(size) {
                return (size[0] <= maxWidth);
            });

            if (def.sizes.length === 0) {
                delete this.defs[key];
            }
        }
        return this;
    },

    /**
     * Use a cookie to cap how often we call for an ad.
     *
     * `cookieMap` is an object literal formatted like this:
     *     {
     *     'ad-key': 'cookie_name',
     *     'ad-welcome': 'seen_welcome_screen'
     *     }
     *
     * You'll need to set the cookies somewhere else.
     *
     */
    filterByCookie: function(cookieMap) {
        for (var key in this.defs) {
            if (key in cookieMap && Atlantic.Utils.readCookie(cookieMap[key])) {
                delete this.defs[key];
            }
        }
        return this;
    },

    mobileUserAgentRegex: /(Android|BlackBerry|PlayBook|iPhone|iPod|Opera Mini|IEMobile|MeeGo)/i,

    /**
     * Throw out these slots on mobile devices.
     * A mobile device is defined on devices that match common userAgents (not iPad)
     * or has at least one side (screen size, not window) that's less than 700px.
     */
    filterIfMobile: function(slotKeys) {
        var self = this;
        if (this.mobileUserAgentRegex.test(navigator.userAgent) || screen.height < 700 || screen.width < 700) {
            $.each(slotKeys, function(i, slotKey) {
                delete self.defs[slotKey];
            });
        }
        return this;
    },

    filterMobileWelcomeScreenSizes: function(slotKeys) {
        var isPhone = $(window).width() < 600,
            isIPad = /iPad/.test(navigator.userAgent),
            isPortrait = (((window.orientation + 180) % 180) === 0),
            self = this;

        if (!$.isArray(slotKeys)) {
            throw new TypeError('Argument must be an Array');
        }
        if (!(isPhone || isIPad)) { return this; }

        $.each(slotKeys, function(i, slotKey) {
            if (!(slotKey in self.defs)) {
                return;
            }
            if (isPhone) {
                self.defs[slotKey].sizes = [[300,258]];
            } else if (isIPad) {
                if (isPortrait) {
                    self.defs[slotKey].sizes.push([768, 1024]);
                } else {
                    self.defs[slotKey].sizes.push([1024, 768]);
                }
            }
        });
        return this;
    },

    /**
     * Replace the "site" of a zone. Usually
     * used to swap in an adtest domain.
     */
    replaceZone: function(zone, testAdZone) {
        return zone.replace(/(\/\d+\/)[^\/]+(\/)/g, function(m, $1, $2) {
            return $1 + testAdZone + $2;
        });
    },

    matchesAdTest: function() {
        return (/adtest\=1/.test(window.location.search) || /adtest\./.test(window.location.hostname));
    },

    checkAdTest: function() {
        if (this.matchesAdTest()) {
            var self = this;
            $.each(this.defs, function(slotKey, def) {
                def.zone = self.replaceZone(def.zone, self.testZone);
            });
        }
        return this;
    },

    createOutOfPageAd: function(pos, zone) {
        var self = this;
        googletag.cmd.push(function() {
            zone = (self.matchesAdTest()) ? self.replaceZone(zone, self.testZone) : zone;
            self.adSlots[pos] = googletag.defineOutOfPageSlot(zone, pos).addService(
                googletag.pubads()).setTargeting("pos", pos);

            // Keep track of these so they will be loaded correctly.
            self._outOfPageAds = self._outOfPageAds || [];
            self._outOfPageAds.push(self.adSlots[pos]);
        });
    }

});

(function() {
    Atlantic = window.Atlantic || {};

    // Function.bind() compatibility.
    if (!Function.prototype.bind) {
        Function.prototype.bind = function (oThis) {
            if (typeof this !== "function") {
                // closest thing possible to the ECMAScript 5 internal IsCallable function
                throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
            }

            var aArgs = Array.prototype.slice.call(arguments, 1),
                fToBind = this,
                fNOP = function () {},
                fBound = function () {
                    return fToBind.apply(this instanceof fNOP && oThis ? this
                            : oThis,
                            aArgs.concat(Array.prototype.slice.call(arguments)));
                };

            fNOP.prototype = this.prototype;
            fBound.prototype = new fNOP();

            return fBound;
        };
    }

    /*******************
     * WELCOME SCREENS *
     *******************/

    /**
     * Initialize the welcome screen
     */
    Atlantic.WelcomeScreen = function() {
        this.debug = /debug_welcome_screen/.test(window.location.search);
        this.clock = 15;
        if (this.debug) {
            this.clock = 10000;
        }
        this.timeout = false;
    };

    /**
     * Basic Show/Hide
     */
    Atlantic.WelcomeScreen.prototype.show = function () {
        var self = this;

        if (this.timeout !== false) {
            return;
        }

        var $lightbox = $('.welcome-lightbox.active');

        $lightbox.on('click', "*", function(e) {
            if (this === e.target) {
                self.hide();
            }
        }).on('mousewheel touchmove', function(e) {
            return false;
        });

        $lightbox.show();
        $(document.body).addClass('overflow-hidden');
        $(document.body).addClass('welcome-screen-open');
        $lightbox.find('.welcome-lightbox-count').html(this.clock);

        // Dirty hack to force Safari to redraw, or the welcome screen
        // can wind up being offset.
        window.scrollTo(window.pageXOffset, window.pageYOffset - 0.1);

        // Bind the hide events
        $continueBtn = $lightbox.find('.welcome-lightbox-continue');
        $continueBtn.on('click', function(e) {
            e.preventDefault();
            self.hide();
        });

        // Show continue button after 1 second.
        setTimeout(function(){
            $continueBtn.show();
        }, 1500);

        Atlantic.Utils.createCookie('seen_welcome_screen', true, 0.5);
        this.timeout = setInterval(function() {
            self.runCountdown();
        }, 1000);
        this.runCountdown();
    };

    Atlantic.WelcomeScreen.prototype.hide = function () {
        $('.welcome-lightbox.active').remove();
        $(document.body).removeClass('overflow-hidden');
        $(document.body).removeClass('welcome-screen-open');
        this.stopCountdown();
    };

    /**
     * Timer.
     */
    Atlantic.WelcomeScreen.prototype.runCountdown = function () {
        if (this.timeout === false) {
            this.timeout = setInterval(this.runCountdown.bind(this), 1000);
        }
        var $lightbox = $('.welcome-lightbox.active');
        $lightbox.find('.welcome-lightbox-count').html(this.clock);

        if (this.clock === 0) {
            return this.hide();
        } else {
            this.clock -= 1;
        }
    };

    Atlantic.WelcomeScreen.prototype.stopCountdown = function () {
        clearInterval(this.timeout);
        this.timeout = false;
    };

    welcomeScreen = new Atlantic.WelcomeScreen();
})();

/**
 * Comment counting script.
 * This assumes `disqus_shortname` is set somewhere higher on the page.
 *
 * Warning: madness ensures below.
 *
 * Disqus gives us very little control over the formatting of the comment count.
 * So as we fire their script, we rewrite their displayCount method on the fly.
 *
 * To use it, give take links to a post and add either...
 * 1. `#disqus_thread` to the href
 * 2. data-disqus-identifier="unique-id-passed-to-disqus"
 *
 * The inner content of the link should be the default text - what appears if there
 * are no comments and before the comment counts are retrieved.
 *
 * Then add `data-disqus-template="{} comments"`, where `{}` will be replaced by
 * the comment count. This lets use format the comments different on different design elements as needed.
 *
 */

(function() {

    // Abort if there's no shortname
    if (window.disqus_shortname === undefined){
        if (window.console) {
            window.console.error("Disqus name is not defined.")
        };
        return;
    }

    // The Disqus stuff
    var s = document.createElement('script');
    s.async = true;
    s.type = 'text/javascript';
    s.src = 'http://' + disqus_shortname + '.disqus.com/count.js';

    // Hook into both the standard and IE script ready events.
    s.onload = s.onreadystatechange = function(e) {

        // Abort if we're not really ready. This throws errors in IE.
        if (window.DISQUSWIDGETS === undefined) {
            return false;
        }

        window.DISQUSWIDGETS.displayCount = function(data) {
            var resp, counter_index, comments, template, html;

            // Roll through the data their API returns. Since they batch their
            // request into groups of ten, we don't actually know the order they'll
            // come back in.
            for (var i = data.counts.length - 1; i >= 0; i--) {
                resp = data.counts[i];
                comments = resp.comments; // And how many comments it has
                if (comments > 0) { // Only change things if there's actually a comment
                    // Looping through, in case the same disqus-identifier is used twice
                    $('[data-disqus-identifier='+resp.id+']').each(function(j, counter) {
                        // There can be a specific template for singular.
                        if (comments === 1){
                            template = $(counter).attr('data-disqus-format-singular') || $(counter).attr('data-disqus-format');
                        } else {
                            template = $(counter).attr('data-disqus-format');
                        }

                        if (template === undefined) {
                            return;
                        }
                        html = template.replace("{}", comments);
                        $(counter).html(html);
                    });
                }
            }
        };

    };

    // Append this last, to avoid a race condition.
    (document.getElementsByTagName('HEAD')[0] || document.getElementsByTagName('BODY')[0]).appendChild(s);

}());

/**
 * Shows cookie disclaimer to EU users.
 *
 * ?debug_cookie_disclaimer=1 works too.
 */
(function($) {

    var EU_COUNTRIES = [
        "AUS", // Austria
        "BEL", // Belgium
        "BGR", // Bulgaria
        "HRV", // Croatia
        "CYP", // Cyprus
        "CZE", // Czech Republic
        "DNK", // Denmark
        "EST", // Estonia
        "FIN", // Finland
        "FRA", // France
        "DEU", // Germany
        "GRC", // Greece
        "HUN", // Hungary
        "IRL", // Ireland
        "ITA", // Italy
        "LVA", // Latvia
        "LTU", // Lithuania
        "LUX", // Luxembourg
        "MLT", // Malta
        "NLD", // The Netherlands
        "POL", // Poland
        "PRT", // Portugal
        "ROU", // Romania
        "SVK", // Slovakia
        "SVN", // Slovenia
        "ESP", // Spain
        "SWE", // Sweden
        "GBR", // United Kingdom
    ];

    function render() {
        var msgText = "TheAtlantic.com uses cookies to enhance your experience when " +
            "visiting the website and to serve you with advertisements that might interest you. " +
            "By continuing to use this site, you agree to our use of cookies. ";
        var linkText = "Find out more here.";
        var linkUrl = "/privacy-policy/";
        var html = [
            '<div class="cookie-disclaimer">',
                '<div class="wrapper">',
                    '<p>',
                        msgText,
                        '<a href="'+linkUrl+'">' + linkText + '</a>',
                    '</p>',
                    '<button class="accept">Accept cookies</button>',
                '</div>',
            '</div>'
        ].join("");
        var $module = $(html);
        $("body").prepend($module);

        // Bind Event
        $module.on("click", "button", function(){
            $module.slideUp(100);
            Atlantic.Utils.createCookie("acceptsCookies", 1, 365);
        });
    }

    /**
     * Check if the user is in an EU country.
     */
    function renderForEuropeans() {

        // This is cached to a cookie so we only ping once per person
        var inEuropeanUnion = Atlantic.Utils.readCookie("inEuropeanUnion");

        if (inEuropeanUnion === null) {  // Not recorded. Look it up.
            $.getJSON("/api/user_country", function(resp){
                var inEuropeanUnion = EU_COUNTRIES.indexOf(resp.country) > -1;
                if (inEuropeanUnion) {
                    Atlantic.Utils.createCookie("inEuropeanUnion", "1", 180);
                    render();
                } else {
                    Atlantic.Utils.createCookie("inEuropeanUnion", "0", 180);
                }
            });
        } else if (inEuropeanUnion === "1") {
            render();
        }
    }

    var alreadyAccepted = Atlantic.Utils.readCookie("acceptsCookies");
    var debug = /\?debug_cookie_disclaimer/.test(window.location.search);
    
    if (debug) {
        render();
    } else if (!alreadyAccepted) {
        renderForEuropeans();
    }

})(jQuery);

/**
 * Code to implement A/B tests.
 */

$(function(){
    var lastScrollTop = 0, delta = 5;
    $(window).scroll(function(event){
        var st = $(this).scrollTop();

        if(Math.abs(lastScrollTop - st) <= delta)
           return;

        lastScrollTop = st;
    });
});


/**
 * Setup Continue Reading buttons for mobile
 * users who come from social.
 */
(function(){
    function unTruncate() {
        $(".article-body").removeClass("truncated").css({height: "auto"});
    }

    function truncate() {
        $(".article-body").addClass("truncated");
        var $firstAd = $(".article-body .ad").eq(0);
        var $articleBody = $(".article-body");
        var truncateHeight = ($firstAd.offset().top - $articleBody.offset().top) + 650;
        $articleBody.css({height: truncateHeight});
    }

    if (Atlantic.ab.getGroup() === "continue_truncate:social") {
        var test = window.location.search.match(/[\?\&]test_truncate_article/);
        var isMobile = matchMedia("(max-width: 600px)").matches;
        var fromSocial = document.referrer.match(/(facebook\.com\/)|(t\.co\/)/);
        if ((test || fromSocial) && isMobile) {
            truncate();
        }

        $(".article-links .continue-reading").on("click", function(e){
            unTruncate();
            e.stopPropagation();
            e.preventDefault();
            Atlantic.Omniture.trackLink("article-continue-reading", true, true);
        });

        // If the browser resizes past mobile, shut this down.
        var mq = matchMedia("(min-width: 601px)");
        var mqListener = function(e){
            if (!e.matches) {
                unTruncate();
                mq.removeListener(mqListener);
            }
        };
        mq.addListener(mqListener);
    }
}());


$(".test-hp_img_density-small .single-half").removeClass("single-half").addClass("single-third");
$(".test-hp_img_density-small .single-two-thirds").removeClass("single-two-thirds").addClass("single-half");
$(".test-hp_img_density-smallest .single-half").removeClass("single-half").addClass("single-third");
$(".test-hp_img_density-smallest .single-two-thirds").removeClass("single-two-thirds").addClass("single-third");

/**
 * Photo channel sharekit tests. ref 5672
 * Inserts a sharekit just below the 'Jump to Comments' button
 * Test url-query: ?atl_test=sharekit:lower
 */
(function(){
    if (Atlantic.ab.getGroup() === "sharekit:lower") {
        var wrapper = (
            '<h2 class="test-share-kit-title">Share Gallery</h2>\n' +
            '<div class="test-share-kit-wrapper">\n' +
            '   <div class="test-share-kit">\n' +
            '        <div class="links-wrapper">\n' +
            '        </div>\n' +
            '    </div>\n'+
            '</div>\n'
        );
        $(".comments-jump").prepend(wrapper);
        var $icons = $(".social-icons.component-social").eq(0).clone();
        $(".test-share-kit .links-wrapper").append($icons);
    }
})();


        Atlantic.setUpNewsletterSignUp('[data-newsletter-signup]', '/newsletters/api/sign-up/');
    