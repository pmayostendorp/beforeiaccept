// Copyright 2006-2015 ClickTale Ltd., US Patent Pending
// Generated on: 7/1/2015 7:36:36 AM (UTC 7/1/2015 12:36:36 PM)

if (typeof(ct_dispatcher) == 'undefined')
{
	ct_dispatcher = {
		configName : null,
		cookieName : "ct_configName",
		getParameterByName : function (name)
		{
			 name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
			 var regexS = "[\\?&]" + name + "=([^&#]*)";
			 var regex = new RegExp(regexS, "i");
			 var results = regex.exec(window.location.search);
			 if(results == null)
			   return "";
			 else
			   return decodeURIComponent(results[1].replace(/\+/g, " "));
		},
		createCookie: function (name,value,days) 
		{
			if (days) 
			{
				var date = new Date();
				date.setTime(date.getTime( )+( days*24*60*60*1000));
				var expires = "; expires="+date.toGMTString( );
			}
			else var expires = "";
			document.cookie = name+"="+value+expires+"; path=/";
		},
		readCookie : function (name) 
		{
			var nameEQ = name + "=";
			var ca = document.cookie.split( ';');
			for( var i=0;i < ca.length;i++) 
			{
				var c = ca[i];
				while ( c.charAt( 0)==' ') c = c.substring( 1,c.length);
				if ( c.indexOf( nameEQ) == 0) return c.substring( nameEQ.length,c.length);
			}
			return null;
		}
	};
		
	// Read from querystring
	var ct_pdc_qs_val = ct_dispatcher.getParameterByName(ct_dispatcher.cookieName);
	if (ct_pdc_qs_val)
	{
		// Override/create cookie
		ct_dispatcher.createCookie(ct_dispatcher.cookieName, ct_pdc_qs_val, 14);
		ct_dispatcher.configName = ct_pdc_qs_val;
	}
	else
	{
		// Read from cookie
		ct_dispatcher.configName = ct_dispatcher.readCookie(ct_dispatcher.cookieName);
	}

	
}

	if (typeof (ClickTaleCreateDOMElement) != "function")
{
	ClickTaleCreateDOMElement = function(tagName)
	{
		if (document.createElementNS)
		{
			return document.createElementNS('http://www.w3.org/1999/xhtml', tagName);
		}
		return document.createElement(tagName);
	}
}

if (typeof (ClickTaleAppendInHead) != "function")
{
	ClickTaleAppendInHead = function(element)
	{
		var parent = document.getElementsByTagName('head').item(0) || document.documentElement;
		parent.appendChild(element);
	}
}

if (typeof (ClickTaleXHTMLCompliantScriptTagCreate) != "function")
{
	ClickTaleXHTMLCompliantScriptTagCreate = function(code)
	{
		var script = ClickTaleCreateDOMElement('script');
		script.setAttribute("type", "text/javascript");
		script.text = code;
		return script;
	}
}	
		var configFoundPTC = false;
	
