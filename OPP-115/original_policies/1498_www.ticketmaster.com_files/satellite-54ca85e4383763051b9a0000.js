_satellite.pushAsyncScript(function(event, target, $variables){
  
var env = window.localStorage.sspEnv || (_satellite.readStoredSetting('debug') || _satellite.settings.isStaging ? 'qa' : 'prod');

var url = '//ds.ticketmaster.com/ssp/' + env + '/';
var pn = _satellite.getVar('page.pageInfo.pageName');
var vid = _satellite.getVar('page.attributes.venueID');
var aid = _satellite.getVar('page.attributes.artistID');
var eid = _satellite.getVar('page.attributes.eventID');

if (/ EDP\:/.test(pn) && eid != '') {

  url += 'event/e_' + eid;

} else if (/ Checkout\: Confirmation/.test(pn) && eid != '') {

  url += 'confirmation/c_' + eid;

} else if (/ Venue_Artist\:/.test(pn) && pn != '' && aid != '' && vid != '') {

  url += 'artistvenue/av_' + aid + '_' + vid;

} else {

  url = false;

}

if (url) {
  
  var success = function (data) {
    _satellite.notify(data);
    var now = new Date().getTime();
    var sortedTags = {};
    var results = jQuery.parseJSON(data);
    for(var i = 0;i<results.length;i++){
      if(results[i].enabled != false && now < results[i].endDate && now > results[i].beginDate){
        var key = 'tags_' + results[i].slug;
        if (typeof sortedTags[key] == "undefined") {
          sortedTags[key] = [];
        }
        sortedTags[key].push(results[i]);
      }
    }
    for(var service in sortedTags){
      if(sortedTags.hasOwnProperty(service)){
        _satellite.setVar(service,sortedTags[service]);
        _satellite.notify('UBER TAGS: ' + service + ' loaded.');
        //window.digitalData.tags.data[service] = sortedTags[service];
      }
    }
    window.digitalData.tags.loaded = true;
    _satellite.track('uberClientTagsLoaded');
  };

  jQuery.get(url + '.json')
    .done(success)
    .fail(function (jqxhr, txt, error) {

      if (jqxhr.status === 404) {

        window.digitalData.tags.loaded = true;

      } else {
        window.digitalData.tags.error = jqxhr;
        window.digitalData.tags.loaded = false;
      }

      return false;
    });
}


});
