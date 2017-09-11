/*
 * Header functionality - 2013Q2
 */

var header = (function (window, $) {

    var config = {
        platforms: { 'Xbox One': 'pf_xboxone', 'Playstation 4': 'pf_ps4', 'Xbox 360': 'pf_xbox360', 'Playstation 3': 'pf_ps3', 'Nintendo Wii U': 'pf_wiiu', 'Nintendo 3DS': 'pf_3ds', 'PC': 'pf_pc', 'PS Vita': 'pf_psvita' },
        headerSrcHost: "www.gamestop.com",
        loginUrl: "login.gamestop.com",
        bestsellersUrl: "/searchmerch/header/bestsellers",
        showBannerUrl: "/searchmerch/header/GetProfileInformation",
        PersonalizationUrl: "/searchmerch/header/Personalization",
        TypeAheadUrl: "/Header/TypeAhead?q=",
        SearchUrl: "/Search.axd?terms=",
        LoginPath: "/Account/Login",
        ProfilePath: "/Profile",
        AdsUrl: "/crossdomainads.axd",
        dropDowns: '#h2013q2 .dropdown',
        overLays: '#h2013q2 .overlay',
        container: '#h2013q2',
        typeAheadEnabled: true,
        typeAheadSearchTextField: '#searchtext',
        typeAheadSearchButton: '#searchbutton',
        cartId: "",
        NoReturnWhitelist: ["account/login", "account/resetpassword", "account/forgotpassword"]
    };

    var getContainer = function () {
        return config.container;
    };

    var openOverlay = function (sourceNode) {
        this.killCloseTimeout(sourceNode);
        var dropdownNode = $('' + $(sourceNode).attr('rel'));
        if (dropdownNode.length > 0 && dropdownNode.hasClass('active') === false) {
            var top = $(sourceNode).offset().top + $(sourceNode).outerHeight();
            var left = $(sourceNode).offset().left;

            var viewWidth = $(this.getContainer()).width() + $(this.getContainer()).offset().left;
            var overlayWidth = $(dropdownNode).outerWidth();
            if ((overlayWidth + left) > (viewWidth - 10)) {
                left = viewWidth - overlayWidth - 10;
            }

            $(dropdownNode).css('top', top + 'px').css('left', left + 'px').data('openedBy', sourceNode);
            $(sourceNode).addClass('active');
            $(dropdownNode).addClass('active');
        }
    };

    var forceOpen = function (overlayNode) {
        var sourceNode = $(overlayNode).data('openedBy');
        if (sourceNode) {
            this.killCloseTimeout(sourceNode);
        }
    };

    var killCloseTimeout = function (sourceNode) {
        var timeout = $(sourceNode).data('closeTimeout');
        if (timeout) {
            window.clearTimeout(timeout);
            $(sourceNode).data('closeTimeout', null);
        }
    };

    var closeOverlayBySource = function (sourceNode) {
        var overlayNode = $('' + $(sourceNode).attr('rel'));
        var self = this;
        if (overlayNode.length > 0) {
            $(sourceNode).data('closeTimeout',
                window.setTimeout(function () { self.closeOverlay(overlayNode); }, 50)
            );
        }
    };

    var closeOverlayByOverlay = function (overlayNode) {
        var sourceNode = $(overlayNode).data('openedBy');
        var self = this;
        if (sourceNode) {
            $(sourceNode).data('closeTimeout',
                window.setTimeout(function () { self.closeOverlay(overlayNode); }, 50)
            );
        }
    };

    var closeOverlay = function (overlayNode) {
        var sourceNode = $(overlayNode).data('openedBy');
        $(overlayNode).removeClass('active').css('top', '-9999px').css('left', '-9999px');
        if (sourceNode) {
            $(sourceNode).removeClass('active');
        }
    };

    var enableBadge = false;

    var init = function (options) {
        var self = this;

        // copy properties of `options` to `config`. Will overwrite existing ones.
        for (var prop in options) {
            if (options.hasOwnProperty(prop)) {
                config[prop] = options[prop];
            }
        }

        setHeaderHost();

        populateHeaderBestSellers();

        populatePersonalization();
        
        $(function () {

            //Load ad
            renderAds("miniBanner", "Home", "hdrMiniBanner", '', '', 1, null, null);

            //init type ahead
            typeAhead.init();

            //Bind click event to search button
            $("#searchbutton").unbind("click").click(function (event) {
                search();
                event.preventDefault();
            });

            $(config.dropDowns).mouseenter(function (evt) {
                self.openOverlay(this);
            }).mouseleave(function (evt) {
                self.closeOverlayBySource(this);
            });

            $(config.overLays).mouseenter(function (evt) {
                self.forceOpen(this);
            }).mouseleave(function (evt) {
                self.closeOverlayByOverlay(this);
            });

            // focus behavior on placeholders (override browser default)
            $('#h2013q2 [placeholder]').focusin(function (evt) {
                var phtext = $(this).attr('placeholder');
                if (phtext) {
                    $(this).data('phtext', phtext);
                    $(this).attr('placeholder', '');
                }
            }).focusout(function (evt) {
                if (!!$(this).val() === false) {
                    $(this).attr('placeholder', $(this).data('phtext'));
                }
            });
        });
    };

    //private functions

    var search = function () {
        var searchterm = $("#searchtext").val();
        window.location = getAbsoluteUrl(config.SearchUrl + escape(searchterm));
    };

    var setHeaderHost = function () {
        var host = window.location.host.toLowerCase();
        if (host.indexOf("ebgames") === -1) {
            setGameStopHeaderHost(host);
        } else {
            setEbGamesHeaderHost(host);
        }
    };

    var setGameStopHeaderHost = function (host) {
        switch (host) {
            case "local.gamestop.com":
            case "loginlocal.gamestop.com":
                config.headerSrcHost = "local.gamestop.com";
                config.loginUrl = "loginlocal.gamestop.com";
                break;
            case "dev.gamestop.com":
                config.headerSrcHost = "dev.gamestop.com";
                config.loginUrl = "loginqa.gamestop.com";
                break;
            case "qa.gamestop.com":
            case "loginqa.gamestop.com":
                config.headerSrcHost = "qa.gamestop.com";
                config.loginUrl = "loginqa.gamestop.com";
                break;
            case "qa2.gamestop.com":
            case "loginqa2.gamestop.com":
                config.headerSrcHost = "qa2.gamestop.com";
                config.loginUrl = "loginqa2.gamestop.com";
                break;
            case "qa3.gamestop.com":
            case "loginqa3.gamestop.com":
                config.headerSrcHost = "qa3.gamestop.com";
                config.loginUrl = "loginqa3.gamestop.com";
                break;
            case "qa4.gamestop.com":
            case "loginqa4.gamestop.com":
                config.headerSrcHost = "qa4.gamestop.com";
                config.loginUrl = "loginqa4.gamestop.com";
                break;
            case "qa5.gamestop.com":
            case "loginqa5.gamestop.com":
                config.headerSrcHost = "qa5.gamestop.com";
                config.loginUrl = "loginqa5.gamestop.com";
                break;
            case "cert.gamestop.com":
            case "logincert.gamestop.com":
                config.headerSrcHost = "cert.gamestop.com";
                config.loginUrl = "logincert.gamestop.com";
                break;
            case "staging.gamestop.com":
                config.headerSrcHost = "staging.gamestop.com";
                config.loginUrl = "login.gamestop.com";
                break;
            default:
                config.headerSrcHost = "www.gamestop.com";
                config.loginUrl = "login.gamestop.com";
        }
    };

    var setEbGamesHeaderHost = function (host) {
        switch (host) {
            case "local.ebgames.com":
            case "loginlocal.ebgames.com":
                config.headerSrcHost = "local.ebgames.com";
                config.loginUrl = "loginlocal.ebgames.com";
                break;
            case "dev.ebgames.com":
                config.headerSrcHost = "dev.ebgames.com";
                config.loginUrl = "loginqa.ebgames.com";
                break;
            case "qa.ebgames.com":
            case "loginqa.ebgames.com":
                config.headerSrcHost = "qa.ebgames.com";
                config.loginUrl = "loginqa.ebgames.com";
                break;
            case "qa2.ebgames.com":
            case "loginqa2.ebgames.com":
                config.headerSrcHost = "qa2.ebgames.com";
                config.loginUrl = "loginqa2.ebgames.com";
                break;
            case "qa3.ebgames.com":
            case "loginqa3.ebgames.com":
                config.headerSrcHost = "qa3.ebgames.com";
                config.loginUrl = "loginqa.ebgames.com";
                break;
            case "qa4.ebgames.com":
            case "loginqa4.ebgames.com":
                config.headerSrcHost = "qa4.ebgames.com";
                config.loginUrl = "loginqa4.ebgames.com";
                break;
            case "cert.ebgames.com":
            case "logincert.ebgames.com":
                config.headerSrcHost = "cert.ebgames.com";
                config.loginUrl = "logincert.ebgames.com";
                break;
            case "staging.ebgames.com":
                config.headerSrcHost = "staging.ebgames.com";
                config.loginUrl = "login.ebgames.com";
                break;
            default:
                config.headerSrcHost = "www.ebgames.com";
                config.loginUrl = "login.ebgames.com";
        }
    };

    var renderAds = function (adControlId, pageGroup, adSize, platform, skus, adCount, onSuccess, onError) {
        var requestUrl = getAbsoluteUrl(config.AdsUrl + '?group=' + escape(pageGroup) +
            '&size=' + escape(adSize) +
            '&platform=' + escape(platform) +
            '&skus=' + escape(skus) +
            '&count=' + escape(adCount));

        $.ajax({
            url: requestUrl,
            dataType: 'jsonp',
            jsonp: "jsonp",
            jsonpCallback: "adsCallback",
            cache: false,
            success: function (data, textStatus, jqXHR) {
                $.each(data.ads, function (index, ad) {
                    var htmlPayload = ad.content.match(/<Html>(.*?)<\/Html>/);
                    if (htmlPayload && (htmlPayload.length > 1)) {
                        $('#' + adControlId).append(htmlPayload[1]);
                    } else {
                        $('#' + adControlId).append(ad.content);
                    }
                });

                if (typeof onSuccess === 'function') {
                    onSuccess(data);
                } else {
                    console.log("onSuccess is not a defined function");
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (typeof onError === 'function') {
                    onError();
                } else {
                    console.log("onError is not a defined function");
                }
            }
        });
    };

    var showBanner = function () {
        $('#activateLink').attr('href','https://' + config.loginUrl + config.ProfilePath + '#activatepur');
        $.ajax({
            dataType: "jsonp",
            jsonp: "jsonp",
            jsonpCallback: "bannerCallback",
            cache: true,
            url: getAbsoluteUrl(config.showBannerUrl),
            success: function (data, textStatus, jqXHR) {
                $(function () {
                    if ((data.ShowBanner === true) && (data.ClosedBanner !== true))
                        $('#bannerToShow').show();
                    else {
                        $('#bannerToShow').hide();
                    }
                });
            }
        });
        
    };

    var populateHeaderBestSellers = function () {
        $.ajax({
            dataType: "jsonp",
            jsonp: "jsonp",
            jsonpCallback: "bestSellersCallback",
            cache: true,
            url: getAbsoluteUrl(config.bestsellersUrl),
            success: function (data, textStatus, jqXHR) {
                $(function () {

                    var hotTitlesMarkup = $('#hot-titles-template').html();
                    var hotTitlesTemplate = Handlebars.compile(hotTitlesMarkup);

                    for (var key in config.platforms) {
                        var section = $("#" + config.platforms[key] + " .hotrightnow");
                        if (data[key] && data[key].length > 0) {
                            var html = hotTitlesTemplate({ titles: data[key] });
                            section.prepend(html);
                        } else {
                            console.log('No best sellers found for ' + key);
                            section.hide();
                        }
                    }
                });
            }
        });
    };

    var populatePersonalization = function () {
        
        $.ajax({
            dataType: "jsonp",
            jsonp: "jsonp",
            jsonpCallback: "personalizationCallback",
            cache: false,
            url: getAbsoluteUrl(config.PersonalizationUrl),
            success: function (data, textStatus, jqXHR) {
                $(function () {

                    createAccountUrls(data);

                    var yourAccountMarkUp = $('#your-account-template').html();
                    var yourAccountTemplate = Handlebars.compile(yourAccountMarkUp);

                    var greetingMarkup = $('#greeting-template').html();
                    var grettingTemplate = Handlebars.compile(greetingMarkup);

                    var yourAccountHtml = yourAccountTemplate(data);
                    $('#youraccount').html(yourAccountHtml);

                    var grettingHtml = grettingTemplate(data);
                    $('#hrd-greeting').html(grettingHtml);

                    enableBadge = data.EnableBadge;
                    displayCartItemCount(data.CartItems);
                    

                    //showBanner();
                    if ((data.ShowBanner === true) && (data.ClosedBanner !== true)) {
                        $('#activateLink').attr('href', 'https://' + config.loginUrl + config.ProfilePath + '#activatepur');
                        $('#bannerToShow').show();
                        
                    } else {
                        $('#bannerToShow').hide();
                    }
                });

            }
        });
    };

    var createAccountUrls = function (data) {
        //this is getting a bit hacky and should be revisited in the future.
        if (window.location.toString().toLowerCase().indexOf("returnurl") == -1
            && !isWhitelisted(window.location.toString().toLowerCase())){
            var returnQueryString = "?ReturnUrl=" + encodeURIComponent(window.location);
            data["LoginUrl"] = "https://" + config.loginUrl + config.LoginPath + returnQueryString;
        } else {
            //Already on the login page don't append another return url.
            data["LoginUrl"] = "https://" + config.loginUrl + config.LoginPath;   
        }

        data["CreateUrl"] = "https://" + config.loginUrl + config.LoginPath + "#create";
        data["ProfileUrl"] = "https://" + config.loginUrl + config.ProfilePath;
        data["ActivateUrl"] = "https://" + config.loginUrl + config.ProfilePath + '#activatepur';
    };

    var isWhitelisted = function(url) {
        for (var i = 0; i < config.NoReturnWhitelist.length; i++) {
            if (url.toLowerCase().indexOf(config.NoReturnWhitelist[i]) > -1) {
                return true;
            }
        }

        return false;
    };

    var getAbsoluteUrl = function (urlFragment) {
        return location.protocol + "//" + config.headerSrcHost + urlFragment;
    };

    var typeAhead = (function ($) {
        var isOpen = false;
        var xsli = "";
        var shiftDown = false;
        var searchTerm = "";

        var init = function () {
            if (!config.typeAheadEnabled) { return; }

            $(config.typeAheadSearchTextField).threecolumnautocomplete({
                source: function (request, response) {
                    searchTerm = request.term;
                    $.ajax({
                        url: getAbsoluteUrl(config.TypeAheadUrl) + searchTerm,
                        dataType: "jsonp",
                        jsonp: "jsonp",
                        type: "GET",
                        contentType: "application/javascript; charset=utf-8",
                        success: function (data) {

                            var woot = "2";

                            response($.map(data, function (item) {
                                return {
                                    label: item.displayName,
                                    category: item.category,
                                    url: item.url,
                                    id: item.id
                                };
                            }));
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            //alert(textStatus);
                        }
                    });
                },
                minLength: 3,
                select: function (event, ui) {
                    return false;
                },
                open: function (event, ui) {
                    isOpen = true;
                    xsli = null;
                },
                close: function (event, ui) {
                    isOpen = false;
                    xsli = null;
                }
            });
        };

        $.widget("custom.threecolumnautocomplete", $.ui.autocomplete, {
            _create: function () {
                var self = this,
                    doc = this.element[0].ownerDocument,
                    suppressKeyPress;

                this.element
                    .addClass("ui-autocomplete-input")
                    .attr("autocomplete", "off")
                    .attr({
                        role: "textbox",
                        "aria-autocomplete": "list",
                        "aria-haspopup": "true"
                    })
                    .bind("keydown.autocomplete", function (event) {
                        if (self.options.disabled || self.element.attr("readonly")) {
                            return;
                        }
                        suppressKeyPress = false;
                        var keyCode = $.ui.keyCode;
                        switch (event.keyCode) {
                            case 16:
                                shiftDown = true;
                                break;
                            case keyCode.UP:
                                if (!isOpen) {
                                    return;
                                }
                                if (xsli == null) {
                                    return;
                                }

                                getPreviousListItem();
                                suppressKeyPress = true;
                                event.preventDefault();
                                break;
                            case keyCode.DOWN:
                                if (!isOpen) {
                                    return;
                                }
                                if (xsli == null) {
                                    highlightListItem(getFirstListItem());
                                    return;
                                } else {
                                    getNextListItem();
                                }
                                suppressKeyPress = true;
                                event.preventDefault();
                                break;
                            case keyCode.RIGHT:
                                if (!isOpen) {
                                    return;
                                }
                                if (xsli == null) {
                                    return;
                                }
                                getRightListItem();
                                suppressKeyPress = true;
                                event.preventDefault();
                                break;
                            case keyCode.ENTER:
                            case keyCode.NUMPAD_ENTER:
                                if (isOpen && xsli != null) {

                                    selectListItem($(xsli));

                                    suppressKeyPress = true;
                                    event.preventDefault();
                                } else {
                                    $(config.typeAheadSearchButton).trigger('click');
                                }
                                break;

                            case keyCode.TAB:
                                if (!isOpen) {
                                    return;
                                }
                                if (xsli == null) {
                                    if (!shiftDown) {
                                        highlightListItem(getFirstListItem());
                                    }
                                } else {
                                    if (!shiftDown) {
                                        getNextListItem();
                                    } else {
                                        getPreviousListItem();
                                    }
                                }
                                suppressKeyPress = true;
                                event.preventDefault();
                                break;
                            case keyCode.ESCAPE:
                                self.element.val(self.term);
                                self.close(event);
                                break;
                            default:
                                clearTimeout(self.searching);
                                self.searching = setTimeout(function () {
                                    if (self.term != self.element.val()) {
                                        self.selectedItem = null;
                                        self.search(null, event);
                                    }
                                }, self.options.delay);
                                break;
                        }
                    })
                    .bind("keypress.autocomplete", function (event) {

                        if (suppressKeyPress) {

                            suppressKeyPress = false;
                            event.preventDefault();
                        }
                    })
                    .bind("keyup.autocomplete", function (event) {
                        if (event.keyCode == 16) {
                            shiftDown = false;
                        }
                    })
                    .bind("focus.autocomplete", function () {
                        if (self.options.disabled) {
                            return;
                        }

                        self.selectedItem = null;
                        self.previous = self.element.val();
                    })
                    .bind("click.autocomplete", function (event) {
                        if (xsli != null) {
                            unhighlightListItem($(xsli));
                            xsli = null;
                        }
                    })
                    .bind("blur.autocomplete", function (event) {
                        if (self.options.disabled) {
                            return;
                        }

                        clearTimeout(self.searching);
                        self.closing = setTimeout(function () {
                            self.close(event);
                            self._change(event);
                        }, 150);
                    });
                this._initSource();
                this.response = function () {
                    return self._response.apply(self, arguments);
                };
                this.menu = $("<ul></ul>")
                    .addClass("ui-autocomplete")
                    .appendTo($(this.options.appendTo || "body", doc)[0])
                    .mousedown(function (event) {
                        var menuElement = self.menu.element[0];
                        if (!$(event.target).closest(".ui-menu-item").length) {
                            setTimeout(function () {
                                $(document).one('mousedown', function (event) {
                                    if (event.target !== self.element[0] &&
                                        event.target !== menuElement &&
                                        !$.ui.contains(menuElement, event.target)) {
                                        self.close();
                                    }
                                });
                            }, 1);
                        }

                        setTimeout(function () {
                            clearTimeout(self.closing);
                        }, 13);

                        $(config.typeAheadSearchTextField).focus();
                        event.preventDefault();
                    })
                    .mouseup(function (event) {
                        $(config.typeAheadSearchTextField).focus();
                        event.preventDefault();
                    })
                    .menu({
                        focus: function (event, ui) {
                            var item = ui.item.data("item.autocomplete");
                            if (false !== self._trigger("focus", event, { item: item })) {
                                if (/^key/.test(event.originalEvent.type)) {
                                    self.element.val(item.value);
                                }
                            }
                        },
                        selected: function (event, ui) {
                            var item = ui.item.data("item.autocomplete"),
                                previous = self.previous;

                            if (self.element[0] !== doc.activeElement) {
                                self.element.focus();
                                self.previous = previous;
                                setTimeout(function () {
                                    self.previous = previous;
                                }, 1);
                            }

                            if (false !== self._trigger("select", event, { item: item })) {
                                self.element.val(item.value);
                            }
                            self.term = self.element.val();

                            self.close(event);
                            self.selectedItem = item;
                        },
                        blur: function (event, ui) {
                            if (self.menu.element.is(":visible") &&
                                (self.element.val() !== self.term)) {
                                self.element.val(self.term);
                            }
                        }
                    })
                    .zIndex(this.element.zIndex() + 1)
                    .css({ top: 0, left: 0 })
                    .hide()
                    .data("menu");
                if ($.fn.bgiframe) {
                    this.menu.element.bgiframe();
                }
            },

            _renderMenu: function (ul, items) {
                var self = this;
                ul.append("<ul class='bestsellers'></ul> ");
                $.each(items, function (index, item) {
                    self._renderItem(ul.find("ul.bestsellers"), item);
                });

            },
            _renderItem: function (list, item) {
                // code to highlight the search term in the list item text
                // first create a regular expression to search the list item
                // in ignorecase mode
                // Get string matched by the regular expression, and add a bold
                // style around the matched string
                // For some reason, if the regular expression is not found, return
                // the original list item, without any bold style applied
                var re = new RegExp(searchTerm, "i");
                var matchedString = re.exec(item.label);
                var t = item.label;
                if (null != matchedString) {
                    t = item.label.replace(matchedString, "<span style='font-weight:bold;'>" +
                         searchTerm + "</span>");
                }

                return $("<li class='hideArrow'></li>")
                            .data("item.autocomplete", item)
                            .append("<a href=\"" + item.url + "\" class='anchorUnhighlighted'>" + t + "</a>")
                            .appendTo(list)
                            .bind('mouseover', function (event) {
                                if (isDifferentElement(event.target)) {
                                    unhighlightListItem($(xsli));
                                }
                            })
                            .bind('mouseout', function (event) {
                                highlightListItem($(xsli));
                            });
            }
        });

        var highlightListItem = function (listItem) {

            $(listItem).addClass('listItemHighlighted');
            $(listItem).removeClass('listItemUnhighlighted');
            $(listItem.find('a').eq(0)).addClass('anchorHighlighted');
            $(listItem.find('a').eq(0)).removeClass('anchorUnhighlighted');
            xsli = listItem;
        };

        var unhighlightListItem = function (listItem) {
            $(listItem).addClass('listItemUnhighlighted');
            $(listItem).removeClass('listItemHighlighted');
            $(listItem.find('a').eq(0)).addClass('anchorUnhighlighted');
            $(listItem.find('a').eq(0)).removeClass('anchorHighlighted');
        };

        var getFirstListItem = function () {
            return $('ul ul.bestsellers li:first');
        };

        var getLastListItem = function () {
            return $('ul ul.bestsellers li:last');
        };

        var getRightListItem = function () {
            var numInList = $(xsli).parents('ul').children('li').index($(xsli));
            if ($(xsli).parents('td:first').nextAll(':visible').first().length != 0) {

                if ($(xsli).parents('td:first').nextAll(':visible').first().find('li').length >= numInList + 1) {
                    unhighlightListItem($(xsli));
                    highlightListItem($(xsli).parents('td:first').nextAll(':visible').first().find('li').eq(numInList));
                } else {
                    unhighlightListItem($(xsli));
                    highlightListItem($(xsli).parents('td:first').nextAll(':visible').first().find('li:last'));
                }
            }
            else {
                if (numInList + 1 == $(xsli).parents('ul').children('li').length) {
                    unhighlightListItem($(xsli));
                    highlightListItem(getFirstListItem());
                } else if ($(xsli).parents('tr:first').children('td:visible').first().find('li').length >= numInList + 1) {
                    unhighlightListItem($(xsli));
                    highlightListItem($(xsli).parents('tr:first').children('td:visible').first().find('li').eq(numInList));
                } else {
                    unhighlightListItem($(xsli));
                    highlightListItem($(xsli).parents('tr:first').children('td:visible').first().find('li:last'));
                }
            }
        }

        var getNextListItem = function () {

            if ($(xsli).next('li').length != 0) {
                unhighlightListItem($(xsli));
                highlightListItem($(xsli).next('li'));
            } else {
                unhighlightListItem($(xsli));
                highlightListItem(getFirstListItem());

            }
        };

        var getPreviousListItem = function () {
            if ($(xsli).prev('li').length != 0) {
                unhighlightListItem($(xsli));
                highlightListItem($(xsli).prev('li'));
            } else {
                if ($(xsli).parents('li').prevAll(':visible').first().length != 0) {
                    unhighlightListItem($(xsli));
                    highlightListItem($(xsli).parents('li').prevAll(':visible').first().find('li:last'));
                } else {
                    unhighlightListItem($(xsli));
                    xsli = null;
                }
            }
        };

        var selectListItem = function (item) {
            var redirect = $(item).children('a:first').attr('href');

            if (redirect == undefined || redirect == null)
                $(config.typeAheadSearchButton).trigger('click');
            else
                window.location = redirect;
        };

        var isDifferentElement = function (target) {
            var tarElem = $(target);
            if ($(tarElem).is('a')) {
                tarElem = $(tarElem).parent('li:first');
            }
            if ($(tarElem).html() == $(xsli).html()) {
                return false;
            } else {
                return true;
            }
        };

        return {
            init: init
        };
    }($));

    var displayCartItemCount = function (itemCount) {
        var cartBadge = $("#cartbadge");

        if (enableBadge === true && itemCount > 0) {
            cartBadge.html(itemCount).show();
        }
        else {
            cartBadge.hide();
        }
    };



    return {
        init: init,
        getContainer: getContainer,
        openOverlay: openOverlay,
        forceOpen: forceOpen,
        killCloseTimeout: killCloseTimeout,
        closeOverlayBySource: closeOverlayBySource,
        closeOverlayByOverlay: closeOverlayByOverlay,
        closeOverlay: closeOverlay,
        setCartItemCount: function (itemCount) {
            displayCartItemCount(itemCount);
        }
    };

})(window, jQuery);

header.init();
