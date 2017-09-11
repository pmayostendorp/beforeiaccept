<!--
function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

function MM_reloadPage(init) {  //reloads the window if Nav4 resized
  if (init==true) with (navigator) {if ((appName=="Netscape")&&(parseInt(appVersion)==4)) {
    document.MM_pgW=innerWidth; document.MM_pgH=innerHeight; onresize=MM_reloadPage; }}
  else if (innerWidth!=document.MM_pgW || innerHeight!=document.MM_pgH) location.reload();
}
MM_reloadPage(true);

function MM_jumpMenu(targ,selObj,restore){ //v3.0
  eval(targ+".location='"+selObj.options[selObj.selectedIndex].value+"'");
  if (restore) selObj.selectedIndex=0;
}

function MM_jumpMenuGo(selName,targ,restore){ //v3.0
  var selObj = MM_findObj(selName); if (selObj) MM_jumpMenu(targ,selObj,restore);
}

function MM_openBrWindow(theURL,winName,features) { //v2.0
  window.open(theURL,winName,features);
}

function randRange(lowVal,highVal) {
	 return Math.floor(Math.random()*(highVal-lowVal+1))+lowVal;
}

var randVal = randRange(1,9);

//-->

// NAV MENU SCRIPT
<!--//--><![CDATA[//><!--

sfHover = function() {
	var sfEls = document.getElementById("nav").getElementsByTagName("LI");
	for (var i=0; i<sfEls.length; i++) {
		sfEls[i].onmouseover=function() {
			this.className+=" sfhover";
		}
		sfEls[i].onmouseout=function() {
			this.className=this.className.replace(new RegExp(" sfhover\\b"), "");
		}
	}
}
if (window.attachEvent) window.attachEvent("onload", sfHover);

//--><!]]>

function colorRows() {
	var count=0;
    var myTR = document.getElementsByTagName('tr');
    for (var i=0;i<myTR.length;i++) {
		if (i%2) {
			if (myTR[i].className == 'notint') {
				continue;
			} else {
				myTR[i].className = 'rowTint';}
			}
    }
}

// NAV TOGGLE
function togglenav (navChild,navArrow) {
var whichChild = document.getElementById(navChild);
var whichArrow = document.getElementById(navArrow);
	if (whichChild.className=="navshown") { 
		whichChild.className="navhidden"; 
		whichArrow.src="/assets/img/down-arrow.gif"; 
	} else { 
		whichChild.className="navshown"; 
		whichArrow.src="/assets/img/up-arrow.gif"; 
	}
} 

function addthis_click()
{
var aturl ='http://www.addthis.com/bookmark.php';
aturl+='?v=10';
aturl+='&pub='+'my_addthis_id';
aturl+='&url='+encodeURIComponent(location.href);
aturl+='&title='+encodeURIComponent(document.title);
window.open(aturl,'addthis','scrollbars=yes,menubar=no,width=620,height=620,resizable=yes,toolbar=no,location=no,status=no,screenX=200,screenY=100,left=200,top=100');
return false;
}

/* a function to produce a popup window */
function popup(mylink, windowname) {
	if (!window.focus) return true;
	var href;
	if (typeof(mylink) == 'string')
		href=mylink;
	else
		href=mylink.href;
	var popup = window.open(href, windowname,'width=500,height=400,left=550,top=75,scrollbars=yes');
	popup.focus();
	return false;
}

function gotosite(site) {
        if (site != "") {
                self.location=site;
        }
}

function clearDefault(el) {
	if (el.defaultValue==el.value) el.value = ""
}

function makeDefault(el) {
	el.value = "Enter at least 3 characters"
}

var tipTimer;
function locateObject(n, d) { //v3.0
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=locateObject(n,d.layers[i].document); return x;
}

function hideTooltip(object)
{
if (document.all)
{
	locateObject(object).style.visibility="hidden"
	locateObject(object).style.left = 1;
	locateObject(object).style.top = 1;
return false
}
else if (document.layers)
{
	locateObject(object).visibility="hide"
	locateObject(object).left = 1;
	locateObject(object).top = 1;
	return false
}
else
	return true
}

function showTooltip(object,e, tipContent, backcolor, bordercolor, textcolor, displaytime)
{
	window.clearTimeout(tipTimer)

	if (document.all)
		{
			locateObject(object).style.top=document.body.scrollTop+event.clientY+20

			locateObject(object).innerHTML='<table style="font-family: Arial, Helvetica, sans-serif; font-size: 11px; border: '+bordercolor+'; border-style: solid; border-top-width: 1px; border-right-width: 1px; border-bottom-width: 1px; border-left-width: 1px; background-color: '+backcolor+'" width="10" border="0" cellspacing="1" cellpadding="1"><tr><td nowrap><font style="font-family: Tahoma, Arial, Helvetica, sans-serif; font-size: 11px; color: '+textcolor+'">'+unescape(tipContent)+'</font></td></tr></table> '

			if ((e.x + locateObject(object).clientWidth) > (document.body.clientWidth + document.body.scrollLeft))
				{
					locateObject(object).style.left = (document.body.clientWidth + document.body.scrollLeft) - locateObject(object).clientWidth-10;
				}
			else
			{
			locateObject(object).style.left=document.body.scrollLeft+event.clientX
			}
		locateObject(object).style.visibility="visible"
		tipTimer=window.setTimeout("hideTooltip('"+object+"')", displaytime);
		return true;
		}
	else if (document.layers)
		{
		locateObject(object).document.write('<table width="10" border="0" cellspacing="1" cellpadding="1"><tr bgcolor="'+bordercolor+'"><td><table width="10" border="0" cellspacing="0" cellpadding="2"><tr bgcolor="'+backcolor+'"><td nowrap><font style="font-family: Tahoma, Arial, Helvetica, sans-serif; font-size: 11px; color: '+textcolor+'">'+unescape(tipContent)+'</font></td></tr></table></td></tr></table>')
		locateObject(object).document.close()
		locateObject(object).top=e.y+20

		if ((e.x + locateObject(object).clip.width) > (window.pageXOffset + window.innerWidth))
			{
				locateObject(object).left = window.innerWidth - locateObject(object).clip.width-10;
			} 
		else
			{
			locateObject(object).left=e.x;
			}
		locateObject(object).visibility="show"
		tipTimer=window.setTimeout("hideTooltip('"+object+"')", displaytime);
		return true;
	}
	else
	{
		return true;
	}
}

/*formerly of jscookie.js*/
//FROM http://www.quirksmode.org/js/cookies.html#ex
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

function hideBanner() {
	createCookie('osMobile','deny',1)	//create a cookie that lasts one day
	$("#topBanner").slideUp("slow");
}

/*
    zebra stripe tables
*/
$( document ).ready(function() {
    $(".datadisplay tr:even").css("background-color", "#F0F3F6");
    $(".datadisplay tr:odd").css("background-color", "#E0E6EC");
	//$("#banner").slideDown(function()  {});
    
    //Alert banner for notifications
    //var text = "OpenSecrets.org will be undergoing maintenance tonight at 8:30pm for one hour";
    //var style = "position:fixed;background-color: red; height: 30px;width: 100%;z-index:100;font-size:20px;font-weight:bold;";
    //$("body").prepend("<div style='" + style + "'>" + text + "</div>")
    
});
