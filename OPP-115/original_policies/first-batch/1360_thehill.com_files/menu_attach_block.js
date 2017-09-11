(function ($) {
  // Implement an extremely simplistic show/hide.
  Drupal.behaviors.menu_attach_block = {
    attach: function (context, settings) {
      $('a.menu-attach-block-drop-link', context).click(function(event) {
        var link = $(this);
        $(link).next('.menu-attach-block-wrapper').slideToggle('fast');
        $(link).parent().toggleClass('dropped');
        event.preventDefault();
      });
      // Prevent other Javascript from effecting the display of drop links.
      $('.menu-attach-block-drop-link')
        .hover(function(){return false;}, function(){return false;});
    }
  }
}(jQuery));
