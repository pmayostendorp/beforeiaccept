/////////////////////////////////////
//
// BuffaloWildWings.Errors
// -----------------------------
//
// Module Description: 
// Errors..... ...
// 
// Dependencies:
// - /public/javascript/libs/jquery-1.7.2.js
//
// Configurations:
// None
// 
// TODOs: 
// 1) Get language mode from server
// 
// Initialization:
// BuffaloWildWings.Errors = new BuffaloWildWings._Modules.Errors() 
// 
/////////////////////////////////////

!function( $, app ) {
  var Errors,
  helpers,
  $win = $(window)

  /////////////////////////////////////
  // Begin Errors
  /////////////////////////////////////
 
  Errors = function() {
            
    // Errors properties
    this.languageMode = null

    // Errors properties
    this.mainMenuFindADq = {
      confirmGeolocation: {
        EN: 'Dairy Queen would like to use your current location.',
        FR: '(fr) Dairy Queen would like to use your current location.' 
      }
    }

    this.init()
  }

  // Errors Methods
  Errors.prototype = {

    // Utility to return the correct error message based on the module, 
    // message and current language of the page.
    getMessage: function( module, message ){

      if( !this[ module ] ) {
        throw new Error('Module name not found.')
        return
      }
      
      if( !this[ module ][ message ] ) {
        throw new Error('Message name not found.')
        return
      }

      if( !this[ module ][ message ][ this.languageMode ] ) {
        throw new Error('Language not found.')
        return
      }

      return this[ module ][ message ][ this.languageMode ]
    },

    // Initialize Errors
    init: function() { 
      var self = this
      
      // DOM Ready routines. 
      $(domReady)

      // Utility function to execute on jQuery's DOM Ready 
      // TODO: We'll need the server to tell us what language is current
      function domReady(){
        self.languageMode = 'EN'
      }
    }
  }

  // Attach the Errors constructor to our global namespace
  app._Modules.Errors = Errors
  
  /////////////////////////////////////
  // End Errors
  /////////////////////////////////////

}( jQuery, BuffaloWildWings )