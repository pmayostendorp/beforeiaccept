(function () {
    var _dmCookieName = "dm_i";
    var _dmMarkers = new Array();
    var _dmDomain = "";

    function _dmAreValidIds(cookie) {
        var regex = new RegExp("[A-Za-z0-9]+,[A-Za-z0-9]+,[A-Za-z0-9]+,[A-Za-z0-9]+,[0|1]");
        return regex.test(unescape(cookie));
    }

    function _dmCallHandler() {
        var currentUrl = _dmGetCurrentUrl();
        var url = ((currentUrl.indexOf("https://") != -1) ? "https" : "http") + "://t.trackedlink.net/PageTrack.ashx";
        var cookie = _dmGetIds();
        if (cookie == "" || !_dmAreValidIds(cookie))
            return;
        cookie = escape(cookie);
        var qs = new Array();
        qs.push("url=" + escape(currentUrl));
        qs.push("title=" + escape(document.title));
        qs.push(_dmCookieName + "=" + cookie);
        for (var i = 0; i < _dmMarkers.length; i++)
            qs.push((_dmMarkers[i].override ? "dm_over_" : "dm_write_") + escape(_dmMarkers[i].name) + "=" + escape(_dmMarkers[i].value));
        url += "?" + qs.join("&");

        var img = new Image(1, 1);
        img.src = url;
        img.onload = function () { return; };
    }

    function _dmGetIds() {
        var start = window.location.search.indexOf(_dmCookieName, 0);
        var ids = window.location.search;
        ids = start != -1 ? ids.substring(start) : "";
        start = ids.indexOf('&', 0);
        if (start != -1)
            ids = ids.substring(0, start);
        ids = ids.substring((_dmCookieName + "=").length);
        if (ids != "") {
            _dmSetCookie(ids);
            return ids;
        }
        if (document.cookie.length > 0) {
            var c_start = document.cookie.indexOf(_dmCookieName + "=");
            if (c_start != -1) {
                var c_start = c_start + _dmCookieName.length + 1;
                var c_end = document.cookie.indexOf(";", c_start);
                if (c_end == -1)
                    c_end = document.cookie.length;
                ids = unescape(document.cookie.substring(c_start, c_end));
            }
        }
        return ids;
    }

    function _dmGetCurrentUrl() {
        var url = window.location.href;
        var queryString = window.location.search;
        if (queryString != "") {
            url = url.substring(0, url.indexOf("?") + 1);
            queryString = queryString.substring(1);
            var urlParts = queryString.split("&");
            var nonDmParts = new Array();
            for (var i = 0; i < urlParts.length; i++) {
                if (urlParts[i].indexOf(_dmCookieName) == -1)
                    nonDmParts.push(urlParts[i]);
            }
            if (nonDmParts.length == 0)
                url = url.substring(0, url.indexOf("?"));
            url += nonDmParts.join("&");
        }
        return url;
    }

    function _dmSend() { return; }

    function _dmSetCookie(value) {
        var date = new Date();
        date.setTime(date.getTime() + (1 * 60 * 60 * 1000));
        document.cookie = _dmCookieName + "=" + escape(value) + ";expires=" + date.toString() + ";path=/;" +
            ((_dmDomain) ? "domain=" + _dmDomain + ";" : "");
    }

    function _dmSetDomain(newDomain) { _dmDomain = newDomain; }

    function _dmTrack(name, value) {
        if (!name || !value)
            return;
        if (name.length > 255)
            name = name.substring(0, 255);
        var override = arguments.length > 2 && typeof (arguments[2]) == "boolean" ? arguments[2] : false;
        _dmMarkers.push({ name: name, value: value, override: override });
    }
    window._dmTrack = _dmTrack;
    window._dmSetDomain = _dmSetDomain;
    window._dmSend = _dmSend;
    window.addEventListener ? window.addEventListener('load', _dmCallHandler, false) : window.attachEvent('onload', _dmCallHandler);
})();