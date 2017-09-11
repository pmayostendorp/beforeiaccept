<!-- //updated 02/17/2012 at 02:15pm by Jason
function file_get_contents(url,id,type)
{
$.ajax({
url: url,
type: type,
dataType: "jsonp",
success: function(data) {
var jdata;
jdata = data;
FBGetNumber2(jdata.data[0].total_count,url,id,type);
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
function FBGetNumber(id,url,type) {
  //idglobal = id;
  //alert("FbGEtN:" + idglobal);

//setTimeout("", 3000);
file_get_contents('http://graph.facebook.com/fql?q=SELECT total_count from link_stat where url="' + encodeURIComponent(url) +'"',id,type);
}
//===========================================================================================================
function FBGetNumber2(number1,url,id,type) {
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
if (type=="vertical") {
var buttonstart = '<span class="FBShare-Vertical" onClick="FBShareWindow(\'' + id + '\',\'http://www.facebook.com/sharer/sharer.php?u=' + url + '\',\'' + type + '\',\'' + FBCountNumber + '\');" title="Click to Share this on Facebook">';
var buttonend = '</span>';
// This inserts the formatted number into the <div> tag
document.getElementById(id).innerHTML = buttonstart + FBCountNumber + buttonend;
}
else {
var buttonstart = '<span class="FBShare-Horizontal-1" onClick="FBShareWindow(\'' + id + '\',\'http://www.facebook.com/sharer/sharer.php?u=' + url + '\',\'' + type + '\',\'' + FBCountNumber + '\');" title="Click to Share this on Facebook"></span><span class="FBShare-Horizontal-2">';
var buttonend = '</span><span class="FBShare-Horizontal-3"></span>';
// This inserts the formatted number into the <div> tag
document.getElementById(id).innerHTML = buttonstart + FBCountNumber + buttonend;
};
}
//===========================================================================================================
// Open up a pop-up window with the url being shared 

function FBShareWindow(id,url,type,fbcount) {
var iMyWidth;
var iMyHeight;
//half the screen width minus half the new window width (plus 5 pixel borders).
var iMyWidth = (window.screen.width/2) - (300 + 10);
//half the screen height minus half the new window height (plus title and status bars).
var iMyHeight = (window.screen.height/2) - (400 + 50);
fbWindow = window.open(url, 'fbWin', 'toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=1,resizable=1,width=700,height=450,left=' + iMyWidth + ',top=200');
fbWindow.focus();
// Increase the number within the <div> by 1 when the button is clicked
var ch = fbcount;
var url = url.replace('http://www.facebook.com/sharer/sharer.php?u=','');
var x = eval(ch.split('K'));
var numdis1 =  0;
if (x[1] == '')
{
numdis1 = Number(x[0])*1000;
numdis1 = FormatNumber(numdis1);
}
else
{
numdis = Number(removeCommas(ch));
numdis = numdis + 1;
numdis1 = addCommas(numdis);
}
if (type=="vertical") {
var buttonstart = '<span class="FBShare-Vertical" onClick="FBShareWindow(\'' + id + '\',\'http://www.facebook.com/sharer/sharer.php?u=' + url + '\',\'' + type + '\',\'' + fbcount + '\');" title="Click to Share this on Facebook">';
var buttonend = '</span>';
// This inserts the formatted number into the <div> tag
document.getElementById(id).innerHTML = buttonstart + numdis1 + buttonend;
}
else {
var buttonstart = '<span class="FBShare-Horizontal-1" onClick="FBShareWindow(\'' + id + '\',\'http://www.facebook.com/sharer/sharer.php?u=' + url + '\',\'' + type + '\',\'' + fbcount + '\');" title="Click to Share this on Facebook"></span><span class="FBShare-Horizontal-2">';
var buttonend = '</span><span class="FBShare-Horizontal-3"></span>';
// This inserts the formatted number into the <div> tag
document.getElementById(id).innerHTML = buttonstart + numdis1 + buttonend;
};
}

// -->