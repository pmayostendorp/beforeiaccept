
	        CQ_Analytics.registerAfterCallback(function(options) {
	            if(!options.compatibility && $CQ.inArray( options.componentPath, CQ_Analytics.Sitecatalyst.frameworkComponents) < 0 )
	                return false;    // component not in framework, skip SC callback
	            CQ_Analytics.Sitecatalyst.saveEvars();
	            CQ_Analytics.Sitecatalyst.updateEvars(options);
	            CQ_Analytics.Sitecatalyst.updateLinkTrackVars();
	            return false;
	        }, 10);
	
	        CQ_Analytics.registerAfterCallback(function(options) {
	            if(!options.compatibility && $CQ.inArray( options.componentPath, CQ_Analytics.Sitecatalyst.frameworkComponents) < 0 )
	                return false;    // component not in framework, skip SC callback
	            //s = s_gi("snepdcsceadev");
	            s = s_gi(s_account);
	            if (s.linkTrackVars == "None") {
	                s.linkTrackVars = "events";
	            } else {
	                s.linkTrackVars = s.linkTrackVars + ",events";
	            }
	            CQ_Analytics.Sitecatalyst.trackLink(options);
	            return false;
	        }, 100);
	
	
	        CQ_Analytics.registerAfterCallback(function(options) {
	            if(!options.compatibility && $CQ.inArray( options.componentPath, CQ_Analytics.Sitecatalyst.frameworkComponents) < 0 )
	                return false;    // component not in framework, skip SC callback
	            CQ_Analytics.Sitecatalyst.restoreEvars();
	            return false;
	        }, 200);
	
	        CQ_Analytics.adhocLinkTracking = "false";
	        
	
	
	        var s_account = PDC.SC.get_rs();
	        var s = s_gi(s_account);
	        s.fpCookieDomainPeriods = "3";
	        s.currencyCode= 'USD';
        s.trackInlineStats= true;
        s.eVar10= 'hygiene';
        s.charSet= 'UTF-8';
        s.linkTrackVars= 'None';
        s.prop72= 'pdc';
        s.linkTrackEvents= 'None';
        s.linkDownloadFileTypes= 'exe,zip,wav,mp3,mov,mpg,avi,wmv,doc,pdf,xls';
        s.prop10= 'hygiene';
        s.trackDownloadLinks= true;
        s.event1= 'Page View';
        s.eVar72= 'pdc';
        s.linkLeaveQueryString= false;
        s.linkExternalFilters= '';
        s.server= 'pdc';
        s.trackExternalLinks= true;
        s.linkInternalFilters= 'javascript:,scene7.com,playstation.com,playstation.net';
        
        s.visitorNamespace = "sonynetworkentertainment";
        s.trackingServer = "metrics.aem.playstation.com";
        s.trackingServerSecure = "smetrics.aem.playstation.com";
        
        try {
    PDC.SC.process_global_vars(s);
    PDC.SC.configure_rs(s);
    console.log("processed sc");
} catch (e) {
    console.log("error processing sc");
    console.log(e);
}



