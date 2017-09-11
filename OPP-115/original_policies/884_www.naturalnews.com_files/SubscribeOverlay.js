<!--

function referCheck(id) {

if (! document.referrer) {
//alert("NO REFERRER!");
hideSubscribe(id);
}



else {

if(document.referrer.indexOf('naturalnews.com') > -1) {
//alert("Referrer is NaturalNews!");
hideSubscribe(id);
}

else {
//alert("The referrer is " + document.referrer);
enabledCheck(id);
}

}


}

function enabledCheck(id){
var cookieEnabled=(navigator.cookieEnabled)? true : false

if (cookieEnabled) {
//Cookies are on, run this function
checkCookie(id);
}
else {
//Cookies turned off, do nothing
}
}

//===============================================================================================================

function checkCookie(id)
{

var NNOverlay=getCookie("NNOverlay");
if (NNOverlay!=null && NNOverlay!="")
  {
//alert(NNOverlay + " This cookie already exists");
//Do nothing, but we'll hide the overlay just in case...
hideSubscribe(id);
  }
else 
  {
		//alert("No cookie, creating one now");
		setCookie("NNOverlay","ShownOnce",120);
		//Cookie created, now show the overlay
		showSubscribe(id);
  }

}

//===============================================================================================================

function getCookie(c_name)
{
var c_value = document.cookie;
var c_start = c_value.indexOf(" " + c_name + "=");
if (c_start == -1)
{
c_start = c_value.indexOf(c_name + "=");
}
if (c_start == -1)
{
c_value = null;
}
else
{
c_start = c_value.indexOf("=", c_start) + 1;
var c_end = c_value.indexOf(";", c_start);
if (c_end == -1)
{
c_end = c_value.length;
}
c_value = unescape(c_value.substring(c_start,c_end));
}
return c_value;
}

//===============================================================================================================

function setCookie(c_name,value,exdays)
{
var exdate=new Date();
exdate.setDate(exdate.getDate() + exdays);
var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
document.cookie=c_name + "=" + c_value;




}

//===============================================================================================================

function showSubscribe(id){
//var activeElement = document.getElementById(id)
//activeElement.style.visibility = "visible";
$("#Subscriber-Overlay-Container").fadeIn("slow");
}

function hideSubscribe(id){
var activeElement = document.getElementById(id)
activeElement.style.display = "none";
}

// -->