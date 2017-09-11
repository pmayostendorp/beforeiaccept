(function ($) {
    $.bi.dataConsumers.webtrends = {
        _settings: null,

        init: function (settings) {
            this._settings = settings;
            // Create WebTrends object
            if (typeof window.WebTrends != 'undefined') {
                this.WebTrends = new WebTrends();
            }
        },

        record: function (data) {
            if (this.WebTrends && $.bi.isInteractionTypeValid(data, this._settings)) {
                data = this._mapInteractionType(data);
                this.WebTrends.dcsJSONTrack({}, this._map(data));
            }
        },

        recordLoad: function (data) {
            if (this.WebTrends && $.bi.isInteractionTypeValid(data, this._settings)) {
                try { this.WebTrends.dcsCollect(); } catch (e) { }
                data = this._mapInteractionType(data);

                this.WebTrends.dcsJSONTrack(
                {
                    'DCS.dcssip': window.location.hostname,
                    'DCS.dcsuri': window.location.pathname,
                    'DCS.dcsqry': window.location.search
                }, this._map(data));
            }
        },

        _mapInteractionType: function (dataByRef) {
            var data = $.extend({}, dataByRef); // Break the object reference
            // Map the interaction type
            if (data['interactiontype'] != undefined && this._settings.interactionTypeMap[data['interactiontype']] != undefined) {
                data['interactiontype'] = this._settings.interactionTypeMap[data['interactiontype']];
            }
            // Map the trigger interaction type
            if (data['triggertype'] != undefined && this._settings.interactionTypeMap[data['triggertype']] != undefined) {
                data['triggertype'] = this._settings.interactionTypeMap[data['triggertype']];
            }
            return data;
        },

        _map: function (data) {
            return $.bi.mapData(data, this._settings.parameterMap);
        }
    };
})(jQuery);
