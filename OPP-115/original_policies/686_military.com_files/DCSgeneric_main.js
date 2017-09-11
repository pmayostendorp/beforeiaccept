// WebTrends SmartSource Data Collector Tag
// Version: 9.4.0     
// Tag Builder Compatible Version: 3.3
// Created: 08/21/2012 12:00:00 PM

function WebTrends(){
    var that=this;
    // begin: user modifiable
    this.dcsid=gDcsId;
    this.domain="statse.webtrendslive.com";
    this.timezone=-5;
    //this.fpcdom and this.onsitedoms were changed to use the value that is coming from the DCSXXXX_XXXX.js file.
    this.fpcdom=gFpcDom;
    this.onsitedoms=gFpcDom;
    this.downloadtypes="xls,doc,pdf,txt,csv,zip,docx,xlsx";
    this.navigationtag="div,table";
    this.adclickparam="WT.ac";
    this.metanames="CUSTOM,META,LIST";
    this.trackevents=true;
    //this.trimoffsiteparams=true;
    this.enabled=true;
    this.i18n=true;
    this.fpc="WT_FPC";
    this.paidsearchparams="gclid";
    this.splitvalue="";
    this.preserve=true;
    // end: user modifiable
    this.DCS={};
    this.WT={};
    this.DCSext={};
    this.images=[];
    this.index=0;
    this.exre=(function(){return(window.RegExp?new RegExp("dcs(uri)|(ref)|(aut)|(met)|(sta)|(sip)|(pro)|(byt)|(dat)|(p3p)|(cfg)|(redirect)|(cip)","i"):"");})();
    this.re=(function(){return(window.RegExp?(that.i18n?{"%25":/\%/g,"%26":/\&/g}:{"%09":/\t/g,"%20":/ /g,"%23":/\#/g,"%26":/\&/g,"%2B":/\+/g,"%3F":/\?/g,"%5C":/\\/g,"%22":/\"/g,"%7F":/\x7F/g,"%A0":/\xA0/g}):"");})();
    //Code section customized for meta tag gathering
    this.A={};
    //Start Code to handle the specific DCSID for click tracking
    this.clickdcsid=((gClickDcsId)&&(gClickDcsId!=""))?gClickDcsId:this.dcsid;
    this.clicktracking=(gClickTracking)?true:false;
    //End Code to handle the specific DCSID for click tracking
}
WebTrends.prototype.dcsGetId=function(){
    if (this.enabled&&(document.cookie.indexOf(this.fpc+"=")==-1)&&(document.cookie.indexOf("WTLOPTOUT=")==-1)){
        document.write("<scr"+"ipt type='text/javascript' src='"+"http"+(window.location.protocol.indexOf('https:')==0?'s':'')+"://"+gDomain+"/"+this.dcsid+"/wtid.js"+"'><\/scr"+"ipt>");
    }
}
WebTrends.prototype.dcsGetCookie=function(name){
    var cookies=document.cookie.split("; ");
    var cmatch=[];
    var idx=0;
    var i=0;
    var namelen=name.length;
    var clen=cookies.length;
    for (i=0;i<clen;i++){
        var c=cookies[i];
        if ((c.substring(0,namelen+1))==(name+"=")){
            cmatch[idx++]=c;
        }
    }
    var cmatchCount=cmatch.length;
    if (cmatchCount>0){
        idx=0;
        if ((cmatchCount>1)&&(name==this.fpc)){
            var dLatest=new Date(0);
            for (i=0;i<cmatchCount;i++){
                var lv=parseInt(this.dcsGetCrumb(cmatch[i],"lv"));
                var dLst=new Date(lv);
                if (dLst>dLatest){
                    dLatest.setTime(dLst.getTime());
                    idx=i;
                }
            }
        }
        return unescape(cmatch[idx].substring(namelen+1));
    }
    else{
        return null;
    }
}
WebTrends.prototype.dcsGetCrumb=function(cval,crumb,sep){
    var aCookie=cval.split(sep||":");
    for (var i=0;i<aCookie.length;i++){
        var aCrumb=aCookie[i].split("=");
        if (crumb==aCrumb[0]){
            return aCrumb[1];
        }
    }
    return null;
}
WebTrends.prototype.dcsGetIdCrumb=function(cval,crumb){
    var id=cval.substring(0,cval.indexOf(":lv="));
    var aCrumb=id.split("=");
    for (var i=0;i<aCrumb.length;i++){
        if (crumb==aCrumb[0]){
            return aCrumb[1];
        }
    }
    return null;
}
WebTrends.prototype.dcsIsFpcSet=function(name,id,lv,ss){
    var c=this.dcsGetCookie(name);
    if (c){
        return ((id==this.dcsGetIdCrumb(c,"id"))&&(lv==this.dcsGetCrumb(c,"lv"))&&(ss==this.dcsGetCrumb(c,"ss")))?0:3;
    }
    return 2;
}
WebTrends.prototype.dcsFPC=function(){
    if (document.cookie.indexOf("WTLOPTOUT=")!=-1){
        return;
    }
    var WT=this.WT;
    var name=this.fpc;
    var dCur=new Date();
    var adj=(dCur.getTimezoneOffset()*60000)+(this.timezone*3600000);
    dCur.setTime(dCur.getTime()+adj);
    var dExp=new Date(dCur.getTime()+315360000000);
    var dSes=new Date(dCur.getTime());
    WT.co_f=WT.vt_sid=WT.vtid=WT.vtvs=WT.vt_f=WT.vt_f_a=WT.vt_f_s=WT.vt_f_d=WT.vt_f_tlh=WT.vt_f_tlv="";
    if (document.cookie.indexOf(name+"=")==-1){
        if ((typeof(gWtId)!="undefined")&&(gWtId!="")){
            WT.co_f=gWtId;
        }
        else if ((typeof(gTempWtId)!="undefined")&&(gTempWtId!="")){
            WT.co_f=gTempWtId;
            WT.vt_f="1";
        }
        else{
            WT.co_f="2";
            var curt=dCur.getTime().toString();
            for (var i=2;i<=(32-curt.length);i++){
                WT.co_f+=Math.floor(Math.random()*16.0).toString(16);
            }
            WT.co_f+=curt;
            WT.vt_f="1";
        }
        if (typeof(gWtAccountRollup)=="undefined"){
            WT.vt_f_a="1";
        }
        WT.vt_f_s=WT.vt_f_d="1";
        WT.vt_f_tlh=WT.vt_f_tlv="0";
    }
    else{
        var c=this.dcsGetCookie(name);
        var id=this.dcsGetIdCrumb(c,"id");
        var lv=parseInt(this.dcsGetCrumb(c,"lv"));
        var ss=parseInt(this.dcsGetCrumb(c,"ss"));
        if ((id==null)||(id=="null")||isNaN(lv)||isNaN(ss)){
            return;
        }
        WT.co_f=id;
        var dLst=new Date(lv);
        WT.vt_f_tlh=Math.floor((dLst.getTime()-adj)/1000);
        dSes.setTime(ss);
        if ((dCur.getTime()>(dLst.getTime()+1800000))||(dCur.getTime()>(dSes.getTime()+28800000))){
            WT.vt_f_tlv=Math.floor((dSes.getTime()-adj)/1000);
            dSes.setTime(dCur.getTime());
            WT.vt_f_s="1";
        }
        if ((dCur.getDay()!=dLst.getDay())||(dCur.getMonth()!=dLst.getMonth())||(dCur.getYear()!=dLst.getYear())){
            WT.vt_f_d="1";
        }
    }
    WT.co_f=escape(WT.co_f);
    WT.vt_sid=WT.co_f+"."+(dSes.getTime()-adj);
    WT.vtid=(typeof(this.vtid)=="undefined")?WT.co_f:(this.vtid||"");
    WT.vtvs=(dSes.getTime()-adj).toString();
    var expiry="; expires="+dExp.toGMTString();
    var cur=dCur.getTime().toString();
    var ses=dSes.getTime().toString();
    document.cookie=name+"="+"id="+WT.co_f+":lv="+cur+":ss="+ses+expiry+"; path=/"+(((this.fpcdom!=""))?("; domain="+this.fpcdom):(""));
    var rc=this.dcsIsFpcSet(name,WT.co_f,cur,ses);
    if (rc!=0){
        WT.co_f=WT.vt_sid=WT.vtvs=WT.vt_f_s=WT.vt_f_d=WT.vt_f_tlh=WT.vt_f_tlv="";
        if (typeof(this.vtid)=="undefined"){
            WT.vtid="";
        }
        WT.vt_f=WT.vt_f_a=rc;
    }
}
WebTrends.prototype.dcsAdSearch=function(){
    if (document.links){
        var param=this.adclickparam+"=";
        var paramlen=param.length;
        var paramre=new RegExp(param,"i");
        var len=document.links.length;
        var pos=end=-1;
        var anch=urlp=value="";
        var urlpre;
        var url=document.URL+"";
        var start=url.search(paramre);
        if (start!=-1){
            end=url.indexOf("&",start);
            urlp=url.substring(start,(end!=-1)?end:url.length);
            urlpre=new RegExp(urlp+"(&|#)","i");
        }
        for (var i=0;i<len;i++){
            if (document.links[i].href){
                anch=document.links[i].href+"";
                if (urlp.length>0){
                    anch=anch.replace(urlpre,"$1");
                }
                pos=anch.search(paramre);
                if (pos!=-1){
                    start=pos+paramlen;
                    end=anch.indexOf("&",start);
                    value=anch.substring(start,(end!=-1)?end:anch.length);
                    this.WT.ad=this.WT.ad?(this.WT.ad+";"+value):value;
                }
            }
        }
    }
}
WebTrends.prototype.dcsIsOnsite=function(host){
    if (host.length>0){
        host=host.toLowerCase();
        if (host==window.location.hostname.toLowerCase()){
            return true;
        }
        if (typeof(this.onsitedoms.test)=="function"){
            return this.onsitedoms.test(host);
        }
        else if (this.onsitedoms.length>0){
            var doms=this.dcsSplit(this.onsitedoms);
            var len=doms.length;
            for (var i=0;i<len;i++){
                if (host==doms[i]){
                    return true;
                }
            }
        }
    }
    return false;
}
WebTrends.prototype.dcsTypeMatch=function(pth, typelist){
    var type=pth.toLowerCase().substring(pth.lastIndexOf(".")+1,pth.length);
    var types=this.dcsSplit(typelist);
    var tlen=types.length;  
    for (var i=0;i<tlen;i++){
        if (type==types[i]){
            return true;
        }
    }
    return false;
}
WebTrends.prototype.dcsEvt=function(evt,tag){
    var e=evt.target||evt.srcElement;
    while (e&&e.tagName&&(e.tagName.toLowerCase()!=tag.toLowerCase())){
        e=e.parentElement||e.parentNode;
    }
    if (e && e.tagName && e.tagName == tag) return e;
    else return false;
}
WebTrends.prototype.dcsNavigation=function(evt){
    var id="";
    var cname="";
    var elems=this.dcsSplit(this.navigationtag);
    var elen=elems.length;  
    var i,e,elem;
    for (i=0;i<elen;i++){
        elem=elems[i];
        if (elem.length){
            e=this.dcsEvt(evt,elem);
            id=(e.getAttribute&&e.getAttribute("id"))?e.getAttribute("id"):"";
            cname=e.className||"";
            if (id.length||cname.length){
                break;
            }
        }
    }
    return id.length?id:cname;
}
WebTrends.prototype.dcsBind=function(event,func){
    if ((typeof(func)=="function")&&document.body){
        if (document.body.addEventListener){
            document.body.addEventListener(event, func.wtbind(this), true);
        }
        else if(document.body.attachEvent){
            document.body.attachEvent("on"+event, func.wtbind(this));
        }
    }
}
WebTrends.prototype.dcsET=function(){
    var e=(navigator.appVersion.indexOf("MSIE")!=-1)?"click":"mousedown";
    this.dcsBind(e,this.dcsDownload);
    this.dcsBind("contextmenu",this.dcsRightClick);
    //customization to add dcsBind
    if (gClickTracking){
        this.dcsBind("mousedown",this.dcsHandler);
    }
}
WebTrends.prototype.dcsMultiTrack=function(){
    
    this.A = new Object();
    this.DCSext = new Object();
 
    this.WT.mc_n = '';
    

    var args=dcsMultiTrack.arguments?dcsMultiTrack.arguments:arguments;
    if (args.length%2==0){
        for (x = 0; x < args.length; x++)
        {
            if ((args[x] == 'gDcsId') && (args[x+1] == this.clickdcsid))
            {
                args[x] = 'gftrack';
                args[x+1] = '1';
            }
        }
        this.dcsSaveProps(args);
        this.dcsSetProps(args);
        var dCurrent=new Date();
        this.DCS.dcsdat=dCurrent.getTime();
        this.WT.mc_n = '';
        this.dcsFPC();
        
        //Start of Customization to replace DCSIDs in use in WTOD by other customers
        if (gDcsId=='DCS000002_7G5R') this.dcsid = 'dcsud90wguz5bdgdau42hk2oa_3p4o';
        else if (gDcsId=='DCS000011_7H5R') this.dcsid = 'dcs7fe8yhuz5bdgdqymvwo2oa_9y7f';
        else if (gDcsId=='DCS000017_1O8L') this.dcsid = 'dcshl0bxkuz5bdozoid0v03oa_1q1o';
        else if (gDcsId=='DCS000016_2R9M') this.dcsid = 'dcsc27ubsvz5bd05xpoc3w2oa_7w3p';
        else if (gDcsId=='DCS000018_9L7K') this.dcsid = 'dcsangw23wz5bdwparppg13oa_9o8m';
        else if (gDcsId=='DCS000025_2S9M') this.dcsid = 'dcsb742b3vz5bd8jx57f343oa_8q7m';
        else if (gDcsId=='DCS000024_3V1N') this.dcsid = 'dcswi665puz5bdg11ftv653oa_7v1v';
        this.domain="statse.webtrendslive.com";
        //End of Customization to replace DCSIDs in use in WTOD by other customers

        var wt_id = { NYT:(typeof(gNYTDcsId)=="string")?gNYTDcsId:"",
                      MONSTER:(typeof(gDcsId)=="string")?gDcsId:""};
        var wt_dom ={ NYT:(typeof(gNYTDomain)=="string")?gNYTDomain:"",
                      MONSTER:(typeof(gDomain)=="string")?gDomain:""};
            
        for (var N in wt_id)
        {
            if ((wt_id[N] != "") && (this.clicktracking) && (this.mShouldTrack(args)))
            {
                var t = this.dcsid;
                this.domain = wt_dom[N];
                this.dcsid = this.clickdcsid;
                this.dcsTag();
                this.dcsid = t;
            }
            else if (wt_id[N] != "")
            {
                var t = this.dcsid;
                this.domain = wt_dom[N];
                this.dcsid = wt_id[N];
                //this.dcsid = this.clickdcsid;
    
                this.dcsTag();
                this.dcsid = t;
            }
        }
        
        //customization to call comscore tag
        //RegEx was put into a RegEx object, a test was ran to make sure that the .test is a valis function and it is working ---01/18/2012 - reason for change, not every browser interprets bare RegEx the same, putting into an object we avoid the issue; running the test makes sure that the browser can run this properly.
        var jobSrch = new RegExp(/.*jobsearch.*/);
        if(typeof (jobSrch.test) == "function"){
            if(jobSrch.test(this.DCSext['k']))
            {               
                comscoretag();              
            }
        }
        //end of customization to call comscore tag
        this.dcsRestoreProps();
    }
}

WebTrends.prototype.mShouldTrack=function(args) {
    var returnVal = false;
    if ((args) && (args.length > 0))
    {
        for (x = 0; x < args.length; x=x+2)
        {
            if ((args[x] == 'gftrack') || (args[x] == 'DCSext.gftrack'))
            {
                if (args[x+1] == '1')
                {
                    returnVal = true;
                }
            }
        }
    }
    return returnVal;
}
WebTrends.prototype.dcsCleanUp=function(){
    this.DCS={};
    this.WT={};
    this.DCSext={};
    if (arguments.length%2==0){
        this.dcsSetProps(arguments);
    }
}
WebTrends.prototype.dcsSetProps=function(args){
    for (var i=0;i<args.length;i+=2){
        if (args[i].indexOf('WT.')==0){
            this.WT[args[i].substring(3)]=args[i+1];
        }
        else if (args[i].indexOf('DCS.')==0){
            this.DCS[args[i].substring(4)]=args[i+1];
        }
        else if (args[i].indexOf('DCSext.')==0){
            this.DCSext[args[i].substring(7)]=args[i+1];
        }
        
        //start of custom for A. metatags
        if (args[i].indexOf('A.')==0){
            this.A[args[i].substring(2)]=arguments[i+1];
                i++;
        }
        //end of customization for A. metatags
            else if (args[i].indexOf('gDcsId')==0){
            this.dcsid=args[i+1];
        }
        //start of customization for NYT
            else if (args[i].indexOf('gNYTDcsId')==0){
            this.nytdcsid=args[i+1];
        }
        //end of customization for NYT
    }
}
WebTrends.prototype.dcsSaveProps=function(args){
    var i,x,key,param;
    if (this.preserve){
        this.args=[];
        for (i=0,x=0;i<args.length;i+=2){
            param=args[i];
            if (param.indexOf('WT.')==0){
                key=param.substring(3);
                this.args[x]=param;
                this.args[x+1]=this.WT[key]||"";
                x+=2;
            }
            else if (param.indexOf('DCS.')==0){
                key=param.substring(4);
                this.args[x]=param;
                this.args[x+1]=this.DCS[key]||"";
                x+=2;
            }
            else if (param.indexOf('DCSext.')==0){
                key=param.substring(7);
                this.args[x]=param;
                this.args[x+1]=this.DCSext[key]||"";
                x+=2;
            }
        }
    }
}
WebTrends.prototype.dcsRestoreProps=function(){
    if (this.preserve){
        this.dcsSetProps(this.args);
        this.args=[];
    }
}
WebTrends.prototype.dcsSplit=function(list){
    var items=list.toLowerCase().split(",");
    var len=items.length;
    for (var i=0;i<len;i++){
        items[i]=items[i].replace(/^\s*/,"").replace(/\s*$/,"");
    }
    return items;
}
WebTrends.prototype.dcsDownload=function(evt){
    evt=evt||(window.event||"");
    if (evt&&((typeof(evt.which)!="number")||(evt.which==1))){
        var e=this.dcsEvt(evt,"A");
        if (e.href){
            var hn=e.hostname?(e.hostname.split(":")[0]):"";
            if (this.dcsIsOnsite(hn)&&this.dcsTypeMatch(e.pathname,this.downloadtypes)){
                var qry=e.search?e.search.substring(e.search.indexOf("?")+1,e.search.length):"";
                var pth=e.pathname?((e.pathname.indexOf("/")!=0)?"/"+e.pathname:e.pathname):"/";
                var ttl="";
                var text=document.all?e.innerText:e.text;
                var img=this.dcsEvt(evt,"IMG");
                if (img.alt){
                    ttl=img.alt;
                }
                else if (text){
                    ttl=text;
                }
                else if (e.innerHTML){
                    ttl=e.innerHTML;
                }
                this.dcsMultiTrack("DCS.dcssip",hn,"DCS.dcsuri",pth,"DCS.dcsqry",e.search||"","WT.ti","Download:"+ttl,"WT.dl","20","WT.nv",this.dcsNavigation(evt));
            }
        }
    }
}
WebTrends.prototype.dcsRightClick=function(evt){
    evt=evt||(window.event||"");
    if (evt){
        var btn=evt.which||evt.button;
        if ((btn!=1)||(navigator.userAgent.indexOf("Safari")!=-1)){
            var e=this.dcsEvt(evt,"A");
            if ((typeof(e.href)!="undefined")&&e.href){
                if ((typeof(e.protocol)!="undefined")&&e.protocol&&(e.protocol.indexOf("http")!=-1)){
                    if ((typeof(e.pathname)!="undefined")&&this.dcsTypeMatch(e.pathname,this.downloadtypes)){
                        var pth=e.pathname?((e.pathname.indexOf("/")!=0)?"/"+e.pathname:e.pathname):"/";
                        var hn=e.hostname?(e.hostname.split(":")[0]):"";
                        this.dcsMultiTrack("DCS.dcssip",hn,"DCS.dcsuri",pth,"DCS.dcsqry","","WT.ti","RightClick:"+pth,"WT.dl","25");
                    }
                }
            }
        }
    }
}
WebTrends.prototype.dcsHandler=function(evt){
    evt=evt||(window.event||"");
    if (evt&&evt.type&&(evt.type=="mousedown")){
        var btn=evt.which||evt.button;
        if (btn==1){
            var e=this.dcsEvt(evt,"A");
            if (!e) e=this.dcsEvt(evt,"AREA");
            if (!e) return true;
            
            if((window.location.search.indexOf('WT.ac',0))<0){
                if(e.getAttribute("gfltrack") == "1")
                {
                    var sampling = this.dcsGetCookie('wtspc');
                    if (Math.floor((Math.random()*100)+1) <= sampling) 
                        this.dcsMultiTrack('DCSext.url',e.href,'DCSext.id',e.id,'DCSext.name',e.name,'gDcsId', gClickDcsId, 'DCSext.gftrack','1');
                }
                else
                    this.dcsMultiTrack('DCSext.url',e.href,'DCSext.id',e.id,'DCSext.name',e.name,'gDcsId', gClickDcsId);
                this.DCSext.url=this.DCSext.id=this.DCSext.name="";
            }
        }
    }
}
WebTrends.prototype.dcsMetaCap = function() {
    var elems;
    if (document.documentElement) {
        elems = document.getElementsByTagName("meta");
    }
    else if (document.all) {
        elems = document.all.tags("meta");
    }
    if (typeof (elems) != "undefined") {
        var names = this.dcsSplit(this.metanames);
        var nlen = names.length;
        var elen = elems.length;
        for (var i = 0; i < elen; i++) {
            var name = elems.item(i).name.toLowerCase();
            var content = elems.item(i).content;
            if ((name.length > 0) && (content.length > 0)) {
                for (var j = 0; j < nlen; j++) {
                    if (name == names[j]) {
                        this.DCSext["meta_" + names[j]] = content;
                        break;
                    }
                }
            }
        }
    }
}
WebTrends.prototype.dcsAdv=function(){
    if (this.trackevents&&(typeof(this.dcsET)=="function")){
        if (window.addEventListener){
            window.addEventListener("load",this.dcsET.wtbind(this),false);
        }
        else if (window.attachEvent){
            window.attachEvent("onload",this.dcsET.wtbind(this));
        }
    }
    this.dcsFPC();
    this.dcsAdSearch();
    this.dcsMetaCap();
}
WebTrends.prototype.dcsVar=function(){
    var dCurrent=new Date();
    var WT=this.WT;
    var DCS=this.DCS;
    WT.tz=parseInt(dCurrent.getTimezoneOffset()/60*-1)||"0";
    WT.bh=dCurrent.getHours()||"0";
    WT.ul=navigator.appName=="Netscape"?navigator.language:navigator.userLanguage;
    if (typeof(screen)=="object"){
        WT.cd=navigator.appName=="Netscape"?screen.pixelDepth:screen.colorDepth;
        WT.sr=screen.width+"x"+screen.height;
    }
    if (typeof(navigator.javaEnabled())=="boolean"){
        WT.jo=navigator.javaEnabled()?"Yes":"No";
    }
    if (document.title){
        if (window.RegExp){
            var tire=new RegExp("^"+window.location.protocol+"//"+window.location.hostname+"\\s-\\s");
            WT.ti=document.title.replace(tire,"");
        }
        else{
            WT.ti=document.title;
        }
    }
    WT.js="Yes";
    WT.jv=(function(){
        var agt=navigator.userAgent.toLowerCase();
        var major=parseInt(navigator.appVersion);
        var mac=(agt.indexOf("mac")!=-1);
        var ff=(agt.indexOf("firefox")!=-1);
        var ff0=(agt.indexOf("firefox/0.")!=-1);
        var ff10=(agt.indexOf("firefox/1.0")!=-1);
        var ff15=(agt.indexOf("firefox/1.5")!=-1);
        var ff20=(agt.indexOf("firefox/2.0")!=-1);
        var ff3up=(ff&&!ff0&&!ff10&!ff15&!ff20);
        var nn=(!ff&&(agt.indexOf("mozilla")!=-1)&&(agt.indexOf("compatible")==-1));
        var nn4=(nn&&(major==4));
        var nn6up=(nn&&(major>=5));
        var ie=((agt.indexOf("msie")!=-1)&&(agt.indexOf("opera")==-1));
        var ie4=(ie&&(major==4)&&(agt.indexOf("msie 4")!=-1));
        var ie5up=(ie&&!ie4);
        var op=(agt.indexOf("opera")!=-1);
        var op5=(agt.indexOf("opera 5")!=-1||agt.indexOf("opera/5")!=-1);
        var op6=(agt.indexOf("opera 6")!=-1||agt.indexOf("opera/6")!=-1);
        var op7up=(op&&!op5&&!op6);
        var jv="1.1";
        if (ff3up){
            jv="1.8";
        }
        else if (ff20){
            jv="1.7";
        }
        else if (ff15){
            jv="1.6";
        }
        else if (ff0||ff10||nn6up||op7up){
            jv="1.5";
        }
        else if ((mac&&ie5up)||op6){
            jv="1.4";
        }
        else if (ie5up||nn4||op5){
            jv="1.3";
        }
        else if (ie4){
            jv="1.2";
        }
        return jv;
    })();
    WT.ct="unknown";
    if (document.body&&document.body.addBehavior){
        try{
            document.body.addBehavior("#default#clientCaps");
            WT.ct=document.body.connectionType||"unknown";
            document.body.addBehavior("#default#homePage");
            WT.hp=document.body.isHomePage(location.href)?"1":"0";
        }
        catch(e){
        }
    }
    if (document.all){
        WT.bs=document.body?document.body.offsetWidth+"x"+document.body.offsetHeight:"unknown";
    }
    else{
        WT.bs=window.innerWidth+"x"+window.innerHeight;
    }
    WT.fv=(function(){
        var i,flash;
        if (window.ActiveXObject){
            for(i=15;i>0;i--){
                try{
                    flash=new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+i);
                    return i+".0";
                }
                catch(e){
                }
            }
        }
        else if (navigator.plugins&&navigator.plugins.length){
            for (i=0;i<navigator.plugins.length;i++){
                if (navigator.plugins[i].name.indexOf('Shockwave Flash')!=-1){
                    return navigator.plugins[i].description.split(" ")[2];
                }
            }
        }
        return "Not enabled";
    })();

//This is deprecated in the new JS tag version and WTOD does not use it.    
        WT.fi="No";
    if (window.ActiveXObject){
        for(var ii=10;ii>0;ii--){
            try{
                var flash = new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+ii);
                WT.fi="Yes";
                break;
            }
            catch(e){
            }
        }
    }
    
    WT.slv=(function(){
        var slv="Not enabled";
        try{     
            if (navigator.userAgent.indexOf('MSIE')!=-1){
                var sli = new ActiveXObject('AgControl.AgControl');
                if (sli){
                    slv="Unknown";
                }
            }
            else if (navigator.plugins["Silverlight Plug-In"]){
                slv="Unknown";
            }
        }
        catch(e){
        }
        if (slv!="Not enabled"){
            var i,m,M,F;
            if ((typeof(Silverlight)=="object")&&(typeof(Silverlight.isInstalled)=="function")){
                for(i=9;i>0;i--){
                    M=i;
                    if (Silverlight.isInstalled(M+".0")){
                            break;
                    }
                    if (slv==M){
                        break;
                    }
                }
                for (m=9;m>=0;m--){
                    F=M+"."+m;
                    if (Silverlight.isInstalled(F)){
                        slv=F;
                        break;
                    }
                    if (slv==F){
                        break;
                    }
                }
            }
        }
        return slv;
    })();
    if (this.i18n){
        if (typeof(document.defaultCharset)=="string"){
            WT.le=document.defaultCharset;
        } 
        else if (typeof(document.characterSet)=="string"){
            WT.le=document.characterSet;
        }
        else{
            WT.le="unknown";
        }
    }
    WT.tv="9.4.0";
    WT.sp=this.splitvalue;
    WT.dl="0";
    WT.ssl=(window.location.protocol.indexOf('https:')==0)?"1":"0";
    DCS.dcsdat=dCurrent.getTime();
    DCS.dcssip=window.location.hostname;
    DCS.dcsuri=window.location.pathname;
    WT.es=DCS.dcssip+DCS.dcsuri;
    if (window.location.search){
        DCS.dcsqry=window.location.search;
    }
    if (DCS.dcsqry){
        var dcsqry=DCS.dcsqry.toLowerCase();
        var params=this.paidsearchparams.length?this.paidsearchparams.toLowerCase().split(","):[];
        for (var i=0;i<params.length;i++){
            if (dcsqry.indexOf(params[i]+"=")!=-1){
                WT.srch="1";
                break;
            }
        }
    }
    if ((window.document.referrer!="")&&(window.document.referrer!="-")){
        if (!(navigator.appName=="Microsoft Internet Explorer"&&parseInt(navigator.appVersion)<4)){
            DCS.dcsref=window.document.referrer;
        }
    }
}
WebTrends.prototype.dcsEscape=function(S, REL){
    if (REL!=""){
        S=S.toString();
        for (var R in REL){
            if (REL[R] instanceof RegExp){
                S=S.replace(REL[R],R);
            }
        }
        return S;
    }
    else{
        return escape(S);
    }
}
WebTrends.prototype.dcsA=function(N,V){
    if (this.i18n&&(this.exre!="")&&!this.exre.test(N)){
        if (N=="dcsqry"){
            var newV="";
            var params=V.substring(1).split("&");
            for (var i=0;i<params.length;i++){
                var pair=params[i];
                var pos=pair.indexOf("=");
                if (pos!=-1){
                    var key=pair.substring(0,pos);
                    var val=pair.substring(pos+1);
                    if (i!=0){
                        newV+="&";
                    }
                    newV+=key+"="+this.dcsEncode(val);
                }
            }
            V=V.substring(0,1)+newV;
        }
        else{
            V=this.dcsEncode(V);
        }
    }
    return "&"+N+"="+this.dcsEscape(V, this.re);
}
WebTrends.prototype.dcsEncode=function(S){
    return (typeof(encodeURIComponent)=="function")?encodeURIComponent(S):escape(S);
}
WebTrends.prototype.dcsCreateImage=function(dcsSrc){
    if (document.images){
        this.images[this.index]=new Image();
        this.images[this.index].src=dcsSrc;
        this.index++;
    }
}
WebTrends.prototype.dcsMeta=function(){
    var elems;
    if (document.documentElement){
        elems=document.getElementsByTagName("meta");
    }
    else if (document.all){
        elems=document.all.tags("meta");
    }
    if (typeof(elems)!="undefined"){
        var length=elems.length;
        for (var i=0;i<length;i++){
            var name=elems.item(i).name;
            var content=elems.item(i).content;
            var equiv=elems.item(i).httpEquiv;
            if (name.length>0){
                if (name.toUpperCase().indexOf("WT.")==0){
                    this.WT[name.substring(3)]=content;
                }
                else if (name.toUpperCase().indexOf("DCSEXT.")==0){
                    this.DCSext[name.substring(7)]=content;
                }
                else if (name.toUpperCase().indexOf("DCS.")==0){
                    this.DCS[name.substring(4)]=content;
                }
                //Customization to grab 'A.' objects
                else if (name.toUpperCase().indexOf('A.')==0){
                    this.A[name.substring(2)]=content;
                }
            }
        }
    }
}
WebTrends.prototype.dcsTag=function(){
    //Start of customization to handle A. metatag objects
    if (document.cookie.indexOf("WTLOPTOUT=")!=-1){
        return;
    }
    var WT=this.WT;
    var DCS=this.DCS;
    var DCSext=this.DCSext;
    var i18n=this.i18n;
    var A=this.A; //end of customization to handle A. metatag objects
    var P="http"+(window.location.protocol.indexOf('https:')==0?'s':'')+"://"+this.domain+(this.dcsid==""?'':'/'+this.dcsid)+"/dcs.gif?";
    if (i18n){
        WT.dep="";
    }
    for (var N in DCS){
        if (DCS[N]&&(typeof DCS[N]!="function")){
            P+=this.dcsA(N,DCS[N]);
        }
    }
    //Start of customization to handle A. metatag objects 
     if ((DCS.dcsuri.toLowerCase()!=window.location.pathname.toLowerCase())&&(DCS.dcsuri.toLowerCase()=="/search.aspx")){
        P+=this.dcsA("A.seojsr", window.location.pathname); 
    }
        //Start of Customization for  - YTA Cookie Echo
    if (yta = this.dcsGetCookie("YTA")) this.DCSext.yta = yta;

    for (N in A){ //Ens of Customization for  - YTA Cookie Echo
        if (A[N]) {
            P+=this.dcsA("A."+N,A[N]);
        }
    }
    for (N in WT){
        if (WT[N]&&(typeof WT[N]!="function")){
            P+=this.dcsA("WT."+N,WT[N]);
        }
    }
    for (N in DCSext){
        if (DCSext[N]&&(typeof DCSext[N]!="function")){
            if (i18n){
                WT.dep=(WT.dep.length==0)?N:(WT.dep+";"+N);
            }
            P+=this.dcsA(N,DCSext[N]);
        }
    }
    if (i18n&&(WT.dep.length>0)){
        P+=this.dcsA("WT.dep",WT.dep);
    }

    
    if (P.length<2048){
    P=P+"&WT.null=1";
    }
    
    WT.dcsid=this.dcsid;
    WT.fpcdom=this.fpcdom;

//Start of customization to apend WT.mc_id with WT.mc_n values
    var nValueUp = /WT.mc_n=[^\&]*/;
    var nValueLw = /wt.mc_n=[^\&]*/;
    var idValueUp = /WT.mc_id=[^\&]*/;
    var idValueLw = /wt.mc_id=[^\&]*/;
    
    var nExists = P.search(nValueUp);
    var nExists1 = P.search(nValueLw);
    var idExists = P.search(idValueUp);
    var idExists1 = P.search(idValueLw);
                                
    if (idExists ==-1 && idExists1 ==-1) {
        if (nExists !=-1) {
            var mcnValue = P.match(nValueUp);
            var modValue = mcnValue[0].split("=");
            var P = P+"&WT.mc_id="+modValue[1];
        }
        if (nExists1 !=-1) {
            var mcnValue = P.match(nValueLw);
            var modValue = mcnValue[0].split("=");
            var P = P+"&WT.mc_id="+modValue[1];
        }              
    }
//End of customization to apend WT.mc_id with WT.mc_n values
        
    if (P.length>2048&&navigator.userAgent.indexOf('MSIE')>=0){
        P=P.substring(0,2040)+"&WT.tu=1";
    }
    this.dcsCreateImage(P);
    this.WT.ad="";
    
}
WebTrends.prototype.dcsDebug=function(){
    var t=this;
    var i=t.images[0].src;
    var q=i.indexOf("?");
    var r=i.substring(0,q).split("/");
    var m="<b>Protocol</b><br><code>"+r[0]+"<br></code>";
    m+="<b>Domain</b><br><code>"+r[2]+"<br></code>";
    m+="<b>Path</b><br><code>/"+r[3]+"/"+r[4]+"<br></code>";
    m+="<b>Query Params</b><code>"+i.substring(q+1).replace(/\&/g,"<br>")+"</code>";
    m+="<br><b>Cookies</b><br><code>"+document.cookie.replace(/\;/g,"<br>")+"</code>";
    if (t.w&&!t.w.closed){
        t.w.close();
    }
    t.w=window.open("","dcsDebug","width=500,height=650,scrollbars=yes,resizable=yes");
    t.w.document.write(m);
    t.w.focus();
}
WebTrends.prototype.dcsNormalizeCampaigns=function(){
    var DCS=this.DCS;
    if(DCS.dcsqry){
        var tempQry = DCS.dcsqry.toLowerCase();
        
        if(tempQry.indexOf('a.c=') != -1){
            var arrAcStr = tempQry.split('a.c=');
            var arrAcStr2 = arrAcStr[1].split('&');

            if(tempQry.indexOf('wt.mc_n') != -1){
                var arrWtStr = tempQry.split('wt.mc_n=');
                var arrWtStr2 = arrWtStr[1].split('&');

                var regex = '/wt.mc_n='+arrWtStr2[0]+'/g';

                var newQry = tempQry.replace( eval(regex), 'wt.mc_n='+arrAcStr2[0] );

            }
            else{
                var newQry = DCS.dcsqry + '&wt.mc_n=' +arrAcStr2[0]
            }

            DCS.dcsqry = newQry;   

        }
        else if(tempQry.indexOf('a.c=') != -1){
            var arrAcStr = tempQry.split('a.c=');
            var arrAcStr2 = arrAcStr[1].split('&');

            if(tempQry.indexOf('wt.mc_n') != -1){
                var arrWtStr = tempQry.split('wt.mc_n=');
                var arrWtStr2 = arrWtStr[1].split('&');

                var regex = '/wt.mc_n='+arrWtStr2[0]+'/g';

                var newQry = tempQry.replace( eval(regex), 'wt.mc_n='+arrAcStr2[0] );

            }
            else{
                var newQry = DCS.dcsqry + '&wt.mc_n=' +arrAcStr2[0]
            }

            DCS.dcsqry = newQry;   

        }
    }
}
WebTrends.prototype.dcsCollect=function(){
    if (this.enabled){
        this.dcsVar();
        this.dcsMeta();
        this.dcsAdv();
        if (typeof(this.dcsCustom)=="function"){
            this.dcsCustom();
        }
        this.dcsNormalizeCampaigns(); //custom
        
        //Start of Customization to replace DCSIDs in use in WTOD by other customers
        if (gDcsId=='DCS000002_7G5R') this.dcsid = 'dcsud90wguz5bdgdau42hk2oa_3p4o';
        else if (gDcsId=='DCS000011_7H5R') this.dcsid = 'dcs7fe8yhuz5bdgdqymvwo2oa_9y7f';
        else if (gDcsId=='DCS000017_1O8L') this.dcsid = 'dcshl0bxkuz5bdozoid0v03oa_1q1o';
        else if (gDcsId=='DCS000016_2R9M') this.dcsid = 'dcsc27ubsvz5bd05xpoc3w2oa_7w3p';
        else if (gDcsId=='DCS000018_9L7K') this.dcsid = 'dcsangw23wz5bdwparppg13oa_9o8m';
        else if (gDcsId=='DCS000025_2S9M') this.dcsid = 'dcsb742b3vz5bd8jx57f343oa_8q7m';
        else if (gDcsId=='DCS000024_3V1N') this.dcsid = 'dcswi665puz5bdg11ftv653oa_7v1v';
        this.domain="statse.webtrendslive.com";
        //End of Customization to replace DCSIDs in use in WTOD by other customers
        
        var wt_id = { NYT:(typeof(gNYTDcsId)=="string")?gNYTDcsId:"",
                      MONSTER:(typeof(gDcsId)=="string")?gDcsId:""};
        var wt_dom ={ NYT:(typeof(gNYTDomain)=="string")?gNYTDomain:"",
                      MONSTER:(typeof(gDomain)=="string")?gDomain:""};
            
        for (var N in wt_id)
        {
            if (wt_id[N] != "")
            {
                this.domain = wt_dom[N];
                this.dcsid = wt_id[N];

                this.dcsTag();
            }
        }
    }
}
function comscoretag(){
//document.write(unescape("%3Cscript src='" + (document.location.protocol == "https:" ? "https://sb" : "http://b") + ".scorecardresearch.com/beacon.js' %3E%3C/script%3E"));
    
if(typeof COMSCORE=="undefined"){var COMSCORE={}}COMSCORE.beacon=function(d){if(!d){return}var a=1.6,e=document,g=e.location,c=function(h){if(h==null){return""}return(encodeURIComponent||escape)(h)},f=[(g.protocol=="https:"?"https://sb":"http://b"),".scorecardresearch.com/b?","c1=",c(d.c1),"&c2=",c(d.c2),"&rn=",Math.random(),"&c7=",c(g.href),"&c3=",c(d.c3),"&c4=",c(d.c4),"&c5=",c(d.c5),"&c6=",c(d.c6),"&c15=",c(d.c15),"&c16=",c(d.c16),"&c8=",c(e.title),"&c9=",c(e.referrer),"&cv=",a].join("");f=f.length>1500?f.substr(0,1495)+"&ct=1":f;var b=new Image();b.onload=function(){};b.src=f;return f};
    COMSCORE.beacon({
        c1:2,
        c2:6035454,
        c3:"",
        c4:"",
        c5:"",
        c6:"",
        c15:""
    });
}
function dcsMultiTrack(){
    if (typeof(_tag)!="undefined"){
        return(_tag.dcsMultiTrack());
    }
}
function dcsDebug(){
    if (typeof(_tag)!="undefined"){
        return(_tag.dcsDebug());
    }
}
Function.prototype.wtbind = function(obj){
    var method=this;
    var temp=function(){
        return method.apply(obj,arguments);
    };
    return temp;
}
var _tag=new WebTrends();

//Start of customization to set proper FPCdom
    if (document.location.host.indexOf('monsterwales.com') != -1)
{
        _tag.fpcdom=".monsterwales.com";
}

    if (document.location.host.indexOf('monsterscotland.co.uk') != -1)
{
        _tag.fpcdom=".mosterscotland.co.uk";
}

    if (document.location.host.indexOf('career-advice.nytimes.monster.com') != -1)
{
        _tag.fpcdom=".monster.com";
}
//End of customization to set proper FPCdom

_tag.dcsCollect();

/**
 * Fallback in case ATM component is missing or not running.
 */
try{
    atmFallback();
}
catch(e){}

function atmFallback() {
    var ol = window.onload,
        
        log = function () {
            var getRequest = 'https://newjobs.d1.sc.omtrdc.net/b/ss/newjobsnositecat/1/H.26.1/';

            // Add unique number to the GET request to prevent caching problem
            var tm=new Date;
            var sed=Math&&Math.random?Math.floor(Math.random()*10000000000000):tm.getTime();
            var sess='s'+Math.floor(tm.getTime()/10800000)%10+sed;

            getRequest = getRequest + sess; 

            // ALL QUERY PARAMS
            var queryParam = '?AQB=1&ndh=1&';
            getRequest = getRequest + queryParam; 

            var d=new Date();
            var n=d.toLocaleDateString();

            // time
            var timeAndCE = 't=' + encodeURIComponent(n + ' 19:40:2 1 240') + '&pccr=true&ce=UTF-8&';
            getRequest = getRequest + timeAndCE;

            // docu URL
            var myUrl = 'g='+ encodeURIComponent(document.URL);

            getRequest = getRequest + myUrl + '&AQE=1'; 

            var b=new Image();
            b.onload=function(){};
            b.src=getRequest;            
        };

    // Schedule it to run after everything else has been loaded to avoid
    // problems with the order of the scripts.
    window.onload = function () {
        // If the ATM obj or the app configs are not set up that means it
        // didn't run.
        if (typeof s_code === 'undefined') {
            log();            
        }
        if (typeof ol === 'function'){
            ol();
        }
        if (typeof tagComscore === 'undefined') {
            comscoretag();
        }
    }
}