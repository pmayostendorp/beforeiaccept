(function() {
	function reset(w, doc) {
		var n=null;
		w.turn_beacon_data=n;
		w.turn_beacon_price=n;
		w.turn_beacon_currency=n;
		w.turn_beacon_url=n;
		w.turn_client_track_id=n;
		w.turn_beacon_referrer_url=n;
		w.turn_beacon_redirect_url=n;
	}

	function quote(x) {
		return x != null ? '"' + x + '"' : '""' ;
	}

	function encode(x) {
		if(typeof encodeURIComponent == "function") {
			return encodeURIComponent(x);
		} else { 
			return escape(x);
		}
	}
	
	function setDefaults(w, doc) {
	}
	
	function addBeaconUrlParam(w, paramName, paramValue) {
		if(paramValue != null) {
			w.turn_beacon_url += "&" + paramName + "=" + encode(paramValue);
		}
	}
	
		
	function setBeaconUrl(w, doc) {
					w.turn_beacon_url = "http://r.turn.com/r/beacon?";
							w.turn_beacon_data = "8yBAERD3MuHcn656MpA3KL5u07iu9KImcPWWFLouA40mcuMqSuK4notPIXkrszWUkz2dJkPg83bLTwFju24DKQ";
			addBeaconUrlParam(w, "b2", w.turn_beacon_data);
				addBeaconUrlParam(w, "jsb", "1");
					addBeaconUrlParam(w, "bprice", w.turn_beacon_price);
							addBeaconUrlParam(w, "currency", w.turn_beacon_currency);
							addBeaconUrlParam(w, "cid", w.turn_client_track_id);	
				addBeaconUrlParam(w, "rnd", Math.random());
					addBeaconUrlParam(w, "ref", w.turn_beacon_referrer_url);	
							addBeaconUrlParam(w, "url", w.turn_beacon_redirect_url);	
			}
	
	function beaconImg(w, doc) {
					doc.write('<img height="1" width="1" border="0"');
				doc.write(' src=' + quote(w.turn_beacon_url));
		doc.write('>');
		
								
						
						
					}
	
	setDefaults(window, document);
	setBeaconUrl(window, document);
	beaconImg(window, document);
	reset(window, document);		
}
)()
