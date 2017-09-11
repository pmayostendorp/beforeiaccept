/*
 * University of Houston
 * Main Website Module/Widget Scripts
 * 
 * Table of Contents:
 * ------------------
 * Gallery
 */


/*
 * Gallery
 */
$(window).load(function(){
    $('#carousel').flexslider({
        animation: "slide",
        controlNav: false,
        // animationLoop: false,
        slideshow: false,
        itemWidth: 210,
        itemMargin: 5,
        asNavFor: '#slider'
    });
    $('#slider').flexslider({
        animation: "fade",
        controlNav: false,
        smoothHeight: true,
        // animationLoop: false,
        slideshow: false,
        sync: "#carousel",
        start: function(slider){
            $('body').removeClass('loading');
        }
    });
});