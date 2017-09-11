var fl = 0,
    sessionId = "",
    sessionDuration = 1800000,
    sessionCookieName = "MC0",
    cookieDisabled = 0,
    metaTags = "",
    customTags = "",
    pvInfo = [],
    clickInfo = "",
    qs = "",
    currTimeAsString, imgArray = [],
    imgArrayIndex = 0,
    customInfo = "",
    tz = 420,
    slC = "",
    flC = "",
    cntC = "",
    bsC = "",
    clickedElements = ["A", "IMG", "AREA", "INPUT"];

function MscomCustomEvent() {
    try {
        MscomHandleSession();
        var noAddCot = false;
        var len = arguments.length;
        for (var i = 0; i < len; i = i + 2) {
            var name = arguments[i].toString().toLowerCase();
            if (name.indexOf("ms.") == 0) customInfo += "&" + MscomEncode(name) + "=" + (arguments[i + 1] == undefined ? "" : MscomEncode(arguments[i + 1].toString()))
            if (name == "cot") {
                if (arguments[i + 1] == null || arguments[i + 1] == 'null') noAddCot = true;
                else if (arguments[i + 1] != undefined) {
                    noAddCot = true;
                    customInfo += "&cot=" + MscomEncode(arguments[i + 1].toString());
                }
            }
        }
        if (customInfo != "") MscomBeacon(noAddCot)
    } catch (e) { }
}
function MscomSetPVInfo() {
    pvInfo.push("tz=" + tz / -60);
    if (window.varSegmentation != undefined && varSegmentation == 1) pvInfo.push("&cs=1");
    if (cookieDisabled == 1) pvInfo.push("&cd=1");
    pvInfo.push("&ti=" + MscomEncode(document.title));
    MscomGetSilverLightInfo();
    MscomGetFlahsInfo();
    MscomGetCTypeHpInfo();
    var ref = MscomEncode(document.referrer);
    if (ref != null && ref != "") pvInfo.push("&r=" + ref);
    pvInfo.push("&ts=" + currTimeAsString);
    if (typeof screen == "object") pvInfo.push("&sr=" + screen.width + "x" + screen.height);
    MscomGetBrowserSize()
}
function MscomGetBrowserSize() {
    if (bsC != "") {
        pvInfo.push(bsC);
        return
    }
    if (document.body.clientWidth != undefined) bsC = "&bs=" + document.body.clientWidth + "x" + document.body.clientHeight;
    else if (document.documentElement && document.documentElement.clientWidth != undefined) bsC = "&bs=" + document.documentElement.clientWidth + "x" + document.documentElement.clientHeight;
    else if (window.innerWidth != undefined) bsC = "&bs=" + window.innerWidth + "x" + window.innerHeight;
    if (bsC != "") pvInfo.push(bsC)
}
function MscomGetCTypeHpInfo() {
    if (cntC != "") {
        pvInfo.push(cntC);
        return
    }
    if (document.body && document.body.addBehavior) {
        document.body.addBehavior("#default#clientCaps");
        if (document.body.connectionType) cntC += "&cnt=" + document.body.connectionType;
        document.body.addBehavior("#default#homePage");
        cntC += document.body.isHomePage(location.href) ? "&hp=1" : ""
    }
    if (cntC != "") pvInfo.push(cntC)
}
function MscomGetFlahsInfo() {
    if (flC != "") {
        pvInfo.push(flC);
        return
    }
    var flashMax = (new Date).getYear() - 1992;
    if (navigator.userAgent.indexOf("MSIE") != -1) for (var i = flashMax; i > 0; i--) try {
        var flash = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + i);
        flC += "&fi=1";
        flC += "&fv=" + i + ".0";
        break
    } catch (e) { } else if (navigator.plugins["Shockwave Flash"]) {
        flC += "&fi=1";
        var plugin = navigator.plugins["Shockwave Flash"];
        flC += "&fv=" + plugin.description.split(" ")[2]
    }
    pvInfo.push(flC)
}
function MscomGetSilverLightInfo() {
    if (slC != "") {
        pvInfo.push(slC);
        return
    }
    if (window.Silverlight != undefined) slC += "&se=1";
    try {
        if (navigator.userAgent.indexOf("MSIE") != -1) {
            var sli = new ActiveXObject("AgControl.AgControl");
            if (sli) {
                slC += "&si=1";
                slC += "&sv=" + MscomGetSlvVersion(sli)
            }
        } else if (navigator.plugins["Silverlight Plug-In"]) {
            var plugin = navigator.plugins["Silverlight Plug-In"];
            slC += "&si=1";
            var actualVer = plugin.description;
            if (actualVer && actualVer != undefined) {
                var temp = actualVer.split(".");
                actualVer = temp[0] + "." + temp[1];
                slC += "&sv=" + actualVer
            }
        }
    } catch (e) { }
    pvInfo.push(slC)
}
function MscomGetSlvVersion(control) {
    var slv = "",
        slVMax = (new Date).getYear() - 2004;
    for (var i = slVMax; i > 0; i--) for (var j = 9; j >= 0; j--) {
        slv = i + "." + j;
        if (control.IsVersionSupported(slv)) return slv
    }
    return slv
}
function MscomHandleSession() {
    var currDate = new Date;
    tz = currDate.getTimezoneOffset();
    var currTime = currDate.getTime();
    currTimeAsString = currTime.toString();
    var cookiePre = "",
        index = document.cookie.indexOf(sessionCookieName + "=");
    if (index == -1) {
        sessionId = currTimeAsString;
        if (cookieDisabled == 1) return;
        cookiePre = sessionCookieName + "=" + sessionId
    } else {
        var start = index + sessionCookieName.length + 1,
            end = document.cookie.length;
        cookiePre = sessionCookieName + "=" + document.cookie.substring(start, end)
    }
    document.cookie = cookiePre;
    index = document.cookie.indexOf(sessionCookieName + "=");
    if (index == -1) cookieDisabled = 1
}
function Mscomdebug() {
    alert(arguments[0])
}
function MscomProcessClick(event) {
    try {
        MscomHandleSession();
        var evt = event || window.event,
            e;
        if (evt) {
            e = evt.srcElement || evt.target;
            while (e.tagName && MscomIsInList(e.tagName) == false) e = e.parentElement || e.parentNode
        }
        if (e && e.tagName) {
            switch (e.tagName) {
                case "A":
                    var title;
                    if (document.all) title = e.innerText || e.innerHTML;
                    else title = e.text || e.innerHTML;
                    clickInfo = "&cot=1&cn=" + MscomEncode(title) + "&cid=" + MscomGetId(e) + "&ct=" + (e.href ? MscomEncode(e.href) : "");
                    customTags = MscomReadAllTags(e);
                    break;
                case "IMG":
                    clickInfo = "&cot=2&cn=" + (e.alt ? MscomEncode(e.alt) : "") + "&cid=" + MscomGetId(e) + "&ct=" + MscomGetImageHREF(e);
                    customTags = MscomReadAllTags(e);
                    break;
                case "AREA":
                    clickInfo = "&cot=3&cn=" + (e.alt ? MscomEncode(e.alt) : "") + "&cid=" + MscomGetId(e) + "&ct=" + (e.href ? MscomEncode(e.href) : "");
                    customTags = MscomReadAllTags(e);
                    break;
                case "INPUT":
                    var type = e.type || "",
                    ctx = "";
                    if (type && (type == "button" || type == "reset" || type == "submit" || type == "image") || type == "text" && (evt.which || evt.keyCode) == 13) {
                        var t = e.value || e.name || e.alt || e.id;
                        clickInfo = "&cot=4&cn=" + (t ? MscomEncode(t) : "") + "&cid=" + MscomGetId(e) + "&ct=";
                        if (e.form) {
                            clickInfo += MscomEncode(e.form.action) || MscomEncode(window.location.pathname);
                            var elems = e.form.elements,
                            n = 1;
                            for (var i = 0; i < elems.length; i++) {
                                var etype = elems[i].type;
                                if (etype == "text") {
                                    ctx += "&t" + n + "=" + MscomEncode(elems[i].name || elems[i].id) + "&v" + n + "=" + MscomEncode(elems[i].value);
                                    n++
                                }
                            }
                        } else clickInfo += MscomEncode(window.location.pathname);
                        if (ctx != "") clickInfo += ctx;
                        customTags = MscomReadAllTags(e)
                    }
                    break;
                default:
                    clickInfo = ""
            }
            if (clickInfo != "") MscomBeacon(true)
        }
    } catch (e) { }
}
function MscomBeacon(noAddCot) {
    try {
        var src = [];
        src.push(window.location.protocol + "//c.microsoft.com/trans_pixel.aspx?");
        pvInfo.length = 0;
        MscomSetPVInfo();
        src.push(pvInfo.join(""));
        if (clickInfo != "") src.push(clickInfo);
        MscomInitMeta();
        if (metaTags != "") src.push(metaTags);
        if (customTags != "") src.push(customTags);
        if (customInfo != "") {
            if (noAddCot != true) {
                //alert('adding cot = 5');
                src.push("&cot=5");
            }
            src.push(customInfo)
        }
        var srcString = src.join("");
        if (srcString.length > 2048) srcString = srcString.substring(0, 2042) + "&tr=1";
        if (document.images) {
            imgArray[imgArrayIndex] = new Image;
            imgArray[imgArrayIndex].src = srcString;
            imgArrayIndex++
        } else document.write('<IMG ALT="" BORDER="0" NAME="bImg" WIDTH="1" HEIGHT="1" SRC="' + srcString + '"/>');
        clickInfo = "";
        customInfo = ""
    } catch (e) { }
}
function MscomGetId(obj) {
    if (obj) {
        if (obj.id == undefined) return "";
        return MscomEncode(obj.id)
    }
    return ""
}
function MscomGetImageHREF(obj) {
    var temp = obj;
    if (obj) {
        obj = obj.parentElement || obj.parentNode;
        if (obj && obj.tagName == "A") return obj.href ? MscomEncode(obj.href) : "";
        if (temp && temp.src) return MscomEncode(temp.src)
    }
    return ""
}
function MscomReadAllTags(obj) {
    var allTags = [];
    while (obj && obj != "undefined") {
        allTags.push(MscomReadElementTags(obj));
        obj = obj.parentElement || obj.parentNode
    }
    return allTags.join("")
}
function MscomReadElementTags(obj) {
    var result = "";
    if (obj) for (var attr in obj.attributes) if (attr != undefined) if (obj.attributes[attr] != null && obj.attributes[attr] != undefined) {
        var nn = obj.attributes[attr].name;
        if (nn != null && nn != undefined) {
            var nnl = nn.toLowerCase();
            if (nnl.indexOf("ms.") == 0) result += "&" + MscomEncode(nn) + "=" + MscomEncode(obj.attributes[attr].value)
        }
    }
    return result
}
function MscomIsInList(tag) {
    for (var t in clickedElements) if (clickedElements[t] == tag.toUpperCase()) return true;
    return false
}
function MscomsetEvents() {
    if (window.varClickTracking != undefined && varClickTracking == 1) {
        var event = navigator.appVersion.indexOf("MSIE") != -1 ? "onclick" : "mousedown";
        if (document.body) if (document.body.addEventListener) document.body.addEventListener(event, window["MscomProcessClick"], false);
        else if (document.body.attachEvent) document.body.attachEvent(event, window["MscomProcessClick"])
    }
}
function MscomInitMeta() {
    var metaelems;
    if (document.all) metaelems = document.all.tags("meta");
    else if (document.documentElement) metaelems = document.getElementsByTagName("meta");
    metaTags = "";
    if (typeof metaelems != "undefined") for (var i = 0; i < metaelems.length; i++) {
        var meta = metaelems.item(i);
        if (meta.name) {
            var mt = meta.name.toLowerCase();
            if (mt.indexOf("ms.") == 0) metaTags += "&" + MscomEncode(meta.name) + "=" + MscomEncode(meta.content)
        }
    }
}
function MscomInit() {
    try {
        MscomHandleSession();
        MscomsetEvents();
        MscomGetMUID();
        if (fl == 0 && window.varLoadTracking == 1) MscomBeacon(true)
    } catch (e) { }
}
function MscomGetMUID() {
    if (window.varCustomerTracking != undefined && varCustomerTracking == 1) try {
        var muidsrc = window.location.protocol + "//c1.microsoft.com/c.gif?DI=4050&did=1&t=";
        var onload = (window.varLoadTracking != 1) ? '' : ' onload="javascript:MscomBeacon(true);"';
        document.write('<iframe id="_msnFrame" src="' + muidsrc + '" style="z-index:-1;height:1px;width:1px;display:none;visibility:hidden;"' + onload + '></iframe>');
        fl = 1
    } catch (e) {
        fl = 0
    }
}
function MscomEncode(S) {
    return typeof encodeURIComponent == "function" ? encodeURIComponent(S) : escape(S)
}
MscomInit();