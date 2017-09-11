var console = console || {log: function(){}, error: function() {}, info: function() {}};

(function($){
  $.fn.avaTip = function(){
    return this.each(function() {
      var avatar = this,
          attr = ( $(this).find('a').attr("rel") )? $(this).find('a').attr("rel").split(',',3) : undefined;

      if(attr !== undefined) {
        var name = attr[0],
            img = attr[1],
            key = attr[2];

        $(this).hover(function(e){

          if (avatar.ignore === true) { return; }

          //create html
          var html = '';
          if (img) { html += '<img src="'+img+'" />'; }
          html += '<div class="rollover_content"><p class="name">'+name+'</p></div>';

          $("body").append("<div class='avatar_rollover'>" + html + "</div>");
          this.rollover = $('.avatar_rollover:last');
          var rollover = this.rollover;
          //load additional data via ajax
          if (key && !$(this).data('user')) {
            $.getJSON('/ajax/users/getUserData', {'key':key}, function(data) {
              if (data.status == 'error') { return; }
              //tell it to ignore updates
              avatar.ignore = true;
              // Build and store user data
              $.fn.avaTip.buildUserStats(rollover,data);
              $(avatar).data('user',data);
              //update position and re-support outtro
              $('body').trigger('mousemove');
              avatar.ignore = false;
            });
          }
          // load additional data without ajax
          if (key && $(this).data('user')) {
            $.fn.avaTip.buildUserStats(rollover,$(this).data('user'));
          }

          $(".avatar_rollover").css( $.fn.avaTip.edge(e.pageX,e.pageY) ).fadeIn("slow");
        },
        function(){
          $(".avatar_rollover").remove();
        });
        $(this).mousemove(function(e){
          $(".avatar_rollover").css( $.fn.avaTip.edge(e.pageX,e.pageY) ).fadeIn("slow");
        });
      }
    });
  };
  $.fn.avaTip.buildUserStats = function (rollover,data) {
    var $more = $('<div>', { 'class' : 'more' }),
        $location = (data.location && data.location != 'null') &&
                    $('<p>', { 'class' : 'location', 'text' : data.location })
                      .appendTo($more),

        $stats = $('<ul>', { 'class' : 'stats' })
                      .appendTo($more),
        $views = data.views_sum && $('<li>', { 'class' : 'stat views', 'html' : '<span>Views: </span>' + data.views_sum })
                      .appendTo($stats),
        $points = data.points_sum && $('<li>', { 'class' : 'stat points', 'html' : '<span>Points: </span>' + data.points_sum })
                      .appendTo($stats),
        $friends = data.friends_sum && $('<li>', { 'class' : 'stat friends', 'html' : '<span>Friends: </span>' + data.friends_sum })
                      .appendTo($stats),
        $posts = data.forum_posts_sum && $('<li>', { 'class' : 'stat posts', 'html' : '<span>Posts: </span>' + data.forum_posts_sum })
                      .appendTo($stats);

    if(data.badges && data.badges.length) {
      var $badges = $('<ul>', { 'class' : 'badges' })
                      .appendTo($more);

      for (var i=0; i < data.badges.length; i++) {

        // Doesnt have a badge from this group
        if(data.badges[i].index === null) continue;

        var group = data.badges[i];

        // Loop through the possible levels of this group,
        // until reached their level 'index'
        for ( var j = 0; j <= group.index; j++ ) {
          $('<li>', {
            'class' : 'badge category-' + group.name.toLowerCase().replace(' ', '-') + ' index-' + j,
            'text' : group.level_names[j] || 'cool'
          }).appendTo($badges);
        }

      }
    }

    $(rollover).find('.rollover_content').append($more);

    //update position and re-support outtro
    $('body').trigger('mousemove');
  };
  $.fn.avaTip.edge = function(pageX,pageY){

        // setting up tolerances here should make this configurable
    var tolerance = {x:240,y:100},
        $w = $(window),
        // pageX relative to window
        screenPos = { x:pageX-$w.scrollLeft(), y:pageY-$w.scrollTop() },
        css = {};
    css.left = ( $w.width() - screenPos.x <= tolerance.x )? pageX - 230 : pageX+12;
    css.top = ( $w.height() - screenPos.y <= tolerance.y )? pageY - 120 : pageY+12;
    return css;
  };
  //display engine messages fixed and centered
  $.fn.fixedCenter = function(){
    return this.each(function(){
      var element = $(this),
          centerElement = function(){
            var elementWidth = element.outerWidth(),
                elementHeight = element.outerHeight(),
                X2 = window.innerWidth/2 - elementWidth/2,
                Y2 = window.innerHeight/2 - elementHeight/2;
          element.css({'left':X2,'top':Y2, 'position':'fixed'});
        };

      centerElement();
      $(window).bind('resize',function(){
        centerElement();
      });
    });
  };
})(jQuery);

