// JavaScript Document



$(function(){
		
		
		/////// accordion on services page
		var $p = $('.acccontent p');
		$p.contents()
	  	.filter(function() { return this.nodeType == 3; }) // Select all textnodes
	  	.wrap('<h1>') // Place them inside paragraph elements
		$('br', $p).remove(); 
		
		
		$(".acccontent").hide();
		$(".accheader").click(function(){
			$(".accheader").removeClass("accheaderON")
			$(".acccontent").slideUp(300);
			$(this).addClass("accheaderON")
			$(this).next().slideDown(300)
			
			});
		
		$(".services_right .accheader").first().trigger("click");
		
		//////////////////////////////////////
		
		
		///////////////// form 
		
		$(".servline:even").css("background-color","#f6f6f6")
		
		$(".featurecatbox").click(function(){
			$(".featurecatbox").animate({width:160, height:160},{ duration:400, queue:false })
			$(this).animate({width:340, height:340},{ duration:400, queue:false })
			
			})
		
		
		function displayform(){
			
		$(".contactoption").unbind("click")
		$(".contactoption").bind("click", displayform)
		$(".form").slideUp(450)
		$(".contactoption").removeClass("activeform");
		$(this).unbind("click")
		$(this).find($(".form")).slideDown(450);
		$(this).addClass("activeform")
			}
	
	$(".form").hide()
	$(".contactoption").click(displayform())
		
		
		//////////////////////////////////////
		
		
		///////////////// subnav 
	
	var pathname = window.location.pathname
	pathname = pathname.substr(0,pathname.length-1);
	pathname_pos = pathname.lastIndexOf("/")
	pathname = pathname.substr(pathname_pos+1,pathname.length).toLowerCase()
	pathname = pathname.replace(/-/g," ")
	$(".sub .inner ul li a").filter(function(){ return $(this).text().toLowerCase().indexOf(pathname) > -1;}).addClass("subOn")
	
			//////////////////////////////////////
		
		
		///////////////// slider on services 
		
	var slidefolio_current = 1
	var slidefolio_slides = $(".slidefolio").find($(".slide")).length
	$(".slidefolio").css("width", slidefolio_slides*1000)
	
	$("#slidefolio-next").click(function(){
		if(slidefolio_current<slidefolio_slides){
			slidefolio_current++
			$(".slidefolio").animate({left:"-=1000"}, 300)
			}
		})
		
			
	$("#slidefolio-prev").click(function(){
		if(slidefolio_current>1){
			slidefolio_current--
			$(".slidefolio").animate({left:"+=1000"}, 300)
			}
		})
		
		
	$("#slidebtn").click(function(){
		$(".slidefolio-bind").animate({height:400},300,'swing')
		$(this).hide()
				
		})	
		
		//////////////////////////////////////
		
		
		///////////////// staff page 
		
	
	var fname
	$(".staffbind").each(function(){
		names = $(this).find($(".slidename")).text()
		fname = names.substring(0,names.search(" "));
		names = names.replace(" ", "<br>")
		$(this).find($(".slidename")).html(names)
		$(this).find($(".slideemail a")).append(" "+fname)
		})
	

	var pathname = window.location.pathname
	if(pathname.search("our-clients0")!=-1){
		$(".sub").hide();
		
		}
	
		//////////////////////////////////////
		
		
		///////////////// general functions & homepage  
	
	
	$(".roll").hover(swapIn, swapOut)
	
	function swapIn(){
		var plusB = $(this).attr("src").replace(".png", "_b.png");
		$(this).attr("src", plusB)
		
		}
	function swapOut(){
		var minusB = $(this).attr("src").replace("_b.png", ".png");
		$(this).attr("src", minusB)
		}
	
	var rotnum = $('#rotator ul li').size()
	$('#rotator').css("width",rotnum*1000)
	$('#rot').css("width",rotnum*2000)

	$('#rotator').carousel("1000",'#prev', '#next');

	$(".staffbind").mouseenter(function(){
		$($(this).find(".staffslider")).fadeIn(200)
	})
	
	$(".staffbind").mouseleave(function(){
		$($(this).find(".staffslider")).fadeOut(500)
	})

	
	//////////////////////////////////////
		
		
		///////////////// form 
	

var recentHTML
		$.getJSON('http://services.sidearmsports.com/services/clients.ashx?callback=?', function(data) {
			$("#sitenum").html(data.sites.length) 
			})
			
			recentHTML=""
			recentSites=0
		$.getJSON('http://services.sidearmsports.com/services/clients.ashx?type=recent&callback=?', function(data) {
				$.each(data.sites, function(key, val) {
				recentSites++
				 recentHTML+='<div class="recentbind"><div class="recentgrid"><div class="img"><img class="flip" width="110" height="110" src="'+val.client_image_url+'"></div><div class="info"><span class="schoolname">'+val.client_name+'</span><span class="location">'+val.division+' : '+val.location+'</span><a target="_blank" href="'+val.client_url+'">VISIT SITE</a></div></div><div class="clear"></div></div>'
				 
				 $('#recentgridbox').html(recentHTML)
				 return recentSites<40
				})
			
		})
			
			
	$("#showmore").click(function(){
		$("#recent").animate({height: "958px"}, 500);
		$(this).hide();
		
		})
		
				
	$("body").on("mouseenter", '.recentgrid', function(e) {$(this).animate({left:'-150'},150,"swing")})
	$("body").on("mouseleave", '.recentgrid', function(e) {$(this).animate({left:'0'},150,"swing")})

	footerHTML = ""
	$.getJSON("http://blog.sidearmsports.com/feed/json?callback=callback", function(data) {
				$.each(data, function(num, val) {
					footerHTML+='<div class="headline"><a class="head" href="'+val.permalink+'" target="_blank">'+val.title+'</a></div>'
					return num<3
					})
			$(".footerblog").append(footerHTML)
	})
	/*
	tweetHTML=""
	$.getJSON('http://search.twitter.com/search.json?q=from:sidearmsports&&callback=?', function(tweets) {
				$.each(tweets.results, function(num, val) {
					prelink  = val.text
					findlink =prelink.search("http://")
					if(findlink!=-1){
						two = prelink.substring(findlink)
						two.substr(0,two.search(" "))
						makelink = '<a href="'+two+'">'+two+'</a>'
						makelink = prelink.replace(two, makelink)						
						}
					else{
						makelink = prelink
						}
					
					
					tweetHTML+= '<div class="tweet"><a href="http://www.twitter.com/sidearmsports" target="_blank">@'+val.from_user+'</a><br/>'+makelink+'</div>'
					
					return num<1
					})
				$(".footertweets").append(tweetHTML)

				})
	
	
	
	*/
	
})