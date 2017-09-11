/////////////////////////////////////
//
// app.BwwSurvey
// -----------------------------
// DESCRIPTION: 
// The Buffalo Wild Wing Survey module is a module which displays
// a survey link on the head of the page. The survey is intended
// to display with a 1/50 chance and store a cookie when shown to
// user's so it will never display again. 
// 
// DEPENDENCIES:
// - /public/javascript/libs/jquery-1.7.2.js
// - /public/javascript/modules/core.js
//
/////////////////////////////////////
!function( $, app, undefined ) {
  var BwwSurvey,
  defaults,
  helpers,
  $win = $(window)

  defaults = {
    debug: false,
    cookieName: 'BwwDisplaySurvey', // 'displaySurvey'
    cookieExpirationDays: 365,
    surveyContainer: '#topSurveyCta',
    surveyChance : 10 // chance the surver will run 1/#
  }
  
  BwwSurvey = function( options ) {
    // Map optional configs if they exist  
    options = this.options = options ? $.extend({}, defaults, options) : defaults

    this.debug = options.debug
    this.surveyTargetNum = options.surveyChance
    this.surveyCookieName = options.cookieName
    this.cookieExpirationDays = options.cookieExpirationDays
    this.$suveyContainer = $( options.surveyContainer )
    this.$takeSurveyLink = $( '#takeBwwSurvey' )
    this.$hideSurveyLink = $( '#hideBwwSurvey' )
    this.electedSurvey = false
    this.stayInSite = false

    this.randomizeInit()
  }

  // The Survey's core
  BwwSurvey.prototype = {
             
    setElectSurveyCookie: function() {
      $.cookie( 'BwwElectedSurvey', 'true' , {
        expires: this.cookieExpirationDays,
        path: '/'
      })
    },

    setDisplaySurveyCookie: function() {
      $.cookie( this.surveyCookieName, 'true' , {
        expires: this.cookieExpirationDays,
        path: '/'
      })
    },

    readElectCookie: function() {
      return $.cookie( 'BwwElectedSurvey' )
    },

    readSurveyCookie: function() {
      return $.cookie( this.surveyCookieName )
    },

    initBindings: function() {
      var self = this

      $('body').on('click', 'a', function(e) { 
        var href, isHashmark, isExternal

        href = $(e.target).attr('href')
        isHashmark = /#/.test(href)
        isExternal = /^http/.test(href)

        if (isHashmark)  return // ignore pagination links
        self.stayInSite = !isExternal 
      })         

      self.$takeSurveyLink.on('click.take-bww-survey', self.takeSurvey.bind(self))
      self.$hideSurveyLink.on('click.decline-bww-survey',self.hideSurvey.bind(self))
    },

    bindWindowClose: function() {
      var self = this

      $(window).on('beforeunload.closing-window', function() {
        var now = new Date().getTime()

        if (self.stayInSite) {
          self.stayInSite = false
          return
        }
          
        waitForResponse()        

        function waitForResponse() {

          if (new Date().getTime() > now) {
            $(window).off('beforeunload.closing-window')
            $('div').hover(function(){ window.location.href = 'http://www.surveygizmo.com/s3/1098763/BWW-Website-Visitor-Survey-Post' })
            return
          }
        
          setTimeout( waitForResponse, 1000)
        }

        return 'Please take a moment to Stay On This Page, and complete the survey.'
      }) 
    },

    displaySurvey: function() {
      this.initBindings()
      this.$suveyContainer.show()
    },

    hideSurvey: function(e) {
      var self = this

      self.$suveyContainer.hide()
    },

    takeSurvey: function(e) {
      var self = this

      self.hideSurvey()
      self.setElectSurveyCookie()
      self.bindWindowClose()
    },

    randomizeInit: function() {
      var initNumber = this.randomInt(0,this.surveyTargetNum)

      if ($('html.mobile').length || $('#topSurveyCta').length === 0) return
      
      if ( this.debug == true ) {
        
        if ( initNumber === this.surveyTargetNum-1 && this.readElectCookie() ) {
          
          this.initBindings()
          this.bindWindowClose()

          return
        }

        if (initNumber === this.surveyTargetNum-1 ) this.init() 

      } else {
        
        if ( initNumber === this.surveyTargetNum-1 && this.readElectCookie() ) {

          this.initBindings()
          this.bindWindowClose()

          return

        }

        if (initNumber === this.surveyTargetNum-1 && !this.readSurveyCookie() ) { this.init() }
      }
    },
    
    randomInt: function(low, high) {
      return low + Math.floor(Math.random() * (high - low))
    },

    setup0_768: function() {
      if( this.init0_768 ) return
      
      var self = this
      this.init0_768 = true
      this.init769up = false    
          
      self.hideSurvey()
      $(window).off('beforeunload.closing-window')
    },

    setup769up: function() {

      if( this.init769up ) return
      
      var self = this
      this.init0_768 = false
      this.init769up = true   

      self.displaySurvey()
      self.setDisplaySurveyCookie()
    },

    init: function() {
      var self = this 

      $(domReady)

      function domReady() {
        handleResponsive()
      }

      // handleResponsive is a utility to assign all of the breakpoint event handlers we want for this module
      function handleResponsive() {
        app.ResponsiveBreakpoints.register_event(
          '0-768',
          'bww-survey-0-768-'+self.initCount ,
          self.setup0_768.bind(self) // using es5-shim.js
        )

        app.ResponsiveBreakpoints.register_event(
          '768-+',
          'bww-survey-768up-'+self.initCount ,
          self.setup769up.bind(self) // using es5-shim.js
        )
      } // end handleResponsive
    }
  }

  // Attach the Counter constructor to the application
  app._Modules.BwwSurvey = BwwSurvey
  
}( jQuery, BuffaloWildWings )
