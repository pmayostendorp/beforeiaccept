// 2014/12/02 16:36:31
var ANV='6.4.7';
var ANAXCD=24;
var ANDCC='zzz';
var ANDPEFA;
var ANDPEFAI=' ANDEPC18382';
var ANEU='http://tacoda.at.atwola.com/e/e.js?';
var ANME=0;
var ANMU='http://tacoda.at.atwola.com/dastat/ping.js?';
var ANP=2;
var ANPIC;
var ANPIR='';
var ANPIDC="-";
var ANPIRF=1;
var ANPIRPSL=1;
var ANPIRSSL=0;
var ANPIS="unescape(document.location.href).toLowerCase()";
var ANPUF=1;
var ANSID=18382;
var ANTCC;
var AMSC=new Array(ANID);
var AMSDPF;
var AMSLGC=0;
var AMSRID='';
var AMSSID='';
var AMSSRID='';
var AMSTEP='tste';
var AMSTES="tte/blank.gif";
var ANDD='';
var ANDNX=new Array();
var ANID='TID';
var ANCC=0;
var ANDPU='http://tacoda.at.atwola.com/rtx/r.js?';
var ANRDF=1;
var ANSCC="unescape(document.location.href).toLowerCase()";
var ANTPUD;
var ANVDT=0;
var CCLOOKUP22='AFJY/retirement|BFJXinvesting/etf|BINVhow-to-invest|BPFZpersonal-finance|BINVinvesting|KINV/basics|MINVeginning|LGWCoptions|LDUBsmall-cap|LDUBdividends-income|LDUBhigh-growth|LDUBvalue|BABGmutualfunds|BINVinvesting/international|AGWJcaps.fool.com|ADUBtickerrankings.aspx|ADUB/investing/etf|BDYRretirement|LDYR/ira|MDYR401k|MDYRassetallocation|AFORboards.fool.com|ASHP/shop|BAKNinsurancecenter/auto|RAKPlife|QAKM|AINVfool.com';
var ANAXLSL='';
var ANCB1=0;
var ANCB3=0;
var ANRD='';
var ANOO=0;
var ANCCPD=1;
var ANCCSD=0;
var ANTPPF=1;
var ANXCC='ZZZ';
var AMSK=new Array();
var AMSN=0;
var AMSVL=new Array();
var ANVDA=0;
var ANVSC='';
var ANVSA='';
var ANAXCP;
var ANAXQF=0;
var ANMSL;
var ANSL;
var axOnSet;
var TCDACMDADD='';
var ANMCCF=1;
var ANDEMOF=1;
var ANDEMOURL='http://ar.atwola.com/atd';
var ANBKF=1;
var ANBKURL='http://tags.bluekai.com/site/4470?id=UTID';
var ANBKFRAME='1';
var ANBKFRURL='http://an.tacoda.net/an/bkids.html';
var ANACF=1;
var ANACURL='http://d.p-td.com/r/dt/id/L21rdC80L21waWQvMzMxNTMzNg/mpuid/UTID';
var ANACFRAME='1';
var ANACFRURL='http://an.tacoda.net/an/acids.html';
var ANBTF=1;
var ANBTURL='http://s.thebrighttag.com/cs?tp=ao&aolid=UTID';
var ANBTFRAME='1';
var ANBTFRURL='http://an.tacoda.net/an/btids.html';
var ANADF=1;
var ANADURL='http://dpm.demdex.net/ibs:dpid=416&dpuuid=UTID';
var ANADFRAME='1';
var ANADFRURL='http://an.tacoda.net/an/adids.html';
var ATSYNCT=-1;
var ATSYNCINTERVAL=-1;
var ATSYNCFRAME='1';
var ATSYNCFRURL='http://an.tacoda.net/an/atids.html';
var ANBYODE='bk';
var ANBYODS='bk,^100[0-9]{3}$';
var ANBYODO='bk';
var ANTPX='[24]';
function FTPP()
{
var v=ANTID;
if((v!=null)&&(v!='tacodaamoptout')&&(ANSR))
{
var b=Math.floor(Math.random()*100000);
var t=ANSL;
FPAC(v,t,b);
}
}
function FCSS(t,d){
var m=false;
var x;
var e=","+ANBYODE+",";
var o=ANBYODO.split(",");
var p=ANBYODS.split(":");
var a=t.split("|");
var i;
var s=new Array();
var tcs;
var id;
var sw;
var le;
for(i=0;i<p.length;i++){
p[i]=p[i].split(",");
if(e.indexOf(","+p[i][0]+",")==-1){
p.splice(i,1);
}
}
for(i=0;i<a.length;i++){
x=(p.length-1);
m=false;
while(x>=0&&m==false){
id=p[x][0];
re=eval('/'+p[x][1]+'/i');
if(id!='tc'){
if(a[i].search(re)!=-1){
if(id in s){
s[id]+=d+a[i]+ANTPX;
}else{
s[id]=id+'='+a[i]+ANTPX;
}
m=true;
}
}
x--;
}
if(m==false&&a[i].length>=5){
if(tcs==null){
tcs='tc='+a[i]+ANTPX;
}else{
tcs+=d+a[i]+ANTPX;
}
}
}
var r=(tcs!=null)?tcs:'tc=0|';
for(i=0;i<o.length;i++){
if(o[i]in s){
if(o[i]!='tc'){
r+=(tcs!=null||s.length>1)?'|'+s[o[i]]:s[o[i]];
}
}
else{
if(o[i]!='tc'){
r+=(tcs!=null)?'|'+o[i]+'=0':o[i]+'=0';
}
}
}
return r;
}
function FPAC(v,t,b){
var u='<IMG'+' SRC="http://leadback.advertising.com/adcedge/lb?site=695501&betr=';
if(t==null){
u+='tc=1&guidm=1:'+v;
}else{
var s=FCSS(t,',');
if(s==''){
s='tc=0';
var e=ANBYODE.split(",");
for(i=0;i<e.length;i++){
if(e[i]!='tc'){
s+='|'+e[i]+'=0';
}
}
}
u+=s+'&guidm=1:'+v;
}
document.write(u+'&bnum='+b+'" STYLE="display: none" height="1" width="1" border="0">');
}
function ANAXSC()
{
var xs=null;
var lsa=ANAXLSL.split("|");
var asa=ANSL.split("|");
for(lsi=0;lsi<lsa.length;lsi++)
{
for(asi=0;asi<asa.length;asi++)
{
if(lsa[lsi]==asa[asi])
{
if(xs==null)
{
xs=lsa[lsi];
}
else
{
xs+='|'+lsa[lsi];
}
break;
}
}
}
var cp=(ANAXCP==null)?"/":ANAXCP;
xd=(xs==null)?null:'1#'+xs;
ANSC('AxData',xd,ANAXCD*3600000,cp);
ANSC('Axxd','1',null,cp);
if(axOnSet!=null)
{
axOnSet();
}
return(ANAXQF==1)?xs:null;
}
function ANRC(n){
var cn=n+"=";
var dc=document.cookie;
if(dc.length>0){
for(var b=dc.indexOf(cn);b!=-1;b=dc.indexOf(cn,b)){
if((b!=0)&&(dc.charAt(b-1)!=' ')){
b++;
continue;
}
b+=cn.length;
var e=dc.indexOf(";",b);
if(e==-1)e=dc.length;
return decodeURIComponent(dc.substring(b,e));
}
}
return null;
}
function ANSC(n,v,ex,p){
var e=document.domain.split(".");
e.reverse();
var m=e[1]+'.'+e[0];
var cc=n+"=";
if(v!=null)
{
cc+=v;
}
if(ex){
var exp=new Date;
exp.setTime(exp.getTime()+ex);
cc+=";expires="+exp.toGMTString();
}
if(p){
cc+=";path="+p;
}
if(m){
cc+=";domain="+m;
}
document.cookie=cc;
}
function ANGRD(){
if(top!=self||ANRD!=''){
return ANRD;
}
var rf=top.location.href;
var i=j=0;
i=rf.indexOf('/');
i=rf.indexOf('/',++i);
j=rf.indexOf('/',++i);
if(j==-1){
j=rf.length;
}
r=rf.substring(i,j);
return r;
}
function ANGPU()
{
if(top!=self)
{
return document.referrer;
}
return top.location.href;
}
function ANTR(s){
if(!s){
return'';
}
s=s.replace(/^\s*/g,'');
s=s.replace(/\s*$/g,'');
return s;
}
function ANGCC()
{
var ccc=ANTCC;
if((ccc==null)||
!ccc.match(/^\w{3}(:\w{3})*$/))
{
ccc=ANDCC.toUpperCase();
}
return ccc;
}
function TCDA(tc)
{
var kw;
var pb;
if((tc!=null)&&(tc!=''))
{
var pa=tc.split(";");
for(var p=0;p<pa.length;p++)
{
kv=pa[p].split("=");
k=kv[0];
v=kv[1];
if(k!=null){
k=ANTR(k);
}
if(v!=null){
v=ANTR(v);
}
var m=k.toUpperCase();
switch(m){
case("CC"):
v=v.toUpperCase();
if(v!=null&&v!='')
{
ANTCC=v;
}
break;
case("PI"):
v=v.toUpperCase();
if(v!=null&&v!='')
{
ANPIC=v;
}
break;
case("SC"):
if(v!=null&&v!=''){
if(v.length>256){v=v.substring(0,256);}
ANVSC=v;
}
break;
case("RD"):
if(v!=null&&v!=''){
if(v.length>128){v=v.substring(0,128);}
ANRD=v.toLowerCase();
}
break;
case("DT"):
ANVDT=1;
break;
case("ND"):
ANVDT=0;
break;
case("UD"):
if(v!=null&&v!='')
{
ANTPUD=v;
}
break;
case("DA"):
ANVDA=1;
break;
default:
if(v!=null&&v!=''){
ANCV(k,v);
}
}
}
}
ANPA();
}
function ANPA()
{
if(ANDPEFA==null)
{
ANDPEFA=[];
}
if(((ANP&2)!=0)&&
(ANDPEFA[ANDPEFAI]==null)&&
(ANVDT==1)&&
(ANOO==0))
{
ANDPEFA[ANDPEFAI]=1;
ANVDT=0;
ANGDCC();
ANSDR(ANGPIC());
}
if(ANVDA==1)
{
ANDA();
ANVDA=0;
}
}
function ANRTXR()
{
var u;
var xs;
if(ANSL!=null)
{
var tsa=ANSL.split("|");
if(ANAXLSL!=null)
{
xs=ANAXSC(tsa);
}
}
if(1==ANTPPF)
{
try
{
FTPP();
}
catch(e)
{
try
{
var s='http://anrtx.tacoda.net/e/e.js?s=tpp&m='+encodeURIComponent(m);
document.write('<SCR'+'IPT SRC="'+s+'" LANGUAGE="JavaScript"></SCR'+'IPT>');
}
catch(e2)
{
}
}
}
}
function ANDEMO()
{
document.write('<IMG'+' SRC="'+ANDEMOURL+'" STYLE="display: none" height="1" width="1" border="0">');
}
function ATSYNC(url)
{
ATSYNCURL=url.replace('UTID',ANTID);
if(1==ATSYNCFRAME){
var encodedUrl=encodeURIComponent(ATSYNCURL);
var frmUrl=ATSYNCFRURL+'?url='+encodedUrl;
var atsyncfr=document.createElement("iframe");
atsyncfr.setAttribute('style','display: none');
atsyncfr.setAttribute('height','1');
atsyncfr.setAttribute('width','1');
atsyncfr.setAttribute('border','0');
atsyncfr.setAttribute('src',frmUrl);
document.body.appendChild(atsyncfr);
}else if(0==ATSYNCFRAME){
document.write('<IMG'+' SRC="'+ATSYNCURL+'" STYLE="display: none" height="1" width="1" border="0">');
}
}
function ANBK()
{
ANBKURL=ANBKURL.replace('UTID',ANTID);
if(1==ANBKFRAME){
var encodedUrl=encodeURIComponent(ANBKURL);
ANBKFRURL+='?url='+encodedUrl;
var bkfr=document.createElement("iframe");
bkfr.setAttribute('style','display: none');
bkfr.setAttribute('height','1');
bkfr.setAttribute('width','1');
bkfr.setAttribute('border','0');
document.body.appendChild(bkfr);
bkfr.setAttribute('src',ANBKFRURL);
}
if(0==ANBKFRAME){
document.write('<IMG'+' SRC="'+ANBKURL+'" STYLE="display: none" height="1" width="1" border="0">');
}
}
function ANAC()
{
ANACURL=ANACURL.replace('UTID',ANTID);
if(1==ANACFRAME){
var encodedUrl=encodeURIComponent(ANACURL);
ANACFRURL+='?url='+encodedUrl;
var acfr=document.createElement("iframe");
acfr.setAttribute('style','display: none');
acfr.setAttribute('height','1');
acfr.setAttribute('width','1');
acfr.setAttribute('border','0');
document.body.appendChild(acfr);
acfr.setAttribute('src',ANACFRURL);
}
if(0==ANACFRAME){
document.write('<IMG'+' SRC="'+ANACURL+'" STYLE="display: none" height="1" width="1" border="0">');
}
}
function ANBT()
{
ANBTURL=ANBTURL.replace('UTID',ANTID);
if(1==ANBTFRAME){
var encodedUrl=encodeURIComponent(ANBTURL);
ANBTFRURL+='?url='+encodedUrl;
var btfr=document.createElement("iframe");
btfr.setAttribute('style','display: none');
btfr.setAttribute('height','1');
btfr.setAttribute('width','1');
btfr.setAttribute('border','0');
document.body.appendChild(btfr);
btfr.setAttribute('src',ANBTFRURL);
}
if(0==ANBTFRAME){
document.write('<IMG'+' SRC="'+ANBTURL+'" STYLE="display: none" height="1" width="1" border="0">');
}
}
function ANAD()
{
ANADURL=ANADURL.replace('UTID',ANTID);
if(1==ANADFRAME){
var encodedUrl=encodeURIComponent(ANADURL);
ANADFRURL+='?url='+encodedUrl;
var adfr=document.createElement("iframe");
adfr.setAttribute('style','display: none');
adfr.setAttribute('height','1');
adfr.setAttribute('width','1');
adfr.setAttribute('border','0');
document.body.appendChild(adfr);
adfr.setAttribute('src',ANADFRURL);
}
if(0==ANADFRAME){
document.write('<IMG'+' SRC="'+ANADURL+'" STYLE="display: none" height="1" width="1" border="0">');
}
}
function Tacoda_AMS_DDC_addPair(k,v){
ANCV(k,v);
}
function ANCV(k,v){
AMSK[AMSN]=k;
AMSVL[AMSN]=v;
AMSN++;
}
function ANTCV(){
var TVS="";
for(var i=0;i<AMSN;i++){
if(!AMSK[i]){
continue;
}
if(!AMSVL[i]){
AMSVL[i]='';
}
TVS+="&amp;v_"+encodeURIComponent(AMSK[i].toLowerCase())+"="+encodeURIComponent(AMSVL[i].toLowerCase());
}
return TVS;
}
function Tacoda_AMS_DDC(tiu,tjv)
{
ANDDC(tiu,tjv);
}
function ANDA(){
var t='';
var e=ANGRD().split(".");
e.reverse();
t=e[1]+'.'+e[0];
if(typeof(ANDNX[t])!='undefined'){
t=ANDNX[t];
}
else{
t=ANDD;
}
var tiu='http://'+AMSTEP+'.'+t+'/'+AMSTES;
ANDDC(tiu,"0.0");
}
function ANDDC(tiu,tjv){
if(((ANP&1)!=0)&&
(AMSDPF!=1))
{
AMSDPF=1;
var ccc=ANGCC();
var ta="?"+Math.floor(Math.random()*100000)+"&amp;v="+ANV+"&amp;r="+encodeURIComponent(document.referrer)+"&amp;p="+ccc+":"+encodeURIComponent(ANVSC);
if(AMSLGC==1){
ta+="&amp;page="+encodeURIComponent(window.location.href);
}
ta+="&amp;tz="+(new Date()).getTimezoneOffset()+"&amp;s="+ANSID;
if(ANCB3==1)
{
ta+="&amp;ckblk3";
}
if(ANCB1==1)
{
ta+="&amp;ckblk1";
}
else
{
for(var i=0;i<AMSC.length;i++){
var cl=AMSC[i];
var clv=ANRC(cl);
if(cl!=null){
ta+="&amp;c_"+encodeURIComponent(cl)+"="+encodeURIComponent(clv);
}
}
}
ANRID()
ta+=ANTCV();
document.write('<IMG'+' SRC="'+tiu+ta+'" STYLE="display: none" height="1" width="1" border="0">');
}
}
function ANRID(){
if(AMSRID!=''&&AMSSID!=''){
if(ANRC(AMSRID)!=null){
AMSSRID=AMSSID+ANRC(AMSRID);
ANCV("regid",AMSSRID);
}
}
}
function ANDP(tc)
{
if((ANP&2)!=0)
{
ANTCC=tc.toUpperCase();
ANVDA=0;
ANCCF();
}
}
function ANV2R(v,rg,psl,ssl,rs,rd,mr)
{
var m;
var oc;
var r;
var rl;
var ss;
var lm="";
var rt=null;
var frt=null;
var ra=rg.split("|");
var pi=0;
var si=psl;
var oi=si+ssl;
var miwoo=oi+rs;
var miwo=miwoo+1;
for(ri=0;ri<ra.length;ri++)
{
r=ra[ri];
rl=r.length;
if(rl>=miwoo)
{
oc=r.charCodeAt(oi);
if((oc<42)&&(oc>32)&&(rl>=miwo))
{
if((psl==0)||(r.charAt(pi)=='A'))
{
m=r.substr(miwo,r.length-miwo);
}
else
{
m=lm.substr(0,r.charCodeAt(pi)-65);
m=m.concat(r.substr(miwo,r.length-miwo));
}
if((ssl!=0)&&(r.charAt(si)!='A'))
{
ss=r.charCodeAt(si)-65;
m=m.concat(lm.substr(lm.length-ss,ss));
}
switch(r.charAt(oi))
{
case"!":
if((v.length==m.length)&&(v.indexOf(m)==0))
{
rt=r.substr(oi+1,rs);
}
break;
case")":
if(v.lastIndexOf(m)==(v.length-m.length))
{
rt=r.substr(oi+1,rs);
}
break;
case"(":
if(v.indexOf(m)==0)
{
rt=r.substr(oi+1,rs);
}
break;
case"#":
if(v.search(m)!=-1)
{
rt=r.substr(oi+1,rs);
}
break;
case"&":
if(v.indexOf(m)!=-1)
{
rt=r.substr(oi+1,rs);
}
}
}
else
{
if((psl==0)||(r.charAt(pi)=='A'))
{
m=r.substr(miwoo,r.length-miwoo);
}
else
{
m=lm.substr(0,r.charCodeAt(pi)-65);
m=m.concat(r.substr(miwoo,r.length-miwoo));
}
if((ssl!=0)&&(r.charAt(si)!='A'))
{
ss=r.charCodeAt(si)-65;
m=m.concat(lm.substr(lm.length-ss,ss));
}
if(v.indexOf(m)!=-1)
{
rt=r.substr(oi,rs);
}
}
}
lm=m;
if(mr===1){
if(rt!==null){
rt=rt.toUpperCase();
if(rt===ANXCC){
if(frt===null){
frt=rt;
}
break;
}
if(frt===null){
frt=rt;
}else{
if(frt.indexOf(rt)===-1){
frt+=':'+rt;
}
}
}
}else{
if(rt!==null){
frt=rt.toUpperCase();
break;
}
}
}
return(frt==null)?rd:frt.replace(/\s+/g,"");
}
function ANGDCC()
{
if(ANCC!=1)
{
ANTCC=ANV2R(eval(ANSCC),CCLOOKUP22,ANCCPD,ANCCSD,3,ANDCC,ANMCCF).toUpperCase();
}
}
function ANGPIC()
{
if(ANPIRF==1)
{
ANPIC=ANV2R(eval(ANPIS),ANPIR,ANPIRPSL,ANPIRSSL,1,ANPIDC,0);
}
return(ANPIC==null)?ANPIDC:ANPIC;
}
function ANSDR(pic)
{
var ccc=ANGCC();
if((ccc.indexOf(ANXCC)!=0)||(ccc.length!=ANXCC.length))
{
var ANU="&amp;pi="+encodeURIComponent(pic.toUpperCase());
var xs=0;
if(ANAXLSL!=null)
{
xs+=1;
}
if(ANRC('Axxd')==null)
{
xs+=2;
}
if(xs>0)
{
ANU+="&amp;xs="+xs;
}
if(ANPUF==1)
{
ANU+="&amp;pu="+encodeURIComponent(ANGPU());
}
if(ANRDF==1)
{
ANU+="&amp;r="+ANGRD();
}
if(ANTPUD!=null)
{
ANU+="&amp;ud="+encodeURIComponent(ANTPUD);
}
if(ANDEMOF==1)
{
ANU+="&amp;df="+encodeURIComponent(ANDEMOF);
}
if(ATSYNCT!=null)
{
ANU+="&amp;atsync="+encodeURIComponent(ATSYNCT);
}
if(ATSYNCINTERVAL!=null)
{
ANU+="&amp;atsyncinterval="+encodeURIComponent(ATSYNCINTERVAL);
}
if(ANBKF==1)
{
ANU+="&amp;bf="+encodeURIComponent(ANBKF);
}
if(ANACF==1)
{
ANU+="&amp;acf="+encodeURIComponent(ANACF);
}
if(ANBTF==1)
{
ANU+="&amp;btf="+encodeURIComponent(ANBTF);
}
if(ANADF==1)
{
ANU+="&amp;adf="+encodeURIComponent(ANADF);
}
document.write('<SCR'+'IPT SRC="'+ANDPU+'cmd='+ccc+'&amp;si='+ANSID+ANU+'&amp;v='+ANV+'&amp;cb='+Math.floor(Math.random()*100000)+'" LANGUAGE="JavaScript"></SCR'+'IPT>');
}
ANSME(ccc);
}
function ANSME(ccc)
{
if(ANME==1)
{
ANME=0;
document.write('<SCR'+'IPT SRC="'+ANMU+ccc+'&amp;si='+ANSID+'&amp;cb='+Math.floor(Math.random()*100000)+'" LANGUAGE="JavaScript"></SCR'+'IPT>');
}
}
document.dartTData="";
document.dartTDataValue=ANRC("TData");
if(document.dartTDataValue!=""&&document.dartTDataValue!=null)
{
var f=document.dartTDataValue.split("|");
for(var i=0;i<f.length;i++)
{
document.dartTData+="kw="+f[i]+";";
}
}
document.dartTid=ANRC("TID");
if(document.dartTid!=""&&document.dartTid!=null)
{
document.dartTid="u="+document.dartTid+";";
}
try
{
var tc;
var tcdacmd
if(tcdacmd!=null)
{
tc=tcdacmd+TCDACMDADD;
}
else
{
tc=TCDACMDADD;
}
tcdacmd='';
TCDA(tc);
}
catch(e)
{
document.write('<SCR'+'IPT SRC="'+ANEU+'e='+encodeURIComponent(e)+'" LANGUAGE="JavaScript"></SCR'+'IPT>');
}