//--------------
//UTILS

// GC global namespace
window.GC = window.GC || {};

// Location helper object
GC.Location = (function ($) {
  "use strict";

  var my = {},
      pathname = location.pathname,
      fragments = [];

  // Initializer
  function init() {
    fragments = pathname.split("/").splice(1);
    // remove any empty fragments
    var index = $.inArray("", fragments);
    if (index !== -1) fragments.splice(index, 1);
  }

  // Updates path if path is different
  function updatePathname() {
    // Only update the pathname if actually different
    if (pathname !== "/" + fragments.join("/")) {
      // Deal with pagination
      if ($.inArray("page", fragments) !== -1) {
        my.setKeyValue("page", null, true);
      }

      location.pathname = "/" + fragments.join("/");
    }
  }

  // Public: Gets requested path fragment
  my.getFragment = function (index) {
    return fragments[index] || false;
  };

  // Public: Getter
  my.getKeyValue = function (key) {
    var index = $.inArray(key, fragments);
    return (index === -1)? false : my.getFragment(index + 1);
  };

  // Public: Setter
  my.setKeyValue = function (key, value, path_unchanged) {
    var exists = my.getKeyValue(key),
        index  = $.inArray(key, fragments);

    // Insert or update key segment
    if (!exists && value !== null) {
      $.merge(fragments, [key, value]);
    } else {
      if (value === null) {
        if (index !== -1) fragments.splice(index, 2);
      } else {
        fragments[index + 1] = value;
      }
    }

    if (! path_unchanged) updatePathname();
  };

  // Public: Dictionary based setter
  my.setKeyValues = function (kvs) {
    for (var k in kvs) {
      my.setKeyValue(k, kvs[k], true);
    }

    updatePathname();
  }

  init();

  return my;
}(jQuery));

// Event module
GC.Events = function() {
  "use strict";

  var filters = {type: null, filter: null},
      select = $("#event_kind_select")
        .bind("change", function() {
          filters["type"] = (this.value === '')? null : this.value;
        }),
      is_fanclub = $("#event_filter_bool")
        .bind("change", function() {
          filters["filter"] = (is_fanclub.is(":checked"))? "fanclub" : null;
        }),
      submit = $("#event_filter_submit")
        .click(function(event) {
          GC.Location.setKeyValues(filters);
          event.preventDefault();
        });
};

if (GC.Location && GC.Location.getFragment(0) === "events") {
  $(function() { GC.Events = new GC.Events(); });
}


//gotoUrl another page
function gotoUrl(url) {
  window.location = url;
}

//load a JS include
function require(path) {
  $(document).append('<script type="text/javascript" src="'+path+'"><\/script>');
}

//call a jsonp API from flash, like for twitter.  Robert has a demo.
function jsonp(api, swf_id) {
  $.getJSON(api, function(data, status) {
    document.getElementById(swf_id).jsonp(data);
  });
}

//show the splash page if they haven't seen it yet
function showSplash(splash_days_till_expire) {

  //if expire is 0, set to null, which will make it a session cookie
  if (parseInt(splash_days_till_expire) == 0 || !splash_days_till_expire) splash_days_till_expire = null;

  if (
    window.location.pathname != '/' || //only show splash on homepage requests
    $.cookie('splash_set') == 1 || //check if cookie is set
    window.location.protocol == 'https:' //don't show the splash on https pages, this would happen when switching to checkout
  ) return;

  //set cookie and redirect
  $.cookie('splash_set', 1, {
    expires: splash_days_till_expire,
    path: '/'
  });
  gotoUrl('/splash');

}

