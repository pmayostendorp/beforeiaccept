var IPTScripts = IPTScripts ? IPTScripts : function () {
// private data members
var EventsInitialized = false;
var TwitterInitialized = false;

// public method members
return {
	// Front Page Calendar
	InitializeCalendarEvents: function () {
		if (EventsInitialized == false) {
			EventsInitialized = true;
			try {
				if (typeof jQuery != 'undefined') {
					jQuery(document).ready(function () {
						var adx = "Events are temporarily unavailable. Please check back later.";
						jQuery.ajax({
							dataType: 'script',
							url: 'http://209.87.171.14/EventListSyndicator.aspx?type=N&number=6&highlight=Y&adpid=6&nem=No+events+are+available+that+match+your+request&sortorder=ASC&ver=2.0&target=adx090958'
						});
						setTimeout(function () {
							if (typeof response == 'undefined') {
								jQuery('#adx090958').html(adx);
							}
						}, 5000);
					});
				} else {
					document.getElementById('adx090958').innerHTML = 'Events are temporarily unavailable because the jQuery library cannot be located.';
				}
			}
			catch (e) { }
		}
	}
, // break between functions
// Board Calendar
InitializeBoardCalendar: function () {
	if (EventsInitialized == false) {
		EventsInitialized = true;
		try {
			if (typeof jQuery != 'undefined') {
				jQuery(document).ready(function () {
					var adx="Events are temporarily unavailable. Please check back later.";
					jQuery.ajax({ dataType: 'script', url: 'http://209.87.171.14/EventListSyndicator.aspx?type=N&number=20&category=15-0&ics=Y&adpid=6&nem=No+events+are+available+that+match+your+request&sortorder=ASC&ver=2.0&target=adx091081'
				});setTimeout(function() {
					if(typeof response=='undefined'){
						jQuery('#adx091081').html(adx);
					}}, 5000);
			});
			} else { document.getElementById('adx091081').innerHTML = 'Events are temporarily unavailable because the jQuery library cannot be located.'; }
		}
		catch (e) { }
	}
}
, // break between functions
// Dr May Calendar
InitializeDrMayCalendar: function () {
	if (EventsInitialized == false) {
		EventsInitialized = true;
		try {
			if (typeof jQuery != 'undefined') {
				jQuery(document).ready(function () {
					var adx="Events are temporarily unavailable. Please check back later.";
					jQuery.ajax({ dataType: 'script', url: 'http://209.87.171.14/EventListSyndicator.aspx?type=N&number=5&category=15-0&adpid=6&nem=No+events+are+available+that+match+your+request&sortorder=ASC&ver=2.0&target=adx082707'
				});setTimeout(function() {
					if(typeof response=='undefined'){
						jQuery('#adx082707').html(adx);
					}}, 5000);
			});
			} else { 
				document.getElementById('adx082707').innerHTML = 'Events are temporarily unavailable because the jQuery library cannot be located.'; 
			}
		}
		catch (e) { }
	}
}
, // break between functions
// Dr May Twitter
InitializeDrMayTwitter: function () {
	if (TwitterInitialized == false) {
		TwitterInitialized = true;
		try {
			!function(d,s,id) {
				var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';
				if (!d.getElementById(id)) {
					js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";
					fjs.parentNode.insertBefore(js,fjs);
				}}
				(document,"script","twitter-wjs");
			}
		// }
		catch (e) { }
	}
}
, // break between functions
// Expanding List
InitializeExpandingList: function () {
	if (EventsInitialized == false) {
		EventsInitialized = true;
		try {
			$(document).ready(function () {
			// close all sections
			$(".ExpandingList ul").hide();
			// set click events for each list
			$(".ExpandingList .Heading").click(function (e) {
				$(e.target).parent().children("ul").slideToggle(500);
			});
		});
		}
		catch (e) { }
	}
}
, // break between functions
// Expanding Text
InitializeExpandingText: function () {
	if (EventsInitialized == false) {
		EventsInitialized = true;
		try {
			$(document).ready(function () {
				// close all sections
				$(".ExpandingText div").hide();
				$(".ExpandingText .Collapse").removeClass("Hidden");

				// set expand events
				$(".ExpandingText .Heading").click(function (e) {
					$(e.target).parent().children("div").slideToggle(500);
				});

				// set collapse events
				$(".ExpandingText .Collapse").click(function (e) {
					$(e.target).parent().children("div").slideToggle(500);
				});
			});
		}
		catch (e) { }
	}
}
, // break between functions
// Web Query Web Part Fix
InitializeWebQueryFix: function () {
	if (EventsInitialized == false) {
		EventsInitialized = true;
		try {
			$( document ).ready(function() {
				$( "div .groupheader" ).children().css( "background-color", "#E4E8F0" );
				$( "div .groupheader" ).children().css( "width", "80%" );
				$( "div .groupheader" ).children().css( "height", "25px" );
				$( ".groupheader  a[href]" ).css( "float", "right" );
			});
		}
		catch (e) { }
	}
}
}
// End of file
}(); 