_satellite.pushAsyncScript(function(event, target, $variables){
  TM.audienceSolutions = (function (queue, _s) {

  var dbg = _s.readStoredSetting('debug');
  var staging = _s.settings.isStaging;
  var endpoint = staging ? '//app.rcmd.jetdev1.syseng.tmcs:8080/api/pixel' : '//www.ticketmaster.com/data/rcmd/pixel';
  var getUrlParam = function (name, url) {
    var out = (RegExp(name + '=' + '(.+?)(&|$|#)').exec(url) || [false, false])[1];
    return !!out ? decodeURI(out) : out;
  };
  var arrayFilter = function (array, predicate) {
    var index = -1,
      length = array.length,
      resIndex = -1,
      result = [];

    while (++index < length) {
      var value = array[index];
      if (predicate(value, index, array)) {
        result[++resIndex] = value;
      }
    }
    return result;
  };

  var merge = function (data, defaults) {
    for (var point in defaults) {
      if (defaults.hasOwnProperty(point) && !data.hasOwnProperty(point)) {
        data[point] = defaults[point];
      }
    }
    return data;
  };

  var zipObject = function (props, values) {
    var index = -1,
      length = props ? props.length : 0,
      result = {};

    if (length && !values && !jQuery.isArray(props[0])) {
      values = [];
    }
    while (++index < length) {
      var key = props[index];
      if (values) {
        result[key] = values[index];
      } else if (key) {
        result[key[0]] = key[1];
      }
    }
    return result;
  };

  var checkSearch = function (data) {
    var data = data || {};
    var deferred = jQuery.Deferred();

    if (/: Search:/.test(_satellite.getVar('page.pageInfo.pageName'))) {

      var eventList = {tm: [], partner: []};
      jQuery(document).bind('searchresultsdisplay', function () {

        jQuery.find('#srch_results .event a.url').each(function (a) {

          var match = a.href.match(/\/event\/([^(\?|$|\/)]+)/);
          var eventId;
          if (match && match[1]) {
            eventList.tm.push(match[1]);
          } else if (eventId = TM.audienceSolutions.getUrlParam('eventid', a.href)) {
            eventList.partner.push(eventId);
          }
        });

        data.res = eventList.tm.join(',');
        data.res2 = eventList.partner.join(',');

        deferred.resolve(data);
      });
    } else {
      deferred.resolve(data);
    }
    return deferred.promise();
  };


  var checkFB = function () {

    var data = {}, deferred = jQuery.Deferred();
    if (typeof window.FB !== 'undefined' && typeof window.tmfb != 'undefined' && window.tmfb.enabled) {

      window.tmfb.after_load(function () {

        window.FB.Event.subscribe('auth.login', function () {
          _satellite.notify('tmfb after login', 1);
          var data = {};
          var session = window.tmfb.session();
          data.fbu = session.userID || 'tmfb session error';
          data.fbt = session.accessToken || 'tmfb session error';
          TM.audienceSolutions.push(['facebook_login', data]);
        });

        window.FB.Event.subscribe('auth.logout', function () {
          _satellite.notify('tmfb after logout', 1);
          TM.audienceSolutions.push(['facebook_logout', {}]);
        });


        if (tmfb.is_connected()) {
          var session = tmfb.session();
          data.fbu = session.userID;
          data.fbt = session.accessToken;
        } else if (tmfb.is_logged_in()) {
          data.fbt = "not_authorized";
        } else {
          data.fbt = "not_logged_in";
        }
        deferred.resolve(data);
      });

    } else {
      deferred.resolve();
    }
    return deferred.promise();
  };

  var getPayload = function (whitelist) {
    var base = [
      ['imp', impressionId],
      ['impp', impressionIdPrevious],
      ['bid', _s.getVar('browser id')],
      ['pid', _s.getVar('member id - persistant')],
      ['mid', _s.getVar('user.id')],
      ['sid', _s.getVar('session id')],
      ['pgt', _s.getVar('page.pageInfo.pageType')],
      ['dmn', _s.getVar('page.pageInfo.pageName').substr(0, _s.getVar('page.pageInfo.pageName').indexOf(':')) || ""],
      ['eid', _s.getVar('page.attributes.eventID')],
      ['mct', _s.getVar('page.category.primaryCategoryID') || _s.getVar('primaryCategoryIDwo')],
      ['aid', _s.getVar('page.attributes.artistID')],
      ['cfc', _s.getVar('cfc')],
      ['tqn', _s.getVar('transaction.attributes.ticketQuantity')],
      ['ort', _s.getVar('transaction.total.transactionTotal')],
      ['tct', _s.getVar('transaction.total.basePrice')],
      ['ftt', _s.getVar('transaction.total.feesTotal')],
      ['qry', _s.getVar('page.pageInfo.onsiteSearchTerm')],
      ['mkt', _s.getVar('marketID')],
      ['tsu', Date.now()],
      ['ref', _s.getVar('page.pageInfo.referringURL')],
      ['pgn', _s.getVar('page.current.number')],
      ['tml', getUrlParam('tm_link', window.location.href)]
    ];
    //filter empty items
    base = arrayFilter(base, function (item, ind) {
      if (whitelist && whitelist.length > 0 && jQuery.inArray(item[0], whitelist) === -1) {
        return false;
      }
      return !!item[1]
    });

    return zipObject(base);

  };

  var v4 = function () {
    var buf = function () {
      var _rnds = new Array(16);
      for (var i = 0, r; i < 16; i++) {
        if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
        _rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
      }
      return _rnds;
    }();

    buf[6] = (buf[6] & 0x0f) | 0x40;
    buf[8] = (buf[8] & 0x3f) | 0x80;
    var bth = [];
    for (var i = 0; i < 256; i++) {
      bth[i] = (i + 0x100).toString(16).substr(1);
    }
    i = 0;
    buf = bth[buf[i++]] + bth[buf[i++]] +
    bth[buf[i++]] + bth[buf[i++]] + '-' +
    bth[buf[i++]] + bth[buf[i++]] + '-' +
    bth[buf[i++]] + bth[buf[i++]] + '-' +
    bth[buf[i++]] + bth[buf[i++]] + '-' +
    bth[buf[i++]] + bth[buf[i++]] +
    bth[buf[i++]] + bth[buf[i++]] +
    bth[buf[i++]] + bth[buf[i++]];

    return buf;
  };

  var impressionId = v4();
  window.digitalData.page.attributes.tmds_imp = impressionId;

  var impressionIdPrevious = _s.readCookie('tmds_impp');
  window.digitalData.page.attributes.tmds_impp = impressionIdPrevious;

  _s.setCookie('tmds_impp', impressionId);

  var events = {};
  
  events.rec_view = function(){
    var rec = [],
      args = arguments;
      
    var data = arguments[0] || {};
    var tracker = arguments[1] || {};
    if(tracker.rec.items){
      jQuery.each(tracker.rec.items,function (a, ind) {
        var id = this.id.replace('artist_','');
        rec.push([id, a+1, tracker.service].join('|'));

      });
      data.rec = rec.join(',');
    }

    return data;
  };

  var track = function (tracker) {
    var action = tracker.shift();
    _s.notify('Audience Solutions: ' + action, 1);

    var data = tracker.shift() || {};
    data.evt = action;

    if (typeof events[action] === 'function') {
      data = events[action](data,tracker.shift());
    }

    var whitelist = getWhiteList(action);
    var base = getPayload(whitelist);
    data = merge(data, base);

    if (action === 'page_load') {
      //check if search
      //check if facebook ready
      jQuery.when(checkFB(), checkSearch()).done(function (fb, search) {
        data = merge(data, search);
        data = merge(data, fb);
        sendRequest(data);

      });

    } else {
      sendRequest(data);
    }
  };


  var getWhiteList = function (event) {
    var wl = {
      facebook_login: ['fbu', 'fbt', 'imp', 'bid', 'pid', 'mid', 'sid', 'pgt', 'dmn', 'evt','sid'],
      facebook_logout: ['imp', 'pgt', 'dmn', 'evt','sid'],
      ntf: ['ntf_err', 'ntf_bec', 'ntf_rfc', 'ntf_snr','sid','imp'],
      rec_view: ['mkt', 'pid', 'mid', 'bid','aid', 'imp', 'evt', 'rec', 'tsu', 'rec', 'plc', 'dmn','sid'],
      rec_click: ['pid', 'bid', 'mid', 'aid', 'imp', 'evt', 'rec', 'tsu', 'rec', 'plc', 'dmn', 'tml','sid'],
      search_click: ['imp', 'pgt', 'pgn', 'tsu', 'evt', 'dmn', 'qry', 'dst','sid']
    };
    return wl[event] || [];
  };

  for (var i = 0; i < queue.length; i++) {
    track(queue.shift());
  }


  var sendRequest = function (data) {
    jQuery.get(endpoint, data).done(function () {
      _s.notify('Pixel Server data sent successfully', 1);
    }).fail(function (status) {
      _s.notify('Pixel Server returned with status ' + status.status, 1);
    });
  };

  return {
    merge: merge,
    getUrlParam: getUrlParam,
    push: function (item) {
      track(item);
    },
    getQueue: function () {
      return queue;
    }
  };

})(TM.audienceSolutions || [], _satellite);
});
