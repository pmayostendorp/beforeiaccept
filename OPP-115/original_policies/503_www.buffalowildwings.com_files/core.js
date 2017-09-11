/////////////////////////////////////
//
// BuffaloWildWings.Core
// -----------------------------
//
// Module Description: 
// The BWW Core module instantiates the site wide namespace 
// and app parameters as a utility for all other BWW modules.
// This module loads in the head and does not require jQuery 
//
/////////////////////////////////////

/////////////////////////////////////
// Instantiate the Buffalo Wild Wings Application Objects
/////////////////////////////////////
window.BuffaloWildWings = new function BuffaloWildWings() {} // Create global namespace as Class
BuffaloWildWings._Modules = {} // Create storage object for Module Constructors

!function( app ) {

  /////////////////////////////////////
  // Begin Core Module
  /////////////////////////////////////
 
  var Core, contexts

  // The Core class consists of site wide configurations and interactions.
  // Begin the Core module constructor
  Core = function() {
    var contexts, htmlClasses, matchedContexts

    // Browser & device detection
    contexts = ['desktop', 'mobile', 'ipad', 'iphone', 'android', 'lt-ie9', 'ie', 'ie7']

    htmlClasses = document.getElementsByTagName('html')[0].className
    matchedContexts = matchWords(htmlClasses, contexts)

    // Assign properties for the global app
    this.context = matchedContexts.join(" ")

    this.isMobile = /mobile/.test( this.context )

    this.isAndroid = /android/.test( this.context )

    this.isIphone = /iphone/.test( this.context )

    this.isIE = /ie/.test( this.context )

    this.isIE7 = /ie7/.test( this.context )

    this.isOldIE = /lt-ie9/.test( this.context )

    // this.init()

    // Utility function to match an array of words against a string
    function matchWords(str, words) {
      var _i, output = [], word, regexWord

      for (_i = words.length - 1; _i >= 0; _i--) {
        word = words[_i]
        regexWord = new RegExp('\\b' + word + '\\b')
        if( str.match(regexWord) ){
          output.push(word)
        }
      }

      return output
    }
  } // end Core

  Core.prototype = {
    init: function() {
      /////////////////////////////////
      // Report window info for mobile devices
      /////////////////////////////////
      // var previousOrientation = 0

      // var pixelRatio = window.devicePixelRatio

      // var checkOrientation = function(){
      //   if( /mobile/.test(app.Core.context) ){
      //     setTimeout( function(){ alert( 'Orientation:' + window.orientation + ', Screen Width: ' + screen.width + ', Pixel Ratio: ' + pixelRatio ) }, 50 )
      //   }
      // }

      // window.addEventListener("resize", checkOrientation, false)
      // window.addEventListener("orientationchange", checkOrientation, false)
    }
  }

  // Attach the Core constructor to our app module collection
  app._Modules.Core = Core
  app.Core = new app._Modules.Core()

  /////////////////////////////////////
  // End Core Module
  /////////////////////////////////////

  /////////////////////////////////////
  // Begin Regex Module
  /////////////////////////////////////

  Regex = function() {
    
    this.postalCodes = {
      US: /^([0-9]{5})(?:[-\s]*([0-9]{4}))?$/i,
      CA: /^([A-Z][0-9][A-Z])\s*([0-9][A-Z][0-9])$/i,
      ANY: /^(?:[A-Z0-9]+([- ]?[A-Z0-9]+)*)?$/i
    }

    this.bwwStoreID = /^\d{4}$/

    this.northAmericanPhone = /^\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})$/

    this.numeric = /^\d+$/

  } // end Regex

  // Attach the Regex constructor to our app module collection
  app._Modules.Regex = Regex
  app.Regex = new app._Modules.Regex()

  /////////////////////////////////////
  // End Regex Module
  /////////////////////////////////////

  // Avoid `console` errors in browsers that lack a console.
  if (!(window.console && console.log)) {
      (function() {
          var noop = function() {};
          var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'markTimeline', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
          var length = methods.length;
          var console = window.console = {};
          while (length--) {
              console[methods[length]] = noop;
          }
      }());
  }

}( BuffaloWildWings )