//--------------
//DASHBOARD

//toggle dashboard
function toggleDashboard(event) {
  //get element
  event.preventDefault();
  var dash = $('#dashboard');
  //close
  if (dash.data('open') === 1) {
    dash.animate({marginTop: dash.data('offset')}, 300).data('open', 0);
  //open
  } else {
    dash.animate({marginTop: '0px'}, 300).data('open', 1);
  }
  //save state
  $.cookie('dashboard_open', dash.data('open'), { expires: 14, path: '/' });
}

//init the dashboard
function initDashboard() {

  // Load the dashboard html via AJAX.  Used on pages that are
  // full page cached.  We know this should happen based on whether the dashboard
  // has been replaced with a '.dashboard-ajax-container' div
  var container = $('.dashboard-ajax-container');
  if (container.length) {
    $.get('/ajax/index/dashboard' + window.location.search, function(data, status) {
      if (status != 'success') return;

      // Add it to the DOM and set it up
      container.replaceWith(data.html);
      setupDashboard();

      // Setup other sections that depend on the logged in state
      // logged_in_as may be "user", "account", or false
      initWithState(data.logged_in_as);

    }, 'json');

    // Wait to set it up till it's loaded
    return true;
  }

  // Dashboard is in the DOM, set it up
  if ($('#dashboard').length) setupDashboard();

}

// setup listeners and positioning of dashboard
function setupDashboard() {

  //get ref
  var el = $('#dashboard');

  //respect choice
  if (!el.find('a.toggle'))  { return; } //if they're not logged in, there won't be this button
  el.find('a.toggle').click(toggleDashboard);
  el.data('offset', el.css('margin-top'));
  if ($.cookie('dashboard_open') == 1) {
    el.css('margin-top','0px');
    el.data('open', 1);
  }

  el.find('.logout a').click(function(){
    $.cookie('dashboard_open', null, { expires: -7, path: '/' });
  });

}
//--------------
//INITIALIZE

//this adds observers to hooks in pages
function init() {

  //toggle the dashboard
  initDashboard();

  //add avatar rollovers
  $('span.avatar_wrapper').avaTip();

  $('#GC.GC_engine').fixedCenter();

  //hide engine messages
  if ($('#GC.GC_engine, #engine').length > 0) {
    setTimeout(function() {
      $('#GC.GC_engine:has(.success)').fadeOut();
    }, 5000);
    $('#GC.GC_engine button.close, #engine .close, #engine [name="close"]').click(function(e) {
      e.preventDefault();
      $('#GC.GC_engine, #engine').fadeOut();
    });
  }

  //hide inlinde errors
  $('#GC form li').click(function(){
    $(this).find('.error').fadeOut('fast');
  });

  //make redirect pulldown menus work
  $('select.redirect').change(function() {
    gotoUrl($(this).val());
  });

  //remove default value on click for login inputs
  $('label[for=email]:hidden').next('input#email').val('Email').focus(function () {
    if ($(this).val() == 'Email') { $(this).val(''); }
    }).blur(function() {
    if ($(this).val() === '') { $(this).val('Email'); }
  });
  $('label[for=password]:hidden').next('input#password').val('Password').focus(function () {
    if ($(this).val() == 'Password') { $(this).val(''); }
    }).blur(function() {
    if ($(this).val() === '') { $(this).val('Password'); }
  });

  // Check all
  $('#check_all').click(function() { $("input.multicheck").attr('checked', $('#check_all').is(':checked')); } );
  $("#GC_friend_action").submit(function(event) {
    var submit_button = $("button#Go").attr("disabled", "disabled");
    submit_button.find("span").text("Processing...");
  });

  // Fancybox
  if($.isFunction($.fn.fancybox)) {
    $.fn.fancybox.defaults.padding = 0;
    $.fn.fancybox.defaults.overlayColor = '#000';
    $.fn.fancybox.defaults.overlayOpacity = 0.8;
    $.fn.fancybox.defaults.centerOnScroll = true;
    $.fn.fancybox.defaults.scroll = false;

    $('a[href$=".jpg"],a[href$=".jpeg"],a[href$=".png"],a[href$=".gif"]').not('a[href*="photobucket"],a[href*="imageshack"],.ignore').fancybox({
      type      : 'image'
    });
    $('a[href*=".swf"]').fancybox({
      type      : 'swf',
      swf       : {
        wmode      : 'transparent',
        allowfullscreen  : 'true'
      }
    });

    var t = $("#_ctoken:first");
    if (t.length > 0) {
      t.after( $("<input>", {"type": "hidden", "name": "_gc_token", "id": "_gc_token", "value": "47mdHxqK52"}) );
    }

    // Adding bot checkbox
    var hu = $(".captcha, .forum form .input, .GC_blogs .GC_honeypot");
    if(hu.length > 0) {
      hu.first().after('<li class="checkbox"><label><input type="checkbox" name="_g_bot"> I am not a bot</label> <span>Required</span></li>');
    }
  }
}

