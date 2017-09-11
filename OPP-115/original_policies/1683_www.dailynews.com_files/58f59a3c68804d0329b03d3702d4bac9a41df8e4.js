//Common variables/settings.
var ccDatastore = "http://sponsoredcontent.digitalfirstmedia.com";
var resultCount = 40; //Number of results returned from Datastore.
var ccTwitterHandles = [];
ccTwitterHandles['denverpost'] = "denverpost";
ccTwitterHandles['mercurynews'] = "mercurynews";
ccTwitterHandles['insidebayarea'] = "insidebayarea";
ccTwitterHandles['contracostatimes'] = "CCTimes";



//Reformats the date from WP's format, into a human-readable one.
function fixDate(d) {
    var monthNames = [ "Jan.", "Feb.", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    d = d.split(" ");
    d = d[0];
    var nD = new Date(d);    
    var tmp = monthNames[nD.getMonth()]+ ' ' + nD.getDate() + ', ' + nD.getFullYear();
    return tmp;
}

//        
//Strip teasers out of date range or do not belong in this domain.
//
function ccCleanData(j,z) {
    //var currentDomain = dfm.api("data","siteDomain");
    var currentDomain = window.location.hostname.substr(4);
    var ccToday = new Date();       
    for (var i=0; i<j.posts.length; i++) {            
        var cctStart = new Date(j.posts[i].custom_fields[z+"_start_date"]);
        var endTemp = (j.posts[i].custom_fields[z+"_end_date"] != '') ? j.posts[i].custom_fields[z+"_end_date"] : "2099-12-31";
        var cctEnd = new Date(endTemp);
        if (j.posts[i].custom_fields.properties[0].indexOf(currentDomain) == -1 || (cctStart > ccToday || cctEnd <= ccToday )) {
            //Teaser doesn't belong to this domain.
            //console.log("Post #"+i+" has been removed because of its domain.");
            j.posts.splice(i, 1);
            i--;
        }        
        
    }
    return j;
}

function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

function stripHTML(html)
{
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent || tmp.innerText || "";
}

function showCCDisclaimer() {
        $('#ccDisclaimerCopy').toggle();
        //alert('This content is produced by the Advertising Department of Digital First Media in collaboration with the advertiser. Digital First Media\'s and this publication\'s editorial staff had no role in its preparation. We strive to ensure that the treatment and design of all advertising and Sponsored Content is clearly differentiated from editorial content.');    
    }
    
         

function loadTeaserCSS() {
    $('head').append('<style>.ccDisclaimerBox {display:none; font-style:italic; color:#333; font-size:12px;} .ccDisclaimerToggle {float:right; cursor:pointer; padding-right:5px;}.sponsoredByCenterCol {text-align:right;padding-right:5px;float:right; width: 80%;}.sponsoredByCenterCol a { color:orange; }.ccSkyboxHeader {background-color:orange;color:white; font: bold 16px "Oxygen", "Trebuchet MS", "Merriweather", "Helvetica Neue", Helvetica, Arial, sans-serif; margin:11px 0 5.663px;padding-left:3px;} #btLeftRailTitle {background-color:orange; font-weight:bold; color:white; font-size:12px; padding-left:3px; width:100%; margin-top:10px;}  #btLeftRailTitle > a {color:white; font-family: Oxygen, "Trebuchet MS", Merriweather, "Helvetica Neue", Helvetica, Arial, sans-serif;} #ccLeftRailTeaser {border-bottom:1px solid orange;} </style>');    
}