/* Adobe Touch Clarity / Test & Target 
 * Copyright (c) Adobe Omniture 2001-20014. All rights reserved. 
 ************************** CONFIG SECTION **************************/
/* 2012-06-07 - Custom code for global mbox and signal click    */
/* 2014-08-06 - Extend mbox cookie expiration to 90 days        */

//Only run if mBox.js isn't hardcoded on page

if (!window.mboxFactoryDefault) {
var mboxCopyright = "Copyright 1996-2013. Adobe Systems Incorporated. All rights reserved.";var TNT = TNT || {};TNT.a = TNT.a || {};TNT.getGlobalMboxName = function () { return "target-global-mbox";};TNT.getGlobalMboxLocation = function () { return "";};TNT.isAutoCreateGlobalMbox = function () { return false;};TNT.a.b = function () { var c = {}.toString; var d = window.targetPageParams; var e = ""; var f = []; if (typeof(d) != 'undefined' && c.call(d) === '[object Function]') { try { e = d(); } catch (g) { } if (e.length > 0) { f = e.split("&"); for (var i = 0; i < f.length; i++) { f[i] = decodeURIComponent(f[i]); } } } return f;};mboxUrlBuilder = function(h, i) { this.h = h; this.i = i; this.j = new Array(); this.k = function(l) { return l; }; this.m = null;};mboxUrlBuilder.prototype.addNewParameter = function (n, o) { this.j.push({name: n, value: o}); return this;};mboxUrlBuilder.prototype.addParameterIfAbsent = function (n, o) { if (o) { for (var p = 0; p < this.j.length; p++) { var q = this.j[p]; if (q.name === n) { return this; } } this.checkInvalidCharacters(n); return this.addNewParameter(n, o); }};mboxUrlBuilder.prototype.addParameter = function(n, o) { this.checkInvalidCharacters(n); for (var p = 0; p < this.j.length; p++) { var q = this.j[p]; if (q.name === n) { q.value = o; return this; } } return this.addNewParameter(n, o);};mboxUrlBuilder.prototype.addParameters = function(j) { if (!j) { return this; } for (var p = 0; p < j.length; p++) { var r = j[p].indexOf('='); if (r == -1 || r == 0) { continue; } this.addParameter(j[p].substring(0, r), j[p].substring(r + 1, j[p].length)); } return this;};mboxUrlBuilder.prototype.setServerType = function(s) { this.t = s;};mboxUrlBuilder.prototype.setBasePath = function(m) { this.m = m;};mboxUrlBuilder.prototype.setUrlProcessAction = function(u) { this.k = u;};mboxUrlBuilder.prototype.buildUrl = function() { var v = this.m ? this.m : '/m2/' + this.i + '/mbox/' + this.t; var w = document.location.protocol == 'file:' ? 'http:' : document.location.protocol; var l = w + "//" + this.h + v; var x = l.indexOf('?') != -1 ? '&' : '?'; for (var p = 0; p < this.j.length; p++) { var q = this.j[p]; l += x + encodeURIComponent(q.name) + '=' + encodeURIComponent(q.value); x = '&'; } return this.y(this.k(l));};mboxUrlBuilder.prototype.getParameters = function() { return this.j;};mboxUrlBuilder.prototype.setParameters = function(j) { this.j = j;};mboxUrlBuilder.prototype.clone = function() { var z = new mboxUrlBuilder(this.h, this.i); z.setServerType(this.t); z.setBasePath(this.m); z.setUrlProcessAction(this.k); for (var p = 0; p < this.j.length; p++) { z.addParameter(this.j[p].name, this.j[p].value); } return z;};mboxUrlBuilder.prototype.y = function(A) { return A.replace(/\"/g, '&quot;').replace(/>/g, '&gt;');}; mboxUrlBuilder.prototype.checkInvalidCharacters = function (n) { var B = new RegExp('(\'|")'); if (B.exec(n)) { throw "Parameter '" + n + "' contains invalid characters"; } };mboxStandardFetcher = function() { };mboxStandardFetcher.prototype.getType = function() { return 'standard';};mboxStandardFetcher.prototype.fetch = function(C) { C.setServerType(this.getType()); document.write('<' + 'scr' + 'ipt src="' + C.buildUrl() + '" language="JavaScript"><' + '\/scr' + 'ipt>');};mboxStandardFetcher.prototype.cancel = function() { };mboxAjaxFetcher = function() { };mboxAjaxFetcher.prototype.getType = function() { return 'ajax';};mboxAjaxFetcher.prototype.fetch = function(C) { C.setServerType(this.getType()); var l = C.buildUrl(); this.D = document.createElement('script'); this.D.src = l; document.body.appendChild(this.D);};mboxAjaxFetcher.prototype.cancel = function() { };mboxMap = function() { this.E = new Object(); this.F = new Array();};mboxMap.prototype.put = function(G, o) { if (!this.E[G]) { this.F[this.F.length] = G; } this.E[G] = o;};mboxMap.prototype.get = function(G) { return this.E[G];};mboxMap.prototype.remove = function(G) { this.E[G] = undefined; var H = []; for (var i = 0; i < this.F.length; i++) { if (this.F[i] !== G) { H.push(this.F[i]) } } this.F = H;};mboxMap.prototype.each = function(u) { for (var p = 0; p < this.F.length; p++ ) { var G = this.F[p]; var o = this.E[G]; if (o) { var I = u(G, o); if (I === false) { break; } } }};mboxMap.prototype.isEmpty = function() { return this.F.length === 0;};mboxFactory = function(J, i, K) { this.L = false; this.J = J; this.K = K; this.M = new mboxList(); mboxFactories.put(K, this); this.N = typeof document.createElement('div').replaceChild != 'undefined' && (function() { return true; })() && typeof document.getElementById != 'undefined' && typeof (window.attachEvent || document.addEventListener || window.addEventListener) != 'undefined' && typeof encodeURIComponent != 'undefined'; this.O = this.N && mboxGetPageParameter('mboxDisable') == null; var P = K == 'default'; this.Q = new mboxCookieManager( 'mbox' + (P ? '' : ('-' + K)), (function() { return mboxCookiePageDomain(); })()); this.O = this.O && this.Q.isEnabled() && (this.Q.getCookie('disable') == null); if (this.isAdmin()) { this.enable(); } this.R(); this.S = mboxGenerateId(); this.T = mboxScreenHeight(); this.U = mboxScreenWidth(); this.V = mboxBrowserWidth(); this.W = mboxBrowserHeight(); this.X = mboxScreenColorDepth(); this.Y = mboxBrowserTimeOffset(); this.Z = new mboxSession(this.S, 'mboxSession', 'session', 31 * 60, this.Q); this._ = new mboxPC('PC', 7776000, this.Q); this.C = new mboxUrlBuilder(J, i); this.ab(this.C, P); this.bb = new Date().getTime(); this.cb = this.bb; var db = this; this.addOnLoad(function() { db.cb = new Date().getTime(); }); if (this.N) { this.addOnLoad(function() { db.L = true; db.getMboxes().each(function(eb) { eb.setFetcher(new mboxAjaxFetcher()); eb.finalize(); }); }); if (this.O) { this.limitTraffic(100, 10368000); this.fb(); this.gb = new mboxSignaler(function(hb, j) { return db.create(hb, j); }, this.Q); } }};mboxFactory.prototype.isEnabled = function() { return this.O;};mboxFactory.prototype.getDisableReason = function() { return this.Q.getCookie('disable');};mboxFactory.prototype.isSupported = function() { return this.N;};mboxFactory.prototype.disable = function(ib, jb) { if (typeof ib == 'undefined') { ib = 60 * 60; } if (typeof jb == 'undefined') { jb = 'unspecified'; } if (!this.isAdmin()) { this.O = false; this.Q.setCookie('disable', jb, ib); }};mboxFactory.prototype.enable = function() { this.O = true; this.Q.deleteCookie('disable');};mboxFactory.prototype.isAdmin = function() { return document.location.href.indexOf('mboxEnv') != -1;};mboxFactory.prototype.limitTraffic = function(kb, ib) {};mboxFactory.prototype.addOnLoad = function(lb) { if (this.isDomLoaded()) { lb(); } else { var mb = false; var nb = function() { if (mb) { return; } mb = true; lb(); }; this.ob.push(nb); if (this.isDomLoaded() && !mb) { nb(); } }};mboxFactory.prototype.getEllapsedTime = function() { return this.cb - this.bb;};mboxFactory.prototype.getEllapsedTimeUntil = function(pb) { return pb - this.bb;};mboxFactory.prototype.getMboxes = function() { return this.M;};mboxFactory.prototype.get = function(hb, qb) { return this.M.get(hb).getById(qb || 0);};mboxFactory.prototype.update = function(hb, j) { if (!this.isEnabled()) { return; } if (!this.isDomLoaded()) { var db = this; this.addOnLoad(function() { db.update(hb, j); }); return; } if (this.M.get(hb).length() == 0) { throw "Mbox " + hb + " is not defined"; } this.M.get(hb).each(function(eb) { eb.getUrlBuilder().addParameter('mboxPage', mboxGenerateId()); mboxFactoryDefault.setVisitorIdParameters(eb.getUrlBuilder(), hb); eb.load(j); });};mboxFactory.prototype.setVisitorIdParameters = function(l, hb) { var imsOrgId = 'A9893BC75245B1D70A490D4D@AdobeOrg'; if (typeof Visitor == 'undefined' || imsOrgId.length == 0) { return; } var visitor = Visitor.getInstance(imsOrgId); if (visitor.isAllowed()) { var addVisitorValueToUrl = function(param, getter, mboxName) { if (visitor[getter]) { var callback = function(value) { if (value) { l.addParameter(param, value); } }; var value; if (typeof mboxName != 'undefined') { value = visitor[getter]("mbox:" + mboxName); } else { value = visitor[getter](callback); } callback(value); } }; addVisitorValueToUrl('mboxMCGVID', "getMarketingCloudVisitorID"); addVisitorValueToUrl('mboxMCGLH', "getAudienceManagerLocationHint"); addVisitorValueToUrl('mboxAAMB', "getAudienceManagerBlob"); addVisitorValueToUrl('mboxMCAVID', "getAnalyticsVisitorID"); addVisitorValueToUrl('mboxMCSDID', "getSupplementalDataID", hb); }};mboxFactory.prototype.create = function( hb, j, rb) { if (!this.isSupported()) { return null; } var l = this.C.clone(); l.addParameter('mboxCount', this.M.length() + 1); l.addParameters(j); this.setVisitorIdParameters(l, hb); var qb = this.M.get(hb).length(); var sb = this.K + '-' + hb + '-' + qb; var tb; if (rb) { tb = new mboxLocatorNode(rb); } else { if (this.L) { throw 'The page has already been loaded, can\'t write marker'; } tb = new mboxLocatorDefault(sb); } try { var db = this; var ub = 'mboxImported-' + sb; var eb = new mbox(hb, qb, l, tb, ub); if (this.O) { eb.setFetcher( this.L ? new mboxAjaxFetcher() : new mboxStandardFetcher()); } eb.setOnError(function(vb, s) { eb.setMessage(vb); eb.activate(); if (!eb.isActivated()) { db.disable(60 * 60, vb); } }); this.M.add(eb); } catch (wb) { this.disable(); throw 'Failed creating mbox "' + hb + '", the error was: ' + wb; } var xb = new Date(); l.addParameter('mboxTime', xb.getTime() - (xb.getTimezoneOffset() * 60000)); return eb;};mboxFactory.prototype.getCookieManager = function() { return this.Q;};mboxFactory.prototype.getPageId = function() { return this.S;};mboxFactory.prototype.getPCId = function() { return this._;};mboxFactory.prototype.getSessionId = function() { return this.Z;};mboxFactory.prototype.getSignaler = function() { return this.gb;};mboxFactory.prototype.getUrlBuilder = function() { return this.C;};mboxFactory.prototype.ab = function(l, P) { l.addParameter('mboxHost', document.location.hostname) .addParameter('mboxSession', this.Z.getId()); if (!P) { l.addParameter('mboxFactoryId', this.K); } if (this._.getId() != null) { l.addParameter('mboxPC', this._.getId()); } l.addParameter('mboxPage', this.S); l.addParameter('screenHeight', this.T); l.addParameter('screenWidth', this.U); l.addParameter('browserWidth', this.V); l.addParameter('browserHeight', this.W); l.addParameter('browserTimeOffset', this.Y); l.addParameter('colorDepth', this.X); l.addParameter('mboxXDomain', "enabled"); l.setUrlProcessAction(function(l) { l += '&mboxURL=' + encodeURIComponent(document.location); var yb = encodeURIComponent(document.referrer); if (l.length + yb.length < 2000) { l += '&mboxReferrer=' + yb; } l += '&mboxVersion=' + mboxVersion; return l; });};mboxFactory.prototype.zb = function() { return "";};mboxFactory.prototype.fb = function() { document.write('<style>.' + 'mboxDefault' + ' { visibility:hidden; }</style>');};mboxFactory.prototype.isDomLoaded = function() { return this.L;};mboxFactory.prototype.R = function() { if (this.ob != null) { return; } this.ob = new Array(); var db = this; (function() { var Ab = document.addEventListener ? "DOMContentLoaded" : "onreadystatechange"; var Bb = false; var Cb = function() { if (Bb) { return; } Bb = true; for (var i = 0; i < db.ob.length; ++i) { db.ob[i](); } }; if (document.addEventListener) { document.addEventListener(Ab, function() { document.removeEventListener(Ab, arguments.callee, false); Cb(); }, false); window.addEventListener("load", function(){ document.removeEventListener("load", arguments.callee, false); Cb(); }, false); } else if (document.attachEvent) { if (self !== self.top) { document.attachEvent(Ab, function() { if (document.readyState === 'complete') { document.detachEvent(Ab, arguments.callee); Cb(); } }); } else { var Db = function() { try { document.documentElement.doScroll('left'); Cb(); } catch (Eb) { setTimeout(Db, 13); } }; Db(); } } if (document.readyState === "complete") { Cb(); } })();};mboxSignaler = function(Fb, Q) { this.Q = Q; var Gb = Q.getCookieNames('signal-'); for (var p = 0; p < Gb.length; p++) { var Hb = Gb[p]; var Ib = Q.getCookie(Hb).split('&'); var eb = Fb(Ib[0], Ib); eb.load(); Q.deleteCookie(Hb); }};mboxSignaler.prototype.signal = function(Jb, hb ) { this.Q.setCookie('signal-' + Jb, mboxShiftArray(arguments).join('&'), 45 * 60);};mboxList = function() { this.M = new Array();};mboxList.prototype.add = function(eb) { if (eb != null) { this.M[this.M.length] = eb; }};mboxList.prototype.get = function(hb) { var I = new mboxList(); for (var p = 0; p < this.M.length; p++) { var eb = this.M[p]; if (eb.getName() == hb) { I.add(eb); } } return I;};mboxList.prototype.getById = function(Kb) { return this.M[Kb];};mboxList.prototype.length = function() { return this.M.length;};mboxList.prototype.each = function(u) { if (typeof u !== 'function') { throw 'Action must be a function, was: ' + typeof(u); } for (var p = 0; p < this.M.length; p++) { u(this.M[p]); }};mboxList.prototype.findFirst = function(Lb) { if (typeof Lb !== 'function') { throw 'MatchingFunction must be a function, was: ' + typeof(Lb); } for (var p = 0; p < this.M.length; p++) { if (Lb(this.M[p])) { return this.M[p]; } } return void 0;};mboxLocatorDefault = function(n) { this.n = 'mboxMarker-' + n; document.write('<div id="' + this.n + '" style="visibility:hidden;display:none">&nbsp;</div>');};mboxLocatorDefault.prototype.locate = function() { var Mb = document.getElementById(this.n); while (Mb != null) { if (Mb.nodeType == 1) { if (Mb.className == 'mboxDefault') { return Mb; } } Mb = Mb.previousSibling; } return null;};mboxLocatorDefault.prototype.force = function() { var Nb = document.createElement('div'); Nb.className = 'mboxDefault'; var Ob = document.getElementById(this.n); Ob.parentNode.insertBefore(Nb, Ob); return Nb;};mboxLocatorNode = function(Pb) { this.Mb = Pb;};mboxLocatorNode.prototype.locate = function() { return typeof this.Mb == 'string' ? document.getElementById(this.Mb) : this.Mb;};mboxLocatorNode.prototype.force = function() { return null;};mboxCreate = function(hb ) { var eb = mboxFactoryDefault.create( hb, mboxShiftArray(arguments)); if (eb) { eb.load(); } return eb;};mboxDefine = function(rb, hb ) { var eb = mboxFactoryDefault.create(hb, mboxShiftArray(mboxShiftArray(arguments)), rb); return eb;};mboxUpdate = function(hb ) { mboxFactoryDefault.update(hb, mboxShiftArray(arguments));};mbox = function(n, Qb, C, Rb, ub) { this.Sb = null; this.Tb = 0; this.tb = Rb; this.ub = ub; this.Ub = null; this.Vb = new mboxOfferContent(); this.Nb = null; this.C = C; this.message = ''; this.Wb = new Object(); this.Xb = 0; this.Qb = Qb; this.n = n; this.Yb(); C.addParameter('mbox', n) .addParameter('mboxId', Qb); this.Zb = function() {}; this._b = function() {}; this.ac = null;};mbox.prototype.getId = function() { return this.Qb;};mbox.prototype.Yb = function() { if (this.n.length > 250) { throw "Mbox Name " + this.n + " exceeds max length of " + "250 characters."; } else if (this.n.match(/^\s+|\s+$/g)) { throw "Mbox Name " + this.n + " has leading/trailing whitespace(s)."; }};mbox.prototype.getName = function() { return this.n;};mbox.prototype.getParameters = function() { var j = this.C.getParameters(); var I = new Array(); for (var p = 0; p < j.length; p++) { if (j[p].name.indexOf('mbox') != 0) { I[I.length] = j[p].name + '=' + j[p].value; } } return I;};mbox.prototype.setOnLoad = function(u) { this._b = u; return this;};mbox.prototype.setMessage = function(vb) { this.message = vb; return this;};mbox.prototype.setOnError = function(Zb) { this.Zb = Zb; return this;};mbox.prototype.setFetcher = function(bc) { if (this.Ub) { this.Ub.cancel(); } this.Ub = bc; return this;};mbox.prototype.getFetcher = function() { return this.Ub;};mbox.prototype.load = function(j) { if (this.Ub == null) { return this; } this.setEventTime("load.start"); this.cancelTimeout(); this.Tb = 0; var C = (j && j.length > 0) ? this.C.clone().addParameters(j) : this.C; this.Ub.fetch(C); var db = this; this.cc = setTimeout(function() { db.Zb('browser timeout', db.Ub.getType()); }, 12000); this.setEventTime("load.end"); return this;};mbox.prototype.loaded = function() { this.cancelTimeout(); if (!this.activate()) { var db = this; setTimeout(function() { db.loaded(); }, 100); }};mbox.prototype.activate = function() { if (this.Tb) { return this.Tb; } this.setEventTime('activate' + ++this.Xb + '.start'); if (this.show()) { this.cancelTimeout(); this.Tb = 1; } this.setEventTime('activate' + this.Xb + '.end'); return this.Tb;};mbox.prototype.isActivated = function() { return this.Tb;};mbox.prototype.setOffer = function(Vb) { if (Vb && Vb.show && Vb.setOnLoad) { this.Vb = Vb; } else { throw 'Invalid offer'; } return this;};mbox.prototype.getOffer = function() { return this.Vb;};mbox.prototype.show = function() { this.setEventTime('show.start'); var I = this.Vb.show(this); this.setEventTime(I == 1 ? "show.end.ok" : "show.end"); return I;};mbox.prototype.showContent = function(dc) { if (dc == null) { return 0; } if (this.Nb == null || !this.Nb.parentNode) { this.Nb = this.getDefaultDiv(); if (this.Nb == null) { return 0; } } if (this.Nb != dc) { this.ec(this.Nb); this.Nb.parentNode.replaceChild(dc, this.Nb); this.Nb = dc; } this.fc(dc); this._b(); return 1;};mbox.prototype.hide = function() { this.setEventTime('hide.start'); var I = this.showContent(this.getDefaultDiv()); this.setEventTime(I == 1 ? 'hide.end.ok' : 'hide.end.fail'); return I;};mbox.prototype.finalize = function() { this.setEventTime('finalize.start'); this.cancelTimeout(); if (this.getDefaultDiv() == null) { if (this.tb.force() != null) { this.setMessage('No default content, an empty one has been added'); } else { this.setMessage('Unable to locate mbox'); } } if (!this.activate()) { this.hide(); this.setEventTime('finalize.end.hide'); } this.setEventTime('finalize.end.ok');};mbox.prototype.cancelTimeout = function() { if (this.cc) { clearTimeout(this.cc); } if (this.Ub != null) { this.Ub.cancel(); }};mbox.prototype.getDiv = function() { return this.Nb;};mbox.prototype.getDefaultDiv = function() { if (this.ac == null) { this.ac = this.tb.locate(); } return this.ac;};mbox.prototype.setEventTime = function(gc) { this.Wb[gc] = (new Date()).getTime();};mbox.prototype.getEventTimes = function() { return this.Wb;};mbox.prototype.getImportName = function() { return this.ub;};mbox.prototype.getURL = function() { return this.C.buildUrl();};mbox.prototype.getUrlBuilder = function() { return this.C;};mbox.prototype.hc = function(Nb) { return Nb.style.display != 'none';};mbox.prototype.fc = function(Nb) { this.ic(Nb, true);};mbox.prototype.ec = function(Nb) { this.ic(Nb, false);};mbox.prototype.ic = function(Nb, jc) { Nb.style.visibility = jc ? "visible" : "hidden"; Nb.style.display = jc ? "block" : "none";};mboxOfferContent = function() { this._b = function() {};};mboxOfferContent.prototype.show = function(eb) { var I = eb.showContent(document.getElementById(eb.getImportName())); if (I == 1) { this._b(); } return I;};mboxOfferContent.prototype.setOnLoad = function(_b) { this._b = _b;};mboxOfferAjax = function(dc) { this.dc = dc; this._b = function() {};};mboxOfferAjax.prototype.setOnLoad = function(_b) { this._b = _b;};mboxOfferAjax.prototype.show = function(eb) { var kc = document.createElement('div'); kc.id = eb.getImportName(); kc.innerHTML = this.dc; var I = eb.showContent(kc); if (I == 1) { this._b(); } return I;};mboxOfferDefault = function() { this._b = function() {};};mboxOfferDefault.prototype.setOnLoad = function(_b) { this._b = _b;};mboxOfferDefault.prototype.show = function(eb) { var I = eb.hide(); if (I == 1) { this._b(); } return I;};mboxCookieManager = function mboxCookieManager(n, lc) { this.n = n; this.lc = lc == '' || lc.indexOf('.') == -1 ? '' : '; domain=' + lc; this.mc = new mboxMap(); this.loadCookies();};mboxCookieManager.prototype.isEnabled = function() { this.setCookie('check', 'true', 60); this.loadCookies(); return this.getCookie('check') == 'true';};mboxCookieManager.prototype.setCookie = function(n, o, ib) { if (typeof n != 'undefined' && typeof o != 'undefined' && typeof ib != 'undefined') { var nc = new Object(); nc.name = n; nc.value = escape(o); nc.expireOn = Math.ceil(ib + new Date().getTime() / 1000); this.mc.put(n, nc); this.saveCookies(); }};mboxCookieManager.prototype.getCookie = function(n) { var nc = this.mc.get(n); return nc ? unescape(nc.value) : null;};mboxCookieManager.prototype.deleteCookie = function(n) { this.mc.remove(n); this.saveCookies();};mboxCookieManager.prototype.getCookieNames = function(oc) { var pc = new Array(); this.mc.each(function(n, nc) { if (n.indexOf(oc) == 0) { pc[pc.length] = n; } }); return pc;};mboxCookieManager.prototype.saveCookies = function() { var qc = false; var rc = 'disable'; var sc = new Array(); var tc = 0; this.mc.each(function(n, nc) { if(!qc || n === rc) { sc[sc.length] = n + '#' + nc.value + '#' + nc.expireOn; if (tc < nc.expireOn) { tc = nc.expireOn; } } }); var uc = new Date(tc * 1000); document.cookie = this.n + '=' + sc.join('|') + '; expires=' + uc.toGMTString() + '; path=/' + this.lc;};mboxCookieManager.prototype.loadCookies = function() { this.mc = new mboxMap(); var vc = document.cookie.indexOf(this.n + '='); if (vc != -1) { var wc = document.cookie.indexOf(';', vc); if (wc == -1) { wc = document.cookie.indexOf(',', vc); if (wc == -1) { wc = document.cookie.length; } } var xc = document.cookie.substring( vc + this.n.length + 1, wc).split('|'); var yc = Math.ceil(new Date().getTime() / 1000); for (var p = 0; p < xc.length; p++) { var nc = xc[p].split('#'); if (yc <= nc[2]) { var zc = new Object(); zc.name = nc[0]; zc.value = nc[1]; zc.expireOn = nc[2]; this.mc.put(zc.name, zc); } } }};mboxSession = function(Ac, Bc, Hb, Cc, Q) { this.Bc = Bc; this.Hb = Hb; this.Cc = Cc; this.Q = Q; this.Dc = false; this.Qb = typeof mboxForceSessionId != 'undefined' ? mboxForceSessionId : mboxGetPageParameter(this.Bc); if (this.Qb == null || this.Qb.length == 0) { this.Qb = Q.getCookie(Hb); if (this.Qb == null || this.Qb.length == 0) { this.Qb = Ac; this.Dc = true; } } Q.setCookie(Hb, this.Qb, Cc);};mboxSession.prototype.getId = function() { return this.Qb;};mboxSession.prototype.forceId = function(Ec) { this.Qb = Ec; this.Q.setCookie(this.Hb, this.Qb, this.Cc);};mboxPC = function(Hb, Cc, Q) { this.Hb = Hb; this.Cc = Cc; this.Q = Q; this.Qb = typeof mboxForcePCId != 'undefined' ? mboxForcePCId : Q.getCookie(Hb); if (this.Qb != null) { Q.setCookie(Hb, this.Qb, Cc); }};mboxPC.prototype.getId = function() { return this.Qb;};mboxPC.prototype.forceId = function(Ec) { if (this.Qb != Ec) { this.Qb = Ec; this.Q.setCookie(this.Hb, this.Qb, this.Cc); return true; } return false;};mboxGetPageParameter = function(n) { var I = null; var Fc = new RegExp(n + "=([^\&]*)"); var Gc = Fc.exec(document.location); if (Gc != null && Gc.length >= 2) { I = Gc[1]; } return I;};mboxSetCookie = function(n, o, ib) { return mboxFactoryDefault.getCookieManager().setCookie(n, o, ib);};mboxGetCookie = function(n) { return mboxFactoryDefault.getCookieManager().getCookie(n);};mboxCookiePageDomain = function() { var lc = (/([^:]*)(:[0-9]{0,5})?/).exec(document.location.host)[1]; var Hc = /[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/; if (!Hc.exec(lc)) { var Ic = (/([^\.]+\.[^\.]{3}|[^\.]+\.[^\.]+\.[^\.]{2})$/).exec(lc); if (Ic) { lc = Ic[0]; } } return lc ? lc: "";};mboxShiftArray = function(Jc) { var I = new Array(); for (var p = 1; p < Jc.length; p++) { I[I.length] = Jc[p]; } return I;};mboxGenerateId = function() { return (new Date()).getTime() + "-" + Math.floor(Math.random() * 999999);};mboxScreenHeight = function() { return screen.height;};mboxScreenWidth = function() { return screen.width;};mboxBrowserWidth = function() { return (window.innerWidth) ? window.innerWidth : document.documentElement ? document.documentElement.clientWidth : document.body.clientWidth;};mboxBrowserHeight = function() { return (window.innerHeight) ? window.innerHeight : document.documentElement ? document.documentElement.clientHeight : document.body.clientHeight;};mboxBrowserTimeOffset = function() { return -new Date().getTimezoneOffset();};mboxScreenColorDepth = function() { return screen.pixelDepth;};if (typeof mboxVersion == 'undefined') { var mboxVersion = 48; var mboxFactories = new mboxMap(); var mboxFactoryDefault = new mboxFactory('bankofamerica.tt.omtrdc.net', 'bankofamerica', 'default');};if (mboxGetPageParameter("mboxDebug") != null || mboxFactoryDefault.getCookieManager() .getCookie("debug") != null) { setTimeout(function() { if (typeof mboxDebugLoaded == 'undefined') { alert('Could not load the remote debug.\nPlease check your connection' + ' to Test&amp;Target servers'); } }, 60*60); document.write('<' + 'scr' + 'ipt language="Javascript1.2" src=' + '"http://admin16.testandtarget.omniture.com/admin/mbox/mbox_debug.jsp?mboxServerHost=bankofamerica.tt.omtrdc.net' + '&clientCode=bankofamerica"><' + '\/scr' + 'ipt>');};mboxVizTargetUrl = function(hb ) { if (!mboxFactoryDefault.isEnabled()) { return; } var C = mboxFactoryDefault.getUrlBuilder().clone(); C.setBasePath('/m2/' + 'bankofamerica' + '/viztarget'); C.addParameter('mbox', hb); C.addParameter('mboxId', 0); C.addParameter('mboxCount', mboxFactoryDefault.getMboxes().length() + 1); var xb = new Date(); C.addParameter('mboxTime', xb.getTime() - (xb.getTimezoneOffset() * 60000)); C.addParameter('mboxPage', mboxGenerateId()); var j = mboxShiftArray(arguments); if (j && j.length > 0) { C.addParameters(j); } C.addParameter('mboxDOMLoaded', mboxFactoryDefault.isDomLoaded()); mboxFactoryDefault.setVisitorIdParameters(C, hb); return C.buildUrl();};TNT.createGlobalMbox = function () { var Kc = "target-global-mbox"; var Lc = ("".length === 0); var Mc = ""; var Nc; if (Lc) { Mc = "mbox-" + Kc + "-" + mboxGenerateId(); Nc = document.createElement("div"); Nc.className = "mboxDefault"; Nc.id = Mc; Nc.style.visibility = "hidden"; Nc.style.display = "none"; mboxFactoryDefault.addOnLoad(function(){ document.body.insertBefore(Nc, document.body.firstChild); }); } var Oc = mboxFactoryDefault.create(Kc, TNT.a.b(), Mc); if (Oc != null) { Oc.load(); }};

var xCr = mboxCreate, 
mboxCreate = function() {
 var argArray = Array.prototype.slice.call(arguments);
 if (argArray.join("&").indexOf('&ubox=') != -1) {
 uboxCreate.apply({},argArray);
 } else {
 xCr.apply({},argArray);
 }
},
uboxCreate = function(mboxName) {
 var params = Array.prototype.slice.call(arguments,1);
 if (mboxFactoryDefault.getPCId().getId() == null) {
 if (!uboxCreate.triedToEstablishPCID) {
	 	uboxCreate.triedToEstablishPCID = true;
 	 	mboxDefine("mboxId" + Math.ceil(Math.random() * 999999),"PCID_null");
	 	mboxUpdate("PCID_null");	
 }
	params.splice(0,0,mboxName);
	setTimeout(function() { uboxCreate.apply({},params); }, 300 );
 } else {
	var rawbox = document.createElement('script');
 rawbox.type = "text/javascript";
 rawbox.src = '//bankofamerica.tt.omtrdc.net/m2/bankofamerica/ubox/raw' +
		'?mbox=' + mboxName +
	 (params.length > 0 ? '&' + params.join('&') : "") +
	 '&mboxXDomain=disabled&' +
	 'mboxContentType=text%2Fjavascript' +
	 '&mboxURL=' + escape(location.toString()) +
	 '&mboxSession=' + mboxFactoryDefault.getSessionId().getId() +
	 '&mboxPC=' + mboxFactoryDefault.getPCId().getId() +
	 '&mboxHost=' + location.hostname +
	 '&mboxDefault=' + encodeURIComponent(window.location.protocol) + '%2F%2Fomniture.secure.miisolutions.net%2Fboa%2Fubox%2Fdefault.js';
 var container = document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0];
 if (container) container.appendChild(rawbox);
 if (div = document.getElementById(mboxName)) div.style.visibility = "visible";
 }
}
uboxCreate.triedToEstablishPCID = false;
}

