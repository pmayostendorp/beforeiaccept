/**
 * @file
 * Javascript behaviors and helpers for modules/fb.
 */

FB_JS = function(){};
FB_JS.fbu = null;

/**
 * Drupal behaviors hook.
 *
 * Called when page is loaded, or content added via javascript.
 */
Drupal.behaviors.fb = function(context) {
  // Respond to our jquery pseudo-events
  var events = jQuery(document).data('events');
  if (!events || !events.fb_session_change) {
    jQuery(document).bind('fb_session_change', FB_JS.sessionChangeHandler);
  }

  // Once upon a time, we initialized facebook's JS SDK here, but now that is done in fb_footer().
  if (typeof(FB) != 'undefined') {
    // Render any XFBML markup that may have been added by AJAX.
    $(context).each(function() {
      var elem = $(this).get(0);
      try {
      FB.XFBML.parse(elem);
      } catch(err) {}
    });

    FB_JS.showConnectedMarkup(Drupal.settings.fb.fbu, context);
  }

  // Markup with class .fb_show should be visible if javascript is enabled.  .fb_hide should be hidden.
  jQuery('.fb_hide', context).hide();
  jQuery('.fb_show', context).show();
};

if (typeof(window.fbAsyncInit) != 'undefined') {
  // There should be only one definition of fbAsyncInit!
  debugger;
};

/**
 * This function called by facebook's javascript when it is loaded.
 * http://developers.facebook.com/docs/reference/javascript/
 *
 * This function has grown complex trying to handle various
 * permutations of facebook's APIs.  The FB functions that take a
 * callback (i.e. FB.getLoginStatus and FB.api) are often never called
 * back.  So, to work around that, there may be some redundant calls.
 */
window.fbAsyncInit = function() {

  if (Drupal.settings.fb) {
    FB.init(Drupal.settings.fb.fb_init_settings);
  }
  
  // Facebook recommends calling getLoginStatus after FB.init (http://developers.facebook.com/docs/reference/javascript/FB.getLoginStatus/)
  // However, it's got lots of bugs reported against it (https://developers.facebook.com/bugs/240058389381072, http://developers.facebook.com/bugs/173032012783482?browse=search_4ecd4a1aa27a81146273027)
  // So we make it optional whether we call it or not.
  if (Drupal.settings.fb.get_login_status) {
    FB.getLoginStatus(function(response) {
      FB_JS.initFinal(response);
      FB_JS.authResponseChange(response);
    });
  }
  else if (Drupal.settings.fb.fb_init_settings.authResponse) {
    // Our authResponse sent to us from fb.module.
    FB_JS.initFinal({'authResponse' : Drupal.settings.fb.fb_init_settings.authResponse});
  }
  else {
    // No application.  Not safe to call FB.getLoginStatus().
    // Or, we are configured to not call getLoginStatus().
    // We still want to initialize XFBML, third-party modules, etc.
    FB_JS.initFinal({'authResponse' : null});
  }

  if (!Drupal.settings.fb.get_login_status && Drupal.settings.fb.test_login_status && FB.getUserID()) {
    // This is an alternative to calling getLoginStatus().  Adds some overhead to the client side by calling FB.api on every page.  But, will detect if user has logged out of facebook.
    FB.api('/me', function(response) {
      // Calling FB.api is unfortunate overhead, but no other way to detect if user has logged out of facebook.
      if (typeof(response.error) != 'undefined') {
        // Fake an auth response change so Drupal knows user is logged out.
        FB_JS.authResponseChange({'authResponse' : null});
      }
      else if (response.id != Drupal.settings.fb.fbu) {
        // Fake an auth response change so Drupal knows user has changed.
        FB_JS.authResponseChange({'authResponse' : {'userID' : response.id}});
      }
    });
  }
};


/**
 * Finish initializing, whether there is an application or not.
 */
FB_JS.initFinal = function(response) {
  var status = {
    'status': response.status, // not using oauth
    'auth': response.authResponse, // using oauth
    'response': response
  };

  jQuery.event.trigger('fb_init', status);  // Trigger event for third-party modules.

  FB_JS.authResponseChange(response); // This will act only if fbu changed.

  FB_JS.eventSubscribe();

  FB_JS.showConnectedMarkup(); // Make sure this called even when FB callbacks are not called.

  if (typeof(FB.XFBML) != 'undefined') {
    try {
    FB.XFBML.parse(); // soon to be deprecated!
    } catch(err) {
      
    }
  }
}

