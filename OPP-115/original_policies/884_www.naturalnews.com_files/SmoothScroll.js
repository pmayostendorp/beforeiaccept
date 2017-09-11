// BEGIN Smooth Scrolling Feature -----------------------------------
$('a').click(function(){
    $('html, body').animate({
        scrollTop: $( $(this).attr('href') ).offset().top
    }, 750);
    return false;
});