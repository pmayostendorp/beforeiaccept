(function(){
var pfs={ "http://www.sheknows.com/channels/health-and-wellness":{"nid":21031,"tr":1,"ex":"http://www.sheknows.com/$|http://sheknows.com/$|http://www.hercampus.com/|http://www.couponmom.com/"},
"http://www.sheknows.com/channels/home-and-gardening":{"nid":31507,"tr":1,"ex":"http://www.sheknows.com/$|http://sheknows.com/$|http://www.hercampus.com/|http://www.couponmom.com/"},
"http://www.sheknows.com/channels/food-and-recipes":{"nid":21033,"tr":1,"ex":"http://www.sheknows.com/$|http://sheknows.com/$|http://www.hercampus.com/|http://www.couponmom.com/"},
"http://www.sheknows.com/channels/beauty-and-style":{"nid":21029,"tr":1,"ex":"http://www.sheknows.com/$|http://sheknows.com/$|http://www.hercampus.com/|http://www.couponmom.com/"},
"http://www.sheknows.com/channels/entertainment":{"nid":21028,"tr":1,"ex":"http://www.sheknows.com/$|http://sheknows.com/$|http://www.hercampus.com/|http://www.couponmom.com/"},
"http://www.sheknows.com/channels/love-and-sex":{"nid":21032,"tr":1,"ex":"http://www.sheknows.com/$|http://sheknows.com/$|http://www.hercampus.com/|http://www.couponmom.com/"},
"http://www.sheknows.com/channels/parenting":{"nid":21034,"tr":1,"ex":"http://www.sheknows.com/$|http://sheknows.com/$|http://www.hercampus.com/|http://www.couponmom.com/"},
"http://www.sheknows.com/channels/shopping":{"nid":21035,"tr":1,"ex":"http://www.sheknows.com/$|http://sheknows.com/$|http://www.hercampus.com/|http://www.couponmom.com/"},
"http://www.sheknows.com/sheknows-plus.php":{"nid":21037,"tr":1,"ex":"http://www.sheknows.com/$|http://sheknows.com/$|http://www.hercampus.com/|http://www.couponmom.com/"},
"http://www.sheknows.com/channels/living":{"nid":21030,"tr":1,"ex":"http://www.sheknows.com/$|http://sheknows.com/$|http://www.hercampus.com/|http://www.couponmom.com/"},
"http://www.sheknows.com/contests/":{"nid":21036,"tr":1,"ex":"http://www.sheknows.com/$|http://sheknows.com/$|http://www.hercampus.com/|http://www.couponmom.com/"},
"http://www.sheknows.com/":{"nid":21027,"tr":1,"ex":"http://www.sheknows.com/$|http://sheknows.com/$|http://www.hercampus.com/|http://www.couponmom.com/"} },d=document,w=window,u=(w.gm_fake_href)?w.gm_fake_href:w.location.href;

function z(n){
var s,u;

if (Math.random()>=n['tr']) {
	return;
}



var ar_nodes = ":21031:31507:21033:21029:21028:21032:21034:21035:21037:21030:21036:21027:";
if (ar_nodes.indexOf(":"+n['nid']+":") >= 0) {	// adradar only
	(new Image).src="//amch.questionmarket.com/adscgen/adrad.php?survey_num=0&aicode=0&site="+n['nid'];
	return;
}



s=d.createElement('SCRIPT');
u='//content.dl-rms.com/dt/s/'+n['nid']+'/s.js';
s.src=u;
s.type='text/javascript';
d.getElementsByTagName('head')[0].appendChild(s);
}


function r() {
	var n="",p,x,u_alt,prot;
    prot = (location.protocol.indexOf('http') === 0) ? location.protocol: 'http:';
	while (1) {
        u_alt = (prot=='https:') ? u.replace("https:", "http:") : u.replace("http:", "https:");
		try {
			for (p in pfs) {
			  if ( (u.substring(0, p.length)==p || u_alt.substring(0, p.length)==p) && p.length > n.length) {
				if (pfs[p].ex) {
					x=new RegExp(pfs[p].ex,"i");
					if (x.test(u)) {
						continue;
					}
				}
				n=p;
			  }
			}
			if (n.length > 0) {
				z(pfs[n]);
				return;
			}
		} catch (e) {}
	
		if (w==top) {
			break;
		}
	
		if (w==window&&u!=d.referrer) {
			u=d.referrer;
		} else {
			w=w.parent;
		}
	}
}

if (d.readyState=="complete"){
	r();
} else if (w.addEventListener){ 
	w.addEventListener("load", r, false);
} else if (w.attachEvent){ 
	w.attachEvent("onload", r);
}
})();
