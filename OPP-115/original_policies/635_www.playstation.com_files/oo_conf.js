/*
OnlineOpinion v5.7.6
Released: 10/01/2013. Compiled 10/01/2013 11:54:52 AM -0500
Branch: master ae5eff31bfa9c332359238010da3e0d3fb05d5c2
Components: Full
UMD: disabled
The following code is Copyright 1998-2013 Opinionlab, Inc.  All rights reserved. Unauthorized use is prohibited. This product and other products of OpinionLab, Inc. are protected by U.S. Patent No. 6606581, 6421724, 6785717 B1 and other patents pending. http://www.opinionlab
*/

/* [+] Tab Icon configuration */
var oo_feedback = new OOo.Ocode({
    referrerRewrite: {
        searchPattern: /:\/\/[^\/]*/,
        replacePattern: '://us.playstation.com'
    }
}),
    waypoint,
    hideWaypoint,
    webHelp = 'https://support.us.playstation.com',
    support = 'https://support.us.playstation.com/app/contact_options',
    community = 'http://community.us.playstation.com/t5/Support/ct-p/10023',
    tab_cust = document.createElement('div');

tab_cust.setAttribute('id', 'oo_tab');
tab_cust.setAttribute('class', 'oo_tab_right');
tab_cust.setAttribute('tabindex', '0');
tab_cust.setAttribute('onclick', 'showWaypoint()');

tab_cust.innerHTML = '<div><span></span></div><div class="screen_reader">Activate to launch feedback</div>';

document.body.appendChild(tab_cust);
waypoint = document.createElement('div');
function showWaypoint() {
    'use strict';

    document.body.appendChild(waypoint);

    waypoint.innerHTML = '<div id="oo_container"><div id="oo_waypoint_content"><div id="oo_container_header"><div class="close" onclick="hideWaypoint();">close&#32;&#215;</div></div><a href="javascript:void(0);" class="oo_sony_button" onclick="oo_feedback.show();hideWaypoint();">SHARE YOUR FEEDBACK</a>' +
        '<div id="inner_container"><a href="' + webHelp + '" id="web_help" target="_blank" onclick="hideWaypoint();"></a><a href="' + support + '" id="support_Cont" target="_blank" onclick="hideWaypoint();"></a><a href="' + community + '" id="community" target="_blank" onclick="hideWaypoint();"></a></div></div></div><div id="oo_waypoint"></div>';
}
function hideWaypoint() {
    'use strict';

    document.body.removeChild(waypoint);
}




