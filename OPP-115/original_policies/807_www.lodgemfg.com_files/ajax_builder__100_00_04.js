function ajax_builder(file,responseType) {
	this.xmlhttp = null;

	this.ResetData = function() {
		if(typeof responseType == "undefined") responseType = "xml";
		
		this.Method = "GET";
  		this.QueryStringSeparator = "?";
		this.ArgumentSeparator = "&";
		this.QueryString = "";
		this.ResponseType = responseType;
		this.EncodeURIString = true;
  		this.Execute = false;
  		this.Element = null;
		this.ElementObj = null;
		this.RequestFile = file;
		this.RequestUri = null;
		this.Vars = new Object();
		this.ResponseStatus = new Array(2);
  	};

	this.ResetFunctions = function() {
  		this.onLoading = function() { };
  		this.onLoaded = function() { };
  		this.onInteractive = function() { };
  		this.onCompletion = function() { };
  		this.onError = function() { };
		this.onFail = function() { };
	};

	this.Reset = function() {
		this.ResetFunctions();
		this.ResetData();
	};

	this.CreateAJAX = function() {
		try {
			this.xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e1) {
			try {
				this.xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e2) {
				this.xmlhttp = null;
			}
		}

		if (! this.xmlhttp) {
			if (typeof XMLHttpRequest != "undefined") {
				this.xmlhttp = new XMLHttpRequest();
			} else {
				this.Failed = true;
			}
		}
	};

	this.SetVar = function(name, value){
		this.Vars[name] = Array(value, false);
	};

	this.EncVar = function(name, value, returnvars) {
		if (true == returnvars) {
			return Array(encodeURIComponent(name), encodeURIComponent(value));
		} else {
			this.Vars[encodeURIComponent(name)] = Array(encodeURIComponent(value), true);
		}
	}

	this.ProcessQueryString = function(string, encode) {
		encoded = EncodeURIComponent(this.ArgumentSeparator);
		regexp = new RegExp(this.ArgumentSeparator + "|" + encoded);
		varArray = string.split(regexp);
		for (i = 0; i < varArray.length; i++){
			urlVars = varArray[i].split("=");
			if (true == encode){
				this.EncVar(urlVars[0], urlVars[1]);
			} else {
				this.SetVar(urlVars[0], urlVars[1]);
			}
		}
	}

	this.CreateQueryString = function(urlstring) {
		if (this.EncodeURIString && this.QueryString.length) {
			this.ProcessQueryString(this.QueryString, true);
		}

		if (urlstring) {
			if (this.QueryString.length) {
				this.QueryString += this.ArgumentSeparator + urlstring;
			} else {
				this.QueryString = urlstring;
			}
		}

		// prevents caching of QueryString
		this.SetVar("ajax", new Date().getTime());

		urlstringtemp = new Array();
		for (key in this.Vars) {
			if (false == this.Vars[key][1] && true == this.EncodeURIString) {
				encoded = this.EncVar(key, this.Vars[key][0], true);
				delete this.Vars[key];
				this.Vars[encoded[0]] = Array(encoded[1], true);
				key = encoded[0];
			}

			urlstringtemp[urlstringtemp.length] = key + "=" + this.Vars[key][0];
		}
		if (urlstring){
			this.QueryString += this.ArgumentSeparator + urlstringtemp.join(this.ArgumentSeparator);
		} else {
			this.QueryString += urlstringtemp.join(this.ArgumentSeparator);
		}
	}

	this.RunResponse = function() {
		eval(this.Response);
	}

	this.RunAJAX = function(urlstring) {
		if (this.Failed) {
			this.onFail();
		} else {
			this.CreateQueryString(urlstring);
			if (this.Element) {
				this.ElementObj = document.getElementById(this.Element);
			}
			if (this.xmlhttp) {
				var self = this;
				if (this.Method == "GET") {
					self.RequestUri = this.RequestFile + this.QueryStringSeparator + this.QueryString;
					this.xmlhttp.open(this.Method, self.RequestUri, true);
				} else {
					self.RequestUri = this.RequestFile;
					this.xmlhttp.open(this.Method, this.RequestFile, true);
					try {
						this.xmlhttp.SetRequestHeader("Content-Type", "application/x-www-form-urlencoded")
					} catch (e) { }
				}

				this.xmlhttp.onreadystatechange = function() {
					switch (self.xmlhttp.readyState) {
						case 1:
							self.onLoading();
							break;
						case 2:
							self.onLoaded();
							break;
						case 3:
							self.onInteractive();
							break;
						case 4:
							switch (self.ResponseType){
								case "text":
									self.Response = self.xmlhttp.responseText;
									break;
								case "json":
									self.Response = eval("(" + self.xmlhttp.responseText + ")");
									break;
								default: //xml
									var cType = self.xmlhttp.getResponseHeader("Content-Type");
									if ("text/xml" == cType) {
										self.Response = self.xmlhttp.responseXML;
									} else if ("text/plain" == cType) { //force to xml
										self.Response = self.CreateXMLDoc(self.xmlhttp.responseText);
									} else {
										alert("Response data could not be formatted as xml!");
									}
							}//switch (self.ResponseType)
							
							self.ResponseStatus[0] = self.xmlhttp.status;
							self.ResponseStatus[1] = self.xmlhttp.statusText;

							if (self.Execute) {
								self.RunResponse();
							}

							if (self.ElementObj) {
								elemNodeName = self.ElementObj.nodeName;
								elemNodeName.toLowerCase();
								if (elemNodeName == "input"
								|| elemNodeName == "select"
								|| elemNodeName == "option"
								|| elemNodeName == "textarea") {
									self.ElementObj.value = self.Response;
								} else {
									self.ElementObj.innerHTML = self.Response;
								}
							}
							if (self.ResponseStatus[0] == "200") {
								self.onCompletion();
							} else {
								self.onError();
							}

							self.QueryString = "";
							break;
					}
				};

				this.xmlhttp.send(this.QueryString);
			}
		}
	};

	this.DebugAJAX = function(urlstring) {
		this.CreateQueryString(urlstring);
		if (this.xmlhttp) {
			var self = this;
			if (this.Method == "GET") {
				self.RequestUri = this.RequestFile + this.QueryStringSeparator + this.QueryString;
				alert("Method: " + this.Method + "\nRequest: " + self.RequestUri);
			} else {
				self.RequestUri = this.RequestFile;
				alert("Method: " + this.Method + "\nRequest: " + self.RequestUri + "\nPost: " + this.QueryString);
			}
		}
	};

	this.CreateXMLDoc = function (XMLFile) {
		// code for IE
		if (window.ActiveXObject){
			xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
			xmlDoc.loadXML(XMLFile);
		// code for Mozilla, Firefox, Opera, etc.
		} else if (document.implementation && document.implementation.createDocument){
			//xmlDoc = document.implementation.createDocument("", "", null);
			var parser = new DOMParser();
			var xmlDoc = parser.parseFromString(XMLFile, "text/xml");
		} else {
			//alert('Your browser cannot handle this script.');
			this.onError();
		}

		return(xmlDoc);
	};

	this.GetNodeValue = function(xmlDoc, tagName, index) {
		if (xmlDoc.getElementsByTagName(tagName)[index].childNodes[0] != null){
			return xmlDoc.getElementsByTagName(tagName)[index].childNodes[0].nodeValue;
		}else
			return '';
	};

	this.Reset();
	this.CreateAJAX();
}