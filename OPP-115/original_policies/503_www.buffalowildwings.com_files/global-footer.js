!function( $, app, modernizr ){
  var fakeTextShadowSelection

  // Sitewide debugging
  // TODO, this should still collect logs in an array.
  // Debugging should be set to 0 for production.
  app._debug = 1
  
  if( !app._debug ) { 
    console.log = $.noop
  }

  // Initialize breakpoints for template modules
  if( app.HeroSlideshow || app.SaucySlider ) {

    $(window).load(function(){

      // Sadly, the timeout seems to help.
      setTimeout(docReady, 100)
    })
  } else {

    // jQuery docReady has been inconsistent in old IE
    if( !app.Core.isOldIE ) {
      $(docReady)

    } else {
      docReady()
    }
  }

  function docReady() {
    var svgFallbackStylesheet

    app.ResponsiveBreakpoints.trigger_event() 

    $('input, textarea').placeholder()

    waitForFB()

    function waitForFB() {
      if( typeof FB == 'undefined' ) setTimeout(function() { waitForFB() }, 250)
      else trackFacebook()
    }

    function trackFacebook() {
      FB.Event.subscribe('edge.create',
        function(response) {
          $('#connectFacebook').trigger('send-analytics')
        }
      )
    }

    /////////////////////////////////
    // Functions supplied by DoubleClick
    /////////////////////////////////

    $('#myBDubs').on('click.double-click', '.store-detail-link', trackStoreDetail)
    $('#myBDubs').on('click.double-click', '#getDirections', trackGetDirections)
    $('#myBDubs').on('click.double-click', '#orderOnline', trackOrderOnline)
    
    $('#bwwHeadLocator').on('click.double-click', '#findABDubsLabel', trackFindBdubs)
    $('#bwwHeadLocator').on('click.double-click', '#findABDubsSubmit', trackFindBdubs)
    
    $('.social-bar').on('click.double-click', '.facebook', trackFacebook)
    $('.social-bar').on('click.double-click', '.twitter', trackTwitter)
    $('.social-bar').on('click.double-click', '.youtube', trackYoutube)

    function trackStoreDetail() {
     var click1 = new Image(); 
     var axel = Math.random() + ""; 
     var ord = axel * 1000000000000000000; 
     click1.src = 
    'http://ad.doubleclick.net/activity;src=3300547;type=nearb303;cat=buffa850;ord='+ ord + '?'; 
    }

    function trackGetDirections() {
     var click1 = new Image(); 
     var axel = Math.random() + ""; 
     var ord = axel * 1000000000000000000; 
     click1.src = 
    'http://ad.doubleclick.net/activity;src=3300547;type=getdi481;cat=buffa503;ord='+ ord + '?'; 
    }

    function trackOrderOnline() {
     var click1 = new Image(); 
     var axel = Math.random() + ""; 
     var ord = axel * 1000000000000000000; 
     click1.src = 
  'http://ad.doubleclick.net/activity;src=3300547;type=order520;cat=buffa916;ord='+ ord + '?'; 
    }
    
    function trackFindBdubs() {
     var click1 = new Image(); 
     var axel = Math.random() + ""; 
     var ord = axel * 1000000000000000000; 
     click1.src = 
  'http://ad.doubleclick.net/activity;src=3300547;type=finda945;cat=buffa552;ord='+ ord + '?'; 
    }
    
    function trackFacebook() {
     var click1 = new Image(); 
     var axel = Math.random() + ""; 
     var ord = axel * 1000000000000000000; 
     click1.src = 
  'http://ad.doubleclick.net/activity;src=3300547;type=faceb920;cat=buffa467;ord='+ ord + '?'; 
    }
      
    function trackTwitter() {
     var click1 = new Image(); 
     var axel = Math.random() + ""; 
     var ord = axel * 1000000000000000000; 
     click1.src = 
  'http://ad.doubleclick.net/activity;src=3300547;type=twitt347;cat=buffa905;ord='+ ord + '?'; 
    }
      
    function trackYoutube() {
     var click1 = new Image(); 
     var axel = Math.random() + ""; 
     var ord = axel * 1000000000000000000; 
     click1.src = 
  'http://ad.doubleclick.net/activity;src=3300547;type=youtu925;cat=buffa692;ord='+ ord + '?'; 
    }

    /////////////////////////////////
    // Add some fake text shadows for browsers which do not support them
    /////////////////////////////////
    fakeTextShadowSelection = [
      '.hero-container h1',
      '.hero-container p',
      '.promo-container h1',
      '.promo-container p',
      '.flexslider-overlay-text h1',
      '.flexslider-overlay-text p',
      '.landing-item h2',
      '.item-hero-container h4'
    ].join(", ")

    if( !modernizr.textshadow ) {
      $( fakeTextShadowSelection ).addTextShadows()
      $('.menu-container h2').addTextShadows({
        shadowDistance: 1
      })

      // $('.text-shadow-wrapper').css('width', '100%')
      //   .find('h1, p, h2, .ie-text-shadow-bottom').css('width', '100%')
    }

    // Swap SVG CMS content with PNGs
    if ( !Modernizr.svg ) {
      $('[data-svg-png]').each(function(i, el) {
        $el = $(el)
        $el.attr('src', $el.data('svgPng'))
      })
    }

    // Swap SVG CSS with PNGs
    // We already built out IE, so we're avoiding it here.
    if ( !app.Core.isIE && !Modernizr.svg ) {

      // Load the CSS fallbacks
      svgFallbackStylesheet = $("<link>");
      svgFallbackStylesheet.attr({
        type: 'text/css',
        rel: 'stylesheet',
        href: '/public/stylesheets/svgFallbacks.css?rdm=' + new Date().getTime()
      })

      $('head').append( svgFallbackStylesheet )
    }

    // Additional IE JS Hacks
    if( app.Core.isIE ) {

      // Script to resolve option element dimensions in IEs
      $('select').each(function() {
          if($(this).attr('multiple') == false) {

            $(this).mousedown(function() {

              if($(this).css("width") != "auto") {

                var width = $(this).width()
                $(this).data("origWidth", $(this).css("width")).css("width", "auto")

                // If the width is now less than before then undo
                if($(this).width() < width) {
                  $(this).unbind('mousedown')
                  $(this).css("width", $(this).data("origWidth"))
                }
              }
            })

            // Handle blur if the user does not change the value
            .blur(function() {
                $(this).css("width", $(this).data("origWidth"))
            })

            // Handle change of the user does change the value
            .change(function() {
                $(this).css("width", $(this).data("origWidth"))
            })
          }
      }) // end select.each

      // This solves a very annoying layout issue in IE7 quickly.
      // The IE7 items should be moved to oldie.js
      if( app.Core.isIE7 ) {

        $('.landing-item-anchor').each(function(i, el) {
          var $el, $newEl
          $el = $(el)
          $newEl  = $el.clone().empty()
          $newEl.addClass('ie-landing-item-anchor')
          $(el).after( $newEl )
        })


        $('#flexContainer .slide a').each(function(i, el) {
          var $el, $newEl
          $el = $(el)
          $newEl  = $el.clone().empty()
          $newEl.addClass('ie-home-item-anchor')
          $(el).after( $newEl )
        })

      }
    } // end app.Core.isIE

  } // end doc ready

}( jQuery, BuffaloWildWings, Modernizr )

// Place any jQuery/helper plugins in here.