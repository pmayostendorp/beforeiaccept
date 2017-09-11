function DesktopAjax() {}

/**** Request functions below ****/
function makeActionRequest(actionUrl, finalUrl, finalData, finalHandler) {
  function makeCookieRequest(url, handler) {
    var now = new Date();
    var cookieName = DynamicContent.pCOOKIE_PARAM + now.getTime();
    // 10 minutes
    now.setTime(now.getTime() + (10*60*1000));
    setCookie(cookieName, data, now, null);
    try {
      makeGetRequest(setParam(url, DynamicContent.pCOOKIE_PARAM, cookieName), handler);
    } finally {
    }
  }
  var data = finalData;
  function actionHandler(newDoc) {
    makeCookieRequest(finalUrl, finalHandler);
  }
  if (actionUrl) {
    makeCookieRequest(actionUrl, actionHandler);
  } else {
      actionHandler(null);
  }

}

function removeParam(url, paramName) {
  var s = url.indexOf(paramName + '=');
  if (s < 0) return url;
  var e = url.indexOf('&', s);
  e++;
  if (e == 0) {
    e = url.length;
  }
  url = url.substring(0, s) + url.substring(e, url.length);
  if (url.length > 1) {
    var lastChar = url.charAt(url.length-1);
    if (lastChar == '?' || lastChar == '&') {
      url = url.substring(0, url.length-1);
    }
  }
  return url;
}

function setParam(url, paramName, paramValue) {

  url = removeParam(url, paramName);
  if (url.indexOf('?') > -1){
        url = url + "&" + paramName + "=" + paramValue;
    } else {
        url = url + "?" + paramName + "=" + paramValue;
    }
  return url;
}

function makeGetRequest(url, handler) {
    makeRequest(url, handler, null, null);
}

function makeRequest(url, handler, payloadNames, payloadValues) {
    function getRequestObject() {
        var req = null;
        // branch for native XMLHttpRequest object
        if(window.XMLHttpRequest) {
            try {
                req = new XMLHttpRequest();
            } catch(e) {
                req = false;
            }
        // branch for IE/Windows ActiveX version
        } else if(window.ActiveXObject) {
            try {
                req = new ActiveXObject("Msxml2.XMLHTTP");
            } catch(e) {
                try {
                    req = new ActiveXObject("Microsoft.XMLHTTP");
                } catch(e) {
                    req = false;
                }
            }
        }
        return req;
    }

    function parseHtml(responseHtml) {
        var uniqueId = 'parserFrame' + new Date().getTime();
        var divUniqueId = "div"+uniqueId;
        var b = document.getElementsByTagName('body')[0];
        var divElem = document.createElement('div');
        if(!Sfdc.userAgent.isSafari){
            divElem.style.display = 'none';
        }
        divElem.id = divUniqueId;
        b.appendChild(divElem);
        // Safari ignores iframes with display:none also there is delay
        // in Safari initializing document object of Iframe if createElement method is used
        // thus we use innerHTML for iframe writing
        if(isSafari){
            divElem.innerHTML = '<iframe src="javascript:false" style="height:1px;width:1px" id="' + uniqueId + '" name="' + uniqueId + '"></iframe>';
        }else{
            divElem.innerHTML = '<iframe src="javascript:false" style="display:none;" id="' + uniqueId + '" name="' + uniqueId + '"></iframe>';
        }
        var newF = document.getElementById(uniqueId);
        var newDocument = null;
        try {
            var responseLowered = responseHtml.toLowerCase();
            var start = responseLowered.indexOf('<table');
            var end = responseLowered.length;
            var newXml = responseHtml.substring(start, end);
            // handle diffrent ways that browsers acces iframe
            newDocument = (newF.contentWindow || newF.contentDocument);
            if (newDocument.document) {
                newDocument = newDocument.document;
            }

            // in IE the body DOM element doesn't exist till we create it...
            newDocument.open();
            newDocument.write("<html><body></body></html>");
            newDocument.close();
            // inserting the content into the iFrame this way (vs document.write) gets around a Mozilla bug
            newDocument.body.innerHTML = newXml;


        } catch (ex) {
            // do nothing.  Just bail
        } finally {
            var clean = 'cleanUp("' + divUniqueId + '")';
            setTimeout(clean, 5000);
        }
        return newDocument;
    }

    function handleError(doc) {
      // this can be overriden to allow showing errors in alert pop up
      if (window.sfdcPage && window.sfdcPage.desktopAjaxDisplayErrorInline && window.sfdcPage.desktopAjaxDisplayErrorInline()){
          var t = doc.getElementById(DynamicContent.pERROR_TITLE);
          var d = doc.getElementById(DynamicContent.pERROR_DESC);
          if (t) {
            var msg = t.innerHTML;
            if (d) {
              msg = msg + '\n\n' + d.innerHTML;
            }
            alert(msg);
          }
      } else {
            // remove empty page header param
            url = removeParam(url, DynamicContent.pCOOKIE_PARAM);
            // reload the page in the main window
            window.location = url;
      }
    }

    function processRequest() {
        if (!req || req.readyState != 4) return;

        if (req.status != 200 && req.status != 500) return;
        var newDoc = parseHtml(req.responseText);
        if (req.status == 200) {
            handler(newDoc);
        } else {
            handleError(newDoc);
        }
    }

    var req = getRequestObject();
    if(req) {
      var now = new Date();
      var modifiedUrl = setParam(url, DynamicContent.pTYME, now.getTime());
      req.onreadystatechange = processRequest;
      if (payloadNames == null || payloadNames.length == 0) {
        req.open("GET", modifiedUrl, true);
        req.send("");
      } else {
        req.open("POST", modifiedUrl, true);
        req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        var payload = '';
        for (var i = 0; i < payloadNames.length; i++) {
            if (payloadNames[i] == DynamicContent.pTYME) continue;
            if (i != 0) { payload += '&'; }
            payload += payloadNames[i] + '=' + payloadValues[i];
        }
        req.send(payload);
      }
    } else {
    // do nothing for now...
    }
}

function cleanUp(objectId) {
    var b = document.getElementsByTagName('body')[0];
    var f = document.getElementById(objectId);
    if (f) {
        b.removeChild(f);
    }
}

// synchronous implementation of GET
DesktopAjax.prototype.doGet = function(url){

    var xmlhttp = false;

    if (!xmlhttp){
        try {
            xmlhttp = new ActiveXObject('Msxml2.XMLHTTP');
        } catch(e) {
            try {
                xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
            } catch(e) {
                xmlhttp = new XMLHttpRequest();
            }
        }
    }

    if (xmlhttp){

        xmlhttp.open("GET", url, false);
        xmlhttp.send(null);
        var text = xmlhttp.responseText;
        return text;

    }

}
