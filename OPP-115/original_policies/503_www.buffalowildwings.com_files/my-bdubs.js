/////////////////////////////////////
//
// app.MyBDubs
// -----------------------------
// 
// DESCRIPTION: 
// This module manages the rendering of the user's preferred
// store location in the global header.
// 
// For the mustache template, 
// here's a reference of this.storeData
// -----------------------------
// get_directions_url: "https://maps.google.com/maps?f=d&t=m&q=7749%20ZANE%20AVE%20N%20BROOKLYN%20PARK%20MN%2055443-3120"
// order_online_url: "https://buffalowildwings.alohaorderonline.com/Locations.aspx?SelectSite=0055"
// store_address1: "3505 Vicksburg Lane"
// store_address2: "lol"
// store_address3: "lol"
// store_city: "Plymouth"
// store_id: "0055"
// store_name: "PLYMOUTH"
// store_phone: "763-551-9464"
// store_state: "MN"
// store_zip: "55447-1342"
// 
// DEPENDENCIES:
// - https://maps.google.com/maps/api/js?sensor=false
// - /public/javascript/libs/jquery-1.7.2.js
// - /public/javascript/libs/mustache.js
// - /public/javascript/libs/jquery.mustache.js
// - /public/javascript/modules/core.js
// - /public/javascript/modules/google-maps.js
// 
// CONFIGURATIONS:
// See defaults
// 
// TODOs: 
// 1) Nothing. This script is perfect.
// 
// INITIALIZATION:
// app.MyBDubs = new app._Modules.MyBDubs() 
// 
/////////////////////////////////////

