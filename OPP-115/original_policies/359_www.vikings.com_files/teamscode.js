var s_tc_teamscode=new TagContainer('teamscode');

function TagContainer(n){var t=this,w=t.w=window;t.d=w.document;t._c='s_t';if(!w.s_c_il){w.s_c_il=[];w.s_c_in=0}t._il=w.s_c_il;t._in=w.s_c_in;t._il[t._in]=t;w.s_c_in++;t.tcn=t.l=0;t.stc=function(n){
var t=this,l=t.w.s_c_il,i,x;t.tcn=n;if(l)for(i=0;i<l.length;i++){x=l[i];if(x&&x._c=='s_l'&&x.tagContainerName==n)t.l=x}};t.stc(n);t.xd=function(s){var t=this,x=0;if(
t.d.implementation&&t.d.implementation.createDocument)x=(new DOMParser).parseFromString(s,'text/xml');else if(t.w.ActiveXObject){x=new ActiveXObject('Microsoft.XMLDOM');x.async='false';x.loadXML(s)}
return x};t.xe=function(x,t){var a,b=[],i,j;for(i=0;i<2;i++){if(i>0)t=t.toLowerCase();a=x.getElementsByTagName(t);if(a)for(j=0;j<a.length;j++)b[b.length]=a[j]}return b};t.xt=function(x){var t=this,b=
"",l,i;l=x.childNodes;if(l)for(i=0;i<l.length;i++)b+=t.xt(l[i]);if(x.data)b+=x.data;return b};t.cp=function(x){var t=this,tn=Math.floor((new Date).getTime()/1000),ts=x.s,te=x.e,tp=1,l=t.d.location,h=
l.hostname,hm=x.h,hp=1,p=l.pathname,pm=x.p,pp=1,q=l.search,qm=x.q,qp=1,qi,qv,c=t.d.cookie,cm=x.c,cp=1,ci,cv,i;if(ts)tp=(tn>=ts&&(!te||tn<=te));if(hm){hp=0;if(h){i=0;while(!hp&&i<hm.length){if(
h.indexOf(hm[i])>=0)hp=1;i++}}}if(pm){pp=0;if(p){i=0;while(!pp&&i<pm.length){if(p.indexOf(pm[i])>=0)pp=1;i++}}}if(qm){qp=0;if(q){if(q.substring(0,1)=='?')q=q.substring(1);q='&'+q+'&';i=0;while(
!qp&&i<qm.length){qi=q.indexOf('&'+qm[i].k+'=');if(!qm[i].v&&qi<0)qi=q.indexOf('&'+qm[i].k+'&');if(qi>=0)if(qm[i].v){qv=q.substring(qi+qm[i].k.length+2);qi=qv.indexOf('&');if(qi>=0){qv=unescape(
qv.substring(0,qi));if(qv==qm[i].v)qp=1}}else qp=1;i++}}}if(cm){cp=0;if(c){c=';'+c+';';c=c.split('; ').join(';');i=0;while(!cp&&i<cm.length){ci=c.indexOf(';'+cm[i].k+'=');if(!cm[i].v&&ci<0)ci=
c.indexOf(';'+cm[i].k+';');if(ci>=0)if(cm[i].v){cv=c.substring(ci+cm[i].k.length+2);ci=cv.indexOf(';');if(ci>=0){cv=unescape(cv.substring(0,ci));if(cv==cm[i].v)cp=1}}else cp=1;i++}}}return(
tp&&hp&&pp&&qp&&cp)};t.cl=[];t.cn=t.cpn=0;t.crt=0;t.bl=[];t.crl=function(cn,cpn){var t=this;if(cn==t.cn&&cpn==t.cpn)t.cr()};t.cr=function(){var t=this,d=t.d,b,c,p,n=1,o,u,x,y,l,i;if(t.cl.length>0){if(
!d.body){if(!t.crt)t.crt=setTimeout(function(){t.crt=0;t.cr()},13)}else{b=d.body;while(n&&t.cn<t.cl.length){c=t.cl[t.cn];if(t.cdwb){u=t.cdwb;t.cdwb=0;u='<div>'+u.replace(/&/g,'&amp;').replace(
/<img /gi,'<IMG ').replace(/<\/img>/gi,'</IMG>').replace(/<script /gi,'<SCRIPT ').replace(/<script>/gi,'<SCRIPT>').replace(/<\/script>/gi,'</SCRIPT>').replace(/<iframe /gi,'<IFRAME ').replace(
/<\/iframe>/gi,'</IFRAME>')+'</div>';x=t.xd(u);l=t.xe(x,'IMG');for(i=0;i<l.length;i++){u=l[i].getAttribute('src');if(u)c.p.splice(t.cpn,0,{t:'i',u:u})}l=t.xe(x,'SCRIPT');for(i=0;i<l.length;i++){u=l[i]
.getAttribute('src');if(u)c.p.splice(t.cpn,0,{t:'s',u:u});else{u=t.xt(l[i]);if(u)c.p.splice(t.cpn,0,{t:'c',c:u})}}l=t.xe(x,'IFRAME');for(i=0;i<l.length;i++){u=l[i].getAttribute('src');if(u)c.p.splice(
t.cpn,0,{t:'f',u:u})}}if((t.cpn>0||!c.x||t.cp(c.x))&&c.p&&t.cpn<c.p.length){p=c.p[t.cpn];if(p.t=='b'&&p.u){u=p.u;o=new Image;t.bl[t.bl.length]=o;o.onload=function(){var i;for(i=0;i<t.bl.length;i++)if(
t.bl[i]&&t.bl[i].src==u){t.bl.splice(i,1);return}};o.src=u}if((p.t=='s'&&p.u)||(p.t=='c'&&p.c)){n=0;t.cpn++;u=p.u;o=d.createElement('script');o.type='text/javascript';o.setAttribute('async','async')
x='s_c_il['+t._in+']';y=x+'.crl('+t.cn+','+t.cpn+')';if(p.t=='s'){o.n=new Function(y);o.t=0;o.i=setInterval(function(){if(o.readyState=='loaded')o.t++;if(o.readyState=='complete'||o.t>2){o.c();o.n()}}
,50);o.c=function(){if(o.i){clearInterval(o.i);o.i=0}};o.onreadystatechange=function(){if(o.readyState=='complete'){o.c();o.n()}};o.onload=function(){o.c();o.n()};o.src=u}else o.text=x+'.cdw='+x+
'.d.write;'+x+'.cdwb="";'+x+'.d.write=function(m){'+x+'.cdwb+=m};'+"\n"+p.c+"\n"+x+'.d.write='+x+'.cdw;'+y;x=b;l=d.getElementsByTagName('HEAD');if(l&&l[0])x=l[0];if(x.firstChild)x.insertBefore(o,
x.firstChild);else x.appendChild(o)}if(p.t=='f'&&p.u){u=p.u;o=d.createElement('IFRAME');o.setAttribute('style','display:none');o.setAttribute('width','0');o.setAttribute('height','0');o.setAttribute(
'src',u);b.appendChild(o)}if(n)t.cpn++}else{t.cn++;t.cpn=0}}if(n&&t.l){for(x in t.l.wl)if(!Object.prototype[x]){u=t.w[x];x=t.l.wl[x];if(u&&x)for(i in x)if(!Object.prototype[i]){if(typeof(x[i])!=
'function'||(''+x[i]).indexOf('s_c_il')<0)u[i]=x[i]}}for(i=0;i<t.l.wq.length;i++){c=t.l.wq[i];u=c.f;if(u)if(c.o)x=t.w[c.o];else x=t.w;if(x[u]&&typeof(x[u])=='function'&&(''+x[u]).indexOf('s_c_il')<0){
if(c.a)x[u].apply(x,c.a);else x[u].apply(x)}}}}}};}

/* SiteCatalyst code version: H.24 (NFLCS modified).
 Copyright 1997-2008 Omniture, Inc. More info available at
 http://www.omniture.com */
/************************ ADDITIONAL FEATURES ************************
 Plugins
 */

/*
 PLEASE READ:
 THE s_account VAR AND ASSIGNED VALUES HAVE BEEN MOVED TO HEAD.JSP BECAUSE FLASH MEDIA
 PLAYER REQUIRES THIS INFO BEFORE s_code.js IS INSTANTIATED...
 */

// change to s_analytics

//remove global

if(s_account){
	if(s_account.indexOf(',nflglobal') > 0) s_account = s_account.replace(',nflglobal',',nflclubsglobal');
	if(s_account.indexOf('nflglobal,') > 0) s_account = s_account.replace('nflglobal,','nflclubsglobal,');
}

if(s_account.indexOf('nflclubsglobal') < 0) s_account = s_account + ',nflclubsglobal'

if(s_account.indexOf('nflukprod') > -1 & s_account.indexOf('nflclubsglobal' > -1 ) )s_account = s_account.replace('nflclubsglobal','nflintl');

var s_analytics = s_gi(s_account);


/************************** CONFIG SECTION **************************/


/* supported page variables/settings */

// sitePrefix - s_analytics_prefix
// pageName : s_analytics_pagename 
// hierarchy : s_analytics_hier

/* ********************************* */

/* You may add or alter any code config here. */

/* Conversion Config */
s_analytics.currencyCode = "USD"

/* Link Tracking Config */
s_analytics.trackDownloadLinks = true
s_analytics.trackExternalLinks = true
s_analytics.trackInlineStats = true
s_analytics.linkDownloadFileTypes = "exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx"

/* sets reporting filters - need to add for each club site launch... */
//if (nflcsClubCode=='BUF') s_analytics.linkInternalFilters="javascript:,buffalobills.com";
//if (nflcsClubCode=='SEA') s_analytics.linkInternalFilters="javascript:,seahawks.com";
/* --- */

s_analytics.linkLeaveQueryString = false
s_analytics.linkTrackVars = "None"
s_analytics.linkTrackEvents = "None"

