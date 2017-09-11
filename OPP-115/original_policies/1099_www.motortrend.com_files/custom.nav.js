/**
 * Created by duy.nguyen on 2/13/14.
 */

var menu_animate = false;
var top_top_animate = false;
var top_top_active = false;
var main_nav_active = true;

if(window.location.hash) {
    var hash = location.hash.replace('#', '');

    setTimeout(function(){
        //jQuery("html, body").scrollTop(jQuery("#"+hash).offset().top-85);
        jQuery("html, body").scrollTop(jQuery("#"+hash).offset().top-101);
    }, 1);
}

jQuery(document).ready(function($){
    var main_nav = $("#nav");
    var the_menu = $('#moei_top_menu_list');
    var menu_wrap = the_menu.parent();
    var lastScrollTop = 0;
    var menuLayoutTimer = null;
    var sticky_download_timeout = null;

    init_menu();
    init_top_top();
    $(window).smartresize(function(){
        clearTimeout(menuLayoutTimer);
        init_menu();
    });

    function init_top_top(){
        var scrollTop_val = $(window).scrollTop();

        if(scrollTop_val <= 200){
            hide_top_top();
        }
        else{
            show_top_top();
        }
    }

    function init_menu(){
        if(!MWDNT.tools.isDesktop()){

            if(!menu_wrap.hasClass('mobile_mode')){
                main_nav.css('margin-top', '0');

                // SET HEIGHT FIRST BEFORE HIDING
                menuLayoutTimer = window.setTimeout(calc_mobile_menu(), 100, null);
            }
        }
        else{
            if(menu_wrap.hasClass('mobile_mode')){
                menu_wrap.show().removeClass('mobile_mode').css({
                    'height': 40,
                    'top':0
                });
            }

        }
    }


    $(window).scroll(function() {

        var scrollTop_val = $(window).scrollTop();

        if(MWDNT.tools.isDesktop() || main_nav.css('position') == 'fixed'){
            if(!menu_animate && false){
                if(scrollTop_val <= 200 && !main_nav_active && isScrollUp()){
                    open_main_nav();
                }
                else if(scrollTop_val > 200 && main_nav_active){
                    close_main_nav();
                }
            }

            if(!top_top_animate){
                if(scrollTop_val <= 200 && top_top_active && isScrollUp()){
                    hide_top_top();
                }
                else if(scrollTop_val > 200 && !top_top_active){
                    show_top_top();
                }
            }
        }
        else if(!top_top_animate){

            if(scrollTop_val <= 200 && top_top_active && isScrollUp()){
                hide_top_top();
            }
            else if(scrollTop_val > 200 && !top_top_active){
                // NOW SHOW TO TOP BUTTON
                show_top_top();
            }
        }
        lastScrollTop = scrollTop_val;

        if(scrollTop_val >= 200){
            animate_sticky_download();
        }
        else if(sticky_download_timeout){
            clearTimeout(sticky_download_timeout);
        }

    });


    the_menu.on('click', 'a', function(e){
        if(!MWDNT.tools.isDesktop()){
            menu_wrap.removeClass('active').animate({
                top: '-'+(menu_wrap.height())+'px'
            }, 500);
        }
    });

    // MOBILE MENU TOGGLE
    $('#mobile-nav-trigger').on("click", function(e){
        e.preventDefault();
        //var the_menu = $('#moei_top_menu_list');
        if(menu_wrap.hasClass('active')){
            menu_wrap.removeClass('active').animate({
                top: '-'+(menu_wrap.height())+'px'
            }, 500, function(){
                menu_wrap.hide();
            });
        }
        else{
            menu_wrap.show().addClass('active').animate({
                top: '0'
            }, 500);
        }

        return false;
    });

    function calc_mobile_menu(){
        //var d = $.Deferred();

        if(the_menu.height() <= $(window).height()) menu_wrap.css({
            'height': the_menu.height(),
            'top': '-'+the_menu.height()+'px'
        });
        else menu_wrap.css({
            'height': $(window).height(),
            'top': '-'+$(window).height()+'px'
        });

        menu_wrap.addClass('mobile_mode').hide();
    }

    $("#main_nav_trigger").on("click",function(evt){
        evt.preventDefault();

        (main_nav_active) ? close_main_nav() : open_main_nav();

        return false;
    });



    $("#top_top_anchor").on("click", function(evt) {
        evt.preventDefault();
        $('#moei_top_menu_list').find('.active').removeClass('active');
        return false;
    });


    var sticky_download = $('#moeimk_sticky_download');
    var sd_height = 0;
    if(sticky_download.length > 0){
        sd_height = 2*parseInt(sticky_download.height());

        if($(window).scrollTop() >= 200){
            animate_sticky_download();
        }
    }

    function animate_sticky_download(){
        if(sticky_download.hasClass("visible") || (!sticky_download.hasClass("visible") && sticky_download_timeout == null) ){
            sticky_download.css({
                "transform": "translateY(-"+(2*sd_height)+"px)"
            }).removeClass("visible");
        }
        else if(sticky_download_timeout){
            clearTimeout(sticky_download_timeout);
        }

        sticky_download_timeout = window.setTimeout(do_animate_sticky_download, 1000, null);
    }
    function do_animate_sticky_download(){
        sticky_download.css({
            "transform": "translateY(0px)",
            "visibility": "visible"
        }).addClass("visible");

        sticky_download_timeout = null;
    }

    function open_main_nav(){
        main_nav_active = true;
        menu_animate = true;

        $("#nav_spacer").animate({
            "padding-bottom": "101"
        }, 500);

        main_nav.animate({
            "top": "0"
        }, 500, function(){
            menu_animate = false;
        });
    }

    function close_main_nav(){

        menu_animate = true;
        console.log('close');

        $("#nav_spacer").animate({
            "padding-bottom": "0"
        }, 200);

        main_nav.animate({
            "top": "-101"
        }, 200, function(){
            menu_animate = false;
            main_nav_active = false;
        });
    }

    function hide_top_top(){
        top_top_animate = true;
        var offset = -40;
        // NOW SHOW TO TOP BUTTON
        if(MWDNT.tools.isDesktop()){
            offset = -50;
        }
        $("#top_top_container").animate({
            "bottom": offset
        }, 1000, function(){
            top_top_animate = false;
            top_top_active = false;
        });
    }

    function show_top_top(){
        top_top_animate = true;
        top_top_active = true;
        // NOW SHOW TO TOP BUTTON
        $("#top_top_container").animate({
            "bottom": '0'
        }, 1000, function(){
            top_top_animate = false;
        });
    }


    /**
    * Detect Scroll direction by a previously logged scrollTop location in the window onscroll event.
    **/
    function isScrollUp(){
        var st = $(window).scrollTop();
        return (st < lastScrollTop);
    }

});