/*
// code for the carousel functionality
//*/
;(function(jQuery){
    //alert('hi');
	var msMyCarousel = function(element, opt) {
		var jQuerythis = this;
	    //debugger;
		var settings = jQuery.extend({
							scrollSpeed:400,
							autoSlide:0,
							defaultid:0,
							width:515,
							blockWidth:'auto',
							height:258,
							vertical:false,
							boxClass:'.set',
							messageClass:'.message',
							showMessage:false,
							messageOpacity:0.8,
							loop:false,
							callback:''
							}, opt);	  
		var suffixed = {id:'msc'};
		var carouselProp = new Object();
		var elementid = jQuery(element).attr("id");		
		var childid = elementid + "_mscchild";
		var unquieClass = elementid + "_mscss";
		var intervalid = 0;
		carouselProp.moveToZero = 0;
		var init = function() {
			makeLayout();
		};
		var makeLayout = function () {
			addScrollerDiv();
		};
		var addScrollerDiv = function() {
			//alert("elementid"+elementid)
			jQuery("#"+elementid).addClass("mscarousel");
			if(settings.vertical===false) {
				if(settings.boxClass!='.set') jQuery("#"+elementid + " >"+settings.boxClass).addClass("set");
			};
			jQuery("#"+elementid + " >"+settings.boxClass).addClass(unquieClass);
			var sDiv = '<div class="child" id="'+childid+'"></div>';
			jQuery("#"+elementid).append(sDiv);
			//alert("settings.width " +settings.width);
			jQuery("#"+elementid).css({width:settings.width+'px', height:settings.height+'px', overflow:'hidden',  position:'relative'});
			jQuery("#"+sDiv).css({width:settings.width+'px', height:settings.height+'px', overflow:'hidden'});
			//jQuery("#"+elementid + " > ."+settings.boxClass).css({position:'absolute', float:'left'});
			if(settings.showMessage===true) {
				jQuery("#"+elementid + "  "+settings.messageClass).css({display:'none', width:settings.width+'px', opacity:settings.messageOpacity});
			};
			//alert("allEl`ements "+allElements)
			//insert intro scroller div
			jQuery("#"+elementid + "  >."+unquieClass).appendTo(jQuery("#"+childid));
			jQuery("#"+childid).append("<strong class='clear last'></strong>");
			var allElements = jQuery("#"+childid + " >."+unquieClass);
			//update carouselProp
			carouselProp.allElements = allElements;

			//next previous
			
			var prop = calculateWidthHeight();
			//if horizontal
			if(settings.vertical===false) {
				jQuery("#"+childid).css({width:prop.width+'px'});
			} else {
				//if vertical
				jQuery("#"+childid).css({height:prop.height+'px'});
			};
			setClasses();
			if(settings.autoSlide>0) {
				startInterval();
				carouselProp.isPlaying = true;
			};
			if(settings.defaultid > 0) {
                 //alert(settings.defaultid);            
				settings.defaultid = settings.defaultid-1;                
				next();
			} else if(settings.defaultid == 0) {
                //alert(settings.defaultid);
				settings.defaultid = -1;                
				next();
			};
		};
		var setClasses = function() {
			//will do something later on this method
			var allElements = jQuery("#"+childid + "  >."+unquieClass);
			if(settings.vertical===false) {
				if(settings.boxclass!='.set') jQuery("#"+childid + "  "+settings.boxclass).addClass("set");
			};
			//set identifier class
			for(var iCount=0;iCount<allElements.length; iCount++) {
				jQuery(allElements[iCount]).addClass(elementid+suffixed.id+"_"+iCount);
			};			
			allElements = jQuery("#"+childid + "  >."+unquieClass);
			carouselProp.allElements = allElements;
		};						
		var next = function(isNext) {
		   // debugger;
			if(isNext===undefined) {
				if(settings.defaultid + 6 < carouselProp.allElements.length) {
					settings.defaultid++;
				}; 
				if((settings.defaultid==carouselProp.allElements.length || carouselProp.moveToZero>=2) && settings.loop==true) {
//					settings.defaultid = 0;
//					carouselProp.moveToZero = 0;
				} else if(settings.loop==false && (settings.defaultid==carouselProp.allElements.length)) {
                    //alert(settings.defaultid);
					settings.defaultid--;
				};
			}; 
			if(isNext=='fromGoto') {
				//i'll do something later
			};
			if(settings.defaultid + 5 < carouselProp.allElements.length) {
				if(carouselProp.currentItem!==undefined) {
					carouselProp.previousItem = carouselProp.currentItem;
				};
				carouselProp.currentItem = childid + " > ."+elementid+suffixed.id+"_"+settings.defaultid;
				var pos = jQuery("#"+carouselProp.currentItem).position();
				var tempw = jQuery("#"+elementid).position().left + jQuery("#"+carouselProp.currentItem).width();
				carouselProp.moveH = "-"+(pos.left)+"px";
				var pb = 0;
				var mb = 0;
				if(jQuery("#"+carouselProp.currentItem).css("padding-bottom") != 'auto') {
					pb = parseInt(jQuery("#"+carouselProp.currentItem).css("padding-bottom"));
				};
				if(jQuery("#"+carouselProp.currentItem).css("margin-bottom") != 'auto') {
					mb = parseInt(jQuery("#"+carouselProp.currentItem).css("margin-bottom"));
				};				
				var vSpacer = pb + mb;
				carouselProp.moveV = "-"+(pos.top+vSpacer)+"px";
				carouselProp.currentID = settings.defaultid;
				scrollContent();
				if(settings.defaultid == carouselProp.allElements.length) {
					settings.defaultid = 0;
				};
			};					
		};
		var previous = function() {
		    //alert(settings.defaultid);
			if(settings.defaultid>0) {
				carouselProp.moveToZero = 0;
                //alert(settings.defaultid);
				settings.defaultid--;
				next("fromGoto");
			};
		};
		var afterScroll = function(evt) {
		    //alert(settings.defaultid);
			//scroll message
			if(jQuery("#"+carouselProp.currentItem+" "+settings.messageClass).length>0 && settings.showMessage==true) {
				jQuery("#"+carouselProp.currentItem+" "+settings.messageClass).fadeIn("slow", function() {
					jQuery(this).css({opacity:settings.messageOpacity})
				});
			};
			//call back
			//alert("after scroll settings.callback "+settings.callback);
			if(settings.callback!='') {
				eval(settings.callback)(jQuerythis);
			};
			var lft = jQuery("#"+childid).css("left");
			var lastItem = jQuery(carouselProp.allElements[carouselProp.allElements.length-1]).position();
			if((lastItem.left - Math.abs(lft.substr(0, lft.length-2))) < settings.width) {
				carouselProp.moveToZero++;
				if(carouselProp.moveToZero>=2 || settings.defaultid==carouselProp.allElements.length-1) {
					carouselProp.moveToZero = 0;
				};
			};
		};
		var scrollContent = function() {
		    //alert(settings.defaultid);
		    if (carouselProp.previousItem != undefined && settings.showMessage == true) {
		        jQuery("#" + carouselProp.previousItem + " " + settings.messageClass).fadeOut("slow");
		    };
		    if (settings.vertical === false) {
		        //scroll horizontal
		        jQuery("#" + childid).animate({ "left": carouselProp.moveH }, settings.scrollSpeed, function(evt)
		        {
		            //afterScroll(evt);
		        });
		    };
		}
	    var calculateWidthHeight = function() {
			var prop = new Object();
			prop.width = 0;
			prop.height = 0;			
			var allElements = jQuery("#"+childid + " >"+settings.boxClass);
			if(settings.vertical === false) {
				//what is this?
				//I can calcuate by count :P
				//but i dont want to have fix width for each slide
				//alert("childid " +childid +" : " +settings.blockWidth)
				if(settings.blockWidth == 'auto') {
					for(var iCount=0;iCount<allElements.length; iCount++) {
						//console.debug("childid " +childid + " : " +jQuery(allElements[iCount]).width() + " : "+jQuery(allElements[iCount]).css("width"))
						prop.width += jQuery(allElements[iCount]).width();
						prop.height += jQuery(allElements[iCount]).height();//incase of vertical
						//jQuery(allElements[iCount]).addClass(elementid+suffixed.id+"_"+iCount);
					};
					//add spacer
					//prop.width += (jQuery(allElements[allElements.length-1]).width()*2);
					//prop.width += 20;
				} else {
					prop.width = settings.blockWidth*allElements.length;
					prop.height = settings.height*allElements.length;
				};
				//alert("1 elementid "+elementid+ " width " +prop.width)
				prop.width += (jQuery("#"+elementid).width()*2);
			} else {
				prop.width = settings.width;
				prop.height = settings.height*allElements.length;				
			};
			return prop;
		};
		var startInterval = function() {
		    alert(intervalid);
			clearInterval(intervalid);
			intervalid = setInterval(function(){
													 next();
													 }, settings.autoSlide);
			//alert(elementid);
			jQuery("#"+elementid).bind("mouseover", function(arg) {
														jQuery("#"+elementid).unbind("mouseout");
													   endInterval();
													   carouselProp.isPlaying = false;
													   });
			carouselProp.isPlaying = true;
			
		};
		var endInterval = function() {
		    alert(intervalid);
			clearInterval(intervalid);
			jQuery("#"+elementid).unbind("mouseover");
			jQuery("#"+elementid).bind("mouseout", function(arg) {
													   startInterval();
													   });
			carouselProp.isPlaying = false;
		};
		
	    this.forceScroll = function(pos) {
				jQuery("#"+childid).animate({"left":pos}, settings.scrollSpeed, function(evt) 
				{
				   afterScroll(evt);
				});
		};
	    
		this.play = function() {
			if(settings.autoSlide>0) {
				startInterval();
			};
		};
		this.pause = function() {
			if(settings.autoSlide>0) {
				endInterval();
			};
		};
		this.next = function() {
			if(settings.defaultid == 0) {
				carouselProp.moveToZero = 0;
			}						
			if(settings.autoSlide>0) {endInterval()};
			next();
		};
		this.goto = function(no, force) {
			//console.debug(elementid +" no "+no + " carouselProp.moveToZero "+carouselProp.moveToZero)
			//|| no==carouselProp.allElements.length-1
			if(no == 0) {
				carouselProp.moveToZero = 0;
			}
			if(no>carouselProp.allElements.length-1) {
				
			} else {
				settings.defaultid = no;
				next("fromGoto");
			};
		};				
		this.previous = function() {
			if(settings.defaultid == 0) {
				carouselProp.moveToZero = 0;
			};						
			if(settings.autoSlide>0) {endInterval()};
			previous();
		};
		this.getCurrentID = function() {
			return settings.defaultid;
		};
		this.item = function(i) {
			if(i==undefined) {
				return carouselProp.allElements;
			} else {
				return carouselProp.allElements[i];
			};
		};		
		//init
		init();		
	};
	//now make object
	jQuery.fn.msCarousel = function(opt) {
		return this.each(function() {
								  var element = jQuery(this);
								  var myplugin = new msMyCarousel(element, opt);
								  element.data("msCarousel", myplugin);
								  });
	}
})(jQuery);