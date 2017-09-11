/**
 * @file Our analytics library, served up as a tag via Google Tag Manager.
 * @requires jQuery
 */

var Chorus = Chorus || {};

/**
 * The Chorus Analytics object
 * @global
 * @namespace CA
 */
var CA = Chorus.Analytics = CA || {};

/**
 * All the Chorus Analytics library code.
 * @module CA
 */
(function() {
  // this stub may have been used to pre-configure/invoke analytics behavior:
  var percents = [25, 50, 75, 90];
  var elements = [];
  var $ = jQuery; // << Optional. We'll only use jQuery if we have it.

  // Utils:
  // ---------------------
  var de = document.documentElement;

  /**
   * Gets the height of the current window.
   * @function windowHeight
   */
  function windowHeight() {
    return window.innerHeight || (de && de.clientHeight) || document.body.clientHeight;
  }

  /**
   * Gets the width of the current window.
   * @function windowWidth
   */
  function windowWidth() {
    return window.innerWidth || (de && de.clientWidth) || document.body.clientWidth;
  }

  /**
   * Extends an object with properties from additional passed objects.
   * @function extend
   * @param  {...Object} base An object that you would like to extend.
   * @return {Object}      An object extended with the additional passed object.
   */
  function extend(base) {
    for (var i=1; i < arguments.length; i++) {
      var ext = arguments[i];
      for (var key in ext) if (ext.hasOwnProperty(key)) base[key] = ext[key];
    }
    return base;
  }

  /**
   * Throttles a function to only run once ever N milliseconds. Speedy
   * implementation without context/arguments passing
   * @param  {function} func: The function to limit.
   * @param  {number} time: Number of milliseconds to limit by.
   * @return {function}
   */
  function throttle(func, time) {
    var timer = null;
    var called = false;
    var limiter = function() {
      if (timer) {
        called = true;
        return;
      }

      func();
      timer = setTimeout(function() {
        var recall = called;
        timer = null;
        called = false;
        if (recall) limiter();
      }, time);
    };
    return limiter;
  }

  /**
   * Invokes a function on each selected element. Needs to resolve the selector
   * as something iterable.
   * @function withEach
   * @param {string} selector: The selector to iterate upon.
   * @param {function} func: The function to run on each element.
   */
  function withEach(selector, func) {
    var els;
    // Use jQuery if we've got it (phew)...
    if ($) return $(selector).each(func);

    // Otherwise, turn selector into a list of sorts and process it:
    if (typeof selector === 'string') els = document.querySelectorAll(selector);
    else if (selector instanceof NodeList) els = selector;
    else if (selector instanceof Element) els = [selector];
    if (els) for (var i=0; i < els.length; i++) func.call(els[i]);
  }

  /**
   * Bind a handler to an event. Uses jQuery if available, otherwise will match
   * the browser spec.
   * @param {Object} obj: Either a jQuery object or an element object.
   * @param {string} eventName: The name of the event to bind the event to.
   * @param {function} handler: The function to bind to the event.
   */
  function bindEvent(obj, eventName, handler) {
    if ($) $(obj).on(eventName, handler);
    else if (obj.addEventListener) obj.addEventListener(eventName, handler);
    else if (obj.attachEvent) obj.attachEvent('on'+eventName, handler);
  }

  /**
   * DOM-Ready implementation. Use jQuery if available, otherwise resort to a
   * lightweight alternative.
   * @function
   * @copyright Dustin Diaz 2014 - License MIT
   * @todo Remove entirely when we move scripts to the footer.
   */
  var domready = $ || (function() {
    var fns = [], listener
      , doc = document
      , hack = doc.documentElement.doScroll
      , domContentLoaded = 'DOMContentLoaded'
      , loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState)

    if (!loaded)
    doc.addEventListener(domContentLoaded, listener = function () {
      doc.removeEventListener(domContentLoaded, listener)
      loaded = 1
      while (listener = fns.shift()) listener()
    })

    return function(fn) {
      loaded ? fn() : fns.push(fn)
    }
  })();

  // Event Data Formatter:
  var formatEvent = gtmFormatter('analyticsEvent', [
    'eventCategory',
    'eventAction',
    'eventLabel',
    'eventValue',
    'eventNonInt'
  ], {
    'nonInteraction': 'eventNonInt',
    'hitCallback': 'eventCallback'
  });

  // Social Data Formatter:
  var formatSocial = gtmFormatter('social', [
    'socialNetwork',
    'socialAction',
    'socialTarget',
    'socialPagePath'
  ], {
    'page': 'socialPagePath',
    'hitCallback': 'eventCallback'
  });

  // Pageview Data Formatter:
  var formatPageview = gtmFormatter('virtualPageView', [
    'virtualPagePath',
    'virtualPageTitle'
  ], {
    'page': 'virtualPagePath',
    'title': 'virtualPageTitle',
    'hitCallback': 'eventCallback'
  });

  /**
   * Creates a formatter function to build positional arguments into event
   * objects. This is kind of a brute-force normalization of anything that you
   * can throw at analytics.
   * @function gtmFormatter
   * @param {string} eventName: The name of the event.
   * @param {string[]} fields: An array of fields to use.
   * @param {Object} uaMapping An object.
   * @return {function}
   */
  function gtmFormatter(eventName, fields, uaMapping) {
    uaMapping = uaMapping || {};
    return function() {
      var args = (arguments[0] instanceof Array) ? arguments[0] : arguments;
      var position = 0;
      var evt = {};

      // Map passed positional arguments into named event keys:
      // this loop runs while we have arguments OR named fields left to fill.
      for (var i=0; i < args.length || position < fields.length; i++) {
        var value = args[i];

        // Formatting rules:
        // - Any function param is assigned as the event callback.
        // - Any boolean param is assigned as the non-interaction flag.
        // - Any object params are extended onto the event object.
        // --> (a mapping table may specify the renaming of legacy field names).
        // - Otherwise, params are positionally mapped into named fields.
        if (typeof value === 'function') {
          // Set any passed function as the event callback:
          evt.eventCallback = value;
        }
        else if (typeof value === 'boolean') {
          // Set any boolean as a non-interaction flag:
          if (value) evt.eventNonInt = value;
        }
        else if (typeof value === 'object') {
          // Extend any passed objects onto the event:
          // Object keys are subject to field renaming.
          // Ex: "hitCallback" -> "eventCallback"
          for (var key in value) {
            if (value.hasOwnProperty(key)) {
              evt[uaMapping[key] || key] = value[key];
            }
          }
        }
        else if (fields[position]) {
          // Assign everything else to a positional label:
          var field = fields[position++];
          if (!evt.hasOwnProperty(field)) evt[field] = value;
        }
      }

      // Set the definitive event name:
      evt.event = eventName;
      return evt;
    };
  }

  /**
   *  Builds a function for proxying analytics methods. An analytics proxy will
   *  pass params to whatever analytics package is available.
   * @param {string} uaAction: The action that has been taken.
   * @param {Object} formatter
   */
  function analyticsProxy(uaAction, formatter) {
    return function() {
      var args = (arguments[0] instanceof Array) ? arguments[0] : Array.prototype.slice.call(arguments);
      if (!args.length) return;

      // Sanitize arguments array, removing all GA boilerplate from initial arguments:
      // this will take out "send", "event", etc, from the front of the array...
      if (args[0].match && args[0].match(/send|_track/)) args.shift();
      if (args[0] === uaAction.toLowerCase()) args.shift();
      CA.push(formatter(args));
    };
  }

  /*
    Chorus Analytics API:
   */

  extend(CA, {

    /**
     * Collect dataLayer reference. This is important because a page can have
     * multiple data layers. We want Chorus Analytics to reference one we define
     * for it.
     * @memberof CA
     * @type {string|Object}
     */
    _dataLayer: CA.dataLayer || 'dataLayer',

    /**
     * @memberof CA
     * @return {Object|boolean|Array}
     */
    dataLayer: function() {
      var dl = this._dataLayer;
      if (typeof dl === 'object' && dl.push) return dl;
      if (typeof dl === 'string' && window[dl] && window[dl].push) {
        return (this._dataLayer = window[dl]);
      }
      return [];
    },

    // Analytics Event Proxies:
    event: analyticsProxy('Event', formatEvent),
    social: analyticsProxy('Social', formatSocial),
    pageview: analyticsProxy('Pageview', formatPageview),

    /**
     * Pushes a new message into the dataLayer
     * @param  {string} mssg A message to push into the dataLayer.
     * @memberof CA
     */
    push: function(mssg) {
      this.dataLayer().push(mssg);
    },

    /**
     * Shorthand for sending an event with only a "category" and an "action".
     * Will automatically format the event as "category", "category:name",
     * "category:content_type:name" for category, action, label, respectively.
     * Use this method for simplicity when possible
     * @param {string} category: The category for the event.
     * @param {string} name: The name of the event.
     * @param {unknown} nonInteraction Unknown.
     * @memberof CA
     */
    eventAutoFormat: function(category, name, nonInteraction) {
      var action = [category, name].join(':');
      var label = [category, this.contentType(), name].join(':');
      this.event(category, action, label, nonInteraction);
    },

    /**
     * Configures an element to be tracked within the viewport. This method
     * requires a selector, and may take any additional analytics arguments.
     * Additional provided arguments will be tracked when the element enters the
     * viewport.
     * @param {string} selector: The selector to track.
     * @memberof CA
     */
    trackElementView: function(selector) {
      var data = formatEvent(Array.prototype.slice.call(arguments, 1));
      withEach(selector, function() {
        elements.push({el: this, data: extend({}, data)});
      });

      trackElementsVisible();
    },

    /**
     * Configures a callback to run when an element enters the viewport. This
     * calls back without tracking any specific analytics actions.
     * @param {string}   selector: The selector to track.
     * @param {Function} callback: The callback to run when an element enters
     *                             the viewport.
     *
     */
    onElementView: function(selector, callback) {
      withEach(selector, function() {
        elements.push({el: this, data: callback});
      });

      trackElementsVisible();
    },

    /**
     * Disable scroll depth reporting by removing all thresholds to track
     * (useful for custom scroll reports, such as infinite scrolling).
     * @memberof CA
     */
    disableScrollDepth: function() {
      percents = [];
    },

    // :
    //

    /**
     * Gets a variable from the Data Layer. Performs a reverse search, looking
     * for the newest variable instance.
     * @param {string} attrName: The name of the attribute.
     * @param defaultValue: The default value if there is nothing stored.
     * @memberof CA
     */
    getVariable: function(attrName, defaultValue) {
      var dl = this.dataLayer();
      for (var i = dl.length-1; i >= 0; i--) {
        var value = dl[i][attrName];
        if (value) return value;
      }
      return defaultValue;
    },

    /**
     * Assess mobile display. Note: There is no reference here to the breakpoint
     * variable because we want to not have this rely on other scripts.
     * @memberof CA
     */
    isMobile: function() {
      return windowWidth() <= 600;
    },

    /**
     * Assess the current device display state.
     * @memberof CA
     */
    contentDisplay: function() {
      return this.isMobile() ? 'mobile' : 'desktop';
    },

    /**
     * Finds a "Content Type" variable.
     * @memberof CA
     */
    contentType: function() {
      return this.getVariable('Content Type', 'other');
    },

    /**
     * Get the current document title with all vertical signatures removed.
     * @return {string}
     * @memberof CA
     */
    pageTitle: function() {
      return document.title.replace(/\s*(-|\|)\s*(Curbed|Eater|Polygon|Racked|SBNation|The Verge|Vox( Media)?)(.com)?$/, '');
    },

    /**
     * Provides a cross-domain list definition. Attempts to scrape a container's
     * __xdomains__ variable, if set. Otherwise, just uses the current domain at
     * the definitive list.
     * @return {string}
     * @memberof CA
     */
    crossDomains: function() {
      return (typeof __xdomains__ !== 'undefined') ? __xdomains__ : document.domain.replace('www.', '');
    },

    /**
     * Gets an optional placement report for an element. Performs a tree search
     * for a custom setting, then defaults to blank
     * @param  {Object} element: The element to return information on.
     * @return {string}          The placement of the element.
     * @memberof CA
     */
    placement: function(element) {
      var el = element;

      while (el && el.getAttribute) {
        var placement = el.getAttribute('data-analytics-placement');
        if (placement) return ':'+placement;
        el = el.parentNode;
      }

      return '';
    },

    /**
     * Gets a social button's "action" component. Performs a tree search for a
     * custom setting, then defaults to "share".
     * @param {Object} element: The element to get the actions of.
     * @return {string} The action, or "share" if there is none.
     * @memberof CA
     */
    socialAction: function(element) {
      var el = element;

      while (el && el.getAttribute) {
        var action = el.getAttribute('data-analytics-action');
        if (action) return action;
        el = el.parentNode;
      }

      return 'share';
    },

    /**
     * Gets a social button's "placement" component.
     * @param {Object} element: The element to get the placement component of.
     * @return {string} The placement of the social. Defaults to "main"
     * @memberof CA
     */
    socialPlacement: function(element) {
      var el = element;

      while (el && el.getAttribute) {
        var placement = el.getAttribute('data-analytics-placement');
        if (placement) return placement;
        el = el.parentNode;
      }

      return 'main';
    },

    /**
     * Gets an element's highest-level header text
     * @param {Object} element: The element to review.
     * @return {string}
     * @memberof CA
     */
    headerText: function(element) {
      var el = element;
      var headers = el.querySelectorAll('h1,h2,h3,h4,h5,h6');

      // If we have headers, sort by priority and then return highest weight:
      if (headers.length) {
        headers = Array.prototype.slice.call(headers);
        headers.sort(function(a, b) {
          return a.tagName.localeCompare(b.tagName);
        });
        return headers[0].innerText;
      }

      // Otherwise, just return the element's own text:
      return el.innerText;
    },

    /**
     * Gets the text content of a sibling element. Traverses up the DOM until a
     * sibling link is found, then returns its text
     * @param {Object} element: The element to act upon.
     * @return {String}
     * @memberof CA
     */
    siblingText: function(element) {
      var el = element;
      var type = el.getAttribute('data-analytics-link').replace(/([^:]+).*/, '$1');
      var selector = '[data-analytics-link="'+type+'"]';

      while ((el = el.parentNode) && el.querySelector) {
        var sibling = el.querySelector(selector);
        if (sibling) return sibling.innerText;
      }

      // Otherwise, return the clicked element's anchor link:
      return element.getAttribute('href');
    },

    /**
     * Check to see if the link is outbound (not apart of any cross-domains).
     * @param {Object} element: The element to act upon.
     * @param {Array} crossDomains: The list of domains to check upon.
     * @return {boolean}
     * @memberof CA
     */
    isOutboundLink: function(element, crossDomains) {
      // 1) Check if the link host is empty or matches the current domain:
      // This will account for empty hrefs and "#hash" references.
      var linkHost = element.hostname || '';
      if (!linkHost || linkHost == document.domain) return false;

      // 2) Check if the link host matches any cross-domains:
      var xdomains = crossDomains.split(',');
      for (var i=0; i < xdomains.length; i++) {
        if (linkHost.indexOf(xdomains[i]) >= 0) return false;
      }
      return true;
    }
  });

  /*
    Scroll Tracking
   */

  //

  /**
   * Test if element is partially visible within viewport.
   * @param {Object} el: The element to check.
   */
  function isElementInViewport(el) {
    var r = el && el.getBoundingClientRect();
    return (r &&
      r.bottom > 0 &&
      r.right > 0 &&
      r.top < windowHeight() &&
      r.left < windowWidth()
    );
  }

  /**
   * Scroll Depth Tracker
   * @param {boolean} initialReport Whether or not there was an intial report.
   */
  var trackScrollDepth = function(initialReport) {
    var yscroll = window.pageYOffset || (de && de.scrollTop) || document.body.scrollTop;
    var hpage = document.body.scrollHeight;

    // Calculate the top and bottom percentages of the viewport:
    var top = (yscroll / hpage) * 100;
    var bottom = ((yscroll + windowHeight()) / hpage) * 100;

    // Loop backward so that we can safely remove tracked values...
    for (var i=percents.length-1; i >= 0; i--) {
      var value = percents[i];

      // Track value thresholds when present within the viewport range:
      // During the initial report, just capture how deep we're starting.
      if ((value > top && value < bottom) || (initialReport && value < bottom)) {
        CA.eventAutoFormat('interaction', value, true);
        percents.splice(i, 1);

        // Stop after first reported depth during initial report:
        // we only want to know how deep the user started during init.
        if (initialReport) return;
      }
    }
  };

  /**
   * Throttled function to check for elements within viewport
   * @function trackElementsVisible
   */
  var trackElementsVisible = throttle(function() {
    // Loop backward so that we can safely remove tracked elements...
    for (var i=elements.length-1; i >= 0; i--) {
      var el = elements[i].el;

      if (isElementInViewport(el)) {
        var d = elements[i].data;
        elements.splice(i, 1);

        // If data is just a callback function, then run it:
        // simple "onElementView" callbacks fire without tracking events.
        if (typeof d === 'function') return d();

        // Otherwise, track viewed element's analytics:
        d.eventCategory = d.eventCategory || el.getAttribute('data-analytics-category') || el.getAttribute('data-analytics-viewport') || 'interaction';
        d.eventAction = d.eventAction || el.getAttribute('data-analytics-action') || d.eventCategory+':view';
        d.eventLabel = d.eventLabel || el.getAttribute('data-analytics-label') || el.innerText;
        d.eventNonInt = true;
        CA.event(d);
      }
    }
  }, 300);


  /*
     Launcher
   */

  //
  // .


  /**
   * Startup Chorus Analytics. This will launch all analytics features (scroll
   * depth, viewport elements).
   */
  domready(function() {
    // Run any pre-queued commands before launching:
    // Stub invocations were queued as: ['methodName', <arguments object>]
    if (CA._q) {
      while (CA._q.length) {
        var command = CA._q.pop();
        CA[command[0]].apply(CA, command[1]);
      }
    }

    // Track scrolling:
    bindEvent(window, 'scroll', throttle(function() {
      percents.length && trackScrollDepth();
      elements.length && trackElementsVisible();
    }, 50));

    // Configure basic scroll elements to track:
    CA.trackElementView('[data-analytics-viewport]');
    trackScrollDepth(true);
  });

})();
