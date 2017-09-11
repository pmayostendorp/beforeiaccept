var qualtrics = {
    init: function (settings) {
        if (settings.DesktopActive) {
            $('#pop-feedback').show();
            if (settings.DesktopExitPercentage > 0)
                this.write(settings.DesktopActive, this.script(settings.DesktopExitPercentage, 'ZN_5tMHsMTsr4ppmEB'));
        }
    },
    script: function (percentage, zoneId) {
        var script = "<script type='text/javascript'>" +
                    "(function(){var g=function(e,h,f,g){" +
                    'this.get=function(a){for(var a=a+"=",c=document.cookie.split(";"),b=0,e=c.length;b<e;b++){for(var d=c[b];" "==d.charAt(0);)d=d.substring(1,d.length);if(0==d.indexOf(a))return d.substring(a.length,d.length)}return null};' +
                    'this.set=function(a,c){var b="",b=new Date;b.setTime(b.getTime()+6048E5);b="; expires="+b.toGMTString();document.cookie=a+"="+c+b+"; path=/; "};' +
                    'this.check=function(){var a=this.get(f);if(a)a=a.split(":");else if(100!=e)"v"==h&&(e=Math.random()>=e/100?0:100),a=[h,e,0],this.set(f,a.join(":"));else return!0;var c=a[1];if(100==c)return!0;switch(a[0]){case "v":return!1;case "r":return c=a[2]%Math.floor(100/c),a[2]++,this.set(f,a.join(":")),!c}return!0};' +
                    'this.go=function(){if(this.check()){var a=document.createElement("script");a.type="text/javascript";a.src=g+ "&t=" + (new Date()).getTime();document.body&&document.body.appendChild(a)}};' +
                    'this.start=function(){var a=this;window.addEventListener?window.addEventListener("load",function(){a.go()},!1):window.attachEvent&&window.attachEvent("onload",function(){a.go()})}};' +
                    'try{(new g(' + percentage + ',"v","QSI_S_' + zoneId + '","' + window.location.protocol + '//' + zoneId.toLowerCase() + '-gamestop.siteintercept.qualtrics.com/WRSiteInterceptEngine/?Q_ZID=' + zoneId + '&Q_LOC="+encodeURIComponent(window.location.href))).start()}catch(i){}})();' +
                    "</script><div id='" + zoneId + "'><!--DO NOT REMOVE-CONTENTS PLACED HERE--></div>";
        return script;
    },
    feedback: function (bActive) {
        if (bActive.DesktopActive) {
            (function() {
                var id = 'SI_aVJVHqdwJZ8cwx7';
                var c = 'SI_aVJVHqdwJZ8cwx7_container';
                var o = document.getElementById(c);
                var d;
                if (o) {
                    o.innerHTML = '';
                    d = o;
                } else {
                    d = document.createElement('div');
                    d.id = c;
                }
                var s = document.createElement('script');
                s.type = 'text/javascript';
                s.src = '//zn_3fklnydto3dcear-gamestop.siteintercept.qualtrics.com/WRSiteInterceptEngine/?Q_SIID=SI_aVJVHqdwJZ8cwx7&Q_LOC=' + encodeURIComponent(window.location.href) + '&Q_SIPREVIEW=FALSE';
                if (document.body) {
                    document.body.appendChild(s);
                    document.body.appendChild(d);
                }
            })();
        } else {
            location.href = '/gs/help/contact.aspx';
        }
    },
    write: function (bActive, script) {
        if (bActive) {
            var container = document.getElementById('qualtrics');
            container.innerHTML = script;
            eval(container.getElementsByTagName("script")[0].innerHTML);
        }
    }
};

function printConfirmation() {
    $('#pop-feedback').hide();
    window.print();
    return false;
}
