_satellite.pushAsyncScript(function(event, target, $variables){
  if(typeof $ != 'undefined'){
  if(typeof $.jPlayer != 'undefined'){
    var evts = $.jPlayer.event,
        _sdi = window._sdi || {};

    _sdi.jPlayer = {
      getName: function(d){
        return d.src.split('/').pop();
      },
      players: {}
    };

    function getName(d){
      return d.src.split('/').pop();
    }
    // play / start
    $('.jp-jplayer').bind(evts.play, function(e){
      var d = e.jPlayer.status,
          p = _sdi.jPlayer.getName(d);

      if(!_sdi.jPlayer.players[p]){
        s.Media.open(p, d.duration, 'Lidsyn');
        _sdi.jPlayer.players[p] = true;
        _satellite.notify('jPlayer: start: '+p, 1);
      }
    });
    // pause
    $('.jp-jplayer').bind(evts.pause, function(e){
      var d = e.jPlayer.status,
          p = _sdi.jPlayer.getName(d);

      s.Media.stop(p, d.currentTime);
      _satellite.notify('jPlayer: pause at '+d.currentTime+': '+p, 1);
    });
    // play / resume
    $('.jp-jplayer').bind(evts.playing, function(e){
      var d = e.jPlayer.status,
          p = _sdi.jPlayer.getName(d);

      s.Media.play(p, d.currentTime);
      _satellite.notify('jPlayer: play at '+d.currentTime+': '+p, 1);
    });
    // seek start
    $('.jp-jplayer').bind(evts.seeking, function(e){
      var d = e.jPlayer.status,
          p = _sdi.jPlayer.getName(d);

      s.Media.stop(p, d.currentTime);
      _satellite.notify('jPlayer: start seek at '+d.currentTime+': '+p, 1);
    });
    // seek end
    $('.jp-jplayer').bind(evts.seeked, function(e){
      _satellite.notify('jPlayer: end seek at '+d.currentTime+': '+p, 1);
    });
    // complete
    $('.jp-jplayer').bind(evts.ended, function(e){
      var d = e.jPlayer.status,
          p = _sdi.jPlayer.getName(d);

      s.Media.stop(p, d.duration);
      s.Media.complete(p, d.duration);
      satellite.notify('jPlayer: complete: '+p, 1);
    });
  }
}
});
