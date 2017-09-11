function getParams (sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}

function shortenNumbers (number) {
    var output = "";
    if (number.length < 5) {
        output = number;
    } else if (number.length >= 5 && number.length < 7) {
        output = number.substring(0, number.length - 4) + "." + number.substring(1, number.length - 3) + "K";
    } else if (number.length >= 7 && number.length < 10) {
        output = number.substring(0, number.length - 6) + "." + number.substring(1, number.length - 4) + "M";
    } else if (number.length >=10) {
        output = number.substring(0, number.length - 9) + "." + number.substring(1, number.length - 7) +  "B";
    }
    return output;
}

(function($) {
Drupal.behaviors.socialLinks = {
    attach: function (context, settings) {
        $("a.share-link-facebook, a.share-link-twitter").click(function(e) {
            e.preventDefault();
            window.open($(this).attr('href'), '', 'width=640, height=360, scrollbars=no, resizable=no, location=no, menubar=no, toolbar=no');
        });
    }
};

Drupal.behaviors.getFollowerCount = {
    attach: function (context, settings) {
        //Facebook Likes
        $.get("https://graph.facebook.com/6333396177", function(data){
            var likesRaw = data.likes;
            var likes = likesRaw.toString();
            var likeCount = shortenNumbers(likes);
            $("#social-links").find(".social-facebook .count").text(likeCount);
            $("#social-links-mobile").find(".social-facebook .count").text(likeCount);
            $("#social-links-sidebar").find(".social-facebook .count").text(likeCount);
        });
    }
};

Drupal.behaviors.getSocialShares = {
    attach: function (context, settings) {
        var url = window.location.href;
        addthis.sharecounters.getShareCounts({service: ['facebook', 'twitter'], countUrl: url}, function(obj) {
            var count = 0;
            for (var i = 0; i < obj.length; i++) {
                count = count + obj[i].count;
            }
            $(".page-node").find(".social .social-count .number").text(count);
        });
    }
}

Drupal.behaviors.newsletter = {
    attach: function (context, settings) {
        var update = getParams('update');
        if (update == 1) {
            $(".newsletter .newsletter-text").addClass("hidden");
            $(".newsletter form").addClass("hidden");
            $(".newsletter .thanks").removeClass("hidden");
        }
    }
}

Drupal.behaviors.blogTaxonomyTermStyles = {
    attach: function (context, settings) {
        $(".page-node").find("div.field-type-taxonomy-term-reference").last().addClass("removeBar");
        document.styleSheets[0].addRule('.removeBar:after','content: "";');
    }
}

if (typeof Drupal.facetapi != "undefined") {
    Drupal.facetapi.makeCheckbox = function() {
        var $link = $(this);
        if (!$link.hasClass('facetapi-checkbox-processed')) {
            var active;
            if ($link.hasClass('facetapi-inactive')) {
                active = false;
            }
            else if ($link.hasClass('facetapi-active')) {
                active = true;
            }
            else {
                // Not a facet link.
                return;
            }
            // Derive an ID and label for the checkbox based on the associated link.
            // The label is required for accessibility, but it duplicates information
            // in the link itself, so it should only be shown to screen reader users.
            var id = this.id + '--checkbox';
            var description = $link.find('.element-invisible').html();
            var label = $('<label class="element-invisible" for="' + id + '">' + description + '</label>');
            var checkbox = active ? $('<input type="checkbox" class="facetapi-checkbox" id="' + id + '" checked="true" />') : $('<input type="checkbox" class="facetapi-checkbox" id="' + id + '" />');
            // Get the href of the link that is this DOM object.
            var href = $link.attr('href');
            redirect = new Drupal.facetapi.Redirect(href);
            checkbox.click($.proxy(redirect, 'gotoHref'));
            if (active) {
                // Add the checkbox and label, hide the link.
                $link.before(checkbox).before(label).hide();
            }
            else {
                $link.before(checkbox).before(label);
            }
            $link.removeClass('facetapi-checkbox').addClass('facetapi-checkbox-processed');
        }
    }
}
})(jQuery);