// This is called after the dashobard AJAX call is made (IF it's made, it's optional) and allows
// other components to initialize with knowledge of what the user's logged in state is.
// state: may be 'user', 'account', or false
function initWithState(state) {

  // Add the HTML response to the dom in the appropriate place
  // container : Jquery element that will have the view inserted into
  // path : URL to request to fetch view from via AJAX
  var getView = function($container, path) {
    if (!$container.length) return;
    $.get(path, function(data, status) {
      if (status != 'success') return;
      $container.replaceWith(data);
    }, 'html');
  }

  // Get a specific param from GET.  Based on http://stackoverflow.com/a/8604927/59160
  var getURLParameter = function(name) {
    var response = decodeURIComponent(
      (location.search.match(RegExp("[?|&]"+name+'=(.+?)(&|$)'))||[,null])[1]
    );
    if (response == 'null') return null;
    else return response;
  }

  // Make a unqiue URL based on the user's state and if there is a special theme applied
  var query = '?state=' + state;
  var theme = getURLParameter('theme');
  if (theme) query += '&theme='+theme;

  // Register ajax fetched views
  getView($('.header-ajax-container'), '/ajax/index/header'+query);
  getView($('.home-ajax-container'), '/ajax/home'+query);

}

$(function() { init(); });

// --------- //
// Referrals //
// --------- //
  $(document).ready(function() {

  $( "form#send-referral-email" ).on( "submit", function( event ) {
    event.preventDefault();
    var passedValidation = true;

    // Basic error checking (not empty)
    $("input, textarea").not("[type=submit]").each(function () {
      $(this).removeClass("error");
      if( !$(this).val() ) {
        $(this).addClass("error");
        passedValidation = false;
      }
    });

    if( passedValidation == true) {
      $("form#send-referral-email").prepend("<p>Your message was sent succesfully!  You can fill out the form below to send another message.</p>");
      $("input, textarea").not("[type=submit]").each(function () {
        $(this).val("");
      });
      $("#form-error").html("");
      console.log( $( this ).serialize() );
    } else {
      $("#form-error").html("Please fill in all fields.");
      return;
    }


  });

    var generateAccountUrl = function () {
      $.ajax({
        type: "post",
        url: "/ajax/account/referrals",
        data: {
          "action": "generate"
        },
        dataType: "json",
        success: onSuccess,
        statusCode: {
          500: onError
        }
      });
    }

    var onError = function() {
      alert("There was a problem generating your referral code.  Please try again later.");
    }

    var onSuccess = function (data, status) {
      if (data.url) {
        console.log("Response:", data);
        // Successfully got the referral code
        $("#referral_code").val(data.url);
        $("#main").addClass("has-referrer-url");

        $("#share-facebook").attr("data-href", data.url);
        // Re-init FB
        FB.XFBML.parse();

        // Re-init Twitter
        $("#twitter-wrapper").html("");
        $("#twitter-wrapper").html("<a id='share-twitter' class='count-referrals-twitter twitter-share-button' href=\"https://twitter.com/share?url=" + data.url_encoded + "&text=" + data.text_encoded + "\" data-lang='en'>Tweet</a>");
        twttr.widgets.load();

        //location.reload(true);
      } else {
        onError();
      }
    }

    if ('' === $('#referral_code').val()) {
      $.ajax({
        type: "post",
        url: "/ajax/account/referrals",
        data: {
          "action": "get"
        },
        dataType: "json",
        statusCode: {
          404: generateAccountUrl
        }
      });
    }
  });