/* Plugin Config */
s_analytics.usePlugins = true
function s_analytics_doPlugins(s_analytics) {

    /* Add calls to plugins here */

    //	copy s_analytics_prop to s_analytics.prop
    if (typeof(s_analytics_prop1) != 'undefined') {
        s_analytics.prop1 = s_analytics_prop1;
    }
    if (typeof(s_analytics_prop2) != 'undefined') {
        s_analytics.prop2 = s_analytics_prop2;
    }
    if (typeof(s_analytics_prop3) != 'undefined') {
        s_analytics.prop3 = s_analytics_prop3;
    }
    if (typeof(s_analytics_prop4) != 'undefined') {
        s_analytics.prop4 = s_analytics_prop4;
    }
    if (typeof(s_analytics_prop5) != 'undefined') {
        s_analytics.prop5 = s_analytics_prop5;
    }
    if (typeof(s_analytics_prop6) != 'undefined') {
        s_analytics.prop6 = s_analytics_prop6;
    }
    if (typeof(s_analytics_prop7) != 'undefined') {
        s_analytics.prop7 = s_analytics_prop7;
    }
    if (typeof(s_analytics_prop8) != 'undefined') {
        s_analytics.prop8 = s_analytics_prop8;
    }
    if (typeof(s_analytics_prop9) != 'undefined') {
        s_analytics.prop9 = s_analytics_prop9;
    }
    if (typeof(s_analytics_prop10) != 'undefined') {
        s_analytics.prop10 = s_analytics_prop10;
    }
    if (typeof(s_analytics_prop11) != 'undefined') {
        s_analytics.prop11 = s_analytics_prop11;
    }
    if (typeof(s_analytics_prop12) != 'undefined') {
        s_analytics.prop12 = s_analytics_prop12;
    }
    if (typeof(s_analytics_prop13) != 'undefined') {
        s_analytics.prop13 = s_analytics_prop13;
    }
    if (typeof(s_analytics_prop14) != 'undefined') {
        s_analytics.prop14 = s_analytics_prop14;
    }
    if (typeof(s_analytics_prop15) != 'undefined') {
        s_analytics.prop15 = s_analytics_prop15;
    }
    if (typeof(s_analytics_prop16) != 'undefined') {
        s_analytics.prop16 = s_analytics_prop16;
    }
    if (typeof(s_analytics_prop17) != 'undefined') {
        s_analytics.prop17 = s_analytics_prop17;
    }
    if (typeof(s_analytics_prop18) != 'undefined') {
        s_analytics.prop18 = s_analytics_prop18;
    }
    if (typeof(s_analytics_prop19) != 'undefined') {
        s_analytics.prop19 = s_analytics_prop19;
    }
    if (typeof(s_analytics_prop20) != 'undefined') {
        s_analytics.prop20 = s_analytics_prop20;
    }
    if (typeof(s_analytics_prop21) != 'undefined') {
        s_analytics.prop21 = s_analytics_prop21;
    }
    if (typeof(s_analytics_prop22) != 'undefined') {
        s_analytics.prop22 = s_analytics_prop22;
    }
    if (typeof(s_analytics_prop23) != 'undefined') {
        s_analytics.prop23 = s_analytics_prop23;
    }
    if (typeof(s_analytics_prop24) != 'undefined') {
        s_analytics.prop24 = s_analytics_prop24;
    }
    if (typeof(s_analytics_prop25) != 'undefined') {
        s_analytics.prop25 = s_analytics_prop25;
    }
    if (typeof(s_analytics_prop26) != 'undefined') {
        s_analytics.prop26 = s_analytics_prop26;
    }
    if (typeof(s_analytics_prop27) != 'undefined') {
        s_analytics.prop27 = s_analytics_prop27;
    }
    if (typeof(s_analytics_prop28) != 'undefined') {
        s_analytics.prop28 = s_analytics_prop28;
    }
    if (typeof(s_analytics_prop29) != 'undefined') {
        s_analytics.prop29 = s_analytics_prop29;
    }
    if (typeof(s_analytics_prop30) != 'undefined') {
        s_analytics.prop30 = s_analytics_prop30;
    }
    if (typeof(s_analytics_prop31) != 'undefined') {
        s_analytics.prop31 = s_analytics_prop31;
    }
    if (typeof(s_analytics_prop32) != 'undefined') {
        s_analytics.prop32 = s_analytics_prop32;
    }
    if (typeof(s_analytics_prop33) != 'undefined') {
        s_analytics.prop33 = s_analytics_prop33;
    }
    if (typeof(s_analytics_prop34) != 'undefined') {
        s_analytics.prop34 = s_analytics_prop34;
    }
    if (typeof(s_analytics_prop35) != 'undefined') {
        s_analytics.prop35 = s_analytics_prop35;
    }
    if (typeof(s_analytics_prop36) != 'undefined') {
        s_analytics.prop36 = s_analytics_prop36;
    }
    if (typeof(s_analytics_prop37) != 'undefined') {
        s_analytics.prop37 = s_analytics_prop37;
    }
    if (typeof(s_analytics_prop38) != 'undefined') {
        s_analytics.prop38 = s_analytics_prop38;
    }
    if (typeof(s_analytics_prop39) != 'undefined') {
        s_analytics.prop39 = s_analytics_prop39;
    }
    if (typeof(s_analytics_prop40) != 'undefined') {
        s_analytics.prop40 = s_analytics_prop40;
    }
    if (typeof(s_analytics_prop41) != 'undefined') {
        s_analytics.prop41 = s_analytics_prop41;
    }
    if (typeof(s_analytics_prop42) != 'undefined') {
        s_analytics.prop42 = s_analytics_prop42;
    }
    if (typeof(s_analytics_prop43) != 'undefined') {
        s_analytics.prop43 = s_analytics_prop43;
    }
    if (typeof(s_analytics_prop44) != 'undefined') {
        s_analytics.prop44 = s_analytics_prop44;
    }
    if (typeof(s_analytics_prop45) != 'undefined') {
        s_analytics.prop45 = s_analytics_prop45;
    }
    if (typeof(s_analytics_prop46) != 'undefined') {
        s_analytics.prop46 = s_analytics_prop46;
    }
    if (typeof(s_analytics_prop47) != 'undefined') {
        s_analytics.prop47 = s_analytics_prop47;
    }
    if (typeof(s_analytics_prop48) != 'undefined') {
        s_analytics.prop48 = s_analytics_prop48;
    }
    if (typeof(s_analytics_prop49) != 'undefined') {
        s_analytics.prop49 = s_analytics_prop49;
    }
    if (typeof(s_analytics_prop50) != 'undefined') {
        s_analytics.prop50 = s_analytics_prop50;
    }

    //	copy s_analytics_eVar to s_analytics.eVar
    if (typeof(s_analytics_eVar1) != 'undefined') {
        s_analytics.eVar1 = s_analytics_eVar1;
    }
    if (typeof(s_analytics_eVar2) != 'undefined') {
        s_analytics.eVar2 = s_analytics_eVar2;
    }
    if (typeof(s_analytics_eVar3) != 'undefined') {
        s_analytics.eVar3 = s_analytics_eVar3;
    }
    if (typeof(s_analytics_eVar4) != 'undefined') {
        s_analytics.eVar4 = s_analytics_eVar4;
    }
    if (typeof(s_analytics_eVar5) != 'undefined') {
        s_analytics.eVar5 = s_analytics_eVar5;
    }
    if (typeof(s_analytics_eVar6) != 'undefined') {
        s_analytics.eVar6 = s_analytics_eVar6;
    }
    if (typeof(s_analytics_eVar7) != 'undefined') {
        s_analytics.eVar7 = s_analytics_eVar7;
    }
    if (typeof(s_analytics_eVar8) != 'undefined') {
        s_analytics.eVar8 = s_analytics_eVar8;
    }
    if (typeof(s_analytics_eVar9) != 'undefined') {
        s_analytics.eVar9 = s_analytics_eVar9;
    }
    if (typeof(s_analytics_eVar10) != 'undefined') {
        s_analytics.eVar10 = s_analytics_eVar10;
    }
    if (typeof(s_analytics_eVar11) != 'undefined') {
        s_analytics.eVar11 = s_analytics_eVar11;
    }
    if (typeof(s_analytics_eVar12) != 'undefined') {
        s_analytics.eVar12 = s_analytics_eVar12;
    }
    if (typeof(s_analytics_eVar13) != 'undefined') {
        s_analytics.eVar13 = s_analytics_eVar13;
    }
    if (typeof(s_analytics_eVar14) != 'undefined') {
        s_analytics.eVar14 = s_analytics_eVar14;
    }
    if (typeof(s_analytics_eVar15) != 'undefined') {
        s_analytics.eVar15 = s_analytics_eVar15;
    }
    if (typeof(s_analytics_eVar16) != 'undefined') {
        s_analytics.eVar16 = s_analytics_eVar16;
    }
    if (typeof(s_analytics_eVar17) != 'undefined') {
        s_analytics.eVar17 = s_analytics_eVar17;
    }
    if (typeof(s_analytics_eVar18) != 'undefined') {
        s_analytics.eVar18 = s_analytics_eVar18;
    }
    if (typeof(s_analytics_eVar19) != 'undefined') {
        s_analytics.eVar19 = s_analytics_eVar19;
    }
    if (typeof(s_analytics_eVar20) != 'undefined') {
        s_analytics.eVar20 = s_analytics_eVar20;
    }
    if (typeof(s_analytics_eVar21) != 'undefined') {
        s_analytics.eVar21 = s_analytics_eVar21;
    }
    if (typeof(s_analytics_eVar22) != 'undefined') {
        s_analytics.eVar22 = s_analytics_eVar22;
    }
    if (typeof(s_analytics_eVar23) != 'undefined') {
        s_analytics.eVar23 = s_analytics_eVar23;
    }
    if (typeof(s_analytics_eVar24) != 'undefined') {
        s_analytics.eVar24 = s_analytics_eVar24;
    }
    if (typeof(s_analytics_eVar25) != 'undefined') {
        s_analytics.eVar25 = s_analytics_eVar25;
    }
    if (typeof(s_analytics_eVar26) != 'undefined') {
        s_analytics.eVar26 = s_analytics_eVar26;
    }
    if (typeof(s_analytics_eVar27) != 'undefined') {
        s_analytics.eVar27 = s_analytics_eVar27;
    }
    if (typeof(s_analytics_eVar28) != 'undefined') {
        s_analytics.eVar28 = s_analytics_eVar28;
    }
    if (typeof(s_analytics_eVar29) != 'undefined') {
        s_analytics.eVar29 = s_analytics_eVar29;
    }
    if (typeof(s_analytics_eVar30) != 'undefined') {
        s_analytics.eVar30 = s_analytics_eVar30;
    }
    if (typeof(s_analytics_eVar31) != 'undefined') {
        s_analytics.eVar31 = s_analytics_eVar31;
    }
    if (typeof(s_analytics_eVar32) != 'undefined') {
        s_analytics.eVar32 = s_analytics_eVar32;
    }
    if (typeof(s_analytics_eVar33) != 'undefined') {
        s_analytics.eVar33 = s_analytics_eVar33;
    }
    if (typeof(s_analytics_eVar34) != 'undefined') {
        s_analytics.eVar34 = s_analytics_eVar34;
    }
    if (typeof(s_analytics_eVar35) != 'undefined') {
        s_analytics.eVar35 = s_analytics_eVar35;
    }
    if (typeof(s_analytics_eVar36) != 'undefined') {
        s_analytics.eVar36 = s_analytics_eVar36;
    }
    if (typeof(s_analytics_eVar37) != 'undefined') {
        s_analytics.eVar37 = s_analytics_eVar37;
    }
    if (typeof(s_analytics_eVar38) != 'undefined') {
        s_analytics.eVar38 = s_analytics_eVar38;
    }
    if (typeof(s_analytics_eVar39) != 'undefined') {
        s_analytics.eVar39 = s_analytics_eVar39;
    }
    if (typeof(s_analytics_eVar40) != 'undefined') {
        s_analytics.eVar40 = s_analytics_eVar40;
    }
    if (typeof(s_analytics_eVar41) != 'undefined') {
        s_analytics.eVar41 = s_analytics_eVar41;
    }
    if (typeof(s_analytics_eVar42) != 'undefined') {
        s_analytics.eVar42 = s_analytics_eVar42;
    }
    if (typeof(s_analytics_eVar43) != 'undefined') {
        s_analytics.eVar43 = s_analytics_eVar43;
    }
    if (typeof(s_analytics_eVar44) != 'undefined') {
        s_analytics.eVar44 = s_analytics_eVar44;
    }
    if (typeof(s_analytics_eVar45) != 'undefined') {
        s_analytics.eVar45 = s_analytics_eVar45;
    }
    if (typeof(s_analytics_eVar46) != 'undefined') {
        s_analytics.eVar46 = s_analytics_eVar46;
    }
    if (typeof(s_analytics_eVar47) != 'undefined') {
        s_analytics.eVar47 = s_analytics_eVar47;
    }
    if (typeof(s_analytics_eVar48) != 'undefined') {
        s_analytics.eVar48 = s_analytics_eVar48;
    }
    if (typeof(s_analytics_eVar49) != 'undefined') {
        s_analytics.eVar49 = s_analytics_eVar49;
    }
    if (typeof(s_analytics_eVar50) != 'undefined') {
        s_analytics.eVar50 = s_analytics_eVar50;
    }

    //	copy s_analytics_events to s_analytics.events
    if (typeof(s_analytics_events) != 'undefined') {
        s_analytics.events = s_analytics_events;
    }

    //	copy s_analytics to s_analytics
    if (typeof(s_analytics_events) != 'undefined') {
        s_analytics.pageName = s_analytics_pageName;
    }
    if (typeof(s_analytics_server) != 'undefined') {
        s_analytics.server = s_analytics_server;
    }
    if (typeof(s_analytics_channel) != 'undefined') {
        s_analytics.channel = s_analytics_channel;
    }
    if (typeof(s_analytics_pageType) != 'undefined') {
        s_analytics.pageType = s_analytics_pageType;
    }
    if (typeof(s_analytics_products) != 'undefined') {
        s_analytics.products = s_analytics_products;
    }
    if (typeof(s_analytics_purchaseID) != 'undefined') {
        s_analytics.purchaseID = s_analytics_purchaseID;
    }
    if (typeof(s_analytics_campaign) != 'undefined') {
        s_analytics.campaign = s_analytics_campaign;
    }


    // Populate Pagename, Channel, Hier based on current URL


    s_analytics.getDomain = function(thestring) {
        //function that matches the beginning of a URL
        //in a string and then returns the domain.
        var urlpattern = new RegExp("(http|ftp|https)://(.*?)/.*$");
        var parsedurl = thestring.match(urlpattern);
        return parsedurl[2];
    };

    s_analytics.getClubCode = function()
    {
        var club = "";

        if (typeof(s_analytics_prefix) == "string") {
            club = s_analytics_prefix;
        } else if (typeof s_analytics_hier1 == "string") {
            club = s_analytics_hier1.split('|');
            club = club[0];
        } else
        {
            club = s_analytics.getDomain(window.location.href);

        }

        return club.toLowerCase();
    };

    s_analytics.prefix = s_analytics.getClubCode();
    // }


    // getHier -  finds the hier by getting pathname from url - used when s_analytics_hier1 is not set.
    s_analytics.getHier = function(s) {
        if (!s)
            s = window.location.pathname;
        if (/\.[^\/]+$/.test(s))
            s = s.substring(0, s.lastIndexOf("/"));
        s = s_analytics.prefix.toLowerCase() + s.toLowerCase().replace(/\//g, "|");

        return s.replace(/\|$/, "");
    };

    //add variable to set to getHier result
    s_analytics.gH = s_analytics.getHier();

    //get FileName - finds filename of page - used if pagename / s_analytics_gf1 not set
    s_analytics.getFileName = function() {

        var url = document.URL,
            i = url.lastIndexOf('/') + 1,
            j = url.indexOf('#', i),
            k = url.indexOf('?', i);


        if (-1 == j) {
            j = url.length;
        }
        if (-1 == k) {
            k = url.length;
        }
        url = url.substring(i, Math.min(j, k));
        return url;
    };

    // if s_analytics.gf1; is not set, use getFileName() to populate
    //

    if ((typeof(s_analytics_gf1) != "string") || s_analytics_gf1 == "") {
        s_analytics.gf1 = s_analytics.getFileName();
    } else {
        s_analytics.gf1 = s_analytics_gf1;
    }

    // set gf1 to lowercase, strip off html if present
    s_analytics.gf1 = s_analytics.gf1.toLowerCase();
    if (s_analytics.gf1.match('.html')) {
        s_analytics.gf1 = s_analytics.gf1.split('.');
        s_analytics.gf1 = s_analytics.gf1[0];
    }

    // test response
    s_analytics.test1 = s_analytics.prefix + "|" + s_analytics.gf1;


    //added check for splash page so that channel, pagename and hier1 are properly set when splash page is active
    if(typeof(s_analytics_pageName) != 'undefined' && s_analytics_pageName.toLowerCase() === 'splash'){
        s_analytics.gf1 = 'splash';
    }

    // test for filename, if not present set to 'landing'
    if ((typeof(s_analytics.gf1) != "string") || (s_analytics.gf1.substr(0, 5) == "index") || s_analytics.gf1 == "")
    {
        s_analytics.gf1 = "landing";
    }

    // 3rd party apparatus to have empty filename or determine filename
    if (s_analytics.gf1 == 'empty') {
        s_analytics.gf1 = '';
    }


    // checks for set Hier if not there, creats hier using getHier() + gf (getFilename)
    if ((typeof(s_analytics_hier) != 'string') || s_analytics_hier == "") {
        // set hier1 to .gH (result for getHier())
        s_analytics.hier1 = s_analytics.gH; // + "|" + s_analytics.gf1;

        if (s_analytics.hier1.indexOf(s_analytics.gf1) == -1) {

            s_analytics.hier1 += "|" + s_analytics.gf1;
        }

    } else {
        s_analytics.hier1 = s_analytics_hier.replace(/[|]$/, '') + "|" + s_analytics.gf1;
    }


    s_analytics.sepPath = s_analytics.hier1.split("|");

    //console.log("hier1-a is: " + s_analytics.hier1);

    //sepPath switch check for home vs landing.

    //console.log("gh:: " + s_analytics.gH);
    if (s_analytics.sepPath[1] == "landing") {
        s_analytics.gf1 = "home";
        s_analytics.hier1 = s_analytics.gH + "|" + "home";
        s_analytics.channel = "home";
        s_analytics_channel = "home";
    } else {
        s_analytics.gf1 = s_analytics.gf1;
        s_analytics.hier1 = s_analytics.hier1;
    }

    //Get pluck specific pagename
    s_analytics.doPluckPageOverride = function() {
      if(typeof(nflcs)!="undefined") {
        var pluckPage = nflcs.gbl.returnUriVariable("plckForumPage");
        //console.log("pluckPage="+pluckPage);
        if(pluckPage != "") {
            //console.log("pluckPage="+pluckPage);
            s_analytics.hier1 = s_analytics.prefix +"|"+ s_analytics.sepPath[1]+"|"+pluckPage;
            //console.log("heir1="+s_analytics.heir1);
            s_analytics_channel = "forum";
            s_analytics_pageName = s_analytics.prefix +":"+ s_analytics.sepPath[1]+":"+pluckPage;
        }
      }
    };

    //Do PluckOverides
    s_analytics.doPluckPageOverride();


    //console.log("gf1 is: " + s_analytics.gf1);
    //console.log("hier1 is: " + s_analytics.hier1);
    //console.log("prefix is: " + s_analytics.prefix);
    //console.log("sepPath 1 is: " + s_analytics.sepPath[1]);
    //if(typeof(s_analytics_pageName) != 'undefined') console.log("pageName is: " + s_analytics_pageName);
    //console.log("channel is: " + s_analytics.channel);


    // for hierarchy, if the last char is a colon, then remove it
    if (/[|]$/.test(s_analytics.hier1)) {
        s_analytics.hier1 = s_analytics.hier1.replace(/[|]$/, '');
    }


    //test for server set value
    if ((typeof(s_analytics_pageName) != "string") || s_analytics_pageName == "")
    {
        s_analytics.pageName = s_analytics.hier1.replace(/\:/g, "|");
        //test if pagename already exists in hier1 variable
        if (s_analytics.hier1.indexOf(s_analytics.pageName) == -1) {
            s_analytics.pageName += "|" + s_analytics.gf1;
        }

    } else {
        //since the server set the variable, use it.
        s_analytics.pageName = s_analytics_pageName;
    }


    // clean hier1

    s_analytics.hier1 = s_analytics.hier1.toLowerCase();
    s_analytics.pageName = s_analytics.pageName.toLowerCase();
    s_analytics.pageName = s_analytics.pageName.replace(/\|/g, ':');

    // for page name, if the last char is a colon, then remove it
    if (/[:]$/.test(s_analytics.pageName)) s_analytics.pageName = s_analytics.pageName.replace(/[:]$/, '');

    // channel tweaking
    var x = s_analytics.hier1.split(":");
    x.pop();
    s_analytics.channel = typeof s_analytics_channel == "string" ? s_analytics_channel.toLowerCase() : "";


    //External Campaigns
    s_analytics.campaign = s_analytics.getQueryParam('campaign');
    s_analytics.clickThruQuality('s_kwcid,campaign', 'event4', 'event5', 'event19', 5);
    s_analytics.campaign = s_analytics.getValOnce(s_analytics.campaign, "s_campaign", 0)

    //Internal Campaigns
    s_analytics.eVar1 = s_analytics.getQueryParam('icampaign');
    s_analytics.eVar1 = s_analytics.getValOnce(s_analytics.eVar1, "s_eVar1", 0)


    //time parting rows
    s_analytics.eVar9=s_analytics.getTimeParting('h','-5'); //Set hour
    s_analytics.prop9=s_analytics.getTimeParting('h','-5');
    s_analytics.prop8=s_analytics.getTimeParting('d','-5'); // Set day
    s_analytics.eVar8=s_analytics.getTimeParting('d','-5');
    s_analytics.prop10=s_analytics.getTimeParting('w','-5'); // Set Weekend / Weekday
    s_analytics.eVar10=s_analytics.getTimeParting('w','-5');

    //Get new/repeat visitor
    s_analytics.prop24 = s_analytics.getNewRepeat();

    //For Clickmap objectIDs
    s_analytics.setupDynamicObjectIDs();

    // Lowercase variables
    if (s_analytics.prop6)
        s_analytics.prop6 = s_analytics.prop6.toLowerCase()

    // Copy search term to eVar
    if (s_analytics.prop6) {
        s_analytics.eVar5 = s_analytics.prop6

        /* Set de-duped onsite search event */
        var t_search = s_analytics.getValOnce(s_analytics.eVar5, 'ev5', 0)
        if (t_search)
            s_analytics.events = s_analytics.apl(s_analytics.events, 'event2', 1)
    }

    /* Set Page View Event*/
    s_analytics.events=s_analytics.apl(s_analytics.events,'event1',',',2);

    // Copy Page Name & Channel to eVars
    if (s_analytics.pageName) s_analytics.eVar2 = s_analytics.pageName;
    if (s_analytics.channel) s_analytics.eVar3 = s_analytics.channel;

    //Days since last visit
    s_analytics.prop21 = s_analytics.getDaysSinceLastVisit();
    s_analytics.eVar6 = s_analytics.getDaysSinceLastVisit();

    // set prop22
    s_analytics.prop22 = s_analytics.prefix + ".com";


    //console.log("22:" + s_analytics.prop22);
    //set prop 23
    //s_analytics.prop22s = s_analytics.prop22.split('.');


    s_analytics.prop23 = s_analytics.prefix + ":" + s_analytics.channel;

    s_analytics.getSecondsConsumed('event38');
    /*Handling Exit Links, both automatic and maual*/
    var url=s_analytics.exitLinkHandler();
    if(url){
        s_analytics.getSecondsConsumed('event38',1);
    }

    s_analytics.eVar73=document.domain;

    // console.log("23 s!:" + s_analytics.prop23);

}
s_analytics.doPlugins = s_analytics_doPlugins;

/************************** PLUGINS SECTION *************************/
/* You may insert any plugins you wish to use here.                 */


s_analytics.repl = new Function("x", "o", "n", ""
    + "var i=x.indexOf(o),l=n.length;while(x&&i>=0){x=x.substring(0,i)+n+x."
    + "substring(i+o.length);i=x.indexOf(o,i+l)}return x");


/*
 * Plugin: getQueryParam 2.1 - return query string parameter(s)
 */
s_analytics.getQueryParam = new Function("p", "d", "u", ""
    + "var s=this,v='',i,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.locati"
    + "on);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0?p"
    + ".length:i;t=s.p_gpv(p.substring(0,i),u+'');if(t)v+=v?d+t:t;p=p.subs"
    + "tring(i==p.length?i:i+1)}return v");
s_analytics.p_gpv = new Function("k", "u", ""
    + "var s=this,v='',i=u.indexOf('?'),q;if(k&&i>-1){q=u.substring(i+1);v"
    + "=s.pt(q,'&','p_gvf',k)}return v");
s_analytics.p_gvf = new Function("t", "k", ""
    + "if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
    + "rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s."
    + "epa(v)}return ''");


/*
 * Plugin: getValOnce 0.2 - get a value once per session or number of days
 */
s_analytics.getValOnce = new Function("v", "c", "e", ""
    + "var s=this,k=s.c_r(c),a=new Date;e=e?e:0;if(v){a.setTime(a.getTime("
    + ")+e*86400000);s.c_w(c,v,e?a:0);}return v==k?'':v");


//CTQ variables
var i = 1;

/*
 * Plugin: clickThruQuality 0.8
 */
s_analytics.clickThruQuality = new Function("scp", "tcth_ev", "cp_ev", "cff_ev", "cf_th", ""
    + "var s=this;if(i<=1){var ev=(s.events?s.events+',':'');if(s.getQueryParam(scp)){s.events=ev+"
    + "tcth_ev;if(s.c_r('cf')){var tct=parseInt(s.c_r('cf'))+1;s.c_w('cf',tct"
    + ",0);if(tct==cf_th&&cff_ev){s.events=s.events+','+cff_ev;};}else{s.c_w('cf',1,0"
    + ");}}else{if(s.c_r('cf')>=1){s.c_w('cf',0,0);s.events=ev+cp_ev;}}i++;}");


/*
 * Plugin: getTimeParting 3.0 - Set timeparting values based on time zone - valid through 2014
 */
s_analytics.getTimeParting=new Function("t","z",""
    +"var s=this,d,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T;d=new Date();A"
    +"=d.getFullYear();if(A=='2009'){B='08';C='01'}if(A=='2010'){B='14';C"
    +"='07'}if(A=='2011'){B='13';C='06'}if(A=='2012'){B='11';C='04'}if(A="
    +"='2013'){B='10';C='03'}if(A=='2014'){B='09';C='02'}if(!B||!C){B='08"
    +"';C='01'}B='03/'+B+'/'+A;C='11/'+C+'/'+A;D=new Date('1/1/2000');if("
    +"D.getDay()!=6||D.getMonth()!=0){return'Data Not Available'}else{z=p"
    +"arseFloat(z);E=new Date(B);F=new Date(C);G=F;H=new Date();if(H>E&&H"
    +"<G){z=z+1}else{z=z};I=H.getTime()+(H.getTimezoneOffset()*60000);J=n"
    +"ew Date(I+(3600000*z));K=['Sunday','Monday','Tuesday','Wednesday','"
    +"Thursday','Friday','Saturday'];L=J.getHours();M=J.getMinutes();N=J."
    +"getDay();O=K[N];P='AM';Q='Weekday';R='00';if(M>30){R='30'}if(L>=12)"
    +"{P='PM';L=L-12};if(L==0){L=12};if(N==6||N==0){Q='Weekend'}T=L+':'+R"
    +"+P;if(t=='h'){return T}if(t=='d'){return O}if(t=='w'){return Q}}");



/* DynamicObjectIDs config */
function s_analytics_getObjectID(o) {
    var ID = o.href;
    return ID;
}
s_analytics.getObjectID = s_analytics_getObjectID


/*
 * DynamicObjectIDs v1.1: Setup Dynamic Object IDs based on URL
 */
s_analytics.setupDynamicObjectIDs = new Function(""
    + "var s=this;if(!s.doi){s.doi=1;if(s.apv>3&&(!s.isie||!s.ismac||s.apv"
    + ">=5)){if(s.wd.attachEvent)s.wd.attachEvent('onload',s.setOIDs);else"
    + " if(s.wd.addEventListener)s.wd.addEventListener('load',s.setOIDs,fa"
    + "lse);else{s.doiol=s.wd.onload;s.wd.onload=s.setOIDs}}s.wd.s_semapho"
    + "re=1}");
s_analytics.setOIDs = new Function("e", ""
    + "var s=s_c_il[" + s_analytics._in + "],b=s.eh(s.wd,'onload'),o='onclick',l,u,c,x,i"
    + ",a=new Array;if(s.doiol){if(b)s[b]=s.wd[b];s.doiol(e)}if(s.d.links)"
    + "{for(i=0;i<s.d.links.length;i++){l=s.d.links[i];c=l[o]?''+l[o]:'';b"
    + "=s.eh(l,o);z=l[b]?''+l[b]:'';u=s.getObjectID(l);if(u&&c.indexOf('s_"
    + "objectID')<0&&z.indexOf('s_objectID')<0){u=s.repl(u,'\"','').substri"
    + "ng(0,97);l.s_oc=l[o];a[u]=a[u]?a[u]+1:1;x='s_objectID=\"'+u+'_'+a[u"
    + "]+'\";return this.s_oc?this.s_oc(e):true';if(s.isns&&s.apv>=5)l.set"
    + "Attribute(o,x);l[o]=new Function('e',x)}}}s.wd.s_semaphore=0;return"
    + " true");


/*
 * Plugin: getNewRepeat 1.0 - Return whether user is new or repeat
 */
s_analytics.getNewRepeat = new Function(""
    + "var s=this,e=new Date(),cval,ct=e.getTime(),y=e.getYear();e.setTime"
    + "(ct+30*24*60*60*1000);cval=s.c_r('s_nr');if(cval.length==0){s.c_w("
    + "'s_nr',ct,e);return 'New';}if(cval.length!=0&&ct-cval<30*60*1000){s"
    + ".c_w('s_nr',ct,e);return 'New';}if(cval<1123916400001){e.setTime(cv"
    + "al+30*24*60*60*1000);s.c_w('s_nr',ct,e);return 'Repeat';}else retur"
    + "n 'Repeat';");


/*
 * Plugin: Days since last Visit 1.0.H - capture time from last visit
 */
s_analytics.getDaysSinceLastVisit = new Function(""
    + "var s=this,e=new Date(),cval,ct=e.getTime(),c='s_lastvisit',day=24*"
    + "60*60*1000;e.setTime(ct+3*365*day);cval=s.c_r(c);if(!cval){s.c_w(c,"
    + "ct,e);return 'First page view or cookies not supported';}else{var d"
    + "=ct-cval;if(d>30*60*1000){if(d>30*day){s.c_w(c,ct,e);return 'More t"
    + "han 30 days';}if(d<30*day+1 && d>7*day){s.c_w(c,ct,e);return 'More "
    + "than 7 days';}if(d<7*day+1 && d>day){s.c_w(c,ct,e);return 'Less tha"
    + "n 7 days';}if(d<day+1){s.c_w(c,ct,e);return 'Less than 1 day';}}els"
    + "e return '';}"
);


/*
 * Plugin Utility: apl v1.1
 */
s_analytics.apl = new Function("L", "v", "d", "u", ""
    + "var s=this,m=0;if(!L)L='';if(u){var i,n,a=s.split(L,d);for(i=0;i<a."
    + "length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
    + "e()));}}if(!m)L=L?L+d+v:v;return L");


/* Configure Modules and Plugins */

s_analytics.getSecondsConsumed=new Function("e","l","p","c",""
    +"var s=this,x=new Date,d=x,r,k,i,j,J,w,K;x.setTime(x.getTime()+18600"
    +"00);c=c?c:'s_gsc';if(typeof(s.linkType)=='undefined'||l==1){k=s.c_r"
    +"(c);if(k){r=(d.getTime()-k)/1000;r=Math.round(r);if(r>0&&r<=1860){p"
    +"=p?p:0;if(p==0&&s.events){j=s.split(s.events,',');for(w=0;w<j.lengt"
    +"h;w++){J=j[w].indexOf(e+'=')>-1?1:0;j[w]=J==1?'':j[w];}s.events=j.t"
    +"oString();if(s.events.charAt(s.events.length-1)==',')s.events=s.eve"
    +"nts.substring(0,s.events.length-1);}else{s.events='';}if(l==1){if(!"
    +"s.inList('events',s.linkTrackVars)){if(s.inList('None',s.linkTrackV"
    +"ars))s.linkTrackVars='events';else s.linkTrackVars=s.apl(s.linkTrac"
    +"kVars,'events',',',2);}if(!s.inList(e,s.linkTrackEvents)){if(s.inLi"
    +"st('None',s.linkTrackEvents))s.linkTrackEvents=e;else s.linkTrackEv"
    +"ents=s.apl(s.linkTrackEvents,e,',',2);}}r=r.toString();r=e+'='+r;s."
    +"events=s.apl(s.events,r,',',0);}}s.c_w(c,d.getTime(),x);}");
/*
 * Utility Function: split v1.5 - split a string (JS 1.0 compatible)
 */
s_analytics.split=new Function("l","d",""
    +"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
    +"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");
/*
 * Utility: inList v1.0 - find out if a value is in a list
 *
 */
s_analytics.inList=new Function("v","l","d",""
    +"var s=this,ar=Array(),i=0,d=(d)?d:',';if(typeof(l)=='string'){if(s."
    +"split)ar=s.split(l,d);else if(l.split)ar=l.split(d);else return-1}e"
    +"lse ar=l;while(i<ar.length){if(v==ar[i])return true;i++}return fals"
    +"e;");
/*
 * Plugin: exitLinkHandler 0.5 - identify and report exit links
 */
s_analytics.exitLinkHandler=new Function("p",""
    +"var s=this,h=s.p_gh(),n='linkInternalFilters',i,t;if(!h||(s.linkTyp"
    +"e&&(h||s.linkName)))return '';i=h.indexOf('?');t=s[n];s[n]=p?p:t;h="
    +"s.linkLeaveQueryString||i<0?h:h.substring(0,i);if(s.lt(h)=='e')s.li"
    +"nkType='e';else h='';s[n]=t;return h;");
/*
 * Utility Function: p_gh
 */
s_analytics.p_gh=new Function(""
    +"var s=this;if(!s.eo&&!s.lnk)return '';var o=s.eo?s.eo:s.lnk,y=s.ot("
    +"o),n=s.oid(o),x=o.s_oidt;if(s.eo&&o==s.eo){while(o&&!n&&y!='BODY'){"
    +"o=o.parentElement?o.parentElement:o.parentNode;if(!o)return '';y=s."
    +"ot(o);n=s.oid(o);x=o.s_oidt}}return o.href?o.href:'';");

/* WARNING: Changing any of the below variables will cause drastic
 changes to how your visitor data is collected.  Changes should only be
 made when instructed to do so by your account manager.*/
s_analytics.visitorNamespace = "nfl"
s_analytics.trackingServer = "metrics.nfl.com"
s_analytics.trackingServerSecure = "smetrics.nfl.com"
s_analytics.dc = 112

/*Config Video Variables*/

s_analytics.loadModule("Media")
s_analytics.Media.autoTrack=false
s_analytics.Media.trackWhilePlaying=true; 
s_analytics.Media.trackVars = "events,eVar7,eVar32,products,prop22,prop23,prop36,eVar25"; 
s_analytics.Media.trackEvents="event6,event7,event16,event17,event18,event21,event22";

var tracked25=false;
var tracked50=false;
var tracked75=false;
var fireRequest=false;

s_analytics.Media.monitor = function (s,media){ 
	if(media.mediaEvent == "PLAY"){ 
		lastOffsetPosition = media.offset; 
	} 
	if(media.mediaEvent == "MONITOR"){ 
		secondsHolder += media.offset-lastOffsetPosition; 
		lastOffsetPosition = media.offset; 
		if ((!tracked25) && (media.percent >= 25)){ 
			s_analytics.events = "event16"; 
			tracked25 = true; 
			fireRequest = true; 
		} 
		if ((!tracked50) && (media.percent >= 50)){ 
			s_analytics.events = "event17"; 
			tracked50 = true; 
			fireRequest = true; 
		} 
		if ((!tracked75) && (media.percent >= 75)){
			s_analytics.events = "event18"; 
			tracked75 = true; 
			fireRequest = true; 
		} 
		if(fireRequest){ 
			fireRequest = false; 
			s_analytics.products=";;;;event21=" + Math.round(secondsHolder);
			s_analytics.events = s_analytics.apl(s_analytics.events,"event21",","); 
			sendRequest(); 
		} 
	} 
	if(media.mediaEvent=="OPEN") { 
		lastOffsetPosition= 0;
		s_analytics.eVar32= media.playerName;
		s_analytics.eVar7 = media.name;
		s_analytics.events="event6"; 
		s_analytics.prop23= s_analytics.prop22 + ":" + media.playerName;
		tracked25=false;
		tracked50=false;
		tracked75=false;
		sendRequest(); 
	} 
	if(media.mediaEvent=="CLOSE" && (media.percent < 98)) { 
		s_analytics.products=";;;;event21=" + Math.round(secondsHolder); 
		s_analytics.events = s_analytics.apl(s_analytics.events,"event21",",");
		s_analytics.events = s_analytics.apl(s_analytics.events,"event22",","); 
		sendRequest(); 
	}
	if((media.mediaEvent=="CLOSE") && (media.percent >= 98)) { 
		s_analytics.products=";;;;event21=" + Math.round(secondsHolder); 
		s_analytics.events = s_analytics.apl(s_analytics.events,"event21",","); 
		s_analytics.events = s_analytics.apl(s_analytics.events,"event7",","); 
		sendRequest(); 
	}
	if(media.mediaEvent=="STOP"){
		secondsHolder += media.offset-lastOffsetPosition; 
	} 
	function sendRequest(){ 
		s_analytics.Media.track(media.name);
		s_analytics.events=""; 
		s_analytics.products=""; 
		secondsHolder = 0; 
	}
}

/****************************** MODULES *****************************/
/* Module: Media */
s_analytics.m_Media_c="var m=s.m_i('Media');if(m.completeByCloseOffset==undefined)m.completeByCloseOffset=1;if(m.completeCloseOffsetThreshold==undefined)m.completeCloseOffsetThreshold=1;m.cn=function"
+"(n){var m=this;return m.s.rep(m.s.rep(m.s.rep(n,\"\\n\",''),\"\\r\",''),'--**--','')};m.open=function(n,l,p,b){var m=this,i=new Object,tm=new Date,a='',x;n=m.cn(n);if(!l)l=-1;if(n&&p){if(!m.l)m.l=n"
+"ew Object;if(m.l[n])m.close(n);if(b&&b.id)a=b.id;if(a)for (x in m.l)if(m.l[x]&&m.l[x].a==a)m.close(m.l[x].n);i.n=n;i.l=l;i.o=0;i.x=0;i.p=m.cn(m.playerName?m.playerName:p);i.a=a;i.t=0;i.ts=0;i.s=Mat"
+"h.floor(tm.getTime()/1000);i.lx=0;i.lt=i.s;i.lo=0;i.e='';i.to=-1;i.tc=0;i.fel=new Object;i.vt=0;i.sn=0;i.sx=\"\";i.sl=0;i.sg=0;i.sc=0;i.us=0;i.co=0;i.cot=0;i.lm=0;i.lom=0;m.l[n]=i}};m._delete=funct"
+"ion(n){var m=this,i;n=m.cn(n);i=m.l[n];m.l[n]=0;if(i&&i.m)clearTimeout(i.m.i)};m.close=function(n){this.e(n,0,-1)};m.play=function(n,o,sn,sx,sl){var m=this,i;i=m.e(n,1,o,sn,sx,sl);if(i&&!i.m){i.m=n"
+"ew Object;i.m.m=new Function('var m=s_c_il['+m._in+'],i;if(m.l){i=m.l[\"'+m.s.rep(i.n,'\"','\\\\\"')+'\"];if(i){if(i.lx==1)m.e(i.n,3,-1);i.m.i=setTimeout(i.m.m,1000)}}');i.m.m()}};m.complete=functi"
+"on(n,o){this.e(n,5,o)};m.stop=function(n,o){this.e(n,2,o)};m.track=function(n){this.e(n,4,-1)};m.bcd=function(vo,i){var m=this,ns='a.media.',v=vo.linkTrackVars,e=vo.linkTrackEvents,pe='m_i',pev3,c="
+"vo.contextData,x;c['a.contentType']='video';c[ns+'channel']=m.channel;c[ns+'name']=i.n;c[ns+'playerName']=i.p;if(i.l>0){c[ns+'length']=i.l;}c[ns+'timePlayed']=Math.floor(i.ts);if(!i.vt){c[ns+'view'"
+"]=true;pe='m_s';i.vt=1}if(i.sx){c[ns+'segmentNum']=i.sn;c[ns+'segment']=i.sx;if(i.sl>0)c[ns+'segmentLength']=i.sl;if(i.sc&&i.ts>0)c[ns+'segmentView']=true}if(!i.cot&&i.co){c[ns+\"complete\"]=true;i"
+".cot=1}if(i.lm>0)c[ns+'milestone']=i.lm;if(i.lom>0)c[ns+'offsetMilestone']=i.lom;if(v)for(x in c)v+=',contextData.'+x;pev3='video';vo.pe=pe;vo.pev3=pev3;var d=m.contextDataMapping,y,a,l,n;if(d){vo."
+"events2='';if(v)v+=',events';for(x in d){if(x.substring(0,ns.length)==ns)y=x.substring(ns.length);else y=\"\";a=d[x];if(typeof(a)=='string'){l=m.s.sp(a,',');for(n=0;n<l.length;n++){a=l[n];if(x==\"a"
+".contentType\"){if(v)v+=','+a;vo[a]=c[x]}else if(y){if(y=='view'||y=='segmentView'||y=='complete'||y=='timePlayed'){if(e)e+=','+a;if(c[x]){if(y=='timePlayed'){if(c[x])vo.events2+=(vo.events2?',':''"
+")+a+'='+c[x];}else if(c[x])vo.events2+=(vo.events2?',':'')+a}}else if(y=='segment'&&c[x+'Num']){if(v)v+=','+a;vo[a]=c[x+'Num']+':'+c[x]}else{if(v)v+=','+a;vo[a]=c[x]}}}}else if(y=='milestones'||y=="
+"'offsetMilestones'){x=x.substring(0,x.length-1);if(c[x]&&d[x+'s'][c[x]]){if(e)e+=','+d[x+'s'][c[x]];vo.events2+=(vo.events2?',':'')+d[x+'s'][c[x]]}}}vo.contextData=0}vo.linkTrackVars=v;vo.linkTrack"
+"Events=e};m.bpe=function(vo,i,x,o){var m=this,pe='m_o',pev3,d='--**--';pe='m_o';if(!i.vt){pe='m_s';i.vt=1}else if(x==4)pe='m_i';pev3=m.s.ape(i.n)+d+Math.floor(i.l>0?i.l:1)+d+m.s.ape(i.p)+d+Math.flo"
+"or(i.t)+d+i.s+d+(i.to>=0?'L'+Math.floor(i.to):'')+i.e+(x!=0&&x!=2?'L'+Math.floor(o):'');vo.pe=pe;vo.pev3=pev3};m.e=function(n,x,o,sn,sx,sl,pd){var m=this,i,tm=new Date,ts=Math.floor(tm.getTime()/10"
+"00),c,l,v=m.trackVars,e=m.trackEvents,ti=m.trackSeconds,tp=m.trackMilestones,to=m.trackOffsetMilestones,sm=m.segmentByMilestones,so=m.segmentByOffsetMilestones,z=new Array,j,t=1,w=new Object,x,ek,t"
+"c,vo=new Object;if(!m.channel)m.channel=m.s.wd.location.hostname;n=m.cn(n);i=n&&m.l&&m.l[n]?m.l[n]:0;if(i){if(o<0){if(i.lx==1&&i.lt>0)o=(ts-i.lt)+i.lo;else o=i.lo}if(i.l>0)o=o<i.l?o:i.l;if(o<0)o=0;"
+"i.o=o;if(i.l>0){i.x=(i.o/i.l)*100;i.x=i.x>100?100:i.x}if(i.lo<0)i.lo=o;tc=i.tc;w.name=n;w.length=i.l;w.openTime=new Date;w.openTime.setTime(i.s*1000);w.offset=i.o;w.percent=i.x;w.playerName=i.p;if("
+"i.to<0)w.mediaEvent=w.event='OPEN';else w.mediaEvent=w.event=(x==1?'PLAY':(x==2?'STOP':(x==3?'MONITOR':(x==4?'TRACK':(x==5?'COMPLETE':('CLOSE'))))));if(!pd){if(i.pd)pd=i.pd}else i.pd=pd;w.player=pd"
+";if(x>2||(x!=i.lx&&(x!=2||i.lx==1))) {if(!sx){sn=i.sn;sx=i.sx;sl=i.sl}if(x){if(x==1)i.lo=o;if((x<=3||x==5)&&i.to>=0){t=0;v=e=\"None\";if(i.to!=o){l=i.to;if(l>o){l=i.lo;if(l>o)l=o}z=tp?m.s.sp(tp,','"
+"):0;if(i.l>0&&z&&o>=l)for(j=0;j<z.length;j++){c=z[j]?parseFloat(''+z[j]):0;if(c&&(l/i.l)*100<c&&i.x>=c){t=1;j=z.length;w.mediaEvent=w.event='MILESTONE';i.lm=w.milestone=c}}z=to?m.s.sp(to,','):0;if("
+"z&&o>=l)for(j=0;j<z.length;j++){c=z[j]?parseFloat(''+z[j]):0;if(c&&l<c&&o>=c){t=1;j=z.length;w.mediaEvent=w.event='OFFSET_MILESTONE';i.lom=w.offsetMilestone=c}}}}if(i.sg||!sx){if(sm&&tp&&i.l>0){z=m"
+".s.sp(tp,',');if(z){z[z.length]='100';l=0;for(j=0;j<z.length;j++){c=z[j]?parseFloat(''+z[j]):0;if(c){if(i.x<c){sn=j+1;sx='M:'+l+'-'+c;j=z.length}l=c}}}}else if(so&&to){z=m.s.sp(to,',');if(z){z[z.le"
+"ngth]=''+(i.l>0?i.l:'E');l=0;for(j=0;j<z.length;j++){c=z[j]?parseFloat(''+z[j]):0;if(c||z[j]=='E'){if(o<c||z[j]=='E'){sn=j+1;sx='O:'+l+'-'+c;j=z.length}l=c}}}}if(sx)i.sg=1}if((sx||i.sx)&&sx!=i.sx){"
+"i.us=1;if(!i.sx){i.sn=sn;i.sx=sx}if(i.to>=0)t=1}if((x>=2||i.x>=100)&&i.lo<o){i.t+=o-i.lo;i.ts+=o-i.lo}if(x<=2||(x==3&&!i.lx)){i.e+=(x==1||x==3?'S':'E')+Math.floor(o);i.lx=(x==3?1:x)}if(!t&&i.to>=0&"
+"&x<=3){ti=ti?ti:0;if(ti&&i.ts>=ti){t=1;w.mediaEvent=w.event='SECONDS'}}i.lt=ts;i.lo=o}if(!x||(x<=3&&i.x>=100)){if(i.lx!=2)i.e+='E'+Math.floor(o);x=0;v=e=\"None\";w.mediaEvent=w.event=\"CLOSE\"}if(x"
+"==5||(m.completeByCloseOffset&&(!x||i.x>=100)&&i.l>0&&o>=i.l-m.completeCloseOffsetThreshold)){w.complete=i.co=1;t=1}ek=w.mediaEvent;if(ek=='MILESTONE')ek+='_'+w.milestone;else if(ek=='OFFSET_MILEST"
+"ONE')ek+='_'+w.offsetMilestone;if(!i.fel[ek]) {w.eventFirstTime=true;i.fel[ek]=1}else w.eventFirstTime=false;w.timePlayed=i.t;w.segmentNum=i.sn;w.segment=i.sx;w.segmentLength=i.sl;if(m.monitor&&x!="
+"4)m.monitor(m.s,w);if(x==0)m._delete(n);if(t&&i.tc==tc){vo=new Object;vo.contextData=new Object;vo.linkTrackVars=v;vo.linkTrackEvents=e;if(!vo.linkTrackVars)vo.linkTrackVars='';if(!vo.linkTrackEven"
+"ts)vo.linkTrackEvents='';if(m.trackUsingContextData)m.bcd(vo,i);else m.bpe(vo,i,x,o);m.s.t(vo);if(i.us){i.sn=sn;i.sx=sx;i.sc=1;i.us=0}else if(i.ts>0)i.sc=0;i.e=\"\";i.lm=i.lom=0;i.ts-=Math.floor(i."
+"ts);i.to=o;i.tc++}}}return i};m.ae=function(n,l,p,x,o,sn,sx,sl,pd,b){var m=this,r=0;if(n&&(!m.autoTrackMediaLengthRequired||(length&&length>0)) &&p){if(!m.l||!m.l[n]){if(x==1||x==3){m.open(n,l,p,b)"
+";r=1}}else r=1;if(r)m.e(n,x,o,sn,sx,sl,pd)}};m.a=function(o,t){var m=this,i=o.id?o.id:o.name,n=o.name,p=0,v,c,c1,c2,xc=m.s.h,x,e,f1,f2='s_media_'+m._in+'_oc',f3='s_media_'+m._in+'_t',f4='s_media_'+"
+"m._in+'_s',f5='s_media_'+m._in+'_l',f6='s_media_'+m._in+'_m',f7='s_media_'+m._in+'_c',tcf,w;if(!i){if(!m.c)m.c=0;i='s_media_'+m._in+'_'+m.c;m.c++}if(!o.id)o.id=i;if(!o.name)o.name=n=i;if(!m.ol)m.ol"
+"=new Object;if(m.ol[i])return;m.ol[i]=o;if(!xc)xc=m.s.b;tcf=new Function('o','var e,p=0;try{if(o.versionInfo&&o.currentMedia&&o.controls)p=1}catch(e){p=0}return p');p=tcf(o);if(!p){tcf=new Function"
+"('o','var e,p=0,t;try{t=o.GetQuickTimeVersion();if(t)p=2}catch(e){p=0}return p');p=tcf(o);if(!p){tcf=new Function('o','var e,p=0,t;try{t=o.GetVersionInfo();if(t)p=3}catch(e){p=0}return p');p=tcf(o)"
+"}}v=\"var m=s_c_il[\"+m._in+\"],o=m.ol['\"+i+\"']\";if(p==1){p='Windows Media Player '+o.versionInfo;c1=v+',n,p,l,x=-1,cm,c,mn;if(o){cm=o.currentMedia;c=o.controls;if(cm&&c){mn=cm.name?cm.name:c.UR"
+"L;l=cm.duration;p=c.currentPosition;n=o.playState;if(n){if(n==8)x=0;if(n==3)x=1;if(n==1||n==2||n==4||n==5||n==6)x=2;}';c2='if(x>=0)m.ae(mn,l,\"'+p+'\",x,x!=2?p:-1,0,\"\",0,0,o)}}';c=c1+c2;if(m.s.is"
+"ie&&xc){x=m.s.d.createElement('script');x.language='jscript';x.type='text/javascript';x.htmlFor=i;x.event='PlayStateChange(NewState)';x.defer=true;x.text=c;xc.appendChild(x);o[f6]=new Function(c1+'"
+"if(n==3){x=3;'+c2+'}setTimeout(o.'+f6+',5000)');o[f6]()}}if(p==2){p='QuickTime Player '+(o.GetIsQuickTimeRegistered()?'Pro ':'')+o.GetQuickTimeVersion();f1=f2;c=v+',n,x,t,l,p,p2,mn;if(o){mn=o.GetMo"
+"vieName()?o.GetMovieName():o.GetURL();n=o.GetRate();t=o.GetTimeScale();l=o.GetDuration()/t;p=o.GetTime()/t;p2=o.'+f5+';if(n!=o.'+f4+'||p<p2||p-p2>5){x=2;if(n!=0)x=1;else if(p>=l)x=0;if(p<p2||p-p2>5"
+")m.ae(mn,l,\"'+p+'\",2,p2,0,\"\",0,0,o);m.ae(mn,l,\"'+p+'\",x,x!=2?p:-1,0,\"\",0,0,o)}if(n>0&&o.'+f7+'>=10){m.ae(mn,l,\"'+p+'\",3,p,0,\"\",0,0,o);o.'+f7+'=0}o.'+f7+'++;o.'+f4+'=n;o.'+f5+'=p;setTime"
+"out(\"'+v+';o.'+f2+'(0,0)\",500)}';o[f1]=new Function('a','b',c);o[f4]=-1;o[f7]=0;o[f1](0,0)}if(p==3){p='RealPlayer '+o.GetVersionInfo();f1=n+'_OnPlayStateChange';c1=v+',n,x=-1,l,p,mn;if(o){mn=o.Ge"
+"tTitle()?o.GetTitle():o.GetSource();n=o.GetPlayState();l=o.GetLength()/1000;p=o.GetPosition()/1000;if(n!=o.'+f4+'){if(n==3)x=1;if(n==0||n==2||n==4||n==5)x=2;if(n==0&&(p>=l||p==0))x=0;if(x>=0)m.ae(m"
+"n,l,\"'+p+'\",x,x!=2?p:-1,0,\"\",0,0,o)}if(n==3&&(o.'+f7+'>=10||!o.'+f3+')){m.ae(mn,l,\"'+p+'\",3,p,0,\"\",0,0,o);o.'+f7+'=0}o.'+f7+'++;o.'+f4+'=n;';c2='if(o.'+f2+')o.'+f2+'(o,n)}';if(m.s.wd[f1])o["
+"f2]=m.s.wd[f1];m.s.wd[f1]=new Function('a','b',c1+c2);o[f1]=new Function('a','b',c1+'setTimeout(\"'+v+';o.'+f1+'(0,0)\",o.'+f3+'?500:5000);'+c2);o[f4]=-1;if(m.s.isie)o[f3]=1;o[f7]=0;o[f1](0,0)}};m."
+"as=new Function('e','var m=s_c_il['+m._in+'],l,n;if(m.autoTrack&&m.s.d.getElementsByTagName){l=m.s.d.getElementsByTagName(m.s.isie?\"OBJECT\":\"EMBED\");if(l)for(n=0;n<l.length;n++)m.a(l[n]);}');if"
+"(s.wd.attachEvent)s.wd.attachEvent('onload',m.as);else if(s.wd.addEventListener)s.wd.addEventListener('load',m.as,false);if(m.onLoad)m.onLoad(s,m)";
s_analytics.m_i("Media");

s_analytics.loadModule("Integrate")
s_analytics.Integrate.onLoad=function(s,m){
var iosdetect=navigator.userAgent.match(/iPad|iPhone|iPod/i);
if (iosdetect==null) {
"function"!=typeof DIL&&(DIL=function(a,b){var d=[],c,e;a!==Object(a)&&(a={});var f,h,m,u,s,v,w,q,x,H,I;f=a.partner;h=a.containerNSID;m=a.iframeAttachmentDelay;u=!!a.disableDestinationPublishingIframe;s=a.iframeAkamaiHTTPS;v=a.mappings;w=a.uuidCookie;q=!0===a.enableErrorReporting;x=a.visitorService;H=a.declaredId;I=!0===a.removeFinishedScriptsAndCallbacks;var J,K,E,C;J=!0===a.disableScriptAttachment;K=!0===a.disableDefaultRequest;E=a.afterResultForDefaultRequest;C=a.dpIframeSrc;q&&DIL.errorModule.activate();
var L=!0===window._dil_unit_tests;(c=b)&&d.push(c+"");if(!f||"string"!=typeof f)return c="DIL partner is invalid or not specified in initConfig",DIL.errorModule.handleError({name:"error",message:c,filename:"dil.js"}),Error(c);c="DIL containerNSID is invalid or not specified in initConfig, setting to default of 0";if(h||"number"==typeof h)h=parseInt(h,10),!isNaN(h)&&0<=h&&(c="");c&&(h=0,d.push(c),c="");e=DIL.getDil(f,h);if(e instanceof DIL&&e.api.getPartner()==f&&e.api.getContainerNSID()==h)return e;
if(this instanceof DIL)DIL.registerDil(this,f,h);else return new DIL(a,"DIL was not instantiated with the 'new' operator, returning a valid instance with partner = "+f+" and containerNSID = "+h);var y={IS_HTTPS:"https:"==document.location.protocol,POST_MESSAGE_ENABLED:!!window.postMessage,COOKIE_MAX_EXPIRATION_DATE:"Tue, 19 Jan 2038 03:14:07 UTC"},F={stuffed:{}},n={},p={firingQueue:[],fired:[],firing:!1,sent:[],errored:[],reservedKeys:{sids:!0,pdata:!0,logdata:!0,callback:!0,postCallbackFn:!0,useImageRequest:!0},
callbackPrefix:"demdexRequestCallback",firstRequestHasFired:!1,useJSONP:!0,abortRequests:!1,num_of_jsonp_responses:0,num_of_jsonp_errors:0,num_of_img_responses:0,num_of_img_errors:0,toRemove:[],removed:[],readyToRemove:!1,platformParams:{d_nsid:h+"",d_rtbd:"json",d_jsonv:DIL.jsonVersion+"",d_dst:"1"},nonModStatsParams:{d_rtbd:!0,d_dst:!0,d_cts:!0,d_rs:!0},modStatsParams:null,adms:{TIME_TO_CATCH_ALL_REQUESTS_RELEASE:2E3,calledBack:!1,uuid:null,noVisitorAPI:!1,instance:null,releaseType:"no VisitorAPI",
admsProcessingStarted:!1,process:function(g){try{if(!this.admsProcessingStarted){var a=this,l,k,c,b,d;if("function"==typeof g&&"function"==typeof g.getInstance){if(x===Object(x)&&(l=x.namespace)&&"string"==typeof l)k=g.getInstance(l);else{this.releaseType="no namespace";this.releaseRequests();return}if(k===Object(k)&&"function"==typeof k.isAllowed&&"function"==typeof k.getGlobalVisitorID){if(!k.isAllowed()){this.releaseType="VisitorAPI not allowed";this.releaseRequests();return}this.instance=k;this.admsProcessingStarted=
!0;c=function(g){"VisitorAPI"!=a.releaseType&&(a.uuid=g,a.releaseType="VisitorAPI",a.releaseRequests())};L&&(b=x.server)&&"string"==typeof b&&(k.server=b);d=k.getGlobalVisitorID(c);if("string"==typeof d&&d.length){c(d);return}setTimeout(function(){"VisitorAPI"!=a.releaseType&&(a.releaseType="timeout",a.releaseRequests())},this.TIME_TO_CATCH_ALL_REQUESTS_RELEASE);return}this.releaseType="invalid instance"}else this.noVisitorAPI=!0;this.releaseRequests()}}catch(f){this.releaseRequests()}},releaseRequests:function(){this.calledBack=
!0;p.registerRequest()},getGlobalVisitorID:function(){return this.instance?this.instance.getGlobalVisitorID():null}},declaredId:{uuid:null,declaredId:{init:null,request:null},declaredIdCombos:{},dIdAlwaysOn:!1,dIdInRequest:!1,setDeclaredId:function(g,a){var l=t.isPopulatedString,k=encodeURIComponent;if(g===Object(g)&&l(a)){var c=g.dpid,d=g.dpuuid,b=null;if(l(c)&&l(d)){b=k(c)+"$"+k(d);if(!0===this.declaredIdCombos[b])return"setDeclaredId: combo exists for type '"+a+"'";this.declaredIdCombos[b]=!0;
this.declaredId[a]={dpid:c,dpuuid:d};"init"==a?this.dIdAlwaysOn=!0:"request"==a&&(this.dIdInRequest=!0);return"setDeclaredId: succeeded for type '"+a+"'"}}return"setDeclaredId: failed for type '"+a+"'"},getDeclaredIdQueryString:function(){var g=this.declaredId.request,a=this.declaredId.init,l="";null!==g?l="&d_dpid="+g.dpid+"&d_dpuuid="+g.dpuuid:null!==a&&(l="&d_dpid="+a.dpid+"&d_dpuuid="+a.dpuuid);return l},getUUIDQueryString:function(){var g=p.adms,a=t.isPopulatedString,l=!1,k=p.adms.getGlobalVisitorID();
a(this.uuid)?a(k)&&this.uuid!=k&&(this.uuid=k):this.uuid=k||g.uuid;if(this.dIdAlwaysOn||this.dIdInRequest)l=!0,this.dIdInRequest=!1;return a(this.uuid)&&l?"d_uuid="+this.uuid+"&":""}},registerRequest:function(g){var a=this.firingQueue;g===Object(g)&&a.push(g);!this.firing&&a.length&&(this.adms.calledBack?(g=a.shift(),g.src=g.src.replace(/demdex.net\/event\?d_nsid=/,"demdex.net/event?"+this.declaredId.getUUIDQueryString()+"d_nsid="),z.fireRequest(g),this.firstRequestHasFired||"script"!=g.tag||(this.firstRequestHasFired=
!0)):this.processVisitorAPI())},processVisitorAPI:function(){this.adms.process(window.Visitor)},requestRemoval:function(g){if(!I)return"removeFinishedScriptsAndCallbacks is not boolean true";var a=this.toRemove,l,k;g===Object(g)&&(l=g.script,k=g.callbackName,(l===Object(l)&&"SCRIPT"==l.nodeName||"no script created"==l)&&"string"==typeof k&&k.length&&a.push(g));if(this.readyToRemove&&a.length){k=a.shift();l=k.script;k=k.callbackName;"no script created"!=l?(g=l.src,l.parentNode.removeChild(l)):g=l;
window[k]=null;try{delete window[k]}catch(c){}this.removed.push({scriptSrc:g,callbackName:k});DIL.variables.scriptsRemoved.push(g);DIL.variables.callbacksRemoved.push(k);return this.requestRemoval()}return"requestRemoval() processed"}};e=function(){var g="http://fast.",a="?d_nsid="+h+"#"+encodeURIComponent(document.location.href);if("string"===typeof C&&C.length)return C+a;y.IS_HTTPS&&(g=!0===s?"https://fast.":"https://");return g+f+".demdex.net/dest4.html"+a};var A={THROTTLE_START:3E4,throttleTimerSet:!1,
id:"destination_publishing_iframe_"+f+"_"+h,url:e(),iframe:null,iframeHasLoaded:!1,sendingMessages:!1,messages:[],messagesPosted:[],messageSendingInterval:y.POST_MESSAGE_ENABLED?15:100,jsonProcessed:[],attachIframe:function(){var g=this,a=document.createElement("iframe");a.id=this.id;a.style.cssText="display: none; width: 0; height: 0;";a.src=this.url;r.addListener(a,"load",function(){g.iframeHasLoaded=!0;g.requestToProcess()});document.body.appendChild(a);this.iframe=a},requestToProcess:function(g,
a){var l=this;g&&!t.isEmptyObject(g)&&this.process(g,a);this.iframeHasLoaded&&this.messages.length&&!this.sendingMessages&&(this.throttleTimerSet||(this.throttleTimerSet=!0,setTimeout(function(){l.messageSendingInterval=y.POST_MESSAGE_ENABLED?15:150},this.THROTTLE_START)),this.sendingMessages=!0,this.sendMessages())},process:function(g,a){var l=encodeURIComponent,k,c,d,b,f,e;a===Object(a)&&(e=r.encodeAndBuildRequest([p.declaredId.uuid||"",a.dpid||"",a.dpuuid||""],","));if((k=g.dests)&&k instanceof
Array&&(c=k.length))for(d=0;d<c;d++)b=k[d],b=[l("dests"),l(b.id||""),l(b.y||""),l(b.c||"")],this.addMessage(b.join("|"));if((k=g.ibs)&&k instanceof Array&&(c=k.length))for(d=0;d<c;d++)b=k[d],b=[l("ibs"),l(b.id||""),l(b.tag||""),r.encodeAndBuildRequest(b.url||[],","),l(b.ttl||""),"",e],this.addMessage(b.join("|"));if((k=g.dpcalls)&&k instanceof Array&&(c=k.length))for(d=0;d<c;d++)b=k[d],f=b.callback||{},f=[f.obj||"",f.fn||"",f.key||"",f.tag||"",f.url||""],b=[l("dpm"),l(b.id||""),l(b.tag||""),r.encodeAndBuildRequest(b.url||
[],","),l(b.ttl||""),r.encodeAndBuildRequest(f,","),e],this.addMessage(b.join("|"));this.jsonProcessed.push(g)},addMessage:function(g){var a=encodeURIComponent,a=q?a("---destpub-debug---"):a("---destpub---");this.messages.push(a+g)},sendMessages:function(){var g=this,a;this.messages.length?(a=this.messages.shift(),DIL.xd.postMessage(a,this.url,this.iframe.contentWindow),this.messagesPosted.push(a),setTimeout(function(){g.sendMessages()},this.messageSendingInterval)):this.sendingMessages=!1}},G={traits:function(g){t.isValidPdata(g)&&
(n.sids instanceof Array||(n.sids=[]),r.extendArray(n.sids,g));return this},pixels:function(g){t.isValidPdata(g)&&(n.pdata instanceof Array||(n.pdata=[]),r.extendArray(n.pdata,g));return this},logs:function(g){t.isValidLogdata(g)&&(n.logdata!==Object(n.logdata)&&(n.logdata={}),r.extendObject(n.logdata,g));return this},customQueryParams:function(g){t.isEmptyObject(g)||r.extendObject(n,g,p.reservedKeys);return this},signals:function(g,a){var b,d=g;if(!t.isEmptyObject(d)){if(a&&"string"==typeof a)for(b in d=
{},g)g.hasOwnProperty(b)&&(d[a+b]=g[b]);r.extendObject(n,d,p.reservedKeys)}return this},declaredId:function(g){p.declaredId.setDeclaredId(g,"request");return this},result:function(g){"function"==typeof g&&(n.callback=g);return this},afterResult:function(g){"function"==typeof g&&(n.postCallbackFn=g);return this},useImageRequest:function(){n.useImageRequest=!0;return this},clearData:function(){n={};return this},submit:function(){z.submitRequest(n);n={};return this},getPartner:function(){return f},getContainerNSID:function(){return h},
getEventLog:function(){return d},getState:function(){var g={},a={};r.extendObject(g,p,{callbackPrefix:!0,useJSONP:!0,registerRequest:!0});r.extendObject(a,A,{attachIframe:!0,requestToProcess:!0,process:!0,sendMessages:!0});return{pendingRequest:n,otherRequestInfo:g,destinationPublishingInfo:a}},idSync:function(g){if(g!==Object(g)||"string"!=typeof g.dpid||!g.dpid.length)return"Error: config or config.dpid is empty";if("string"!=typeof g.url||!g.url.length)return"Error: config.url is empty";var a=
g.url,b=g.minutesToLive,d=encodeURIComponent,c=p.declaredId,a=a.replace(/^https:/,"").replace(/^http:/,"");if("undefined"==typeof b)b=20160;else if(b=parseInt(b,10),isNaN(b)||0>=b)return"Error: config.minutesToLive needs to be a positive number";c=r.encodeAndBuildRequest([p.adms.getGlobalVisitorID()||c.uuid||"",g.dpid,g.dpuuid||""],",");g=["ibs",d(g.dpid),"img",d(a),b,"",c];A.addMessage(g.join("|"));p.firstRequestHasFired&&A.requestToProcess();return"Successfully queued"},aamIdSync:function(a){if(a!==
Object(a)||"string"!=typeof a.dpuuid||!a.dpuuid.length)return"Error: config or config.dpuuid is empty";a.url="//dpm.demdex.net/ibs:dpid="+a.dpid+"&dpuuid="+a.dpuuid;return this.idSync(a)},passData:function(a){if(t.isEmptyObject(a))return"Error: json is empty or not an object";z.defaultCallback(a);return"json submitted for processing"},getPlatformParams:function(){return p.platformParams},getEventCallConfigParams:function(){var a=p,b=a.modStatsParams,d=a.platformParams,c;if(!b){b={};for(c in d)d.hasOwnProperty(c)&&
!a.nonModStatsParams[c]&&(b[c.replace(/^d_/,"")]=d[c]);a.modStatsParams=b}return b}},z={submitRequest:function(a){p.registerRequest(z.createQueuedRequest(a));return!0},createQueuedRequest:function(a){var b=p,d,c=a.callback,e="img";if(!t.isEmptyObject(v)){var B,q,s;for(B in v)v.hasOwnProperty(B)&&(q=v[B],null!=q&&""!==q&&B in a&&!(q in a||q in p.reservedKeys)&&(s=a[B],null!=s&&""!==s&&(a[q]=s)))}t.isValidPdata(a.sids)||(a.sids=[]);t.isValidPdata(a.pdata)||(a.pdata=[]);t.isValidLogdata(a.logdata)||
(a.logdata={});a.logdataArray=r.convertObjectToKeyValuePairs(a.logdata,"=",!0);a.logdataArray.push("_ts="+(new Date).getTime());"function"!=typeof c&&(c=this.defaultCallback);if(b.useJSONP=!a.useImageRequest||"boolean"!=typeof a.useImageRequest)e="script",d=b.callbackPrefix+"_"+f+"_"+h+"_"+(new Date).getTime();return{tag:e,src:z.makeRequestSrc(a,d),internalCallbackName:d,callbackFn:c,postCallbackFn:a.postCallbackFn,useImageRequest:a.useImageRequest,requestData:a}},defaultCallback:function(a,b){var d,
c,f,e,h,q,s,v,m;if((d=a.stuff)&&d instanceof Array&&(c=d.length))for(f=0;f<c;f++)if((e=d[f])&&e===Object(e)){h=e.cn;q=e.cv;s=e.ttl;if("undefined"==typeof s||""===s)s=Math.floor(r.getMaxCookieExpiresInMinutes()/60/24);v=e.dmn||"."+document.domain.replace(/^www\./,"");m=e.type;h&&(q||"number"==typeof q)&&("var"!=m&&(s=parseInt(s,10))&&!isNaN(s)&&r.setCookie(h,q,1440*s,"/",v,!1),F.stuffed[h]=q)}d=a.uuid;c=p.declaredId;f=t.isPopulatedString;f(d)&&(f(c.uuid)||(c.uuid=d),t.isEmptyObject(w)||(c=w.path,"string"==
typeof c&&c.length||(c="/"),f=parseInt(w.days,10),isNaN(f)&&(f=100),r.setCookie(w.name||"aam_did",d,1440*f,c,w.domain||"."+document.domain.replace(/^www\./,""),!0===w.secure)));u||p.abortRequests||A.requestToProcess(a,b)},makeRequestSrc:function(a,b){a.sids=t.removeEmptyArrayValues(a.sids||[]);a.pdata=t.removeEmptyArrayValues(a.pdata||[]);var d=p,c=d.platformParams,e=r.encodeAndBuildRequest(a.sids,","),h=r.encodeAndBuildRequest(a.pdata,","),q=(a.logdataArray||[]).join("&");delete a.logdataArray;var s=
y.IS_HTTPS?"https://":"http://",v=d.declaredId.getDeclaredIdQueryString(),m;m=[];var n,w,x,u;for(n in a)if(!(n in d.reservedKeys)&&a.hasOwnProperty(n))if(w=a[n],n=encodeURIComponent(n),w instanceof Array)for(x=0,u=w.length;x<u;x++)m.push(n+"="+encodeURIComponent(w[x]));else m.push(n+"="+encodeURIComponent(w));m=m.length?"&"+m.join("&"):"";return s+f+".demdex.net/event?d_nsid="+c.d_nsid+v+(e.length?"&d_sid="+e:"")+(h.length?"&d_px="+h:"")+(q.length?"&d_ld="+encodeURIComponent(q):"")+m+(d.useJSONP?
"&d_rtbd="+c.d_rtbd+"&d_jsonv="+c.d_jsonv+"&d_dst="+c.d_dst+"&d_cb="+(b||""):"")},fireRequest:function(a){if("img"==a.tag)this.fireImage(a);else if("script"==a.tag){var b=p.declaredId,b=b.declaredId.request||b.declaredId.init||{};this.fireScript(a,{dpid:b.dpid||"",dpuuid:b.dpuuid||""})}},fireImage:function(a){var b=p,f,e;b.abortRequests||(b.firing=!0,f=new Image(0,0),b.sent.push(a),f.onload=function(){b.firing=!1;b.fired.push(a);b.num_of_img_responses++;b.registerRequest()},e=function(f){c="imgAbortOrErrorHandler received the event of type "+
f.type;d.push(c);b.abortRequests=!0;b.firing=!1;b.errored.push(a);b.num_of_img_errors++;b.registerRequest()},f.addEventListener?(f.addEventListener("error",e,!1),f.addEventListener("abort",e,!1)):f.attachEvent&&(f.attachEvent("onerror",e),f.attachEvent("onabort",e)),f.src=a.src)},fireScript:function(a,b){var e=this,k=p,h,q,s=a.src,m=a.postCallbackFn,v="function"==typeof m,n=a.internalCallbackName;k.abortRequests||(k.firing=!0,window[n]=function(e){try{e!==Object(e)&&(e={});var l=a.callbackFn;k.firing=
!1;k.fired.push(a);k.num_of_jsonp_responses++;l(e,b);v&&m(e,b)}catch(h){h.message="DIL jsonp callback caught error with message "+h.message;c=h.message;d.push(c);h.filename=h.filename||"dil.js";h.partner=f;DIL.errorModule.handleError(h);try{l({error:h.name+"|"+h.message}),v&&m({error:h.name+"|"+h.message})}catch(s){}}finally{k.requestRemoval({script:q,callbackName:n}),k.registerRequest()}},J?(k.firing=!1,k.requestRemoval({script:"no script created",callbackName:n})):(q=document.createElement("script"),
q.addEventListener&&q.addEventListener("error",function(b){k.requestRemoval({script:q,callbackName:n});c="jsonp script tag error listener received the event of type "+b.type+" with src "+s;e.handleScriptError(c,a)},!1),q.type="text/javascript",q.src=s,h=DIL.variables.scriptNodeList[0],h.parentNode.insertBefore(q,h)),k.sent.push(a),k.declaredId.declaredId.request=null)},handleScriptError:function(a,b){var c=p;d.push(a);c.abortRequests=!0;c.firing=!1;c.errored.push(b);c.num_of_jsonp_errors++;c.registerRequest()}},
t={isValidPdata:function(a){return a instanceof Array&&this.removeEmptyArrayValues(a).length?!0:!1},isValidLogdata:function(a){return!this.isEmptyObject(a)},isEmptyObject:function(a){if(a!==Object(a))return!0;for(var b in a)if(a.hasOwnProperty(b))return!1;return!0},removeEmptyArrayValues:function(a){for(var b=0,c=a.length,d,f=[],b=0;b<c;b++)d=a[b],"undefined"!=typeof d&&null!=d&&f.push(d);return f},isPopulatedString:function(a){return"string"==typeof a&&a.length}},r={addListener:function(){if(document.addEventListener)return function(a,
b,d){a.addEventListener(b,function(a){"function"==typeof d&&d(a)},!1)};if(document.attachEvent)return function(a,b,d){a.attachEvent("on"+b,function(a){"function"==typeof d&&d(a)})}}(),convertObjectToKeyValuePairs:function(a,b,d){var c=[];b=b||"=";var f,e;for(f in a)e=a[f],"undefined"!=typeof e&&null!=e&&c.push(f+b+(d?encodeURIComponent(e):e));return c},encodeAndBuildRequest:function(a,b){return this.map(a,function(a){return encodeURIComponent(a)}).join(b)},map:function(a,b){if(Array.prototype.map)return a.map(b);
if(void 0===a||null===a)throw new TypeError;var d=Object(a),c=d.length>>>0;if("function"!==typeof b)throw new TypeError;for(var f=Array(c),e=0;e<c;e++)e in d&&(f[e]=b.call(b,d[e],e,d));return f},filter:function(a,b){if(!Array.prototype.filter){if(void 0===a||null===a)throw new TypeError;var d=Object(a),c=d.length>>>0;if("function"!==typeof b)throw new TypeError;for(var f=[],e=0;e<c;e++)if(e in d){var h=d[e];b.call(b,h,e,d)&&f.push(h)}return f}return a.filter(b)},getCookie:function(a){a+="=";var b=
document.cookie.split(";"),d,c,e;d=0;for(c=b.length;d<c;d++){for(e=b[d];" "==e.charAt(0);)e=e.substring(1,e.length);if(0==e.indexOf(a))return decodeURIComponent(e.substring(a.length,e.length))}return null},setCookie:function(a,b,d,c,e,f){var h=new Date;d&&(d*=6E4);document.cookie=a+"="+encodeURIComponent(b)+(d?";expires="+(new Date(h.getTime()+d)).toUTCString():"")+(c?";path="+c:"")+(e?";domain="+e:"")+(f?";secure":"")},extendArray:function(a,b){return a instanceof Array&&b instanceof Array?(Array.prototype.push.apply(a,
b),!0):!1},extendObject:function(a,b,d){var c;if(a===Object(a)&&b===Object(b)){for(c in b)!b.hasOwnProperty(c)||!t.isEmptyObject(d)&&c in d||(a[c]=b[c]);return!0}return!1},getMaxCookieExpiresInMinutes:function(){return((new Date(y.COOKIE_MAX_EXPIRATION_DATE)).getTime()-(new Date).getTime())/1E3/60}};"error"==f&&0==h&&r.addListener(window,"load",function(){DIL.windowLoaded=!0});var D=function(){N();u||p.abortRequests||A.attachIframe();p.readyToRemove=!0;p.requestRemoval()},N=function(){u||setTimeout(function(){K||
p.firstRequestHasFired||p.adms.admsProcessingStarted||p.adms.calledBack||("function"==typeof E?G.afterResult(E).submit():G.submit())},DIL.constants.TIME_TO_DEFAULT_REQUEST)},M=document;"error"!=f&&(DIL.windowLoaded?D():"complete"!=M.readyState&&"loaded"!=M.readyState?r.addListener(window,"load",D):DIL.isAddedPostWindowLoadWasCalled?r.addListener(window,"load",D):(m="number"==typeof m?parseInt(m,10):0,0>m&&(m=0),setTimeout(D,m||DIL.constants.TIME_TO_CATCH_ALL_DP_IFRAME_ATTACHMENT)));p.declaredId.setDeclaredId(H,
"init");this.api=G;this.getStuffedVariable=function(a){var b=F.stuffed[a];b||"number"==typeof b||(b=r.getCookie(a))||"number"==typeof b||(b="");return b};this.validators=t;this.helpers=r;this.constants=y;this.log=d;L&&(this.pendingRequest=n,this.requestController=p,this.setDestinationPublishingUrl=e,this.destinationPublishing=A,this.requestProcs=z,this.variables=F)},function(){var a=document,b;null==a.readyState&&a.addEventListener&&(a.readyState="loading",a.addEventListener("DOMContentLoaded",b=
function(){a.removeEventListener("DOMContentLoaded",b,!1);a.readyState="complete"},!1))}(),DIL.extendStaticPropertiesAndMethods=function(a){var b;if(a===Object(a))for(b in a)a.hasOwnProperty(b)&&(this[b]=a[b])},DIL.extendStaticPropertiesAndMethods({version:"4.8",jsonVersion:1,constants:{TIME_TO_DEFAULT_REQUEST:50,TIME_TO_CATCH_ALL_DP_IFRAME_ATTACHMENT:500},variables:{scriptNodeList:document.getElementsByTagName("script"),scriptsRemoved:[],callbacksRemoved:[]},windowLoaded:!1,dils:{},isAddedPostWindowLoadWasCalled:!1,
isAddedPostWindowLoad:function(a){this.isAddedPostWindowLoadWasCalled=!0;this.windowLoaded="function"==typeof a?!!a():"boolean"==typeof a?a:!0},create:function(a){try{return new DIL(a)}catch(b){return(new Image(0,0)).src="http://error.demdex.net/event?d_nsid=0&d_px=14137&d_ld=name%3Derror%26filename%3Ddil.js%26partner%3Dno_partner%26message%3DError%2520in%2520attempt%2520to%2520create%2520DIL%2520instance%2520with%2520DIL.create()%26_ts%3D"+(new Date).getTime(),Error("Error in attempt to create DIL instance with DIL.create()")}},
registerDil:function(a,b,d){b=b+"$"+d;b in this.dils||(this.dils[b]=a)},getDil:function(a,b){var d;"string"!=typeof a&&(a="");b||(b=0);d=a+"$"+b;return d in this.dils?this.dils[d]:Error("The DIL instance with partner = "+a+" and containerNSID = "+b+" was not found")},dexGetQSVars:function(a,b,d){b=this.getDil(b,d);return b instanceof this?b.getStuffedVariable(a):""},xd:{postMessage:function(a,b,d){var c=1;b&&(window.postMessage?d.postMessage(a,b.replace(/([^:]+:\/\/[^\/]+).*/,"$1")):b&&(d.location=
b.replace(/#.*$/,"")+"#"+ +new Date+c++ +"&"+a))}}}),DIL.errorModule=function(){var a=DIL.create({partner:"error",containerNSID:0,disableDestinationPublishingIframe:!0}),b={harvestererror:14138,destpuberror:14139,dpmerror:14140,generalerror:14137,error:14137,noerrortypedefined:15021,evalerror:15016,rangeerror:15017,referenceerror:15018,typeerror:15019,urierror:15020},d=!1;return{activate:function(){d=!0},handleError:function(c){if(!d)return"DIL error module has not been activated";c!==Object(c)&&
(c={});var e=c.name?(new String(c.name)).toLowerCase():"",f=[];c={name:e,filename:c.filename?c.filename+"":"",partner:c.partner?c.partner+"":"no_partner",site:c.site?c.site+"":document.location.href,message:c.message?c.message+"":""};f.push(e in b?b[e]:b.noerrortypedefined);a.api.pixels(f).logs(c).useImageRequest().submit();return"DIL error report sent"},pixelMap:b}}(),DIL.tools={},DIL.modules={helpers:{handleModuleError:function(a,b,d){var c="";b=b||"Error caught in DIL module/submodule: ";a===Object(a)?
c=b+(a.message||"err has no message"):(c=b+"err is not a valid object",a={});a.message=c;d instanceof DIL&&(a.partner=d.api.getPartner());DIL.errorModule.handleError(a);return this.errorMessage=c}}});
DIL.tools.getSearchReferrer=function(a,b){var d=DIL.getDil("error"),c=DIL.tools.decomposeURI(a||document.referrer),e="",f="",h={queryParam:"q"};return(e=d.helpers.filter([b===Object(b)?b:{},{hostPattern:/aol\./},{hostPattern:/ask\./},{hostPattern:/bing\./},{hostPattern:/google\./},{hostPattern:/yahoo\./,queryParam:"p"}],function(a){return!(!a.hasOwnProperty("hostPattern")||!c.hostname.match(a.hostPattern))}).shift())?{valid:!0,name:c.hostname,keywords:(d.helpers.extendObject(h,e),f=h.queryPattern?
(e=(""+c.search).match(h.queryPattern))?e[1]:"":c.uriParams[h.queryParam],decodeURIComponent(f||"").replace(/\+|%20/g," "))}:{valid:!1,name:"",keywords:""}};
DIL.tools.decomposeURI=function(a){var b=DIL.getDil("error"),d=document.createElement("a");d.href=a||document.referrer;return{hash:d.hash,host:d.host.split(":").shift(),hostname:d.hostname,href:d.href,pathname:d.pathname.replace(/^\//,""),protocol:d.protocol,search:d.search,uriParams:function(a,d){b.helpers.map(d.split("&"),function(b){b=b.split("=");a[b.shift()]=b.shift()});return a}({},d.search.replace(/^(\/|\?)?|\/$/g,""))}};
DIL.tools.getMetaTags=function(){var a={},b=document.getElementsByTagName("meta"),d,c,e,f,h;d=0;for(e=arguments.length;d<e;d++)if(f=arguments[d],null!==f)for(c=0;c<b.length;c++)if(h=b[c],h.name==f){a[f]=h.content;break}return a};
DIL.modules.siteCatalyst={dil:null,handle:DIL.modules.helpers.handleModuleError,init:function(a,b,d){try{var c=this,e={name:"DIL Site Catalyst Module Error"},f=function(a){e.message=a;DIL.errorModule.handleError(e);return a};this.dil=null;if(b instanceof DIL)this.dil=b;else return f("dilInstance is not a valid instance of DIL");e.partner=b.api.getPartner();if(a!==Object(a))return f("siteCatalystReportingSuite is not an object");window.AppMeasurement_Module_DIL=a.m_DIL=function(a){var b="function"===
typeof a.m_i?a.m_i("DIL"):this;if(b!==Object(b))return f("m is not an object");b.trackVars=c.constructTrackVars(d);b.d=0;b.s=a;b._t=function(){var a,b,d=","+this.trackVars+",",c=this.s,e,h=[];e=[];var m={},u=!1;if(c!==Object(c))return f("Error in m._t function: s is not an object");if(this.d){if("function"==typeof c.foreachVar)c.foreachVar(function(a,b){m[a]=b;u=!0},this.trackVars);else{if(!(c.va_t instanceof Array))return f("Error in m._t function: s.va_t is not an array");if(c.lightProfileID)(a=
c.lightTrackVars)&&(a=","+a+","+c.vl_mr+",");else if(c.pe||c.linkType)a=c.linkTrackVars,c.pe&&(b=c.pe.substring(0,1).toUpperCase()+c.pe.substring(1),c[b]&&(a=c[b].trackVars)),a&&(a=","+a+","+c.vl_l+","+c.vl_l2+",");if(a){b=0;for(h=a.split(",");b<h.length;b++)0<=d.indexOf(","+h[b]+",")&&e.push(h[b]);e.length&&(d=","+e.join(",")+",")}e=0;for(b=c.va_t.length;e<b;e++)a=c.va_t[e],0<=d.indexOf(","+a+",")&&null!=c[a]&&""!==c[a]&&(m[a]=c[a],u=!0)}u&&this.d.api.signals(m,"c_").submit()}}};a.loadModule("DIL");
a.DIL.d=b;return e.message?e.message:"DIL.modules.siteCatalyst.init() completed with no errors"}catch(h){return this.handle(h,"DIL.modules.siteCatalyst.init() caught error with message ",this.dil)}},constructTrackVars:function(a){var b=[],d,c,e,f,h;if(a===Object(a)){d=a.names;if(d instanceof Array&&(e=d.length))for(c=0;c<e;c++)f=d[c],"string"==typeof f&&f.length&&b.push(f);a=a.iteratedNames;if(a instanceof Array&&(e=a.length))for(c=0;c<e;c++)if(d=a[c],d===Object(d)&&(f=d.name,h=parseInt(d.maxIndex,
10),"string"==typeof f&&f.length&&!isNaN(h)&&0<=h))for(d=0;d<=h;d++)b.push(f+d);if(b.length)return b.join(",")}return this.constructTrackVars({names:"pageName channel campaign products events pe pev1 pev2 pev3".split(" "),iteratedNames:[{name:"prop",maxIndex:75},{name:"eVar",maxIndex:75}]})}};
DIL.modules.GA={dil:null,arr:null,tv:null,errorMessage:"",defaultTrackVars:["_setAccount","_setCustomVar","_addItem","_addTrans","_trackSocial"],defaultTrackVarsObj:null,signals:{},hasSignals:!1,handle:DIL.modules.helpers.handleModuleError,init:function(a,b,d){try{this.tv=this.arr=this.dil=null;this.errorMessage="";this.signals={};this.hasSignals=!1;var c={name:"DIL GA Module Error"},e="";b instanceof DIL?(this.dil=b,c.partner=this.dil.api.getPartner()):(e="dilInstance is not a valid instance of DIL",
c.message=e,DIL.errorModule.handleError(c));a instanceof Array&&a.length?this.arr=a:(e="gaArray is not an array or is empty",c.message=e,DIL.errorModule.handleError(c));this.tv=this.constructTrackVars(d);this.errorMessage=e}catch(f){this.handle(f,"DIL.modules.GA.init() caught error with message ",this.dil)}finally{return this}},constructTrackVars:function(a){var b=[],d,c,e,f;if(this.defaultTrackVarsObj!==Object(this.defaultTrackVarsObj)){e=this.defaultTrackVars;f={};d=0;for(c=e.length;d<c;d++)f[e[d]]=
!0;this.defaultTrackVarsObj=f}else f=this.defaultTrackVarsObj;if(a===Object(a)){a=a.names;if(a instanceof Array&&(c=a.length))for(d=0;d<c;d++)e=a[d],"string"==typeof e&&e.length&&e in f&&b.push(e);if(b.length)return b}return this.defaultTrackVars},constructGAObj:function(a){var b={};a=a instanceof Array?a:this.arr;var d,c,e,f;d=0;for(c=a.length;d<c;d++)e=a[d],e instanceof Array&&e.length&&(e=[],f=a[d],e instanceof Array&&f instanceof Array&&Array.prototype.push.apply(e,f),f=e.shift(),"string"==typeof f&&
f.length&&(b[f]instanceof Array||(b[f]=[]),b[f].push(e)));return b},addToSignals:function(a,b){if("string"!=typeof a||""===a||null==b||""===b)return!1;this.signals[a]instanceof Array||(this.signals[a]=[]);this.signals[a].push(b);return this.hasSignals=!0},constructSignals:function(){var a=this.constructGAObj(),b={_setAccount:function(a){this.addToSignals("c_accountId",a)},_setCustomVar:function(a,b,c,d){"string"==typeof b&&b.length&&this.addToSignals("c_"+b,c)},_addItem:function(a,b,c,d,e,f){this.addToSignals("c_itemOrderId",
a);this.addToSignals("c_itemSku",b);this.addToSignals("c_itemName",c);this.addToSignals("c_itemCategory",d);this.addToSignals("c_itemPrice",e);this.addToSignals("c_itemQuantity",f)},_addTrans:function(a,b,c,d,e,f,h,m){this.addToSignals("c_transOrderId",a);this.addToSignals("c_transAffiliation",b);this.addToSignals("c_transTotal",c);this.addToSignals("c_transTax",d);this.addToSignals("c_transShipping",e);this.addToSignals("c_transCity",f);this.addToSignals("c_transState",h);this.addToSignals("c_transCountry",
m)},_trackSocial:function(a,b,c,d){this.addToSignals("c_socialNetwork",a);this.addToSignals("c_socialAction",b);this.addToSignals("c_socialTarget",c);this.addToSignals("c_socialPagePath",d)}},d=this.tv,c,e,f,h,m,u;c=0;for(e=d.length;c<e;c++)if(f=d[c],a.hasOwnProperty(f)&&b.hasOwnProperty(f)&&(u=a[f],u instanceof Array))for(h=0,m=u.length;h<m;h++)b[f].apply(this,u[h])},submit:function(){try{if(""!==this.errorMessage)return this.errorMessage;this.constructSignals();return this.hasSignals?(this.dil.api.signals(this.signals).submit(),
"Signals sent: "+this.dil.helpers.convertObjectToKeyValuePairs(this.signals,"=",!0)+this.dil.log):"No signals present"}catch(a){return this.handle(a,"DIL.modules.GA.submit() caught error with message ",this.dil)}},Stuffer:{LIMIT:5,dil:null,cookieName:null,delimiter:null,errorMessage:"",handle:DIL.modules.helpers.handleModuleError,callback:null,v:function(){return!1},init:function(a,b,d){try{this.callback=this.dil=null,this.errorMessage="",a instanceof DIL?(this.dil=a,this.v=this.dil.validators.isPopulatedString,
this.cookieName=this.v(b)?b:"aam_ga",this.delimiter=this.v(d)?d:"|"):this.handle({message:"dilInstance is not a valid instance of DIL"},"DIL.modules.GA.Stuffer.init() error: ")}catch(c){this.handle(c,"DIL.modules.GA.Stuffer.init() caught error with message ",this.dil)}finally{return this}},process:function(a){var b,d,c,e,f,h;h=!1;var m=1;if(a===Object(a)&&(b=a.stuff)&&b instanceof Array&&(d=b.length))for(a=0;a<d;a++)if((c=b[a])&&c===Object(c)&&(e=c.cn,f=c.cv,e==this.cookieName&&this.v(f))){h=!0;break}if(h){b=
f.split(this.delimiter);"undefined"==typeof window._gaq&&(window._gaq=[]);c=window._gaq;a=0;for(d=b.length;a<d&&!(h=b[a].split("="),f=h[0],h=h[1],this.v(f)&&this.v(h)&&c.push(["_setCustomVar",m++,f,h,1]),m>this.LIMIT);a++);this.errorMessage=1<m?"No errors - stuffing successful":"No valid values to stuff"}else this.errorMessage="Cookie name and value not found in json";if("function"==typeof this.callback)return this.callback()},submit:function(){try{var a=this;if(""!==this.errorMessage)return this.errorMessage;
this.dil.api.afterResult(function(b){a.process(b)}).submit();return"DIL.modules.GA.Stuffer.submit() successful"}catch(b){return this.handle(b,"DIL.modules.GA.Stuffer.submit() caught error with message ",this.dil)}}}};
DIL.modules.Peer39={aid:"",dil:null,optionals:null,errorMessage:"",calledBack:!1,script:null,scriptsSent:[],returnedData:[],handle:DIL.modules.helpers.handleModuleError,init:function(a,b,d){try{this.dil=null;this.errorMessage="";this.calledBack=!1;this.optionals=d===Object(d)?d:{};d={name:"DIL Peer39 Module Error"};var c=[],e="";this.isSecurePageButNotEnabled(document.location.protocol)&&(e="Module has not been enabled for a secure page",c.push(e),d.message=e,DIL.errorModule.handleError(d));b instanceof
DIL?(this.dil=b,d.partner=this.dil.api.getPartner()):(e="dilInstance is not a valid instance of DIL",c.push(e),d.message=e,DIL.errorModule.handleError(d));"string"==typeof a&&a.length?this.aid=a:(e="aid is not a string or is empty",c.push(e),d.message=e,DIL.errorModule.handleError(d));this.errorMessage=c.join("\n")}catch(f){this.handle(f,"DIL.modules.Peer39.init() caught error with message ",this.dil)}finally{return this}},isSecurePageButNotEnabled:function(a){return"https:"==a&&!0!==this.optionals.enableHTTPS?
!0:!1},constructSignals:function(){var a=this,b=this.constructScript(),d=DIL.variables.scriptNodeList[0];window["afterFinished_"+this.aid]=function(){try{var b=a.processData(p39_KVP_Short("c_p","|").split("|"));b.hasSignals&&a.dil.api.signals(b.signals).submit()}catch(d){}finally{a.calledBack=!0,"function"==typeof a.optionals.afterResult&&a.optionals.afterResult()}};d.parentNode.insertBefore(b,d);this.scriptsSent.push(b);return"Request sent to Peer39"},processData:function(a){var b,d,c,e,f={},h=!1;
this.returnedData.push(a);if(a instanceof Array)for(b=0,d=a.length;b<d;b++)c=a[b].split("="),e=c[0],c=c[1],e&&isFinite(c)&&!isNaN(parseInt(c,10))&&(f[e]instanceof Array||(f[e]=[]),f[e].push(c),h=!0);return{hasSignals:h,signals:f}},constructScript:function(){var a=document.createElement("script"),b=this.optionals,d=b.scriptId,c=b.scriptSrc,b=b.scriptParams;a.id="string"==typeof d&&d.length?d:"peer39ScriptLoader";a.type="text/javascript";"string"==typeof c&&c.length?a.src=c:(a.src=(this.dil.constants.IS_HTTPS?
"https:":"http:")+"//stags.peer39.net/"+this.aid+"/trg_"+this.aid+".js","string"==typeof b&&b.length&&(a.src+="?"+b));return a},submit:function(){try{return""!==this.errorMessage?this.errorMessage:this.constructSignals()}catch(a){return this.handle(a,"DIL.modules.Peer39.submit() caught error with message ",this.dil)}}};
var nDil = DIL.create({
	partner: 'nfl',
	uuidCookie:{
		name:'aam_did',
		days:30
   }
});
var _scDilObj = s_gi(s_account);
DIL.modules.siteCatalyst.init(_scDilObj, nDil, {
        names: ['pageName', 'channel', 'campaign', 'products', 'events', 'pe', 'referrer', 'server', 'purchaseID', 'zip', 'state'],
        iteratedNames: [{
               name: 'eVar',
               maxIndex: 75
        }, {
               name: 'prop',
               maxIndex: 75
        }, {
               name: 'pev',
               maxIndex: 3
        }, {
               name: 'hier',
               maxIndex: 4
        }]
});



if(nDil.helpers.getCookie('__tuuid'))
{
	var pID = nDil.helpers.getCookie('__tuuid');
	nDil.api.aamIdSync({
		dpid: '1267',
		dpuuid: pID,
		minutesToLive: 20160
	});
};

var sc = DIL.getDil('nfl').helpers.getCookie("esp_nfluk_token");
if(sc){
                                var jObj = JSON.parse(sc);
                                sc=jObj.uid.toString();
                                DIL.getDil('nfl').api.aamIdSync({
                                dpid:"12008",
                                dpuuid:sc,
                                minutesToLive:20160})
                                };

};

s_analytics.Integrate.add("ProclivityBrowseTags")
var wecCount = 0;
var wecCancel;
var proclivityVal = '';
var teamName = '';

s_analytics.Integrate.ProclivityBrowseTags.wecReady= function(){
	if(typeof wec == "undefined"){
		wecCount++;
		if(wecCount == 10)wecCancel = clearInterval(wecCancel)
	}
		
	if(typeof wec == "object"){
		wecCancel = clearInterval(wecCancel);
		wec.browse( { cat : proclivityVal } )		
	}
}
        
s.Integrate.ProclivityBrowseTags.useVars=function(s,p){

	var teamArray  = ["cardinals","falcons","bills","panthers","bears","bengals","browns","cowboys","broncos","lions","packers","texans","colts","jaguars","chiefs","dolphins","vikings","patriots","saints","giants","jets","raiders","eagles","steelers","chargers","49ers","seahawks","rams","buccaneers","titans","redskins","ravens"]
	var testDomain = document.domain;
	for(var i=0;i<teamArray.length;i++){
		if(testDomain.indexOf(teamArray[i]) > -1)teamName = teamArray[i]
	}

	if(teamName != ''){
		proclivityVal = teamName	
		if(s_analytics.channel != '' && typeof s_analytics.channel != "undefined"){
			proclivityVal = teamName + "_" + s_analytics.channel
		}
		proclivityVal = proclivityVal.replace("/","_");
		if(testDomain.indexOf('boards.') > -1){
			proclivityVal = teamName + "_boards"
		}
		if(testDomain.indexOf('tickets.') > -1){
			proclivityVal = teamName + "_tickets"
		}
	}

	if(proclivityVal != ''){
		
		wecCancel = setInterval("s_analytics.Integrate.ProclivityBrowseTags.wecReady()",200);
	}


};







}

s_analytics.m_Integrate_c="var m=s.m_i('Integrate');m.add=function(n,o){var m=this,p;if(!o)o='s_Integrate_'+n;if(!m.s.wd[o])m.s.wd[o]=new Object;m[n]=new Object;p=m[n];p._n=n;p._m=m;p._c=0;p._d=0;p.d"
+"isable=0;p.get=m.get;p.delay=m.delay;p.ready=m.ready;p.beacon=m.beacon;p.script=m.script;m.l[m.l.length]=n};m._g=function(t){var m=this,s=m.s,i,p,f=(t?'use':'set')+'Vars',tcf;for(i=0;i<m.l.length;i"
+"++){p=m[m.l[i]];if(p&&!p.disable&&p[f]){if(s.apv>=5&&(!s.isopera||s.apv>=7)){tcf=new Function('s','p','f','var e;try{p[f](s,p)}catch(e){}');tcf(s,p,f)}else p[f](s,p)}}};m._t=function(){this._g(1)};"
+"m._fu=function(p,u){var m=this,s=m.s,v,x,y,z,tm=new Date;if(u.toLowerCase().substring(0,4) != 'http')u='http://'+u;if(s.ssl)u=s.rep(u,'http:','https:');p.RAND=Math&&Math.random?Math.floor(Math.rand"
+"om()*10000000000000):tm.getTime();p.RAND+=Math.floor(tm.getTime()/10800000)%10;x=0;while(x>=0){x=u.indexOf('[',x);if(x>=0){y=u.indexOf(']',x);if(y>x){z=u.substring(x+1,y);if(z.length>2&&z.substring"
+"(0,2)=='s.'){v=s[z.substring(2)];if(!v)v=''}else{v=''+p[z];if(!(v==p[z]||parseFloat(v)==p[z]))z=0}if(z) {u=u.substring(0,x)+s.rep(escape(v),'+','%2B')+u.substring(y+1);x=y-(z.length-v.length+1)} el"
+"se {x=y}}}}return u};m.get=function(u,v){var p=this,m=p._m;if(!p.disable){if(!v)v='s_'+m._in+'_Integrate_'+p._n+'_get_'+p._c;p._c++;p.VAR=v;p._d++;m.s.loadModule('Integrate:'+v,m._fu(p,u),0,1,p._n)"
+"}};m.delay=function(){var p=this;if(p._d<=0)p._d=1};m.ready=function(){var p=this,m=p._m;p._d=0;if(!p.disable)m.s.dlt()};m._d=function(){var m=this,i,p;for(i=0;i<m.l.length;i++){p=m[m.l[i]];if(p&&!"
+"p.disable&&p._d>0)return 1}return 0};m._x=function(d,n){var p=this[n],x;if(!p.disable){for(x in d)if(x&&(!Object||!Object.prototype||!Object.prototype[x]))p[x]=d[x];p._d--}};m.beacon=function(u){va"
+"r p=this,m=p._m,s=m.s,imn='s_i_'+m._in+'_Integrate_'+p._n+'_'+p._c,im;if(!p.disable&&s.d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){p._c++;im=s.wd[imn]=new Image;im.src=m._fu("
+"p,u)}};m.script=function(u){var p=this,m=p._m;if(!p.disable)m.s.loadModule(0,m._fu(p,u),0,1)};m.l=new Array;if(m.onLoad)m.onLoad(s,m)";
s_analytics.m_i("Integrate");


s_analytics.setTagContainer("teamscode")
/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
var s_code='',s_objectID;function s_gi(un,pg,ss){var c="s.version='H.25';s.an=s_an;s.logDebug=function(m){var s=this,tcf=new Function('var e;try{console.log(\"'+s.rep(s.rep(s.rep(m,\"\\\\\",\"\\\\\\"
+"\\\"),\"\\n\",\"\\\\n\"),\"\\\"\",\"\\\\\\\"\")+'\");}catch(e){}');tcf()};s.cls=function(x,c){var i,y='';if(!c)c=this.an;for(i=0;i<x.length;i++){n=x.substring(i,i+1);if(c.indexOf(n)>=0)y+=n}return "
+"y};s.fl=function(x,l){return x?(''+x).substring(0,l):x};s.co=function(o){return o};s.num=function(x){x=''+x;for(var p=0;p<x.length;p++)if(('0123456789').indexOf(x.substring(p,p+1))<0)return 0;retur"
+"n 1};s.rep=s_rep;s.sp=s_sp;s.jn=s_jn;s.ape=function(x){var s=this,h='0123456789ABCDEF',i,c=s.charSet,n,l,e,y='';c=c?c.toUpperCase():'';if(x){x=''+x;if(s.em==3)x=encodeURIComponent(x);else if(c=='AU"
+"TO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.substring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h.substring(n%16,n%16+1)+e;n=(n-n%16)/16;l++}y+='%u'+e}else if(c=='+')y+='%2B"
+"';else y+=escape(c)}x=y}else x=escape(''+x);x=s.rep(x,'+','%2B');if(c&&c!='AUTO'&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('%U')<0){i=x.indexOf('%');while(i>=0){i++;if(h.substring(8).indexOf(x.substri"
+"ng(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00'+x.substring(i);i=x.indexOf('%',i)}}}return x};s.epa=function(x){var s=this;if(x){x=s.rep(''+x,'+',' ');return s.em==3?decodeURIComponent(x)"
+":unescape(x)}return x};s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substring(0,y);r=s[f](t,a);if(r)return r;z+=y+d.length;t=x.substring(z,x.length);t="
+"z<x.length?t:''}return ''};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0)a=a.substring(0,c);c=a.indexOf('=');if(c>=0)a=a.substring(0,c);if(t.substring(0,2)=='s_')t=t.substring(2);return (t!=''&&"
+"t==a)};s.fsf=function(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0};s.fs=function(x,f){var s=this;s.fsg='';s.pt(x,',','fsf',f);return s.fsg};s.mpc=function(m,a){var s"
+"=this,c,l,n,v;v=s.d.visibilityState;if(!v)v=s.d.webkitVisibilityState;if(v&&v=='prerender'){if(!s.mpq){s.mpq=new Array;l=s.sp('webkitvisibilitychange,visibilitychange',',');for(n=0;n<l.length;n++){"
+"s.d.addEventListener(l[n],new Function('var s=s_c_il['+s._in+'],c,v;v=s.d.visibilityState;if(!v)v=s.d.webkitVisibilityState;if(s.mpq&&v==\"visible\"){while(s.mpq.length>0){c=s.mpq.shift();s[c.m].ap"
+"ply(s,c.a)}s.mpq=0}'),false)}}c=new Object;c.m=m;c.a=a;s.mpq.push(c);return 1}return 0};s.si=function(){var s=this,i,k,v,c=s_gi+'var s=s_gi(\"'+s.oun+'\");s.sa(\"'+s.un+'\");';for(i=0;i<s.va_g.leng"
+"th;i++){k=s.va_g[i];v=s[k];if(v!=undefined){if(typeof(v)!='number')c+='s.'+k+'=\"'+s_fe(v)+'\";';else c+='s.'+k+'='+v+';'}}c+=\"s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s."
+"pev2=s.pev3='';\";return c};s.c_d='';s.c_gdf=function(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=function(){var s=this,d=s.wd.location.hostname,n=s.fpCookieDomainPeriods,p;if(!n)n=s.coo"
+"kieDomainPeriods;if(d&&!s.c_d){n=n?parseInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf('.',p-1);n--}s.c_d=p>0&&s.pt(d,'.','c_gdf',0)?d.substring(p):d}}return s.c_"
+"d};s.c_r=function(k){var s=this;k=s.ape(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':s.epa(c.substring(i+2+k.length,e<0?c.length:e));return v!='[[B]]'?v:''};s.c_"
+"w=function(k,v,e){var s=this,d=s.c_gd(),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if(e&&l!='SESSION'&&l!='NONE'){t=(v!=''?parseInt(l?l:0):-60);if(t){e=new Date;e.setTime(e.getTime()+("
+"t*1000))}}if(k&&l!='NONE'){s.d.cookie=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expires='+e.toGMTString()+';':'')+(d?' domain='+d+';':'');return s.c_r(k)==v}return 0};s.eh=functio"
+"n(o,e,r,f){var s=this,b='s_'+e+'_'+s._in,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n<0;i++){if(l[i].o==o&&l[i].e==e)n=i}if(n<0){n=i;l[n]=new Object}x=l[n];x.o=o;x.e=e;f=r?x.b"
+":f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if(x.b){x.o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r,tcf;if(s.apv>=5&&(!s.isopera||s.apv>=7)){tcf=new Function('s','f','a','t','var e,r;try"
+"{r=s[f](a)}catch(e){r=s[t](e)}return r');r=tcf(s,f,a,t)}else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s[b](a);else{s.eh(s.wd,'onerror',0,o);r=s[f](a);s.eh(s.wd,'onerror',1)}}return r};s.gtfset=functi"
+"on(e){var s=this;return s.tfs};s.gtfsoe=new Function('e','var s=s_c_il['+s._in+'],c;s.eh(window,\"onerror\",1);s.etfs=1;c=s.t();if(c)s.d.write(c);s.etfs=0;return true');s.gtfsfb=function(a){return "
+"window};s.gtfsf=function(w){var s=this,p=w.parent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tfs=p;return s.gtfsf(s.tfs)}return s.tfs};s.gtfs=function(){var s=this;if(!s.t"
+"fs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet('gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.tfs};s.mrq=function(u){var s=this,l=s.rl[u],n,r;s.rl[u]=0;if(l)for(n=0;n<l.length;n++){r=l[n];s.mr(0,0,r.r,r"
+".t,r.u)}};s.flushBufferedRequests=function(){};s.mr=function(sess,q,rs,ta,u){var s=this,dc=s.dc,t1=s.trackingServer,t2=s.trackingServerSecure,tb=s.trackingServerBase,p='.sc',ns=s.visitorNamespace,u"
+"n=s.cls(u?u:(ns?ns:s.fun)),r=new Object,l,imn='s_i_'+(un),im,b,e;if(!rs){if(t1){if(t2&&s.ssl)t1=t2}else{if(!tb)tb='2o7.net';if(dc)dc=(''+dc).toLowerCase();else dc='d1';if(tb=='2o7.net'){if(dc=='d1'"
+")dc='112';else if(dc=='d2')dc='122';p=''}t1=un+'.'+dc+'.'+p+tb}rs='http'+(s.ssl?'s':'')+'://'+t1+'/b/ss/'+s.un+'/'+(s.mobile?'5.1':'1')+'/'+s.version+(s.tcn?'T':'')+'/'+sess+'?AQB=1&ndh=1'+(q?q:'')"
+"+'&AQE=1';if(s.isie&&!s.ismac)rs=s.fl(rs,2047)}if(s.d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){if(!s.rc)s.rc=new Object;if(!s.rc[un]){s.rc[un]=1;if(!s.rl)s.rl=new Object;s.r"
+"l[un]=new Array;setTimeout('if(window.s_c_il)window.s_c_il['+s._in+'].mrq(\"'+un+'\")',750)}else{l=s.rl[un];if(l){r.t=ta;r.u=un;r.r=rs;l[l.length]=r;return ''}imn+='_'+s.rc[un];s.rc[un]++}if(s.debu"
+"gTracking){var d='AppMeasurement Debug: '+rs,dl=s.sp(rs,'&'),dln;for(dln=0;dln<dl.length;dln++)d+=\"\\n\\t\"+s.epa(dl[dln]);s.logDebug(d)}im=s.wd[imn];if(!im)im=s.wd[imn]=new Image;im.s_l=0;im.onlo"
+"ad=new Function('e','this.s_l=1;var wd=window,s;if(wd.s_c_il){s=wd.s_c_il['+s._in+'];s.bcr();s.mrq(\"'+un+'\");s.nrs--;if(!s.nrs)s.m_m(\"rr\")}');if(!s.nrs){s.nrs=1;s.m_m('rs')}else s.nrs++;im.src="
+"rs;if(s.useForcedLinkTracking||s.bcf){if(!s.forcedLinkTrackingTimeout)s.forcedLinkTrackingTimeout=250;setTimeout('var wd=window,s;if(wd.s_c_il){s=wd.s_c_il['+s._in+'];s.bcr()}',s.forcedLinkTracking"
+"Timeout);}else if((s.lnk||s.eo)&&(!ta||ta=='_self'||ta=='_top'||(s.wd.name&&ta==s.wd.name))){b=e=new Date;while(!im.s_l&&e.getTime()-b.getTime()<500)e=new Date}return ''}return '<im'+'g sr'+'c=\"'+"
+"rs+'\" width=1 height=1 border=0 alt=\"\">'};s.gg=function(v){var s=this;if(!s.wd['s_'+v])s.wd['s_'+v]='';return s.wd['s_'+v]};s.glf=function(t,a){if(t.substring(0,2)=='s_')t=t.substring(2);var s=t"
+"his,v=s.gg(t);if(v)s[t]=v};s.gl=function(v){var s=this;if(s.pg)s.pt(v,',','glf',0)};s.rf=function(x){var s=this,y,i,j,h,p,l=0,q,a,b='',c='',t;if(x&&x.length>255){y=''+x;i=y.indexOf('?');if(i>0){q=y"
+".substring(i+1);y=y.substring(0,i);h=y.toLowerCase();j=0;if(h.substring(0,7)=='http://')j+=7;else if(h.substring(0,8)=='https://')j+=8;i=h.indexOf(\"/\",j);if(i>0){h=h.substring(j,i);p=y.substring("
+"i);y=y.substring(0,i);if(h.indexOf('google')>=0)l=',q,ie,start,search_key,word,kw,cd,';else if(h.indexOf('yahoo.co')>=0)l=',p,ei,';if(l&&q){a=s.sp(q,'&');if(a&&a.length>1){for(j=0;j<a.length;j++){t"
+"=a[j];i=t.indexOf('=');if(i>0&&l.indexOf(','+t.substring(0,i)+',')>=0)b+=(b?'&':'')+t;else c+=(c?'&':'')+t}if(b&&c)q=b+'&'+c;else c=''}i=253-(q.length-c.length)-y.length;x=y+(i>0?p.substring(0,i):'"
+"')+'?'+q}}}}return x};s.s2q=function(k,v,vf,vfp,f){var s=this,qs='',sk,sv,sp,ss,nke,nk,nf,nfl=0,nfn,nfm;if(k==\"contextData\")k=\"c\";if(v){for(sk in v)if((!f||sk.substring(0,f.length)==f)&&v[sk]&&"
+"(!vf||vf.indexOf(','+(vfp?vfp+'.':'')+sk+',')>=0)&&(!Object||!Object.prototype||!Object.prototype[sk])){nfm=0;if(nfl)for(nfn=0;nfn<nfl.length;nfn++)if(sk.substring(0,nfl[nfn].length)==nfl[nfn])nfm="
+"1;if(!nfm){if(qs=='')qs+='&'+k+'.';sv=v[sk];if(f)sk=sk.substring(f.length);if(sk.length>0){nke=sk.indexOf('.');if(nke>0){nk=sk.substring(0,nke);nf=(f?f:'')+nk+'.';if(!nfl)nfl=new Array;nfl[nfl.leng"
+"th]=nf;qs+=s.s2q(nk,v,vf,vfp,nf)}else{if(typeof(sv)=='boolean'){if(sv)sv='true';else sv='false'}if(sv){if(vfp=='retrieveLightData'&&f.indexOf('.contextData.')<0){sp=sk.substring(0,4);ss=sk.substrin"
+"g(4);if(sk=='transactionID')sk='xact';else if(sk=='channel')sk='ch';else if(sk=='campaign')sk='v0';else if(s.num(ss)){if(sp=='prop')sk='c'+ss;else if(sp=='eVar')sk='v'+ss;else if(sp=='list')sk='l'+"
+"ss;else if(sp=='hier'){sk='h'+ss;sv=sv.substring(0,255)}}}qs+='&'+s.ape(sk)+'='+s.ape(sv)}}}}}if(qs!='')qs+='&.'+k}return qs};s.hav=function(){var s=this,qs='',l,fv='',fe='',mn,i,e;if(s.lightProfil"
+"eID){l=s.va_m;fv=s.lightTrackVars;if(fv)fv=','+fv+','+s.vl_mr+','}else{l=s.va_t;if(s.pe||s.linkType){fv=s.linkTrackVars;fe=s.linkTrackEvents;if(s.pe){mn=s.pe.substring(0,1).toUpperCase()+s.pe.subst"
+"ring(1);if(s[mn]){fv=s[mn].trackVars;fe=s[mn].trackEvents}}}if(fv)fv=','+fv+','+s.vl_l+','+s.vl_l2;if(fe){fe=','+fe+',';if(fv)fv+=',events,'}if (s.events2)e=(e?',':'')+s.events2}for(i=0;i<l.length;"
+"i++){var k=l[i],v=s[k],b=k.substring(0,4),x=k.substring(4),n=parseInt(x),q=k;if(!v)if(k=='events'&&e){v=e;e=''}if(v&&(!fv||fv.indexOf(','+k+',')>=0)&&k!='linkName'&&k!='linkType'){if(k=='timestamp'"
+")q='ts';else if(k=='dynamicVariablePrefix')q='D';else if(k=='visitorID')q='vid';else if(k=='pageURL'){q='g';v=s.fl(v,255)}else if(k=='referrer'){q='r';v=s.fl(s.rf(v),255)}else if(k=='vmk'||k=='visi"
+"torMigrationKey')q='vmt';else if(k=='visitorMigrationServer'){q='vmf';if(s.ssl&&s.visitorMigrationServerSecure)v=''}else if(k=='visitorMigrationServerSecure'){q='vmf';if(!s.ssl&&s.visitorMigrationS"
+"erver)v=''}else if(k=='charSet'){q='ce';if(v.toUpperCase()=='AUTO')v='ISO8859-1';else if(s.em==2||s.em==3)v='UTF-8'}else if(k=='visitorNamespace')q='ns';else if(k=='cookieDomainPeriods')q='cdp';els"
+"e if(k=='cookieLifetime')q='cl';else if(k=='variableProvider')q='vvp';else if(k=='currencyCode')q='cc';else if(k=='channel')q='ch';else if(k=='transactionID')q='xact';else if(k=='campaign')q='v0';e"
+"lse if(k=='resolution')q='s';else if(k=='colorDepth')q='c';else if(k=='javascriptVersion')q='j';else if(k=='javaEnabled')q='v';else if(k=='cookiesEnabled')q='k';else if(k=='browserWidth')q='bw';els"
+"e if(k=='browserHeight')q='bh';else if(k=='connectionType')q='ct';else if(k=='homepage')q='hp';else if(k=='plugins')q='p';else if(k=='events'){if(e)v+=(v?',':'')+e;if(fe)v=s.fs(v,fe)}else if(k=='ev"
+"ents2')v='';else if(k=='contextData'){qs+=s.s2q('c',s[k],fv,k,0);v=''}else if(k=='lightProfileID')q='mtp';else if(k=='lightStoreForSeconds'){q='mtss';if(!s.lightProfileID)v=''}else if(k=='lightIncr"
+"ementBy'){q='mti';if(!s.lightProfileID)v=''}else if(k=='retrieveLightProfiles')q='mtsr';else if(k=='deleteLightProfiles')q='mtsd';else if(k=='retrieveLightData'){if(s.retrieveLightProfiles)qs+=s.s2"
+"q('mts',s[k],fv,k,0);v=''}else if(s.num(x)){if(b=='prop')q='c'+n;else if(b=='eVar')q='v'+n;else if(b=='list')q='l'+n;else if(b=='hier'){q='h'+n;v=s.fl(v,255)}}if(v)qs+='&'+s.ape(q)+'='+(k.substring"
+"(0,3)!='pev'?s.ape(v):v)}}return qs};s.ltdf=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';var qi=h.indexOf('?');h=qi>=0?h.substring(0,qi):h;if(t&&h.substring(h.length-(t.length+1))=='"
+".'+t)return 1;return 0};s.ltef=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';if(t&&h.indexOf(t)>=0)return 1;return 0};s.lt=function(h){var s=this,lft=s.linkDownloadFileTypes,lef=s.lin"
+"kExternalFilters,lif=s.linkInternalFilters;lif=lif?lif:s.wd.location.hostname;h=h.toLowerCase();if(s.trackDownloadLinks&&lft&&s.pt(lft,',','ltdf',h))return 'd';if(s.trackExternalLinks&&h.substring("
+"0,1)!='#'&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&(!lif||!s.pt(lif,',','ltef',h)))return 'e';return ''};s.lc=new Function('e','var s=s_c_il['+s._in+'],b=s.eh(this,\"onclick\");s.lnk=this;s.t()"
+";s.lnk=0;if(b)return this[b](e);return true');s.bcr=function(){var s=this;if(s.bct&&s.bce)s.bct.dispatchEvent(s.bce);if(s.bcf){if(typeof(s.bcf)=='function')s.bcf();else if(s.bct&&s.bct.href)s.d.loc"
+"ation=s.bct.href}s.bct=s.bce=s.bcf=0};s.bc=new Function('e','if(e&&e.s_fe)return;var s=s_c_il['+s._in+'],f,tcf,t,n;if(s.d&&s.d.all&&s.d.all.cppXYctnr)return;if(!s.bbc)s.useForcedLinkTracking=0;else"
+" if(!s.useForcedLinkTracking){s.b.removeEventListener(\"click\",s.bc,true);s.bbc=s.useForcedLinkTracking=0;return}else s.b.removeEventListener(\"click\",s.bc,false);s.eo=e.srcElement?e.srcElement:e"
+".target;s.t();s.eo=0;if(s.nrs>0&&s.useForcedLinkTracking&&e.target){t=e.target.target;if(e.target.dispatchEvent&&(!t||t==\\'_self\\'||t==\\'_top\\'||(s.wd.name&&t==s.wd.name))){e.stopPropagation();"
+"e.stopImmediatePropagation();e.preventDefault();n=s.d.createEvent(\"MouseEvents\");n.initMouseEvent(\"click\",e.bubbles,e.cancelable,e.view,e.detail,e.screenX,e.screenY,e.clientX,e.clientY,e.ctrlKe"
+"y,e.altKey,e.shiftKey,e.metaKey,e.button,e.relatedTarget);n.s_fe=1;s.bct=e.target;s.bce=n;}}');s.oh=function(o){var s=this,l=s.wd.location,h=o.href?o.href:'',i,j,k,p;i=h.indexOf(':');j=h.indexOf('?"
+"');k=h.indexOf('/');if(h&&(i<0||(j>=0&&i>j)||(k>=0&&i>k))){p=o.protocol&&o.protocol.length>1?o.protocol:(l.protocol?l.protocol:'');i=l.pathname.lastIndexOf('/');h=(p?p+'//':'')+(o.host?o.host:(l.ho"
+"st?l.host:''))+(h.substring(0,1)!='/'?l.pathname.substring(0,i<0?0:i)+'/':'')+h}return h};s.ot=function(o){var t=o.tagName;if(o.tagUrn||(o.scopeName&&o.scopeName.toUpperCase()!='HTML'))return '';t="
+"t&&t.toUpperCase?t.toUpperCase():'';if(t=='SHAPE')t='';if(t){if((t=='INPUT'||t=='BUTTON')&&o.type&&o.type.toUpperCase)t=o.type.toUpperCase();else if(!t&&o.href)t='A';}return t};s.oid=function(o){va"
+"r s=this,t=s.ot(o),p,c,n='',x=0;if(t&&!o.s_oid){p=o.protocol;c=o.onclick;if(o.href&&(t=='A'||t=='AREA')&&(!c||!p||p.toLowerCase().indexOf('javascript')<0))n=s.oh(o);else if(c){n=s.rep(s.rep(s.rep(s"
+".rep(''+c,\"\\r\",''),\"\\n\",''),\"\\t\",''),' ','');x=2}else if(t=='INPUT'||t=='SUBMIT'){if(o.value)n=o.value;else if(o.innerText)n=o.innerText;else if(o.textContent)n=o.textContent;x=3}else if(o"
+".src&&t=='IMAGE')n=o.src;if(n){o.s_oid=s.fl(n,100);o.s_oidt=x}}return o.s_oid};s.rqf=function(t,un){var s=this,e=t.indexOf('='),u=e>=0?t.substring(0,e):'',q=e>=0?s.epa(t.substring(e+1)):'';if(u&&q&"
+"&(','+u+',').indexOf(','+un+',')>=0){if(u!=s.un&&s.un.indexOf(',')>=0)q='&u='+u+q+'&u=0';return q}return ''};s.rq=function(un){if(!un)un=this.un;var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if"
+"(c<0)return s.pt(v,'&','rqf',un);return s.pt(un,',','rq',0)};s.sqp=function(t,a){var s=this,e=t.indexOf('='),q=e<0?'':s.epa(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);"
+"return 0};s.sqs=function(un,q){var s=this;s.squ[un]=q;return 0};s.sq=function(q){var s=this,k='s_sq',v=s.c_r(k),x,c=0;s.sqq=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,','"
+",'sqs',q);v='';for(x in s.squ)if(x&&(!Object||!Object.prototype||!Object.prototype[x]))s.sqq[s.squ[x]]+=(s.sqq[s.squ[x]]?',':'')+x;for(x in s.sqq)if(x&&(!Object||!Object.prototype||!Object.prototyp"
+"e[x])&&s.sqq[x]&&(x==q||c<2)){v+=(v?'&':'')+s.sqq[x]+'='+s.ape(x);c++}return s.c_w(k,v,0)};s.wdl=new Function('e','var s=s_c_il['+s._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);fo"
+"r(i=0;i<s.d.links.length;i++){o=s.d.links[i];oc=o.onclick?\"\"+o.onclick:\"\";if((oc.indexOf(\"s_gs(\")<0||oc.indexOf(\".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');"
+"s.wds=function(){var s=this;if(s.apv>3&&(!s.isie||!s.ismac||s.apv>=5)){if(s.b&&s.b.attachEvent)s.b.attachEvent('onclick',s.bc);else if(s.b&&s.b.addEventListener){if(s.n&&s.n.userAgent.indexOf('WebK"
+"it')>=0&&s.d.createEvent){s.bbc=1;s.useForcedLinkTracking=1;s.b.addEventListener('click',s.bc,true)}s.b.addEventListener('click',s.bc,false)}else s.eh(s.wd,'onload',0,s.wdl)}};s.vs=function(x){var "
+"s=this,v=s.visitorSampling,g=s.visitorSamplingGroup,k='s_vsn_'+s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if(v){v*=100;if(!n){if(!s.c_w(k,x,e))return 0;n="
+"x}if(n%10000>v)return 0}return 1};s.dyasmf=function(t,m){if(t&&m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='):-1,n,x;if(i>=0&&m){var n=t.substring(0,i),x="
+"t.substring(i+1);if(s.pt(x,',','dyasmf',m))return n}return 0};s.uns=function(){var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountList,m=s.dynamicAccountMatch,n,i;s.un=s.un.toLowerCase();if(x"
+"&&l){if(!m)m=s.wd.location.host;if(!m.toLowerCase)m=''+m;l=l.toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.indexOf(',');s.fun=i<0?s.un:s.un.substring(0,i)};s.sa=functio"
+"n(un){var s=this;if(s.un&&s.mpc('sa',arguments))return;s.un=un;if(!s.oun)s.oun=un;else if((','+s.oun+',').indexOf(','+un+',')<0)s.oun+=','+un;s.uns()};s.m_i=function(n,a){var s=this,m,f=n.substring"
+"(0,1),r,l,i;if(!s.m_l)s.m_l=new Object;if(!s.m_nl)s.m_nl=new Array;m=s.m_l[n];if(!a&&m&&m._e&&!m._i)s.m_a(n);if(!m){m=new Object,m._c='s_m';m._in=s.wd.s_c_in;m._il=s._il;m._il[m._in]=m;s.wd.s_c_in+"
+"+;m.s=s;m._n=n;m._l=new Array('_c','_in','_il','_i','_e','_d','_dl','s','n','_r','_g','_g1','_t','_t1','_x','_x1','_rs','_rr','_l');s.m_l[n]=m;s.m_nl[s.m_nl.length]=n}else if(m._r&&!m._m){r=m._r;r."
+"_m=m;l=m._l;for(i=0;i<l.length;i++)if(m[l[i]])r[l[i]]=m[l[i]];r._il[r._in]=r;m=s.m_l[n]=r}if(f==f.toUpperCase())s[n]=m;return m};s.m_a=new Function('n','g','e','if(!g)g=\"m_\"+n;var s=s_c_il['+s._i"
+"n+'],c=s[g+\"_c\"],m,x,f=0;if(s.mpc(\"m_a\",arguments))return;if(!c)c=s.wd[\"s_\"+g+\"_c\"];if(c&&s_d)s[g]=new Function(\"s\",s_ft(s_d(c)));x=s[g];if(!x)x=s.wd[\\'s_\\'+g];if(!x)x=s.wd[g];m=s.m_i(n"
+",1);if(x&&(!m._i||g!=\"m_\"+n)){m._i=f=1;if((\"\"+x).indexOf(\"function\")>=0)x(s);else s.m_m(\"x\",n,x,e)}m=s.m_i(n,1);if(m._dl)m._dl=m._d=0;s.dlt();return f');s.m_m=function(t,n,d,e){t='_'+t;var "
+"s=this,i,x,m,f='_'+t,r=0,u;if(s.m_l&&s.m_nl)for(i=0;i<s.m_nl.length;i++){x=s.m_nl[i];if(!n||x==n){m=s.m_i(x);u=m[t];if(u){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t](d,e);else if(d)u=m[t](d);e"
+"lse u=m[t]()}}if(u)r=1;u=m[t+1];if(u&&!m[f]){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t+1](d,e);else if(d)u=m[t+1](d);else u=m[t+1]()}}m[f]=1;if(u)r=1}}return r};s.m_ll=function(){var s=this,g"
+"=s.m_dl,i,o;if(g)for(i=0;i<g.length;i++){o=g[i];if(o)s.loadModule(o.n,o.u,o.d,o.l,o.e,1);g[i]=0}};s.loadModule=function(n,u,d,l,e,ln){var s=this,m=0,i,g,o=0,f1,f2,c=s.h?s.h:s.b,b,tcf;if(n){i=n.inde"
+"xOf(':');if(i>=0){g=n.substring(i+1);n=n.substring(0,i)}else g=\"m_\"+n;m=s.m_i(n)}if((l||(n&&!s.m_a(n,g)))&&u&&s.d&&c&&s.d.createElement){if(d){m._d=1;m._dl=1}if(ln){if(s.ssl)u=s.rep(u,'http:','ht"
+"tps:');i='s_s:'+s._in+':'+n+':'+g;b='var s=s_c_il['+s._in+'],o=s.d.getElementById(\"'+i+'\");if(s&&o){if(!o.l&&s.wd.'+g+'){o.l=1;if(o.i)clearTimeout(o.i);o.i=0;s.m_a(\"'+n+'\",\"'+g+'\"'+(e?',\"'+e"
+"+'\"':'')+')}';f2=b+'o.c++;if(!s.maxDelay)s.maxDelay=250;if(!o.l&&o.c<(s.maxDelay*2)/100)o.i=setTimeout(o.f2,100)}';f1=new Function('e',b+'}');tcf=new Function('s','c','i','u','f1','f2','var e,o=0;"
+"try{o=s.d.createElement(\"script\");if(o){o.type=\"text/javascript\";'+(n?'o.id=i;o.defer=true;o.onload=o.onreadystatechange=f1;o.f2=f2;o.l=0;':'')+'o.src=u;c.appendChild(o);'+(n?'o.c=0;o.i=setTime"
+"out(f2,100)':'')+'}}catch(e){o=0}return o');o=tcf(s,c,i,u,f1,f2)}else{o=new Object;o.n=n+':'+g;o.u=u;o.d=d;o.l=l;o.e=e;g=s.m_dl;if(!g)g=s.m_dl=new Array;i=0;while(i<g.length&&g[i])i++;g[i]=o}}else "
+"if(n){m=s.m_i(n);m._e=1}return m};s.voa=function(vo,r){var s=this,l=s.va_g,i,k,v,x;for(i=0;i<l.length;i++){k=l[i];v=vo[k];if(v||vo['!'+k]){if(!r&&(k==\"contextData\"||k==\"retrieveLightData\")&&s[k"
+"])for(x in s[k])if(!v[x])v[x]=s[k][x];s[k]=v}}};s.vob=function(vo){var s=this,l=s.va_g,i,k;for(i=0;i<l.length;i++){k=l[i];vo[k]=s[k];if(!vo[k])vo['!'+k]=1}};s.dlt=new Function('var s=s_c_il['+s._in"
+"+'],d=new Date,i,vo,f=0;if(s.dll)for(i=0;i<s.dll.length;i++){vo=s.dll[i];if(vo){if(!s.m_m(\"d\")||d.getTime()-vo._t>=s.maxDelay){s.dll[i]=0;s.t(vo)}else f=1}}if(s.dli)clearTimeout(s.dli);s.dli=0;if"
+"(f){if(!s.dli)s.dli=setTimeout(s.dlt,s.maxDelay)}else s.dll=0');s.dl=function(vo){var s=this,d=new Date;if(!vo)vo=new Object;s.vob(vo);vo._t=d.getTime();if(!s.dll)s.dll=new Array;s.dll[s.dll.length"
+"]=vo;if(!s.maxDelay)s.maxDelay=250;s.dlt()};s.track=s.t=function(vo){var s=this,trk=1,tm=new Date,sed=Math&&Math.random?Math.floor(Math.random()*10000000000000):tm.getTime(),sess='s'+Math.floor(tm."
+"getTime()/10800000)%10+sed,y=tm.getYear(),vt=tm.getDate()+'/'+tm.getMonth()+'/'+(y<1900?y+1900:y)+' '+tm.getHours()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay()+' '+tm.getTimezoneOffset("
+"),tcf,tfs=s.gtfs(),ta=-1,q='',qs='',code='',vb=new Object;if(s.mpc('t',arguments))return;s.gl(s.vl_g);s.uns();s.m_ll();if(!s.td){var tl=tfs.location,a,o,i,x='',c='',v='',p='',bw='',bh='',j='1.0',k="
+"s.c_w('s_cc','true',0)?'Y':'N',hp='',ct='',pn=0,ps;if(String&&String.prototype){j='1.1';if(j.match){j='1.2';if(tm.setUTCDate){j='1.3';if(s.isie&&s.ismac&&s.apv>=5)j='1.4';if(pn.toPrecision){j='1.5'"
+";a=new Array;if(a.forEach){j='1.6';i=0;o=new Object;tcf=new Function('o','var e,i=0;try{i=new Iterator(o)}catch(e){}return i');i=tcf(o);if(i&&i.next)j='1.7'}}}}}if(s.apv>=4)x=screen.width+'x'+scree"
+"n.height;if(s.isns||s.isopera){if(s.apv>=3){v=s.n.javaEnabled()?'Y':'N';if(s.apv>=4){c=screen.pixelDepth;bw=s.wd.innerWidth;bh=s.wd.innerHeight}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>=4){v=s.n."
+"javaEnabled()?'Y':'N';c=screen.colorDepth;if(s.apv>=5){bw=s.d.documentElement.offsetWidth;bh=s.d.documentElement.offsetHeight;if(!s.ismac&&s.b){tcf=new Function('s','tl','var e,hp=0;try{s.b.addBeha"
+"vior(\"#default#homePage\");hp=s.b.isHomePage(tl)?\"Y\":\"N\"}catch(e){}return hp');hp=tcf(s,tl);tcf=new Function('s','var e,ct=0;try{s.b.addBehavior(\"#default#clientCaps\");ct=s.b.connectionType}"
+"catch(e){}return ct');ct=tcf(s)}}}else r=''}if(s.pl)while(pn<s.pl.length&&pn<30){ps=s.fl(s.pl[pn].name,100)+';';if(p.indexOf(ps)<0)p+=ps;pn++}s.resolution=x;s.colorDepth=c;s.javascriptVersion=j;s.j"
+"avaEnabled=v;s.cookiesEnabled=k;s.browserWidth=bw;s.browserHeight=bh;s.connectionType=ct;s.homepage=hp;s.plugins=p;s.td=1}if(vo){s.vob(vb);s.voa(vo)}if((vo&&vo._t)||!s.m_m('d')){if(s.usePlugins)s.d"
+"oPlugins(s);var l=s.wd.location,r=tfs.document.referrer;if(!s.pageURL)s.pageURL=l.href?l.href:l;if(!s.referrer&&!s._1_referrer){s.referrer=r;s._1_referrer=1}s.m_m('g');if(s.lnk||s.eo){var o=s.eo?s."
+"eo:s.lnk,p=s.pageName,w=1,t=s.ot(o),n=s.oid(o),x=o.s_oidt,h,l,i,oc;if(s.eo&&o==s.eo){while(o&&!n&&t!='BODY'){o=o.parentElement?o.parentElement:o.parentNode;if(o){t=s.ot(o);n=s.oid(o);x=o.s_oidt}}if"
+"(!n||t=='BODY')o='';if(o){oc=o.onclick?''+o.onclick:'';if((oc.indexOf('s_gs(')>=0&&oc.indexOf('.s_oc(')<0)||oc.indexOf('.tl(')>=0)o=0}}if(o){if(n)ta=o.target;h=s.oh(o);i=h.indexOf('?');h=s.linkLeav"
+"eQueryString||i<0?h:h.substring(0,i);l=s.linkName;t=s.linkType?s.linkType.toLowerCase():s.lt(h);if(t&&(h||l)){s.pe='lnk_'+(t=='d'||t=='e'?t:'o');s.pev1=(h?s.ape(h):'');s.pev2=(l?s.ape(l):'')}else t"
+"rk=0;if(s.trackInlineStats){if(!p){p=s.pageURL;w=0}t=s.ot(o);i=o.sourceIndex;if(o.dataset&&o.dataset.sObjectId){s.wd.s_objectID=o.dataset.sObjectId;}else if(o.getAttribute&&o.getAttribute('data-s-o"
+"bject-id')){s.wd.s_objectID=o.getAttribute('data-s-object-id');}else if(s.useForcedLinkTracking){s.wd.s_objectID='';oc=o.onclick?''+o.onclick:'';if(oc){var ocb=oc.indexOf('s_objectID'),oce,ocq,ocx;"
+"if(ocb>=0){ocb+=10;while(ocb<oc.length&&(\"= \\t\\r\\n\").indexOf(oc.charAt(ocb))>=0)ocb++;if(ocb<oc.length){oce=ocb;ocq=ocx=0;while(oce<oc.length&&(oc.charAt(oce)!=';'||ocq)){if(ocq){if(oc.charAt("
+"oce)==ocq&&!ocx)ocq=0;else if(oc.charAt(oce)==\"\\\\\")ocx=!ocx;else ocx=0;}else{ocq=oc.charAt(oce);if(ocq!='\"'&&ocq!=\"'\")ocq=0}oce++;}oc=oc.substring(ocb,oce);if(oc){o.s_soid=new Function('s','"
+"var e;try{s.wd.s_objectID='+oc+'}catch(e){}');o.s_soid(s)}}}}}if(s.gg('objectID')){n=s.gg('objectID');x=1;i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')+'&oid='+s.ape(s.fl(n,100))+("
+"x?'&oidt='+x:'')+'&ot='+s.ape(t)+(i?'&oi='+i:'')}}else trk=0}if(trk||qs){s.sampled=s.vs(sed);if(trk){if(s.sampled)code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?qs:s.rq()),0,ta);qs='';s.m_m('"
+"t');if(s.p_r)s.p_r();s.referrer=s.lightProfileID=s.retrieveLightProfiles=s.deleteLightProfiles=''}s.sq(qs)}}else s.dl(vo);if(vo)s.voa(vb,1);s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s."
+"pe=s.pev1=s.pev2=s.pev3='';if(s.pg)s.wd.s_lnk=s.wd.s_eo=s.wd.s_linkName=s.wd.s_linkType='';return code};s.trackLink=s.tl=function(o,t,n,vo,f){var s=this;s.lnk=o;s.linkType=t;s.linkName=n;if(f){s.bc"
+"t=o;s.bcf=f}s.t(vo)};s.trackLight=function(p,ss,i,vo){var s=this;s.lightProfileID=p;s.lightStoreForSeconds=ss;s.lightIncrementBy=i;s.t(vo)};s.setTagContainer=function(n){var s=this,l=s.wd.s_c_il,i,"
+"t,x,y;s.tcn=n;if(l)for(i=0;i<l.length;i++){t=l[i];if(t&&t._c=='s_l'&&t.tagContainerName==n){s.voa(t);if(t.lmq)for(i=0;i<t.lmq.length;i++){x=t.lmq[i];y='m_'+x.n;if(!s[y]&&!s[y+'_c']){s[y]=t[y];s[y+'"
+"_c']=t[y+'_c']}s.loadModule(x.n,x.u,x.d)}if(t.ml)for(x in t.ml)if(s[x]){y=s[x];x=t.ml[x];for(i in x)if(!Object.prototype[i]){if(typeof(x[i])!='function'||(''+x[i]).indexOf('s_c_il')<0)y[i]=x[i]}}if"
+"(t.mmq)for(i=0;i<t.mmq.length;i++){x=t.mmq[i];if(s[x.m]){y=s[x.m];if(y[x.f]&&typeof(y[x.f])=='function'){if(x.a)y[x.f].apply(y,x.a);else y[x.f].apply(y)}}}if(t.tq)for(i=0;i<t.tq.length;i++)s.t(t.tq"
+"[i]);t.s=s;return}}};s.wd=window;s.ssl=(s.wd.location.protocol.toLowerCase().indexOf('https')>=0);s.d=document;s.b=s.d.body;if(s.d.getElementsByTagName){s.h=s.d.getElementsByTagName('HEAD');if(s.h)"
+"s.h=s.h[0]}s.n=navigator;s.u=s.n.userAgent;s.ns6=s.u.indexOf('Netscape6/');var apn=s.n.appName,v=s.n.appVersion,ie=v.indexOf('MSIE '),o=s.u.indexOf('Opera '),i;if(v.indexOf('Opera')>=0||o>0)apn='Op"
+"era';s.isie=(apn=='Microsoft Internet Explorer');s.isns=(apn=='Netscape');s.isopera=(apn=='Opera');s.ismac=(s.u.indexOf('Mac')>=0);if(o>0)s.apv=parseFloat(s.u.substring(o+6));else if(ie>0){s.apv=pa"
+"rseInt(i=v.substring(ie+5));if(s.apv>3)s.apv=parseFloat(i)}else if(s.ns6>0)s.apv=parseFloat(s.u.substring(s.ns6+10));else s.apv=parseFloat(v);s.em=0;if(s.em.toPrecision)s.em=3;else if(String.fromCh"
+"arCode){i=escape(String.fromCharCode(256)).toUpperCase();s.em=(i=='%C4%80'?2:(i=='%U0100'?1:0))}if(s.oun)s.sa(s.oun);s.sa(un);s.vl_l='timestamp,dynamicVariablePrefix,visitorID,vmk,visitorMigrationK"
+"ey,visitorMigrationServer,visitorMigrationServerSecure,ppu,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,pageName,pageURL,referrer,contextData,currencyCode,lightProfileID,lightStoreFo"
+"rSeconds,lightIncrementBy,retrieveLightProfiles,deleteLightProfiles,retrieveLightData';s.va_l=s.sp(s.vl_l,',');s.vl_mr=s.vl_m='timestamp,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,"
+"contextData,lightProfileID,lightStoreForSeconds,lightIncrementBy';s.vl_t=s.vl_l+',variableProvider,channel,server,pageType,transactionID,purchaseID,campaign,state,zip,events,events2,products,linkNa"
+"me,linkType';var n;for(n=1;n<=75;n++){s.vl_t+=',prop'+n+',eVar'+n;s.vl_m+=',prop'+n+',eVar'+n}for(n=1;n<=5;n++)s.vl_t+=',hier'+n;for(n=1;n<=3;n++)s.vl_t+=',list'+n;s.va_m=s.sp(s.vl_m,',');s.vl_l2='"
+",tnt,pe,pev1,pev2,pev3,resolution,colorDepth,javascriptVersion,javaEnabled,cookiesEnabled,browserWidth,browserHeight,connectionType,homepage,plugins';s.vl_t+=s.vl_l2;s.va_t=s.sp(s.vl_t,',');s.vl_g="
+"s.vl_t+',trackingServer,trackingServerSecure,trackingServerBase,fpCookieDomainPeriods,disableBufferedRequests,mobile,visitorSampling,visitorSamplingGroup,dynamicAccountSelection,dynamicAccountList,"
+"dynamicAccountMatch,trackDownloadLinks,trackExternalLinks,trackInlineStats,linkLeaveQueryString,linkDownloadFileTypes,linkExternalFilters,linkInternalFilters,linkTrackVars,linkTrackEvents,linkNames"
+",lnk,eo,lightTrackVars,_1_referrer,un';s.va_g=s.sp(s.vl_g,',');s.pg=pg;s.gl(s.vl_g);s.contextData=new Object;s.retrieveLightData=new Object;if(!ss)s.wds();if(pg){s.wd.s_co=function(o){return o};s.w"
+"d.s_gs=function(un){s_gi(un,1,1).t()};s.wd.s_dc=function(un){s_gi(un,1).t()}}",
w=window,l=w.s_c_il,n=navigator,u=n.userAgent,v=n.appVersion,e=v.indexOf('MSIE '),m=u.indexOf('Netscape6/'),a,i,j,x,s;if(un){un=un.toLowerCase();if(l)for(j=0;j<2;j++)for(i=0;i<l.length;i++){s=l[i];x=s._c;if((!x||x=='s_c'||(j>0&&x=='s_l'))&&(s.oun==un||(s.fs&&s.sa&&s.fs(s.oun,un)))){if(s.sa)s.sa(un);if(x=='s_c')return s}else s=0}}w.s_an='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
w.s_sp=new Function("x","d","var a=new Array,i=0,j;if(x){if(x.split)a=x.split(d);else if(!d)for(i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){j=x.indexOf(d,i);a[a.length]=x.subst"
+"ring(i,j<0?x.length:j);i=j;if(i>=0)i+=d.length}}return a");
w.s_jn=new Function("a","d","var x='',i,j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.join)x=a.join(d);else for(i=1;i<j;i++)x+=d+a[i]}}return x");
w.s_rep=new Function("x","o","n","return s_jn(s_sp(x,o),n)");
w.s_d=new Function("x","var t='`^@$#',l=s_an,l2=new Object,x2,d,b=0,k,i=x.lastIndexOf('~~'),j,v,w;if(i>0){d=x.substring(0,i);x=x.substring(i+2);l=s_sp(l,'');for(i=0;i<62;i++)l2[l[i]]=i;t=s_sp(t,'');d"
+"=s_sp(d,'~');i=0;while(i<5){v=0;if(x.indexOf(t[i])>=0) {x2=s_sp(x,t[i]);for(j=1;j<x2.length;j++){k=x2[j].substring(0,1);w=t[i]+k;if(k!=' '){v=1;w=d[b+l2[k]]}x2[j]=w+x2[j].substring(1)}}if(v)x=s_jn("
+"x2,'');else{w=t[i]+' ';if(x.indexOf(w)>=0)x=s_rep(x,w,t[i]);i++;b+=62}}}return x");
w.s_fe=new Function("c","return s_rep(s_rep(s_rep(c,'\\\\','\\\\\\\\'),'\"','\\\\\"'),\"\\n\",\"\\\\n\")");
w.s_fa=new Function("f","var s=f.indexOf('(')+1,e=f.indexOf(')'),a='',c;while(s>=0&&s<e){c=f.substring(s,s+1);if(c==',')a+='\",\"';else if((\"\\n\\r\\t \").indexOf(c)<0)a+=c;s++}return a?'\"'+a+'\"':"
+"a");
w.s_ft=new Function("c","c+='';var s,e,o,a,d,q,f,h,x;s=c.indexOf('=function(');while(s>=0){s++;d=1;q='';x=0;f=c.substring(s);a=s_fa(f);e=o=c.indexOf('{',s);e++;while(d>0){h=c.substring(e,e+1);if(q){i"
+"f(h==q&&!x)q='';if(h=='\\\\')x=x?0:1;else x=0}else{if(h=='\"'||h==\"'\")q=h;if(h=='{')d++;if(h=='}')d--}if(d>0)e++}c=c.substring(0,s)+'new Function('+(a?a+',':'')+'\"'+s_fe(c.substring(o+1,e))+'\")"
+"'+c.substring(e+1);s=c.indexOf('=function(')}return c;");
c=s_d(c);if(e>0){a=parseInt(i=v.substring(e+5));if(a>3)a=parseFloat(i)}else if(m>0)a=parseFloat(u.substring(m+10));else a=parseFloat(v);if(a<5||v.indexOf('Opera')>=0||u.indexOf('Opera')>=0)c=s_ft(c);if(!s){s=new Object;if(!w.s_c_in){w.s_c_il=new Array;w.s_c_in=0}s._il=w.s_c_il;s._in=w.s_c_in;s._il[s._in]=s;w.s_c_in++;}s._c='s_c';(new Function("s","un","pg","ss",c))(s,un,pg,ss);return s}
function s_giqf(){var w=window,q=w.s_giq,i,t,s;if(q)for(i=0;i<q.length;i++){t=q[i];s=s_gi(t.oun);s.sa(t.un);s.setTagContainer(t.tagContainerName)}w.s_giq=0}s_giqf()


s_tc_teamscode.cl=[{p:[{t:'s',u:'//n.pswec.com/px/32e4c1141e/v3'}]}];
s_tc_teamscode.cr();