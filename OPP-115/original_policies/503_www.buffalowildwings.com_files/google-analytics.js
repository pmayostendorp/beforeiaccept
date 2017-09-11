/*!
 * @module app.GoogleAnalytics
 */
/**
 * Description:
 *   - A wrapper making for simple Google Analytics initialization and custom event tracking.
 * 
 * Dependencies:
 *   - /public/javascript/libs/jquery-1.7.2.js
 *
 * Configuration:
 *   - See defaults object.
 *
 * TODOs:
 * 1) initAnalytics() should allow for more configuring or be pulled from the module.
 * 2) send-analytics event should prob use [data-ga* and allow for the noclick attribute to be more opt-in
 *
 * Usage:
 * app.GoogleAnalytics = new app._Modules.GoogleAnalytics() 
 */

/////////////////////////////////////
// Begin Google Analytics
/////////////////////////////////////

!function( $, app, undefined ) {
  var GoogleAnalytics,
  helpers

  /**
   * Defaults:
   * trackPageOnLoad: {Boolean} Set to false to disable page tracking on load.
   * trackRedirectTimeout: {Number} Amount in milliseconds to delay JS redirects.
   * formAnalytics: {Boolean} Set to false to prevent form field tracking.
   * formAnalyticsOptions: {Object} Holds the configurations for form field tracking.
      category: {String} Set the event category
      action: {String} Set the event action
      label: {String} Set the event label. The default event label is name attribute of the form field. 
   *  
   */
  var defaults = {
    trackPageOnLoad: true,
    trackRedirectTimeout: 200,

    formAnalytics: true,
    formAnalyticsOptions: {
      category: 'Forms',
      action: 'FieldCompleted',
      label: null
    }
  }

  /**
   * @function GoogleAnalytics
   *   - The module constructor
   *
   * @param {Object} options
   *   - The module configuration object
   *
   * @returns {null}
   */
  GoogleAnalytics = function( options ) {
    var options

    // Map private defaults
    defaults = $.extend(defaults, {

      // Map of Google Analytics event parameters with flags for required properties.
      // https://developers.google.com/analytics/devguides/collection/gajs/eventTrackerGuide
      gaEventParameters: {
        'category': true, 
        'action': true, 
        'opt_label': false, 
        'opt_value': false,   
        'opt_noninteraction': false
      }
    })

    // Map optional configurations
    options = this.options = options ? $.extend(defaults, options) : defaults

    // Can't init without these properties.
    if( !options.profileId || !options.domainName ) {
      console.log('The Google Analytics Module requires the profileId and domainName parameters.')
      return
    }

    // Determine the required parameters to interact with the GA API
    this.requiredEventParameters = helpers.getTrueProperties( options.gaEventParameters )
    
    // Set up the module
    this.init()
  }

  // Google Analytics Methods
  GoogleAnalytics.prototype = {

    /**
     * @function buildEvent
     *   - A method to build a valid Google Analytics event array
     *   - Supports special event modifiers which represents jQuery selections,
     *   example: $(#elementId)
     *   The jQuery selection does not include quotes to make implementation easier.
     *   If you pass a jQuery selection the event will attempt to read that element(s) 
     *   and retrieve a value in the following order:
     *   a) $(#elementId).val()
     *   b) $(#elementId).text()
     *
     * @param {Object} events
     *   - An object containing properties representing GA event parameters
     *   - See the default configurations for reference
     *
     * @returns {Array}
     *   - An array of events to be used with Google Analytics
     */
    buildEvent: function(events) {
      var self, gaEvents, prop, gaEvent, validEvent, regex$selector, regex$subSelector, $eventFragment, $el

      self = this
      gaEvents = this.options.gaEventParameters
      gaEvent = []
      regex$selector = /(\$\()[#\.]?\w+\)/i // Detect a jQuery selection in a string
      // regex$selector = /^(\w+)?(\$\()[#\.]?\w+\)(\w+)?/i // We don't actually need everything here 
      regex$subSelector = /(?:\$\()([#\.]?\w+)(?:\))/ // for grabbing the jQuery selection string as a subexpression

      // Check if our events object passes the required API parameters
      validEvent = helpers.hasAllProperties( events, this.requiredEventParameters )

      if ( !events || $.isEmptyObject( events ) || !validEvent ) {
        console.warn('The events object does not appear to be valid. \ncategory and action properties are required.', events)
        return false
      } 
      
      for( prop in gaEvents ) {

        if( events[prop] != undefined ) {

          // If we've detected a $() selection, attempt to retrieve a DOM value
          // and replace the selection with the value
          if( regex$selector.test( events[prop] ) ) {

            // Match the jQuery selector
            $eventFragment = events[prop]
              .match( regex$selector )[0]
              .match( regex$subSelector, '$2' )[1]
              
            // Retrieve the DOM value from the selector
            $el = $( $eventFragment )
            $eventFragment = $el.val() || $el.text()

            // Replace the jQuery selection with the DOM value
            events[prop] = events[prop].replace( regex$selector, $eventFragment )
          }
          
          // Fire!
          gaEvent.push( events[prop] )
          // events[prop] = events[prop].replace( $eventFragment, 'Secondary')
        }
        console.log(gaEvent);

      } // end for()

      return gaEvent
    },

    /**
     * @function trackEvent
     *   - A method to track a Google Analytics event
     *
     * @param {Array} eventArray
     *   - A Google Analytics compatible event array
     *
     * @returns {null}
     */
    trackEvent: function( eventArray ) {
      eventArray.unshift('_trackEvent')
      // console.log('trackEvent', eventArray)

      // Send data to the global Google Analytics method.
      _gaq.push( eventArray )
    },

    /**
     * @function trackEventRedirect
     *   - A method to track an analytics event and redirect the user to a URL, utilizing a brief timeout
     *
     * @param {Event} event
     *   - Event object
     *
     * @param {String} url
     *   - A url for user redirection
     *
     * @param {Array} eventArray
     *   - A Google Analytics compatible event array
     *
     * @returns {null}
     */
    trackEventRedirect: function( event, url, eventArray ) {
      var self = this

      if( !url || !eventArray ) {
        console.log('A URL and event array are required.')
      }
      
      self.trackEvent( eventArray )

      // Use a slight delay to track an off-page event
      setTimeout(function(){
        
        // Check for new window indications
        if( event.ctrlKey || event.metaKey || event.target.target == "_blank" || event.delegateTarget.target == "_blank" ) {
          
          // Assign window.open behavior for non-Androids. 
          // Android blocks window.open pop-ups, so we have to use the same window for those devices.
          if( !$('html').hasClass('android') ) {
            window.open( url )
          } else {
            window.location = url
          }

        } else {
          window.location = url
        }
      }, self.trackRedirectTimeout)
    },

    /**
    * @function trackFormField
    *   - A method to handle the tracking of individual form fields
    *
    * @param {Event} e
    *   - Form field event object
    *
    * @returns {null}
    */
    // TODO, the way we're collecting data is redundant between form fields and other elements
    // A utility couldn't hurt.
    trackFormField: function(e) {
      var $el, data

      $el = $( e.currentTarget ) // current target is where we subscribed to the event
      data = $.extend({}, $el.closest('[data-ga]').data('ga'))

      // Build a Google Analytics compatible event array
      gaEvent = this.buildEvent( data )

      gaEvent && this.trackEvent( gaEvent )
    },

    // TODO, forgot to dok here
    handleAnalyticsTrigger: function(e) {
      var $el
      
      // Be mindful that current target is not the same as 
      $el = $( e.currentTarget )

      // don't track form field clicks, they'll be handled by the form tracking configuration
      if( $el.is('input') || $el.is('select') || $el.is('textarea') || $el.is('button') || $el.is('form') ) return true

      // don't immediately track element which have specified noclick
      if( e.type == "click" && ( typeof $el.data('gaNoclick') != "undefined" ) ) return 

      this.handleAnalyticsEvent(e)
    },

    /**
     * @function handleAnalyticsEvent
     *   - Method to manage the click event on an element with data-ga attributes assigned
     *
     * @param {Event} e
     *   - Javascript Event
     *
     * @returns {null}
     */
    handleAnalyticsEvent: function(e) {
      var $el, data, tagName, isAnchor, gaEvent

      $el = $( e.currentTarget ) // current target is where we subscribed to the event
      data = $el.closest('[data-ga]').data('ga')
      tagName = $el.prop('tagName')

      // Build a Google Analytics compatible event array
      gaEvent = this.buildEvent( data )

      gaEvent && this.trackEvent( gaEvent )
    },

    /**
     * @function init
     *   - The main initialization routine for this module
     *
     * @returns {null}
     */
    init: function() { 
      var self = this

      initAnalytics()
      $(initEvents)
      
      // init the Google Analytics app
      function initAnalytics(){
        var ga, s
        
        ga = document.createElement('script')
        ga.type = 'text/javascript'
        ga.async = true
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js'

        s = document.getElementsByTagName('script')[0]
        s.parentNode.insertBefore(ga, s)
        
        window._gaq = window._gaq || []
        _gaq.push(['_setAccount', self.options.profileId])
        _gaq.push(['_setDomainName', self.options.domainName])
        _gaq.push(['_setAllowLinker', true])
        _gaq.push(['_trackPageview', self.options.pageview])
      }

      function initEvents() {
        $('body').on('click.ga-event', '[data-ga]', self.handleAnalyticsTrigger.bind(self))

        // If form analytics are enabled, use a separate event registry to track activity.
        if( self.options.formAnalytics ) {

            $('form[data-ga]').on('submit.ga-event', self.trackFormField.bind(self) )

            $('form input[type="text"][data-ga], form textarea[data-ga]').on('blur.ga-event', self.trackFormField.bind(self) )

            $('form input[type="radio"][data-ga], form textarea[data-ga]').on('change.ga-event', self.trackFormField.bind(self) )

            $('form input[type="checkbox"][data-ga], form select[data-ga]').on('change.ga-event', self.trackFormField.bind(self) )

            $('form button[data-ga]').on('click.ga-event', self.trackFormField.bind(self) )

        } // end if formAnalytics

        // send-analytics is a custom event which can be triggered programatically for elements.
        $('body').on('send-analytics.ga-event', '[data-ga-noclick]', self.handleAnalyticsTrigger.bind(self))

      } // end initEvents
    }
  }

  // Attach the GoogleAnalytics constructor to our global namespace
  app._Modules.GoogleAnalytics = GoogleAnalytics
  
  // Module Helpers
  helpers = {

    /**
     * @function getTrueProperties
     *   - Inspects the top-level properties of an object and returns an array of values where the properties matched a true boolean
     *
     * @param {Object} obj
     *   - Javascript object
     *
     * @returns {Array}
     */

    // Additional Note:
    // Because we're checking the property type, we're less worried about the ES5 shim looping scenario we experienced below.
    getTrueProperties: function( obj ) {
      var prop, output = []

      for( prop in obj ) {
        if( typeof obj[prop] == "boolean" && obj[prop] == true ) {
          output.push( prop )
        }
      } // end for()

      return output
    },

    /**
     * @function hasAllProperties
     *   - Compares an object against an array. If the object properties representing all of the items in the array, return true
     *
     * @param {Object} obj
     *   - An object containing properties to inspect
     *
     * @param {Array} arr
     *   - An array containing values to compare against obj
     *
     * @returns {Boolean}
     */

    // Additional Note:
    // In situations where the Arrary prototype is extended (ES5 shim), there may be additional properties which could be looped . We're kind of betting on the array values being looped ahead of the prototype.
    hasAllProperties: function( obj, arr ) {
      var 
        _i = 0,
        _iLimit = arr.length

      for(; _i < _iLimit; _i++ ) {
        if( !(arr[ _i ] in obj) ) {
          return false
        }
      }

      return true
    }
  }

}( jQuery, BuffaloWildWings )

/////////////////////////////////////
// End Google Analytics
/////////////////////////////////////

