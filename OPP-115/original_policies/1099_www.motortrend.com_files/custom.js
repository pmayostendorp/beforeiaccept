/*global $:false */

//AJAX PORTFOLIO

	jQuery(window).load(function(){
	(function(){
		var container = jQuery( "#portfoliod" );
		var jQueryitems = jQuery('#container-portfolio > div.portfolio-item');
		index = jQueryitems.length;

        jQuery('#container-portfolio .portfolio-item').click(function(){

			return true;
			if (jQuery(this).hasClass('active')){
			} else {	
			lastIndex = index;
			index = jQuery(this).index();
			jQueryitems.removeClass('active beprev benext');
			jQuery(this).addClass('active');

            //var myUrl = jQuery(this).find('.ajax-trigger').attr("href") + " .item-data";
			var myUrl = jQuery(this).find('.ajax-trigger').attr("href") + " .blog-item"; // CHANGE TO GET TITLE

            var portfolio_nav_offset = (main_nav_active) ? 100 : 0;

			/*jQuery('html, body').animate({scrollTop:20}, 800)*/ //Use this to scroll to the 20px top of the page
			jQuery('html, body').animate({ scrollTop: jQuery(".portfolio-top").offset().top-portfolio_nav_offset
			}, 400); //Custom scroll to .portfolio-top div 
			jQuery('.loading_icon').css({ "display": "block", "opacity": "0" }).animate({ "opacity": "0.8" }, 300);
			jQuery('#portfolioData').animate({opacity:0}, 400,function(){	
                            // for omniture call
                            omnitureTrackInner("Corp:Experts:Portfolio");
				jQuery("#portfolioData").load(myUrl,function(){	 //FIX THE HEIGHT BUG ON FLEXSLIDER
                        var jQueryhelper = jQuery('.helper');
						var h1Height = jQuery('#portfolioData .the-title h1').outerHeight(true);
						var height = jQueryhelper.height() + h1Height;
						jQuery('#portfolioData').css("min-height", height);

						
						jQuery('.rev_slider').show().revolution();
				});
				jQuery('#portfolioData').animate({opacity:1}, 400);
			});
			
			//SLIDE UP
				
			jQuery('#portfoliod').slideUp(400, function(){
				jQuery('.loading_icon').delay(800).animate({ "opacity": "0" }, 100,function(){
					jQuery('.loading_icon').css("display","none");
				});
				jQuery('#portfolioData').css('visibility', 'visible');}).delay(800).slideDown(400,function(){
					jQuery('#portfolioData').animate({opacity:1}, 400);
			});

			//SLIDE UP AND DOWN
				
				if (jQueryitems.last().hasClass('beprev')){
				jQuery('#ajax_next').click(function() {
                   jQuery('.portfolio-item.active').addClass('beprevfix');
                });
				
			} else { 
				//Nothing
			}
			
			}

			return false;				
			
			});

		//AJAX CLOSE 
		jQuery('#ajax_close').click(function() {
			jQuery('#portfoliod').slideUp(400);
			jQueryitems.removeClass('benext beprev active') ;
			return false;
        });

	})();
	
});




jQuery(document).ready(function(){

	jQuery( 'a[ title="link" ]' ).addClass("external");

});


 jQuery(document).ready(function(){
 "use strict";
	
	jQuery('.global .main_menu').onePageNav({
    currentClass: 'active',
    changeHash: false,
    scrollSpeed: 750,
    scrollOffset: 0,
	filter: ':not(.external)',
    easing: 'swing'
});

jQuery('.button_container').onePageNav({
    changeHash: false,
    scrollSpeed: 750,
    scrollOffset: 0,
    filter: '',
    easing: 'swing'
});

/*jQuery('#logo').onePageNav({
    changeHash: false,
    scrollSpeed: 750,
    scrollOffset: 0,
    filter: '',
    easing: 'swing'
});*/

jQuery('#home_icon').onePageNav({
    changeHash: false,
    scrollSpeed: 750,
    scrollOffset: 0,
    filter: '',
    easing: 'swing'
});

jQuery('#top_top_container').onePageNav({
     changeHash: false,
     scrollSpeed: 500,
     scrollOffset: 0,
     filter: '',
     easing: 'swing'
 });

/*jQuery('.responsive_nav').onePageNav({
    changeHash: false,
    scrollSpeed: 750,
    scrollOffset: 0,
    filter: ':not(.external)',
    easing: 'swing',
});*/
	
});



jQuery(document).ready(function() {
	"use strict";
	// cache container
	var jQuerycontainer = jQuery('#container-portfolio');
	// initialize isotope
	jQuerycontainer.isotope({
  masonry: {
    columnWidth: 2
  }
});


// filter items when filter link is clicked
jQuery('#filters a').click(function(e){
    //e.preventDefault();
  var selector = jQuery(this).attr('data-filter');
  jQuerycontainer.isotope({ filter: selector });
  return false;
});
        
      
});

jQuery(document).ready(function() {
	"use strict";
    jQuery('#filters li>a').click(function() {
	jQuery('#filters li').removeClass('active');
    jQuery(this).parent().addClass('active');
    });
});



/* Twitter*/

/*   jQuery(function(jQuery){
        jQuery(".tweet").tweet({
          join_text: "auto",
          username: "wdtuts",
          count: 3,
          auto_join_text_default: null,      // [string]   auto text for non verb: "I said" bullocks
          auto_join_text_ed: null,                 // [string]   auto text for past tense: "I" surfed
          auto_join_text_ing: null,             // [string]   auto tense for present tense: "I was" surfing
          auto_join_text_reply: null,    // [string]   auto tense for replies: "I replied to" @someone "with"
          auto_join_text_url: null
        });
      }); */


