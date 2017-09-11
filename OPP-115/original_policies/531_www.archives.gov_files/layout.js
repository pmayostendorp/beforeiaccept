$(pageInit);
$(window).load(pageHeight);

function pageInit()
{
	// fill vertical space with floating layout divs
 
	try {
	 document.execCommand('BackgroundImageCache', false, true);
	} catch(e) {}



	// wire site search events
	$("#qt").focus(clearSearch).blur(fillSearch);
	$("#siteSearch form").submit(function(){if ($("#qt").val()=="Search Archives.gov") {  location.href="http://search.archives.gov"; return false;} return true;});


	// remove RH icons
	$("#col-b ul.lines li a").css({"background-image":"none","padding-left":"0px"});
	$("#col-b ul.lines li img[align=absmiddle]").css({"display":"none"});
	
	
	// preload images
	preLoad();
	
	// add zebra stripes to tables
	//$("table").addClass("striped");
	//$("table.striped tbody tr:odd").addClass("alt");
	
	$("table[class='striped']").addClass("striped");
	$("table.striped tbody tr:odd").addClass("alt");
	$("table[class=bordered_striped]").addClass("striped");
	$("table.bordered_striped tbody tr:odd").addClass("alt");	
	//round corners in buttonLinks
	if ($.browser.msie && parseInt($.browser.version)<=8) 
 	{
 	
 	}
 	else
 	{
	 	DD_roundies.addRule('.buttonLink', '6px 6px 6px 6px', true);
 	}
	DD_roundies.addRule('.box, .boxPlain', '6px 6px 6px 6px', true);
	DD_roundies.addRule('ul.roundTop li', '4px 4px 0px 0px', true);
	DD_roundies.addRule('#content .titleBox', '6px 6px 6px 6px', true);
	
	$("#col-b .titleBox").css("border","none");
	 
	
	if ($(".topicGallery").get(0))
		$("#content").css("padding-top","240px");
	
	
	
}
function pageHeight()
{
	// moved these to Window.load so height would calculate with images in place
	
	// set items to equal height
	$("div.row").each(function(){
	
		var ht=0;
		
		$(this).children("div.floatRight, div.floatLeft,div.width48,div.width49, div.box").each(
			function(){
			if (parseInt($(this).height())>ht)
			{
				ht=parseInt($(this).height());
			}
		});
		
		$(this).children("div.floatRight, div.floatLeft,div.width48, div.width49, div.box").css("min-height",ht);
		
	});
	
	
	if(parseInt($(".shopR1").height())>parseInt($(".shopR2").height()))
	{
		$(".shopR2").css("height",parseInt($(".shopR1").height()));
	}
	else
	{
	
		$(".shopR1").css("height",parseInt($(".shopR2").height()));	
	}
	$(".shopL").css("height",parseInt($(".shopR2").height())*2 +28);
	
	var ht=$("#container2").outerHeight();

	$("#content").css("height",ht);	
	$("#col-a").css("height",ht);	


}
function preLoad()
{
	
	var overImgs=[
		"/global-images/buttons/button-research-a-over.png"
		,"/global-images/buttons/button-veterans-a-over.png"
		,"/global-images/buttons/button-teachers-a-over.png"
		,"/global-images/buttons/button-locations-a-over.png"
		,"/global-images/buttons/button-shop-a-over.png"
		,"/global-images/buttons/button-bg-go-over.png"
		,"/global-images/layout/banner-research-over.jpg"
		,"/global-images/layout/banner-veterans-over.jpg"
		,"/global-images/layout/banner-teachers-over.jpg"
		,"/global-images/layout/banner-locations-over.jpg"
		,"/global-images/layout/banner-shop-over.jpg"								
		,"/global-images/controls/control-recent-news-over.gif"
		];
	for (var i=0;i<overImgs.length;i++)
	{
	
		var img=new Image();
		img.src=overImgs[i];
	}	
}
function fillSearch()
{
	clearSearch(1);
}
function clearSearch(defaultVal)
{
	 
	if (defaultVal!="1")
	{
	    if ($("#qt").val()=="Search Archives.gov")
    	{
        	$("#qt").val("");
	    }
	    return true;
	}    
	
	if ($("#qt").val().replace(/ /g,"")=="")
	{
		$("#qt").val("Search Archives.gov");
	}
}
