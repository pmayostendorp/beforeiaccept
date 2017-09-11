/* APL3.1DW */
/* Copyright (C) 2014 Casale Media All Rights Reserved.
The information contained within this document is confidential,
copyrighted and or trade secret. No part of this document may
be reproduced or distributed in any form or by any means, in
whole or in part, without the prior written permission of
Index Exchange. */

var IndexArgs = {
   "siteID":161634,
   "slots":[
      {"id":"drudge_728x90","width":728,"height":90},
      {"id":"drudge_160x600","width":160,"height":600},
      {"id":"drudge_300x250","width":300,"height":250},
      {"id":"drudge_300x250b","width":300,"height":250},
      {"id":"drudge_300x250c","width":300,"height":250},
      {"id":"drudge_300x600","width":300,"height":600},
      {"id":"drudge_970x250","width":970,"height":250},
      {"id":"drudge_320x50","width":320,"height":50}
   ]
}; 

function indexParseResponse(response) {
    try {
        if (response) {
            if (typeof _IndexRequestData !== "object" || typeof _IndexRequestData.impIDToSlotID !== "object" || typeof _IndexRequestData.impIDToSlotID[response.id] === "undefined") {
                return;
            }
            for (var i = 0; i < response.seatbid.length; i++) {
                for (var j = 0; j < response.seatbid[i].bid.length; j++) {
                    var bid = response.seatbid[i].bid[j];
                    if (typeof bid.ext !== "object" || typeof bid.ext.pricelevel !== "string") {
                        continue;
                    }
                    if (typeof _IndexRequestData.impIDToSlotID[response.id][bid.impid] === "undefined") {
                        continue;
                    }
                    var slotID = _IndexRequestData.impIDToSlotID[response.id][bid.impid];
                    var targetID = slotID + bid.ext.pricelevel;
                    if (typeof index_slots === "undefined") {
                        index_slots = [];
                    }
                    if (typeof _IndexRequestData.targetIDToBid === "undefined") {
                        _IndexRequestData.targetIDToBid = {};
                    }
                    if (typeof bid.ext.dealid === "string") {
                        index_slots.push("P_" + targetID);
                    } else {
                        index_slots.push("O_" + targetID);
                    }
                    if (_IndexRequestData.targetIDToBid[targetID] === undefined) {
                        _IndexRequestData.targetIDToBid[targetID] = [bid.adm];
                    } else {
                        _IndexRequestData.targetIDToBid[targetID].push(bid.adm);
                    }
                }
            }
        }
    } catch (e) {};
}

function index_render(doc, targetID) {
        try {
            var ad = _IndexRequestData.targetIDToBid[targetID].pop();
            if (ad != null) {
                doc.write(ad);
            }
        } catch (e) {};
    }