//CAROUSEL SLIDER

/*jQuery(document).ready(function() {
jQuery('.slidewrap').carousel({
	slider: '.slider',
	slide: '.slide',
	slideHed: '.slidehed',
	nextSlide : '.next_slide',
	prevSlide : '.prev_slide',
	addPagination: false,
	addNav : true,
	speed: 500 // ms.
});

jQuery('.slidewrap2').carousel({
	slider: '.slider',
	slide: '.slide',
	slideHed: '.slidehed',
	nextSlide : '.next_slide',
	prevSlide : '.prev_slide',
	addPagination: true,
	addNav : false,
	speed: 500 // ms.
});

jQuery('.slidewrap3').carousel({
	slider: '.slider',
	slide: '.slide',
	slideHed: '.slidehed',
	nextSlide : '.next_slide',
	prevSlide : '.prev_slide',
	addPagination: false,
	addNav : true,
	speed: 500 // ms.
});
jQuery('.slidewrap4').carousel({
	slider: '.slider',
	slide: '.slide',
	slideHed: '.slidehed',
	nextSlide : '.next_slide',
	prevSlide : '.prev_slide',
	addPagination: false,
	addNav : true,
	speed: 500 // ms.
});
jQuery('.slidewrap5').carousel({
	slider: '.slider',
	slide: '.slide',
	slideHed: '.slidehed',
	nextSlide : '.next_slide',
	prevSlide : '.prev_slide',
	addPagination: false,
	addNav : true,
	speed: 500 // ms.
});
jQuery('.slidewrap6').carousel({
	slider: '.slider',
	slide: '.slide',
	slideHed: '.slidehed',
	nextSlide : '.next_slide',
	prevSlide : '.prev_slide',
	addPagination: false,
	addNav : true,
	speed: 500 // ms.
});
jQuery('.slidewrap7').carousel({
	slider: '.slider',
	slide: '.slide',
	slideHed: '.slidehed',
	nextSlide : '.next_slide',
	prevSlide : '.prev_slide',
	addPagination: false,
	addNav : true,
	speed: 500 // ms.
});
});*/



/*jQuery(window).load(function(){

		var jQueryflickr_items = jQuery('#flickrphotos_home .flickr_item_home');

		var jQuerylast_flick_items = jQueryflickr_items.parent().slice(5);

		var jQuerycontrolls = jQuery('.slidewrap.flickr .slidecontrols');

		setTimeout(function(){
			jQuery('#flickrphotos_home_second').html(jQuerylast_flick_items);
			jQuery('.controlls_flickr').html(jQuerycontrolls);	
		}, 200);


}); */


/* SERVICES */

jQuery(document).ready(function() {

var alltabs = jQuery('.services_tab');

jQuery(".tab_content").hide();
jQuery(".tab_content:first").show();
jQuery(".tabs_triggers a").click(function() {

	jQuery(alltabs).removeClass("active");
	jQuery(this).find('.services_tab').addClass("active");
	jQuery(".tab_content").hide(); 

	var activeTab = jQuery(this).attr("href"); 

	jQuery(activeTab).fadeIn(600); 

	return false;

	});

});



// RESPONSIVE MENU 

jQuery(document).ready(function(){
var menu_trigger = jQuery('.menu_trigger');
var areamenu = jQuery('.mobileAreaMenu');
var all_li =jQuery('.mobileAreaMenu li');


jQuery(menu_trigger).click(function() {


if (jQuery(menu_trigger).hasClass('active')){

			jQuery(areamenu).slideUp(200,function(){
			
				jQuery(menu_trigger).removeClass("active");
			});
					
			} else {
				jQuery(areamenu).slideDown(200,function(){
					//
				});
			

				jQuery(menu_trigger).addClass("active");
			}
});

jQuery('.mobileAreaMenu a').click(function(){
	
	jQuery(areamenu).slideUp(200);
	jQuery(menu_trigger).removeClass("active");
});
});

jQuery(window).load(function(){
	"use strict";
    jQuery("a[class^='prettyPhoto']").prettyPhoto();
    //jQuery("#container-portfolio .portfolio-item").prettyPhoto();
  });

/*
jQuery(document).ready(function() {

  var isiPhone = navigator.userAgent.toLowerCase().indexOf("iphone");
  var isiPad = navigator.userAgent.toLowerCase().indexOf("ipad");
  var isiPod = navigator.userAgent.toLowerCase().indexOf("ipod");


 if(isiPhone > -1)
  {
     jQuery('.parallax').addClass('ios');

  }
  if(isiPad > -1)
  {
     
  jQuery('.parallax').addClass('ios');


  }
  if(isiPod > -1)
  {

   jQuery('.parallax').addClass('ios');

  }


});*/



/******* DUY SCRIPTS
 *
 *
 * these vars will be global.
 **/


jQuery(document).ready(function($) {
   $.subscribe('micro_layout', disable_backstretch );
     $.subscribe('mobile_layout', disable_backstretch );
     $.subscribe('tablet_layout', disable_backstretch );
     //$.subscribe('desktop_layout', enable_backstretch );  
     MWDNT.initialize();

     function disable_backstretch()
     {
         console.log("Mobile");
         $('.hp_news_section .img-container-blog').each(function(){
             
             //obj = $(this).data('backstretch');

             // $(window).off('resize.backstretch orientationchange.backstretch',obj.resize);
             //$(this).removeData('backstretch');
             $(this).find('.backstretch,img').attr('style','');
         });
     }
     
     function enable_backstretch(){
        $('.hp_news_section .img-container-blog').each(function(){
            var self = $(this);
            var img = self.find('img');
            self.backstretch(img.attr('src'));
            img.remove();
        });
     }

    $('img').imgPreload();
});
