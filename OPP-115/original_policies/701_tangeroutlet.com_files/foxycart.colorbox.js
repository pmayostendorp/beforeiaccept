// Class to set the values of foxycart variables used in the foxycart.colorbox.js
function FoxyCartValues() {
    this.storedomain;
    this.sitedomain;
    this.cookiepath;

    this.setValues = function () {

        var fcDetails = new foxyCartDetails();

        var dirPath;
        // Check the URL - if pointing to Canadian/Bromont/SaintSauveur folders load the Canadian cart
        var url = window.location.href;
        var dirnames = url.split('/');
        if (typeof dirnames[3] != "undefined") {
            dirPath = dirnames[3];
        }

        if (dirPath == "CA") {
            if (typeof (cookiepath) == 'undefined') {
                this.cookiepath = fcDetails.CACookiePath;
            }
            if (typeof (storedomain) == 'undefined') {
                this.storedomain = fcDetails.CAStoreDomain;
            }
            if (typeof (sitedomain) == 'undefined') {
                this.sitedomain = fcDetails.sitename;
            }
        }
        else if (dirPath == "BRO") {
            if (typeof (cookiepath) == 'undefined') {
                this.cookiepath = fcDetails.BROCookiePath;
            }
            if (typeof (storedomain) == 'undefined') {
                this.storedomain = fcDetails.BROStoreDomain;
            }
            if (typeof (sitedomain) == 'undefined') {
                this.sitedomain = fcDetails.sitename;
            }
        }
        else if (dirPath == "STS") {
            if (typeof (cookiepath) == 'undefined') {
                this.cookiepath = fcDetails.STSCookiePath;
            }
            if (typeof (storedomain) == 'undefined') {
                this.storedomain = fcDetails.STSStoreDomain;
            }
            if (typeof (sitedomain) == 'undefined') {
                this.sitedomain = fcDetails.sitename;
            }
        }
        else if (dirPath == "OTT") {
            if (typeof (cookiepath) == 'undefined') {
                this.cookiepath = fcDetails.OTTCookiePath;
            }
            if (typeof (storedomain) == 'undefined') {
                this.storedomain = fcDetails.OTTStoreDomain;
            }
            if (typeof (sitedomain) == 'undefined') {
                this.sitedomain = fcDetails.sitename;
            }
        }

        else {
            if (typeof (cookiepath) == 'undefined') {
                this.cookiepath = fcDetails.USCookiePath;
            }
            if (typeof (storedomain) == 'undefined') {
                this.storedomain = fcDetails.USStoreDomain;
            }
            if (typeof (sitedomain) == 'undefined') {
                this.sitedomain = fcDetails.sitename;
            }
        }
    }
}


// creats a new instance of foxycartValues object and call the method setValues that sets the value of the object using the current URL which contains (US or CA)
var foxyCart = new FoxyCartValues();
foxyCart.setValues();

var storedomain = foxyCart.storedomain;
var sitedomain = foxyCart.sitedomain; 
var cookiepath = foxyCart.cookiepath;


