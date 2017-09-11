/* Title: Gel URL parameter functionality
 * Description: Simple functions to get query parameters or the query parameter value.
 * Author: eabad
 * Last Modified: eabad
 */
(function(window, document, $, undefined){
    $.extend({
        getUrlVars: function(){
            var vars = [], hash;
            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for(var i = 0; i < hashes.length; i++) {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }
            return vars;
        },
        getUrlVar: function(name) {
            return $.getUrlVars()[name];
        }
    });
})(window, document, jQuery);

/* Title: Google Analytics
 * Description: Simple functions for pushing stuff to Google Analytics
 * Author: eabad
 * Last Modified: eabad
 */
(function(window, document, $, undefined){
    $.fn.googlePageviews = function(url, title) {
        if(typeof(_gaq) != 'undefined') {
            if (typeof title !== 'undefined') {
                _gaq.push(["_set", "title", title]);
            }
            _gaq.push(['_trackPageview', url]);
        }
    };

    $.fn.googleEvents = function(category, action, label, value, nonInteractive) {
        if(typeof(_gaq) != 'undefined') {
            _gaq.push(['_trackEvent',
                       category,
                       action,
                       label,
                       value,
                       nonInteractive]);
        }
    };
})(window, document, jQuery);