// ------------- //
// End Referrals //
// ------------- //

    /**
     * Generate the reCaptcha field and validating where necessary 
     * Valid return will continue form submission to php checks.
     * Invalid return will reload and need another attempt at the reCaptcha
     */

(function() { 

    var form;

    /**
     * Generate the reCaptcha field
     * @return {undefined}
     */
    function reloadRecaptcha() {
        return Recaptcha.create(
            "6LeKMMoSAAAAAONqXyOSey6qh6BrUeNvc6huweLV",
            "gc-inject-recaptcha",
            {
                theme: "clean",
                callback: Recaptcha.focus_response_field
            }
        );
    }

    /**
     * Mark the field as invalid, you know?
     * @return {undefined}
     */
    function invalidAnswer() {
        Recaptcha.reload();
        return $('#reCapMessage').addClass("error-visible");
    }

    /**
     * Handle form submission
     * @param  {object} e Form submit event
     * @return {undefined}
     */
    function handleCaptchaSubmit(e) {

        var challenge = $("#recaptcha_challenge_field").val(),
            answer    = $("#recaptcha_response_field").val();

        $.ajax({
            type:  "POST",
            async: false,
            url:   "/validate/recaptcha",
            data:  {
              "recaptcha_challenge_field": challenge,
              "recaptcha_response_field": answer
            },
            success: (function(data, textStatus, xhr) {
                if (xhr.status === 200) {
                    console.log("success");
                }else{
                    e.preventDefault();
                    invalidAnswer();
                }
            }),
            error: (function () {
                e.preventDefault();
                invalidAnswer();
            })
        });

    }

    $(function() {

        // Our Form
        form = $("#form-has-captcha");

        if (!form.length) {
            return;
        }

        // Bind submit handler
        form.on("submit", function(e) {
            handleCaptchaSubmit(e);
        });

        // Add Recaptcha Field
        // This should only work IF were on a page that needs one!!!!
        reloadRecaptcha();

    });

}());

// Mailing List Validation
(function() {

  var emailValue;

  /**
   * Validate form submissions
   * @return {undefined}
   */
  function validateMailingList(evt) {
    var list     = $(evt.target);
        settings = list.data(),
        errors   = [],
        classes  = [];

    list
      .removeClass("gc-invalid gc-invalid-email gc-invalid-age")
      .find(".gc-email-errors").remove();

    // Validate Age
    if (settings.validAge) {
      if (parseInt(list.find(".gc-validate-age").val(), 10) !== parseInt(settings.validAge, 10)) {
        classes.push("gc-invalid-age");
        errors.push("You must be at least 13 years old");
      }
    }

    if (settings.requireEmail) {
      emailValue = list.find(".gc-validate-email").val();

      if (!emailValue || emailValue.length < 2) {
        classes.push("gc-invalid-email");
        errors.push("Email is required");
      }
    }

    if (errors.length) {

      // Add Error Classes
      list.addClass("gc-invalid " + classes.join(" "));

      if (settings.displayErrors) {
        list.append($("<ul>", {
          "class": "gc-email-errors",
          "html": "<li>" + errors.join("</li><li>") + "</li>"
        }));
      }

      // Prevent Submission
      return false;
      evt.preventDefault();
    }

  }


  /**
   * Add submit listener to mailing list
   * @return {undefined}
   */
  function checkForMailingList() {
    var list = $("#gc-validate-signup");

    // No List On Page
    if (!list.length) {
      return;
    }

    list.on("submit", validateMailingList);
  }

  // Expose
  GC.checkForMailingList = checkForMailingList;

  // DOM Ready.
  $(checkForMailingList);
}());
