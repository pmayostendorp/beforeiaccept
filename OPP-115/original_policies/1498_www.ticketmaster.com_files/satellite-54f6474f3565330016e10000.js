

jQuery(document).bind('reservecomplete',function(event,data){
  _satellite.notify('NTF Reserve Complete:'+data.failure_type,1);
  if(!data.failure_type)return;
  var lastResponse = BbaSearch && BbaSearch.getInstance && BbaSearch.getInstance().originalReserveResponse && BbaSearch.getInstance().originalReserveResponse.failure_info;
  if(!lastResponse)lastResponse = {backend_error_code:'',reservce_failure_code:'',seats_not_reserved:''};
var v4 = function() {

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
  var pn = _satellite.getVar('page.pageInfo.pageName');
  var ep = 'http://app.rcmd.jetdev1.syseng.tmcs:8080/api';
	//var ep = 'http://app.map.ijash1.syseng.tmcs:8080/api/';
  if(!_satellite.settings.isStaging){
    ep = '//www.ticketmaster.com/data/rcmd/pixel';
  }

  var payload = {
    ntf_err: data.failure_type,
    ntf_bec:lastResponse.backend_error_code,
    ntf_rfc:lastResponse.reserve_failure_code,
    ntf_snr: lastResponse.seats_not_reserved,
    pxt:'ntf',
    evt:'ntf',
    imp: v4(),
    bid: _satellite.getVar('browser id'),
    pid: _satellite.getVar('member id - persistant'),
    sid: _satellite.getVar('session id'),
    pgt: _satellite.getVar('page.pageInfo.pageType'),
    dmn: pn.substr(0, pn.indexOf(':')) || "",
    eid: _satellite.getVar('page.attributes.eventID'),
    aid: _satellite.getVar('page.attributes.artistID'),
    mct: _satellite.getVar('page.category.primaryCategoryID'),
    tsu: Date.now(),
    cfc: _satellite.getVar('cfc'),
    mid: _satellite.getVar('user.id')
  };

jQuery.get(ep,payload).done(function(){
	_satellite.notify('NTF Pixel Server data sent successfully',1);
}).fail(function(status){
	_satellite.notify('NTF Pixel Server returned with status '+status.status,1);
});
    
  
});
