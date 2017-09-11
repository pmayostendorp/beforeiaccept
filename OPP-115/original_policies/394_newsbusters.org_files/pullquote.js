(function ($) {

Drupal.behaviors.pullquote = {
  attach: function(context) {
    $('.pullquote:not(.pullquote-processed)', context).each(function () {
      var $span = $(this).addClass('pullquote-processed');
      // Decide if we should add a left indicator to the generated quote.
      var $leftClass = '';
      if ($span.hasClass('pullquote-left')) {
        $leftClass = ' pullquote-left';
      }
      // May be extended later on. (simply add ',div')
      var $parent = $span.parent();
      if ($parent.length) {
        // In the case of a pullquote inside any of the above contained/nested
        // elements
        var $elements = ['LI','UL','OL','TD','TR','TBODY','TABLE'];
        // Set a flag. Should we add the quote above the element or inside it?
        // pos set to 0 will be inside, 1 will be above.
        var pos = 0;
        while( jQuery.inArray($parent.get(0).tagName, $elements ) > -1 ) {
          pos = 1;
          if ($parent.parent().get(0).tagName == 'DIV') {
            break;
          }
          $parent = $parent.parent();
        }
        // Apply conditional pullquote container styling.
        $parent.addClass('pullquote-container');
        $text = $span.text();
        if (pos == 0 && $parent.get(0).tagName == 'BLOCKQUOTE') {
          // Blockquote is a special case. To have valid HTML you can't have
          // inline level elements in the blockquote. They must be block level
          // elements so we'll use a div here instead.
          $span.clone()
            .replaceWith('<div class="pullquote-processed' + $leftClass + '">' + $text + '</div>')
            .addClass('pullquote-quote')
            .prependTo($parent);
        }
        else if (pos == 0) {
          $span.clone()
            .replaceWith('<span class="pullquote-processed' + $leftClass + '">' + $text + '</span>')
            .addClass('pullquote-quote')
            .prependTo($parent);

        }
        else {
          $second = $span.clone()
            .replaceWith('<span class="pullquote-processed' + $leftClass + '">' + $text + '</span>')
            .addClass('pullquote-quote');
          $parent.before($second);
        }
      }
    });
  }
};

})(jQuery);
