//CR312541-120508 - Fix found at http://blog.lavablast.com/post/2008/10/Gotcha-WebKit-(Safari-3-and-Google-Chrome)-Bug-with-ASPNET-AJAX.aspx
Sys.Browser.WebKit = {}; //Safari 3 is considered WebKit
if (navigator.userAgent.indexOf('WebKit/') > -1) {
    Sys.Browser.agent = Sys.Browser.WebKit;
    Sys.Browser.version = parseFloat(navigator.userAgent.match(/WebKit\/(\d+(\.\d+)?)/)[1]);
    Sys.Browser.name = 'WebKit';
}