/**
 * Tell facebook to notify us of events we may need to act on.
 */
FB_JS.eventSubscribe = function() {
  // Use FB.Event to detect Connect login/logout.
  FB.Event.subscribe('auth.authResponseChange', FB_JS.authResponseChange);

  // Q: what the heck is "edge.create"? A: the like button was clicked.
  FB.Event.subscribe('edge.create', FB_JS.edgeCreate);

}

/**
 * Helper parses URL params.
 *
 * http://jquery-howto.blogspot.com/2009/09/get-url-parameters-values-with-jquery.html
 */
FB_JS.getUrlVars = function(href) {
  var vars = [], hash;
  var hashes = href.slice(href.indexOf('?') + 1).split('&');
  for(var i = 0; i < hashes.length; i++)
  {
    hash = hashes[i].split('=');
    vars[hash[0]] = hash[1];
    if (hash[0] != 'fbu')
      vars.push(hashes[i]); // i.e. "foo=bar"
  }
  return vars;
}

/**
 * Reload the current page, whether on canvas page or facebook connect.
 *
 * append fbsig, a hash of the session data, to avoid infinite reloads
 * in some cases.
 */
FB_JS.reload = function(destination) {

  if (Drupal.settings.fb.reload_url_append_hash) {
    var fbhash;

    // Determine url hash.
    if (typeof(FB.getAuthResponse) != 'undefined') {
      var auth = FB.getAuthResponse();

      if (auth != null)
        fbhash = auth.signedRequest; // Use sig rather than compute a new hash.
      else
        fbhash = 0;
    }
    else {
      var session = FB.getSession();
      if (session != null)
        fbhash = session.sig;
      else
        fbhash = 0;
    }
  }

  // Avoid infinite reloads.  Still needed? It would be nice to do away with this code if not needed.
  ///@TODO - does not work on iframe because facebook does not pass url args to canvas frame when cookies not accepted.  http://forum.developers.facebook.net/viewtopic.php?id=77236
  var vars = FB_JS.getUrlVars(window.location.href);
  if (typeof(fbhash) != 'undefined' && vars.fbhash == fbhash) {
    return; // Do not reload (again)
  }

  // Determine where to send user.
  if (typeof(destination) != 'undefined' && destination) {
    // Use destination passed in.
  }
  else if (typeof(Drupal.settings.fb.reload_url) != 'undefined') {
    destination = Drupal.settings.fb.reload_url;
  }
  else {
    destination = window.location.href;
  }

  // Split and parse destination
  var path;
  if (destination.indexOf('?') == -1) {
    vars = [];
    path = destination;
  }
  else {
    vars = FB_JS.getUrlVars(destination);
    path = destination.substr(0, destination.indexOf('?'));
  }

  // Add fbhash to params before reload.
  if (Drupal.settings.fb.reload_url_append_hash) {
    vars.push('fbhash=' + fbhash);
  }

  // Use window.top for iframe canvas pages.
  destination = vars.length ? (path + '?' + vars.join('&')) : path;

  if (Drupal.settings.fb.reload_url_fragment) {
    destination = destination + "#" + Drupal.settings.fb.reload_url_fragment;
  }

  // Feedback that entire page may be reloading.
  // @TODO improve the appearance of this, make it customizable.
  // This unweildy set of tags should make a progress bar in any Drupal site.
  var fbMarkup = jQuery('.fb_connected,.fb_not_connected').wrap('<div class="progress" />').wrap('<div class="bar" />').wrap('<div class="filled" />');
  if (fbMarkup.length) {
    fbMarkup.hide(); // Hides FBML, leaves progress bar.
  }
  else {
    // If no markup changed, throw a progress bar at the top of the page.
    jQuery('body').prepend('<div id="fb_js_pb" class="progress"><div class="bar"><div class="filled"></div></div></div>');
  }

  window.top.location = destination;
  //alert(destination); // debugging.
};