function index_start_tagless() {
        var escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        var meta = {
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"': '\\"',
            '\\': '\\\\'
        };

        function escapeCharacter(character) {
            var escaped = meta[character];
            if (typeof escaped === 'string') {
                return escaped;
            } else {
                return '\\u' + ('0000' + character.charCodeAt(0).toString(16)).slice(-4);
            }
        };

        function quote(string) {
            escapable.lastIndex = 0;
            if (escapable.test(string)) {
                return string.replace(escapable, escapeCharacter);
            } else {
                return string;
            }
        };

        function OpenRTBRequest(siteID) {
            this.initialized = false;
            if (typeof siteID !== "number" || siteID % 1 !== 0) {
                throw "Invalid Site ID";
            }
            this.siteID = siteID;
            this.impressions = [];
            if (top === self) {
                this.sitePage = location.href;
                this.topframe = 1;
            } else {
                this.sitePage = document.referrer;
                this.topframe = 0;
            }
            this.requestID = String((new Date().getTime() % 2592000) * 256 + Math.floor(Math.random() * 256) + 256);
            this.initialized = true;
        };
        OpenRTBRequest.prototype.serialize = function() {
            var json = '{"id":' + this.requestID + ',"site":{"page":"' + quote(this.sitePage) + '"';
            if (typeof document.referrer === 'string') {
                json += ',"ref":"' + quote(document.referrer) + '"';
            }
            json += '},"imp":[';
            for (var i = 0; i < this.impressions.length; i++) {
                var impObj = this.impressions[i];
                json += '{"id":"' + impObj.id + '", "banner":{"w":' + impObj.w + ',"h":' + impObj.h + ',"topframe":' + String(this.topframe);
                if (typeof impObj.bidfloor === 'number') {
                    json += ',"bidfloor":' + impObj.bidfloor;
                    if (typeof impObj.bidfloorcur === 'string') {
                        json += ',"bidfloorcur":"' + quote(impObj.bidfloorcur) + '"';
                    }
                }
                json += '}';
                if (typeof impObj.slotID === 'string' && (!impObj.slotID.match(/^\s*$/))) {
                    json += ',"ext":{"sid":"' + quote(impObj.slotID) + '"}';
                }
                if (i + 1 == this.impressions.length) {
                    json += '}';
                } else {
                    json += '},';
                }
            }
            json += "]}";
            return json;
        };
        OpenRTBRequest.prototype.setPageOverride = function(sitePageOverride) {
            if (typeof sitePageOverride === 'string' && (!sitePageOverride.match(/^\s*$/))) {
                this.sitePage = sitePageOverride;
                return true;
            } else {
                return false;
            }
        };
        OpenRTBRequest.prototype.addImpression = function(width, height, bidFloor, bidFloorCurrency, slotID) {
            var impObj = {
                'id': String(this.impressions.length + 1)
            };
            if (typeof width !== 'number' || width <= 1) {
                return null;
            }
            if (typeof height !== 'number' || height <= 1) {
                return null;
            }
            if ((typeof slotID === 'string' || typeof slotID === 'number') && String(slotID).length <= 50) {
                impObj.slotID = String(slotID);
            }
            impObj.w = width;
            impObj.h = height;
            if (bidFloor != undefined && typeof bidFloor !== 'number') {
                return null;
            }
            if (typeof bidFloor === 'number') {
                if (bidFloor < 0) {
                    return null;
                }
                impObj.bidfloor = bidFloor;
                if (bidFloorCurrency != undefined && typeof bidFloorCurrency !== 'string') {
                    return null;
                }
                impObj.bidfloorcur = bidFloorCurrency;
            }
            this.impressions.push(impObj);
            return impObj.id;
        };
        OpenRTBRequest.prototype.sendRequestAsync = function() {
            if (this.impressions.length == 0 || this.initialized !== true) {
                return;
            }
            var jsonURI = encodeURIComponent(this.serialize());
	    document.write('<script src="http://as.casalemedia.com/dfpbidder?s=' + this.siteID + '&r=' + jsonURI + '"></script>');
        };
        try {
            if (typeof IndexArgs === 'undefined' || typeof IndexArgs.siteID === 'undefined' || typeof IndexArgs.slots === 'undefined') {
                return;
            }
            var req = new OpenRTBRequest(IndexArgs.siteID);
            if (IndexArgs.url && typeof IndexArgs.url === 'string') {
                req.setPageOverride(IndexArgs.url);
            }
            if (typeof _IndexRequestData === 'undefined') {
                _IndexRequestData = {};
                _IndexRequestData.impIDToSlotID = {};
            }
            _IndexRequestData.impIDToSlotID[req.requestID] = {};
            var slotDef, impID;
            for (var i = 0; i < IndexArgs.slots.length; i++) {
                slotDef = IndexArgs.slots[i];
                impID = req.addImpression(slotDef.width, slotDef.height, slotDef.bidfloor, slotDef.bidfloorcur, slotDef.id);
                if (impID) {
                    _IndexRequestData.impIDToSlotID[req.requestID][impID] = String(slotDef.id);
                }
            }
            req.sendRequestAsync();
        } catch (e) {};
    };
index_start_tagless( );
