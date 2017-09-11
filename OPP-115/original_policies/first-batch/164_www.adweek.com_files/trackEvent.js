; (function($) {

  <!--  Google Analytics for Click Event Tracking -->
  $(document).delegate('a.adw_gaq_trackEvent', 'click', function() {
    var href =  $(this).attr('href');
    var event = $(this).data('event').split('|');
    _gaq.push(['_trackEvent', event[0], event[1], href]);
  });

})(jQuery);