var s_account = 'aaas.sciencemag.dev';
for(tool in _satellite.tools){
  var t = _satellite.tools[tool];
  if(t.settings.engine=='sc'){
    s_account = t.settings.account;
  }
}
var s = s_gi(s_account);

/* doPlugins */
s.usePlugins = true;
s.doPlugins = function(s){
  /* External Campaigns */
  if(s.campaign){
    s.eVar8=s.crossVisitParticipation(s.campaign,'s_v8','30','5','>','',0);
  }
  
  try {
    s.enhancedLinkTrack({
      exclude: 'jsDebug|jsShow|undefined',
      page: 'eVar16',
      link: 'eVar12',
      page_link: '',
      section: 'eVar11',
      link_track: true,
      custom_attribute: 'data-linkname',
      css_sections: {
        '#hd-logo':'logo nav',
        '#nav-util':'utility nav',
        '#nav-main,nav.navbar--science':'main nav',
        '#authstring':'auth nav',
        '#hd-search':'search nav',
        '#sci-home-alerts': 'alert nav',
        '#Ad160x600': 'aside ad',
        '.social': 'social nav',
        '#sci-home-news': 'homepage news',
        '#sci-mag': 'homepage magazine',
        '#sci-stm': 'homepage stm',
        '#sci-sig': 'homepage signaling',
        '.sci-help': 'homepage frame help',
        'span.named-content.related-content a': 'See Report By'
      },
      section_required: true
    });
  }
  catch(e){}
  
  /* previous page */
  if(!s.eVar16 && s.c_r('prev_page')){
    s.eVar16 = s.c_r('prev_page');
    s.c_w('prev_page','');
  }
  
  /* social links */
  var link = s.linkObject;
  if(link && s.linkType == 'e'){
    if(typeof jQuery != 'undefined'){
      if(jQuery(link).parents('.share-buttons')){
        s.linkType = '';
        s.linkName = '';
      }
    }
  }

  /* SC hit callback */
  s.q = function(){
    s.eVar11 = s.eVar12 = s.eVar16 = '';
    s.c_w('prev_page', s.pageName);
  }

};

/* Plugins */
/*
 *  Plug-in: crossVisitParticipation v1.7 - stacks values from
 *  specified variable in cookie and returns value
 */
s.crossVisitParticipation=new Function("v","cn","ex","ct","dl","ev","dv",""
+"var s=this,ce;if(typeof(dv)==='undefined')dv=0;if(s.events&&ev){var"
+" ay=s.split(ev,',');var ea=s.split(s.events,',');for(var u=0;u<ay.l"
+"ength;u++){for(var x=0;x<ea.length;x++){if(ay[u]==ea[x]){ce=1;}}}}i"
+"f(!v||v==''){if(ce){s.c_w(cn,'');return'';}else return'';}v=s.escape("
+"v);var arry=new Array(),a=new Array(),c=s.c_r(cn),g=0,h=new Array()"
+";if(c&&c!=''){arry=s.split(c,'],[');for(q=0;q<arry.length;q++){z=ar"
+"ry[q];z=s.repl(z,'[','');z=s.repl(z,']','');z=s.repl(z,\"'\",'');arry"
+"[q]=s.split(z,',')}}var e=new Date();e.setFullYear(e.getFullYear()+"
+"5);if(dv==0&&arry.length>0&&arry[arry.length-1][0]==v)arry[arry.len"
+"gth-1]=[v,new Date().getTime()];else arry[arry.length]=[v,new Date("
+").getTime()];var start=arry.length-ct<0?0:arry.length-ct;var td=new"
+" Date();for(var x=start;x<arry.length;x++){var diff=Math.round((td."
+"getTime()-arry[x][1])/86400000);if(diff<ex){h[g]=s.unescape(arry[x][0"
+"]);a[g]=[arry[x][0],arry[x][1]];g++;}}var data=s.join(a,{delim:',',"
+"front:'[',back:']',wrap:\"'\"});s.c_w(cn,data,e);var r=s.join(h,{deli"
+"m:dl});if(ce)s.c_w(cn,'');return r;");
/*
 * Utility Function: split v1.5 (JS 1.0 compatible)
 */
s.split=new Function("l","d",""
+"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");
/*
 * Plugin Utility: Replace v1.0
 */
s.repl=new Function("x","o","n",""
+"var i=x.indexOf(o),l=n.length;while(x&&i>=0){x=x.substring(0,i)+n+x."
+"substring(i+o.length);i=x.indexOf(o,i+l)}return x");
/*
 * s.join: 1.0 - Joins an array into a string
 */
s.join = new Function("v","p",""
+"var s = this;var f,b,d,w;if(p){f=p.front?p.front:'';b=p.back?p.back"
+":'';d=p.delim?p.delim:'';w=p.wrap?p.wrap:'';}var str='';for(var x=0"
+";x<v.length;x++){if(typeof(v[x])=='object' )str+=s.join( v[x],p);el"
+"se str+=w+v[x]+w;if(x<v.length-1)str+=d;}return f+str+b;");

s.enhancedLinkTrack = function(o){
  var s = this,
    cv,
    lo = s.linkObject||s.j,
    pg = s.pageName||'[not set]',
    v = [],
    getStyle = function(el,prop){
      var x,y='';
      if (el.currentStyle)
        y = el.currentStyle[prop];
      else if (window.getComputedStyle) {
        var x = document.defaultView.getComputedStyle(el,null);
        try {
          if(x){
            if(x[prop]){
              y = x[prop];
            }
            else {
              y = x.getPropertyValue(prop);
            }
          }
        }
        catch(e){}
      }
      return y;
    },
    trk=false,
    str,
    readCookie=true,
    linkTracked=false;

  // store the config so we can use this for individual links
  s._elt = s._elt || {};
  if(typeof o == 'object'){
    for(z in o){
      s._elt[z] = o[z];
    }
  }
  // config defaults if not set
  if(!o.cookie){s._elt.cookie = s._elt.cookie || 'sc_links';}
  if(!o.manual_clear){s._elt.manual_clear = s._elt.manual_clear || false;}
  if(!o.delim){s._elt.delim = s._elt.delim || ' | ';}
  if(!o.cookie_delim){s._elt.cookie_delim = s._elt.cookie_delim || '^^';}
  if(!o.link_track && o.link_track==='undefined'){s._elt.link_track = s._elt.link_track || true;}
  if(!o.custom_attribute){s._elt.custom_attribute = 'data-linkname';}
  s._elt.css_sections = s._elt.css_sections||{};
  v[2] = o.default_section||'';

  // conditions for sending on custom link
  if(s.linkType){
    // don't send
    if(!s._elt.link_track){
      readCookie = false;
    }
    else {
      s.linkTrackVars = s.linkTrackVars || '';
      s.linkTrackVars += (s._elt.page?','+s._elt.page:'')+(s._elt.link?','+s._elt.link:'')+(s._elt.page_link?','+s._elt.page_link:'');
    }
  }

  // read from the cookie
  if((s._elt.page || s._elt.link || s._elt.page_link) && readCookie){
    var cv = s.c_r(s._elt.cookie);
    if(cv){
      // split the cookie
      var c = cv.split(s._elt.cookie_delim);

      if(o.section_required==true && c[2]){
        // page name
        if(s._elt.page && !s[s._elt.page]){s[s._elt.page] = c[0];}
        // link value
        if(s._elt.link && !s[s._elt.link]){s[s._elt.link] = c[1];}
        // section value
        if(s._elt.section && !s[s._elt.section]){
          s[s._elt.section] = c[2];
        }
        // page and link
        if(s._elt.page_link && !s[s._elt.page_link]){s[s._elt.page_link] = c[0]+s._elt.delim+c[1];}
      }
        
      // clear the cookie
      if(!s._elt.manual_clear){
        var exp = new Date();
        exp.setTime(exp.getTime()-8640000);
        s.c_w(s._elt.cookie,'',exp);
      }

      // mark if custom link
      if(s.linkType){
        linkTracked = true;
      }
    }
  }
  
  // check the window event if a link object doesn't exist
  if(!lo && window.event){
    try {
      // don't listen to certain elements
      if(window.event.target.nodeName.match(/^SCRIPT$|^BODY$|^HEAD$/) || !window.event.target.nodeName){
        return;
      }
      lo = window.event.target || window.event.srcElement;
    }
    catch(err){}
  }

  if (lo || str) {
    // criteria for tracking link
    if(lo.nodeName){
      // this flag gets set to true when we hit the body element
      var noMatch = false, parent = lo;
      while(noMatch == false){
        var n = lo.nodeName.toLowerCase(),
          p = parent.nodeName.toLowerCase();

        // exit on body or html
        if(p=='body' || p=='html'){
          noMatch = true;
        }

        // loop through css_sections
        for(var sects in s._elt.css_sections){
          var sect = s._elt.css_sections[sects];
          if(_satellite.matchesCss(sects,parent)){
            v[2] = sect;
            noMatch = true;
            break;
          }
        }

        // links and buttons are tracked by default
        if(trk == false){
          if(n=='a'||n=='button'){
            trk = true;
          }
          // all other elements must have the cursor of a pointer to be tracked
          else if(getStyle(lo,'cursor')=='pointer'){
            trk = true;
          }
          else {
            lo = lo.parentNode || lo.parentElement;
          }
        }
        parent = parent.parentNode || parent.parentElement;
      }
      if(!trk){
        return;
      }
    }

    if(trk){
      // store page name
      v[0] = s.pageName;

      // setup for analytics specific link names w/ custom HTML5 attribute
      if(s._elt.custom_attribute && lo.getAttribute(s._elt.custom_attribute)){
        v[1] = lo.getAttribute(s._elt.custom_attribute);
      }
      // look for the lpos and lid values in the name (legacy)
      else if (lo.getAttribute('name') != null) {
        var b = lo.getAttribute('name');
        if(b.indexOf('&lid=') > -1){
          v[1] = b.match('&lid=([^&]*)')[1];
        }
      }
      // check for the id of the link
      //else if (lo.id != 0 && lo.id) {
      //  v[1] = lo.id;
      //}
      // if a button it may have a value
      //else if(lo.value || lo.getAttribute('value')){
      //  v[1] = lo.value || lo.getAttribute('value');
      //}
      // link or element text
      else if (lo) {
        // check for an image
        if (lo.innerHTML.indexOf('<img') > -1) {
          // first get the image
          var imgs = lo.children,img;
          for(var i=0; i<imgs.length; i++){
            if(imgs[i].nodeName=='IMG'){
              img = imgs[i];
              break;
            }
          }
          // first check image id
          //if(img.id){
          //  v[1] = 'IMG: '+img.id;
          //}
          // get the alt text
          if(img.getAttribute('alt')){
            v[1] = 'IMG:'+_satellite.cleanText(img.getAttribute('alt'));
          }
          // get src if no alt
          else {
            var src = (img.src||img.getAttribute('src')).split('/');
            v[1] = 'IMG:'+src.pop();
          }
          str = _satellite.cleanText(_satellite.text(lo));
        }
        // get the text
        else {
          v[1] = _satellite.cleanText(_satellite.text(lo));
        }
      }

      // string text trumps all
      if(str){
        v[1] = _satellite.cleanText(str);
      }

      // exclude any items from being tracked (except for string values)
      if(s._elt.exclude){
        try {
          var rgx = new RegExp(s._elt.exclude);
          if(v[1].match(rgx)){
            v[1] = false;
          }
        }
        catch(err){}
      }

      // write the cookie
      if(v[0] && v[1]){
        // send on custom link if configured
        if(!linkTracked && s.linkType && s._elt.link_track){
          if(o.section_required == true && v[2]){
            // page name
            if(s._elt.page && !s[s._elt.page]){s[s._elt.page] = _satellite.cleanText(v[0]);}
            // link value
            if(s._elt.link && !s[s._elt.link]){s[s._elt.link] = _satellite.cleanText(v[1]);}
            // page and link
            if(s._elt.page_link && !s[s._elt.page_link]){s[s._elt.page_link] = _satellite.cleanText(v[0])+s._elt.delim+_satellite.cleanText(v[1]);}
            // section
            if(s._elt.section && !s[s._elt.section]){s[s._elt.section] = _satellite.cleanText(v[2]||'')}
          }
        }
        //otherwise write cookie
        else {
          s.c_w(s._elt.cookie,v.join(s._elt.cookie_delim));
        }
      }
    }
  }
}

