
(function (t, d) {
    if (AGSERVE.cubby.disabled)
        return;

    var getAttr = function (el, attr1, val, attr2) {
        var t = null, i, e = d.getElementsByTagName(el), l = e.length;
        for (i = 0; i < l; i++) { if (e[i].getAttribute(attr1) === val) { t = e[i].getAttribute(attr2); break; } }
        return t || '';
    };
    var insertAfter = function(refNode, newNode) {
        ;
    };

    var pl = {};
    pl.impressionId = new Date().getTime() + '-' +  Math.random().toString(36).substring(2);
    pl.pageAgCanon = getAttr('meta', 'name', 'ag:canon', 'content');
    pl.pageDocUrl = d.URL;
    pl.pageRelCanon = getAttr('link', 'rel', 'canonical', 'href');
    pl.pageTitle = d.title;
    pl.referer = d.referrer;
    pl.pub = AGSERVE.cubby.pub;
    pl.ref = AGSERVE.cubby.ref;
    var queryString = '?ref=' + pl.ref +
                  '&pub=' + pl.pub +
                  '&impressionId=' + pl.impressionId +
                  '&pageAgCanon=' + encodeURIComponent(pl.pageAgCanon) +
                  '&pageRelCanon=' + encodeURIComponent(pl.pageRelCanon) +
                  '&pageDocUrl=' + encodeURIComponent(pl.pageDocUrl) +
                  '&pageTitle=' + encodeURIComponent(pl.pageTitle) +
                  '&referer=' + encodeURIComponent(pl.referer);

    AGSERVE.cubby.queryString = queryString;
    AGSERVE.cubby.paramList = pl;
    AGSERVE.cubby.masokoServeJsSrc = 'http://studio.adglue.com/adServe/serveJs' + queryString;

    if (AGSERVE.cubby.logOnly) {
        var g = d.createElement('img');
        
        g.src = 'http://ad.studio.adglue.com/silentServe' + queryString;
        
        g.setAttribute('width', '1');
        g.setAttribute('height', '1');
        g.setAttribute('border', '0');
        g.style.display = 'none';
        refNode && refNode.parentNode.insertBefore(newNode, refNode.nextSibling)
        insertAfter(d.getElementById(AGSERVE.cubby.ref), g);
        return;
    }

    
    var serveJsSrc = 'http://ad.studio.adglue.com/serveJs' + queryString;
    

    if(AGSERVE.cubby.synchronous) {
        document.write('<scr' + 'ipt src="' + serveJsSrc + '"></scr' + 'ipt>');
    } else {
        var g = d.createElement(t);
        g.src = serveJsSrc;
        var s = d.getElementsByTagName(t)[0];
        s.parentNode.insertBefore(g, s);
    }
})('script', document);

AGSERVE.execChildScripts = function(body_el) {
    function browserDoesNotRunInsertedScripts() {
        var m = navigator.userAgent.match(/firefox\/?\s*(\d+).(\d+)[.\d]*/i);
        return m==null || m[1]>=5 || (m[1]==1&&m[2]<5);
    }
    function nodeName(elem, name) {
        return elem.nodeName && elem.nodeName.toUpperCase() ===
            name.toUpperCase();
    }
    function queueDescendantScripts(node) {
        if (nodeName(node, "script" ) && (!node.type || node.type.toLowerCase() === "text/javascript")) {
            AGSERVE.scripts.push(node);
            return;
        }
        if(node.childNodes && node.childNodes.length>0) {
            for (var i = 0; node.childNodes[i]; i++) {
                queueDescendantScripts(node.childNodes[i]);
            }
        }
    }

    // main section of function
    if(!browserDoesNotRunInsertedScripts())
        return;//skip if not needed
    queueDescendantScripts(body_el);
    AGSERVE.execNextScriptCallback();
};
AGSERVE.scripts = AGSERVE.scripts || [];
AGSERVE.execNextScriptCallback = function() {
    var sIn = AGSERVE.scripts.shift();
    if(!sIn)
        return;

    var data = (sIn.text || sIn.textContent || sIn.innerHTML || "" );
    if (data.length > 0) {
        data = data + ';\n AGSERVE.execNextScriptCallback();'; //body script callback
    }

    if(AGSERVE.cubby.synchronous) {
        if (data.length > 0) {
            document.write('<scr' + 'ipt>' + data + '</scr' + 'ipt>');
        } else {
            document.write('<scr' + 'ipt src="' + sIn.src + '"></scr' + 'ipt>');
            document.write('<scr' + 'ipt>AGSERVE.execNextScriptCallback;</scr' + 'ipt>');
        }
    } else {
        var sOut = document.createElement("script");
        sOut.type = "text/javascript";
        if (data.length > 0) {
            try {
                sOut.appendChild(document.createTextNode(data));    // doesn't work on ie...
            } catch (e) {
                sOut.text = data; // IE has funky script nodes
            }
        } else {
            sOut.src = sIn.src;
            // most browsers
            sOut.onload = function () {AGSERVE.execNextScriptCallback;};
            // IE 6 & 7
            sOut.onreadystatechange = function () {
                if (this.readyState == 'complete') AGSERVE.execNextScriptCallback();
            }
        }

        //add to head just long enough to queue execution
        var head = document.getElementsByTagName("head")[0] || document.documentElement;
        head.appendChild(sOut);
        head.removeChild(sOut);
    }
};


