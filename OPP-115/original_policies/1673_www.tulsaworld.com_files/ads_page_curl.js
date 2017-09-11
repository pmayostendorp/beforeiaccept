tncms_ad_pagecurl = function(ad) {

        smallPath = '/shared-content/tncms-ad-manager/pagecurl_small.swf';
        smallWidth = '100';
        smallHeight = smallWidth;
        smallParams = 'ico=' + escape(ad.smallImage);
    
        bigPath = '/shared-content/tncms-ad-manager/pagecurl_large.swf';
        bigWidth = '650';
        bigHeight = bigWidth;
        if(ad.clickuri) {
            bigParams = 'big=' + escape(ad.largeImage) + '&ad_url=' + escape(ad.clickuri);
        }
        else {
            bigParams = 'big=' + escape(ad.largeImage);
        }
    
        document.write('<div id="page-curl-ad-small" style="position:absolute; width:' + smallWidth + 'px; height:' + smallHeight + 'px; z-index:9999; right:0px; top:0px;">');
        document.write('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" id="smallCornerObject" width="' + smallWidth + '" height="' + smallHeight + '">');
        document.write('<param name="allowScriptAccess" value="always"/> ');
        document.write('<param name="movie" value="' + smallPath + '?' + smallParams + '"/>');
        document.write('<param name="wmode" value="transparent" />');
        document.write('<param name="quality" value="high" /> ');
        document.write('<param name="FlashVars" value="' + smallParams + '"/>');
        document.write('<embed src="'+ smallPath + '?' + smallParams +'" name="smallCornerObject" wmode="transparent" quality="high" width="'+ smallWidth +'" height="'+ smallHeight +'" flashvars="'+ smallParams +'" allowscriptaccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer"></embed>');
        document.write('</object>');
        document.write('</div>');
    
        document.write('<div id="page-curl-ad-large" style="position:absolute; width:' + bigWidth +'px; height:' + bigHeight +'px; z-index:9999; right:0px; top:0px;">');
        document.write('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" id="bigCornerObject" width="' + bigWidth + '" height="' + bigHeight + '">');
        document.write('<param name="allowScriptAccess" value="always"/> ');
        document.write('<param name="movie" value="' + bigPath + '?' + bigParams + '"/>');
        document.write('<param name="wmode" value="transparent"/>');
        document.write('<param name="quality" value="high" /> ');
        document.write('<param name="FlashVars" value="' + bigParams + '"/>');
        document.write('<embed src="'+ bigPath + '?' + bigParams +'" id="bigCornerEmbed" name="bigCornerObject" wmode="transparent" quality="high" width="'+ bigWidth +'" height="'+ bigHeight +'" flashvars="'+ bigParams +'" swliveconnect="true" allowscriptaccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer"></embed>');
        document.write('</object>');
        document.write('</div>');
    
        setTimeout('document.getElementById("page-curl-ad-large").style.top = "-1000px";', 1000);
    };
    
    tncms_ad_flashpagecurl = function(ad) {
        var sSmallSize = ad.width <= 100 ? 100 : 250;
        var sLargeSize = ad.largewidth <= 650 ? 650 : 800;
    
        document.write('\n<div id="page-curl-ad-small" style="position:absolute; width:' + sSmallSize + 'px; height:' + sSmallSize + 'px; z-index:999999; right:0px; top:0px;">\n');
        document.write('  <object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" id="smallCornerObject" width="' + sSmallSize + '" height="' + sSmallSize + '">\n');
        document.write('    <param name="allowScriptAccess" value="always"/>\n');
        document.write('    <param name="movie" value="/shared-content/tncms-ad-manager/pagecurl_small.swf?ico=' + escape(ad.smallFlash) + '"/>\n');
        document.write('    <param name="wmode" value="transparent" />\n');
        document.write('    <param name="quality" value="high" />\n');
        document.write('    <param name="FlashVars" value="ico=' + escape(ad.smallFlash) + '"/>\n');
        document.write('    <embed src="/shared-content/tncms-ad-manager/pagecurl_small.swf?ico=' + escape(ad.smallFlash) +'" name="smallCornerObject" wmode="transparent" quality="high" width="'+ sSmallSize +'" height="'+ sSmallSize +'" flashvars="ico=' + escape(ad.smallFlash) +'" allowscriptaccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer"></embed>\n');
        document.write('  </object>\n');
        document.write('</div>\n');
    
        document.write('<div id="page-curl-ad-large" style="position:absolute; width:' + sLargeSize +'px; height:' + sLargeSize + 'px; z-index:9999; right:0px; top:0px;">\n');
        document.write('  <object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" id="bigCornerObject" width="' + sLargeSize + '" height="' + sLargeSize + '">\n');
        document.write('    <param name="allowScriptAccess" value="always"/>\n');
        document.write('    <param name="movie" value="/shared-content/tncms-ad-manager/pagecurl_large.swf?big=' + escape(ad.largeFlash) + '&ad_url=' + escape(ad.clickuri) + '"/>\n');
        document.write('    <param name="wmode" value="transparent"/>\n');
        document.write('    <param name="quality" value="high" />\n');
        document.write('    <param name="FlashVars" value="big=' + escape(ad.largeFlash) + '&ad_url=' + escape(ad.clickuri) + '"/>\n');
        document.write('    <embed src="/shared-content/tncms-ad-manager/pagecurl_large.swf?big=' + escape(ad.largeFlash) + '&ad_url=' + escape(ad.clickuri) +'" id="bigCornerObject" name="bigCornerObject" wmode="transparent" quality="high" width="'+ sLargeSize +'" height="'+ sLargeSize +'" flashvars="big=' + escape(ad.largeFlash) + '&ad_url=' + escape(ad.clickuri) +'" swliveconnect="true" allowscriptaccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer"></embed>\n');
        document.write('  </object>\n');
        document.write('</div>\n');
    
        setTimeout('document.getElementById("page-curl-ad-large").style.top = "-1000px";', 1000);
    };

    function sizeup987() {
        document.getElementById('page-curl-ad-large').style.top = '0px';
        document.getElementById('page-curl-ad-small').style.top = '-1000px';
    }

    function sizedown987() {
        document.getElementById("page-curl-ad-small").style.top = "0px";
        document.getElementById("page-curl-ad-large").style.top = "-1000px";
    }