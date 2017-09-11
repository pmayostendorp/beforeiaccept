/////////////////////////////////////
//
// app.MainMenu
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
// Module configurations and defaults go here.
// 
// TODOs: 
// 1) Probably have unused jQuery elements in here.
// 
// INITIALIZATION:
// app.MainMenu = new app._Modules.MainMenu() 
// 
/////////////////////////////////////

!function( $, app ) {
  var MainMenu,
  defaults,
  helpers

  // Instantiate shared module variables here.
  // Such as:
  // $win = $(window),
  // location = window.location,
  // push = Array.prototype.push

  /////////////////////////////////////
  // Begin MainMenu
  /////////////////////////////////////
 
  var defaults = {

    findABDubsForm: '#bwwHeadLocator',
    findABDubsZip: '#findABDubsZip',

    mobileMenuToggle: '#mobileMenuToggle',
    mobileMenu: '#mobileMenu',
    mobileMenuItems: '#mobileMenu .btn',

    submitLocator: '.submit-form',

    // Module configurations
    exampleConfig: true

  } // end MainMenu.defaults

  MainMenu = function( options ) {
    var options

    // Map optional configs if they exist  
    options = this.options = options ? $.extend({}, defaults, options) : defaults

    // MainMenu jQuery extended elements
    this.$findABDubsForm = $( options.findABDubsForm )
    this.$findABDubsZip = $( options.findABDubsZip )

    this.$mobileMenuToggle = $( options.mobileMenuToggle )
    this.$mobileMenu = $( options.mobileMenu )
    this.$mobileMenuItems = $( options.mobileMenuItems )

    // Flags for the responsive state
    this.init0_768 = false
    this.init769up = false
    
    // Set up the module
    this.init()
  } // end MainMenu Constructor

  // MainMenu Methods
  MainMenu.prototype = {

    // setup0_768 configures the slideshow for a viewport of < 768px
    setup0_768: function() {
      // Do stuff for 0-768

      // Rapid-firing events here

      if( this.init0_768 ) return

      // One-time inits here
      this.$mobileMenuToggle.on('click.toggle-menu', toggleMenu.bind(this))
      this.$mobileMenu.removeClass('desktop-contract')
      
      this.init0_768 = true
      this.init769up = false

      // get the nav height assign for toggling
      this.$navHeight = this.$mobileMenuItems.eq(0).outerHeight() * this.$mobileMenuItems.length
      this.$mobileMenu.css({
        height: 0
      })

      function toggleMenu() {
        var self = this

        this.$mobileMenuToggle.toggleClass('active')
        this.$mobileMenu.toggleClass('contract').promise().done(function() {

          if (!this.hasClass('contract')) {
            this.css({
              height: self.$navHeight
            })
          } else {
            this.css({
              height: 0
            })
          }
        })
      }
    },

    // setup769up configures the slideshow for a viewport of 769px+
    setup769up: function() {
      // Do stuff for 769+
   
      // Rapid-firing events here

      if( this.init769up ) return

      // One-time inits here
      this.$mobileMenuToggle.off('click.toggle-menu')

      this.$mobileMenu
        .addClass('contract desktop-contract')
        .css({
          height: 'auto'
        })

      this.init0_768 = false
      this.init769up = true
    },

    // testPostalCode supports US & Canada
    testPostalCode: function(postalCode) {
      var valid

      valid = 
        app.Regex.postalCodes['US'].test( $.trim( postalCode ) ) ||
        app.Regex.postalCodes['CA'].test( $.trim( postalCode ) )

      return valid
    }, // end testPostalCode()

    // Initialize MainMenu
    // Note: this.init() executes before jQuery's DOM ready.
    init: function() { 
      var self = this

      // console.log(app, self.options)
      
      // DOM Ready routines. 
      $(domReady)

      // Utility function to execute on jQuery's DOM Ready 
      function domReady(){
        initEvents()
        handleResponsive()
      }

      function initEvents() {

        // Handle the clicks on elements which may submit the bdubs form.
        self.$findABDubsForm.on('click.main-menu', self.options.submitLocator, function(e) {
          var zip

          zip = self.$findABDubsZip.val()
          self.$findABDubsForm.submit()

          /* validation for zip is no longe needed since we do city+state+zip
          // If the zip field is empty or vald, submit it
          if( zip == "" || self.testPostalCode( zip ) ) { 
            self.$findABDubsForm.submit()
            return
          
          } else {
            alert('The zip code does not appear to be valid.')
          }
          */
        })
      }

      // handleResponsive is a utility to assign all of the breakpoint event handlers we want for this module
      function handleResponsive() {
        app.ResponsiveBreakpoints.register_event(
          '0-768',
          'main-menu-0-768',
          self.setup0_768.bind(self) // using es5-shim.js
        )

        app.ResponsiveBreakpoints.register_event(
          '768-+',
          'main-menu-768up',
          self.setup769up.bind(self) // using es5-shim.js
        )
      } // end handleResponsive
    },

    // Destroy MainMenu Events & Extras
    destroy: function() {
      // Undo everything that init does
    }
  } // end MainMenu.prototype

  // Attach the MainMenu constructor to our global namespace
  app._Modules.MainMenu = MainMenu
  
  // Module Helpers
  helpers = {

  }

  /////////////////////////////////////
  // End MainMenu
  /////////////////////////////////////

}( jQuery, BuffaloWildWings )
