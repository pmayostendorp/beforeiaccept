/**
 * @file
 * A JavaScript file for the theme.
 *
 * In order for this JavaScript to be loaded on pages, see the instructions in
 * the README.txt next to this file.
 */

// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:
// - http://drupal.org/node/1446420
// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth

var h_body;

(function ($, Drupal, window, document, undefined) {


// Place your code here.

$(document).ready(function() {
// navigation
  $("#main-menu .menu-views").each(function() {
    $(this).parent().css('padding-right', 0);
  });  

  var _offset = $("body").hasClass("admin-menu") ? 29 : 0;
  var top = 0;
  if ($('#navigation').length > 0) {
    top = $('#navigation').offset().top;
  }
  $('#header').height($('#header').height());
  $(window).scroll(function (event) {
    var y = $(this).scrollTop();
    if (y >= top) 
    {
      if (!$('#header > div').hasClass("floating-block-active"))
      {
        $('#header > div').hide().addClass('floating-block-active').css({top: -100}).show().animate({top: 0 + _offset});
      }
    } 
    else 
    {
      $('#header > div').removeClass('floating-block-active').removeAttr("style");
    }
  });
  
  googletag.on('gpt-page_load_complete', function(){
    //if ($('#dfp-ad-overlay .block-dfp').find("iframe:not([id*=hidden])").length) {
    if ($('#dfp-ad-overlay .block-dfp').find(".dfp-inner:visible").length) {
       $('#dfp-ad-overlay').css('visibility','visible');
       setTimeout(function(){
         $('#dfp-ad-overlay .dfp-inner').hide();
         $('#dfp-ad-overlay').css('visibility','hidden');
       }, Drupal.settings.ad_timeout);
    }
    if (typeof Drupal.settings.thehill_mostpopular !== 'undefined' &&  Drupal.settings.thehill_mostpopular.tag !== '') {
      refreshSlot(Drupal.settings.thehill_mostpopular.tag);
    }
  });
  
  $('#dfp-ad-overlay .hide_overlay').click(function(e) {
    e.preventDefault();
    $('#dfp-ad-overlay .dfp-inner').hide();
    $('#dfp-ad-overlay').css('visibility','hidden');    
  });

// signup_form
  if ($("#cc_signup_form_1").size())
  {
    var o = jQuery("#block-constant-contact-1");
    var f = $("#cc_signup_form_1");
    var h = o.height();
    if ($("#cc_signup_form_1 .captcha").length > 0) {
      h = h + 107;
    }
    o.height(121);
    
    $("#cc_signup_form_1 .form-text").first().focus(function()
    {
      o.animate({"height": h});
    });
    if ($('.signup-error',f).length > 0) {
      if (o.length > 0) {
        o.animate({"height": h});
        var to = o.position().top - $('#header').height();       
        $("html, body").animate({ scrollTop: to });
      }
      $('.signup-error').each(function(){
        if (!$(this).hasClass('processed')) {
          item_class = $(this).attr('class').replace('signup-error ', '');
          parent = $('#'+item_class).parent();
          $(this).detach().appendTo(parent);
          $(this).addClass('processed');
        }
      });      
    }
    $('.error', f).focus(function(){
      $(this).removeClass('error');
      $(this).parent().find('.signup-error').hide();
    });
  }

// add social-share-separator
  $("#block-social-share-social-share > a").each(function(i) {
    if ($(this).is(":visible") && i > 0) {
      $(this).before($("<span class='social-share-separator'></span>"));
    }
  });
  var activeLinks = $('#block-system-main-menu a.active')
      ,topLevelActiveLinks = $('#block-system-main-menu>ul>li>a.active')
  activeLinks.addClass('forced-active-trail')
    .parent('li').addClass('forced-active-trail')
  
  /**
    * if active link in menu presents repeatedly
    * and in top level of menu presists one of them
    * we will delete classes ['active-trail','forced-active-trail'] in li elements
    * that has nested ul with active links (a)
    * 
   **/
  if( activeLinks.length > 1 && topLevelActiveLinks.length ){
    $('#block-system-main-menu .expanded ul a.active').parents('li')
      .removeClass('active-trail forced-active-trail');
  }
  
  var body = $('.node-people.view-mode-full .field-name-body .field-items');
  if (body.length != 0) {
    var body_item = body.find('.field-item');
    if (body_item.text().length > 300) {
      h_body = body_item.height();
      body.append('<span class="more">More</span>').find('.more').click(function() {
        var more = $(this);
        if (body_item.hasClass('expanded')) {
          body_item.removeClass('expanded').animate({ height: h_body }, 'fast', function() {
            more.text('More');
          });
        } else {
          var h_max = body_item.css('height', 'auto').height();
          body_item.height(h_body).addClass('expanded').animate({ height: h_max }, 'fast', function() {
            more.text('Close');
          });
        }
      });
    }
  }

  $('.sponsored_info').mouseenter(function() {
    var $content = $(this).next().show();
    if (!$content.hasClass('processed')) {
      $content.addClass('processed').mouseleave(function(){
        $(this).hide();
      })
    }
  });

  // Changes disqus comment format 
  var step = 1;
  chekDisqusComment = setInterval(function() {
    _comment = $('.disqus-comments').text();
    if (_comment.length > 4) {
      _num = parseInt(_comment);
      _count = (!isNaN(_num)) ? _num : 0;
      $('.disqus-comments').html("<span></span> " + _count).show();
      clearInterval(chekDisqusComment);
    } else if (step >= 250) {
      clearInterval(chekDisqusComment);
    }
    ++step;
  }, 200);

  // Add arrow to Columnist dropdown
  $(".page-columnists #content ul.term-queue-links li").first().find("a").append('<span class="arrow">arrow</span>');

  // Signup Page
  $(".page-signup .form-type-checkboxes .form-type-checkbox").each(function(i, elem) {
    $checkBox = $(this);
    if ((i == 0) && ($("#cc_signup_form_1 .form-item .signup-error").length == 0)) {
      $checkBox.addClass("selected");
      $checkBox.find("input[type='checkbox']").attr("checked", "checked");
    } else {
      checkbox = $checkBox.find("input[type='checkbox']");
      if (checkbox.is(":checked")) {
        $checkBox.addClass("selected");
      }
    }
  });
  $(".page-signup .form-type-checkboxes .form-type-checkbox").click(function() {
    $checkBox = $(this);
    if ($checkBox.hasClass("selected")) {
      $checkBox.removeClass("selected");
      $checkBox.find("input[type='checkbox']").removeAttr("checked");
    } else {
      $checkBox.addClass("selected");
      $checkBox.find("input[type='checkbox']").attr("checked", "checked");
    }
  });
  $(".page-signup .form-type-checkboxes .form-type-checkbox-select-all").click(function() {
    $checkBox = $(this);
    if ($checkBox.hasClass("selected")) {
      $checkBox.removeClass("selected");
      $(".page-signup .form-type-checkboxes .form-type-checkbox").each(function(i) {
        if (i > 0) {
          $check_box = $(this);
          if ($check_box.hasClass("selected")) {
            $check_box.removeClass("selected");
            $check_box.find("input[type='checkbox']").removeAttr("checked");
          }
        }
      });
    } else {
      $checkBox.addClass("selected");
      $(".page-signup .form-type-checkboxes .form-type-checkbox").each(function(i) {
        if (i > 0) {
          $check_box = $(this);
          if (!$check_box.hasClass("selected")) {
            $check_box.addClass("selected");
            $check_box.find("input[type='checkbox']").attr("checked", "checked");
          }
        }
      });
    }
  });
  
  $("body").keydown(function( event ) {
    if (event.which === 33) {
      event.preventDefault();
      var y = $(window).scrollTop(); 
      $("html, body").animate({ scrollTop: y - $(window).height() + 165 }, 600);
    }
    if (event.which === 34) {
      event.preventDefault();
      var y = $(window).scrollTop(); 
      $("html, body").animate({ scrollTop: y + $(window).height() - 165 }, 600);
    }    
  });
  
  $('.popup').click(function(event) {
    var width  = 575,
        height = 400,
        left   = ($(window).width()  - width)  / 2,
        top    = ($(window).height() - height) / 2,
        url    = $(this).attr('href'),
        opts   = 'status=1' +
                 ',width='  + width  +
                 ',height=' + height +
                 ',top='    + top    +
                 ',left='   + left;

    window.open(url, $(this).text(), opts);

    return false;
  });

/*
 * todo: maybe it better to fix it in php?
 * fix "Tuesday, July 29 at 04:45 pm to at 08:45 pm" to "Tuesday, July 29 at 04:45 pm to 08:45 pm"
 */
  jQuery(".field-type-datetime .date-display-single").each(function() 
  {
    var _text = jQuery(this).text();
    if (_text.indexOf('to at') != -1)
    {
       _text = jQuery(this).find(".date-display-end").text();
      jQuery(this).find(".date-display-end").text(_text.replace("at ", ""));
    }
  });  

});

})(jQuery, Drupal, this, this.document);
