_satellite.loadScript('https://w.soundcloud.com/player/api.js',function(){
  // setup listener on all SoundCloud players
  _satellite.cssQuery('iframe[src*="w.soundcloud.com/player"]', function(players){
    for(var i=0; i<players.length; i++){
      var widget = SC.Widget(players[i]);
      widget.bind(SC.Widget.Events.READY, function() {
        // add the player to the list
        var sound;
        widget.getCurrentSound(function(data){
          sound = data;
          sound.lastPosition = [];
        });
        // play
        widget.bind(SC.Widget.Events.PLAY, function(data) {
          // new sound
          if(!sound){
            widget.getCurrentSound(function(data){
              sound = data;
              sound.lastPosition = [];
              sound.started = true;
              s.Media.open(sound.title,sound.duration/1000,'SoundCloud');
              _satellite.notify('SoundCloud: '+sound.title+' - started', 1);
              s.Media.play(sound.title, 0);
              _satellite.notify('SoundCloud: '+sound.title+' - play at 0', 1);
            });
          }
          else {
            // start
            if(!sound.started){
              sound.started = true;
              s.Media.open(sound.title,sound.duration/1000,'SoundCloud');
              _satellite.notify('SoundCloud: '+sound.title+' - started', 1);
            }

            // play
            s.Media.play(sound.title, data.currentPosition/1000);
            _satellite.notify('SoundCloud: '+sound.title+' - play at '+data.currentPosition/1000, 1);
          }
        });
        
        // pause
        widget.bind(SC.Widget.Events.PAUSE, function(data){
          //console.log('pause', data);
          s.Media.stop(sound.title, data.currentPosition/1000);
          _satellite.notify('SoundCloud: '+sound.title+' - pause at '+data.currentPosition/1000, 1);
        });
        
        // seek
        widget.bind(SC.Widget.Events.SEEK, function(data){
          // pause at last position
          var lastPosition = sound.lastPosition[sound.lastPosition.length-2];
          s.Media.stop(sound.title, lastPosition);
          _satellite.notify('SoundCloud: '+sound.title+' - seek from '+lastPosition, 1);
          
          // play at new position
          s.Media.play(sound.title, data.currentPosition/1000);
          _satellite.notify('SoundCloud: '+sound.title+' - seek to '+data.currentPosition/1000, 1);
          //s.Media.stop(sound.title, data.currentPosition/1000);
        });
        
        // finish
        widget.bind(SC.Widget.Events.FINISH, function(data){
          console.log('finish', data);
          _satellite.notify('SoundCloud: '+sound.title+' - finished', 1);
          sound = false;
          //s.Media.stop(sound.title, data.currentPosition/1000);
        });
        
        
        // play progress
        widget.bind(SC.Widget.Events.PLAY_PROGRESS , function(data){
          sound.lastPosition.push(data.currentPosition/1000);
        });
      });
    }
  });
});
