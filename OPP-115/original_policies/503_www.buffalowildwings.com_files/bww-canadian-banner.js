/////////////////////////////////////
//
// app.BwwCanadianBanner
// -----------------------------
//
// Feel free to remove this entire ABOUT/GETTING STARTED/DEBUGGING section
// when you build your module
//
// ABOUT "app":
// app is the the global variable passed into the anonymous function.
// For each module in the website application, 
// it is recommended you pass in the same global variable for each module
// 
// The /javascript/modules/core.js file should instantiate the app variable 
// in the head of the web page.
// 
// The following is an example of the global app instantiation and module instantiations:
// window.BuffaloWildWings = new function() {} // Create global namespace as Class
// BuffaloWildWings._Modules = {} // Create storage object for Module Constructors
// !function( $, app ) { /* Module Source Code */ }( jQuery, BuffaloWildWings )
// 
// GETTING STARTED
// 1) Find & replace "ModuleName" with AwesomeUsefulModuleName
// 2) Save you module with a filename such as: awesome-useful-module-name.js in /modules
// 3) Instantiate your module after the script is loaded. Example:
//    <script>
//      !function( app ) {
//        app.AwesomeUsefulModuleName = new app._Modules.AwesomeUsefulModuleName()
//      }( BuffaloWildWings )
//    </script>
// 4) Open the page and check the console for your module. Example:
//    BuffaloWildWings.AwesomeUsefulModuleName
//    --> returns AwesomeUsefulModuleName as navigable Constructor
// 
// DEBUGGING
// Coming soon with skrilla and proTips
// 
// -----------------------------
// 
// DESCRIPTION: 
// Module notes go here.
// 
// DEPENDENCIES:
// - /public/javascript/libs/jquery-1.7.2.js
// - /public/javascript/modules/core.js
// - /public/javascript/modules/responsive-breakpoints.js
//
// CONFIGURATIONS:
// See defaults object.
// 
// TODOs: 
// 1) Document any TODO tasks here.
// 
// INITIALIZATION:
// app.BwwCanadianBanner = new app._Modules.BwwCanadianBanner() 
// 
/////////////////////////////////////

