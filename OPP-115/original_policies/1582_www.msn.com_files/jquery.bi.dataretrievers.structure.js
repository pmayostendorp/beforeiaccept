(function ($) {
    $.bi.dataRetrievers.structure = {
        init: function () {
            $.bi.ignoreAttr($.bi._ns + ':titleflag');
            $.bi.ignoreAttr($.bi._ns + ':parenttitle');
            $.bi.ignoreAttr($.bi._ns + ':title');
            $.bi.ignoreAttr($.bi._ns + ':index');
            $.bi.ignoreAttr($.bi._ns + ':gridindex');
            $.bi.ignoreAttr($.bi._ns + ':gridtype');
            $.bi.ignoreAttr($.bi._ns + ':type');

            $.bi.baseLoadData({ title: document.title, initial: 0 });
        },

        getLinkData: function (element, target) {
            ///	<summary>
            ///		1: $(element) - Gets a link's bi information.
            ///		2: $(element, target) - Gets a link's bi information (for use with images and map areas).
            ///	</summary>
            ///	<param name="element" type="Element">
            ///		1: element - A DOM Element.
            ///		2: element - A DOM Element.
            ///	</param>
            ///	<param name="target" type="Element">
            ///		2: target - A DOM Element.
            ///	</param>

            var data = {};
            var hasTagName = (element && $(element).length && $(element).get(0).tagName);
            var hrefStr = (hasTagName) ? $(element).attr('href') : '';
            // Add standard link params like title hrefW
            data['urifull'] = hrefStr;
            data['uridomain'] = (hasTagName && $(element)[0].hostname) ? $(element)[0].hostname : '';
            data['uripath'] = (hasTagName && $(element)[0].pathname) ? $(element)[0].pathname : '';
            data['uripath'] = (data['uripath'].length && data['uripath'].indexOf('/') != 0) ? ('/' + data['uripath']) : data['uripath']; // make it consistent 
            data['urihash'] = (hrefStr && hrefStr.indexOf('#') >= 0) ? (hrefStr.substring(hrefStr.indexOf('#'))) : '';
            
            // handle the links within a page "#foo"
            if (hrefStr.indexOf('#') == 0) {
                data['uriquery'] = window.location.search;
            } else {
                hrefStr = (data['urihash']) ? (hrefStr.substring(0, hrefStr.indexOf('#'))) : hrefStr;
                data['uriquery'] = (hrefStr && hrefStr.indexOf('?') >= 0) ? (hrefStr.substring(hrefStr.indexOf('?'))) : "";
            }
            
            // Current Type if available
            data['type'] = (hasTagName && $(element).attr($.bi._ns + ':type')) ? $.trim($(element).attr($.bi._ns + ':type')) : '';
            // Current Index if available bi:index on the A
            data['index'] = (hasTagName && $(element).attr($.bi._ns + ':index')) ? $.trim($(element).attr($.bi._ns + ':index')) : '';

            data['linktitle'] = $.bi.getText(element);
            data['title'] = data['linktitle'];

            var nodeName = (element && $(element).length && $(element)[0].nodeName) ? $(element).get(0).nodeName.toLowerCase() : '';
            if (nodeName == 'area') {
                data['linktitle'] = data['title'] = $(element).attr('alt');
            } else if (data['title'] == '' && target && $(target).get(0).nodeName == 'IMG') {
                data['title'] = $(target).attr('alt');
            }

            $.extend(data, this.getData(element));
            return data;
        },

        getData: function (element) {
            var params = {};
            params['parenttitlestructure'] = this.getTitleStructure(element, null, true);
            $.extend(params, this.getIndexGridTypeStructure(element));
            return params;
        },

        getIndexGridTypeStructure: function (element) {
            var combined = {},
            grids = [],
            items = [],
            types = [];
            $(element).parents(':not(table)').each(function () {
                // Grid Logic
                if ($(this).attr($.bi._ns + ':gridindex')) {
                    var prefix = ($(this).attr($.bi._ns + ':gridtype')) ? $(this).attr($.bi._ns + ':gridtype') : '';
                    grids.push(prefix + ' ' + $(this).attr($.bi._ns + ':gridindex'));
                }
                // Item 
                if ($(this).attr($.bi._ns + ':index')) {
                    items.push($(this).attr($.bi._ns + ':index'));
                }
                // Type
                if ($(this).attr($.bi._ns + ':type')) {
                    types.push($.trim($(this).attr($.bi._ns + ':type')));
                }
            });

            combined['parenttypestructure'] = types.reverse().join(';');
            combined['gridstructure'] = grids.reverse().join(';');
            combined['parentindexstructure'] = items.reverse().join(';');

            return combined;
        },

        getIndexStructure: function (element) {
            // Traverse the DOM upwards and return a semicolon delimited string of bi:index elements
            var types = [];
            var cspname = false;
            $(element).parents(':not(table)').filter(function () {
                if ($(this).attr($.bi._ns + ':index')) {
                    types.push($(this).attr($.bi._ns + ':index'));
                    return true;
                }
                return false;
            });

            return types.reverse().join(';');
        },

        getGridStructure: function (element) {
            // Traverse the DOM upwards and return a semicolon delimited string of bi:griditem elements the prefix will be determined by the class
            var types = [];
            $(element).parents(':not(table)').filter(function () {
                if ($(this).attr($.bi._ns + ':gridindex')) {
                    var prefix = ($(this).attr($.bi._ns + ':gridtype')) ? $(this).attr($.bi._ns + ':gridtype') : '';
                    types.push(prefix + ' ' + $(this).attr($.bi._ns + ':gridindex'));
                    return true;
                }
                return false;
            });
            // Reverse
            return types.reverse().join(';');
        },

        getTypeStructure: function (element) {
            // Traverse the DOM upwards and return a semicolon delimited string of CSP types (can be master, page, and/or component).
            var types = [];
            $(element).parents(':not(table)').filter(function () {
                if ($(this).attr($.bi._ns + ':type')) {
                    types.push($.trim($(this).attr($.bi._ns + ':type')));
                    return true;
                }
                return false;
            });

            return types.reverse().join(';');
        },

        getTitleStructure: function (element, recurse, parentOnly) {
            var names = [],
            biParent = [],
            $biFlag,
            $biItem,
            biName = '';


            if (!element || !$(element).length || !$(element).get(0).tagName) {
                return "";
            }
            //1. Get the text on the link add to the array
            if (!parentOnly) { // True if you just want the parent
                names.push(($.trim($(element).text()) || $.trim($(element).attr('alt'))));
            }
            /*2. Search for the first bi:parenttitles="name1" upon finding one (stop the current loop). search for the sibling/parent for bi:titleflag="name1"*/
            // Add first Item if the element exists
            if ($(element).attr($.bi._ns + ':parenttitle')) {
                biParent.push($(element));
            }
            $(element).parents(':not(table)').each(function () {
                if ($(this).attr($.bi._ns + ':parenttitle')) {
                    biParent.push($(this));
                }
            });

            /* Update: made this more robust. Checking bi:parenttitle on the other parernttitle until it finds one that works*/
            for (var cnt = 0; cnt < biParent.length; cnt++) {
                var $thisParent = biParent[cnt];
                biName = $thisParent.attr($.bi._ns + ':parenttitle');

                // Search Sibling
                $biFlag = $thisParent.siblings(':not(table)').filter(function () {
                    return ($(this).attr($.bi._ns + ':titleflag') == biName);
                }).first();
                if ($biFlag.length == 0) {
                    $biFlag = $thisParent.parents(':not(table)').filter(function () {
                        return ($(this).attr($.bi._ns + ':titleflag') == biName);
                    }).first();
                }
                if ($biFlag.length != 0) {
                    /* 3. Search for the bi:title="name1" on the current item or children
                    upon finding it, get the text add to the array
                    - continue to 1, look for bi:parenttitle
                    */
                    if ($biFlag.attr($.bi._ns + ':title') == biName) { // current element
                        $biItem = $biFlag;
                    } else { // search children
                        $biItem = $biFlag.find('[' + $.bi._ns + '\\:title="' + biName + '"]').first();
                        // Bug in jquery 1.4.4 for find in IE7 using this as a fallback
                        if ($biItem.length == 0) {
                            $biItem = $biFlag.find('*').filter(function () {
                                return ($(this).attr($.bi._ns + ':title') == biName);
                            }).first();
                        }
                    }

                    if ($biItem) {
                        // Recurse function if parent exists
                        var results = this.getTitleStructure($biItem, true);
                        names = names.concat(results);
                        break; // stop the current loop if the title is already found
                    }
                }
            }

            return (recurse) ? names : names.reverse().join(';');
        }
    };
})(jQuery);
