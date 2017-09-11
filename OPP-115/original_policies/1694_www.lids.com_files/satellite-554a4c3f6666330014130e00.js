var _sdi = _sdi || {};

// SDI Youtube Object
_sdi.yt = {
  /****** START Configuration ******/
  milestones: [],
  directCallRules: {
    start: 'youtube video start',
    resume: 'youtube video resume',
    pause: 'youtube video pause',
    complete: 'youtube video complete',
    buffer: 'youtube video buffer',
    milestone: 'youtube video milestone {milestone}',
    seek: 'youtube video seek'
  },
  dataElements: {
    title: 'youtube title',
    time: 'youtube time',
    milestone: 'youtube milestone',
    author: 'youtube author',
    id: 'youtube video id',
    duration: 'youtube video duration',
    player: 'youtube player name'
  },
  playerName: 'Youtube',
  sc: {
    track: true,
    s: function(){
      return window.s
    }
  },
  timeout: 1000,
  /****** END Configuration ******/
  stages: {},
  players: {},
  init: function() {
    var scripts = document.getElementsByTagName('script'),
      api = false,
      ids = [],
      vids = _sdi.yt.videos;
    for (var i = 0; i < scripts.length; i++) {
      var script = scripts[i],
        src = script.src || '';
      if (src.match(/youtube\.com\/iframe_api/)) {
        api = true;
      }
    }
    if (api === false) {
      _satellite.notify('YT: Youtube API not loaded, loading now',1);
      _satellite.loadScript('//www.youtube.com/iframe_api',function(){
        _sdi.yt.ready('api');
      });
    }
    else {
      _sdi.yt.ready('api');
    }
  },
  ready: function(stage){
    _sdi.yt.stages[stage] = true;
    if(_sdi.yt.stages.dom && _sdi.yt.stages.api){
      _sdi.yt.checkIframes();
    }
  },
  checkIframes: function(){
    var vids = _sdi.yt.videos;
    _satellite.cssQuery('iframe[src*="youtube"]', function(iframes){
      for(var i=0; i<iframes.length; i++){
        var ifr = iframes[i];
        if(!ifr.getAttribute('data-sdi')){
          var vid = ifr.src.match(/h?t?t?p?s?\:?\/\/www\.youtube(-nocookie)?\.com\/embed\/([\w-]{11})(?:\?.*)?/),
            id = (vid.length>2?vid[2]:'');
          if (!ifr.id) {
              ifr.id = id;
          }
          if(!ifr.src.match(/enablejsapi=1/)){
            var src = ifr.src;
            ifr.src = src + (src.indexOf('?')>-1 ? '&' : '?') + 'enablejsapi=1';
          }
          else {
            if (typeof YT != 'undefined') {
              if (typeof YT.get != 'undefined') {
                ready = true;
                vids[id] = {};
                if (!YT.get(ifr.id)) {
                  _satellite.notify('YT: API for iframe ID "'+ifr.id+'" not configured, configuring now',1);
                  vids[id].player = new YT.Player(ifr.id, {
                    events: {
                      onReady: function() {},
                      onStateChange: function() {},
                      videoId: ifr.id
                    }
                  });
                  ifr.setAttribute('data-sdi','true');
                }
                else {
                  ifr.setAttribute('data-sdi','true');
                  _satellite.notify('YT: API for iframe ID "'+ifr.id+'" already configured',1);
                }
                _sdi.yt.timeout = 1000;
              }
              else {
                _satellite.notify('YT: YT.get is not ready...',1);
                _sdi.yt.timeout = 100;
              }
            }
            else {
              _satellite.notify('YT: YT is not ready...',1);
              _sdi.yt.timeout = 100;
            }
          }
        }
      }
    });
    setTimeout(function() {
      _sdi.yt.checkIframes()
    }, _sdi.yt.timeout);
  },
  videos: {},
  setVideoData: function(n,v){
    var de = _sdi.yt.dataElements || {};
    // set a specific value
    if(n && v){
      _satellite.setVar(de[n],v);
    }
    // set multiple values, object literal
    else if(typeof n == 'object') {
      for(var name in n){
        _satellite.setVar(de[name], n[name]);
      }
    }
    // player
    if(de.player && _sdi.yt.playerName){
      _satellite.setVar(de.player,_sdi.yt.playerName);
    }
  }
};
_sdi.yt.init();
_satellite.addEventHandler(window, 'message', function(r) {
  var d = {};
  if (r.origin.match(/youtube\.com|youtube-nocookie\.com/) && typeof JSON != 'undefined') {
    d = typeof r.data == 'string' ? JSON.parse(r.data) : {};
    var videos = _sdi.yt.videos,
      dc = _sdi.yt.directCallRules || {},
      de = _sdi.yt.dataElements || {},
      sc = _sdi.yt.sc || {},
      data = {},
      v;
    // video info
    if(d.event=='infoDelivery'){
      var v = {}, id;
      if(d.info.videoData){
        id = d.info.videoData.video_id;
        v = videos[id] || {};
        v.info = d.info;
        v.id = d.id;
        videos[id] = v;
      }
      else {
        for(var vs in videos){
          var vid = videos[vs];
          if(vid.id == d.id){
            v = vid;
          }
        }
        if(v.info){
          // capture a scrub by checking if the last time we tracked was more than 1.5 seconds
          if(Math.abs(d.info.currentTime - v.info.currentTime) > 1.5){
            if(sc.track==true){
              sc.s().Media.stop(v.info.videoData.title, v.info.currentTime);
              sc.s().Media.play(v.info.videoData.title, d.info.currentTime);
            }
            _satellite.notify('YT: '+v.info.videoData.title+': seek from '+v.info.currentTime+' to '+d.info.currentTime, 1);
            if(dc.seek){
              data = {
                title: v.info.videoData.title,
                time: d.info.currentTime
              };
              _sdi.yt.setVideoData(data);
              _satellite.track(dc.seek);
            };
          }

          // milestones
          var m = _sdi.yt.milestones || [],
            t = d.info.currentTime;
          if(m.length > 0){
            v.milestones = v.milestones || {};
            var pct = t / v.info.duration * 100;
            for(var i=0; i<m.length; i++){
              var next = m[i+1] || 100;
              if(pct > m[i] && pct <= next && !v.milestones[m[i]]){
                if(dc.milestone){
                  _satellite.setVar(de.milestone, m[i]);
                  _satellite.track(dc.milestone.replace(/\{milestone\}/ig, ''+m[i]));
                  v.milestones[m[i]] = true;
                }
              }
            }
          }

          v.info.currentTime = d.info.currentTime;
        }
      }
    }
    if(d.event=='onStateChange'){
      for(var vs in _sdi.yt.videos){
        var vid = _sdi.yt.videos[vs];
        if(vid.id == d.id){
          v = vid;
        }
      }

      data = {
        title: v.info.videoData.title,
        duration: v.info.duration,
        time: v.info.currentTime
      };

      // video play
      if(d.info == 1){
        // video start
        if(!v.started){

          v.started = true;
          if(sc.track==true){
            sc.s().Media.open(v.info.videoData.title, v.info.duration, _sdi.yt.playerName);
            sc.s().Media.play(v.info.videoData.title, v.info.currentTime);
          }

          _satellite.notify('YT: '+v.info.videoData.title+': video start',1);

          if(dc.start){
            _sdi.yt.setVideoData(data);
            _satellite.track(dc.start);
          };
        }
        // video resume
        else {
          if(sc.track==true){
            sc.s().Media.play(v.info.videoData.title, v.info.currentTime);
          }
          _satellite.notify('YT: '+v.info.videoData.title+': video resume at '+v.info.currentTime,1);

          if(dc.resume){
            _sdi.yt.setVideoData(data);
            _satellite.track(dc.resume);
          };
        }
        v.state = 'playing';
      }
      // video pause
      if(d.info == 2 && (v.info.duration - v.info.currentTime) > 1.5){
        
        if(sc.track==true){
          sc.s().Media.stop(v.info.videoData.title, v.info.currentTime);
        }
        _satellite.notify('YT: '+v.info.videoData.title+': video pause at '+v.info.currentTime,1);

        if(dc.pause){
          _sdi.yt.setVideoData(data);
          _satellite.track(dc.pause);
        };

        v.state = 'paused';
      }
      // video buffer
      if(d.info == 3 && v.started){
        if(sc.track==true){
          sc.s().Media.stop(v.info.videoData.title, v.info.currentTime);
        }
        _satellite.notify('YT: '+v.info.videoData.title+': video buffer/pause at '+v.info.currentTime,1);

        if(dc.buffer){
          _sdi.yt.setVideoData(data);
          _satellite.track(dc.buffer);
        };

        v.state = 'paused';
      }
      // video complete
      if(d.info == 0){
        if(sc.track==true){
          sc.s().Media.stop(v.info.videoData.title, v.info.currentTime);
          sc.s().Media.close(v.info.videoData.title);
        }
        _satellite.notify('YT: '+v.info.videoData.title+': video complete',1);

        if(dc.complete){
          _sdi.yt.setVideoData(data);
          _satellite.track(dc.complete);
        };

        v.state = 'completed';
      }
    }
  }
});

_satellite.domReady(function(){
  _sdi.yt.ready('dom');
});
