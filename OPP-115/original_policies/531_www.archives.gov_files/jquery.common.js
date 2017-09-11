/**
* Store any commonly-used jQuery plugins in this file
*/


/****************************************************************
* jQuery plugin that adds or removes a class to an element on hover
*/
$.fn.hoverClass = function(c) { 
	return this.each(function(){ 
		$(this).hover( 
			function() { $(this).addClass(c);  },
			function() { $(this).removeClass(c); }
		);
	});
};


/****************************************************************
* jQuery pause() plug-in (only works on built-in jquery effects)
*/
$.fn.pause = function(milli,type) {
	milli = milli || 1000;
	type = type || "fx";
	return this.queue(type,function(){
		var self = this;
		setTimeout(function(){
			$.dequeue(self);
		},milli);
	});
};
$.fn.clearQueue = $.fn.unpause = function(type) {
	return this.each(function(){
		type = type || "fx";
		if(this.queue && this.queue[type]) {
			this.queue[type].length = 0;
		}
	});
};




/*******************************************************************************
 *******************************************************************************
 *************** begin common jquery behaviors and event actions ***************
 *******************************************************************************
 *******************************************************************************/
$(document).ready( function() {

// This variable is used to determine whether the user's mouse is hovering over the search form or not
var oversearchform = false;
// function used to show or hide the search options panel
var toggleSearchOptions = function() {
	if (sectionSearchOn) {
		if (oversearchform == false) {
			$("#searchOptions").hide();
		} else {
			$("#searchOptions").show();
		}
	}
}
// Add the event handlers to the site search form elements
$("#searchOptions, #searchOption1, #searchOption2, #searchOption3, #searchSubmitBtn, #qtHolder, #qt").hover( function() { oversearchform=true; }, function() { oversearchform=false; } );
$("#qt").focus(toggleSearchOptions);
$("#qt, #qp1, #qp2, #searchSubmitBtn, #searchOptions").blur(toggleSearchOptions);
$("#searchSubmitBtn").click( function() { document.search.submit(); return false; });


// add event handler to drop-down "jump menus"
$("select.jumpMenu").change( function() { if ($(this).val() != "#") { top.location.href = $(this).val(); } });




}); // end $(document).ready()
/*******************************************************************************
 *******************************************************************************
 **************** end common jquery behaviors and event actions ****************
 *******************************************************************************
 *******************************************************************************/


// these do-nothing functions are merely defined to avoid errors in case they are called by a Flash movie (namely: slideshow.swf)
function flashGetHref() { void(null); }
function flashPutHref(href) { void(null); }
function flashGetTitle() { void(null); }
function flashPutTitle(title) { void(null); }