// ColorBox v1.3.19.3 - jQuery lightbox plugin
// (c) 2011 Jack Moore - jacklmoore.com
// License: http://www.opensource.org/licenses/mit-license.php
(function(a,b,c){function Z(c,d,e){var g=b.createElement(c);return d&&(g.id=f+d),e&&(g.style.cssText=e),a(g)}function $(a){var b=y.length,c=(Q+a)%b;return c<0?b+c:c}function _(a,b){return Math.round((/%/.test(a)?(b==="x"?z.width():z.height())/100:1)*parseInt(a,10))}function ab(a){return K.photo||/\.(gif|png|jpe?g|bmp|ico)((#|\?).*)?$/i.test(a)}function bb(){var b,c=a.data(P,e);c==null?(K=a.extend({},d),console&&console.log&&console.log("Error: cboxElement missing settings object")):K=a.extend({},c);for(b in K)a.isFunction(K[b])&&b.slice(0,2)!=="on"&&(K[b]=K[b].call(P));K.rel=K.rel||P.rel||"nofollow",K.href=K.href||a(P).attr("href"),K.title=K.title||P.title,typeof K.href=="string"&&(K.href=a.trim(K.href))}function cb(b,c){a.event.trigger(b),c&&c.call(P)}function db(){var a,b=f+"Slideshow_",c="click."+f,d,e,g;K.slideshow&&y[1]?(d=function(){F.text(K.slideshowStop).unbind(c).bind(j,function(){if(K.loop||y[Q+1])a=setTimeout(W.next,K.slideshowSpeed)}).bind(i,function(){clearTimeout(a)}).one(c+" "+k,e),r.removeClass(b+"off").addClass(b+"on"),a=setTimeout(W.next,K.slideshowSpeed)},e=function(){clearTimeout(a),F.text(K.slideshowStart).unbind([j,i,k,c].join(" ")).one(c,function(){W.next(),d()}),r.removeClass(b+"on").addClass(b+"off")},K.slideshowAuto?d():e()):r.removeClass(b+"off "+b+"on")}function eb(b){U||(P=b,bb(),y=a(P),Q=0,K.rel!=="nofollow"&&(y=a("."+g).filter(function(){var b=a.data(this,e),c;return b&&(c=b.rel||this.rel),c===K.rel}),Q=y.index(P),Q===-1&&(y=y.add(P),Q=y.length-1)),S||(S=T=!0,r.show(),K.returnFocus&&a(P).blur().one(l,function(){a(this).focus()}),q.css({opacity:+K.opacity,cursor:K.overlayClose?"pointer":"auto"}).show(),K.w=_(K.initialWidth,"x"),K.h=_(K.initialHeight,"y"),W.position(),o&&z.bind("resize."+p+" scroll."+p,function(){q.css({width:z.width(),height:z.height(),top:z.scrollTop(),left:z.scrollLeft()})}).trigger("resize."+p),cb(h,K.onOpen),J.add(D).hide(),I.html(K.close).show()),W.load(!0))}function fb(){!r&&b.body&&(Y=!1,z=a(c),r=Z(X).attr({id:e,"class":n?f+(o?"IE6":"IE"):""}).hide(),q=Z(X,"Overlay",o?"position:absolute":"").hide(),s=Z(X,"Wrapper"),t=Z(X,"Content").append(A=Z(X,"LoadedContent","width:0; height:0; overflow:hidden"),C=Z(X,"LoadingOverlay").add(Z(X,"LoadingGraphic")),D=Z(X,"Title"),E=Z(X,"Current"),G=Z(X,"Next"),H=Z(X,"Previous"),F=Z(X,"Slideshow").bind(h,db),I=Z(X,"Close")),s.append(Z(X).append(Z(X,"TopLeft"),u=Z(X,"TopCenter"),Z(X,"TopRight")),Z(X,!1,"clear:left").append(v=Z(X,"MiddleLeft"),t,w=Z(X,"MiddleRight")),Z(X,!1,"clear:left").append(Z(X,"BottomLeft"),x=Z(X,"BottomCenter"),Z(X,"BottomRight"))).find("div div").css({"float":"left"}),B=Z(X,!1,"position:absolute; width:9999px; visibility:hidden; display:none"),J=G.add(H).add(E).add(F),a(b.body).append(q,r.append(s,B)))}function gb(){return r?(Y||(Y=!0,L=u.height()+x.height()+t.outerHeight(!0)-t.height(),M=v.width()+w.width()+t.outerWidth(!0)-t.width(),N=A.outerHeight(!0),O=A.outerWidth(!0),r.css({"padding-bottom":L,"padding-right":M}),G.click(function(){W.next()}),H.click(function(){W.prev()}),I.click(function(){W.close()}),q.click(function(){K.overlayClose&&W.close()}),a(b).bind("keydown."+f,function(a){var b=a.keyCode;S&&K.escKey&&b===27&&(a.preventDefault(),W.close()),S&&K.arrowKey&&y[1]&&(b===37?(a.preventDefault(),H.click()):b===39&&(a.preventDefault(),G.click()))}),a("."+g,b).live("click",function(a){a.which>1||a.shiftKey||a.altKey||a.metaKey||(a.preventDefault(),eb(this))})),!0):!1}var d={transition:"elastic",speed:300,width:!1,initialWidth:"600",innerWidth:!1,maxWidth:!1,height:!1,initialHeight:"450",innerHeight:!1,maxHeight:!1,scalePhotos:!0,scrolling:!0,inline:!1,html:!1,iframe:!1,fastIframe:!0,photo:!1,href:!1,title:!1,rel:!1,opacity:.9,preloading:!0,current:"image {current} of {total}",previous:"previous",next:"next",close:"close",xhrError:"This content failed to load.",imgError:"This image failed to load.",open:!1,returnFocus:!0,reposition:!0,loop:!0,slideshow:!1,slideshowAuto:!0,slideshowSpeed:2500,slideshowStart:"start slideshow",slideshowStop:"stop slideshow",onOpen:!1,onLoad:!1,onComplete:!1,onCleanup:!1,onClosed:!1,overlayClose:!0,escKey:!0,arrowKey:!0,top:!1,bottom:!1,left:!1,right:!1,fixed:!1,data:undefined},e="colorbox",f="cbox",g=f+"Element",h=f+"_open",i=f+"_load",j=f+"_complete",k=f+"_cleanup",l=f+"_closed",m=f+"_purge",n=!a.support.opacity&&!a.support.style,o=n&&!c.XMLHttpRequest,p=f+"_IE6",q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X="div",Y;if(a.colorbox)return;a(fb),W=a.fn[e]=a[e]=function(b,c){var f=this;b=b||{},fb();if(gb()){if(!f[0]){if(f.selector)return f;f=a("<a/>"),b.open=!0}c&&(b.onComplete=c),f.each(function(){a.data(this,e,a.extend({},a.data(this,e)||d,b))}).addClass(g),(a.isFunction(b.open)&&b.open.call(f)||b.open)&&eb(f[0])}return f},W.position=function(a,b){function i(a){u[0].style.width=x[0].style.width=t[0].style.width=a.style.width,t[0].style.height=v[0].style.height=w[0].style.height=a.style.height}var c=0,d=0,e=r.offset(),g,h;z.unbind("resize."+f),r.css({top:-9e4,left:-9e4}),g=z.scrollTop(),h=z.scrollLeft(),K.fixed&&!o?(e.top-=g,e.left-=h,r.css({position:"fixed"})):(c=g,d=h,r.css({position:"absolute"})),K.right!==!1?d+=Math.max(z.width()-K.w-O-M-_(K.right,"x"),0):K.left!==!1?d+=_(K.left,"x"):d+=Math.round(Math.max(z.width()-K.w-O-M,0)/2),K.bottom!==!1?c+=Math.max(z.height()-K.h-N-L-_(K.bottom,"y"),0):K.top!==!1?c+=_(K.top,"y"):c+=Math.round(Math.max(z.height()-K.h-N-L,0)/2),r.css({top:e.top,left:e.left}),a=r.width()===K.w+O&&r.height()===K.h+N?0:a||0,s[0].style.width=s[0].style.height="9999px",r.dequeue().animate({width:K.w+O,height:K.h+N,top:c,left:d},{duration:a,complete:function(){i(this),T=!1,s[0].style.width=K.w+O+M+"px",s[0].style.height=K.h+N+L+"px",K.reposition&&setTimeout(function(){z.bind("resize."+f,W.position)},1),b&&b()},step:function(){i(this)}})},W.resize=function(a){S&&(a=a||{},a.width&&(K.w=_(a.width,"x")-O-M),a.innerWidth&&(K.w=_(a.innerWidth,"x")),A.css({width:K.w}),a.height&&(K.h=_(a.height,"y")-N-L),a.innerHeight&&(K.h=_(a.innerHeight,"y")),!a.innerHeight&&!a.height&&(A.css({height:"auto"}),K.h=A.height()),A.css({height:K.h}),W.position(K.transition==="none"?0:K.speed))},W.prep=function(b){function g(){return K.w=K.w||A.width(),K.w=K.mw&&K.mw<K.w?K.mw:K.w,K.w}function h(){return K.h=K.h||A.height(),K.h=K.mh&&K.mh<K.h?K.mh:K.h,K.h}if(!S)return;var c,d=K.transition==="none"?0:K.speed;A.remove(),A=Z(X,"LoadedContent").append(b),A.hide().appendTo(B.show()).css({width:g(),overflow:K.scrolling?"auto":"hidden"}).css({height:h()}).prependTo(t),B.hide(),a(R).css({"float":"none"}),o&&a("select").not(r.find("select")).filter(function(){return this.style.visibility!=="hidden"}).css({visibility:"hidden"}).one(k,function(){this.style.visibility="inherit"}),c=function(){function s(){n&&r[0].style.removeAttribute("filter")}var b,c,g=y.length,h,i="frameBorder",k="allowTransparency",l,o,p,q;if(!S)return;l=function(){clearTimeout(V),C.hide(),cb(j,K.onComplete)},n&&R&&A.fadeIn(100),D.html(K.title).add(A).show();if(g>1){typeof K.current=="string"&&E.html(K.current.replace("{current}",Q+1).replace("{total}",g)).show(),G[K.loop||Q<g-1?"show":"hide"]().html(K.next),H[K.loop||Q?"show":"hide"]().html(K.previous),K.slideshow&&F.show();if(K.preloading){b=[$(-1),$(1)];while(c=y[b.pop()])q=a.data(c,e),q&&q.href?(o=q.href,a.isFunction(o)&&(o=o.call(c))):o=c.href,ab(o)&&(p=new Image,p.src=o)}}else J.hide();K.iframe?(h=Z("iframe")[0],i in h&&(h[i]=0),k in h&&(h[k]="true"),h.name=f+ +(new Date),K.fastIframe?l():a(h).one("load",l),h.src=K.href,K.scrolling||(h.scrolling="no"),a(h).addClass(f+"Iframe").appendTo(A).one(m,function(){h.src="//about:blank"})):l(),K.transition==="fade"?r.fadeTo(d,1,s):s()},K.transition==="fade"?r.fadeTo(d,0,function(){W.position(0,c)}):W.position(d,c)},W.load=function(b){var c,d,e=W.prep;T=!0,R=!1,P=y[Q],b||bb(),cb(m),cb(i,K.onLoad),K.h=K.height?_(K.height,"y")-N-L:K.innerHeight&&_(K.innerHeight,"y"),K.w=K.width?_(K.width,"x")-O-M:K.innerWidth&&_(K.innerWidth,"x"),K.mw=K.w,K.mh=K.h,K.maxWidth&&(K.mw=_(K.maxWidth,"x")-O-M,K.mw=K.w&&K.w<K.mw?K.w:K.mw),K.maxHeight&&(K.mh=_(K.maxHeight,"y")-N-L,K.mh=K.h&&K.h<K.mh?K.h:K.mh),c=K.href,V=setTimeout(function(){C.show()},100),K.inline?(Z(X).hide().insertBefore(a(c)[0]).one(m,function(){a(this).replaceWith(A.children())}),e(a(c))):K.iframe?e(" "):K.html?e(K.html):ab(c)?(a(R=new Image).addClass(f+"Photo").error(function(){K.title=!1,e(Z(X,"Error").html(K.imgError))}).load(function(){var a;R.onload=null,K.scalePhotos&&(d=function(){R.height-=R.height*a,R.width-=R.width*a},K.mw&&R.width>K.mw&&(a=(R.width-K.mw)/R.width,d()),K.mh&&R.height>K.mh&&(a=(R.height-K.mh)/R.height,d())),K.h&&(R.style.marginTop=Math.max(K.h-R.height,0)/2+"px"),y[1]&&(K.loop||y[Q+1])&&(R.style.cursor="pointer",R.onclick=function(){W.next()}),n&&(R.style.msInterpolationMode="bicubic"),setTimeout(function(){e(R)},1)}),setTimeout(function(){R.src=c},1)):c&&B.load(c,K.data,function(b,c,d){e(c==="error"?Z(X,"Error").html(K.xhrError):a(this).contents())})},W.next=function(){!T&&y[1]&&(K.loop||y[Q+1])&&(Q=$(1),W.load())},W.prev=function(){!T&&y[1]&&(K.loop||Q)&&(Q=$(-1),W.load())},W.close=function(){S&&!U&&(U=!0,S=!1,cb(k,K.onCleanup),z.unbind("."+f+" ."+p),q.fadeTo(200,0),r.stop().fadeTo(300,0,function(){r.add(q).css({opacity:1,cursor:"auto"}).hide(),cb(m),A.remove(),setTimeout(function(){U=!1,cb(l,K.onClosed)},1)}))},W.remove=function(){a([]).add(r).add(q).remove(),r=null,a("."+g).removeData(e).removeClass(g).die()},W.element=function(){return a(P)},W.settings=d})(jQuery,document,this);

// Compressed using Google's Closure
// Uncompressed version at https://cdn.foxycart.com/static/v/1.0.0/js/foxycart.raw.js
window.jQuery||alert("This page does not have jQuery loaded. Please add jQuery to your website to ensure FoxyCart functions properly. If you are a customer seeing this alert please notify the owner of this website about it.");var FC=FC||{};FC.json={};FC.session_id="";FC.session_name="fcsid";var cookiepath=cookiepath||"";FC.client=function(a,b,c){this.storedomain=a;this.sitedomain=b.replace(/https?:\/\//i,"").replace(/www\./i,"").replace(/\/.*$/,"");this.cookiepath=c||""};
FC.client.prototype.session_initialized=!1;
FC.client.prototype.session_get=function(){if(""!=FC.session_id)return this.session_initialized=!0,"&"+FC.session_name+"="+FC.session_id;this.regex=RegExp("#"+FC.session_name+"=([A-Za-z0-9]*)");if(this.regex.test(window.location.href)){var a=this.regex.exec(window.location.href);FC.session_id=a[1];this.session_set(FC.session_name,FC.session_id)}else if(-1<document.cookie.indexOf(FC.session_name+"=")){if(a=document.cookie.indexOf(FC.session_name+"="),-1!=a){var a=a+FC.session_name.length+1,b=document.cookie.indexOf(";",
a);-1==b&&(b=document.cookie.length);FC.session_id=unescape(document.cookie.substring(a,b))}}else 0<FC.json.length&&(FC.session_id=FC.json.session_id,this.session_set(FC.session_name,FC.session_id));return""!=FC.session_id?(this.session_initialized=!0,"&"+FC.session_name+"="+FC.session_id):""};
FC.client.prototype.session_set=function(){var a=this.sitedomain.split(".");"www"==a[0]&&a.shift();for(var b=window.location.href.split("/"),b=b[2].split("."),a=b.length-a.length;0<a;)b.shift(),a--;b="."+b.join(".");if(".foxycart.com"==b)return!1;document.cookie=FC.session_name+"="+escape(FC.session_id)+";path=/"+this.cookiepath+";domain="+b;return!0};
FC.client.prototype.session_apply=function(){var a=this;jQuery("body").delegate('a[href*="'+this.storedomain+'"]',"click",function(){RegExp(FC.session_name+"=([A-Za-z0-9]*)").test(jQuery(this).attr("href"))||jQuery(this).attr("href",jQuery(this).attr("href")+a.session_get());return a.cart_submit(this,a.cart_prepare_element(this),"init")});jQuery("body").delegate('form[action*="'+this.storedomain+'"]',"submit",function(){0==jQuery(this).children("input[name="+FC.session_name+"]").length&&jQuery(this).prepend('<input type="hidden" name="'+
FC.session_name+'" value="'+FC.session_id+'">');return jQuery(this).hasClass("fc_event_process")?!0:a.cart_submit(this,a.cart_prepare_element(this),"init")})};
FC.client.prototype.cart_update=function(){var a=this;jQuery.getJSON("https://"+this.storedomain+"/cart.php?cart=get&output=json"+this.session_get()+"&callback=?",function(b){FC.json=b;!0==!a.session_initialized&&(a.session_initialized=!0,FC.session_id=b.session_id,a.session_set(),a.session_get());0<FC.json.product_count?(jQuery("#fc_minicart, .fc_minicart").show(),1==FC.json.product_count?(jQuery("#fc_plural, .fc_plural").hide(),jQuery("#fc_singular, .fc_singular").show()):(jQuery("#fc_plural, .fc_plural").show(),
jQuery("#fc_singular, .fc_singular").hide())):jQuery("#fc_minicart, .fc_minicart").hide();jQuery("#fc_quantity, .fc_quantity").html(""+FC.json.product_count);jQuery("#fc_total_price, .fc_total_price").html(""+a._currency_format(FC.json.total_price));0==a.events.cart.ready.counter&&a.events.cart.ready.execute()})};
FC.client.prototype.cart_submit=function(a,b,c){var d,e;d=this;e=function(){d.cart_submit.apply(d,arguments)};switch(c){case "init":if(!this.events.cart.preprocess.execute(a,b,e))return!1;case "preprocess":if(!this.events.cart.process.execute(a,b,e))return!1;case "process":return"A"==a.tagName?window.location.href=jQuery(a).attr("href"):"FORM"==a.tagName&&jQuery(a).addClass("fc_event_process").submit().removeClass("fc_event_process"),!1;default:return!0}};
FC.client.prototype.cart_prepare_element=function(a){var b="";"A"==a.tagName?(b=a.href.match(/\?(.*)$/),b=b[1]):"FORM"==a.tagName&&(b=jQuery(a).serialize());b.replace(/\|\|[A-Za-z0-9]{64}(\|\|open)?/g,"");return this._unserialize(b)};FC.client.event=function(a){this.id=a;this.funcs=[];this.counter=this.funcs_counter=0;this.arr=this.e=void 0};FC.client.event.prototype.add=function(a){"function"!=typeof a&&(a=new Function(a));this.funcs.push(a)};
FC.client.event.prototype.add_pre=function(a){"function"!=typeof a&&(a=new Function(a));this.funcs.unshift(a)};FC.client.event.prototype.execute=function(a,b,c){var d=!0,e=void 0;this.funcs_counter=0;this.arr=this.e=void 0;this.callback=c;for(c=0;c<this.funcs.length;c++)e=this.funcs[c](a,b),!1==e?(c=this.funcs.length,d=!1):"pause"==e&&(this.funcs_counter=c+1,c=this.funcs.length,this.e=a,this.arr=b,d=!1);this.counter++;return d};
FC.client.event.prototype.resume=function(a,b,c){for(var d=!0,e=void 0,a="undefined"!=typeof a?a:this.e,b="undefined"!=typeof b?b:this.arr,c="undefined"!=typeof c?c:this.callback,f=this.funcs_counter;f<this.funcs.length;f++)e=this.funcs[f](a,b),!1==e?(f=this.funcs.length,d=!1):"pause"==e&&(this.funcs_counter=f,this.e=a,this.arr=b,d=!1);this.counter++;return d?("undefined"!=typeof c&&c(a,b,this.id),!0):!1};
FC.client.prototype.events={cart:{ready:new FC.client.event("ready"),preprocess:new FC.client.event("preprocess"),process:new FC.client.event("process"),postprocess:new FC.client.event("postprocess")}};FC.client.prototype._unserialize=function(a){var a=a.split("&"),b=[];jQuery.each(a,function(){var a=this.split("=");b[a[0]]=a[1]});return b};
FC.client.prototype._currency_format=function(a){a=parseFloat(a);isNaN(a)&&(a=0);var b="";0>a&&(b="-");a=Math.abs(a);a=parseInt(100*(a+0.005));s=new String(a/100);0>s.indexOf(".")&&(s+=".00");s.indexOf(".")==s.length-2&&(s+="0");return s=b+s};FC.client.prototype.init=function(){this.session_apply();this.cart_update()};

// Initialize the fcc object
var fcc = new FC.client(storedomain, sitedomain, cookiepath);
jQuery(document).ready(function(){
    fcc.init();

  
});



// COLORBOX
var colorbox_width = colorbox_width || "700px";
var colorbox_height = colorbox_height || "450px";
var colorbox_close = colorbox_close || '<span>&laquo;</span> Continue Shopping';
fcc.events.cart.postprocess.add(function(e){
	fcc.cart_update();
});
fcc.events.cart.process.add(function(e){
	var href = '';
	if (typeof(e) === "string") {
		href = e;
	} else if (e.tagName == 'A') {
		href = e.href;
	} else if (e.tagName == 'FORM') {
		href = 'https://'+storedomain+'/cart?'+jQuery(e).serialize();
	}

	if (href.match("cart=(checkout|updateinfo)") || href.match("redirect=") || href.match("receipt(\.php)?\\?id=")) {
	    return true;
	} else if (jQuery(window).width() < 768) {
	    return true;
	} else {
		jQuery.colorbox({
			href: href,
			iframe: true,
			width: colorbox_width,
			height: colorbox_height,
            opacity:.3,
			onOpen: function() {jQuery("#colorbox").addClass("fc_cbox");},
			close: colorbox_close,
			onClosed: function () { jQuery("#colorbox").removeClass("fc_cbox"); fcc.events.cart.postprocess.execute(e); location.reload(true); }
		});
		return false;
	}
});
fcc.events.cart.ready.add(function(e) {
	if (location.href.indexOf('#fc_open=true') != -1) {
		fcc.events.cart.process.execute("https://"+fcc.storedomain+"/cart?cart=view");
	}
});




/*!
 * Foxycart Multicart - Version: 20141011
 * http://quadland.com
 * Copyright (c) 2014 Quadland; Dual licensed: MIT/GPL
 * Requires: jQuery v1.7 or later
 */
; (function ($) {
    "use strict";

    var version = '20141011';

    $.fn.multicart = function (options) {

        // fix mistakes with the ready state
        var o;

        if (this.length === 0 && !$.isReady) {
            o = { s: this.selector, c: this.context };
            $.fn.multicart.log('requeuing (dom not ready)');
            $(function () {
                $(o.s, o.c).multicart(options);
            });
            return this;
        }

        var possibleCarts = this.length;


        return this.each(function () {
            var data, opts, shortName, val;
            var container = $(this);
            var log = $.fn.multicart.log;

            // Reset label to default
            var defaultLabel = $(this).attr('data-label');
            if (!(typeof defaultLabel === 'undefined'))
                $(this).text(defaultLabel);

            // Check if we arleady do the work
            if (container.data('multicart.opts')) {
                log('already initialized');
                return; // already initialized
            }

            // If log disable, set to empty function
            if (container.data('multicart-log') === false ||
                (options && options.log === false) ||
                (opts && opts.log === false)) {
                log = $.noop;
            }

            log('--multicart link init--');

            data = container.data();

            opts = $.extend({}, $.fn.multicart.defaults, data, options || {});
            opts.container = container;

            opts.API = $.extend({ _container: container }, $.fn.multicart.API);
            opts.API.log = log;
            opts.API.trigger = function (eventName, args) {
                opts.container.trigger(eventName, args);
                return opts.API;
            };

            container.data('multicart.opts', opts);
            container.data('multicart.API', opts.API);

            opts.API.checkCartLinks(possibleCarts);
        });


    };
    $.fn.multicart.carts = [],
    $.fn.multicart.possibleCartsCount,
    $.fn.multicart.cartsCheckedCount = 0,
    $.fn.multicart.cartActiveCount = 0,
    $.fn.multicart.API = {
        opts: function () {
            return this._container.data('multicart.opts');
        },
        checkCartLinks: function (possibleCarts) {
            var opts = this.opts();
            var cartLink = opts.cartLinks;

            // add carts that already exist
            cartLink = cartLink.jquery ? cartLink : opts.container.find(cartLink);
            opts.API.getCart(cartLink, possibleCarts);
        },
        getCart: function (cartLink, possibleCarts) {
            var opts = this.opts();
            var storeName = cartLink.attr(opts.linkStoreAttr);
            var storeUrl = cartLink.attr(opts.linkStoreAttr);
            var cartUrl = '';


            //Validate that we have a store
            if (storeUrl == null) {
                $.fn.multicart.log("Error: Missing Store Attribute (i.e. data-store) in store link");
                return;
            }

            //Build url for ajax call
            if (opts.foxycartDomain)
                storeUrl = 'https://' + storeName + '.foxycart.com';

            cartUrl = storeUrl + '/cart';
            $.fn.multicart.log(cartUrl);

            // Call Foxycart
            jQuery.getJSON(cartUrl + '?&output=json&callback=?', function (cart, status) {
                $.fn.multicart.cartsCheckedCount++;
                //IF the ccart has items, add the cart to the carts objects
                if (!(typeof cart.product_count === 'undefined') && (cart.product_count > 0)) {
                    $.fn.multicart.carts[storeName] = cart;
                    $.fn.multicart.cartActiveCount++;
                }
                $.fn.multicart.log(possibleCarts, $.fn.multicart.cartsCheckedCount)
                if (possibleCarts <= $.fn.multicart.cartsCheckedCount) {
                    $.fn.multicart.API.getCartsComplete();
                }

            })
            .fail(function () {
                $.fn.multicart.log("Error: Unable to collect data from foxycart store");
            })

        },
        getCartsComplete: function () {


            // Cross reference data-store with array key values to deteremin which to turn on
            $($.fn.multicart.defaults.autoSelector).each(function () {
                var dataStore = $(this).find($.fn.multicart.defaults.cartLinks).attr("data-store");
                if ((typeof dataStore !== 'undefined') && (dataStore in $.fn.multicart.carts)) {
                    $(this).show();

                    // If only cart, remove excessive description
                    if ($.fn.multicart.cartActiveCount == 1) {
                        $(this).find($.fn.multicart.defaults.cartLinks).text('View Cart');
                    }

                    //connect to colorbox
                    if (typeof colorbox != "undefined") {
                        var fcDim = new foxyCartDetails();
                        $(this).find($.fn.multicart.defaults.cartLinks).colorbox({
                            scrolling: false,
                            width: fcDim.width,
                            height: fcDim.height,
                            onOpen: function () {
                                if (jQuery(window).width() < 768) {
                                    $.colorbox.remove();
                                    window.location = $(storeLink).attr('href');
                                }
                            },
                            onClosed: function () {
                                location.reload(true);
                            }
                        });
                    }
                }
            });


        }

    }; // API

    // default logger
    $.fn.multicart.log = function log() {
        /*global console:true */
        if (window.console && console.log)
            console.log('[multicart] ' + Array.prototype.join.call(arguments, ' '));
    };

    $.fn.multicart.version = function () { return 'Multicart: ' + version; };

    // helper functions

    function lowerCase(s) {
        return (s || '').toLowerCase();
    }


    // @see: http://jquery.malsup.com/cycle2/api
    $.fn.multicart.defaults = {
        autoSelector: '.main-nav-2 .cartLink',
        defaultSelector: '.main-nav-2 .cartLinkDefault',
        cartLinks: '> a',
        foxycartDomain: true,
        linkStoreAttr: 'data-store',
        cartCount: 0,

        updateView: -1
    };



})(jQuery);