/* Media Module */
var j=null;function E(){return function(){}}
function AppMeasurement_Module_Media(s){var m=this;m.s=s;var w=window;if(!w.s_c_in)w.s_c_il=[],w.s_c_in=0;m._il=w.s_c_il;m._in=w.s_c_in;m._il[m._in]=m;w.s_c_in++;m._c="s_m";m.list=[];m.open=function(e,g,d,l){var c={},a=new Date,b="",h;g||(g=-1);if(e&&d){if(!m.list)m.list={};m.list[e]&&m.close(e);if(l&&l.id)b=l.id;if(b)for(h in m.list)!Object.prototype[h]&&m.list[h]&&m.list[h].Rf==b&&m.close(m.list[h].name);c.name=e;c.length=g;c.xc=0;c.U=0;c.playerName=m.playerName?m.playerName:d;c.Rf=b;c.ce=0;c.aa=
0;c.timestamp=Math.floor(a.getTime()/1E3);c.za=0;c.wc=c.timestamp;c.T=-1;c.Dc="";c.ha=-1;c.Ic=0;c.Qd={};c.Mc=0;c.Ja=0;c.V="";c.Ob=0;c.Yd=0;c.Cc=0;c.Kc=0;c.xa=!1;c.Jb="";c.yc="";c.zc=0;c.sc=!1;c.na="";c.complete=0;c.Af=0;c.Hb=0;c.Ib=0;m.list[e]=c;c.Ud=!1}};m.openAd=function(e,g,d,l,c,a,b,h){var f={};m.open(e,g,d,h);if(f=m.list[e])f.xa=!0,f.Jb=l,f.yc=c,f.zc=a,f.na=b};m.Oe=function(e){var g=m.list[e];m.list[e]=0;g&&g.monitor&&clearTimeout(g.monitor.O)};m.close=function(e){m.ja(e,0,-1)};m.play=function(e,
g,d,l){var c=m.ja(e,1,g,d,l);if(c&&!c.monitor)c.monitor={},c.monitor.update=function(){c.za==1&&m.ja(c.name,3,-1);c.monitor.O=setTimeout(c.monitor.update,1E3)},c.monitor.update()};m.click=function(e,g){m.ja(e,7,g)};m.complete=function(e,g){m.ja(e,5,g)};m.stop=function(e,g){m.ja(e,2,g)};m.track=function(e){m.ja(e,4,-1)};m.yf=function(e,g){var d="a.media.",l=e.linkTrackVars,c=e.linkTrackEvents,a="m_i",b,h=e.contextData,f;if(g.xa){d+="ad.";if(g.Jb)h["a.media.name"]=g.Jb,h[d+"pod"]=g.yc,h[d+"podPosition"]=
g.zc;if(!g.Mc)h[d+"CPM"]=g.na}if(g.sc)h[d+"clicked"]=!0,g.sc=!1;h["a.contentType"]="video"+(g.xa?"Ad":"");h["a.media.channel"]=m.channel;h[d+"name"]=g.name;h[d+"playerName"]=g.playerName;if(g.length>0)h[d+"length"]=g.length;h[d+"timePlayed"]=Math.floor(g.aa);Math.floor(g.aa)>0&&(h[d+"timePlayed"]=Math.floor(g.aa));if(!g.Mc)h[d+"view"]=!0,a="m_s",m.Heartbeat&&m.Heartbeat.enabled&&(a=g.xa?m.__primetime?"mspa_s":"msa_s":m.__primetime?"msp_s":"ms_s"),g.Mc=1;if(g.V){h[d+"segmentNum"]=g.Ja;h[d+"segment"]=
g.V;if(g.Ob>0)h[d+"segmentLength"]=g.Ob;g.Cc&&g.aa>0&&(h[d+"segmentView"]=!0)}if(!g.Af&&g.complete)h[d+"complete"]=!0,g.gg=1;if(g.Hb>0)h[d+"milestone"]=g.Hb;if(g.Ib>0)h[d+"offsetMilestone"]=g.Ib;if(l)for(f in h)Object.prototype[f]||(l+=",contextData."+f);b=h["a.contentType"];e.pe=a;e.pev3=b;var B,C;if(m.contextDataMapping){if(!e.events2)e.events2="";l&&(l+=",events");for(f in m.contextDataMapping)if(!Object.prototype[f]){a=f.length>d.length&&f.substring(0,d.length)==d?f.substring(d.length):"";b=m.contextDataMapping[f];
if(typeof b=="string"){B=b.split(",");for(C=0;C<B.length;C++)b=B[C],f=="a.contentType"?(l&&(l+=","+b),e[b]=h[f]):a=="view"||a=="segmentView"||a=="clicked"||a=="complete"||a=="timePlayed"||a=="CPM"?(c&&(c+=","+b),a=="timePlayed"||a=="CPM"?h[f]&&(e.events2+=(e.events2?",":"")+b+"="+h[f]):h[f]&&(e.events2+=(e.events2?",":"")+b)):a=="segment"&&h[f+"Num"]?(l&&(l+=","+b),e[b]=h[f+"Num"]+":"+h[f]):(l&&(l+=","+b),e[b]=h[f])}else if(a=="milestones"||a=="offsetMilestones")f=f.substring(0,f.length-1),h[f]&&
m.contextDataMapping[f+"s"][h[f]]&&(c&&(c+=","+m.contextDataMapping[f+"s"][h[f]]),e.events2+=(e.events2?",":"")+m.contextDataMapping[f+"s"][h[f]]);h[f]&&(h[f]=0);a=="segment"&&h[f+"Num"]&&(h[f+"Num"]=0)}}e.linkTrackVars=l;e.linkTrackEvents=c};m.ja=function(e,g,d,l,c){var a={},b=(new Date).getTime()/1E3,h,f,B=m.trackVars,C=m.trackEvents,F=m.trackSeconds,n=m.trackMilestones,q=m.trackOffsetMilestones,v=m.segmentByMilestones,p=m.segmentByOffsetMilestones,r,t,y=1,k={},G;if(!m.channel)m.channel=m.s.w.location.hostname;
if(a=e&&m.list&&m.list[e]?m.list[e]:0){if(a.xa)F=m.adTrackSeconds,n=m.adTrackMilestones,q=m.adTrackOffsetMilestones,v=m.adSegmentByMilestones,p=m.adSegmentByOffsetMilestones;d<0&&(d=a.za==1&&a.wc>0?b-a.wc+a.T:a.T);a.length>0&&(d=d<a.length?d:a.length);d<0&&(d=0);a.xc=d;if(a.length>0)a.U=a.xc/a.length*100,a.U=a.U>100?100:a.U;if(a.T<0)a.T=d;G=a.Ic;k.name=e;k.ad=a.xa;k.length=a.length;k.openTime=new Date;k.openTime.setTime(a.timestamp*1E3);k.offset=a.xc;k.percent=a.U;k.playerName=a.playerName;k.mediaEvent=
a.ha<0?"OPEN":g==1?"PLAY":g==2?"STOP":g==3?"MONITOR":g==4?"TRACK":g==5?"COMPLETE":g==7?"CLICK":"CLOSE";if(g>2||g!=a.za&&(g!=2||a.za==1)){if(!c)l=a.Ja,c=a.V;if(g){if(g==1)a.T=d;if((g<=3||g>=5)&&a.ha>=0)if(y=!1,B=C="None",a.ha!=d){f=a.ha;if(f>d)f=a.T,f>d&&(f=d);r=n?n.split(","):0;if(a.length>0&&r&&d>=f)for(t=0;t<r.length;t++)if((h=r[t]?parseFloat(""+r[t]):0)&&f/a.length*100<h&&a.U>=h)y=!0,t=r.length,k.mediaEvent="MILESTONE",a.Hb=k.milestone=h;if((r=q?q.split(","):0)&&d>=f)for(t=0;t<r.length;t++)if((h=
r[t]?parseFloat(""+r[t]):0)&&f<h&&d>=h)y=!0,t=r.length,k.mediaEvent="OFFSET_MILESTONE",a.Ib=k.offsetMilestone=h}if(a.Yd||!c){if(v&&n&&a.length>0){if(r=n.split(",")){r.push("100");for(t=f=0;t<r.length;t++)if(h=r[t]?parseFloat(""+r[t]):0){if(a.U<h)l=t+1,c="M:"+f+"-"+h,t=r.length;f=h}}}else if(p&&q&&(r=q.split(","))){r.push(""+(a.length>0?a.length:"E"));for(t=f=0;t<r.length;t++)if((h=r[t]?parseFloat(""+r[t]):0)||r[t]=="E"){if(d<h||r[t]=="E")l=t+1,c="O:"+f+"-"+h,t=r.length;f=h}}if(c)a.Yd=!0}if((c||a.V)&&
c!=a.V){a.Kc=!0;if(!a.V)a.Ja=l,a.V=c;a.ha>=0&&(y=!0)}if((g>=2||a.U>=100)&&a.T<d)a.ce+=d-a.T,a.aa+=d-a.T;if(g<=2||g==3&&!a.za)a.Dc+=(g==1||g==3?"S":"E")+Math.floor(d),a.za=g==3?1:g;if(!y&&a.ha>=0&&g<=3&&(F=F?F:0)&&a.aa>=F)y=!0,k.mediaEvent="SECONDS";a.wc=b;a.T=d}if(!g||g<=3&&a.U>=100)a.za!=2&&(a.Dc+="E"+Math.floor(d)),g=0,B=C="None",k.mediaEvent="CLOSE";if(g==7)y=k.clicked=a.sc=!0;if(g==5||m.completeByCloseOffset&&(!g||a.U>=100)&&a.length>0&&d>=a.length-m.completeCloseOffsetThreshold)y=k.complete=
a.complete=!0;b=k.mediaEvent;b=="MILESTONE"?b+="_"+k.milestone:b=="OFFSET_MILESTONE"&&(b+="_"+k.offsetMilestone);a.Qd[b]?k.eventFirstTime=!1:(k.eventFirstTime=!0,a.Qd[b]=1);k.event=k.mediaEvent;k.timePlayed=a.ce;k.segmentNum=a.Ja;k.segment=a.V;k.segmentLength=a.Ob;m.monitor&&g!=4&&m.monitor(m.s,k);if(m.Heartbeat&&m.Heartbeat.enabled){k=[];k.push(a.name);if(!a.Ud)a.Ud=!0,k.push(a.length),k.push(a.playerName),a.xa?(k.push(a.Jb),k.push(a.yc),k.push(a.zc),k.push(a.na),m.Heartbeat.callMethodWhenReady("openAd",
k)):m.Heartbeat.callMethodWhenReady("open",k),k=[],k.push(a.name);g==0?m.Heartbeat.callMethodWhenReady("close",k):(k.push(d),g==1?(k.push(a.Ja),k.push(a.V),k.push(a.Ob),m.Heartbeat.callMethodWhenReady("play",k)):g==2?m.Heartbeat.callMethodWhenReady("stop",k):g==3?m.Heartbeat.callMethodWhenReady("monitor",k):g==5?m.Heartbeat.callMethodWhenReady("complete",k):g==7&&m.Heartbeat.callMethodWhenReady("click",k));a.ha>=0&&(y=!1)}g==0&&m.Oe(e);if(y&&a.Ic==G){e={};e.contextData={};e.linkTrackVars=B;e.linkTrackEvents=
C;if(!e.linkTrackVars)e.linkTrackVars="";if(!e.linkTrackEvents)e.linkTrackEvents="";m.yf(e,a);e.linkTrackVars||(e["!linkTrackVars"]=1);e.linkTrackEvents||(e["!linkTrackEvents"]=1);m.s.track(e);if(a.Kc)a.Ja=l,a.V=c,a.Cc=!0,a.Kc=!1;else if(a.aa>0)a.Cc=!1;a.Dc="";a.Hb=a.Ib=0;a.aa-=Math.floor(a.aa);a.ha=d;a.Ic++}}}return a};m.vf=function(e,g,d,l,c){var a=0;if(e&&(!m.autoTrackMediaLengthRequired||g&&g>0)){if(!m.list||!m.list[e]){if(d==1||d==3)m.open(e,g,"HTML5 Video",c),a=1}else a=1;a&&m.ja(e,d,l,-1,0)}};
m.attach=function(e){var g,d,l;if(e&&e.tagName&&e.tagName.toUpperCase()=="VIDEO"){if(!m.hb)m.hb=function(c,a,b){var h,f;if(m.autoTrack){h=c.currentSrc;(f=c.duration)||(f=-1);if(b<0)b=c.currentTime;m.vf(h,f,a,b,c)}};g=function(){m.hb(e,1,-1)};d=function(){m.hb(e,1,-1)};m.ra(e,"play",g);m.ra(e,"pause",d);m.ra(e,"seeking",d);m.ra(e,"seeked",g);m.ra(e,"ended",function(){m.hb(e,0,-1)});m.ra(e,"timeupdate",g);l=function(){!e.paused&&!e.ended&&!e.seeking&&m.hb(e,3,-1);setTimeout(l,1E3)};l()}};m.ra=function(m,
g,d){m.attachEvent?m.attachEvent("on"+g,d):m.addEventListener&&m.addEventListener(g,d,!1)};if(m.completeByCloseOffset==void 0)m.completeByCloseOffset=1;if(m.completeCloseOffsetThreshold==void 0)m.completeCloseOffsetThreshold=1;var D=new function(m){this.Je=function(g){this.s=g;this.enabled=!1;this.v=new this.Ka.Of.ne(g)};this.open=function(g,d,m){this.v.open(g,d,m)};this.openAd=function(g,d,m,c,a,b,h){this.v.openAd(g,d,m,c,a,b,h)};this.close=function(g){this.v.close(g)};this.play=function(g,d,m,c,
a){this.v.play(g,d,m,c,a)};this.monitor=function(g,m){this.v.monitor(g,m)};this.stop=function(g,m){this.v.stop(g,m)};this.click=function(g,m){this.v.click(g,m)};this.complete=function(g,m){this.v.complete(g,m)};this.setup=function(g){this.v.Wf(g)};this.bufferStart=function(){this.v.xf()};this.bitrateChange=function(g){this.v.wf(g)};this.updateQoSInfo=function(g,m,e){this.v.bg(g,m,e)};this.adBreakStart=function(m){this.v.sf(m)};this.adBreakEnd=function(){this.v.rf()};this.trackError=function(m,d,e){this.v.$f(m,
d,e)};this.sessionComplete=function(){this.v.Uf()};this.__setPsdkVersion=function(m){this.v.Ke(m)};(function(m){if(typeof d==="undefined")var d={};if(typeof e==="undefined")var e={};e.event||(e.event={});e.a||(e.a={});e.H||(e.H={});e.bb||(e.bb={});e.M||(e.M={});(function(c){c.extend=function(a,b){function c(){this.constructor=a}for(var f in b)b.hasOwnProperty(f)&&(a[f]=b[f]);c.prototype=b.prototype;a.prototype=new c;a.r=b.prototype;return a}})(d);(function(c){c.Q=function(a,b){var c=[],f;for(f in b)b.hasOwnProperty(f)&&
typeof b[f]==="function"&&c.push(f);for(f=0;f<c.length;f++){var B=c[f];a.prototype[B]=b[B]}}})(d);(function(c){c.Md={Pd:function(){this.ea&&this.ea.apply(this,arguments);this.ea=j}}})(d);(function(c){c.Oa=!1;c.P={N:function(a){this.Ua=!0;this.Ab=a},jg:function(){this.Ua=!1},log:function(a){c.Oa&&this.Ua&&window.console&&window.console.log&&window.console.log(this.Ab+a)},info:function(a){c.Oa&&this.Ua&&window.console&&window.console.info&&window.console.info(this.Ab+a)},warn:function(a){c.Oa&&this.Ua&&
window.console&&window.console.warn&&window.console.warn(this.Ab+a)},error:function(a){if(c.Oa&&this.Ua&&window.console&&window.console.error)throw a=this.Ab+a,window.console.error(a),Error(a);}}})(d);(function(c){function a(a,c){this.type=a;this.data=c}a.wb="success";a.Xb="error";c.S=a})(d);(function(c){function a(){this.F={}}a.prototype.addEventListener=function(a,c,f){a&&c&&(this.F[a]=this.F[a]||[],this.F[a].push({zf:c,Ld:f||window}))};a.prototype.dispatchEvent=function(a){if(a.type)for(var c in this.F)if(this.F.hasOwnProperty(c)&&
a.type===c){var f=this.F[c];for(c=0;c<f.length;c++)f[c].zf.call(f[c].Ld,a);break}};a.prototype.eb=function(a){if(a){var c,f;for(f in this.F)if(this.F.hasOwnProperty(f)){for(c=this.F[f].length-1;c>=0;c--)this.F[f][c].Ld===a&&this.F[f].splice(c,1);this.F[f].length||delete this.F[f]}}else this.F={}};c.kd=a})(d);(function(c){function a(){if(!a.prototype.Ta)a.prototype.Ta=new b;return a.prototype.Ta}var b=c.kd;c.ca=a})(d);(function(c){function a(){}function b(){b.r.constructor.call(this)}var h=c.S,f=c.kd;
a.ld="GET";c.extend(b,f);b.prototype.Cf=function(a){a.I=new window.XMLHttpRequest;if(!("withCredentials"in a.I)&&(a.I=typeof window.XDomainRequest!=="undefined"?new window.XDomainRequest:j,a.I)){var f=this;a.I.onreadystatechange=function(){if(a.I.readyState===4){var m={};m[b.pd]=a.I.status;a.I.status>=200&&a.I.status<400?(m[b.od]=a.I.responseText,m[b.qb]=f,f.dispatchEvent(new c.S(h.wb,m))):f.dispatchEvent(new c.S(h.Xb,m))}}}};b.Eb=j;b.prototype.Mf=function(a){if(!b.Eb)b.Eb=new Image,b.Eb.alt="";b.Eb.src=
a.url;a={};a[b.pd]=200;a[b.od]="";a[b.qb]=this;this.dispatchEvent(new c.S(h.wb,a))};b.prototype.close=function(){this.eb()};b.prototype.load=function(a){a&&a.method&&a.url&&(this.Cf(a),a.I?(a.I.open(a.method,a.url,!0),a.I.send()):this.Mf(a))};b.pd="status";b.od="response";b.qb="instance";c.Ie=a;c.He=function(a,b){this.url=a||j;this.method=b;this.I=j};c.Ge=b})(d);(function(c,a){function b(){}b.Fa="report";b.qa="what";b.Ga="reset";b.Sb="account";b.cc="sc_tracking_server";b.xb="tracking_server";b.lb=
"check_status_server";b.rb="job_id";b.Pa="publisher";b.fc="stream_type";b.$b="ovp";b.ec="sdk";b.bd="channel";b.nb="debug_tracking";b.yb="track_local";b.Ha="visitor_id";b.Aa="analytics_visitor_id";b.Da="marketing_cloud_visitor_id";b.i="name";b.Ca="length";b.Ea="player_name";b.X="timer_interval";b.rd="tracking_interval";b.cd="check_status_interval";b.gc="track_external_errors";b.ac="parent_name";b.nd="parent_pod";b.bc="parent_pod_position";b.ub="parent_pod_offset";b.na="parent_pod_cpm";b.B="offset";
b.vb="source";b.Yb="error_id";b.kb="bitrate";b.Zb="fps";b.Vb="dropped_frames";a.event.ba=b})(d,e);(function(c,a){function b(a,f){b.r.constructor.call(this,a,f)}c.extend(b,c.S);b.La="api_destroy";b.Tb="api_config";b.Uc="api_open_main";b.Tc="api_open_ad";b.Qc="api_close";b.Vc="api_play";b.Sc="api_monitor";b.Yc="api_stop";b.Pc="api_click";b.Rc="api_complete";b.Zc="api_track_error";b.Wc="api_qos_info";b.Nc="api_bitrate_change";b.Oc="api_buffer_start";b.Ub="api_pod_offset";b.Xc="api_session_complete";
a.event.Ma=b})(d,e);(function(c,a){function b(a,f){b.r.constructor.call(this,a,f)}c.extend(b,c.S);b.Ba="context_data_available";a.event.dd=b})(d,e);(function(c,a){function b(a,f){b.r.constructor.call(this,a,f)}c.extend(b,c.S);b.oa="data_request";b.mb="data_response";b.ya={Qa:"tracking_timer_interval",md:"main_video_publisher"};a.event.Wb=b})(d,e);(function(c,a){function b(a,f){b.r.constructor.call(this,a,f)}c.extend(b,c.S);b.sb="network_check_status_complete";a.event.tb=b})(d,e);(function(c,a){function b(a,
f){b.r.constructor.call(this,a,f)}c.extend(b,c.S);b.CLOCK_TRACKING_TICK="CLOCK_TRACKING_TICK";b.CLOCK_TRACKING_ENABLE="CLOCK_TRACKING_ENABLE";b.CLOCK_TRACKING_DISABLE="CLOCK_TRACKING_DISABLE";b.CLOCK_CHECK_STATUS_TICK="CLOCK_CHECK_STATUS_TICK";b.CLOCK_CHECK_STATUS_ENABLE="CLOCK_CHECK_STATUS_ENABLE";b.CLOCK_CHECK_STATUS_DISABLE="CLOCK_CHECK_STATUS_DISABLE";a.event.Na=b})(d,e);(function(c,a){function b(a,b){this.value=a;this.hint=b}function h(a){this.Bc=a;this.data={}}b.pa="short";h.prototype.c=function(a,
b,c){var h=this;return function(){arguments.length&&(h[a]=arguments[0],h.Pb(b,arguments[0],c));return h[a]}};h.prototype.Pb=function(a,c,h){this.data[a]=new b(c,h)};a.a.R=h;a.a.ed=b})(d,e);(function(c,a){function b(a,c){b.r.constructor.call(this,a);this.cg=this.c("_year","year",h.pa);this.Qf=this.c("_month","month",h.pa);this.Df=this.c("_day","day",h.pa);this.Kf=this.c("_hour","hour",h.pa);this.Pf=this.c("_minute","minute",h.pa);this.Sf=this.c("_second","second",h.pa);this.cg(c.getUTCFullYear());
this.Qf(c.getUTCMonth()+1);this.Df(c.getUTCDate());this.Kf(c.getUTCHours());this.Pf(c.getUTCMinutes());this.Sf(c.getUTCSeconds())}var h=a.a.ed;c.extend(b,a.a.R);a.a.he=b})(d,e);(function(c,a){function b(){b.r.constructor.call(this,"asset");this.Fb=this.c("_cpm","cpm",j);this.L=this.c("_adId","ad_id",j);this.Nb=this.c("_resolver","resolver",j);this.Kb=this.c("_podId","pod_id",j);this.Lb=this.c("_podPosition","pod_position",j);this.Mb=this.c("_podSecond","pod_second",j);this.length=this.c("_length",
"length",j);this.Fb("");this.L("");this.Nb("");this.Kb("");this.Lb("");this.Mb(0);this.length(0);if(arguments.length&&arguments[0]instanceof b){var a=arguments[0];this.Fb(a.Fb());this.L(a.L());this.Nb(a.Nb());this.Kb(a.Kb());this.Lb(a.Lb());this.Mb(a.Mb());this.length(a.length())}}c.extend(b,a.a.R);a.a.$c=b})(d,e);(function(c,a){function b(){b.r.constructor.call(this,"asset");this.type=this.c("_type","type",j);this.k=this.c("_videoId","video_id",j);this.K=this.c("_publisher","publisher",j);this.q=
this.c("_adData","ad_data",j);this.duration=this.c("_duration","duration",j);this.type("");this.k("");this.K("");this.q(j);this.duration(0);if(arguments.length&&arguments[0]instanceof b){var a=arguments[0];this.type(a.type());this.k(a.k());this.K(a.K());this.duration(a.duration());(a=a.q())&&this.q(new h(a))}}var h=a.a.$c;c.extend(b,a.a.R);b.sd="vod";b.Ce="live";b.Be="linear";b.Ra="ad";a.a.jb=b})(d,e);(function(c,a){function b(a){b.r.constructor.call(this,"event");this.pf=a;this.type=this.c("_type",
"type",j);this.count=this.c("_count","count",j);this.Gc=this.c("_totalCount","total_count",j);this.duration=this.c("_duration","duration",j);this.Hc=this.c("_totalDuration","total_duration",j);this.ka=this.c("_playhead","playhead",j);this.id=this.c("_id","id",j);this.source=this.c("_source","source",j);this.Ac=this.c("_prevTs","prev_ts",j);this.qf=function(){var a=this.pf*1E3;this.pc=new Date(Math.floor(this.oc/a)*a);this.Pb("ts_as_date",new h(this.Bc,this.pc),j)};this.Rb=function(){if(arguments.length)this.oc=
arguments[0],this.Pb("ts",this.oc,j),this.qf();return this.oc};this.ag=function(){if(arguments.length)this.pc=arguments[0],this.Pb("ts_as_date",new h(this.Bc,this.pc),j)};this.type("");this.count(0);this.Gc(0);this.duration(0);this.Hc(0);this.ka(0);this.id("");this.source("");this.Ac(-1);this.Rb((new Date).getTime())}var h=a.a.he;c.extend(b,a.a.R);b.le="load";b.me="unload";b.ob="start";b.jd="play";b.hd="pause";b.je="buffer";b.ie="bitrate_change";b.ke="error";b.fd="active";b.gd="complete";a.a.pb=b})(d,
e);(function(c,a){function b(){b.r.constructor.call(this,"stream");this.qc=this.c("_bitrate","bitrate",j);this.Rd=this.c("_fps","fps",j);this.Od=this.c("_droppedFrames","dropped_frames",j);this.qc(0);this.Rd(0);this.Od(0)}c.extend(b,a.a.R);a.a.re=b})(d,e);(function(c,a){function b(){b.r.constructor.call(this,"sc");this.Xd=this.c("_reportSuiteId","rsid",j);this.trackingServer=this.c("_trackingServer","tracking_server",j);this.Xd("");this.trackingServer("")}c.extend(b,a.a.R);a.a.Ae=b})(d,e);(function(c,
a){function b(){b.r.constructor.call(this,"sp");this.ia=this.c("_ovp","ovp",j);this.la=this.c("_sdk","sdk",j);this.channel=this.c("_channel","channel",j);this.playerName=this.c("_playerName","player_name",j);this.ia("unknown");this.la("unknown");this.channel("unknown");this.playerName("")}c.extend(b,a.a.R);a.a.xe=b})(d,e);(function(c,a){function b(){b.r.constructor.call(this,"event");this.Ec=this.c("_sessionId","sid",j);this.Ec("")}c.extend(b,a.a.R);a.a.ye=b})(d,e);(function(c,a){function b(){b.r.constructor.call(this,
"stream");this.rc=this.c("_cdn","cdn",j);this.name=this.c("_name","name",j);this.rc("");this.name("");if(arguments.length&&arguments[0]instanceof b){var a=arguments[0];this.rc(a.rc());this.name(a.name())}}c.extend(b,a.a.R);a.a.qd=b})(d,e);(function(c,a){function b(){b.r.constructor.call(this,"user");this.uc=this.c("_device","device",j);this.country=this.c("_country","country",j);this.city=this.c("_city","city",j);this.latitude=this.c("_latitude","latitude",j);this.longitude=this.c("_longitude","longitude",
j);this.ib=this.c("_visitorId","id",j);this.$a=this.c("_analyticsVisitorId","aid",j);this.ab=this.c("_marketingCloudVisitorId","mid",j);this.uc("");this.country("");this.city("");this.latitude("");this.longitude("");this.ib("");this.$a("");this.ab("");if(arguments.length&&arguments[0]instanceof b){var a=arguments[0];this.uc(a.uc());this.country(a.country());this.city(a.city());this.latitude(a.latitude());this.longitude(a.longitude());this.ib(a.ib());this.$a(a.$a());this.ab(a.ab())}}c.extend(b,a.a.R);
a.a.vd=b})(d,e);(function(c,a){a.a.ue=function(a,c,f,m,e){this.ga=a;this.g=c;this.Lc=f;this.Fc=m;this.cb=e}})(d,e);(function(c,a){var b=a.a.pb;a.a.te=function(a,c,m){this.Xf=a;this.Tf=c;this.Vf=m;this.G=[];this.Za=function(a){this.G.push(a)};this.lg=function(){return this.G};this.Gf=function(){if(this.G.length)for(var a=this.G.length-1;a>=0;a--)this.G[a].ga.type()===b.hd&&this.G.splice(a,1)}}})(d,e);(function(c,a){function b(){}b.prototype.$d=E();b.prototype.ae=E();b.prototype.W=E();b.prototype.Zd=
E();b.prototype.be=E();a.a.we=b})(d,e);(function(c,a){function b(){this.N("[media-fork::QuerystringSerializer] > ");this.da=function(a){return a?a+"&":""};this.Gd=function(a){a&&a.length>0&&(a=a.substring(0,a.length-1));return a};this.mf=function(a){var b=[],c;for(c in a.data)if(a.data.hasOwnProperty(c)){var f=a.data[c],p=f.value;f=f.hint;var m=j,h=a.Bc;p===j||typeof p==="undefined"||(typeof p==="number"?m=this.Zd(c,p,h,f):typeof p==="string"?m=this.be(c,p,h,f):p instanceof e?m=this.W(p):this.warn("#_processDao() > Unable to serialize DAO. Field: "+
c+". Value: "+p+"."),m&&b.push(m))}return b}}var m=c.Q,f=c.P,e=a.a.R,g=a.a.ed;c.extend(b,a.a.we);m(b,f);b.prototype.$d=function(a){for(var b=[],c=a.G,f=0;f<c.length;f++){var p=this.ae(c[f])+"&";p+=this.da(this.W(a.Xf));p+=this.da(this.W(a.Tf));p+=this.da(this.W(a.Vf));p=this.Gd(p);b.push(p)}return b};b.prototype.ae=function(a){var b=this.da(this.W(a.ga));b+=this.da(this.W(a.g));b+=this.da(this.W(a.Lc));b+=this.da(this.W(a.Fc));b+=this.da(this.W(a.cb));return b=this.Gd(b)};b.prototype.W=function(a){a=
this.mf(a);for(var b="",c=0;c<a.length;c++)b+=c==a.length-1?a[c]:a[c]+"&";return b};b.prototype.Zd=function(a,b,c,f){var p="l";if(b!=j&&b!==void 0&&!isNaN(b))return f&&typeof f==="string"&&f===g.pa&&(p="h"),p+":"+c+":"+a+"="+b;return j};b.prototype.be=function(a,b,c){if(b)return"s:"+c+":"+a+"="+window.encodeURIComponent(b);return j};a.a.se=b})(d,e);(function(c,a){function b(a){this.Qb=0;this.O=a;this.Gb=!1}function m(){if(m.prototype.Ta)return m.prototype.Ta;var a=this;this.N("[media-fork::TimerManager] > ");
this.Ad=0;this.fa={};this.ua=function(){this.log("#_onApiDestroy()");clearInterval(this.yd);n().eb(this)};this.jf=function(){this.log("#_onTick() > ------------------- ("+this.Ad+")");this.Ad++;for(var a in this.fa)if(this.fa.hasOwnProperty(a)){var b=this.fa[a];if(b.Gb&&(b.Qb++,b.Qb%b.O===0)){var c={};c[d.X]=b.O;n().dispatchEvent(new g(g[a],c))}}};n().addEventListener(e.La,this.ua,this);this.yd=setInterval(function(){a.jf()},q*1E3);this.Lf=function(a){return(a=this.fa[a])&&a.Gb};this.Kd=function(a,
c){this.fa[a]=new b(c)};this.Ef=function(a){delete this.fa[a]};this.Yf=function(a,b){this.log("#startTimer(name="+a+", reset="+b+")");var c=this.fa[a];if(c&&(c.Gb=!0,b))this.log("Resseting timer: "+a),c.Qb=0};this.Zf=function(a,b){this.log("#startTimer(name="+a+", reset="+b+")");var c=this.fa[a];if(c&&(c.Gb=!1,b))this.log("Resseting timer: "+a),c.Qb=0};m.prototype.Ta=this}var f=c.Q,e=a.event.Ma,g=a.event.Na,d=a.event.ba,n=c.ca,q=1;f(m,c.P);new m;a.M.Ee=m})(d,e);(function(c,a){function b(a,b,c,m){this.N("[media-fork::Timer] > ");
this.O=m;this.ma=a;this.Hf=b;this.Ff=c;g().Kd(this.ma,this.O);this.ua=function(){this.Nd()};this.lf=function(a){a=a.data;var b=!1;a&&a.hasOwnProperty(d.Ga)&&(b=a[d.Ga]);this.start(b)};this.kf=function(a){a=a.data;var b=!1;a&&a.hasOwnProperty(d.Ga)&&(b=a[d.Ga]);this.stop(b)};f().addEventListener(e.La,this.ua,this);f().addEventListener(this.Hf,this.lf,this);f().addEventListener(this.Ff,this.kf,this)}var m=c.Q,f=c.ca,e=a.event.Ma,g=a.M.Ee,d=a.event.ba;m(b,c.P);b.prototype.start=function(a){this.log("#start("+
this.ma+")");g().Yf(this.ma,a)};b.prototype.stop=function(a){this.log("#stop("+this.ma+")");g().Zf(this.ma,a)};b.prototype.Nd=function(){f().eb(this);g().Ef(this.ma)};b.prototype.setInterval=function(a){var b=g().Lf(this.ma);this.stop(!0);this.O=a;g().Kd(this.ma,this.O);b&&this.start(!0)};a.M.ud=b})(d,e);(function(c,a){function b(){this.N("[media-fork::TrackingTimer] > ");b.r.constructor.call(this,n.CLOCK_TRACKING_TICK,n.CLOCK_TRACKING_ENABLE,n.CLOCK_TRACKING_DISABLE,v);this.kc=function(a){a=a.data[q.rd];
this.log("#_onCheckStatusComplete(interval="+a+")");a?a===this.O?this.log("#_onCheckStatusComplete() > Interval value not changed."):(this.log("#_onCheckStatusComplete() > Interval changed to: "+a),this.setInterval(a)):(this.warn("#_onCheckStatusComplete() > Invalid interval value."),this.setInterval(v))};this.lc=function(a){a=a.data[q.qa];this.log("#_onDataRequest(what="+a+")");switch(a){case g.ya.Qa:a={},a[q.X]=this.O,e().dispatchEvent(new g(g.mb,a))}};e().addEventListener(d.sb,this.kc,this);e().addEventListener(g.oa,
this.lc,this)}var m=c.Q,f=c.P,e=c.ca,g=a.event.Wb,d=a.event.tb,n=a.event.Na,q=a.event.ba,v=10;c.extend(b,a.M.ud);m(b,f);a.M.Fe=b})(d,e);(function(c,a){function b(){this.N("[media-fork::CheckStatusTimer] > ");b.r.constructor.call(this,v.CLOCK_CHECK_STATUS_TICK,v.CLOCK_CHECK_STATUS_ENABLE,v.CLOCK_CHECK_STATUS_DISABLE,f);var a=this;setTimeout(function(){a.Qe()},200);this.Qe=function(){this.log("#_initialCheck()");var a={};a[q.X]=this.O;d().dispatchEvent(new v(v.CLOCK_CHECK_STATUS_TICK,a))};this.kc=function(a){a=
a.data[q.cd];this.log("#_onCheckStatusComplete(interval="+a+")");a?a===this.O?this.log("#_onCheckStatusComplete() > Interval value not changed."):a>m?(this.warn("#_onCheckStatusComplete() > Interval value too large: "+a),this.setInterval(m)):(this.log("#_onCheckStatusComplete() > Interval changed to: "+a),this.setInterval(a)):(this.warn("#_onCheckStatusComplete() > Invalid interval value."),this.setInterval(f))};d().addEventListener(n.sb,this.kc,this)}var m=600,f=60,e=c.Q,g=c.P,d=c.ca,n=a.event.tb,
q=a.event.ba,v=a.event.Na;c.extend(b,a.M.ud);e(b,g);a.M.de=b})(d,e);(function(c,a){var b=a.M.de,m=a.M.Fe;a.M.ee=function(){this.dg=new b;this.fg=new m}})(d,e);(function(c,a){function b(a){this.N("[media-fork::SettingsParser] > ");this.Bd=a;this.log("#SettingsParser(data="+a+")")}var m=c.Q,f=c.ca,e=a.event.ba,g=a.event.tb;m(b,c.P);b.prototype.parse=function(){var a,b,c,m;if(this.Bd){window.DOMParser?m=(new window.DOMParser).parseFromString(this.Bd,"text/xml"):(m=new window.ActiveXObject("Microsoft.XMLDOM"),
m.async=!1,m.loadXML(this.data));var p;(p=parseInt(m.getElementsByTagName("trackingInterval")[0].childNodes[0].nodeValue,10))&&(a=p);(p=parseInt(m.getElementsByTagName("setupCheckInterval")[0].childNodes[0].nodeValue,10))&&(b=p);(p=parseInt(m.getElementsByTagName("trackExternalErrors")[0].childNodes[0].nodeValue,10))&&(c=p===1);m={};m[e.rd]=a;m[e.cd]=b;m[e.gc]=c;this.log("#parse() > Obtained configuration settings: "+JSON.stringify(m));f().dispatchEvent(new g(g.sb,m))}else this.warn("#SettingsParser() > No data available for parsing.")};
a.bb.ze=b})(d,e);(function(c,a){function b(a){this.N("[media-fork::Network] > ");this.ta=this.Hd=this.Cd=!1;this.of=a;this.Ed=this.xd=this.Id=j;this.jc=function(a){a=a.data;this.log("#_onApiConfig(sb_server="+a[p.xb]+", check_status_server="+a[p.lb]+", job_id="+a[p.rb]+", debug_tracking="+a[p.nb]+", track_local="+a[p.yb]+")");this.Id=a[p.xb];this.xd=a[p.lb];this.Ed=a[p.rb];this.Cd=a[p.nb];this.Hd=a[p.yb];this.ta=!0};this.ua=function(){this.log("#_onApiDestroy()");g().eb(this)};this.gf=function(a){if(this.ta){if(a=
this.of.$d(a.data[p.Fa]),!this.Hd)for(var b=0;b<a.length;b++){var c=new l(this.Id+"/?__job_id="+this.Ed+"&"+a[b],n.ld);this.Cd&&window.console&&window.console.info&&window.console.info(c.method+" : "+c.url);(function(a,b){a.addEventListener(e.wb,function(){a.close()},this);a.addEventListener(e.Xb,function(c){b.warn("#_onContextDataAvailable() > Failed to send heartbeat report: "+JSON.stringify(c));a.close()},this);a.load(c)})(new v,this)}}else this.warn("#_onContextDataAvailable() > Unable to send request: not configured.")};
this.ef=function(){function a(b){b.data&&(new k(b.data.response)).parse();b.data[v.qb].close()}function b(a){c.warn("_onClockCheckStatusTick() > Failed to obtain the config. settings: "+JSON.stringify(a));a.data[v.qb].close()}if(this.ta){var c=this;this.ea=function(c){if(c=c[p.Pa]){c=c.replace(/[^a-zA-Z0-9]+/,"-").toLocaleLowerCase();c=this.xd+c+".xml?r="+(new Date).getTime();var f=new l(c,n.ld),m=new v;m.addEventListener(e.wb,a,this);m.addEventListener(e.Xb,b,this);this.log("#_onClockCheckStatusTick() > Get new settings from: "+
c);m.load(f)}else this.warn("#_onClockCheckStatusTick() > Publisher is NULL.")};var f={};f[p.qa]=r.ya.md;g().dispatchEvent(new r(r.oa,f))}else this.warn("#_onClockCheckStatusTick() > Unable to send request: not configured.")};this.mc=function(a){this.Pd(a.data)};g().addEventListener(r.mb,this.mc,this);g().addEventListener(d.Tb,this.jc,this);g().addEventListener(d.La,this.ua,this);g().addEventListener(y.Ba,this.gf,this);g().addEventListener(t.CLOCK_CHECK_STATUS_TICK,this.ef,this)}var m=c.Q,f=c.P,e=
c.S,g=c.ca,d=a.event.Ma,n=c.Ie,l=c.He,v=c.Ge,p=a.event.ba,r=a.event.Wb,t=a.event.Na,y=a.event.dd,k=a.bb.ze;m(b,c.Md);m(b,f);a.bb.qe=b})(d,e);(function(c,a){function b(){this.N("[media-fork::Counters] > ");this.va={};this.wa={};this.Sd=function(a,b,c){a=b+"."+c+"."+a;this.va[a]||(this.va[a]=0);this.log("#getTotalCount(key="+a+")");return this.va[a]};this.mg=function(a,b,c){a=b+"."+c+"."+a;this.log("#resetTotalCount(key="+a+")");this.va[a]=0};this.Wd=function(a,b,c){a=b+"."+c+"."+a;this.va[a]||(this.va[a]=
0);this.log("#incrementTotalCount(key="+a+")");this.va[a]++};this.Td=function(a,b,c){a=b+"."+c+"."+a;this.wa[a]||(this.wa[a]=0);this.log("#getTotalDuration(key="+a+")");return this.wa[a]};this.ng=function(a,b,c){a=b+"."+c+"."+a;this.log("#resetTotalDuration(key="+a+")");this.wa[a]=0};this.Vd=function(a,b,c,m){a=b+"."+c+"."+a;this.wa[a]||(this.wa[a]=0);this.log("#increaseTotalDuration(key="+a+", amount="+m+")");this.wa[a]+=m}}var m=c.Q;m(b,c.P);a.H.ge=b})(d,e);(function(c,a){function b(){this.N("[media-fork::History] > ");
this.Dd={};this.zd=function(a){var b=a.g;return(b.q()?b.q().L():b.k())+"."+b.type()+"."+a.$};this.gb=function(a){var b=this.zd(a);this.log("#updateWith(key="+b+")");this.Dd[b]=a};this.J=function(a){a=this.zd(a);this.log("#getPreviousItemOfSameTypeWith(key="+a+")");return this.Dd[a]}}var m=c.Q;m(b,c.P);a.H.oe=b})(d,e);(function(c,a){var b=a.a.pb,m=a.a.jb,f=a.a.vd,e=a.a.qd;a.H.td=function(a,c,g,d,v,p){this.timestamp=new Date;this.g=new m(a);this.Lc=new f(c);this.Fc=new e(g);this.$=v;this.cb=d;this.ka=
p;this.A=void 0;this.If=function(){if(this.$===b.fd)return this.g.k();return this.g.type()===m.Ra?this.g.q().L():this.g.k()};this.kg=function(){return 1}}})(d,e);(function(c,a){a.H.De=function(){this.Z=[];this.Jf=function(){return this.Z.slice()};this.tf=function(a){for(var c=-1,m=this.Z.length-1;m>=0;m--){if(a.timestamp>=this.Z[m].timestamp)break;c=m}c>0?this.Z.splice(m,0,a):this.Z.push(a)}}})(d,e);(function(c,a){function b(a){this.N("[media-fork::ReporterHelper] > ");this.j=a;this.Fd=j;this.Ne=
function(a,b,c){c*=1E3;a=a.getTime()===0?b.getTime()-c/2:a.getTime()/2+b.getTime()/2;a=Math.floor(a/c)*c;this.Fd==a&&(a+=c);this.Fd=a;return new Date(a)};this.Sa=function(a,b,c){var m=this.j.ic,f=a.$,g=a.If(),h=a.g.type(),n=f===e.ob?0:a.ka;m.Wd(f,g,h);m.Vd(f,g,h,b);c=new e(c);c.type(f);c.count(1);c.duration(b);c.Gc(m.Sd(f,g,h));c.Hc(m.Td(f,g,h));c.ka(n);c.Rb(a.timestamp.getTime());c.Ac(a.A?a.A.timestamp.getTime():-1);return new d(c,a.g,a.Lc,a.Fc,a.cb)};this.wd=function(a,b,c){if(a.G.length){var m=
new g(this.j.e);m.type(this.j.Bb);m.q(j);m=new n(m,this.j.n,this.j.C,this.j.u,e.fd,this.j.p[this.j.e.k()]);m.A=this.j.o.J(m);this.j.o.gb(m);a.Za(this.Sa(m,b*1E3,b));if(c!=j)for(b=0;b<a.G.length;b++)a.G[b].ga.ag(c)}};this.Xa=function(a,b){return b.getTime()-a.getTime()};this.tc=function(a,b,c){var m=new f(this.j.Db,this.j.Ia,this.j.Wa);m.Za(this.Sa(a,0,b));c&&this.wd(m,b,j);return m};this.Jd=function(a,b,c){var m,d,h=new f(this.j.Db,this.j.Ia,this.j.Wa),n=this.j.Z.Jf(),l=[];d=j;var o=0;for(o=m=0;o<
n.length;o++)m=n[o],m.timestamp>a&&m.timestamp<=b&&l.push(m),m.timestamp<=a&&(d=m);this.log("#createReportForQuantum() > -------------TRACK REPORT----------------");this.log("#createReportForQuantum() > Interval: ["+a.getTime()+" , "+b.getTime()+"]. Tracking interval: "+c);this.log("#createReportForQuantum() > -----------------------------------------");for(o=0;o<n.length;o++)this.log("#createReportForQuantum() > ["+n[o].timestamp.getTime()+"] :"+n[o].$+" | "+n[o].g.type());this.log("#createReportForQuantum() > -----------------------------------------");
for(o=0;o<l.length;o++)this.log("#createReportForQuantum() > ["+l[o].timestamp.getTime()+"] :"+l[o].$+" | "+l[o].g.type());this.log("#createReportForQuantum() > -----------------------------------------");if(d){if(d.A)d.A.timestamp=d.timestamp;d.timestamp=new Date(a.getTime()+1);m=d.g.q()?d.g.q().L():d.g.k();d.ka=this.j.p[m]}if(l.length){n=0;d&&(n=d.$===e.ob&&d.g.type()!==g.Ra?this.Xa(d.timestamp,l[0].timestamp):this.Xa(a,l[0].timestamp),h.Za(this.Sa(d,n,c)));for(o=0;o<l.length;o++){var q=l[o];n=
o==l.length-1?this.Xa(q.timestamp,b):this.Xa(q.timestamp,l[o+1].timestamp);var x=!1,u=h.G;for(m=0;m<u.length;m++)if(d=u[m],q.g.type()===d.g.type()&&q.$===d.ga.type()&&(x=q.g.type()===g.Ra?d.g.q().L()===q.g.q().L():d.g.k()===q.g.k()),x){u=d.ga;var z=d.g.type();m=d.g.q()?d.g.q().L():d.g.k();var i=this.j.ic;i.Wd(u.type(),m,z);i.Vd(u.type(),m,z,n);d.cb=q.cb;u.ka(this.j.p[m]);u.duration(u.duration()+n);u.Gc(i.Sd(u.type(),m,z));u.Hc(i.Td(u.type(),m,z));u.Rb(q.timestamp.getTime());break}if(!x)this.log("#createReportForQuantum() > Adding event to report: "+
q.$),m=q.g.q()?q.g.q().L():q.g.k(),q.ka=this.j.p[m],h.Za(this.Sa(q,n,c))}}else d&&h.Za(this.Sa(d,this.Xa(a,b),c));h.Gf();o=this.Ne(a,b,c);this.wd(h,c,o);this.log("#createReportForQuantum() > Final report ----- START -----");for(o=0;o<h.G.length;o++)d=h.G[o],c=d.ga,m=d.g.q()?d.g.q().L():d.g.k(),this.log("#createReportForQuantum() > Final report ["+c.Rb()+"/"+c.Ac()+"] :"+c.type()+" | type="+d.g.type()+", name="+m+", duration="+c.duration()+", playhead="+c.ka());this.log("#createReportForQuantum() > Final report ----- END -----");
return h}}var m=c.Q,f=a.a.te,e=a.a.pb,g=a.a.jb,d=a.a.ue,n=a.H.td;m(b,c.P);a.H.ve=b})(d,e);(function(c,a){function b(){this.N("[media-fork::Context] > ");this.zb=this.z=!1;this.Bb=j;this.hc=!1;this.l=this.Cb=j;this.f={fb:j,K:j};this.Ya=this.ea=j;this.p={};this.Va=new g(this);this.Z=new e;this.o=new l;this.Wa=new v;this.Db=new p;this.Ia=new t;this.e=new r;this.n=new y;this.C=new k;this.u=new G;this.ic=new w;this.jc=function(a){a=a.data;this.log("#_onApiConfig(account="+a[i.Sb]+", sc_server="+a[i.cc]+
", sb_server="+a[i.xb]+", check_status_server="+a[i.lb]+", job_id="+a[i.rb]+", publisher="+a[i.Pa]+", ovp="+a[i.$b]+", sdk="+a[i.ec]+", debug_tracking="+a[i.nb]+", track_local="+a[i.yb]+")");this.Db.Xd(a[i.Sb]);this.Db.trackingServer(a[i.cc]);this.f.K=a[i.Pa];this.Ia.ia(a[i.$b]);this.Ia.la(a[i.ec]);this.Ia.channel(a[i.bd]);d().dispatchEvent(new o(o.CLOCK_CHECK_STATUS_ENABLE))};this.ua=function(){this.log("#_onApiDestroy()");d().eb(this)};this.Ye=function(a){a=a.data;this.log("#_onApiOpenMain(name="+
a[i.i]+", length="+a[i.Ca]+", type="+a[i.fc]+", player_name="+a[i.Ea]+", vid="+a[i.Ha]+", aid="+a[i.Aa]+", mid="+a[i.Da]+")");this.nf();this.l=a[i.i];this.p[this.l]=0;this.Ia.playerName(a[i.Ea]);this.n.ib(a[i.Ha]);this.n.$a(a[i.Aa]);this.n.ab(a[i.Da]);this.e.k(this.l);this.e.duration(a[i.Ca]);this.e.type(a[i.fc]);this.Bb=this.e.type();this.C.name(this.l);this.Pe();a={};a[i.Ga]=!0;d().dispatchEvent(new o(o.CLOCK_TRACKING_ENABLE,a));this.ea=function(a){a=a[i.X];var b=new n(this.e,this.n,this.C,this.u,
A.le,0);b.A=this.o.J(b);this.o.gb(b);a=this.Va.tc(b,a,!0);b={};b[i.Fa]=a;d().dispatchEvent(new z(z.Ba,b))};a={};a[i.qa]=x.ya.Qa;d().dispatchEvent(new x(x.oa,a));a=new n(this.e,this.n,this.C,this.u,A.ob,0);a.A=this.o.J(a);this.Y(a);this.z=!0};this.Xe=function(a){if(this.z){this.info("Call detected: onApiOpenAd().");a=a.data;this.log(this,"#_onApiOpenAd(name="+a[i.i]+", length="+a[i.Ca]+", player_name="+a[i.Ea]+", parent_name="+a[i.ac]+", pod_pos="+a[i.bc]+", pod_offset="+a[i.ub]+", cpm="+a[i.na]+")");
this.e.k()||this.e.k(a[i.ac]);this.l=a[i.i];this.p[this.l]=0;var b=new s;b.L(this.l);b.length(a[i.Ca]);b.Nb(a[i.Ea]);b.Fb(a[i.na]);b.Kb(a[i.nd]);b.Mb(this.Cb);b.Lb(a[i.bc]+"");this.e.q(b);this.e.type(r.Ra);a=new n(this.e,this.n,this.C,this.u,A.ob,0);a.A=this.o.J(a);this.Y(a);a=new n(this.e,this.n,this.C,this.u,A.jd,this.p[this.l]);a.A=this.o.J(a);this.Y(a)}else this.warn("#_onApiOpenAd() > No active viewing session.")};this.Ue=function(a){this.z?(a=a.data[i.i],this.log("#_onApiClose(name="+a+")"),
a===this.e.k()?this.Me():this.Le()):this.warn("#_onApiClose() > No active viewing session.")};this.Ze=function(a){if(this.z){if(a=a.data,this.log("#_onApiPlay(name="+a[i.i]+", offset="+a[i.B]+", vid="+a[i.Ha]+", aid="+a[i.Aa]+", mid="+a[i.Da]+")"),!(a[i.i]==this.e.k&&this.zb))this.n.ib(a[i.Ha]),this.n.$a(a[i.Aa]),this.n.ab(a[i.Da]),this.l=a[i.i],this.p[this.l]=Math.floor(a[i.B]),d().dispatchEvent(new o(o.CLOCK_TRACKING_ENABLE)),a=new n(this.e,this.n,this.C,this.u,A.jd,this.p[this.l]),a.A=this.o.J(a),
this.Y(a)}else this.warn("#_onApiPlay() > No active viewing session.")};this.cf=function(a){this.z?(a=a.data,this.log("#_onApiStop(name="+a[i.i]+", offset="+a[i.B]+")"),this.l=a[i.i],this.p[this.l]=Math.floor(a[i.B]),a=new n(this.e,this.n,this.C,this.u,A.hd,this.p[this.l]),a.A=this.o.J(a),this.Y(a),d().dispatchEvent(new o(o.CLOCK_TRACKING_DISABLE))):this.warn("#_onApiStop() > No active viewing session.")};this.Te=function(a){this.z?(a=a.data,this.log("#_onApiClick(name="+a[i.i]+", offset="+a[i.B]+
")")):this.warn("#_onApiClick() > No active viewing session.")};this.Ve=function(a){this.z?(a=a.data,this.log("#_onApiComplete(name="+a[i.i]+", offset="+a[i.B]+")")):this.warn("#_onApiComplete() > No active viewing session.")};this.af=function(a){this.z?(a=a.data,this.log("#_onApiQoSInfo(bitrate="+a[i.i]+", fps="+a[i.Zb]+", dropped_frames="+a[i.Vb]+")"),this.u.qc(a[i.kb]),this.u.Rd(a[i.Zb]),this.u.Od(a[i.Vb])):this.warn("#_onApiQoSInfo() > No active viewing session.")};this.Re=function(a){if(this.z){a=
a.data;this.log("#_onApiBitrateChange(bitrate="+a[i.i]+")");this.u.qc(a[i.kb]);var b=new n(this.e,this.n,this.C,this.u,A.ie,this.p[this.l]);b.A=this.o.J(b);this.o.gb(b);this.ea=function(a){a=this.Va.tc(b,a[i.X],!1);var c={};c[i.Fa]=a;d().dispatchEvent(new z(z.Ba,c))};a={};a[i.qa]=x.ya.Qa;d().dispatchEvent(new x(x.oa,a))}else this.warn("#_onApiBitrateChange() > No active viewing session.")};this.Se=function(){if(this.z){this.log("#_onApiBufferStart()");var a=new n(this.e,this.n,this.C,this.u,A.je,
this.p[this.l]);a.A=this.o.J(a);this.Y(a)}else this.warn("#_onApiBufferStart() > No active viewing session.")};this.df=function(a){if(this.z){var b=a.data;this.log("#_onApiTrackError(source="+b[i.vb]+", err_id="+b[i.Yb]+", offset="+b[i.B]+")");if(!(this.hc&&b[i.vb]!==H)){var c=new n(this.e,this.n,this.C,this.u,A.ke,Math.floor(b[i.B]));c.A=this.o.J(c);this.o.gb(c);this.ea=function(a){a=this.Va.tc(c,a[i.X],!1);var m=a.G[0];m.ga.id(b[i.Yb]);m.ga.source(b[i.vb]);m={};m[i.Fa]=a;d().dispatchEvent(new z(z.Ba,
m))};a={};a[i.qa]=x.ya.Qa;d().dispatchEvent(new x(x.oa,a))}}else this.warn("#_onApiTrackError() > No active viewing session.")};this.$e=function(a){this.z?(this.Cb=Math.floor(a.data[i.ub]),this.log("#_onApiPodOffset(podOffset="+this.Cb+")")):this.warn("#_onApiPodOffset() > No active viewing session.")};this.bf=function(){if(this.z){this.log("#_onApiSessionComplete()");var a=new n(this.e,this.n,this.C,this.u,A.me,0);a.A=this.o.J(a);this.Y(a);this.ea=function(a){var b=new Date;a=this.Va.Jd(this.Ya||
new Date(0),b,a[i.X]);var c={};c[i.Fa]=a;d().dispatchEvent(new z(z.Ba,c));this.Ya=b};a={};a[i.qa]=x.ya.Qa;d().dispatchEvent(new x(x.oa,a));a={};a[i.Ga]=!0;d().dispatchEvent(new o(o.CLOCK_TRACKING_DISABLE,a));this.z=!1}else this.warn("#_onApiSessionComplete() > No active viewing session.")};this.We=function(a){if(this.z){var b=a.data;this.log("#_onApiMonitor(name="+b[i.i]+", offset="+b[i.B]+")");this.l=b[i.i];this.p[this.l]=Math.floor(a.data[i.B])}else this.warn("#_onApiMonitor() > No active viewing session.")};
this.ff=function(a){if(this.z){this.log("#_onClockTrackingTick(interval="+a.data[i.X]+")");var b=new Date;a=this.Va.Jd(this.Ya||new Date(0),b,a.data[i.X]);var c={};c[i.Fa]=a;d().dispatchEvent(new z(z.Ba,c));this.Ya=b}else this.warn("#_onClockTrackingTick() > No active viewing session.")};this.hf=function(a){this.log("#_onNetworkCheckStatusComplete(track_ext_err="+a.data[i.gc]+")");a=a.data[i.gc];if(a!==j)this.hc=a};this.lc=function(a){a=a.data[i.qa];this.log("#_onDataRequest(what="+a+")");switch(a){case x.ya.md:a=
{},a[i.Pa]=this.f.K,d().dispatchEvent(new x(x.mb,a))}};this.mc=function(a){this.log("#_onDataResponse()");this.Pd(a.data)};this.nf=function(){this.log("#_resetInternalState()");this.zb=this.z=!1;this.Bb=j;this.hc=!1;this.p={};this.Ya=this.Cb=j;this.ic=new w;this.o=new l;this.Z=new e;this.n=new y;this.C=new k;this.u=new G;this.Wa=new v;this.e=new r;this.e.K(this.f.K);this.e.type(this.f.fb)};this.Pe=function(){this.Wa.Ec(""+(new Date).getTime()+Math.floor(Math.random()*1E9));this.log("#_generateSessionId() > New session id: "+
this.Wa.Ec)};this.Y=function(a){this.log("#_placeItemOnTimeline(type="+a.$+")");this.Z.tf(a);this.o.gb(a)};this.Me=function(){if(this.zb)this.warn("#_closeMainVideo() > The main video content was already closed.");else{this.p[this.e.k()]==-1&&(this.p[this.e.k()]=this.e.duration());var a=new n(this.e,this.n,this.C,this.u,A.gd,this.p[this.e.k()]);a.A=this.o.J(a);this.Y(a);this.zb=!0}};this.Le=function(){var a=new n(this.e,this.n,this.C,this.u,A.gd,this.p[this.l]);a.A=this.o.J(a);this.Y(a);this.e.type(this.Bb);
this.l=this.e.k();this.e.q(j)};d().addEventListener(u.Tb,this.jc,this);d().addEventListener(u.La,this.ua,this);d().addEventListener(u.Uc,this.Ye,this);d().addEventListener(u.Tc,this.Xe,this);d().addEventListener(u.Qc,this.Ue,this);d().addEventListener(u.Vc,this.Ze,this);d().addEventListener(u.Yc,this.cf,this);d().addEventListener(u.Pc,this.Te,this);d().addEventListener(u.Rc,this.Ve,this);d().addEventListener(u.Wc,this.af,this);d().addEventListener(u.Nc,this.Re,this);d().addEventListener(u.Oc,this.Se,
this);d().addEventListener(u.Zc,this.df,this);d().addEventListener(u.Ub,this.$e,this);d().addEventListener(u.Xc,this.bf,this);d().addEventListener(u.Sc,this.We,this);d().addEventListener(o.CLOCK_TRACKING_TICK,this.ff,this);d().addEventListener(D.sb,this.hf,this);d().addEventListener(x.oa,this.lc,this);d().addEventListener(x.mb,this.mc,this)}var m=c.Q,f=c.P,d=c.ca,g=a.H.ve,e=a.H.De,n=a.H.td,l=a.H.oe,v=a.a.ye,p=a.a.Ae,r=a.a.jb,t=a.a.xe,y=a.a.vd,k=a.a.qd,G=a.a.re,w=a.H.ge,o=a.event.Na,D=a.event.tb,x=
a.event.Wb,u=a.event.Ma,z=a.event.dd,i=a.event.ba,A=a.a.pb,s=a.a.$c,H="player";m(b,c.Md);m(b,f);a.H.fe=b})(d,e);(function(c){function a(a){this.N("[media-fork::HeartbeatMediaFork] > ");this.m=a;this.D=function(){var a=this.ta&&(this.m.analyticsVisitorID||this.m.marketingCloudVisitorID||this.m.visitorID);a||this.warn("Unable to track! Is configured: "+this.ta+" analyticsVisitorID: "+this.m.analyticsVisitorID+" marketingCloudVisitorID: "+this.m.marketingCloudVisitorID+" visitorID: "+this.m.visitorID);
return a};this.ta=!1;this.j=new n;this.eg=new l(new v);this.yd=new g;this.nc=j;this.f={trackingServer:j,vc:j,K:j,fb:j,ia:j,la:j,channel:j,debugTracking:!1,Jc:!1}}var b=d.Q,m=d.ca,f=c.event.ba,e=c.event.Ma,g=c.M.ee,l=c.bb.qe,n=c.H.fe,q=c.a.jb,v=c.a.se;b(a,d.P);a.prototype.Wf=function(a){if(a&&a.hasOwnProperty("debugLogging"))d.Oa=a.debugLogging;this.log("#setup(configData={trackingServer: "+a.trackingServer+", jobId: "+a.vc+", streamType: "+a.fb+", publisher: "+a.K+", ovp: "+a.ia+", sdk: "+a.la+", debugLogging: "+
a.ig+"})");this.f.debugTracking=this.m.debugTracking;this.f.Jc=this.m.trackLocal;this.f.channel=this.m.Media.channel;if(a){if(a.hasOwnProperty("trackingServer"))this.f.trackingServer=a.trackingServer;if(a.hasOwnProperty("jobId"))this.f.vc=a.jobId;if(a.hasOwnProperty("publisher"))this.f.K=a.publisher;if(a.hasOwnProperty("ovp"))this.f.ia=a.ovp;if(a.hasOwnProperty("sdk"))this.f.la=a.sdk;if(a.hasOwnProperty("streamType"))this.f.fb=a.streamType===q.sd||a.streamType===q.Ce||a.streamType===q.Be||a.streamType===
q.Ra?a.streamType:q.sd;if(this.m.Media.__primetime)this.f.ia="primetime";if(this.nc!=j)this.f.la=this.nc;this.log("#setup() > Applying configuration: {account: "+this.m.account+", scTrackingServer: "+this.m.trackingServer+", sbTrackingServer: "+this.f.trackingServer+", jobId: "+this.f.trackingServer+", publisher: "+this.f.K+", ovp: "+this.f.ia+", sdk: "+this.f.la+", channel: "+this.f.channel+", debugTracking: "+this.f.debugTracking+", trackLocal: "+this.f.Jc+"}");a={};a[f.Sb]=this.m.account;a[f.cc]=
this.m.trackingServer;a[f.xb]=this.f.trackingServer;a[f.lb]=this.f.trackingServer+"/settings/";a[f.rb]=this.f.vc;a[f.Pa]=this.f.K;a[f.$b]=this.f.ia;a[f.ec]=this.f.la;a[f.bd]=this.f.channel;a[f.nb]=this.f.debugTracking;a[f.yb]=this.f.Jc;m().dispatchEvent(new e(e.Tb,a));this.ta=!0}};a.prototype.open=function(a,b,c){this.log("#open(name="+a+", length="+b+", playerName="+c+")");if(this.D()){var d={};d[f.Ha]=this.m.visitorID;d[f.Aa]=this.m.analyticsVisitorID;d[f.Da]=this.m.Nf;d[f.i]=a;d[f.Ca]=b;d[f.fc]=
this.f.fb;d[f.Ea]=c;m().dispatchEvent(new e(e.Uc,d))}};a.prototype.openAd=function(a,b,c,d,g,l,n){this.log("#openAd(name="+a+", length="+b+", playerName="+c+", parentName="+d+", parentPod="+g+", parentPodPosition="+l+", cpm="+n+", )");if(this.D()){var o={};o[f.i]=a;o[f.Ca]=b;o[f.Ea]=c;o[f.ac]=d;o[f.nd]=g;o[f.bc]=l;o[f.na]=n;m().dispatchEvent(new e(e.Tc,o))}};a.prototype.close=function(a){this.log("#close(name="+a+")");if(this.D()){var b={};b[f.i]=a;m().dispatchEvent(new e(e.Qc,b))}};a.prototype.play=
function(a,b,c,d,g){this.log("#play(name="+a+", offset="+b+", segmentNum="+c+", segment="+d+", segmentLength="+g+")");if(this.D())c={},c[f.Ha]=this.m.visitorID,c[f.Aa]=this.m.analyticsVisitorID,c[f.Da]=this.m.Nf,c[f.i]=a,c[f.B]=b,m().dispatchEvent(new e(e.Vc,c))};a.prototype.monitor=function(a,b){this.log("#monitor(name="+a+", offset="+b+")");var c={};c[f.i]=a;c[f.B]=b;m().dispatchEvent(new e(e.Sc,c))};a.prototype.stop=function(a,b){this.log("#stop(name="+a+", offset="+b+")");if(this.D()){var c={};
c[f.i]=a;c[f.B]=b;m().dispatchEvent(new e(e.Yc,c))}};a.prototype.click=function(a,b){this.log("#click(name="+a+", offset="+b+")");if(this.D()){var c={};c[f.i]=a;c[f.B]=b;m().dispatchEvent(new e(e.Pc,c))}};a.prototype.complete=function(a,b){this.log("#complete(name="+a+", offset="+b+")");if(this.D()){var c={};c[f.i]=a;c[f.B]=b;m().dispatchEvent(new e(e.Rc,c))}};a.prototype.Nd=function(){Logger.hg(this,"#destroy()");m().dispatchEvent(new e(e.La))};a.prototype.$f=function(a,b,c){this.log("#trackError(source="+
a+", errorId="+b+", offset="+c+")");if(this.D()){var d={};d[f.vb]=a;d[f.Yb]=b;d[f.B]=c;m().dispatchEvent(new e(e.Zc,d))}};a.prototype.bg=function(a,b,c){this.log("#updateQoSInfo(bitrate="+a+", fps="+b+", droppedFrames="+c+")");if(this.D()){var d={};d[f.kb]=a;d[f.Zb]=b;d[f.Vb]=c;m().dispatchEvent(new e(e.Wc,d))}};a.prototype.wf=function(a){this.log("#bitrateChange(bitrate="+a+")");if(this.D()){var b={};b[f.kb]=a;m().dispatchEvent(new e(e.Nc,b))}};a.prototype.xf=function(){this.log("#bufferStart()");
this.D()&&m().dispatchEvent(new e(e.Oc))};a.prototype.sf=function(a){this.log("#adBreakStart(offset="+a+")");if(this.D()){var b={};b[f.ub]=a;m().dispatchEvent(new e(e.Ub,b))}};a.prototype.rf=function(){this.log("#adBreakEnd()");if(this.D()){var a={};a[f.ub]=j;m().dispatchEvent(new e(e.Ub,a))}};a.prototype.Uf=function(){this.log("#sessionComplete()");this.D()&&m().dispatchEvent(new e(e.Xc))};a.prototype.Ke=function(a){this.log("#__setPsdkVersion(version="+a+")");this.nc=a};c.ne=a})(e);m.Ka||(m.Ka=
{});m.Ka.Bf||(m.Ka.Bf=d);m.Ka.Of=e})(this);this.Je(m)}(m.s);D.callMethodWhenReady=function(m,g){s.visitor!=j&&(s.isReadyToTrack()?D[m].apply(this,g):s.callbackWhenReadyToTrack(D,D[m],g))};m.Heartbeat=D;m.uf=function(){var e,g;if(m.autoTrack&&(e=m.s.d.getElementsByTagName("VIDEO")))for(g=0;g<e.length;g++)m.attach(e[g])};m.ra(w,"load",m.uf)}

