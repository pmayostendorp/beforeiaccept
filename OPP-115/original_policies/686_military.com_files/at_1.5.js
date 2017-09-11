// media server location is http://media.monster.com/js/global/at_1.0.js
/*
* because some pages using lazy load to construct namespaces and we need this object
* very soon, next line is hack to use global namespace _m
*/
if (typeof _m == 'undefined') { _m = {}; }
_m.ATM = {
    initialConfig: [],
    configs: [],
    configsOnLoad: [],
    properties: {},
    runOnLoad: false,
    pageName: '',
    appConfig: {},
    s: null,
    configsInitialized: false,
    customCodes: [],

    registerConfig: function (config) {
        if (typeof config.o == "undefined") {
            config.o = "o";
        }
        if (typeof config.jQuerySelector == "undefined") {
            config.jQuerySelector = "";
        }
        if (typeof config.attributeName == "undefined") {
            config.attributeName = "";
        }
        if (typeof config.vars == "undefined") {
            config.vars = [];
        }
        if (typeof config.eventType == "undefined") {
            config.eventType = "mousedown";
        }
        if (typeof config.eventName == "undefined") {
            config.eventName = "";
        }
        config.eventName = config.eventName == "" ? "unspecified" : config.eventName;
        
        if(typeof config.adobeDoneAction == "undefined") {
            config.adobeDoneAction = "";
        }

        if (this.configsInitialized) {
            if (config.eventType == "initmanager") {
                this.atCall(config.jQuerySelector, config.o, config.eventName, config.vars, config.adobeDoneAction);
            } else {
                this.attachConfig(config);
            }
        } else {
            if (config.eventType == "initmanager") {
                this.configsOnLoad.push(config);
            } else {
                this.configs.push(config);
            }
        }
    },

    registerCustomCode: function (fn) {
        if (this.configsInitialized) {
            fn();
        } else {
            this.customCodes.push(fn);
        }
    },
    
    selectElements: function (selector) {
        return jQuery(selector);
    },

    attachToEvent: function (elements, eventType, fn) {
        if (typeof (jQuery.fn.on) != "undefined") {
            elements.on(eventType, fn);
        } else if (typeof (jQuery.fn.live) != "undefined") {
            elements.live(eventType, fn);
        }
    },

    attachConfig: function (config) {
        var elements = this.selectElements(config.jQuerySelector);
        var innerATM = this;
        this.attachToEvent(elements, config.eventType, function (e) {
            innerATM.setProperties(innerATM.initialConfig, innerATM.s, true);
            var eventTarget = innerATM.getEventTarget(e);
            if (config.attributeName != "") {
                var allAN = config.attributeName.split(';');
                for (var i in allAN) {
                    var partsAN = allAN[i].split('=');
                    config.vars[partsAN[1]] = eventTarget.getAttribute(partsAN[0]) || "";
                }
            }
            var rememberDynamic = {};
            for (var i in config.vars) {
                if (typeof config.vars[i] == "function") {
                    rememberDynamic[i] = config.vars[i];
                    config.vars[i] = rememberDynamic[i]();
                } else if (config.vars[i].substr(0,4) == 'gcv:') {
                    rememberDynamic[i] = config.vars[i];
                    config.vars[i] = innerATM.gcv(config.vars[i].substring(4));
                }
            }
            innerATM.setProperties(config.vars, innerATM.s, false);
            var retFalse = false;
            if (config.adobeDoneAction == "") {
                innerATM.s.tl(eventTarget, config.o, config.eventName);
            } else {
                innerATM.s.tl(eventTarget, config.o, config.eventName, null, config.adobeDoneAction);
                retFalse = true;
            }
            innerATM.setProperties(config.vars, innerATM.s, true);
            for (var i in rememberDynamic) {
                config.vars[i] = rememberDynamic[i];
            }
            innerATM.setProperties(innerATM.initialConfig, innerATM.s, false);
            if (retFalse) {
                return false;
            }
        });
    },

    getEventTarget: function (e) {
        var targ = e.target || e.srcElement;
        if (targ.nodeType == 3) {
            targ = targ.parentNode;
        }
        return targ;
    },

    initManager: function () {
        this.configsInitialized = true;
        if (typeof this.s != "object" || this.s == null) { return; }
        this.setProperties(this.properties, this.s, false);
        this.setProperties(this.properties, this.initialConfig, false);
        this.properties = "";
        this.s.pageName = this.pageName;
        if (this.runOnLoad) {
            this.s.t();
        }
        var innerATM = this;
        for (var c = 0; c < this.configs.length; c++) { innerATM.attachConfig(this.configs[c]); }
        for (var c = 0; c < this.configsOnLoad.length; c++) { innerATM.atCall(this.configsOnLoad[c].jQuerySelector, this.configsOnLoad[c].o, this.configsOnLoad[c].eventName, this.configsOnLoad[c].vars, this.configsOnLoad[c].adobeDoneAction); }
        for (var c = 0; c < this.customCodes.length; c++) { innerATM.customCodes[c](); }
    },

    atCall: function (target, type, eventName, vars, adobeDoneAction) {
        if (typeof this.s != "object" || this.s == null) { return; }
        this.setProperties(this.initialConfig, this.s, true);
        this.setProperties(vars, this.s, false);
        var retFalse = false;
        if (typeof adobeDoneAction == "undefined" || adobeDoneAction == "" || adobeDoneAction == null) {
            this.s.tl(target, type, eventName);
            
        } else {
            this.s.tl(target, type, eventName, null, adobeDoneAction);
            retFalse = true;
        }
        this.setProperties(vars, this.s, true);
        this.setProperties(this.initialConfig, this.s, false);
        if (retFalse) {
            return false;
        }
    },

    setProperties: function (properties, destination, asEmpty) {
        var events = "";
        for (var j in properties) {
            if (asEmpty && (j == "channel" || j == "eVar4")) { continue; }
            var v = properties[j];
            if (j.indexOf('events.') == 0) {
                events += j.replace('events.', '') + (parseInt(v) ? '=' + parseInt(v) : '') + ',';
            } else {
                destination[j] = asEmpty ? "" : v;
            }
        }
        destination.events = asEmpty ? "" : (events == "" ? "" : events.slice(0, -1));
    },

    gcv: function (keyName) {
        if (this[keyName]) {
            return this[keyName];
        }
        if (this.appConfig[keyName]) {
            return this.appConfig[keyName];
        }
        return false;
    },

    // sync part
    initTagManagerDone: false,
    initOnReadyDone: false,
    initFromTagManager: function () {
        _m.ATM.initTagManagerDone = true;
        if (_m.ATM.initOnReadyDone) {
            _m.ATM.initManager();
        }
    },
    initFromOnReady: function () {
        _m.ATM.initOnReadyDone = true;
        if (_m.ATM.initTagManagerDone) {
            _m.ATM.initManager();
        }
    }
}
