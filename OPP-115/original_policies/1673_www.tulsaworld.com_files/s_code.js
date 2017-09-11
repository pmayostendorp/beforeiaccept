/* SiteCatalyst code version: H.13.
Copyright 1997-2007 Omniture, Inc. More info available at
http://www.omniture.com */
/************************ ADDITIONAL FEATURES ************************
     Plugins
*/
/* Specify the Report Suite ID(s) to track here */
var s_account="tulsaworldlive"
var s=s_gi(s_account)
/************************** CONFIG SECTION **************************/
/* You may add or alter any code config here. */
/* Auto Year Retrieval - Added by Andrew */
var year = new Date();
/* Conversion Config */
s.currencyCode="USD"
/* Link Tracking Config */
s.trackDownloadLinks=true
s.trackExternalLinks=true
s.trackInlineStats=true
s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,doc,pdf,xls"
s.linkInternalFilters="javascript:,tulsaworld.com,hosted.ap.org,autos.tulsaworld.com,home.tulsaworld.com,tulsa.careercast.com,digitalcommunications.com,legacy.com,tulsaworld.salary.com,mobile.tulsaworld.com,placeads.tulsaworld.com,adicio.com,gadzoo.com,tulsaworld.upickem.net,outpickthepicker.com,townnews-staging.com"
s.linkLeaveQueryString=false
s.linkTrackVars="None"
s.linkTrackEvents="None"
/* Plugin Config */
s.usePlugins=true
function s_doPlugins(s) {
	/* Add calls to plugins here */

	s.campaign=s.getQueryParam('cmpid');
	s.campaign=s.getValOnce(s.campaign,"s_campaign",0)
	s.events=s.apl(s.events,"event1",",",2)
	if(!s.prop1)
		s.prop1=s.getQueryParam('[search variable in querystring]')
		s.prop1=s.prop1.toLowerCase()
	if(s.prop1){
		s.eVar1=s.prop1
	var t_search=s.getValOnce(s.eVar1,'ev1',0)
	if(t_search)
		s.events=s.apl(s.events,"event1",",",2)
	}
	s.events=s.apl(s.events,"event2",",",2)
	s.prop11=s.getTimeParting('h','-6',year.getFullYear()); // Set hour 
	s.prop12=s.getTimeParting('d','-6',year.getFullYear()); // Set day
	s.prop13=s.getTimeParting('w','-6',year.getFullYear()); // Set Weekend / Weekday


	//Begin section added by Andrew for stange time organizations
	//This should really be datetime comparisons
	var t_timeday = parseInt(s.prop11.substring(0, s.prop11.indexOf(":")))
	var t_ampm = s.prop11.substring(s.prop11.length - 2)

	if ((t_timeday >= 12 || t_timeday < 6) && t_ampm == 'AM')
	{
		s.prop16 = 'Early Morning'
	}
	else if ((t_timeday >= 6 && t_timeday < 10) && t_ampm == 'AM')
	{
		s.prop16 = 'Morning'
	}
	else if ((t_timeday >= 10 && t_timeday < 12) && t_ampm == 'AM')
	{
		s.prop16 = 'Late Morning'
	}
	else if ((t_timeday >= 12 || t_timeday < 5) && t_ampm == 'PM')
	{
		s.prop16 = 'Afternoon'
	}
	else if ((t_timeday >= 5 && t_timeday < 8) && t_ampm == 'PM')
	{
		s.prop16 = 'Evening'
	}
	else if ((t_timeday >= 8 && t_timeday < 12) && t_ampm == 'PM')
	{
		s.prop16 = 'Late Evening'
	}
	//End section added by Andrew
	
	s.eVar1=s.prop1
	s.eVar2=s.pageName
	s.eVar3=s.prop3
	s.eVar4=s.prop4
	s.eVar5=s.prop5
	s.eVar6=s.prop6
	s.eVar7=s.prop7
	s.eVar8=s.prop8
	s.eVar9=s.prop9
	s.eVar11=s.prop11
	s.eVar12=s.prop12
	s.eVar13=s.prop13
	s.eVar16=s.prop14
	//Added by Andrew for stange time organizations
	s.eVar17=s.prop16

}
s.doPlugins=s_doPlugins
/************************** PLUGINS SECTION *************************/
/* You may insert any plugins you wish to use here.                 */

/*
 * Plugin: getValOnce 0.2 - get a value once per session or number of days
 */
s.getValOnce=new Function("v","c","e",""
+"var s=this,k=s.c_r(c),a=new Date;e=e?e:0;if(v){a.setTime(a.getTime("
+")+e*86400000);s.c_w(c,v,e?a:0);}return v==k?'':v");
/*
 * Utility Function: split v1.5 - split a string (JS 1.0 compatible)
 */
