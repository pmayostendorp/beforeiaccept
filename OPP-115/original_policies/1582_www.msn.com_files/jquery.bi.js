(function ($) {
    $.bi = {
        dataConsumers: [],
        dataRetrievers: [],
        dataManipulators: [],

        isInitialized: function () {
            return this._isInitialized;
        },

        loadEnabled: function () {
            if (arguments.length >= 1 && typeof arguments[0] == 'boolean')
                this._loadEnabled = arguments[0];
            return this._loadEnabled;
        },

        ignoreAttr: function (attr) {
            if (typeof attr == 'string' && $.trim(attr) != '') {
                if ($.inArray(attr, this._ignoreAttr) == -1)
                    this._ignoreAttr.push(attr);
            } else if (typeof attr == 'object') {
                for (var i = 0; i < attr.length; i++) {
                    attr[i] = $.trim(attr[i]);
                    if ($.inArray(attr[i], this._ignoreAttr) == -1)
                        this._ignoreAttr.push(attr[i]);
                }
            }
        },

        ignoreTextClass: function (cssClasses) {
            if (typeof cssClasses == 'string' && $.trim(cssClasses) != '') {
                var classes = cssClasses.split(/\s+/);
                for (var i = 0; i < classes.length; i++) {
                    if ($.inArray(classes[i], this._ignoreTextClass) == -1)
                        this._ignoreTextClass.push(classes[i]);
                }
            }
        },

        baseData: function () {
            if (arguments.length >= 1 && typeof arguments[0] == 'object')
                $.extend(this._baseData, this._objectNametoLower(arguments[0]));
            return this._baseData;
        },

        baseLoadData: function () {
            if (arguments.length >= 1 && typeof arguments[0] == 'object')
                $.extend(this._baseLoadData, this._objectNametoLower(arguments[0]));
            return this._baseLoadData;
        },

        baseLinkData: function () {
            if (arguments.length >= 1 && typeof arguments[0] == 'object')
                $.extend(this._baseLinkData, this._objectNametoLower(arguments[0]));
            return this._baseLinkData;
        },

        _objectNametoLower: function (obj) {
            // Convert to lower case the top level object names item so it will prevent errors caused by miscapitalized letters
            var newObj = {};
            for (var i in obj) {
                newObj[i.toLowerCase()] = obj[i];
            }
            return newObj;
        },

        // Core -----------------------------------------------------------------------
        init: function (settings) {
            ///	<summary>
            ///		Initializes BI for the page.
            ///	</summary>
            ///	<param name="mapping" type="BiMapping">
            ///		Optional parameter that takes in JSON object to map the providers to their bi parameters/values.
            ///	</param>

            // Prevent from being reinitialized


            if (this.isInitialized()) return;
            this._isInitialized = true;

            this._ns = this.getNamespacePrefix('urn:schemas-microsoft-com:mscom:bi');

            this.ignoreAttr(this._ns + ':track');

            var eventName = (window.attachEvent ? 'click' : 'mousedown'); // IE: click, Other Browsers: mousedown
            $('a, area').live(eventName, $.proxy(function (event) {
                var biEnabled = true; // Tracking enabled by default
                var $el = $(event.currentTarget);

                // Find closeset bi:track attribute
                var currentAttr = $el.attr($.bi._ns + ':track');
                currentAttr = (currentAttr) ? currentAttr.toLowerCase() : currentAttr;
                if (currentAttr && (currentAttr === 'true' || currentAttr === 'false')) {
                    // Check element with attribute
                    biEnabled = (currentAttr == 'true');
                } else {
                    var parents = $el.parents(':not(table)').filter(function () {
                        // Get all ancestors with attribute
                        var currentAttr = $(this).attr($.bi._ns + ':track');
                        currentAttr = (currentAttr) ? currentAttr.toLowerCase() : currentAttr;
                        return (currentAttr && (currentAttr === 'true' || currentAttr === 'false')) ? true : false;
                    });
                    if (parents.length) {
                        // Get closest ancestors with attribute
                        biEnabled = ($(parents[0]).attr($.bi._ns + ':track').toLowerCase() == 'true');
                    }
                }
                if (biEnabled) {
                    var target = event.target;
                    if (target.tagName.toLowerCase() == 'area') {
                        // Set target to the corresponding img
                        target = $("img[usemap='#" + $(target).parent('map').attr('name') + "']").get(0);
                    }
                    this.linkClick(event.currentTarget, target);
                }
            }, this));

            // Call init() for Data Retrievers
            for (var n in this.dataRetrievers) {
                try {
                    this.dataRetrievers[n].init();
                } catch (e) { }
            }

            // Call init() for Data Consumers
            for (var n in this.dataConsumers) {
                try {
                    this.dataConsumers[n].init(settings[n]);
                } catch (e) { }
            }

            if (this.loadEnabled())
                $($.proxy(this.recordLoad, this));
        },

        record: function (data) {
            ///	<summary>
            ///		Sends a beacon containing the parameters that are mapped to each provider .
            ///	</summary>
            ///	<param name="parameters" type="JSON">
            ///		Key-value pair JSON object of parameter names/values .
            ///	</param>

            data = $.extend({}, this._baseData, data);

            // Call record fn for Data Manipulator
            for (var n in this.dataManipulators) {
                try {
                    this.dataManipulators[n].preRecord(data);
                } catch (e) { }
            }

            // Call record fn for Data Consumers
            for (var n in this.dataConsumers) {
                try {
                    this.dataConsumers[n].record(data);
                } catch (e) { }
            }
        },

        recordLoad: function (data) {
            ///	<summary>
            ///		Sends a beacon for page load containing parameters that are mapped to each provider.
            ///	</summary>

            if (data == $)
                data = {};

            data = $.extend({}, this._baseData, this._baseLoadData, data);

            for (var n in this.dataRetrievers) {
                try {
                    $.extend(data, this.dataRetrievers[n].getLoadData());
                } catch (e) { }
            }

            // Call record fn for Data Manipulator
            for (var n in this.dataManipulators) {
                try {
                    this.dataManipulators[n].preRecordLoad(data);
                } catch (e) { }
            }

            // Call record fn for Data Consumers
            for (var n in this.dataConsumers) {
                try {
                    this.dataConsumers[n].recordLoad(data);
                } catch (e) { }
            }
        },

        linkClick: function (element, target) {
            ///	<summary>
            ///		1: $(element) - Sends beacon with bi information for an element.
            ///		2: $(element, target) - Sends beacon with bi information for an element and its target (for use with images and map areas).
            ///	</summary>
            ///	<param name="element" type="Element">
            ///		1: element - A DOM Element.
            ///		2: element - A DOM Element.
            ///	</param>
            ///	<param name="target" type="Element">
            ///		2: target - A DOM Element.
            ///	</param>


            this.record(this.getLinkData(element, target));
        },

        getLinkData: function (element, target) {
            ///	<summary>
            ///		1: $(element) - gets bi information for an element. Retrieves all the link data from the Retriever plugins
            ///		2: $(element, target) - get bi information for an element and its target (for use with images and map areas). 
            ///	</summary>
            ///	<param name="element" type="Element">
            ///		1: element - A DOM Element.
            ///		2: element - A DOM Element.
            ///	</param>
            ///	<param name="target" type="Element">
            ///		2: target - A DOM Element.
            ///	</param>
            var data = $.extend({}, this._baseData, this._baseLinkData);

            for (var n in this.dataRetrievers) {
                try {
                    $.extend(data, this.dataRetrievers[n].getLinkData(element, target));
                } catch (e) { }
            }
            return data;
        },
        // Helpers --------------------------------------------------------------------
        getAttrData: function (element, includeIgnoredAttr) {
            ///	<summary>
            ///		1: $(element) - Gets the bi data for an element.
            ///		2: $($elements) - Gets the bi data for a set of jquery elements and merges them.
            ///	</summary>
            ///	<param name="element" type="Element/Jquery">
            ///		1: element - A DOM Element.
            ///		2: $elements - Jquery Element.
            ///	</param>
            ///	<returns type="JSON: name-value[] pair" />

            //TODO: Allow data attributes to be placed in other namespaces. Ones in the HTML namepace would need to be registered.

            var data = {};
            var attr, attrName;
            if (jQuery && element instanceof jQuery) {
                // Get data for a set of jquery selectors
                var $elements = element;
                for (var h = 0, len1 = $elements.length; h < len1; h++) {
                    var attributes = $elements.get(h).attributes;
                    for (var i = 0, len2 = attributes.length; i < len2; i++) {
                        attr = attributes.item(i);
                        attrName = attr.name.toLowerCase();
                        // Only get attributes in the urn:schemas-microsoft-com:mscom:bi namespace and ignore ones in this._ignoreAttr array
                        if ((attrName.indexOf($.bi._ns + ':') === 0) && (includeIgnoredAttr || $.inArray(attrName, this._ignoreAttr) < 0)) {
                            index = attrName.substring(3, attr.name.length);
                            if (data[index] == undefined) {
                                data[index] = [];
                            }
                            if ($.inArray(attr.value, data[index]) < 0) {
                                data[index].push(attr.value);
                            }
                        }
                    }
                }
                for (var i in data) {
                    data[i] = data[i].join(';');
                }

            } else {
                // Get data for a single dom element
                var attributes = element.attributes;

                for (var i = 0, len = attributes.length; i < len; i++) {
                    attr = attributes.item(i);
                    // Only get attributes in the urn:schemas-microsoft-com:mscom:bi namespace and ignore ones in this._ignoreAttr array
                    if ((attr.name.indexOf($.bi._ns + ':') === 0) && (includeIgnoredAttr || $.inArray(attr.name, this._ignoreAttr) < 0)) {
                        data[attr.name.toLowerCase().substring(3, attr.name.length)] = attr.value;
                    }
                }
            }
            return data;
        },

        getText: function (element) {
            ///	<summary>
            ///		Returns the text of an element while ignoring text in certian elements
            ///	</summary>
            ///	<param name="element" type="Element">
            ///		1. Element
            ///	</param>
            ///	<returns type="Text: string text" />

            // Use cloning hack due to bug in jQuery clone() that causes IE6/7 to crash when calling more than once
            var innerHtml = $(element).html();
            var $clone = $('<div>' + innerHtml + '</div>');
            if (this._ignoreTextClass.length > 0) {
                var classSelector = '.' + this._ignoreTextClass.join(',.');
                $clone.find(classSelector).remove();
            }
            return $.trim($clone.text());
        },

        mapData: function (data, map) {
            if (!map) return false;

            var result = {};

            for (var i in map) {
                result[i] = '';
                for (var j = 0, l = map[i].length; j < l; j++) {
                    if (map[i][j].str !== undefined) {
                        result[i] += map[i][j].str;
                    } else if (map[i][j].bi && data && data[map[i][j].bi] !== undefined) {
                        // Reset the domain, path, and query
                        switch (map[i][j].bi) {
                            case 'uripath':
                                if (data[map[i][j].bi] == '' || data[map[i][j].bi] == null || data[map[i][j].bi] == undefined) {
                                    data[map[i][j].bi] = '/';
                                } else if (data[map[i][j].bi].substring(0, 1) != '/') {
                                    data[map[i][j].bi] = '/' + data[map[i][j].bi];
                                }
                                break;
                            case 'uriquery':
                                if (data[map[i][j].bi] == '' || data[map[i][j].bi] == null || data[map[i][j].bi] == undefined) {
                                    data[map[i][j].bi] = '?';
                                }
                                break;
                        }
                        // Todo Handle the data = null/data == undefined here
                        result[i] += data[map[i][j].bi];
                    }
                }

                // Remove empty data
                if (result[i] == '')
                    delete result[i];
            }
            return result;
        },

        isInteractionTypeValid: function (data, mapping) {
            ///	<summary>
            ///		Checks if parameter is valid based on the provider settings (ie InteractionType whitelist)
            ///		Checks also if provider itself is enabled(ie InteractionType whitelist)
            ///	</summary>
            ///	<param name="params" type="JSON: name-value pair">
            ///		Message.
            ///	</param>        
            ///	<param name="mapping" type="Element">
            ///		the mapping object containing the interactiontype white list
            ///	</param>
            ///	<returns type="Boolean:true if valid" />

            if (!data || !mapping) {
                return false;
                /*} else if (mapping.settings && mapping.settings.interactiontype) { // backwards compatibility
                return ((!data.interactiontype) || (mapping.settings && mapping.settings.interactiontype && mapping.settings.interactiontype[data.interactiontype] != undefined));
                */
            } else if (mapping.interactionTypeMap) { // mapping.interactionTypeMap
                return ((!data.interactiontype) || (mapping.interactionTypeMap[data.interactiontype] != undefined));
            } else {
                return false;
            }

        },

        getNamespacePrefix: function (namespace) {
            // Capture the HTML namespace prefix for a specific namespace
            if (document.namespaces) {
                var namespaces = document.namespaces;
                for (var i = 0; i < namespaces.length; i++) {
                    if (namespaces[i].urn == namespace)
                        return namespaces[i].name;
                }
            }
            var attr = $('html').get(0).attributes;
            for (var i = 0; i < attr.length; i++) {
                if (attr[i].value == namespace) {
                    if (attr[i].name.indexOf('xmlns:') == 0) {
                        return attr[i].name.substring(attr[i].name.indexOf(':') + 1);
                    }
                }
            }
        },

        // Internals ------------------------------------------------------------------
        _isInitialized: false,
        _ns: 'bi', // HTML namespace prefix
        _loadEnabled: true,

        _ignoreAttr: [],
        _ignoreTextClass: [],

        _baseData: {}, // Base data for beacons
        _baseLoadData: { interactiontype: 0 }, // Base data for load beacon
        _baseLinkData: { interactiontype: 2} // Base data for automatic link click beacons         
    };
})(jQuery);
