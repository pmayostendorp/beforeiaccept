var pm_ppy="meredith-network";var pm_geo="US";



var _pmep = '//widget.perfectmarket.com/';
var _pmep_geo = '//geo.perfectmarket.com/';
if (document.URL.indexOf('https://') > -1) {
    _pmep = _pmep.replace(/88\//gi, '90/');
    _pmep_geo = _pmep_geo.replace(/88\//gi, '90/');
}
var _pmpmk = 'meredith-network/pmk-201526003.25.js';
var _pmasync = true;
var _pmoptimization = true;
var _pmoptimizationmanipulation = true;
var _pmoptimizationmanipulationmode = 'hide,insert';
var _pmoptimizationpersonalizationdomains = ' ';
var _pmoptimizationinsertdomains = ' ';
var _pmsb = false;
function _pmloadfile(fileName) {
        
          var js,elements = document.getElementsByTagName("head")[0];
          js = document.createElement("script");
          js.setAttribute("type","text/javascript");
          js.setAttribute("src", fileName);
          elements.appendChild(js);
}

var bbVer = getBBVersion();
if (bbVer == null || parseInt(bbVer) > 5) {

var pmk,pmglb,pmfa,pmad,pmdebug_c;pmglb=pmglb||null;pmfa=pmfa||null;pmad=pmad||null;pmdebug_c=pmdebug_c||null;pmk=pmk||null;
var _pmenv = getUrlParameter('pmenv');
if(_pmenv && _pmenv == 'sandbox' && !_pmsb) {_pmep=_pmep.replace('//widget.perfectmarket.com', '//widget.sandbox.perfectmarket.com');_pmep_geo=_pmep_geo.replace('//geo.perfectmarket.com', '//geo.sandbox.perfectmarket.com');var d = new Date();var rand = d.getTime();_pmpmk=pm_ppy+"/load.js?"+rand;}

(function(){
  var sc='script',doc=document;
  _pmloadfile(_pmep+_pmpmk);
})();

function pmws_request_done(){
  var sc="script",doc=document;
  if (doc.all && !window.opera){doc.write('<'+sc+' type="text/javascript" id="pm_contentloadtag" defer="defer" src="javascript:void(0)"><\/'+sc+'>');var pm_contentloadtag = doc.getElementById("pm_contentloadtag");if(pm_contentloadtag)pm_contentloadtag.onreadystatechange = function() { if (this.readyState=="complete") return; } }
  _pmloadfile(_pmep+_pmpmk);
}
}
function getBBVersion() {
    var ua = navigator.userAgent,ver=null,vp,splitUA;
    if (ua.indexOf("BlackBerry") >= 0) {if (ua.indexOf("Version/") >= 0) {vp = ua.indexOf("Version/") + 8;ver = ua.substring(vp, vp + 3);}else {splitUA = ua.split("/"); ver = splitUA[1].substring(0, 3);}}
    return ver;
}
function getUrlParameter(name) {var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);return match && decodeURIComponent(match[1].replace(/\+/g, ' '));}


 /** CJS **/ var _pm_mcm = {"ts":1435364968,"modules":{"stp":{"v":"ds_SC-SRef-RDS-B~pg_meredithnetwork~ts_1435364968","d":{"k":["SC","SRef","RDS","B"],"fbk":true},"s":0.0,"b":{"US,DI":0.99788,"US,DS":0.99973,"US,SE,D,N":0.99992,"O,SO,D,N":1.0,"US,DS,D":0.99997,"UK":0.99975,"US,O,D,N":0.89636,"US,O,P":0.94111,"US,DI,S,Y":0.99995,"CA,SO,D,N":0.99997,"US":0.9993,"US,SE,D":0.99988,"US,DI,T":0.97839,"CA,SO":1.0,"US,DI,S":0.99997,"US,DI,P":0.99931,"US,SO,T,N":0.99978,"US,O,D":0.8728,"US,DI,M":0.99974,"US,SO,P,N":0.93401,"_def_":0.99824,"US,SO,D,Y":1.0,"US,DI,D":0.99785,"US,SE,D,Y":0.99977,"US,SE,P,N":0.99984,"US,SO,D,N":0.99999,"US,SE,T,N":0.99997,"US,SA,S,N":0.99809,"CA,SO,D":1.0,"US,SA":0.86425,"O":0.30597,"O,SO,D":1.0,"US,DI,P,Y":0.99956,"US,DI,T,Y":0.94974,"US,DS,T,N":0.99988,"CA":0.86,"US,DS,P,N":0.9989,"US,DS,P":0.9993,"US,SA,T":0.97815,"US,SE,P":0.99987,"US,SO,D":1.0,"US,SA,S":0.99821,"US,DS,T":0.99988,"US,SA,P":0.85582,"US,O":0.86867,"US,SE,M":1.0,"US,SO,P":0.92226,"US,O,D,Y":0.84197,"O,SE":0.9186,"US,O,P,N":0.92494,"US,DS,D,N":0.99996,"US,SO,M":0.99994,"US,SE,T":0.99997,"US,SO,M,N":0.99994,"US,SE,M,N":1.0,"US,SO,T":0.99977,"US,SE":0.99988,"US,SA,P,N":0.54788,"US,DI,D,Y":0.99313,"US,SA,P,Y":0.99974,"O,SO":0.99997,"US,SA,T,N":0.96914,"US,SO":0.99793},"r":{"0":1.0,"1":1.0,"2":1.0,"3":1.0,"4":0.99999,"5":0.99999,"6":0.99999,"7":0.99998,"8":0.99998,"9":0.99998,"10":0.99997,"11":0.99997,"12":0.99996,"13":0.99995,"14":0.99995,"15":0.99994,"16":0.99993,"17":0.99992,"18":0.9999,"19":0.99989,"20":0.99987,"21":0.99985,"22":0.99983,"23":0.9998,"24":0.99977,"25":0.99974,"26":0.9997,"27":0.99965,"28":0.9996,"29":0.99955,"30":0.99948,"31":0.99941,"32":0.99932,"33":0.99922,"34":0.99911,"35":0.99898,"36":0.99884,"37":0.99867,"38":0.99848,"39":0.99827,"40":0.99802,"41":0.99774,"42":0.99742,"43":0.99706,"44":0.99664,"45":0.99617,"46":0.99563,"47":0.99501,"48":0.99431,"49":0.99351,"50":0.9926,"51":0.99156,"52":0.99038,"53":0.98903,"54":0.9875,"55":0.98576,"56":0.98379,"57":0.98155,"58":0.979,"59":0.97612,"60":0.97285,"61":0.96916,"62":0.96498,"63":0.96027,"64":0.95496,"65":0.94899,"66":0.94229,"67":0.93479,"68":0.92641,"69":0.91708,"70":0.90671,"71":0.89523,"72":0.88258,"73":0.86869,"74":0.85351,"75":0.83701,"76":0.81915,"77":0.79996,"78":0.77945,"79":0.7577,"80":0.73477,"81":0.71081,"82":0.68595,"83":0.66037,"84":0.63428,"85":0.60789,"86":0.58143,"87":0.55514,"88":0.52923,"89":0.50392,"90":0.4794,"91":0.45584,"92":0.43338,"93":0.41211,"94":0.39213,"95":0.37348,"96":0.35617,"97":0.3402,"98":0.32555,"99":0.31217,"100":0.3},"u":{"h":0.006777,"m":0.002824}}}};

var _pm_mcg = {
    "modules": {
        "stp": {
            "d": {
            "hP":"A",
            "hN":"A",
            "mP":"N",
            "mN":"N",
            "lP":"N",
            "lN":"N"
            },
        "c": {
            "h":"20",
            "m":"75"
            },
        "s":0.20,
        "a":0.0
    }
}
}; /** CJS end **/ 
