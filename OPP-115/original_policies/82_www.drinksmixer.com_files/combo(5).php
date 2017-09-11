YUI.add("notifier",function(a){function b(a){b.superclass.constructor.apply(this,arguments)}b.NAME="Notifier",b.ATTRS={message:{value:""},header:{value:""},position:{value:"bottom-right"},timeout:{value:0}},b.MARKUP='<div class="yui3-notify-close"><a title="close">X</a></div><div class="yui3-notifier-header  {header_show} ">{header}</div><div class="yui3-notifier-message">{message}</div>',a.extend(b,a.Widget,{BOUNDING_TEMPLATE:"<div/>",initializer:function(){this.publish("close",{defaultFn:this._defCloseFn}),this.publish("closed",{defaultFn:this._removeNode})},renderUI:function(){var c=this.get("contentBox"),d=this.get("message"),e=this.get("header"),f,g;e?g="notifier-header-show":g="notifier-header-noshow",f={message:d,header:e,header_show:g},c.append(a.Node.create(a.substitute(b.MARKUP,f))),this.get("boundingBox").addClass(this.get("position")),c.on("click",a.bind(this._onClickCloseEvent,this),".yui3-notify-close")},bindUI:function(){this.after("messageChange",this._afterMessageChange),this.after("headerChange",this._afterHeaderChange),this._onHover()},syncUI:function(){var b=this.get("timeout");this._uiSetMessage(this.get("message")),this._uiSetHeader(this.get("header")),b>0&&(this.timer=new a.Timer({length:b,repeatCount:1,callback:a.bind(this.hide,this)}),this.timer.start())},hide:function(a){var b=this,c=this.get("boundingBox");this.timer&&(this.timer.stop(),this.timer=null),c.transition({opacity:0,easing:"ease-in",duration:.5},function(){b.fire("closed")})},pause:function(){this.timer&&this.timer.pause()},resume:function(){this.timer&&this.timer.resume()},_onHover:function(){var b=this.get("contentBox");b.on("mouseenter",a.bind(this.pause,this)),b.on("mouseleave",a.bind(this.resume,this))},_onClickCloseEvent:function(a){this.fire("close",{originalEvent:a})},_defCloseFn:function(a){this.hide()},_afterMessageChange:function(a){this._uiSetMessage(a.newVal)},_afterHeaderChange:function(a){(a||a.newVal)&&this._uiSetHeader(a.newVal)},_uiSetMessage:function(b){var c=a.one(".yui3-notifier-message");c.set("innerHTML",b)},_uiSetHeader:function(b){var c=a.one(".yui3-notifier-header");c.set("innerHTML",b)},_removeNode:function(){this.get("contentBox").remove()}}),a.Notifier=b},"@VERSION@",{requires:["intl","transition","widget","substitute","dom","event","gallery-timer"],skinnable:!0})
YUI.add("api-request",function(a){a.ApiRequest=a.Base.create("request",a.Base,[],{headers:{},initializer:function(a){this.publish("send",{preventable:!0,defaultFn:this._send})},addHeader:function(a,b){this.headers[a]=b},addHeaders:function(b){var c=this;a.Object.each(b,function(a,b){c.addHeader(b,a)})},getHeaders:function(){return this.headers},send:function(){this.fire("send",{request:this})},_send:function(a){},_appendQuery:function(b,c){return a.ApiCommand.prototype._appendQuery.call(this,b,c)}},{ATTRS:{uri:{value:""},method:{value:"GET"},data:{value:{}},useCredentials:{value:!1}}}),a.ApiIORequest=a.Base.create("request-io",a.ApiRequest,[],{_send:function(b){var c=this.get("uri"),d={method:this.get("method"),data:this.get("data"),headers:this.getHeaders(),xdr:{use:"native",credentials:this.get("useCredentials")},on:{success:a.bind(this.success,this),failure:a.bind(this.failure,this)}};return a.io(c,d)},success:function(a,b){var c=this.parse(b.responseText);this.fire("success",{result:c,request:this,response:b})},failure:function(a,b){var c=this.parse(b.responseText);this.fire("error",{result:c,request:this,response:b})},parse:function(b){try{return a.JSON.parse(b)}catch(c){return null}}}),a.ApiJsonPRequest=a.Base.create("request-jsonp",a.ApiRequest,[],{_send:function(b){var c=this.get("uri"),d=this.get("method"),e=a.QueryString.stringify(this.get("data")),f={on:{success:a.bind(this.success,this),failure:a.bind(this.failure,this),timeout:a.bind(this.timeout,this)}};return e.length>0&&(c=a.ApiCommand.prototype._appendQuery.call(this,c,e)),c=a.ApiCommand.prototype._appendQuery.call(this,c,"callback={callback}"),"GET"!==d.toUpperCase()&&(c=this._appendQuery(c,"_method="+d)),a.jsonp(c,f)},success:function(a){var b={request:this,error:null,result:null};!a||a.error?b.error=a:b.result=a,this.fire("success",b)},failure:function(){this.fire("error",{src:"failure",request:this,result:null})},timeout:function(){this.fire("error",{src:"timeout",request:this,result:null})}})},"@VERSION@",{requires:["io-base","io-xdr","event-custom-base","jsonp","base"]})

