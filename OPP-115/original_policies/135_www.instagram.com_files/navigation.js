function pin_sidebar() {
    var sidebar_height = $('.sidebar-content').height();
    var window_height = $(window).height();
    if (window_height - sidebar_height >= 50) {
        var offset = $(window).scrollTop();
        if (offset > 50) {
            $('.sidebar-content').addClass('pinned');
        } else {
            $('.sidebar-content').removeClass('pinned');
        }
    } else {
        $('.sidebar-content').removeClass('pinned');
    }
}

$(function() {

    $(window).scroll(pin_sidebar);
    $(window).resize(pin_sidebar);

    $('.sidebar .subtitle').html($('.sidebar li.active a').text())

    $('.sidebar-content h2, .sidebar-content .disclosure-down').click(function(e) {
        if ($(window ).width() <= 640) {
            $(this).parents('.sidebar-content').toggleClass('active');
            $('.sidebar-content ul').not($(this)).slideToggle('fast');
            $(this).find('.subtitle, .separator').fadeToggle('fast');
        }
    });

});
