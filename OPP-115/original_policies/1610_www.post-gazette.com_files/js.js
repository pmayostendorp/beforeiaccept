function navmenu() {
	$("#subnav").load("/ajax?code=subnav", function() {
		$(".navhover").hoverIntent(
			function(){
				var menuitems = $(this).attr("rel");
				var submenuitems = $(".mainsubnavsection").filter("[rel=" + menuitems + "]");
				if ( !!this ) {
					$(".menu-arrow").fadeOut();
					$(".mainsubnavsection").filter("[rel!="+menuitems+"]").hide();
				}
				$("#ql").zIndex(0);
				$(this).find(".menu-arrow").fadeIn();
				submenuitems.css("height","200px").fadeIn();
			},
			function(){}
		);
	});

	/* ORIGINAL NON-AJAX VERSION, commented out by Adam. See new version above.
	$(".navhover").hoverIntent(
		function(){
			var menuitems = $(this).attr("rel");
			var submenuitems = $(".mainsubnavsection").filter("[rel=" + menuitems + "]");
			
			if ( !!this ) {
				$(".menu-arrow").fadeOut();
				$(".mainsubnavsection").filter("[rel!="+menuitems+"]").hide();
			}
			$("#ql").zIndex(0);
			$(this).find(".menu-arrow").fadeIn();
			submenuitems.css("height","200px").fadeIn();
		},
		function(){}
	); */
	
	$("#mainmenu").mouseleave(
		function(){
			$(".menu-arrow").fadeOut(400);
			$(".mainsubnavsection").slideUp(400).promise().done(function(){			
				$("#ql").zIndex(150);
				});
	}); 
	$(".closebox").click(function(){
		$("#ql").zIndex(150);
			$(".mainsubnavsection").slideUp('slow');
		});
}	

function storygallery(){
	// We only want these styles applied when javascript is enabled
	$('div.navigation').css({'width' : '100%', 'float' : 'left'});
	$('div.content').css('display', 'block');
	
				// Initially set opacity on thumbs and add
				// additional styling for hover effect on thumbs
				var onMouseOutOpacity = 0.67;
				$('#thumbs ul.thumbs li').opacityrollover({
					mouseOutOpacity:   onMouseOutOpacity,
					mouseOverOpacity:  1.0,
					fadeSpeed:         'fast',
					exemptionSelector: '.selected'
				});
				
	
					
		// Initialize Minimal Galleriffic Gallery
		$('#thumbs').galleriffic({
			imageContainerSel:      '#slideshow',
			controlsContainerSel:   '#controls',
			captionContainerSel:    '#slides',
			renderNavControls:         true,
			preloadAhead:              1,
			onSlideChange:             function(prevIndex, nextIndex) {
						               this.find('ul.thumbs').children()
							          .eq(prevIndex).fadeTo('fast', onMouseOutOpacity).end()
							          .eq(nextIndex).fadeTo('fast', 1.0);
					                  },
		    onPageTransitionOut:      function(callback) {
						              this.fadeTo('fast', 0.0, callback);
					                  },
			onPageTransitionIn:       function() {
						              this.fadeTo('fast', 1.0);
					                  }
		});
		$('#gallery').hover(
			function(){
				$("#controls").fadeIn();
			},
			function(){
				$("#controls").fadeOut();
			});
		/*
		$('.controls').click(function(){
			console.log('click');
			$('.fancybox').trigger('click');
		});
		*/
		$('#controls').mousedown(function(event){
			var target = event.target;
			if ( $(target).attr('class') === 'controls' ){ 
				//if target class name not prev or next for the control buttons
				// trigger the fancybox to fire
				$('.fancybox').trigger('click');
			}
		});
		$('.fancybox').fancybox();
}
// Google+
(function() {
    var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
    po.src = 'https://apis.google.com/js/plusone.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
})();

// Newsletter Signup
function focusLetterEmail(thisBox) {
	if(thisBox.value==thisBox.defaultValue) {
		thisBox.value="";
		thisBox.style.fontStyle="normal";
	}
}
function blurLetterEmail(thisBox) {
	if(thisBox.value=="") {
		thisBox.value=thisBox.defaultValue;
		thisBox.style.fontStyle="italic";
	}
}

/* Moving Boxes */
function dragAndDrop(){
	var nh1 = $('.nh1').children('.position').length;
	var nh2 = $('.nh2').children('.position').length;
	var nh3 = $('.nh3').children('.position').length;
	
	$(".newsbox685").css('background',"white");
	
	// Makes the boxes sortable
	$(".newsframe_sort").sortable({
		items: '.newsbox685',
		connectWith: '.newsframe_sort',
		opacity: 0.8,
		handle : ".boxhead",
		tolerance: 'pointer',
		cursorAt: { top: 0, left: 25 },
		placeholder: 'place_holder',
		stop: function(){ 
			verifyOrder(nh1,nh2,nh3);
			showCommitBar();
		},
		sort: function(e,ui){
			$(ui.placeholder).html("<h2>Drop Here</h2>");
		}
	});
	
	$('#commit_btn').click(function(){
		commit();
	});
	
	function showCommitBar(){		
		if ($("#sort-commit").is(":hidden")){
			$("#sort-commit").prependTo("body").slideDown("slow");
			$("body").offset({ top: 80});
		} else {
			// already visible
		}
	}
	
	function commit(){
		var items = [];
		$(".newsframe_sort").find(".newsbox685").each(function (index, value) {
		   var item = { "id": $(value).attr('id'), "index": index.toString() };
		   items.push(item);
		});

		var stringifiedItems = JSON.stringify(items);
		$.ajax({
			type: "POST",
			url: "/sectionsave/",
			data: { data: stringifiedItems, section: libercusCurrentSectionID}
		}).done(function( msg ) {
			// alert( "Data Saved: " + msg );
		});
		
		$("#sort-commit").slideUp("slow");
		$("body").offset({top: -80});		
	}
	
	function verifyOrder(x,y,z){
		function checkNH1(x){
			var nh1 = $('.nh1').children('.position').length;
			if (nh1 != x){
				if (nh1 > x){
					$('.nh1 .position:last').prependTo('.nh2');
				}
				if (nh1 < x){
					$('.nh2 .position:first').appendTo('.nh1');
				}
				return false;			
			}else{
				return true;
			}
		}
		
		function checkNH2(y){
			var nh2 = $('.nh2').children('.position').length;
			if (nh2 != y){ 
				if (nh2 > y){			
					$('.nh2 .position:last').prependTo($('.nh3'));
				}
				if (nh2 < y){
					$('.nh3 .position:first').appendTo($('.nh2'));
				}
				return false;
			}else{	
				return true;
			}
		}
		
		function checkNH3(z){
			var nh3 = $('.nh3').children('.position').length;
			if (nh3 != z){ 
				return false;
			}else{
				return true;
			}
		}
		
		var check1 = checkNH1(x);
		var check2 = checkNH2(y);
		var check3 = checkNH3(z);
	}
}

