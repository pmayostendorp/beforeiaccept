/* Title: document.getElementsByClassName
 * Description: Alternate getElementsByClassName for older browsers.
 * Author: eabad
 * Last Modified: eabad
 */
(function(window, document, undefined) {
    if (!document.getElementsByClassName) {
        document.getElementsByClassName = function (cn) { 
            var rx = new RegExp('(?:^|\\s)' + cn + '(?:$|\\s)'),
                allT = document.getElementsByTagName('*'), allCN = [], ac='', i = 0, a;
            while (a = allT[i = i + 1]) {
                ac = a.className;
                if (ac && ac.indexOf(cn) !== -1) {
                    if(ac === cn) { 
                        allCN[allCN.length] = a;
                        continue;
                    }
                    rx.test(ac) ? (allCN[allCN.length] = a) : 0;
                }
            }
            return allCN;
        };
    }
})(window, document);