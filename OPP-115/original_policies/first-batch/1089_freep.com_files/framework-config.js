define([], function(){
    if (window.use_minified_css) {
        require.config({
            baseUrl: window.site_static_url + 'jsb'
        });
    }
    return {
        "paths": {
            "jquery": "libs/jquery/jquery.require",
            "jquery_modern": "libs/jquery/jquery-2.1.4",
            "jquery_legacy": "libs/jquery/jquery-1.11.3",
            "underscore": "libs/underscore/underscore",
            "backbone": "libs/backbone/backbone-dev",
            "utils": "global/utils",
            "baseview": "global/base-view",
            "base-app": "apps/base-app",
            "pubsub": "global/pubsub",
            "site-manager": "managers/sitemanager",
            "state": "managers/statemanager",
            "user-manager": "managers/usermanager",
            "cookie": "libs/jquery/plugins/jquery.cookie",
            "easing": "libs/jquery/plugins/jquery.easing.1.3",
            "animatecolors": "libs/jquery/plugins/jquery.animate-colors-min",
            "mousewheel": "libs/jquery/plugins/jquery.mousewheel",
            "uiPageTurn": "libs/jquery/plugins/jquery.ui-page-turn",
            "uiFlip": "libs/jquery/plugins/jquery.ui-flip",
            "transformSupport": "libs/jquery/plugins/jquery.transformSupport",
            "touchpunch": "libs/jquery/plugins/jquery-ui.touch-punch.min",
            "admanager": "managers/admanager",
            "sharedAdPosition": "partner/shared-ad-position",
            "meteredAdPosition": "partner/metered-ad-position",
            "directAdPosition": "partner/direct-ad-position",
            "leaflet": "libs/leaflet/leaflet-0.4.4",
            "base64": "libs/base64/base64",
            "mergedSiteConfig": "/services/config/site-config",
            "adLogger": "partner/ad-logger",
            "file-upload": "libs/jquery/plugins/file-upload/jquery.fileupload"
        },

        "shim": {
            "jquery_modern": ["console.setup"],
            "jquery_legacy": ["console.setup"],
            "easing": ["jquery"],
            "animatecolors": ["jquery"],
            "mousewheel": ["jquery"],
            "touchpunch": ["libs/jqueryui/mouse"],
            "backbone": ["underscore", "jquery"],
            "file-upload": ["libs/jquery/plugins/file-upload/jquery.iframe-transport"]
        }
    };
});
