//Copyright 2003-2015 VisiStat, Inc., All Rights Reserved.

function VSCapture(pagename) {

if (pagename) { MyPageName = pagename; }

var vs="DID="+DID;
	vs+="&MyPage="+MyPageName;
	vs+="&MyID="+MyID;
	vs+="&MySearch="+MySearch;
	vs+="&TitleTag="+escape(document.title); 
	vs+="&Hst="+document.domain;
    vs+="&width="+screen.width;
	vs+="&height="+screen.height;
	vs+="&ColDep="+screen.colorDepth;
	vs+="&Lang="+navigator.language;
	vs+="&Cook="+navigator.cookieEnabled;
	vs+="&Page="+escape(window.location.pathname.substring(window.location.pathname.lastIndexOf('\\') + 1));


	var vsr;
	try {
		vsr="Reff="+escape(parent==self?document.referrer:parent.document.referrer);
	}
	catch(e) {
		vsr="Reff="+escape(document.referrer);
	}
	
	vsr = vsr.replace(/&/g, "AND");

	var	vsd="FullPage="+document.URL;
	vsd = vsd.replace(/#/g, "%23");
	vsd = vsd.replace(/&/g, "AND");
	
	var purl = "PMCD="+document.URL;
	
	var flaver='';
	var n=navigator;
	if (n.plugins && n.plugins.length) {
		for (var i=0;i<n.plugins.length;i++) {
			if (n.plugins[i].name.indexOf('Shockwave Flash')!=-1) { flaver=n.plugins[i].description.split('Shockwave Flash ')[1]; break; }
		}
	}
	else if (window.ActiveXObject) {
		for (var i=10;i>=2;i--) {
			try {
				var fl=eval("new ActiveXObject('ShockwaveFlash.ShockwaveFlash."+i+"');");
				if (fl) { flaver=i; break; }
		   }
		   catch(e) {}
	  }
	}
	
	var rand = Math.random();
	sniffer = new Image(); 
	sniffer.src = 'https:\/\/sniff.visistat.com\/index.php?'+vs+'&'+vsr+'&'+vsd+'&'+purl+'&Fla='+flaver+'&r='+rand;

}

function VSLT(LinkName) {
	var random = Math.random();
	sniff = new Image(); 
	sniff.src= 'https:\/\/sniff.visistat.com\/index.php?DID='+DID+'&LinkName='+LinkName+'&r='+random;
}

function msrec(e) {

	if (navigator.appName == "Netscape") { msx = e.pageX; msy = e.pageY; }
	else { msx = event.clientX+document.body.scrollLeft; msy = event.clientY+document.body.scrollTop; }

	var rand = Math.random();
	var pw = screen.width;
	var ph = document.body.scrollHeight;
	msxy = new Image();
	
	msxy.src= 'https:\/\/sniff.visistat.com\/tm.php?r='+rand+'&DID='+DID+'&pw='+pw+'&ph='+ph+'&msx='+msx+'&msy='+msy+'&mspage='+window.location.pathname.substring(window.location.pathname.lastIndexOf('\\') + 1);
}

window.document.onmousedown = msrec;

var msx = 0;
var msy = 0;
var pagename;
var MyPageName;
var MyID;
var MySearch;

VSCapture();
