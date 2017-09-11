jQuery(document).ready(function($) {
	
 
	
	
	
	
		//When page loads...
	$('.tabs-wrapper').each(function() {
		$(this).find(".tab_content").hide(); //Hide all content
		$(this).find("ul.tabs li:first").addClass("active").show(); //Activate first tab
		$(this).find(".tab_content:first").show(); //Show first tab content
	});
	
	//On Click Event
	$("ul.tabs li").click(function(e) {
		$(this).parents('.tabs-wrapper').find("ul.tabs li").removeClass("active"); //Remove any "active" class
		$(this).addClass("active"); //Add "active" class to selected tab
		$(this).parents('.tabs-wrapper').find(".tab_content").hide(); //Hide all tab content

		var activeTab = $(this).find("a").attr("href"); //Find the href attribute value to identify the active tab + content
		$(this).parents('.tabs-wrapper').find(activeTab).fadeIn(); //Fade in the active ID content
		
		e.preventDefault();
	});
	
	$("ul.tabs li a").click(function(e) {
		e.preventDefault();
	})
	
	
        $('#scrollbar1').tinyscrollbar();
    
          $('#banner-slide').bjqs({
            animtype      : 'slide',
            height        : 56,
            showcontrols : false,
            width         : 280,
            animspeed: 10000,
            automatic : true,   
          });

/*
$('#carousel-24-502727099ccf7').flexslider({
    animation: "slide",
    directionNav: false,
    controlNav: false,
    animationLoop: false,
    slideshow: false,
    itemWidth: 100,
    itemMargin: 0,
    asNavFor: '#slider-24-502727099ccf7'
});
$('#slider-24-502727099ccf7').flexslider({
    animation: "slide",
    controlNav: false,
    animationLoop: false,
    slideshow: false,
    sync: "#carousel-24-502727099ccf7"
});
*/

$('.slider-thumbs').flexslider({
	   smoothHeight: false,
	   touch: true,
	   animation: "slide", 
	   controlNav: false, 
	   animationLoop: true, 
	   slideshow: false, 
    itemWidth: 100, 
    itemMargin: 0,
	   asNavFor: ".slider-slide"  
  
});

$('.slider-slide').flexslider({
	   smoothHeight: false, 
	   touch: true, 
	   animation: "slide", 
	   controlNav: false, 
	   animationLoop: true, 
	   slideshow: true, 
           slideshowSpeed: 25000,
	   sync: ".slider-thumbs" 
});



/*
  jQuery(".flex_slider_thumbs_carousel").flexslider({
	   smoothHeight: true,
	   touch: true,
	   animation: "slide", 
	   controlNav: false, 
	   animationLoop: true, 
	   slideshow: false,  
	   itemWidth: 250,  
	   itemMargin: 5,  
	   asNavFor: ".flex_slider_thumbs"  
	   });
   jQuery(".flex_slider_thumbs").flexslider({ 
	   smoothHeight: true, 
	   touch: true, 
	   animation: "slide", 
	   controlNav: false, 
	   animationLoop: true, 
	   slideshow: false, 
	   sync: ".flex_slider_thumbs_carousel"  });  
*/
 
    
  
          
         
		$('<select />').appendTo('#mobile-menu');

$('<option />', {
    'selected': 'selected',
    'value'   : '',
    'text'    : 'Navigate...'
}).appendTo('#mobile-menu select');

$('.ddsmoothmenu a').each(function() {
    var el = $(this);
    if(el.parents('.sub-menu').length) {
        $('<option />', {
            'value': el.attr('href'),
            'text':  '— ' + el.text()
        }).appendTo('nav select');
    } else {
        $('<option />', {
            'value': el.attr('href'),
            'text': el.text()
        }).appendTo('nav select');
    }
});
 
$('#mobile-menu select').change(function() { 
    window.location = $(this).find('option:selected').val();
});


	$(".sub-menu").parent("li").addClass("parent");
	$(".ddsmoothmenu li:first-child").addClass("firstul");
	$(".sub-menu li:first-child").addClass("first");
	$(".sub-menu li:last-child").addClass("last");
	
	 
 
     
});