s.split=new Function("l","d",""
+"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");
/*
 * Plugin Utility: apl v1.1
 */
s.apl=new Function("L","v","d","u",""
+"var s=this,m=0;if(!L)L='';if(u){var i,n,a=s.split(L,d);for(i=0;i<a."
+"length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
+"e()));}}if(!m)L=L?L+d+v:v;return L");

/*
 * Plugin: getQueryParam 2.1 - return query string parameter(s)
 */
s.getQueryParam=new Function("p","d","u",""
+"var s=this,v='',i,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.locati"
+"on);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0?p"
+".length:i;t=s.p_gpv(p.substring(0,i),u+'');if(t)v+=v?d+t:t;p=p.subs"
+"tring(i==p.length?i:i+1)}return v");
s.p_gpv=new Function("k","u",""
+"var s=this,v='',i=u.indexOf('?'),q;if(k&&i>-1){q=u.substring(i+1);v"
+"=s.pt(q,'&','p_gvf',k)}return v");
s.p_gvf=new Function("t","k",""
+"if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
+"rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s."
+"epa(v)}return ''");

/*
 * Plugin: getTimeParting 1.3 - Set timeparting values based on time zone
 */

s.getTimeParting=new Function("t","z","y",""
+"dc=new Date('1/1/2000');f=15;ne=8;if(dc.getDay()!=6||"
+"dc.getMonth()!=0){return'Data Not Available'}else{;z=parseInt(z);"
+"if(y=='2009'){f=8;ne=1};gmar=new Date('3/1/'+y);dsts=f-gmar.getDay("
+");gnov=new Date('11/1/'+y);dste=ne-gnov.getDay();spr=new Date('3/'"
+"+dsts+'/'+y);fl=new Date('11/'+dste+'/'+y);cd=new Date();"
+"if(cd>spr&&cd<fl){z=z+1}else{z=z};utc=cd.getTime()+(cd.getTimezoneO"
+"ffset()*60000);tz=new Date(utc + (3600000*z));thisy=tz.getFullYear("
+");var days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Fr"
+"iday','Saturday'];if(thisy!=y){return'Data Not Available'}else{;thi"
+"sh=tz.getHours();thismin=tz.getMinutes();thisd=tz.getDay();var dow="
+"days[thisd];var ap='AM';var dt='Weekday';var mint='00';if(thismin>3"
+"0){mint='30'}if(thish>=12){ap='PM';thish=thish-12};if (thish==0){th"
+"ish=12};if(thisd==6||thisd==0){dt='Weekend'};var timestring=thish+'"
+":'+mint+ap;var daystring=dow;var endstring=dt;if(t=='h'){return tim"
+"estring}if(t=='d'){return daystring};if(t=='w'){return en"
+"dstring}}};"
);

/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected.  Changes should only be
made when instructed to do so by your account manager.*/
s.visitorNamespace="tulsaworld"
s.trackingServer="metrics.tulsaworld.com"
s.trackingServerSecure="smetrics.tulsaworld.com"
s.dc=112