YUI.add("api-command",function(a){function t(a){t.superclass.constructor.apply(this,arguments)}var b=a.Lang,c=a.QueryString,d=a.Object,e=a.Array,f="api-base",g="baseUrl",h="corsEnabled",i="commands",j=b.isString,k=b.isObject,l=b.isFunction,m=b.isUndefined,n=d.owns,o=d.hasKey,p=/^GET|POST|PUT|DELETE|PATCH|HEAD$/i,q=/^GET|HEAD$/,r={},s={};t.NAME="apiCommand",r.client={},r.alias={},r.url={},r.method={},r.credentials={value:!1},r.cors={value:!1},r.request={validator:"_testRequestVal"},t.ATTRS=r,a.extend(t,a.Base,{initializer:function(){this.after("requestChange",this._setRequestAttr)},prepare:function(a){var b=this.get("client"),c=this.get("request");c.setAttrs({uri:b.url(this),data:a||{}}),this.get("credentials")&&c.set("useCredentials",!0)},isMethodAllowed:function(a){return p.test(a)},getMethod:function(b){var c=this.get("method");return c?c.test&&!c.test(b)?c.source.split("|")[0]:!a.Lang.isString(b)||b.toUpperCase()!==c?c:b:b||"GET"},url:function(b){var d=this.get("url"),e="",f;return k(b)&&(d.indexOf("{")>-1&&(f=a.mix({},b),d=d.replace(/\{([^\}]+)\}/g,function(a,b){console.log(arguments);var c;if(b in f)return c=f[b],delete f[b],c}),b=f),e=c.stringify(b)),this._appendQuery(d,e)},_appendQuery:function(a,b){return k(b)&&(b=c.stringify(b)),j(b)&&b.length>0?a+(a.indexOf("?")===-1?"?":"&")+b:a},_testRequestVal:function(b){return a.instanceOf(b,a.ApiRequest)},_setRequestAttr:function(a){a.newVal.addTarget(this)}}),a.ApiCommand=t},"@VERSION@",{requires:["base","querystring","jsonp","json-parse","io-xdr","arraylist","api-request"]})
YUI.add("api-base",function(a){var b=a.Lang,c=a.QueryString,d=a.Object,e=a.Array,f="api-base",g="baseUrl",h="corsEnabled",i="commands",j="crossDomain",k="defaultCommandType",l=b.isString,m=b.isObject,n=b.isFunction,o=b.isUndefined,p=d.owns,q=d.hasKey,r=/^GET|POST|PUT|DELETE|PATCH|HEAD$/i,s=/^GET|HEAD$/,t={},u={};typeof YUI.Env.APIS=="undefined"&&(YUI.Env.APIS={}),t[g]={setter:"_setBaseUrlAttr"},t[i]={value:{},validator:m},t[h]={value:q(new XMLHttpRequest,"withCredentials")},t[k]={value:a.ApiCommand},a.ApiBase=a.Base.create(f,a.Base,[],{initializer:function(){this.publish("addCommand",{defaultTargetOnly:!0,defaultFn:this._defAddCommandFn}),this.publish("removeCommand",{defaultTargetOnly:!0,defaultFn:this._defRemoveCommandFn}),this._commands=[],this._commandMap={},this.registerCommands()},registerCommands:function(){},request:function(a,b,c,d){var e=this,f;l(b)?f=this.getCommand(b):(d=c,c=b,b=a,a="GET",f=this.getCommand(b));if(n(c)||o(c))d=c,c={};return f.isMethodAllowed(a)||(a="GET"),e._request(a.toUpperCase(),f,c,d)},_request:function(b,c,d,e){var f,g;!this.get(h)||c.get("cors")===!1?g=a.ApiJsonPRequest:g=a.ApiIORequest,f=new g({method:c.getMethod(b),data:d}),c.set("request",f),c.prepare(d),f.once("success",function(a){this._requestCallback(a,e)},this),f.once("error",function(a){this._requestErrorCallback(a,e,f)},this),f.send()},_requestCallback:function(a,b){b&&b(a.error,a.result,a)},_requestErrorCallback:function(a,b,c){c.get("uri").match(/^https/)?(c.set("uri",c.get("uri").replace(/^https/,"http")),c.once("error",function(a){this._requestCallback(a,b)},this),c.send()):this._requestCallback(a,b)},_createCommand:function(c){var d=this.get("defaultCommandType"),e=c.commandType,f,g,h;return e&&(g=b.isString(e)?a[e]:e),b.isFunction(g)?h=g:d&&(h=d),h?command=new h(c):a.error("Could not create a command instance because its constructor is either undefined or invalid."),command},_defAddCommandFn:function(a){var b=a.command,c=this._commands,d=this._commandMap;b.get("client")&&b.remove(),b._set("client",this),b.addTarget(this),b.get("alias")&&(d[b.get("alias")]=b),c.push(b)},_defRemoveCommandFn:function(a){var b=a.command,c=this._commands;b.removeTarget(this),b._oldClient=b.get("client"),b._set("client",null)},_add:function(c,d){var e,f,g;return b.isArray(c)?(e=[],a.each(c,function(a,b){f=this._add(a,d+b),f&&e.push(f)},this),e.length>0&&(g=children)):(a.instanceOf(c,a.ApiCommand)?f=c:f=this._createCommand(c),f&&this.fire("addCommand",{command:f})&&(g=f)),g},add:function(){var c=this._add.apply(this,arguments),d=c?b.isArray(c)?c:[c]:[];return new a.ArrayList(d)},remove:function(a){var b=this._items[a],c;return b&&this.fire("removeCommand",{command:b})&&(c=b),c},url:function(b,c){var c=this.getParams(c||{}),d="",e;return l(b)&&(b=this.getCommand(b)),a.instanceOf(b,a.ApiCommand)?e=b.url(c):e=this._appendQuery(b.url,c),this._appendPath(this.get(g),e)},_appendQuery:function(a,b){return m(b)&&(b=c.stringify(b)),l(b)&&b.length>0?a+(a.indexOf("?")===-1?"?":"&")+b:a},_appendPath:function(a,b){return a.replace(/\/+$/,"")+"/"+b.replace(/^\/+/,"")},validateMethod:function(a){return r.test(a)},getParams:function(a){return a},isCommand:function(a){return q(this.get(i),a)},isCacheable:function(a,b){if(l(b)&&!s.test(b))return!1;var c=l(a)?this.getCommand(a):a;return q(c,"cache")&&c.cache!==!1},getCommand:function(a){if(!q(this._commandMap,a)){var b=this.get(i),c={cache:!1};q(b,a)&&(c=b[a]),q(c,"url")||(c.url=a),this._commandMap[a]=this._createCommand(c),this._commandMap[a]._set("client",this),this._commandMap[a].addTarget(this)}return this._commandMap[a]},_setBaseUrlAttr:function(a){return a.replace(/\/+$/,"")}},{ATTRS:t,getInstance:function(){var a=this.prototype.constructor,b=a.NAME,c=YUI.Env.APIS;return c[b]||(c[b]=new a),c[b]}}),a.ApiClient=a.ApiBase},"@VERSION@",{requires:["base","querystring","api-command","api-request"]})
YUI.add("connect-api",function(a){a.ConnectUserCommand=a.Base.create("connectUserCommand",a.ApiCommand,[],{user:null,initializer:function(){this.on("*:send",this._checkUser),this.after("*:success",this._afterSuccess)},_checkUser:function(a){var b=this.get("client"),c="connect_"+b.get("clientId"),d,e;if(this.user&&!this.user.error){a.preventDefault(),a.request.fire("success",{result:this.user,request:a.request,response:{}});return}d=this._loadToken(c),d?a.request.addHeader("Authorization","Bearer "+d.oauth_token):(a.preventDefault(),this._fireError(a))},_loadToken:function(b){var c=a.Cookie.get(b);return c?a.QueryString.parse(c.replace(/^"/,"").replace(/"$/,"")):!1},_fireError:function(a){var b={error:"access_denied"};a.request.fire("error",{result:b,request:a.request,response:b})},_afterSuccess:function(a){a.result&&a.result.firstname&&(this.user=a.result)}},{ATTRS:{cors:{value:!0}}});var b=a.Attribute,c=a.Lang,d="connect",e="baseUrl",f="corsEnabled",g="clientId",h="redirectUri",i="commands",j="user",k=/_([a-z])/,l=/([A-Z])([a-z])/,m=function(a){return a.replace(k,function(a,b){return b.toUpperCase()})},n=function(a){return a.replace(l,function(a,b,c){return"_"+b.toLowerCase()+c})},o=a.Object.owns,p=c.isString,q=c.isObject,r={},s=function(a,b){if(typeof connect_cfg=="undefined")return b;if(q(connect_cfg)){if(o(connect_cfg,a))return connect_cfg[a];if(o(connect_cfg,n(a)))return connect_cfg[n(a)]}return b};typeof connect_cfg=="undefined"&&(connect_cfg={}),r[e]={valueFn:function(){return s(e,"http://connect.sheknows.com")}},r[g]={valueFn:function(){return s(g)}},r[h]={valueFn:function(){return s(h)}},a.Connect=a.Base.create(d,a.ApiBase,[],{initializer:function(){this._yuievt.defaults.broadcast=2,this.publish(j),this.publish("notifyAction")},registerCommands:function(){this.add(new a.ConnectUserCommand({alias:"me",url:"me",event:{name:"user",response:"user"},cache:!0,cors:!1}),{alias:"notifyAction",method:"GET",url:"/me/action",event:{name:"notifyAction",response:"action"},cors:!1},{alias:"userNotifications",method:"GET",url:"/me/notifications",cors:!1},{alias:"readChallenge",method:"POST",url:"/me/challenge_reset",cors:!1})},me:function(a,b,c){return p(a)?a="me/"+a:(c=b,b=a,a="me"),this.request(a,b,c)},get:function(a,c,d){return a.substr(0,2)==="me"||a.indexOf("/")!==-1?this.request(a,c,d):b.prototype.get.apply(this,arguments)},getParams:function(a){return o("client_id",a)||(a.client_id=this.get(g)||connect_cfg.client_id),a}},{ATTRS:r,getInstance:a.ApiBase.getInstance})},"@VERSION@",{requires:["api-base","cookie","querystring"]})
YUI.add("rewards-api",function(a){a.RewardsApi=a.Base.create("rewards-api",a.ApiBase,[],{},{ATTRS:{baseUrl:{value:"http://rewards.sheknows.com/api"},commands:{value:{products:{url:"/store/products.json",cache:!0}}}},getInstance:a.ApiBase.getInstance})},"@VERSION@",{requires:["api-base"]})
YUI.add("rewards-client",function(a){function b(){b.superclass.constructor.apply(this,arguments)}b.NAME="rewards",b.ATTRS={api:{setter:"_setApiAttr"},rewardsClient:{valueFn:function(){return new a.RewardsApi}}},a.RewardsClient=a.extend(b,a.Base,{initializer:function(a){a.api&&this.set("api",a.api),this._yuievt.defaults.broadcast=2,this.publish("notifyAction")},track:function(a,b){var c=this,d=c.api;d.me("action",a,function(d){c.fire("notifyAction",{response:d,params:a}),b&&b(d)})},getUserNotifications:function(a){var b=this,c=b.api;c.me("notifications",function(c){b.fire("userNotification",{notifications:c}),a&&a(c)})},request:function(a,b,c){var d=this.get("rewardsClient");return d.isMethod(a)?d.request(a,b,c):this.api.request(a,b,c)},_setApiAttr:function(a){this.api=a}})},"@VERSION@",{requires:["connect-api","rewards-api","base"]})
YUI.add("rewards-user",function(a){var b=a.Lang;a.RewardsModel=a.Base.create("rewardsModel",a.Model,[],{initializer:function(b){b||(b={}),this.connect=b.connect||a.Connect.getInstance()}},{_NON_ATTRS_CFG:a.Base._NON_ATTRS_CFG.concat(["connect"])}),a.RewardsUserAction=a.Base.create("rewardsUserAction",a.RewardsModel,[],{_setMsgAttr:function(a){var b=this;return 0<this.get("value")?a:a.replace(/^You just earned (\d+) credits for "(.+?)"!$/i,function(a,c,d){return c&&d&&b.set("value",parseInt(c,10)),d})}},{ATTRS:{msg:{value:"",setter:"_setMsgAttr"},value:{value:0}}}),a.RewardsUserActionList=a.Base.create("rewardsUserActionList",a.ModelList,[],{model:a.RewardsUserAction}),a.RewardsAchievement=a.Base.create("rewardsAchievement",a.RewardsModel,[],{idAttribute:"challengeID"},{ATTRS:{badgeURL:{},level:{},isNewLevel:{value:!1},pointsTotal:{value:0},points7Days:{value:0},rank:{},rank7Days:{}}}),a.RewardsAchievementList=a.Base.create("rewardsAchievementList",a.ModelList,[],{model:a.RewardsAchievement}),a.RewardsUser=a.Base.create("rewardsUser",a.RewardsModel,[],{sync:function(a,b,c){"read"===a?this.connect.request("me",function(a,b,d){b&&b.error?c(b.error):c(a,b)}):c('"'+a+'" is not currently supported')},track:function(b,c){var d=this;this.connect.request("/me/action",b,function(b,c,e){var f=d.get("points");a.Lang.isObject(c)&&c.actions&&c.actions.length&&(a.Array.each(d.get("actions").add(c.actions),function(a){a.toJSON(),f+=parseInt(a.get("value"),10)}),d.set("points",f))})},hasRole:function(c){var d=this.get("roles");return b.isArray(d)?-1<a.Array.indexOf(d,c.toUpperCase()):!1},getName:function(){var a=this.get("firstname"),b=this.get("lastname");return b&&b.length>0?a+" "+b:a},toJSON:function(){var b=a.Model.prototype.toJSON.call(this);return b.actions=b.actions.toJSON(),b.achievements=b.achievements.toJSON(),b.name=this.getName(),b},_setListData:function(c,d){var e,f=d==="actions"?a.RewardsUserActionList:a.RewardsAchievementList;return b.isArray(c)?(e=new f,e.addTarget(this),e.reset(c),e):c}},{ATTRS:{firstname:{value:""},lastname:{value:""},roles:{value:[]},points:{value:0,setter:function(a){return parseInt(a,10)}},providers:{value:[]},actions:{valueFn:function(){var b=new a.RewardsUserActionList;return b.addTarget(this),b},setter:"_setListData"},achievements:{valueFn:function(){var b=new a.RewardsAchievementList;return b.addTarget(this),b},setter:"_setListData"},name:{getter:"getName"}}})},"@VERSION@",{requires:["connect-api","model","model-list","base"]})
YUI.add("rewards",function(a){var b=a.Lang;a.Rewards=a.Base.create("rewards",a.Base,[],{initializer:function(c){var d=this,e;this._queue=[],d.publish("user",{broadcast:2,defaultFn:d._defUserLoaded}),e=d.after("initializedChange",function(c){var f=d.get("user");e.detach();if(a.instanceOf(f,a.RewardsUser))return;a.instanceOf(f,a.Model)?f=f.getAttrs():b.isObject(f)||(f={}),d.set("user",new a.RewardsUser(f))}),d.after({userChange:d._attrUserChange,"rewardsUser:load":d._afterUserLoad,"rewardsUser:error":d.checkUser,trackingActiveChange:d._afterTrackingActiveChange}),c&&c.user&&this._set("user",c.user)},checkUser:function(){var a=this.get("user");this.fire("user",{isRewardsUser:a.hasRole("ROLE_REWARDS"),user:a})},push:function(){this._queue.push.apply(this._queue,Array.prototype.slice.call(arguments)),this.get("trackingActive")&&this._sendTrackingData()},_defUserLoaded:function(a){if(!a.isRewardsUser)return;this.set("trackingActive",!0)},_afterUserLoad:function(a){this.checkUser()},_attrUserChange:function(b){b.prevVal&&a.instanceOf(b.prevVal,a.Model)&&b.prevVal.removeTarget(this),b.newVal&&a.instanceOf(b.newVal,a.Model)&&(b.newVal.addTarget(this),this._setUserAttr(b.newVal))},_sendTrackingData:function(){var a=this;a.worker=!0,this._next()},_next:function(){var b=this,c=this.get("user"),d;if(!this.worker)return;if(!this.get("trackingActive")||!this._queue.length){delete this.worker;return}if(!a.instanceOf(c,a.RewardsUser))return;d=this._queue.shift(),c.track(d,function(){b._next()})},_setUserAttr:function(a){a._connectClient=this.get("connect"),a.isNew()?a.load():this.checkUser()},_checkUserAttr:function(b){return a.Lang.isObject(b)||a.instanceOf(b,a.Model)},_afterTrackingActiveChange:function(a){a.newVal?this._sendTrackingData():delete this.worker}},{ATTRS:{user:{validator:"_checkUserAttr"},connect:{valueFn:function(){return a.Connect.getInstance()}},trackingEnabled:{value:!0},trackingActive:{value:!1}}})},"@VERSION@",{requires:["rewards-client","connect-api","rewards-user"]})
YUI.add("rewards-tracker",function(a){var b=a.config.win,c=b.rewards||[];if(a.instanceOf(c,a.Rewards))return;b.rewards=new a.Rewards,b.rewards.push.apply(b.rewards,c)},"@VERSION@",{requires:["rewards"]})
YUI.add("relative-date",function(a){var b=function(a){function j(b,c){!c&&(c=(new Date).getTime()),c instanceof Date&&(c=c.getTime()),b instanceof Date&&(b=b.getTime());var d=c-b,e,f,g;for(f=-1,g=i.length;++f<g;){e=i[f];if(d<e[0])return e[2]==a?e[1]:Math.round(d/e[2])+" "+e[1]}}var b=1e3,c=60*b,d=60*c,e=24*d,f=7*e,g=e*365,h=g/12,i=[[.7*c,"just now"],[1.5*c,"a minute ago"],[60*c,"minutes ago",c],[1.5*d,"an hour ago"],[e,"hours ago",d],[2*e,"yesterday"],[7*e,"days ago",e],[1.5*f,"a week ago"],[h,"weeks ago",f],[1.5*h,"a month ago"],[g,"months ago",h],[1.5*g,"a year ago"],[Number.MAX_VALUE,"years ago",g]];return j}();typeof module!="undefined"&&module.exports&&(module.exports=b),a.relativeDate=b},"@VERSION@",{})
YUI.add("handlebars-helpers",function(a){var b=a.DataType,c=a.Lang,d=c.isString;a.Handlebars.templates||(a.Handlebars.templates={}),a.Handlebars.registerHelper("date_format",function(a,c){return d(c)||(c="%B %e, %Y"),b.Date.format(b.Date.parse(a),{format:c})}),a.Handlebars.registerHelper("relative_date",function(e,f){return a.instanceOf(e,Date)||(d(e)?e=b.Date.parse(e):c.isNumber(e)&&(e=new Date(e*1e3))),e===null?!1:(d(f)?f=b.Date.parse(f):a.instanceOf(f,Date)||(f=(new Date).getTime()),a.relativeDate(e,f))}),a.Handlebars.registerHelper("number_format",function(a){return b.Number.format(parseInt(a,10),{thousandsSeparator:","})}),a.Handlebars.registerHelper("trans_choice",function(a,b,c){return parseInt(a,10)===1?b:c}),a.template=a.cached(function(b,d){var e=a.one('script[name="'+b+'"]');if(e)return a.Handlebars.compile(e.getContent());if(a.Handlebars.templates.hasOwnProperty(b))return a.Handlebars.templates[b];if(c.isString(d))return a.Handlebars.compile(d);arguments.length>1&&a.error('An invalid default template was provided.  The "source" must be of type "string".'),a.error('Unable to find a Handlebars template named "'+b+'"')})},"@VERSION@",{requires:["handlebars","datatype","relative-date"]})
YUI.add("popup",function(a){var b="popup",c="document",d="key",e="esc",f="clickoutside",g=a.ClassNameManager.getClassName;a.Popup=a.Base.create(b,a.Overlay,[a.WidgetAutohide,a.WidgetModality],{ARROW_TEMPLATE:'<span class="{className}">arrow</span>',initializer:function(a){this._bb=this.get("boundingBox"),this._cb=this.get("contentBox")},toggle:function(){this.set("visible",!this.get("visible"))},renderUI:function(){this.get("modal")||this._renderArrow()},syncUI:function(){this._uiSetPosition(this.get("position"))},_renderArrow:function(){this.get("boundingBox").addClass(this.get("arrow"));if(this._cb.one("."+g(b,"arrow")))return;this._cb.prepend(a.Lang.sub(this.ARROW_TEMPLATE,{className:g(b,"arrow")}))},_validatePosition:function(b){return a.Lang.isString(b)&&/^fixed|absolute|static|relative$/i.test(b)},_afterPositionAttr:function(a){a.newVal&&this._uiSetPosition(a.newVal)},_uiSetPosition:function(a){this._bb.setStyle("position",a)}},{ATTRS:{alignOn:{valueFn:function(){return[{node:a.one("win"),eventName:"resize"}]}},hideOn:{valueFn:function(){return[{node:a.one(c),eventName:d,keyCode:e},{eventName:f}]}},arrow:{value:"top"},position:{value:"absolute",validator:"_validatePosition"}}})},"@VERSION@",{requires:["overlay","widget-autohide","event-outside","widget-modality"],skinnable:!0})
YUI.add("rewards-bar",function(a){a.RewardsBarItem=a.Base.create("rewards-bar-item",a.Widget,[a.WidgetChild],{ICON_TEMPLATE:'<i class="rewards-icon {icon}"></i>',TITLE_TEMPLATE:'<span class="{className}">{title}</span>',bindUI:function(){var b=this.get("contentBox"),c=[];c.push(b.on("click",a.bind(this.onClick,this))),this._evtHandlers=c},destructor:function(){a.Array.each(this._evtHandlers,function(a){a.detach()}),this.overlay&&(this.overlay.destroy(),delete this.overlay),this._evtHandlers=[]},renderUI:function(){var a=this.get("contentBox"),b=this.get("iconNode"),c=this.get("titleNode");a.contains(b)||a.append(b),a.contains(c)||a.append(c)},onClick:function(a){var b=this.getOverlay();b.set("visible",!b.get("visible"))},getOverlay:function(){if(this.overlay)return this.overlay;var b=this,c;return c=new a.Popup({align:{node:this.get("contentBox"),points:[a.WidgetPositionAlign.TC,a.WidgetPositionAlign.BC]},position:"fixed",bodyContent:"Hello, World!",zIndex:1002,visible:!1}),b._evtHandlers.push(c.on("visibleChange",function(c){b.get("boundingBox").toggleClass(a.ClassNameManager.getClassName("rewards-bar-item","active"),c.newVal)})),this.fire("initOverlay",{overlay:c}),c.render(),c.get("boundingBox").addClass("yui3-rewards-popup"),this.overlay=c,c},_uiSetTitle:function(a){}},{ATTRS:{user:{},title:{value:""},icon:{valueFn:function(){return this.name+"-item"}},titleNode:{valueFn:function(){var b={className:this.getClassName("title"),title:this.get("title")};return a.Node.create(a.Lang.sub(this.TITLE_TEMPLATE,b))}},iconNode:{valueFn:function(){var b={icon:this.get("icon")};return a.Node.create(a.Lang.sub(this.ICON_TEMPLATE,b))}}},HTML_PARSER:{iconNode:function(a){return a.one("."+this.get("icon"))},titleNode:function(a){return a.one("."+this.getClassName("title"))}}}),a.RewardsBarActivityItem=a.Base.create("rewards-activity",a.RewardsBarItem,[],{renderCount:0,initializer:function(b){this.on("initOverlay",this.buildOverlay,this),this.after("userChange",this._afterUserAttr),this.timer=new a.Timer({timeout:this.get("notificationTimeout"),repeatCount:1,callback:a.bind(this._onPopupTimeout,this)}),b&&this._setUserAttr(b.user||this.get("user")),this._popupEvents=[]},buildOverlay:function(b){var c=b.overlay,d=a.Node.create("<ul />"),e=this.get("user"),f=this.get("itemTemplate");c.plug({fn:a.Plugin.TransitionOverlay,cfg:{hide:{opacity:0,marginTop:"10px"},show:{opacity:1}}}),c.transitionPlugin.on("end",function(a){a||c.get("boundingBox").setStyle("marginTop",0)}),e.get("actions").each(function(a){d.append(f(a.toJSON()))}),c.set("bodyContent",d)},renderItem:function(b){var c=b.model,d=this.getOverlay(),e=d.get("contentBox").one("ul"),f,g,h;c&&(f=c.toJSON(),f.msg.match(/^You just earned/i)||(f.msg=a.Lang.sub('You just earned {value} for credits "{msg}"!',f)),h="action-id-"+f.id,g=this.get("singleTemplate")(f),0===this.renderCount++?(e.setContent(g),this.showNotificationPopup()):a.all("."+h).size()<1&&e.prepend(g))},showNotificationPopup:function(){var a=this.getOverlay(),b=this.timer;a.show(),this.timer.start(),a.once("hide",this._detachPopupEvents,this),this._attachPopupEvents()},_attachPopupEvents:function(){var a=this._popupEvents,b=this.getOverlay(),c=b.get("boundingBox");a.push(c.on("mouseover",this._onPopupMouseOver,this),c.on("mouseout",this._onPopupMouseOut,this))},_detachPopupEvents:function(){a.Array.each(this._popupEvents,function(a){a.detach()}),this._popupEvents=[]},_onPopupMouseOver:function(a){this.timer.stop()},_onPopupMouseOut:function(a){this.timer.start()},_onPopupTimeout:function(){this.getOverlay().hide()},_afterUserAttr:function(a){a.newVal&&this._setUserAttr(a.newVal)},_afterUserPointsChange:function(a){a.newVal>0&&a.prevVal<a.newVal&&this._uiSetPointsEarned(a.newVal-a.prevVal)},_uiSetPointsEarned:function(a){var b=this.get("stickerNode");b.setContent(a),this.get("boundingBox").addClass(this.getClassName("sticker","active")),b.inDoc()||this.get("contentBox").append(b)},_setUserAttr:function(a){a&&(a.after("rewardsUserActionList:add",this.renderItem,this),a.after("pointsChange",this._afterUserPointsChange,this))}},{ATTRS:{title:{value:"Activity"},itemTemplate:{valueFn:function(){return a.template(this.name+"-item",'<li class="rewards-menuitem"><span class="rewards-menuitem-content">{{ number_format value }} credits for "{{ msg }}"</span></li>')}},singleTemplate:{valueFn:function(){return a.template(this.name+"-single",'<li class="rewards-menuitem action-id-{{ id }}"><span class="rewards-menuitem-content">{{ msg }}</span></li>')}},stickerNode:{valueFn:function(){return a.Node.create('<div class="'+this.getClassName("sticker")+'"></div>')}},notificationTimeout:{value:4e3}}}),a.RewardsBarAchievementItem=a.Base.create("rewards-achievement",a.RewardsBarItem,[],{itemTemplate:'<li class="yui3-menuitem"><a class="yui3-menuitem-content" href="#"><img src="{badgeURL}"></a></li>',renderItem:function(a){var b=a.model,c=this.get("contentBox").one("ul");b&&c.prepend(this.itemTemplate(b.toJSON()))}}),a.RewardsBar=a.Base.create("rewards-bar",a.Widget,[a.WidgetParent,a.WidgetStdMod],{initializer:function(a){var b=this,c;b._bb=b.get("boundingBox"),b._cb=b.get("contentBox"),b.publish("rewardsUser",{broadcast:2,defaultFn:b._defUserLoaded}),b._childrenContainer=b.get("panelsNode"),b.after({userChange:b._attrUserChange,"rewardsUser:load":b._afterUserLoad,"rewardsUser:error":b.checkUser,"rewardsUser:pointsChange":b._afterPointsChange,addChild:b._afterAddChild}),b.add(a.panels||b.get("panels")),a.user&&b._setUserAttr(a.user)},renderUI:function(){var b=this._cb,c=this.get("user"),d,e;b.contains(this._childrenContainer)||b.append(this._childrenContainer),d=a.template(this.name+"-footer","<var>{{ user.points }}</var>")({user:c.toJSON(),routes:this.get("routes")}),this.set("footerContent",d)},syncUI:function(){var b=this,c=b._bb.get("clientHeight"),d=a.one("body");d.getStyle("backgroundImage").length>4&&b._uiSetBackground(d,c),this.set("pointsNode",this._cb.one("var")),b._uiSetPadding(d,c)},checkUser:function(){var a=this.get("user");this.fire("rewardsUser",{isRewardsUser:a.hasRole("ROLE_REWARDS"),user:a})},getPanel:function(b){var c={},d;return a.Object.each(this.constructor.PANELS,function(a,b){c[a.NAME]=b}),this.each(function(e){a.Object.owns(c,e.name)&&c[e.name]===b&&(d=e)}),d},_createChild:function(b){a.Lang.isString(b)&&(b={panelType:b});var c=b.panelType,d=a.Lang.isString(c)?a.RewardsBar.PANELS[c]:c,e;return a.Lang.isFunction(d)?e=new d(b):a.error("Could not create a panel instance because its constructor is either undefined or invalid."),e},_afterAddChild:function(a){var b=a.child,c=this.get("user");c&&b.set("user",c)},_afterPointsChange:function(a){this._uiSetPoints(a.newVal)},_afterUserLoad:function(a){this.checkUser()},_attrUserChange:function(b){b.prevVal&&a.instanceOf(b.prevVal,a.Model)&&b.prevVal.removeTarget(this),b.newVal&&a.instanceOf(b.newVal,a.Model)&&(b.newVal.addTarget(this),this._setUserAttr(b.newVal))},_defUserLoaded:function(b){if(!b.isRewardsUser)return;this.get("rendered")||this.render(),this._bb.inDoc()||a.one("body").prepend(this._bb)},_setUserAttr:function(a){a._connectClient=this.get("connect"),a.addTarget(this),this.each(function(b){b.set("user",a)}),a.isNew()?a.load():this.checkUser()},_uiSetPoints:function(b){this.get("pointsNode").setContent(a.DataType.Number.format(b,{thousandsSeparator:","}))},_uiSetBackground:function(a,b){var c=a.getStyle("backgroundPosition").split(" "),d=c.shift(),e=c.shift()||d;/^(0%|top)$/i.test(e)&&a.setStyle("backgroundPositionY",b+"px")},_uiSetPadding:function(a,b){a.setStyle("marginTop",b+"px")}},{PANELS:{activity:a.RewardsBarActivityItem,achievements:a.RewardsBarAchievementItem},HTML_PARSER:{panelsNode:function(a){return a.one("."+this.getClassName("panels"))},pointsNode:function(a){return a.one("var")}},ATTRS:{user:{validator:function(b){return a.instanceOf(b,a.RewardsUser)}},headerContent:{valueFn:function(){return'<a href="'+this.get("routes.home")+'" class="'+this.getClassName("logo")+'">Rewards</a>'}},defaultChildType:{value:"RewardsBarItem"},panels:{value:["activity"]},panelsNode:{valueFn:function(){return a.Node.create(a.Lang.sub('<div class="'+this.getClassName("panels")+'" />'))}},pointsNode:{valueFn:function(){return a.Node.create("<var/>")}},routes:{valueFn:function(){var a="http://rewards.sheknows.com/";return{profile:a+"dashboard/",store:a+"store/",about:a,home:a,sheknows:"http://www.sheknows.com/",logout:a+"logout/"}}},strings:{value:{pointsMenu:"Points",badgesMenu:"Achievements"}},connect:{valueFn:function(){return a.Connect.getInstance()}},trackingEnabled:{value:!0}}})},"@VERSION@",{requires:["model","rewards-user","rewards","base","handlebars-helpers","notifier","widget","widget-parent","widget-child","widget-stdmod","node-focusmanager","popup","datatype","transition","gallery-timer","gallery-overlay-transition"],skinnable:!0})
YUI.add("rewards-bar-templates",function(a){!function(){var b=a.Handlebars,c=b.template,d=b.templates=b.templates||{};d["rewards-bar-footer"]=c(function(a,b,c,d,e){function p(a,b){var d="",e,f;return d+='<span class="yui3-rewards-separator">|</span>\n<span class="yui3-rewards-item">Available credits: <var>',i=c.user,e=i||a.user,e=e===null||e===undefined||e===!1?e:e.points,i=c.number_format,f=i||a.number_format,typeof f===l?e=f.call(a,e,{hash:{}}):f===n?e=m.call(a,"number_format",e,{hash:{}}):e=f,d+=o(e)+"</var></span>",d}c=c||a.helpers;var f="",g,h,i,j,k=this,l="function",m=c.helperMissing,n=void 0,o=this.escapeExpression;f+='<a href="',i=c.routes,g=i||b.routes,g=g===null||g===undefined||g===!1?g:g.store,typeof g===l?g=g.call(b,{hash:{}}):g===n&&(g=m.call(b,"routes.store",{hash:{}})),f+=o(g)+'">Use credits</a> <span class="yui3-rewards-separator">|</span>\n<a href="',i=c.routes,g=i||b.routes,g=g===null||g===undefined||g===!1?g:g.about,typeof g===l?g=g.call(b,{hash:{}}):g===n&&(g=m.call(b,"routes.about",{hash:{}})),f+=o(g)+'">About rewards</a> <span class="yui3-rewards-separator">|</span>\n<a href="',i=c.routes,g=i||b.routes,g=g===null||g===undefined||g===!1?g:g.sheknows,typeof g===l?g=g.call(b,{hash:{}}):g===n&&(g=m.call(b,"routes.sheknows",{hash:{}})),f+=o(g)+'" class="yui3-rewards-bgimg yui3-rewards-sklogo">SheKnows</a> <span class="yui3-rewards-separator">|</span>\n<a href="',i=c.routes,g=i||b.routes,g=g===null||g===undefined||g===!1?g:g.profile,typeof g===l?g=g.call(b,{hash:{}}):g===n&&(g=m.call(b,"routes.profile",{hash:{}})),f+=o(g)+'">',i=c.user,g=i||b.user,g=g===null||g===undefined||g===!1?g:g.firstname,typeof g===l?g=g.call(b,{hash:{}}):g===n&&(g=m.call(b,"user.firstname",{hash:{}})),f+=o(g)+" ",i=c.user,g=i||b.user,g=g===null||g===undefined||g===!1?g:g.lastname,typeof g===l?g=g.call(b,{hash:{}}):g===n&&(g=m.call(b,"user.lastname",{hash:{}})),f+=o(g)+"</a> ",i=c.user,g=i||b.user,g=g===null||g===undefined||g===!1?g:g.points,h=c["if"],j=k.program(1,p,e),j.hash={},j.fn=j,j.inverse=k.noop,g=h.call(b,g,j);if(g||g===0)f+=g;return f+='<!-- <span class="yui3-rewards-separator">|</span>\n<span class="yui3-rewards-item"><a href="#account" class="rewards-menu-toggle">toggle</a></span> -->',f})}(),!function(){var b=a.Handlebars,c=b.template,d=b.templates=b.templates||{};d["rewards-activity-item"]=c(function(a,b,c,d,e){c=c||a.helpers;var f="",g,h,i,j=this,k="function",l=c.helperMissing,m=void 0,n=this.escapeExpression;return f+='<li class="rewards-menuitem">\n    <span class="rewards-menuitem-content action-id-',i=c.id,g=i||b.id,typeof g===k?g=g.call(b,{hash:{}}):g===m&&(g=l.call(b,"id",{hash:{}})),f+=n(g)+'">',i=c.value,g=i||b.value,i=c.number_format,h=i||b.number_format,typeof h===k?g=h.call(b,g,{hash:{}}):h===m?g=l.call(b,"number_format",g,{hash:{}}):g=h,f+=n(g)+' credits for "',i=c.msg,g=i||b.msg,typeof g===k?g=g.call(b,{hash:{}}):g===m&&(g=l.call(b,"msg",{hash:{}})),f+=n(g)+'"</span>\n</li>\n',f})}(),!function(){var b=a.Handlebars,c=b.template,d=b.templates=b.templates||{};d["rewards-activity-single"]=c(function(a,b,c,d,e){c=c||a.helpers;var f="",g,h,i=this,j="function",k=c.helperMissing,l=void 0,m=this.escapeExpression;return f+='<li class="rewards-menuitem">\n<span class="rewards-menuitem-content action-id-',h=c.id,g=h||b.id,typeof g===j?g=g.call(b,{hash:{}}):g===l&&(g=k.call(b,"id",{hash:{}})),f+=m(g)+'">',h=c.msg,g=h||b.msg,typeof g===j?g=g.call(b,{hash:{}}):g===l&&(g=k.call(b,"msg",{hash:{}})),f+=m(g)+"</span>\n</li>\n",f})}()},"@VERSION@",{requires:["handlebars","handlebars-helpers"]})
YUI.add('sheknows-mainnav', function(Y) {
	window['MainNav'] = (function () {
		var exports = {},
			prettyDate, delayExecution, action_delay = 310, page_width = 764,
			selected_channel = null,
			Templater, clearMenu, ContentManager,
			navbar, active_channel_element, menu_el, menu_items, contentbox, channel_links, slider_container, slider_panels, slider_pagination, slider_pagination, slider_pagination_buttons, scroll_animation,
			prettyDate, isTouchSupported,
			currentDomain = (arkadiumDomain) ?  arkadiumDomain : window.location.protocol + '//' + window.location.hostname;

		/*
		 * JavaScript Pretty Date
		 * Copyright (c) 2011 John Resig (ejohn.org)
		 * Licensed under the MIT and GPL licenses.
		 */

		// Takes an ISO time and returns a string representing how
		// long ago the date represents.
		prettyDate = function ( time ) {
			var date = new Date((time || "").replace(/-/g,"/").replace(/[TZ]/g," ")),
				diff = (((new Date()).getTime() - date.getTime()) / 1000),
				day_diff = Math.floor(diff / 86400);

			if ( isNaN(day_diff) || day_diff < 0 ) {
				return;
			}

			return day_diff == 0 && (
					diff < 60 && "just now" ||
					diff < 120 && "1 minute ago" ||
					diff < 3600 && Math.floor( diff / 60 ) + " minutes ago" ||
					diff < 7200 && "1 hour ago" ||
					diff < 86400 && Math.floor( diff / 3600 ) + " hours ago") ||
				day_diff == 1 && "Yesterday" ||
				day_diff < 7 && day_diff + " days ago" ||
				day_diff < 31 && Math.ceil( day_diff / 7 ) + " weeks ago" ||
				'on ' + date.toGMTString().replace(/\s\d{2}:.*/, '');
		};

		isTouchSupported = function ( eventName ) {
			var el = document.createElement('div');
			el.onclick = function(){};

			var isSupported = ('ontouchstart' in el);

			if (!isSupported) {
				el.setAttribute(eventName, 'return;');
				isSupported = typeof el[eventName] == 'function';
			}

			el = null;

			return isSupported;
		};

		delayExecution = (function () {

			var delay_timer = null;

			return function ( target_function, delay, target_args, context ) {

				if ( delay_timer !== null ) {
					clearTimeout( delay_timer );
					delay_timer = null;
				}

				if ( target_args instanceof Array === false ) {
					if ( typeof target_args !== 'undefined' ) {
						target_args = [target_args];
					} else {
						target_args = [];
					}
				}

				delay_timer = setTimeout(
					(function () {
						target_function.apply( context, target_args );
					}),
					delay
				);

			};

		})();

		absoluteUrl = function (url) {
			// convert relative links to absolute
		    return (url.charAt(0) === '/') ? currentDomain + url : url;
		};

		Templater = (function () {

			var templates = {}, formatters = {};

			/** TEMPLATES **/

			templates.ArticleColumn = '<a href="{{getCurrentDomain}}/tags/{{tag}}"><img src="{{header}}" /></a>\
				<ul class="article-list">\
					{{#data}}<li>\
						{{#if thumbnail}}<div class="article-image"><a href="{{absoluteUrl url}}"> <img alt="thumb" src="{{thumbnail}}"></a></div>{{/if}}\
						<a class="article-heading" href="{{absoluteUrl url}}">{{{title}}}</a>\
						<span class="date-posted">Posted {{prettydate}}</span>\
					</li>{{/data}}\
					<li class="more no-border center"><a href="{{getCurrentDomain}}/tags/{{tag}}" class="see-more-articles">View all articles &raquo;</a></li>\
				</ul>';

			templates.ContentList = '<h4>{{title}}</h4>\
				<ul class="article-list">\
					{{#data}}<li><a href="{{#if url}}{{{url}}}{{else}}{{getCurrentDomain}}/tags/{{tag}}{{/if}}">{{{title}}}</a></li>{{/data}}\
				</ul>';

			templates.Contests = '<h4>Giveaways</h4>\
				<a href="{{getCurrentDomain}}/giveaways/category/{{category}}" class="subtitle">{{human_category}}</a>\
				<ul class="article-list">\
					{{#data}}\
						<li>\
							{{#if thumbnail}}<div class="article-image"><a href="{{absoluteUrl url}}"><img alt="thumb" src="{{thumbnail}}"></a></div>{{/if}}\
							<a href="{{absoluteUrl url}}" class="article-heading">{{{title}}}</a>\
							<span class="date-posted">Posted {{prettydate}}</span>\
						</li>\
					{{/data}}\
					<li class="bottom no-border"><a href="#" data-page="{{page}}" data-category="{{category}}" class="load-more-contests">See more giveaways</a><a href="{{absoluteUrl "/giveaways"}}" class="see-more-contests">View all giveaways &raquo;</a></li>\
				</ul>';

			templates.Dare = '<h4>Dare</h4>\
			<a href="{{absoluteUrl channel_link}}" class="subtitle">{{channel_name}}</a>\
				{{#data}}<div class="dares-container">\
					<img src="http://cdn.womensunitedonline.com/{{dirname}}/s/{{basename}}" style="float: left"/><p>{{{title}}}</p>\
					<a href="{{getCurrentDomain}}/dares/{{id}}/{{slug}}" class="button">Go</a>\
				</div>{{/data}}';

			templates.EditorsPick = '{{#data}}<h4>Editor\'s Pick</h4>\
				<a class="subtitle" href="{{absoluteUrl url}}">{{{title}}}</a>\
				<div class="media-img"><a href="{{absoluteUrl url}}"><img src="{{{phumbor_url}}}"><h4>{{{subtitle}}}</h4><p class="blurb">{{{blurb}}}</p></a></div>{{/data}}';

			templates.ExternalLink = '{{#data}}<h4>{{{title}}}</h4>\
				<ul class="feed-item center">\
					<li class="image-container"><a href="{{absoluteUrl url}}"><img src="http://cdn.womensunitedonline.com/{{dirname}}/{{basename}}"></a></li>\
					<li><p class="description"><a href="{{absoluteUrl url}}">{{blurb}}</a></p></li>\
					<li class="nav-more more"><a href="{{absoluteUrl url}}">Visit website &raquo;</a></li>\
				</ul>{{/data}}';

			templates.Featured = '{{#content_feed}}<h4>{{title}}</h4>{{/content_feed}}\
				{{#data}}<div class="media-img full"><a href="{{absoluteUrl url}}"><img src="http://cdn.womensunitedonline.com/{{dirname}}/{{basename}}"></a></div>{{/data}}';

			templates.Galleries = '<h4>Galleries</h4>\
				<ul class="nav-photo-gallery">\
				{{#galleries}}{{#Gallery}}\
				<li>\
					<a class="gallery-image" href="{{absoluteUrl url}}"><img src="{{thumbnail}}" border="0" alt="{{title}}"></a>\
					<a class="gallery-title" href="{{absoluteUrl url}}">{{{title}}</a>\
					<a class="gallery-number" href="{{absoluteUrl url}}">({{photo_count}} photos)</a>\
				</li>\
				{{/Gallery}}{{/galleries}}\
				</ul>';

			templates.GiftGuide = '<h4>Gift Guides</h4>\
				<a class="subtitle" href="{{absoluteUrl channel_url}}}">{{{channel_title}}}</a>\
				<ul class="nav-photo-gallery">\
				{{#data}}\
				<li>\
					<a class="gallery-image" href="{{absoluteUrl url}}"><img src="http://cdn.womensunitedonline.com/{{dirname}}/view/{{basename}}" border="0" alt="{{title}}"></a>\
					<a class="gallery-title" href="{{absoluteUrl url}}">{{{title}}</a>\
				</li>\
				{{/data}}\
				</ul>\
				<div class="view-all more">\
					<a href="{{absoluteUrl channel_url}}}" class="view-all">View all &raquo;</a><br />\
				</div>';

			templates.LatestArticles = '<h4>Latest Articles</h4>\
				<a href="{{absoluteUrl channel_link}}" class="subtitle">{{channel_name}}</a>\
				<ul class="article-list">\
				{{#articles}}{{#Article}}<li>\
				{{#if image_115x115}}<div class="article-image"><a href="{{absoluteUrl url}}"> <img alt="thumb" src="{{image_115x115}}"></a></div>{{/if}}\
				<a href="{{absoluteUrl url}}" class="article-heading" title="{{title_full}}">{{{title}}}</a>\
				<span class="date-posted">Posted {{prettydate}}</span>\
				</li>{{/Article}}{{/articles}}\
				<li class="bottom no-border"><a href="#" data-page="{{page}}" data-channel="{{absoluteUrl channel_url}}}" class="load-more-articles">See more articles</a><a href="{{absoluteUrl channel_link}}" class="see-more-articles">View all articles &raquo;</a></li>\
				</ul>';

			templates.Printable = '<h4>Printables</h4>\
				<a class="subtitle" href="{{absoluteUrl channel_url}}}">{{{channel_title}}}</a>\
				<ul class="nav-photo-gallery">\
				{{#data}}\
				<li>\
					<a class="gallery-image" href="{{absoluteUrl url}}"><img src="http://cdn.womensunitedonline.com/{{dirname}}/thumb/{{basename}}" border="0" alt="{{title}}"></a>\
					<a class="gallery-title" href="{{absoluteUrl url}}">{{{title}}</a>\
				</li>\
				{{/data}}\
				</ul>\
				<div class="center more"><a class="view-all" href="{{absoluteUrl "/kids-activity-center/coloring-pages"}}">View all printables &raquo;</a></div>';

			/*
			templates.Poll = '{{#data}}<h4>Poll</h4><strong></strong>">\
					<img src="http://cdn.womensunitedonline.com/{{dirname}}/{{basename}}" />\
					<div>\
						<span class="title">{{{title}}}</span>\
						<span class="blurb">{{{blurb}}}</span>\
					</div></a>{{/data}}';
			*/

			templates.Quiz = '<h4>Quizzes</h4>\
				<ul>\
				{{#data}}\
				<li>\
					<p class="question"><a href="{{getCurrentDomain}}/{{channel}}/quizzes/{{slug}}">{{{title}}}</a></p>\
				</li>\
				{{/data}}\
				</ul>\
				<div class="center no-border more">\
					<a href="{{absoluteUrl "/quizzes"}}" class="view-all">View all quizzes &raquo;</a><br />\
				</div>';

			templates.StealTheLook = '<h4>Steal the Look</h4>\
					<a class="subtitle" href="{{getCurrentDomain}}/steal-the-look/{{type}}">{{{type}}}</a>\
					<a href="{{getCurrentDomain}}/steal-the-look/{{type}}/{{data.slug}}">\
					<img src="http://cdn.womensunitedonline.com/{{data.dirname}}/{{data.basename}}" />\
					<div>\
						<span class="title">{{{data.title}}}</span>\
						<span class="blurb">{{{data.blurb}}}</span>\
					</div></a>';

			templates.SKTVShow = '{{#data}}<ul class="nav-videos" data-feed="{{rssfeed}}" data-thumbnail="{{preview_image}}">\
					<li class="image-container">\
							<a href="{{absoluteUrl url}}"><img src="{{logo}}" border="0"></a>\
					</li>\
					<li class="video-container">\
							<p class="title"><a href="{{absoluteUrl url}}">{{video_title}}</a></p>\
							<div class="insertvideo"></div>\
					</li>\
					<li class="center more">\
						<a href="{{absoluteUrl url}}" class="view-all">See all episodes &raquo;</a><br />\
					</li>\
				</ul>{{/data}}';

			templates.Videos = '{{#data}}<h4>Watch</h4>\
				<ul class="nav-videos">\
					<li class="video-container">\
						<img src="{{preview_image}}" />\
						<p class="description"><a href="{{absoluteUrl url}}">{{video_title}}</a></p>\
					</li>\
					<li class="image-container">\
							<a href="{{absoluteUrl url}}"><img src="{{logo}}" border="0"></a>\
							<p class="description"><a href="{{absoluteUrl url}}">{{description}}</a></p>\
					</li>\
				</ul>{{/data}}';

			/** FORMATTERS **/

			Y.Handlebars.registerHelper('absoluteUrl', function(url) {
				return (url.charAt(0) === '/') ? currentDomain + url : url;
			});

            Y.Handlebars.registerHelper('getCurrentDomain', function (url) {
                var fallback = window.location.protocol + '//' + window.location.hostname;

                return (typeof currentDomain === "undefined") ? fallback : currentDomain;
            });

			formatters.defaultFormatter = function ( module, channel ) {
				return Y.Handlebars.render(
					templates[module['name']],
					{
						data: module['data'],
						channel_name: channel.channel_name,
						channel_link: channel.articles_url
					}
				);
			};

			formatters.ArticleColumn = function ( module, channel ) {
				var i, articles = module['data'];
				channel = module.Channel || channel;

				for ( i = 0; i < articles.length; i++ ) {
					// Remove any images after the first article
					if ( i != 0 ) {
						articles[i].thumbnail = null;
						delete articles[i].thumbnail;
					}
					// Compute "pretty date"
					articles[i].prettydate = prettyDate( articles[i].date_active );
				}
				return Y.Handlebars.render(
					templates.ArticleColumn,
					{
						data: articles,
						tag: module['tag'],
						header: module['header']
					}
				);
			};

			formatters.ContentList = function ( module, channel ) {
				return Y.Handlebars.render(
					templates.ContentList,
					{
						category: module['category'],
						title: module['title'],
						data: module['data']
					}
				);
			};

			formatters.Contests = function ( module, channel ) {
				var i, contests = module['data'];
				for ( i = 0; i < contests.length; i++ ) {
					// Compute "pretty date"
					contests[i].prettydate = prettyDate( contests[i].start_date );
				}

				return Y.Handlebars.render(
					templates.Contests,
					{
						category: module['category'],
						human_category: module['human_category'],
						data: contests,
						page: module['page']
					}
				);
			};

			formatters.Featured = function ( module, channel ) {
				return Y.Handlebars.render(
					templates.Featured,
					{
						data: module['data'],
						content_feed: module['ContentFeed'],
						channel_name: channel.channel_name,
						channel_link: channel.articles_url
					}
				);
			};

			formatters.Galleries = function ( module, channel ) {
				var i,
					galleries = module['data'];
				for ( i = 0; i < galleries.length; i++ ) {
					// Move image into [Gallery] block
					galleries[i].Gallery.thumbnail = 'http://cdn.womensunitedonline.com/filter/s/gallery/' + galleries[i].Image.Image.basename;
					// Move image count into [Gallery] block
					galleries[i].Gallery.photo_count = galleries[i].Image.Album.albums_image_count;
				}
				return Y.Handlebars.render(
					templates.Galleries,
					{
						galleries: galleries,
						channel_name: channel.channel_name
					}
				);
			};

			formatters.GiftGuide = function ( module, channel ) {
				return Y.Handlebars.render(
					templates[module['name']],
					{
						data: module['data'],
						channel_title: module['channel_title'],
						channel_url: module['channel_url'],
						channel_name: channel.channel_name,
						channel_link: channel.articles_url
					}
				);
			};

			formatters.LatestArticles = function ( module, channel ) {
				var i, articles = module['data'];
				channel = module.Channel || channel;

				for ( i = 0; i < articles.length; i++ ) {
					// Remove any images after the first article
					if ( i != 0 ) {
						articles[i].Article.image_115x115 = null;
						delete articles[i].Article.image_115x115;
					}
					// Compute "pretty date"
					articles[i].Article.prettydate = prettyDate( articles[i].Article.date_active );

					// Does title need truncating?
					articles[i].Article.title_full = articles[i].Article.title;
					if ( i !== 0 && articles[i].Article.title.length > 60 ) {
						articles[i].Article.title = articles[i].Article.title.match( /([^\s][\s\S]{0,60}(?!=[^\s]))([\s]|$)/ )[1] + '...';
					}
				}

				return Y.Handlebars.render(
					templates.LatestArticles,
					{
						articles: articles,
						page: module['page'],
						channel_name: channel.channel_name,
						channel_url: channel.url_name,
						channel_link: channel.articles_url
					}
				);
			};

			formatters.Printable = function ( module, channel ) {
				return Y.Handlebars.render(
					templates[module['name']],
					{
						data: module['data'],
						channel_title: module['channel_title'],
						channel_url: module['channel_url'],
						channel_name: channel.channel_name,
						channel_link: channel.articles_url
					}
				);
			};

			formatters.StealTheLook = function ( module, channel ) {
				return Y.Handlebars.render(
					templates.StealTheLook,
					{
						type: module['type'],
						data: module['data']
					}
				);
			};

			return {
				formatModule: function ( module, channel ) {
					var module_el = document.createElement( 'DIV' );
					module_el.className = module['name'] + ' ' + ( module['class'] || '' );
					if ( formatters[module['name']] ) {
						module_el.innerHTML = formatters[module['name']]( module, channel );
					} else {
						module_el.innerHTML = formatters.defaultFormatter( module, channel );
					}
					return module_el;
				}
			};

		})();

		ContentManager = (function () {
			var exports = {}, cache = {}, request = null;

			getContent = function ( cache_key, data_url, callback ) {

				var script_tag,
                    done = false,
                    script_src;

				if ( request && request.conn && request.readyState !== 4 ) {
					request.conn.abort();
				}

				if ( typeof cache[cache_key] !== 'undefined' ) {
					callback( cache[cache_key] );
					return;
				}

                // pass through cache server
                script_src = 'http://cdn.womensunitedonline.com/nav/dropdown/?r=' + data_url + '&t=' + Math.floor(new Date().getTime() / 600000);

                // Skip the CDN and access URI directly on hostnames ending in dev.sheknows.com
                if (location.hostname.match(/dev\.sheknows/)) {
                    script_src = data_url;
                }

				script_tag = document.createElement( 'SCRIPT' );
				script_tag.src = script_src;
				script_tag.onload = script_tag.onreadystatechange = function () {
					if ( !done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") ) {
						done = true;
						cache[cache_key] = ContentManager.latest_data;
					}
				}
				document.body.appendChild( script_tag );

			};

			exports.latest_data = null;
			exports.target_module = null;

			exports.abort = function ( ) {
				if ( request && request.conn && request.readyState !== 4 ) request.conn.abort();
			};

			exports.getChannelContent = function ( channel_name, callback ) {
				var cache_key = 'channels-channel:' + channel_name,
					data_url = '/nav/' + channel_name + '.js';

				getContent( cache_key, data_url, callback );

			};

			exports.getArticles = function ( channel_name, page, callback ) {

				var cache_key = 'articles-channel:' + channel_name + '-page:' + page,
					data_url = '/nav/' + channel_name + '/articles/page:' + page + '.js';

				getContent( cache_key, data_url, callback );

			};

			exports.getContests = function ( category_name, page, callback ) {

				var cache_key = 'contests-channel:' + category_name + '-page:' + page,
					data_url = '/nav/contests/' + category_name + '/page:' + page + '.js';

				getContent( cache_key, data_url, callback );

			};

			exports.getSKTVShow = function ( show_slug, callback ) {

				var cache_key = 'sktvshow-show:' + show_slug,
					data_url = '/nav/sktvshow/' + show_slug + '.js';

				getContent( cache_key, data_url, callback );

			};

			exports.getStealTheLook = function ( category_slug, callback ) {

				var cache_key = 'stealthelook-category:' + category_slug,
					data_url = '/nav/stealthelook/' + category_slug + '.js';

				getContent( cache_key, data_url, callback );

			};

			exports.updateModule = function ( module_index, content ) {

				// Remove existing module
				slider_panels.removeChild( slider_panels.get( 'children' ).item( module_index ) );

				// Insert new module
				slider_panels.insertBefore( content, slider_panels.get( 'children' ).item( module_index ) );

			};

			exports.whichPanelAmI = function ( element ) {

				var i;

				element;
				//&& element.get( 'parentNode' ) !== document.body
				while ( element.get( 'parentNode') !== slider_panels ) {
					element = element.get( 'parentNode' );
				}
				/*
				if ( element.parentNode === document.body ) {
					return null;
				}
				*/
				for ( i = 0; i < slider_panels.get( 'children' ).size( ); i++ ) {
					if ( slider_panels.get( 'children' ).item( i ) === element ) {
						return i;
					}
				}

			};

			exports.selectPage = function ( page, easing, duration ) {
				if ( typeof easing === 'undefined' ) {
					easing = 'easeBoth';
				}
				if ( typeof duration === 'undefined' ) {
					duration = .5;
				}

				// Select the clicked button
				for ( i = 1; i < slider_pagination_buttons.get( 'children' ).size( ) - 1; i++ ) {
					if ( i === page ) {
						slider_pagination_buttons.get( 'children' ).item( i ).addClass( 'selected' );
					} else {
						slider_pagination_buttons.get( 'children' ).item( i ).removeClass( 'selected' );
					}
				}

				// Select page
				scroll_animation.stop( false );
				scroll_animation.set( 'to.scroll.0', (page-1) * page_width );
				scroll_animation.set( 'easing', easing );
				scroll_animation.set( 'duration', duration );
				scroll_animation.run();

				if ( page === 1 ) {
					slider_pagination_buttons.get( 'children' ).item( 0 ).setStyle( 'opacity', '.4' );
				} else {
					slider_pagination_buttons.get( 'children' ).item( 0 ).setStyle( 'opacity', '1' );
				}

				if ( page === slider_pagination_buttons.get( 'children' ).size( ) - 2 ) {
					slider_pagination_buttons.get( 'children' ).item( slider_pagination_buttons.get( 'children' ).size( ) - 1 ).setStyle( 'opacity', '.4' );
				} else {
					slider_pagination_buttons.get( 'children' ).item( slider_pagination_buttons.get( 'children' ).size( ) - 1 ).setStyle( 'opacity', '1' );
				}

				// Check if there are any SKTV on the new page which need "onpaginate" rendering
				var feed_url, thumbnail_url, video_container;
				for ( i = 0; i < slider_panels.get( 'children' ).size( ); i++ ) {
					if ( slider_panels.get( 'children' ).item( i ).hasClass( 'SKTVShow' ) ) {

						feed_url = slider_panels.get( 'children' ).item( i ).one( 'ul' ).getAttribute( 'data-feed' );
						thumbnail_url = slider_panels.get( 'children' ).item( i ).one( 'ul' ).getAttribute( 'data-thumbnail' );

						video_container = slider_panels.get( 'children' ).item( i ).one( '.video-container .insertvideo' )
						video_container.setContent( '<img src="' + thumbnail_url + '" />' );
					}
				}
			};

			exports.selectChannelLink = function ( link_el ) {
				var i;
				for ( i = 0; i < channel_links.get( 'children' ).size( ); i++ ) {
					if ( channel_links.get( 'children' ).item( i ) === link_el.get( 'parentNode' ) ) {
						channel_links.get( 'children' ).item( i ).addClass( 'selected' );
					} else {
						channel_links.get( 'children' ).item( i ).removeClass( 'selected' );
					}
				}
			}

			return exports;
		})();

		// Deselects currently selected menu item
		clearMenu = function ( clear_color ) {
			var i;
			selected_channel = null;
			for ( i = 0; i < menu_items.size( ); i++ ) {
				if ( menu_items.item( i ).hasClass( 'selected' ) ) {
					menu_items.item( i ).removeClass( 'selected' );
					break;
				}
			}
			if ( active_channel_element ) {
				active_channel_element.addClass( 'active' );
			}
			contentbox.setStyle( 'display', 'none' );
			slider_pagination_buttons.setStyle( 'display', 'none' );
			if ( clear_color ) {
				navbar.setStyle( 'backgroundColor',  '' );
				menu_items.setStyle( 'borderLeftColor', '' );
			}
		};

		exports.renderMenu = function ( subnav ) {
			var i, link_item, link_el, module, page_button, modules_width = 0;

			// Make sure this menu item is what was hovered over
			for ( i = 0; i < menu_items.size( ); i++ ) {
				if ( menu_items.item( i ).hasClass( 'selected' ) ) {
					if ( menu_items.item( i ).getAttribute( 'data-menuname' ) !== subnav.Channel.url_name ) {
						return;
					}
					break;
				}
			}

			// fire an event for hovering
			_gaq.push(['_trackEvent', 'Nav Bar', 'Hover', subnav.Channel.channel_name]);

			ContentManager.latest_data = subnav;

			slider_container.removeClass( 'loading' );
			selected_channel = subnav.Channel;
			if ( contentbox.getStyle( 'display' ) === 'block' && selected_channel.colors ) {
				window.navbar = navbar;
				navbar.setStyle( 'backgroundColor',  '#' + selected_channel.colors.primary );
				menu_items.setStyle( 'borderLeftColor', '#' + selected_channel.colors.darkened );
			}

			// Insert new links
			for ( i = 0; i < subnav.NavItems.length; i++ ) {
				// More IE fun
				link_item = document.createElement( 'LI' );
				link_el = document.createElement( 'A' );

				link_el.setAttribute( 'href', absoluteUrl(subnav.NavItems[i].url));
				link_el.setAttribute( 'data-title', subnav.NavItems[i].title );
				link_el.setAttribute( 'data-blurb', subnav.NavItems[i].blurb );
				link_el.setAttribute( 'data-basename', subnav.NavItems[i].basename );
				link_el.setAttribute( 'data-dirname', subnav.NavItems[i].dirname );

				link_span = document.createElement( 'SPAN' );
				link_span.innerHTML = subnav.NavItems[i].title;
				link_el.appendChild( link_span );

				link_item.appendChild( link_el );

				channel_links.appendChild( link_item );
			}

			// Insert modules
			for ( i in subnav.Modules ) {
				if ( subnav.Modules[i].name.length === 0 ) {
					continue;
				}

				module = Templater.formatModule( subnav.Modules[i], selected_channel );
				if ( (parseInt(i, 10) - 1) % 3 === 0 ) {
					module.className += ' middle';
				}
				slider_panels.appendChild( module );

				modules_width += module.offsetWidth;
				if ( modules_width % page_width === 0 ) {

					// Draw a pagination button
					page_button = document.createElement( 'DIV' );
					page_button.className = ( modules_width === page_width ) ? 'button selected' : 'button';
					page_button.setAttribute( 'data-page', ( modules_width / page_width ) );
					slider_pagination_buttons.insertBefore( page_button, slider_pagination_buttons.get( 'children' ).item( slider_pagination_buttons.get( 'children' ).size( ) - 1 ) );

				}
			}

			// Update slider_panels's width (for better pagination)
			slider_panels.setStyle( 'width', modules_width + 'px' );
			slider_pagination_buttons.setStyle( 'width', ( ( modules_width / page_width ) * 17 ) + ( 32 * 2 ) + 'px' ); // each pagination button is 17px, the 2 arrows are 36px each
			slider_container.set('scrollLeft', 0 );
			if ( modules_width / page_width > 1 ) {
				slider_pagination_buttons.setStyle( 'display', 'block' );
			}

			// Left pagination defaults to disabled
			slider_pagination_buttons.get( 'children' ).item( 0 ).setStyle( 'opacity', '.4' );

			ContentManager.selectPage( 1 );
		};

		exports.renderModule = function ( module ) {
			ContentManager.latest_data = module;
			selected_channel = module.Channel || selected_channel;
			if ( ContentManager.target_module !== null ) {
				module = Templater.formatModule ( module, selected_channel );
				if ( (ContentManager.target_module - 1) % 3 === 0 ) {
					module.className += ' middle';
				}

				ContentManager.updateModule( ContentManager.target_module, module );
				ContentManager.selectPage( Math.floor( ContentManager.target_module / 3 ) + 1 );
				ContentManager.target_module = null;
			}
		};

		exports.selectMenu = function ( menu_item ) {
			var i, menuname = menu_item.getAttribute( 'data-menuname' );

			// Don't change if the target channel is already selected
			if ( selected_channel && selected_channel.url_name === menuname ) return false;

			// Deselect all menu items & select the current one
			clearMenu();
			if ( active_channel_element ) {
				active_channel_element.removeClass( 'active' );
			}

			// If this isn't a drop down menu don't select it or load content
			if ( !menuname ) {
				clearMenu( true );
				return false;
			}

			slider_container.set( 'className', 'slider-container ' + menuname );
			menu_item.addClass( 'selected' );
			contentbox.setStyle( 'display', 'block' );

			// Clear out existing content
			channel_links.setContent( '' );
			slider_panels.setContent( '' );

			// Clear out pagination buttons
			var children_count = slider_pagination_buttons.get( 'children' ).size();
			for ( i = 0; i < children_count - 2; i++ ) {
				slider_pagination_buttons.removeChild( slider_pagination_buttons.get( 'children' ).item( 1 ) );
			}

			slider_container.addClass( 'loading' );

			// Make content request
			ContentManager.getChannelContent( menuname, MainNav.renderMenu);
		};

		Y.on( 'domready', function() {
			navbar = Y.one( '#navbar' );
			if (!navbar) {
				return;
			}
			active_channel_element = navbar.one( '.ui-navbaritem.active' );
			menu_el = navbar.one( '#mainnav-menus' );
			if ( menu_el === null ) {
				return;
			}
			menu_items = menu_el.all( 'li' );
			contentbox = navbar.one( '#mainnav-contentbox' );
			channel_links = contentbox.one( '.channel-links' );
			slider_container = contentbox.one( '.slider-container' );
			slider_panels = contentbox.one( '.slider-panels' );
			slider_pagination = contentbox.one( '#mainnav_pagination' );
			slider_pagination_buttons = slider_pagination.one( '#pagination_buttons' );
			scroll_animation = new Y.Anim({
				node: slider_container,
				duration: .5,
				easing: 'easeBoth',
				to: { scroll: [0, 0] }
			});

			// Pagination button delegation
			slider_pagination_buttons.delegate(
				'click',
				function ( e ) {

					var i, next_page;

					ContentManager.selectPage( parseInt( e.currentTarget.getAttribute( 'data-page' ), 10 ) );

				},
				'div.button'
			);

			// Pagination arrow delegation
			slider_pagination_buttons.delegate(
				'click',
				function ( e ) {

					var i, next_page;
						direction = this.hasClass( 'left' ) ? -1 : 1;

					// What page are we going to?
					for ( i = 1; i < slider_pagination_buttons.get( 'children' ).size( ) - 1; i++ ) {
						if ( slider_pagination_buttons.get( 'children' ).item( i ).hasClass( 'selected' ) ) {
							slider_pagination_buttons.get( 'children' ).item( i ).removeClass( 'selected' );

							next_page = i + direction;
							if ( next_page < 1 ) {
								next_page = 1;
							} else if ( next_page === slider_pagination_buttons.get( 'children' ).size( ) - 1 ) {
								next_page = slider_pagination_buttons.get( 'children' ).size( ) - 2;
							}
							break;
						}
					}

					ContentManager.selectPage( next_page );

				},
				'div.arrow'
			);

			// Channel links action
			channel_links.delegate(
				'mouseenter',
				function ( e ) {
					delayExecution(
						function () {
							var channel, category, show,
								url = e.currentTarget.getAttribute('href');

							if ( selected_channel.url_name === 'sheknowstv' ) {
								return false; // don't update modules when on the SKTV menu
							}

							ContentManager.abort();
							ContentManager.selectChannelLink( e.currentTarget );

							if ( channel = url.match( /(\/.*\/([a-zA-Z0-9-]+)\/articles|\/channels\/([a-zA-Z0-9-_]+))/ ) ) {

								// Link to an article directory page
								channel = channel[2] || channel[3];

								if ( selected_channel.url_name !== channel ) {
									slider_panels.get( 'children' ).item( 0 ).setContent( '<img src="http://cdn.womensunitedonline.com/interface/ajaxSpinner.gif" class="loading_spinner" />' );
								}

								ContentManager.target_module = 0;
								ContentManager.getArticles( channel, 1, MainNav.renderModule );

							} else if ( category = url.match( /\/giveaways\/category\/(.*)/ ) ) {

								// Giveaway category page
								category = category[1];
								slider_panels.get( 'children' ).item( 0 ).setContent( '<img src="http://cdn.womensunitedonline.com/interface/ajaxSpinner.gif" class="loading_spinner" />' );

								ContentManager.target_module = 0;
								ContentManager.getContests( category, 1, MainNav.renderModule );

							} else if ( show = url.match( /\/sheknowstv\/([a-zA-Z0-9-]+)/ ) ) {

								// SKTV Show
								show = show[1];
								slider_panels.get( 'children' ).item( 0 ).setContent( '<img src="http://cdn.womensunitedonline.com/interface/ajaxSpinner.gif" class="loading_spinner" />' );

								ContentManager.target_module = 0;
								ContentManager.getSKTVShow( show, MainNav.renderModule );

							} else if ( category = url.match( /\/steal-the-look\/([a-zA-Z-0-9-]+)/ ) ) {

								// Steal the Look
								category = category[1];
								slider_panels.get( 'children' ).item( 0 ).setContent( '<img src="http://cdn.womensunitedonline.com/interface/ajaxSpinner.gif" class="loading_spinner" />' );

								ContentManager.target_module = 0;
								ContentManager.getStealTheLook( category, MainNav.renderModule );

							} else {

								// ContentFeed link
								ContentManager.updateModule(
									0,
									Templater.formatModule(
										{
											'name': 'ExternalLink',
											'class': 'sk-w-5',
											'data': {
												title: e.currentTarget.getAttribute( 'data-title' ),
												url: url,
												dirname: e.currentTarget.getAttribute( 'data-dirname' ),
												basename: e.currentTarget.getAttribute( 'data-basename' ),
												blurb: e.currentTarget.getAttribute( 'data-blurb' )
											}
										},
										selected_channel
									)
								);

							}
						},
						action_delay
					);
				},
				'li a'
			);
			channel_links.delegate(
				'mouseleave',
				function ( e ) {
					// Clear out any existing delayed calls
					delayExecution(
						function () {},
						1
					);
				},
				'li a'
			);

			// "Load More Articles" action
			slider_panels.delegate(
				'click',
				function ( e ) {
					var channel, next_page;

					e.currentTarget.addClass( 'loading' );

					next_page = parseInt( e.currentTarget.getAttribute( 'data-page' ), 10 ) + 1;

					ContentManager.target_module = ContentManager.whichPanelAmI( e.currentTarget );
					ContentManager.getArticles( e.currentTarget.getAttribute( 'data-channel' ), next_page, MainNav.renderModule );

					e.preventDefault();
					e.stopPropagation();
					return false;

				},
				'a.load-more-articles'
			);

			// "Load More Giveaways" action
			slider_panels.delegate(
				'click',
				function ( e ) {

					var channel, next_page;

					e.currentTarget.addClass( 'loading' );

					next_page = parseInt( e.currentTarget.getAttribute( 'data-page' ), 10 ) + 1;

					ContentManager.target_module = ContentManager.whichPanelAmI( e.currentTarget );
					ContentManager.getContests( e.currentTarget.getAttribute( 'data-category' ), next_page, MainNav.renderModule );

					e.preventDefault();
					e.stopPropagation();
					return false;

				},
				'a.load-more-contests'
			);

			// Handle menu clicks
			menu_el.all( 'a' ).on(
				'click',
				function ( e ) {
					var i, el = e.currentTarget, block_request = true, menuname = el.get( 'parentNode' ).getAttribute( 'data-menuname' );

					// If this is a touch/mobile device then don't follow through
					// on the click, unless the clicked on menu is already open
					if ( isTouchSupported() && menuname ) {

						if ( selected_channel !== null && menuname === selected_channel.url_name ) {
							block_request = false;
						}

						if ( block_request ) {

							e.preventDefault();
							e.stopPropagation();
							return false;

						}
					}
				}
			);

			// Swipe events
			(function () {
				var is_swiping = false,
					swipe_start = null,
					start_coords = { x: null, y: null },
					last_coords = { x: null, y: null },
					change = { x: null, y: null },
					preventdefault = false,
					update;

				update = function ( e ) {

					if ( preventdefault ) {
						e.preventDefault();
					}

					if ( !is_swiping ) {
						return false;
					}

					if ( last_coords.x !== null ) {
						change.x = last_coords.x - e.touches[0].pageX;
						change.y = last_coords.y - e.touches[0].pageY;
						slider_container.set( 'scrollLeft', slider_container.get( 'scrollLeft' ) + change.x );
					}

					last_coords.x = e.touches[0].pageX;
					last_coords.y = e.touches[0].pageY;

				};

				if ( isTouchSupported() ) {

					slider_panels.getDOMNode().addEventListener(
						'touchstart',
						function ( e ) {
							swipe_start = new Date().getTime();
							is_swiping = true;
							start_coords.x = e.touches[0].pageX;
							start_coords.y = e.touches[0].pageY;
							update( e );
						}
					);

					slider_panels.getDOMNode().addEventListener(
						'touchmove',
						function ( e ) {
							preventdefault = true;
							update( e );
						}
					);

					slider_panels.getDOMNode().addEventListener(
						'touchend',
						function ( e ) {
							var swipe_duration, direction, target_page;

							// Is this a flick or a real move?
							swipe_duration = new Date().getTime() - swipe_start;

							if ( swipe_duration <= 350 && Math.abs(last_coords.x - start_coords.x) >= 150 ) {
								// Flick action
								direction = ( last_coords.x - start_coords.x > 0 ) ? -1 : 1;

								// What page are we going to?
								for ( i = 1; i < slider_pagination_buttons.get( 'children' ).size( ) - 1; i++ ) {
									if ( slider_pagination_buttons.get( 'children' ).item( i ).hasClass( 'selected' ) ) {
										slider_pagination_buttons.get( 'children' ).item( i ).removeClass( 'selected' );

										target_page = i + direction;
										if ( target_page < 1 ) {
											target_page = 1;
										} else if ( target_page === slider_pagination_buttons.get( 'children' ).size( ) - 1 ) {
											target_page = slider_pagination_buttons.get( 'children' ).size( ) - 2;
										}
										break;
									}
								}
								ContentManager.selectPage( target_page, 'easeNone', .1 );

							} else {

								// Not a flick, normal swipe action
								// Figure out what page the user is trying to be on
								target_page = Math.round(slider_container.get('scrollLeft') / page_width) + 1;
								ContentManager.selectPage( target_page, 'easeNone' );

							}

							is_swiping = false;
							preventdefault = false;
							last_coords.x = last_coords.y = null;

						}
					);

				}
			})();

			// Setup mouseenter delegation
			Y.one( '#mainnav-menus' ).delegate(
				'mouseenter',
				function ( e ) {
					delayExecution(
						exports.selectMenu,
						action_delay,
						e.currentTarget
					);
				},
				'li'
			);
			contentbox.on(
				'mouseenter',
				function ( e ) {
					// Clear out any existing delayed calls
					delayExecution(
						function () {},
						1
					);
				}
			);

			// Dropdown / fold up
			menu_el.on(
				'mouseleave',
				function ( e ) {
					delayExecution(
						function ( e ) {

							if ( !e.relatedTarget.ancestor( '.contentbox' ) ){
								clearMenu( true );
							}
						},
						action_delay,
						e
					);
				}
			);
			contentbox.on(
				'mouseleave',
				function ( e ) {
					delayExecution(
						clearMenu,
						action_delay + 50,
						true
					);
				}
			);
		});

		return exports;

	})();
}, '@VERSION@', { requires: ['node', 'handlebars', 'node-style', 'event-base', 'event-delegate', 'event-mouseenter', 'anim', 'anim-scroll'] });

