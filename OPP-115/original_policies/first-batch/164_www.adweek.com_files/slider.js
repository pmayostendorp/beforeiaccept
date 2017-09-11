/*

	13twelve vs. jQuery

	Slider.js
	
	v3.1
	
	This wants a html structure similar to:
	
	<div class="discover">
		<ul class="slider">
		    <li>...</li>
		    <li>...</li>
		</ul>
		<ul class="paginator">
			<li class="prev"><a href="#">Prev</a></li>
			<li class="next"><a href="#">Next</a></li>
		</ul>
	</div>
	
	You can have 1 thing in a set, lots of things in a set, looping or not looping and automated or not.
	
	For looping it will add blank <li>'s to the slider list. The slider list class is up to you.
	
	It draws in paginator li's to jump to sets, to the beginning of <ul class="paginator">.
	For the current set state, it puts a class of current on the <li>.
	The paginator list needs a class of "paginator".
	
	Usage:
	
	$("#features").slider({ 
	    sliderContainer: $("#features:first"), 
        sliderInner: $("#features:first .slider"), 
        slideAmount: 755, 
        itemsVisible: 1, 
        currentSet: 1, 
        budge: 0, 
        looping: true, 
        automate: false, 
        interval: false, 
        direction: "ltr/rtl/ttb/btt",
        quickLinks: true, 
        speed: 250, 
        quickLinksChar: "roman/bull"
	});
	
	v1.0 original slider js
	v2.0 + with the capability to do right to left sites
	v3.0 + vertical sliding as well as horizontal sliding and optional quick link indicators
	v3.2 + variable speed of animation and choice of bullet style in the quicklinks

*/

