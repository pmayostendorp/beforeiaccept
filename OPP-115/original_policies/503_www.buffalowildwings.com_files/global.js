
// Application Notes:
// We will be attaching many module classes to the window.bww namespace.
// All modules will exist adjacent to the Core module that exists on all site pages.

!function( $, app ) {

  /////////////////////////////////////
  // Begin Global Configurations
  /////////////////////////////////////

  // Configure the debouncer jQuery special event
  $.event.special.debouncedresize.threshold = 6

  /////////////////////////////////////
  // Begin Global BWW Modules
  /////////////////////////////////////

  // Initialize ResponsiveBreakpoints
  app.ResponsiveBreakpoints = new app._Modules.ResponsiveBreakpoints()

  // Initialize GoogleMaps
  // We may not use this much anymore because gmaps.js 
  // provides much of the functionality now.
  app.GoogleMaps = new app._Modules.GoogleMaps()

  // Initialize MainMenu
  app.MainMenu = new app._Modules.MainMenu()

  // Initialize Hero Image Positionining
  app.HeroImage = new app._Modules.HeroImage()

  // Don't Initialize the Bdubs Survey 
  // app.BwwSurvey = new app._Modules.BwwSurvey()
  
  /////////////////////////////////////
  // End Global BWW Modules
  /////////////////////////////////////

}( jQuery, BuffaloWildWings )
