window.__dsns_.GetCookie=function(a){a+="=";for(var c=document.cookie.split(";"),b=0;b<c.length;b++){for(var d=c[b];d.charAt(0)==" ";)d=d.substring(1,d.length);if(d.indexOf(a)==0)return d.substring(a.length,d.length)}return null};
(function() {
	var a = false, f, src;
	if(typeof ds_rdm == 'string')
		a  = document.getElementById('dsns'+ds_rdm);
	if(!a) // temp
		a = document.getElementById('datasphereDiv');
	if(!a)
	{
		var scripts = document.getElementsByTagName('script');
		var me = scripts[scripts.length - 1];
		do {me = me.previousSibling;} while ( me && me.nodeType !== 1 );
		if(me && (' ' + me.className + ' ').indexOf(' dsnsasyncad ') != -1)
			a = me;
	}
	if(!a)
	{
		var divs = document.getElementsByTagName('div'), i;
		for (i in divs)
			if((' ' + divs[i].className + ' ').indexOf(' dsnsasyncad ') > -1)
				a = divs[i];
	}
	if(!a)
		return;
	f = document.createElement("iframe");
	f.width = 300;
	f.height = 250;
	f.frameBorder='no';
	f.scrolling='no';
	src = 'http://ftpcontent.worldnow.com/wncustom/custom/meredith/datasphere/asyncadload.html?'+a.attributes.rel.value;
	src += '|com='+__dsns_.GetCookie('dsnscomm');
	f.src = src;
	// once new version is live, try without timeout
	setTimeout(function() { a.appendChild(f); }, 20);
})();