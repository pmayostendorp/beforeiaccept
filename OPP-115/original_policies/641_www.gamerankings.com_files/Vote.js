/*
 * This code is for Internal Salesforce use only, and subject to change without notice.
 * Customers shouldn't reference this file in any web pages.
 */
if("undefined"==typeof Effect)throw"vote.js requires including script.aculo.us' effects.js library";function voteDoNothing(){return!1}function setVoteStatusMsg(b){window.status=null===b?"":b;return!0}function animateVoteButton(b,a,c,e,d){b=("Up"==d?"+":"-")+e;c=$(a);c.update(b);c.style.visibility="";window.status="";new Effect.Fade(a,{duration:2.5});"Up"==d?new Effect.Move(a,{x:0,y:-45,duration:2.5,mode:"relative"}):new Effect.Move(a,{x:0,y:25,duration:2.5,mode:"relative"})}
function mouseoverStar(b){var a=b.parentNode.parentNode.getElementsByTagName("div");if(a&&0<a.length){var c=-1;do c++,a[c].className="chosenStar";while(a[c]!=b&&c<a.length)}}function mouseoutStar(b){var a=b.parentNode.parentNode.getElementsByTagName("div");if(a&&0<a.length){var c=-1;do c++,a[c].className="idleStar";while(a[c]!=b&&c<a.length)}}function mouseoverStarsPanel(b){b.className="stars mouseOver"}function mouseoutStarsPanel(b){b.className="stars mouseOut"};

//# sourceMappingURL=/javascript/1434447970000/sfdc/source/Vote.js.map
