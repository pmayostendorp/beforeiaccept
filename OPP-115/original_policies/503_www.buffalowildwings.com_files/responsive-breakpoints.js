/////////////////////////////////////
//
// BuffaloWildWings.ResponsiveBreakpoints
// -----------------------------
//
// Module Description: 
// The ResponsiveBreakpoints module is intended to be a 
// sitewide event handler for the window resize event in 
// conjunction with interactive responsive design features
//
// Dependencies: 
// - /public/javascript/libs/jquery-1.7.2.js
// - /public/javascript/libs/jquery.debouncedresize.js
// 
// Configurations:
// TODO...
// 
// TODOs: 
// 1) Better documentation
// 
/////////////////////////////////////

!function( $, app ) {
  var ResponsiveBreakpoints,
  helpers,
  $win = $(window)

  /////////////////////////////////////
  // Begin Module Name
  /////////////////////////////////////

  // Don't run this app for old Internet Explorer
  // Provide no-ops for error prevention
  if ( $('html').hasClass('lt-ie9') ) {
    ResponsiveBreakpoints = $.noop
    ResponsiveBreakpoints.prototype = {
      register_event: ieLT9_register_event,
      trigger_event: $.noop
    }

    app._Modules.ResponsiveBreakpoints = ResponsiveBreakpoints

    // For this app, all breakpoints ending in "-+" are relevant for IE < 9
    function ieLT9_register_event(breakpoint, name, handler) {
      if( /-\+$/i.test( breakpoint ) || /^all$/i.test( breakpoint ) ) {
        handler()
      }
    }

    return
  }

  ResponsiveBreakpoints = function( options ) {

    // Map optional configs if they exist  
    this.options = options ? 
      $.extend({}, ResponsiveBreakpoints.defaults, options) : 
      ResponsiveBreakpoints.defaults

    // Use Webkits device pixel ration or assume 1
    this.devicePixelRatio = window.devicePixelRatio || 1

    this.isIpad = /iPad/i.test(navigator.userAgent)

    // breakpoint_api stores the breakpoint and event data for this module
    this.breakpoint_api = {}

    // Set up the module
    this.init()
  }

  // Responsive Breakpoint Methods
  ResponsiveBreakpoints.prototype = {

    // register_event ...
    register_event: function( breakpoint, event_name, fct ) {

      // Error detection for breakpoint attachments
      if( !this.breakpoint_api[ breakpoint ] ) {
        console.warn("Breakpoint" + breakpoint + " not found. Use yourApp.ResponsiveBreakpoints.get_breakpoints() to retrieve the configured breakpoints object.")
        return
      }

      // Error detection for duplicate attachments
      if( this.breakpoint_api[ breakpoint ][ event_name ] ) {
        console.warn("Event name " + event_name + " already exists.")
        return
      }

      // Error detection for failed functions
      if( typeof fct != 'function' ) {
        console.warn("Function parameter is not a function.")
        return
      }

      // Add the event to the corresponding breakpoint 
      this.breakpoint_api[ breakpoint ][ event_name ] = fct
    },

    // remove_event ...
    remove_event: function( breakpoint, event_name ) {
      var targetObject

      // Allow destruction of breakpoint
      targetObject = ( breakpoint && !event_name ) ? 
        this.breakpoint_api[ breakpoint ] : 
        this.breakpoint_api[ breakpoint ][ event_name ]

      delete targetObject
    },

    remove_all_events: function() {
      delete this.breakpoint_api
    },

    // Utility to trigger the handlers for a specific breakpoint and/or event.
    // 
    // Example uses:
    // app.ResponsiveBreakpoints.trigger_event()
    // app.ResponsiveBreakpoints.trigger_event("all")
    // app.ResponsiveBreakpoints.trigger_event("all", "slideshow-auto-height")
    // 
    // If no parameters are passed, events for the current breakpoint and "all" are triggered.
    trigger_event: function( breakpoint, event ) {

      if( !breakpoint ) return this.breakpoint_handler()

      if( this.breakpoint_api[ breakpoint ] && !event ){
        return this.execute_handlers( this.breakpoint_api[ breakpoint ] )
      }

      if( this.breakpoint_api[ breakpoint ] && event ){
        return this.execute_handler( this.breakpoint_api[ breakpoint ][ event ] )
      }

      throw new Error('The requested event was not found.')
    },

    // get_breakpoints is a utility to identify which breakpoints have been assigned via the configuration object and/or defaults
    get_breakpoints: function() {
      return this.breakpoint_api
    },

    // get_current_breakpoints returns the current breakpoint for the viewport
    get_current_breakpoints: function() {
      var self, currentWidth, devicePixelRatio, scrollBarWidth

      self = this
      currentWidth = $win.width()
      devicePixelRatio = this.devicePixelRatio

      // Non-webkit browsers include the scrollbar width in their CSS media query calculations
      if( !$.browser.webkit  ) {
        scrollBarWidth = window.innerWidth - $('body').width()
        currentWidth = currentWidth + scrollBarWidth
      }

      /////////////////////////////////
      // IMPORTANT!
      /////////////////////////////////
      // 
      // If we have a device pixel ratio greater than 1, calculate the correct breakpoint for assignment.
      // This could have unknown effects in the future so be mindful of these calculations!
      // Note: iPad reports the screen resolution with the devicePixelRatio already computed out,
      // so we've added logic to prevent this calculation from recurring here.
      // 
      // if ( devicePixelRatio > 1 && !this.isIpad ) {
      //   currentWidth = currentWidth/devicePixelRatio
      // }

      return get_breakpoints()

      function get_breakpoints() {
        var _i, range, range_top, range_btm,
        breakpoints = []

        $.each(self.breakpoint_api, function(range, obj) {

          ranges = range.split('-')
          range_btm = ranges[0]
          range_top = ranges[1]

          if( range_top == "+" ) range_top = Infinity

          if( currentWidth < range_top && currentWidth >= range_btm ){
            breakpoints.push( range )
          }
        })

        return breakpoints
      }
    },

    // trigger_breakpoint_handlers loops the available events for the current breakpoint and executes them.
    // Also, execute any breakpoint handlers added to "all".
    // Note that by design, handlers for the specific breakpoint execute before handlers for the "all" event handlers.
    trigger_breakpoint_handlers: function( breakpoints ) {
      var all = [ "all" ]
      this.execute_handlers( breakpoints )
      this.execute_handlers( all )
      return $.extend({}, breakpoints, all)
    },

    // Utility to loop an array of breakpoints.
    // If the breakpoint has no registered events, skip it.
    // Then, execute the registered events for breakpoints that have them.
    execute_handlers: function( arr ) {
      var self, _i, fct, breakpoint, breakpoints

      self = this
      breakpoints = []
      
      $.each(arr, function(i, breakpoint) {
        if( !$.isEmptyObject( self.breakpoint_api[ breakpoint ] ) ) {
          breakpoints.push( self.breakpoint_api[ breakpoint ] )
        }
      })

      $.each(breakpoints, function(i, breakpoint) {
        for( fct in breakpoint ) {
          self.execute_handler( breakpoint[ fct ] )
        }
      })

      return breakpoints
    },

    // Utility to execute functions
    execute_handler: function( fct ) {
      if( typeof fct != "function" ) return
      fct()
      return fct
    },

    // Gathers & triggers the approprate breakpoints.
    breakpoint_handler: function() {
      breakpoints = this.get_current_breakpoints()
      breakpoints && this.trigger_breakpoint_handlers( breakpoints )
      return breakpoints
    },

    // Initialize Module Name
    init: function() { 
      var self, breakpoints

      self = this
      breakpoints = this.options.breakpoints

      // Sort the breakpoints from highest to lowest.
      // Add a bottom breakpoint of "0" if it wasn't explicity defined
      breakpoints.sort(sort_array_ascending)

      if( breakpoints[ breakpoints.length - 1 ] != 0 ) breakpoints.unshift(0)

      // Set up breakpoint objects
      assign_event_ranges()

      // throttledresize is the primary event handler for the window resizing on the webiste.
      // We're using a jQuery special event to reduce the amount of times in which the event is fired.
      $win.on("debouncedresize", function(e) {
        self.breakpoint_handler()
      })

      // assign_event_ranges adds a core API to the breakpoint module.
      // Here we assign an empty array for each of the breakpoint ranges that will be availabe.
      // Each breakpoint range accepts an array of functions to execute when a breakpoint is triggered. 
      function assign_event_ranges() {
        var breakpoints,  _i

        breakpoints = self.options.breakpoints
        breakpoints = generate_combinations( breakpoints )

        // Loop the breakpoint combinations and assign an object for the API
        // debugger
        for( _i = breakpoints.length - 1; _i >= 0; _i-- ){
          // console.log( breakpoints[ _i ] )
          self.breakpoint_api[ breakpoints[ _i ] ] = {}
        }

        // Assign a breakpoint representing the maximum value through infinity
        self.breakpoint_api[ breakpoints[0] + '-+' ] = {}

        // Assign an "all" breakpoint which fires for all resizes
        self.breakpoint_api[ 'all' ] = {}

      }

      // Utility to sort an array from lowest to highest
      function sort_array_ascending(a, b) {
        return a - b
      }

      // Utility to gather all breakpoint combinations
      // This could prob be improved. After writing this twice, 
      // IE8 w/low RAM still breaks on the recursion,
      // We've treated IE < 9 differently at the top of this script.
      function generate_combinations(control) {
        var _i = 0,
            arr, limit, outputBreakpoints

        arr = control.slice() // returns fresh copy of array
        limit = ( control.length )
        outerLimit = ( control.length + 1 )
        output = []

        for( ; _i < limit; _i++ ) {
          get_next_breakpoints( _i + 1 )
        }

        return output

        // For each control breakpoint, we loop the control array at the current index + 1.
        // This collects the upcoming breakpoints from the copied array.
        // If we've reached the "outerLimit", then we provide a limitless breakpoint such as "480-+"
        function get_next_breakpoints( i ) {
          var _j

          for( _j = i; _j < outerLimit; _j++ ) {
            if( typeof arr[_j] == 'undefined' ) {
              output.push( control[_i] + '-+' )
              break
            }
            output.push( control[_i] + '-' + arr[_j] )
          }
        }
      } // end generate_combinations
    },

    // Destory Module Name Events & Extras
    destroy: function() {
      // Undo everything that init does
    }
  }

  ResponsiveBreakpoints.defaults = {

    // Assign default breakpoints for event handling
    // 
    breakpoints: [
      // 480,
      768,
      992
      // 1200
    ]
  }

  // Attach the ResponsiveBreakpoints constructor to our global namespace
  app._Modules.ResponsiveBreakpoints = ResponsiveBreakpoints
  
  // Module Helpers
  helpers = {

  }

  /////////////////////////////////////
  // End Module Name
  /////////////////////////////////////

}( jQuery, BuffaloWildWings )

