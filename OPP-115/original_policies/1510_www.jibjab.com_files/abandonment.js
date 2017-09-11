// VDED10188 at 30/06/2015 11:41:53
if (typeof veTagData === 'undefined') {
    var veTagData = (function () {
        var b,
            tag = document.getElementById('veConnect'),
            d = {
                journeycode: '7317E0C9-E08E-47C7-B67A-BE198A2CE605',
                captureConfigUrl: 'cdsusa.veinteractive.com/CaptureConfigService.asmx/CaptureConfig',
                chatServicesUrl: 'cdsusa.veinteractive.com/ConversationService.asmx/',
                assistServicesUrl: 'appsapiusa.veinteractive.com',
                veHostDomain: '//configusa.veinteractive.com',

                captureConfig: {
  CaptureUrl: "cdsusa.veinteractive.com/CaptureConfigService.asmx/CaptureConfig",
  customerid: 1003700,
  datareceiverurl: "cdsusa.veinteractive.com/DataReceiverService.asmx/DataReceiver",
  Forms: [
    {
      ChatAgentId: null,
      EmailOptOut: false,
      FormFields: [
        {
          ClientFieldName: ".field.first_name input",
          DomEvent: "DynamicActivity",
          FieldTypeName: "Raw",
          FormMappingId: 41686,
          HtmlAttributeTag: "Value",
          HtmlType: ":text",
          IdentifyAbandonment: false,
          isEmail: false
        },
        {
          ClientFieldName: ".field.email input",
          DomEvent: "DynamicActivity",
          FieldTypeName: "Raw",
          FormMappingId: 41687,
          HtmlAttributeTag: "Value",
          HtmlType: ":text",
          IdentifyAbandonment: false,
          isEmail: true
        },
        {
          ClientFieldName: "promo_code",
          DomEvent: "DynamicActivity",
          FieldTypeName: "Id",
          FormMappingId: 41688,
          HtmlAttributeTag: "Value",
          HtmlType: ":text",
          IdentifyAbandonment: false,
          isEmail: false
        },
        {
          ClientFieldName: "purchase-offer",
          DomEvent: "OnLoad",
          FieldTypeName: "Class",
          FormMappingId: 41705,
          HtmlAttributeTag: "Value",
          HtmlType: "label",
          IdentifyAbandonment: false,
          isEmail: false
        },
        {
          ClientFieldName: "profile\\[email\\]",
          DomEvent: "DynamicActivity",
          FieldTypeName: "Name",
          FormMappingId: 42993,
          HtmlAttributeTag: "Value",
          HtmlType: ":text",
          IdentifyAbandonment: false,
          isEmail: true
        }
      ],
      FormId: 18508,
      FormTypeId: 1,
      FormURLs: [
        "jibjab.com/subscribe/purchase",
        "jibjab.com/register"
      ],
      IdentifyAbandonmentOr: true,
      NumberIdentifiedFields: 0,
      Name: null,
      OptOuts: [],
      Paremeter: []
    },
    {
      ChatAgentId: null,
      EmailOptOut: false,
      FormFields: [
        {
          ClientFieldName: "h2.post-sub-color",
          DomEvent: "DynamicActivity",
          FieldTypeName: "Raw",
          FormMappingId: 41696,
          HtmlAttributeTag: "Value",
          HtmlType: "h2",
          IdentifyAbandonment: false,
          isEmail: false
        },
        {
          ClientFieldName: "span.font-pgp",
          DomEvent: "OnLoad",
          FieldTypeName: "Raw",
          FormMappingId: 44016,
          HtmlAttributeTag: "Value",
          HtmlType: "span",
          IdentifyAbandonment: false,
          isEmail: true
        }
      ],
      FormId: 19287,
      FormTypeId: 2,
      FormURLs: [
        "jibjab.com/subscribe/confirmation"
      ],
      IdentifyAbandonmentOr: true,
      NumberIdentifiedFields: 0,
      Name: null,
      OptOuts: [],
      Paremeter: []
    }
  ],
  IdentifyAbandonmentOr: true,
  JourneyCode: "7317E0C9-E08E-47C7-B67A-BE198A2CE605",
  JourneyId: 4999,
  JourneyTimeOut: 1800,
  NumberIdentifiedFields: 0,
  OptOutField: 0
},
                /*
                 * The custom settings are based on the standard defined on Settings.js.
                 */
                settings: { domainsToIgnore: ['jibjab.com' ], consoleMessagesEnabled: false,
 elementsStoppingAppsOnClick: [ ],
 autocompleteInputsHandler: [ ],
 keywordsRegExp: [ { source: 'Example', regexp: / /, notSearchEngine: false, replaceCharactersBySpace: '-', storeSearchTerm: false, showNoProducts: false, ignoreCloses: false } ],
 cookies: { enabled: false , timeToLive: 60},
gdm: {
    timeCreated: 'Mon Jun 22 2015 13:26:33 GMT-0400 (Eastern Daylight Time)',
    codeVersion: '1.3.1',

    exclude: false,
    ros: true,
    flexId: '532706',
    completionId: 551700,
    journeyCode: '',
    segmentIds: [2990051, 2990053, 2990052],

    dbm: {
        src: '',
        cat: {
            ros: '',
            conversion: ''
        },
        ros: true
    },

    orderId: {
        selector: '[name="orderNum"]',
        mask: 'alphanumeric',
        'regex': null,
        page: {
            params: {  },
            urls: [  ]
        },
    },

    productPages: {
        selector: '#purchase-cta',
        'default': '',
        page: {
            params: {  },
            urls: [ 'jibjab.com/subscribe/purchase' ]
        },
        'regex': null
    },

    basketPages: {
        selectors: {
            productId: '', 
            productPrice: ''
        },
        page: {
            params: {  },
            urls: [  ]
        },
        'regex': null
    },

    orderValue: {
        selector: '',
        'default': '1.50',
         mask: 'alphanumeric',
        page: {
            params: {  },
            urls: [ 'jibjab.com/subscribe/purchase', 'jibjab.com/register' ]
        },
        updates: false,
        'regex': /[^0-9,\.]/g
    },

    completePage: {
        page: {
            params: {  },
            urls: [ 'jibjab.com/subscribe/confirmation' ]                  
        },  

        dynamicIdentifier: {
            selector: '',
            criteria: '',
            value: ''
        }
    }
}
}
,

                /*
                 * Custom events that allow custom behavior per journey. The standard is defined on CustomEvents.js.
                 */
                customEvents: {
 onLoad: function() {

   if(window.location.href.indexOf("jibjab.com/subscribe/confirmation") >= 0){
      try{
      createElement("orderNum",VEjQuery("script[src*='mediaforge']").attr('src').split('?')[1].split('&')[0].match(/[0-9]+/)[0]);
      }catch(err){
         //no order num
      }
   }

   function createElement(name, field){
     var input = document.createElement('input');
     input.setAttribute('type','hidden');
     input.setAttribute('name', name);
     input.setAttribute('value', field);
     document.body.appendChild(input);

   }

  
    !function e(t,n,r){function o(a,c){if(!n[a]){if(!t[a]){var s="function"==typeof require&&require;if(!c&&s)return s(a,!0);if(i)return i(a,!0);var u=new Error("Cannot find module '"+a+"'");throw u.code="MODULE_NOT_FOUND",u}var l=n[a]={exports:{}};t[a][0].call(l.exports,function(e){var n=t[a][1][e];return o(n?n:e)},l,l.exports,e,t,n,r)}return n[a].exports}for(var i="function"==typeof require&&require,a=0;a<r.length;a++)o(r[a]);return o}({1:[function(e,t,n){var r=e("debug")("mode:production");r("launching application");try{e("./main")}catch(o){r("Error",o)}},{"./main":6,debug:2}],2:[function(e,t,n){function r(){return"WebkitAppearance"in document.documentElement.style||window.console&&(console.firebug||console.exception&&console.table)||navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31}function o(){var e=arguments,t=this.useColors;if(e[0]=(t?"%c":"")+this.namespace+(t?" %c":" ")+e[0]+(t?"%c ":" ")+"+"+n.humanize(this.diff),!t)return e;var r="color: "+this.color;e=[e[0],r,"color: inherit"].concat(Array.prototype.slice.call(e,1));var o=0,i=0;return e[0].replace(/%[a-z%]/g,function(e){"%%"!==e&&(o++,"%c"===e&&(i=o))}),e.splice(i,0,r),e}function i(){return"object"==typeof console&&console.log&&Function.prototype.apply.call(console.log,console,arguments)}function a(e){try{null==e?u.removeItem("debug"):u.debug=e}catch(t){}}function c(){var e;try{e=u.debug}catch(t){}return e}function s(){try{return window.localStorage}catch(e){}}n=t.exports=e("./debug"),n.log=i,n.formatArgs=o,n.save=a,n.load=c,n.useColors=r;var u;u="undefined"!=typeof chrome&&"undefined"!=typeof chrome.storage?chrome.storage.local:s(),n.colors=["lightseagreen","forestgreen","goldenrod","dodgerblue","darkorchid","crimson"],n.formatters.j=function(e){return JSON.stringify(e)},n.enable(c())},{"./debug":3}],3:[function(e,t,n){function r(){return n.colors[l++%n.colors.length]}function o(e){function t(){}function o(){var e=o,t=+new Date,i=t-(u||t);e.diff=i,e.prev=u,e.curr=t,u=t,null==e.useColors&&(e.useColors=n.useColors()),null==e.color&&e.useColors&&(e.color=r());var a=Array.prototype.slice.call(arguments);a[0]=n.coerce(a[0]),"string"!=typeof a[0]&&(a=["%o"].concat(a));var c=0;a[0]=a[0].replace(/%([a-z%])/g,function(t,r){if("%%"===t)return t;c++;var o=n.formatters[r];if("function"==typeof o){var i=a[c];t=o.call(e,i),a.splice(c,1),c--}return t}),"function"==typeof n.formatArgs&&(a=n.formatArgs.apply(e,a));var s=o.log||n.log||console.log.bind(console);s.apply(e,a)}t.enabled=!1,o.enabled=!0;var i=n.enabled(e)?o:t;return i.namespace=e,i}function i(e){n.save(e);for(var t=(e||"").split(/[\s,]+/),r=t.length,o=0;r>o;o++)t[o]&&(e=t[o].replace(/\*/g,".*?"),"-"===e[0]?n.skips.push(new RegExp("^"+e.substr(1)+"$")):n.names.push(new RegExp("^"+e+"$")))}function a(){n.enable("")}function c(e){var t,r;for(t=0,r=n.skips.length;r>t;t++)if(n.skips[t].test(e))return!1;for(t=0,r=n.names.length;r>t;t++)if(n.names[t].test(e))return!0;return!1}function s(e){return e instanceof Error?e.stack||e.message:e}n=t.exports=o,n.coerce=s,n.disable=a,n.enable=i,n.enabled=c,n.humanize=e("ms"),n.names=[],n.skips=[],n.formatters={};var u,l=0},{ms:4}],4:[function(e,t,n){function r(e){var t=/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*d;case"days":case"day":case"d":return n*l;case"hours":case"hour":case"hrs":case"hr":case"h":return n*u;case"minutes":case"minute":case"mins":case"min":case"m":return n*s;case"seconds":case"second":case"secs":case"sec":case"s":return n*c;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n}}}function o(e){return e>=l?Math.round(e/l)+"d":e>=u?Math.round(e/u)+"h":e>=s?Math.round(e/s)+"m":e>=c?Math.round(e/c)+"s":e+"ms"}function i(e){return a(e,l,"day")||a(e,u,"hour")||a(e,s,"minute")||a(e,c,"second")||e+" ms"}function a(e,t,n){return t>e?void 0:1.5*t>e?Math.floor(e/t)+" "+n:Math.ceil(e/t)+" "+n+"s"}var c=1e3,s=60*c,u=60*s,l=24*u,d=365.25*l;t.exports=function(e,t){return t=t||{},"string"==typeof e?r(e):t["long"]?i(e):o(e)}},{}],5:[function(e,t,n){function r(e){"use strict";a("Launching GDM Script"),function(e){var t=document,n=t.createElement("script");n.async=!0,n.defer=!0,n.src=e,t.getElementsByTagName("head")[0].appendChild(n)}((o=window.location.href.indexOf("iatDev=1")>-1||document.cookie.indexOf("iatDev=1")>-1,"//"+("http:"!==window.location.protocol||o?"":"h")+"fp.gdmdigital.com/"+e+".js?r="+1e16*Math.random()+"&m=992&a="+e+(o?"&d=1":"")))}var o,i=e("./utils/type"),a=e("debug")("GDM Handler");t.exports={start:function(e){i(e,"object")&&!e.exclude&&e.flexId&&r(e.flexId)}}},{"./utils/type":20,debug:2}],6:[function(e,t,n){var r=e("debug")("main");e("./utils/polyfills");var o=e("./settings"),i=e("./gdmhandler"),a=e("./run");r("VERSION: "+o.version.join(".")),r("running gdm handler"),i.start(o.gdm),r("running main code"),a.start(o.genie)},{"./gdmhandler":5,"./run":9,"./settings":10,"./utils/polyfills":18,debug:2}],7:[function(e,t,n){function r(e,t){this.urlMatch=!1;var n=t.page||{};this.params=n.params||{},this.urls=n.urls||[],this.dynamicId=t.dynamicIdentifier||{},this.namespace=e.namespace,this.name=e.name,this.setUpLogger()}var o=e("./pubsub-js"),i=e("./utils/checkElements"),a=e("./utils/type"),c=e("./utils/urls"),s=e("debug"),u=e("./utils/jq"),l=e("./utils/criteria").criteria,d=e("./settings").genie,f={productPages:{namespace:"product",name:"productPages"},basketPages:{namespace:"basket",name:"basketPages"},orderValue:{namespace:"value",name:"orderValue"},orderId:{namespace:"id",name:"orderId"},completePage:{namespace:"complete",name:"completePage"}};r.prototype.check=function(){var e=!1,t=this;return this.log("checking through urls"),u.each(this.urls,function(n,r){var o=t.params;a(r,"object")&&r.params&&Object.size(r.params)&&(o=u.extend({},o,urls.params)),c.test(r,o)&&(e=!0,t.log(t.namespace,"matches with url",r,"and params",o))}),this.UrlMatch=e,e},r.prototype.setUpLogger=function(){this.log=s("page:"+this.namespace)},r.prototype.dynamicIdentifier=function(){var e=this.dynamicId,t=this;this.dynamicIdentifierExists()&&this.UrlMatch&&(this.log("checking for dynamic identifier"),i.checkUpdates(e.selector,function(n,r){return l[e.criteria||"yesPlease"](r,e.value)?(t.log("dynamic identifier test passed now ready to act"),o.publishSync("page."+t.namespace,d[t.name]),!0):void 0}))},r.prototype.run=function(){return this.check()?this.dynamicIdentifierExists()?(this.dynamicIdentifier(),!1):(this.log("url found and no dynamic identifier running page action"),o.publishSync("page."+this.namespace,d[this.name]),!0):void 0},r.prototype.dynamicIdentifierExists=function(){return Object.size(this.dynamicId)&&this.dynamicId.selector&&this.dynamicId.selector.length},r.prototype.fromCompletePage=function(){return this.urls.length?!1:!0},t.exports={product:new r(f.productPages,d.productPages),basket:new r(f.basketPages,d.basketPages),value:new r(f.orderValue,d.orderValue),id:new r(f.orderId,d.orderId),complete:new r(f.completePage,d.completePage)}},{"./pubsub-js":8,"./settings":10,"./utils/checkElements":13,"./utils/criteria":14,"./utils/jq":15,"./utils/type":20,"./utils/urls":22,debug:2}],8:[function(e,t,n){"use strict";function r(e){var t;for(t in e)if(e.hasOwnProperty(t))return!0;return!1}function o(e){return function(){if(window.vedebugmode)throw e}}function i(e,t,n){try{e(t,n)}catch(r){setTimeout(o(r),0)}}function a(e,t,n){e(t,n)}function c(e,t,n,r){var o,c=f[t],s=r?a:i;if(f.hasOwnProperty(t))for(o in c)c.hasOwnProperty(o)&&s(c[o],e,n)}function s(e,t,n){return function(){var r=String(e),o=r.lastIndexOf(".");for(c(e,e,t,n);-1!==o;)r=r.substr(0,o),o=r.lastIndexOf("."),c(e,r,t)}}function u(e){for(var t=String(e),n=Boolean(f.hasOwnProperty(t)&&r(f[t])),o=t.lastIndexOf(".");!n&&-1!==o;)t=t.substr(0,o),o=t.lastIndexOf("."),n=Boolean(f.hasOwnProperty(t)&&r(f[t]));return n}function l(e,t,n,r){var o=s(e,t,r),i=u(e);return i?(n===!0?o():setTimeout(o,0),!0):!1}var d={},f={},p=-1;d.publish=function(e,t){return l(e,t,!1,d.immediateExceptions)},d.publishSync=function(e,t){return l(e,t,!0,d.immediateExceptions)},d.subscribe=function(e,t){if("function"!=typeof t)return!1;f.hasOwnProperty(e)||(f[e]={});var n="uid_"+String(++p);return f[e][n]=t,n},d.clearAllSubscriptions=function(){f={}},d.unsubscribe=function(e){var t,n,r,o="string"==typeof e&&f.hasOwnProperty(e),i=!o&&"string"==typeof e,a="function"==typeof e,c=!1;if(o)return void delete f[e];for(t in f)if(f.hasOwnProperty(t)){if(n=f[t],i&&n[e]){delete n[e],c=e;break}if(a)for(r in n)n.hasOwnProperty(r)&&n[r]===e&&(delete n[r],c=!0)}return c},t.exports=d},{}],9:[function(e,t,n){function r(e){var t,n,r=M.genie,o=z?l(r.orderValue):m(N)||r.orderValue["default"],i=L?l(r.orderId):m(V)||(new Date).getTime(),a=r.completionId,c=(r.gdmConversionCode,r.gdmSegementId,m(F)||null),s=(m(q)||null,r.journeyCode),u=r.dbm.src,d=r.dbm.cat.conversion||r.dbm.cat.ros;if(a&&(t="//secure.adnxs.com/px?id="+a+"&seg="+r.segmentIds[1]+"&order_id="+i+"&value="+o+"&t=2",E(t),P("App Nexus Completion Pixel added to complete page")),s&&s.length){var f={companyId:s,items:(c?c+"|":"")+"BASKETVAL:"+o,orderId:i};n=O.adgenie(f,!0),P("adGenie Completion Pixel added to complete page"),E(n)}if(u&&d){var p={src:u,cat:d,orderId:i,orderValue:o},g=O.dbm.conversion(p);E(g),P("Doubleclick Bid Manager Conversion Pixel added to complete page")}T.clearAllSubscriptions()}function o(e){var t,n;t=O.ros(e.segmentIds),n=O.ros(e.segmentIds,!0),E(t),E(n),A("ROS Pixel added to the site.")}function i(e){var t={src:e.dbm.src,cat:e.dbm.cat.ros};srcDbm=O.dbm.ros(t),E(srcDbm),A("DBM ROS Pixel added to the site.")}function a(t){var n,r,o,i=t["default"]?!1:!0,a=l(t,i),c=M.genie,u=c.journeyCode;if(!a)return R("No Default provided and product element not found on this page"),void s(e("./settings").genie);n=O.product(c.segmentIds),r=O.product(c.segmentIds,!0),E(n),E(r);var d={adgCompanyID:u,adgItem:a};o=O.adgenie(d,!1),R("Genie Src is:",o),E(o),R("Product Page Pixel added to the site.")}function c(e){var t=M.genie.journeyCode;if(e){var n={adgCompanyID:t,adgBasketItems:e};genieSrc=O.adgenie(n,!1),E(genieSrc),D("Basket pixel added added to the site.",genieSrc)}}function s(e){return e.ros&&(A("Page qualifies for ROS"),o(e)),e.dbm.ros&&e.dbm.cat.ros&&(A("Page qualifies for Doubleclick Bid Manager ROS"),i(e)),!1}function u(e,t,n,r){return t=k(t,"regexp")?t:new RegExp("","g"),e.text()&&e.text().trim().replace(t,"")||e.val()&&e.val().trim().replace(t,"")||String(n||r)}function l(e,t){var n=S(e.selector),r=(new Date).getTime();if(!n.length)return t?"":e["default"]||r;var o=u(n,e.regex,e["default"],r);return encodeURIComponent(o)}function d(e){var t=I.check(e.selectors.productId),n=I.check(e.selectors.productPrice),r=b(n,v),o=b(t,h);setTimeout(function(){g(r,F),g(o,q)},0),c(o)}function f(e){var t=e.updates&&e.urls.length?" - DYNAMAICALLY":"",n=e.updates&&e.urls.length?I.checkUpdates:I.check;j("Checking For Order Value"+t),n(e.selector,function(n){var r=_[e.mask||"doNothing"](u(n,e.regex,e["default"]));j("Order Value element found"+t+" : "+r),g(r,N)})}function p(e){C("Checking For order Id"),I.check(e.selector,function(t){var n=_[e.mask||"doNothing"](u(t,e.regex,e["default"]));C("Order ID found "+n),g(n,V)})}function g(e,t){j("Storing "+t+" as "+e),y.set(w+t,e)}function m(e){return j("Obtaining from storage "+e),y.get(w+e)}function h(e,t){var n="";return e.each(function(e,r){var o=I.getValOrText(S(r));o=encodeURIComponent(o),n+=o+(t-1>e?"|":"")}),n}function v(e,t){var n="";return e.each(function(e,r){var o=I.getValOrText(S(r));o=_.currency(o),n+="PROD"+(e+1)+":"+o+(t-1>e?"|":"")}),n}function b(e,t){if(!e||!e.length||!t)return"";var n=e.length;return n?t(e,n):""}{var y=e("./utils/store"),w=e("./settings").namespace,x=(e("./utils/urls"),e("./pages")),I=e("./utils/checkElements"),E=e("./utils/addPixel"),S=e("./utils/jq"),O=e("./utils/pixelSrc"),P=e("debug")("conversion:pixel"),k=e("./utils/type"),j=e("debug")("run:value"),C=e("debug")("run:id"),A=e("debug")("run:ros"),R=e("debug")("run:product"),D=e("debug")("run:basket"),M=(e("./utils/criteria").criteria,e("./settings")),T=e("./pubsub-js"),_=e("./utils/criteria").masks,N="orderValue",V="orderId",q="idList",F="itemString",L=x.id.fromCompletePage(),z=x.value.fromCompletePage(),U={value:function(e,t){f(t)},id:function(e,t){p(t)},product:function(e,t){a(t)},basket:function(e,t){d(t)},complete:function(e,t){r(t)}};({value:T.subscribe("page.value",U.value),id:T.subscribe("page.id",U.id),product:T.subscribe("page.product",U.product),basket:T.subscribe("page.basket",U.basket),complete:T.subscribe("page.complete",U.complete)})}t.exports={start:function(e){var t,n,r,o;s(e),n=x.value.run();x.id.run();t=x.complete.run(),t||(r=x.basket.run()),t||r||(o=x.product.run())}}},{"./pages":7,"./pubsub-js":8,"./settings":10,"./utils/addPixel":12,"./utils/checkElements":13,"./utils/criteria":14,"./utils/jq":15,"./utils/pixelSrc":17,"./utils/store":19,"./utils/type":20,"./utils/urls":22,debug:2}],10:[function(e,t,n){var r=window.veTagData.settings.gdm;t.exports={gdm:r.gdm||{exclude:r.exclude,flexId:r.flexId,gdmConversionCode:r.gdmConversionCode,gdmSegementId:r.gdmSegementId},genie:{gdmConversionCode:r.gdmConversionCode,gdmSegementId:r.gdmSegementId||r.gdmSegmentId,completionId:r.completionId,journeyCode:r.journeyCode,segmentIds:r.segmentIds,orderId:r.orderId,orderValue:r.orderValue,completePage:r.completePage,ros:r.ros,basketPages:r.basketPages,productPages:r.productPages,dbm:r.dbm||{}},dbm:r.dbm,namespace:"veapps."+(r.flexId||"")+(r.journeyCode||"")+".GDM.",version:[1,3,1]}},{}],11:[function(e,t,n){!function(e){function n(){try{return c in e&&e[c]}catch(t){return!1}}function r(e){return e.replace(/^d/,"___$&").replace(p,"___")}var o,i={},a=e.document,c="localStorage",s="script";if(i.disabled=!1,i.version="1.3.17",i.set=function(e,t){},i.get=function(e,t){},i.has=function(e){return void 0!==i.get(e)},i.remove=function(e){},i.clear=function(){},i.transact=function(e,t,n){null==n&&(n=t,t=null),null==t&&(t={});var r=i.get(e,t);n(r),i.set(e,r)},i.getAll=function(){},i.forEach=function(){},i.serialize=function(e){return JSON.stringify(e)},i.deserialize=function(e){if("string"!=typeof e)return void 0;try{return JSON.parse(e)}catch(t){return e||void 0}},n())o=e[c],i.set=function(e,t){return void 0===t?i.remove(e):(o.setItem(e,i.serialize(t)),t)},i.get=function(e,t){var n=i.deserialize(o.getItem(e));return void 0===n?t:n},i.remove=function(e){o.removeItem(e)},i.clear=function(){o.clear()},i.getAll=function(){var e={};return i.forEach(function(t,n){e[t]=n}),e},i.forEach=function(e){for(var t=0;t<o.length;t++){var n=o.key(t);e(n,i.get(n))}};else if(a.documentElement.addBehavior){var u,l;try{l=new ActiveXObject("htmlfile"),l.open(),l.write("<"+s+">document.w=window</"+s+'><iframe src="/favicon.ico"></iframe>'),l.close(),u=l.w.frames[0].document,o=u.createElement("div")}catch(d){o=a.createElement("div"),u=a.body}var f=function(e){return function(){var t=Array.prototype.slice.call(arguments,0);t.unshift(o),u.appendChild(o),o.addBehavior("#default#userData"),o.load(c);var n=e.apply(i,t);return u.removeChild(o),n}},p=new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]","g");i.set=f(function(e,t,n){return t=r(t),void 0===n?i.remove(t):(e.setAttribute(t,i.serialize(n)),e.save(c),n)}),i.get=f(function(e,t,n){t=r(t);var o=i.deserialize(e.getAttribute(t));return void 0===o?n:o}),i.remove=f(function(e,t){t=r(t),e.removeAttribute(t),e.save(c)}),i.clear=f(function(e){var t=e.XMLDocument.documentElement.attributes;e.load(c);for(var n,r=0;n=t[r];r++)e.removeAttribute(n.name);e.save(c)}),i.getAll=function(e){var t={};return i.forEach(function(e,n){t[e]=n}),t},i.forEach=f(function(e,t){for(var n,r=e.XMLDocument.documentElement.attributes,o=0;n=r[o];++o)t(n.name,i.deserialize(e.getAttribute(n.name)))})}try{var g="__storejs__";i.set(g,g),i.get(g)!=g&&(i.disabled=!0),i.remove(g)}catch(d){i.disabled=!0}i.enabled=!i.disabled,t.exports=i}(Function("return this")())},{}],12:[function(e,t,n){function r(e){var t=document.createElement("img");t.width=1,t.height=1,t.src=e,t.style.visibility="hidden",document.body.appendChild(t),setTimeout(function(){t.style.display="none"},1e3)}t.exports=r},{}],13:[function(e,t,n){function r(e,t,n){var r=0;e=e||1e3,t=t||600;var o=setInterval(function(){var e=n();r++,(e||t&&r>=t)&&(a("Clearing Check Interval"),clearInterval(o))},e);return o}function o(e,t){var n,o=!1;if(c(t,"function"))var i=r(null,null,function(){return o===!0?void clearInterval(i):(n=s(e),n.length?(o=!0,a("Success function is about to be called"),clearInterval(i),t(n),n):!1)});if(n=s(e),n.length){if(o=!0,a("Success function is about to be called"),!c(t,"function"))return n;clearInterval(i),t(n)}return n}function i(e){return c(e,"string")&&(e=s(e)),e.length?e.val()&&e.val().trim()||e.text()&&e.text().trim():""}var a=e("debug")("checkElement"),c=e("./type"),s=e("./jq");t.exports={check:function(e,t){return a("Element is being checked"),o(e,t)},checkUpdates:function(e,t,n){null==n&&(n=t,t="");var o,a,u,l=r(500,2e3,function(){return a=s(e),u=i(a),!c(u,"nan")&&!c(u,"null")&&!c(u,"undefined")&&u!==t&&(t=u,o=n(a,u))?(clearInterval(l),!0):void 0})},getValOrText:i}},{"./jq":15,"./type":20,debug:2}],14:[function(e,t,n){var r=(e("./type"),{contains:function(e,t){return e=String(e.toLowerCase()),e.indexOf(String(t).toLowerCase())>-1},equal:function(e,t){return String(e)===String(t)},not:function(e,t){return-1===String(e).indexOf(String(t))},yesPlease:function(){return!0}}),o={number:function(e){var t=String(e).match(/([\d]{4,25})/);return t[1]},alphanumeric:function(e){var t=String(e).match(/([\dA-Z]{4,25})/);return t[1]},currency:function(e){return String(e).replace(/[^0-9\.,]/g,"")},doNothing:function(e){return String(e)}};t.exports={criteria:r,masks:o}},{"./type":20}],15:[function(e,t,n){t.exports=window.VEjQuery||window.$},{}],16:[function(e,t,n){function r(e,t,n){veTagData.settings.consoleMessagesEnabled&&!i(console,"undefined")&&console.info(e,t||"",n||"")}function o(e,t,n){veTagData.settings.consoleMessagesEnabled&&!i(console,"undefined")&&console.log(e,t||"",n||"")}var i=e("./type");t.exports=r,t.exports.safe=o},{"./type":20}],17:[function(e,t,n){{var r=("https:"===(window.location.protocol||"https:")?!0:!1,e("./jq"));e("./type"),e("./log")}t.exports={ros:function(e,t){return t?"//secure.adnxs.com/seg?add="+(e[2]||e[0])+"&t=2":"//ib.adnxs.com/seg?add="+(e[2]||e[0])+"&t=2"},product:function(e,t){return t?"//secure.adnxs.com/seg?add="+e[0]+"&t=2":"//ib.adnxs.com/seg?add="+e[0]+"&t=2"},adgenie:function(e,t){var n="//adverts.adgenie.co.uk/"+(t?"conversion.php?":"genieTracker.php?"),o=0;return r.isEmptyObject(e)?n:(r.each(e,function(t,r){o++,r&&(n=n+t+"="+r+(o>=Object.size(e)?"":"&"))}),n)},appnexus:function(e){return e},dbm:{ros:function(e){var t=Math.random()+"",n=1e13*t,r="https://ad.doubleclick.net/activity;src=";return r+e.src+";type=invmedia;cat="+e.cat+";ord="+n+"?"},conversion:function(e){var t="https://ad.doubleclick.net/activity;src=";return t+e.src+";type=sales;cat="+e.cat+";qty=[Quantity];cost="+e.orderValue+";ord="+e.orderId+"?"}}}},{"./jq":15,"./log":16,"./type":20}],18:[function(e,t,n){var r=e("./type");r(Object.create,"function")||(Object.create=function(){var e=function(){};return function(t){if(arguments.length>1)throw Error("Second argument not supported");if("object"!=typeof t)throw TypeError("Argument must be an object");e.prototype=t;var n=new e;return e.prototype=null,n}}()),r(Object.size,"function")||(Object.size=function(e){var t,n=0;for(t in e)e.hasOwnProperty(t)&&n++;return n}),Array.prototype.forEach||(Array.prototype.forEach=function(e,t){var n,r,o,i,a,c=Object(this),s=c.length,u=s>>>0;if("function"!=typeof e)throw new TypeError;for(n=t?t:void 0,r=0;u>r;)o=r.toString(),i=c.hasOwnProperty(o),i&&(a=c[o],e.call(n,a,r,c)),r+=1;return void 0}),function(){for(var e,t=function(){},n=["assert","clear","count","debug","dir","dirxml","error","exception","group","groupCollapsed","groupEnd","info","log","markTimeline","profile","profileEnd","table","time","timeEnd","timeStamp","trace","warn"],o=n.length,i=window.console=window.console||{};o--;)e=n[o],i[e]||(i[e]=t);Function.prototype.bind&&r(i,"object")&&r(i.log,"object")&&n.forEach(function(t,n){i[e]=Function.prototype.call.bind(i[e],i)})}(),Array.prototype.indexOf||(Array.prototype.indexOf=function(e){"use strict";if(null==this)throw new TypeError;var t=Object(this),n=t.length>>>0;if(0===n)return-1;var r=0;if(arguments.length>1&&(r=Number(arguments[1]),r!==r?r=0:0!==r&&r!==1/0&&r!==-(1/0)&&(r=(r>0||-1)*Math.floor(Math.abs(r)))),r>=n)return-1;for(var o=r>=0?r:Math.max(n-Math.abs(r),0);n>o;o++)if(o in t&&t[o]===e)return o;return-1}),String.prototype.trim||!function(){var e=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;String.prototype.trim=function(){return this.replace(e,"")}}()},{"./type":20}],19:[function(e,t,n){function r(e){var t="testStorage";try{return window[e].setItem(t,t),window[e].removeItem(t),!0}catch(n){return!1}}var o,i,a,c,s=e("./type"),u=function(){},l="localStorage";a={set:u,get:u,remove:u,clear:u,SUPPORT:"none"},c={set:function(e,t){return window[l].setItem(e,t)},get:function(e){return window[l].getItem(e)},remove:function(e){return window[l].removeItem(e)},clear:function(){return window[l].clear()},SUPPORT:"simple"};var d;window.JSON&&s(window.JSON.parse,"function")&&s(window.JSON.stringify,"function")?(o=e("../store"),i=o.enabled?o:a):i=d||(d=r(l))?c:a,t.exports=i},{"../store":11,"./type":20}],20:[function(e,t,n){var r=Object.prototype.toString;t.exports=function(e,t){switch(r.call(e)){case"[object Date]":return"date"===t;case"[object RegExp]":return"regexp"===t;case"[object Arguments]":return"arguments"===t;case"[object Array]":return"array"===t;case"[object Error]":return"error"===t}return null===e?"null"===t:void 0===e?"undefined"===t:e!==e?"nan":e&&1===e.nodeType?"element"===t:(e=e.valueOf?e.valueOf():Object.prototype.valueOf.apply(e),t===typeof e)}},{}],21:[function(e,t,n){var r=[].indexOf||function(e){for(var t=0,n=this.length;n>t;t++)if(t in this&&this[t]===e)return t;return-1};t.exports={PatternPrototype:{match:function(e){var t,n,r,o,i,a,c,s;if(o=this.regex.exec(e),null==o)return null;if(n=o.slice(1),this.isRegex)return n;for(t={},r=c=0,s=n.length;s>c;r=++c)a=n[r],i=this.names[r],void 0!==a&&("_"===i?(null==t._&&(t._=[]),t._.push(a)):t[i]=a);return t}},newPattern:function(e,n){var r,o,i;if(null==n&&(n="/"),r=e instanceof RegExp,"string"!=typeof e&&!r)throw new TypeError("argument must be a regex or a string");return[":","*"].forEach(function(e){if(n===e)throw new Error("separator can't be "+e)}),o=Object.create(t.exports.PatternPrototype),o.isRegex=r,o.regex=r?e:(i=t.exports.toRegexString(e,n),new RegExp(i)),r||(o.names=t.exports.getNames(e,n)),o},escapeForRegex:function(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")},getNames:function(e,n){var o,i,a,c,s;if(null==n&&(n="/"),e instanceof RegExp)return[];for(o=t.exports.escapeForRegex(n),c=new RegExp("((:?:[^"+o+"()]+)|(?:[*]))","g"),a=[],s=c.exec(e);null!=s;){if(i=s[1].slice(1),"_"===i)throw new TypeError(":_ can't be used as a pattern name in pattern "+e);if(r.call(a,i)>=0)throw new TypeError("duplicate pattern name :"+i+" in pattern "+e);a.push(i||"_"),s=c.exec(e)}return a},escapeSeparators:function(e,n){var r,o;return null==n&&(n="/"),r=t.exports.escapeForRegex(n),o=new RegExp(r,"g"),e.replace(o,r)},toRegexString:function(e,n){var r,o;return null==n&&(n="/"),o=t.exports.escapeSeparators(e,n),o=o.replace(/\((.*?)\)/g,"(?:$1)?").replace(/\*/g,"(.*?)"),r=t.exports.escapeForRegex(n),t.exports.getNames(e,n).forEach(function(e){return o=o.replace(":"+e,"([^\\"+n+"]+)")}),"^"+o+"$"}}},{}],22:[function(e,t,n){function r(e){if(""===e||"?"===e)return{};var t,n,r,o={};for(t=e.replace(/^\?/,"").split("&"),n=0;n<t.length;n++)r=t[n].split("="),o[r[0]]=r[1];return o}function o(e){try{var t=(e+"").toLowerCase();return t=t.replace("http://",""),t=t.replace("https://",""),t=t.replace("#","?"),t=t.replace(";","?"),"www."===t.substr(0,4)&&(t=t.replace("www.","")),t}catch(n){return""}}function i(e){"www."===e.substr(0,4)&&(e=e.replace("www.","")),e=e.toLowerCase();var t=c.newPattern(e),n=!!t.match(l);return s("Result of URLs matching "+e+" is",n),n}function a(e){var t=!0;return Object.size(e)?(u.each(e,function(e,n){e=String(e),n=String(n);var r=c.newPattern(n);(null==d[e]||!r.match(d[e])&&!r.match(decodeURIComponent(d[e])))&&(t=!1)}),t):t}var c=e("./url-pattern"),s=e("debug")("urls"),u=e("./jq"),l=o(window.location.hostname+(window.location.pathname.length>1?window.location.pathname:"")),d=r(window.location.search||"");s("PAGE_URL and PAGE_PARAMS have been set."),t.exports={test:function(e,t){return i(e)&&a(t)}}},{"./jq":15,"./url-pattern":21,debug:2}]},{},[1]);
  },
onGetCaptureValue: function(formMappingId, value, controls) {

        if(formMappingId === 41705){
           
            value = 1.50;

        }
              
        return value;   
    }

},

                /*
                 * Criteria filters that are setup by tech team. The types of Criteria filters possible are:
                 *       * Personality - The matching of this criteria filters will defined the personality that the chat will have
                 *       * Variation
                 */
                criteriaFilters: {},

                /*
                 * All the apps that Ve Interactive has with the events
                 */
                apps: [
  {
    name: "Chat",
    exit: true,
    inactivity: true,
    backButton: true,
    load: true,
    enabled: true,
    maxActivationsPerSession: null,
    activateOnlyOnLastTab: false,
    minTimeBetweenActivations: null,
    exitIntent: false
  }
]
            };
        if (!tag) {

            // Send the request in order to create the cookie session
            if (d.settings.cookies && d.settings.cookies.enabled) {
                var xdr = null;
                if (window.XMLHttpRequest) {
                    xdr = new XMLHttpRequest();
                }

                if (xdr !== null) {
                    var url = d.chatServicesUrl.split('/')[0] + // Getting the rcs URL
                                '/DataReceiverService.asmx/SessionInit?journeyCode=' +
                                d.journeycode +
                                '&timeToLive=' +
                                (d.settings.cookies.timeToLive ? d.settings.cookies.timeToLive : 60); // either the time exist either we use the default time (minutes)

                    xdr.open("GET", location.protocol + "//" + url);
                    xdr.withCredentials = true;
                    xdr.send();
                }
            }


            // Adding the Capture-apps file to the DOM
            tag = document.createElement('script');
            tag.type = 'text/javascript';
            tag.id = 'veConnect';
            tag.async = true;
            tag.src = window.location.protocol + d.veHostDomain +'/scripts/3.0/capture-3.0.1.js';
            b = document.getElementsByTagName('script')[0];
            b.parentNode.insertBefore(tag, b);
        }
        return d;
    })();
};