// Facebook pseudo-event handlers.
FB_JS.authResponseChange = function(response) {

  //debugger;
  if (response.status == 'unknown') {
    // @TODO can we test if third-party cookies are disabled?
  }

  var status = {
    'changed': false,
    'fbu': FB.getUserID(),
    'session': response.authResponse, // deprecated,  still needed???
    'auth': response.authResponse, // still needed???
    'response' : response
  };

  if ((Drupal.settings.fb.fbu || status.fbu) &&
      Drupal.settings.fb.fbu != status.fbu) {
    // A user has logged in.
    status.changed = true;
  }

  /*
  if (response.authResponse) {
    status.fbu = response.authResponse.userID;
    if (Drupal.settings.fb.fbu != status.fbu) {
      // A user has logged in.
      status.changed = true;
    }
  }
  else if (response.session) {
    status.fbu = response.session.uid;
    if (Drupal.settings.fb.fbu != status.fbu) {
      // A user has logged in.
      status.changed = true;
    }
  }
  else if (Drupal.settings.fb && Drupal.settings.fb.fbu) {
    // A user has logged out.
    status.changed = true;
  }
*/

  if (status.changed) {
    // fbu has changed since server built the page.
    jQuery.event.trigger('fb_session_change', status);

    // Remember the fbu.
    Drupal.settings.fb.fbu = status.fbu;

    FB_JS.showConnectedMarkup(status.fbu);
  }
};

// edgeCreate is handler for Like button.
FB_JS.edgeCreate = function(href, widget) {
  var status = {'href': href};
  FB_JS.ajaxEvent('edge.create', status);
};

// JQuery pseudo-event handler.
FB_JS.sessionChangeHandler = function(context, status) {
  // Pass data to ajax event.
  var data = {
    'event_type': 'session_change',
    'is_anonymous': Drupal.settings.fb.is_anonymous
  };

  data.fbu = FB.getUserID();

  FB_JS.ajaxEvent(data.event_type, data);
  // No need to call window.location.reload().  It will be called from ajaxEvent, if needed.
};


// Helper to pass events via AJAX.
// A list of javascript functions to be evaluated is returned.
FB_JS.ajaxEvent = function(event_type, request_data) {
  if (Drupal.settings.fb.ajax_event_url) {

    // Session data helpful in ajax callbacks.  See fb_settings.inc.
    // request_data.fb_js_session = JSON.stringify(FB.getSession()); // FB.getSession() FAILS! REMOVE or REPLACE.
    if (typeof(Drupal.settings.fb_page_type) != 'undefined') {
      request_data.fb_js_page_type = Drupal.settings.fb_page_type;
    }

    // Historically, we pass appId to ajax events.
    // This data no longer present in JS API, so may be removed soon.
    // In other words, deprecated!
    request_data.appId = Drupal.settings.fb.fb_init_settings.appId;

    // Other values to pass to ajax handler.
    if (Drupal.settings.fb.controls) {
      request_data.fb_controls = Drupal.settings.fb.controls;
    }

    // In case cookies are not accurate, always pass in signed request.
    if (typeof(FB.getAuthResponse) != 'undefined') {
      response = FB.getAuthResponse();
      if (response) {
        request_data.signed_request = response.signedRequest;
      }
    }
    else {
      session = FB.getSession();
      if (session) {
        //request_data.session = session;
        request_data.access_token = session.access_token;
      }
    }


    jQuery.ajax({
      url: Drupal.settings.fb.ajax_event_url + '/' + event_type,
      data : request_data,
      type: 'POST',
      dataType: 'json',
      success: function(js_array, textStatus, XMLHttpRequest) {
        if (js_array.length > 0) {
          for (var i = 0; i < js_array.length; i++) {
            eval(js_array[i]);
          }
        }
        else {
          if (event_type == 'session_change') {
            // No instructions from ajax.  Notify interested parties
            jQuery.event.trigger('fb_session_change_done');
          }
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        // Unexpected error (i.e. ajax did not return json-encoded data).
        var headers = jqXHR.getAllResponseHeaders(); // debug info.
        var responseText = jqXHR.responseText; // debug info.
        debugger;
        // @TODO: handle error, but how?
      }
    });
  }
};


/**
 * Called when we first learn the currently logged in user's Facebook ID.
 *
 * Responsible for showing/hiding markup not intended for the current
 * user.  Some sites will choose to render pages with fb_connected and
 * fb_not_connected classes, rather than reload pages when user's
 * connect/disconnect.
 */
FB_JS.showConnectedMarkup = function(fbu, context) {
  if (!fbu && typeof(FB) != 'undefined')
    fbu = FB.getUserID(); // More reliable than fbu passed in.

  if (context || fbu != FB_JS.fbu) {
    if (fbu) {
      FB_JS.fbu = fbu;
      // Show markup intended only for connected users.
      jQuery('.fb_not_connected', context).hide();
      jQuery('.fb_connected', context).show();
    }
    else {
      FB_JS.fbu = null;
      // Show markup intended only for not connected users.
      jQuery('.fb_connected', context).hide();
      jQuery('.fb_not_connected', context).show();
    }
  }
};


