(function () {
    _(
        {"status":{"code":"OK"},"id":"556e1e95e4b0bb3396c20328","bid":{"id":"54414121e4b01b6ec151ea78","videos":[{"videoId":"5480cc2ae4b0b3a73ef8d03c","name":"YHMG Content Video - 21 seconds","videoUrls":["http://cdn.vidible.tv/prod/2014-12/04/5480cc2ae4b0b3a73ef8d03c_300x168_v1.mp4","http://cdn.vidible.tv/prod/2014-12/04/5480cc2ae4b0b3a73ef8d03c_300x168_v1.ogg"],"thumbnail":"http://cdn.vidible.tv/prod/2014-12/04/5480cc2ae4b0b3a73ef8d03c_60x60_A_v1.png","fullsizeThumbnail":"http://cdn.vidible.tv/prod/2014-12/04/5480cc2ae4b0b3a73ef8d03c_300x168_A_v1.png","subtitles":[],"captions":{},"metadata":{"duration":21800,"commonRating":{"value":"G","descriptors":[],"minAge":0}},"videoSourceType":"FILE"}]},"playerTemplate":{"initialization":"autoplay","sound":"muted","initialVolume":1.0,"videosToPlay":1000,"videosToRequest":1,"shuffleVideos":false,"prerollFrequency":0,"backgroundSkinLocation":{"x":0,"y":0,"w":0,"h":0},"controlsSkin":"http://cdn.vidible.tv/prod/player/swf/latest/Controls16_2.swf","controlsSkinLocation":{"x":0,"y":213,"w":300,"h":0},"videoLocation":{"x":0,"y":0,"w":300,"h":250},"afterVideosUI":"next","scrubBarSkin":"http://cdn.vidible.tv/prod/2013-03/10/511e8160e4b0bf40bd0340a7_v2.swf","coveringsSkin":"http://cdn.vidible.tv/prod/player/swf/latest/Coverings.swf","coveringsSkinLocation":{"x":0,"y":0,"w":300,"h":250},"surroundSkinLocation":{"x":0,"y":0,"w":0,"h":0},"playerWidth":300,"playerHeight":250,"controlsAutoPosition":true,"controlsChromeless":true,"controlsBackgroundAlpha":"1.0","backgroundFill":true,"backgroundColor":0,"surround3DBevelShadowColor":16777215,"surround3DBevelHighlightColor":16777215,"surroundInnerRadius":0,"surroundCornerRadius":0,"surroundHole":false,"surround3D":false,"surround3DBevelSize":0,"surround3DBevelStrength":0.0,"publisherPayout":"None","publisherAmount":0.0,"metaData":{},"showLogo":false,"HLSExtra":"http://cdn.vidible.tv/prod/player/swf/latest/hls-plugin.swf","IMAExtra":"http://cdn.vidible.tv/prod/player/swf/latest/ima-ad-module.swf","YuMeExtra":"http://cdn.vidible.tv/prod/player/swf/latest/yume-ad-module.swf","FreeWheelExtra":"http://cdn.vidible.tv/prod/player/swf/latest/free-wheel-module.swf","VASTExtra":"http://cdn.vidible.tv/prod/player/swf/latest/vast-ad-engine.swf","PlayerAdSystem":"http://cdn.vidible.tv/prod/player/swf/latest/vidible-ad-server.swf","UIExtra":"http://cdn.vidible.tv/prod/player/swf/latest/controls-sticky.swf","AgeGateExtra":"http://cdn.vidible.tv/prod/player/swf/latest/age-gate.swf","SubtitlesExtra":"http://cdn.vidible.tv/prod/player/swf/latest/subtitles.swf"},"adSettings":{"podSize":3,"prerollInterleave":1,"maxAdsCount":10000000,"softTimeout":0.4,"hardTimeout":3.2,"startTimeout":19.200000000000003,"domainOptimisation":true,"companions":[],"aeg":[],"asids":["556e1e2ae4b0b26c1571b269"]},"playerWidget":{"playerType":"SMART","url":"http://cdn.vidible.tv/prod/player/swf/latest/player-vast.swf","adOnly":false},"geo":{"country":"usa","region":"pa","zipCode":"15237","areaCode":"412","connSpeed":"broadband"}}
    );
    function _(json) {
                    /*
     Developed by Robert Nyman, http://www.robertnyman.com
     Code/licensing: http://code.google.com/p/getelementsbyclassname/
     */
            var getElementsByClassName = function (className, tag, elm) {
                if (document.getElementsByClassName) {
                    getElementsByClassName = function (className, tag, elm) {
                        elm = elm || document;
                        var elements = elm.getElementsByClassName(className),
                            nodeName = (tag) ? new RegExp("\\b" + tag + "\\b", "i") : null,
                            returnElements = [],
                            current;
                        for (var i = 0, il = elements.length; i < il; i += 1) {
                            current = elements[i];
                            if (!nodeName || nodeName.test(current.nodeName)) {
                                returnElements.push(current);
                            }
                        }
                        return returnElements;
                    };
                }
                else if (document.evaluate) {
                    getElementsByClassName = function (className, tag, elm) {
                        tag = tag || "*";
                        elm = elm || document;
                        var classes = className.split(" "),
                            classesToCheck = "",
                            xhtmlNamespace = "http://www.w3.org/1999/xhtml",
                            namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace) ? xhtmlNamespace : null,
                            returnElements = [],
                            elements,
                            node;
                        for (var j = 0, jl = classes.length; j < jl; j += 1) {
                            classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
                        }
                        try {
                            elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
                        }
                        catch (e) {
                            elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
                        }
                        while ((node = elements.iterateNext())) {
                            returnElements.push(node);
                        }
                        return returnElements;
                    };
                }
                else {
                    getElementsByClassName = function (className, tag, elm) {
                        tag = tag || "*";
                        elm = elm || document;
                        var classes = className.split(" "),
                            classesToCheck = [],
                            elements = (tag === "*" && elm.all) ? elm.all : elm.getElementsByTagName(tag),
                            current,
                            returnElements = [],
                            match;
                        for (var k = 0, kl = classes.length; k < kl; k += 1) {
                            classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
                        }
                        for (var l = 0, ll = elements.length; l < ll; l += 1) {
                            current = elements[l];
                            match = false;
                            for (var m = 0, ml = classesToCheck.length; m < ml; m += 1) {
                                match = classesToCheck[m].test(current.className);
                                if (!match) {
                                    break;
                                }
                            }
                            if (match) {
                                returnElements.push(current);
                            }
                        }
                        return returnElements;
                    };
                }
                return getElementsByClassName(className, tag, elm);
            };
            var cl = "vdb_556e1e95e4b0bb3396c20328543ebab7e4b034e6a26bba99";
            var c = getElementsByClassName(cl, null, document.body)[0];
            c.className = c.className.replace(new RegExp("(\\s*)" + cl + "\\s*", "g"), "$1");
                var p = c.getAttribute("vdb_params") || "";
        var cb = /(?:[\?&]|^)m\.cb=(.*?)(&m\..*?=|$)/g.exec(p);
        cb = cb && cb[1] || Math.random();
        var ur = /(?:[\?&]|^)m\.url=(.*?)(&m\..*?=|$)/g.exec(p);
        ur = ur && ur[1];
        function ee(pn, v, dv) {
            var ve = dv && dv(v) || v;
            if (ve == v) {
                try {
                    ve = decodeURIComponent(v);
                    ve = encodeURIComponent(ve);
                } catch (e) {
                    ve = encodeURIComponent(v);
                }
            }
            p = p.replace("m." + pn + "=" + v, "m." + pn + "=" + ve);
            v = ve;
            return v;
        }

        ee("url", ur);
        p += p && "&";
        var ifr = window != top;
        var r = encodeURIComponent(ifr ? document.referrer : location.href);
        var i = document.createElement("img");
        var it = new Date().getTime();
                    var si = c.getElementsByTagName('img');
            var srcSubstr = 'http://trk.vidible.tv/trk/impression.gif';
            var isImpressionExist = false;
            for (var ik = 0; ik < si.length; ik++) {
                if (si[ik].src.indexOf(srcSubstr) !== -1) {
                    isImpressionExist = true;
                    break;
                }
            }
            if (!isImpressionExist) {
                i.src = "http://trk.vidible.tv/trk/impression.gif?pid=556e1e95e4b0bb3396c20328&bcid=543ebab7e4b034e6a26bba99&" + p + "ifr=" + ifr + "&cb=" + cb + "&r=" + r + "&recover=true";
                i = document.createElement("img");
                var et = encodeURIComponent('player error');
                var st = encodeURIComponent('workflow error');
                var dt = encodeURIComponent('Static impression was removed');
                i.src = "http://trk.vidible.tv/trk/error.gif?pid=556e1e95e4b0bb3396c20328&bcid=543ebab7e4b034e6a26bba99&" + p + "ifr=" + ifr + "&cb=" + cb + "&r=" + r + "&et=" + et + "&st=" + st + "&dt=" + dt;
                i = document.createElement("img");
            }
                i.src = "http://trk.vidible.tv/trk/js-loaded.gif?pid=556e1e95e4b0bb3396c20328&bcid=543ebab7e4b034e6a26bba99&" + p + "ifr=" + ifr + "&cb=" + cb + "&r=" + r;
        var s = document.createElement("script");
        s.type = "text/javascript";
                    s.src = "http://cdn.vidible.tv/prod/js/vidible-min.js?pid=556e1e95e4b0bb3396c20328&bcid=543ebab7e4b034e6a26bba99&" + p + "ifr=" + ifr + "&cb=" + cb + "&r=" + r;
                s.onload = function () {
                            var pl = vidible.createPlayer({apid: "", pid: "556e1e95e4b0bb3396c20328", bcid: "543ebab7e4b034e6a26bba99", params: p, content: c, it: it, site: r}, json, {"cdn":"http://cdn.vidible.tv/prod/","trk":"http://trk.vidible.tv/trk/","ds":"http://delivery.vidible.tv/","ads":"http://ads.vidible.tv/","adt":"http://ads-trk.vidible.tv/","ptv":"http://portal.vidible.tv/"});
                        var i = document.createElement("img");
            i.src = "http://trk.vidible.tv/trk/js-started.gif?pid=556e1e95e4b0bb3396c20328&bcid=543ebab7e4b034e6a26bba99&" + p + "ifr=" + ifr + "&cb=" + cb + "&r=" + r;
            var clb =  window['vidibleInitialize'];
            if (clb) {
                clb(pl);
            }
            s.onload = s.onreadystatechanged = function () {
            };
        };
        s.onreadystatechange = function () {
            if (s.readyState == 'complete' || s.readyState == 'loaded') {
                s.onload();
            }
        };
        c.appendChild(s);
    }
})();