if (ct_dispatcher.configName == 'R_23032015_R')
{
	configFoundPTC = true;
			(function(){
	var script = ClickTaleXHTMLCompliantScriptTagCreate("\/\/ Copyright 2006-2015 ClickTale Ltd., US Patent Pending\r\n\/\/ PID: 72\r\n\/\/ WR destination: www12\r\n\/\/ WR version: 14.21\r\n\/\/ Recording ratio: 0.03333211\r\n\/\/ Generated on: 7\/1\/2015 7:36:36 AM (UTC 7\/1\/2015 12:36:36 PM)\r\n\r\n\r\nfunction ClickTaleCDNHTTPSRewrite(u)\r\n{\r\n\ttry\r\n\t{\r\n\t\tvar scripts = document.getElementsByTagName(\u0027script\u0027);\r\n\t\tif(scripts.length)\r\n\t\t{\r\n\t\t\tvar script = scripts[ scripts.length - 1 ], s=\u0027https:\/\/clicktalecdn.sslcs.cdngc.net\/\u0027;\r\n\t\t\tif(script.src \u0026\u0026 script.src.substr(0,s.length)==s )\r\n\t\t\t\treturn u.replace(\u0027https:\/\/cdnssl.clicktale.net\/\u0027,s);\r\n\t\t}\r\n\t}\r\n\tcatch(e)\r\n\t{\r\n\t}\r\n\treturn u;\r\n} \r\n\r\nvar ClickTaleIsXHTMLCompliant = true;\r\nif (typeof (ClickTaleCreateDOMElement) != \"function\")\r\n{\r\n\tClickTaleCreateDOMElement = function(tagName)\r\n\t{\r\n\t\tif (document.createElementNS)\r\n\t\t{\r\n\t\t\treturn document.createElementNS(\u0027http:\/\/www.w3.org\/1999\/xhtml\u0027, tagName);\r\n\t\t}\r\n\t\treturn document.createElement(tagName);\r\n\t}\r\n}\r\n\r\nif (typeof (ClickTaleAppendInHead) != \"function\")\r\n{\r\n\tClickTaleAppendInHead = function(element)\r\n\t{\r\n\t\tvar parent = document.getElementsByTagName(\u0027head\u0027).item(0) || document.documentElement;\r\n\t\tparent.appendChild(element);\r\n\t}\r\n}\r\n\r\nif (typeof (ClickTaleXHTMLCompliantScriptTagCreate) != \"function\")\r\n{\r\n\tClickTaleXHTMLCompliantScriptTagCreate = function(code)\r\n\t{\r\n\t\tvar script = ClickTaleCreateDOMElement(\u0027script\u0027);\r\n\t\tscript.setAttribute(\"type\", \"text\/javascript\");\r\n\t\tscript.text = code;\r\n\t\treturn script;\r\n\t}\r\n}\t\r\n\r\nvar pccScriptElement = ClickTaleCreateDOMElement(\u0027script\u0027);\r\npccScriptElement.type = \"text\/javascript\";\r\npccScriptElement.src = (document.location.protocol==\u0027https:\u0027?\r\nClickTaleCDNHTTPSRewrite(\u0027https:\/\/cdnssl.clicktale.net\/www12\/pcc\/4c721896-8cf9-4e13-b220-fec60517e2aa.js?DeploymentConfigName=R_23032015_R\u0026Version=5\u0027):\r\n\u0027http:\/\/cdn.clicktale.net\/www12\/pcc\/4c721896-8cf9-4e13-b220-fec60517e2aa.js?DeploymentConfigName=R_23032015_R\u0026Version=5\u0027);\r\ndocument.body.appendChild(pccScriptElement);\r\n\t\r\nvar ClickTalePrevOnReady;\r\nif(typeof ClickTaleOnReady == \u0027function\u0027)\r\n{\r\n\tClickTalePrevOnReady=ClickTaleOnReady;\r\n\tClickTaleOnReady=undefined;\r\n}\r\n\r\nif (typeof window.ClickTaleScriptSource == \u0027undefined\u0027)\r\n{\r\n\twindow.ClickTaleScriptSource=(document.location.protocol==\u0027https:\u0027\r\n\t\t?ClickTaleCDNHTTPSRewrite(\u0027https:\/\/cdnssl.clicktale.net\/www\/\u0027)\r\n\t\t:\u0027http:\/\/cdn.clicktale.net\/www\/\u0027);\r\n}\r\n\r\n\r\n\/\/ Start of user-defined pre WR code (PreLoad)b\r\nwindow.ClickTaleSettings = window.ClickTaleSettings || {};\r\nwindow.bEnableChangeMonitor = false;\r\nwindow.bEnableUploadPage = false;\r\n\r\nwindow.ClickTaleSettings = window.ClickTaleSettings || {};\r\nwindow.ClickTaleSettings.CheckAgentSupport = function (f, v) {\r\n\r\n    if (v.t == v.IE \u0026\u0026 v.v \u003c= 10) {\r\n        return false;\r\n    }\r\n    else {\r\n        if (v.m) {\r\n            window.bEnableUploadPage = true;\r\n            EnableTransport();\r\n            return f(v);\r\n        }\r\n        UPCheck();\r\n        CMCheck();\r\n        return f(v);\r\n    }\r\n}\r\n\r\nfunction UPCheck() {\r\n\t\r\n    var ct_path = document.location.href.toLowerCase();\r\n\t\t\r\n    var UploadPage_URL_Map = new Object();\r\n\t\r\n    UploadPage_URL_Map[\u0027\/drugs\/\u0027] = false;\r\n    UploadPage_URL_Map[\u0027\u0027] = true;\r\n\t\t\t\r\n    for (var URL_Key in UploadPage_URL_Map){\r\n\t\t\r\n        if(ct_path.indexOf(URL_Key.toLowerCase()) \u003e -1){\r\n\t\t\r\n            window.bEnableUploadPage = UploadPage_URL_Map[URL_Key];\r\n            break;\r\n        }\r\n    }\r\n\r\n    if(window.bEnableUploadPage){\t\r\n        EnableTransport();\r\n    }\r\n}\r\n\r\nfunction CMCheck() {\r\n\t\r\n    var ct_path = document.location.href.toLowerCase();\r\n\t\r\n    var ChangeMonitor_URL_Map = new Object();\r\n\t\t\r\n    ChangeMonitor_URL_Map[\u0027\/drugs\/\u0027] = true;\r\n\t\t\r\n    for (var URL_Key in ChangeMonitor_URL_Map){\r\n\t\t\t\r\n        if(ct_path.indexOf(URL_Key.toLowerCase()) \u003e -1){\r\n\t\t\t\r\n            window.bEnableChangeMonitor = ChangeMonitor_URL_Map[URL_Key];\r\n            break;\r\n        }\r\n\t\t\r\n    }\r\n\r\n    if(window.bEnableChangeMonitor){\t\r\n        EnableTransport();\r\n    }\r\n}\r\n\r\nfunction EnableTransport() {\r\n\r\n    if(window.bEnableUploadPage || window.bEnableChangeMonitor)\r\n    {   \r\n        window.ClickTaleIncludedOnDOMReady = true;\r\n\t\t\r\n        if (window.bEnableUploadPage){\r\n            XHR = true\r\n        }\r\n        else if (window.bEnableChangeMonitor){\r\n            XHR = false\r\n        }\r\n        window.ClickTaleSettings=window.ClickTaleSettings||{};\r\n        window.ClickTaleSettings.XHRWrapper= {\r\n            Enable: XHR\r\n        }\r\n        window.ClickTaleSettings.Compression={\r\n            Method: function () {\r\n                return \"deflate\";\r\n            }\r\n        }\r\n        window.ClickTaleSettings.Transport= {\r\n            Legacy: false,\r\n            MaxConcurrentRequests: 5\r\n\t\t\t\t\r\n        }\r\n\r\n    window.ClickTaleSettings.RewriteRules = {\r\n        OnBeforeRewrite: function (rewriteApi) {\r\n            \/\/rewriteApi.clear();\r\n            rewriteApi.add({\r\n                pattern: new RegExp(\u0027(\u003cinput[^\u003e]*value=\")([^\"]+)(\"[^\u003e]*type=\"text\"\u003e)\u0027, \u0027gim\u0027),\r\n                replace: \"$1-----$3\"\r\n            });\r\n            rewriteApi.add({\r\n                pattern: new RegExp(\u0027(\u003cinput[^\u003e]*type=\"text\"[^\u003e]*value=\")([^\"]+)(\"[^\u003e]*\u003e)\u0027, \u0027gim\u0027),\r\n                replace: \"$1-----$3\"\r\n            });\r\n        }\r\n    }\r\n}\r\n\r\n\t\r\nif(window.bEnableChangeMonitor){\r\n    var script = document.createElement(\"SCRIPT\");\r\n    script.src = (document.location.protocol === \"https:\" ? \"https:\/\/cdnssl.clicktale.net\/www\/ChangeMonitor-1.2.3.js\" : \"http:\/\/cdn.clicktale.net\/www\/ChangeMonitor-1.2.3.js\");\r\n    document.body.appendChild(script);\r\n\r\n    window.ClickTaleSettings.ChangeMonitor = {\r\n        Enable: true,\r\n        AddressingMode: \"id\",\r\n        OnReadyHandler: function (changeMonitor) {\r\n            changeMonitor.observe();\r\n            \/\/changeMonitor.exclude(\".example\");\r\n\t\t\t\t\r\n        },\r\n        OnBeforeReadyHandler: function (settings) {\r\n            settings.Enable = window.ClickTaleGetUID ? !!ClickTaleGetUID() : false;\r\n            return settings;\r\n        },\r\n        Filters: {\r\n            MaxBufferSize: 300000\r\n        }\r\n    }\r\n}\r\n\t\r\nwindow.UseTransport = true;\r\n\t\r\n}\t\t\t\r\n\/\/ End of user-defined pre WR code\r\n\r\n\r\nvar ClickTaleOnReady = function()\r\n{\r\n\tvar PID=72, \r\n\t\tRatio=0.03333211, \r\n\t\tPartitionPrefix=\"www12\";\r\n\t\r\n\tif (window.navigator \u0026\u0026 window.navigator.loadPurpose === \"preview\") {\r\n       return; \/\/in preview\r\n\t   };\r\n\t\t\r\n\t\r\n\t\/\/ Start of user-defined header code (PreInitialize)\r\n\tif (typeof ClickTaleSetAllSensitive === \"function\") {\n    ClickTaleSetAllSensitive();\n}\n\nif (typeof ClickTaleUploadPage === \u0027function\u0027 \u0026\u0026 window.UseTransport) {\n    if(window.bEnableChangeMonitor){\n\t\tif (typeof ClickTaleEvent === \"function\") {\n\t\t\t\t\tClickTaleEvent(\"CM\");\n\t\t}\n\t\t\n\t}\t\n\tClickTaleUploadPage();\n}\r\n\t\/\/ End of user-defined header code (PreInitialize)\r\n    \r\n\t\r\n\twindow.ClickTaleIncludedOnDOMReady=true;\r\n\twindow.ClickTaleSSL=1;\r\n\t\r\n\tClickTale(PID, Ratio, PartitionPrefix);\r\n\t\r\n\tif((typeof ClickTalePrevOnReady == \u0027function\u0027) \u0026\u0026 (ClickTaleOnReady.toString() != ClickTalePrevOnReady.toString()))\r\n\t{\r\n    \tClickTalePrevOnReady();\r\n\t}\r\n\t\r\n\t\r\n\t\/\/ Start of user-defined footer code\r\n\t\r\n\t\/\/ End of user-defined footer code\r\n\t\r\n}; \r\n(function() {\r\n\tvar div = ClickTaleCreateDOMElement(\"div\");\r\n\tdiv.id = \"ClickTaleDiv\";\r\n\tdiv.style.display = \"none\";\r\n\tdocument.body.appendChild(div);\r\n\r\n\tvar externalScript = ClickTaleCreateDOMElement(\"script\");\r\n\tvar src = document.location.protocol==\u0027https:\u0027?\r\n\t  \u0027https:\/\/cdnssl.clicktale.net\/www\/tc\/WRe21.js\u0027:\r\n\t  \u0027http:\/\/cdn.clicktale.net\/www\/tc\/WRe21.js\u0027;\r\n\texternalScript.src = (window.ClickTaleCDNHTTPSRewrite?ClickTaleCDNHTTPSRewrite(src):src);\r\n\texternalScript.type = \u0027text\/javascript\u0027;\r\n\tdocument.body.appendChild(externalScript);\r\n})();\r\n\r\n\r\n\r\n");
	document.body.appendChild(script);	})();
	}
			
	

	// Default configuration
