
$(function(){

    if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
      var msViewportStyle = document.createElement('style');
      msViewportStyle.appendChild(
        document.createTextNode(
          '@-ms-viewport{width:auto!important}'
        )
      )
      document.querySelector('head').appendChild(msViewportStyle);
    }

    $("#share-toolbox, .share-toolbox, #sidebar-share-toolbox , #share-socialmedia").on('click', function(e) {
        var target = e.target,
            $target = $(target).parent('a'),
            share_url;

        if ($target.data('share-url')) {
            share_url = $target.data('share-url');
        }
        else if (typeof get_link_to_app === 'undefined') {
            share_url = location.href;
        }
        else {
            share_url = get_link_to_app('fred');
        }

        if ($target.is('.fa-twitter-bird, .icon-twitter-bird, .sprite-twitter-bird, .button-twitter-large, .share-twitter')) {
            var twitter_message = encodeURIComponent(share_url + ' #FRED'),
                twitter_url = 'http://twitter.com/intent/tweet?text=' + twitter_message + "&amp;via=stlouisfed"; 
            $target.attr('href', twitter_url);

        }
        else if ($target.is('.icon-facebook,.button-facebook-large, .share-facebook')) {

            var t = $('h1').first().text();
            window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent(share_url)+'&t='+encodeURIComponent(t),'sharer','toolbar=0,status=0,width=626,height=436');
            return false;

        }
        else if ($target.is('.button-gplus-large, .share-gplus')) {

            var gplus_message = encodeURIComponent(share_url),
                gplus_url = 'https://plus.google.com/share?url=' + gplus_message;

            window.open(gplus_url,'','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
            return false;
        }
        else if ($target.is('.button-reddit-large, .share-reddit')) {

            var reddit_url = 'http://www.reddit.com/submit?url=' + share_url;

            window.open(reddit_url,'','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
            return false;
        }
        else if ($target.is('.icon-mail-square, .button-mail-large, .share-mail')) {
            var mailto_url = "mailto:?subject=" + encodeURIComponent($('h1').first().text()) + "&body=" + share_url;
            $(location).attr('href', mailto_url);
            return false;

        }
        return true;
    });

    if (document.cookie.indexOf("research-lirua") >= 0) {
        $('.signedout').hide();
        $('.signedin').show();
        $('.favorite-toggle').removeClass('hide');

        $.get('/fred2/graph/ajax-requests.php', {action: 'load_favorites'}, function(data) {
            if(data) {
                for(var i in data) {
                    $('.my-fred-favorites').append('<p><a href="/fred2/series/'+data[i].series_id+'" style="color:#333;text-transform:none"><i class="fa fa-fw fa-star"></i> '+data[i].title+'</a></p>');
                }
            }
            else {
                $('.my-fred-favorites').append('<span style="color:#999">You have not saved any favorites yet.</span>');
            }
        });


        $('.my-account-link').on('click', function(e) {
            var myAccountMenu = $(this).parent().find('.my-account-menu');
            if(myAccountMenu.is(':hidden')) {
                myAccountMenu.css({display:'block'}).fadeIn('fast');
            }
            else {
                myAccountMenu.fadeOut();
            }
            e.preventDefault();
        });
    }
    else {
        $('.signedout').show();
        $('.signedin').hide();

        $('.favorite-tooltip').tooltip({placement: 'bottom', trigger: 'manual'});
        $('.favorite-tooltip').on('click', function () {
            $(this).tooltip('toggle');
        });
    }

    $(".signin").click(function(e) {
        e.preventDefault();
        if($('#signin_menu').is(":hidden")) {
            $("#signin_menu").css({display:'block'}).fadeIn('fast');
            $('#user-email').focus();
        }
    });
    
    $("#signin_menu").mouseup(function () {
        return false;
    });
    
    $(document).mouseup(function (e) {
        if ($(e.target).parent("a.signin").length === 0) {
            $("#signin_menu, .my-account-menu").fadeOut();
        }
    });

    $('.js-placeholder').each(function () {
        if ($(this).val() === '') {
            $(this).val($(this).prop('title'));
        }
    });

    $('.js-placeholder').focus(function () {
        var input = $(this);
        if (input.val() === input.attr('title')) {
            input.val('');
            input.removeClass('placeholder');
        }
    }).blur(function () {
        var input = $(this);
        if (input.val() === '' || input.val() === input.attr('title')) {
            input.addClass('placeholder');
            input.val(input.attr('title'));
        }
    }).blur().parents('form').submit(function () {
        $(this).find('.js-placeholder').each(function () {
            var input = $(this);
            if (input.val() === input.attr('title')) {
                input.val('');
            }
        });
    });

    var maxLengthTextarea = function () {
        var txts = document.getElementsByTagName('TEXTAREA');

        for (var i = 0, l = txts.length; i < l; i++) {
            if (/^[0-9]+$/.test(txts[i].getAttribute("maxlength"))) {
                var func = function () {
                    var len = parseInt(this.getAttribute("maxlength"), 10);

                    if (this.value.length > len) {
                        window.alert('Maximum length exceeded: ' + len);
                        this.value = this.value.substr(0, len);
                        return false;
                    }
                };

                txts[i].onkeyup = func;
                txts[i].onblur = func;
            }
        }
    };

    maxLengthTextarea();

    $(document).on('click', '.favorite-toggle', function (e) {
        var star = $(e.target),
            series_id = $(e.target).data('series-id'),
            timeoutID,
            result;

        if (star.hasClass('fa-star-o')) {

            result = addFavorite(series_id);
            if (!result) {
                return false;
            }

            star.removeClass('fa-star-o').addClass('fa-star');

        } else {
            result = removeFavorite(series_id);

            if (!result) {
                return false;
            }

            star.removeClass('fa-star')
                .addClass('fa-star-o');
        }
    });

    var getFavoriteStatus = function (series_id) {
        return $.ajax({
            url: '/fred2/graph/ajax-requests.php',
            async: false,
            data: { s: series_id, action: 'is_favorited' }
        }).responseText;
    };

    $(window).on('load', function (e) {
        var star = $('.favorite-toggle:visible'),
            status = false;

        if (star.length > 0) {

            $.each(star, function (i, v) {
                status = getFavoriteStatus($(v).data('series-id'));
                if (status) {
                    $(v).removeClass('fa-star-o')
                        .addClass('fa-star');
                }

            });
        }
    });

    window.debouncer = function (func, timeout) {
        var timeoutID, timeout = timeout || 200;
        return function () {
            var scope = this, args = arguments;
            clearTimeout(timeoutID);
            timeoutID = setTimeout(function () {
              func.apply(scope, Array.prototype.slice.call(args));
            }, timeout );
        }
    }

    var addFavorite = function (series_id) {

        return $.ajax({
            url: '/fred2/graph/ajax-requests.php',
            async: false,
            data: { s: series_id, action: 'add_favorite' }
        }).responseText;

    };

    var removeFavorite = function (series_id) {
        return $.ajax({
            url: '/fred2/graph/ajax-requests.php',
            async: false,
            data: { s: series_id, action: 'remove_favorite' }
        }).responseText;

    };

    // Polyfill for array filter from mdn
    if (!Array.prototype.filter)
    {
      Array.prototype.filter = function(fun /*, thisArg */)
      {
        "use strict";

        if (this === void 0 || this === null)
          throw new TypeError();

        var t = Object(this);
        var len = t.length >>> 0;
        if (typeof fun !== "function")
          throw new TypeError();

        var res = [];
        var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
        for (var i = 0; i < len; i++)
        {
          if (i in t)
          {
            var val = t[i];

            if (fun.call(thisArg, val, i, t))
              res.push(val);
          }
        }

        return res;
      };
    }

    $('nav .dropdown').hover(function() {
        $(this).find('.dropdown-menu')
               .stop(true, true)
               .delay(200)
               .fadeIn(500);
    }, function() {
        $(this).find('.dropdown-menu')
               .stop(true, true)
               .delay(200)
               .fadeOut(500);
    });

});


