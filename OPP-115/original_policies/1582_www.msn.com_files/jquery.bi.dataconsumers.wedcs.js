(function ($) {
    $.bi.dataConsumers.wedcs = {
        _settings: null,

        init: function (settings) {
            this._settings = settings;
            $.bi.baseLinkData({ cot: 1 }); // TODO: we can make dataconsumer specific
        },

        record: function (data) {
            if (window.MscomCustomEvent && $.bi.isInteractionTypeValid(data, this._settings)) {
                data = this._mapInteractionType(data);
                MscomCustomEvent.apply(this, this._map(data));
            }
        },

        recordLoad: function (data) {
            if (window.MscomCustomEvent && $.bi.isInteractionTypeValid(data, this._settings)) {
                data = $.extend(data, { 'cot': 0 });
                data = this._mapInteractionType(data);
                MscomCustomEvent.apply(this, this._map(data));
            }
        },

        _mapInteractionType: function (dataByRef) {
            var data = $.extend({}, dataByRef); // Break the object reference
            //TODO: mapping.settings.interactiontype was changed to mapping.interactionTypeMap { 1:3} in this version. BiHandler needs to be Updated to support this we need to make this backwards compatible

            /*// Interaction type mapping to make it Backwards compatible
            var it = { 0: 0, 1: 4, 2: 1, 3: 2, 4: 9, 5: 10, 6: 11, 7: 12, 8: 13, 9: 14, 10: 15, 11: 16, 12: 17, 13: 18, 14: 19, 15: 20, 16: 21, 17: 22, 18: 23, 19: 24, 20: 25 };
            */

            // Map the interaction type
            if (this._settings.interactionTypeMap && data['interactiontype'] && this._settings.interactionTypeMap[data['interactiontype']] != undefined) {
                data['interactiontype'] = this._settings.interactionTypeMap[data['interactiontype']];
            } /* else if (data['interactiontype'] && it[data['interactiontype']] != undefined) { // Backwards compatible
                data['triggertypeinteractiontype'] = it[data['interactiontype']];
            }*/

            // Map the trigger interaction type
            if (this._settings.interactionTypeMap && data['triggertype'] && this._settings.interactionTypeMap[data['triggertype']] != undefined) {
                data['triggertype'] = this._settings.interactionTypeMap[data['triggertype']];
            } /* else if (data['triggertype'] && it[data['triggertype']] != undefined) { // Backwards compatible
                data['triggertype'] = it[data['triggertype']];
            }*/

            return data;
        },

        _map: function (dataByRef) {
            var data = $.extend({}, dataByRef); // Clones the object and prevents pass by ref
            if (data['uridomain'] == undefined) {
                data['uridomain'] = window.location.hostname;
                data['uripath'] = window.location.pathname;
                data['uriquery'] = window.location.search;
            }
            return this._toArray($.bi.mapData(data, this._settings.parameterMap));
        },

        _toArray: function (json) {
            // Converts a JSON object into an array of key-value pairs
            json = (!json || typeof json != 'object' || json.sort) ? {} : json;
            var array = [];
            for (var key in json) {
                if (json.hasOwnProperty(key)) {
                    array.push(key);
                    array.push(json[key]);
                }
            }
            return array;
        }
    };
})(jQuery);
