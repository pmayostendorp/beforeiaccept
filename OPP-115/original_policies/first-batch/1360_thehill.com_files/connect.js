if (window.NM === undefined) {
    var NM = new Object();

    var widgetLookupUrl =window.location.protocol + "//www.newsmaxfeednetwork.com/CMSPages/NewsMax/NMXChanges/widget.ashx";

    NM.init = function (param) {
        var key = Object.keys(param)[0];
        var val = param[key]
        var widgetData = lookup_widget(key, val)
    };

    window.NM = NM;

    function lookup_widget(key, val) {
        var script = document.createElement('script');
        script.src = widgetLookupUrl + "?" + key + "=" + val + "&callback=load_ados";
        document.getElementsByTagName('head')[0].appendChild(script);
    }

    function load_ados(widgetData) {
        if (widgetData["isBot"].toLowerCase() == "true") {
            console.log("FeedNetwork: this is a bot hit");
            return;
        }

        params = widgetData["UrlParams"];
        paramString = "";
        for (var key in params) {
            if (paramString != "") {
                paramString += "&";
            }
            paramString += key + "=" + window.params[key];
        }
        paramString = "&" + paramString;

        window["widget" + widgetData["WgID"] + "urlparams"] = paramString;
        window["widget" + widgetData["WgID"] + "isDescriptionWidget"] = widgetData["WidgetType"] == "Description";
        window["widget" + widgetData["WgID"] + "linkTarget"] = widgetData["LinkTarget"];
        window["widget" + widgetData["WgID"] + "nofollow"] = widgetData["nofollow"].toLowerCase() == "true";

        var widget = document.getElementById("NmWg" + widgetData["WgID"]);
        if (!widget) {
            widget = document.getElementById("nmWidgetContainer");
        }
        div = document.createElement("div");
        div.id = "azkWidget" + widgetData["WgID"];
        widget.appendChild(div, widget);

        loadScript("//static.adzerk.net/ados.js", function () { make_adzerk_call(widgetData) });
    }

    function make_adzerk_call(widgetData) {
        var ados = ados || {};
        ados.isAsync = true;
        ados.writeInLine = false;

        var networkId = 9650;

        ados_add_placement(networkId, widgetData["SiteID"], "azkWidget" + widgetData["WgID"], 163).setZone(widgetData["WgZoneID"]);

        var linkZone = widgetData["FlZoneIDs"];
        for (var i = 0; i < linkZone.length; i++) {
            ados_add_placement(networkId, widgetData["SiteID"], "azk" + widgetData["WgID"] + (i + 1), 13).setZone(linkZone[i]);
        }
        keywords = widgetData["Keywords"];
        ados_keywords = keywords["PropertyDemo"] + "," + keywords["PropertyKeywords"] + "," + keywords["FeedKeywords"];

        if ((/iphone|ipod|android|ie|blackberry|fennec/).test(navigator.userAgent.toLowerCase())) {
            ados_keywords += ",mobile";
        }

        ados_setKeywords(ados_keywords);
        ados_setDomain('engine.newsmaxfeednetwork.com');
        ados_load();
    }

    function loadScript(url, callback) {
        var head = document.getElementsByTagName("head")[0]; var script = document.createElement("script");
        script.src = url; var done = false; script.onload = script.onreadystatechange = function () { if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) { done = true; callback(); script.onload = script.onreadystatechange = null; head.removeChild(script); } }; head.appendChild(script);
    }

    function insertAfter(newElement, targetElement) {
        var parent = targetElement.parentNode;
        if (parent.lastchild == targetElement) {
            parent.appendChild(newElement);
        } else {
            parent.insertBefore(newElement, targetElement.nextSibling);
        }
    }
    function addDescriptionToLink(element) {
        if (element.getElementsByTagName("a")[0]) {
            link = element.getElementsByTagName("a")[0];
            newlink = document.createElement("a");
            newlink.href = link.href;
            newlink.setAttribute("rel", "nofollow");
            newlink.setAttribute("target", "_top");
            if (element.getElementsByTagName("a")[1]) {
                link2 = element.getElementsByTagName("a")[1];
                newlink.innerHTML = '<p>' + link2.title + '</p>';
                if (newlink.innerHTML != "<p></p>")
                    insertAfter(newlink, link2);
                insertAfter(document.createElement('br'), link2);
            } else {
                newlink.innerHTML = link.title;
                insertAfter(newlink, link);
            }
        } else {
            return setTimeout((function () {
                return addDescriptionToLink(element);
            }), 100);
        }
    }

    function updateLink(element, target, isNofollow) {
        if (element.getElementsByTagName("a")[0]) {
            as = element.getElementsByTagName("a");
            for (i = 0; i < as.length; i++) {
                if (isNofollow) {
                    as[i].rel = "nofollow";
                }
                as[i].target = target;
            }
        } else {
            return setTimeout((function () {
                return updateLink(element, target, isNofollow);
            }), 100);
        }
    }

    function loadWidgetParams(element, params) {
        if (element.getElementsByTagName("a")[0]) {
            link = element.getElementsByTagName("a")[0];
            link.href = link.href + params;
            if(element.getElementsByTagName("a")[1]) {
                link2 = element.getElementsByTagName("a")[1];
                link2.href = link2.href + params
            }
        } else {
            return setTimeout((function() {
                return loadWidgetParams(element, params);
            }), 100);
        }
    }

    if (window.NMClientInit != undefined) {
        window.NMClientInit();
    }
}

var _comscore = _comscore || [];
_comscore.push({ c1: "7", c2: "9248945", c3: "100000" });
(function () {
    var s = document.createElement("script"), el = document.getElementsByTagName("script")[0]; s.async = true;
    s.src = (document.location.protocol == "https:" ? "https://sb" : "http://b") + ".scorecardresearch.com/beacon.js";
    el.parentNode.insertBefore(s, el);
})();