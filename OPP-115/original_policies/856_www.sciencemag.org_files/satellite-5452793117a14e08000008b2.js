// DTM Youtube Tracking - SiteCatalyst only
var _sdi = window._sdi || {};
_sdi.youtube = {
  // placeholders and functions
  videos: {},
  players: {},
  // get video data when the player is ready
  onReady: function(e){
    // get and set video data
    _sdi.youtube.setVideoData(e.target);
  },
  // set the video data
  setVideoData: function(v){
    var data = v.getVideoData();
    _sdi.youtube.videos[data.video_id] = {
      duration: v.getDuration(),
      started: false,
      state: '',
      title: data.title,
      author: data.author
    }
  },
  // listen to the different video state changes
  onStateChange: function(e){
    // get video data
    var id = e.target.getVideoData().video_id;

    // make sure video data is there (secondary videos)
    if(!_sdi.youtube.videos[id]){
      _sdi.youtube.setVideoData[e.target];
    }

    var v = _sdi.youtube.videos[id];

    if(!v.duration){
      v.duration = e.target.getDuration()
    }
    v.time = e.target.getCurrentTime();

    // set data elements
    for(i in v){
      _satellite.setVar('youtube '+i, v[i]);
    }

    // playing
    if(e.data == YT.PlayerState.PLAYING){
      v.state = 'playing';

      // video play (start)
      if(!v.started){
        v.started = true;
        if(typeof s != 'undefined'){
          s.Media.open(v.title, v.duration, 'youtube');
          s.Media.play(v.title, v.time);
          _satellite.notify('Youtube: Video Start: '+v.title, 1);
        }
      }
      else {
        if(typeof s != 'undefined'){
          s.Media.play(v.title, v.time);
          _satellite.notify('Youtube: Video Resume: '+v.title+' - '+v.time+'s', 1);
        }
      }
    }

    // buffering
    if(e.data == YT.PlayerState.BUFFERING && v.started == true){
      v.state = 'buffering';
      if(typeof s != 'undefined'){
        s.Media.stop(v.title, v.time);
        _satellite.notify('Youtube: Video Buffering: '+v.title+' - '+v.time+'s', 1);
      }
    }

    // unstarted
    if(e.data == YT.PlayerState.UNSTARTED){
      v.state = 'unstarted';
    }

    // paused
    if(e.data == YT.PlayerState.PAUSED){
      v.state = 'paused';
      if(typeof s != 'undefined'){
        s.Media.stop(v.title, v.time);
        _satellite.notify('Youtube: Video Paused: '+v.title+' - '+v.time+'s', 1);
      }
    }

    // end
    if(e.data == YT.PlayerState.ENDED){
      v.state = 'ended';
      v.started = false;
      if(typeof s != 'undefined'){
        s.Media.stop(v.title, v.time);
        s.Media.close(v.title);
        _satellite.notify('Youtube: Video Complete: '+v.title, 1);
      }
    }
  },
  configureIframe: function(video,vid){
    var p=document.location.protocol, old, pfx;

    // query param
    if(vid[0].indexOf('enablejsapi')==-1){
      vid[0] += (vid[0].indexOf('?')>-1 ? '&' : '?') + 'enablejsapi=1';
    }

    video.src = vid[0];
    video.id = vid[2];
  },
  checkIframes: function(){
    if(_sdi.youtube.ready){
      _satellite.cssQuery('iframe[src*="youtube"]', function(videos){
        for(var i=0; i<videos.length; i++){
          var video = videos[i];

          // setup listeners on the videos
          if(!video.getAttribute('data-tracked')){
            var src = video.src,
            vid = src.match(/h?t?t?p?s?\:?\/\/www\.youtube(-nocookie)?\.com\/embed\/([\w-]{11})(?:\?.*)?/);
            if(vid && vid.length > 1){
              video.setAttribute('data-tracked','true');
              _sdi.youtube.hasVideos = true;
              
              // update DTM variables
              _sdi.youtube.videos[vid[2]] = {
                state: ''
              };

              // update iframe
              _sdi.youtube.configureIframe(video,vid);
            }
          }
        }
      });

      // setup listeners
      _sdi.youtube.setupListeners();
    }
  },
  setupListeners: function(){
    for(var id in _sdi.youtube.videos){
      if(!_sdi.youtube.players[id]){
        _satellite.notify('Youtube: Setup Listeners: Video ID='+id, 1);
        _sdi.youtube.players[id] = new YT.Player(id, {
          events: {
            'onReady': _sdi.youtube.onReady,
            'onStateChange': _sdi.youtube.onStateChange,
            'videoId': id
          }
        });
      }
    }
  }
};

// Listen for the Youtube API
window.onYouTubeIframeAPIReady = function(){
  _satellite.notify('Youtube: Iframe API Ready', 1);
  _sdi.youtube.ready = true;
  _sdi.youtube.checkIframes();
}

_satellite.loadScript('//www.youtube.com/iframe_api');
