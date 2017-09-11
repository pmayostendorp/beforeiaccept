  /*
   * $.fn.addTextShadows is designed to fake text shadows in IE < 9 browsers.
   * It clones the desired text nodes and applies the same font characterstics 
   * as the original node. These nodes a placed in a wrapper for positioning the shadow effect.
   *
   * Note: addTextShadows uses jQuery to gather the inner HTML of the element being selected. 
   * This could have negative effects if the inner HTML includes additional wrapping elements around your text node.
   *
   * Could consider the following CSS for this plugin also:
   * zoom: 1;
   * filter: progid:DXImageTransform.Microsoft.Shadow(color='#969696', Direction=135, Strength=3);
 */
!function() {
  var _i = 0

  jQuery.fn.addTextShadows = function( options ) {
    var defaults

    defaults = {
      shadowDistance: 2
    }

    options = options ? $.extend(defaults, options) : defaults

    return this.each(function() {        
      var $this, innerWidth, innerHeight, outerWidth, outerHeight, wrapperID, margin

      $this = $(this)
      
      innerWidth = $this.width()
      innerHeight = $this.height()

      outerWidth = $this.outerWidth( true )
      outerHeight = $this.outerHeight( true )

      marginTop = $this.css('margin-top')
      marginLeft = $this.css('margin-left')
      marginRight = $this.css('margin-right')
      marginBottom = $this.css('margin-bottom')

      paddingTop = $this.css('padding-top')
      paddingLeft = $this.css('padding-left')
      paddingRight = $this.css('padding-right')
      paddingBottom = $this.css('padding-bottom')

      wrapperID = "textShadowWrapper_" + ( ++_i )

      $this
        .wrap('<div id="' + wrapperID + '" class="text-shadow-wrapper"></div>')

      $( '#' + wrapperID ).css({
        // Positioning & box model for wrapper
        position: 'relative',
        width: outerWidth,
        height: outerHeight
      })

      $this
        .css({
          // Positioning for original text
          position: 'absolute',
          zIndex: '1',
          top: '0',
          left: '0',

          // Box model
          width: innerWidth,
          height: innerHeight
        })
        .after('<div class="ie-text-shadow-bottom">' + $this.html() + '</div>')
          .next()
          .css({
            // Positioning for shadow
            'position': 'absolute',
            'z-index': '0',
            'top': options.shadowDistance + 'px',
            'left': options.shadowDistance + 'px',

            // Box model
            'width': innerWidth,
            'height': innerHeight,

            'margin-top': marginTop,
            'margin-left': marginLeft,
            'margin-right': marginRight,
            'margin-bottom': marginBottom,

            'padding-top': paddingTop,
            'padding-left': paddingLeft,
            'padding-right': paddingRight,
            'padding-bottom': paddingBottom,

            // Clonse font characteristics
            'font-size': $this.css('font-size'),
            'font-weight': $this.css('font-weight'),
            'font-family': $this.css('font-family'),
            'letter-spacing': $this.css('letter-spacing'),
            'line-height': $this.css('line-height'),
            'text-transform': $this.css('text-transform'),
            'color': 'black'
          }) // end css
    }) // end this.each
  } // end $.fn.addTextShadows
}()