/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
var s_code='',s_objectID;function s_gi(un,pg,ss){var d="function s_dr"
+"(x,o,n){var i=x.indexOf(o);if(i>=0&&x.split)x=(x.split(o)).join(n);"
+"else while(i>=0){x=x.substring(0,i)+n+x.substring(i+o.length);i=x.i"
+"ndexOf(o)}return x}function s_d(x) {var t='`^@$#',l='0123456789ABCD"
+"EFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',d,n=0,b,k,w,i=x.l"
+"astIndexOf('~~');if(i>0){d=x.substring(0,i);x=x.substring(i+2);whil"
+"e(d){w=d;i=d.indexOf('~');if(i>0){w=d.substring(0,i);d=d.substring("
+"i+1)}else d='';b=parseInt(n/62);k=n-b*62;k=t.substring(b,b+1)+l.sub"
+"string(k,k+1);x=s_dr(x,k,w);n++}for(i=0;i<5;i++){w=t.substring(i,i+"
+"1);x=s_dr(x,w+' ',w)}}return x}",c=".substring(~.indexOf(~return ~="
+"f`K(~){`Ms=^u~';`At`h~;$2~.toLowerCase()~`ZF`K('e`z`Ms=s_c_il['+@g+"
+"']~};s.~`s $2~.length~`ZObject~.toUpperCase~s.wd~.location~')q='~li"
+"nk~s.apv~$f$U~unction~)$2x^W!Object||!Object.prototype||!Object.pro"
+"totype[x])~var ~s.pt(~ookieDomainPeriods~,`z,'~while(~);s.~.protoco"
+"l~){$2~:'')~=''~;@F^Us[k],255)}~javaEnabled~connection^E~=new ~.las"
+"tIndexOf('~tm.get~@5\"$Os.b.addBehavior('# default# ~onclick~ternal"
+"Filters~entElement~Name~=='~javascriptVersion~=parseFloat(~=s.dynam"
+"icAccount~s_c_il['+@g+'].mrq(\"'+un+'\")'~visitor~cookie~parseInt(~"
+"s.^I~o@6oid~browser~else~referrer~colorDepth~String~.host~s.rep(~}c"
+"atch(e){~','~r=s.m(f)?s[f](~}$2~s.un~s.eo~s.sq~t=s.ot(o)~track~j='1"
+".~)?'Y':'N'~$ZURL~@6c_i~s.ismac~lugins~;for(~Type~s.rc[un]~s.b.addE"
+"ventListener~Download~tfs~resolution~.get@I()~s.eh~s.isie~s.vl_l~s."
+"vl_t~Height~t,h){t=t?t~isopera~escape(~screen.~s.fl(~harCode~&&(~va"
+"riableProvider~s.gg('objectID')~&&s.~:'';h=h?h~e&&l$eSESSION'~');~f"
+"',~_'+~Date~name~home$Z~s_c2~s.c_r(~s.rl[u~o.href~Lifetime~Width~sE"
+"nabled~'){q='~transactionID~b.attachEvent~&&l$eNONE'){~ExternalLink"
+"s~this~charSet~onerror~currencyCode~s=s_gi(~e$QElement~;s.gl(s.vl_g"
+"~.parent~Array~lnk~Opera~eval(~.s_~Math.~s.fsg~s.ns6~docum~s.oun~In"
+"lineStats~Track~'0123456789~s[k]=~window~onload~Time~s.epa(~s.c_w(~"
+"(s.ssl~n=s.oid(o)~LeaveQuery~')>=~&&t~'=')~){n=~+1))~' '+~s.t()}~\""
+",''),~=s.oh(o);~+(y<1900?~ingServer~true~sess~campaign~lif~s_gs(~,1"
+"00)~s.co(~s._in~x in ~='s_~ffset~s.c_d~'&pe~s.gv(~s.qav~s.pl~=(apn~"
+"Sampling~sqs',q);~Year(~=s.n.app~(''+~)+'/~',s~'||t~s()+':'+~a):f(~"
+"){v=s.n.~channel~if(~un)~.target~o.value~\".tl(\")~etscape~(ns?ns:~"
+"s_')t=t~omePage~++}~&&!~')<~){x~1);~e))~'+n~height~events~trk~rando"
+"m~code~un,~try{~'MSIE ~.src~floor(~s.pg~s.num(~s.ape(~s.c_gd~s.dc~."
+"inner~Events~page~.set~.fromC~++){~?'':~!='~='+~?'&~+';~(f){~){p=~>"
+"=5)~&&i>~[b](~=l[n];~~f`K ^ife$i`Mx`V,s=0,e,a,b,c;`Q1){e=f`1'\"@w);"
+"b=f`1'\\\\',s);c=f`1\"\\n\",s)`6e<0||(b>=0&&b<$Ge=b`6e<0||(c>=0&&c<"
+"$Ge=c`6e>=0$E+=(e>s?f`0s,e)`U+(e==c?'\\\\n':'\\\\'+f`0e,e@S;s=e+1}`"
+"s `2x+f`0s)}`2f}f`K ^ifa$i`Ms=f`1'(')+1,e=f`1')'),a`V,c;`Qs>=0&&s<e"
+"){c=f`0s,s+1)`6c`h,')a+='\",\"';`A(\"\\n\\r\\t \")`1c)<0)a+=c;s$B`2"
+"a?'\"'+a+'\"':a}f`K ^if(cc){cc`V+cc;`Mfc='`Mf`ZF`K(@w=cc`1';',cc`1'"
+"{')),e=cc`a}'),o,a,d,q,c,f,h,x;fc+=^ifa(cc)+',\"`Ms`C;';c=cc`0s+1,e"
+");s=c`1'f`K^c`Qs>=0){d=1;q`V;x=0;f=c`0s);a=^ifa(f);e=o=c`1'{@w);e++"
+";`Qd>0){h=c`0e,e+1)`6q`Th==q$Cx)q`V`6h`h\\\\')x=x?0:1;`s x=0}`s{$2h"
+"`h\"'||h==\"'\")q=h`6h`h{')d++`6h`h}')d--^1d>0)e$Bc=c`00,s)+'new F`"
+"K('+(a?a+`z`U+'\"'+^ife(c`0o+1,$G+'\")'+c`0e+$Fs=c`1'f`K')}fc+=^ife"
+"(c)$h`2s\");';@5fc);`2f}f`K s_co(o){`M^y\"^ \",1,$F`2@fo)}f`K @d$3{"
+"`M^y$N1,$F`2@Uf`K s_dc($3{`M^y$N$F`2@Uf`K s_c($Npg,ss`4;s._c@ic';`E"
+"=@G`6!`E^An){`E^Al`Z@2;`E^An=0;}s._il=`E^Al;@g=`E^An;s._il[@g]=s;`E"
+"^An++;s.m`3m){`2@um)`1'{$D0`9fl`3x,l){`2x?@ux)`00,l):x`9co`3o`T!o)`"
+"2o;`Mn`C,x^D@ho)$2x`1'select$D0&&x`1'filter$D0)n[x]=o[x];`2n`9num`3"
+"x$E`V+x^D`Mp=0;p<x`B;p++)$2(@E')`1x`0p,p@S<0)`20;`21`9rep`3x,o,n){`"
+"Mi=x`1o);`Qx$l=0$E=x`00,i)+n+x`0i+o`B);i=x`1o,i+n`B)}`2x`9ape`3x`4,"
+"h=@EABCDEF',i,c=s.^v,n,l,e,y`V;c=c?c`D():''`6x$E`V+x`6c`hAUTO'^W'')"
+".c^VAt){for(i=0;i<x`B;i$cc=x`0i,i+$Fn=x.c^VAt(i)`6n>127){l=0;e`V;`Q"
+"n||l<4){e=h`0n%16,n%16+1)+e;n=`on/16);l$By+='%u'+e}`Ac`h+')y+='%2B'"
+";`s y+=^Sc)}x=y}`s{x=x?`x^S''+x),'+`z%2B'):x`6x&&c^Zem==1&&x`1'%u$D"
+"0&&x`1'%U$D0){i=x`1'%^c`Qi>=0){i++`6h`08)`1x`0i,i+1)`D())>=0)`2x`00"
+",i)+'u00'+x`0i);i=x`1'%',i)}}}}`2x`9epa`3x`4;`2x?un^S`x''+x,'+`z ')"
+"):x`9pt`3x,d,f,a`4,t=x,z=0,y,r;`Qt){y=t`1d);y=y<0?t`B:y;t=t`00,y);^"
+"0t,@zt,a)`6r)`2r;z+=y+d`B;t=x`0z,x`B);t=z<x`B?t:''}`2''`9isf`3t,a){"
+"`Mc=a`1':')`6c>=0)a=a`00,c)`6t`00,2)`h$9`02);`2(t!`V@P==a)`9fsf`3t,"
+"a`4`6`Na`Pis^dt))@8+=(@8!`V?`z`U+t;`20`9fs`3x,f`4;@8`V;`Nx`Pfs^df);"
+"`2@8`9c_d`V;$Vf`3t,a`4`6!$Tt))`21;`20`9c_gd`3`4,d=`E`F`w^g,n=s.fpC`"
+"O,p`6!n)n=s.c`O`6d$C@k@Rn?`on):2;n=n>2?n:2;p=d`a.')`6p>=0){`Qp>=0&&"
+"n>1$jd`a.',p-$Fn--}@k=p>0&&`Nd,'.`zc_gd^d0)?d`0p):d}}`2@k`9c_r`3k`4"
+";k=$Uk);`Mc=@Ts.d.`n,i=c`1@Tk+@Q,e=i<0?i:c`1';',i),v=i<0$d@Jc`0i+2+"
+"k`B,e<0?c`B:$G;`2v$e[[B]]'?v:''`9c_w`3k,v,e`4,d=$V(),l=s.`n^m,t;v`V"
+"+v;l=l?@ul)`D():''`6^b^st=(v!`V?`ol?l:0):-60)`6t){e`Z^f;e$a@I(e^K+("
+"t*1000))}^1k^ss.d.`n=k+'`Jv!`V?v:'[[B]]')$h path=/;'+(^b?' expires$"
+"fe.toGMT`v()$h'`U+(d?' domain$fd$h'`U;`2^jk)==v}`20`9eh`3o,e,r,f`4,"
+"b='s^ee+'^e@g,n=-1,l,i,x`6!^Ll)^Ll`Z@2;l=^Ll^Di=0;i<l`B&&n<0;i++`Tl"
+"[i].o==o&&l[i].e==e)n=i^1n<0@Ri;l[n]`C}x$nx.o=o;x.e=e;f=r?x.b:f`6r|"
+"|f$E.b=r?0:o[e];x.o[e]=f^1x.b$E.o[b]=x.b;`2b}`20`9cet`3f,a,t,o,b`4,"
+"r`6`I>=5^W!s.^R||`I>=7))@5'$O^0@za)`yr=s.m(t)?s[t](e):t(e)}^c`s{$2^"
+"B^Zu`1$P4@O0)r=s.m(b)?s$ma):b(a);`s{^L(`E,'^w',0,o);^0@za`Reh(`E,'^"
+"w',1)}}`2r`9g^Iet`3e`4;`2`p`9g^Ioe`8;^L(@G,\"^w\",1`Re^I=1;`Mc=s.t("
+")`6c)s.d.write(c`Re^I=0;`2@Z'`Rg^Ifb`3a){`2@G`9g^If`3w`4,p=w@1,l=w`"
+"F;`p=w`6p&&p`F!=l&&p`F`w==l`w){`p=p;`2s.g^If(`p)}`2`p`9g^I`3`4`6!`p"
+"){`p=`E`6!s.e^I)`p=s.cet('g^I^d`p,'g^Iet@w.g^Ioe,'g^Ifb')}`2`p`9mrq"
+"`3u`4,l=^k],n,r;^k]=0`6l)for(n=0;n<l`B;n$cr$ns.mr(0,0,r.t,r.u,r.r)}"
+"`9mr`3@a,q,ta,u,rs`4,dc=$W,t1=s.^6@Y,t2=s.^6@YSecure,ns=s.`m`gspace"
+",un=u?u:$8s.f$3,unc=`x$N'_`z-'),r`C,l,imn@ii^e($3,im,b,e`6!rs){rs='"
+"http'+@L?'s'`U+'://'+(t1?@L@P2?t2:t1):($8@L?'102':unc))+'.'+($W?$W:"
+"112)+'.2o7.net')@vb/ss/'+^2+'/1/H.13-Pdvu-2/'+@a+'?[AQB]&ndh=1'+(q?"
+"q`U+'&[AQE]'`6^M$C^B`T`I>5.5)rs=^Urs,4095);`s rs=^Urs,2047)}^1s.d.i"
+"mages&&`I>=3^W!s.^R||`I>=7)^W@9<0||`I>=6.1)`T!s.rc)s.rc`C`6!^F){^F="
+"1`6!s.rl)s.rl`C;^kn]`Z@2;set@Iout('`l,750)}`s{l=^kn]`6l){r.t=ta;r.u"
+"=un;r.r=rs;l[l`B]=r;`2''}imn+='^e^F;^F$Bim=`E[imn]`6!im)im=`E[imn]`"
+"ZImage;im@6l=0;im.@H`ZF`K('e`z^u@6l=1;`l);im$Q=rs`6rs`1@l=@O0^W!ta|"
+"|ta`h_self@xa`h_top'||(`E.^g@Pa==`E.^g))){b=e`Z^f;`Q!im@6l&&e^K-b^K"
+"<500)e`Z^f}`2''}`2'<im'+'g sr'+'c=\"'+rs+'\" width=1 $I=1 border=0 "
+"alt=\"\">'`9gg`3v`4`6!`E['s^ev])`E['s^ev]`V;`2`E['s^ev]`9glf`3t,a`T"
+"t`00,2)`h$9`02);`Ms=^u,v=s.gg(t)`6v)s[t]=v`9gl`3v`4`6$S)`Nv`Pgl^d0)"
+"`9gv`3v`4;`2s['vpm^ev]?s['vpv^ev]:(s[v]?s[v]`U`9havf`3t,a`4,b=t`00,"
+"4),x=t`04),n=`ox),k='g^et,m='vpm^et,q=t,v=s.`H@DVars,e=s.`H@D$Y;@F@"
+"mt)`6s.@3||^3){v=v?v+`z+^N+`z+^N2:''`6v$C`Nv`Pis^dt))s[k]`V`6t`h$J'"
+"&&e)@Fs.fs(s[k],e)}s[m]=0`6t`h`mID`Gvid`5^9^pg'`W`At`h`t^pr'`W`At`h"
+"vmk`Gvmt`5^v^pce'`6s[k]&&s[k]`D()`hAUTO')@F'ISO8859-1';`As[k]^Zem=="
+"2)@F'UTF-8'}`At`h`m`gspace`Gns`5c`O`Gcdp`5`n^m`Gcl`5^X`Gvvp`5^x`Gcc"
+"`5$1`Gch`5^q`Gxact`5@b`Gv0`5^J`Gs`5`u`Gc`5`i`Gj`5`X`Gv`5`n^o`Gk`5`r"
+"^n`Gbw`5`r^P`Gbh`5`Y`Gct`5^h`Ghp`5p^C`Gp';`A$Tx)`Tb`hprop`Gc$H;`Ab`"
+"heVar`Gv$H;`Ab`hhier^ph$H`W^1s[k]@P$e`H`g'@P$e`H^E')@n+='&'+q+'`Js["
+"k]);`2''`9hav`3`4;@n`V;`N^O`Phav^d0);`2@n`9lnf`3^Q`7^a`7:'';`Mte=t`"
+"1@Q`6t@Pe>0&&h`1t`0te@S>=0)`2t`00,te);`2''`9ln`3h`4,n=s.`H`gs`6n)`2"
+"`Nn`Pln^dh);`2''`9ltdf`3^Q`7^a`7:'';`Mqi=h`1'?^ch=qi>=0?h`00,qi):h`"
+"6t&&h`0h`B-(t`B@S`h.'+t)`21;`20`9ltef`3^Q`7^a`7:''`6t&&h`1t)>=0)`21"
+";`20`9lt`3h`4,lft=s.`H^HFile^Es,lef=s.`HEx`e,@c=s.`HIn`e;@c=@c?@c:`"
+"E`F`w^g;h=h`7`6s.^6^HLinks&&lft&&`Nlft`Pltd^dh))`2'd'`6s.^6^t^Wlef|"
+"|@c)^W!lef||`Nlef`Plte^dh))^W!@c||!`N@c`Plte^dh)))`2'e';`2''`9lc`8,"
+"b=^L(^u,\"`d\"`R@3=@f^u`Rt(`R@3=0`6b)`2^u$me);`2@Z'`Rbc`8,f`6s.d^Zd"
+".all^Zd.all.cppXYctnr)return;^3=^z?^z:e$4;@5\"$O$2^3^W^3.tag`g||^3."
+"par`f||^3@1Nod$G@Ucatch$i}\"`Reo=0'`Roh`3o`4,l=`E`F,h=^l?^l:'',i,j,"
+"k,p;i=h`1':^cj=h`1'?^ck=h`1'/')`6h^Wi<0||(j>=0$lj)||(k>=0$lk))$jo`S"
+"&&o`S`B>1?o`S:(l`S?l`S`U;i=l.path^g`a/^ch=(p?p+'//'`U+(o`w?o`w:(l`w"
+"?l`w`U)+(h`00,1)$e/'?l.path^g`00,i<0?0:i@v'`U+h}`2h`9ot`3o){`Ma=o.t"
+"ype,b=o.tag`g;`2(a&&a`D?a:b&&b`D?b:^l?'A'`U`D()`9oid`3o`4,^5,p=o`S,"
+"c=o.`d,n`V,x=0`6!`q`T^l^Wt`hA@x`hAREA')^W!c||!p||p`7`1'javascript$D"
+"0))n@W`Ac@R`xs.rep(`xs.rep@uc,\"\\r@V\"\\n@V\"\\t@V' `z^cx=2}`A$5^W"
+"t`hINPUT@x`hSUBMIT')@R$5;x=3}`Ao$Q@P`hIMAGE')n=o$Q`6n){`q=^Un@e;`qt"
+"=x}}`2`q`9rqf`3t,un`4,e=t`1@Q,u=e>=0?`z+t`00,e)+`z:'';`2u&&u`1`z+un"
+"+`z)>=0?@Jt`0e@S:''`9rq`3un`4,c=un`1`z),v=^j's_sq'),q`V`6c<0)`2`Nv,"
+"'&`zrq^d$3;`2`Nun`Prq',0)`9sqp`3t,a`4,e=t`1@Q,q=e<0$d@Jt`0e+1)`Rsqq"
+"[q]`V`6e>=0)`Nt`00,e)`P@r`20`9sqs`3$Nq`4;^4u[un]=q;`20`9sq`3q`4,k@i"
+"sq',v=^jk),x,c=0;^4q`C;^4u`C;^4q[q]`V;`Nv,'&`zsqp',0);`N^2`P@rv`V^D"
+"@h^4u`L)^4q[^4u[x]]+=(^4q[^4u[x]]?`z`U+x^D@h^4q`L&&^4q[x]^Wx==q||c<"
+"2)){v+=(v$g'`U+^4q[x]+'`Jx);c$B`2@Kk,v,0)`9wdl`8,r=@Z,b=^L(`E,\"@H"
+"\"),i,o,oc`6b)r=^u$me)^Di=0;i<s.d.`Hs`B;i$co=s.d.`Hs[i];oc=o.`d?\""
+"\"+o.`d:\"\"`6(oc`1\"@d\")<0||oc`1\"@6oc(\")>=0)&&oc`1$6<0)^L(o,\"`"
+"d\",0,s.lc);}`2r^c`Es`3`4`6`I>3^W!^M||!^B||`I$k`Ts.b^Z^r)s.^r('`d@w"
+".bc);`As.b&&^G)^G('click@w.bc,false);`s ^L(`E,'@H',0,`El)}`9vs`3x`4"
+",v=s.`m@q,g=s.`m@qGroup,k@ivsn^e^2+(g?'^eg`U,n=^jk),e`Z^f,y=e.get@s"
+");e$a@sy+10@X1900:0))`6v){v*=100`6!n`T!@Kk,x,$G`20;n=x^1n%10000>v)`"
+"20}`21`9dyasmf`3t,m`Tt&&m&&m`1t)>=0)`21;`20`9dyasf`3t,m`4,i=t?t`1@Q"
+":-1,n,x`6i>=0&&m){`Mn=t`00,i),x=t`0i+1)`6`Nx`Pdyasm^dm))`2n}`20`9un"
+"s`3`4,x`kSelection,l`kList,m`kMatch,n,i;^2=^2`7`6x&&l`T!m)m=`E`F`w`"
+"6!m.toLowerCase)m`V+m;l=l`7;m=m`7;n=`Nl,';`zdyas^dm)`6n)^2=n}i=^2`1"
+"`z`Rfun=i<0?^2:^2`00,i)`9sa`3un`4;^2=un`6!@B)@B=un;`A(`z+@B+`z)`1$3"
+"<0)@B+=`z+un;^2s()`9t`3`4,$K=1,tm`Z^f,sed=Math&&@7$L?@7$R@7$L()*100"
+"00000000000):`b@I(),@a='s'+@7$R`b@I()/10800000)%10+sed,y=`b@s),vt=`"
+"b^f(@v'+`bMonth(@v'@Xy+1900:y)+@T`bHour@y`bMinute@y`bSeconds()+@T`b"
+"Day()+@T`b@IzoneO@j(),^I=s.g^I(),ta`V,q`V,qs`V@0`Runs()`6!s.td){`Mt"
+"l=^I`F,a,o,i,x`V,c`V,v`V,p`V,bw`V,bh`V,^70',k=@K's_cc`z@Z',0^8,hp`V"
+",ct`V,pn=0,ps`6`v&&`v.prototype){^71'`6j.match){^72'`6tm$aUTC^f){^7"
+"3'`6^M&&^B&&`I$k^74'`6pn.toPrecision){^75';a`Z@2`6a.forEach){^76';i"
+"=0;o`C;@5'$Oi`ZIterator(o)`y}')`6i&&i.next)^77'}}}}^1`I>=4)x=^Twidt"
+"h+'x'+^T$I`6s.isns||s.^R`T`I>=3$0`X(^8`6`I>=4){c=^TpixelDepth;bw=`E"
+"$X^n;bh=`E$X^P}}@o=s.n.p^C}`A^M`T`I>=4$0`X(^8;c=^T`u`6`I$k{bw=s.d.@"
+"A`f.o@j^n;bh=s.d.@A`f.o@j^P`6!^B^Zb){`ch$A^chp=s.b.isH$A(tl^8`y}\")"
+";`cclientCaps^cct=s.b.`Y`y}\")}}}`s r`V^1@o)`Qpn<@o`B&&pn<30){ps=^U"
+"@o[pn].^g@e$h'`6p`1ps)<0)p+=ps;pn$Bs.^J=x;s.`u=c;s.`i=j;s.`X=v;s.`n"
+"^o=k;s.`r^n=bw;s.`r^P=bh;s.`Y=ct;s.^h=hp;s.p^C=p;s.td=1^1s.useP^C)s"
+".doP^C(s);`Ml=`E`F,r=^I.@Aent.`t`6!s.^9)s.^9=l`6!s.`t)s.`t=r`6s.@3|"
+"|^3){`Mo=^3?^3:s.@3`6!o)`2'';`Mp=@m'$Z`g'),w=1,^5,@M,x=`qt,h,l,i,oc"
+"`6^3&&o==^3){`Qo$Cn@P$eBODY'){o=o.par`f?o.par`f:o@1Node`6!o)`2'';^5"
+";@M;x=`qt}oc=o.`d?''+o.`d:''`6(oc`1\"@d\")>=0&&oc`1\"@6oc(\")<0)||o"
+"c`1$6>=0)`2''}ta=n?o$4:1;h@Wi=h`1'?^ch=s.`H@N`v||i<0?h:h`00,i);l=s."
+"`H`g?s.`H`g:s.ln(h);t=s.`H^E?s.`H^E`7:s.lt(h)`6t^Wh||l))q+=@l=@3^e("
+"t`hd@x`he'?$Ut):'o')+(h?@lv1`Jh)`U+(l?@lv2`Jl)`U;`s $K=0`6s.^6@C`T!"
+"p$j@m'^9^cw=0}^5;i=o.sourceIndex`6^Y@R^Y;x=1;i=1^1p&&n@P)qs='&pid`J"
+"^Up,255))+(w$gpidt$fw`U+'&oid`J^Un@e)+(x$goidt$fx`U+'&ot`Jt)+(i$goi"
+"$fi`U}^1!$K$Cqs)`2''`6s.p_r)s.p_r();`M$M`V`6$K^Zvs(sed))$M=s.mr(@a,"
+"(vt$gt`Jvt)`U+s.hav()+q+(qs?qs:s.rq(^2)),ta`Rsq($K$dqs`R@3=^3=s.`H`"
+"g=s.`H^E=`E@6objectID=s.ppu`V`6$S)`E@6@3=`E@6eo=`E@6`H`g=`E@6`H^E`V"
+";`2$M`9tl`3o,t,n`4;s.@3=@fo`R`H^E=t;s.`H`g=n;s.t()`9ssl=(`E`F`S`7`1"
+"'https@O0`Rd=@Aent;s.b=s.d.body;s.n=navigator;s.u=s.n.userAgent;@9="
+"s.u`1'N$76/^c`Mapn@t`g,v@tVersion,ie=v`1$P'),o=s.u`1'@4 '),i`6v`1'@"
+"4@O0||o>0)apn='@4';^M@p`hMicrosoft Internet Explorer'`Risns@p`hN$7'"
+"`R^R@p`h@4'`Rismac=(s.u`1'Mac@O0)`6o>0)`I`js.u`0o+6));`Aie>0){`I=`o"
+"i=v`0ie+5))`6`I>3)`I`ji)}`A@9>0)`I`js.u`0@9+10));`s `I`jv`Rem=0`6`v"
+"$b^V){i=^S`v$b^V(256))`D(`Rem=(i`h%C4%80'?2:(i`h%U0100'?1:0))}s.sa("
+"un`Rvl_l='`mID,vmk,ppu,^v,`m`gspace,c`O,`n^m,$Z`g,^9,`t,^x';^O=^N+'"
+",^X,$1,server,$Z^E,^q,purchaseID,@b,state,zip,$J,products,`H`g,`H^E"
+"'^D`Mn=1;n<51;n++)^O+=',prop$H+',eVar$H+',hier$H;^N2='^J,`u,`i,`X,`"
+"n^o,`r^n,`r^P,`Y,^h,p^C';^O+=`z+^N2;s.vl_g=^O+',^6^HLinks,^6^t,^6@C"
+",`H@N`v,`H^HFile^Es,`HEx`e,`HIn`e,`H@DVars,`H@D$Y,`H`gs,@3';$S=pg@0"
+")`6!ss)`Es()}",
w=window,l=w.s_c_il,n=navigator,u=n.userAgent,v=n.appVersion,e=
v.indexOf('MSIE '),m=u.indexOf('Netscape6/'),a,i,s;if(un){un=
un.toLowerCase();if(l)for(i=0;i<l.length;i++){s=l[i];if(s._c=='s_c'){
if(s.oun==un)return s;else if(s.fs(s.oun,un)){s.sa(un);return s}}}}
w.eval(d);c=s_d(c);i=c.indexOf("function s_c(");w.eval(c.substring(0,i
));if(!un)return 0;c=c.substring(i);if(e>0){a=parseInt(i=v.substring(e
+5));if(a>3)a=parseFloat(i)}else if(m>0)a=parseFloat(u.substring(m+10)
);else a=parseFloat(v);if(a>=5&&v.indexOf('Opera')<0&&u.indexOf(
'Opera')<0){eval(c);return new s_c(un,pg,ss)}else s=s_c2f(c);return s(
un,pg,ss)}s_gi()