!function( $ ) {
  var appender

  // TODO:
  // 1. Replace div with video element if browser supports it

  appender = function( options ) {
    var options
    this.options = $.extend({}, appender.defaults, options)
    options = this.options

    this.$appendModule = options.appendedModule
    this.$dataName = options.dataName
    this.$selectedModule = $(this.$appendModule)
    this.$moduleAttr = this.$dataName
    this.$moduleSet = $( "["+ this.$moduleAttr +"='"+ this.$selectedModule.parents( "["+ this.$moduleAttr +"]" ).attr( this.$moduleAttr ) + "']" )  

    this.init()
  }

  appender.prototype = {
  
    init: function() {
      var self = this

      $(domReady)

      // Utility function to execute on jQuery's DOM Ready 
      function domReady(){
        $(window).resize($.proxy(self.append_to_visible_element, self))
        self.append_to_visible_element()
      }
    },

    append_to_visible_element: function(e) {
      var self = this

      self.$selectedModule.each(function(i){
        if( self.$selectedModule.eq(i).is( ":hidden" ) ){
          self.$selectedModule.eq(i).appendTo( self.$moduleSet.filter( ":visible" ).eq(i) )
        }
      })
    }

  }

  appender.defaults = {
    appendedModule : '.content-holder.',
    dataName : 'data-append'
  }

  BuffaloWildWings._Modules.appender = appender

}(window.jQuery)