!function( $, app ) {
  var MyBDubs,
  defaults,
  jqMustache = $.Mustache

  // Instantiate shared module variables here.
  // NOTE: DO NOT instantiate module properties here, 
  // mostly browser lookups/references or app helpers belong here.
  // Examples:
  // $win = $(window),
  // location = window.location,
  // push = Array.prototype.push

  /////////////////////////////////////
  // Begin MyBDubs
  /////////////////////////////////////
 
  var defaults = {
    myBDubs: '#myBDubs',
    findABDubsSubmit: '#findABDubsSubmit',
    storeInformation: '#storeInformation',
    mustacheTemplates: '/public/javascript/javascript-templates-header.html',
    cookieExpirationDays: 365
  } // end defaults

  MyBDubs = function( options ) {

    // Map optional configs if they exist  
    options = this.options = options ? $.extend({}, defaults, options) : defaults

    this.cookieExpirationDays = options.cookieExpirationDays

    // MyBDubs jQuery extended elements
    this.$myBDubs = $( options.myBDubs )
    this.$findABDubsSubmit = $( options.findABDubsSubmit )
    this.$storeInformation = $( options.storeInformation )

    this.ajax = {
      closestStoreByZip: null,
      fetchStoreById: null,
      renderTemplates: options.mustacheTemplates
    }

    this.userZip = null
    this.renderTemplates = []
    this.storeData = {}

    this.lastCookieStoreID = null
    this.lastCookieStorePreferred = null

    this.currentStorePreferred = false

    // Set up the module
    this.init()

  } // end MyBDubs Constructor

  // MyBDubs Methods
  MyBDubs.prototype = {
    // requestClosestStoreData makes an ajax request to 
    // the BWW server to retrieve the closest store.
    // This method returns jQuery's jqXHR object via a callback.
    requestClosestStoreData: function( lat,lng, callback ) {
      var jqxhr, url, data

      callback = callback || $.noop

      url = this.ajax.closestStoreByZip

      data = {
          //zip: '12345'
          lat: lat,
          lng: lng
      }

      jqxhr = $.ajax({
        url: url,
        type: "get",
        data: data
      })

      callback( jqxhr )
    },

    requestStoreById: function( id, callback ) {
      var jqxhr, url, data

      callback = callback || $.noop

      url = this.ajax.fetchStoreById

      data = {
        id: id
      }

      jqxhr = $.ajax({
        url: url,
        type: "get",
        data: data
      })
      
      callback( jqxhr )
    },

    // getRenderTemplates uses jQuery Mustache to load our external
    // template file, which contains all the templates we'll use.
    // Currently getRenderTemplates renders the store, this should 
    // be abstracted into a callback
    getRenderTemplates: function() {
      var self = this

      // console.log('getRenderTemplates')
      
      jqMustache.load( self.ajax.renderTemplates )
        .done( success )
        .fail( fail )

      function success( response ) {
        // console.log('getRenderTemplates success')
        self.renderTemplates = jqMustache.templates()
        self.renderStore()
      }

      function fail( response ) {
        console.error('Failed to load Mustache templates.')
      }
    },

    // renderStore does:
    // 1) Build an address object to call app.GoogleMaps.buildGoogleMapsExternalQuery
    // 2) Use mustache.js with jquery.mustache js to render a store template
    renderStore: function() {
      var addressObj, storeData, storeLocationNumber

      addressObj = mapAddress( this.storeData )
      storeData = this.storeData

      storeLocationNumber = $('#storeLocationNumber')

      storeData.get_directions_url = app.GoogleMaps.buildGoogleMapsExternalQuery( addressObj )

      storeData.currentStorePreferred = this.currentStorePreferred
      storeData.currentStoreNotPreferred = !this.currentStorePreferred

      storeData.preferredText = this.currentStorePreferred ? 'My B-Dubs<sup>®</sup>' : 'Nearby'
      storeData.preferredClass = this.currentStorePreferred ? 'my-b-dubs' : 'nearby'

      storeData.analyticsPath = app.GoogleAnalytics.options.currentPath

      this.$storeInformation.mustache('bwwStoreHeader', storeData, { method: 'html' })

      // An edge case, for some templates we want to populate the store phone # in the DOM
      if( storeLocationNumber.length ) {
        storeLocationNumber.text( storeData.store_phone )
      }

      function mapAddress( storeData ) {
        return {
          address_1: ( storeData.store_address1 || '' ),
          address_2: ( storeData.store_address2 || '' ),
          city: ( storeData.store_city || '' ),
          state: ( storeData.store_state || '' ),
          zip: ( storeData.store_zip || '' )
        }
      } // end mapAddress
    }, // end renderStore

    updatePreferedStore: function( id ) {
      var self, id

      self = this

      console.log('updatePreferedStore', id)

      id = $.trim( id )
      
      if( !app.Regex.bwwStoreID.test(id) ) {
        console.log('Invalid store ID', id)
        return
      }

      this.requestStoreById( id, requestStoreByIdCallback )

      function requestStoreByIdCallback( jqxhr ) {
        jqxhr
          .done( success )
          .fail( fail )

          function success( data, errorString, jqxhr ) {
            console.log('requestStoreById success')
            self.storeData = data
            self.renderStore()
          }

          function fail( jqxhr, errorString, error ) {
            console.log('requestStoreById failed', jqxhr, errorString, error )
          }
        
      } // end requestStoreByIdCallback
    },

    readCookie: function() {
      return $.cookie( this._serverData.storeDetailsCookie )
    },

    // setCookie controls the cookie which indicates the nearest store
    // or, the users preferred store.
    // If the preferred flag is set to true it indicates the user has chosen 
    // a preferred store.
    setCookie: function( id, preferred ) {
      var cookieString

      preferred = preferred ? preferred : false
      cookieString = id + ', ' + preferred

      $.cookie( this._serverData.storeDetailsCookie, cookieString, {
        expires: this.cookieExpirationDays,
        path: '/'
      })
      
      console.log('setCookie name: %s, cookieString: %s', this._serverData.storeDetailsCookie, cookieString)
    },

    // Initialize MyBDubs
    // Note: this.init() executes before jQuery's DOM ready.
    init: function() { 
      var self = this
      
      // DOM Ready routines. 
      $(domReady)

      // Utility function to execute on jQuery's DOM Ready 
      function domReady(){
        initAppByServerData()
        initStorePreference()
      } // end domReady

      // initAppByServerData is the primar y init functions.
      // It reads the Javascript which the server has rendered to the page
      // and figures out what to do.
      function initAppByServerData() {
        var data, hasClosestStoreEndpoint, hasStoreDetails, hasLatitude, hasLongitude, requestGeocode, hasCookie
        
        // console.log('initAppByServerData', self._serverData)
        // debugger
        data = self._serverData

        if( !self._serverData ) console.log('MyBDubs server data not found.')

        // Some overkill error detection
        hasClosestStoreEndpoint = ( data.closestStoreEndpoint && data.closestStoreEndpoint != '' )

        hasFetchStoreById = ( data.fetchStoreById && data.fetchStoreById != '' )

        hasStoreDetails = ( data.storeDetails && !$.isEmptyObject( data.storeDetails ) )

        hasLatitude = ( data.latitude && ( data.latitude != 0 ) )
        hasLongitude = ( data.longitude && ( data.longitude != 0 ) )

        requestGeocode = ( hasLatitude && hasLongitude )
        
        /////////////////////////////////
        // Primary Initalizers
        /////////////////////////////////
        if( hasClosestStoreEndpoint ) {
          self.ajax.closestStoreByZip = self._serverData.closestStoreEndpoint
        }

        if( hasFetchStoreById ) {
          self.ajax.fetchStoreById = self._serverData.fetchStoreById
        }

        // If we have the store details, we can render a store 
        // and bypass the reverse geolocation stuff
        if( hasStoreDetails ) {
          // console.log('hasStoreDetails')
          self.storeData = data.storeDetails

          self.currentStorePreferred = true

          self.getRenderTemplates()
          return
        }

        // If we have the needed properties for reverse geolocation
        // use app.GoogleMaps to retrieve the data from the Google Maps API
        if( requestGeocode ) {
          // console.log('requestGeocode')
          app.GoogleMaps.latLongReverseGeolocation( data.latitude, data.longitude, requestGeolocationCallback )
        }
      } // end initAppByServerData

      // requestGeolocationCallback gets the zip code from the Google Maps
      // API response, then executes another call to the server to retrieve
      // the closest store information 
      function requestGeolocationCallback( response ) {
        var 
          firstLocation = response[0],
          _i = 0,
          _iLimit = firstLocation.address_components.length

        for (; _i < _iLimit; _i++) {
          if (firstLocation.address_components[_i].types[0] == "postal_code") {
            self.userZip = firstLocation.address_components[_i].short_name;
          }
        }
        console.log(self);
        self.requestClosestStoreData(self._serverData.latitude, self._serverData.longitude, requestClosestStoreDataCallback)
        //self.requestClosestStoreData( self.userZip, requestClosestStoreDataCallback )
      } // end requestGeolocationCallback

      // requestClosestStoreDataCallback stores the store data,
      // begins the template rendering process,
      // and sets a browser cookie for the store id
      function requestClosestStoreDataCallback( jqxhr ) {
        jqxhr
          .done( success )
          .fail( fail )

          function success( data, errorString, jqxhr ) {
            // console.log('requestClosestStore success')
            self.storeData = data
            self.lastCookieStoreID = self.storeData.store_id
            self.getRenderTemplates()
            self.setCookie( self.storeData.store_id )
          }

          function fail( jqxhr, errorString, error ) {
            // console.log('requestClosestStoreData failed', jqxhr, errorString, error )
            // debugger
          }
        
      } // end requestClosestStoreDataCallback

      // initStorePreference checks for existing store preferences
      // and assigns them to our module properties
      function initStorePreference() {
        var cookie, cookiePreferred, storeDetails

        cookie = self.readCookie()

        if ( cookie ) {
          cookiePreferred = $.trim( cookie.split(',')[1] )
          self.currentStorePreferred = self.lastCookieStorePreferred = ( cookiePreferred == "true" ) || false
        }

        storeDetails = self._serverData.storeDetails

        if( storeDetails && storeDetails.store_zip ) self.lastCookieStoreID = storeDetails.store_id

      } // end initSTorePreference
    } // end init
  } // end MyBDubs.prototype

  // Attach the MyBDubs constructor to our global namespace
  app._Modules.MyBDubs = MyBDubs

  /////////////////////////////////////
  // End MyBDubs
  /////////////////////////////////////

}( jQuery, BuffaloWildWings )