mboxFactory.prototype.setDomLoaded = function(override) {
	if (typeof(override)=="undefined")
		this.L = true;
	else
		this.L = (override==true);	
};



/**  THROTTLE CONTROL HERE          **/
/**  Configurable throttle values below **/

var throttle_percent_ngen = 100;
var throttle_percent_olb = 100;




// Default values
tc_logging_active = false;
if (typeof throttle_caller == 'undefined') {
	throttle_caller = "ngen";
}

function randomNumber() {
	var num = Math.floor(Math.random()*100+1);
	return num;
}

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/; domain=bankofamerica.com; ";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

// Create or update throttle cookie
var x = readCookie('throttle_value');

if (x == null) {
	createCookie('throttle_value', randomNumber(), 730);
	var x = readCookie('throttle_value');
} else {
	createCookie('throttle_value', x, 730);
	var x = readCookie('throttle_value');
}

// Enable tracking for NGEN
if (throttle_caller == 'ngen' && !isNaN(parseInt(x)) && x <= throttle_percent_ngen) {
	tc_logging_active = true;
} 

// Enable tracking for OLB
if (throttle_caller == 'olb' && !isNaN(parseInt(x)) && x <= throttle_percent_olb) {
	tc_logging_active = true;
} 

if (tc_logging_active) {

//  Get the current baseline page URL
		var windowURL = window.location.href
		    windowURL = windowURL.slice( windowURL.indexOf('.')+1);
			windowURL = windowURL.split( '?' )[0];
			windowURL = windowURL.toLowerCase();
			//alert(windowURL);
		if (
			
		    //If no mboxes on page, mbox count will be < 1
		    (mboxFactoryDefault.getMboxes().length() < 1) &&  
			
			//Also check for high-volume pages that do not need global logging
			(windowURL != "bankofamerica.com/myaccounts/brain/redirect.go") &&
			(windowURL != "bankofamerica.com/myaccounts/signin/signin.go") &&
			(windowURL != "bankofamerica.com/login/sign-in/signon.go") &&
			(windowURL != "bankofamerica.com/login/sign-in/entry/signon.go") &&
			(windowURL != "bankofamerica.com/login/sign-in/signonscreen.go") &&
			(windowURL != "bankofamerica.com/login/sign-in/validatechallengeanswer.go") &&
			(windowURL != "bankofamerica.com/login/sign-in/validatePassword.go")&&
			(windowURL != "ecnp.bankofamerica.com/myaccounts/details/deposit/account-details.go")&&
			(windowURL != "bankofamerica.com/myaccounts/details/deposit/account-details.go")&&
			(windowURL != "ecnp.bankofamerica.com/myaccounts/brain/redirect.go")&&
			(windowURL != "bankofamerica.com/myaccounts/brain/redirect.go")&&
			(windowURL != "bankofamerica.com/mobile/banking.go")&&
			(windowURL != "bankofamerica.com/content/preload/olb-myaccount-preload-jawr-module.htm")
			)
		{

			var mboxDiv = document.createElement("div");
			mboxDiv.id = "adobe_touch_clarity_replacement";
			mboxDiv.style.display = "none";
			if (document.body && document.body.firstChild) document.body.insertBefore(mboxDiv,document.body.firstChild);
			mboxDefine(mboxDiv.id,'bac_global_bottom');
			mboxUpdate('bac_global_bottom');
	    }

}