s.loadModule('Media');
s.Media.trackWhilePlaying=true;
s.Media.segmentByMilestones=true;
s.Media.trackMilestones='25,50,75';

/*
 ============== DO NOT ALTER ANYTHING BELOW THIS LINE ! ===============

 AppMeasurement for JavaScript version: 1.3.2
 Copyright 1996-2013 Adobe, Inc. All Rights Reserved
 More info available at http://www.omniture.com
*/
function AppMeasurement(){var s=this;s.version="1.3.2";var w=window;if(!w.s_c_in)w.s_c_il=[],w.s_c_in=0;s._il=w.s_c_il;s._in=w.s_c_in;s._il[s._in]=s;w.s_c_in++;s._c="s_c";var k=w.ob;k||(k=null);var j=w,g,o;try{g=j.parent;for(o=j.location;g&&g.location&&o&&""+g.location!=""+o&&j.location&&""+g.location!=""+j.location&&g.location.host==o.host;)j=g,g=j.parent}catch(p){}s.Za=function(s){try{console.log(s)}catch(a){}};s.oa=function(s){return""+parseInt(s)==""+s};s.replace=function(s,a,c){if(!s||s.indexOf(a)<
0)return s;return s.split(a).join(c)};s.escape=function(b){var a,c;if(!b)return b;b=encodeURIComponent(b);for(a=0;a<7;a++)c="+~!*()'".substring(a,a+1),b.indexOf(c)>=0&&(b=s.replace(b,c,"%"+c.charCodeAt(0).toString(16).toUpperCase()));return b};s.unescape=function(b){if(!b)return b;b=b.indexOf("+")>=0?s.replace(b,"+"," "):b;try{return decodeURIComponent(b)}catch(a){}return unescape(b)};s.Qa=function(){var b=w.location.hostname,a=s.fpCookieDomainPeriods,c;if(!a)a=s.cookieDomainPeriods;if(b&&!s.ha&&
!/^[0-9.]+$/.test(b)&&(a=a?parseInt(a):2,a=a>2?a:2,c=b.lastIndexOf("."),c>=0)){for(;c>=0&&a>1;)c=b.lastIndexOf(".",c-1),a--;s.ha=c>0?b.substring(c):b}return s.ha};s.c_r=s.cookieRead=function(b){b=s.escape(b);var a=" "+s.d.cookie,c=a.indexOf(" "+b+"="),e=c<0?c:a.indexOf(";",c);b=c<0?"":s.unescape(a.substring(c+2+b.length,e<0?a.length:e));return b!="[[B]]"?b:""};s.c_w=s.cookieWrite=function(b,a,c){var e=s.Qa(),d=s.cookieLifetime,f;a=""+a;d=d?(""+d).toUpperCase():"";c&&d!="SESSION"&&d!="NONE"&&((f=a!=
""?parseInt(d?d:0):-60)?(c=new Date,c.setTime(c.getTime()+f*1E3)):c==1&&(c=new Date,f=c.getYear(),c.setYear(f+5+(f<1900?1900:0))));if(b&&d!="NONE")return s.d.cookie=b+"="+s.escape(a!=""?a:"[[B]]")+"; path=/;"+(c&&d!="SESSION"?" expires="+c.toGMTString()+";":"")+(e?" domain="+e+";":""),s.cookieRead(b)==a;return 0};s.D=[];s.C=function(b,a,c){if(s.ia)return 0;if(!s.maxDelay)s.maxDelay=250;var e=0,d=(new Date).getTime()+s.maxDelay,f=s.d.mb,i=["webkitvisibilitychange","visibilitychange"];if(!f)f=s.d.nb;
if(f&&f=="prerender"){if(!s.V){s.V=1;for(c=0;c<i.length;c++)s.d.addEventListener(i[c],function(){var b=s.d.mb;if(!b)b=s.d.nb;if(b=="visible")s.V=0,s.delayReady()})}e=1;d=0}else c||s.r("_d")&&(e=1);e&&(s.D.push({m:b,a:a,t:d}),s.V||setTimeout(s.delayReady,s.maxDelay));return e};s.delayReady=function(){var b=(new Date).getTime(),a=0,c;for(s.r("_d")&&(a=1);s.D.length>0;){c=s.D.shift();if(a&&!c.t&&c.t>b){s.D.unshift(c);setTimeout(s.delayReady,parseInt(s.maxDelay/2));break}s.ia=1;s[c.m].apply(s,c.a);s.ia=
0}};s.setAccount=s.sa=function(b){var a,c;if(!s.C("setAccount",arguments))if(s.account=b,s.allAccounts){a=s.allAccounts.concat(b.split(","));s.allAccounts=[];a.sort();for(c=0;c<a.length;c++)(c==0||a[c-1]!=a[c])&&s.allAccounts.push(a[c])}else s.allAccounts=b.split(",")};s.foreachVar=function(b,a){var c,e,d,f,i="";d=e="";if(s.lightProfileID)c=s.H,(i=s.lightTrackVars)&&(i=","+i+","+s.Y.join(",")+",");else{c=s.c;if(s.pe||s.linkType)if(i=s.linkTrackVars,e=s.linkTrackEvents,s.pe&&(d=s.pe.substring(0,1).toUpperCase()+
s.pe.substring(1),s[d]))i=s[d].lb,e=s[d].kb;i&&(i=","+i+","+s.A.join(",")+",");e&&i&&(i+=",events,")}a&&(a=","+a+",");for(e=0;e<c.length;e++)d=c[e],(f=s[d])&&(!i||i.indexOf(","+d+",")>=0)&&(!a||a.indexOf(","+d+",")>=0)&&b(d,f)};s.J=function(b,a,c,e,d){var f="",i,m,w,q,g=0;b=="contextData"&&(b="c");if(a){for(i in a)if(!Object.prototype[i]&&(!d||i.substring(0,d.length)==d)&&a[i]&&(!c||c.indexOf(","+(e?e+".":"")+i+",")>=0)){w=!1;if(g)for(m=0;m<g.length;m++)i.substring(0,g[m].length)==g[m]&&(w=!0);if(!w&&
(f==""&&(f+="&"+b+"."),m=a[i],d&&(i=i.substring(d.length)),i.length>0))if(w=i.indexOf("."),w>0)m=i.substring(0,w),w=(d?d:"")+m+".",g||(g=[]),g.push(w),f+=s.J(m,a,c,e,w);else if(typeof m=="boolean"&&(m=m?"true":"false"),m){if(e=="retrieveLightData"&&d.indexOf(".contextData.")<0)switch(w=i.substring(0,4),q=i.substring(4),i){case "transactionID":i="xact";break;case "channel":i="ch";break;case "campaign":i="v0";break;default:s.oa(q)&&(w=="prop"?i="c"+q:w=="eVar"?i="v"+q:w=="list"?i="l"+q:w=="hier"&&(i=
"h"+q,m=m.substring(0,255)))}f+="&"+s.escape(i)+"="+s.escape(m)}}f!=""&&(f+="&."+b)}return f};s.Sa=function(){var b="",a,c,e,d,f,i,m,w,g="",k="",j=c="";if(s.lightProfileID)a=s.H,(g=s.lightTrackVars)&&(g=","+g+","+s.Y.join(",")+",");else{a=s.c;if(s.pe||s.linkType)if(g=s.linkTrackVars,k=s.linkTrackEvents,s.pe&&(c=s.pe.substring(0,1).toUpperCase()+s.pe.substring(1),s[c]))g=s[c].lb,k=s[c].kb;g&&(g=","+g+","+s.A.join(",")+",");k&&(k=","+k+",",g&&(g+=",events,"));s.events2&&(j+=(j!=""?",":"")+s.events2)}s.AudienceManagement&&
s.AudienceManagement.isReady()&&(b+=s.J("d",s.AudienceManagement.getEventCallConfigParams()));for(c=0;c<a.length;c++){d=a[c];f=s[d];e=d.substring(0,4);i=d.substring(4);!f&&d=="events"&&j&&(f=j,j="");if(f&&(!g||g.indexOf(","+d+",")>=0)){switch(d){case "supplementalDataID":d="sdid";break;case "timestamp":d="ts";break;case "dynamicVariablePrefix":d="D";break;case "visitorID":d="vid";break;case "marketingCloudVisitorID":d="mid";break;case "analyticsVisitorID":d="aid";break;case "audienceManagerLocationHint":d=
"aamlh";break;case "audienceManagerBlob":d="aamb";break;case "pageURL":d="g";if(f.length>255)s.pageURLRest=f.substring(255),f=f.substring(0,255);break;case "pageURLRest":d="-g";break;case "referrer":d="r";break;case "vmk":case "visitorMigrationKey":d="vmt";break;case "visitorMigrationServer":d="vmf";s.ssl&&s.visitorMigrationServerSecure&&(f="");break;case "visitorMigrationServerSecure":d="vmf";!s.ssl&&s.visitorMigrationServer&&(f="");break;case "charSet":d="ce";break;case "visitorNamespace":d="ns";
break;case "cookieDomainPeriods":d="cdp";break;case "cookieLifetime":d="cl";break;case "variableProvider":d="vvp";break;case "currencyCode":d="cc";break;case "channel":d="ch";break;case "transactionID":d="xact";break;case "campaign":d="v0";break;case "resolution":d="s";break;case "colorDepth":d="c";break;case "javascriptVersion":d="j";break;case "javaEnabled":d="v";break;case "cookiesEnabled":d="k";break;case "browserWidth":d="bw";break;case "browserHeight":d="bh";break;case "connectionType":d="ct";
break;case "homepage":d="hp";break;case "plugins":d="p";break;case "events":j&&(f+=(f!=""?",":"")+j);if(k){i=f.split(",");f="";for(e=0;e<i.length;e++)m=i[e],w=m.indexOf("="),w>=0&&(m=m.substring(0,w)),w=m.indexOf(":"),w>=0&&(m=m.substring(0,w)),k.indexOf(","+m+",")>=0&&(f+=(f?",":"")+i[e])}break;case "events2":f="";break;case "contextData":b+=s.J("c",s[d],g,d);f="";break;case "lightProfileID":d="mtp";break;case "lightStoreForSeconds":d="mtss";s.lightProfileID||(f="");break;case "lightIncrementBy":d=
"mti";s.lightProfileID||(f="");break;case "retrieveLightProfiles":d="mtsr";break;case "deleteLightProfiles":d="mtsd";break;case "retrieveLightData":s.retrieveLightProfiles&&(b+=s.J("mts",s[d],g,d));f="";break;default:s.oa(i)&&(e=="prop"?d="c"+i:e=="eVar"?d="v"+i:e=="list"?d="l"+i:e=="hier"&&(d="h"+i,f=f.substring(0,255)))}f&&(b+="&"+d+"="+(d.substring(0,3)!="pev"?s.escape(f):f))}d=="pev3"&&s.g&&(b+=s.g)}return b};s.v=function(s){var a=s.tagName;if(""+s.sb!="undefined"||""+s.eb!="undefined"&&(""+s.eb).toUpperCase()!=
"HTML")return"";a=a&&a.toUpperCase?a.toUpperCase():"";a=="SHAPE"&&(a="");a&&((a=="INPUT"||a=="BUTTON")&&s.type&&s.type.toUpperCase?a=s.type.toUpperCase():!a&&s.href&&(a="A"));return a};s.ka=function(s){var a=s.href?s.href:"",c,e,d;c=a.indexOf(":");e=a.indexOf("?");d=a.indexOf("/");if(a&&(c<0||e>=0&&c>e||d>=0&&c>d))e=s.protocol&&s.protocol.length>1?s.protocol:l.protocol?l.protocol:"",c=l.pathname.lastIndexOf("/"),a=(e?e+"//":"")+(s.host?s.host:l.host?l.host:"")+(h.substring(0,1)!="/"?l.pathname.substring(0,
c<0?0:c)+"/":"")+a;return a};s.F=function(b){var a=s.v(b),c,e,d="",f=0;if(a){c=b.protocol;e=b.onclick;if(b.href&&(a=="A"||a=="AREA")&&(!e||!c||c.toLowerCase().indexOf("javascript")<0))d=s.ka(b);else if(e)d=s.replace(s.replace(s.replace(s.replace(""+e,"\r",""),"\n",""),"\t","")," ",""),f=2;else if(a=="INPUT"||a=="SUBMIT"){if(b.value)d=b.value;else if(b.innerText)d=b.innerText;else if(b.textContent)d=b.textContent;f=3}else if(b.src&&a=="IMAGE")d=b.src;if(d)return{id:d.substring(0,100),type:f}}return 0};
s.pb=function(b){for(var a=s.v(b),c=s.F(b);b&&!c&&a!="BODY";)if(b=b.parentElement?b.parentElement:b.parentNode)a=s.v(b),c=s.F(b);if(!c||a=="BODY")b=0;if(b&&(a=b.onclick?""+b.onclick:"",a.indexOf(".tl(")>=0||a.indexOf(".trackLink(")>=0))b=0;return b};s.bb=function(){var b,a,c=s.linkObject,e=s.linkType,d=s.linkURL,f,i;s.Z=1;if(!c)s.Z=0,c=s.j;if(c){b=s.v(c);for(a=s.F(c);c&&!a&&b!="BODY";)if(c=c.parentElement?c.parentElement:c.parentNode)b=s.v(c),a=s.F(c);if(!a||b=="BODY")c=0;if(c){var m=c.onclick?""+
c.onclick:"";if(m.indexOf(".tl(")>=0||m.indexOf(".trackLink(")>=0)c=0}}else s.Z=1;!d&&c&&(d=s.ka(c));d&&!s.linkLeaveQueryString&&(f=d.indexOf("?"),f>=0&&(d=d.substring(0,f)));if(!e&&d){var g=0,k=0,j;if(s.trackDownloadLinks&&s.linkDownloadFileTypes){m=d.toLowerCase();f=m.indexOf("?");i=m.indexOf("#");f>=0?i>=0&&i<f&&(f=i):f=i;f>=0&&(m=m.substring(0,f));f=s.linkDownloadFileTypes.toLowerCase().split(",");for(i=0;i<f.length;i++)(j=f[i])&&m.substring(m.length-(j.length+1))=="."+j&&(e="d")}if(s.trackExternalLinks&&
!e&&(m=d.toLowerCase(),s.na(m))){if(!s.linkInternalFilters)s.linkInternalFilters=w.location.hostname;f=0;s.linkExternalFilters?(f=s.linkExternalFilters.toLowerCase().split(","),g=1):s.linkInternalFilters&&(f=s.linkInternalFilters.toLowerCase().split(","));if(f){for(i=0;i<f.length;i++)j=f[i],m.indexOf(j)>=0&&(k=1);k?g&&(e="e"):g||(e="e")}}}s.linkObject=c;s.linkURL=d;s.linkType=e;if(s.trackClickMap||s.trackInlineStats)if(s.g="",c){e=s.pageName;d=1;c=c.sourceIndex;if(!e)e=s.pageURL,d=0;if(w.s_objectID)a.id=
w.s_objectID,c=a.type=1;if(e&&a&&a.id&&b)s.g="&pid="+s.escape(e.substring(0,255))+(d?"&pidt="+d:"")+"&oid="+s.escape(a.id.substring(0,100))+(a.type?"&oidt="+a.type:"")+"&ot="+b+(c?"&oi="+c:"")}};s.Ta=function(){var b=s.Z,a=s.linkType,c=s.linkURL,e=s.linkName;if(a&&(c||e))a=a.toLowerCase(),a!="d"&&a!="e"&&(a="o"),s.pe="lnk_"+a,s.pev1=c?s.escape(c):"",s.pev2=e?s.escape(e):"",b=1;s.abort&&(b=0);if(s.trackClickMap||s.trackInlineStats){a={};c=0;var d=s.cookieRead("s_sq"),f=d?d.split("&"):0,i,w,g;d=0;if(f)for(i=
0;i<f.length;i++)w=f[i].split("="),e=s.unescape(w[0]).split(","),w=s.unescape(w[1]),a[w]=e;e=s.account.split(",");if(b||s.g){b&&!s.g&&(d=1);for(w in a)if(!Object.prototype[w])for(i=0;i<e.length;i++){d&&(g=a[w].join(","),g==s.account&&(s.g+=(w.charAt(0)!="&"?"&":"")+w,a[w]=[],c=1));for(f=0;f<a[w].length;f++)g=a[w][f],g==e[i]&&(d&&(s.g+="&u="+s.escape(g)+(w.charAt(0)!="&"?"&":"")+w+"&u=0"),a[w].splice(f,1),c=1)}b||(c=1);if(c){d="";i=2;!b&&s.g&&(d=s.escape(e.join(","))+"="+s.escape(s.g),i=1);for(w in a)!Object.prototype[w]&&
i>0&&a[w].length>0&&(d+=(d?"&":"")+s.escape(a[w].join(","))+"="+s.escape(w),i--);s.cookieWrite("s_sq",d)}}}return b};s.Ua=function(){if(!s.jb){var b=new Date,a=j.location,c,e,d,f=d=e=c="",i="",w="",g="1.2",k=s.cookieWrite("s_cc","true",0)?"Y":"N",o="",p="",n=0;if(b.setUTCDate&&(g="1.3",n.toPrecision&&(g="1.5",c=[],c.forEach))){g="1.6";d=0;e={};try{d=new Iterator(e),d.next&&(g="1.7",c.reduce&&(g="1.8",g.trim&&(g="1.8.1",Date.parse&&(g="1.8.2",Object.create&&(g="1.8.5")))))}catch(r){}}c=screen.width+
"x"+screen.height;d=navigator.javaEnabled()?"Y":"N";e=screen.pixelDepth?screen.pixelDepth:screen.colorDepth;i=s.w.innerWidth?s.w.innerWidth:s.d.documentElement.offsetWidth;w=s.w.innerHeight?s.w.innerHeight:s.d.documentElement.offsetHeight;b=navigator.plugins;try{s.b.addBehavior("#default#homePage"),o=s.b.qb(a)?"Y":"N"}catch(t){}try{s.b.addBehavior("#default#clientCaps"),p=s.b.connectionType}catch(u){}if(b)for(;n<b.length&&n<30;){if(a=b[n].name)a=a.substring(0,100)+";",f.indexOf(a)<0&&(f+=a);n++}s.resolution=
c;s.colorDepth=e;s.javascriptVersion=g;s.javaEnabled=d;s.cookiesEnabled=k;s.browserWidth=i;s.browserHeight=w;s.connectionType=p;s.homepage=o;s.plugins=f;s.jb=1}};s.I={};s.loadModule=function(b,a){var c=s.I[b];if(!c){c=w["AppMeasurement_Module_"+b]?new w["AppMeasurement_Module_"+b](s):{};s.I[b]=s[b]=c;c.Ba=function(){return c.Ea};c.Fa=function(a){if(c.Ea=a)s[b+"_onLoad"]=a,s.C(b+"_onLoad",[s,c],1)||a(s,c)};try{Object.defineProperty?Object.defineProperty(c,"onLoad",{get:c.Ba,set:c.Fa}):c._olc=1}catch(e){c._olc=
1}}a&&(s[b+"_onLoad"]=a,s.C(b+"_onLoad",[s,c],1)||a(s,c))};s.r=function(b){var a,c;for(a in s.I)if(!Object.prototype[a]&&(c=s.I[a])){if(c._olc&&c.onLoad)c._olc=0,c.onLoad(s,c);if(c[b]&&c[b]())return 1}return 0};s.Xa=function(){var b=Math.floor(Math.random()*1E13),a=s.visitorSampling,c=s.visitorSamplingGroup;c="s_vsn_"+(s.visitorNamespace?s.visitorNamespace:s.account)+(c?"_"+c:"");var e=s.cookieRead(c);if(a){e&&(e=parseInt(e));if(!e){if(!s.cookieWrite(c,b))return 0;e=b}if(e%1E4>v)return 0}return 1};
s.K=function(b,a){var c,e,d,f,w,g;for(c=0;c<2;c++){e=c>0?s.ea:s.c;for(d=0;d<e.length;d++)if(f=e[d],(w=b[f])||b["!"+f]){if(!a&&(f=="contextData"||f=="retrieveLightData")&&s[f])for(g in s[f])w[g]||(w[g]=s[f][g]);s[f]=w}}};s.wa=function(b,a){var c,e,d,f;for(c=0;c<2;c++){e=c>0?s.ea:s.c;for(d=0;d<e.length;d++)f=e[d],b[f]=s[f],!a&&!b[f]&&(b["!"+f]=1)}};s.Pa=function(s){var a,c,e,d,f,w=0,g,k="",j="";if(s&&s.length>255&&(a=""+s,c=a.indexOf("?"),c>0&&(g=a.substring(c+1),a=a.substring(0,c),d=a.toLowerCase(),
e=0,d.substring(0,7)=="http://"?e+=7:d.substring(0,8)=="https://"&&(e+=8),c=d.indexOf("/",e),c>0&&(d=d.substring(e,c),f=a.substring(c),a=a.substring(0,c),d.indexOf("google")>=0?w=",q,ie,start,search_key,word,kw,cd,":d.indexOf("yahoo.co")>=0&&(w=",p,ei,"),w&&g)))){if((s=g.split("&"))&&s.length>1){for(e=0;e<s.length;e++)d=s[e],c=d.indexOf("="),c>0&&w.indexOf(","+d.substring(0,c)+",")>=0?k+=(k?"&":"")+d:j+=(j?"&":"")+d;k&&j?g=k+"&"+j:j=""}c=253-(g.length-j.length)-a.length;s=a+(c>0?f.substring(0,c):
"")+"?"+g}return s};s.S=!1;s.O=!1;s.Da=function(b){s.marketingCloudVisitorID=b;s.O=!0;s.l()};s.P=!1;s.L=!1;s.ya=function(b){s.analyticsVisitorID=b;s.L=!0;s.l()};s.R=!1;s.N=!1;s.Aa=function(b){s.audienceManagerLocationHint=b;s.N=!0;s.l()};s.Q=!1;s.M=!1;s.za=function(b){s.audienceManagerBlob=b;s.M=!0;s.l()};s.isReadyToTrack=function(){var b=!0,a=s.visitor;if(a&&a.isAllowed()){if(!s.S&&!s.marketingCloudVisitorID&&a.getMarketingCloudVisitorID&&(s.S=!0,s.marketingCloudVisitorID=a.getMarketingCloudVisitorID([s,
s.Da]),s.marketingCloudVisitorID))s.O=!0;if(!s.P&&!s.analyticsVisitorID&&a.getAnalyticsVisitorID&&(s.P=!0,s.analyticsVisitorID=a.getAnalyticsVisitorID([s,s.ya]),s.analyticsVisitorID))s.L=!0;if(!s.R&&!s.audienceManagerLocationHint&&a.getAudienceManagerLocationHint&&(s.R=!0,s.audienceManagerLocationHint=a.getAudienceManagerLocationHint([s,s.Aa]),s.audienceManagerLocationHint))s.N=!0;if(!s.Q&&!s.audienceManagerBlob&&a.getAudienceManagerBlob&&(s.Q=!0,s.audienceManagerBlob=a.getAudienceManagerBlob([s,
s.za]),s.audienceManagerBlob))s.M=!0;if(s.S&&!s.O&&!s.marketingCloudVisitorID||s.P&&!s.L&&!s.analyticsVisitorID||s.R&&!s.N&&!s.audienceManagerLocationHint||s.Q&&!s.M&&!s.audienceManagerBlob)b=!1}return b};s.k=k;s.o=0;s.callbackWhenReadyToTrack=function(b,a,c){var e;e={};e.Ja=b;e.Ia=a;e.Ga=c;if(s.k==k)s.k=[];s.k.push(e);if(s.o==0)s.o=setInterval(s.l,100)};s.l=function(){var b;if(s.isReadyToTrack()){if(s.o)clearInterval(s.o),s.o=0;if(s.k!=k)for(;s.k.length>0;)b=s.k.shift(),b.Ia.apply(b.Ja,b.Ga)}};s.Ca=
function(b){var a,c,e=k,d=k;if(!s.isReadyToTrack()){a=[];if(b!=k)for(c in e={},b)e[c]=b[c];d={};s.wa(d,!0);a.push(e);a.push(d);s.callbackWhenReadyToTrack(s,s.track,a);return!0}return!1};s.Ra=function(){var b=s.cookieRead("s_fid"),a="",c="",e;e=8;var d=4;if(!b||b.indexOf("-")<0){for(b=0;b<16;b++)e=Math.floor(Math.random()*e),a+="0123456789ABCDEF".substring(e,e+1),e=Math.floor(Math.random()*d),c+="0123456789ABCDEF".substring(e,e+1),e=d=16;b=a+"-"+c}s.cookieWrite("s_fid",b,1)||(b=0);return b};s.t=s.track=
function(b,a){var c,e=new Date,d="s"+Math.floor(e.getTime()/108E5)%10+Math.floor(Math.random()*1E13),f=e.getYear();f="t="+s.escape(e.getDate()+"/"+e.getMonth()+"/"+(f<1900?f+1900:f)+" "+e.getHours()+":"+e.getMinutes()+":"+e.getSeconds()+" "+e.getDay()+" "+e.getTimezoneOffset());if(!s.supplementalDataID&&s.visitor&&s.visitor.getSupplementalDataID)s.supplementalDataID=s.visitor.getSupplementalDataID("AppMeasurement:"+s._in,s.expectSupplementalData?!1:!0);s.r("_s");if(!s.C("track",arguments)){if(!s.Ca(b)){a&&
s.K(a);b&&(c={},s.wa(c,0),s.K(b));if(s.Xa()){if(!s.analyticsVisitorID&&!s.marketingCloudVisitorID)s.fid=s.Ra();s.bb();s.usePlugins&&s.doPlugins&&s.doPlugins(s);if(s.account){if(!s.abort){if(s.trackOffline&&!s.timestamp)s.timestamp=Math.floor(e.getTime()/1E3);e=w.location;if(!s.pageURL)s.pageURL=e.href?e.href:e;if(!s.referrer&&!s.xa)s.referrer=j.document.referrer,s.xa=1;s.referrer=s.Pa(s.referrer);s.r("_g")}if(s.Ta()&&!s.abort)s.Ua(),f+=s.Sa(),s.ab(d,f),s.r("_t"),s.referrer=""}}b&&s.K(c,1)}s.abort=
s.supplementalDataID=s.timestamp=s.pageURLRest=s.linkObject=s.j=s.linkURL=s.linkName=s.linkType=w.rb=s.pe=s.pev1=s.pev2=s.pev3=s.g=0}};s.tl=s.trackLink=function(b,a,c,e,d){s.linkObject=b;s.linkType=a;s.linkName=c;if(d)s.i=b,s.q=d;return s.track(e)};s.trackLight=function(b,a,c,e){s.lightProfileID=b;s.lightStoreForSeconds=a;s.lightIncrementBy=c;return s.track(e)};s.clearVars=function(){var b,a;for(b=0;b<s.c.length;b++)if(a=s.c[b],a.substring(0,4)=="prop"||a.substring(0,4)=="eVar"||a.substring(0,4)==
"hier"||a.substring(0,4)=="list"||a=="channel"||a=="events"||a=="eventList"||a=="products"||a=="productList"||a=="purchaseID"||a=="transactionID"||a=="state"||a=="zip"||a=="campaign")s[a]=void 0};s.ab=function(b,a){var c,e=s.trackingServer;c="";var d=s.dc,f="sc.",w=s.visitorNamespace;if(e){if(s.trackingServerSecure&&s.ssl)e=s.trackingServerSecure}else{if(!w)w=s.account,e=w.indexOf(","),e>=0&&(w=w.substring(0,e)),w=w.replace(/[^A-Za-z0-9]/g,"");c||(c="2o7.net");d=d?(""+d).toLowerCase():"d1";c=="2o7.net"&&
(d=="d1"?d="112":d=="d2"&&(d="122"),f="");e=w+"."+d+"."+f+c}c=s.ssl?"https://":"http://";d=s.AudienceManagement&&s.AudienceManagement.isReady();c+=e+"/b/ss/"+s.account+"/"+(s.mobile?"5.":"")+(d?"10":"1")+"/JS-"+s.version+(s.ib?"T":"")+"/"+b+"?AQB=1&ndh=1&"+(d?"callback=s_c_il["+s._in+"].AudienceManagement.passData&":"")+a+"&AQE=1";s.Wa&&(c=c.substring(0,2047));s.Na(c);s.W()};s.Na=function(b){s.e||s.Va();s.e.push(b);s.X=s.u();s.va()};s.Va=function(){s.e=s.Ya();if(!s.e)s.e=[]};s.Ya=function(){var b,
a;if(s.ba()){try{(a=w.localStorage.getItem(s.$()))&&(b=w.JSON.parse(a))}catch(c){}return b}};s.ba=function(){var b=!0;if(!s.trackOffline||!s.offlineFilename||!w.localStorage||!w.JSON)b=!1;return b};s.la=function(){var b=0;if(s.e)b=s.e.length;s.z&&b++;return b};s.W=function(){if(!s.z)if(s.ma=k,s.aa)s.X>s.G&&s.ta(s.e),s.da(500);else{var b=s.Ha();if(b>0)s.da(b);else if(b=s.ja())s.z=1,s.$a(b),s.fb(b)}};s.da=function(b){if(!s.ma)b||(b=0),s.ma=setTimeout(s.W,b)};s.Ha=function(){var b;if(!s.trackOffline||
s.offlineThrottleDelay<=0)return 0;b=s.u()-s.ra;if(s.offlineThrottleDelay<b)return 0;return s.offlineThrottleDelay-b};s.ja=function(){if(s.e.length>0)return s.e.shift()};s.$a=function(b){if(s.debugTracking){var a="AppMeasurement Debug: "+b;b=b.split("&");var c;for(c=0;c<b.length;c++)a+="\n\t"+s.unescape(b[c]);s.Za(a)}};s.fb=function(b){var a,c,e;if(!a&&s.d.createElement&&s.AudienceManagement&&s.AudienceManagement.isReady()&&(a=s.d.createElement("SCRIPT"))&&"async"in a)(e=(e=s.d.getElementsByTagName("HEAD"))&&
e[0]?e[0]:s.d.body)?(a.type="text/javascript",a.setAttribute("async","async"),c=3):a=0;if(!a)a=new Image,a.alt="";a.ga=function(){try{if(s.ca)clearTimeout(s.ca),s.ca=0;if(a.timeout)clearTimeout(a.timeout),a.timeout=0}catch(b){}};a.onload=a.hb=function(){a.ga();s.Ma();s.T();s.z=0;s.W()};a.onabort=a.onerror=a.Oa=function(){a.ga();(s.trackOffline||s.aa)&&s.z&&s.e.unshift(s.La);s.z=0;s.X>s.G&&s.ta(s.e);s.T();s.da(500)};a.onreadystatechange=function(){a.readyState==4&&(a.status==200?a.hb():a.Oa())};s.ra=
s.u();if(c==1)a.open("GET",b,!0),a.send();else if(c==2)a.open("GET",b),a.send();else if(a.src=b,c==3){if(s.pa)try{e.removeChild(s.pa)}catch(d){}e.firstChild?e.insertBefore(a,e.firstChild):e.appendChild(a);s.pa=s.Ka}if(a.abort)s.ca=setTimeout(a.abort,5E3);s.La=b;s.Ka=w["s_i_"+s.replace(s.account,",","_")]=a;if(s.useForcedLinkTracking&&s.B||s.q){if(!s.forcedLinkTrackingTimeout)s.forcedLinkTrackingTimeout=250;s.U=setTimeout(s.T,s.forcedLinkTrackingTimeout)}};s.Ma=function(){if(s.ba()&&!(s.qa>s.G))try{w.localStorage.removeItem(s.$()),
s.qa=s.u()}catch(b){}};s.ta=function(b){if(s.ba()){s.va();try{w.localStorage.setItem(s.$(),w.JSON.stringify(b)),s.G=s.u()}catch(a){}}};s.va=function(){if(s.trackOffline){if(!s.offlineLimit||s.offlineLimit<=0)s.offlineLimit=10;for(;s.e.length>s.offlineLimit;)s.ja()}};s.forceOffline=function(){s.aa=!0};s.forceOnline=function(){s.aa=!1};s.$=function(){return s.offlineFilename+"-"+s.visitorNamespace+s.account};s.u=function(){return(new Date).getTime()};s.na=function(s){s=s.toLowerCase();if(s.indexOf("#")!=
0&&s.indexOf("about:")!=0&&s.indexOf("opera:")!=0&&s.indexOf("javascript:")!=0)return!0;return!1};s.setTagContainer=function(b){var a,c,e;s.ib=b;for(a=0;a<s._il.length;a++)if((c=s._il[a])&&c._c=="s_l"&&c.tagContainerName==b){s.K(c);if(c.lmq)for(a=0;a<c.lmq.length;a++)e=c.lmq[a],s.loadModule(e.n);if(c.ml)for(e in c.ml)if(s[e])for(a in b=s[e],e=c.ml[e],e)if(!Object.prototype[a]&&(typeof e[a]!="function"||(""+e[a]).indexOf("s_c_il")<0))b[a]=e[a];if(c.mmq)for(a=0;a<c.mmq.length;a++)e=c.mmq[a],s[e.m]&&
(b=s[e.m],b[e.f]&&typeof b[e.f]=="function"&&(e.a?b[e.f].apply(b,e.a):b[e.f].apply(b)));if(c.tq)for(a=0;a<c.tq.length;a++)s.track(c.tq[a]);c.s=s;break}};s.Util={urlEncode:s.escape,urlDecode:s.unescape,cookieRead:s.cookieRead,cookieWrite:s.cookieWrite,getQueryParam:function(b,a,c){var e;a||(a=s.pageURL?s.pageURL:w.location);c||(c="&");if(b&&a&&(a=""+a,e=a.indexOf("?"),e>=0&&(a=c+a.substring(e+1)+c,e=a.indexOf(c+b+"="),e>=0&&(a=a.substring(e+c.length+b.length+1),e=a.indexOf(c),e>=0&&(a=a.substring(0,
e)),a.length>0))))return s.unescape(a);return""}};s.A=["supplementalDataID","timestamp","dynamicVariablePrefix","visitorID","marketingCloudVisitorID","analyticsVisitorID","audienceManagerLocationHint","fid","vmk","visitorMigrationKey","visitorMigrationServer","visitorMigrationServerSecure","charSet","visitorNamespace","cookieDomainPeriods","fpCookieDomainPeriods","cookieLifetime","pageName","pageURL","referrer","contextData","currencyCode","lightProfileID","lightStoreForSeconds","lightIncrementBy",
"retrieveLightProfiles","deleteLightProfiles","retrieveLightData","pe","pev1","pev2","pev3","pageURLRest"];s.c=s.A.concat(["purchaseID","variableProvider","channel","server","pageType","transactionID","campaign","state","zip","events","events2","products","audienceManagerBlob","tnt"]);s.Y=["timestamp","charSet","visitorNamespace","cookieDomainPeriods","cookieLifetime","contextData","lightProfileID","lightStoreForSeconds","lightIncrementBy"];s.H=s.Y.slice(0);s.ea=["account","allAccounts","debugTracking",
"visitor","trackOffline","offlineLimit","offlineThrottleDelay","offlineFilename","usePlugins","doPlugins","configURL","visitorSampling","visitorSamplingGroup","linkObject","linkURL","linkName","linkType","trackDownloadLinks","trackExternalLinks","trackClickMap","trackInlineStats","linkLeaveQueryString","linkTrackVars","linkTrackEvents","linkDownloadFileTypes","linkExternalFilters","linkInternalFilters","useForcedLinkTracking","forcedLinkTrackingTimeout","trackingServer","trackingServerSecure","ssl",
"abort","mobile","dc","lightTrackVars","maxDelay","expectSupplementalData","AudienceManagement"];for(g=0;g<=75;g++)s.c.push("prop"+g),s.H.push("prop"+g),s.c.push("eVar"+g),s.H.push("eVar"+g),g<6&&s.c.push("hier"+g),g<4&&s.c.push("list"+g);g=["resolution","colorDepth","javascriptVersion","javaEnabled","cookiesEnabled","browserWidth","browserHeight","connectionType","homepage","plugins"];s.c=s.c.concat(g);s.A=s.A.concat(g);s.ssl=w.location.protocol.toLowerCase().indexOf("https")>=0;s.charSet="UTF-8";
s.contextData={};s.offlineThrottleDelay=0;s.offlineFilename="AppMeasurement.offline";s.ra=0;s.X=0;s.G=0;s.qa=0;s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx";s.w=w;s.d=w.document;try{s.Wa=navigator.appName=="Microsoft Internet Explorer"}catch(n){}s.T=function(){if(s.U)w.clearTimeout(s.U),s.U=k;s.i&&s.B&&s.i.dispatchEvent(s.B);if(s.q)if(typeof s.q=="function")s.q();else if(s.i&&s.i.href)s.d.location=s.i.href;s.i=s.B=s.q=0};s.ua=function(){s.b=s.d.body;if(s.b)if(s.p=
function(b){var a,c,e,d,f;if(!(s.d&&s.d.getElementById("cppXYctnr")||b&&b.cb)){if(s.fa)if(s.useForcedLinkTracking)s.b.removeEventListener("click",s.p,!1);else{s.b.removeEventListener("click",s.p,!0);s.fa=s.useForcedLinkTracking=0;return}else s.useForcedLinkTracking=0;s.j=b.srcElement?b.srcElement:b.target;try{if(s.j&&(s.j.tagName||s.j.parentElement||s.j.parentNode))if(e=s.la(),s.track(),e<s.la()&&s.useForcedLinkTracking&&b.target){for(d=b.target;d&&d!=s.b&&d.tagName.toUpperCase()!="A"&&d.tagName.toUpperCase()!=
"AREA";)d=d.parentNode;if(d&&(f=d.href,s.na(f)||(f=0),c=d.target,b.target.dispatchEvent&&f&&(!c||c=="_self"||c=="_top"||c=="_parent"||w.name&&c==w.name))){try{a=s.d.createEvent("MouseEvents")}catch(g){a=new w.MouseEvent}if(a){try{a.initMouseEvent("click",b.bubbles,b.cancelable,b.view,b.detail,b.screenX,b.screenY,b.clientX,b.clientY,b.ctrlKey,b.altKey,b.shiftKey,b.metaKey,b.button,b.relatedTarget)}catch(j){a=0}if(a)a.cb=1,b.stopPropagation(),b.gb&&b.gb(),b.preventDefault(),s.i=b.target,s.B=a}}}}catch(k){}s.j=
0}},s.b&&s.b.attachEvent)s.b.attachEvent("onclick",s.p);else{if(s.b&&s.b.addEventListener){if(navigator&&(navigator.userAgent.indexOf("WebKit")>=0&&s.d.createEvent||navigator.userAgent.indexOf("Firefox/2")>=0&&w.MouseEvent))s.fa=1,s.useForcedLinkTracking=1,s.b.addEventListener("click",s.p,!0);s.b.addEventListener("click",s.p,!1)}}else setTimeout(s.ua,30)};s.ua()}
function s_gi(s){var w,k=window.s_c_il,j,g,o=s.split(","),p,n,b=0;if(k)for(j=0;!b&&j<k.length;){w=k[j];if(w._c=="s_c"&&(w.account||w.oun))if(w.account&&w.account==s)b=1;else{g=w.account?w.account:w.oun;g=w.allAccounts?w.allAccounts:g.split(",");for(p=0;p<o.length;p++)for(n=0;n<g.length;n++)o[p]==g[n]&&(b=1)}j++}b||(w=new AppMeasurement);w.setAccount?w.setAccount(s):w.sa&&w.sa(s);return w}AppMeasurement.getInstance=s_gi;window.s_objectID||(window.s_objectID=0);
function s_pgicq(){var s=window,w=s.s_giq,k,j,g;if(w)for(k=0;k<w.length;k++)j=w[k],g=s_gi(j.oun),g.setAccount(j.un),g.setTagContainer(j.tagContainerName);s.s_giq=0}s_pgicq();