(function($){
 	$.fn.extend({ 
 		slider: function(options) {
 		    // options!
            var o = $.extend({
                sliderContainer: false, // the container to all this
                sliderInner: false, // what you actually want to slide
                slideAmount: false, // how much to slide the slider by
                itemsVisible: false, // how many items you can see at one go
                currentSet: 1, // start at the begining or half way through (not full tested 28/06/10)
                budge: 0, // budge one way or another, useful for lining up with paddings/margins/spacings
                looping: false, // at the end of the sequence, stop? or go back ground
                automate: false, // auto page? if true, will set looping to true
                interval: 5, // seconds
                direction: "ltr", // ltr, rtl, ttb or btt - left to right, right to left, top to bottom, bottom to top
                quickLinks: true, // whether to show the quick link paginator indicator things
                speed: 500, // the speed of the animation, in ms
                quickLinksChar: "roman" // the type of character for the quick links
            }, options);

         	if (o.sliderContainer.length > 0 && o.sliderInner.length > 0 && o.slideAmount && o.itemsVisible) {
                // house keeping
             	var currentSliderPos = 0;
             	var paginator = o.sliderContainer.find("ul[class*=paginator]");
             	var nextBtn = paginator.find("li.next a");
             	var prevBtn = paginator.find("li.prev a");
             	var totalLi = o.sliderInner.children().length;
             	var maxSet = Math.ceil(totalLi/o.itemsVisible);
             	var reset = false; // controlled by the function for resetting the loop
             	var timer = "";
             	var hovering = false;
             	var rtl = $("html[dir='rtl']").length > 0 ? true : false;
             	// bubble
             	var sliderMoving = false;
             	//
             	// dead simple lazy load slides in
                $(window).load(function() {
                    o.sliderInner.find("img[rel]").each(function(){
                        $(this).attr("src",$(this).attr("rel")).attr("rel",""); 
                    });
                });
             	// set up
             	if (o.automate) {
             	    o.looping = true;
             	}
             	o.interval = o.interval * 1000;
             	//
             	if (o.looping && o.itemsVisible == 1 && totalLi > o.itemsVisible) {
                     o.sliderInner.find("li:first").clone().appendTo(o.sliderInner);
                     o.sliderInner.find("li:last").prev().clone().prependTo(o.sliderInner);
                     o.budge = o.budge - o.slideAmount;
             	} else if (o.looping && totalLi > o.itemsVisible) {
                 	// check the amount of LIs, make to a division of o.itemsVisible
            		// and then keep checking until it is
            		for (var i=1; i<=o.itemsVisible; i++) {
            			var isEvenTest = totalLi % o.itemsVisible;
            			if ((isEvenTest*1) > 0) {
            			    $("<li class='blank'></li>").appendTo(o.sliderInner);
            				totalLi = o.sliderInner.children().length;
            			}
            		}
                 	//
                 	var firstSet = o.sliderInner.find("li:lt("+o.itemsVisible+")");
                 	var lastSet = o.sliderInner.find("li:gt("+(totalLi-o.itemsVisible-1)+")");
                 	//
             	    firstSet.clone().appendTo(o.sliderInner).addClass("n1");
             	    lastSet.clone().prependTo(o.sliderInner).addClass("n2");
             	    o.budge = o.budge - o.slideAmount;
             	}
             	currentSliderPos = o.budge + ((o.currentSet - 1) * o.slideAmount * -1);
             	//
             	if (rtl && o.direction == "ltr") {
             	    o.direction = "rtl";
             	} else if(rtl && o.direction == "rtl") {
             	    o.direction = "ltr";
             	}     	
             	//	
             	if (o.direction == "ltr") {
                 	o.sliderInner.css({ left: currentSliderPos }); 
             	} else if (o.direction == "rtl") {
                 	o.sliderInner.css({ right: currentSliderPos });         	    
             	} else if (o.direction == "ttb") {
             	    o.sliderInner.css({ top: currentSliderPos });             	    
             	} else if (o.direction == "btt") {
             	    o.sliderInner.css({ bottom: currentSliderPos });
             	}
             	// the slider functions
             	var moveSlider = function(direction) {
             		if (!sliderMoving) {
             			calculateNextPosition(direction);
             			sliderMoving = true;
             			if (o.direction == "ltr") {
                     	    o.sliderInner.animate({
                 				left: currentSliderPos
                 			}, o.speed, function(){
                 			    if (reset) {
                 			        currentSliderPos = o.budge + ((o.currentSet-1) * o.slideAmount * -1);
                 			        o.sliderInner.css({ left: currentSliderPos });
                 			    }
                 			    sliderMoving = false;
                 			    if (!hovering) {
                 			        auto();
                 			    }
                 			});
                     	} else if (o.direction == "rtl") {
                     	    o.sliderInner.animate({
                 				right: currentSliderPos
                 			}, o.speed, function(){
                 			    if (reset) {
                 			        currentSliderPos = o.budge + ((o.currentSet-1) * o.slideAmount * -1);
                 			        o.sliderInner.css({ right: currentSliderPos });
                 			    }
                 			    sliderMoving = false;
                 			    if (!hovering) {
                 			        auto();
                 			    }
                 			});
                     	} else if (o.direction == "ttb") {
                     	    o.sliderInner.animate({
                 				top: currentSliderPos
                 			}, o.speed, function(){
                 			    if (reset) {
                 			        currentSliderPos = o.budge + ((o.currentSet-1) * o.slideAmount * -1);
                 			        o.sliderInner.css({ top: currentSliderPos });
                 			    }
                 			    sliderMoving = false;
                 			    if (!hovering) {
                 			        auto();
                 			    }
                 			});
                     	} else if (o.direction == "btt") {
                     	    o.sliderInner.animate({
                 				bottom: currentSliderPos
                 			}, o.speed, function(){
                 			    if (reset) {
                 			        currentSliderPos = o.budge + ((o.currentSet-1) * o.slideAmount * -1);
                 			        o.sliderInner.css({ bottom: currentSliderPos });
                 			    }
                 			    sliderMoving = false;
                 			    if (!hovering) {
                 			        auto();
                 			    }
                 			});
                     	}
             			updatePaginator();
             		}
             	}
             	// calculate the next position of the slider
             	var calculateNextPosition = function(direction) {
             		if(direction == 'right') {
            	        if (o.looping && o.currentSet == maxSet) {
            	            currentSliderPos -= o.slideAmount;
            	            reset = true;
            	            o.currentSet = 1;
            	        } else {
            	            currentSliderPos -= o.slideAmount;
                 			o.currentSet++;
            	        }
             		} else if (direction == 'left') {
            	        if (o.looping && o.currentSet == 1) {
            	            currentSliderPos += o.slideAmount;
            	            reset = true;
            	            o.currentSet = maxSet;
            	        } else {
            	            currentSliderPos += o.slideAmount;
                 			o.currentSet--;
            	        }
             		} else {
             		    currentSliderPos = o.budge + ((direction-1) * o.slideAmount * -1);
             		    o.currentSet = direction;
             		}
             	}

             	// update paginator links
             	var updatePaginator = function() {
             	    if (!o.looping) {
                 		if(o.currentSet == 1) {
                 			prevBtn.addClass("disabled");
                 			nextBtn.removeClass("disabled");
                 		} else if (o.currentSet == maxSet) {
                 			nextBtn.addClass("disabled");
                 			prevBtn.removeClass("disabled");
                 		} else {
                 			nextBtn.removeClass("disabled");
                 			prevBtn.removeClass("disabled");
                 		}
            	    }
            	    if (o.quickLinks) {
             		    paginator.find("li.current").removeClass("current");
             		    paginator.find("li").eq(o.currentSet-1).addClass("current");
         		    }
             	}

             	var auto = function() {
                     if (o.automate) {
                         // if we're automating..
                         clearTimeout(timer); // clear the timeout var, so it doesn't bubble itself into a mess
                         timer = setTimeout(openNext, o.interval); // set the timer again
                     }
                 }

                var openNext = function() {
                     moveSlider('right');
                 }

             	var setUpPaginator = function() {
             	    if (o.currentSet == 1 && maxSet == 1) {
             	        nextBtn.hide();
             			prevBtn.hide();
             			paginator.hide();
             	    } else {
             	        if (o.quickLinks) {
                 	        var pages = "";
                 	        for (i=0;i<maxSet;i++) {
                 	            if (o.quickLinksChar == "bull") {
                 	                pages = pages + '<li><a href="#">&bull;</a></li>';
             	                } else {
             	                    pages = pages + '<li><a href="#">'+(i+1)+'</a></li>';
             	                }
                 	        }
                 	        paginator.prepend(pages);
         	            }
             	        updatePaginator();
             	        timer = setTimeout(auto, 50); // set the automatic swap happening

             	        // add some events to the slider buttons
             	        paginator.find("li:lt("+((paginator.find("li").length)-2)+") a").click(function(e){
                     		e.preventDefault();
                     		var index = paginator.find("li a").index(this);
                     		if (index < maxSet && !$(this).parent().hasClass("current")) {
                     		    moveSlider(index+1);
                     		}
                     	});
                     	prevBtn.click(function(e){
                     		e.preventDefault();
                 		    if (o.looping) {
                     		    moveSlider('left');
             		        } else {
             		            if(!$(this).hasClass("disabled")) {
                         		    moveSlider('left');
                     		    }
                 		    }
                     	});
                     	nextBtn.click(function(e){
                     		e.preventDefault();
                 		    if (o.looping) {
                 		        moveSlider('right');
                 		    } else {
                 		        if(!$(this).hasClass("disabled")) {
                         		    moveSlider('right');
                     		    }
                 		    }
                     	});
                     	o.sliderContainer.hover(function() {
                             // if you hover over an Li, say your reading the content, it stops the automatic transition
                             clearTimeout(timer);
                             hovering = true;
                     	}, function() {
                     	    // and restarts it when you roll out
                     		auto();
                     		hovering = false;
                     	});
                    }
             	}();
            }
     	}
 	});
})(jQuery);