$(function () {

//start with hard-coded options, but change to dynamic
    var SiteDomain= "dailynews.com";
    var SectionName="";
    var PageType="article";
    var page;
//use dfm.api if available    
if (typeof dfm !== 'undefined') {
    //use dfm.api variables if available
     SiteDomain =dfm.api("data","siteDomain");//July 9 fix Ann Zerega
     SectionName=dfm.api("data","sectionName");//section set by DFM API already
     PageType=dfm.api("data","pageType");  //could be frontpage, or article or section

}

var ToutDataFile = 'http://local.'+SiteDomain+'/common/dfm/assets/js/tout/toutjson.'+SiteDomain+'.js';//path for Tout json file

    switch(PageType)
    {
        case "frontpage":
            page="/home";
            break;
        case "article":
            page="/article";
            break;
        default:
            if (SectionName != "") {
                page="/"+SectionName.toLowerCase();//set to section name
            }
            else {
                
                //default to article if section not set
                page="/article";
            }
    }
//alert (' load article setting = news ID if section fails')	

    $.ajax({
        async: false, 
        url:  ToutDataFile, 
        dataType: 'jsonp',
        jsonpCallback: 'toutVid',
        success: function(results){
            c = results[SiteDomain][page];
            if (c == undefined) {
                //if the lookup on a section failed, use the article setting = News ID  for Tout
                 page="/article";
                 c = results[SiteDomain][page];
                }
            if(c["width"] == undefined){
                width = 300;
            } else {
                width = c["width"]
            }
	
            if(c["height"] == undefined) {
                height = 450;
            } else {
                height = c["height"]
            }
   
 $("#tout-right-rail")  .append('<iframe class="tout-widget-iframe" frameborder="0" height="'+height+'" scrolling="no" src=http://www.tout.com/widgets/'+c["id"]+' width="'+width+'"></iframe>')
          
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log("Error: " + textStatus + " | " + errorThrown + " | " + xhr);			
            return "Unloaded";
        }
    });

 
});