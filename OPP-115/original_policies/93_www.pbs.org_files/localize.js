function getDomainName(hostName)
{
    return hostName.substring(hostName.lastIndexOf(".", hostName.lastIndexOf(".") - 1));
}

function readCookie(cookie_name) {
    // Reads a cookie value. Returns cookie value or null, if cookie_name is not set
    cookie_name += "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i].replace(/^\s+|\s+$/g,"");
        if (c.indexOf(cookie_name) == 0)
            return c.substring(cookie_name.length,c.length);
        }
        return null;
}

function createCookie(name,value,days) {
    var domain = ".pbs.org";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";

    if(window.location.hostname != ""){
        domain = getDomainName(window.location.hostname);
    }
    document.cookie = name+"="+value+expires+"; path=/; domain=" + domain;
}

function localize_classic(url) {
    var xmlhttp, jResponse;
    if (window.XDomainRequest) // ie8
    {
        xmlhttp = new XDomainRequest();
        xmlhttp.onload = function() { 
            jResponse = JSON.parse(xmlhttp.responseText);
                if ( jResponse["cookie"] ) {
                    createCookie('pbsol.sta_extended', escape(jResponse['cookie']), 365);
                }
        };
        xmlhttp.open("GET",url,false);
        xmlhttp.send();
    }
    else {
        if (window.XMLHttpRequest)
        {    
            xmlhttp = new XMLHttpRequest();
        }
        else
        {   
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState==4 && xmlhttp.status==200){
               jResponse = JSON.parse(xmlhttp.response);
                if ( jResponse["cookie"] ) {
                    createCookie('pbsol.sta_extended', escape(jResponse['cookie']), 365);
                }
            }
        }

        xmlhttp.open("GET",url,false);
        xmlhttp.send();
    }
}

var url = "http://localization.services.pbs.org/localize/auto/cookie/";
var is_localized = readCookie('pbsol.sta_extended');
if(is_localized == null) {
    localize_classic(url);
}