/* Checks for admin login and enables moving boxes */
function dnd() {
	$("#dnd").load("/ajax/?code=dnd");
}

function pageInit() {
	//$("#subnav").load("/ajax?code=subnav");
	$("#fpap").load("/ajax?code=fpap");
	$("#awcurrent").load("/ajax?code=awcurrent",function(response,status,xhr){ 
		if(status=="success"){
			$("#weather #weather-data .temp").text($("#awcurrent .weathertemp").text()); 
			$("#awcurrent .weathertemp").hide();}
	});  //NATE EDIT - ADDED CALLBACK
	$("#deal250").load("/ajax?code=pgdeals&size=250");
	$("#deal100").load("/ajax?code=pgdeals&size=100");
	
	dnd();
	
	$("#clickme").click(function () {
		libercus.AjaxDialog("Login", "/ajax?Code=LoginDialog");
	});
	
	$("#rotator").tabs({fx:{opacity: "toggle"}}).tabs("rotate", 4000);
	$(".button").button({});
	
	if ($("#storygallery").length) {
		storygallery();
	}
	
	$(".inlineVid").fancybox({
		'overlayShow'	: true,
		'transitionIn'	: 'elastic',
		'transitionOut'	: 'elastic',
		'type'			: 'inline',
		'z-index'		: 100000,
		'width'			: 650,
		'height'		: 366,
		'padding'		: 0,
		'scrolling'		: 'no',
		'overlayOpacity': .8,
		'overlayColor'	: '#000000',
		'centerOnScroll': true
	});

	var obitCount = $("#obitsbox .page").length;
	
	$("#obits").paginate({
		count					: obitCount,
		start					: 1,
		display     			: 4,
		border					: true,
		border_color			: '#fff',
		text_color				: '#fff',
		background_color		: '#cecece',
		border_hover_color		: '#fff',
		text_hover_color		: '#fff',
		background_hover_color	: '#b4b4b4',
		images					: false,
		mouse					: 'press',
		onChange				: function(page){
									$('._current','#obitsbox').removeClass('_current').hide();
									$('#p'+page).addClass('_current').show();
								}
	});

	// Font Size Widget
	$('.fontBox a.small, .fontBox a.medium, .fontBox a.large').click(function(event) {
        event.preventDefault();
        $('.fontBox a.small, .fontBox a.medium, .fontBox a.large').removeClass('selected');
        $(this).addClass('selected');

        var className = '';

        if ($(this).hasClass('small')) {
            className = 'smallstory';
        }
        else if ($(this).hasClass('medium')) {
            className = '';
        }
        else if ($(this).hasClass('large')) {
            className = 'largestory';
        }
		
        $('#storyBody > p').removeClass('smallstory').removeClass('largestory').addClass(className);
    });
	
	navmenu();
	
	// Current Page in Menu
	var othersections = $("#topnav").find('li').addClass("othersections");
	var hasothersections = $("#topnav").find('.othersections').find('li').removeClass('othersections');
	var currentsection = $("#topnav").find('.currentpage').addClass("currentsection").removeClass("othersections");
	var hascurrentsection = $(".currentpage").find('ul');
	othersections;
	hasothersections;
	currentsection;
	hascurrentsection.show();
	hascurrentsection.find('li').removeClass("othersections");
	$("#topnav").find('.othersections')
		.hover(
			function() {
				$(this).find('ul').show();
				$(".currentpage").find('ul').hide();
				},
			function() {
				$(this).find('ul').hide();
				$(".currentpage").find('ul').show();
				}
		);

	/* Light Switcher */
	var docHeight = $(document).height();
	$("#shadow").show().css("height", docHeight).fadeTo("slow",.9).hide();
	
	$(".lightSwitcher").click(function(){
		$("#shadow").toggle();
		if ($("#shadow").is(":hidden")){
			$(this).html('<div class="bulbs"></div><div class="bulbtxt">Turn off the lights</div>').removeClass("turnedOff");
			$(".bulbs").removeClass("turnedOff");
		}else{
			$(this).html('<div class="bulbs" style="background-position:0 0;"></div><div class="bulbtxt">Turn on the lights</div>').addClass("turnedOff");
			$(".bulbs").addClass("turnedOff");
		}
	});
}
