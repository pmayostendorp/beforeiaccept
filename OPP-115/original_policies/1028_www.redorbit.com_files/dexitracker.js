(function(){
		
	// FIX INDEXOF FOR IE
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function(obj, start) {
            for (var i = (start || 0), j = this.length; i < j; i++) {
                if (this[i] === obj) {
                    return i;
                }
            }
            return -1;
        };
    }
	
	// Create Script
	function create_script(id,src,sub)
	{
		src = src.replace('{cb}',Math.round(new Date().getTime() / 1000));
		document.write('<scr'+'ipt id="'+id+'" type="text/javascript" src="'+src+'"></scr'+'ipt>');
	}
	// SET COOKIE
	function set_cookie ( cookie_name, cookie_value, lifespan_in_seconds, valid_domain )
	{
		var domain_string = valid_domain ? ("; domain=" + valid_domain) : '';
		document.cookie = cookie_name + "=" + encodeURIComponent( cookie_value ) +  "; max-age=" + lifespan_in_seconds + "; path=/" + domain_string ;
	}
	
	// GET COOKIE
	function get_cookie ( Name )
	{
	   var search = Name + "=" 
	   if (document.cookie.length > 0) 
	   {
		  var offset = document.cookie.indexOf(search);
		  if (offset != -1) 
		  {
			 offset += search.length;
			 var end = document.cookie.indexOf(";", offset);
			 if (end == -1) end = document.cookie.length;
			 return unescape(document.cookie.substring(offset, end));
		  } 
	   } 
	   return false;
	}
	
	// WRITE EVENT TO DEXIMEDIA
	function fireEvent(name, value)
	{
		if(window.bmc_uuid)
		{
			var image = new Image(); 
			image.src =  'http://click.api.deximedia.com/events/?name=' + encodeURIComponent(name) + '&value=' + encodeURIComponent(value) + '&uuid=' + window.bmc_uuid;
		}
	}
	document.dxmFireEvent = fireEvent;

	// PUT QUERY PARAMATERS INTO 'qs' VARIABLE
	var qs = {};
	var temp = window.location.search.substring(1).split('&');
	for(var i=0; i < temp.length; i++)
	{
		var el = temp[i];
		el = el.split('=');
		qs[el[0]] = el[1];
	}
	

	// TRACKING FUNCTION
	function startTracking(newVisit)
	{
	
		var uuid = eval('(' + decodeURIComponent(window['bmc_uuid']) + ')');
		create_script('nht_dxm_tracker','http://click.api.deximedia.com/scripts/?c='+uuid.c+'&mcg='+uuid.mcg+'&h='+uuid.h+'&cb={cb}');
		
		// GET CURRENT TIME
		var curTime = (new Date()).getTime();
	
		// GET PV AND TIME COOKIE DATA
		var demepv = get_cookie('__demepv');
		var demest = get_cookie('__demest');
		

		if(typeof newVisit !== 'undefined' && newVisit == true)
		{
			demepv = false;
			demest = false;
		}
		
		// FIRE EVENTS BASED ON NEW VS RECURRING VISIT
		if(demepv == false || demest == false)
		{
			fireEvent('visit',1);
			fireEvent('pageview',1);
			set_cookie('__demepv',1,3 * 60);
			set_cookie('__demest',curTime,3 * 60);
		}
		else
		{
			fireEvent('pageview',1);
			fireEvent('addtimespent',Math.round((curTime - parseInt(demest)) / 1000));
			set_cookie('__demepv', parseInt(demepv) + 1,3 * 60);
			set_cookie('__demest',curTime,3 * 60);
		}
		
		// UPDATE TIME SPENT EVERY 15 SECONDS AND RESET COOKIE
		setInterval(function(){
			set_cookie('__demest',(new Date()).getTime(),3 * 60);
			fireEvent('addtimespent',65);
		}, 65000);
		
	}
	if(get_cookie('_bmc_uuid'))
	{
		window['bmc_uuid'] = get_cookie('_bmc_uuid');
		set_cookie('_bmc_uuid',get_cookie('_bmc_uuid'),3 * 60);
		startTracking();
	}
	else
	{
		window['bmc_uuid_loaded'] = function(uuid,newVisit)
		{
			window['bmc_uuid'] = uuid;
			set_cookie('_bmc_uuid',uuid,3 * 60);
			startTracking(newVisit);
		};
		create_script("bmc_uuid_scr",'http://click.api.deximedia.com/scripts/uuid.php?cb={cb}');
	}
})();