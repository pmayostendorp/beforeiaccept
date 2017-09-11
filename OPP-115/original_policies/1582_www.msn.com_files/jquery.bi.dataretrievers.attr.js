(function ($) {
    $.bi.dataRetrievers.attr = {
        getLoadData: function () {
            var $items;
            // some bugs in firefox if $('area:visible') is used and it doesnt work completely in ie
            $items = $('area').filter(function () {
                //TODO: check for an image with usemap attribute that matches the map name
                return $(this).parent('map').siblings('img').is(':visible');
            });
            // Merge visible area elements with visible anchor elements
            $items = $items.add($('a:visible'));

            return $.bi.getAttrData($items);
        },

        getLinkData: function (element, target) {
            return $.bi.getAttrData(element);
        }
    };
})(jQuery);
