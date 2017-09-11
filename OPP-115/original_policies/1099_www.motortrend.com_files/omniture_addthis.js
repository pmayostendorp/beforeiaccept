var addThisExitTracking = addThisExitTracking || {};
(function(add, $) {
    "use strict";
    /*
    * Used to help prime follow hover/blur tracking setEventsFollow
    * */
    add.hoverTracker = '';
    /*
    * Used to help prime follow hover/blur tracking setEventsFollow
    * */
    add.hoverTrackerType = '';
    /*
    * Events related to tracking shares
    * */
    add.setEventsShare = function() {
    /*
    * Facebook
    * */
    		$('.addthis_button_facebook').live('click',
			{
			    tracker: 'oShare',
			    trackerType: 'Facebook|click'
			},
			this.oTrack
		);    
    /*
    * Twitter
    * */
    $('.addthis_button_twitter').live('click',
			{
			    tracker: 'oShare',
			    trackerType: 'Twitter|click'
			},
			this.oTrack
		);
		
    /*
    * Google+
    * */
			$('.addthis_button_google_plusone_share').live('click',
			{
			    tracker: 'oShare',
			    trackerType: 'Google+|click'
			},
			this.oTrack
		);
     /*
     * Pintrist
     * */
	      $('.addthis_button_pinterest_share').live('click',
			{
			    tracker: 'oShare',
			    trackerType: 'Pinterest|click'
			},
			this.oTrack
		);
	 /*
	* Add This View More Services
	* */
	     $('.addthis_button_expanded').live('click',			
			{
			    tracker: 'oShare',
			    trackerType: 'AddThisViewMoreServices|click'
			},
			this.oTrack
		); 		
	 /*
     * Add This Attic
     * Attic- is found under the addthis social media block after a user clicks their orange plus sign button, revealing more options.
     * */

       $('#atic_facebook').live('click',
			{
			    tracker: 'oShare',
			    trackerType: 'Attic-Facebook|click'
			},
			this.oTrack
		);
			$('#atic_twitter').live('click',
			{
			    tracker: 'oShare',
			    trackerType: 'Attic-Twitter|click'
			},
			this.oTrack
		);
			$('#atic_print').live('click',
			{
			    tracker: 'oShare',
			    trackerType: 'Attic-Print|click'
			},
			this.oTrack
		);
			$('#atic_gmail').live('click',
			{
			    tracker: 'oShare',
			    trackerType: 'Attic-Gmail|click'
			},
			this.oTrack
		);
			$('#atic_stumbleupon').live('click',
			{
			    tracker: 'oShare',
			    trackerType: 'Attic-StumbleUpon|click'
			},
			this.oTrack
		);
			$('#atic_favorites').live('click',
			{
			    tracker: 'oShare',
			    trackerType: 'Attic-Favorites|click'
			},
			this.oTrack
		);
			$('#atic_blogger').live('click',
			{
			    tracker: 'oShare',
			    trackerType: 'Attic-Blogger|click'
			},
			this.oTrack
		);
			$('#atic_tumblr').live('click',
			{
			    tracker: 'oShare',
			    trackerType: 'Attic-Tumblr|click'
			},
			this.oTrack
		);
			$('#atic_google').live('click',
			{
			    tracker: 'oShare',
			    trackerType: 'Attic-Google|click'
			},
			this.oTrack
		);
			$('#atic_more').live('click',
			{
			    tracker: 'oShare',
			    trackerType: 'Attic-AddThisViewMoreServices|click'
			},
			this.oTrack
		);
        
    };
    /*
    * Events related to tracking follows
    * */
    add.setEventsFollow = function() {
    /*
    * Facebook
    * */
    $('.addthis_button_facebook_like').live('mouseover mouseout',			
			{
			    tracker: 'oFollow',
			    trackerType: 'Facebook|mouseover'
			},
			this.oFollowPrime
		);
    /*
    * Twitter
    * */
			$('.addthis_button_tweet').live('mouseover mouseout',
			{
			    tracker: 'oFollow',
			    trackerType: 'Tweet|mouseover'
			},
			this.oFollowPrime
		);
    /*
    * Google+
    * */
			$('.addthis_button_google_plusone').live('mouseover mouseout',
			{
			    tracker: 'oFollow',
			    trackerType: 'Google+|mouseover'
			},
			this.oFollowPrime
		);
    /*
    * Pinterest
    * */
			$('.addthis_button_pinterest').live('mouseover mouseout',
			{
			    tracker: 'oFollow',
			    trackerType: 'Pinterest|mouseover'
			},
			this.oFollowPrime
		);

    /*
    * Trigger Submit
    * */
			$('body').live('blur', this.oFollowSubmit);
    };
    /*
    * Basic Track, wraps omnitureTrackInner
    * */
    add.oTrack = function(event) {
        //debugger;
        if (typeof (omnitureTrackInner) == typeof (Function)) {
            omnitureTrackInner(event.data.tracker, event.data.trackerType);
        } else {
            console.log('omnitureTrackInner !== Function');
        }
    };
    /*
    * Prime flags set when an iframe is mouseovered
    * */
    add.oFollowPrime = function(event) {
        /*
        * Prime/set flags on mouse over. Unset/Reset on mouse out.
        * */
        if (event.type == 'mouseover') {
            add.hoverTracker = event.data.tracker;
            add.hoverTrackerType = event.data.trackerType;
            $(window).focus(); // To help blur ?
        } else {
            add.hoverTracker = '';
            add.hoverTrackerType = '';
        }
    };
    /*
    * Track last mouseovered iframe if flags are set
    * */
    add.oFollowSubmit = function(event) {
        /*
        * If the flags have been primed submit;
        * */
    //debugger;
        if (add.hoverTracker.length > 0 && add.hoverTrackerType.length > 0) {
            if (typeof (omnitureTrackInner) == typeof (Function)) {
                omnitureTrackInner(add.hoverTracker, add.hoverTrackerType + '|blur');
            } else {
                console.log('omnitureTrackInner !== Function');
            }
        }
    };
    add.docReady = function() {
        this.setEventsShare();
        this.setEventsFollow();
    };
    /*
    * Doc Ready
    * */
    $(function() {
        add.docReady();
    });
})(addThisExitTracking, jQuery);