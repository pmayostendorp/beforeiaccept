$nflcs.geoInterstitial = function (elem) {
    this.elem = elem;
    this.cookieName = "geo-interstitial";
    this.cookieDurationDefault = 3;
    this.cookieDuration = null;
    this.location = null,
    this.serviceList = $nflcs(elem).data("servicelist"),
    this.serviceListCookieName = "service-interstitial",
    this.serviceListCookieDuration = 365;

    this.init = function () {
        var cookie,
            cookieData;

        if($nflcs.cookie(this.cookieName)) {
            var cookieValue = $nflcs.cookie(this.cookieName),
                cookieDuration = this.setCookieDuration();

            if( cookieValue.indexOf("data") == -1 )  //legacy cookie, convert to new format
            {
                var loc;
                if( cookieValue.indexOf("-viewed") == -1)
                    loc = cookieValue;
                else
                    loc = cookieValue.substring(0, cookieValue.indexOf("-viewed"));

                if( loc == "int" )  //international legacy has short term cookie
                    $nflcs.cookie(this.cookieName, '{"data": "' + loc.toUpperCase() + "-viewed" + '", "expires": ' + cookieDuration + '}', {expires: cookieDuration, path: "/"});
                else
                    $nflcs.cookie(this.cookieName, '{"data": "' + loc.toUpperCase() + "-viewed" + '", "expires": 365}', {expires: 365, path: "/"});
            }

            cookie = $nflcs.parseJSON($nflcs.cookie(this.cookieName));
            cookieData = cookie.data;
        }

        if(!$nflcs.cookie(this.serviceListCookieName)) {
            $nflcs.cookie(this.serviceListCookieName, this.serviceList, {expires: this.serviceListCookieDuration, path: "/"});
        }

        //Check if we have geo-interstitial cookie and if it's been viewed
        if (this.isCookieEmpty() || (cookieData && cookieData.indexOf("viewed") == -1)) {
            this.makeAdCall();
        }
        //If service list cookie and incoming service list are different, then ad configuration changed, we need to re-evaluate
        else if($nflcs.cookie(this.serviceListCookieName) != this.serviceList ) {
            var serviceListArray = this.serviceList.split(","),
                location = cookieData.substring(0, cookieData.indexOf("-viewed"));

            //checks if user's location is being targeted in a wider zone (i.e. user is US-CHI, but ad targeting is now US)
            function isInWiderTargetZone(location, serviceListArray) {
                var locArray = location.split("-"),
                    loc = "";

                //Checking for wider zone targeting
                if( locArray.length > 1 ) {
                    for(var i = 0; i < locArray.length; i++) {
                        if(i == 0)
                            loc = locArray[i];
                        else
                            loc = loc + "-" + locArray[i];

                        if( $nflcs.inArray(loc, serviceListArray) > -1 )
                            return true;
                    }
                }
                return false;
            }

            //checks if user's location is being targeted in a narrower zone (i.e. user is US, but ad targeting is now US-CHI)
            function isInNarrowerTargetZone(location, serviceListArray) {
                var serv,
                    servArray;

                for(var i = 0; i < serviceListArray.length; i++) {
                    servArray = serviceListArray[i].split("-");
                    serv = "";

                    if( servArray.length > 1 ) {
                        for(var j = 0; j < servArray.length; j++) {
                            if(j == 0)
                                serv = servArray[j];
                            else
                                serv = serv + "-" + servArray[j];

                            if( serv == location )
                                return true;
                        }
                    }
                }
                return false;
            }

            if($nflcs.inArray(location, serviceListArray) > -1 || isInWiderTargetZone(location, serviceListArray) || isInNarrowerTargetZone(location, serviceListArray)) {
                this.makeAdCall();
            }
            else {
                //set cookie to 1 year
                $nflcs.cookie(this.cookieName, '{"data": "' + cookieData + '", "expires" : "' + 365 + '"}', {expires: 365, path: "/"});
            }

            $nflcs.cookie(this.serviceListCookieName, this.serviceList, {expires: this.serviceListCookieDuration, path: "/"});
        }


    };

    this.setCookieDuration = function () {
        var domLevelCookieDuration = $nflcs(this.elem).data("cookie-duration");//this data attrib is set on the JSP level by a club property file.

        this.cookieDuration = parseInt(domLevelCookieDuration);//determine if the cookie duration set in the dom is an int (if it's set in the prop file it will be, else it may be empty)
        if(isNaN(this.cookieDuration))
            this.cookieDuration = this.cookieDurationDefault;//if the dom level cookie duration isn't an int, then use the default

        return this.cookieDuration;
    };
    this.isCookieEmpty = function () {
        return (!$nflcs.cookie(this.cookieName));
    };
    this.makeAdCall = function () {
        var adTag = $nflcs.ad.makeAdFromParams($nflcs(this.elem).data("adtype"), {
            "suite": $nflcs(this.elem).data("suite"),
            "width": $nflcs(this.elem).data("width"),
            "height": $nflcs(this.elem).data("height"),
            "customparams": $nflcs(this.elem).data("customparams")
        }, {});

        $nflcs(this.elem).append(adTag);
        $nflcs.ad.makeAd(adTag);
    };
    this.setModalContents = function (html) {
        $nflcs(this.elem).prepend('<div class="jqmClose fancy">X</div>' + html);
    };
    this.showModalBasedOnLocation = function (location) {
        var serviceListArray;

        if(this.serviceList) {
            serviceListArray = this.serviceList.split(",");
        }

        //exact match of location to service list = show ad and set short-term cookie
        if(serviceListArray && $nflcs.inArray(location, serviceListArray) > -1) {
            var cookieName = this.cookieName,
                cookieDuration = this.setCookieDuration();

            $nflcs(this.elem).jqm({
                onHide: function (hash) {
                   $nflcs.cookie(cookieName, '{"data": "' + location + "-viewed" + '", "expires": ' + cookieDuration + '}', {expires: cookieDuration, path: "/"});
                   hash.w.fadeOut(0);
                   hash.o.remove();
                }
            });

            $nflcs.cookie(this.cookieName, '{"data": "' + location + '", "expires": ' + cookieDuration + '}', {expires: cookieDuration, path: "/"});
            $nflcs(this.elem).jqmShow();
        }
        else {
            $nflcs.cookie(this.cookieName, '{"data": "' + location + "-viewed" + '", "expires": ' + 365 + '}', {expires: 365, path: "/"}); //set it as "viewed" so we don't go back to ad server
        }
    };

    this.init();
};