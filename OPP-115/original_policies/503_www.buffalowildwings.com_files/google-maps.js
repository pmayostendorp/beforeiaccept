/////////////////////////////////////
//
// BuffaloWildWings.GoogleMaps
// -----------------------------
//
// Module Description: 
// 
// Dependencies:
// - /public/javascript/libs/jquery-1.7.2.js
// - https://maps.google.com/maps/api/js?sensor=false
//
// Configurations:
// 
// TODOs: 
// 1) 
// 
// Initialization:
// BuffaloWildWings.GoogleMaps = new BuffaloWildWings._Modules.GoogleMaps() 
// 
/////////////////////////////////////

!function( $, app ) {
  var GoogleMaps,
  helpers,
  $win = $(window)

  /////////////////////////////////////
  // Begin Google Maps
  /////////////////////////////////////
  var defaults = {
    googleMapsBaseURL: "https://maps.google.com/maps?"
  }

  GoogleMaps = function( options ) {

    // Map optional configs if they exist  
    options = this.options = options ? $.extend({}, defaults, options) : defaults

    this.googleMapsBaseURL = options.googleMapsBaseURL

    this.geocoder = new google.maps.Geocoder()

    this.userLatLong = { lat: 0, long: 0 }

  } // end GoogleMaps Constructor

  // Google Maps Methods
  GoogleMaps.prototype = {

    addressGeolocation: function(address, hollaback){
      var self = this

      this.geocoder.geocode({
        address: address
      }, function( results, status ){

        if ( status == google.maps.GeocoderStatus.OK ) {
          self.userLatLong.lat = results[0].geometry.location.lat()
          self.userLatLong.long = results[0].geometry.location.lng()
          // hollaback( self.userLatLong, results )
        } else {

          // TODO: An error state, probably
          console.log("Geocoding failed: " + status, results )
        }

        hollaback( self.userLatLong, results )
      })
    },

    latLongReverseGeolocation: function(lat, long, hollaback){
      var self, googleLatLong

      self = this
      googleLatLong = new google.maps.LatLng(lat, long) 

      this.geocoder.geocode({
        latLng: googleLatLong
      }, function( response, status ){
        if ( status == google.maps.GeocoderStatus.OK ) {
          hollaback( response )
        } else {
          
          // TODO: An error state, probably
          console.log("Geocoding failed: " + status, response)
        }
      })
    },

    // buildGoogleMapsExternalQuery builds a query string for external
    // links to Google Maps.
    // The addressObj input oject should match the defaultAddress schema in this function.
    // Example return: 
    buildGoogleMapsExternalQuery: function( addressObj ) {
      var defaultAddress

      defaultAddress = {
        address_1: '',
        address_2: '',
        city: '',
        state: '',
        zip: ''
      }

      addressObj = addressObj ? $.extend(defaultAddress, addressObj) : defaultAddress

      $.each(addressObj, function(i, val) {
        val = val + ' '
        addressObj[i] = encodeURIComponent( val )
      })

      return this.googleMapsBaseURL
         + 'saddr=&daddr='
         + addressObj.address_1
         + addressObj.address_2
         + addressObj.city
         + addressObj.state
         + addressObj.zip
         + '&t=m'
    },

    // Destroy Google Maps Events & Extras
    destroy: function() {
      // Undo everything that init does
    }
  } // end GoogleMaps.prototype

  // Attach the GoogleMaps constructor to our global namespace
  app._Modules.GoogleMaps = GoogleMaps
  
  // Module Helpers
  helpers = {

  }

  /////////////////////////////////////
  // End Google Maps
  /////////////////////////////////////

}( jQuery, BuffaloWildWings )
