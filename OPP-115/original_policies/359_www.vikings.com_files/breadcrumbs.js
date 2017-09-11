$nflcs.breadcrumbs = {
    /**
     * Executes load of breadcrumbs module; Use document title if page is Prototypical.
     *
     * @param elem HTML element containing markup for breadcrumbs
     * @return void
     */
    load : function(elem) {
        var el$ = $nflcs(elem);
        var pageTitle$ = $nflcs(".current", el$);
        var useDocTitle = pageTitle$.hasClass("doc-title");
        pageTitle$.html(pageTitle$.html().ellipsize(100,true));
        // Use document title for Prototypical pages
        if (useDocTitle) {
            var title = document.title;
            if (title.indexOf(":") > -1) {
                title = title.substring(title.indexOf(":") + 1);
            }
            if (title.indexOf("|") > -1) {
                title = title.substring(title.indexOf("|") + 1);
            }
            title = $nflcs.trim(title);
            $nflcs(pageTitle$).html(title);
            $nflcs(pageTitle$).attr("title", title);
        }
    }
};