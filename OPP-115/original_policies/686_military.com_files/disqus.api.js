console = window.console || {};
console.log = window.console.log || function() {};
console.warn = window.console.warn || function() {};

var DISQUS_ABLE_ASSETS = ["maEvergreen", "maNews", "maBlogPost", "maDiscount", "maAdvertorial","maEquipment"];

$(document).ready(function(){
	if(typeof($.mobile) !== "object") {
		var assettype = $('.assetbio').attr("data-assettype");
	    // Now we are just testing for 3 asset types.
	    // In future we make open it up to make a switch on individual pages.
	    if ($.inArray( assettype, DISQUS_ABLE_ASSETS ) >= 0) {
	        $(document).militaryDisqus({preventDoubleLoading : true});
	    }
	}
});

$("div[data-role='page']").live('pageshow',function(event){
	if(typeof($.mobile) === "object") {
		var activePage = $(this);
		var assettype = activePage.find(".disqus-data-assettype").attr("disqus-data-assettype");
		if ($.inArray( assettype, DISQUS_ABLE_ASSETS ) >= 0) {
			$(document).militaryDisqus({});
		}else{
			$( "#disqus_thread" ).remove();
		}
	}
});


(function( $ ){
	
	var debugMode = false;
	
	var firstLoad = true;
	var lastThread = null;
	var pageHideBound = true;
	
	var FATWIRE_BASE_URL = document.location.protocol + "//images.military.com";
	
	var DISQUS_SHORT_NAME = "militarycom"; /* DO NOT EDIT! */
	
	var DISQUS_METADATA_SELECTOR = "#disqus-comment-metdata";
	var COUNT_URL = "/disqus-api/thread/details.api";
	var DISQUS_DEFAULT_URL = "/disqus-api/sso.api";
	var LOGOUT_BASE_URL = "/Logout?strRedirectURL=";
	/*var LOGIN_URL = document.location.protocol + "//www.military.com/cs/Satellite?pagename=Military.com/Page/ma/Layout/Chromeless/Registration&c=Page&cid=7000024545118&regtype=popup&refreshParentAfterSuccess=false";*/
	var LOGIN_URL = document.location.protocol + "//" + document.domain + "/cs/Satellite?pagename=Military.com/Page/ma/Layout/Chromeless/Registration";
	
	var BTN = {
		url : FATWIRE_BASE_URL + "/script/widget/disqus/img/disqus-sso-login-button.png",
		icon : FATWIRE_BASE_URL + "/script/widget/disqus/img/disqus-sso-login-button.png",
		resize : true,
		width : 320,
		height : 500
	};
	
	var internalDisqusConfig = {};
	
	var privateMethods = {
		isDebugEnabled : function() {
			var enabled = debugMode;
			if(!enabled) {
				try {
					enabled = (sessionStorage.getItem("disqusDebug") === "true");
				} catch(e) {
					
				}
			}
			return enabled;
		},
		log : function() {
			if(privateMethods.isDebugEnabled()) {
				try {
					var args = Array.prototype.slice.call(arguments);
					console.log.apply(console, args);
				} catch(e) {
					console.log("Can't log", e);
				}
			}
		},
		isNOR : function(arg) {
			return (arg == null || arg == undefined);
		},
		setDefaultSettings : function() {
			var $this = this;
			var settings = $this.data("settings");
			
			if(privateMethods.isNOR(settings.debug)) {
    			settings.debug = false;
    		}
    		
    		if(privateMethods.isNOR(settings.apiURL)) {
    			settings.apiURL = DISQUS_DEFAULT_URL;
    		}
    		
    		settings.countURL = COUNT_URL;
    		
    		var logoutURL = LOGOUT_BASE_URL + window.location.href;
    		settings.ssoBtn.logout = logoutURL;
    		
    		settings.commentMetadataIdentifier = $(DISQUS_METADATA_SELECTOR);
    		
    		settings.ssoBtn.url = LOGIN_URL;
    		
    		if(privateMethods.isNOR(settings.ssoBtn.button)) {
    			settings.ssoBtn.button = BTN.url;
    		}
    		
    		if(privateMethods.isNOR(settings.ssoBtn.icon)) {
    			settings.ssoBtn.icon = BTN.icon;
    		}
    		
    		if(privateMethods.isNOR(settings.ssoBtn.resize)) {
    			settings.ssoBtn.resize = BTN.resize;
    		}
    		
    		if(privateMethods.isNOR(settings.ssoBtn.width)) {
    			settings.ssoBtn.width = BTN.width;
    		}
    		
    		if(privateMethods.isNOR(settings.ssoBtn.height)) {
    			settings.ssoBtn.height = BTN.height;
    		}
    		
    		if(privateMethods.isNOR(settings.ssoBtn.name)) {
    			settings.ssoBtn.name = DISQUS_SHORT_NAME;
    		}
    		
    		if(privateMethods.isNOR(settings.disqusShortName)) {
    			settings.disqusShortName = DISQUS_SHORT_NAME;
    		}
    		
    		if(privateMethods.isNOR(settings.disqusTitle)) {
    			settings.disqusTitle = document.title;
    		}
    		
    		if(privateMethods.isNOR(settings.disqusIdentifier)) {
    			settings.disqusIdentifier = document.location.pathname;	
    		}
		},
		validateOptions : function(settings) {
			/*
			if(privateMethods.isNOR(settings.apiURL)) {
				privateMethods.throwRequiredErorr("apiURL");
    		}
    		
    		if(privateMethods.isNOR(settings.ssoBtn)) {
    			privateMethods.throwRequiredErorr("ssoBtn");
    		}
    		
    		if(privateMethods.isNOR(settings.ssoBtn.name)) {
    			privateMethods.throwRequiredErorr("ssoBtn.name");
    		}
    		
    		if(privateMethods.isNOR(settings.ssoBtn.button)) {
    			privateMethods.throwRequiredErorr("ssoBtn.button");
    		}
    		
    		if(privateMethods.isNOR(settings.ssoBtn.icon)) {
    			privateMethods.throwRequiredErorr("ssoBtn.icon");
    		}

    		if(privateMethods.isNOR(settings.ssoBtn.url)) {
    			privateMethods.throwRequiredErorr("ssoBtn.url");
    		}
    		
    		if(privateMethods.isNOR(settings.ssoBtn.logout)) {
    			privateMethods.throwRequiredErorr("ssoBtn.logout");
    		}

    		if(privateMethods.isNOR(settings.ssoBtn.width)) {
    			privateMethods.throwRequiredErorr("ssoBtn.width");
    		}
    		
    		if(privateMethods.isNOR(settings.ssoBtn.height)) {
    			privateMethods.throwRequiredErorr("ssoBtn.height");
    		}
    		
    		if(privateMethods.isNOR(settings.ssoBtn.resize)) {
    			privateMethods.throwRequiredErorr("ssoBtn.resize");
    		}
    		
    		if(privateMethods.isNOR(settings.disqusShortName)) {
    			privateMethods.throwRequiredErorr("disqusShortName", "Tells the Disqus service your forum's shortname, which is the unique identifier for your website as registered on Disqus.");
    		}
    		
    		if(privateMethods.isNOR(settings.disqusIdentifier)) {
    			privateMethods.throwRequiredErorr("disqusIdentifier", "Tells the Disqus service how to identify the current page. When the Disqus embed is loaded, the identifier is used to look up the correct thread.");
    		}
    		*/
    		
    		if(privateMethods.isNOR(settings.disqusTitle)) {
    			if(privateMethods.isNOR(document.title) || document.title === "") {
    				privateMethods.throwRequiredErorr("disqusTitle", "Cannot use document.title as default - it is undefined");	
    			} else {
    				privateMethods.warn("disqusTitle",  "Using document.title");
    			}
    		}
    		
    		if(privateMethods.isNOR(settings.disqusURL)) {
    			privateMethods.warn("disqusURL", "Tells Disqus what page a thread belongs to.  Using window.location.href");
    			settings.disqusURL = window.location.href;
    		}
		},
		throwRequiredErorr : function(argName, optionalMessage) {
			var message = "Argument '" + argName +"' is required in the Disqus plugin.";
			if(!privateMethods.isNOR(optionalMessage)) {
				message = message + " -> " + optionalMessage;
			}
			$.error(message);
		},
		warn : function(argName, optionalMessage) {
			var message = "Argument '" + argName +"' is recommended in the Disqus plugin.";
			if(!privateMethods.isNOR(optionalMessage)) {
				message = message + " -> " + optionalMessage;
			}
			console.warn(message);
		},
		setGlobalVariables : function() {
			var $this = this;
			var settings = $this.data("settings");
			window.disqus_shortname = settings.disqusShortName;
			window.disqus_identifier = settings.disqusIdentifier;
			window.disqus_title = settings.disqusTitle;
			window.disqus_url = settings.disqusURL;
			window.disqus_developer = (settings.debug == true) ? 1 : 0;
			
			window.disqus_config = function() {
				privateMethods.log("Calling window.disqus_config");
				this.page.remote_auth_s3 = internalDisqusConfig.remote_auth_s3;
				this.page.api_key = internalDisqusConfig.api_key;
				this.sso = settings.ssoBtn;
				internalDisqusConfig = null;
			};
		},
		makeSSORequest : function() {
			var $this = this;
			var settings = $this.data("settings");
			
			$.ajax({
				url : settings.apiURL,
				type : "GET",
				dataType : "json",
				/*contentType: "application/json",*/
				success : function(data) {
					privateMethods.processSSORequest.call($this, data);
					if(!privateMethods.isDisqusInitialized()) {
						privateMethods.log("loading Disqus API");
						privateMethods.loadDisqusAPI.call($this);	
					} else {
						privateMethods.log("Disqus already loaded - calling DISQUS.reset");
						privateMethods.disqusReset.call($this);
					}
				},
				error : function(jqXHR, textStatus, errorThrown) {
					console.log("XHR Error", jqXHR, textStatus, errorThrown);
					privateMethods.onSSOError.call($this);
				}
			});
		},
		isDisqusInitialized : function() {
			return ( typeof( DISQUS ) === "object");
		},
		insertMobilePlaceholders : function() {
			if(typeof($.mobile) === "object") {
				if(firstLoad) {
					var disqusIdentifier = $('[data-role="page"]').find("#disqus_thread");
					if(disqusIdentifier.length == 1) {
						var placeholder = document.createElement("div"); placeholder.className = "disqus_landingpage_placeholder";
						disqusIdentifier.after(placeholder);
					}
				} else {
					var identifier = $(".ui-page.ui-page-active .disqus_landingpage_placeholder");
					if(identifier.length == 1) {
						identifier.after("<div id=\"disqus_thread\"></div>");
					}
				}
			}
		},
		isPageDisqusable : function() {
			var retVal = false;
			if(typeof($.mobile) === "object" && firstLoad) {
				retVal = ($('[data-role="page"]').find("#disqus_thread").length == 1);
			} else if(typeof($.mobile) === "object") {
				retVal = ($(".ui-page.ui-page-active").find("#disqus_thread").length == 1);
			} else {
				retVal = ($("#disqus_thread").length == 1);
			}
			return retVal;
		},
		removeUnusedThread : function() {
			if(typeof($.mobile) === "object") {
				if(lastThread != null) {
					privateMethods.log("Replacing", lastThread);
					$(".ui-page.ui-page-active").find("#disqus_thread").replaceWith(lastThread);
					privateMethods.log("Done replacing", lastThread);
				}
			}
		},
		disqusReset : function(args) {
			try {
				var $this = this;
				var settings = $this.data("settings");
				if(internalDisqusConfig == null) {
					$.error("SSO must be made before calling Disqus Reset");
				}
				
				privateMethods.removeUnusedThread();
				args = (typeof(args) === "undefined") ? {} : args;
				DISQUS.reset({
	  				reload: true,
	  				config: function () {
	  					var resetIdentifier = args.resetIdentifier || document.location.pathname;
	  					var resetURL = args.resetURL || window.location.href;
	  					/*
	  					if(resetURL.indexOf("#!") == -1) {
	  						resetURL = resetURL + "#!" + document.location.pathname;
	  					}
	  					*/
	    				this.page.identifier = resetIdentifier;
	    				this.page.url = resetURL;
	    				
	    				/* must be here, unfortunately */
	    				this.page.remote_auth_s3 = internalDisqusConfig.remote_auth_s3;
						this.page.api_key = internalDisqusConfig.api_key;
						this.sso = settings.ssoBtn;
						internalDisqusConfig = null;
						privateMethods.log("Disqus Reset debug info", this);
	  				}
				});
			} catch(ex) {
				console.warn("Can't reset Disqus", ex);
			}
		},
		getThreadDetails : function() {
			var $this = this;
			var settings = $this.data("settings");
			var commentMetadataIdentifier = settings.commentMetadataIdentifier;
			
			if(commentMetadataIdentifier.length > 0) {
				$.ajax({
					url : settings.countURL,
					type : "GET",
					dataType : "json",
					data : {forum : settings.disqusShortName, ident : settings.disqusIdentifier},
					success : function(data) {
						privateMethods.processThreadDetails.call($this, data);		
					},
					error : function(jqXHR, textStatus, errorThrown) {
						console.log("XHR Error", jqXHR, textStatus, errorThrown);
						privateMethods.onSSOError.call($this);
					}
				});
			}
		},
		processThreadDetails : function(data) {
			var $this = this;
			var settings = $this.data("settings");
			var commentMetadataIdentifier = settings.commentMetadataIdentifier;
			
			var a = document.createElement("a"); a.href = "#disqus_thread";
			var hasComments = !privateMethods.isNOR(data) && !privateMethods.isNOR(data.posts) && !isNaN(data.posts) && data.posts > 0;
			if(hasComments) {
				commentMetadataIdentifier.addClass("disqus-comment-count");
				var commentWord = (data.posts == 1) ? " comment" : " comments";
				
				a.innerHTML = data.posts + commentWord;
				$(commentMetadataIdentifier).append(a);
			} else {
				commentMetadataIdentifier.addClass("disqus-add-commment");
				a.innerHTML = "Add a comment"; //Add this share widget button
			}
			commentMetadataIdentifier.append(a);	
			privateMethods.log("Thread Details", data, commentMetadataIdentifier);
		},
		processSSORequest : function(data) {
			var $this = this;
			var settings = $this.data("settings");
			internalDisqusConfig = {};
			internalDisqusConfig.remote_auth_s3 = data.signature;
			internalDisqusConfig.api_key = data.publicKey;
		},
		loadDisqusAPI : function() {
			if(!privateMethods.isDisqusInitialized()) {
				var dsq=document.createElement('script');
				dsq.type='text/javascript';
				dsq.async=true;
				dsq.src='http://'+disqus_shortname+'.disqus.com/embed.js';
				(document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(dsq);
			}
		},
		bindOnPageHide : function() {
			if(!pageHideBound) {
				if(typeof($.mobile) === "object") {
					pageHideBound = true;
					$("div[data-role='page']").live('pagebeforehide',function(event){
						privateMethods.log("hiding page");
						var tempThread = $(".ui-page.ui-page-active").find("#disqus_thread").remove();
						/* only save off the reference to the thread if:  it exists, and it was initialized */
						if(tempThread.length == 1 && tempThread.children().length > 0) {
							lastThread = tempThread;
							privateMethods.log("last thread", lastThread);
						}
					});
				}
			}
		},
		onSSOError : function() {
			var $this = this;
			var settings = $this.data("settings");
			if($.isFunction(settings.onSSOError)) {
				settings.onSSOError();
			}
		}
	};
	
	var methods = {
		init : function(options) {
			privateMethods.insertMobilePlaceholders();
			
			if(privateMethods.isPageDisqusable()) {
				var $this = this;
				var settings = $.extend( {
					apiURL : null,
					ssoBtn : {},
					disqusShortName : null,
					debug : false,
					onSSOError : function() {},
					preventDoubleLoading : false
				}, options);
				
				var loaded = (window.disqusLoaded === true);
				if(!loaded || (loaded && !settings.preventDoubleLoading)) {
					$this.data("settings", settings);
					debugMode = settings.debug;
					
					privateMethods.bindOnPageHide();
					privateMethods.validateOptions(settings);
					privateMethods.setDefaultSettings.call($this);
					privateMethods.setGlobalVariables.call($this);
					privateMethods.makeSSORequest.call($this);
					privateMethods.getThreadDetails.call($this);
					firstLoad = false;
					window.disqusLoaded = true;
				}
			}
		} 
	};
	
	$.fn.militaryDisqus = function(method) {
		if ( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.militaryDisqus' );
		}    
	};
})( jQuery );