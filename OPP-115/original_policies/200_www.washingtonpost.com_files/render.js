(function($,window,undefined){$.fn.appendLinkItems=function(links,surroundingTag){var element=this;surroundingTag=surroundingTag||"\x3cli\x3e";$.each(links,function(i,link){var a=$("\x3ca\x3e");if(link.title)a.text(link.title);if(link.html)a.html(link.html);if(link.href)a.attr("href",link.href);if(link.attr)a.attr(link.attr);element.append($(surroundingTag).append(a).addClass(link.selected?"selected":""))});return this};$.fn.trackClick=function(type){var element=this;element.on("click",function(){var linkname;
var link=$(this);if(!!window.s&&typeof s.sendDataToOmniture=="function"){linkname=("pbnav:"+type+" - "+$.trim(link.text())).toLowerCase();s.sendDataToOmniture(linkname,"",{"channel":s.channel,"prop28":linkname})}});return this};$.fn.trackShare=function(){var element=this;element.on("click",function(){var link=$(this);var type=link.attr("data-share-type");if(!!window.s&&typeof s.sendDataToOmniture=="function"&&type)s.sendDataToOmniture("share."+type,"event6",{eVar27:type})});return this};$.fn.makeDropdown=
function(menuElement,options){var clickElement=this;options=options||{};options.disabled=false;var down=options.down||function(_clickElement,_menuElement){nav.closeDropdowns();_clickElement.addClass("active");$(".leaderboard").addClass("hideAd");var windowHeight=$(window).height()-50;_menuElement.css("height","");_menuElement.css("height",windowHeight<=_menuElement.height()?windowHeight:"auto");_menuElement.css("width",_clickElement.outerWidth());_menuElement.css("left",_clickElement.offset().left);
_menuElement.slideDown("fast")};var up=options.up||function(_clickElement,_menuElement){_menuElement.slideUp("fast",function(){_clickElement.removeClass("active");$(".leaderboard").removeClass("hideAd")})};clickElement.click(function(event){if(!options.disabled){event.stopPropagation();event.preventDefault();if(menuElement.find("li").length==0)return;if(clickElement.is(".active"))up(clickElement,menuElement);else down(clickElement,menuElement);options.disabled=true;setTimeout(function(){options.disabled=
false},500)}});var hammertime=new Hammer(clickElement[0],{prevent_mouseevents:true});hammertime.on("tap",handleTap);return this};if($("#pb-root .pb-f-page-header-v2").length&&($("#pb-root .pb-f-page-header-v2").siblings(".pb-feature").length||$("#pb-root .pb-f-page-header-v2").siblings(".pb-container").length))(function(){var $header=$(".pb-f-page-header-v2");if(wp_pb.isAdmin){var $placeholderText=$header.find(".header-placeholder");var $placeholder=$header.clone().html("").append($placeholderText);
$header.attr("id","");$header.after($placeholder)}$(".pb-f-page-header-v2 script").remove();$("#pb-root").before($header)})();if($("#nav-ad:visible").length){var adIntervalTimeout=10;var adInterval=setInterval(function(){if(typeof placeAd2!="undefined"){$("#wpni_adi_88x31").append(placeAd2(commercialNode,"88x31",false,""));clearInterval(adInterval)}if(adIntervalTimeout==0)clearInterval(adInterval);adIntervalTimeout--},500)}$("#site-menu a").trackClick("main");$("#share-menu a").trackShare();$("#wp-header .nav-btn[data-menu]").each(function(){$(this).addClass("dropdown-trigger");
$(this).makeDropdown($("#"+$(this).data("menu")))});$("#site-menu-btn").makeDropdown($("#site-menu"),{down:function(_clickElement,_menuElement){if(typeof window.wp_pb=="object"&&typeof window.wp_pb.report=="function"){wp_pb.report("nav","menu_start_open",true);setTimeout(function(){wp_pb.report("nav","menu_finish_open",true)},500)}nav.closeDropdowns();_menuElement.css("height",$(window).height()-50);$("body").addClass($("#pb-root .pb-f-page-header-v2").length?"left-menu":"left-menu left-menu-pb");
_clickElement.addClass("active");_menuElement.addClass("active")},up:function(_clickElement,_menuElement){$("body").removeClass("left-menu").removeClass("left-menu-pb");_clickElement.removeClass("active");_menuElement.removeClass("active");if(typeof window.wp_pb=="object"&&typeof window.wp_pb.report=="function"){wp_pb.report("nav","menu_start_close",true);setTimeout(function(){wp_pb.report("nav","menu_finish_close",true)},500)}}});var hammertime=new Hammer(document.getElementById("site-menu"),{dragLockToAxis:true,
dragBlockHorizontal:true});hammertime.on("dragleft swipeleft",function(ev){ev.gesture.preventDefault();ev.gesture.stopPropagation();if(ev.gesture.direction=="left"&&$("body").is(".left-menu"))$("#site-menu-btn").click()});$(".ios #nav-search-mobile input").focus(function(){$("header").css("position","absolute").css("top",window.pageYOffset)}).blur(function(){$("header").css("position","fixed").css("top",0)});$("#nav-search-mobile input").blur(function(){$(window).resize()});$(document).keyup(function(e){if(e.keyCode==
27&&$("#nav-search input[type\x3dtext]").is(":focus"))$("#nav-search input[type\x3dtext]").blur()});$("#nav-search,#nav-search-mobile").submit(function(event){if($(this).find("input[type\x3dtext]").val()){try{s.sendDataToOmniture("Search Submit","event2",{"eVar38":$(this).find("input[type\x3dtext]").val(),"eVar1":s.pageName})}catch(e){}return true}else return false});var core=window.wp_pb=window.wp_pb||{};var nav=core.nav=core.nav||{};var deprecated=function(){};nav.setSearch=nav.showTopMenu=nav.hideTopMenu=
nav.showPrimaryLinks=nav.hidePrimaryLinks=nav.showInTheNews=nav.hideInTheNews=nav.showAdSlug=nav.hideAdSlug=nav.showSectionName=nav.hideSectionName=nav.setMainMenu=nav.setSectionMenu=nav.setSectionName=deprecated;nav.showIdentity=function(){nav.renderIdentity();showIdentity=true};nav.hideIdentity=function(){$("#nav-user").hide();$("nav-sign-in").hide();showIdentity=false};nav.showSearch=function(){$("#nav-search").show()};nav.hideSearch=function(){$("#nav-search").hide()};nav.showSubscription=function(){$("#nav-subscription").show()};
nav.hideSubscription=function(){$("#nav-subscription").hide()};var setMenu=function(elem,menu){var element=$(elem);element.children("li").remove();element.appendLinkItems(menu)};nav.setIdentityMenu=function(menu){setMenu("#user-menu ul",menu)};nav.setPageTitle=function(name){$("#nav-page-title").text(name);$("#share-menu").data("title",name)};nav.setShareUrl=function(url){$("#share-menu").data("permalink",url)};nav.setTwitterHandle=function(handle){if($('#share-menu a[data-share-type\x3d"Twitter"]').length)$('#share-menu a[data-share-type\x3d"Twitter"]').data("twitter-handle",
handle)};nav.closeDropdowns=function(){$("#wp-header .dropdown-trigger.active").each(function(){$(this).removeClass("active");$("#"+$(this).data("menu")).hide()});$(".leaderboard").removeClass("hideAd")};var scrollEvents={},scrollPos=$(this).scrollTop();var forceOpen=$("#wp-header").is(".stay-open");$(window).scroll(function(){var currentPos=$(this).scrollTop();if(!forceOpen)if(currentPos+20<scrollPos||currentPos===0){nav.showNav();scrollPos=currentPos}else if(currentPos-20>scrollPos&&currentPos>
50){nav.hideNav();scrollPos=currentPos}if(scrollEvents.length==0)return;for(var i in scrollEvents)if(scrollEvents.hasOwnProperty(i))if(currentPos>=scrollEvents[i].targetPosition)scrollEvents[i].down.call();else if(currentPos<scrollEvents[i].targetPosition)scrollEvents[i].up.call()});$(window).resize(function(){nav.closeDropdowns();if($("body").is(".left-menu"))$("#site-menu").css("height",$(window).height()-50)});nav.showNav=function(){if(typeof window.wp_pb=="object"&&typeof window.wp_pb.report==
"function")wp_pb.report("nav","show_attempt",true);if($("#wp-header").is(".bar-hidden")){$("#wp-header").removeClass("bar-hidden");if(typeof window.wp_pb=="object"&&typeof window.wp_pb.report=="function"){wp_pb.report("nav","start_open",true);setTimeout(function(){wp_pb.report("nav","finish_open",true)},250)}}};nav.hideNav=function(){if(!$("#wp-header").is(".bar-hidden")&&!$("#wp-header .nav-btn.active").length){$("#wp-header").addClass("bar-hidden");if(typeof window.wp_pb=="object"&&typeof window.wp_pb.report==
"function"){wp_pb.report("nav","start_close",true);setTimeout(function(){wp_pb.report("nav","finish_close",true)},250)}}};nav.showTitleOnScroll=function($target){var element=$target;scrollEvents["titleScroll"]={targetPosition:element.offset().top+50,down:function(){if(!$("#wp-header").is(".title-mode")){$("#wp-header").addClass("title-mode");$("#wp-header .nav-middle").css("padding-right",$("#wp-header .nav-right").outerWidth());nav.closeDropdowns()}},up:function(){if($("#wp-header").is(".title-mode")){$("#wp-header").removeClass("title-mode");
nav.closeDropdowns()}}}};if($('#nav-page-title[data-show-on-scroll\x3d"true"]').length){var $target=$(".nav-scroll-target").length?$(".nav-scroll-target"):$("h1, h2");if($target.length)nav.showTitleOnScroll($target.first())}nav.renderShare=function(){$share=$("#share-menu");$facebook=$('a[data-share-type\x3d"Facebook"]',$share);$twitter=$('a[data-share-type\x3d"Twitter"]',$share);$linkedin=$('a[data-share-type\x3d"LinkedIn"]',$share);$email=$('a[data-share-type\x3d"Email"]',$share);$pinterest=$('a[data-share-type\x3d"Pinterest"]',
$share);if($facebook.length)$facebook.click(function(event){window.open("https://www.facebook.com/sharer/sharer.php?u\x3d"+encodeURIComponent($("#share-menu").data("permalink")),"","width\x3d658,height\x3d354,scrollbars\x3dno");return false});if($twitter.length)$twitter.click(function(event){var twitterHandle=$(this).data("twitter-handle")?$(this).data("twitter-handle").replace("@",""):"washingtonpost";window.open("https://twitter.com/share?url\x3d"+encodeURIComponent($("#share-menu").data("permalink"))+
"\x26text\x3d"+encodeURIComponent($("#share-menu").data("title"))+"\x26via\x3d"+twitterHandle,"","width\x3d550, height\x3d350, scrollbars\x3dno");return false});if($linkedin.length)$linkedin.click(function(event){window.open("https://www.linkedin.com/shareArticle?mini\x3dtrue\x26url\x3d"+encodeURIComponent($("#share-menu").data("permalink"))+"\x26title\x3d"+encodeURIComponent($("#share-menu").data("title")),"","width\x3d830,height\x3d460,scrollbars\x3dno");return false});if($email.length)$email.click(function(event){window.open("mailto:?subject\x3d"+
encodeURIComponent($("#share-menu").data("title"))+" from The Washington Post\x26body\x3d"+encodeURIComponent($("#share-menu").data("permalink")),"","");return false});if($pinterest.length)$pinterest.click(function(event){var e=document.createElement("script");e.setAttribute("type","text/javascript");e.setAttribute("charset","UTF-8");e.setAttribute("src","https://assets.pinterest.com/js/pinmarklet.js?r\x3d"+Math.random()*99999999);document.body.appendChild(e)})};if($("#share-menu").length)nav.renderShare();
var idp;nav.getIdentityProvider=function(){return idp};nav.setIdentityProvider=function(provider){var ef=function(){};idp={};idp.name=provider.name||"";idp.getUserId=provider.getUserId||ef;idp.getUserMenu=provider.getUserMenu||ef;idp.getSignInLink=provider.getSignInLink||ef;idp.getRegistrationLink=provider.getRegistrationLink||ef;idp.isUserLoggedIn=provider.isUserLoggedIn||ef;idp.isUserSubscriber=provider.isUserSubscriber||ef;idp.render=provider.render||function(){if(idp.isUserLoggedIn()){$("#nav-user .username").text(idp.getUserId());
$("#nav-user-mobile a").text(idp.getUserId());nav.setIdentityMenu(idp.getUserMenu());$("#nav-user").removeClass("hidden");$("#nav-user-mobile").removeClass("hidden");$("#nav-user-mobile a").attr("href",idp.getUserMenu()[0]["href"]);if(idp.isUserSubscriber()==="0"){$("#nav-subscribe").removeClass("hidden");$("#nav-subscribe-mobile").removeClass("hidden")}}else{$("#nav-sign-in").attr("href",idp.getSignInLink()+"\x26nid\x3dtop_pb_signin").removeClass("hidden");$("#nav-sign-in-mobile").removeClass("hidden").find("a").attr("href",
idp.getSignInLink()+"\x26nid\x3dtop_pb_signin");$("#nav-subscribe").removeClass("hidden");$("#nav-subscribe-mobile").removeClass("hidden")}};nav.renderIdentity()};nav.renderIdentity=function(callback){callback=callback||function(){};if(idp)idp.render();callback(idp)};var showIdentity=$("#nav-user").data("show-identity");var current=window.location.href.split("?")[0];var twpIdentity={name:"TWP",getUserId:function(){var username=TWP.Util.User.getUserName();var userid=TWP.Util.User.getUserId();if(typeof username==
"string"&&username.length>0)return username;else return userid},getUserMenu:function(){return[{"title":"Profile","href":TWP.signin.profileurl+current+"\x26refresh\x3dtrue"},{"title":"Log out","href":TWP.signin.logouturl_page}]},getSignInLink:function(){return TWP.signin.loginurl_page+current},getRegistrationLink:function(){return TWP.signin.registrationurl_page+current},isUserSubscriber:function(){sub=document.cookie.match(/rplsb=([0-9]+)/)?RegExp.$1:"";return sub},isUserLoggedIn:function(){return TWP.Util.User?
TWP.Util.User.getAuthentication():false}};if(showIdentity){var init=(new Date).getTime();(function checkTWP(){if(!nav.getIdentityProvider())if(TWP&&TWP.signin&&TWP.Util){nav.setIdentityProvider(twpIdentity);nav.renderIdentity()}else{var now=(new Date).getTime();if(now-init<3*1E3)window.setTimeout(function(){checkTWP()},200)}})()}function handleTap(ev){ev.gesture.preventDefault();ev.gesture.stopPropagation();$(ev.gesture.target).click()}})(jQuery,window);
(function($,TWP,undefined){var AD_LOAD_TIMEOUT=7E3;var AD_SCROLL_HIDE_TIMEOUT=600;var AD_SIZER_INTERVAL=200;var AD_MIN_VISIBLE=2E3;var AD_HEIGHT_OUTER=181;var ANIM_SPEED=250;var $pbcontainer=getFeature().closest(".pb-container");var applyStickiness=function(){var _stickied=false;return function(){if(darkTheme())$(window).on("resize.lb-ad-sizer scroll.lb-ad-sizer",debounce(function(){if(sticky())getFeature().css({width:getFrameWidth()})},AD_SIZER_INTERVAL,false));$(window).off("scroll.lb-sticky").on("scroll.lb-sticky",
function(e){e.stopPropagation();var $leaderboard=getFeature();if(_stickied)return;_stickied=true;$("html").addClass("lb-persist-top-true").removeClass("lb-persist-top-false")})}}();if(!!TWP.Features.Ad.Leaderboard.sticky)applyStickiness();if(!!TWP.Features.Ad.Leaderboard.belowSharebar)applySharebarPosition();$(window.document).on("abtest-ready",function(e,ABT){var test=ABT.get("ads-leaderboard");getFeature().attr("moat-test-id",[getFeature().attr("moat-id")||"unknown/unknown",test.name||"control"].join("-"));
if(test.is("below_sharebar"))applySharebarPosition();if(test.is("sticky"))applyStickiness()});$(function(){var _adloaded=false;(function(callback){var intervalId=setInterval(handler(),10);function handler(){var result=function(){var $ad=getFeature().find('iframe[src^\x3d"javascript"]');if($ad.length==2)callback($ad,intervalId)};result();return result}})(function($ad,intervalId){clearInterval(intervalId);var ad;$ad.each(function(){var $el=$(this);if(!/(hidden)/g.test($el.attr("id")))ad=$el});var _onload=
ad.onload;ad.onload=function(){ad.onload=_onload;onload()};setTimeout(function(){onload()},AD_LOAD_TIMEOUT);function onload(){var tid;var stow=function(){var callback=function(){$(window).off("scroll.lb-sticky resize.lb-ad-sizer scroll.lb-ad-sizer");if(darkTheme())getFeature().css({width:""});if(!!tid)clearTimeout(tid)};var position=$(window).scrollTop();if(position<=0)callback();else tid=setTimeout(function(){handler(!!($(window).scrollTop()<=AD_HEIGHT_OUTER));callback();function handler(noTransition){var $f=
getFeature();$f.removeClass("ad-nudge");$f.addClass("lb-hidden");setTimeout(function(){$f.removeClass("lb-hidden");$("html").removeClass("lb-persist-top-true").addClass("lb-persist-top-false")},ANIM_SPEED)}},AD_MIN_VISIBLE)};if(!_adloaded){_adloaded=true;stow()}}});wp_pb.register("nav","start_open",function(){var $f=getFeature();setTimeout(function(){if($(window).scrollTop()<=AD_HEIGHT_OUTER)handler(true);else setTimeout(function(){handler()},AD_MIN_VISIBLE);function handler(noTransition){if(!$("html").hasClass("lb-persist-top-true"))return;
if(noTransition)$f.addClass("noTransition");$f.removeClass("ad-nudge");if(!_adloaded){$f.addClass("lb-hidden");setTimeout(function(){$f.removeClass("lb-hidden");$("html").removeClass("lb-persist-top-true").addClass("lb-persist-top-false")},ANIM_SPEED)}}},ANIM_SPEED)});wp_pb.register("nav","start_open",function(){if(!$("html").hasClass("lb-persist-top-true"))return;getFeature().addClass("ad-nudge")});wp_pb.register("nav","start_close",function(){if(!$("html").hasClass("lb-persist-top-true"))return;
getFeature().removeClass("ad-nudge")})});function applySharebarPosition(){var $leaderboard=getFeature();var $shareBar=getSharebar();return $leaderboard.insertAfter($shareBar)}function getFeature(){return $(".pb-f-ad-leaderboard")}function getSharebar(){return $(".pb-f-sharebars-top-share-bar")}function getNavbar(){return $("#nav-bar")}function debounce(func,wait,immediate){var timeout;return function(){var context=this,args=arguments;var later=function(){timeout=null;if(!immediate)func.apply(context,
args)};var callNow=immediate&&!timeout;clearTimeout(timeout);timeout=setTimeout(later,wait);if(callNow)func.apply(context,args)}}function sticky(){return $("html").hasClass("lb-persist-top-true")}function getFrameWidth(){return $("#pb-root").width()}function darkTheme(){return $("body").hasClass("pb-theme-dark")}})(jQuery,TWP);
(function($){window._essentials_onrender=function(Essentials){var $target=$("#essentials-topper");var name=Essentials.name;var data=Essentials.data;var pdata=Essentials.getPersistentData();var status=pdata[Essentials.contentPath];var count=!!name&&!!data?data.results.length:undefined;var tcount;if(!!Essentials.name){$target.show();$(function(){if(count){switch(count){case 1:tcount="One";break;case 2:tcount="Two";break;case 3:tcount="Three";break;case 4:tcount="Four";break;case 5:tcount="Five";break;
default:tcount="";break}$(('\x3ch2\x3e\x3cspan class\x3d"status vg-check status-icon status-%s"\x3e\x3c/span\x3e '+'\x3cspan class\x3d"status-count"\x3e'+tcount+" Essentials\x3c/span\x3e "+'\x3cspan class\x3d"status-kicker"\x3e%k\x3c/span\x3e'+"\x3c/h2\x3e").replace("%s","undefined"==typeof status?"scroll":"read").replace("%k",data.kicker.text)).appendTo($target)}})}}})(jQuery);
(function($){var socialTools={myRoot:".top-sharebar-wrapper",init:function(myRoot){myRoot=myRoot||this.myRoot;$(myRoot).each(function(index,myRootElement){if(wp_pb.StaticMethods.staticPostShare){myRootElement.postShare=new wp_pb.StaticMethods.staticPostShare;myRootElement.postShare.init($(myRootElement),$(myRootElement).data("postshare"),"top-share-bar")}var $root=$(myRootElement),$individualTool=$(".tool:not(.more)",$root),$socialToolsWrapper=$(".social-tools-wrapper",$root),$socialToolsMoreBtn=
$(".tool.more",$socialToolsWrapper),$socialToolsAdditional=$(".social-tools-additional",$root),$socialToolsUtility=$(".utility-tools-wrapper",$root),width=window.innerWidth>0?window.innerWidth:screen.width,isMobile=mobile_browser===1&&width<480?true:false,config={"omnitureEvent":"event6"};$socialToolsMoreBtn.off("click").on("click",this,function(ev){if(isMobile)$socialToolsUtility.hide("fast");$socialToolsMoreBtn.hide("fast");$socialToolsAdditional.show("fast",function(ev){$(".tool",$socialToolsWrapper).animate({"width":40},
250);$root.addClass("expanded");$(".social-tools",$socialToolsAdditional).animate({"margin-left":0},250);if(isMobile)$socialToolsUtility.show("slow")})});$individualTool.bind({click:function(event){if(typeof window.sendDataToOmniture==="function"){var shareType=$(this).attr("class");shareType=typeof shareType!="undefined"?shareType.split(" ")[0].trim():"";var omnitureVars={"eVar1":typeof window.s=="object"&&s&&s.eVar1,"eVar2":typeof window.s=="object"&&s&&s.eVar2,"eVar8":typeof window.s=="object"&&
s&&s.eVar8,"eVar17":typeof window.s=="object"&&s&&s.eVar17,"eVar27":""};omnitureVars.eVar27=shareType;var eventName=config.omnitureEvent;try{sendDataToOmniture("share."+shareType,eventName,omnitureVars)}catch(e){}}}});if(wp_pb&&wp_pb.BrowserInfo&&wp_pb.BrowserInfo.tablet)$root.addClass("tablet");if($socialToolsUtility.width()+$socialToolsWrapper.find(".social-tools-primary").width()+($root.find("#slug_tiffany_tile").is(":visible")?$root.find("#slug_tiffany_tile").outerWidth(true):0)+($socialToolsWrapper.find(".whatsapp")&&
!$root.hasClass("tablet")&&!TWPHead.desktop?$socialToolsWrapper.find(".whatsapp").outerWidth(true):0)-$root.width()>=0)$socialToolsUtility.addClass("left");$(window).resize(function(){if($socialToolsUtility.width()+$socialToolsWrapper.find(".social-tools-primary").width()+$socialToolsAdditional.width()+($root.find("#slug_tiffany_tile").is(":visible")?$root.find("#slug_tiffany_tile").outerWidth(true):0)-$root.width()>=0)$socialToolsUtility.addClass("left");else $socialToolsUtility.removeClass("left")});
$root.removeClass("unprocessed")})}};var textResizer={currIncrementMax:4,currIncrementUnit:2,currIncrementIndex:0,init:function(myRoot,resizeableElementList,clickElement){myRoot=myRoot||"#article-body article, .related-story, .liveblog-intro, #liveblog-story-list .description, #full-recipe .article-content";resizeableElementList=resizeableElementList||"p, li";clickElement=clickElement||".tool.textresizer";this.root=$(myRoot);this.resizeableElements=$(resizeableElementList,this.root);if($(".related-story").prev("h3").length>
0){this.resizeableElements.push($(".related-story").prev("h3"));this.resizeableElements.push($(".related-story h4 a"))}$(clickElement).unbind("click").on("click",this,this.resize)},resize:function(event){var currObj=event.data;if(currObj.currIncrementIndex==currObj.currIncrementMax){currObj.currIncrementIndex=0;currObj.currIncrementUnit=currObj.currIncrementUnit==2?-2:2}currObj.currIncrementIndex=currObj.currIncrementIndex+1;currObj.resizeableElements.each(function(){elm=$(this);currSize=parseFloat(elm.css("font-size"),
5);var result=currSize+currObj.currIncrementUnit;elm.css("font-size",result);wp_pb.report("textresizer","resized",result)})}};window.TWP=TWP||{};TWP.SocialTools=TWP.SocialTools||socialTools;TWP.TextResizer=TWP.TextResizer||textResizer;TWP.TextResizer.init();TWP.SocialTools.init();$(window.document).on("abtest-ready",function(e,ABT){var test=ABT.get("dummy-feature")})})(jQuery);
(function($){var $article=$("#article-body"),$d=$(document),$w=$(window),$b=$("body");window.cr_on=false;$("iframe[data-src]",$article).each(function(i){var $this=$(this);$this.attr("src",$this.attr("data-src"))});$("#about-the-authors").click(function(e){var $this=$(this);var $container=$this.closest(".multi-author-bio");if(!!$container){if($container.hasClass("open"))$container.removeClass("open").addClass("closed");else $container.removeClass("closed").addClass("open");wp_pb.report("global","domChanged")}});
var $tables=$("div.extra table",$article);$tables.each(function(){var $table=$(this),$bars=$(".barchart",$table),longestBar=0;$bars.each(function(i){var $bar=$(this),w=$bar.attr("width");if(!isNaN(w)){w=w*1;longestBar=w>longestBar?w:longestBar}});$bars.each(function(i){var $bar=$(this),w=$bar.attr("width");if(!isNaN(w)){w=w*1;var scale=$article.width()>480?.85:.75;relativeWidth=scale*(Math.ceil(100*(w/longestBar)*100)/100);$bar.css("width",relativeWidth+"%")}})});var hasResizableIframe=false;$("iframe[width][height]",
$article).each(function(i){var $iframe=$(this),w=$iframe.attr("width"),h=$iframe.attr("height");if(!isNaN(w)&&!isNaN(h)){$iframe.attr("data-aspect-ratio",w/h);if($iframe.attr("width")!=$article.width()){var hFudgeFactor=$iframe.attr("src").match(/instagram.com/)?40:0;$iframe.attr("width",Math.round($article.width()));$iframe.attr("height",Math.round($article.width()/$iframe.attr("data-aspect-ratio"))+hFudgeFactor)}if(!hasResizableIframe){hasResizableIframe=true;$w.resize(function(ev){$("iframe[data-aspect-ratio]",
$article).each(function(i){var $ifr=$(this);hFF=$ifr.attr("src").match(/instagram.com/)?40:0;$ifr.attr("width",Math.round($article.width()));$ifr.attr("height",Math.round($article.width()/$ifr.attr("data-aspect-ratio"))+hFF)})})}}})})(jQuery);
(function($){var $socialToolsBottom=$(".social-tools-bottom"),$individualTools=$socialToolsBottom.children(),config={"omnitureEvent":"event6"};$(".social-tools-wrapper-bottom").each(function(index,myRootElement){if(wp_pb.StaticMethods.staticPostShare){myRootElement.postShare=new wp_pb.StaticMethods.staticPostShare;myRootElement.postShare.init($(myRootElement),$(myRootElement).data("postshare"),"page-share-bar")}});$individualTools.on("click",function(e){if(typeof window.sendDataToOmniture==="function"){var shareType=
$(this).data("sharetype"),eventName=config.omnitureEvent,omnitureVars={"eVar1":typeof window.s=="object"&&s&&s.eVar1,"eVar2":typeof window.s=="object"&&s&&s.eVar2,"eVar8":typeof window.s=="object"&&s&&s.eVar8,"eVar17":typeof window.s=="object"&&s&&s.eVar17,"eVar27":""};omnitureVars.eVar27=shareType;try{sendDataToOmniture("share."+shareType,eventName,omnitureVars)}catch(e){console.log(e)}}})})(jQuery);
$(function() {
    wp_pb = window.wp_pb || {};
    wp_pb.CommentLoader = wp_pb.CommentLoader || function(){
        var width = (window.innerWidth > 0) ? window.innerWidth : screen.width,
            isMobile = ((wp_pb && wp_pb.BrowserInfo && wp_pb.BrowserInfo.mobile_browser === 1) && width < 480 ) ? true : false,
            loadDeferred = ($('.echo_container.defer').length > 0) ? true : false,
            loadDeferredMobile = ($('.echo_container.deferMobile').length > 0) ? true : false,
            noMobile = ($('.echo_container.no-mobile').length > 0 && isMobile) ? true : false,
            $window = $(window),
            $echoPlaceholder = $('.echo_container_placeholder'),
            loadThreshhold = .70,
            env = wp_pb.environment || "production",
            apiBaseURL = (env == 'production')?'https://comments-api.ext.nile.works':'https://comments-api-staging.ext.nile.works',
            forceShowComments = $(document).getUrlParam("sc"), //get any relevant QS parameters
            commentOverlay = {
                    overlayElements: {
                        overlay: '#comment_overlay',
                        articleWrapper: '.article-wrapper',
                        articleTopper: '.article-topper',
                        articleParent: '.story-stream',
                    }, 
                    onClose: function(data) {
                        data.overlay = data.overlay || $(commentOverlay.overlayElements.overlay);
                        data.overlay.addClass('overlay-closed');
                        
                        /*** STORYLINE COMMENTS CODE; DEPRECATED ***/
                        /*  $(window.document).off('scroll.TWP.Comments');
                            if (!data.action || data.action != 'story_closed') {
                                $('#story-stream-tools').css('display','block'); 
                            }
                        */     
                    },
                    onOpen: function(data) {
                        //hack to make the comments overlay work with the site menu open. LP will revisit.
                        if($('body').is('.left-menu')) {
                            $('#site-menu-btn').click();
                            setTimeout(function() {
                                data.overlay.addClass('overlay-fixed').removeClass('overlay-absolute');
                                data.overlayWrapper.removeClass('overlay-closed'); 
                            }, 600);
                        } else {
                            data.overlay.addClass('overlay-fixed').removeClass('overlay-absolute');
                            data.overlayWrapper.removeClass('overlay-closed'); 
                        }
                            
                    },
                    onScroll: function(event){

                    },
                    closeSelector: "a.close"};        


        var loadComments = function() {
            if (!noMobile) {
                if (typeof wp_e2 == 'undefined' || typeof wp_e2.initStatus == 'undefined') {
                    //echo code below.  Comment out for in-house
                    //var domain = (env == "production") ? "js.washingtonpost.com" : "qaprev.digitalink.com";
                    //TWPHead && TWPHead.load("//" + domain + "/1d/hjs/twp-comments.js" + "?token=b20140708165000");
                    //end echo code
                    //in-house code below.  Comment out for Echo production
                    var domain = (env == "production") ? "//js.washingtonpost.com/pb" : "/pb";
                    var outputtype = (env == "production") ? "&outputType=javascript" : "&outputType=javascript";
                    var resourceToken = wp_pb.resourceToken || '201504300950';
                    TWPHead && TWPHead.load( domain + "/1d/hjs/twp-comments.js" + "?token=" + resourceToken + outputtype);
                    //end in-house code
                }
            }
        };


        var showComments = function(data) {
     
            loadComments();
            $window.off('scroll.showComments'); 

            var $overlay = $(commentOverlay.overlayElements.overlay);  //check for overlay element

            if ($overlay.length == 0) {  //standard functionality
                $('.comment-summary.summary-expanded, .comment-summary.summary-expanded-mobile, .comment-summary.summary-expanded-desktop')
                    .slideUp('fast', function() {
                        $('.echo_container.comments-collapsed').removeClass('comments-collapsed')
                            .addClass('comments-expanded')
                            .slideDown('fast', function() {
                                wp_pb.report('global', 'domChanged');
                            });
                        $(this).addClass('summary-collapsed').removeClass('summary-expanded summary-expanded-mobile summary-expanded-desktop');
                        if (typeof window.sendDataToOmniture === 'function') {
                            try {
                                sendDataToOmniture('echo.gotoComments', 'event5', {
                                    "eVar26": "go to comments"
                                });
                            } catch (err) {}
                        }
                    })
                $echoPlaceholder.parent()[0].scrollIntoView();
            
            } else { 
                //comments displayed in side/overlay
                //comments moved to appropriate place in DOM, positioned, and refreshed.  

                if (typeof data == 'undefined') {
                    //do nothing
                    return;
                }

                $overlayWrapper = data.elm.parents(commentOverlay.overlayElements.articleWrapper);

                if(!$overlay.is('.overlay-closed')) {
                    //if the comments are open, close them
                    wp_pb.report('comments', 'commentsMultiClosed', {'overlay': $overlay, 'overlayWrapper': $overlayWrapper})
                } else {
                    //otherwise, open the comments
                    $overlay.find(commentOverlay.closeSelector).on('click',function(event){
                        event.stopPropagation();
                        wp_pb.report('comments','commentsMultiClosed', {'overlay':$overlay,'overlayWrapper':$overlayWrapper})
                    });

                    //move to appropriate place in DOM
                    $overlayWrapper.after($overlay);
                    var top = (data && data.location && data.location.offset().top) || $(document).scrollTop();
                    
                    //refresh
                    if (typeof data.guid !== 'undefined') {
                        var allow_comments = ($overlayWrapper.find('.pb-comment-wrapper').attr('data-allow-comments')==='true')?true:false;
                        wp_e2.refreshComments({"id":"#" + $overlay.find('.echo_container.comments').attr('id'), "url":data.guid, "allow_comments":allow_comments});   
                    }

                    wp_pb.report('comments', 'commentsMultiOpened',{'parent':$overlayWrapper.parent($(commentOverlay.overlayElements.articleParent)),'overlay':$overlay,'overlayWrapper':$overlayWrapper});  
                }
            } 

        };

        var loadCommentCount = function (elms){
            //echo code.  comment out for in-house
            //var apiBaseURL = '//api.echoenabled.com';//production (Echo)
            //end echo

            var echoCountApi =  apiBaseURL + '/v2/mux' +  
                                '?appkey='  + ((TWP.Data.echo_appkey != 'undefined')?TWP.Data.echo_appkey:'prod.washpost.com') +
                                '&requests=';
            var query = "(childrenof:'{guid}'" + 
             encodeURI("source:washpost.com (((state:Untouched AND user.state:ModeratorApproved) OR (state:CommunityFlagged,ModeratorApproved,ModeratorDeleted AND -user.state:ModeratorBanned,ModeratorDeleted) )))"
                + ' children: 2 (((state:Untouched AND user.state:ModeratorApproved) OR (state:CommunityFlagged,ModeratorApproved AND -user.state:ModeratorBanned,ModeratorDeleted) ) )');
            
            /*
    [{  "id":"count1",
        "method":"count",
        "q":"((childrenof: //www.washingtonpost.com/world/middle_east/palestinians-form-new-unity-government-including-hamas/2014/06/02/c681d5c6-ea46-11e3-9f5c-9075d5508f0a_story.html source:washpost.com (((state:Untouched user.state:ModeratorApproved) OR (state:CommunityFlagged,ModeratorApproved,ModeratorDeleted -user.state:ModeratorBanned,ModeratorDeleted) OR (-state:SystemFlagged,ModeratorFlagged user.id:'http://washingtonpost.com/vr5H9gYg8K7QKi4eY3QuCsBEPSO0NNloQjBe0ZqhSs1oGeVxxhJF5A==/')) AND ( -markers:ignore ) ) )) itemsPerPage: 15 sortOrder:reverseChronological safeHTML:aggressive children: 2 childrenSortOrder:chronological childrenItemsPerPage:3 (((state:Untouched user.state:ModeratorApproved) OR (state:CommunityFlagged,ModeratorApproved -user.state:ModeratorBanned,ModeratorDeleted) OR (-state:SystemFlagged,ModeratorFlagged user.id:'http://washingtonpost.com/vr5H9gYg8K7QKi4eY3QuCsBEPSO0NNloQjBe0ZqhSs1oGeVxxhJF5A==/')) AND ( -markers:ignore ) )"}]
            */
            var muxArray = new Array();

            var dataUrl;
        
            $(elms).each(function(index,el) {
                var thisData =  $(el).attr('guid') || $(el).attr('data');
                if (typeof thisData != 'undefined') {
                    query = query.replace("{guid}",thisData);
                    muxArray.push( {"id":thisData,"method":"count","q":query}); 
                 }         
            });
            jQuery.ajax({
                url: echoCountApi + JSON.stringify(muxArray),
                dataType: 'jsonp',
                cache: true})
                .done(function(data,status ){
                    if (status != "error") {
                        $.each(data,function(index,el){
                            var count = (el.result != "error")?el.count:((el.errorCode && el.errorCode == "more_than")?'5000+':'');
                            $(".echo-counter[guid='"+index +"']").html(count);
                        })   
                    }
                });

        };
        
        var resetFixed = function(data) {
            if (data == 'opened' && $('.bar-hidden').length == 0 ) {
                $('.echo-apps-conversations-streamHeader').addClass('nav-open');
            } else {
                $('.echo-apps-conversations-streamHeader').removeClass('nav-open');
            }
        }

        var init = function() {
            //register callbacks 
            wp_pb.register('comments', 'showComments', showComments, this);

            wp_pb.register('comments', 'commentsReady', function() {
                if (forceShowComments === '1') {
                    showComments();
                }
            });

            wp_pb.register('nav', 'finish_open', function() {
                resetFixed('opened');
            });

            wp_pb.register('nav', 'finish_close', function(){
                resetFixed('closed');
            }); 

            wp_pb.register('nav', 'menu_start_open', function(){
                var $overlay = $(commentOverlay.overlayElements.overlay);  //check for overlay element
                if ($overlay.length > 0) {  //standard functionality
                    $overlay.parent().hide();
                }
            }); 

            wp_pb.register('nav', 'menu_finish_close', function(){
                var $overlay = $(commentOverlay.overlayElements.overlay);  //check for overlay element
                if ($overlay.length > 0) {  //standard functionality
                    $overlay.parent().show();
                }
            });       


            wp_pb.register('comments', 'commentsMultiOpened',commentOverlay.onOpen);
            wp_pb.register('comments', 'commentsMultiClosed',commentOverlay.onClose);

            //add events
            $('.comment-summary').click(function() {
                //showComments();
                //populating the data object so that the overlay comments panel has enough info to open
                var data = {
                    elm: $(this),
                    guid: $(this).find('.echo_container').attr('guid')
                };        
                wp_pb.report('comments', 'showComments', data);
            });


            if (noMobile) {
                $('.pb-f-page-comments').hide();
            }

            if (isMobile) {
                $('.comment-summary.jump').hide();
            }
      

            //load comments as appropriate
            if (isMobile && loadDeferredMobile) {
                //only load count on standard count element.  Comments loaded on click of comment-summary
                loadCommentCount('.echo-counter');
            } else if (!isMobile && loadDeferred) {
                //load comment count on standard count element first
                loadCommentCount('.echo-counter');
                //set up scroll events.  Comments will load on scroll or click of comment count, comment-summary
                $window.on('scroll.showComments', function() {
                    if ($window.scrollTop() / $echoPlaceholder.offset().top >= loadThreshhold) {
                        //showComments();
                        loadComments();
                    } 
                    if ($window.scrollTop() >= $echoPlaceholder.offset().top ) {
                        showComments();
                    }
                });
            } else {
                loadComments();
            }
        }
        return{init:init,showComments:showComments,loadCommentCount:loadCommentCount};
    } ();
    wp_pb.CommentLoader.init();  
});
;(function($, wp_pb, wp_get_import) {

    ///////////////////////////////////////////////////////////////////
    // Tools
    ///////////////////////////////////////////////////////////////////

    var start = Date.now();

    function debug(msg) {
        if (window.localStorage && localStorage.getItem("debug-recommendation")) {
            console.log("[DBGRECO] " + msg + " (" + (Date.now() - start) + "ms)");
        }
    }

    function hexToDec(s) {
        var i, j, digits = [0], carry;
        for (i = 0; i < s.length; i += 1) {
            carry = parseInt(s.charAt(i), 16);
            for (j = 0; j < digits.length; j += 1) {
                digits[j] = digits[j] * 16 + carry;
                carry = digits[j] / 10 | 0;
                digits[j] %= 10;
            }
            while (carry > 0) {
                digits.push(carry % 10);
                carry = carry / 10 | 0;
            }
        }
        return digits.reverse().join('');
    }

    ///////////////////////////////////////////////////////////////////
    // Variables
    ///////////////////////////////////////////////////////////////////

    var retries = 0;
    var darwin = null;
    var oneEm = null;
    var rendered = false;
    var initialized = false;

    var stop = null;

    var timeout = 1000;
    var abtest = null;
    var abvariant = null;
    var trackerCalled = false;
    var userVideo = null;
    var user3605630552 = null;
    var videoUUIDs = [];

    var svi = "";
    var sviFull = (document.cookie.match(/s_vi=([^;]+)/)) ? RegExp.$1 : '';

    try {
        if (sviFull && (sviFull !== "")) {
            svi = sviFull.replace(/.*\|/, "").replace(/\[.*/, "").split("-");
            svi = hexToDec(svi[0]) + "-" + hexToDec(svi[1]);
        }
    } catch(e) {
        svi = sviFull + "@" + e.toString();
    }

    debug("Starting");

    ///////////////////////////////////////////////////////////////////
    // Darwin
    ///////////////////////////////////////////////////////////////////

    $(window.document).on('abtest-ready', function(e, ABT) {
        darwin = ABT;
        debug("Darwin is ready");
    });


    ///////////////////////////////////////////////////////////////////
    // Tools
    ///////////////////////////////////////////////////////////////////

    function updateRecommendURL(key, value) {
        TWP.Features.Page.PostRecommends.url = updateUrlParam(
            TWP.Features.Page.PostRecommends.url, key, value
        );
    }

    function updateUrlParam(url, key, value) {
        value = encodeURIComponent(value);
        var n = new RegExp('([?&])' + key + '=.*?(&|$)', 'i');
        var i = -1 !== url.indexOf('?') ? '&' : '?';
        return url.match(n) ? url.replace(n, '$1' + key + '=' + value + '$2') : url + i + key + '=' + value;
    }

    function normalizeURL(url) {
        return url
            .replace(/\?.*/, "")
            .replace(/https?:/, "");
    }

    function extractTID(url) {
        return url.replace(/.*\?.*tid=([a-z_0-9]+).*/, "$1");
    }

    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this,
                args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    ///////////////////////////////////////////////////////////////////
    // Common to both blocks
    ///////////////////////////////////////////////////////////////////

    $(function() {
        wp_pb.register('contentfeed-postrecommends', 'loaded', function(args) {
            rendered = true;
            args.$target.removeClass('postrecommends-notloaded');
        });
        wp_pb.register('contentfeed-postrecommends', 'item-click', function(args) {
            var url = args.$link.attr('href');
            if (url) {
                // Do not navigate away from the page just yet, instead
                // make a call to the tracker to record the click
                args.promise.reject();

                // Only track 1 click
                if (trackerCalled) { return; }
                trackerCalled = true;

                // Record the call, and transition in at most 100ms
                // (we don't want the user to wait too much)
                var tracker = TWP.Features.Page.PostRecommends.trackUrl;
                $.ajax({
                    url: tracker,
                    timeout: 100,
                    dataType: 'json',
                    data: {
                        currenturl: document.location.toString(),
                        clickurl: normalizeURL(url),
                        rectype: extractTID(url),
                        svi: sviFull,
                        abtest: abtest,
                        abvariant: abvariant,
                        profileTimer: (stop-start),
                        omni: (!!(window.s && window.s.sendDataToOmniture))
                    }
                }).always(function() {
                    window.location = url;
                });
            }
        });
    });

    ///////////////////////////////////////////////////////////////////
    // "Articles" block
    ///////////////////////////////////////////////////////////////////

    var showArticles = function() {
        if (!!window.PostRecommendsInit) {
            debug("Initializing Post Recommend");
            debug(TWP.Features.Page.PostRecommends.url);
            PostRecommendsInit();
        }
    };

    ///////////////////////////////////////////////////////////////////
    // "Video" block
    ///////////////////////////////////////////////////////////////////

    var results = null;
    var firstVideoPromo = null;

    var videoSizeAdapter = function() {
        if (rendered && firstVideoPromo) {
            var size = '';
            var width = $(window).width();

            if (width === 0) {
                size = 's';
            } else if (width <= 200) {
                size = 'xxs';
            } else if (width <= 400) {
                size = 'xs';
            } else if (width <= 480) {
                size = 's';
            } else if (width <= 36.625 * oneEm) {
                size = 'm';
            } else if (width <= 47.938 * oneEm) {
                size = 'l';
            } else {
                size = 'xl';
            }

            debug('Resizing 1st video: ' + size);
            firstVideoPromo.attr('data-promo-size', size);
        }
    };

    /**
     * See https://www.washingtonpost.com/posttv/resources/docs/iframe/demo.html
     *           //css.washingtonpost.com/posttv/static/css/posttv/posttv-video-embed.v3.css
     */
    var firstVideo = function(elem) {

        if (results &&
            results[0] &&
            results[0].headline &&
            results[0].photo &&
            results[0].photo.path
           ) {

            var first = results[0];
            var image = '//img.washingtonpost.com/wp-apps/imrs.php?src=' + encodeURIComponent(first.photo.path) + '&w=600&h=338';
            var headline = first.headline;

            var duration = Math.floor(first.videoDuration / 1000);
            var seconds = duration % 60;
            var minutes = (duration - seconds) / 60;
            if (seconds < 10) {
                duration = '' + minutes + ':0' + seconds;
            } else {
                duration = '' + minutes + ':' + seconds;
            }

            var tpl = '';
            tpl +=  '<div class="posttv-video-embed" data-skip-processing="1">';
            tpl +=     '<div class="ptv-promo" data-promo-size="m" style="background-image: url(' + image + ')">';
            tpl +=         '<div class="ptv-start-button video-promo absolute-center"></div>';
            tpl +=         '<div class="ptv-promo-info">';
            tpl +=              '<div class="ptv-promo-video-headline-container">';
            tpl +=                 '<span class="ptv-promo-video-headline">' + headline + '</span>';
            tpl +=                 '<span class="ptv-promo-video-duration">(' + duration + ')</span>';
            tpl +=              '</div>';
            tpl +=             '<span class="ptv-promo-logo"></span>';
            tpl +=         '</div>';
            tpl +=     '</div>';
            tpl +=  '</div>';

            elem.find('.content-item.first .rec-img').html(tpl);
            elem.find('.content-item.first .item-caption').hide();

            // Store link to 1st promo for resizing later
            firstVideoPromo = $(elem.find('.content-item.first .ptv-promo')[0]);

            // Set the size adapter
            videoSizeAdapter();
            $(window).resize(debounce(videoSizeAdapter, 250, true));
        }

    };

    var showVideos = function() {
        if (!!window.PostRecommendsInit) {
            $(function() {
                wp_pb.register('contentfeed-postrecommends', 'api-success', function(args) {
                    results = args.data.results;
                });

                wp_pb.register('contentfeed-postrecommends', 'loaded', function(args) {
                    args.$target.addClass('postrecommends-video');

                    var updateAttr = function(el, attr) {
                        var src = $(el).attr(attr);
                        if (src) {
                            src = src.replace(/;h=92/g, ";h=78");
                            src = src.replace(/&h=92/g, "&h=78");
                            src = src.replace(/image_138x92/g, "image_138x78");
                            src = src.replace(/;h=60/g, ";h=34");
                            src = src.replace(/&h=60/g, "&h=34");
                            src = src.replace(/image_60x60/g, "image_60x34");
                            $(el).attr(attr, src);
                        }
                    };

                    // Replace image sizes
                    args.$target.find('img').each(function(idx, img) {
                        updateAttr(img, 'src');
                        updateAttr(img, 'data-sm1-src');
                        updateAttr(img, 'data-sm2-src');
                        updateAttr(img, 'data-hi-res-src');
                        updateAttr(img, 'data-low-res-src');
                    });

                    // Replace first video
                    firstVideo(args.$target);
                });
            });

            // Set UUIDs
            var length = TWP.Features.Page.PostRecommends.url.length;
            var numItems = Math.floor((2000-length)/36);
            updateRecommendURL("videoUUID", videoUUIDs.slice(0, numItems).join("|"));

            debug("Initializing Post Recommend");
            debug(TWP.Features.Page.PostRecommends.url);
            PostRecommendsInit();
        }
    };

    $(function() {
        debug("DOM Ready");
        oneEm = parseFloat($("body").css("font-size"));
    });


    ///////////////////////////////////////////////////////////////////
    // Detect whether the user is video or not
    ///////////////////////////////////////////////////////////////////

    try {
        var videos = JSON.parse(localStorage.getItem("twpVideoHistory"));
        for (var uuid in videos) {
            if (videos.hasOwnProperty(uuid)) {
                videoUUIDs.push(uuid);
                var timestamp = videos[uuid].timestamp;
                if (timestamp > Date.now() - 3600*1000) {
                    userVideo = true;
                }
            }
        }
    } catch(e) {
        // Ignore
    }

    ///////////////////////////////////////////////////////////////////
    // 1st thing: we send a request for the user profile
    // 2nd thing: we start a timer so that we serve a result no matter what
    ///////////////////////////////////////////////////////////////////

    var init = function() {
        var variation = null;

        debug("Trying to init [" + retries + "]");

        if (!darwin) {
            retries = retries + 1;
            if ((retries < 10) && ((Date.now() - start) < 2000)) {
                setTimeout(init, 100);
                return;
            }
        }

        if (!initialized) {
            initialized = true;

            debug("Initializing");

            if (darwin) {
                if (user3605630552) {
                    variation = darwin.get('recommendation-uk');
                    abtest = "uk";
                    abvariant = variation.is('uk') ? "uk" : "default";
                } else if (userVideo) {
                    variation = darwin.get('recommendation-video');
                    abtest = "video";
                    abvariant = variation.is('video') ? "video" : "default";
                } else {
                    abtest = "none";
                    abvariant = "nodarwin";
                }
            } else {
                abtest = "none";
                abvariant = "nodarwin";
            }

            if (variation && variation.customOptions && variation.customOptions.target) {
                updateRecommendURL("abtarget", variation.customOptions.target);
            }

            updateRecommendURL("abtest", abtest);
            updateRecommendURL("abvariant", abvariant);
            updateRecommendURL("darwinTimer", Date.now() - start);

            if (/force-recommendation-video=1/.test(document.location.toString())) {
                TWP.Features.Page.PostRecommends.url = TWP.Features.Page.PostRecommends.url.replace(/abtest=[a-z]+/, "abtest=video");
                TWP.Features.Page.PostRecommends.url = TWP.Features.Page.PostRecommends.url.replace(/abvariant=[a-z]+/, "abvariant=video");
                showVideos();
            } else if (/force-recommendation-uk=1/.test(document.location.toString())) {
                TWP.Features.Page.PostRecommends.urlurl = TWP.Features.Page.PostRecommends.url.replace(/abtest=[a-z]+/, "abtest=uk");
                TWP.Features.Page.PostRecommends.urlurl = TWP.Features.Page.PostRecommends.url.replace(/abvariant=[a-z]+/, "abvariant=uk");
                showArticles();
            } else if (abtest == "video" && abvariant == "video") {
                showVideos();
            } else {
                showArticles();
            }

        }
    };

    // Get the user profile
    debug("Requesting the profile");
    $.ajax(TWP.Features.Page.PostRecommends.profileUrl, {
        type: 'POST',
        dataType: 'json',
        processData: false,
        contentType: 'application/json',
        data: '{"userid": "' + svi + '"}',
    }).done(function(data) {
        debug("Profile received: OK");
        user3605630552 = data.segmentsFlag["3605630552"];
        updateRecommendURL("profileResponse", "ok");
    }).fail(function(data) {
        debug("Profile received: KO");
        updateRecommendURL("profileResponse", "ko");
    }).always(function(data) {
        stop = Date.now();
        updateRecommendURL("profileTimer", stop-start);
        init();
    });

    // Start the hybrid module
    debug("Timeout started");
    setTimeout(function() { debug("Timeout expired"); init(); }, timeout);

})(jQuery, wp_pb, wp_get_import);

// vim: set et ts=4 sw=4 sts=4:

(function($){if($(window).width()>480){var $trendingStripMarker=$(".content-strip-marker.trending");if(!!$trendingStripMarker.length){var $window=$(window),requestMade=false,loadStripThreshhold=750;function init(){if(!requestMade&&$trendingStripMarker.offset().top-loadStripThreshhold<=$window.scrollTop()+$window.height()){requestMade=true;$window.off("scroll.load-trending-strip");var itemsPerRow=3,rowsToShow=2,trendingStripUrl="//recommendation-trendingonsocial.wpdigital.net/post-pulse/pulse.jsonp?callback\x3dfn_wp_pb_stale\x26tid\x3d\x26referrers\x3dtwitter,facebook\x26section\x3d\x26types\x3dArticle,Blog\x26offset\x3d0\x26count\x3d"+
itemsPerRow*rowsToShow,ad={positions:{6:false},slug:"trending_module"};window.fn_wp_pb_stale=function(data){if(!data||!data.pulselist)$trendingStripMarker.closest(".pb-feature").remove();else{var results=data.pulselist,trendingStripOutput="",maxToShow=results.length<itemsPerRow*rowsToShow?results.length:itemsPerRow*rowsToShow,numbers=["one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve"];if(maxToShow>0){trendingStripOutput+='\x3cdiv class\x3d"content-strip trending"\x3e';
trendingStripOutput+='\x3cp class\x3d"heading heading2"\x3eTrending on Social Media\x3c/p\x3e'}var itemsShown=0;for(var i=0;itemsShown<=maxToShow-1;i++){var result=data.pulselist[i],isAdPosition=!!ad.positions[itemsShown+1],position=itemsShown%itemsPerRow,positionClass=" "+numbers[position],firstClass=itemsShown==0?" first":"",firstInRowClass=position==0?" first-in-row":"",lastClass=itemsShown==maxToShow-1?" last":"",lastInRowClass=position==itemsPerRow-1?" last-in-row":"",hasMethodePhoto=isAdPosition||
!!result.thumburl&&!!result.thumburl&&result.thumburl.match(/\/rf\/image_/),hasOtherPhoto=isAdPosition||!!result.thumburl&&!!result.thumburl,hasPhoto=hasMethodePhoto||hasOtherPhoto,photoUrl=!!hasPhoto?result.thumburl.replace(/www.washingtonpost.com/,"img.washingtonpost.com"):"",contentUrl=(!!result.redirecturl?result.redirecturl:result.contenturl).split("?")[0]+"?tid\x3dtrending_strip_"+(itemsShown+1),isSponsoredContent=contentUrl.match(/brand-connect/),sponsoredClass=isAdPosition||isSponsoredContent?
" is-sponsored-content":"";itemsShown+=1;if(isAdPosition)i-=1;trendingStripOutput+='\x3cdiv class\x3d"content-item'+firstClass+firstInRowClass+lastClass+lastInRowClass+positionClass+sponsoredClass+(hasPhoto?" with-photo":" without-photo")+' left"\x3e';if(isAdPosition){trendingStripOutput+='\x3cdiv class\x3d"sponsorship-admonition"\x3e\x26nbsp;\x26nbsp;Sponsored Content \x3ci class\x3d"info-icon"\x3e\x3c/i\x3e\x3cspan class\x3d"bc-info-popup"\x3eBrandConnect\x26raquo; is content provided by our advertisers. \x3ca rel\x3d"nofollow" href\x3d"//www.washingtonpost.com/sf/brand-connect/"\x3eLearn more.\x3c/a\x3e\x3c/span\x3e\x3c/div\x3e';
trendingStripOutput+='\x3cdiv id\x3d"slug_'+ad.slug+'" class\x3d"pb-ad-container" data-ad-type\x3d"'+ad.slug+'"\x3e';trendingStripOutput+='\x3cscript type\x3d"text/javascript" language\x3d"Javascript"\x3eplaceAd2({what: "'+ad.slug+'"});\x3c/script\x3e';trendingStripOutput+="\x3c/div\x3e"}else{if(isSponsoredContent)trendingStripOutput+='\x3cdiv class\x3d"sponsorship-admonition"\x3e\x26nbsp;\x26nbsp;Sponsored Content \x3ci class\x3d"info-icon"\x3e\x3c/i\x3e\x3cspan class\x3d"bc-info-popup"\x3eBrandConnect\x26raquo; is content provided by our advertisers. \x3ca rel\x3d"nofollow" href\x3d"//www.washingtonpost.com/sf/brand-connect/"\x3eLearn more.\x3c/a\x3e\x3c/span\x3e\x3c/div\x3e';
if(photoUrl)photoUrl=photoUrl.replace(/^http:/,"https:");if(hasMethodePhoto){var photoSrc=photoUrl.replace(/\/image_\d+[xwh]\d*\//,"/image_200x133/").replace(/www.washingtonpost.com/,"img.washingtonpost.com");var photoSrcHiRes=photoUrl.replace(/\/image_\d+[xwh]\d*\//,"/image_300x200/").replace(/www.washingtonpost.com/,"img.washingtonpost.com");trendingStripOutput+='\x3ca href\x3d"'+contentUrl+'"\x3e\x3cimg class\x3d"main-art unprocessed" src\x3d"'+photoSrc+'" data-low-res-src\x3d"'+photoSrc+'" data-hi-res-src\x3d"'+
photoSrcHiRes+'"\x3e\x3c/a\x3e'}else if(hasOtherPhoto){var photoSrc="https://img.washingtonpost.com/wp-apps/imrs.php?src\x3d"+encodeURIComponent(photoUrl)+"\x26w\x3d200\x26h\x3d133";var photoSrcHiRes="https://img.washingtonpost.com/wp-apps/imrs.php?src\x3d"+encodeURIComponent(photoUrl)+"\x26w\x3d300\x26h\x3d200";trendingStripOutput+='\x3ca href\x3d"'+contentUrl+'"\x3e\x3cimg class\x3d"main-art unprocessed" src\x3d"'+photoSrc+'" data-low-res-src\x3d"'+photoSrc+'" data-hi-res-src\x3d"'+photoSrcHiRes+
'"\x3e\x3c/a\x3e'}trendingStripOutput+='\x3ca href\x3d"'+contentUrl+'"\x3e';trendingStripOutput+='\x3cp class\x3d"heading heading3"\x3e'+result.webheadline+"\x3c/p\x3e";trendingStripOutput+="\x3c/a\x3e"}trendingStripOutput+="\x3c/div\x3e"}if(maxToShow>0){trendingStripOutput+='\x3cdiv class\x3d"clear"\x3e\x3c/div\x3e';trendingStripOutput+="\x3c/div\x3e"}if(!!trendingStripOutput){$trendingStripMarker.append(trendingStripOutput);if(!!window.wp_pb&&!!wp_pb.report)wp_pb.report("global","domChanged");$("img.unprocessed",
$trendingStripMarker).each(function(i){var $this=$(this);var src="";if($trendingStripMarker.width()>480){src=$this.attr("data-hi-res-src");$this.attr("src",src)}else;$this.removeClass("unprocessed")})}}};$.ajax({dataType:"jsonp",jsonp:false,jsonpCallback:"fn_wp_pb_stale",url:trendingStripUrl,cache:true,timeout:3E3,complete:function(jqXHR,textStatus){if(!textStatus.match(/success/))$trendingStripMarker.closest(".pb-feature").remove()}})}}$(document).ready(function(){init()});$window.on("scroll.load-trending-strip",
function(){init()})}}})(jQuery);
(function($){$(window.document).on("abtest-ready",function(e,ABT){var variation=ABT.get("recommendation-mostread");if(variation.is("chartbeat")){$("ul.def-feed").hide();$("ul.alt-feed").show()}})})(jQuery);
(function($){try{function cleanUp(){jQuery.fn.shuffle=function(){var j;for(var i=0;i<this.length;i++){j=Math.floor(Math.random()*this.length);$(this[i]).before($(this[j]))}return this};$("#the-most-rr li").shuffle();var count=0;var adjustLines=function(){var count=0;$("#the-most-rr .line").each(function(){if(count>2)return false;$(this).parent().parent().parent().parent().show();count++})};adjustLines()}cleanUp()}catch(e){}})(jQuery);
(function($){var defaultNewsLetter={frequency:"Daily",headline:"Get the Today's Headlines Newsletter",id:"post_newsletter1",name:"Today's Headlines",tagline:"Free daily updates delivered just for you.",template:"signup-confirm-heads",variable:"vars[intent_heads]"},defaultNewsLetters=[{frequency:"Daily",headline:"Get the Today's Headlines Newsletter",id:"post_newsletter1",name:"Today's Headlines",tagline:"Free daily updates delivered just for you.",template:"signup-confirm-heads",variable:"vars[intent_heads]"},
{frequency:"Daily",headline:"Get the Read In Newsletter",id:"post_newsletter112",name:"Read In",tagline:"Free daily updates delivered just for you.",template:"signup-confirm-readin",variable:"vars[intent_readin]"},{frequency:"Weekly",headline:"Get the Lean \x26 Fit Newsletter",id:"post_newsletter8",name:"Lean \x26 Fit",tagline:"Free weekly updates delivered just for you.",template:"signup-confirm-lean",variable:"vars[intent_lean]"},{frequency:"Twice-weekly",headline:"Get the Checkpoint Newsletter",
id:"post_newsletter130",name:"Checkpoint",tagline:"Free twice-weekly updates delivered just for you.",template:"signup-confirm-check",variable:"vars[intent_check]"}],subscribeEmail,washPostId,showNewsletter=function(){$("#signup-box-rr").show()},hideNewsletter=function(){$("#signup-box-rr").hide()},showSignUpForm=function(){$("#newsletter-signUp-form").show();$("#newsletter-signUp-button").hide()},showSignUpButton=function(){$("#newsletter-signUp-form").hide();$("#newsletter-signUp-button").show()},
showErrorMessage=function(message){if(message)$(".newsLetter-error-msg").text(message).show()},hideErrorMessage=function(){$(".newsLetter-error-msg").hide()},setNewsLetterValue=function(data){$("#newsletter-headline").append(data.headline);$("#newsletter-tagline").text(data.tagline)},setRecommendationsValues=function(data){$(".suggestion-list .recommended").each(function(index){$(this).find("p").text("Get "+data[index].name+" ("+data[index].frequency+")");$(this).find("input[type\x3d'checkbox']").attr("value",
data[index].id);$(this).find("input[type\x3d'checkbox']").attr("name",data[index].name)})},toggleRecommendations=function(show){if(show){$("#newsletter-signUp-form, #newsletter-signUp-button, #newsletter-tagline").hide();$("#newsletter-suggestions-rr, #headline-checked, #subscribed-confirmation, #all-newsletters-lbl").show()}else $("#newsletter-suggestions-rr").hide()},showSignUpConfirmation=function(){$("#newsletter-signUp-form, #newsletter-signUp-button, #newsletter-tagline").hide();$("#headline-checked, #subscribed-confirmation, #all-newsletters-lbl").show()},
getUserId=function(){return document.cookie.match(/wapo_login_id=([^;]+)/)?RegExp.$1:""},getWapoId=function(){return document.cookie.match(/wapo_secure_login_id=([^;]+)/)?RegExp.$1:""},getPageData=function(){var section=$("#newsletter-section").text(),subSection=$("#newsletter-subsection").text(),blog=$("#newsletter-blogname").text(),data={};washPostId=getUserId();if(washPostId!=="")data.washPostId=washPostId;if(blog)data.blog=blog;if(subSection)data.subSection=subSection;if(section)data.section=
section;return data},getMainNewsletter=function(){var data=getPageData();return $.ajax({type:"POST",dataType:"json",contentType:"application/json",url:"https://recommendation-newsletter.wpdigital.net/Newsletter/api/newsletter",data:JSON.stringify(data)})},getRecommendations=function(newsletters){var data=getPageData();data.newsletters=newsletters;return $.ajax({type:"POST",dataType:"json",contentType:"application/json",url:"https://recommendation-newsletter.wpdigital.net/Newsletter/api/newsletters",
data:JSON.stringify(data)})},subscribe=function(email){var data,url;if(washPostId!==""){url="https://subscribe.washingtonpost.com/person/newsletter/subscribe";data={"wapoLoginID":washPostId,"wapoSecureID":getWapoId(),"userAgent":navigator.userAgent,"newsletterName":window.Newsletter.id,"metadata":[{"name":"nl_start_method","value":"EI"},{"name":"nl_start_location","value":"RR"}]}}else if(email){url="https://subscribe.washingtonpost.com/person/newsletter/subscribe-email";data={"email":email,"newsletterName":window.Newsletter.id,
"metadata":[{"name":"nl_start_method","value":"EI"},{"name":"nl_start_location","value":"RR"}]}}$.ajax({type:"POST",dataType:"json",contentType:"application/json",url:url,data:JSON.stringify(data),success:function(data){if(data.status=="SUCCESS"){sendCustomTrackProps("event46,event91",trackProps(window.Newsletter.name,1,"simple"),"Newsletter Right Rail Sign-up");setUpRecommendations(window.Newsletter.id)}},error:function(request,status,error){console.log(error,"Error while subscribing")}})},subscribeBundle=
function(){var data,url,newsletters=[],newsletterNames=[];$("#newsletter-suggestions-rr input:checked").each(function(index){newsletters.push($(this).val());newsletterNames.push({name:$(this).attr("name"),position:$(this).attr("data-pos")})});if(newsletters.length>0&&newsletterNames.length>0){if(washPostId!==""){url="https://subscribe.washingtonpost.com/person/newsletter/subscribe-list";data={"wapoLoginID":washPostId,"wapoSecureID":getWapoId(),"userAgent":navigator.userAgent,"newsletters":newsletters,
"metadata":[{"name":"nl_start_method","value":"EA"},{"name":"nl_start_location","value":"RR"}]}}else if(subscribeEmail){url="https://subscribe.washingtonpost.com/person/newsletter/subscribe-list-email";data={"email":subscribeEmail,"newsletters":newsletters,"metadata":[{"name":"nl_start_method","value":"EA"},{"name":"nl_start_location","value":"RR"}]}}$.ajax({type:"POST",dataType:"json",contentType:"application/json",url:url,data:JSON.stringify(data),success:function(data){if(data.status=="SUCCESS"){for(var i=
0;i<newsletterNames.length;i++)sendCustomTrackProps("event46,event91",trackProps(newsletterNames[i].name,newsletterNames[i].position,"enhanced"),"Newsletter Right Rail Sign-up Bundle");setUpRecommendations(newsletters,true);toggleRecommendations(false)}},error:function(request,status,error){console.log(error,"Error while subscribing bundle")}})}},setUpRecommendations=function(newsletterId,confirmBundleSubscribe){var recommendations=getRecommendations([window.Newsletter.id]);recommendations.done(function(data){if(!$.isEmptyObject(data.newsletters)&&
data.newsletters.length>=3&&!confirmBundleSubscribe){window.Newsletters=data.newsletters;setRecommendationsValues(data.newsletters);toggleRecommendations(true);for(var i=0;i<data.newsletters.length-1;i++)sendCustomTrackProps("event59",trackProps(data.newsletters[i+1].name,i+1,"enhanced"),"Newsletter Right Rail Show Recommendations")}else toggleRecommendations(false);showSignUpConfirmation()});recommendations.fail(function(){if(!confirmBundleSubscribe){window.Newsletters=defaultNewsLetters;setRecommendationsValues(defaultNewsLetters);
toggleRecommendations(true)}})},setUpMainNewsletter=function(newsletter){window.Newsletter=newsletter;setNewsLetterValue(newsletter);showNewsletter();if(getUserId()!=="")showSignUpButton();else showSignUpForm()},applyRrNewsletters=function(variant,version){var mainNewsletter=getMainNewsletter();mainNewsletter.done(function(data){if(!$.isEmptyObject(data.newsletter)){setUpMainNewsletter(data.newsletter);sendCustomTrackProps("event59",trackProps(data.newsletter.name,1,"simple"),"Newsletter Right Rail successfull API Call")}else hideNewsletter()});
mainNewsletter.fail(function(){setUpMainNewsletter(defaultNewsLetter);sendCustomTrackProps("event50",trackProps(defaultNewsLetter.name,1),"Newsletter Right Rail API failure case")});$(".subscribe-newsLetter").click(function(){var re=/[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;subscribeEmail=$("#newsLetter-input").val();if(this.id!=="newsletter-signUp-button"&&(subscribeEmail==""||!re.test(subscribeEmail)))showErrorMessage("Please enter a valid email address");else{hideErrorMessage();subscribe(subscribeEmail)}return false});
$("#subscribe-bundle").click(function(){subscribeBundle()});$("#cancel-bundle").click(function(){sendCustomTrackProps("event58",trackProps(),"No Thanks, Newsletter Right Rail Sign-up Bundle");toggleRecommendations(false)})};if(window.wp_content_type=="front"){alert(window.wp_content_type);debugger;$(window.document).on("abtest-ready",function(e,ABT){var test=ABT.get("subscription-fronts");alert("!test.is('instream') :  "+!test.is("instream"));debugger;if(!test.is("instream"))applyRrNewsletters(test)})}else applyRrNewsletters();
function trackProps(newsletterName,index,enhancedKey){var subsection=window.wp_subsection||"";var contentType=window.wp_content_type||"";var props={"eVar2":subsection,"prop2":subsection,"prop3":contentType,"eVar17":contentType};if(newsletterName&&index)props.eVar26="nl_rightrail_"+enhancedKey+"_"+newsletterName.toLowerCase().split(" ").join("-")+"_"+index;return props}function sendCustomTrackProps(eventKey,props,name){if(!!window.s)window.s.sendDataToOmniture(name||"PB Feature - Page-Newsletter",
eventKey,props,{wait:true})}})(jQuery);

(function($){try{function cleanUp(){$("li","#editors-picks-rr").each(function(i){var $this=$(this);var $headline=$(".headline",$this);var $number=$(".number",$this);var lineHeight=parseInt($headline.css("lineHeight"));if($headline.height()<=2*lineHeight)$headline.css({"padding-top":"7px","padding-bottom":"8px"});else if($headline.height()>3*lineHeight)while($headline.height()>3*lineHeight){$headline.text($headline.text().replace(/\.\.\.$/,""));$headline.text($headline.text().slice(0,-1));$headline.text($headline.text()+
"...")}})}cleanUp()}catch(e){}})(jQuery);
(function($){var $content=$("#next-story-bg");var imageUrl=nextStoryImage();if(imageUrl&&!!$content.size()&&$content.width()>480)$content.css("background-image","url("+imageUrl+")");function nextStoryImage(){return TWP.Features&&TWP.Features.Article&&TWP.Features.Article.NextStory&&TWP.Features.Article.NextStory.tnUrl}})(jQuery);
(function($,window){var hasStorage=function(){var storageTest=new Date;try{localStorage.setItem(storageTest,storageTest);localStorage.removeItem(storageTest);return true}catch(e){return false}}();function removeCookie(name){if(document.cookie)document.cookie=name+"\x3d;expires\x3dThu, 01 Jan 1970 00:00:01 GMT;"}function normalizeURL(url,params){var str=(url||"").trim();str=str.replace(/^(https?:)?\/\//,"");str=str.replace(/\?.*/,"");if(params)str=str.replace(/\/$/,"");return str}function extractParam(param){var rgx=
new RegExp(".*[?\x26]"+param+"\x3d([^\x26]+).*");if(rgx.test(document.location.toString()))return document.location.toString().replace(rgx,"$1");else return""}var clavisAuxiliaries=window.wp_meta_data&&wp_meta_data.clavis&&wp_meta_data.clavis.auxiliaries,canonicalUrl=$('link[rel\x3d"canonical"]').attr("href"),userId=!!document.cookie.match(/s_vi=([^;]+)/)?RegExp.$1:"unavailable";if(!canonicalUrl)canonicalUrl=[window.location.host,window.location.pathname].join("");var contentType="";try{contentType=
TWP.Data.Tracking.props.content_type}catch(e){}var dataPayload={"articleid":normalizeURL(canonicalUrl,true),"referrer":normalizeURL(document.referrer),"contentType":contentType,"tid":extractParam("tid"),"userid":userId,"uuid":!!document.cookie.match(/wapo_login_id=([^;]+)/)?RegExp.$1:"","auxiliaries":!!clavisAuxiliaries?clavisAuxiliaries:[]};var targetingServerUrl=TWP&&TWP.Features&&TWP.Features.Page&&TWP.Features.Page.Targeting&&TWP.Features.Page.Targeting.endpointServer;$.ajax({url:!!targetingServerUrl?
targetingServerUrl:"//targeting.wpdigital.net/TargetingWebAPP/targeting",type:"POST",contentType:"application/json",dataType:"JSON",data:JSON.stringify(dataPayload)}).done(function(response){if(!!response){var auxMap=response.aux_map&&response.aux_map.join(",");if(!auxMap){if(!!window.s&&!!s.sendDataToOmniture)s.sendDataToOmniture("targeting","event53",{"eVar53":"targeting:missing auxiliaries"})}else if(hasStorage)window.localStorage.setItem("targeting_aux_map",auxMap);else if(!!$&&!!$.cookie)$.cookie("targeting_aux_map",
auxMap);else document.cookie="targeting_aux_map\x3d"+auxMap}else hasStorage?localStorage.setItem("targeting_aux_map",""):removeCookie("targeting_aux_map")}).fail(function(errorResponse){if(!!window.s&&!!s.sendDataToOmniture)s.sendDataToOmniture("auxiliary-targeting","event53",{"eVar53":"targeting:server error"})})})(jQuery,window);
(function($,window){var scrollPos=$(this).scrollTop(),SUBSCRIPTION_KEY="cancelSubscriptionDate",SIGNED_UP_IN="SIGNED_UP_IN_",bannerType="",section=$("#newsletter-banner-section").text(),shouldShowBanner=false,defaultNewsLetter={frequency:"Daily",headline:"Get the Today's Headlines Newsletter",id:"post_newsletter1",name:"Today's Headlines",tagline:"Free daily updates delivered just for you.",template:"signup-confirm-heads",variable:"vars[intent_heads]"},washPostId,subscribeEmail,getUserId=function(){return document.cookie.match(/wapo_login_id=([^;]+)/)?
RegExp.$1:""},getWapoId=function(){return document.cookie.match(/wapo_secure_login_id=([^;]+)/)?RegExp.$1:""},isSubscriber=function(){var isSubscriber=false;if(document.cookie.match(/rplsb=([^;]+)/))isSubscriber=RegExp.$1==1;return isSubscriber},daysBetween=function(date1,date2){var one_day=1E3*60*60*24,difference_ms;difference_ms=date2.getTime()-date1.getTime();return Math.round(difference_ms/one_day)},toggleBanner=function(banner,show,callBack){if(show){$(banner).parent().css("display","block");
$(banner).parent().addClass("fixed-overlay-subscription");$("#pb-root#pb-root").addClass("subscriptionOverlay-margin")}else $(banner).slideUp("slow",function(){$(banner).parent().css("display","none");$(banner).parent().removeClass("fixed-overlay-subscription");$("#pb-root#pb-root").removeClass("subscriptionOverlay-margin")});if(callBack)callBack()},showBanner=function(){var currentPos=$(this).scrollTop();if(currentPos-20>scrollPos)toggleBanner(".banner",true,function(){if(bannerType=="SignUp")sendCustomTrackProps("event66",
trackProps(window.Newsletter.name,1,"simple"),"Newsletter Banner View");else if(bannerType=="Subscription")sendCustomTrackProps("event43",trackProps(),"Subscription Banner View");$(this).off("scroll.addsubscriptionbanner")});scrollPos=currentPos},isMobile=function(){if(navigator.userAgent.match(/Android/i)||navigator.userAgent.match(/webOS/i)||navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)||navigator.userAgent.match(/iPod/i)||navigator.userAgent.match(/BlackBerry/i)||navigator.userAgent.match(/Kindle/i)||
navigator.userAgent.match(/Windows Phone/i))return true;else return false},setNewsLetterBanner=function(data){$("#newsletter-headline-banner").append(data.headline);$("#newsletter-tagline-banner").text(data.tagline)},showConfirmation=function(data){$(".confirmation").show();$("#newsletter-tagline-banner, #signup-form, #signed-up-loggedIn-btn").hide()},getPageData=function(){var section=$("#newsletter-banner-section").text(),subSection=$("#newsletter-banner-subsection").text(),blog=$("#newsletter-banner-blogname").text(),
data={};washPostId=getUserId();if(washPostId!=="")data.washPostId=washPostId;if(blog)data.blog=blog;if(subSection)data.subSection=subSection;if(section)data.section=section;return data},getBannerNewsletter=function(){var data=getPageData();return $.ajax({type:"POST",dataType:"json",contentType:"application/json",url:" https://recommendation-newsletter.wpdigital.net/Newsletter/api/newsletter",data:JSON.stringify(data)})},subscribe=function(email){var data,url;if(washPostId!==""&&washPostId!==undefined){url=
"https://subscribe.washingtonpost.com/person/newsletter/subscribe";data={"wapoLoginID":washPostId,"wapoSecureID":getWapoId(),"userAgent":navigator.userAgent,"newsletterName":window.Newsletter.id,"metadata":[{"name":"nl_start_method","value":"S"},{"name":"nl_start_location","value":"AU"}]}}else if(email){url="https://subscribe.washingtonpost.com/person/newsletter/subscribe-email";data={"email":email,"newsletterName":window.Newsletter.id,"metadata":[{"name":"nl_start_method","value":"S"},{"name":"nl_start_location",
"value":"AU"}]}}$.ajax({type:"POST",dataType:"json",contentType:"application/json",url:url,data:JSON.stringify(data),success:function(data){if(data.status=="SUCCESS"){sendCustomTrackProps("event42,event91",trackProps(window.Newsletter.name,1,"simple"),"Newsletter Sign-up Banner");window.localStorage.setItem(SIGNED_UP_IN+section.toUpperCase(),true);showConfirmation();setTimeout(function(){toggleBanner(".banner",false)},2E3)}},error:function(request,status,error){console.log(error,"Error while subscribing")}})},
applyExperience=function(isShortDuration){$(".pb-f-page-subscription").insertBefore("#pb-root");if(bannerType=="SignUp"&&!window.localStorage.getItem(SIGNED_UP_IN+section.toUpperCase())||bannerType=="Subscription"&&!isSubscriber()){if(bannerType=="SignUp"){var mainNewsletter=getBannerNewsletter();mainNewsletter.done(function(data){if(!$.isEmptyObject(data.newsletter)){shouldShowBanner=true;$("#signup-banner").show();$("#subscription-banner").hide();if(getUserId()!==""){$("#signup-form").hide();$("#signed-up-loggedIn-btn").show()}else{$("#signup-form").show();
$("#signed-up-loggedIn-btn").hide()}window.Newsletter=data.newsletter;setNewsLetterBanner(data.newsletter)}});mainNewsletter.fail(function(){window.Newsletter=defaultNewsLetter;setNewsLetterBanner(defaultNewsLetter);sendCustomTrackProps("event50",trackProps(window.Newsletter.name,1,"simple"),"Newsletter Banner API failure Case")})}else if(bannerType=="Subscription"){shouldShowBanner=true;$("#subscription-banner").show();$("#signup-banner").hide()}$(window).on("scroll.addsubscriptionbanner",function(){if(shouldShowBanner){var cancalationDate=
window.localStorage.getItem(SUBSCRIPTION_KEY),daysPassed;if(bannerType=="Subscription"&&(getParameterByName("anchor")==="true"||sessionStorage.getItem("anchorSession"))){showBanner();return}if(cancalationDate){cancalationDate=new Date(cancalationDate);daysPassed=daysBetween(cancalationDate,new Date);if(isShortDuration&&daysPassed>3)showBanner();else if(daysPassed>7)showBanner()}else showBanner()}});$("#subscribe-btn").on("click",function(){sendCustomTrackProps("event45",trackProps(),"Subscription Banner Click");
setTimeout(function(){window.location=$("#subscribe-btn").attr("href")},330);return false});$("#subscription-banner .not-now-btn").on("click",function(event){toggleBanner("#subscription-banner",false,function(){window.localStorage.setItem(SUBSCRIPTION_KEY,new Date);sendCustomTrackProps("event44",trackProps(),"Subscription Banner Close")});return false});$("#signup-banner .not-now-btn").on("click",function(event){toggleBanner("#signup-banner",false,function(){window.localStorage.setItem(SUBSCRIPTION_KEY,
new Date);sendCustomTrackProps("event69",trackProps(),"Newsletter Banner Close")});return false});$("#signup-newsLetter").click(function(){var re=/[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;subscribeEmail=$("#newsLetter-input-banner").val();if(subscribeEmail==""||!re.test(subscribeEmail))$(".newsLetter-error-msg-banner").show();else{$(".newsLetter-error-msg").hide();subscribe(subscribeEmail)}return false});$("#signed-up-loggedIn-btn").click(function(){subscribe()})}};$(window.document).on("abtest-ready",
function(e,ABT){var testDesktop,testMobile;if(isMobile());else if(getParameterByName("anchor")==="true"||sessionStorage.getItem("anchorSession")){bannerType="Subscription";sessionStorage.setItem("anchorSession",true);applyExperience()}else{bannerType="SignUp";applyExperience(true)}});function getParameterByName(name){name=name.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var regex=new RegExp("[\\?\x26]"+name+"\x3d([^\x26#]*)"),results=regex.exec(location.search);return results===null?"":decodeURIComponent(results[1].replace(/\+/g,
" "))}function trackProps(newsletterName,index,enhancedKey){var subsection=window.wp_subsection||"";var contentType=window.wp_content_type||"";var props={"eVar2":subsection,"prop2":subsection,"prop3":contentType,"eVar17":contentType};if(newsletterName&&index)props.eVar26="nl_banner_"+enhancedKey+"_"+newsletterName.toLowerCase().split(" ").join("-")+"_"+index;return props}function sendCustomTrackProps(eventKey,props,name){if(!!window.s)window.s.sendDataToOmniture(name||"PB Feature - Page-Subscription",
eventKey,props)}})(jQuery,window);
(function($){})(jQuery);
(function(wp_get_import){wp_get_import().done(function(wp_import){var TWP=window.TWP||{};TWP.ABTestUser=TWP.ABTestUser||{};(function ABTestAnonymous($,TWP,wp_import,VisitorSegment,undefined){var OPT_OUT_KEY="ABT__OO";var IGNORE_BL_KEY="ABT__ib";var LOCAL_TRUE="yes";var LOCAL_FALSE="no";var featureData={};var bucketData={};var disabled;var ignoreBlacklist;var state="uninitialized";var $d=$(window.document);var ABT={init:function(data){disabled=!data;ABT.applyData(data);if(state!="initialized")$d.trigger("abtest-ready",
[ABT]);state="initialized";$d.trigger("abtest-init",[ABT])},state:function(){return state},trackBefore:function(eventHandler){bindTop($d,ABT.trackPageviewEventBefore(),eventHandler)},trackAfter:function(eventHandler){bindTop($d,ABT.trackPageviewEventAfter(),eventHandler)},trackValueDelimeter:function(){return TWP.ABTestUser.trackValueDelimeter},trackPageviewEventBefore:function(){return TWP.ABTestUser.trackPageviewEventBefore},trackPageviewEventAfter:function(){return TWP.ABTestUser.trackPageviewEventAfter},
trackSendHandler:function(){var method=str2obj(TWP.ABTestUser.trackSendHandler);return"function"==typeof method?method:function(){}},trackSetHandler:function(){var method=str2obj(TWP.ABTestUser.trackSetHandler);return"function"==typeof method?method:function(){}},trackUnsetHandler:function(){var method=str2obj(TWP.ABTestUser.trackUnsetHandler);return"function"==typeof method?method:function(){}},applyData:function(dataValue){var data;if(!disabled&&detectLocalStorage()&&!optOut()){data={features:[]};
ignoreBlacklist=getLocalItem(IGNORE_BL_KEY);$.each(dataValue||[],function(index,bucket){if(!bucket.disabled)$.merge(data.features,bucket.features)});ABT.bucket(data)}},bucket:function(data){bucketData=data;var features;if(!data.disabled){features=data.features||[];$.each(features,function(index,feature){setFeature(feature)})}},ignoreBlacklist:function(value){if(!value){ignoreBlacklist=undefined;removeLocalItem(IGNORE_BL_KEY)}else{ignoreBlacklist=LOCAL_TRUE;setLocalItem(IGNORE_BL_KEY,LOCAL_TRUE)}},
optOut:function(){setLocalItem(OPT_OUT_KEY,LOCAL_TRUE);$d.trigger("abtest-optout",[ABT])},get:function(name){var feature=!disabled&&featureData[name]||{};var variation=feature.variation||new Variation(feature);if(feature.variation&&!variation._trackset){variation._trackset=true;ABT.trackBefore(function(){variation.setTrackVars()});ABT.trackAfter(function(){variation.unsetTrackVars()})}return variation},clear:function(){$.each(bucketData.features,function(i,f){unregisterVariation(f.name)})},forceTest:function(featureName,
variantName){var key=makeKeyNames(featureName);setLocalItem(key.name,variantName);setLocalItem(key.visit,LOCAL_TRUE);setLocalItem(key.computed,LOCAL_TRUE);setLocalItem(key.force,LOCAL_TRUE)}};ABT.$handlers={applyClass:function(isVariant,feature,variant){this.removeClass("abt-not-loaded").addClass("abt-"+feature+"-"+variant+"-"+isVariant)}};$.fn.extend({biAbtest:function(handlerName,name,cb){var config=getConfig(name);var ftr=ABT.get(config.feature);var is=ftr.is(config.variant);function getConfig(name){var n=
name.split(".");return{feature:n[0],variant:n[1]}}if(!config.feature||!config.variant)return;return this.each(function(){var $el=$(this);ABT.$handlers[handlerName].call($el,is,config.feature,config.variant);if(cb)cb.call($el,is,config.feature,config.variant)})}});TWP.ABTest=ABT;if(!!VisitorSegment)ABT.init(TWP.ABTestBucket);else if(!!wp_import&&!VisitorSegment)wp_import(["VisitorSegment"],function(vs){VisitorSegment=vs;ABT.init(TWP.ABTestBucket)});else initError("failed during dependency acquisition");
function initError(msg){$d.trigger("abtest-fail",[["init",msg].join(": ")])}function Feature(data){var name=data.name||"";var key=makeKeyNames(name);var increment=data.increment||0;var end=/^\d+$/.test(data.end)&&parseInt(data.end,10);var variations=data.variations||[];var blacklist=data.blacklist&&data.blacklist.referrers||[];var blacklisted=getLocalItem(key.blacklisted)==LOCAL_TRUE;var bopt;if(!blacklisted&&!getLocalItem(key.blacklisted)){bopt={domains:blacklist,segment:{}};var segmentName;for(segmentName in data.segment)bopt.segment[segmentName]=
!!data.segment[segmentName];blacklisted=isBlacklisted(bopt);setLocalItem(key.blacklisted,blacklisted?LOCAL_TRUE:LOCAL_FALSE)}var enabled=variations.length&&end&&(new Date).getTime()<end;var variation=variations.length&&new Variation(registerVariation(name,variations,blacklisted,increment));if(enabled&&data.active&&!variation.nocollect){this.name=name;this.variation=variation}var defaultTrack=enabled&&data.active?data.defaultTrack:[];if(blacklisted)$.merge(defaultTrack,data.blacklist&&data.blacklist.track||
[]);if(defaultTrack.length&&variation.nocollect)this.variation=new Variation({variation:{track:defaultTrack}});if(!enabled||!variation)unregisterVariation(name)}function Variation(objValue){var obj=objValue||{};this.nocollect=!obj.collect;var data=obj.variation||{};this.name=data.name||"";this.trackvars=data.track||[];this.customOptions=data.customOptions||{};var _self=this;this.is=function(name){return name?name===_self.name:false};this.getTrackVar=function(name,prepend,delimiterValue){var result=
[];$.each(_self.trackvars,function(index,trackvar){if(makeTrackvarName(name)===makeTrackvarName(trackvar.name))result.push(trackvar.value)});var delimiter=delimiterValue||ABT.trackValueDelimeter();result=result.join(delimiter);return result&&(prepend?prepend+delimiter:"")+result};this.sendTrackVars=function(setOp,eventKey){var payload=trackingPayload();var trackargs=["Darwin - TrackVar",eventKey||"",payload];if(setOp)ABT.trackSetHandler().apply(ABT,[payload]);else ABT.trackSendHandler().apply(ABT,
trackargs);$d.trigger("abtest-tracksend",trackargs)};this.unsetTrackVars=function(){var payload=trackingPayload();ABT.trackUnsetHandler().apply(ABT,[payload])};this.setTrackVars=function(){var payload=trackingPayload();ABT.trackSetHandler().apply(ABT,[payload])};this.sendCustomTrackVar=function(){return undefined};this.unsetCustomTrackVar=function(){return undefined};this.setCustomTrackVar=function(){return undefined};function trackingPayload(){var payload={};$.each(_self.trackvars,function(index,
trackvar){var svar;if(!trackvar.dynamic){svar=makeTrackvarName(trackvar.name);payload[svar]=payload[svar]||[];payload[svar].push(trackvar.value)}});return payload}}function registerVariation(name,variations,blacklisted,increment){var key=makeKeyNames(name);var his={cur:testHash(name,variations,blacklisted,increment),old:getLocalItem(key.hash)};var i=getLocalItem(key.name);var r=LOCAL_TRUE==getLocalItem(key.visit);var t=LOCAL_TRUE==getLocalItem(key.computed);var f=LOCAL_TRUE==getLocalItem(key.force);
var compare=function(a,b){var a=parseFloat(a.customOptions.target);var b=parseFloat(b.customOptions.target);if(a<b)return-1;if(a>b)return 1;return 0};var v=findByProp(variations,"name",i);if(!t&&!blacklisted&&("string"!==typeof i&&!v)||!f&&!!t&&his.cur!=his.old){variations.sort(compare);var ranges=[];var g=0;var h=0;$.each(variations,function(index,variant){var v=variant.customOptions&&variant.customOptions.target;if(v){v=parseFloat(v)/100;g+=v;var result={value:[h,g]};h+=v;ranges.push(result)}});
var rc=randChance();$.each(ranges,function(index,range){if(between(rc,range.value[0],range.value[1]))i=index});v=variations[i];if(v)setLocalItem(key.name,v.name);else setLocalItem(key.name,"_default")}setLocalItem(key.visit,LOCAL_TRUE);setLocalItem(key.computed,LOCAL_TRUE);setLocalItem(key.hash,his.cur);var result=v&&(!blacklisted||r)&&{variation:v,collect:true};return result}function testHash(name,variations,blacklisted,increment){var vnames=[];$.each(variations,function(index,variation){var o=variation.customOptions;
var ostr="";if(o)for(n in o)if(o.hasOwnProperty(n))ostr+=[n,o[n]].join("\x3d");vnames.push(variation.name+ostr)});var result=[name,vnames.sort().join(""),!!blacklisted,increment].join("");return result}function unregisterVariation(name){var key=makeKeyNames(name);removeLocalItem(key.name);removeLocalItem(key.visit);removeLocalItem(key.blacklisted);removeLocalItem(key.computed);removeLocalItem(key.hash);removeLocalItem(key.force)}function findByProp(arr,prop,value){var result;$.each(arr,function(i,
item){if(item[prop]==value){result=item;return false}});return result}function makeTrackvarName(value){if(!value)throw new Error("trackvar: invalid name");return value.toLowerCase()}function makeKeyNames(name){return{name:"ABT__"+name,visit:"ABT__"+name+"__visit",blacklisted:"ABT__"+name+"__blstd",computed:"ABT__"+name+"__cmpted",hash:"ABT__"+name+"__hash",force:"ABT__"+name+"__force"}}function randChance(){return Math.random(0,1)}function between(x,min,max){return x>=min&&x<=max}function getFeature(name){return featureData[name]}
function setFeature(data){if(!data.name)throw new Error("Feature: missing name");var feature=new Feature(data);if(!$.isEmptyObject(feature))featureData[data.name]=feature}function isBlacklisted(vfilters){var f=vfilters||{};var domains=f.domains||[];var segment=f.segment||{};function regescape(str){return str.replace(/\./g,"\\.").replace(/\-/g,"\\-")}function check(domain){var reg=new RegExp("^(http://)?(www\\.)?"+regescape(domain),"gi");return!domain&&!document.referrer||(domain&&document.referrer.match(reg)||
[]).length>0}var result;var count=0;if(!ignoreBlacklist){$.each(domains,function(index,domain){result=check(domain);return!result});var segmentName;for(segmentName in segment)if(segment.hasOwnProperty(segmentName)){result=result||(!!segment[segmentName]?!!VisitorSegment(segmentName):false);if(!!segment[segmentName])count++}}return 0!==count?!result:false}function detectLocalStorage(){var str="_a-b-test";try{setLocalItem(str,str);removeLocalItem(str);return true}catch(e){return false}}function getLocalItem(name){return localStorage.getItem(name)}
function setLocalItem(name,value){if(getLocalItem(name))removeLocalItem(name);localStorage.setItem(name,value)}function removeLocalItem(name){localStorage.removeItem(name)}function optOut(){return getLocalItem(OPT_OUT_KEY)===LOCAL_TRUE}function str2obj(handlerStr){var parts;var method=window;try{parts=handlerStr.split(".");$.each(parts,function(i,obj){method=method[obj]})}catch(e){}return method}function bindTop($ctx,name,fn){if(!name)return;$ctx.on(name,fn);$ctx.each(function(){var handlers=$._data($ctx[0],
"events")[name.split(".")[0]];var handler=handlers.pop();handlers.splice(0,0,handler)})}})(jQuery,TWP,window.wp_import,window.VisitorSegment)})})(wp_get_import);
(function magnetAnonymous(window,$,wp_pb,undefined){var SCROLL_INTERVAL=200;var DEFAULT_DEBOUNCE=100;var DRAW_SPEED=250;var UP_OFFSET=-181;var DOWN_OFFSET=0;var WINDOW_TOP_OFFSET=0;var SCREEN_BOTTOM_OFFSET=600;logMagnetTag();$(function(){var $w=$(window);var $d=$(document);var $r=$("html");var $h=$(".pb-f-page-header-v2");var $instance=$(".pb-f-page-magnet");$instance.each(function(){var $el=$(this);$el.insertAfter($h);init($el)});function init($container){var $modulearea=$container.find(".pb-module-area");
var $title=$modulearea.find(".pb-magnet-title");applyTitleCase($title.find(".pb-magnet-h2.magnet-title-case"));var $ctrl={};$ctrl.$container=$container.find(".pb-magnet-controls");$ctrl.$mvleft=$ctrl.$container.find(".pb-magnet-mvleft");$ctrl.$mvright=$ctrl.$container.find(".pb-magnet-mvright");$container.data("magnetControl",$ctrl);$modulearea.find('[data-pb-magnet-first\x3d"true"]').insertAfter($title);var $items=$container.find(".pb-magnet-item");var $imgs=$items.find(".pb-magnet-article-image");
if($items.length==0)return;var tagname=$modulearea.data("tag");var omniParams=params($modulearea.data("omni"));tagLinks(omniParams);attachNavEvents();$modulearea.css("display","");function attachNavEvents(){applyLazyload();var edown="mousedown.magnet";if(!touchDevice()){containerScroll(function(){applyNavVisibility()});$ctrl.$mvleft.off(edown).on(edown,function(){var value=Math.max(0,$container.scrollLeft()-computeWidth());moveScroll(value)});$ctrl.$mvright.off(edown).on(edown,function(){var value=
$container.scrollLeft()+computeWidth();moveScroll(value)});registerOnce("nav","show_attempt",debounce(function(){down()},DEFAULT_DEBOUNCE,true))}else windowTop(function(){if(WINDOW_TOP_OFFSET>=$w.scrollTop())down()});registerOnce("nav","start_close",debounce(function(){up()},DEFAULT_DEBOUNCE,true));registerOnce("magnet","start_open",debounce(function(){if(tagname&&!!window.s)s.sendDataToOmniture("magnet_open","",{prop72:tagname})},DEFAULT_DEBOUNCE,true));function computeWidth(){var winwidth=$w.width();
var itemwidth=$items.first().width();return Math.floor(winwidth/itemwidth)*itemwidth}}function params(value){var params=value?value.split("\x26"):[value];var result=[];if(params.length>0)$.each(params,function(index,value){var param=value.split("\x3d");result.push(param)});return result}function tagLinks(params){$modulearea.find("a").each(function(){var $a=$(this);var url=$a.attr("href");$.each(params,function(index,param){url=updateUrlParam(url,param[0],param[1])});$a.attr("href",url)})}function registerOnce(arg1,
arg2,fn){var regdata=[arg1,arg2];var regname=regdata.join(":");if(!$container.data(regname))wp_pb.register(regdata[0],regdata[1],fn);$container.data(regname,true)}function applyNavVisibility(){$ctrl.scrollleft=$container.scrollLeft();$ctrl.leftoffset=$container.scrollLeft()+$container.width();var rightbound=$modulearea[0].offsetWidth-$ctrl.leftoffset<=0;$ctrl.$mvleft.toggle(!!$ctrl.scrollleft);$ctrl.$mvright.toggle(!rightbound)}function applyLazyload(){var sename="scroll.magnet-lazy";var reveal=0;
$container.off(sename).on(sename,debounce(function(){lazy()},1,true));lazy();function lazy(){var count=Math.max(reveal,computeNumberOfImages());if(!!count&&"NaN"!==count.toString()&&reveal!==count){reveal=count;$imgs.filter(":lt("+reveal+")").each(function(){var $el=$(this);$el.attr("src",$el.data("original"))})}}function computeNumberOfImages(){return Math.ceil(($container.scrollLeft()+$container.width())/$items.first().width())}}function nearBottom(){return $w.scrollTop()>=$d.height()-$w.height()-
SCREEN_BOTTOM_OFFSET}function down(){$r.addClass("magnet");if(!nearBottom())$r.addClass("magnet-nudge");if(touchDevice())$container.addClass("magnet-open");else $container.addClass("magnet-open").animate({top:DOWN_OFFSET},DRAW_SPEED);wp_pb.report("magnet","start_open")}function up(){$r.removeClass("magnet magnet-nudge");if(touchDevice())$container.removeClass("magnet-open");else $container.removeClass("magnet-open").animate({top:UP_OFFSET},DRAW_SPEED);wp_pb.report("magnet","start_close")}function containerScroll(fn){var scroll;
var rename="resize.magnet";$w.off(rename).on(rename,function(){scroll=true});var sename="scroll.magnet";$container.off(sename).on(sename,function(){scroll=true});var tid;setInterval(function(){if(scroll){if(tid)clearTimeout(tid);tid=setTimeout(function(){fn()},SCROLL_INTERVAL)}scroll=false},SCROLL_INTERVAL)}function windowTop(fn){var atop=false;var tid;var sename="scroll.magnet";$w.off(sename).on(sename,function(){var top=$(window).scrollTop();if(!atop&&top==0){atop=true;if(tid)clearTimeout(tid);
tid=setTimeout(function(){fn()},SCROLL_INTERVAL)}else if(top>=0)atop=false})}function moveScroll(value){$container.stop().animate({scrollLeft:value},"slow")}}function touchDevice(){return $r.hasClass("touch")}});function titleCase(strValue){var str=strValue.replace(/([^\W_]+[^\s-]*) */g,function(txt){return txt.charAt(0).toUpperCase()+txt.substr(1).toLowerCase()});var lowers=["A","An","The","And","But","Or","For","Nor","As","At","By","For","From","In","Into","Near","Of","On","Onto","To","With"];var i,
j;for(i=0,j=lowers.length;i<j;i++)str=str.replace(new RegExp("\\s"+lowers[i]+"\\s","g"),function(txt){return txt.toLowerCase()});var uppers=["Id","Tv"];for(i=0,j=uppers.length;i<j;i++)str=str.replace(new RegExp("\\b"+uppers[i]+"\\b","g"),uppers[i].toUpperCase());return str}function applyTitleCase($el){var title=titleCase(($el.text()||"").replace(/_/gi," "));$el.text(title)}function updateUrlParam(url,key,value){var n=new RegExp("([?\x26])"+key+"\x3d.*?(\x26|$)","i");var i=-1!==url.indexOf("?")?"\x26":
"?";return url.match(n)?url.replace(n,"$1"+key+"\x3d"+value+"$2"):url+i+key+"\x3d"+value}function logMagnetTag(){var tagname;$(document).on("onTwpMeterComplete.omniture",function(){var modulearea=document.getElementsByClassName("pb-f-page-magnet")[0].getElementsByClassName("pb-module-area")[0];tagname=modulearea&&modulearea.getAttribute("data-tag");if(tagname&&!!window.s)s.prop55=tagname})}function debounce(func,wait,immediate){var timeout;return function(){var context=this,args=arguments;var later=
function(){timeout=null;if(!immediate)func.apply(context,args)};var callNow=immediate&&!timeout;clearTimeout(timeout);timeout=setTimeout(later,wait);if(callNow)func.apply(context,args)}}})(window,jQuery,wp_pb);