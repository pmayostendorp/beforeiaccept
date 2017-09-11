/////////////////////////////////////
//
// app.HeroImage
// -----------------------------
// 
// DESCRIPTION: 
// The HeroImage module is simply for adjusting the left and
// margin-left value dynamically based on the width of the hero image. 
// From design the hero image will always be centered throughout the project. 
// Thus instead of hard-coding CSS and not making the site future proof, 
// we should be able to detect the width of the image, and adjust it's left 
// value accordingly. 
// 
// DEPENDENCIES:
// - /public/javascript/libs/jquery-1.7.2.js
// - /public/javascript/modules/responsive-breakpoints.js
// - /public/javascript/modules/core.js
// 
// CONFIGURATIONS:
// 
// TODOs: 
// 
// INITIALIZATION:
// Secretly being done in global.js shhhh..
// 
/////////////////////////////////////

!function( $, app ) {
  var HeroImage,
  defaults,
  helpers,
  $win = $(window);
  
  var defaults = {
    heroImage: '.hero-bg, .promo-bg'
  };
  
  function getIEVersion() {
    var agent = navigator.userAgent;
    var reg = /MSIE\s?(\d+)(?:\.(\d+))?/i;
    var matches = agent.match(reg);
    if (matches != null) {
        return { major: matches[1], minor: matches[2] };
    }
    return { major: "-1", minor: "-1" };
  }
  
  HeroImage = function( options ) {
    var options;
    
    // Map optional configs if they exist  
    options = this.options = options ? $.extend({}, defaults, options) : defaults;
    
    //if ( app.Core.isOldIE ) return
    
    // HeroSlideshow jQuery extended elements
    this.$heroImageContainer = $( options.heroImage );
    
    this.init0_768 = false;
    this.init769up = false;
    
    // Set up the module if hero image exists
    if( this.$heroImageContainer.length > 0 ) {
      this.init();
      
      var ieVersion = getIEVersion();
      if (ieVersion.major == 10) {
        setTimeout(this.ie10Fallback.bind(this), 1000);
      }
    }
  }
  
  HeroImage.prototype = {
    setup0_768: function() {
      this.moveHeroImage();
      
      if( this.init0_768 ) {
        return;
      }
      
      var self = this;
      this.init0_768 = true;
      this.init769up = false;
    },
    
    setup769up: function() {
      this.moveHeroImage();
      if( this.init769up ) {
        return;
      }
      
      this.init0_768 = false;
      this.init769up = true;   
    },      
    
    moveHeroImage: function() {
      var $heroImage = this.$heroImageContainer.find('img').not('.hero-item img'),
      heroWidth = $heroImage.width();
      
      $heroImage.css({
        'margin-left' : -heroWidth / 2
      });
      
      // only doing this so you do not see the jump with the positioning.
      $heroImage.fadeIn().css({display: 'block'});
    },  
    
    calculateContentHeight: function() {
      var heroContentContainer = this.$heroImageContainer.parents().eq(0),
      heroContextContainer = heroContentContainer.find('.hero-content'),
      heroContext = heroContentContainer.find('.hero-container'),
      heroContextHeight = heroContext.height(),
      botShim = document.createElement('div');
      
      if (heroContextHeight <= 200) {
        return false;
      }
      
      botShim.setAttribute('class', 'bottom-shim');
      heroContextContainer.prepend(botShim);
      
      heroContextContainer.css({ height: heroContextHeight + 100 });
      heroContentContainer.css({ height: heroContextHeight + 100 });
    },
    
    clearContentHeight: function() {
      var heroContentContainer = this.$heroImageContainer.parents().eq(0),
      heroContextContainer = heroContentContainer.find('.hero-content'),
      heroContext = heroContentContainer.find('.hero-container');
      
      heroContextContainer.removeAttr('style');
      heroContentContainer.removeAttr('style');
    },
    
    init: function() { 
      var self = this;
      $win.on('load', imageReady);
      
      function imageReady(){
        if( app.Core.isOldIE ) {
          return;
        }
        
        waitForImage();
        handleResponsive();
      }
      
      function handleResponsive() {
        app.ResponsiveBreakpoints.register_event(
          '0-768',
          'hero-image-0-768',
          self.setup0_768.bind(self) // using es5-shim.js
        );
        
        app.ResponsiveBreakpoints.register_event(
          '768-+',
          'hero-image-768up',
          self.setup769up.bind(self) // using es5-shim.js
        );
      } // end handleResponsive
      
      // We need to "wait" for the image because it's generated with another JS module.
      function waitForImage() {
        // Make sure we have a width since the image load event will be inconsistent due to caching.
        if( 
          self.$heroImageContainer.find('img').length && 
          self.$heroImageContainer.find('img').width() > 320 // IE likes to report small numbers sometimes...
        ) {
          self.moveHeroImage();
        }
      } // end waitForImage
    }, // end init
    
    ie10Fallback: function() {
      if (!this.init0_768 && !this.init769up) {
        this.setup769up();
      }
    }
  }; // end .prototype

  app._Modules.HeroImage = HeroImage;

}( jQuery, BuffaloWildWings );
