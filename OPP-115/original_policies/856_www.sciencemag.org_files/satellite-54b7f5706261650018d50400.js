try {
  addthis.addEventListener('addthis.menu.share', function(evt){
    if (evt.type == 'addthis.menu.share'){
      _satellite.setVar('addthis_service', evt.data.service);
      _satellite.track('addthis share');
    }
  });
}
catch(err){
  _satellite.notify('Addthis does not exist on this page', 1);
}
