/**
* MECLABS DATA
*
* A testing platform for rigorous experiments in the new science of optimization
*
* @package		MECLABS DATA
* @author		MECLABS Dev Team
* @copyright	Copyright (c) 2011, MECLABS LLC. INTELLECTUAL PROPERTY DISCLAIMER FOR MECLABS LLC.
*/

/**
* IE console bug fix
*/

if(typeof(console) === 'undefined') {
    var console = {};
    console.log = console.error = console.info = console.debug = console.warn = console.trace = console.dir = console.dirxml = console.group = console.groupEnd = console.groupCollapsed = console.time = console.timeEnd = console.assert = console.profile = function() {};
}

var Mecdata = {

	/* ============================= Properties ============================= */

    /**
     * Object represents object package for transmitting data over JSONP
     * @var object
     */

    "_MD_PKG"		: new Object(),

    /**
     * Represents if class has been initialized
     * @var boolean
     */

    "_MD_INIT"		: false,

    /**
     * This is the default init request mode for Mecdata.
     * 0 = SYNCHRONOUS
     * 1 = ASYNCHRONOUS
     * @var integer
     */

    "_INIT_REQUEST_MODE": 0,

    /**
     * Asynchronous is the default request mode for 
     * any calls that are not on init
     */
    
    "_DEFAULT_REQUEST_MODE": 1,

    /**
     * The Debugging flag specified in the url
     * This query parameter must equal 1 to be turned on
     * @var string
     */

    "_DBG_QUERY_STRING_PARAM": 'dbg',

    /**
     * The Bypass flag specified in the url
     * This query parameter must equal 1 to be turned on
     * @var string
     */

    "_BYPASS_QUERY_STRING_PARAM": 'bypass',

    /**
     * The name of the cookie to set for debugging
     * @var {string}
     */
    
    "_DBG_COOKIE_NAME": 'MD_DBG',

    /**
     * The name of the cookie to use for byp
     * @var {string}
     */

    "_BYPASS_COOKIE_NAME": 'MD_BYPASS',

    /**
     * Tha name of the cookie to set for the visitors unique id
     * @var {string}
     */
    
     "_MD_COOKIE_HASH_NAME": 'MD_UID',

    /**
     * Days until the cookie expires
     * @var int
     */
    
    "_COOKIE_EXPIRES": 30,

    /**
     * Turns debugging on.
     * Any messages sent to the _log method will be written to the console
     * @var boolean
     */

    "_DBG"	: false,

    /**
     * Turns bypass on
     * When set to true, all requests made to the server will not be tracked.
     * Note: Ideal for maintenance mode
     */
    "_BYPASS" : false,

    /**
     * Flag to prevent client side calls if server call determines visitor is not in campaign
     * @var boolean
     */

    "_MD_IS_TRACKING" : true,

    /**
     * Flag set to true if cross-domain tracking is needed
     * @var boolean
     */

    "_MD_XDT" : false,

    /**
     * Server side file path that executes the request
     * @var string
     */

    "_MD_EXEC" : 'mecdata.php',

    // TODO: (SVB) Browser versions will require regular updates, pending upcoming releases

    /**
     * Integer represents the highest major browser release
     * @var datatype
     */    
    
    "_MD_BSR_MAJ"	: 10,

    /**
     * The id of the element to pass tracking/event data to
     * @var string
     */

    "_MD_ELEMENT_ID" : 'mdataControllerIdX',

    /**
     * Holds an object of targeted html elements for multivariate tests
     * @var object
     */

    "_contentTargets": {},

    /**
     * Holds an object of timers for multivariate tests
     * @var object
     */

    "_contentTimers": {},

    /**
     * Mecdata.Url instance of the current url of the page this code is on
     * @var Mecdata.Url object
     */
    
    "_url": null,

    /**
     * Contains the response data after init
     * This will not always be filled
     */
    
    "responseData": {

        "data": {},
        "getCampaignName": function() {
            return this.data['campaignName'];
        },
        "getCampaignId": function() {
            return this.data['campaignId'];
        },
        "getCampaign": function() {
            return this.data['campaignId']+'_'+this.data['campaignName'];
        },
        "getTreatmentId": function() {
            return this.data['treatmentId'];
        },
        "getTreatmentName": function() {
            return this.data['treatmentName'];
        },
        "getTreatment": function() {
            return this.data['treatmentId']+'_'+this.data['treatmentName'];
        },
        "getTreatmentUrl": function() {
            return this.data['treatmentUrl'];
        }

    },

    "setResponseData": function(obj) {

        this.responseData.data = obj;

        this._log('Response Data', 'groupCollapsed');
        this._log(this.responseData.data, 'info');
        this._log('', 'groupEnd');

    },

    /* ============================= Methods ============================= */

    /**
     * Sets a value for the specified key in _MD_PKG
     * @param string
     * @param mixed
     * @return void
     */

    "__set"		: function(key, val) {
        
        if(key) {
            
            this._MD_PKG[key] = val;

        }

    },

    /**
     * Returns a value for a specified key in _MD_PKG
     * @param string
     * @return mixed
     */

    "__get"		: function(key) {

        // FIXME: (SVB) Do we really need the ability to get a variable?
        if(this._MD_PKG[key]) {

            return this._MD_PKG[key];
        
        }

        return null;

    },

    "_setInitOptions": function(obj) {

        if(obj['onInitComplete']) {
            this.onInitComplete = obj.onInitComplete;        
        }

        if(obj['onError']) {
            this.onError = obj.onError;        
        }

        if(obj['onTrackComplete']) {
            this.onTrackComplete = obj.onTrackComplete;        
        }

        if(obj['id']) {
            this.__set('MD_ID', obj['id']);
        }

        if(obj['dbgUrl']) {
            this.__set('MD_DBG_URL', obj['dbgUrl']);
        }

        async = (obj['async'] !== undefined) ? obj['async'] : this._INIT_REQUEST_MODE ;
        
        this.__set('MD_ASYNC', async);

        if(obj['_sessionAttributes']) {

            this._sessionAttributes(obj['_sessionAttributes'], false, this._MD_PKG['async']);

        }
                
        if(obj['_track']) {

            var metricAttributes;

            if(obj['metricAttributes']) {
                var metricAttributes = obj['metricAttributes'];
            }

            this._track(obj['_track'], false, metricAttributes);

        }

        if(obj['_pageView']) {

            this._pageView(obj['_pageView'], this._MD_PKG['async']);

        }

        if(obj['_targetAttributes']) {

            this._log('_targetAttributes PASSED', 'groupCollapsed');
            data = this._serialize(obj['_targetAttributes'], '|');
            this._log(data, 'info');
            this.__set('MD_TA', data);
            this._log('', 'groupEnd');

        }

    },

    /**
     * Sets values in _MD_PKG and makes an initial call
     * @param object - Campaign Suite Id
     * @return void
     */

    "_init"		: function(options) {

        this.onInitComplete = function(){};
        this.onError = function(){};
        this.onTrackComplete = function(){};

        // create a new instance of Mecdata.Url for the current page        
        this._url = new this.Url(window.location.href);

	    this._BYPASS = this._setBypass();

        // set debug mode on or off depending up the query string flag
        this._DBG = this._setDbgMode();

        // this call must come before setting _MD_INIT = true
        this._setInitOptions(options);

        this._MD_INIT = true;

        // Create / retrieve a cookie for the visitor

        this._log('UID', 'groupCollapsed');
        uid = this._getUid();
        this._log('', 'groupEnd');

        this.__set(this._MD_COOKIE_HASH_NAME, uid);

        this._MD_PKG['MD_B_CODE']	= navigator.appCodeName ? navigator.appCodeName : 'N/A';
        this._MD_PKG['MD_B_NAME']	= navigator.appName ? navigator.appName : 'N/A';
        this._MD_PKG['MD_B_VER']	= navigator.appVersion ? navigator.appVersion : 'N/A';
        this._MD_PKG['MD_B_UA']		= navigator.userAgent ? navigator.userAgent : 'N/A';
        this._MD_PKG['MD_B_MAJ']	= this._getUserBrowserMajor();
        this._MD_PKG['MD_B_MIN']	= this._getUserBrowserMinor();
        this._MD_PKG['MD_B_JRE']	= this._getUserBrowserJavaEnabled();
        this._MD_PKG['MD_B_SW']		= this._getUserBrowserScreenWidth();
        this._MD_PKG['MD_B_IW']		= this._getUserBrowserInnerWidth();
        this._MD_PKG['MD_B_SH']		= this._getUserBrowserScreenHeight();
        this._MD_PKG['MD_B_IH']		= this._getUserBrowserInnerHeight();

        this._MD_PKG['MD_D_REF']	= this._getUserReferrer();
        this._MD_PKG['MD_D_URL']	= this._getUserDocUrl();
        this._MD_PKG['MD_D_PCL']    = this._url.protocol;
        //this._MD_PKG['MD_D_PCL']	= (('https:' == document.location.protocol) ? 'https' : 'http');
        this._MD_PKG['MD_D_TTL']	= document.title;
        //this._MD_PKG['MD_D_DMN']    = document.domain;
        this._MD_PKG['MD_D_DMN']	= this._url.hostname;
    
        this._MD_PKG['MD_E_CD']		= this._getUserColorDepth();
        this._MD_PKG['MD_E_LANG']	= this._getUserLanguage();
        this._MD_PKG['MD_E_PFM']	= this._getUserPlatform();
        this._MD_PKG['MD_E_OS']		= this._getUserOperatingSystem();
        this._MD_PKG['MD_E_DATE']	= Math.round((new Date()).getTime() / 1000);
        this._MD_PKG['MD_INITIAL']  = 1;
        this._MD_PKG['MD_E_TZ']		= this._getUserTimeZone();

        // Insert an id into the document to pass tracking/event data to
        document.write('<div id="'+Mecdata._MD_ELEMENT_ID+'" style="display:none">MDData</div>');

        requestUrl = this._getRequestUrl();

        this._log('MedataObject after Init', 'groupCollapsed');
        this._log(this, 'log');
        this._log('', 'groupEnd');

        //console.groupCollapsed(this);
        //console.groupEnd();

        // make the initial call
        if(this._MD_IS_TRACKING) {

            this._request(requestUrl, this._MD_PKG['MD_ASYNC']);

        }

    },

    /**
     * Makes a server request
     * @param string - request url
     * @param integer - request type: 1 = async, 0 = sync
     * @return void
     */


    "_request": function(reqUrl, reqType) {

        this._log('Request Made', 'groupCollapsed');

        if(reqType === 1) {

            this._log('Async Request', 'info');
            this._log('Request Url: '+reqUrl, 'info');
            this._requestAsync(reqUrl);
            this._getCookie(this._MD_COOKIE_HASH_NAME);

        }

        else {

            this._log('Sync Request', 'info');
            this._log('Request Url: '+reqUrl, 'info');

            this._requestSync(reqUrl);
            this._getCookie(this._MD_COOKIE_HASH_NAME);

        }

        this._log('', 'groupEnd');

    },

    /**
     * Makes a Asynchronous Request
     * @param string - The Request Url
     * @param object - The data to send over 
     * @return void
     */

    "_requestAsync": function(reqUrl) {

        var MDBaseUrl = this._MD_PKG['MD_D_PCL'] + "://" + reqUrl;
     
        if(this._MD_IS_TRACKING) {

            var scrObj = document.createElement('script');
            scrObj.setAttribute('type', 'text/javascript');
            scrObj.setAttribute('src', unescape(MDBaseUrl));
            this._getObj(Mecdata._MD_ELEMENT_ID).appendChild(scrObj);

            this._clearPKG();
        
        }

    },

    /**
     * Makes a Synchronous Request
     * @param string - The Request Url
     * @param object - The data to send over 
     * @return void
     */

    "_requestSync": function(reqUrl) {

        this._log('SYNC REQUEST MADE', 'info');

        var MDBaseUrl = this._MD_PKG['MD_D_PCL'] + "://" + reqUrl;
        document.write(unescape("%3Cscript src='" +MDBaseUrl+ "' type='text/javascript'%3E%3C/script%3E"));

        this._clearPKG();


    },


    /**
     * Sent when a MecdataException occurs on the server side
     * @param  {string} strMessage Error Message
     * @param  {int} errorCode  ErrorCode Number
     * @return {void}
     */
    
    "_err": function(strMessage, errorCode) {

        this._log('MecdataException Raised!', 'group');
        this._log('Msg: '+strMessage, 'warn');
        this._log('Error Code: '+errorCode, 'warn');
        this._log('', 'groupEnd');

    },

    /**
     * Clears certain items from MD_PKG
     * @return {void}
     */
    
    "_clearPKG": function() {

        delete(this._MD_PKG['MD_METRIC']);
        delete(this._MD_PKG['MD_EVENT_ONLY']);
        delete(this._MD_PKG['MD_ATTR']);
        delete(this._MD_PKG['MD_TA']);
        delete(this._MD_PKG['MD_MA']);

    },

    /**
     * Tracks a metric
     * Handles tracking for all metric types (click, conversion, etc);
     * @param string - name of metric
     * @param mixed - value of the metric
     * @param integer - [Optional] 1: Async call, 0: Sync call, default: 1
     * @return void
     */

    "_trackOld": function(name, value, async)  {

        this._log('_track called', 'groupCollapsed');

    	if(this._MD_INIT && name !== '' && value !== '') {

    		asyncRequestMode = (async == undefined) ? 1 : async ;

            this._log({'name': name, 'value': value, 'async': asyncRequestMode});

    		this._MD_PKG['MD_E_NAME'] = name;
    		this._MD_PKG['MD_E_VALUE'] = value;
    		this._MD_PKG['MD_EVENT'] = 1;

            requestUrl = this._getRequestUrl();

            if(asyncRequestMode === 1) {
            
            	this._requestAsync(requestUrl);
           	
            }

           	else { 
           	
           		this._requestSync(requestUrl);
           	
           	}

    	}

        this._log('', 'groupEnd');


    },

    /**
     * Sets session attribute(s)
     * Specify a delay when you want to prevent the default event from being triggered
     * @param object - key => value pairs of data to set in the users session
     * @param mixed - delay in millesconds or set to false if you don't want to delay
     * @param integer - 1: Async 0: Sync
     * @return mixed
     */

    "_sessionAttributes": function(obj, delay, async) {

        var delay_t = delay;
        this._log('_sessionAttributes called', 'groupCollapsed');

        if(typeof obj !== 'object') {
            this._log('_sessionAttributes Error: YOU MUST PASS AN OBJECT AS THE FIRST ARG!', 'error');
        }

        data = this._serialize(obj, '|');
        this._log(data, 'info');
        this.__set('MD_ATTR', data);

        if(this._MD_INIT === false) {

            this._log('_sessionAttributes CALLED ON INIT', 'info');

        }

        else {

            asyncRequestMode = this._DEFAULT_REQUEST_MODE;
            requestUrl = this._getRequestUrl();

            if (delay != undefined & delay != 0 || delay !=''){ 
                //add the delay on the request             
                setTimeout(function() { Mecdata._request(requestUrl, asyncRequestMode)},delay_t);
            }
            else{
                //no delay added on the request
                this._request(requestUrl, asyncRequestMode);
            }

        }

        this._log('', 'groupEnd');

    },

    /**
     * Sets session attributes in the package, but does not make a server call
     * @param  {object} obj
     * @return {void}
     */
    
    "_setSessionAttributes": function(obj) {

        this._log('_setSessionAttributes called', 'groupCollapsed');

        if(typeof obj !== 'object') {
            this._log('_setSessionAttributes Error: YOU MUST PASS AN OBJECT AS THE FIRST ARG!', 'error');
        }

        data = this._serialize(obj, '|');
        this._log(data, 'info');
        this.__set('MD_ATTR', data);

        this._log('', 'groupEnd');

    },

    /**
     * Track metric(s)
     * Specify a delay when you want to prevent the default event from being triggered
     * @param object - key => value pairs of data to set in the users session
     * @param mixed - delay in millesconds or set to false if you don't want to delay
     * @param integer - 1: Async 0: Sync
     * @return mixed
     */

    "_track": function(obj, delay, metricAttributes) {

        var delay_t = delay;
        this._log('_track called', 'groupCollapsed');

        if(typeof obj !== 'object') {
            this._log('_track Error: YOU MUST PASS AN OBJECT AS THE FIRST ARG!', 'error');
            return false;
        }

        data = this._serialize(obj, '|');
        this._log(data, 'info');
        this.__set('MD_METRIC', data);

        // set metric attributes if any are defined
        if((metricAttributes != undefined || metricAttributes != null) && (typeof metricAttributes == 'object')) {
         
            this.__set('MD_MA', this._serialize(metricAttributes, '|'));

        }

        if(this._MD_INIT === false) {

            this._log('_track CALLED ON INIT', 'info');

        }

        else {

            this.__set('MD_EVENT_ONLY', 1);
            asyncRequestMode = this._DEFAULT_REQUEST_MODE;
            requestUrl = this._getRequestUrl();
            if (delay != undefined & delay != 0 || delay !=''){ 
                //add the delay on the request             
                setTimeout(function() { Mecdata._request(requestUrl, asyncRequestMode)},delay_t);
            }
            else{
                //no delay added on the request
                this._request(requestUrl, asyncRequestMode);
            }
        }

        this._log('', 'groupEnd');

    },

    /**
     * Tracks a page view
     * @param  {string} url the label you want for the pageview
     * @param  {boolean} async request
     * @return void
     */
    
    "_pageView": function(url, async) {

        this._log('_pageView called', 'groupCollapsed');

        if(url == null || url == '') {

            this._log('_pageView Error: Empty string passed!', 'error');
            return false;

        }

        this.__set('MD_PAGEVIEW', url);
        this._log('_pageView: '+url);

        if(this._MD_INIT === false) {

            this._log('_pageView CALLED ON INIT', 'info');

        }

        else {

            this.__set('MD_EVENT_ONLY', 1);
            asyncRequestMode = this._DEFAULT_REQUEST_MODE;
            requestUrl = this._getRequestUrl();
            this._request(requestUrl, asyncRequestMode);

        }

        this._log('', 'groupEnd');

    },

    /**
     * Return the Request Url for making requests
     * This will serialize the _MD_PKG object and append to the url 
     * @return string
     */

    "_getRequestUrl": function() {

        var url = (this._MD_PKG['MD_DBG_URL']) ? this._MD_PKG['MD_DBG_URL'] : 'service1.meclabsdata.com';

        return url + '/'+Mecdata._MD_EXEC+'?' + this._serialize(this._MD_PKG);

    },

    /**
     * Serializes an object
     * @param object
     * @return string
     */

    "_serialize": function(obj, delimiter) {

        if(delimiter === undefined) {
            delimiter = '&';
        }

    	var joinArray = Array();
        for(var i in obj)
        {
            joinArray.push(i + '=' + escape(this.encode(obj[i])));
        }
        return joinArray.join(delimiter);

    },

    /**
     * Gets an object in the DOM
     * @param selector
     * @return object
     */

    "_getObj": function(name) {
        var object = document.getElementById
        ? document.getElementById(name)
        : document.all
        ? document.all[name]
        : document.layers[name];
        return object ;
    },

    /**
     * Redirects to a url
     * @param string
     * @param bool
     * @return void
     */

    "_g" : function(url, shouldRedirect) {


        if(shouldRedirect) {
        //if(url != '' && url != window.location.href) {

            // check if we are redirecting to a new domain

            currentDomain = this._getDomain(window.location.href);
            splitDomain = this._getDomain(url);

            this._log(currentDomain+' === '+splitDomain);

            if(currentDomain !== splitDomain) {

                url = this._updateQueryStringParameter(url, "md_sess", this._getCookie('MD_UID'));

            }

            if(this._DBG) {
                url = this._updateQueryStringParameter(url, this._DBG_QUERY_STRING_PARAM, "1");
            }

            setTimeout(function() {
    
                window.location = url;

            }, 0);

        }

    },

    /**
     * Handles a No Tracking Response from the server. Prevents any future calls to the server
     * @param integer
     * @return void
     */

    "_nt" : function( istrackable, message ) {
        this._log('NO TRACKING', 'warn');
        if(message) {
            this._log(message, 'warn');
        }
        this._MD_IS_TRACKING = istrackable;                   

    },


    /**
     * Callback function for a getContent request
     * @param object
     * @return void
     */

    "_mv": function(obj) {

        this._log('Multivariate Callback', 'groupCollapsed');

        try {

            el = this._getObj(this._contentTargets[obj.accessor]);

            if(obj.content !== null && obj.content !== '') {

                el.innerHTML = obj.content;

            }

            this._log({
                "element": el,
                "accessor": obj.accessor,
                "content": obj.content
            }, 'log');

            el.style.display = 'block';

        }

        catch(err) {

            //console.log(err);

        }

        this._log('', 'groupEnd');

    },

    /**
     * Requests a content offer
     * @param string - target html element (must be an id)
     * @param string - accessor
     * @return void
     */

    "_getContent": function(target, accessor) {

        if(!this._MD_INIT || !this._MD_IS_TRACKING)
        {
            return false;
        }

        this._contentTargets[accessor] = target;
        var el = this._getObj(target);
        el.style.display = 'none';

        if(this._MD_PKG['MD_ASYNC'] == 0) {

            this._log('getContent called: '+accessor, 'info');

            Mecdata._MD_PKG['MD_ACCESSOR'] = accessor;

            requestUrl = this._getRequestUrl();

            Mecdata._request(requestUrl, 0);
        }

        if(this._MD_PKG['MD_ASYNC'] == 1) {

            this._contentTimers[accessor] = setInterval(function() {

                if(!Mecdata._MD_IS_TRACKING) {
                    clearInterval(Mecdata._contentTimers[accessor]);
                    el.style.display = 'block';
                }

                if(Mecdata._MD_PKG['MD_INITIAL'] == 0) {

                    Mecdata._MD_PKG['MD_ACCESSOR'] = accessor;
                    Mecdata._log('getContent called: '+accessor, 'info');

                    requestUrl = Mecdata._getRequestUrl();

                    Mecdata._request(requestUrl, 1);
                    clearInterval(Mecdata._contentTimers[accessor]);

                }

            }, 100);
        }

    },

    /**
     * Sets bypass mode on or off based on query parameter of cookie
     * @return boolean
     */

    "_setBypass": function() {

        var bypassParam = this._getQueryStringParameter(this._BYPASS_QUERY_STRING_PARAM);

        if(bypassParam !== null && bypassParam.match(/^1#?$/)) {

            this._setCookie(this._BYPASS_COOKIE_NAME, 1, 1, '/', this._url.domain, this._url.https);
        }

        if(this._getCookie(this._BYPASS_COOKIE_NAME) == true) {

            this.__set(this._BYPASS_COOKIE_NAME, 1);
            return true;

        }

        return false;

    },

    /**
     * Sets debug mode on or off based on query paramater of cookie
     * @return boolean
     */

    "_setDbgMode": function() {

        dbgParam = this._getQueryStringParameter(this._DBG_QUERY_STRING_PARAM);

        if(dbgParam !== null && dbgParam.match(/^1#?$/)) {

            this._setCookie(this._DBG_COOKIE_NAME, '1', 1, '/', this._url.domain, this._url.https);

        }

        if(this._getCookie(this._DBG_COOKIE_NAME) == 1) {

            this.__set(this._DBG_COOKIE_NAME, 1);
            return true;

        }

        return false;

    },

    /**
     * Writes to the console if _DBG is true
     * @param string - message
     * @return void
     */

    "_log": function(str, type) {

        if(this._DBG) {

            try {

                if(type === undefined) {
                    type = 'log';
                }

                console[type](str);

            }

            catch(e) {
                console.log(e);
            }

        }

    },

    /** INTERNAL CORE: Cookie management function */

    /**
     * Sets a cookie value for MD_T
     * @param string - cookie value
     * @param integer - expires in this many days
     * @return void
     */

    "_c": function(cid, daysToExpire ) {

        var pathCookie = this._getCookie(this._MD_COOKIE_HASH_NAME);
        if(pathCookie == null || pathCookie != cid) {
            
            var domain = this._MD_PKG['MD_D_DMN'];

            /* Establish a cleaned URL path without any GET variables */
            var cleanPath = this._MD_PKG['MD_D_URL'].replace(/^.+:\/\//, '').replace(domain, '').replace(/\?+.*$/, '');

            /** Cookie valid for entire domain */
            //var cleanPath = "/";

            var secure = (this._MD_PKG['MD_D_PCL'] == 'https') ? true : false;

            this._setCookie(this._MD_COOKIE_HASH_NAME, cid, daysToExpire, cleanPath, domain, secure);

        }

    },

    "_setVisitorCookie": function(cid) {

        cleanPath =this._getCleanPath(this._url.url);

        this._setCookie(this._MD_COOKIE_HASH_NAME, cid, this._COOKIE_EXPIRES, cleanPath, this._url.domain, this._url.https);

    },

    /** INTERNAL CORE: Cookie setter function */

    /**
     * Sets a cookie
     * @param string - name
     * @param mixed - value
     * @param integer - expires in this many days
     * @param string - path to set the cookie on
     * @param string - domain to set the cookie on
     * @param boolean - set cookie on https
     * @return mixed
     */

    "_setCookie": function(name, value, expires, path, domain, secure) {
        
        // set time, it's in milliseconds
        var today = new Date();
        today.setTime(today.getTime());
        expires = this._getCookieExpirationDate(expires);

        document.cookie = name + "=" +escape( value ) +
        ( ( expires ) ? ";expires=" + expires.toGMTString() : "" ) +
        ";path=/" + 
        ( ( domain ) ? ";domain=." + domain : "" );

    },

    /**
     * Retuns the expiration date for a cookie 'days' from now
     * @param  {int} days How many days until the cookie expires?
     * @return {Date}
     */
    
    "_getCookieExpirationDate": function(days) {

        var today = new Date();
        today.setTime(today.getTime());

        expires = days * 1000 * 60 * 60 * 24;

        return new Date(today.getTime() + expires);

    },

    /**
     * Returns the clean path of a url
     * @param  {string} url The url to get the clean path from
     * @return {string}
     */
    
    "_getCleanPath": function(url) {

        var domain = this._getDomain(url);
        return url.replace(/^.+:\/\//, '').replace(domain, '').replace(/\?+.*$/, '');

    },

    /**
     * Checks to see if a url is using a secure protocol
     * @param  {string} url The url to check
     * @return {boolean}
     */
    
    "_isSecure": function(url) {

        return ('https:' == document.location.protocol) ? true : false ;

    },

    /**
     * Gets a Cookie value by name
     * @param string - cookie name
     * @return mixed
     */

    "_getCookie" : function (check_name) {

        // first we'll split this cookie up into name/value pairs
        // note: document.cookie only returns name=value, not the other components
        var a_all_cookies = document.cookie.split( ';' );
        var a_temp_cookie = '';
        var cookie_name = '';
        var cookie_value = '';
        var b_cookie_found = false; // set boolean t/f default f

        for ( i = 0; i < a_all_cookies.length; i++ ) {

            // now we'll split apart each name=value pair
            a_temp_cookie = a_all_cookies[i].split( '=' );

            // and trim left/right whitespace while we're at it
            cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');

            // if the extracted name matches passed check_name
            if (cookie_name == check_name) {

                cookie_value = unescape( a_temp_cookie[1].replace(/^\s+|\s+$/g, '') );
                return cookie_value;

            }

            a_temp_cookie = null;
            cookie_name = '';
        
        }
        
        if ( !b_cookie_found ) {

            return null;
        
        }

    },

    /**
     * Return the visitor unique id
     * @return {string}
     */
    
    "_getUid": function() {

        this.__set('MD_PTP', 0);

        // try first party
        uid = this._getCookie(this._MD_COOKIE_HASH_NAME);

        this._log('1st party Uid: '+uid, 'info');

        if(uid) {
            return uid;
        }

        // check query string
        if(this._url.getParam(this._MD_COOKIE_HASH_NAME)) {

            uid = this._url.getParam(this._MD_COOKIE_HASH_NAME);
            this._setVisitorCookie(uid);
            this.__set('MD_PTP', 1);
            this._log('Query String Uid: '+uid);

        }

        if(uid) {
            return uid;
        }

        uid = this._genUid();
        this._log('Generated Uid: '+uid);
        this._setVisitorCookie(uid);
        this.__set('MD_PTP', 1);

        return uid;
    },

    /**
     * Redirects to url by appending the visitor's cookie id
     * @param  {string} url
     * @param  {float} delay Delay in Milliseconds
     * @param  {boolean} newWindow defaults to false
     * @return void
     */
    
    "_redirectWithAppendingId" : function(url, delay, newWindow){

        var link_url = url;
        var delay = delay;
        var cookie_link;
        var link_url;
        var query_symbol;
        var debug_query;
        cookie_link = this._getCookie(this._MD_COOKIE_HASH_NAME);
        
        //Check if there is a existing query param, if so, then append & to query param
        query_symbol = (link_url.indexOf("?") == -1) ? "?" : "&";


        //Check if debug cookie is set, then append to the end of the md_session
        debug_query = (this._getCookie(this._MD_COOKIE_HASH_NAME) != null) ? '&dbg=1' : '';

        link_url = link_url + query_symbol +_MD_COOKIE_HASH_NAME+"="+ cookie_link + debug_query;
        this._log(link_url, "log");

        if(newWindow) {

            setTimeout(function() {

                window.open(link_url, 'newwindow');

            }, delay);

        }

        else {

            setTimeout(function() {
                window.location = link_url
            }, delay);

        }

    },

    /**
     * Retuns a url string with appended query parameters
     * @param  {object} params
     * @param  {string} url
     * @return {string}
     */
    
    "_appendQueryParametersToUrl": function(params, url) {

        arr = [];

        for(key in params) {

            arr.push(key+'='+params[key]);

        }

        if(url.match(/\?/)) {

            return url+'&'+arr.join('&');

        }

       return url+'?'+arr.join('&');

    },

    "Url": function(strUrl) {

        this.hash = '';
        this.host = '';
        this.hostname = '';
        this.domain = '';
        this.url = '';
        this.path = '';
        this.port = '';
        this.protocol = '';
        this.origin = '';
        this.params = {};
        this.queryString = '';

        this.https = false;

        /**
         * Parses a Url string
         * @param  {string} str url string
         * @return {void}
         */
        
        this.parse = function(str) {

            tmpUrl = document.createElement('a');
            tmpUrl.href = str;

            this.hash = tmpUrl.hash;
            this.host = tmpUrl.host;
            this.hostname = tmpUrl.hostname;
            this.domain = this.getDomainWithoutSubdomain(str);
            this.url = tmpUrl.href;
            this.path = this.getPath(tmpUrl.pathname);
            this.port = tmpUrl.port;
            this.protocol = this.getProtocol(tmpUrl.protocol);
            this.origin = tmpUrl.origin;
            this.params = this.getParamsAsObject(tmpUrl.search);
            this.queryString = tmpUrl.search;
            this.https = this.isHttps(str);

        };

        /**
         * Returns the domain without the subdomain(s)
         * @param  {string} url
         * @return {string}
         */
        
        this.getDomainWithoutSubdomain = function(url) {

            tmp = url.replace(/http[s]?:\/\/(?:www\.)?/, '');
            fullDomain = tmp.split('/')[0];
            parts = fullDomain.split('.');
            domain = parts.slice(-2).join('.');
            
            return domain;

        },

        /**
         * In IE only, path does not have beginning '/' char
         * This method forces the path to have the begninning '/'
         * @param  {string} str pathname
         * @return {string}
         */
        
        this.getPath = function(str) {

            if(str[0] != '/') {
                return '/'+str;
            }

            return str;

        };

        this.getProtocol = function(str) {

            tmp = str.replace(':', '');
            return tmp;

        };

        this.isHttps = function(str) {

            return (str.match('^https')) ? true : false ;

        };

        this.getParamsAsObject = function(str) {

            params = {};

            tmp = str.replace('?', '');

            if(tmp.length < 1) {

                return params;

            }

            list = tmp.split('&');

            for(i = 0; i < list.length; i++) {

                param = list[i].split('=');
                params[param[0]] = param[1];

            }

            return params;

        };

        this.removeParam = function(param) {

            delete(this.params[param]);

        }

        this.removeParams = function(paramList) {

            for(i in paramList) {
                //console.log(paramList[i]);
                delete(this.params[paramList[i]]);

            }

        };

        /**
         * Sets parameters as part of the url 
         * @param  {[type]} params [description]
         * @return {[type]}        [description]
         */
        
        this.setParams =  function(params) {

            for(key in params) {

                this.params[key] = params[key];

            }

        };

        this.getParam = function(name) {

            if(this.params[name]) {

                return this.params[name];

            }

            return null;

        };

        this.setParam = function(key, value) {

            this.params[key] = value;

        };

        this.getUrl = function() {

            // build the url

            str = this.protocol+'://'+this.hostname+this.path;
            params = [];

            for(key in this.params) {

                params.push(key+'='+this.params[key]);

            }

            paramStr = params.join('&');
            if(paramStr.length > 1) {
                paramStr = '?'+paramStr;
            }

            str += paramStr+this.hash;
            return str;

        };

        this.parse(strUrl);

    },

    /**
     * URL Encodes a string
     * @param string
     * @return string
     */

    "encode" : function (str) {

        str = (str + '').toString();
        // Tilde should be allowed unescaped in future versions of PHP (as reflected below), but if you want to reflect current
        // PHP behavior, you would need to add ".replace(/~/g, '%7E');" to the following.
        return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').
        replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
    },

    "_linkXD" : function(tag) {

        if (this._MD_PKG['MD_XDT'] === 'true')
            tag.href = this._updateQueryStringParameter(tag.href, this._MD_COOKIE_HASH_NAME, this._getCookie(this._MD_COOKIE_HASH_NAME))         
    
    },
    
    "_updateQueryStringParameter" : function(uri, key, value) {
        var re = new RegExp("([?|&])" + key + "=.*?(&|$)", "i");
        separator = uri.indexOf('?') !== -1 ? "&" : "?";
        if (uri.match(re)) {
            return uri.replace(re, '$1' + key + "=" + value + '$2');
        } else {
            return uri + separator + key + "=" + value;
        }
    },
    
    "_getQueryStringParameter" : function(param) {

        var toReturn = null;
    
        try {

            var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
                if (param == key) toReturn = value;
            });

        }

        catch(e) {

        }

        return toReturn;
    },

    /**
     * Generates a unique user id
     * @return {string} 36 character string
     */
    
    "_genUid": function() {

        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x7|0x8)).toString(16);
        });

        return uuid;

    },

    /** INTERNAL CORE: USER Variable: Browser Major */
    "_getUserBrowserMajor"	: function() {

        var ver = parseInt (navigator.appVersion,this._MD_BSR_MAJ);
        return ver;
    
    },

    /** INTERNAL CORE: USER Variable: Browser Minor */
    "_getUserBrowserMinor"	: function() {

        var app_ver = navigator.appVersion;
        var version_major = parseInt (app_ver,this._MD_BSR_MAJ);
        var pos, ver = 0;
        if ((pos = app_ver.indexOf ("MSIE")) != -1) {

            ver = parseFloat (app_ver.substring (pos+5,app_ver.length));
        
        } 

        else if (navigator.appName == "Netscape" && (version_major==3 || version_major==4)) {

            ver = parseFloat (app_ver);
        
        }
        
        return ver;
    
    },

    /** INTERNAL CORE: USER Variable: Browser Java Enabled */
    "_getUserBrowserJavaEnabled"	: function() {

        var java_enabled;
        if (navigator.appName=="Microsoft" && verMajor==4 && navigator.javaEnabled() ) { // calls function browser_name [above]
            
            java_enabled += 1;
        
        } 

        else if (navigator.javaEnabled()) {   // PRESUME N2 N3 E3
        
            java_enabled = 1;

        } 

        else {

            java_enabled = 0;
        
        }
        
        return java_enabled;

    },

    /** INTERNAL CORE: USER Variable: Browser Screen Width */
    "_getUserBrowserScreenWidth"	: function() {

        if (window.screen) {    // v4 browsers
            
            return (screen.width);

        } 

        else if (navigator.javaEnabled ()) { // Presume N2 N3 N4 E3

            var toolkit = java.awt.Toolkit.getDefaultToolkit ();
            var screen_size = toolkit.getScreenSize ();
            return (screen_size.width);

        }

        return 0;
    
    },

    /** INTERNAL CORE: USER Variable: Browser Inner Width */

    "_getUserBrowserInnerWidth"	: function() {

        if (document.all && document.body) {

            return (document.body.clientWidth);
        
        } 

        else if (document.layers) {
           
            return (window.innerWidth)
        
        } 

        else {
            
            return 0;
        
        }

    },

    /** INTERNAL CORE: USER Variable: Browser Screen Height */
    "_getUserBrowserScreenHeight"	: function() {

        if (window.screen) {    // v4 browsers
            
            return (screen.height);
        
        } 

        else if (navigator.javaEnabled ()) {    // Presume N2 N3 N4 E3
        
            var toolkit = java.awt.Toolkit.getDefaultToolkit ();
            var screen_size = toolkit.getScreenSize ();
            return (screen_size.height);

        }

        return (0);

    },

    /** INTERNAL CORE: USER Variable: Browser Screen Height */
    "_getUserBrowserInnerHeight"	: function() {

        if (document.all && document.body) {

            return (document.body.clientHeight);
        
        } 

        else if (document.layers) {

            return (window.innerHeight)
        
        } 

        else {
            
            return (0);
        
        }

    },

    /** INTERNAL CORE: USER Variable: Browser Screen Height */
    "_getUserColorDepth"	: function() {

        var color_depth;
        var bits = 0;
        if (window.screen) {

            bits = screen.colorDepth;
            // DEAL WITH BUG IN NETSCAPE 4
            bits = (( bits==14 || bits==18) && bname=="Netscape") ? bits-10 : bits;
            color_depth = bits + " bits per pixel";

        }
        
        else {
            
            color_depth = "Only available on browsers v4 or greater";
        
        }

        if (bits == 4) {
            
            color_depth += " (16 colors)";
        
        } 

        else if (bits == 8) {

            color_depth += " (256 colors)";
        
        } 

        else if (bits == 16) {

            color_depth += " (65,536 colors -- High Color)";
        
        } 

        else if (bits == 24) {

            color_depth += " (16,777,216 colors -- True Color)";
        
        } 

        else if (bits == 32) {

            color_depth += " (16,777,216 colors -- True Color [_not_ 4,294,967,296 colors!])"; 
        
        }

        return color_depth;

    },

    /** INTERNAL CORE: USER Variable: Language */
    "_getUserLanguage"	: function() {

        if ( typeof ( navigator.userLanguage ) == "string" ) {

            return ( navigator.userLanguage ); 
        
        } 

        else if ( typeof ( navigator.language ) == "string" ) {

            return ( navigator.language ); 
        
        }
        
        return ("");

    },

    /** INTERNAL CORE: USER Variable: Platform */
    "_getUserPlatform"	: function() {

        if ( typeof ( navigator.platform ) == "string" ) {

            return ( navigator.platform ); 
        
        }
        
        return ("");
    
    },

    /** INTERNAL CORE: USER Variable: Referrer */
    "_getUserReferrer"	: function() {

        if ( self == top ) {

            return document.referrer;
        
        } 

        else {

            /** 
            *   This is blocking cross-domain because of same origin policy
            *   http://en.wikipedia.org/wiki/Same_origin_policy
            *   for now catching error and returning null
            *   if we deem referrer to be important for cross domain iframes we 
            *   will need to come up with a solution possibly passing through 
            *   a query string etc...
            */
            
            try {
                
                return parent.document.referrer; 
            
            } 

            catch (err) {

                return '';
            
            }
        }
    },

    /** INTERNAL CORE: USER Variable: Document URL */
    "_getUserDocUrl"	: function() {

        return (( document.URL ));
    
    },

    /** INTERNAL CORE: USER Variable: Document Last Modified */
    "_getUserDocLastModified"	: function() {

        return ( document.lastModified );
    
    },

    /** INTERNAL CORE: USER Variable: Operating System */
    "_getUserOperatingSystem"	: function() {

        var operating_system;
        if ( navigator.userAgent.indexOf ("Unix") != -1) {

            operating_system = "Unix";
        
        } 

        else if (navigator.userAgent.indexOf ("Linux") != -1) {

            operating_system = "Linux";   
        
        } 

        else if (navigator.userAgent.indexOf ("NT") != -1) {

            operating_system = "Windows NT";
        
        } 

        else if (navigator.userAgent.indexOf ("95") != -1) {

            operating_system = "Windows 95";
        
        } 

        else if (navigator.userAgent.indexOf ("16") != -1) {

            operating_system = "Windows v3.1x";
        
        } 

        else if (navigator.userAgent.indexOf ("Win") != -1) {

            operating_system = "Windows v3.1 or NT";
        
        } 

        else if (navigator.userAgent.indexOf ("PPC") != -1) {

            operating_system = "Macintosh Power PC";
        
        } 

        else if (navigator.userAgent.indexOf ("Mac") != -1) {

            operating_system = "Macintosh";
        
        } 

        else {
            
            operating_system = "Not Detected";
        
        }
        
        return ( operating_system );
    
    },

    /** INTERNAL CORE: USER Variable: Timezone */
    "_getUserTimeZone"	: function() {

        var rightNow = new Date();
        var d1 = new Date(rightNow.getFullYear(), 0, 1, 0, 0, 0, 0);
        var temp = d1.toGMTString();
        var d2 = new Date(temp.substring(0, temp.lastIndexOf(" ")-1));
        var std_time_offset = (d1 - d2) / (1000 * 60 * 60);

        var d3 = new Date(rightNow.getFullYear(), 6, 1, 0, 0, 0, 0);
        temp = d3.toGMTString();
        var d4 = new Date(temp.substring(0, temp.lastIndexOf(" ")-1));
        var daylight_time_offset = (d3 - d4) / (1000 * 60 * 60);
        var dst;
        if (std_time_offset == daylight_time_offset) {
            dst = "0"; // daylight savings time is NOT observed
        } else {
            dst = "1"; // daylight savings time is observed
        }
        return ( daylight_time_offset + "," + dst );
    
    },
    
    /** INTERNAL CORE: Strips subdomain from URL */
    "_getDomain"        : function(url) {

        // 1. remove http[s] and www from url
        tmp = url.replace(/http[s]?:\/\/(?:www\.)?/, '');
        
        // 2. Split on '/', the first element contains the domain with sub domains
        return tmp.split('/')[0];

    },

    /** INTERNAL CORE: DOM: Set HTML of element(s) */
    "_xHtml"	: function(e,h) {

        var objs = this._Obj(e);
        
        if(objs.length) {

            for(var i in objs) {

                objs[i].innerHTML = h; // needs to be cross browser compat
            
            }

        } 

        else {
            
            objs.innerHTML = h; // needs to be cross browser compat
        
        }

    },

    /** INTERNAL CORE: DOM: Element test for string based element */
    "_xStr"	: function(s) {

        for(var i=0; i<arguments.length; ++i){if(typeof(arguments[i])!='string') return false;}
        return true;
    
    },

    /** INTERNAL CORE: DOM: Fetch object or Class By Selector */
    "_Obj"	: function(selector, node) {

        node = node ? node : document;
        var objs = new Array();

        // ID selector
        if(selector.indexOf('#') != -1) {

            selector = selector.replace(/^#/, '');

            var object = null;
            if (node.layers) {
                object = node.layers[selector];
            } 

            else if (node.all) {
                object = node.all[selector];
            } 

            else if (node.getElementById) {
                object = node.getElementById(selector);
            }

            objs = object;
            // Class selector
        } 

        else if(selector.indexOf('.') != -1) {

            selector = selector.replace(/^\./, '');

            if (node.getElementsByClassName) { // use native implementation if available
             
                objs = node.getElementsByClassName(selector);
            
            } 

            else {
             
                objs = (function getElementsByClass(searchClass,node) {

                    var classElements = [],
                    els = node.getElementsByTagName("*"),
                    elsLen = els.length,
                    pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)"), i, j;

                    for (i = 0, j = 0; i < elsLen; i++) {
                        if ( pattern.test(els[i].className) ) {
                            classElements[j] = els[i];
                            j++;
                        }
                    }
                    return classElements;
                })(selector, node);
            }

        }

        return objs;
    }
}