if (!configFoundPTC)
{
			(function(){
	var script = ClickTaleXHTMLCompliantScriptTagCreate("\/\/ Copyright 2006-2015 ClickTale Ltd., US Patent Pending\r\n\/\/ PID: 72\r\n\/\/ WR destination: www12\r\n\/\/ WR version: 14.21\r\n\/\/ Recording ratio: 0.0029\r\n\/\/ Generated on: 7\/1\/2015 7:36:36 AM (UTC 7\/1\/2015 12:36:36 PM)\r\n\r\n\r\nfunction ClickTaleCDNHTTPSRewrite(u)\r\n{\r\n\ttry\r\n\t{\r\n\t\tvar scripts = document.getElementsByTagName(\u0027script\u0027);\r\n\t\tif(scripts.length)\r\n\t\t{\r\n\t\t\tvar script = scripts[ scripts.length - 1 ], s=\u0027https:\/\/clicktalecdn.sslcs.cdngc.net\/\u0027;\r\n\t\t\tif(script.src \u0026\u0026 script.src.substr(0,s.length)==s )\r\n\t\t\t\treturn u.replace(\u0027https:\/\/cdnssl.clicktale.net\/\u0027,s);\r\n\t\t}\r\n\t}\r\n\tcatch(e)\r\n\t{\r\n\t}\r\n\treturn u;\r\n} \r\n\r\nvar ClickTaleIsXHTMLCompliant = true;\r\nif (typeof (ClickTaleCreateDOMElement) != \"function\")\r\n{\r\n\tClickTaleCreateDOMElement = function(tagName)\r\n\t{\r\n\t\tif (document.createElementNS)\r\n\t\t{\r\n\t\t\treturn document.createElementNS(\u0027http:\/\/www.w3.org\/1999\/xhtml\u0027, tagName);\r\n\t\t}\r\n\t\treturn document.createElement(tagName);\r\n\t}\r\n}\r\n\r\nif (typeof (ClickTaleAppendInHead) != \"function\")\r\n{\r\n\tClickTaleAppendInHead = function(element)\r\n\t{\r\n\t\tvar parent = document.getElementsByTagName(\u0027head\u0027).item(0) || document.documentElement;\r\n\t\tparent.appendChild(element);\r\n\t}\r\n}\r\n\r\nif (typeof (ClickTaleXHTMLCompliantScriptTagCreate) != \"function\")\r\n{\r\n\tClickTaleXHTMLCompliantScriptTagCreate = function(code)\r\n\t{\r\n\t\tvar script = ClickTaleCreateDOMElement(\u0027script\u0027);\r\n\t\tscript.setAttribute(\"type\", \"text\/javascript\");\r\n\t\tscript.text = code;\r\n\t\treturn script;\r\n\t}\r\n}\t\r\n\r\nvar pccScriptElement = ClickTaleCreateDOMElement(\u0027script\u0027);\r\npccScriptElement.type = \"text\/javascript\";\r\npccScriptElement.src = (document.location.protocol==\u0027https:\u0027?\r\nClickTaleCDNHTTPSRewrite(\u0027https:\/\/cdnssl.clicktale.net\/www12\/pcc\/4c721896-8cf9-4e13-b220-fec60517e2aa.js?DeploymentConfigName=R_06092015_R\u0026Version=1\u0027):\r\n\u0027http:\/\/cdn.clicktale.net\/www12\/pcc\/4c721896-8cf9-4e13-b220-fec60517e2aa.js?DeploymentConfigName=R_06092015_R\u0026Version=1\u0027);\r\ndocument.body.appendChild(pccScriptElement);\r\n\t\r\nvar ClickTalePrevOnReady;\r\nif(typeof ClickTaleOnReady == \u0027function\u0027)\r\n{\r\n\tClickTalePrevOnReady=ClickTaleOnReady;\r\n\tClickTaleOnReady=undefined;\r\n}\r\n\r\nif (typeof window.ClickTaleScriptSource == \u0027undefined\u0027)\r\n{\r\n\twindow.ClickTaleScriptSource=(document.location.protocol==\u0027https:\u0027\r\n\t\t?ClickTaleCDNHTTPSRewrite(\u0027https:\/\/cdnssl.clicktale.net\/www\/\u0027)\r\n\t\t:\u0027http:\/\/cdn.clicktale.net\/www\/\u0027);\r\n}\r\n\r\n\r\n\/\/ Start of user-defined pre WR code (PreLoad)b\r\nwindow.ClickTaleSettings = window.ClickTaleSettings || {};\r\nwindow.bEnableChangeMonitor = false;\r\nwindow.bEnableUploadPage = false;\r\n\r\nwindow.ClickTaleSettings = window.ClickTaleSettings || {};\r\nwindow.ClickTaleSettings.CheckAgentSupport = function (f, v) {\r\n\r\n    if (v.t == v.IE \u0026\u0026 v.v \u003c= 10) {\r\n        return false;\r\n    }\r\n    else {\r\n        if (v.m) {\r\n            window.bEnableUploadPage = true;\r\n            EnableTransport();\r\n            return f(v);\r\n        }\r\n        UPCheck();\r\n        CMCheck();\r\n        return f(v);\r\n    }\r\n}\r\n\r\nfunction UPCheck() {\r\n\t\r\n    var ct_path = document.location.href.toLowerCase();\r\n\t\t\r\n    var UploadPage_URL_Map = new Object();\r\n\t\r\n    UploadPage_URL_Map[\u0027\/drugs\/\u0027] = false;\r\n    UploadPage_URL_Map[\u0027\u0027] = true;\r\n\t\t\t\r\n    for (var URL_Key in UploadPage_URL_Map){\r\n\t\t\r\n        if(ct_path.indexOf(URL_Key.toLowerCase()) \u003e -1){\r\n\t\t\r\n            window.bEnableUploadPage = UploadPage_URL_Map[URL_Key];\r\n            break;\r\n        }\r\n    }\r\n\r\n    if(window.bEnableUploadPage){\t\r\n        EnableTransport();\r\n    }\r\n}\r\n\r\nfunction CMCheck() {\r\n\t\r\n    var ct_path = document.location.href.toLowerCase();\r\n\t\r\n    var ChangeMonitor_URL_Map = new Object();\r\n\t\t\r\n    ChangeMonitor_URL_Map[\u0027\/drugs\/\u0027] = true;\r\n\t\t\r\n    for (var URL_Key in ChangeMonitor_URL_Map){\r\n\t\t\t\r\n        if(ct_path.indexOf(URL_Key.toLowerCase()) \u003e -1){\r\n\t\t\t\r\n            window.bEnableChangeMonitor = ChangeMonitor_URL_Map[URL_Key];\r\n            break;\r\n        }\r\n\t\t\r\n    }\r\n\r\n    if(window.bEnableChangeMonitor){\t\r\n        EnableTransport();\r\n    }\r\n}\r\n\r\nfunction EnableTransport() {\r\n\r\n    if(window.bEnableUploadPage || window.bEnableChangeMonitor)\r\n    {   \r\n        window.ClickTaleIncludedOnDOMReady = true;\r\n\t\t\r\n        if (window.bEnableUploadPage){\r\n            XHR = true\r\n        }\r\n        else if (window.bEnableChangeMonitor){\r\n            XHR = false\r\n        }\r\n        window.ClickTaleSettings=window.ClickTaleSettings||{};\r\n        window.ClickTaleSettings.XHRWrapper= {\r\n            Enable: XHR\r\n        }\r\n        window.ClickTaleSettings.Compression={\r\n            Method: function () {\r\n                return \"deflate\";\r\n            }\r\n        }\r\n        window.ClickTaleSettings.Transport= {\r\n            Legacy: false,\r\n            MaxConcurrentRequests: 5\r\n\t\t\t\t\r\n        }\r\n\r\n    window.ClickTaleSettings.RewriteRules = {\r\n        OnBeforeRewrite: function (rewriteApi) {\r\n            \/\/rewriteApi.clear();\r\n            rewriteApi.add({\r\n                pattern: new RegExp(\u0027(\u003cinput[^\u003e]*value=\")([^\"]+)(\"[^\u003e]*type=\"text\"\u003e)\u0027, \u0027gim\u0027),\r\n                replace: \"$1-----$3\"\r\n            });\r\n            rewriteApi.add({\r\n                pattern: new RegExp(\u0027(\u003cinput[^\u003e]*type=\"text\"[^\u003e]*value=\")([^\"]+)(\"[^\u003e]*\u003e)\u0027, \u0027gim\u0027),\r\n                replace: \"$1-----$3\"\r\n            });\r\n        }\r\n    }\r\n}\r\n\r\n\t\r\nif(window.bEnableChangeMonitor){\r\n    var script = document.createElement(\"SCRIPT\");\r\n    script.src = (document.location.protocol === \"https:\" ? \"https:\/\/cdnssl.clicktale.net\/www\/ChangeMonitor-1.2.3.js\" : \"http:\/\/cdn.clicktale.net\/www\/ChangeMonitor-1.2.3.js\");\r\n    document.body.appendChild(script);\r\n\r\n    window.ClickTaleSettings.ChangeMonitor = {\r\n        Enable: true,\r\n        AddressingMode: \"id\",\r\n        OnReadyHandler: function (changeMonitor) {\r\n            changeMonitor.observe();\r\n            \/\/changeMonitor.exclude(\".example\");\r\n\t\t\t\t\r\n        },\r\n        OnBeforeReadyHandler: function (settings) {\r\n            settings.Enable = window.ClickTaleGetUID ? !!ClickTaleGetUID() : false;\r\n            return settings;\r\n        },\r\n        Filters: {\r\n            MaxBufferSize: 300000\r\n        }\r\n    }\r\n}\r\n\t\r\nwindow.UseTransport = true;\r\n\t\r\n}\t\t\t\r\n\/\/ End of user-defined pre WR code\r\n\r\n\r\nvar ClickTaleOnReady = function()\r\n{\r\n\tvar PID=72, \r\n\t\tRatio=0.0029, \r\n\t\tPartitionPrefix=\"www12\";\r\n\t\r\n\tif (window.navigator \u0026\u0026 window.navigator.loadPurpose === \"preview\") {\r\n       return; \/\/in preview\r\n\t   };\r\n\t\t\r\n\t\r\n\t\/\/ Start of user-defined header code (PreInitialize)\r\n\tif (typeof ClickTaleSetAllSensitive === \"function\") {\n    ClickTaleSetAllSensitive();\n}\n\nif (typeof ClickTaleUploadPage === \u0027function\u0027 \u0026\u0026 window.UseTransport) {\n    if(window.bEnableChangeMonitor){\n\t\tif (typeof ClickTaleEvent === \"function\") {\n\t\t\t\t\tClickTaleEvent(\"CM\");\n\t\t}\t\t\n\t}\t\n}\nif (typeof ClickTaleUploadPage == \u0027function\u0027) {\n\t\twindow.ClickTaleSSL = 1;\n\t\tClickTaleUploadPage();\n\t\tClickTale(PID, Ratio, PartitionPrefix);\t\n\t\treturn;\t\t\n}\r\n\t\/\/ End of user-defined header code (PreInitialize)\r\n    \r\n\t\r\n\twindow.ClickTaleIncludedOnDOMReady=true;\r\n\twindow.ClickTaleSSL=1;\r\n\t\r\n\tClickTale(PID, Ratio, PartitionPrefix);\r\n\t\r\n\tif((typeof ClickTalePrevOnReady == \u0027function\u0027) \u0026\u0026 (ClickTaleOnReady.toString() != ClickTalePrevOnReady.toString()))\r\n\t{\r\n    \tClickTalePrevOnReady();\r\n\t}\r\n\t\r\n\t\r\n\t\/\/ Start of user-defined footer code\r\n\t\r\n\t\/\/ End of user-defined footer code\r\n\t\r\n}; \r\n(function() {\r\n\tvar div = ClickTaleCreateDOMElement(\"div\");\r\n\tdiv.id = \"ClickTaleDiv\";\r\n\tdiv.style.display = \"none\";\r\n\tdocument.body.appendChild(div);\r\n\r\n\tvar externalScript = ClickTaleCreateDOMElement(\"script\");\r\n\tvar src = document.location.protocol==\u0027https:\u0027?\r\n\t  \u0027https:\/\/cdnssl.clicktale.net\/www\/tc\/WRe21.js\u0027:\r\n\t  \u0027http:\/\/cdn.clicktale.net\/www\/tc\/WRe21.js\u0027;\r\n\texternalScript.src = (window.ClickTaleCDNHTTPSRewrite?ClickTaleCDNHTTPSRewrite(src):src);\r\n\texternalScript.type = \u0027text\/javascript\u0027;\r\n\tdocument.body.appendChild(externalScript);\r\n})();\r\n\r\n\r\n\r\n");
	document.body.appendChild(script);	})();
	}


!function(){function t(){window.addEventListener&&addEventListener("message",e,!1)}function e(t){var e,n=new RegExp("clicktale.com|ct.test"),i=new RegExp("ct.test"),c=!1,d=t.origin;try{e=JSON.parse(t.data)}catch(r){return}0!=n.test(t.origin)&&(1==i.test(t.origin)&&(c=!0),"CTload_ve"==e["function"]&&o(d,c))}function n(t){return document.createElementNS?document.createElementNS("http://www.w3.org/1999/xhtml",t):document.createElement(t)}function o(t,e){var o=n("script");o.setAttribute("type","text/javascript"),o.setAttribute("id","ctVisualEditorClientModule");var i;i=e?document.location.protocol+"//ct.test/VisualEditor/Client/dist/veClientModule.js":document.location.protocol+"//"+t.match(/subs\d*/)[0]+".app.clicktale.com/VisualEditor/Client/dist/veClientModule.js",o.src=i,document.getElementById("ctVisualEditorClientModule")||document.body.appendChild(o)}try{var i=window.chrome,c=window.navigator&&window.navigator.vendor;null!==i&&void 0!==i&&"Google Inc."===c&&window.self!==window.top&&t()}catch(d){}}();