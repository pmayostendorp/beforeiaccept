<!-- //updated 04/17/2014 at 08:00pm by Jason
function file_get_contents(url,id)
{
$.ajax({
url: url,
dataType: "jsonp",
success: function(data) {
var jdata;
jdata = data;
FBGetNumber2(jdata.data[0].total_count,url,id);
}
});
}
//===========================================================================================================
function addCommas(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}
//===========================================================================================================
function removeCommas(aNum) {
aNum=aNum.replace(/,/g,"");
aNum=aNum.replace(/\s/g,"");
return aNum;
}
//===========================================================================================================
function FormatNumber(num) {
    if (num >= 10000) {
    num =  (num / 1000).toFixed() + "K";
    }
    if (num >= 100000)
{      num =  (num / 1000).toFixed() + "K";
}
    return num;
}
//===========================================================================================================
function FBGetNumber(id,url) {
  //idglobal = id;
  //alert("FbGEtN:" + idglobal);

//setTimeout("", 3000);
file_get_contents('http://graph.facebook.com/fql?q=SELECT total_count from link_stat where url="' + url+'"',id);
}
//===========================================================================================================
function FBGetNumber2(number1,url,id) {
var url = url.replace('http://graph.facebook.com/fql?q=SELECT total_count from link_stat where url="','');
url = url.replace('"','');
var changetext = number1;
var numdisplay= "";
if (typeof(changetext)=="undefined")
{
numdisplay =  0;
}
else
{
var num = FormatNumber(changetext);
if (num == number1)
{
numdisplay = addCommas(num);
}
else
{
var x = eval(num.split('K'));
if (x[1] == '')
{
numdisplay = num;
}
else
{
 numdisplay = addCommas(x[0]);
}
}
}
//alert("End:" + idglobal);
var FBCountNumber = numdisplay;

//===========================================================================================================

var vFB = "'http://www.facebook.com/sharer/sharer.php?u=" + url + "'";
var vTW = "'https://twitter.com/intent/tweet?original_referer=http://www.naturalnews.com&via=HealthRanger&url=" + url + "'";
var vGP = "'https://plus.google.com/share?url=" + url + "'";

var FBIcon = '<div class="Social-Gray-Icons" onClick="ShareWindow(' + vFB + ');"><img src="Images/Icon-Facebook-Gray.gif"></div>';
var TWIcon = '<div class="Social-Gray-Icons" onClick="ShareWindow(' + vTW + ');"><img src="Images/Icon-Twitter-Gray.gif"></div>';
var GPIcon = '<div class="Social-Gray-Icons" onClick="ShareWindow(' + vGP + ');"><img src="Images/Icon-Google-Gray.gif"></div>';

var shareCount =  '<div class="Index-Share-Count"><b>' + FBCountNumber + '</b> Shares</div>';

//var userComments = '<div class="Index-Comment-Count"><img src="images/Icon-Comment.gif" border="0" align="absmiddle"><a href="' + url + '#disqus_thread" title="Comments"></a></div>';

document.getElementById(id).innerHTML = FBIcon + TWIcon + GPIcon + shareCount ;

}
//===========================================================================================================
// Open up a pop-up window with the url being shared 

function ShareWindow(url) {
var iMyWidth;
var iMyHeight;
//half the screen width minus half the new window width (plus 5 pixel borders).
var iMyWidth = (window.screen.width/2) - (300 + 10);
//half the screen height minus half the new window height (plus title and status bars).
var iMyHeight = (window.screen.height/2) - (400 + 50);
fbWindow = window.open(url, 'fbWin', 'toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=1,resizable=1,width=700,height=450,left=' + iMyWidth + ',top=200');
fbWindow.focus();

}

// -->