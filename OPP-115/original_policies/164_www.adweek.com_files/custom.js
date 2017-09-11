$(document).ready(function() {
    //fix_first_letter($(".article"));
    //fix_first_letter($("#print-content"));

    var date = new Date();
    var month = date.getMonth();
    var day = date.getDate();
    var year = date.getFullYear() + 1;

    if(Get_Cookie("visits_counter")) {
        var counter = parseFloat(Get_Cookie("visits_counter")) + 1;
        Set_Cookie("visits_counter", counter, "", "/", "", "");
    }

    if(Get_Cookie("visits_counter") == null) {
        Set_Cookie("visits_counter", "1", day+"."+month+"."+year, "/", "", "");
    }

    $("#nav .subscribe_popup #close_subscribe").click(function() {
        $(this).parent().css("display", "none");
    });

    $(".subscribe_block").mouseover(function() {
        $("#nav .subscribe_popup").css("display", "block");
    });

    $(".subscribe_block").mouseout(function() {
        $("#nav .subscribe_popup").css("display", "none");
    });

    if(Get_Cookie("visits_counter") % 20 == 0) {
        $("#nav .subscribe_popup").css("display", "block");
        Delete_Cookie("visits_counter", "/", "");
    }

    $("#nav .subscribe_block").bind("mouseover", function() {
        $("#nav .subscribe_popup").css("display", "block");
    });

    $("#nav .subscribe_block").bind("mouseleave",  function() {
        $("#nav .subscribe_popup").css("display", "none");
    });

    $("#comments").mouseover();

    if($.browser.msie && $.browser.version.substr(0,1) <= 7 && $.browser.version != 10) {
        $(function() {
            var zIndexNumber = 1000;
            $('div').each(function() {
                $(this).css('zIndex', zIndexNumber);
                zIndexNumber -= 10;
            });
        });
    }

    function getUrlVars()
    {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('/');

        for(var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }

    $("#article.columns #main .content > p:first").css("text-indent", "0").each(function() {
        var vars = getUrlVars();
        if(vars['3'] != 'sa-article') {
            var text = $(this).html();
            text = text.replace(/^\s\s*/, '');
            var first_letter = text.substr(0,1);
            if(/[a-zA-Z]/.test(first_letter)) {
                $(this).html('<span class="init-cap">' + first_letter + '</span>' + text.slice(1));
            } else if(!/[a-zA-Z]/.test(first_letter)) {
                first_letter = text.substr(0,2);
                $(this).html('<span class="init-cap">' + first_letter + '</span>' + text.slice(2));
            }
        }
    });

    var i = 1;
    $(".list.list-columns li").each(function() {
        $(this).find("a").first().attr("onclick", "_gaq.push(['_trackEvent', 'Column Module', 'Column"+i+"', '"+$(this).find('a').first().attr('href')+"']);");
        i++;
    });

    var k = 1;
    $("#header-content.cols").find(".col").each(function() {
        if(k == 1) {
            var lit = "L";
        } else if(k == 2) {
            var lit = "C";
        } else if(k == 3) {
            var lit = "R";
        }
        $(this).find("a").attr("onclick", "_gaq.push(['_trackEvent', 'Header Promo', 'Header"+lit+"', '"+$(this).find('a').attr('href')+"']);");
        k++;
    });

    var p = 1;
    $(".mod-content .node.story.published").each(function() {
        $(this).find("span.headline a").attr("onclick", "_gaq.push(['_trackEvent', 'Editor Pick', 'Pos"+p+"', '"+$(this).find("span.headline a").attr('href')+"']);");
        p++;
    });

    var t = 1;
    $(".list.list-feed li").each(function() {
        if($(this).hasClass("buzzed")) {
            var cas = "Buzzed" + t;
        } else if($(this).hasClass("breaking")) {
            var cas = "Breaking" + t;
        } else {
            var cas = t;
        }
        $(this).find("a").attr("onclick", "_gaq.push(['_trackEvent', 'The Feed', 'Pos"+cas+"', '"+$(this).find('a').attr('href')+"']);");
        t++;
    });

    /*$(".enlarge a").click(function() {
        var raw_img = $(".article.article-single .gallery-img .imagecache.imagecache-node-detail").attr("src");
        raw_img = raw_img.replace('imagecache/node-detail/', '');
        $("#lightbox .gallery-media-shell .media .imagecache.imagecache-node-detail").attr("src", raw_img);
        $("#lightbox .gallery-media-shell .media .imagecache.imagecache-node-detail").removeAttr("width");
        $("#lightbox .gallery-media-shell .media .imagecache.imagecache-node-detail").removeAttr("height");
    });

    $(".next a").click(function() {
        var raw_img = $(".article.article-single .gallery-img .imagecache.imagecache-node-detail").attr("src");
        raw_img = raw_img.replace('imagecache/node-detail/', '');
        $("#lightbox .gallery-media-shell .media .imagecache.imagecache-node-detail").attr("src", raw_img);
        $("#lightbox .gallery-media-shell .media .imagecache.imagecache-node-detail").removeAttr("width");
        $("#lightbox .gallery-media-shell .media .imagecache.imagecache-node-detail").removeAttr("height");
    });

    $(".prev a").click(function() {
        var raw_img = $(".article.article-single .gallery-img .imagecache.imagecache-node-detail").attr("src");
        raw_img = raw_img.replace('imagecache/node-detail/', '');
        $("#lightbox .gallery-media-shell .media .imagecache.imagecache-node-detail").attr("src", raw_img);
        $("#lightbox .gallery-media-shell .media .imagecache.imagecache-node-detail").removeAttr("width");
        $("#lightbox .gallery-media-shell .media .imagecache.imagecache-node-detail").removeAttr("height");
    });*/

    /*$(".mod.mod-gallery.mod-related-videos ul.list-x li .subheadline").each(function(index) {
        var position = $(this).position();
        var text = $(this).text();

        while($(this).height() + position.top > $(this).parent().outerHeight()) {
            text = text.substr(0, text.lastIndexOf(" ")) + "...";
        }

        $(this).html(text);
    });*/

    /*$(".embed-image-caption").each(function() {
        var el = $(this).prev().andSelf();
        if (el != null && el.is("img")) {
            el.andSelf().wrapAll("<div class=\"graph\" />");
        }
    });*/
   
    
    

    $("#post").mouseover(function() {
        $(".sharebar").css({
            "position": "relative",
            "z-index": "100"
        });
        $("#email_print_comments").css("display", "block");
        $(".ruler.meta").css("overflow", "visible ");
        $("#post .meta .share").css("overflow", "visible");
    });

    $("#post").mouseout(function() {
        $("#email_print_comments").css("display", "none");
        $(".ruler.meta").css("overflow", "hidden");
        $("#post .meta .share").css("overflow", "hidden");
    });

    $(".mod.mod-author .mod-content p iframe").css("width", "65px");

    $("img.hoverable").mouseover(function() {
        var image_source    = $(this).attr("src");
        var image_name      = image_source.replace(/^.*\//, '');
        var image_path      = image_source.replace(image_name, '');
        var image_name_type = image_name.split("_");

        if(image_name_type[0] == "normal") {
            $(this).hover().css("cursor", "pointer").attr("src", image_path + "hover_" + image_name_type[1]);
        }
    }).mouseout(function() {
        var image_source    = $(this).attr("src");
        var image_name      = image_source.replace(/^.*\//, '');
        var image_path      = image_source.replace(image_name, '');
        var image_name_type = image_name.split("_");

        if(image_name_type[0] == "hover") {
            $(this).hover().attr("src", image_path + "normal_" + image_name_type[1]);
        }
    });

    if ($('#newsletters-form').size())
    {
        if ($('#newsletters-form .select-box > .form-item > .messages.error').size())
        {
            $('#newsletters-form .select-box').first().before($('#newsletters-form .select-box > .form-item > .messages.error'));
        }
    }

    /*
    if ($("body#article.node-type-news-article").length) {
        var $nli = $("#main .colsAB .article-single .news-article-image")
        //$nli.width($nli.find("img").width());
    }
    */

    if ($('#article').length) {
        // cant use dynamic rule because of
        // https://bugzilla.mozilla.org/show_bug.cgi?id=8253
        var $p_first_text = $.trim($('#article #main div.article > p:first').text()); // Check if first <p> contatins text
        if (!$p_first_text.length) {
            var $p = $('#article #main div.article > p:first:has(img:first-child)').next('p');
            if ($p.length) {
                var text = $.trim($p.text());
                $p.html($p.html().replace(text.charAt(0), '<span class="char1">'+text.charAt(0)+'</span>'));
            }
        }
    }


/*
    if ($("body#article.node-type-news-article").length) {
        var $img = $("#main .article-footer .mod.mod-photo"),
            img_after_line = 5,
            line = 0;
        if ($img.length) {
            // if we have an image, lets put it under 5'th line of tex from the article begining
            //$img.remove();
            var $text = $img.parents(".article-single").find("p.google_elide").each(function() {
                var line_height = parseInt($(this).css("lineHeight")),
                    p_lines = $(this).height()/line_height;
                if (line+p_lines == img_after_line) {
                    //easiest case. just put image after current paragraph
                    $(this).after($img.css({float: "left", margin: "6px 10px 6px 0"}).remove());
                    return false;
                } else if (line+p_lines > img_after_line) {
                    var p_ = $(this).clone().html(''),
                        html = $(this).html(),
                        inside_tag = false,
                        tag = '',
                        first_lines_height = (img_after_line - line)*line_height,
                        i = 0;

                    $(this).after(p_);
                    while ((i < html.length) && (p_.height() <= first_lines_height)) {
                        // check tag begin
                        if ((html.charAt(i) == '<') || (html.charAt(i) == '&'))  {
                            tag = '';
                            inside_tag = true;
                        }

                        // increase either tag or html
                        if (inside_tag) {
                            tag += html.charAt(i);
                        } else {
                            p_.html(html.substr(0, i+1));
                        }

                        // check tag end
                        if ((html.charAt(i) == '>') || ((html.charAt(i) == ';') && inside_tag)) {
                            inside_tag = false;
                        }

                        i++;
                    }
                    // remove last char that creates new line
                    i--;
                    // roll back if we breake the word
                    var is_word = new RegExp('\\w', 'i');
                    if (is_word.test(html.charAt(i-1)) && is_word.test(html.charAt(i))) {
                        while (is_word.test(html.charAt(i-1)) && i > 0) i--;
                    }

                    // do the replacements
                    var img_html = '<span class="mod mod-photo" style="float: left; margin: 6px 10px 6px 0;">'+$img.html().replace('<p', '<span').replace('</p', '</span') +'</span>';
                    p_.html(html.substr(0, i)+img_html+html.substr(i));
                    $(this).replaceWith(p_.remove());

                    return false;
                } else {
                    // too early at the party. Keep moving
                    line += p_lines;
                }
            });
        }
    }
*/

});

$(function() {
    pathArray = window.location.pathname.split( '/' );
    page_title = pathArray[1];

    if(page_title == "power-local") {
        var headings_html = $(".headings").html();
        headings_html += '<img src="/sites/all/themes/aw/images/700x120_Presentedby.jpg" style="padding-bottom: 5px" />';
        $(".headings").empty().html(headings_html);
    }
});

function Set_Cookie(name, value, expires, path, domain, secure)
{
    // set time, it's in milliseconds
    var today = new Date();
    today.setTime(today.getTime());

    /*
    if the expires variable is set, make the correct
    expires time, the current script below will set
    it for x number of days, to make it for hours,
    delete * 24, for minutes, delete * 60 * 24
    */
    if (expires) {
        expires = expires * 1000 * 60 * 60 * 24;
    }
    var expires_date = new Date(today.getTime() + (expires));

    document.cookie = name + "=" +escape(value) +
    ((expires) ? ";expires=" + expires_date.toGMTString() : "") +
    ((path) ? ";path=" + path : "") +
    ((domain) ? ";domain=" + domain : "") +
    ((secure) ? ";secure" : "");
}

// this fixes an issue with the old method, ambiguous values
// with this test document.cookie.indexOf( name + "=" );
function Get_Cookie(check_name) {
    // first we'll split this cookie up into name/value pairs
    // note: document.cookie only returns name=value, not the other components
    var a_all_cookies = document.cookie.split(';');
    var a_temp_cookie = '';
    var cookie_name = '';
    var cookie_value = '';
    var b_cookie_found = false; // set boolean t/f default f

    for (i = 0; i < a_all_cookies.length; i++) {
        // now we'll split apart each name=value pair
        a_temp_cookie = a_all_cookies[i].split( '=' );


        // and trim left/right whitespace while we're at it
        cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');

        // if the extracted name matches passed check_name
        if (cookie_name == check_name) {
            b_cookie_found = true;
            // we need to handle case where cookie has no value but exists (no = sign, that is):
            if (a_temp_cookie.length > 1) {
                cookie_value = unescape(a_temp_cookie[1].replace(/^\s+|\s+$/g, ''));
            }
            // note that in cases where cookie is initialized but no value, null is returned
            return cookie_value;
        }
        a_temp_cookie = null;
        cookie_name = '';
    }
    if (!b_cookie_found) {
        return null;
    }
}

// this deletes the cookie when called
function Delete_Cookie(name, path, domain) {
    if (Get_Cookie(name)) document.cookie = name + "=" +
    ((path) ? ";path=" + path : "") +
    ((domain) ? ";domain=" + domain : "" ) +
    ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
}
/*
function fix_first_letter(_obj)
{
  var _p = _obj.find("> p").first();
  while($.trim(_p.text()).length == 0)
  {
    _p = _p.next();
  }
  var _h = _p.html();
  var _w0 = $.trim(_p.text()).split(" ");
  _w0 = _w0[0];
  var _l0 = _w0.split("");
  _l0[0] = "<span class='char1'>"+_l0[0]+"</span>";
  var _new_w0 = _l0.join("");
  _h = _h.replace(_w0, _new_w0);
  _p.html(_h);
}
*/
/*
function fix_top_banner()
{
  var _count = 0;
  var _fix_top_banner_timeout = setInterval(function()
  {
    _count++;
    if (_count >= 50)
    {
      clearInterval(_fix_top_banner_timeout);
      return false;
    }
    var _wrap = $('#top-banner .dart-tag');
    var _obj = _wrap.find('div[style]');
    if (_obj.size() == 0)
    {
      _obj = _wrap.find('iframe[width]');
    }
    if (_obj.size() == 0)
    {
      _obj = _wrap.find('img[width]');
    }
    if (_obj.size())
    {
      var _w = $(_obj[0]).width();
      if (_w > 0)
      {
        _wrap.width(_w);
        clearInterval(_fix_top_banner_timeout);
      }
    }
  }, 100);
}

fix_top_banner();
*/
