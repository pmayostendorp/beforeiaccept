//TODO: support multiple experiments
(function ($) {
    if ($.bi !== undefined) {
        $.bi.dataRetrievers.exp = {
            globalVarName: 'csp_expData',
            init: function () {
                if (window[this.globalVarName] != undefined && window[this.globalVarName][0] != undefined && typeof window[this.globalVarName] == 'object') {
                    var baseData = {};

                    var processItem = function (name, value) {
                        if (typeof value == 'string' || typeof value == 'number' || typeof value == 'boolean') {
                            baseData[name] = value;
                        } else if (typeof value == 'object') {
                            // Process sub objects
                            processObject(name, value);
                        }
                    };

                    var processObject = function (prefix, data) {
                        for (var i in data) {
                            name = prefix + '_' + i;
                            processItem(name, data[i]);
                        }
                    };

                    processObject('exp', window[this.globalVarName][0]);

                    // Read uid value from MS_WT cookie
                    var cookies = document.cookie.split(';');
                    var j1, n1;
                    for (var i1 in cookies) {
                        // Get the index of the '='
                        j1 = cookies[i1].indexOf('=');

                        // Get the name of the cookie
                        n1 = cookies[i1].substr(0, j1);

                        if ($.trim(n1) == 'MS_WT') {
                            var cookie = cookies[i1].substr(j1 + 1);

                            // Split the cookie at the '&' character
                            var experiments = cookie.split('&');
                            var j2, n2;
                            for (var i2 in experiments) {
                                // Get the index of the '='
                                j2 = experiments[i2].indexOf('=');

                                // Get the name of the experiment
                                n2 = experiments[i2].substr(0, j2);

                                if (baseData['exp_experimentID'] != undefined && $.trim(n2) == baseData['exp_experimentID']) {
                                    var value = experiments[i2].substr(j2 + 1);

                                    var uid = this._getCookieValue('uid', value);
                                    if (uid) {
                                        baseData['exp_uid'] = uid;
                                    }

                                    var typeid = this._getCookieValue('typeid', value);
                                    var testid = this._getCookieValue('testid', value);
                                    var runid = this._getCookieValue('runid', value);
                                    var trackid = this._getCookieValue('trackid', value);

                                    var currentPath = this._getCookieValue('currentPath', value);
                                    currentPath = currentPath ? (currentPath.split('-')[0]) : currentPath; // get string before '-' character

                                    if (typeid && currentPath && testid && runid && trackid) {
                                        baseData['exp_trackingguid'] = [typeid, currentPath, testid, runid, trackid].join('-');
                                    }
                                    break;
                                }
                            }
                            break;
                        }
                    }

                    $.bi.baseData(baseData);
                }
            },
            _getCookieValue: function (name, searchString) {

                // For use with strings folloing the format: \\\"name\\\":\\\"value\\\"

                var result = new RegExp('(\\\\\\\\\\\\"' + name + '\\\\\\\\\\\\":\\\\\\\\\\\\")([^"\\\\]*)(\\\\\\\\\\\\")', "i").exec(searchString);
                return result ? result[2] : false;
            }
        };
        $.bi.dataManipulators.exp = {
            conversionPointName: 'cpid',
            preRecord: function (data) {
                //Remove the conversion point for non click events

                if (data && (data['interactiontype'] == 0 || data['interactiontype'] == 1 ) ) {
                    this._clearConversionPoint(data);
                }
            },
            preRecordLoad: function (data) {
                this._clearConversionPoint(data);
            },
            _clearConversionPoint: function (data) {
                if (data && data[this.conversionPointName] != undefined) {
                    delete data[this.conversionPointName];
                }
            }
        };
    }
})(jQuery);
