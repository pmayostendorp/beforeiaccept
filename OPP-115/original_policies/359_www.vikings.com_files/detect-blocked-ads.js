//detect if there is an adblock cookie set (has this test been performed before?)
//if not perform the test and save the cookie

$nflcs.detectBlockedAds = function() {
    if($nflcs.cookie('adblocker') == null) {
        $nflcs('body').append('<div id="adblock-notice">We noticed that you may have an Ad Blocker turned on. Please be aware that our site is best experienced with Ad Blockers turned off. <a href="javascript:void(0);" class="close">[X]</a> <div style="clear:both;"></div></div>');
        $nflcs('body').append('<div id="adblock-test" class="bannerAd">This is a test banner</div>');

        $nflcs('#adblock-notice a').click(function(e) {
            $(this).parent().fadeOut('fast');
        });

        if((typeof($nflcs('#adblock-test').css('-moz-binding')) != 'undefined' && $nflcs('#adblock-test').css('-moz-binding').indexOf('elemhidehit') !== -1) || ($nflcs('#adblock-test').css('display') == 'none')) {//adblocker in use
            $nflcs('#adblock-notice').fadeIn('fast');//show the adblock notice
            $nflcs.cookie('adblocker',true,{expires: 3});//save that this test has been performed for 3 days max
        }
        else {//adblocker not in use
            $nflcs.cookie('adblocker',false,{expires: 3});

        }
        $nflcs('#adblock-test').remove();
    }
}
