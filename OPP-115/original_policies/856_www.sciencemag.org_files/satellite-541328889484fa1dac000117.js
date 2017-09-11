var bcExp;
var modVP;
var modExp;
var modCon;

_satellite.bc = {
  videos: {},
  onTemplateReady: function(v){
    console.log('onTemplateReady', v);
  },
  onContentLoad: function(v){
    var currentVideo = modVP.getCurrentVideo();
    console.log('onContentLoad', currentVideo);
  },
  onVideoLoad: function(v){
    console.log('onVideoLoad', v);
  }
};
 
// called when template loads, this function stores a reference to the player and modules.
function onTemplateLoaded(exp) {
  // get experience
  bcExp = brightcove.getExperience(exp);
  // load modules
  modVP = bcExp.getModule(APIModules.VIDEO_PLAYER);
  modExp = bcExp.getModule(APIModules.EXPERIENCE);
  modCon = bcExp.getModule(APIModules.CONTENT);
	// add listeners
  
  // start or play
  modVP.addEventListener('videoStart', function(data){
    // don't capture preroll
    if(data.duration==60000)return;
    
    var v = modVP.getCurrentVideo();
    
    if(!_satellite.bc.videos[v.displayName]){
      _satellite.bc.videos[v.displayName] = {}
    }
    
    var vid = _satellite.bc.videos[v.displayName];
    
    if(!vid.started){
      s.Media.open(v.displayName, v.length/1000, 'Brightcove');
      _satellite.notify('Brightcove : '+v.displayName+' - start',1);
      vid.started = true;
    }
    s.Media.play(v.displayName, data.position);
    _satellite.notify('Brightcove : '+v.displayName+' - play at '+data.position,1);
  });
  
  // pause
  modVP.addEventListener('videoStop', function(data){
    var v = modVP.getCurrentVideo(),
        vid = _satellite.bc.videos[v.displayName];
    
    if(!vid || !vid.started)return;
    s.Media.stop(v.displayName, data.position);
    _satellite.notify('Brightcove : '+v.displayName+' - pause at '+data.position,1);
  });
  
  // complete
  modVP.addEventListener('videoComplete', function(data){
    var v = modVP.getCurrentVideo(),
        vid = _satellite.bc.videos[v.displayName];
    
    if(!vid || !vid.started)return;
    s.Media.stop(v.displayName, data.position);
    s.Media.close(v.displayName);
    _satellite.notify('Brightcove : '+v.displayName+' - complete',1);
  });
}
/*
var BCTemplateReady = function(evt){
  var player = brightcove.api.getExperience(evt.target.experience.id),
      videoPlayer = player.getModule('videoPlayer');
  videoPlayer.addEventListener(brightcove.api.events.MediaEvent.BEGIN, function(v){
    var name = v.media.displayName;
    if(typeof s != 'undefined'){
      s.Media.open(name,v.duration,'brightcove');
      s.Media.play(name,v.position);
    }
    if(!_satellite.bc.videos[name]){
      _satellite.bc.videos[name]={};
    }
    _satellite.bc.videos[name].started = true;
    _satellite.notify('Brightcove Video : '+v.media.displayName+' : start',1);
  });
  videoPlayer.addEventListener(brightcove.api.events.MediaEvent.STOP, function(v){
    var name = v.media.displayName;
    s.Media.stop(v.media.displayName,v.position);
    _satellite.notify('Brightcove Video : '+v.media.displayName+' : stop',1);
  });
  videoPlayer.addEventListener(brightcove.api.events.MediaEvent.PLAY, function(v){
    var name = v.media.displayName;
    if(!_satellite.bc.videos[name]){
      _satellite.bc.videos[name]={};
    }
    if(_satellite.bc.videos[name].started===true){
      s.Media.play(v.media.displayName,v.position);
      _satellite.notify('Brightcove Video : '+v.media.displayName+' : play',1);
    }
  });
};
var BCTemplateLoaded = function (experienceID) {
  // get a reference to the player and API Modules and Events
  var player = brightcove.api.getExperience(experienceID);
}*/