YUI.add('sheknows-connect-login', function (Y) {

}, '1.0', { skinnable: true });
/**
 *
 * Outline:
 *
 *  - Controls how to display header widget
 *      1. user is logged in - display personalized widget
 *      2. anonymous user - sign-in / sign-up links
 *
 */
YUI.add('sheknows-connect-header', function(Y) {
    var Connect = Y.Connect.getInstance(),
        box,
        hd,
        btn,
        listEl,
        iframe,
        currentDomain = typeof(arkadiumDomain) == 'string' ?
            arkadiumDomain : window.location.protocol + '//' + window.location.hostname;

    var reloadPage = function(){
        window.location.reload();
    };

    var Header = function (el, cfg) {
        this.element = Y.one(el);
        Header.superclass.constructor.call(this, cfg);
    };

    Header.NAME = 'header';

    Header.ATTRS = {
        visible: {
            value: false,
            validator: Y.Lang.isBoolean
        }
    };

    Connect.set("commands.logout", {
        cors:   false,
        url:    "logout",
        method: "GET"
    });

    Y.extend(Header, Y.Widget, {
        initializer: function(cfg) {
            Header.superclass.init.call(this);
            this.setVisibility(this.get('visible'));
        },

        setVisibility: function(status) {
            this.set('visible', status);

            var el = this.element,
                style = el.style;

            if (this.element.getStyle('display') == 'none') {
                this.element.setStyle('display', '');
            }

            this.element.setStyle('visibility', status == true ? 'visible' : 'hidden');
        }
    });

    var LoginForm = function(el, config){
        var zindex = config.zIndex || 1;
        this.element = Y.Node.create('<div id="' + el.replace(/^#/, '') + '" class="yui-module yui-overlay yui-button-menu yui-menu-button-menu' + this.CSS_NAME + '" style="z-index: ' + zindex + ';"></div>')
        LoginForm.superclass.constructor.call(this, config);
    };

    LoginForm.NAME = 'loginForm';
    LoginForm.CSS_NAME = 'connect-form';

    LoginForm.closeEvent = 'connectheader:close';
    LoginForm.loginEvent = 'connectheader:login';
    LoginForm.errorEvent = 'connectheader:error';

    LoginForm.ATTRS = {
        visible: {
            value: false,
            validator: Y.Lang.isBoolean
        },
        zIndex: {
            value: 100,
            validator: Y.Lang.isNumber
        }
    };

    Y.extend(LoginForm, Y.Widget, {

        url: currentDomain + '/connect/users/login',

        initializer: function(cfg){
            this.initDomEvents();

            this.element.addClass(LoginForm.CSS_NAME);
            this.body = this.element;

            this.on('loader:loading', this.onLoadingStatusChange);
        },

        setBody: function(content) {
            this.element.setContent(content);
        },

        setVisibility: function(status) {
            this.set('visible', status);

            var el = this.element,
                style = el.style;

            if (this.element.getStyle('display') == 'none') {
                this.element.setStyle('display', '');
            }

            this.element.setStyle('visibility', status == true ? 'visible' : 'hidden');
        },

        initDomEvents: function(){
            this.element.on('click', this.onClickEvent, this);
        },

        syncUI: function() {
            this.load();
        },

        bindUI: function() {
            var boundingBox = this.element,
                inputs = boundingBox.all('.input'),
                fields = boundingBox.all('.input .field input');

            function onFocus(e) {
                focus(e.target.ancestor('.input'));
            };

            function focus(el) {
                el.addClass('input-focused');
            }

            function onBlur(e) {
                syncUI(e.target);
            }

            function syncUI(el) {
                el.ancestor('.input').toggleClass(
                    'input-has-value',
                    el.get('value').length > 0
                );

                unfocusAll();
            }

            function unfocusAll() {
                inputs.removeClass('input-focused');
            }

            // sync the initial field values (maybe some have initial values?)
            fields.each(syncUI);

            fields.on('focus', onFocus);
            fields.on('blur', onBlur);
        },

        onClickEvent: function(evt) {
            var el = evt.currentTarget,
                provider = el.getAttribute('data-provider');

            if (!provider) {
                return;
            }

            evt.preventDefault();

            this.loginWithProvider(provider);
        },

        onSuccess: function(id, o){
            this.setBody(o.responseText);
            //this.render();

            var forms = this.element.all('form');
            forms.on('submit', this.onSubmitEvent, this);

            this.bindUI();
        },

        onFailure: function(id, o){
            this.hide();//and cower
        },

        onError: function(error){
            if (error.message) {
                this.setMessage(error.message);
            }
        },

        onStart: function (evt, args) {
            this.fire('loader:loading', true);
        },

        onEnd: function (evt, args) {
            this.fire('loader:loading', false);
        },

        /**
         * onLoadingStatusChange event - event triggered when loading starts and stops.
         *
         * @param event
         * @param status (Boolean) Loading status event is either in progress (true) or false.
         */
        onLoadingStatusChange: function (event, status) {
            status = status || false;
            if (status === true) {
                this.element.addClass('loading');
            } else {
                this.element.removeClass('loading');
            }
        },

        setMessage: function(msg){
            Y.one('#login-errors').setContent(msg);
        },

        load: function(){
            var self = this,
                cb = {
                    on: {
                        start: self.onStart,
                        end: self.onEnd,
                        success: self.onSuccess,
                        failure: self.onFailure
                    },
                    context: self
                };

            Y.io(this.url, cb);
        },

        loginWithProvider: function(provider) {
            var self  = this,
                url   = Connect.url('login', {
                    x_provider:   provider,
                    redirect_uri: connect_cfg.redirectUri
                });

            Y.PopupManager.open({
                id:  'connect-signin',
                url: url,
                width: 300,
                height: 200,
                callback: function () {
                    self.fire(self.closeEvent);
                }
            });
        },

        onSubmitEvent: function(evt){
            var form = evt.currentTarget;

            evt.preventDefault();

            if (!form.getAttribute('action')) {
                form = form.ancestor('form');
            }
            this.setMessage('');


            var cfg = {
                method: 'POST',
                form: {
                    id: form
                },
                context: this,
                on: {
                    start: this.onStart,
                    end: this.onEnd,
                    success: function (id, o) {
                        try {
                            var data = Y.JSON.parse(o.responseText);

                            if (data && data.status == 'ok') {
                                this.fire(LoginForm.loginEvent, data);
                            } else {
                                this.onError(data);
                            }
                        } catch (e) {
                            console.warn(e);
                        }
                    }
                }
            };
            Y.io(this.url + '.js', cfg);

            return false;
        }
    });


    var ConnectHeader = function (el, cfg) {
        this.element = el;
        ConnectHeader.superclass.constructor.call(this, cfg);
    };

    ConnectHeader.NAME = 'connectHeader';

    ConnectHeader.ATTRS = {
        listEl: {
            getter: function() {
                if (!this._listElement) {
                    this._listElement = Y.one('#connect-header').get('children').item(0);
                }

                return this._listElement;
            }
        },

        items: {
            getter: function(){
                if (!this._itemsElement) {
                    this._itemsElement = Y.one('#connect-header').get('children').item(0).get('children');
                }

                return this._itemsElement;
            }
        }
    }

    Y.extend(ConnectHeader, Y.Widget, {
        IDS: {
            header: '#connect-header',
            overlay: '#connect-overlay'
        },

        initializer: function() {
            hd = new Header(this.IDS.header, { visible: false });
            hd.render();

            box = new LoginForm(this.IDS.overlay, {
                visible: false,
                zIndex:  12001
            });
        },

        /**
         * Initializes the header widget depending on if the user is logged in or not
         *
         */
        load: function (response) {
            var self = this;

            var name;

            // This btn instance is cached, but we need to clear it out if the user has changed.
            if (btn) {
                btn.remove();
                btn = false;
            }

            if (!response || response.error) {
                // Display default widget
                name = 'connect-loggedout';
                self.displayDefault(response);
            } else {
                // Display customized widget
                name = 'connect-loggedin';
                self.displayLoggedIn(response);
            }

            Y.one('html').addClass(name);

            Y.one('body').on('click', function(evt) {
                if ( !evt.target.ancestor('#connect-overlay', true) && !evt.target.ancestor('#connect-button', true) ) {
                    this._popupHide();
                }
            }, self);

            hd.setVisibility(true);
        },

        createButton: function(label) {
            if (!btn) {
                var items = this.get('items');
                items.item(0).setContent('');

                btn = Y.Node.create('<span id="connect-button" class="yui-button yui-menu-button"><span class="first-child"><button id="connect-button-button" type="button">' + label + '</button></span></span>');

                //todo setup menu on box
                items.item(0).appendChild(btn);
            }

            return btn;
        },

        /**
         * Displays the default widget
         */
        displayDefault: function(response) {

            btn = this.createButton('Login');
            btn.addClass('connect-signin-btn');

            Y.one(this.element).one('li').appendChild(box.element);

            var items = this.get('items'),
                link = items.item(1).get('children').item(0);

            link.setContent('Sign up');

            if (link.getAttribute('href').lastIndexOf('#') === link.getAttribute('href').length - 1) {
                link.setAttribute('href', currentDomain + '/connect/users/register?redirect=' + encodeURIComponent(document.location));
            }

            //Y.Get.css('http://cdn.womensunitedonline.com/css/connect/login.css');

            btn.on('click', this.btnClick, this);
            box.on(LoginForm.closeEvent, reloadPage);
            box.on(LoginForm.loginEvent, reloadPage);
        },

        btnClick: function() {
            box.render();
            this._popupShow();
        },

        /**
         * Displays the custom widget
         */
        displayLoggedIn: function(user) {

            var imgUrl = user.avatar,
                label  = user.firstname.toString().length > 0 ?
                    'Hi, ' + user.firstname :
                    'Welcome back';

            if (imgUrl && imgUrl.length > 0) {
                label = '<img src="'+imgUrl+'" height="24" width="24" alt="" class="user-avatar" />'+label;
            }

            btn = this.createButton(label);

            var items = this.get('items'),
                link = items.item(1).get('children').item(0);

            link.setContent('Sign out');
            link.setAttribute('href', currentDomain + '/connect/logout?redirect=' + encodeURIComponent(document.location));

            link.on('click', function(evt) {
                Y.jsonp(currentDomain + '/connect/logout?redirect=' + encodeURIComponent(document.location) + '&callback={callback}', function (res) {
                    Y.getLocation().reload();
                });

                evt.preventDefault();
                return false;
            });

            if (user.avatar) {
                btn.addClass('has-avatar');
            }

            btn.set('disabled',true);

            var onOverlayClick = function(){
                return false;
            };

            btn.on("click", onOverlayClick);
        },

        _popupShow: function(){
            btn.addClass('yui-button-active');
            Y.one('body').get('parentNode').addClass('connect-overlay-active');
            box.setVisibility(true);
        },

        _popupHide: function(){
            btn.removeClass('yui-button-active');
            Y.one('body').get('parentNode').removeClass('connect-overlay-active');
            box.setVisibility(false);
        }
    });

    Y.ConnectHeader = ConnectHeader;
}, '1.0', {
    requires: [
        'node', 'widget', 'event-custom', 'io-form', 'json-parse',
        'event-focus', 'event-delegate', 'connect-api', 'substitute',
        'sheknows-connect-login', 'popup-manager'
    ],
    skinnable: true
});

