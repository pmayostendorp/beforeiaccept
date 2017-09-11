// load the actual image
function loadImage( $img ) {
  if ( !$img.is( 'img' ) ) {
    $img = $img.find( 'img' );
  }
  if ( $img.is( 'img' ) ) {
    if ( $img.attr( 'src' ).indexOf( 'placehold' ) != -1 ) {
      $img.attr( 'src', $img.data( 'original' ) );
    }
  }
}
/**
 * Refresh DFP ad tag
 * @param {string} dfpAdTag
 * @returns {boolean}
 */
function refreshSlot(dfpAdTag) {
  var slots = googletag.pubads().getSlots();        
  var slot = null;
  var ad = null;
  var tag = 'dfp-ad-' + dfpAdTag;
  if (slots) {
    for (var i in slots) {
      ad = slots[i].getSlotId();  
      if (tag === ad.getDomId()) {
        slot = slots[i];
        break;
      }
    }
  }
  if (slot) {
    googletag.pubads().refresh([slot]);
    return true;
  }
  return false;
}

(function($) {

Drupal.behaviors.thehill_carousel = {};
Drupal.behaviors.thehill_carousel.attach = function(context, settings) {
  settings = settings || Drupal.settings;
  
  // If no carousels exist on this part of the page, work no further. 
  if (!settings.thehill_carousel || !settings.thehill_carousel.carousels) {
    return;
  }

  $.each(settings.thehill_carousel.carousels, function(key, options) {
    var $carousel = $(key + ':not(.thehill_carousel-processed)', context);

    // If this carousel has already been processed or doesn't exist, move on.
    if (!$carousel.length) {
      return;
    }
    if( options.site_wide_view ){
      var onBefore = function( o ){
          descr.html( o.items.visible.find('.image_description').clone() );
          credits.html( o.items.visible.find('.image_credits').clone() );
          pagerTitle.html( o.items.visible.find('.navigation').clone() );
        }
        ,onCreate   = function( o ){
          loadImage( o.items.next() );
          descr.html( o.items.find('.image_description').clone() );
          credits.html( o.items.find('.image_credits').clone() );
          pagerTitle.html( o.items.find('.navigation').clone() );
        }
        ,sidebar    = $('<aside class="gallery-sidebar"/>')
        ,descr      = $('<div class="image-description"/>')
        ,pager      = $('<div class="gallery-pager"/>')
        ,prev       = $('<div class="gallery-nav-prev"/>')
        ,next       = $('<div class="gallery-nav-next"/>')
        ,pagerItems = $('<div class="gallery-pager-items"/>')
        ,pagerTitle = $('<div class="gallery-pager-title"/>')
        ,clearer    = $('<div class="clearer"/>')
        ,credits     = $('<div class="credits"/>')
        
      pagerItems.append(prev,next);
      sidebar.append(  descr,  pager.append(  pagerItems, pagerTitle),  clearer);
      $('.view-gallery .view-content').append(sidebar,clearer,credits,clearer.clone());
      options.scroll = options.scroll || {};
      options.scroll.onBefore = options.scroll.onBefore || onBefore;
      options.scroll.onAfter = function(o) {
         loadImage( o.items.old.prev() );
         loadImage( o.items.visible.next() );
         refreshSlot(Drupal.settings.gallery_tag);         
      }; 
      options.onCreate = options.onCreate || onCreate; 
      options.prev = {
          button      : prev,
          key         : "left"
      };
      options.next = {
          button      : next,
          key         : "right"
      };
    }
    if (options.mostpopular) {
      options.scroll = options.scroll || {};
      options.scroll.onAfter = function(){
        refreshSlot(Drupal.settings.thehill_mostpopular.tag);
      };
    }
    // Initialize the jcarousel.
    $carousel.addClass('thehill_carousel-processed').carouFredSel(options);
  });
};
})(jQuery);


