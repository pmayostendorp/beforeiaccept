/// <reference path="../typings/jquery/jquery.d.ts"/>
/// <reference path="../typings/google.analytics/ga.d.ts" />
(function ($) {
    $.fn.messageCenterHeaderWidget = function () {
        if (!this.length || !("withCredentials" in new XMLHttpRequest() || window.location.protocol == "https:"))
            return this;
        var $this = this;
        var getParamsPromise = $.ajax({ crossDomain: true, dataType: "jsonp", url: "/account/messagecenter/headerwidget/params" });
        var getIfVisiblePromise = $.ajax({ crossDomain: true, dataType: "script", url: "/account/scripts/ifVisible.js", cache: true });
        getIfVisiblePromise.done(function () {
            getParamsPromise.done(function (params) {
                var countElements = $([]);
                $this.each(function (index, element) {
                    var hyperlinkElement = $(element).find("a.message-center-icon");
                    if ("ga" in window)
                        hyperlinkElement.on('click', function () {
                            ga('send', 'event', 'Message Center', 'Click', 'Message Center Header Widget', { transport: 'beacon' });
                        });
                    var countElement = $("<span />").addClass("msg-unread-stamp").hide();
                    hyperlinkElement.prepend(countElement);
                    countElements = countElements.add(countElement);
                });
                var communicationServiceEndpoint = "withCredentials" in new XMLHttpRequest() ? params.communicationServiceEndpoint : params.communicationServiceEndpointNoCors;
                var getUnreadConversationCount = function () {
                    var getUnreadConversationsCountPromise = $.ajax(communicationServiceEndpoint + "participant/" + params.accountPublicGuid + "/summary", {
                        type: "GET",
                        dataType: "json",
                        headers: { 'Authorization': "bearer " + params.accessToken }
                    });
                    getUnreadConversationsCountPromise.then(function (participantSummary) {
                        countElements.text(participantSummary.unreadConversationCount);
                        if (participantSummary.unreadConversationCount > 0)
                            countElements.show();
                        else
                            countElements.hide();
                    });
                    return getUnreadConversationsCountPromise;
                };
                var ifvisible = window.ifvisible;
                ifvisible.setIdleDuration(params.idleDurationSeconds);
                var pollRepeater = function (interval) {
                    window.setTimeout(function () {
                        if (ifvisible.now()) {
                            getUnreadConversationCount().then(function () { return pollRepeater(params.pollingIntervalSeconds * 1000.0); });
                        }
                        else {
                            pollRepeater(params.pollingIntervalSeconds * 1000.0);
                        }
                    }, interval);
                };
                var idlePollRepeater = function (interval) {
                    window.setTimeout(function () {
                        if (!ifvisible.now() && ifvisible.getIdleInfo().idleFor < params.idleDeactivationDurationHours * 60 * 60 * 1000.0) {
                            getUnreadConversationCount().then(function () { return idlePollRepeater(params.idlePollingIntervalSeconds * 1000.0); });
                        }
                        else {
                            idlePollRepeater(params.idlePollingIntervalSeconds * 1000.0);
                        }
                    }, interval);
                };
                // Start the repeaters
                pollRepeater(0);
                idlePollRepeater(0);
            });
        });
        return this;
    };
})(jQuery);
//# sourceMappingURL=message-center-header-widget.js.map