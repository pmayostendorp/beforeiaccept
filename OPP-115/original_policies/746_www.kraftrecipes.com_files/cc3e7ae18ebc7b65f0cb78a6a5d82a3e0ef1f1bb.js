//Facebook Like custom event
if (typeof(FB) != 'undefined') {
FB.Event.subscribe('edge.create',
        function(response) {
            if (window.jQuery) {
                jQuery(window).trigger('facebookLike')
            }
        }
    );
}

//Facebook Like custom event
if (typeof(FB) != 'undefined') {
FB.Event.subscribe('message.send',
        function(response) {
            if (window.jQuery) {
                jQuery(window).trigger('facebookSend')
            }
        }
    );
}

//Twitter share custom event
if (typeof(twttr) != 'undefined') {
twttr.events.bind('tweet', function(event) {
    if (window.jQuery) {
    jQuery(window).trigger('twitterTweet')
    }
}
);
}

//Twitter follow custom event
if (typeof(twttr) != 'undefined') {
twttr.events.bind('follow', function(event) {
    if (window.jQuery) {
    jQuery(window).trigger('twitterFollow')
    }
}
);
}