!function( $, app ) {
  var BwwCanadianBanner,
  defaults,
  helpers

  // Instantiate shared module variables here.
  // NOTE: DO NOT instantiate module properties here, 
  // mostly browser lookups/references or app helpers belong here.
  // Examples:
  // $win = $(window),
  // location = window.location,
  // push = Array.prototype.push

  /////////////////////////////////////
  // Begin BwwCanadianBanner
  /////////////////////////////////////
 
  var defaults = {
    debug: false,
    cookieName: 'BwwCanadaLocation', 
	electCookieName: 'BwwWantsCanada',
    cookieExpirationDays: 365,
    bannerContainer: '#topCanadianBannerCta',
  } // end defaults

  BwwCanadianBanner = function( options ) {
    console.log("CB: Constructor")
    // Map optional configs if they exist  
    options = this.options = options ? $.extend({}, defaults, options) : defaults
    
    // BwwCanadianBanner jQuery extended elements
    this.$element = $( options.wrapper )
	
	this.debug = options.debug
    this.bannerCookieName = options.cookieName
	this.electCookieName = options.electCookieName
    this.cookieExpirationDays = options.cookieExpirationDays
    this.$bannerContainer = $( options.bannerContainer )
    this.$canadianRedirectYesLink = $( '#canadianRedirectYes' )
    this.$canadianRedirectNoLink = $( '#canadianRedirectNo' )
    this.electedRedirect = false
        
    // BwwCanadianBanner properties
    this.property = false

    this.init0_768 = false
    this.init769up = false

    // Set up the module
    this.init()
  } // end BwwCanadianBanner Constructor

  // BwwCanadianBanner Methods
  BwwCanadianBanner.prototype = {

    // Initialize BwwCanadianBanner
    // Note: this.init() executes before jQuery's DOM ready.
    init: function() { 
      var self = this
      console.log("CB: Init")
      console.log(app, this, self.options)
      
      // DOM Ready routines. 
      $(domReady)

      // Utility function to execute on jQuery's DOM Ready 
      function domReady(){

        // DOM Ready inits
        // Recommend calling a sequence of private functions here to kick off the app

        handleResponsive()
      }

      // handleResponsive is a utility to assign all of the breakpoint event handlers we want for this module
      function handleResponsive() {
        app.ResponsiveBreakpoints.register_event(
          '0-768',
          'module-0-768',
          self.setup0_768.bind(self) // using es5-shim.js
        )

        app.ResponsiveBreakpoints.register_event(
          '768-+',
          'module-768up',
          self.setup769up.bind(self) // using es5-shim.js
        )
      }

    },
	
	displayCanadianBanner: function() {
      this.initBindings()
	  console.log("CB: Showing banner")
      this.$bannerContainer.show()
    },
	
	performCanadianRedirect: function() {
	  console.log("CB: performCanadianRedirect")
      window.location = "/en-CA" // hardcode for now, update later
    },
	
    hideCanadianBanner: function(e) {
      var self = this
	  console.log("CB: hideCanadianBanner")
      self.$bannerContainer.hide()
    },
	
    electCanadianRedirect: function(e) {
      var self = this
	  console.log("CB: electCanadianRedirect")
      self.hideCanadianBanner()
      self.setElectCookie(true)
	  self.performCanadianRedirect()
    },
	
	denyCanadianRedirect: function(e) {
      var self = this
	  console.log("CB: denyCanadianRedirect")
      self.hideCanadianBanner()
      self.setElectCookie(false)
    },
	
	setElectCookie: function(value) {
      $.cookie( this.electCookieName, value , {
        expires: this.cookieExpirationDays,
		
        path: '/'
      })
    },
	
	initBindings: function() {
      var self = this

	  console.log("CB: initBindings")

      self.$canadianRedirectYesLink.on('click.canadian-banner-yes', self.electCanadianRedirect.bind(self))
      self.$canadianRedirectNoLink.on('click.canadian-banner-no', self.denyCanadianRedirect.bind(self))
    },

    // setup0_768 configures the slideshow for a viewport of < 768px
    // This is just an example... 
    // You can create methods for any breakpoint range desired.
    setup0_768: function() {
      // Do stuff for 0-768

      // Rapid-firing events here

      if( this.init0_768 ) return
        
      console.log('init 0-768')
    
      // One-time inits here

      this.init0_768 = true
      this.init769up = false
	  
	  if (this.displayBannerToUser()) {
	    this.displayCanadianBanner()
	  }
    },

    // setup769up configures the slideshow for a viewport of 769px+
    // This is just an example... 
    // You can create methods for any breakpoint range desired.
    setup769up: function() {
      // Do stuff for 769+

      // Rapid-firing events here

      if( this.init769up ) return
        
      console.log('init 768-+')
    
      // One-time inits here

      this.init0_768 = false
      this.init769up = true
	  
	  if (this.displayBannerToUser()) {
	    this.displayCanadianBanner()
	  }
    },
	
	// Determines if we should display the banner to the user.
	displayBannerToUser: function() {
	
	  return this.$bannerContainer.data("setcanadabanner")
	},
	
	readCookie: function(cookieName) {
      return $.cookie( cookieName )
    },

    // Destroy BwwCanadianBanner Events & Extras
    destroy: function() {
      // Undo everything that init does
    }
  } // end BwwCanadianBanner.prototype

  // Attach the BwwCanadianBanner constructor to our global namespace
  app._Modules.BwwCanadianBanner = new BwwCanadianBanner()
  
  // Module Helpers
  helpers = {

  }

  /////////////////////////////////////
  // End BwwCanadianBanner
  /////////////////////////////////////

}( jQuery, BuffaloWildWings )
