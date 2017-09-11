/*jslint bitwise: true, browser: true, eqeqeq: true, nomen: true, undef: true, white: true */
/*
var BLACKBAUD = BLACKBAUD || {};
BLACKBAUD.netcommunity = BLACKBAUD.netcommunity || {};
*/
var BLACKBAUD = {
    'netcommunity': {
        'jQuery': {
            'setVersionReference': function() {
                if (jQuery) {
                    var version = 'v' + jQuery().jquery.replace(/\./gi, '_')
                    var majorVersion = version.slice(0, version.lastIndexOf('_'));
                    var minorVersion = parseInt(version.slice(version.lastIndexOf('_') + 1, version.length));

                    if (version.split('_').length != 3) {
                        majorVersion = version;
                        minorVersion = 0;
                        version += '_' + minorVersion;
                    }
                    this[majorVersion] = jQuery;

                    var overrideMinorVersion = false;

                    for (var minorNumber = minorVersion; minorNumber >= 0; minorNumber--) {
                        var versionToSet = majorVersion + '_' + minorNumber;
                        if (this.compatibility[versionToSet] === false && versionToSet == version) {
                            overrideMinorVersion = minorNumber;
                        }
                        else if (this.compatibility[versionToSet] === false && versionToSet != version) {
                            break;
                        }

                        var func;
                        if (overrideMinorVersion === false) {
                            func = function() {
                                //Keep this in the global scope
                                return BLACKBAUD.netcommunity.jQuery[majorVersion].apply(null, arguments);
                            };

                            BLACKBAUD.netcommunity.jQuery[majorVersion].extend(func, BLACKBAUD.netcommunity.jQuery[majorVersion]);
                        }
                        else {
                            if (minorNumber != minorVersion) {
                                func = function() {
                                    //Keep this in the global scope
                                    return BLACKBAUD.netcommunity.jQuery[majorVersion + '_' + overrideMinorVersion].apply(null, arguments);
                                };
                                //console.log(BLACKBAUD.netcommunity.jQuery[majorVersion + '_' + overrideMinorVersion]);
                                BLACKBAUD.netcommunity.jQuery[majorVersion + '_' + overrideMinorVersion].extend(func, BLACKBAUD.netcommunity.jQuery[majorVersion + '_' + overrideMinorVersion]);
                            }
                            else {
                                func = jQuery;
                            }
                        }

                        this[versionToSet] = func;
                    }
                }
            },
            'compatibility': { /*
                This is an example of how you declare compatibility.
                What this means is that if v1_3_2 is not compatible with a higher versions, say version 1.3.4,
                it and all lower versions, v1_3_1, v1_3_0 will be bound against version 1.3.2 of jQuery
                
                If this situation does arise talk to GregWa first.
            'v1_3_2': false*/
            }
        }
    }
};