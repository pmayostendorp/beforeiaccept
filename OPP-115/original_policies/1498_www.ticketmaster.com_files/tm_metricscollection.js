// Documentation: confluence => ECOM => Metrics+Front+End
;(function($, w, document, undefined){



//exit out if already exists
if ( TM.MetricsCollection && TM.MetricsCollection.version ){
    return;
}
  
  TM.MetricsCollection.version = '1.1';

  TM.MetricsCollection.globalConfig = {

        TRACKEDTYPES : {
          'web.captcha.cs_display.timer.millis': ['captcha_type', 'fallback_count'],
          'web.captcha.cs_display_error.counter': ['captcha_type'],
          'web.page.cs_function_execution.timer.millis': [ 'function'],
          'web.page.cs_load.timer.millis': [ 'completed' ],
          'web.page.cs_iload.timer.millis': [],
          'web.page.cs_script_errors.counter': [ 'error_message' ],
          'web.page.cs_resource_load.timer.millis': [ 'web_resource' ],
          'web.page.cs_ext_resource_load.counter': [ 'web_resource' ],
          'web.page.cs_resource_timeout.counter': [ 'web_resource' ],
          'web.page.cs_resource_notfound.counter':[ 'web_resource' ],
          'web.page.cs_resource_abort.counter':[ 'web_resource' ],
          'web.page.cs_resource_request.counter':[ 'web_resource' ],
          'web.page.cs_xhr_errors.counter':[ 'error_type' ],
          'web.page.cs_xhr_response.timer.millis': ['web_resource', 'response_status', 'cached'],
          'web.widget.cs_method_execution.counter': [ 'function', 'venue_size', 'resale_inventory_size' ],
          'web.widget.cs_method_execution.timer.millis': [ 'function', 'venue_size', 'resale_inventory_size' ],
          'web.widget.cs_error.counter':[ 'error_type' ]
        },
        TRACKEDTYPES_REQ: {'web.page.cs_load.timer.millis':1},
        QUE: {
          size: 5,
          ready: []
        },
        ERRORLOG : {
          log : true,
          increment: false,
          data: {},
          fileonly: true
        },
        APP: {
           kill: false,
           percent: 0,
           require:{
             browser_info: 0,
             timestamp: 0,
             completed: 0
           },
           common: [ 'name', 'page', 'browser_info', 'timestamp', 'type', 'value', 'origin' ]
        },
        MODULES: {
          requirepreload: ['storedata'],
          require: ['jserror','clientenvironment'],
          loaded: {}
        },
        blacklist:[
             'html.ng/site', 
             'as4x',
             'dartiframe',
             '.html'
        ],
        deferreds:{
            pageleave: $.Deferred()
        },
        fallbacktimingattr:{
            resourceData: 'TM.Tracking.satellite.data.pageLevelData',
            legacyload: 'docloaded_nonperf',
            pageload: 'web.page.cs_load.timer.millis',
            method: 'web.method.execution.timer.millis'
        },
        groupedData: {},
        totalMetricRequests: 0,
        disabledMetrics: {},
        allowedMetricRequests: 20,
        timings: {},
        performance: w.performance || w.mozPerformance || w.msPerformance || w.webkitPerformance || {},
        now: undefined,
        events: ['unload','beforeunload'],
        usemilliseconds: false

  };

  TM.MetricsCollection.timings = function(){

      //dependencies
      var opt =  TM.MetricsCollection.globalConfig;
      var isILoadMarked = false;

      var utils = {
          getTimeUTC: function(){
              return Math.floor( ( new Date() ).getTime() / 1000 );
          },

          getBrowserInfo: function(){
              if ( opt.browserenv && opt.browserenv.pversion ){
                  var binfo = opt.browserenv;
                  return binfo.bname + " " + binfo.pversion + " " + binfo.os;
              } else {
                  return navigator.userAgent;
              }
          },

          useSeconds: function(val){
              if ( opt.usemilliseconds || opt.hasPerformanceNow ) return val;
                  return ( val / 1000 ).toFixed(5);
          },

          timeLapse: function(){
              return ('start_time' in this && 'end_time' in this) ? Math.round( this.end_time - this.start_time  )  : 0;
          },

          addListener: function( elem, type, callback ) {
             if ( elem.addEventListener ) {
                 elem.addEventListener( type, callback, false );
             } else {
                 elem.attachEvent( 'on' + type, callback );
             }
          },

          filterEvents: function() {
              var events = opt.events;
              var beforeunload = opt.events.indexOf("beforeunload");
              
              if(/Firefox[\/\s](\d+)/.test(navigator.userAgent) && beforeunload != -1) {
                  events.splice(beforeunload, 1);
              }
              return events;
          },

          isObjectAvailable: function(data){
              if ( !data ) return false;

              var win = w, objArgs = data.split(/[|.]/);
              var conf = { 'opt': opt };

              return  ( jQuery.map( objArgs, function( k,i ){
                             win = ( win[ k ] || conf[ k ] ) ? ( win[ k ] || conf[ k ] ) : false;
                             return ( !win && typeof win !== 'object' ) ? false : true;
                       }).pop() === true ) ? win : false;
          },

          getDataPoint: function( data ){
              if ( data && !data.name || !data ) return null;

              var valGroup = [],
                 requestArray = data.name.split(/[|.]/),
                 objref = ( data.objref ) ? data.objref : opt.fallbacktimingattr.resourceData;

                 //cache obj ref per unique obj request
                 opt.groupedData[ objref ] = opt.groupedData[ objref ] || utils.isObjectAvailable( objref );

                 if ( $.isPlainObject( opt.groupedData[ objref ] ) ) {
                     valGroup = ( function() {
                         return $.map( requestArray, function( k,i ){
                             if ( k in opt.groupedData[ objref ] ){
                                 return opt.groupedData[ objref ][ k ];
                             }
                         });
                     }() ).pop();

                     return valGroup ? valGroup : function(){
                         return null;
                     }();
                 }
          },
          getPerformanceEntry: function(resourceName) {
              if (!opt.performance || typeof opt.performance.getEntries !== "function")
              return false;
              
              var allEntries = opt.performance.getEntries() || [];
              var entry = (allEntries.length)? 0 : false;
              $.each(allEntries, function(i, r) {
                  if(typeof r !== "undefined" && r !== null && r.name && (r.name).match(resourceName)) {
                          var loadtime = r.duration || 0;
                          var dns  = (r.requestStart)? r.domainLookupEnd - r.domainLookupStart : 0;
                          var tcp  = (r.requestStart)? r.connectEnd - r.connectStart : 0;
                          var ttfb = (r.requestStart)? r.responseStart - r.startTime : 0;
                          var ssl  = (r.secureConnectionStart)? r.connectEnd - r.secureConnectionStart : 0;
                             entry = Math.floor(loadtime + dns + tcp + ttfb + ssl) || 0;
                          return entry;
                   }
              });
              
              return entry;
          },
          isDisabled: function(data) {

              var status = false;
              var metric = data || {};
              if (!metric.type) return status;
              
              metric.browser_info = opt.APP.require.browser_info;
              metric.page = opt.APP.require.page;

              var checkRule = function(mdata, suppression) {
                 if (typeof suppression !== "undefined" && suppression !== null) {
                     var totalKeys = 0;
                     var matchedKeys = 0;

                     $.each(suppression, function(index, value) {
                         if (mdata.hasOwnProperty(index) && mdata[index] == value) {
                             matchedKeys++;
                         }
                         totalKeys++;
                      });
                     
                      return (totalKeys > 0 && totalKeys == matchedKeys) ? true : false;
                  } else {
                      return false;
                  }
             };

             var disabledMetrics = (opt.disabledMetrics !== undefined && opt.disabledMetrics !== null)? opt.disabledMetrics : {};
             var suppressionRules = disabledMetrics[metric.type];

             if (typeof suppressionRules !== "undefined" && suppressionRules !== null && suppressionRules.length) {

                 $.each(suppressionRules, function(index, suppression) {
                     if(checkRule(metric, suppression)) {
                        status = true;
                        return false;
                     }
                 });
              }
              return status;
           }
      };


      var actions = {

          extendTrackTypeAttributes: function( cobj ){

              if( !cobj ) return;
              $.extend(true, opt, cobj);
          },

          initializeMetrics: function(data){
           
              actions.extendTrackTypeAttributes(data);
              //pre load required modules
              actions.requiredModules( {
                  moduleType: 'requirepreload'
              } );


              if ( actions.shutOffMetrics( data ) ){
                  opt.APP.kill = true;
                  actions.facade = $.noop; 
                  return;
               }

              //load required modules
              actions.requiredModules();

              //assign global required values
              actions.assignGlobalAppVars();

              //backup if !performance
              actions.startTimer( 
                      { name: opt.fallbacktimingattr.legacyload, mod: -20000 } 
              );

              actions.listenerActions.call(utils.addListener);

              $( window ).load( function(){
                  setTimeout(
                      function(){
                          $.when(
                              (function(){
                                  opt.APP.require.completed = 1; //!worry about activeState
                                  actions.getTimingAttributes( {'value':'loadEventEnd'} );
                              }())
                          ).then(
                              actions.forceQuePush() 
                          );
                      }, 0 );
              });
          },

          requiredModules: function( data ){
              var d = data || {};
              var moduleType = d.moduleType || "require";
              if ( opt.MODULES[moduleType].length ){
                  $.each(opt.MODULES[moduleType], function( i,v ){
                      if ( TM.MetricsCollection.hasOwnProperty( v ) && !opt.MODULES.loaded.hasOwnProperty( v )){
                          TM.MetricsCollection[ v ]();
                          opt.MODULES.loaded[ v ] = true;
                      }
                  });
              } 
          },

          assignGlobalAppVars: function(){
              var pageNames = function(){
                  var avenues = [ {'name':'pageType'},{'name':'pageDetail'},{'name':'channel'}],
                      i = 0,
                      haspagename,
                      l = avenues.length;

                      for( ; i < l ; i++ ){
                          haspagename = utils.getDataPoint( avenues[ i ] );
                          if ( haspagename ){
                             return haspagename;
                          }
                       }
                       return 'pageundefined';
              }();

                  $.each( opt.TRACKEDTYPES, function(){ $.merge( this, opt.APP.common ) });
                  opt.APP.require.timestamp = utils.getTimeUTC();
                  opt.APP.require.browser_info = utils.getBrowserInfo();
                  opt.APP.require.page = ( opt.APP.require.page && opt.APP.require.page.length > 0 ) ? 
                                           opt.APP.require.page : pageNames;
          },
   
          shutOffMetrics: function( d ){
              if ( actions.failsPercentageThreshold() || 
                             actions.isBlacklisted() ||
                                    opt.percent <= 0 || 
                                                  !d ||
                                      opt.APP.kill ) return true;                      
          },


          isBlacklisted: function(){
              var url = location.href.toLowerCase(),
                  i = 0,
                  b = opt.blacklist.length;
           
              for ( ; i < b; i++ ){
                  if ( url.indexOf( opt.blacklist[i] ) != -1 ){
                      return true;
                  }
              }
          },

          failsPercentageThreshold: function(){
              // will update this to reflect a better representation. quick dirty 
              return Math.ceil( Math.random()*100 ) > opt.APP.percent ? true : false;
          },

          listenerActions: function(){
              var t = this;
              opt.events = utils.filterEvents();
              $.each(opt.events, function( i,v ){
                  t( w, v, actions.cleanUp );
              });
          },

          getTimeNow: function(){
              return opt.now ? opt.now() : ( function(){
                  var a = jQuery.map(['now','webkitNow','msNow','oNow','mozNow'],function(v){
                          if ( opt.performance[ v ] ){
                              opt.hasPerformanceNow = true;
                              return v;
                          }
                      }).join('');
                      opt.now =  function() { return (a !== '') ? opt.performance[a]() : (+new Date()) * 1000; };
                      return opt.now();
                  }());
          },

          markiLoad: function() {
            var op = opt.performance && opt.performance.timing || {};

            if (!isILoadMarked) {
              actions.getTimingAttributes({
                type  : 'web.page.cs_iload.timer.millis',
                start : 'navigationStart',
                end   : Date.now()
              });
              isILoadMarked = true;
            }
          },

          // set start: mtype is usually the method_time here. That will be the fallback
          startTimer: function( data ){
              var d = data || {};

              if ( d.name ) {
                   d.mtype = ( d.mtype ) ? d.mtype : opt.fallbacktimingattr.method;
                   if (d.name in opt.timings) {
                     actions.logAppErrors({'error_message' : 'startTimer: queing is backed up ('+d.name+')'});
                     delete opt.timings[d.name];
                   }
                   actions.setPassedTimingGroup( d );
              }
          },

          setPassedTimingGroup: function( data ){
              var d = data || {};

              d.mod = function(){
                  return isNaN( d.mod ) ? 0  : +d.mod;
              }();

              $.extend( opt.timings[ d.name ] = {
                  'name' : d.name,
                  'function' : d.name || "",
                  'type' : d.mtype,
                  'start_time' : utils.useSeconds( actions.getTimeNow() + d.mod ),
                  'value' : d.value || 1
              }, d );   
          },

          startCounterMetrics: function( data ){
              var d = data || {};

              if( !d.mtype ) return;

              d.name = d.name || d.mtype + ( d.web_resource || '' );
              if( !actions.counterInTimings( d ) ){
                  actions.setPassedTimingGroup( d );
                  actions.cleanMetricsData( opt.timings[ d.name ], d.force );
                  actions.delegateEvent( d );
              }
          },
          startExternalResourceMetrics: function( data ){
              var d = data || {};
              if( !d.mtype || !d.name || !d.web_resource) return;

              d.value = utils.getPerformanceEntry(d.name);
              if(d.page_load && !opt.APP.require.completed) {
                  d.web_resource = d.web_resource + d.page_load;
              }
              
              if(d.value === false)
                  return;
                  
              if( !actions.counterInTimings( d ) ){
                  actions.setPassedTimingGroup( d );
                  actions.cleanMetricsData( opt.timings[ d.name ], d.force );
                  actions.delegateEvent( d );
              }
          },
          delegateEvent: function( data ){
              var d = data || {}

              if( !d.events ) return;
              var isNotBound = function isNotBound( elem, s ){
                  try{
                       var boundEvents = $('body').data('events')[ s ] || [];
                       if( boundEvents.length ){
                           var i = 0, l = boundEvents.length;
                           for(; i < l; i++ ){
                               if( boundEvents[ elem ].selector == s ){
                                   return false;
                               }
                           }
                       }
                       return true;
                     } catch( e ){ }
              };
              opt.eventBindings = opt.eventBindings || {};
              $.each( d.events, function( k,o ){
                  //[ 'event | identifier | method' ]
                  var conf = {};
                  conf.splitAttr = o.split( /[\s|]+/ );
                  conf.bindAtrr = {
                          'event': conf.splitAttr[0],
                          'identifier': conf.splitAttr[1],
                          'method':conf.splitAttr[2]
                  };
                  conf.concatNS = o.replace(/(\W)+/g,'');
                  conf.nameSpace = ( '._metrics_' + conf.concatNS  );
                  conf.selector = conf.bindAtrr.event + conf.nameSpace;

                  if( actions.hasOwnProperty( conf.bindAtrr.method ) && !( conf.selector in opt.eventBindings ) && isNotBound( conf.bindAtrr.identifier, conf.selector ) ){
                       ( function eBind( ns ){
                           opt.eventBindings[ conf.selector ] = 1;
                           $('body').delegate( conf.bindAtrr.identifier, conf.selector, function(){
                               $('body').undelegate( ns );
                               delete opt.eventBindings[ conf.selector ];
                               actions[ conf.bindAtrr.method ]();
                           })
                       }( conf.nameSpace ) );
                  }
              })
          },

          counterInTimings: function( data ){
              var d = data || {};
              var hasCounter = false;
               
              //find uniqueness as diff countertypes can exist
              $.each( opt.QUE.ready, function( i, v ){
                  if( d.name == v.name  ){
                          v.value = v.value + ( d.value || 1 );
                          hasCounter = true;
                          // still need to deal with force integrity
                          if ( d.force ) actions.forceQuePush();

                          return false;  
                  }
              })
              return hasCounter;
          },

          // set end: mtype is usually the method_time here. That will be the fallback. 
          // If passed in startTimer, not needed here
          endTimer: function( data ){
              var d = data || {}, force;
              if ( d.name && opt.timings[d.name] ) {
                  var currentTimer = opt.timings[d.name];
                  $.extend( currentTimer, data );

                  if ( d.mtype ) currentTimer.type = d.mtype;

                  currentTimer.end_time = utils.useSeconds( actions.getTimeNow() );
                  currentTimer.value = utils.timeLapse.call( currentTimer );
                  force = d.force ? true : false;
                  actions.cleanMetricsData( currentTimer, force );
              }
          },

          // scrap data, filter out non-required. only push thru those with full breadth 
          // of required => TRACKEDTYPES
          cleanMetricsData: function( data, force ){
              if (!data || !opt.TRACKEDTYPES[ data.type ]) return;
              if (utils.isDisabled(data)) return;
           
              // ~1 per 500 tracked page_load have 0 start. still unsure of manifestation, perhaps bots.
              // Need to clear out this timing because delta is askew and mimics timestamp
              if ( data.name === opt.fallbacktimingattr.pageload && ('' + data.value ).length >= 8 ) {
                  delete opt.timings[data.name];
                  return;
              }
           
              $.extend(data, opt.APP.require);

              var d = {};
              $.each(opt.TRACKEDTYPES[ data.type ], function(i, k){
                  if ( !data.hasOwnProperty(k) ){ 
                      data.abort = true;
                      return;
                   }
                   d[k] = data[k];
              });

              if ( !data.abort ) { 
                  actions.queStorage(d);
                  if(force) actions.forceQuePush();
              }

              if ( opt.timings[data.name] ) delete opt.timings[data.name];
          },

          queStorage: function(data){
              if ( data ) opt.QUE.ready.push( data );
                  while( opt.QUE.ready.length >= opt.QUE.size ) {
                      actions.sendMetrics( opt.QUE.ready.splice( 0, opt.QUE.size ) );
                  }
          },

          forceQuePush: function(){
              if ( opt.QUE.ready.length && !opt.APP.limitexceeded ) {
                     $.when( actions.queStorage() ).then( 
                         actions.sendMetrics() 
                     ).done( function( res ){
                         opt.QUE.ready = [];
                     });
              }
          },

          getTimingAttributes: function( timeA, extendedOpts ) {
              var timeAttr = timeA || {};

              if( !opt.performance || !opt.performance.timing || !timeAttr ){
                  actions.endTimer( { 'name':opt.fallbacktimingattr.legacyload, 'mtype':opt.fallbacktimingattr.pageload } );
                  return;
              }
              var perfTiming = opt.performance.timing, 
                  type = timeAttr.type || opt.fallbacktimingattr.pageload;

              if (!perfTiming[ timeAttr.value ] && !timeAttr.end) return;

              var currentTiming = opt.timings[type] = {};
              currentTiming.start_time = timeAttr.start ? perfTiming[ timeAttr.start ] : perfTiming['navigationStart'];
              currentTiming.end_time = perfTiming[ timeAttr.value ] || timeAttr.end;
              currentTiming.value = utils.timeLapse.call( {'start_time':currentTiming.start_time, 'end_time': currentTiming.end_time } );
              currentTiming.type = type;
              currentTiming.name = type;

              $.extend(currentTiming, extendedOpts);

              actions.cleanMetricsData( currentTiming );
          },

          // TODO: collect offending perf resource
          cleanUp: function(){
              opt.APP.limitexceeded = false;
              opt.deferreds.pageleave.resolve();
              actions.forceQuePush();
          },

          logAppErrors: function(data){
              if( !opt.ERRORLOG.log || !data || opt.APP.kill ) return;
          
                  var forceQue = ( data.errortype && data.errortype === 'js' ) ? true : false,
                      em;

                  if( data.error_message ){
                      em = data.error_message;

                      if( opt.ERRORLOG.data && opt.ERRORLOG.data[ em ] && !opt.ERRORLOG.increment ) return;

                      if( typeof opt.ERRORLOG.data[ em ] === 'undefined' ) {
                          opt.ERRORLOG.data[ em ] = {
                                     'name'  : 'js',
                                     'value' : 0,
                                      'type' : 'web.page.cs_script_errors.counter',
                             'error_message' : em
                          };
                      }
                    
                      opt.ERRORLOG.data[ em ].value++;
                      actions.cleanMetricsData( opt.ERRORLOG.data[ em ], forceQue );
                  }

          },

          // provide an interface to outside
          // method name @string must be first
          facade: function(){
              var args = [].slice.call( arguments ),
                  fn = args.splice(0,1).join('');

                  if( typeof fn === 'string' ) {
                      if( actions.hasOwnProperty( fn ) ){
                          actions[ fn ].apply(this, args);
                      }
                  }
          },

          updateAjaxCount: function(){
              opt.totalMetricRequests++;
              if( opt.totalMetricRequests >= opt.allowedMetricRequests ){
                  opt.APP.limitexceeded = true;
              }
          },

          sendMetrics: function( d ){
              if ( opt.APP.kill || opt.APP.limitexceeded || !opt.url ) return;
              var data = d || opt.QUE.ready || {};
              var url = opt.url ? opt.url + '/metrics' : '';

              if( !data ) return;

                  $.ajax({
                      type: 'POST',
                      data: { metrics: Object.toJSON(data) },
                      url: url,
                      dataType: 'json',
                      timeout: 3000
                  }).error( function(){
                                opt.deferreds.pageleave.resolve();
                            } )
                    .always( function(){
                                actions.updateAjaxCount(); 
                            }
                    ); 

          }

    };

        return {
            initializeMetrics: actions.initializeMetrics,
            facade: actions.facade
        };

  }();


  // JS-ERROR Capturing
  TM.MetricsCollection.jserror = function(){

        return function( d ){
            var prev_onerror = window.onerror,
                jserrorconcat,
                errorVals = {},
                dataObj = {},
                fileregex = /([\w-.]+\.js)/;

            //dependencies
            var metric = d.metric || {};
            var opt = d.opt || {};

                window.onerror = function(errormsg, file, linenum, colnum, stackerr) {

                    try {
                           errorVals = {
                               msg: errormsg,
                               file: file,
                               line: linenum,
                               colno: colnum,
                               stack: ( stackerr && stackerr.stack ) ? stackerr.stack : ''
                        };
                           // for now - no special groupings. concat and log
                           jserrorconcat = jQuery.map(errorVals, function(v,k){
                                               if( v ) return v;
                                           }).join(':');

                           if ( opt.ERRORLOG.fileonly ){
                               jserrorconcat = fileregex.test( file ) ? file.match( fileregex )[ 0 ] : "INLINE";
                           }

                           dataObj = {
                               'error_message': jserrorconcat,
                               'type': 'frontend_error_count',
                               'errortype': 'js'
                           };

                           if( jserrorconcat ){
                               metric.facade( 'logAppErrors', dataObj );
                           }

                    } catch(e) {
                      // deal with error loop inside onerror
                    }

                    if (typeof prev_onerror === 'function') {
                        prev_onerror.apply(this, arguments);
                    }
                };
        }( {
             'metric': TM.MetricsCollection.timings,
             'opt': TM.MetricsCollection.globalConfig
           }
         );
  };


  // STORAGE
  // allow two options: Storage or cookie
  TM.MetricsCollection.storedata = function(){
      return function( d ){
          var JSON = {
              'parse':
                  window.JSON && (window.JSON.parse || window.JSON.decode) ||
                  String.prototype.evalJSON && function( str ){ return String( str ).evalJSON(); } ||
                  $.parseJSON ||
                  $.evalJSON,
              'stringify':
                  Object.toJSON ||
                  window.JSON && (window.JSON.stringify || window.JSON.encode) ||
                  $.toJSON
          };

          if( !('parse' in JSON) || !('stringify' in JSON) ){
              return;
          }
          //dependencies
          var metric = d.metric || {};
          var opt = d.opt || {};

          var config = {
              storageType: 'sessionStorage',
              storageAvailable: false,
              metricsBucket: {},
              metricTimings: {},
              storageName: 'metricscollection',
              mapMethods: { 'set':'setItem', 'get':'getItem', 'remove':'removeItem' }
          };

          var cookiesAvailable = function() {
              return ( typeof window !== undefined &&
                    window.document !== undefined &&
                    window.document.cookie !== undefined );
          };

          var storageAvailable = function() {
            /* Check if browser supports $config.storageType */
              if ( config.storageType in window ){
                  try {
                      window[ config.storageType ].setItem( 'mctemp', 'yes' );
                      window[ config.storageType ].removeItem( 'mctemp' );
                      config.storageAvailable = config.storageType;
                  } 
                  catch(err) {
                    // Exception iOS5 private mode.
                  }
              }

              if ( config.storageAvailable ){
                  try {
                      if ( window[config.storageType] ) {
                          config.metricsBucket = window[ config.storageType ];
                      }
                  } 
                  catch(err) {
                      /* some browsers throw error when touching localStorage & cookies are disabled */
                  }
              } else if ( cookiesAvailable() ){
                  config.metricsBucket = new CookieTree( '_E' );
                  config.storageAvailable = 'cookie';
                  $.each( config.mapMethods, 
                      function( k, v){ 
                          config.mapMethods[ k ] = k; 
                      }
                  );
              } else {
                  config.storageAvailable = false;
              }
          };

          var handleData = function( data ){
              var flush = data || false;
              var timings = ( opt.QUE.ready.length > 0 ) ? JSON.stringify( opt.QUE.ready ) : false;
                  if ( config.storageAvailable ) {
                      if ( config.metricsBucket[ config.mapMethods.get ]( config.storageName ) ){
                                 config.savedData = JSON.parse( config.metricsBucket[ config.mapMethods.get ]( config.storageName ) );
                                 config.metricsBucket[ config.mapMethods.remove ]( config.storageName );
                                 metric.facade( 'sendMetrics', config.savedData );
                      } else if ( flush === 'flush' ){
                          config.metricsBucket[ config.mapMethods.remove ]( config.storageName );
                      } else if ( timings ){
                          config.metricsBucket[ config.mapMethods.set ]( config.storageName, timings );
                      }
                  } 
                    
          };
         
          function initialize(){
              storageAvailable();
              handleData();
              opt.deferreds.pageleave.done( function( r ){
                  handleData( r );
                  opt.deferreds.pageleave = $.Deferred();
              });
          }
          initialize();        
      }( {
           'metric': TM.MetricsCollection.timings,
            'opt': TM.MetricsCollection.globalConfig
         }
       );
  };

  // OS BROWSER VERSION
  TM.MetricsCollection.clientenvironment = function(){
 
      return function(){
          var agent = window.navigator.userAgent.toLowerCase();
          var browserType = /(opr)[\/]([\w.]+)/.exec( agent ) ||
                            /(chrome)[ \/]([\w.]+)/.exec( agent ) ||
                            /(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec( agent ) ||
                            /(webkit)[ \/]([\w.]+)/.exec( agent ) ||
                            /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( agent ) ||
                            /(msie) ([\w.]+)/.exec( agent ) ||
                            agent.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec( agent ) ||
                            agent.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( agent ) || [];

           var os = [ 'ipad', 'iphone', 'android', 'windows phone', 'win', 'mac', 'linux', 'cros' ];
           var osMatch = jQuery.map(os, function( v ){
               return new RegExp( v ).exec( agent );
           });

           var browserenv = {
                            'bname': browserType[ 3 ] || browserType[ 1 ] || 'name',
                            'fversion': browserType[ 2 ] || 0,
                            'os': osMatch[ 0 ] || 'os'
                         };
               browserenv.pversion = parseInt( browserenv.fversion );
               browserenv[ browserenv.name ] = true;
               browserenv[ browserenv.os ] = true;

           // overrides
           switch( true ){
              case browserenv.rv:
                   browserenv.name = 'msie';
                   break;

              case browserenv.opr:
                   browserenv.name = 'opera';
                   break;

              case browserenv.safari && browserenv.android:
                   browserenv.name = 'android';
                   break;
           }

           $.extend( true, TM.MetricsCollection.globalConfig, { 'browserenv': browserenv } );
      };

  }();
  
})(jQuery, window, document);
