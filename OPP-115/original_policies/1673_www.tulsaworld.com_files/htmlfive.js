var player = $("#tw-liveplayer");
var ua = navigator.userAgent.toLowerCase();
var isAndroid = ua.indexOf("android") > -1;
var canPlayHTML5 = document.createElement('video').canPlayType("application/vnd.apple.mpegurl");
var hlsSrc = "http://wpc.A800.edgecastcdn.net/hls-live/20A800/default/ec_test/ectest22.m3u8";

$(document).ready(function() {
    if (player.length > 0) {
        var warning = document.createElement("p");
        warning.className = "warning";
        warning.textContent = "Your browser does not support Flash or HTML5 HLS video.";
        
        var w = player.width();
        var h = Math.round((w * 9) / 16);
        player.width(w).height(h);
    
        if (canPlayHTML5) {
            var vidContainer = document.createElement("video");
            vidContainer.style.margin = "auto";
            vidContainer.setAttributeNode(document.createAttribute("controls"));
            vidContainer.setAttributeNode(document.createAttribute("autoplay"));
            vidContainer.setAttribute("width", w);
            vidContainer.setAttribute("height", h);
            var hlsSrcObj = document.createElement("source");
            hlsSrcObj.setAttribute("src", hlsSrc);
            hlsSrcObj.setAttribute("type", "application/vnd.apple.mpegURL");
            vidContainer.appendChild(hlsSrcObj);
            vidContainer.appendChild(warning);
            player.html(vidContainer);
        }
        else {
            //So, we can't play the HLS stream. Now what?
            //Can we play Flash??
            canPlayFlash = swfobject.hasFlashPlayerVersion("9.0.115");
            if (canPlayFlash) {
                jwplayer.key='c/kaOulp4LtY7lZZ/SZXFTaZgegbFpe4U8QDbpzRP3M=';
                jwplayer('tw-liveplayer').setup({
                    'file': 'rtmp://fml.A800.edgecastcdn.net/20A800/default/ectest22',
                    'controls': 'true',
                    'stretching': 'uniform',
                    'primary': 'html5',
                    'fallback': 'true',
                    'autostart': 'false',
                    'mute': 'false',
                    'repeat': 'false',
                    'listbar':  { 
                              'position': 'none',
                              'size': '180',
                     },
                    'rtmp':  { 
                              'subscribe': 'true',
                              'bufferlength': '',
                     },
                    'width': w,
                    'height': h
                });
            }
            else {
                    //We're up a creek. No paddle. 
            }
        }
        if (isAndroid) {
            var launchVideoLinkWrap = document.createElement("div");
            launchVideoLinkWrap.style.paddingTop = "25px";
            launchVideoLinkWrap.style.textAlign = "center";
            var launchVideoLink = document.createElement("a");
            launchVideoLink.setAttribute("href", hlsSrc);
            launchVideoLink.style.color = "#7e7e7e";
            launchVideoLink.textContent = "Having trouble? Click here (may launch a video player).";
            launchVideoLinkWrap.appendChild(launchVideoLink);
            document.body.appendChild(launchVideoLinkWrap);
        }
    }
});