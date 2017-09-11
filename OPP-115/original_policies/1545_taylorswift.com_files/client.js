(function() {

    // Home for the Controllers
    var Ctrls    = {};

    function Router() {
        var path       = window.location.pathname,
            parts      = path.split("/"),
            controller = parts[1] || "home",
            detailPage = !isNaN(parseInt(parts[2], 10));

        controller = controller.charAt(0).toUpperCase() + controller.slice(1);

        Ctrls.Root();

        if (Ctrls[controller] && typeof Ctrls[controller] === "function") {
            Ctrls[controller](detailPage);
        }
    }

    // Find Nearest Anchor
    function gotoNearestAnchor(el, sibling) {
        var anchor = el.find("a").first();

        if (anchor.length && anchor.attr("href")) {
            return window.location = anchor.attr("href");
        }
    }

    // Body Classes
    function bodyClasses() {
        var parts   = location.pathname.split("/"),
            classes = "";

        if ( parts[1] ){
            classes += " interior";
            if ( parts[2] && parts[2] !== "page" && parts[2] !== "past" ){
                classes += " detail";
            }else{
                classes += " not-detail";
            }
        }
        for ( var i = 0; i < parts.length; i++ ) {
            var theClass = " page-" + parts[i] + " ";
            if (!parts[i]) { theClass = ""; }
            classes += theClass;
        }
        document.documentElement.className += classes;
        return {
            "path":         location.pathname,
            "urlParts":     parts,
            "interior":     (parts[1])? true : false,
            "detail":       (parts[2] && parts[2] !== "page" && parts[2] !== "past")? true : false
        };
    }

    bodyClasses();


    Ctrls.Root = function() {

        var win            = $(window),
            winWidth       = window.outerWidth,
            body           = $("body"),
            breadcrumbs    = $("#breadcrumbs"),
            userLogin      = $("#user-login"),
            page           = $("#page"),
            jukebox        = $(".popout-player"),
            header         = $("#header"),
            footer         = $("#footer"),
            shareLinks     = $(".GC_sharing"),
            template       = _.template($("#share-template").html()),
            pageWrap       = $("#page-wrapper"),
            navWrap        = $("#nav-wrap"),
            navBtn         = $("#mobile-nav-btn"),
            newsFlashClose = $(".news-flash .close"),
            winHeight      = $(window).height(),
            footerHeight   = footer.height(),
            headerHeight   = header.height(),
            headandfoot    = headerHeight + footerHeight,
            diff           = winHeight - headandfoot,
            navMoved       = false;


        // Remove no-js Class
        $("html").removeClass("no-js");

        //Popout Player
        jukebox.on("click", function(e) {
            e.preventDefault();
            window.open("/clients/taylor_swift/etc/jukebox.html", "", "status=0,toolbar=0,location=0,menubar=0,directories=0,resizable=0,scrollbars=0,height=455,width=300");
        });

        // Move Breadcrumbs
        if (userLogin.length) {
            breadcrumbs.insertBefore(userLogin);
        }

        // Sharing Links
        shareLinks.each(function() {
            $(this).html(template({
                share_url: "http://" + (window.location.host) + $(this).data("shareurl"),
                share_bare: (window.location.host) + $(this).data("shareurl")
            }));
        });
        shareLinks.parent().on("hover", function(){
            $(this).toggleClass("hover-active");
        });

        // Mobile nav
        navWrap.clone().insertBefore(pageWrap);
        navBtn.on("click", function(e){
            e.preventDefault();
            body.toggleClass("mobile-nav-open");
        });

        // Footer
        function stickyFooter() {
            winHeight      = $(window).height(),
            footerHeight   = footer.height(),
            headerHeight   = header.height(),
            headandfoot    = headerHeight + footerHeight,
            diff           = winHeight - headandfoot;

            page.css("min-height", diff);
        }

        // News Flash
        newsFlashClose.on("click", function() {
            body.addClass("news-flash-closed");
        });

        // Twitter Feed
        var twitterFeedMe = {
            "id": "517424079498797057",
            "domId": "twitter-feed",
            "maxTweets": 1,
            "enableLinks": true,
            "showImages": false,
            "showRetweet": true,
            "showTime": false
        };
        twitterFetcher.fetch(twitterFeedMe);

        // FitVid
        function fitVideo() {
            $(".content, #video_player, .tumblr_video").fitVids();
        }

        //Init
        win.on("load resize", stickyFooter)
           .on("load", fitVideo);

    };


    Ctrls.Home = function() {

        var win          = $(window),
            winHeight    = win.height(),
            winWidth     = window.outerWidth,
            top          = "",
            body         = $("body"),
            scrolled     = win.scrollTop(),
            slider       = $("#home-slider"),
            slides       = $(),
            gallery      = $("#home-gallery"),
            birdSmall    = $(".bird-small"),
            birdMedium   = $(".bird-medium"),
            birdLarge    = $(".bird-large"),
            countdown    = $("#countdown-clock"),
            smallGallery = false,
            resizeTimer  = null;


        // Countdown
        countdown.countdown({
            until: $.countdown.UTCDate(9, new Date(2015, 05-1, 05, 16)),
            layout: '<span>{dn}</span>d:<span>{hn}</span>h:<span>{mn}</span>m:<span>{sn}</span>s',
            alwaysExpire: true,
            onExpiry: function() {
                $(this).parent().remove();
            }
        });

        // Carousel
        function carousel(itemWidth) {
            gallery.flexslider({
                selector: ".gallery-wrap > ul",
                animation: "slide",
                slideshow: false,
                controlNav: false,
                animationLoop: true,
                itemWidth: itemWidth,
                itemMargin: 0,
                maxItems: 7,
                move: 1,
                prevText: "",
                nextText: ""
            });
        }

        // Home Slider
        function build_home_slideshow() {
            $.ajax({
                url:      "/api/json/features/HOME_SLIDESHOW",
                dataType: "json",
                success:  function(response) {
                    // No slides? No work
                    if ( response.length < 1 ) {
                        this.error();
                        return;
                    }
                    for ( var i = 0; i < response.length; i++ ) {
                        var slide,
                            single  = response[i],
                            has_url = (single.url && single.url !== ""),
                            image = $("<img>", {
                                "alt": single.title || "",
                                "src": single.source
                            }).hide();
                        // Bind load event to first image
                        if ( i < 1 ) {
                            image.on("load", function(){
                                slider.removeClass("loading").addClass("loaded");
                            });
                        }
                        // Wrap in anchor if has a custom url
                        if ( has_url ) {
                            image = $("<a>", { href: single.url, target: "_blank" }).append(image);
                        }
                        // Build the slide
                        slide = $("<li>").addClass("slide").css({
                            "background-image": "url(" + single.source + ")"
                        }).append(image);
                        slides = slides.add(slide);
                    }
                    // Build slideshow
                    slides.appendTo(slider);
                    slider.wrapInner("<ul class='slides' />");
                    slider.flexslider({
                        pauseOnHover: true,
                        useCSS: true,
                        directionNav: false,
                        slideshowSpeed: 9000
                    });
                },
                error: function(error) {
                    slider.removeClass("loading");
                    return;
                }
            });
        }

        // Move Home-Feature-2 Into Carousel
        var homeFeature2 = $("#home-feature-2"),
            replacedItem = $(".item-container").first().find(".item-2");

            if(homeFeature2.length){
                replacedItem.html(homeFeature2);
            }

        // Carousel
        function carousel(itemWidth) {
            gallery.flexslider({
                selector: ".gallery-wrap > ul",
                animation: "slide",
                slideshow: false,
                controlNav: false,
                animationLoop: true,
                itemWidth: itemWidth,
                itemMargin: 0,
                maxItems: 7,
                move: 1,
                prevText: "",
                nextText: ""
            });
        }
            // Init carousel items at 560px
            carousel(560);
            // Responsive carousel item width
            function home_gallery() {
                winWidth = window.outerWidth;

                if (winWidth <= 950 && !smallGallery) {
                    gallery.flexslider("destroy");
                    carousel(320);
                    smallGallery = true;
                } else if (winWidth > 950 && smallGallery) {
                    gallery.flexslider("destroy");
                    carousel(560);
                    smallGallery = false;
                }
            }

        // Parallaxin Birds
        function moveStuff(image, speed){
            var img = image,
                top = img.parent().position().top;

            if (top <= scrolled + winHeight) {
                top = "translate3d(" + Math.floor(-(top + scrolled) / (speed)) + "px," + Math.floor(-(top + scrolled) / (speed * 1.5)) + "px,0)";
                img.css({
                    "-webkit-transform": top,
                    "-ms-transform":     top,
                    "transform":         top
                });
            }
        }
        function moveStuffOpposit(image, speed){
            var img = image,
                top = img.parent().position().top;

            if (top <= scrolled + winHeight) {
                top = "translate3d(" + Math.floor(-(top + scrolled) / (speed)) + "px," + Math.floor(-(top - scrolled) / (speed * 1.5)) + "px,0)";
                img.css({
                    "-webkit-transform": top,
                    "-ms-transform":     top,
                    "transform":         top
                });
            }
        }

        function parallax() {
            winHeight = win.height();
            scrolled  = win.scrollTop();

            moveStuff(birdLarge, 3);
            moveStuffOpposit(birdMedium, 5);
            moveStuffOpposit(birdSmall, 8);
        }

        function resizeTriggered() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(resizeDone, 100);
        }

        function resizeDone() {
            // Update Variables
            winWidth = window.outerWidth;

            // JS Responsive
            if (winWidth <= 950 && !smallGallery) {
                smallGallery = true;

                // Destroy gallery
                gallery.flexslider("destroy");

                carousel(320);
            } else if (winWidth > 950 && smallGallery) {
                smallGallery = false;

                // Destroy gallery
                gallery.flexslider("destroy");

                carousel(560);
            }
        }

        // Init
        build_home_slideshow();
        carousel(560);

        win.on("load resize", resizeTriggered);
        if(!navigator.userAgent.match(/(iPhone|iPod|iPad)/i)){
            win.on("scroll resize", parallax);
        } else {
            body.addClass("parallax-disabled");
        }

    }; /* Home */


    Ctrls.News = function() {

        var newsContent = $(".content").find("div,p,a,span,em");

        // Change News Title
        $(".news.all h1.title").html("Word On The Streets");

        // Remove Inline Styles :P
        newsContent.removeAttr("style");


    }; /* News */


    Ctrls.Events = function() {

        var table        = $("table"),
            eventContent = $(".content").find("div,p,a,span,em");

        // Remove Inline Styles :P
        eventContent.removeAttr("style");

        // TR Clickable
        if (table.length) {
            table.on("click", "td", function(e) {
                var clicked = $(this);
                if (!clicked.hasClass("tickets") || clicked.hasClass("tickets") && e.target.tagName !== "A") {
                    return gotoNearestAnchor(clicked.parent("tr"));
                }
            });
        }


    }; /* Events */


    Ctrls.Media = function() {

        var emptyTitle  = $(".listing-title:empty"),
            zeroTitle   = $(".items.none");

        // Add No Title Text
        emptyTitle.text("View");
        zeroTitle.text("View");


    }; /* Media */


    Ctrls.Releases = function() {

        var releaseDetails  = $(".release-details"),
            prevButton      = $(".release-direction-prev"),
            nextButton      = $(".release-direction-next"),
            theRelease      = "";

        // Set previous and next states
        function setAlbumNavigationState() {
            // Reset states
            nextButton.removeClass("disabled");
            prevButton.removeClass("disabled");

            if (!$("#release-" + theRelease).next().length){
                // Disable the next button
                nextButton.addClass("disabled");
            }

            if (!$("#release-" + theRelease).prev().length){
                // Disable the previous button
                prevButton.addClass("disabled");
            }
        }

        // Show a release
        function showRelease(theRelease) {
            $("body, html").animate({scrollTop:0}, 400);

            setTimeout(function(){

                // Update the URL
                location.hash = "/release/" + theRelease;

                // Remove the visible class from all releases
                releaseDetails.removeClass("visible");

                $("#release-" + theRelease).addClass("visible");

                // Set navigation states
                setAlbumNavigationState();

            }, 400);
        }

        // If there's a hash, let's update theRelease to reflect that
        if (location.hash.match(/release/)) {
            $( window ).load(function() {
                theRelease = location.hash.replace(/[^\d]+/g, '');
                showRelease(theRelease);
            });
        } else {
            // Just set it to the first one
            theRelease = releaseDetails.first().attr("id").replace(/release-/, "");
            showRelease(theRelease);
        }

        // Bind to all of the releases
        $('[id^="nav-release-"]').on("click", function(){
            // Update which release was clicked
            theRelease = $(this).attr("id").replace(/nav-release-/, "");

            // Show the release
            showRelease(theRelease);
        });

        // Album Direction Nav
        nextButton.on("click", function(){
            // Set the release to the next ID
            theRelease = $("#nav-release-" + theRelease).next().attr("id").replace(/nav-release-/, "");
            if (theRelease){
                // Show it
                showRelease(theRelease);
            }
        });

        prevButton.on("click", function(){
            // Set the release to the prev ID
            theRelease = $("#nav-release-" + theRelease).prev().attr("id").replace(/nav-release-/, "");

            if (theRelease){
                // Show it
                showRelease(theRelease);
            }
        });

        // Show Lyrics
        $(".toggleLyrics").fancybox({
            padding: 10
        });


    }; /* Releases */


    Ctrls.Users = function() {
        var win             = $(window),
            main            = $("#main"),
            aside           = $("#aside[class^='user_']"),
            avatar          = $(".icon").find("img"),
            postComment     = $("#post_comment"),
            comments        = $("#comments"),
            winWidth        = win.width(),
            combineProfiles = false,
            memberDetails   = $(".member.details, .social.controls, .profile.links, .profile.friends");


        // Add search placeholder
        $("#keyword").attr("placeholder", "Search...").removeAttr("value");
        $("#keyword").placeholder();

        // Remove Comment Link
        $('a[href="#add-comment"]').closest("li").remove();

        // Make avatars large
        avatar.each(function(){
            $(this).attr("src", $(this).attr("src").replace("small", "large"));
        });

        // Move About and Profile together on small screens
        function combineProfile() {
            winWidth = win.width();

            if (winWidth < 950 && !combineProfiles) {
                memberDetails.prependTo(main);
                comments.appendTo(aside);
                postComment.insertAfter(comments);
                combineProfiles = true;
            } else if (winWidth >= 950 && combineProfiles) {
                memberDetails.prependTo(aside);
                comments.appendTo(main);
                postComment.insertAfter(comments);
                combineProfiles = false;
            }
        }

        // Init
        win.on("load resize", combineProfile);


    }; /* Users */


    Ctrls.Forum = function() {

        // Placeholder polyfil
        $("#searchfield").placeholder();

    }; /* Forum */

    // DOM Ready
    $(Router);

}());
